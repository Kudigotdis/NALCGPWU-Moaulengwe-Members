/* =====================================================
   1. BENEFIT SERVICES (9) - render + detail modals
   ===================================================== */
window.BOPEU_SERVICES = [
    {
        id: "bursary", icon: "🎓", title: "Educational Bursaries",
        desc: "Interest-free financial assistance for academic advancement and skills development.",
        chips: ["0% Interest", "24 Months", "P 30,000 Max"],
        what: "The BOPEU Educational Bursary is a dedicated interest-free financial assistance program for union members pursuing short and long-term educational courses. Approved uses: tuition fees, accommodation related to studies, educational books & materials, and academic research costs.",
        who: "Fully registered and active BOPEU member, consistently subscribed for a minimum of 6 months, and able to repay within 24 months.",
        docs: "Request the application form from info@bopeu.org.bw, then submit: Certified Omang, most recent payslip, official admission letter, valid quotation/invoice.",
        cta: "Apply Now"
    },
    {
        id: "lifestyle", icon: "🛍️", title: "Lifestyle Discounts",
        desc: "Exclusive member-only savings on shopping, travel and accommodation.",
        chips: ["Retail & Hotels", "Partner Network", "Present Card"],
        what: "BOPEU members enjoy exclusive discounts at selected retailers and hotels. Present your BOPEU membership card at participating outlets to save instantly.",
        who: "All active BOPEU members with a valid digital or physical membership card.",
        docs: "No documents required — just show your BOPEU membership card.",
        cta: "My Discount Card"
    },
    {
        id: "utilities", icon: "📱", title: "Utilities (Airtime & Building)",
        desc: "Flexible airtime and subsidised building material schemes to stay connected and build.",
        chips: ["Airtime Scheme", "Archein Hardware", "No Deposit"],
        what: "Flexible schemes that help you stay connected and invest in your home infrastructure. The Archein Hardware partnership provides subsidised building materials with no deposit and nationwide delivery.",
        who: "Active BOPEU members. Building materials up to P 200,000 with 4% monthly interest on a reduced balance over 36 months.",
        docs: "Omang, payslip and confirmation of employment letter for building materials.",
        cta: "Open Form"
    },
    {
        id: "finance", icon: "🏦", title: "Finance (Babereki SACCOS)",
        desc: "Cooperative savings and credit solutions tailored to your financial growth.",
        chips: ["Savings", "Credit", "Growth"],
        what: "Unlock cooperative savings and credit solutions through Babereki SACCOS, built to support the financial growth of public employees.",
        who: "Active BOPEU members in good standing.",
        docs: "Loan form, bank statement, payslip, Omang, confirmation of employment.",
        cta: "Open Form"
    },
    {
        id: "insurance", icon: "🛡️", title: "BOPEU Funeral Cover",
        desc: "Peace of mind and dignified support, underwritten by Bona Life.",
        chips: ["P 65,000 Core", "1% of Salary", "No Medical Tests"],
        what: "The Group funeral scheme provides discounted covers for BOPEU members. Subscription is 1% of basic salary (capped P 50.00 - P 120.00). Compulsory core cover protects the member, spouse and children under 21, with optional parent, extended-family and adult-child covers, plus a 12-month premium-waiver option.",
        who: "All active BOPEU members enrolling via payroll stop-order. Immediate family includes spouse and children under 21; extended family covers are optional.",
        docs: "Basic salary (auto from payslip), dependant dates of birth, beneficiary details.",
        cta: "Open Calculator"
    },
    {
        id: "assistance", icon: "🤝", title: "Financial Assistance",
        desc: "Emergency loans and financial advisory services for your economic stability.",
        chips: ["Quick Loans", "48hr Turnaround", "Advisory"],
        what: "Emergency loans and financial advisory services to support your economic stability when you need it most.",
        who: "Active members with a minimum of 6 months consistent subscription.",
        docs: "Loan form, payslip, Omang, confirmation of employment.",
        cta: "Open Form"
    },
    {
        id: "legal", icon: "⚖️", title: "Legal Representation",
        desc: "We stand up for members at the workplace, sectoral and national levels.",
        chips: ["Up to Apex Court", "Constitution-Guided", "Member Support"],
        what: "Legal representation on labour matters as guided by the union constitution, from workplace disputes right up to the Apex Court.",
        who: "All BOPEU members in good standing.",
        docs: "Raise a grievance via the Help tab to request legal assistance.",
        cta: "Request Support"
    },
    {
        id: "dispute", icon: "🗣️", title: "Dispute Resolution",
        desc: "Representation and support in workplace dispute resolution.",
        chips: ["Workplace Disputes", "Grievances", "Fair Process"],
        what: "We stand up for members by representing and supporting them in the resolution of workplace disputes, ensuring rights, dignity and conditions of service are protected.",
        who: "All BOPEU members facing workplace conflict or unfair treatment.",
        docs: "Description of the dispute, supporting documents, urgency flag.",
        cta: "Raise Grievance"
    },
    {
        id: "organizing", icon: "🤝", title: "Organizing & Collective Bargaining",
        desc: "Recruit, organise and mobilise — negotiate better wages and conditions.",
        chips: ["Collective Power", "Wage Negotiation", "Social Justice"],
        what: "We recruit, organise and mobilise public employees to strengthen unity and collective power, and negotiate with employers for better salaries, benefits and fair conditions of service.",
        who: "All current and prospective public sector employees.",
        docs: "Contact your nearest BOPEU office or shop steward.",
        cta: "Find an Office"
    }
];

function renderBenefits() {
    const container = document.getElementById('benefitsList');
    if (!container) return;
    let html = '';
    BOPEU_SERVICES.forEach(s => {
        html +=
            '<div class="service-tile" onclick="openBenefitDetail(\'' + s.id + '\')">' +
            '<div class="service-icon">' + s.icon + '</div>' +
            '<div>' +
            '<div class="service-title">' + esc(s.title) + '</div>' +
            '<div class="service-desc">' + esc(s.desc) + '</div>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

function toggleBenefitAccordion(head) {
    const card = head.closest && head.closest('.acc');
    if (!card) return;
    const willOpen = !card.classList.contains('open');
    const openCards = document.querySelectorAll('#tab-benefits .acc.open');
    for (let i = 0; i < openCards.length; i++) {
        if (openCards[i] !== card) openCards[i].classList.remove('open');
    }
    card.classList.toggle('open', willOpen);
}

function toggleHelpAccordion(head) {
    const card = head.closest && head.closest('.acc');
    if (!card) return;
    const willOpen = !card.classList.contains('open');
    const openCards = document.querySelectorAll('#tab-help .acc.open');
    for (let i = 0; i < openCards.length; i++) {
        if (openCards[i] !== card) openCards[i].classList.remove('open');
    }
    card.classList.toggle('open', willOpen);
}

function openBenefitDetail(serviceId) {
    const svc = BOPEU_SERVICES.find(s => s.id === serviceId);
    if (!svc) return;
    const body = document.getElementById('benefitModalBody');
    document.getElementById('benefitModalTitle').textContent = 'Benefit Details';
    body.innerHTML =
        '<div class="service-icon" style="width:52px;height:52px;font-size:24px;margin-bottom:10px;">' + svc.icon + '</div>' +
        '<h3 style="font-size:15px;color:var(--text-dark);margin-bottom:2px;">' + esc(svc.title) + '</h3>' +
        '<p style="font-size:11px;color:var(--text-muted);margin-bottom:10px;line-height:1.4;">' + esc(svc.desc) + '</p>' +
        '<div class="stat-chips">' + svc.chips.map(c => '<span class="stat-chip">' + esc(c) + '</span>').join('') + '</div>' +
        '<details class="accordion"><summary>What is it & what does it cover?</summary><div class="accordion-inner">' + esc(svc.what) + '</div></details>' +
        '<details class="accordion"><summary>Who qualifies?</summary><div class="accordion-inner">' + esc(svc.who) + '</div></details>' +
        '<details class="accordion"><summary>Required documents</summary><div class="accordion-inner">' + esc(svc.docs) + '</div></details>' +
        '<button class="btn btn-primary" style="margin-top:10px;" onclick="benefitModalAction(\'' + svc.id + '\')">' + esc(svc.cta) + '</button>';
    openModal('benefit-modal');
}

function benefitModalAction(serviceId) {
    closeModal('benefit-modal');
    if (serviceId === 'bursary') openForm('bursary');
    else if (serviceId === 'utilities') openForm('building');
    else if (serviceId === 'finance') openForm('loan');
    else if (serviceId === 'insurance') { switchTab(2); setTimeout(function(){ const el = document.getElementById('calcSection'); if (el) el.scrollIntoView(); }, 120); }
    else if (serviceId === 'assistance') openForm('loan');
    else if (serviceId === 'dispute') openForm('grievance');
    else if (serviceId === 'legal') openForm('grievance');
    else if (serviceId === 'organizing' || serviceId === 'lifestyle') switchTab(3);
}

/* =====================================================
   2. METROPOLITAN FUNERAL COVER + DEPENDANTS
   ===================================================== */
function getDependants() {
    const profile = loadOnboarding();
    if (profile && profile.funeral && Array.isArray(profile.funeral.dependants)) return profile.funeral.dependants;
    const saved = LocalStore.get('bopeu_funeral_dependants');
    return saved && Array.isArray(saved) ? saved : [];
}

function saveDependants(list) {
    LocalStore.set('bopeu_funeral_dependants', list);
    const profile = loadOnboarding();
    if (profile) {
        profile.funeral = profile.funeral || {};
        profile.funeral.dependants = list;
        LocalStore.set('bopeu_profile', profile);
    }
}

function dependantBenefit(relation, dob) {
    if (relation.indexOf('Child') === 0) {
        const bracket = childBracketFor(relation, dob);
        return bracket ? bracket.cover : 'P 15,000';
    }
    return 'P 60,000';
}

function renderFuneral() {
    const coverBox = document.getElementById('funeralCore');
    const subBox = document.getElementById('funeralSubscription');
    const dependants = document.getElementById('funeralDependants');
    if (!coverBox && !subBox && !dependants) return;

    let salary = 0;
    const profile = loadOnboarding();
    const salaryEl = document.getElementById('funSalary');
    if (salaryEl) {
        salary = parseFloat(salaryEl.value) || 0;
    } else if (profile && profile.funeral) {
        salary = profile.funeral.basicSalary || 0;
    }

    const sub = funeralSubscription(salary);
    if (subBox) {
        subBox.innerHTML = 'P ' + sub.toFixed(2) + '<div class="stat-label">1% of basic salary (min P 39.90 &middot; max P 100.00)' + (salary > 0 ? ' &middot; on P ' + salary.toLocaleString() : '') + '</div>';
    }
    if (coverBox) {
        coverBox.innerHTML = 'P 60,000<div class="stat-label">Core cover - member, spouse & children under 21</div>';
    }

    if (dependants) renderDependants(dependants);
}

function renderFuneralTable() {
    const container = document.getElementById('funeralBenefitTable');
    if (!container) return;
    container.innerHTML =
        '<table class="benefit-table">' +
        '<tr><th>Age Group</th><th>Benefit</th></tr>' +
        '<tr><td>Main Member / Spouse / Parent</td><td>P 60,000</td></tr>' +
        '<tr><td>16 - 21 Years</td><td>P 60,000</td></tr>' +
        '<tr><td>7 - 15 Years</td><td>P 30,000</td></tr>' +
        '<tr><td>0 - 6 Years</td><td>P 15,000</td></tr>' +
        '</table>' +
        '<p style="font-size:10px;color:var(--text-muted);margin-top:6px;">Includes 12-month premium waiver. No medical tests. Minimal red tape.</p>';
}

function renderDependants(container) {
    if (!container) return;
    const list = getDependants();
    if (!list.length) {
        container.innerHTML = '<div class="empty-state">No dependants added yet. Add your spouse, children (under 21) or extended family to the funeral cover.</div>';
        return;
    }
    let html = '';
    list.forEach(dep => {
        html +=
            '<div class="member-card dismissable">' +
            '<button type="button" class="card-x" onclick="removeFunDependant(\'' + dep.id + '\')" aria-label="Remove ' + esc(dep.name) + '">&times;</button>' +
            '<div class="member-avatar">' + initialsOf(dep.name) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(dep.name) + '</div>' +
            '<div class="member-details">' + esc(dep.relation) + (dep.childBracket ? ' (' + esc(dep.childBracket) + ')' : '') + ' &bull; ' + esc(dep.cover) + '</div>' +
            '</div></div>';
    });
    container.innerHTML = html;
}

function addFunDependant() {
    const name = document.getElementById('funDepName').value.trim();
    const relation = document.getElementById('funDepRelation').value;
    const dob = document.getElementById('funDepDob').value;

    if (!name) { toast('Please enter the dependant\'s full name.'); return; }

    let finalRelation = relation;
    let bracket = '';
    if (relation === 'Child') {
        bracket = childBracketFromDob(dob);
        if (!bracket) { toast('Children on the funeral cover must be under 21 years of age.'); return; }
        finalRelation = bracket.key;
    }

    const member = {
        id: 'fun' + Date.now().toString(36),
        name: name,
        relation: finalRelation,
        dob: dob,
        childBracket: finalRelation.indexOf('Child') === 0 ? finalRelation : '',
        cover: dependantBenefit(finalRelation, dob)
    };

    const maxChildren = BOPEU_FUNERAL.maxChildren;
    const list = getDependants();
    const childCount = list.filter(d => d.relation.indexOf('Child') === 0).length;
    if (finalRelation.indexOf('Child') === 0 && childCount >= maxChildren) {
        toast('Maximum of ' + maxChildren + ' children per funeral cover.');
        return;
    }

    list.push(member);
    saveDependants(list);
    document.getElementById('funDepName').value = '';
    if (document.getElementById('funDepDob')) document.getElementById('funDepDob').value = '';
    renderFuneral();
    renderProfileReview();
    toast(member.relation + ' added to funeral cover (' + member.cover + ').');
}

function removeFunDependant(id) {
    const list = getDependants().filter(d => d.id !== id);
    saveDependants(list);
    renderFuneral();
    renderProfileReview();
}

document.addEventListener('DOMContentLoaded', () => {
    renderBenefits();
    renderFuneral();
    renderFuneralTable();
    renderProfileSummary();
    renderMemberCard();
    renderPartnerBenefitsSection();
    if (typeof renderCalculatorLaunchers === 'function') {
        try { renderCalculatorLaunchers(); } catch (e) {}
    }
});

/* =====================================================
   3. DIGITAL MEMBER CARD + PARTNER DISCOUNTS
   ===================================================== */
function renderProfileReview() {
    renderProfileSummary();
}

/* QR grid (9x9 seeded, same generator as Bopeu2 reference) */
function buildQrGrid(targetId, seed) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = '';
    const N = 9;
    let s = 0;
    for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) % 99991;
    for (let i = 0; i < N * N; i++) {
        const cell = document.createElement('i');
        s = (s * 1103515245 + 12345) % 2147483648;
        const on = (s % 100) > 48;
        if (!on) cell.className = 'off';
        el.appendChild(cell);
    }
}

function showQrFullscreen() {
    document.getElementById('qrFullseed').textContent = currentMemberNo();
    openModal('qr-modal');
}

function downloadMemberCard() {
    const p = loadOnboarding();
    const name = p ? (p.personal.firstName + ' ' + p.personal.surname) : 'BOPEU Member';
    toast(downloadCard ? 'Membership card PDF will be downloaded to your device.\n\n' + currentMemberNo() + ' \u00b7 ' + name : 'Download triggered.');
}

function renderMemberCard() {
    const container = document.getElementById('memberCard');
    if (!container) return;
    const profile = loadOnboarding();
    const name = profile ? (profile.personal.firstName + ' ' + profile.personal.surname) : 'BOPEU Member';
    const memberNo = currentMemberNo();
    const surname = profile && profile.personal.surname ? profile.personal.surname : name.split(' ').pop();
    const sector = profile ? (profile.employment.sectorLabel || 'Public Employee') : 'Public Employee';
    const status = profile ? (profile.status || 'pending_verification') : 'active';
    const office = profile && profile.location && profile.location.workStation ? profile.location.workStation : 'Gaborone';
    const joined = profile && profile.joined ? profile.joined : '—';
    const initials = initialsOf(name);
    const expiry = (new Date().getFullYear() + 2) + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');

    container.innerHTML =
        '<div class="digital-card">' +
        '<div class="dc-head">' +
        '<div class="dc-brand">BOPEU<small>BOTSWANA PUBLIC EMPLOYEES UNION</small></div>' +
        '<div style="font-size:10px;opacity:.8;">MEMBER</div>' +
        '</div>' +
        '<div class="dc-body">' +
        '<div class="dc-photo">' + esc(initials) + '</div>' +
        '<div class="dc-info">' +
        '<div class="dc-name">' + esc(name) + '</div>' +
        '<div class="dc-no">' + esc(memberNo) + '</div>' +
        '<div class="dc-meta">' + esc(sector) + '<br>Station: ' + esc(office) + ' \u00b7 Member since: ' + esc(joined) + ' \u00b7 Valid until: ' + esc(expiry) + '</div>' +
        '</div>' +
        '<div class="dc-qr" id="qrGrid" title="Tap to enlarge" onclick="showQrFullscreen()"></div>' +
        '</div>' +
        '<div style="position:relative;z-index:1;margin-top:10px;"><span class="tag ' + (status === 'active' ? 'green' : 'amber') + '" style="background:rgba(255,255,255,.2);color:#fff;">' + (status === 'active' ? 'ACTIVE MEMBER' : 'PENDING VERIFICATION') + '</span></div>' +
        '</div>';

    buildQrGrid('qrGrid', memberNo);

    container.innerHTML +=
        '<div class="btn-row">' +
        '<button class="btn btn-primary" onclick="showQrFullscreen()">Show QR Fullscreen</button>' +
        '<button class="btn btn-secondary" onclick="downloadMemberCard()">Download PDF</button>' +
        '</div>';

    container.innerHTML +=
        '<div class="qr-grid">Scan the QR code to verify your membership at BOPEU-affiliated partners and offices. Funeral cover (Bona Life): member &amp; spouse P65,000 core at 1% of basic salary (capped P50.00 \u2013 P120.00).</div>';
}

/* =====================================================
   3b. PARTNER BENEFIT NETWORK (Benefits tab)
   ===================================================== */

/* Partner Benefits network — renders on the Benefits tab */
function renderPartnerBenefitsSection() {
    const container = document.getElementById('partnerBenefitSection');
    if (!container) return;
    container.innerHTML =
        '<div class="partner-intro"><h3 id="partnerCount">16 Member Benefit Partners</h3></div>' +
        '<div class="partner-filter">' +
        '<button type="button" class="chip-btn active" data-cat="All" onclick="filterPartners(\'All\', this)">All</button>' +
        '<button type="button" class="chip-btn" data-cat="Health" onclick="filterPartners(\'Health\', this)">Health</button>' +
        '<button type="button" class="chip-btn" data-cat="Finance" onclick="filterPartners(\'Finance\', this)">Finance</button>' +
        '<button type="button" class="chip-btn" data-cat="Insurance" onclick="filterPartners(\'Insurance\', this)">Insurance</button>' +
        '<button type="button" class="chip-btn" data-cat="Hardware" onclick="filterPartners(\'Hardware\', this)">Hardware</button>' +
        '<button type="button" class="chip-btn" data-cat="Travel" onclick="filterPartners(\'Travel\', this)">Travel</button>' +
        '<button type="button" class="chip-btn" data-cat="Telecom" onclick="filterPartners(\'Telecom\', this)">Telecom</button>' +
        '</div>' +
        '<div id="partnerList"></div>';
    renderPartnerList('All');
}

let activePartnerFilter = 'All';

function filterPartners(category, btn) {
    activePartnerFilter = category;
    document.querySelectorAll('#partnerBenefitSection .chip-btn').forEach(b => {
        b.classList.toggle('active', btn && btn.classList ? (b === btn) : (b.getAttribute('data-cat') === category));
    });
    renderPartnerList(category);
    updatePartnerCount(category);
}

function updatePartnerCount(category) {
    const el = document.getElementById('partnerCount');
    if (!el) return;
    if (category === 'All') {
        el.textContent = BOPEU_BENEFIT_PARTNERS.length + ' Member Benefit Partners';
        return;
    }
    const n = BOPEU_BENEFIT_PARTNERS.filter(p => p.sector === category).length;
    el.textContent = n + ' ' + category + (n === 1 ? ' Partner' : ' Partners');
}

function partnerStatusBadge(p) {
    const confirmed = p.status === 'verified';
    const label = confirmed ? 'Confirmed' : 'Apply';
    const cls = confirmed ? 'verified' : 'coming';
    return '<span class="partner-status ' + cls + '">' + label + '</span>';
}

function renderPartnerList(filter) {
    const container = document.getElementById('partnerList');
    if (!container) return;
    const list = filter === 'All' ? BOPEU_BENEFIT_PARTNERS : BOPEU_BENEFIT_PARTNERS.filter(p => p.sector === filter);
    if (!list.length) {
        container.innerHTML = '<div class="empty-state">No partners in this category yet.</div>';
        return;
    }
    let html = '';
    list.forEach(p => {
        html +=
            '<div class="partner-tile" data-cat="' + esc(p.sector) + '" onclick="openPartnerDetail(\'' + p.id + '\')">' +
            '<div class="partner-logo-img">' + (p.logo ? '<img src="' + p.logo + '" alt="' + esc(p.name) + '" onerror="this.outerHTML=\'<div class=&quot;no-logo&quot;>' + esc(p.icon) + '</div>\';">' : '<div class="no-logo">' + esc(p.icon) + '</div>') + '</div>' +
            '<div class="pt-info">' +
            '<div class="pt-name">' + esc(p.name) + '</div>' +
            '<div class="pt-disc">' + esc(p.discount) + '</div>' +
            '</div>' +
            partnerStatusBadge(p) +
            '</div>';
    });
    container.innerHTML = html;
}

function openPartnerDetail(id) {
    const p = BOPEU_BENEFIT_PARTNERS.find(x => x.id === id);
    if (!p) return;
    const body = document.getElementById('benefitModalBody');
    document.getElementById('benefitModalTitle').textContent = 'Benefit Details';
    let extra = '';
    const notes = [];
    if (p.validity) notes.push('Validity: ' + p.validity);
    if (p.lastVerified) notes.push('Last verified: ' + p.lastVerified);
    if (p.terms) notes.push('Terms & Conditions: ' + p.terms);
    if (notes.length) {
        extra = '<details class="accordion"><summary>Validity, terms & verification</summary><div class="accordion-inner">' +
            notes.map(n => esc(n)).join('<br><br>') +
            '</div></details>';
    }
    body.innerHTML =
        '<div class="pd-hero">' +
        '<div class="partner-logo-img">' + (p.logo ? '<img src="' + p.logo + '" alt="' + esc(p.name) + '">' : '<div class="no-logo">' + esc(p.icon) + '</div>') + '</div>' +
        '<div><h3>' + esc(p.name) + '</h3><p>' + esc(p.category || p.sector) + '</p>' + partnerStatusBadge(p) + '</div>' +
        '</div>' +
        '<div class="stat-chips"><span class="stat-chip">' + esc(p.discount) + '</span></div>' +
        '<details class="accordion" open><summary>Details</summary><div class="accordion-inner">' + esc(p.detail) + '</div></details>' +
        '<details class="accordion"><summary>How to claim / access</summary><div class="accordion-inner">' + esc(p.how) + '</div></details>' +
        extra +
        '<button class="btn btn-primary" style="margin-top:10px;" onclick="whatsappShare(\'BOPEU member checking ' + esc(p.name) + ' benefits.\')">Ask on WhatsApp</button>';
    openModal('benefit-modal');
}