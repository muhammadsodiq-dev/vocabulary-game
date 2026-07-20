document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('settings');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();
  I18n.mountSwitcher(document.getElementById('langSlotSettings'));

  UI.qsa('.switch input').forEach((input) => {
    input.addEventListener('change', () => UI.toast('Preference saved.', 'success'));
  });

  document.getElementById('logoutBtn').addEventListener('click', () => Auth.logout('login.html'));
});
