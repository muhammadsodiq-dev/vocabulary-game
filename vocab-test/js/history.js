document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('history');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('historyBody');
  const pager = document.getElementById('pager');
  const pageSize = 8;
  let page = 1;
  let all = [];

  try {
    const res = await api.get(CONFIG.ENDPOINTS.myTests);
    all = UI.extractList(res);
    render();
  } catch (err) {
    body.innerHTML = `<tr><td colspan="5" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
  }

  function render() {
    if (!all.length) {
      body.innerHTML = `<tr><td colspan="5" class="table-empty">${I18n.t('no_tests_yet')}</td></tr>`;
      pager.innerHTML = '';
      return;
    }
    const rows = Paginator.slice(all, page, pageSize);
    body.innerHTML = rows.map(rowHtml).join('');
    Paginator.renderBar(pager, {
      page, pageSize, total: all.length, noun: 'tests',
      onPage: (p) => { page = p; render(); },
    });
  }

  function rowHtml(t) {
    const total = t.totalQuestions ?? t.total ?? 10;
    const correct = t.correctAnswers ?? t.correct ?? 0;
    return `
      <tr>
        <td class="cell-strong">${UI.escapeHtml(t.lessonName || t.lesson || '—')}</td>
        <td class="cell-strong">${t.score ?? '—'}</td>
        <td class="cell-muted">${correct}/${total}</td>
        <td><span class="badge badge-success"><span class="dot"></span>${I18n.t('status_completed')}</span></td>
        <td class="cell-muted">${UI.formatDateTime(t.finishedAt || t.completedAt)}</td>
      </tr>`;
  }
});
