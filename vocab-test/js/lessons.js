document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('lessons');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const grid = document.getElementById('lessonGrid');
  try {
    const res = await api.get(CONFIG.ENDPOINTS.lessons);
    const lessons = UI.extractList(res);
    if (!lessons.length) {
      grid.innerHTML = emptyState();
      return;
    }
    grid.innerHTML = lessons.map(lessonCard).join('');
  } catch (err) {
    grid.innerHTML = emptyState(err.message);
    UI.toast(err.message, 'error');
  }

  function lessonCard(l) {
    const id = l.id ?? l.lessonId;
    const wordCount = l.wordCount ?? l.totalWords ?? l.words ?? 0;
    return `
      <a class="lesson-card" href="lesson-detail.html?id=${id}">
        <div class="lesson-card-top">
          <div class="lesson-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
          <div>
            <h3>${UI.escapeHtml(l.name || l.title || 'Lesson')}</h3>
            <div class="lesson-meta">${UI.formatDate(l.date || l.createdAt)} · ${wordCount} ${I18n.t('words_suffix')}</div>
          </div>
        </div>
        <button class="btn btn-secondary btn-block" type="button">${I18n.t('btn_start_test')}</button>
      </a>`;
  }

  function emptyState(msg) {
    return `<div class="empty-state" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
      <h3>${I18n.t('no_lessons_title')}</h3>
      <p>${msg ? UI.escapeHtml(msg) : I18n.t('no_lessons_text')}</p>
    </div>`;
  }
});
