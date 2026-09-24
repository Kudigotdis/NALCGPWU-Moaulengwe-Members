/* =====================================================
   BOPEU INSURANCE CALCULATORS  (js/calculators.js)
   Live premium calculators rebuilt for the BOPEU demo.
   All rate tables are pulled from the official 2026
   application forms (Bona Life funeral scheme & BLIC
   Extended Family) and render inside the Benefits tab's
   calculator modal, reskinned red/white/muted-grey with
   the form-partner logos drawn from Assets\logo\forms\.
   -----------------------------------------------------
   Shared rate tables
   -----------------------------------------------------
   EXTRA_COVER_RATES (P per month, plain | premium-waiver)
   -----------------------------------------------------
   P5,000   ->  17.10 | 18.40
   P7,500   ->  25.60 | 27.50
   P10,000  ->  34.10 | 36.70
   P15,000  ->  51.10 | 54.90
   P20,000  ->  68.10 | 73.20
   P25,000  ->  85.20 | 91.50
   P30,000  -> 102.10 | 109.70
   P40,000  -> 136.30 | 146.30
   P50,000  -> 170.20 | 183.00
   -----------------------------------------------------
   MEMBER_COVER_RATES (member/spouse/parent, plain | pw)
   P20,000  ->  24.70 | 26.50
   P30,000  ->  37.00 | 39.70
   P40,000  ->  49.30 | 53.10
   P50,000  ->  61.70 | 66.30
   P75,000  ->  92.50 | 99.50
   P100,000 -> 123.30 | 132.50
   -----------------------------------------------------
   CHILD_COVER_RATES (three bands, no premium-waiver)
   P30,000  ->    8.50   (birth - 6 years)
   P40,000  ->   11.30   (7 - 15 years)
   P50,000  ->   14.10   (16 - 21 years)
   -----------------------------------------------------
   ===================================================== */
const CALC_EXTRA_RATES = [
    { cover: 5000, plain: 17.10, pw: 18.40 },
    { cover: 7500, plain: 25.60, pw: 27.50 },
    { cover: 10000, plain: 34.10, pw: 36.70 },
    { cover: 15000, plain: 51.10, pw: 54.90 },
    { cover: 20000, plain: 68.10, pw: 73.20 },
    { cover: 25000, plain: 85.20, pw: 91.50 },
    { cover: 30000, plain: 102.10, pw: 109.70 },
    { cover: 40000, plain: 136.30, pw: 146.30 },
    { cover: 50000, plain: 170.20, pw: 183.00 }
];

const CALC_MEMBER_RATES = [
    { cover: 20000, plain: 24.70, pw: 26.50 },
    { cover: 30000, plain: 37.00, pw: 39.70 },
    { cover: 40000, plain: 49.30, pw: 53.10 },
    { cover: 50000, plain: 61.70, pw: 66.30 },
    { cover: 75000, plain: 92.50, pw: 99.50 },
    { cover: 100000, plain: 123.30, pw: 132.50 }
];

const CALC_CHILD_RATES = [
    { cover: 30000, plain: 8.50, label: 'birth \u2013 6 years' },
    { cover: 40000, plain: 11.30, label: '7 \u2013 15 years' },
    { cover: 50000, plain: 14.10, label: '16 \u2013 21 years' }
];

const CALC_FORM_LOGO = 'Assets/logo/forms/';
const CALC_LOGO_STRIP =
    '<div class="calc-logo-strip">' +
    '<img src="' + CALC_FORM_LOGO + 'bopeu_logo.webp" alt="BOPEU" class="calc-form-logo" onerror="this.style.display=\'none\';">' +
    '<img src="' + CALC_FORM_LOGO + 'bona_life_logo.webp" alt="Bona Life" class="calc-form-logo" onerror="this.style.display=\'none\';">' +
    '<img src="' + CALC_FORM_LOGO + 'blic_logo.webp" alt="BLIC" class="calc-form-logo" onerror="this.style.display=\'none\';">' +
    '</div>';

/* =====================================================
   LAUNCHERS (rendered into #calcLaunchers)
   ===================================================== */
const CALC_LAUNCHERS = [
    { id: 'membership', icon: 'P', title: 'Membership Calculator', desc: '1% of basic salary, capped P50.00 \u2013 P120.00', logo: CALC_FORM_LOGO + 'bopeu_logo.webp', cta: 'Open', file: 'calculators/BOPEU_BABEREKI_MEMBERSHIP  APPLICATION FORM.html', launcher: "BOPEU has negotiated its own membership subscriptions into your salary payroll stop-order, so the calculator below simply derives 1% of your basic salary (floored P50.00, capped P120.00) \u2014 exactly what Payroll publishes on your payslip." },
    { id: 'funeral', icon: 'F', title: 'Funeral Cover \u2013 New Family', desc: 'Bona Life \u00b7 member, spouse & children', logo: CALC_FORM_LOGO + 'bona_life_logo.webp', cta: 'Open', file: 'calculators/BOPEU_FAMILY - EXTENDED FAMILY.html', launcher: "Core funeral cover for the member, spouse and children under 21 \u2014 subscription is 1% of basic salary (capped P50.00 \u2013 P120.00). Children carry their own benefit bands; parents and extended family are optional extras." },
    { id: 'amendment', icon: 'A', title: 'Funeral Cover \u2013 Amendment', desc: 'Change your compulsory premium schedule', logo: CALC_FORM_LOGO + 'bona_life_logo.webp', cta: 'Open', file: 'calculators/BOPEU_BABEREKI_AMMENDMENT FORM.html', launcher: "Amending an existing compulsory cover \u2014 the 1% fee moves to the flat P66.40 premium with the same P65,000 core, re-scoped for parents, extended family and adult children." },
    { id: 'extended', icon: 'E', title: 'BLIC Extended Family', desc: 'Optional \u2013 parents, extended family & adult children', logo: CALC_FORM_LOGO + 'blic_logo.webp', cta: 'Open', file: 'calculators/BOPEU_BLIC_FAMILY - EXTENDED FAMILY.html', launcher: "BLIC optional covers for parents, extended family and adult children, built on the verified annual premium schedule with a compulsory contribution of P61.70 (P66.40 with premium waiver)." },
    { id: 'gla', icon: 'G', title: 'GLA Nomination of Beneficiaries', desc: 'Allocate your Group Life benefit', logo: CALC_FORM_LOGO + 'blic_logo.webp', cta: 'Open', file: 'calculators/BOPEU_BLIC-APPLICATION - GROUP LIFE ASSURANCE NOMINATION OF BENEFICIARIES.html', launcher: "Nominate who receives your Group Life benefit. Allocations must total exactly 100% and every nomination is captured on a signature pad before you submit." },
    { id: 'kyc', icon: 'K', title: 'Know Your Customer (KYC)', desc: 'Identity, address & contact verification', logo: CALC_FORM_LOGO + 'bopeu_logo.webp', cta: 'Open', file: 'calculators/BOPEU_BLIC-KNOW YOUR CUSTOMER.html', launcher: "A 4-section KYC check \u2014 identity, address & contact, employment and declaration \u2014 with live progress bars and a branded signature pad." }
];

function renderCalculatorLaunchers() {
    const container = document.getElementById('calcLaunchers');
    if (!container) return;
    let html = '<div class="calc-launchers">';
    CALC_LAUNCHERS.forEach(l => {
        html +=
            '<a class="calc-launcher" href="' + escAttr(l.file) + '">' +
            '<div class="calc-logo-box">' + (l.logo ? '<img src="' + l.logo + '" alt="' + esc(l.title) + '" onerror="this.outerHTML=\'<div class=&quot;no-logo&quot;>' + esc(l.icon) + '</div>\';">' : '<div class="no-logo">' + esc(l.icon) + '</div>') + '</div>' +
            '<div class="cl-info">' +
            '<div class="cl-title">' + esc(l.title) + '</div>' +
            '<div class="cl-desc">' + esc(l.desc) + '</div>' +
            '</div>' +
            '</a>';
    });
    html += '</div>';
    container.innerHTML = html;
}

function openCalculator(id) {
    const body = document.getElementById('calcBody');
    if (!body) return;
    body.innerHTML = '';
    switch (id) {
        case 'membership': renderMembershipCalc(); break;
        case 'funeral': renderFuneralNewCalc(); break;
        case 'amendment': renderAmendmentCalc(); break;
        case 'extended': renderExtendedCalc(); break;
        case 'gla': renderGlaCalc(); break;
        case 'kyc': renderKycCalc(); break;
        default: return;
    }
    document.querySelector('.calc-shel').scrollTop = 0;
    openModal('calc-modal');
}

function calcUpdateTotals(id) {
    const state = CALC_SHELL_STATE[id];
    if (!state || !state.upt) return;
    state.upt();
}

function calcToMoney(n) {
    return 'P ' + Number(n || 0).toLocaleString('en-BW', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcPill(r, tag, pw) {
    const amount = pw ? r.pw : r.plain;
    return '<span class="benefit-pill">' + esc(tag) + '<b>' + calcToMoney(amount) + '</b><small>/ month</small></span>';
}

function calcPwToggle(stateKey, checked) {
    const p = CALC_SHELL_STATE[stateKey].pw;
    return '<label class="pw-toggle"><input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="calcUpdateTotals(\'' + stateKey + '\')">' +
        '<span class="switch"><b class="switch-track"><i class="switch-knob"></i></b></span>' +
        '<span class="pw">Premium waiver P' + (p || 0).toFixed(2) + '</span></label>';
}

function calcFormSection(title, innerHtml) {
    return '<section class="acc"><section class="acc-head"><span class="acc-title">' + esc(title) + '</span><span class="acc-total" id="">&nbsp;</span><em>+</em></section><section class="acc-body">' + innerHtml + '</section></section>';
}

function escSame(v) { return esc(v); }

/** Builds a benefit-band field for cover selection. */
function calcCoverField(stateKey, section, label) {
    const state = CALC_SHELL_STATE[stateKey];
    const val = state[section];
    const rates = state.rates[section] || [];
    let html = '<label class="field">' + esc(label || '') + '<select onchange="calcSetCover(\'' + stateKey + '\',\'' + section + '\',this.value)">';
    rates.forEach(r => {
        const sel = String(r.cover) === String(val.cover) ? ' selected' : '';
        html += '<option value="' + escAttr(String(r.cover)) + '"' + sel + '>' + esc(r.label || 'P' + r.cover.toLocaleString()) + '</option>';
    });
    html += '</select></label>';
    return html;
}

function calcSetCover(stateKey, section, coverStr) {
    const state = CALC_SHELL_STATE[stateKey];
    if (!state) return;
    const rates = state.rates[section] || [];
    const r = rates.find(x => String(x.cover) === coverStr);
    if (r) state[section].cover = r.cover;
    calcUpdateTotals(stateKey);
    calcRender(stateKey);
}

/* =====================================================
   SHARED SHELL + RATE-STATE registry
   ===================================================== */
const CALC_SHELL_STATE = {};

function calcShell(title, stateKey) {
    CALC_SHELL_STATE[stateKey] = CALC_SHELL_STATE[stateKey] || {};
    return '<article class="calc-shel">' +
        '<header class="calc-shel-titlebar"><button type="button" class="cl-close" onclick="closeModal(\'calc-modal\')">\u2715</button><span class="cl-title">' + esc(title) + '</span></header>' +
        '<div class="calc-shel-body">' +
        CALC_LOGO_STRIP +
        '<div class="calc-minihero">' + esc(CALC_LAUNCHERS.find(l => l.id === stateKey) ? (CALC_LAUNCHERS.find(l => l.id === stateKey).launcher || '') : '') + '</div>';
}

function calcFooter(stateKey) {
    return '<div class="calc-disclaimer">BOPEU Insurance\nPremium calculators for demonstration. Rates are pulled from the current official BOPEU application forms; final premiums are subject to payroll capture and the underwriter\'s acceptance.</div></article>';
}

function calcRender(stateKey) {
    const fn = CALC_SHELL_RENDER[stateKey];
    if (!fn) return;
    const body = document.getElementById('calcBody');
    body.innerHTML = fn();
}

function calcSub(basic, capMin, capMax) {
    const raw = basic * 0.01;
    if (capMin != null && raw < capMin) return capMin;
    if (capMax != null && raw > capMax) return capMax;
    return raw;
}

function calcChildBenefit(dob) {
    if (!dob) return { cover: 30000, label: 'under 7 (P30,000)' };
    const age = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000));
    if (age <= 6) return { cover: 30000, label: '0 \u2013 6 years (P30,000)' };
    if (age <= 15) return { cover: 40000, label: '7 \u2013 15 years (P40,000)' };
    return { cover: 50000, label: '16 \u2013 21 years (P50,000)' };
}

const CALC_SHELL_RENDER = {};

function calcSignaturePad(stateKey) {
    return '<div class="calc-sig-wrap" id="sigWrap' + stateKey + '">' +
        '<div class="subhead">Signature</div>' +
        '<div class="calc-sig-hint">Sign with your finger on the pad below.</div>' +
        '<canvas class="calc-sig-pad" id="calcSig' + stateKey + '"></canvas>' +
        '<div class="calc-sig-actions">' +
        '<button type="button" class="btn btn-secondary btn-small" onclick="clearCalcSignature(\'' + stateKey + '\')">Clear</button>' +
        '<button type="button" class="btn btn-primary btn-small" onclick="submitCalculator(\'' + stateKey + '\')">Submit</button>' +
        '</div></div>';
}

function clearCalcSignature(key) {
    const c = document.getElementById('calcSig' + key);
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    CALC_SHELL_STATE[key].signed = false;
    toast('Signature cleared.');
}

function setupCalcSignature(stateKey) {
    const pad = document.getElementById('calcSig' + stateKey);
    if (!pad) return;
    const ctx = pad.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let drawing = false;
    let sx = 0, sy = 0;
    function resize() {
        const rect = pad.getBoundingClientRect();
        pad.width = rect.width * dpr;
        pad.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = '#1A202C';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, rect.width, rect.height);
    }
    function pt(evt) {
        const rect = pad.getBoundingClientRect();
        const t = evt.touches ? evt.touches[0] : evt;
        return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    function down(evt) { evt.preventDefault(); drawing = true; const p = pt(evt); sx = p.x; sy = p.y; }
    function move(evt) {
        if (!drawing) return;
        evt.preventDefault();
        const p = pt(evt);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        sx = p.x; sy = p.y;
        CALC_SHELL_STATE[stateKey].signed = true;
    }
    function up(evt) { evt.preventDefault(); drawing = false; }
    pad.addEventListener('pointerdown', down);
    pad.addEventListener('pointermove', move);
    pad.addEventListener('pointerup', up);
    pad.addEventListener('pointerleave', up);
    resize();
    window.addEventListener('resize', resize);
}

function submitCalculator(stateKey) {
    const state = CALC_SHELL_STATE[stateKey];
    if (state && state.signed !== true) {
        toast('Please sign the declaration before submitting.');
        return;
    }
    toast('Calculator submitted for payroll capture \u00b7 reference BOPEU-' + stateKey.toUpperCase() + '-2026');
    closeModal('calc-modal');
}

/* =====================================================
   CALCULATOR 1  \u2014  MEMBERSHIP CALCULATOR
   ===================================================== */
function renderMembershipCalc() {
    const stateKey = 'membership';
    let st = CALC_SHELL_STATE[stateKey];
    if (!st) {
        st = { salary: 5500, pw: false };   /* pw unused but kept for parity */
        CALC_SHELL_STATE[stateKey] = st;
    }
    CALC_SHELL_RENDER[stateKey] = function () {
        const sub = calcSub(st.salary, 50, 120);
        const profile = loadOnboarding();
        const name = profile ? (profile.personal.firstName + ' ' + profile.personal.surname) : 'BOPEU Member';
        return calcShell('Membership Subscription', stateKey) +
            '<!-- MEMBER DETAILS -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Member Details</span>' +
            '<span class="acc-total" id="memCalcTotal">' + calcToMoney(sub) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="stat-chips"><span class="stat-chip">1% of basic salary</span><span class="stat-chip">Floored P50.00</span><span class="stat-chip">Capped P120.00</span></div>' +
            '<label class="field">Basic salary (P)<input type="number" value="' + escAttr(String(st.salary)) + '" min="0" step="0.01" oninput="calcMembershipSalary(this.value)"></label>' +
            '<label class="field">Monthly subscription\n<input type="text" readonly value="' + escAttr(calcToMoney(sub)) + '"></label>' +
            '<div class="calc-statusbar"><div class="sb-top"><span class="sb-lbl">Membership deduction \u00b7 ' + esc(name) + '</span></div>' +
            '<div class="calc-pb-track"><div class="calc-pb-fill" style="width:' + Math.min(100, Math.round((sub / 120) * 100)) + '%;"></div></div>' +
            '</div>' +
            '</section></section>' +
            '<!-- BANKING & DEDUCTION -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Banking &amp; Deduction</span><span class="acc-total">&nbsp;</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<label class="field">Bank account\n<select><option>Babereki SACCOS</option><option>Babereki + FCB Facility</option><option>Access Bank</option><option>Absa</option><option>First Capital Bank</option><option>Other commercial bank</option></select></label>' +
            '<label class="field">Deduction mode\n<select><option>Stop-order from basic salary</option><option>Payroll deduction (public sector)</option><option>Direct debit (bank)</option></select></label>' +
            '</section></section>' +
            '<!-- SUMMARY -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Summary</span><span class="acc-total">' + calcToMoney(sub) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="sum-row"><span>Subscription (1% capped)</span><span>' + calcToMoney(sub) + '</span></div>' +
            '<div class="sum-row total"><span>Total payroll deduction</span><span>' + calcToMoney(sub) + '</span></div>' +
            '</section></section>' +
            '<!-- DECLARATION -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Declaration</span><span class="acc-total">&nbsp;</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<details class="accordion" open><summary>Scheme notes</summary><div class="accordion-inner">Subscription is 1% of basic salary, floored P50.00 and capped P120.00 \u2014 pulled from your payslip by payroll stop-order.</div></details>' +
            calcSignaturePad(stateKey) +
            '</section></section>' +
            calcFooter(stateKey);
    };
    const body = document.getElementById('calcBody');
    body.innerHTML = CALC_SHELL_RENDER[stateKey]();
    setupCalcSignature(stateKey);
}

function calcMembershipSalary(v) {
    const st = CALC_SHELL_STATE['membership'];
    if (!st) return;
    st.salary = parseFloat(v) || 0;
    calcRender('membership');
    setupCalcSignature('membership');
}

/* =====================================================
   CALCULATOR 2 \u2014 FUNERAL COVER (NEW FAMILY, Bona Life)
   ===================================================== */
function renderFuneralNewCalc() {
    const stateKey = 'funeral';
    let st = CALC_SHELL_STATE[stateKey];
    if (!st) {
        st = {
            basic: 5500,
            pw: false,
            member: 50000,
            spouse: 50000,
            children: [],
            parents: [],
            extended: []
        };
        CALC_SHELL_STATE[stateKey] = st;
    }
    CALC_SHELL_RENDER[stateKey] = function () {
        const core = 65000;
        const sub = calcSub(st.basic, 50, 120);
        let childTotal = 0;
        st.children.forEach(c => { childTotal += c.cover; });
        let parentTotal = 0;
        st.parents.forEach(p => { parentTotal += p.cover; });
        let extTotal = 0;
        st.extended.forEach(e => { extTotal += e.cover; });
        const extras = childTotal + parentTotal + extTotal;
        const total = sub + extras;
        return calcShell('Funeral Cover \u2013 Bona Life', stateKey) +
            '<!-- MEMBER & SPOUSE -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Member &amp; Spouse</span><span class="acc-total">' + esc(calcToMoney(sub)) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="stat-chips"><span class="stat-chip">P65,000 core each</span><span class="stat-chip">1% of salary</span><span class="stat-chip">No medical tests</span></div>' +
            '<label class="field">Basic salary (P)<input type="number" value="' + escAttr(String(st.basic)) + '" min="0" step="0.01" oninput="calcFunBasic(this.value)"></label>' +
            '<div class="cost-row"><span>Member &amp; spouse core</span><span class="cost-amt">' + calcToMoney(sub) + '</span></div>' +
            '<div class="cost-row"><span>Core cover</span><span class="cost-amt">P 65,000</span></div>' +
            calcPwToggle(stateKey, st.pw) +
            '</section></section>' +
            '<!-- CHILDREN -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Children (under 21)</span><span class="acc-total">' + calcToMoney(childTotal) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div id="funChildren' + stateKey + '"></div>' +
            '<section class="person addbtn" onclick="calcAddChild()"><span>+ Add child (enters own band)</span></section>' +
            '</section></section>' +
            '<!-- PARENTS -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Parents (optional)</span><span class="acc-total">' + calcToMoney(parentTotal) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div id="funParents' + stateKey + '"></div>' +
            '<section class="person addbtn" onclick="calcAddParent(\'funeral\')"><span>+ Add parent</span></section>' +
            '</section></section>' +
            '<!-- EXTENDED -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Extended Family (optional)</span><span class="acc-total">' + calcToMoney(extTotal) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div id="funExtended' + stateKey + '"></div>' +
            '<section class="person addbtn" onclick="calcAddExtMember(\'funeral\')"><span>+ Add extended family member</span></section>' +
            '</section></section>' +
            '<!-- SUMMARY -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Summary</span><span class="acc-total">' + calcToMoney(total) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="sum-row"><span>Member &amp; spouse core</span><span>' + calcToMoney(sub) + '</span></div>' +
            '<div class="sum-row"><span>Children (' + st.children.length + ')</span><span>' + calcToMoney(childTotal) + '</span></div>' +
            '<div class="sum-row"><span>Parents (' + st.parents.length + ')</span><span>' + calcToMoney(parentTotal) + '</span></div>' +
            '<div class="sum-row"><span>Extended (' + st.extended.length + ')</span><span>' + calcToMoney(extTotal) + '</span></div>' +
            '<div class="sum-row total"><span>Total monthly</span><span>' + calcToMoney(total) + '</span></div>' +
            '</section></section>' +
            calcSignaturePad(stateKey) +
            calcFooter(stateKey);
    };
    const body = document.getElementById('calcBody');
    body.innerHTML = CALC_SHELL_RENDER[stateKey]();
    renderFunChildren(stateKey);
    renderFunParents(stateKey);
    renderFunExt(stateKey);
    setupCalcSignature(stateKey);
}

function calcFunBasic(v) {
    const st = CALC_SHELL_STATE['funeral'];
    if (!st) return;
    st.basic = parseFloat(v) || 0;
    calcRender('funeral');
    renderFunChildren('funeral'); renderFunParents('funeral'); renderFunExt('funeral');
    setupCalcSignature('funeral');
}

function renderFunChildren(stateKey) {
    const box = document.getElementById('funChildren' + stateKey);
    if (!box) return;
    const st = CALC_SHELL_STATE[stateKey];
    if (!st.children.length) {
        box.innerHTML = '<div class="empty">No children added yet.</div>';
        return;
    }
    let html = '';
    st.children.forEach((c, i) => {
        html +=
            '<section class="person">' +
            '<div class="p-top"><b class="p-id">Child ' + (i + 1) + '</b><button type="button" class="x" onclick="calcRemoveChild(' + i + ')">&times;</button></div>' +
            '<label class="field" style="margin:0 0 6px;"><input type="text" value="' + escAttr(c.name || '') + '" placeholder="Child\'s full name" oninput="CALC_SHELL_STATE[\'funeral\'].children[' + i + '].name=this.value"></label>' +
            '<label class="field">Date of birth<input type="date" value="' + escAttr(c.dob || '') + '" onchange="calcChildCover(' + i + ',this.value)"></label>' +
            '<div class="cost-row"><span>Band &thinsp;\u00b7&thinsp; ' + esc(c.label || '') + '</span><span class="cost-amt">' + calcToMoney(c.cover) + '</span></div>' +
            '</section>';
    });
    box.innerHTML = html;
}

function calcAddChild() {
    const st = CALC_SHELL_STATE['funeral'];
    if (!st) return;
    if (st.children.length >= 6) { toast('Maximum 6 children on this cover.'); return; }
    st.children.push({ name: '', dob: '', cover: 30000, label: '0 \u2013 6 years (P30,000)' });
    calcRender('funeral');
    renderFunChildren('funeral'); renderFunParents('funeral'); renderFunExt('funeral');
    setupCalcSignature('funeral');
}

function calcChildCover(i, dob) {
    const st = CALC_SHELL_STATE['funeral'];
    if (!st) return;
    const b = calcChildBenefit(dob);
    st.children[i].dob = dob;
    st.children[i].cover = b.cover;
    st.children[i].label = b.label;
    calcRender('funeral');
    renderFunChildren('funeral'); renderFunParents('funeral'); renderFunExt('funeral');
    setupCalcSignature('funeral');
}

function calcRemoveChild(i) {
    const st = CALC_SHELL_STATE['funeral'];
    if (!st) return;
    st.children.splice(i, 1);
    calcRender('funeral');
    renderFunChildren('funeral'); renderFunParents('funeral'); renderFunExt('funeral');
    setupCalcSignature('funeral');
}

/** Shared add-ins for parent / extended members (stateKey param keeps it generic). */
function calcAddMember(stateKey, key) {
    const st = CALC_SHELL_STATE[stateKey];
    if (!st) return;
    const list = st[key];
    if (list.length >= (key === 'parents' ? 4 : 8)) { toast('Maximum reached for this category.'); return; }
    list.push({ name: '', cover: 20000, gender: 'm', pw: false });
    calcRender(stateKey);
    renderFunParents(stateKey); renderFunExt(stateKey);
    setupCalcSignature(stateKey);
}

function calcAddFunc(uri, args) {}

function removeCalcPerson(stateKey, key, i) {
    const st = CALC_SHELL_STATE[stateKey];
    if (!st) return;
    st[key].splice(i, 1);
    calcRender(stateKey);
    upsertFunSublists(stateKey);
    setupCalcSignature(stateKey);
}

function upsertFunSublists(stateKey) {
    if (stateKey === 'funeral' || stateKey === 'amend') {
        renderFunChildren(stateKey); renderFunParents(stateKey); renderFunExt(stateKey);
    }
    if (stateKey === 'extended') {
        renderExtParents(stateKey); renderExtFamily(stateKey); renderExtAdults(stateKey);
    }
}

function renderGenericParents(stateKey, key, boxId, capCover, labelAx) { }

function renderMemberList(list, fields, fnSel, onSel, stateKey, i) {
    let html = '';
    list.forEach((m, i) => {
        const rates = fields.rates;
        const r = rates.find(x => x.cover === m.cover) || rates[0];
        html +=
            '<section class="person">' +
            '<div class="p-top"><b class="p-id">' + esc(fields.label) + ' ' + (i + 1) + '</b><button type="button" class="x" onclick="' + escAttr(onSel + '(' + i + ')') + '">&times;</button></div>' +
            '<label class="field" style="margin:0 0 6px;"><input type="text" value="' + escAttr(m.name || '') + '" placeholder="Full name" oninput="' + escAttr('CALC_SHELL_STATE[\'' + stateKey + '\'][\'' + fields.key + '\'][' + i + '].name') + '=this.value"></label>' +
            '<label class="field">Coverage\n<select onchange="' + escAttr('calcSetMemberCover(\'' + stateKey + '\',\'' + fields.key + '\',' + i + ',this.value)') + '">' +
            rates.map(x => '<option value="' + x.cover + '"' + (x.cover === m.cover ? ' selected' : '') + '>P ' + x.cover.toLocaleString() + '</option>').join('') +
            '</select></label>' +
            '<div class="cost-row"><span>Cover</span><span class="cost-amt">' + calcToMoney(r.pw ? r.pw : r.plain) + '</span></div>' +
            '</section>';
    });
    document.getElementById(boxId).innerHTML = html;
}

function calcSetMemberCover(stateKey, key, i, v) {
    const st = CALC_SHELL_STATE[stateKey];
    if (!st) return;
    st[key][i].cover = parseInt(v, 10);
    calcRender(stateKey);
    upsertFunSublists(stateKey);
    setupCalcSignature(stateKey);
}

/* =====================================================
   CALCULATOR 3 \u2014 FUNERAL COVER (AMENDMENT)
   ===================================================== */
function renderAmendmentCalc() {
    const stateKey = 'amend';
    let st = CALC_SHELL_STATE[stateKey];
    if (!st) {
        st = { compulsory: 66.40, pw: false, parents: [], extended: [], children: [], adult: [] };
        CALC_SHELL_STATE[stateKey] = st;
    }
    CALC_SHELL_RENDER[stateKey] = function () {
        let totals = { parents: 0, extended: 0, children: 0, adult: 0 };
        ['parents', 'extended', 'children', 'adult'].forEach(k => {
            st[k].forEach(m => { totals[k] += (m.cover || 0); });
        });
        const extras = totals.parents + totals.extended + totals.children + totals.adult;
        const total = st.compulsory + extras;
        return calcShell('Funeral Amendment \u2013 Bona Life', stateKey) +
            '<!-- SECTIONS A-G (matching the paper form) -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">A &middot; Member Details</span><span class="acc-total">' + calcToMoney(st.compulsory) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="stat-chips"><span class="stat-chip">P65,000 core</span><span class="stat-chip">Flat P66.40</span></div>' +
            '<label class="field">Full name<input type="text" value="' + escAttr(memberFullName() || '') + '" readonly></label>' +
            '<label class="field">Member no.<input type="text" value="' + escAttr(currentMemberNo() || '') + '" readonly></label>' +
            '<div class="cost-row"><span>Compulsory cover (flat)</span><span class="cost-amt">P 66.40</span></div>' +
            '</section></section>' +
            '<!-- PARENTS -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">B &middot; Parents</span><span class="acc-total">' + calcToMoney(totals.parents) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="amendParents"></div>' +
            '<section class="person addbtn" onclick="calcAddParent(\'amend\')"><span>+ Add parent</span></section></section></section>' +
            '<!-- EXTENDED -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">C &middot; Extended Family</span><span class="acc-total">' + calcToMoney(totals.extended) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="amendExtended"></div>' +
            '<section class="person addbtn" onclick="calcAddExtMember(\'amend\')"><span>+ Add extended family member</span></section></section></section>' +
            '<!-- CHILDREN OVER 21 -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">D &middot; Child Over 21</span><span class="acc-total">' + calcToMoney(totals.children) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="amendChildren"></div>' +
            '<section class="person addbtn" onclick="calcAddAdultChild(\'amend\')"><span>+ Add child over 21</span></section></section></section>' +
            '<!-- ADULT CHILDREN (same as extended rates) -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">E &middot; Adult Child</span><span class="acc-total">' + calcToMoney(totals.adult) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="amendAdult"></div>' +
            '<section class="person addbtn" onclick="calcAddAdult(\'amend\')"><span>+ Add adult child</span></section></section></section>' +
            <!-- SUMMARY + DECLARATION -->
            '<section class="acc"><section class="acc-head"><span class="acc-title">F &middot; Summary</span><span class="acc-total">' + calcToMoney(total) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="sum-row"><span>Compulsory (flat)</span><span>P 66.40</span></div>' +
            '<div class="sum-row"><span>Parents (' + st.parents.length + ')</span><span>' + calcToMoney(totals.parents) + '</span></div>' +
            '<div class="sum-row"><span>Extended (' + st.extended.length + ')</span><span>' + calcToMoney(totals.extended) + '</span></div>' +
            '<div class="sum-row"><span>Child 21+ (' + st.children.length + ')</span><span>' + calcToMoney(totals.children) + '</span></div>' +
            '<div class="sum-row"><span>Adult child (' + st.adult.length + ')</span><span>' + calcToMoney(totals.adult) + '</span></div>' +
            '<div class="sum-row total"><span>Total</span><span>' + calcToMoney(total) + '</span></div>' +
            '</section></section>' +
            calcSignaturePad(stateKey) +
            calcFooter(stateKey);
    };
    const body = document.getElementById('calcBody');
    body.innerHTML = CALC_SHELL_RENDER[stateKey]();
    upsertFunSublists('amend');
    setupCalcSignature(stateKey);
}

/* =====================================================
   CALCULATOR 4 \u2014 BLIC EXTENDED FAMILY
   ===================================================== */
function renderExtendedCalc() {
    const stateKey = 'extended';
    let st = CALC_SHELL_STATE[stateKey];
    if (!st) {
        st = { compulsory: 61.70, pw: false, parents: [], extended: [], children: [], adult: [] };
        CALC_SHELL_STATE[stateKey] = st;
    }
    CALC_SHELL_RENDER[stateKey] = function () {
        let totals = { parents: 0, extended: 0, children: 0, adult: 0 };
        ['parents', 'extended', 'children', 'adult'].forEach(k => {
            st[k].forEach(m => { totals[k] += (m.cover || 0); });
        });
        const extras = totals.parents + totals.extended + totals.children + totals.adult;
        const total = (st.pw ? 66.40 : 61.70) + extras;
        return calcShell('BLIC Extended Family', stateKey) +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Member Subscription</span><span class="acc-total">' + calcToMoney(st.pw ? 66.40 : 61.70) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="stat-chips"><span class="stat-chip">Compulsory P61.70</span><span class="stat-chip">PW P66.40</span></div>' +
            '<label class="field">Cover type\n<select onchange="calcExtendedKind(this.value)"><option value="new">New optional family cover</option><option value="adj">Adjust existing family cover</option></select></label>' +
            calcPwToggle(stateKey, st.pw) +
            '</section></section>' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Parents</span><span class="acc-total">' + calcToMoney(totals.parents) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="extParents"></div>' +
            '<section class="person addbtn" onclick="calcAddParent(\'extended\')"><span>+ Add parent</span></section></section></section>' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Extended Family</span><span class="acc-total">' + calcToMoney(totals.extended) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="extFamily"></div>' +
            '<section class="person addbtn" onclick="calcAddExtMember(\'extended\')"><span>+ Add extended family member</span></section></section></section>' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Children Over 21</span><span class="acc-total">' + calcToMoney(totals.children) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="extChildren"></div>' +
            '<section class="person addbtn" onclick="calcAddAdultChild(\'extended\')"><span>+ Add child over 21</span></section></section></section>' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Adult Children</span><span class="acc-total">' + calcToMoney(totals.adult) + '</span><em>+</em></section>' +
            '<section class="acc-body"><div id="extAdult"></div>' +
            '<section class="person addbtn" onclick="calcAddAdult(\'extended\')"><span>+ Add adult child</span></section></section></section>' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Summary</span><span class="acc-total">' + calcToMoney(total) + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="sum-row"><span>Compulsory subscription</span><span>' + calcToMoney(st.pw ? 66.40 : 61.70) + '</span></div>' +
            '<div class="sum-row"><span>Parents</span><span>' + calcToMoney(totals.parents) + '</span></div>' +
            '<div class="sum-row"><span>Extended</span><span>' + calcToMoney(totals.extended) + '</span></div>' +
            '<div class="sum-row"><span>Child 21+</span><span>' + calcToMoney(totals.children) + '</span></div>' +
            '<div class="sum-row"><span>Adult child</span><span>' + calcToMoney(totals.adult) + '</span></div>' +
            '<div class="sum-row total"><span>Total</span><span>' + calcToMoney(total) + '</span></div>' +
            '</section></section>' +
            calcSignaturePad(stateKey) +
            calcFooter(stateKey);
    };
    const body = document.getElementById('calcBody');
    body.innerHTML = CALC_SHELL_RENDER[stateKey]();
    upsertFunSublists('extended');
    setupCalcSignature(stateKey);
}

function calcExtendedKind(v) {
    const st = CALC_SHELL_STATE['extended'];
    if (st) st.kind = v;
    calcRender('extended');
    upsertFunSublists('extended');
    setupCalcSignature('extended');
}

function calcAddParent(stateKey) {
    const st = CALC_SHELL_STATE[stateKey];
    const p = { name: '', cover: 20000, gender: 'm', pw: false };
    st.annular = (st.annular || 0) + 1;
    if (stateKey === 'funeral') { st.parents.push(p); }
    else if (stateKey === 'amend') { st.parents.push(p); }
    else if (stateKey === 'extended') { st.parents.push(p); }
    upsertFunSublists(stateKey);
}

/** Reusable member rows for parent/extended/adult-collections. */
function calcMemberRowsHtml(members, stateKey, key, rates, cover) {
    let html = '';
    members.forEach((m, i) => {
        const r = rates.find(x => x.cover === m.cover) || rates[0];
        const pw = m.pw;
        html +=
            '<section class="person">' +
            '<div class="p-top"><b class="p-id">Member ' + (i + 1) + '</b><button type="button" class="x" onclick="removeCalcPerson(\'' + stateKey + '\',\'' + key + '\',' + i + ')">&times;</button></div>' +
            '<label class="field" style="margin:0 0 6px;"><input type="text" value="' + escAttr(m.name || '') + '" placeholder="Full name" oninput="CALC_SHELL_STATE[\'' + stateKey + '\'][\'' + key + '\'][' + i + '].name=this.value"></label>' +
            '<label class="field">Coverage\n<select onchange="CALC_SHELL_STATE[\'' + stateKey + '\'][\'' + key + '\'][' + i + '].cover=parseFloat(this.value);calcRender(\'' + stateKey + '\');upsertFunSublists(\'' + stateKey + '\');">' +
            rates.map(x => '<option value="' + x.cover + '"' + (x.cover === m.cover ? ' selected' : '') + '>P ' + x.cover.toLocaleString() + '</option>').join('') +
            '</select></label>' +
            '<div class="gender-opts"><label><input type="radio" name="' + stateKey + '_' + key + '_g' + i + '"' + (m.gender === 'm' ? ' checked' : '') + ' onchange="CALC_SHELL_STATE[\'' + stateKey + '\'][\'' + key + '\'][' + i + '].gender=\'m\'">M</label>' +
            '<label><input type="radio" name="' + stateKey + '_' + key + '_g' + i + '"' + (m.gender === 'f' ? ' checked' : '') + ' onchange="CALC_SHELL_STATE[\'' + stateKey + '\'][\'' + key + '\'][' + i + '].gender=\'f\'">F</label></div>' +
            '<div class="cost-row"><span>Premium</span><span class="cost-amt">' + calcToMoney(pw ? r.pw : r.plain) + '</span></div>' +
            '</section>';
    });
    return html;
}

function renderFunParents(stateKey) {
    const boxId = stateKey === 'funeral' ? 'funParents' + stateKey : stateKey + 'Parents';
    const box = document.getElementById(boxId);
    if (!box) return;
    const st = CALC_SHELL_STATE[stateKey];
    if (!st.parents.length) { box.innerHTML = '<div class="empty">No parents added yet.</div>'; return; }
    box.innerHTML = calcMemberRowsHtml(st.parents, stateKey, 'parents', CALC_MEMBER_RATES);
}

function renderFunExt(stateKey) {
    const boxId = stateKey === 'funeral' ? 'funExtended' + stateKey : stateKey + 'Family';
    const box = document.getElementById(boxId);
    if (!box) return;
    const st = CALC_SHELL_STATE[stateKey];
    if (!st.extended.length) { box.innerHTML = '<div class="empty">No expanded family yet.</div>'; return; }
    box.innerHTML = calcMemberRowsHtml(st.extended, stateKey, 'extended', CALC_EXTRA_RATES);
}

function calcAddExtMember(stateKey) {
    const st = CALC_SHELL_STATE[stateKey];
    st.extended.push({ name: '', cover: 5000, gender: 'm', pw: false });
    upsertFunSublists(stateKey);
}

function calcAddAdultChild(stateKey) {
    const st = CALC_SHELL_STATE[stateKey];
    st.children.push({ name: '', cover: 5000, gender: 'm', pw: false });
    upsertFunSublists(stateKey);
}

function calcAddAdult(stateKey) {
    const st = CALC_SHELL_STATE[stateKey];
    st.adult.push({ name: '', cover: 5000, gender: 'm', pw: false });
    upsertFunSublists(stateKey);
}

function renderExtChildren(stateKey) {
    const boxId = stateKey === 'extended' ? 'extChildren' : stateKey + 'Children';
    const box = document.getElementById(boxId);
    if (!box) return;
    const st = CALC_SHELL_STATE[stateKey];
    if (!st.children.length) { box.innerHTML = '<div class="empty">No children over 21 yet.</div>'; return; }
    box.innerHTML = calcMemberRowsHtml(st.children, stateKey, 'children', CALC_CHILD_RATES);
}

function renderExtAdults(stateKey) {
    const boxId = stateKey === 'extended' ? 'extAdult' : stateKey + 'Adult';
    const box = document.getElementById(boxId);
    if (!box) return;
    const st = CALC_SHELL_STATE[stateKey];
    if (!st.adult.length) { box.innerHTML = '<div class="empty">No adult children yet.</div>'; return; }
    box.innerHTML = calcMemberRowsHtml(st.adult, stateKey, 'adult', CALC_EXTRA_RATES);
}

function renderExtParents(stateKey) {
    renderFunParents(stateKey);
}

/* =====================================================
   CALCULATOR 5 \u2014 GLA NOMINATION OF BENEFICIARIES
   ===================================================== */
function renderGlaCalc() {
    const stateKey = 'gla';
    let st = CALC_SHELL_STATE[stateKey];
    if (!st) {
        st = { alloc: 100, members: [] };
        st.members = [
            { name: '', alloc: 40 },
            { name: '', alloc: 30 },
            { name: '', alloc: 15 },
            { name: '', alloc: 15 }
        ];
        CALC_SHELL_STATE[stateKey] = st;
    }
    CALC_SHELL_RENDER[stateKey] = function () {
        let used = 0;
        st.members.forEach(m => { used += (parseInt(m.alloc, 10) || 0); });
        const left = st.alloc - used;
        const ok = left === 0;
        let rows = '';
        st.members.forEach((m, i) => {
            rows +=
                '<section class="person benef">' +
                '<div class="p-top"><b class="p-id">Beneficiary ' + (i + 1) + '</b><button type="button" class="x" onclick="glaRemoveBenef(' + i + ')">&times;</button></div>' +
                '<label class="field" style="margin:0 0 6px;"><input type="text" value="' + escAttr(m.name || '') + '" placeholder="Full name" oninput="CALC_SHELL_STATE.gla.members[' + i + '].name=this.value"></label>' +
                '<div class="alloc-field"><input type="number" min="0" max="100" step="1" value="' + escAttr(String(m.alloc)) + '" oninput="glaSetAlloc(' + i + ',this.value)"><span>%</span></div>' +
                '</section>';
        });
        return calcShell('GLA Nomination of Beneficiaries', stateKey) +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Beneficiary Allocation</span>' +
            '<span class="acc-total ' + (ok ? '' : 'warn') + '">' + used + '%</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="calc-statusbar"><div class="sb-top"><span class="sb-lbl">Allocation</span><span class="sb-pct' + (ok ? ' ok' : ' warn') + '">' + used + '% \u00b7 ' + (ok ? '100% allocated' : (left > 0 ? left + '% left to assign' : left + '% over')) + '</span></div>' +
            '<div class="calc-pb-track"><div class="calc-pb-fill' + (ok ? ' ok' : ' warn') + '" style="width:' + Math.min(100, used) + '%;"></div></div></div>' +
            '<div class="subhead">Nominees</div>' +
            rows +
            (st.members.length < 8 ? '<section class="person addbtn" onclick="glaAddBenef()"><span>+ Add beneficiary</span></section>' : '') +
            '</section></section>' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Summary</span><span class="acc-total">' + used + '%</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="sum-row total"><span>Total allocated</span><span class="' + (ok ? '' : 'warn') + '">' + used + '%</span></div>' +
            (ok ? '<div class="sub-badge">100% \u2014 ready to submit</div>' : '<div class="sub-badge warn">' + (left > 0 ? 'Assign another ' + left + '%' : 'Reduce by ' + Math.abs(left) + '%') + '</div>') +
            '</section></section>' +
            calcSignaturePad(stateKey) +
            calcFooter(stateKey);
    };
    const body = document.getElementById('calcBody');
    body.innerHTML = CALC_SHELL_RENDER[stateKey]();
    setupCalcSignature(stateKey);
}

function glaSetAlloc(i, v) {
    const st = CALC_SHELL_STATE.gla;
    if (!st) return;
    st.members[i].alloc = Math.min(100, Math.max(0, parseInt(v, 10) || 0));
    calcRender('gla');
    setupCalcSignature('gla');
}

function glaAddBenef() {
    const st = CALC_SHELL_STATE.gla;
    if (!st) return;
    if (st.members.length >= 8) { toast('Maximum 8 beneficiaries.'); return; }
    st.members.push({ name: '', alloc: 0 });
    calcRender('gla');
    setupCalcSignature('gla');
}

function glaRemoveBenef(i) {
    const st = CALC_SHELL_STATE.gla;
    if (!st || st.members.length <= 1) return;
    st.members.splice(i, 1);
    calcRender('gla');
    setupCalcSignature('gla');
}

/* =====================================================
   CALCULATOR 6 \u2014 KNOW YOUR CUSTOMER (KYC)
   ===================================================== */
function renderKycCalc() {
    const stateKey = 'kyc';
    let st = CALC_SHELL_STATE[stateKey];
    if (!st) {
        st = {
            identity: [false, false, false, false, false, false],
            address: [false, false, false, false, false, false, false, false, false, false, false, false],
            employment: [false, false, false, false],
            declaration: false
        };
        CALC_SHELL_STATE[stateKey] = st;
    }
    CALC_SHELL_RENDER[stateKey] = function () {
        const idDone = st.identity.filter(Boolean).length;
        const adrDone = st.address.filter(Boolean).length;
        const empDone = st.employment.filter(Boolean).length;
        const decl = st.declaration;
        const total = st.identity.length + st.address.length + st.employment.length + 1;
        const done = idDone + adrDone + empDone + (decl ? 1 : 0);
        const pct = Math.round((done / total) * 100);
        const idChips = st.identity.map(function (v, i) { return v; });
        return calcShell('Know Your Customer (KYC)', stateKey) +
            '<section class="acc"><section class="acc-head"><span class="acc-title">Progress</span>' +
            '<span class="acc-total">' + done + '/' + total + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            '<div class="progressbar"><span class="pb-lbl">Profile completeness</span><span class="pb-pct">' + pct + '%</span><i class="pb-fill" style="width:' + pct + '%;"></i></div>' +
            '</section></section>' +
            '<!-- A: IDENTITY -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">A &middot; Identity</span><span class="acc-total">' + idDone + '/' + st.identity.length + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            kycCheckRow('Omang ID number', stateKey, 0, st.identity[0]) +
            kycCheckRow('Personal details', stateKey, 1, st.identity[1]) +
            kycCheckRow('Date of birth', stateKey, 2, st.identity[2]) +
            kycCheckRow('Nationality', stateKey, 3, st.identity[3]) +
            kycCheckRow('Gender / signature', stateKey, 4, st.identity[4]) +
            kycCheckRow('Personal QR verified', stateKey, 5, st.identity[5]) +
            '</section></section>' +
            '<!-- B: ADDRESS & CONTACT -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">B &middot; Address &amp; Contact</span><span class="acc-total">' + adrDone + '/' + st.address.length + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            kycCheckRow('Physical address', stateKey, 0, st.address[0]) +
            kycCheckRow('Postal address', stateKey, 1, st.address[1]) +
            kycCheckRow('Home phone', stateKey, 2, st.address[2]) +
            kycCheckRow('Mobile / WhatsApp', stateKey, 3, st.address[3]) +
            kycCheckRow('Email address', stateKey, 4, st.address[4]) +
            kycCheckRow('Work phone', stateKey, 5, st.address[5]) +
            kycCheckRow('Work station', stateKey, 6, st.address[6]) +
            kycCheckRow('Region / district', stateKey, 7, st.address[7]) +
            kycCheckRow('Postal code', stateKey, 8, st.address[8]) +
            kycCheckRow('Emergency contact', stateKey, 9, st.address[9]) +
            kycCheckRow('Landlord / village', stateKey, 10, st.address[10]) +
            kycCheckRow('Next of kin', stateKey, 11, st.address[11]) +
            '</section></section>' +
            '<!-- C: EMPLOYMENT -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">C &middot; Employment</span><span class="acc-total">' + empDone + '/' + st.employment.length + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            kycCheckRow('Employer / Ministry', stateKey, 0, st.employment[0]) +
            kycCheckRow('Post &amp; job grade', stateKey, 1, st.employment[1]) +
            kycCheckRow('Employment number', stateKey, 2, st.employment[2]) +
            kycCheckRow('Confirmation letter', stateKey, 3, st.employment[3]) +
            '</section></section>' +
            '<!-- D: DECLARATION -->' +
            '<section class="acc"><section class="acc-head"><span class="acc-title">D &middot; Declaration</span><span class="acc-total">' + (decl ? 'Done' : '&nbsp;') + '</span><em>+</em></section>' +
            '<section class="acc-body">' +
            kycDeclarationRow(stateKey) +
            calcSignaturePad(stateKey) +
            '</section></section>' +
            calcFooter(stateKey);
    };
    const body = document.getElementById('calcBody');
    body.innerHTML = CALC_SHELL_RENDER[stateKey]();
    setupCalcSignature(stateKey);
}

function kycCheckRow(label, key, i, checked) {
    const id = 'kyc_' + key + '_' + i;
    return '<label class="kyc-row"><input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="kycToggle(\'' + key + '\',' + i + ',this.checked)"><span>' + esc(label) + '</span><b class="kyc-check"></b></label>';
}

function kycToggle(key, i, v) {
    const st = CALC_SHELL_STATE.kyc;
    if (!st) return;
    if (key === 'identity') st.identity[i] = v;
    else if (key === 'address') st.address[i] = v;
    else if (key === 'employment') st.employment[i] = v;
    calcRender('kyc');
    setupCalcSignature('kyc');
}

function kycDeclarationRow(key) {
    const st = CALC_SHELL_STATE.kyc;
    return '<label class="kyc-row"><input type="checkbox" ' + (st.declaration ? 'checked' : '') + ' onchange="kycDeclare(this.checked)"><span>I confirm that the information provided is true &amp; complete.</span><b class="kyc-check"></b></label>';
}

function kycDeclare(v) {
    const st = CALC_SHELL_STATE.kyc;
    if (!st) return;
    st.declaration = v;
    calcRender('kyc');
    setupCalcSignature('kyc');
}

/* Helper consumed by calculators */
function memberFullName() {
    const p = loadOnboarding();
    return p ? (p.personal.firstName + ' ' + p.personal.surname) : '';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalculatorLaunchers();
});
