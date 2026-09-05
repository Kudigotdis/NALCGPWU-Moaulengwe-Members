/* =====================================================
   1. QUIZ STATE
===================================================== */
const quizState = {
    index: 0,
    score: 0,
    finished: false
};

function renderQuiz() {
    const body = document.getElementById('quizBody');
    const result = document.getElementById('quizResult');
    if (!body) return;

    result.innerHTML = '';

    if (quizState.finished) {
        const total = NALCGPWU_QUIZ.length;
        const pct = Math.round((quizState.score / total) * 100);
        let msg;
        if (pct === 100) msg = 'Outstanding! You know NALCGPWU benefits inside out.';
        else if (pct >= 60) msg = 'Good job! Review the Notices tab to sharpen your knowledge.';
        else msg = 'Keep learning - open the articles in the Notices tab for full details.';

        body.innerHTML =
            '<div class="onboarding-step">' +
            '<h3>Quiz Complete</h3>' +
            '<p class="subtext">You scored ' + quizState.score + ' out of ' + total + ' (' + pct + '%).</p>' +
            '<p class="subtext">' + msg + '</p>' +
            '</div>';
        body.insertAdjacentHTML('beforeend',
            '<button class="btn btn-secondary" style="margin-top:8px;" onclick="retakeQuiz()">Retake Quiz</button>');
        return;
    }

    const q = NALCGPWU_QUIZ[quizState.index];
    let html = '<div class="onboarding-step">' +
        '<div class="wizard-progress"><span class="bar"><span class="bar-fill" style="width:' + Math.round((quizState.index / NALCGPWU_QUIZ.length) * 100) + '%"></span></span>' +
        'Question ' + (quizState.index + 1) + ' of ' + NALCGPWU_QUIZ.length + '</div>' +
        '<div class="quiz-question">' + esc(q.q) + '</div>';

    q.options.forEach((opt, i) => {
        html += '<button type="button" class="quiz-option" onclick="answerQuiz(' + i + ')">' + esc(opt) + '</button>';
    });

    html += '</div>';
    body.innerHTML = html;
}

function answerQuiz(choice) {
    const q = NALCGPWU_QUIZ[quizState.index];
    const options = document.querySelectorAll('.quiz-option');

    const isCorrect = choice === q.answer;
    if (isCorrect) quizState.score += 1;

    options.forEach((opt, i) => {
        opt.disabled = true;
        if (i === q.answer) opt.classList.add('correct');
        if (i === choice && !isCorrect) opt.classList.add('wrong');
    });

    setTimeout(() => {
        quizState.index += 1;
        if (quizState.index >= NALCGPWU_QUIZ.length) {
            quizState.finished = true;
        }
        renderQuiz();
    }, 900);
}

function retakeQuiz() {
    quizState.index = 0;
    quizState.score = 0;
    quizState.finished = false;
    renderQuiz();
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
});