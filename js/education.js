/* =====================================================
   BOPEU EDUCATION (Quiz + Learning Summary)
   ===================================================== */
function renderEduSummary() {
    const container = document.getElementById('eduSummary');
    if (!container) return;
    container.innerHTML =
        '<div class="card"><div class="card-header">BOPEU at a Glance</div>' +
        '<div class="news-point"><span class="point-kicker">Est.</span> 2007 (roots 1942 / BCSA 1960) — from the Botswana Civil Servants Association (BCSA).</div>' +
        '<div class="news-point"><span class="point-kicker">Members</span> 37,000+ public employees across ministries, councils, land boards &amp; parastatals.</div>' +
        '<div class="news-point"><span class="point-kicker">Coverage</span> Central Government, Local Councils, Land Boards and Parastatals.</div>' +
        '<div class="news-point"><span class="point-kicker">Offices</span> Gaborone (HQ), Francistown, Palapye, Maun and Kang + local Peelo Place access.</div>' +
        '<div class="news-point"><span class="point-kicker">Affiliates</span> Babereki SACCOS, Babereki Investments, Babereki Life Insurance Company (BLIC) &amp; Diagnofirm Medical Laboratories.</div>' +
        '</div>';
}

function checkEduAnswer(btn, isCorrect, explanation) {
    btn.closest('.quiz-option-list').querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = true;
        b.classList.remove('selected');
        if (b === btn && isCorrect) b.classList.add('correct');
        if (b === btn && !isCorrect) b.classList.add('incorrect');
    });
    const parent = btn.closest('.quiz-card');
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
    const ql = btn.closest('.quiz-option-list');
    ql.insertAdjacentHTML('afterend', feedback.outerHTML);
    const el = ql.nextElementSibling;
    if (el) el.textContent = (isCorrect ? '✓ Correct! ' : '✗ Not quite. ') + explanation;
    if (typeof scoreQuiz === 'function') scoreQuiz(isCorrect, btn);
}

function renderQuiz() {
    const container = document.getElementById('quizBody');
    if (!container) return;
    let html = '';
    BOPEU_QUIZ.forEach((item, idx) => {
        html +=
            '<div class="quiz-card">' +
            '<div class="quiz-question">' + (idx + 1) + '. ' + esc(item.q) + '</div>' +
            '<div class="quiz-option-list">';
        item.options.forEach((opt, oi) => {
            html += '<button type="button" class="quiz-option" onclick="checkEduAnswer(this, ' + (oi === item.answer) + ',\'' + esc('Correct answer: ' + item.options[item.answer]) + '\')">' +
                esc(opt) +
                '</button>';
        });
        html += '</div></div>';
    });
    container.innerHTML = html;

    const result = document.getElementById('quizResult');
    if (result) result.innerHTML = '<div class="alert alert-info">Tap an answer to check your knowledge of the BOPEU. Your score updates live below.</div>';
}

function scoreQuiz(isIncorrect, btn) {
    if (document.getElementById('eduScore')) document.getElementById('eduScore').remove();
    const score = document.querySelectorAll('#quizBody .quiz-option.correct').length;
    const wrong = document.querySelectorAll('#quizBody .quiz-option.incorrect').length;
    const html = '<div id="eduScore" class="alert alert-success">' + score + ' correct, ' + wrong + ' incorrect out of ' + BOPEU_QUIZ.length + '. Keep learning!</div>';
    const container = document.getElementById('quizContainer');
    if (container) container.insertAdjacentHTML('afterend', html);
}

document.addEventListener('DOMContentLoaded', () => {
    renderEduSummary();
    renderQuiz();
});