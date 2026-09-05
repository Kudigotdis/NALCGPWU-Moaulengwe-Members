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
        html +=
            '<div class="notice-card">' +
            '<div class="notice-card-title">' + esc(n.title) + '</div>' +
            '<div class="notice-card-body">' + esc(n.body) + '</div>' +
            '<div class="notice-card-date">' + esc(n.date) + '</div>' +
            '</div>';
    });
    container.innerHTML = html;

    LocalStore.set('mokau_notices', notices);
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

    const notices = document.querySelectorAll('#noticesList .notice-card');
    notices.forEach(n => {
        const text = n.textContent.toLowerCase();
        n.style.display = text.includes(term) ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotices();
    renderArticles();
});