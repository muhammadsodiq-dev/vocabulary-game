document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('my-tests');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const attemptId = new URLSearchParams(location.search).get('attemptId');
  const card = document.getElementById('resultCard');
  if (!attemptId) { card.innerHTML = `<div class="card-body">Result not found.</div>`; return; }

  try {
    const r = await api.get(CONFIG.ENDPOINTS.testAttempt(attemptId));
    const total = r.totalQuestions ?? r.total ?? 10;
    const correct = r.correctAnswers ?? r.correct ?? 0;
    const wrong = r.wrongAnswers ?? r.wrong ?? Math.max(total - correct, 0);
    const score = r.score ?? r.earnedScore ?? (Math.round((correct / total) * 100) || 0);
    const finishedAt = r.finishedAt ?? r.completedAt ?? new Date().toISOString();
    const pct = total ? Math.round((correct / total) * 100) : 0;

    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - pct / 100);

    card.innerHTML = `
      <h2 style="margin-bottom:20px">${I18n.t('your_result')}</h2>
      <div class="score-ring">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--secondary)" stroke-width="10"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary)" stroke-width="10"
            stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <div class="score-ring-value"><strong>${pct}%</strong><span>${I18n.t('score_label')}</span></div>
      </div>
      <div class="result-grid">
        <div class="result-stat"><span>${I18n.t('total_questions')}</span><strong>${total}</strong></div>
        <div class="result-stat"><span>${I18n.t('correct_answers')}</span><strong style="color:#178a44">${correct}</strong></div>
        <div class="result-stat"><span>${I18n.t('wrong_answers')}</span><strong style="color:#c62d2d">${wrong}</strong></div>
        <div class="result-stat"><span>${I18n.t('earned_score')}</span><strong>${score}</strong></div>
        <div class="result-stat wide"><span>${I18n.t('finished_at')}</span><strong style="font-size:14px">${UI.formatDateTime(finishedAt)}</strong></div>
      </div>
      <a class="btn btn-primary btn-block" href="lessons.html">${I18n.t('back_to_lessons')}</a>`;
  } catch (err) {
    card.innerHTML = `<div class="card-body">${UI.escapeHtml(err.message)}</div>`;
    UI.toast(err.message, 'error');
  }
});
