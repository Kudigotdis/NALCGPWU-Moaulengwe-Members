/* =====================================================
   1. NOTICES / UPDATES (BOPEU)
   ===================================================== */
function getNotices() {
    return BOPEU_NOTICES;
}

const NOTICE_ARROW_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

const NOTICE_WA_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-4-4.6-4.2-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.9.9c.5.2.5.3.5.5s0 .7-.2 1.2z"/></svg>';

function clampWords(text, max) {
    const words = String(text || '').split(' ');
    if (words.length <= max) return text;
    return words.slice(0, max).join(' ') + '…';
}

function renderNotices(filter) {
    const container = document.getElementById('noticesList');
    if (!container) return;

    let notices = getNotices();
    if (filter && filter.trim()) {
        const f = filter.trim().toLowerCase();
        notices = notices.filter(n =>
            (n.title || '').toLowerCase().indexOf(f) >= 0 ||
            (n.body || '').toLowerCase().indexOf(f) >= 0
        );
    }

    const countEl = document.getElementById('noticeCount');
    if (countEl) countEl.textContent = String(notices.length);

    const emptyEl = document.getElementById('noticeEmpty');
    if (emptyEl) emptyEl.hidden = notices.length > 0;

    let html = '';
    notices.forEach(n => {
        const searchText = (n.title || '') + ' ' + (n.body || '');
        const isWa = /whatsapp/i.test(searchText);
        const whatsappTag = isWa ?
            '<button class="feed-tag whatsapp" onclick="openArticle(\'' + escAttr(n.id) + '\')">' +
                NOTICE_WA_SVG + 'WhatsApp' +
            '</button>' : '';
        html +=
            '<article class="feed-post" id="post-' + escAttr(n.id) + '" data-search="' + escAttr(searchText.toLowerCase()) + '">' +
            '<div class="feed-card">' +
            '<div class="feed-meta"><span class="feed-act">Update</span><span class="feed-date">' + esc(n.date || '') + '</span></div>' +
            '<h3 class="feed-title" onclick="openArticle(\'' + escAttr(n.id) + '\')">' + esc(n.title) + '</h3>' +
            '<p class="feed-body" onclick="openArticle(\'' + escAttr(n.id) + '\')">' + esc(clampWords(n.body, 22)) + '</p>' +
            '<div class="feed-actions">' +
            '<button class="feed-tag" onclick="openReview(\'' + escAttr(n.id) + '\')">Read update' + NOTICE_ARROW_SVG + '</button>' +
            whatsappTag +
            '</div>' +
            '</div>' +
            '</article>';
    });
    container.innerHTML = html;
}

function handleSearch() {
    const qInput = document.getElementById('updateSearch');
    if (!qInput) return;
    const q = (qInput.value || '').trim().toLowerCase();

    const notices = Array.from(document.querySelectorAll('#noticesList .feed-post'));
    const articles = Array.from(document.querySelectorAll('#articleList .member-card'));

    let nCount = 0, aCount = 0;

    notices.forEach(el => {
        const match = !q || (el.dataset.search || '').toLowerCase().indexOf(q) >= 0;
        el.hidden = !match;
        if (match) nCount++;
    });

    articles.forEach(el => {
        const match = !q || (el.dataset.search || '').toLowerCase().indexOf(q) >= 0;
        el.hidden = !match;
        if (match) aCount++;
    });

    const noticeCount = document.getElementById('noticeCount');
    const articleCount = document.getElementById('articleCount');
    const noticeEmpty = document.getElementById('noticeEmpty');
    const articleEmpty = document.getElementById('articleEmpty');
    if (noticeCount) noticeCount.textContent = String(nCount);
    if (articleCount) articleCount.textContent = String(aCount);
    if (noticeEmpty) noticeEmpty.hidden = nCount > 0;
    if (articleEmpty) articleEmpty.hidden = aCount > 0;
}

function openReview(id) {
    const notice = getNotices().find(n => n.id === id);
    if (!notice) return;
    openArticleModal(id);
}

function openArticleModal(id) {
    const notice = getNotices().find(n => n.id === id);
    if (!notice) return;
    const title = document.getElementById('articleTitle');
    const date = document.getElementById('articleDate');
    const body = document.getElementById('articleBody');
    if (title) title.textContent = notice.title;
    if (date) date.textContent = (notice.category || 'Update') + ' — ' + (notice.date || '');
    if (body) body.textContent = notice.body;
    openModal('article-modal');
}

function openArticle(id) {
    openArticleModal(id);
}

function renderArticleSidebar() {
    const container = document.getElementById('articleList');
    if (!container) return;

    const countEl = document.getElementById('articleCount');
    if (countEl) countEl.textContent = String(getNotices().length);

    const emptyEl = document.getElementById('articleEmpty');
    if (emptyEl) emptyEl.hidden = getNotices().length > 0;

    let html = '';
    getNotices().forEach(n => {
        const searchText = (n.title || '') + ' ' + (n.body || '');
        html += '<div class="member-card" onclick="openArticleModal(\'' + escAttr(n.id) + '\')" ' +
            'data-search="' + escAttr(searchText.toLowerCase()) + '">' +
            '<div class="member-avatar">' + esc(initialsOf(n.title).slice(0, 1)) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(n.title) + '</div>' +
            '<div class="member-details">' + esc(n.date || '') + '</div>' +
            '</div>' +
            '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>' +
            '</div>';
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotices();
    renderArticleSidebar();

    const search = document.getElementById('updateSearch');
    if (search) {
        search.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                e.target.value = '';
                handleSearch();
            }
        });
    }
});