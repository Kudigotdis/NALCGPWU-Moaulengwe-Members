/* =====================================================
   1. ADMIN STATS
   ===================================================== */
function renderAdminStats() {
    const totalEl = document.getElementById('adminTotal');
    const pendingEl = document.getElementById('adminPending');
    if (!totalEl || !pendingEl) return;

    const savedMembers = LocalStore.get('bopeu_members');
    const members = savedMembers && Array.isArray(savedMembers) ? savedMembers : BOPEU_MOCK_MEMBERS;

    const active = members.filter(m => m.status === 'active').length;
    const pending = members.filter(m => m.status === 'pending_verification').length;

    totalEl.textContent = active;
    pendingEl.textContent = pending;
}

/* =====================================================
   2. MEMBER SEARCH & FILTER
   ===================================================== */
function getFilteredMembers() {
    const savedMembers = LocalStore.get('bopeu_members');
    const members = savedMembers && Array.isArray(savedMembers) ? savedMembers : BOPEU_MOCK_MEMBERS;

    const term = (document.getElementById('adminSearch').value || '').toLowerCase().trim();
    const sector = document.getElementById('adminSector').value;
    const status = document.getElementById('adminStatus').value;

    return members.filter(m => {
        if (sector && m.sector !== sector) return false;
        if (status && m.status !== status) return false;
        if (term) {
            const haystack = (m.name + ' ' + m.omang + ' ' + m.memberNo + ' ' + m.employer + ' ' + m.jobTitle + ' ' + m.district).toLowerCase();
            if (haystack.indexOf(term) < 0) return false;
        }
        return true;
    });
}

function renderAdminMembers() {
    const container = document.getElementById('adminMembersList');
    if (!container) return;

    const members = getFilteredMembers();

    if (!members.length) {
        container.innerHTML = '<div class="empty-state">No members match your filters.</div>';
        return;
    }

    let html = '';
    members.forEach(m => {
        const statusTag = m.status === 'active'
            ? '<span class="tag green">Active</span>'
            : '<span class="tag amber">Pending Verification</span>';

        html +=
            '<div class="member-card">' +
            '<div class="member-avatar">' + initialsOf(m.name) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(m.name) + '</div>' +
            '<div class="member-details">' + esc(m.employer) + ' &bull; ' + esc(m.jobTitle) + '</div>' +
            '<div class="member-tags">' +
            '<span class="tag">' + esc(m.sectorLabel) + '</span>' +
            '<span class="tag blue">' + esc(m.district) + '</span>' +
            '<span class="tag">' + esc(m.memberNo) + '</span>' +
            statusTag +
            '</div>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('admin-modal')) {
        renderAdminStats();
        renderAdminMembers();
    }
});