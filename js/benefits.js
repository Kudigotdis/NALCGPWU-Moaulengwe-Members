/* =====================================================
   1. PREMIUM CALCULATOR
===================================================== */
function calculatePremium() {
    const coverTier = document.getElementById('coverTier').value;
    const ageBand = document.getElementById('ageBand').value;
    const familyCount = parseInt(document.getElementById('familySlider').value, 10) || 1;

    document.getElementById('familyCount').textContent = familyCount;

    const tax = NALCGPWU_PREMIUM;
    const map = tax.rates[coverTier] || tax.rates['40000'];
    const basePremium = map[ageBand] || map.low;
    const totalPremium = tax.unionFee + (basePremium * familyCount);

    document.getElementById('totalPremium').textContent = 'P ' + totalPremium.toFixed(2);

    LocalStore.set('premiumCalculation', {
        coverTier,
        ageBand,
        familyCount,
        totalPremium
    });
}

function proceedToPayment() {
    const calc = LocalStore.get('premiumCalculation');
    if (!calc) {
        toast('Please calculate your premium first.');
        return;
    }

    const paymentMethods =
        'Choose Payment Method:\n\n' +
        '1. FNB Bank Transfer\n' +
        '2. Stanbic Bank Transfer\n' +
        '3. Mascom MyZaka (*120#)\n' +
        '4. BTC Smega (*500#)\n' +
        '5. Orange Money (*888#)\n\n' +
        'WhatsApp your payment reference to:\n+267 311 5582';

    toast(paymentMethods);
    LocalStore.set('pendingPayment', calc);
    whatsappShare('payment', 'I want to pay my Mokaulengwe premium of P ' + calc.totalPremium.toFixed(2) + ' per month.');
}

/* =====================================================
   2. DEPENDANTS (member cards)
===================================================== */
function getDependants() {
    const saved = LocalStore.get('mokau_dependents');
    return saved && Array.isArray(saved) ? saved : NALCGPWU_DEFAULT_DEPENDANTS;
}

function saveDependants(list) {
    LocalStore.set('mokau_dependents', list);
}

function renderDependants() {
    const container = document.getElementById('dependantsList');
    if (!container) return;

    const list = getDependants();
    if (!list.length) {
        container.innerHTML = '<div class="empty-state">No dependants added yet. Add a family member to your policy.</div>';
        return;
    }

    let html = '';
    list.forEach(dep => {
        const statusText = dep.status === 'active' ? 'Active' : dep.status === 'pending' ? 'Activating (6 deductions)' : 'Pending';
        const name = esc(dep.name);
        const details = (dep.childBracket ? esc(dep.relation) + ' (' + esc(dep.childBracket) + ')' : esc(dep.relation)) +
            ' &bull; ' + esc(dep.cover) +
            (typeof dep.rate === 'number' ? ' &bull; P ' + dep.rate.toFixed(2) + '/mo' : '');
        html +=
            '<div class="member-card dismissable">' +
            '<button type="button" class="card-x" onclick="removeDependant(\'' + dep.id + '\')" aria-label="Remove ' + name + '">&times;</button>' +
            '<div class="member-avatar">' + initialsOf(dep.name) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + name + '</div>' +
            '<div class="member-details">' + details + '</div>' +
            '<div class="member-tags">' +
            '<span class="tag ' + (dep.status === 'active' ? 'green' : 'amber') + '">' + statusText + '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

function addDependant() {
    const name = document.getElementById('depName').value.trim();
    let relation = document.getElementById('depRelation').value;
    const dob = document.getElementById('depDob') ? document.getElementById('depDob').value : '';

    if (!name) {
        toast('Please enter the dependant\'s full name.');
        return;
    }

    if (relation === 'Child') {
        const bracket = childBracketFromDob(dob);
        if (bracket) relation = bracket.key;
    }

    const tier = (document.getElementById('coverTier') && document.getElementById('coverTier').value) || '40000';
    const member = {
        id: 'dep' + Date.now().toString(36),
        name: name,
        relation: relation,
        dob: dob,
        childBracket: relation.indexOf('Child') === 0 ? relation : '',
        ageBand: relation.indexOf('Child') === 0 ? '' : ageBandFromDob(dob),
        cover: familyMemberCover(relation, dob),
        rate: familyMemberRate(tier, relation, dob),
        status: familyMemberStatus(relation),
        effectiveDate: familyMemberStatus(relation) === 'active'
            ? new Date().toISOString()
            : addMonths(new Date(), NALCGPWU_PREMIUM.extendedWaitingMonths).toISOString()
    };

    const list = getDependants();
    list.push(member);

    saveDependants(list);
    document.getElementById('depName').value = '';
    if (document.getElementById('depDob')) document.getElementById('depDob').value = '';
    renderDependants();
    renderPolicyCard();
    toast(member.relation + ' added. ' +
        (member.status === 'active' ? 'Active from the first deduction.' : 'Extended family activates after ' + NALCGPWU_PREMIUM.extendedWaitingMonths + ' consecutive deductions.'));
}

function removeDependant(id) {
    const list = getDependants().filter(d => d.id !== id);
    saveDependants(list);
    renderDependants();
    renderPolicyCard();
}

/* =====================================================
   3. DIGITAL POLICY CARD
===================================================== */
function renderPolicyCard() {
    const container = document.getElementById('policyCard');
    if (!container) return;

    const profile = loadOnboarding ? loadOnboarding() : null;
    const memberName = profile ? (profile.personal.firstName + ' ' + profile.personal.surname) : 'Member Name';
    const activeDeps = getDependants().filter(d => d.status === 'active').length;
    const pendingDeps = getDependants().filter(d => d.status !== 'active').length;

    const policy = getSavedPolicy();
    const tier = policy ? policy.tier : '40000';
    const tierLabel = (NALCGPWU_PREMIUM.tiers.find(t => t.value === tier) || {}).label || 'P 40,000 Cover';
    const memberBand = policy && policy.member ? policy.member.ageBand : 'low';
    const calc = computePolicyMonthlyTotal(tier, memberBand, getDependants());

    container.innerHTML =
        '<div class="policy-card">' +
        '<div class="policy-row"><span class="policy-row-label">Policy</span><span class="policy-row-value red">Mokaulengwe Benefit</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Member</span><span class="policy-row-value">' + esc(memberName) + '</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Main Member Cover</span><span class="policy-row-value">P 40,000 / P 60,000</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Cover Tier</span><span class="policy-row-value">' + esc(tierLabel) + '</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Family Members</span><span class="policy-row-value">' + activeDeps + ' active' + (pendingDeps ? ' &bull; ' + pendingDeps + ' activating' : '') + '</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Monthly Premium</span><span class="policy-row-value red">P ' + calc.total.toFixed(2) + ' <span style="font-weight:400;">(union P ' + calc.unionFee.toFixed(2) + ' + cover P ' + (calc.memberRate + calc.familyRate).toFixed(2) + ')</span></span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Status</span><span class="policy-row-value">' +
        '<span class="tag green">&#9679; Active</span>' +
        '</span></div>' +
        '</div>';
}

/* =====================================================
   4. FUNERAL SUPPORT NETWORK
===================================================== */
function renderFuneralNetwork() {
    const container = document.getElementById('funeralNetwork');
    if (!container) return;

    let html = '';
    NALCGPWU_FUNERAL_PARTNERS.forEach(p => {
        html +=
            '<div class="member-card clickable" onclick="whatsappShare(\'partner\', \'Hello ' + esc(p.name) + ', I need support through NALCGPWU Mokaulengwe.\')">' +
            '<div class="member-avatar">' + esc(p.icon) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(p.name) + '</div>' +
            '<div class="member-details">' + esc(p.detail) + '</div>' +
            '<div class="member-tags">' +
            '<span class="tag blue">' + esc(p.type) + '</span>' +
            '<span class="tag">' + esc(p.location) + '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('familySlider');
    if (slider) {
        slider.addEventListener('input', function () {
            document.getElementById('familyCount').textContent = this.value;
        });
    }
    calculatePremium();
    renderDependants();
    renderPolicyCard();
    renderFuneralNetwork();
    renderNotices();
});