document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('settings');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();
  I18n.mountSwitcher(document.getElementById('langSlotSettings'));

  const user = Auth.getUser() || {};
  document.getElementById('adminName').value = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
  document.getElementById('adminEmail').value = user.email || '';

  document.getElementById('rulesForm').addEventListener('submit', (e) => {
    e.preventDefault();
    UI.toast('Rules saved.', 'success');
  });
});
