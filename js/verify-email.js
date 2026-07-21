document.addEventListener('DOMContentLoaded', () => {
  I18n.apply();
  I18n.mountSwitcher(document.getElementById('langSlot'));

  const params = new URLSearchParams(location.search);
  const email = params.get('email') || '';
  if (!email) { window.location.href = 'register.html'; return; }
  document.getElementById('targetEmail').textContent = email;

  const boxes = UI.qsa('.otp-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^0-9]/g, '').slice(0, 1);
      box.classList.toggle('filled', !!box.value);
      if (box.value && boxes[i + 1]) boxes[i + 1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && boxes[i - 1]) boxes[i - 1].focus();
    });
    box.addEventListener('paste', (e) => {
      const text = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
      if (!text) return;
      e.preventDefault();
      text.split('').slice(0, 4).forEach((ch, idx) => {
        if (boxes[idx]) { boxes[idx].value = ch; boxes[idx].classList.add('filled'); }
      });
      boxes[Math.min(text.length, 4) - 1]?.focus();
    });
  });
  boxes[0]?.focus();

  let seconds = 60;
  const resendBtn = document.getElementById('resendBtn');
  const timerEl = document.getElementById('resendTimer');
  resendBtn.disabled = true;
  const tick = setInterval(() => {
    seconds--;
    timerEl.textContent = seconds > 0 ? ` (00:${String(seconds).padStart(2, '0')})` : '';
    if (seconds <= 0) { clearInterval(tick); resendBtn.disabled = false; }
  }, 1000);

  resendBtn.addEventListener('click', async () => {
    resendBtn.disabled = true;
    try {
      const res = await api.post(CONFIG.ENDPOINTS.resendCode, { email }, { noAuth: true });
      console.log('Resend-code javobi:', res);
      UI.toast('Code resent — check your inbox.', 'success');
      seconds = 60;
    } catch (err) {
      console.error('Resend-code xatosi:', err);
      UI.toast(err.message, 'error');
      resendBtn.disabled = false;
    }
  });

  document.getElementById('verifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = boxes.map((b) => b.value).join('');
    if (code.length < 4) { UI.toast('Enter the full 4-digit code.', 'error'); return; }
    const btn = document.getElementById('verifyBtn');
    UI.setLoading(btn, true, 'Verifying…');
    try {
      const payload = { email, code };
      console.log("Verify-email so'rovi:", payload);
      const res = await api.post(CONFIG.ENDPOINTS.verifyEmail, payload, { noAuth: true });
      console.log('Verify-email javobi:', res);
      UI.toast('Email verified!', 'success');
      window.location.href = 'login.html';
    } catch (err) {
      console.error('Verify-email xatosi:', err);
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });
});
