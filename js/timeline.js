/* =====================================================
   BOPEU TIMELINE / NEWS FEED  (js/timeline.js)
   Renders the Home tab as a timeline-only member feed
   (modeled on the Bopeu2 reference feed). Posts are
   defined in data.js (BOPEU_TIMELINE_POSTS). Tapping a
   post opens the full story with accordion sections.
   ===================================================== */
console.warn('timeline.js loaded');

function timelineCoverFor(post) {
    if (!post.cover) return '';
    return post.cover;
}

function timelineTagBadge(post) {
    if (!post.tag && !post.category) return '';
    const t = post.tag || post.category;
    const cls = (post.tag || '').toLowerCase().replace(/\s+/g, '-') || 'news';
    return '<span class="feed-label ' + escAttr(cls) + '">' + esc(t) + '</span>';
}

function renderTimeline() {
    const container = document.getElementById('timelineFeed');
    if (!container) return;

    const posts = window.BOPEU_TIMELINE_POSTS || [];
    if (!posts.length) {
        container.innerHTML = '<div class="empty-state">The union feed is still being prepared. Check back soon.</div>';
        return;
    }

    container.innerHTML =
        '<div class="tl-intro">' +
        '<h2>BOPEU News &amp; Updates</h2>' +
        '<p>Hand-picked stories, benefits and campaigns from the union feed &mdash; with real campaign artwork so you can verify every post at a glance.</p>' +
        '</div>' +
        '<div class="feed-list">';

    posts.forEach(p => {
        const cover = timelineCoverFor(p);
        container.innerHTML +=
            '<article class="feed-card" onclick="openTimelinePost(\'' + escAttr(p.id) + '\')">' +
            (cover ? '<div class="feed-image"><img src="' + escAttr(cover) + '" alt="' + escAttr(p.title) + '" onerror="this.closest(\'.feed-image\').classList.add(\'no-feed-img\');" loading="' + (onDataSaver() ? 'lazy' : 'eager') + '">' + timelineTagBadge(p) + '</div>' : '<div class="feed-image no-feed-img">' + timelineTagBadge(p) + '</div>') +
            '<div class="feed-content">' +
            '<div class="feed-meta">' + esc(p.date || '') + (p.category ? ' \u00b7 ' + esc(p.category) : '') + '</div>' +
            '<div class="feed-title">' + esc(p.title) + '</div>' +
            '<div class="feed-description">' + esc(p.teaser || '') + '</div>' +
            '</div>' +
            '</article>';
    });

    container.innerHTML += '</div>';
}

function openTimelinePost(id) {
    const p = (window.BOPEU_TIMELINE_POSTS || []).find(x => x.id === id);
    if (!p) return;
    const titleEl = document.getElementById('postModalTitle');
    const body = document.getElementById('postModalBody');
    if (titleEl) titleEl.textContent = (p.title || 'Update');
    if (!body) return;

    let html = '';
    if (p.cover) {
        html += '<img class="post-cover" src="' + escAttr(p.cover) + '" alt="' + escAttr(p.title) + '" onerror="this.style.display=\'none\';">';
    }
    html += '<div class="feed-meta" style="margin:4px 0 8px;">' + esc(p.date || '') + (p.category ? ' \u00b7 ' + esc(p.category) : '') + '</div>';
    html += '<div class="post-card-headline"><h3>' + esc(p.title || 'Update') + '</h3><p>' + esc(p.teaser || '') + '</p></div>';

    (p.paragraphs || []).forEach(par => {
        html += '<p class="post-paragraph">' + esc(par) + '</p>';
    });

    (p.sections || []).forEach(s => {
        html +=
            '<details class="accordion" open><summary>' + esc(s.h || 'More') + '</summary><div class="accordion-inner">' + esc(s.b || '') + '</div></details>';
    });

    (p.funeralTable ? [p.funeralTable] : []).forEach(t => {
        let rows = '';
        t.rows.forEach(r => {
            rows += '<tr><td>' + esc(r.label) + '</td><td>' + esc(r.value) + '</td></tr>';
        });
        html +=
            '<details class="accordion" open><summary>' + esc(t.title || 'Funeral Benefit Table') + '</summary>' +
            '<div class="accordion-inner"><table class="benefit-table"><tbody>' + rows + '</tbody></table></div>' +
            '</details>';
    });

    body.innerHTML = html;
    openModal('post-modal');
}

function renderTimelineFeed() {
    renderTimeline();
}
