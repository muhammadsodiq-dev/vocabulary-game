document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('my-tests');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('myTestsBody');
  try {
    const res = await api.get(CONFIG.ENDPOINTS.lessons);
    const lessons = UI.extractList(res);
    if (!lessons.length) {
      body.innerHTML = `<tr><td colspan="5" class="table-empty">${I18n.t('no_lessons_available')}</td></tr>`;
      return;
    }
    body.innerHTML = lessons.map(row).join('');
  } catch (err) {
    body.innerHTML = `<tr><td colspan="5" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
  }

  function row(l) {
    const id = l.id ?? l.lessonId;
    const wordCount = l.wordCount ?? l.totalWords ?? l.words ?? 0;
    const completed = l.completed ?? l.attempted ?? false;
    const bestScore = l.bestScore ?? l.score;
    return `
      <tr>
        <td class="cell-strong">${UI.escapeHtml(l.name || l.title)}</td>
        <td class="cell-muted">${wordCount}</td>
        <td>${completed
          ? `<span class="badge badge-success"><span class="dot"></span>${I18n.t('status_completed')}</span>`
          : `<span class="badge badge-neutral"><span class="dot"></span>${I18n.t('status_not_started')}</span>`}</td>
        <td class="cell-strong">${bestScore != null ? bestScore : '—'}</td>
        <td><a class="btn btn-sm btn-outline" href="lesson-detail.html?id=${id}">${completed ? I18n.t('btn_retake') : I18n.t('test_start')}</a></td>
      </tr>`;
  }
});
