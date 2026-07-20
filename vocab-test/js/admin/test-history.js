document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('history');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('tblBody');
  const pager = document.getElementById('pager');
  const pageSize = 5;
  let page = 1;
  let all = [];

  const searchInput = document.getElementById('searchInput');
  const lessonFilter = document.getElementById('lessonFilter');
  const statusFilter = document.getElementById('statusFilter');
  const dateFilter = document.getElementById('dateFilter');

  let debounce;
  searchInput.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(() => { page = 1; load(); }, 350); });
  [lessonFilter, statusFilter, dateFilter].forEach((el) => el.addEventListener('change', () => { page = 1; load(); }));

  try {
    const lessonsRes = await api.get(CONFIG.ENDPOINTS.adminLessons);
    UI.extractList(lessonsRes).forEach((l) => {
      lessonFilter.innerHTML += `<option value="${l.id ?? l.lessonId}">${UI.escapeHtml(l.name || l.title)}</option>`;
    });
  } catch (e) { /* best effort */ }

  await load();

  async function load() {
    body.innerHTML = `<tr><td colspan="7"><div class="skeleton" style="height:20px"></div></td></tr>`;
    const params = new URLSearchParams();
    if (searchInput.value.trim()) params.set('search', searchInput.value.trim());
    if (lessonFilter.value) params.set('lessonId', lessonFilter.value);
    if (statusFilter.value) params.set('status', statusFilter.value);
    if (dateFilter.value) params.set('date', dateFilter.value);
    try {
      const res = await api.get(`${CONFIG.ENDPOINTS.adminTestHistory}?${params.toString()}`);
      all = UI.extractList(res);
      render();
    } catch (err) {
      body.innerHTML = `<tr><td colspan="7" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
    }
  }

  function render() {
    if (!all.length) {
      body.innerHTML = `<tr><td colspan="7" class="table-empty">${I18n.t('no_history_row')}</td></tr>`;
      pager.innerHTML = '';
      return;
    }
    const rows = Paginator.slice(all, page, pageSize);
    body.innerHTML = rows.map(rowHtml).join('');
    Paginator.renderBar(pager, { page, pageSize, total: all.length, noun: 'tests', onPage: (p) => { page = p; render(); } });
  }

  function rowHtml(t) {
    const total = t.totalQuestions ?? t.total ?? 10;
    const correct = t.correctAnswers ?? t.correct ?? 0;
    const status = t.status || 'Completed';
    const statusLabel = status === 'Completed' ? I18n.t('status_completed') : I18n.t('status_in_progress');
    return `
      <tr>
        <td class="cell-strong">${UI.escapeHtml(t.userName || t.fullName || '—')}</td>
        <td class="cell-muted">${UI.escapeHtml(t.lessonName || t.lesson || '—')}</td>
        <td class="cell-strong">${t.score ?? '—'}</td>
        <td class="cell-muted">${total}</td>
        <td class="cell-muted">${correct}</td>
        <td><span class="badge ${status === 'Completed' ? 'badge-success' : 'badge-warning'}"><span class="dot"></span>${UI.escapeHtml(statusLabel)}</span></td>
        <td class="cell-muted">${UI.formatDateTime(t.finishedAt || t.completedAt)}</td>
      </tr>`;
  }
});
