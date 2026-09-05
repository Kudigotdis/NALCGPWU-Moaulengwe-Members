/* =====================================================
   1. PREMIUM CALCULATOR
===================================================== */
function calculatePremium() {
    const coverTier = document.getElementById('coverTier').value;
    const ageBand = document.getElementById('ageBand').value;
    const familyCount = parseInt(document.getElementById('familySlider').value, 10) || 1;

    document.getElementById('familyCount').textContent = familyCount;

    const premiumMap = {
        '5000': { low: 10, mid: 18, high: 24 },
        '10000': { low: 20, mid: 36, high: 49 },
        '15000': { low: 30, mid: 55, high: 73 },
        '20000': { low: 40, mid: 73, high: 97 },
        '25000': { low: 50, mid: 91, high: 122 },
        '30000': { low: 61, mid: 109, high: 146 },
        '40000': { low: 81, mid: 146, high: 195 }
    };

    const map = premiumMap[coverTier] || premiumMap['40000'];
    const basePremium = map[ageBand] || map.low;
    const totalPremium = 30 + (basePremium * familyCount);

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
        html +=
            '<div class="member-card">' +
            '<div class="member-avatar">' + initialsOf(dep.name) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(dep.name) + '</div>' +
            '<div class="member-details">' + esc(dep.relation) + ' &bull; Cover: ' + esc(dep.cover) + '</div>' +
            '<div class="member-tags">' +
            '<span class="tag ' + (dep.status === 'active' ? 'green' : 'amber') + '">' + (dep.status === 'active' ? 'Active' : dep.status === 'pending' ? 'Activating' : 'Pending') + '</span>' +
            '</div>' +
            '</div>' +
            '<button class="btn btn-secondary btn-small" style="flex:0 0 auto; width:auto;" onclick="removeDependant(\'' + dep.id + '\')">Remove</button>' +
            '</div>';
    });
    container.innerHTML = html;
}

function addDependant() {
    const name = document.getElementById('depName').value.trim();
    const relation = document.getElementById('depRelation').value;

    if (!name) {
        toast('Please enter the dependant\'s full name.');
        return;
    }

    const coverMap = {
        'Spouse': 'P 40,000 / P 60,000',
        'Child (0-5)': 'P 15,000',
        'Child (6-15)': 'P 30,000',
        'Child (16-21)': 'P 40,000',
        'Parent': 'P 40,000 / P 60,000'
    };

    const list = getDependants();
    list.push({
        id: 'dep' + Date.now(),
        name,
        relation,
        cover: coverMap[relation] || 'P 40,000',
        status: 'pending'
    });

    saveDependants(list);
    document.getElementById('depName').value = '';
    renderDependants();
    renderPolicyCard();
    toast('Dependant added. Extended family coverage activates after 6 consecutive deductions.');
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

    container.innerHTML =
        '<div class="policy-card">' +
        '<div class="policy-row"><span class="policy-row-label">Policy</span><span class="policy-row-value red">Mokaulengwe Benefit</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Member</span><span class="policy-row-value">' + esc(memberName) + '</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Main Member Cover</span><span class="policy-row-value">P 40,000 / P 60,000</span></div>' +
        '<div class="policy-row"><span class="policy-row-label">Family Members</span><span class="policy-row-value">' + activeDeps + ' active' + (pendingDeps ? ' &bull; ' + pendingDeps + ' activating' : '') + '</span></div>' +
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