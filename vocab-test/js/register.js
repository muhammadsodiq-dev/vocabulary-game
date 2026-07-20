document.addEventListener('DOMContentLoaded', () => {
  I18n.apply();
  I18n.mountSwitcher(document.getElementById('langSlot'));

  if (Auth.isLoggedIn()) { window.location.href = 'lessons.html'; return; }

  const form = document.getElementById('registerForm');
  const btn = document.getElementById('registerBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    setErr('f-firstName', !firstName);
    setErr('f-lastName', !lastName);
    setErr('f-email', !email || !email.includes('@'));
    setErr('f-password', password.length < 8);
    if (!firstName || !lastName || !email.includes('@') || password.length < 8) return;

    UI.setLoading(btn, true, 'Creating account…');
    try {
      await api.post(CONFIG.ENDPOINTS.register, { firstName, lastName, email, password }, { noAuth: true });
      UI.toast('Account created — check your email for a code.', 'success');
      window.location.href = `verify-email.html?email=${encodeURIComponent(email)}`;
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });

  function setErr(id, hasError) { document.getElementById(id).classList.toggle('has-error', !!hasError); }
});
