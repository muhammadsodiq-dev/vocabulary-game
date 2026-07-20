document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('dashboard');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const grid = document.getElementById('statGrid');
  try {
    const s = await api.get(CONFIG.ENDPOINTS.adminStats);
    grid.innerHTML = [
      card('lessons', s.totalLessons ?? s.lessons ?? 0, I18n.t('stat_total_lessons'), 'primary'),
      card('words', s.totalWords ?? s.vocabularyWords ?? 0, I18n.t('stat_total_words'), 'info'),
      card('users', s.totalUsers ?? s.users ?? 0, I18n.t('stat_registered_users'), 'success'),
      card('tests', s.testsTaken ?? s.totalTests ?? 0, I18n.t('stat_total_tests'), 'warning'),
      card('trophy', (s.avgScore ?? s.averageScore ?? 0) + '%', I18n.t('stat_average_score'), 'primary'),
    ].join('');
  } catch (err) {
    grid.innerHTML = `<div class="table-empty" style="grid-column:1/-1">${UI.escapeHtml(err.message)}</div>`;
  }

  document.getElementById('exportBtn').addEventListener('click', () => UI.toast('Preparing export…', 'info'));
  document.getElementById('logsBtn').addEventListener('click', () => UI.toast('System logs are not wired to this UI yet.', 'info'));

  function card(icon, value, label, tone) {
    const icons = {
      lessons: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
      words: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
      users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
      tests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/></svg>',
    };
    return `
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon" style="background:var(--${tone}-bg,var(--primary-light));color:var(--${tone})">${icons[icon]}</div>
        </div>
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>`;
  }
});
