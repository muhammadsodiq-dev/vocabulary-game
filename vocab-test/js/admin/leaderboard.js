document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('leaderboard');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('tblBody');
  const pager = document.getElementById('pager');
  const pageSize = 10;
  let page = 1;
  let all = [];

  try {
    const res = await api.get(`${CONFIG.ENDPOINTS.leaderboard}?scope=global`);
    all = UI.extractList(res);
    render();
  } catch (err) {
    body.innerHTML = `<tr><td colspan="4" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
  }

  function render() {
    if (!all.length) {
    body.innerHTML = `<tr><td colspan="4" class="table-empty">${I18n.t('no_ranking_yet')}</td></tr>`;
      return;
    }
    const rows = Paginator.slice(all, page, pageSize);
    body.innerHTML = rows.map((r, i) => {
      const rank = r.rank ?? (page - 1) * pageSize + i + 1;
      const badgeClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
      return `
        <tr>
          <td><span class="rank-badge ${badgeClass}">${rank}</span></td>
          <td class="cell-strong">${UI.escapeHtml(r.name || r.fullName)}</td>
          <td class="cell-muted">${UI.escapeHtml(r.email || '—')}</td>
          <td class="cell-strong">${r.score ?? 0}</td>
        </tr>`;
    }).join('');
    Paginator.renderBar(pager, { page, pageSize, total: all.length, noun: 'learners', onPage: (p) => { page = p; render(); } });
  }
});
