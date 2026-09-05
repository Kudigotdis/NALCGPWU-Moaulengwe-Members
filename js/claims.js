/* =====================================================
   1. EMERGENCY FUNERAL CLAIM
===================================================== */
function submitClaim() {
    const deceased = {
        type: document.getElementById('deceasedType').value,
        name: document.getElementById('deceasedName').value,
        dateOfDeath: document.getElementById('dateOfDeath').value,
        hasCertificate: document.getElementById('hasCertificate').checked,
        bank: document.getElementById('bankName').value,
        accountNumber: document.getElementById('accountNumber').value
    };

    if (!deceased.name || !deceased.dateOfDeath || !deceased.bank || !deceased.type) {
        toast('Please fill the deceased details, date of death and bank information.');
        return;
    }

    const claim = {
        id: 'CLAIM-' + Date.now(),
        ...deceased,
        status: 'pending_verification',
        submittedAt: new Date().toISOString()
    };

    LocalStore.set('emergencyClaim', claim);

    toast('Claim submitted!\nReference: ' + claim.id + '\n\nProcessing begins now.\nYou will receive updates via WhatsApp.');
    whatsappShare('claim', 'Emergency funeral claim ' + claim.id + ' submitted for ' + deceased.name + '. Bank: ' + deceased.bank);
}

/* =====================================================
   2. CHECKLIST
===================================================== */
function bindChecklist() {
    document.querySelectorAll('.doc-check').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            this.parentElement.classList.toggle('checked', this.checked);
        });
    });
}

/* =====================================================
   3. OFFILINE DOCUMENT VAULT
===================================================== */
function getDocs() {
    return LocalStore.get('mokau_docs') || [];
}

function renderDocs() {
    const container = document.getElementById('docsList');
    if (!container) return;

    const docs = getDocs();
    if (!docs.length) {
        container.innerHTML = '<div class="empty-state">No documents stored yet.</div>';
        return;
    }

    let html = '';
    docs.forEach((doc, index) => {
        html +=
            '<div class="member-card">' +
            '<div class="member-avatar">' + initialsOf(doc.title) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(doc.title) + '</div>' +
            '<div class="member-details">' + esc(doc.type) + (doc.fileName ? ' &bull; ' + esc(doc.fileName) : '') + '</div>' +
            '<div class="member-tags"><span class="tag blue">' + esc(doc.date) + '</span></div>' +
            '</div>' +
            '<button class="btn btn-secondary btn-small" style="flex:0 0 auto; width:auto;" onclick="removeDoc(' + index + ')">Remove</button>' +
            '</div>';
    });
    container.innerHTML = html;
}

function addDocToVault() {
    const type = document.getElementById('docType').value;
    const title = document.getElementById('docTitle').value.trim();
    const file = document.getElementById('docFile');
    let fileName = '';
    if (file && file.files && file.files.length) {
        fileName = file.files[0].name;
    }

    if (!title && !fileName) {
        toast('Enter a document name or attach a file.');
        return;
    }

    const docs = getDocs();
    docs.push({
        id: 'DOC-' + Date.now(),
        type,
        title: title || fileName,
        fileName,
        date: new Date().toLocaleDateString()
    });

    LocalStore.set('mokau_docs', docs);
    document.getElementById('docTitle').value = '';
    if (file) file.value = '';
    renderDocs();
    toast('Document stored in your offline vault.');
}

function removeDoc(index) {
    const docs = getDocs();
    docs.splice(index, 1);
    LocalStore.set('mokau_docs', docs);
    renderDocs();
}

document.addEventListener('DOMContentLoaded', () => {
    bindChecklist();
    renderDocs();
});