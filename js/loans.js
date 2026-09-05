/* =====================================================
   1. LOAN ELIGIBILITY CALCULATOR
===================================================== */
const SECTOR_MULTIPLIERS = {
    central: 3,
    council: 2.5,
    parastatal: 3,
    landboard: 2.5
};

function calculateLoanEligibility() {
    const sector = document.getElementById('sector').value;
    const salary = parseFloat(document.getElementById('salary').value);

    if (!sector || !salary || salary <= 0) return;

    const multiplier = SECTOR_MULTIPLIERS[sector] || 3;
    const maxLoan = Math.min(salary * multiplier, 50000);

    document.getElementById('loanResult').style.display = 'block';
    document.getElementById('maxLoan').textContent = 'P ' + maxLoan.toFixed(2);

    LocalStore.set('loanEligibility', {
        sector,
        salary,
        maxLoan,
        calculatedAt: new Date().toISOString()
    });
}

/* =====================================================
   2. LOAN APPLICATION
===================================================== */
function applyForLoan() {
    const eligibility = LocalStore.get('loanEligibility');
    if (!eligibility) {
        toast('Please calculate your eligibility first.');
        return;
    }

    const loanRequest = {
        id: 'LOAN-' + Date.now(),
        ...eligibility,
        status: 'pending',
        submittedAt: new Date().toISOString()
    };

    LocalStore.set('loanRequest', loanRequest);
    toast('Loan application submitted!\nRef: ' + loanRequest.id + '\n\nCheck WhatsApp for updates.');
    whatsappShare('loan', 'Loan application ' + loanRequest.id + ' submitted. Max eligible: P ' + eligibility.maxLoan.toFixed(2));
}