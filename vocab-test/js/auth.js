const Auth = {
  getToken() {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  },
  getUser() {
    const raw = localStorage.getItem(CONFIG.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setSession(token, user) {
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
    localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user || {}));
  },
  isLoggedIn() {
    return !!this.getToken();
  },
  isAdmin() {
    const u = this.getUser();
    return !!u && (u.role === 'ADMIN' || u.role === 'SUPER_ADMIN');
  },
  logout(redirect = '/login.html') {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.USER_KEY);
    window.location.href = redirect;
  },
  /** Learner sahifalarida chaqiriladi: login bo'lmasa login sahifasiga qaytaradi */
  requireUser() {
    if (!this.isLoggedIn()) { window.location.href = 'login.html'; return false; }
    return true;
  },
  /** Admin sahifalarida chaqiriladi */
  requireAdmin() {
    if (!this.isLoggedIn()) { window.location.href = '../login.html'; return false; }
    if (!this.isAdmin()) { window.location.href = '../lessons.html'; return false; }
    return true;
  },
  initials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    return (parts[0]?.[0] || '').toUpperCase() + (parts[1]?.[0] || '').toUpperCase();
  },
};
