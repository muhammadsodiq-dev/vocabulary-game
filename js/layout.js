const ICONS = {
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  lessons: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
  tests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a2 2 0 0 1-2 4M7 5H4a2 2 0 0 0 2 4"/></svg>',
  history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  words: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6M9 11h4"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  logoMark: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
};

const Layout = {
  userNav: [
    { key: 'lessons', labelKey: 'nav_lessons', href: 'lessons.html', icon: 'lessons' },
    { key: 'my-tests', labelKey: 'nav_my_tests', href: 'my-tests.html', icon: 'tests' },
    { key: 'leaderboard', labelKey: 'nav_leaderboard', href: 'leaderboard.html', icon: 'trophy' },
    { key: 'history', labelKey: 'nav_history', href: 'history.html', icon: 'history' },
  ],
  userAccountNav: [
    { key: 'profile', labelKey: 'nav_profile', href: 'profile.html', icon: 'user' },
    { key: 'settings', labelKey: 'nav_settings', href: 'settings.html', icon: 'settings' },
  ],
  adminNav: [
    { key: 'dashboard', labelKey: 'nav_dashboard', href: 'dashboard.html', icon: 'dashboard' },
    { key: 'lessons', labelKey: 'nav_lessons', href: 'lessons.html', icon: 'lessons' },
    { key: 'words', labelKey: 'nav_words', href: 'vocabulary-words.html', icon: 'words' },
    { key: 'users', labelKey: 'nav_users', href: 'users.html', icon: 'users' },
    { key: 'history', labelKey: 'nav_history', href: 'test-history.html', icon: 'history' },
    { key: 'leaderboard', labelKey: 'nav_leaderboard', href: 'leaderboard.html', icon: 'trophy' },
    { key: 'settings', labelKey: 'nav_settings', href: 'settings.html', icon: 'settings' },
  ],

  navItem(item, activeKey) {
    const active = item.key === activeKey ? ' active' : '';
    return `<a class="nav-item${active}" href="${item.href}">${ICONS[item.icon]}<span data-i18n="${item.labelKey}">${I18n.t(item.labelKey)}</span></a>`;
  },

  mountUser(activeKey) {
    const user = Auth.getUser() || {};
    const root = document.getElementById('sidebar');
    if (!root) return;
    root.innerHTML = `
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">${ICONS.logoMark}</div>
        <div class="sidebar-brand-text"><strong>Vocab Test</strong><span data-i18n="brand_tagline">${I18n.t('brand_tagline')}</span></div>
      </div>
      <div class="nav-label">Main</div>
      <nav class="nav-list">${this.userNav.map(i => this.navItem(i, activeKey)).join('')}</nav>
      <div class="nav-label">Account</div>
      <nav class="nav-list">
        ${this.userAccountNav.map(i => this.navItem(i, activeKey)).join('')}
        <a class="nav-item" href="#" id="logoutLink">${ICONS.logout}<span data-i18n="nav_logout">${I18n.t('nav_logout')}</span></a>
      </nav>
      <div class="sidebar-promo">
        <div class="sidebar-promo-card">
          <h4 data-i18n="promo_title">${I18n.t('promo_title')}</h4>
          <p data-i18n="promo_text">${I18n.t('promo_text')}</p>
          ${ICONS.trophy}
        </div>
      </div>`;
    this._wireCommon();
  },

  mountAdmin(activeKey) {
    const root = document.getElementById('sidebar');
    if (!root) return;
    root.innerHTML = `
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">${ICONS.logoMark}</div>
        <div class="sidebar-brand-text"><strong>Vocab Test</strong><span data-i18n="brand_tagline_admin">${I18n.t('brand_tagline_admin')}</span></div>
      </div>
      <div class="nav-label">Admin Panel</div>
      <nav class="nav-list">
        ${this.adminNav.map(i => this.navItem(i, activeKey)).join('')}
        <a class="nav-item" href="#" id="logoutLink">${ICONS.logout}<span data-i18n="nav_logout">${I18n.t('nav_logout')}</span></a>
      </nav>`;
    this._wireCommon();
  },

  _wireCommon() {
    document.getElementById('logoutLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout(location.pathname.includes('/admin/') ? '../login.html' : 'login.html');
    });
    document.getElementById('menuToggle')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('open');
      document.getElementById('sidebarScrim')?.classList.toggle('show');
    });
    document.getElementById('sidebarScrim')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.remove('open');
      document.getElementById('sidebarScrim')?.classList.remove('show');
    });
    I18n.mountSwitcher(document.querySelector('.topbar-actions'));
    I18n.apply();
  },

  renderUserMenu() {
    const user = Auth.getUser() || {};
    const name = user.fullName || user.name || 'User';
    return `
      <div class="user-menu">
        <div class="avatar">${Auth.initials(name)}</div>
        <div>
          <div class="user-menu-name">${UI.escapeHtml(name)}</div>
          <div class="user-menu-role">${Auth.isAdmin() ? 'Admin' : 'Learner'}</div>
        </div>
      </div>`;
  },
};
