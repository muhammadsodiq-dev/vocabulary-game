document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('leaderboard');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('leaderboardBody');
  const me = Auth.getUser() || {};

  UI.qsa('.tab').forEach((t) => t.addEventListener('click', () => {
    UI.qsa('.tab').forEach((x) => x.classList.remove('active'));
    t.classList.add('active');
    load(t.dataset.scope);
  }));

  load('global');

  async function load(scope) {
    body.innerHTML = `<tr><td colspan="3"><div class="skeleton" style="height:20px"></div></td></tr>`;
    try {
      const res = await api.get(`${CONFIG.ENDPOINTS.leaderboard}?scope=${scope}`);
      const rows = UI.extractList(res);
      if (!rows.length) {
        body.innerHTML = `<tr><td colspan="3" class="table-empty">${I18n.t('no_ranking_yet')}</td></tr>`;
        return;
      }
      body.innerHTML = rows.map(rowHtml).join('');
    } catch (err) {
      body.innerHTML = `<tr><td colspan="3" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
    }
  }

  function rowHtml(r, idx) {
    const rank = r.rank ?? idx + 1;
    const isMe = r.id && me.id && r.id === me.id;
    const badgeClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    return `
      <tr class="${isMe ? 'me' : ''}">
        <td><span class="rank-badge ${badgeClass}">${rank}</span></td>
        <td class="cell-strong">${UI.escapeHtml(r.name || r.fullName)}${isMe ? ' ' + I18n.t('you_suffix') : ''}</td>
        <td class="cell-strong">${r.score ?? 0}</td>
      </tr>`;
  }
});
