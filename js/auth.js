const Auth = {
  getToken() {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  },
  getUser() {
    const raw = localStorage.getItem(CONFIG.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  /**
   * Backend javobi turlicha shaklda bo'lishi mumkin. Quyidagi funksiyalar
   * eng ko'p uchraydigan token/foydalanuvchi/rol formatlarini avtomatik topadi.
   * Agar sizning API javobingiz baribir tanilmasa, brauzer konsolida
   * "Login response:" yozuvini ochib, aniq maydon nomini shu yerga qo'shing.
   */
  extractToken(res) {
    if (!res) return null;
    const layer = res.data && typeof res.data === 'object' ? res.data : res;
    return layer.token || layer.accessToken || layer.access_token || layer.jwt || layer.jwtToken
      || layer.id_token || (typeof res === 'string' ? res : null) || null;
  },
  extractUser(res) {
    if (!res) return {};
    const layer = res.data && typeof res.data === 'object' ? res.data : res;
    return layer.user || layer.account || layer.profile || layer;
  },
  extractRole(user) {
    if (!user) return '';
    let role = user.role || user.userRole || user.accountType || user.type;
    if (!role && Array.isArray(user.roles)) role = user.roles[0];
    if (!role && Array.isArray(user.authorities)) {
      const a = user.authorities[0];
      role = (a && (a.authority || a.role || a)) || '';
    }
    return String(role || '').toUpperCase().replace('ROLE_', '');
  },

  setSession(token, user) {
    if (!token) { console.warn('Auth.setSession: token bo\'sh — sessiya saqlanmadi.'); return; }
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
    localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user || {}));
  },
  isLoggedIn() {
    const t = this.getToken();
    return !!t && t !== 'undefined' && t !== 'null';
  },
  isAdmin() {
    const u = this.getUser();
    if (!u) return false;
    const role = this.extractRole(u);
    return role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'SUPERADMIN' || u.isAdmin === true;
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
