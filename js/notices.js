/* =====================================================
   1. NOTICEBOARD
===================================================== */
function renderNotices() {
    const container = document.getElementById('noticesList');
    if (!container) return;

    const saved = LocalStore.get('mokau_notices');
    const notices = saved && Array.isArray(saved) ? saved : NALCGPWU_NOTICES;

    if (!notices.length) {
        container.innerHTML = '<div class="empty-state">No notices at the moment.</div>';
        return;
    }

    let html = '';
    notices.forEach(n => {
        const name = esc(n.title);
        html +=
            '<div class="member-card dismissable" data-notice="' + esc(n.id) + '">' +
            '<button type="button" class="card-x" onclick="dismissNotice(\'' + n.id + '\')" aria-label="Dismiss ' + name + '">&times;</button>' +
            '<div class="member-avatar">' + initialsOf(n.title) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + name + '</div>' +
            '<div class="member-details">' + esc(n.body) + '</div>' +
            '<div class="member-tags">' +
            '<span class="tag">' + esc(n.date) + '</span>' +
            '</div>' +
            '</div></div>';
    });
    container.innerHTML = html;

    LocalStore.set('mokau_notices', notices);
}

function dismissNotice(id) {
    const saved = LocalStore.get('mokau_notices');
    const list = (saved && Array.isArray(saved) ? saved : NALCGPWU_NOTICES).filter(n => n.id !== id);
    LocalStore.set('mokau_notices', list);
    renderNotices();
    toast('Notice dismissed.');
}

/* =====================================================
   2. ARTICLES & SEARCH
===================================================== */
function renderArticles() {
    const container = document.getElementById('articlesContainer');
    if (!container) return;

    let html = '';
    NALCGPWU_ARTICLES.forEach(a => {
        html +=
            '<div class="article-view" onclick="showArticle(\'' + a.id + '\')">' +
            '<div class="article-title">' + esc(a.title) + '</div>' +
            '<div class="article-preview">' + esc(a.preview) + '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

function showArticle(articleId) {
    const found = NALCGPWU_ARTICLES.find(a => a.id === articleId);
    if (found) openModal(found.modalId);
}

function searchArticles() {
    const term = document.getElementById('searchInput').value.toLowerCase().trim();

    const articles = document.querySelectorAll('#articlesContainer .article-view');
    articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        article.style.display = text.includes(term) ? 'block' : 'none';
    });

    const notices = document.querySelectorAll('#noticesList .member-card');
    notices.forEach(n => {
        const text = n.textContent.toLowerCase();
        n.style.display = text.includes(term) ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotices();
    renderArticles();
});