/* =====================================================
   1. MEMBER REGISTRATION WIZARD STATE (Form A)
   Steps: 1 Personal KYC | 2 Employment | 3 Union Forms & Review
   ===================================================== */
const wiz = {
    step: 0,
    total: 3,
    data: {
        personal: { firstName: '', surname: '', omang: '', dob: '', gender: '', phone: '', email: '', address: '', district: '', marital: 'Single', spouseName: '', spouseOmang: '' },
        employment: { sectorId: '', employeeName: '', departmentId: '', cadreGroup: '', jobTitle: '', customJobTitle: '', useCustom: false, employeeNo: '', employmentType: 'Permanent', salaryScale: '', basicSalary: '' },
        union: { pepDeclaration: false, beneficiaryName: '', beneficiaryRelation: '', beneficiaryShare: '100', shopSteward: '', officeId: 'gaborone' }
    }
};

function findSectorById(id) {
    return BOPEU_EMPLOYMENT_DATA.sectors.find(s => s.id === id) || null;
}

function getEmployer(sectorId, employerId) {
    const sector = findSectorById(sectorId);
    if (!sector) return null;
    return (sector.employers || []).find(e => e.id === employerId) || null;
}

function getDepartments(sectorId, employerId) {
    const sector = findSectorById(sectorId);
    if (!sector) return [];
    const emp = getEmployer(sectorId, employerId);
    if (emp && emp.departments) return emp.departments;
    return sector.departments || [];
}

function openOnboarding() {
    renderWizard();
    openModal('onboarding-modal');
}

function renderWizard() {
    const progress = document.getElementById('wizardProgress');
    const body = document.getElementById('wizardBody');
    const backBtn = document.getElementById('wizBack');
    const nextBtn = document.getElementById('wizNext');

    progress.innerHTML =
        '<div class="stepper-head">' +
        [0, 1, 2].map(i => '<span class="step-dot ' + (i < wiz.step ? 'done' : i === wiz.step ? 'current' : '') + '"></span>').join('') +
        '</div>' +
        '<span>Step ' + (wiz.step + 1) + ' of ' + wiz.total + ' &mdash; ' + wizardStepLabel(wiz.step) + '</span>';

    backBtn.style.visibility = wiz.step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = wiz.step === wiz.total - 1 ? 'Create BOPEU Profile' : 'Continue';

    body.innerHTML = wizardStepHtml(wiz.step);
    bindStep(wiz.step);
}

function wizardStepLabel(step) {
    const labels = ['Personal KYC', 'Employment Details', 'Union Forms & Review'];
    return labels[step] || '';
}

function wizardStepHtml(step) {
    switch (step) {
        case 0: return personalKycHtml();
        case 1: return employmentFormHtml();
        case 2: return unionFormsHtml();
        default: return '';
    }
}

/* ---------------- Step 1: Personal KYC ---------------- */
function personalKycHtml() {
    const p = wiz.data.personal;
    let html = '<div class="onboarding-step"><h3>Personal KYC</h3>' +
        '<p class="stepper-sub">Your identity information, stored securely on this device.</p>' +
        '<div class="form-group"><label class="form-label">Full Names</label><input type="text" id="wzFName" value="' + esc(p.firstName) + '"></div>' +
        '<div class="form-group"><label class="form-label">Surname</label><input type="text" id="wzSurname" value="' + esc(p.surname) + '"></div>' +
        '<div class="form-group"><label class="form-label">Omang / Passport No.</label><input type="text" id="wzOmang" placeholder="e.g. 090000000" value="' + esc(p.omang) + '"></div>' +
        '<div class="form-group"><label class="form-label">Date of Birth</label><input type="date" id="wzDob" value="' + esc(p.dob) + '"></div>' +
        '<div class="form-group"><label class="form-label">Gender</label><select id="wzGender"><option value="">-- Select --</option>' +
        ['Male', 'Female', 'Other'].map(g => '<option value="' + g + '"' + (p.gender === g ? ' selected' : '') + '>' + g + '</option>').join('') +
        '</select></div>' +
        '<div class="form-group"><label class="form-label">Mobile (267 format)</label><input type="tel" id="wzPhone" placeholder="+267 ..." value="' + esc(p.phone) + '"></div>' +
        '<div class="form-group"><label class="form-label">Email (Optional)</label><input type="email" id="wzEmail" value="' + esc(p.email) + '"></div>' +
        '<div class="form-group"><label class="form-label">Physical Address</label><input type="text" id="wzAddress" placeholder="Street, Village, Plot no." value="' + esc(p.address) + '"></div>' +
        '<div class="form-group"><label class="form-label">Marital Status</label><select id="wzMarital" onchange="onMaritalChange()">' +
        '<option value="Single"' + (p.marital === 'Single' ? ' selected' : '') + '>Single</option>' +
        '<option value="Married"' + (p.marital === 'Married' ? ' selected' : '') + '>Married</option>' +
        '</select></div>' +
        '<div id="wzSpouseWrap" style="display:' + (p.marital === 'Married' ? 'block' : 'none') + ';">' +
        '<div class="form-group"><label class="form-label">Spouse Full Name</label><input type="text" id="wzSpouseName" value="' + esc(p.spouseName) + '"></div>' +
        '<div class="form-group"><label class="form-label">Spouse Omang / ID</label><input type="text" id="wzSpouseOmang" value="' + esc(p.spouseOmang) + '"></div>' +
        '<div class="checklist-item"><input type="checkbox" id="wzSpouseConsent"><label for="wzSpouseConsent">Spouse consent for coverage</label></div>' +
        '</div>' +
        '</div>';
    return html;
}

function onMaritalChange() {
    wiz.data.personal.marital = document.getElementById('wzMarital').value;
    const spWrap = document.getElementById('wzSpouseWrap');
    if (spWrap) spWrap.style.display = wiz.data.personal.marital === 'Married' ? 'block' : 'none';
}

/* ---------------- Step 2: Employment ---------------- */
function employmentFormHtml() {
    const emp = wiz.data.employment;
    let html = '<div class="onboarding-step"><h3>Employment Details</h3><p class="stepper-sub">Sector, employer, department, cadre and job title.</p>';

    html += '<div class="form-group"><label class="form-label">Employment Sector</label><select id="wzSector" onchange="onSectorChange()">';
    html += '<option value="">-- Select --</option>';
    BOPEU_EMPLOYMENT_DATA.sectors.forEach(s => {
        html += '<option value="' + s.id + '"' + (emp.sectorId === s.id ? ' selected' : '') + '>' + esc(s.label) + '</option>';
    });
    html += '</select></div>';

    const sector = findSectorById(emp.sectorId);
    if (sector) {
        html += '<div class="form-group"><label class="form-label">Employer / Institution</label><select id="wzEmployer" onchange="onEmpChange()">';
        html += '<option value="">-- Select --</option>';
        sector.employers.forEach(e => {
            html += '<option value="' + e.id + '"' + (emp.employeeName === e.id ? ' selected' : '') + '>' + esc(e.label) + '</option>';
        });
        html += '</select></div>';

        const departments = getDepartments(sector.id, emp.employeeName);
        if (departments.length) {
            html += '<div class="form-group"><label class="form-label">Department / Work Area</label><select id="wzDepartment" onchange="onDeptChange()">';
            html += '<option value="">-- Select --</option>';
            departments.forEach(d => {
                html += '<option value="' + d.id + '"' + (emp.departmentId === d.id ? ' selected' : '') + '>' + esc(d.label) + '</option>';
            });
            html += '</select></div>';
        }

        const dept = departments.find(d => d.id === emp.departmentId) || null;
        const groups = dept ? (dept.cadreGroups || []) : [];
        if (groups.length) {
            html += '<div class="form-group"><label class="form-label">Cadre Group</label><select id="wzCadre" onchange="onCadreChange()">';
            html += '<option value="">-- Select --</option>';
            groups.forEach(g => {
                html += '<option value="' + esc(g.label) + '"' + (emp.cadreGroup === g.label ? ' selected' : '') + '>' + esc(g.label) + '</option>';
            });
            html += '</select></div>';
        }

        const group = groups.find(g => g.label === emp.cadreGroup) || null;
        const jobs = group ? (group.jobs || []) : [];
        if (jobs.length) {
            html += '<div class="form-group"><label class="form-label">Job Title</label><select id="wzJobTitle" onchange="onJobChange()">';
            html += '<option value="">-- Select --</option>';
            jobs.forEach(j => {
                html += '<option value="' + esc(j) + '"' + (emp.jobTitle === j ? ' selected' : '') + '>' + esc(j) + '</option>';
            });
            html += '<option value="__custom__" ' + (emp.jobTitle === '__custom__' ? 'selected' : '') + '>Other / Not Listed</option>';
            html += '</select></div>';
        }

        const showCustom = emp.jobTitle === '__custom__' || emp.useCustom;
        html += '<div class="form-group" id="wzCustomWrap" style="display:' + (showCustom ? 'block' : 'none') + ';">' +
            '<label class="form-label">Enter your official job title</label>' +
            '<input type="text" id="wzCustomJob" value="' + esc(emp.customJobTitle) + '"></div>';

        html += '<div class="form-group"><label class="form-label">Employee Number</label><input type="text" id="wzEmpNo" value="' + esc(emp.employeeNo) + '"></div>';
        html += '<div class="form-group"><label class="form-label">Employment Type</label><select id="wzEmpType">';
        ['Permanent', 'Contract', 'Fixed Term'].forEach(t => {
            html += '<option value="' + t + '"' + (emp.employmentType === t ? ' selected' : '') + '>' + t + '</option>';
        });
        html += '</select></div>';
        html += '<div class="form-group"><label class="form-label">Salary Scale</label><input type="text" id="wzSalaryScale" placeholder="e.g. D1, Scale 10" value="' + esc(emp.salaryScale) + '"></div>';
    } else {
        html += '<p class="stepper-sub">Select your employment sector to continue.</p>';
    }
    html += '</div>';
    return html;
}

function onSectorChange() {
    wiz.data.employment.sectorId = document.getElementById('wzSector').value;
    wiz.data.employment.employeeName = '';
    wiz.data.employment.departmentId = '';
    wiz.data.employment.cadreGroup = '';
    wiz.data.employment.jobTitle = '';
    wiz.data.employment.useCustom = false;
    renderWizard();
}

function onEmpChange() {
    wiz.data.employment.employeeName = document.getElementById('wzEmployer').value;
    wiz.data.employment.departmentId = '';
    wiz.data.employment.cadreGroup = '';
    wiz.data.employment.jobTitle = '';
    wiz.data.employment.useCustom = false;
    renderWizard();
}

function onDeptChange() {
    wiz.data.employment.departmentId = document.getElementById('wzDepartment').value;
    wiz.data.employment.cadreGroup = '';
    wiz.data.employment.jobTitle = '';
    wiz.data.employment.useCustom = false;
    renderWizard();
}

function onCadreChange() {
    wiz.data.employment.cadreGroup = document.getElementById('wzCadre').value;
    wiz.data.employment.jobTitle = '';
    wiz.data.employment.useCustom = false;
    renderWizard();
}

function onJobChange() {
    wiz.data.employment.jobTitle = document.getElementById('wzJobTitle').value;
    wiz.data.employment.useCustom = wiz.data.employment.jobTitle === '__custom__';
    const wrap = document.getElementById('wzCustomWrap');
    if (wrap) wrap.style.display = wiz.data.employment.useCustom ? 'block' : 'none';
}

/* ---------------- Step 3: Union Forms & Review ---------------- */
function unionFormsHtml() {
    const em = findSectorById(wiz.data.employment.sectorId);
    const empObj = getEmployer(wiz.data.employment.sectorId, wiz.data.employment.employeeName);
    const jobLabel = wiz.data.employment.useCustom ? wiz.data.employment.customJobTitle : wiz.data.employment.jobTitle;
    const office = BOPEU_OFFICES.find(o => o.id === wiz.data.union.officeId) || BOPEU_OFFICES[0];
    const salary = parseFloat(wiz.data.employment.basicSalary) || 0;
    const sub = funeralSubscription(salary);

    let html = '<div class="onboarding-step"><h3>Union Forms & Review</h3><p class="stepper-sub">Declarations, funeral cover auto-enrolment and review.</p>';

    html += '<div class="checklist-item"><input type="checkbox" id="wzPep"><label for="wzPep">KYC / PEP declaration — I confirm the information provided is true and correct.</label></div>';
    html += '<div class="checklist-item"><input type="checkbox" id="wzGla"><label for="wzGla">Group Life Assurance (GLA) consent — funeral cover auto-enrolment.</label></div>';

    html += '<div class="form-group" style="margin-top:10px;"><label class="form-label">Basic Salary (Pula)</label>' +
        '<input type="number" id="wzBasicSalary" value="' + esc(wiz.data.employment.basicSalary) + '" min="0" placeholder="e.g. 4500"></div>';

    html += '<div class="alert alert-info">' +
        'Funeral Cover (Metropolitan Life): 1% of basic salary = <strong>P ' + sub.toFixed(2) + '/mo</strong> (capped P 39.90 - P 100.00). Core <strong>P 60,000</strong> cover for member, spouse &amp; children under 21.</div>';

    html += '<div class="form-group"><label class="form-label">Nearest Office</label><select id="wzOffice">';
    BOPEU_OFFICES.forEach(o => {
        html += '<option value="' + o.id + '"' + (wiz.data.union.officeId === o.id ? ' selected' : '') + '>' + esc(o.name) + ' — ' + esc(o.phone) + '</option>';
    });
    html += '</select></div>';

    html += '<div class="form-group"><label class="form-label">Shop Steward Name (optional)</label><input type="text" id="wzSteward" value="' + esc(wiz.data.union.shopSteward) + '"></div>';

    html += '<div class="policy-card" style="margin-top:10px;">';
    html += '<div class="policy-row"><span class="policy-row-label">Name</span><span class="policy-row-value">' + esc(wiz.data.personal.firstName + ' ' + wiz.data.personal.surname) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Omang</span><span class="policy-row-value">' + esc(wiz.data.personal.omang) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Sector</span><span class="policy-row-value">' + (em ? esc(em.shortLabel) : '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Employer</span><span class="policy-row-value">' + (empObj ? esc(empObj.label) : '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Job Title</span><span class="policy-row-value">' + esc(jobLabel || '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Member No</span><span class="policy-row-value red">' + esc(currentMemberNo()) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Status</span><span class="policy-row-value"><span class="tag amber">Pending Verification</span></span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Office</span><span class="policy-row-value">' + esc(office.name) + '</span></div>';
    html += '</div>';

    html += '</div>';
    return html;
}

/* ---------------- Navigation & validation ---------------- */
function bindStep(step) {
    if (step === 0) {
        readPersonal();
        const spWrap = document.getElementById('wzSpouseWrap');
        if (spWrap) spWrap.style.display = wiz.data.personal.marital === 'Married' ? 'block' : 'none';
    }
    if (step === 1) {
        const emp = document.getElementById('wzEmpNo');
        if (emp) wiz.data.employment.employeeNo = emp.value;
        const et = document.getElementById('wzEmpType');
        if (et) wiz.data.employment.employmentType = et.value;
        const ss = document.getElementById('wzSalaryScale');
        if (ss) wiz.data.employment.salaryScale = ss.value;
    }
}

function readPersonal() {
    const read = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
    wiz.data.personal.firstName = read('wzFName');
    wiz.data.personal.surname = read('wzSurname');
    wiz.data.personal.omang = read('wzOmang');
    wiz.data.personal.dob = read('wzDob');
    wiz.data.personal.gender = read('wzGender');
    wiz.data.personal.phone = read('wzPhone');
    wiz.data.personal.email = read('wzEmail');
    wiz.data.personal.address = read('wzAddress');
    wiz.data.personal.marital = read('wzMarital');
    wiz.data.personal.spouseName = read('wzSpouseName');
    wiz.data.personal.spouseOmang = read('wzSpouseOmang');
}

function readEmployment() {
    const read = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
    const emp = wiz.data.employment;
    emp.sectorId = read('wzSector');
    emp.employeeName = read('wzEmployer');
    emp.departmentId = read('wzDepartment');
    emp.cadreGroup = read('wzCadre');
    emp.jobTitle = read('wzJobTitle');
    emp.customJobTitle = read('wzCustomJob');
    emp.useCustom = emp.jobTitle === '__custom__';
    emp.employeeNo = read('wzEmpNo');
    emp.employmentType = read('wzEmpType') || 'Permanent';
    emp.salaryScale = read('wzSalaryScale');
}

function wizardBack() {
    if (wiz.step === 0) return;
    collectStep();
    wiz.step -= 1;
    renderWizard();
}

function collectStep() {
    if (wiz.step === 0) readPersonal();
    if (wiz.step === 1) readEmployment();
    if (wiz.step === 2) {
        wiz.data.employment.basicSalary = (document.getElementById('wzBasicSalary') || {}).value || wiz.data.employment.basicSalary;
        wiz.data.union.officeId = (document.getElementById('wzOffice') || {}).value || wiz.data.union.officeId;
        wiz.data.union.shopSteward = (document.getElementById('wzSteward') || {}).value || wiz.data.union.shopSteward;
        wiz.data.union.pepDeclaration = !!(document.getElementById('wzPep') || {}).checked;
        wiz.data.union.gla = !!(document.getElementById('wzGla') || {}).checked;
    }
}

function wizardNext() {
    collectStep();
    if (!validateStep(wiz.step)) return;
    if (wiz.step === wiz.total - 1) {
        createMemberProfile();
        return;
    }
    wiz.step += 1;
    renderWizard();
}

function validateStep(step) {
    const p = wiz.data.personal;
    const em = wiz.data.employment;
    if (step === 0) {
        if (!p.firstName || !p.surname) { toast('Please enter your full names.'); return false; }
        if (!p.omang) { toast('Please enter your Omang / Passport number.'); return false; }
        if (!p.dob) { toast('Please enter your date of birth.'); return false; }
        if (ageFromDob(p.dob) === null) { toast('Please enter a valid date of birth.'); return false; }
        if (ageFromDob(p.dob) < 18) { toast('Members must be at least 18 years old.'); return false; }
        if (!p.phone) { toast('Please enter your mobile number.'); return false; }
    }
    if (step === 1) {
        if (!em.sectorId) { toast('Please select your employment sector.'); return false; }
        if (!em.employeeName) { toast('Please select your employer / institution.'); return false; }
        const job = em.jobTitle;
        if (!job) { toast('Please select your job title.'); return false; }
        if (job === '__custom__' && !em.customJobTitle) { toast('Please enter your job title.'); return false; }
    }
    if (step === 2) {
        if (!wiz.data.union.pepDeclaration) { toast('Please confirm the KYC / PEP declaration.'); return false; }
        if (!wiz.data.union.gla) { toast('Please confirm the Group Life Assurance consent.'); return false; }
    }
    return true;
}

/* ---------------- Profile persistence ---------------- */
function buildEmploymentCore() {
    const em = wiz.data.employment;
    const jobLabel = em.useCustom ? em.customJobTitle : em.jobTitle;
    const sector = findSectorById(em.sectorId);
    const empObj = getEmployer(em.sectorId, em.employeeName);
    const departments = getDepartments(em.sectorId, em.employeeName);
    const deptObj = departments.find(d => d.id === em.departmentId) || null;
    return {
        sectorId: em.sectorId,
        sectorLabel: (sector || {}).shortLabel || '',
        employeeName: em.employeeName,
        employerLabel: empObj ? empObj.label : '',
        departmentId: em.departmentId,
        departmentLabel: deptObj ? deptObj.label : '',
        jobTitle: jobLabel,
        employeeNo: em.employeeNo,
        employmentType: em.employmentType,
        salaryScale: em.salaryScale,
        basicSalary: parseFloat(em.basicSalary) || 0
    };
}

function createMemberProfile() {
    const jobLabel = wiz.data.employment.useCustom ? wiz.data.employment.customJobTitle : wiz.data.employment.jobTitle;
    const salary = parseFloat(wiz.data.employment.basicSalary) || 0;

    const profile = {
        personal: { ...wiz.data.personal, spouseConsent: true },
        employment: buildEmploymentCore(),
        location: { district: '', town: '', area: '', workStation: getOfficeLabelFromDistrict('') },
        memberNo: currentMemberNo(),
        joined: new Date().toISOString().slice(0, 10),
        status: 'pending_verification',
        funeral: {
            basicSalary: salary,
            subscription: funeralSubscription(salary),
            coreCover: BOPEU_FUNERAL.coreCover,
            dependants: []
        },
        onboarding: { completed: true, completedAt: new Date().toISOString() }
    };

    LocalStore.set('bopeu_profile', profile);
    LocalStore.set('memberProfile', {
        name: profile.personal.firstName + ' ' + profile.personal.surname,
        omang: profile.personal.omang,
        memberNo: profile.memberNo
    });
    LocalStore.set('bopeu_logged_in', true);

    closeModal('onboarding-modal');
    refreshHeader();
    renderMemberCard();
    renderHome();
    toast('BOPEU profile submitted! Member no ' + profile.memberNo + '. Verification is pending — welcome to the union.');
    switchTab(0);
}

function loadOnboarding() {
    return LocalStore.get('bopeu_profile') || null;
}

/* ---------------- Profile summary (Home) ---------------- */
function renderProfileSummary() {
    const container = document.getElementById('profileSummary');
    if (!container) return;
    const profile = loadOnboarding();
    if (!profile) {
        container.innerHTML =
            '<div class="member-card">' +
            '<div class="member-avatar">?</div>' +
            '<div class="member-info">' +
            '<div class="member-name">No profile yet</div>' +
            '<div class="member-details">Complete member registration to unlock benefits, loans and claims.</div>' +
            '</div></div>';
        return;
    }
    const name = profile.personal.firstName + ' ' + profile.personal.surname;
    const details = (profile.employment.sectorLabel || 'Public Sector') + ' • ' + (profile.employment.jobTitle || 'Member');
    container.innerHTML =
        '<div class="member-card">' +
        '<div class="member-avatar">' + initialsOf(name) + '</div>' +
        '<div class="member-info">' +
        '<div class="member-name">' + esc(name) + '</div>' +
        '<div class="member-details">' + esc(details) + '</div>' +
        '<div class="member-tags">' +
        '<span class="tag blue">' + esc(profile.memberNo || currentMemberNo()) + '</span>' +
        '<span class="tag ' + (profile.status === 'active' ? 'green' : 'amber') + '">' + (profile.status === 'active' ? 'Active' : 'Pending Verification') + '</span>' +
        '</div></div></div>';
}