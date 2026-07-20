document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('profile');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  let user = Auth.getUser() || {};
  try {
    user = await api.get(CONFIG.ENDPOINTS.me);
  } catch (e) { /* fall back to cached session user */ }

  const fullName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
  document.getElementById('bigAvatar').textContent = Auth.initials(fullName);
  document.getElementById('profileName').textContent = fullName;
  document.getElementById('profileEmail').textContent = user.email || '';
  document.getElementById('firstName').value = user.firstName || '';
  document.getElementById('lastName').value = user.lastName || '';
  document.getElementById('email').value = user.email || '';

  document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('saveProfileBtn');
    UI.setLoading(btn, true, 'Saving…');
    try {
      const payload = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
      };
      const updated = await api.put(CONFIG.ENDPOINTS.me, payload);
      Auth.setSession(Auth.getToken(), { ...user, ...payload, ...updated });
      UI.toast('Profile updated!', 'success');
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });
});
