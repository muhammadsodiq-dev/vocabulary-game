document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('users');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('tblBody');
  const pager = document.getElementById('pager');
  const pageSize = 5;
  let page = 1;
  let all = [];
  const searchInput = document.getElementById('searchInput');

  let debounce;
  searchInput.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(() => { page = 1; load(); }, 350); });

  await load();

  async function load() {
    body.innerHTML = `<tr><td colspan="5"><div class="skeleton" style="height:20px"></div></td></tr>`;
    const params = new URLSearchParams();
    if (searchInput.value.trim()) params.set('search', searchInput.value.trim());
    try {
      const res = await api.get(`${CONFIG.ENDPOINTS.adminUsers}?${params.toString()}`);
      all = UI.extractList(res);
      render();
    } catch (err) {
      body.innerHTML = `<tr><td colspan="5" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
    }
  }

  function render() {
    if (!all.length) {
      body.innerHTML = `<tr><td colspan="5" class="table-empty">${I18n.t('no_users_row')}</td></tr>`;
      pager.innerHTML = '';
      return;
    }
    const rows = Paginator.slice(all, page, pageSize);
    body.innerHTML = rows.map(rowHtml).join('');
    Paginator.renderBar(pager, { page, pageSize, total: all.length, noun: 'users', onPage: (p) => { page = p; render(); } });
    wireRowActions();
  }

  function rowHtml(u) {
    const id = u.id ?? u.userId;
    const role = u.role || 'USER';
    return `
      <tr data-id="${id}">
        <td class="cell-strong">${UI.escapeHtml(u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim())}</td>
        <td class="cell-muted">${UI.escapeHtml(u.email)}</td>
        <td><span class="badge ${role === 'ADMIN' ? 'badge-primary' : 'badge-neutral'}">${role}</span></td>
        <td class="cell-muted">${UI.formatDate(u.joinedAt || u.createdAt)}</td>
        <td>
          <div class="row-actions">
            <button class="btn-icon edit-btn" data-id="${id}" aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg></button>
            <button class="btn-icon del-btn" data-id="${id}" aria-label="Delete" style="color:var(--error)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg></button>
          </div>
        </td>
      </tr>`;
  }

  function wireRowActions() {
    UI.qsa('.edit-btn', body).forEach((b) => b.addEventListener('click', () => openModal(all.find((u) => String(u.id ?? u.userId) === b.dataset.id))));
    UI.qsa('.del-btn', body).forEach((b) => b.addEventListener('click', () => removeUser(b.dataset.id)));
  }

  function openModal(u) {
    if (!u) return;
    document.getElementById('userId').value = u.id ?? u.userId;
    document.getElementById('userName').value = u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim();
    document.getElementById('userEmail').value = u.email || '';
    document.getElementById('userRole').value = u.role || 'USER';
    UI.openModal('userModal');
  }

  document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const payload = {
      fullName: document.getElementById('userName').value.trim(),
      email: document.getElementById('userEmail').value.trim(),
      role: document.getElementById('userRole').value,
    };
    const btn = document.getElementById('saveUserBtn');
    UI.setLoading(btn, true, 'Saving…');
    try {
      await api.put(CONFIG.ENDPOINTS.adminUser(id), payload);
      UI.toast('User updated!', 'success');
      UI.closeModal('userModal');
      await load();
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });

  async function removeUser(id) {
    if (!confirm(I18n.t('confirm_delete_user'))) return;
    try {
      await api.delete(CONFIG.ENDPOINTS.adminUser(id));
      UI.toast('User deleted.', 'success');
      await load();
    } catch (err) {
      UI.toast(err.message, 'error');
    }
  }
});
