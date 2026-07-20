document.addEventListener('DOMContentLoaded', () => {
  I18n.apply();
  I18n.mountSwitcher(document.getElementById('langSlot'));

  const form = document.getElementById('forgotForm');
  const btn = document.getElementById('sendBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const invalid = !email || !email.includes('@');
    document.getElementById('f-email').classList.toggle('has-error', invalid);
    if (invalid) return;

    UI.setLoading(btn, true, 'Sending…');
    try {
      await api.post(CONFIG.ENDPOINTS.forgotPassword, { email }, { noAuth: true });
      UI.toast('Reset link sent — check your inbox.', 'success');
      form.reset();
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });
});
