document.addEventListener('DOMContentLoaded', () => {
  I18n.apply();
  I18n.mountSwitcher(document.getElementById('langSlot'));

  if (Auth.isLoggedIn()) {
    window.location.href = Auth.isAdmin() ? 'admin/dashboard.html' : 'lessons.html';
    return;
  }

  const form = document.getElementById('loginForm');
  const btn = document.getElementById('loginBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let ok = true;
    toggleError('f-email', !email || !email.includes('@'));
    toggleError('f-password', !password);
    ok = email && email.includes('@') && password;
    if (!ok) return;

    UI.setLoading(btn, true, 'Logging in…');
    try {
      const res = await api.post(CONFIG.ENDPOINTS.login, { email, password }, { noAuth: true });
      Auth.setSession(res.token || res.accessToken, res.user || res);
      UI.toast('Welcome back!', 'success');
      window.location.href = Auth.isAdmin() ? 'admin/dashboard.html' : 'lessons.html';
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });

  function toggleError(fieldId, hasError) {
    document.getElementById(fieldId).classList.toggle('has-error', !!hasError);
  }
});
