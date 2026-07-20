document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  I18n.apply();
  I18n.mountSwitcher(document.getElementById('langSlot'));

  const lessonId = new URLSearchParams(location.search).get('lessonId');
  if (!lessonId) { window.location.href = 'lessons.html'; return; }

  const stages = {
    ready: document.getElementById('stage-ready'),
    countdown: document.getElementById('stage-countdown'),
    question: document.getElementById('stage-question'),
    feedback: document.getElementById('stage-feedback'),
    completed: document.getElementById('stage-completed'),
  };
  function show(stage) {
    Object.values(stages).forEach((s) => s.classList.add('hidden'));
    stages[stage].classList.remove('hidden');
  }

  let attemptId = null;
  let questions = [];
  let index = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let selectedId = null;

  // --- Load lesson + start attempt ---
  try {
    const lesson = await api.get(CONFIG.ENDPOINTS.lesson(lessonId));
    const type = lesson.type || lesson.testType || 'TRANSLATION';
    document.getElementById('readyType').textContent = type;
    document.getElementById('readySubtitle').textContent =
      lesson.instruction || `Translate words from "${lesson.name || lesson.title || 'this lesson'}"`;

    const started = await api.post(CONFIG.ENDPOINTS.startTest(lessonId), {});
    attemptId = started.attemptId ?? started.id;
    const extracted = UI.extractList(started);
    questions = extracted.length ? extracted : (started.questions || []);
    document.getElementById('readyCount').textContent = questions.length || CONFIG.QUESTIONS_PER_TEST;
  } catch (err) {
    UI.toast(err.message, 'error');
  }

  document.getElementById('startBtn').addEventListener('click', runCountdown);

  function runCountdown() {
    show('countdown');
    let n = 3;
    const numEl = document.getElementById('countdownNumber');
    const dots = UI.qsa('.countdown-dots span');
    const tick = setInterval(() => {
      n--;
      if (n <= 0) {
        clearInterval(tick);
        showQuestion(0);
        return;
      }
      numEl.textContent = n;
      dots.forEach((d) => d.classList.toggle('active', Number(d.dataset.dot) === n));
    }, 800);
  }

  function currentQuestion() { return questions[index] || {}; }

  function showQuestion(i) {
    index = i;
    selectedId = null;
    const q = currentQuestion();
    const total = questions.length || CONFIG.QUESTIONS_PER_TEST;

    document.getElementById('qProgressLabel').textContent = `${i + 1} / ${total}`;
    document.getElementById('qProgressFill').style.width = `${((i + 1) / total) * 100}%`;
    document.getElementById('qWord').textContent = q.word || q.term || q.question || '—';

    const options = q.options || q.choices || [];
    const list = document.getElementById('optionList');
    list.innerHTML = options.map((o, idx) => `
      <button type="button" class="option" data-option-id="${o.id ?? idx}">
        <span class="option-radio"></span><span>${UI.escapeHtml(o.text || o.label || o)}</span>
      </button>`).join('');

    UI.qsa('.option', list).forEach((btn) => {
      btn.addEventListener('click', () => {
        UI.qsa('.option', list).forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedId = btn.dataset.optionId;
        document.getElementById('nextBtn').disabled = false;
      });
    });

    document.getElementById('nextBtn').disabled = true;
    show('question');
  }

  document.getElementById('skipBtn').addEventListener('click', async () => {
    const q = currentQuestion();
    try { await api.post(CONFIG.ENDPOINTS.skipQuestion(attemptId), { questionId: q.id }); } catch (e) {}
    advance();
  });

  document.getElementById('nextBtn').addEventListener('click', async () => {
    if (!selectedId) return;
    const btn = document.getElementById('nextBtn');
    const q = currentQuestion();
    UI.setLoading(btn, true, '…');
    try {
      const res = await api.post(CONFIG.ENDPOINTS.submitAnswer(attemptId), {
        questionId: q.id,
        optionId: selectedId,
      });
      const isCorrect = res.correct ?? res.isCorrect ?? false;
      const correctText = res.correctAnswer || res.correctText || (q.options || []).find((o) => o.correct)?.text || '';
      isCorrect ? correctCount++ : wrongCount++;
      showFeedback(isCorrect, q.word || q.term, correctText);
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });

  function showFeedback(isCorrect, word, correctText) {
    const total = questions.length || CONFIG.QUESTIONS_PER_TEST;
    document.getElementById('fProgressLabel').textContent = `${index + 1} / ${total}`;
    document.getElementById('fProgressFill').style.width = `${((index + 1) / total) * 100}%`;

    const icon = document.getElementById('feedbackIcon');
    const title = document.getElementById('feedbackTitle');
    const detail = document.getElementById('feedbackDetail');
    icon.className = `feedback-icon ${isCorrect ? 'correct' : 'incorrect'}`;
    icon.innerHTML = isCorrect
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    title.textContent = isCorrect ? I18n.t('feedback_correct') : I18n.t('feedback_incorrect');
    title.className = `feedback-title ${isCorrect ? 'correct' : 'incorrect'}`;
    detail.innerHTML = correctText ? `"${UI.escapeHtml(word || '')}" means "<strong>${UI.escapeHtml(correctText)}</strong>"` : '';
    show('feedback');
  }

  document.getElementById('feedbackNextBtn').addEventListener('click', advance);

  async function advance() {
    const total = questions.length || CONFIG.QUESTIONS_PER_TEST;
    if (index + 1 < total) {
      showQuestion(index + 1);
    } else {
      try { await api.post(CONFIG.ENDPOINTS.finishTest(attemptId), {}); } catch (e) {}
      show('completed');
    }
  }

  document.getElementById('viewResultBtn').addEventListener('click', () => {
    window.location.href = `results.html?attemptId=${attemptId}`;
  });
});
