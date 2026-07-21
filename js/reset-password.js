document.addEventListener('DOMContentLoaded', () => {
  I18n.apply();
  I18n.mountSwitcher(document.getElementById('langSlot'));

  const token = new URLSearchParams(location.search).get('token') || '';
  const form = document.getElementById('resetForm');
  const btn = document.getElementById('resetBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    document.getElementById('f-password').classList.toggle('has-error', password.length < 8);
    document.getElementById('f-confirm').classList.toggle('has-error', password !== confirm || !confirm);
    if (password.length < 8 || password !== confirm) return;

    UI.setLoading(btn, true, 'Updating…');
    try {
      await api.post(CONFIG.ENDPOINTS.resetPassword, { token, password }, { noAuth: true });
      UI.toast('Password updated — please log in.', 'success');
      setTimeout(() => (window.location.href = 'login.html'), 900);
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });
});
