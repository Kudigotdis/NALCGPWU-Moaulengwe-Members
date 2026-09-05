/* =====================================================
   1. ONBOARDING STATE
===================================================== */
const wiz = {
    step: 0,
    total: 7,
    data: {
        personal: { firstName: '', surname: '', omang: '', phone: '', email: '', dob: '' },
        employment: { sectorId: '', employeeName: '', departmentId: '', cadreGroup: '', jobTitle: '', customJobTitle: '', useCustom: false },
        location: { district: '', town: '', area: '', workStation: '' },
        coverage: { tier: '40000', family: [] },
        payroll: { payrollNumber: '', employeeNumber: '', unionMembershipNumber: '', employmentStatus: '' }
    }
};

function findSectorById(id) {
    return NALCGPWU_EMPLOYMENT_DATA.sectors.find(s => s.id === id) || null;
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

/* =====================================================
   2. WIZARD RENDERING
===================================================== */
function openOnboarding() {
    renderWizard();
    openModal('onboarding-modal');
}

function renderWizard() {
    const progress = document.getElementById('wizardProgress');
    const body = document.getElementById('wizardBody');
    const backBtn = document.getElementById('wizBack');
    const nextBtn = document.getElementById('wizNext');

    const pct = Math.round(((wiz.step + 1) / wiz.total) * 100);
    progress.innerHTML =
        '<span class="bar"><span class="bar-fill" style="width:' + pct + '%"></span></span>' +
        'Step ' + (wiz.step + 1) + ' of ' + wiz.total + ' &mdash; ' + wizardStepLabel(wiz.step);

    backBtn.style.visibility = wiz.step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = wiz.step === wiz.total - 1 ? 'Create My Profile' : 'Continue';

    body.innerHTML = wizardStepHtml(wiz.step);
    bindStep(wiz.step);
}

function wizardStepLabel(step) {
    const labels = ['Welcome', 'Personal Details', 'Employment Sector', 'Employer & Job', 'Work Location', 'Coverage & Family', 'Payroll & Review'];
    return labels[step] || '';
}

function wizardStepHtml(step) {
    switch (step) {
        case 0:
            return '<div class="onboarding-step">' +
                '<h3>Dumela, mmèrêki 👋</h3>' +
                '<p class="subtext">Welcome to NALCGPWU &amp; Mokaulengwe Digital Services. It should take about 3&ndash;5 minutes to set up your member profile.</p>' +
                '<p class="subtext">We will capture your personal, employment, location and payroll details to verify membership records.</p>' +
                '</div>';
        case 1:
            return '<div class="onboarding-step">' +
                '<h3>Personal Details</h3>' +
                '<p class="subtext">Your identity information stored securely on this device.</p>' +
                '<div class="form-group"><label class="form-label">First Name</label><input type="text" id="wzFName" value="' + esc(wiz.data.personal.firstName) + '"></div>' +
                '<div class="form-group"><label class="form-label">Surname</label><input type="text" id="wzSurname" value="' + esc(wiz.data.personal.surname) + '"></div>' +
                '<div class="form-group"><label class="form-label">Omang Number</label><input type="text" id="wzOmang" placeholder="e.g. 090000000" value="' + esc(wiz.data.personal.omang) + '"></div>' +
                '<div class="form-group"><label class="form-label">Date of Birth</label><input type="date" id="wzDob" value="' + esc(wiz.data.personal.dob) + '"></div>' +
                '<div class="form-group"><label class="form-label">Mobile Number</label><input type="tel" id="wzPhone" placeholder="+267 ..." value="' + esc(wiz.data.personal.phone) + '"></div>' +
                '<div class="form-group"><label class="form-label">Email Address (Optional)</label><input type="email" id="wzEmail" value="' + esc(wiz.data.personal.email) + '"></div>' +
                '</div>';
        case 2:
            return sectorStepHtml();
        case 3:
            return employmentStepHtml();
        case 4:
            return locationStepHtml();
        case 5:
            return coverageStepHtml();
        case 6:
            return payrollReviewHtml();
        default:
            return '';
    }
}

function esc(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sectorStepHtml() {
    let html = '<div class="onboarding-step">' +
        '<h3>Where do you work?</h3>' +
        '<p class="subtext">Select the public employment sector you belong to.</p>' +
        '<div class="sector-grid">';
    NALCGPWU_EMPLOYMENT_DATA.sectors.forEach(s => {
        const sel = wiz.data.employment.sectorId === s.id ? ' selected' : '';
        html += '<button type="button" class="sector-card' + sel + '" data-sector="' + s.id + '" onclick="selectWizardSector(\'' + s.id + '\')">' +
            '<span class="sector-icon">' + s.icon + '</span>' +
            '<strong>' + s.shortLabel + '</strong>' +
            '<small>' + s.desc + '</small>' +
            '</button>';
    });
    html += '</div></div>';
    return html;
}

function selectWizardSector(sectorId) {
    wiz.data.employment.sectorId = sectorId;
    wiz.data.employment.employeeName = '';
    wiz.data.employment.departmentId = '';
    wiz.data.employment.cadreGroup = '';
    wiz.data.employment.jobTitle = '';
    wiz.data.employment.useCustom = false;
    renderWizard();
}

function employmentStepHtml() {
    const sector = findSectorById(wiz.data.employment.sectorId);
    if (!sector) {
        return '<div class="onboarding-step"><h3>Pick a Sector first</h3><p class="subtext">Please go back and select your employment sector.</p></div>';
    }

    let html = '<div class="onboarding-step"><h3>' + esc(sector.shortLabel) + '</h3><p class="subtext">Select employer, work area, cadre and job title.</p>';

    html += '<div class="form-group"><label class="form-label">Employer / Institution</label><select id="wzEmployer" onchange="onEmpChange()">';
    html += '<option value="">-- Select --</option>';
    sector.employers.forEach(e => {
        const sel = wiz.data.employment.employeeName === e.id ? ' selected' : '';
        html += '<option value="' + e.id + '"' + sel + '>' + esc(e.label) + '</option>';
    });
    html += '</select></div>';

    const departments = getDepartments(sector.id, wiz.data.employment.employeeName);
    html += '<div class="form-group"><label class="form-label">Department / Work Area</label><select id="wzDepartment" onchange="onDeptChange()">';
    html += '<option value="">-- Select --</option>';
    departments.forEach(d => {
        const sel = wiz.data.employment.departmentId === d.id ? ' selected' : '';
        html += '<option value="' + d.id + '"' + sel + '>' + esc(d.label) + '</option>';
    });
    html += '</select></div>';

    const dept = getSelectedDepartment(sector.id);
    const groups = dept ? (dept.cadreGroups || []) : [];
    html += '<div class="form-group"><label class="form-label">Cadre Group</label><select id="wzCadre" onchange="onCadreChange()">';
    html += '<option value="">-- Select --</option>';
    groups.forEach(g => {
        const sel = wiz.data.employment.cadreGroup === g.label ? ' selected' : '';
        html += '<option value="' + esc(g.label) + '"' + sel + '>' + esc(g.label) + '</option>';
    });
    html += '</select></div>';

    const group = getSelectedCadre(dept);
    const jobs = group ? (group.jobs || []) : [];
    html += '<div class="form-group"><label class="form-label">Job Title</label><select id="wzJobTitle" onchange="onJobChange()">';
    html += '<option value="">-- Select --</option>';
    jobs.forEach(j => {
        const sel = wiz.data.employment.jobTitle === j ? ' selected' : '';
        html += '<option value="' + esc(j) + '"' + sel + '>' + esc(j) + '</option>';
    });
    html += '<option value="__custom__">Other / Not Listed</option>';
    html += '</select></div>';

    const showCustom = wiz.data.employment.jobTitle === '__custom__' || wiz.data.employment.useCustom;
    html += '<div class="form-group" id="wzCustomWrap" style="display:' + (showCustom ? 'block' : 'none') + ';">' +
        '<label class="form-label">Enter your official job title</label>' +
        '<input type="text" id="wzCustomJob" value="' + esc(wiz.data.employment.customJobTitle) + '"></div>';

    html += '</div>';
    return html;
}

function getSelectedDepartment(sectorId) {
    const departments = getDepartments(sectorId, wiz.data.employment.employeeName);
    return departments.find(d => d.id === wiz.data.employment.departmentId) || null;
}

function getSelectedCadre(dept) {
    if (!dept) return null;
    return (dept.cadreGroups || []).find(g => g.label === wiz.data.employment.cadreGroup) || null;
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

function locationStepHtml() {
    let html = '<div class="onboarding-step"><h3>Work Location</h3><p class="subtext">Where is your work station? Used for cluster office routing.</p>';

    html += '<div class="form-group"><label class="form-label">District</label><select id="wzDistrict" onchange="onDistrictChange()">';
    html += '<option value="">-- Select --</option>';
    (window.LOCATIONS_DATA && LOCATIONS_DATA.districts ? LOCATIONS_DATA.districts : []).forEach(d => {
        const sel = wiz.data.location.district === d.name ? ' selected' : '';
        html += '<option value="' + esc(d.name) + '"' + sel + '>' + esc(d.name) + '</option>';
    });
    html += '</select></div>';

    const towns = getTowns(wiz.data.location.district);
    html += '<div class="form-group"><label class="form-label">Town / Village</label><select id="wzTown" onchange="onTownChange()">';
    html += '<option value="">-- Select --</option>';
    towns.forEach(t => {
        const sel = wiz.data.location.town === t.name ? ' selected' : '';
        html += '<option value="' + esc(t.name) + '"' + sel + '>' + esc(t.name) + '</option>';
    });
    html += '</select></div>';

    const areas = getAreas(wiz.data.location.district, wiz.data.location.town);
    html += '<div class="form-group"><label class="form-label">Area / Ward</label><select id="wzArea" onchange="onAreaChange()">';
    html += '<option value="">-- Select --</option>';
    areas.forEach(a => {
        const sel = wiz.data.location.area === a ? ' selected' : '';
        html += '<option value="' + esc(a) + '"' + sel + '>' + esc(a) + '</option>';
    });
    html += '</select></div>';

    html += '<div class="form-group"><label class="form-label">Work Station</label><input type="text" id="wzWorkStation" placeholder="e.g. Princess Marina Hospital, Molepolole Depot..." value="' + esc(wiz.data.location.workStation) + '"></div>';
    html += '</div>';
    return html;
}

function getTowns(district) {
    if (!window.LOCATIONS_DATA || !LOCATIONS_DATA.districts) return [];
    const d = LOCATIONS_DATA.districts.find(x => x.name === district);
    return d ? (d.towns || []) : [];
}

function getAreas(district, town) {
    const towns = getTowns(district);
    const t = towns.find(x => x.name === town);
    return t ? (t.areas || []) : [];
}

function onDistrictChange() {
    wiz.data.location.district = document.getElementById('wzDistrict').value;
    wiz.data.location.town = '';
    wiz.data.location.area = '';
    renderWizard();
}

function onTownChange() {
    wiz.data.location.town = document.getElementById('wzTown').value;
    wiz.data.location.area = '';
    renderWizard();
}

function onAreaChange() {
    wiz.data.location.area = document.getElementById('wzArea').value;
}

/* =====================================================
   4. COVERAGE & FAMILY STEP
   Choose cover tier, add spouse/children/parents to the
   policy. Live monthly total = union P30 + member rate
   (by tier + age band) + each family member's own rate.
===================================================== */
function coverageStepHtml() {
    const tier = wiz.data.coverage.tier || '40000';
    const memberBand = ageBandFromDob(wiz.data.personal.dob);
    const total = computePolicyMonthlyTotal(tier, memberBand, wiz.data.coverage.family);

    let html = '<div class="onboarding-step"><h3>Coverage &amp; Family</h3>';
    html += '<p class="subtext">Choose your cover tier, then add the family members to cover on your Mokaulengwe policy.</p>';

    html += '<div class="form-group"><label class="form-label">Coverage Tier</label><select id="wzCoverTier" onchange="onWizardTierChange()">';
    NALCGPWU_PREMIUM.tiers.forEach(t => {
        const sel = t.value === tier ? ' selected' : '';
        html += '<option value="' + t.value + '"' + sel + '>' + esc(t.label) + '</option>';
    });
    html += '</select></div>';

    html += '<div class="stat-box">' +
        '<div class="stat-label">Your monthly insurance &mdash; ' + esc(ageBandLabel(memberBand)) + '</div>' +
        '<div class="stat-value">P ' + total.memberRate.toFixed(2) + '</div>' +
        '</div>';

    html += '<div class="card-sub" style="margin-top:8px;">Add family member to policy (' + wiz.data.coverage.family.length + ' / ' + NALCGPWU_PREMIUM.maxNominees + ')</div>';
    html += '<div class="form-group"><label class="form-label">Relation</label>' +
        '<select id="wzFamRelation"><option value="Spouse">Spouse</option><option value="Child">Child</option><option value="Parent / Extended">Parent / Extended</option></select></div>';
    html += '<div class="form-group"><label class="form-label">Full Name</label><input type="text" id="wzFamName" placeholder="e.g. Boitumelo Mokaulengwe"></div>';
    html += '<div class="form-group"><label class="form-label">Date of Birth</label><input type="date" id="wzFamDob"></div>';
    html += '<button type="button" class="btn btn-secondary btn-small" onclick="addWizardFamily()" style="width:100%;">Add to Policy</button>';

    if (wiz.data.coverage.family.length) {
        html += '<div class="card-sub" style="margin-top:12px;">Family on your policy</div>';
        html += '<div id="wizFamilyList">';
        wiz.data.coverage.family.forEach(f => {
            const a = initialsOf(f.name);
            html +=
                '<div class="member-card dismissable">' +
                '<button type="button" class="card-x" onclick="removeWizardFamily(\'' + f.id + '\')" aria-label="Remove ' + esc(f.name) + '">&times;</button>' +
                '<div class="member-avatar">' + esc(a) + '</div>' +
                '<div class="member-info">' +
                '<div class="member-name">' + esc(f.name) + '</div>' +
                '<div class="member-details">' + esc(f.relation) + (f.childBracket ? ' (' + esc(f.childBracket) + ')' : '') + ' &bull; ' + esc(f.cover) + '</div>' +
                '<div class="member-tags">' +
                '<span class="tag ' + (f.status === 'active' ? 'green' : 'amber') + '">' + (f.status === 'active' ? 'Active' : 'Activating (6 deductions)') + '</span>' +
                '</div>' +
                '</div></div>';
        });
        html += '</div>';
    }

    html += '<div class="stat-box" style="margin-top:12px;">' +
        '<div class="stat-label">Estimated Monthly Total</div>' +
        '<div class="stat-value" id="wizMonthlyTotal">P ' + total.total.toFixed(2) + '</div>' +
        '<div class="stat-label">Union P ' + total.unionFee.toFixed(2) + ' + you P ' + total.memberRate.toFixed(2) + ' + family P ' + total.familyRate.toFixed(2) + '</div>' +
        '</div>';

    html += '<p class="subtext" style="margin-top:6px;">Spouse &amp; children activate from the first deduction. Parents / extended family activate after ' + NALCGPWU_PREMIUM.extendedWaitingMonths + ' consecutive deductions.</p>';
    html += '</div>';
    return html;
}

function onWizardTierChange() {
    const t = document.getElementById('wzCoverTier');
    if (t) wiz.data.coverage.tier = t.value;
    renderWizard();
}

function addWizardFamily() {
    const name = document.getElementById('wzFamName').value.trim();
    const relation = document.getElementById('wzFamRelation').value;
    const dob = document.getElementById('wzFamDob').value;

    if (!name) { toast('Please enter the family member\'s full name.'); return; }
    if (!dob) { toast('Please enter their date of birth.'); return; }
    if (ageFromDob(dob) === null) { toast('Please enter a valid date of birth.'); return; }
    if (relation === 'Child' && !childBracketFromDob(dob)) { toast('Children on the policy must be under 21 years of age.'); return; }
    if (wiz.data.coverage.family.length >= NALCGPWU_PREMIUM.maxNominees) {
        toast('Maximum of ' + NALCGPWU_PREMIUM.maxNominees + ' family nominees per policy.');
        return;
    }

    const member = buildFamilyMember(name, relation, dob, wiz.data.coverage.tier || '40000');
    wiz.data.coverage.family.push(member);
    renderWizard();
    toast(member.relation + ' added. ' +
        (member.status === 'active' ? 'Active from the first deduction.' : 'Activating after ' + NALCGPWU_PREMIUM.extendedWaitingMonths + ' consecutive deductions.'));
}

function removeWizardFamily(id) {
    wiz.data.coverage.family = wiz.data.coverage.family.filter(f => f.id !== id);
    renderWizard();
}

function payrollReviewHtml() {
    const emp = wiz.data.employment;
    const sector = findSectorById(emp.sectorId);
    const employerObj = getEmployer(emp.sectorId, emp.employeeName);
    const departments = getDepartments(emp.sectorId, emp.employeeName);
    const deptObj = departments.find(d => d.id === emp.departmentId) || null;
    const jobLabel = emp.useCustom ? emp.customJobTitle : emp.jobTitle;

    const payroll = wiz.data.payroll;
    const tier = wiz.data.coverage.tier || '40000';
    const tierLabel = (NALCGPWU_PREMIUM.tiers.find(t => t.value === tier) || {}).label || '';
    const memberBand = ageBandFromDob(wiz.data.personal.dob);
    const calc = computePolicyMonthlyTotal(tier, memberBand, wiz.data.coverage.family);
    let html = '<div class="onboarding-step"><h3>Payroll &amp; Review</h3><p class="subtext">Confirm your details before creating your profile.</p>';

    html += '<div class="form-group"><label class="form-label">Payroll Number</label><input type="text" id="wzPayrollNo" value="' + esc(payroll.payrollNumber) + '"></div>';
    html += '<div class="form-group"><label class="form-label">Employee Number</label><input type="text" id="wzEmpNo" value="' + esc(payroll.employeeNumber) + '"></div>';
    html += '<div class="form-group"><label class="form-label">Union Membership Number</label><input type="text" id="wzUnionNo" value="' + esc(payroll.unionMembershipNumber) + '"></div>';
    html += '<div class="form-group"><label class="form-label">Employment Status</label><select id="wzEmpStatus">';
    const statuses = ['Permanent', 'Contract', 'Temporary', 'Other'];
    statuses.forEach(s => {
        const sel = payroll.employmentStatus === s ? ' selected' : '';
        html += '<option value="' + s + '"' + sel + '>' + s + '</option>';
    });
    html += '</select></div>';

    html += '<div class="alert alert-info">Review your details:</div>';
    html += '<div class="policy-card"><div class="policy-row"><span class="policy-row-label">Name</span><span class="policy-row-value">' + esc(wiz.data.personal.firstName + ' ' + wiz.data.personal.surname) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Omang</span><span class="policy-row-value">' + esc(wiz.data.personal.omang) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Sector</span><span class="policy-row-value">' + (sector ? esc(sector.shortLabel) : '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Employer</span><span class="policy-row-value">' + (employerObj ? esc(employerObj.label) : '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Dept / Area</span><span class="policy-row-value">' + (deptObj ? esc(deptObj.label) : '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Job Title</span><span class="policy-row-value">' + esc(jobLabel || '&mdash;') + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">District</span><span class="policy-row-value">' + esc(wiz.data.location.district) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Work Station</span><span class="policy-row-value">' + esc(wiz.data.location.workStation) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Verification</span><span class="policy-row-value red">Pending</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Cover Tier</span><span class="policy-row-value">' + esc(tierLabel) + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Family on Policy</span><span class="policy-row-value">' + wiz.data.coverage.family.length + ' / ' + NALCGPWU_PREMIUM.maxNominees + '</span></div>';
    html += '<div class="policy-row"><span class="policy-row-label">Monthly Premium</span><span class="policy-row-value red">P ' + calc.total.toFixed(2) + ' (incl. P ' + calc.unionFee.toFixed(2) + ' union)</span></div>';
    html += '</div>';
    html += '</div>';
    return html;
}

/* =====================================================
   3. WIZARD NAVIGATION
===================================================== */
function bindStep(step) {
    if (step === 1) {
        const read = (id) => document.getElementById(id).value;
        wiz.data.personal.firstName = read('wzFName');
        wiz.data.personal.surname = read('wzSurname');
        wiz.data.personal.omang = read('wzOmang');
        wiz.data.personal.dob = read('wzDob');
        wiz.data.personal.phone = read('wzPhone');
        wiz.data.personal.email = read('wzEmail');
    }
    if (step === 4) {
        const ws = document.getElementById('wzWorkStation');
        if (ws) wiz.data.location.workStation = ws.value;
    }
}

function wizardBack() {
    if (wiz.step === 0) return;
    collectStep();
    wiz.step -= 1;
    renderWizard();
}

function collectStep() {
    const s = wiz.step;
    if (s === 1) {
        const read = (id) => document.getElementById(id).value;
        wiz.data.personal.firstName = read('wzFName');
        wiz.data.personal.surname = read('wzSurname');
        wiz.data.personal.omang = read('wzOmang');
        wiz.data.personal.dob = read('wzDob');
        wiz.data.personal.phone = read('wzPhone');
        wiz.data.personal.email = read('wzEmail');
    }
    if (s === 2) {
        // sector already saved via selectWizardSector
    }
    if (s === 3) {
        wiz.data.employment.employeeName = document.getElementById('wzEmployer').value;
        wiz.data.employment.departmentId = document.getElementById('wzDepartment').value;
        wiz.data.employment.cadreGroup = document.getElementById('wzCadre').value;
        wiz.data.employment.jobTitle = document.getElementById('wzJobTitle').value;
        const cj = document.getElementById('wzCustomJob');
        if (cj) wiz.data.employment.customJobTitle = cj.value;
        wiz.data.employment.useCustom = wiz.data.employment.jobTitle === '__custom__';
    }
    if (s === 4) {
        wiz.data.location.district = document.getElementById('wzDistrict').value;
        wiz.data.location.town = document.getElementById('wzTown').value;
        wiz.data.location.area = document.getElementById('wzArea').value;
        const ws = document.getElementById('wzWorkStation');
        if (ws) wiz.data.location.workStation = ws.value;
    }
    if (s === 5) {
        const t = document.getElementById('wzCoverTier');
        if (t) wiz.data.coverage.tier = t.value;
    }
    if (s === 5) {
        wiz.data.payroll.payrollNumber = document.getElementById('wzPayrollNo').value;
        wiz.data.payroll.employeeNumber = document.getElementById('wzEmpNo').value;
        wiz.data.payroll.unionMembershipNumber = document.getElementById('wzUnionNo').value;
        wiz.data.payroll.employmentStatus = document.getElementById('wzEmpStatus').value;
    }
}

function wizardNext() {
    collectStep();
    if (!validateStep(wiz.step)) return;

    if (wiz.step === wiz.total - 1) {
        createProfile();
        return;
    }
    wiz.step += 1;
    renderWizard();
}

function validateStep(step) {
    if (step === 1) {
        if (!wiz.data.personal.firstName || !wiz.data.personal.surname) { toast('Please enter your first name and surname.'); return false; }
        if (!wiz.data.personal.omang) { toast('Please enter your Omang number.'); return false; }
        if (!wiz.data.personal.dob) { toast('Please enter your date of birth.'); return false; }
        if (ageFromDob(wiz.data.personal.dob) === null) { toast('Please enter a valid date of birth.'); return false; }
        if (ageFromDob(wiz.data.personal.dob) < 18) { toast('Members must be at least 18 years old.'); return false; }
        if (!wiz.data.personal.phone) { toast('Please enter your mobile number.'); return false; }
    }
    if (step === 2) {
        if (!wiz.data.employment.sectorId) { toast('Please select your employment sector.'); return false; }
    }
    if (step === 3) {
        if (!wiz.data.employment.employeeName) { toast('Please select your employer / institution.'); return false; }
        if (!wiz.data.employment.departmentId) { toast('Please select your department / work area.'); return false; }
        if (!wiz.data.employment.cadreGroup) { toast('Please select your cadre group.'); return false; }
        const job = wiz.data.employment.jobTitle;
        if (!job) { toast('Please select your job title.'); return false; }
        if (job === '__custom__' && !wiz.data.employment.customJobTitle) { toast('Please enter your job title.'); return false; }
    }
    if (step === 4) {
        if (!wiz.data.location.district) { toast('Please select your district.'); return false; }
        if (!wiz.data.location.workStation) { toast('Please enter your work station.'); return false; }
    }
    if (step === 5) {
        if (wiz.data.coverage.family.length > NALCGPWU_PREMIUM.maxNominees) {
            toast('Maximum of ' + NALCGPWU_PREMIUM.maxNominees + ' family nominees per policy.');
            return false;
        }
    }
    if (step === 6) {
        if (!wiz.data.payroll.payrollNumber) { toast('Please enter your payroll number.'); return false; }
        if (!wiz.data.payroll.employmentStatus) { toast('Please select your employment status.'); return false; }
    }
    return true;
}

/* =====================================================
   4. PROFILE PERSISTENCE
===================================================== */
function createProfile() {
    const jobLabel = wiz.data.employment.useCustom
        ? wiz.data.employment.customJobTitle
        : wiz.data.employment.jobTitle;

    const profile = {
        personal: { ...wiz.data.personal },
        employment: {
            sectorId: wiz.data.employment.sectorId,
            employeeName: wiz.data.employment.employeeName,
            departmentId: wiz.data.employment.departmentId,
            cadreGroup: wiz.data.employment.cadreGroup,
            jobTitle: jobLabel,
            sectorLabel: (findSectorById(wiz.data.employment.sectorId) || {}).shortLabel || '',
            employerLabel: (getEmployer(wiz.data.employment.sectorId, wiz.data.employment.employeeName) || {}).label || '',
            departmentLabel: (getDepartments(wiz.data.employment.sectorId, wiz.data.employment.employeeName).find(d => d.id === wiz.data.employment.departmentId) || {}).label || '',
            cadreLabel: wiz.data.employment.cadreGroup
        },
        location: { ...wiz.data.location },
        payroll: {
            ...wiz.data.payroll,
            verificationStatus: 'pending',
            stopOrderStatus: 'pending'
        },
        onboarding: {
            completed: true,
            completedAt: new Date().toISOString()
        }
    };

    LocalStore.set('nalcgpwu_member_onboarding', profile);
    LocalStore.set('memberProfile', {
        name: profile.personal.firstName + ' ' + profile.personal.surname,
        omang: profile.personal.omang
    });

    const tier = wiz.data.coverage.tier || '40000';
    const memberBand = ageBandFromDob(wiz.data.personal.dob);
    const calc = computePolicyMonthlyTotal(tier, memberBand, wiz.data.coverage.family);

    const policy = {
        tier: tier,
        member: {
            name: profile.personal.firstName + ' ' + profile.personal.surname,
            omang: profile.personal.omang,
            dob: profile.personal.dob,
            ageBand: memberBand,
            rate: calc.memberRate
        },
        family: wiz.data.coverage.family.slice(),
        unionFee: calc.unionFee,
        monthlyInsurance: calc.memberRate + calc.familyRate,
        monthlyTotal: calc.total,
        currency: NALCGPWU_PREMIUM.currency,
        createdAt: profile.onboarding.completedAt,
        status: 'pending_verification'
    };
    savePolicy(policy);

    if (wiz.data.coverage.family.length) {
        LocalStore.set('mokau_dependents', wiz.data.coverage.family.slice());
    }

    closeModal('onboarding-modal');
    renderProfileSummary();
    toast('Profile created successfully! Verification is pending membership/payroll confirmation.');
    switchTab(4);
}

function loadOnboarding() {
    return LocalStore.get('nalcgpwu_member_onboarding') || null;
}

/* =====================================================
   5. PROFILE SUMMARY (MENU TAB)
===================================================== */
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
            '<div class="member-details">Complete onboarding to unlock coverage, loans and claims eligibility.</div>' +
            '</div></div>';
        return;
    }

    const name = profile.personal.firstName + ' ' + profile.personal.surname;
    const details = profile.employment.sectorLabel + ' • ' + profile.employment.employerLabel + ' • ' + profile.employment.jobTitle;

    container.innerHTML =
        '<div class="member-card">' +
        '<div class="member-avatar">' + initialsOf(name) + '</div>' +
        '<div class="member-info">' +
        '<div class="member-name">' + esc(name) + '</div>' +
        '<div class="member-details">' + esc(details) + '</div>' +
        '<div class="member-tags">' +
        '<span class="tag">Omang ' + esc(profile.personal.omang) + '</span>' +
        '<span class="tag amber">' + (profile.payroll.verificationStatus === 'pending' ? 'Pending Verification' : 'Verified') + '</span>' +
        '</div></div></div>';
}

document.addEventListener('DOMContentLoaded', () => {
    renderProfileSummary();
});