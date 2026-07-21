document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireUser()) return;
  Layout.mountUser('lessons');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const id = new URLSearchParams(location.search).get('id');
  const card = document.getElementById('detailCard');
  if (!id) { card.innerHTML = `<div class="card-body">Lesson not found.</div>`; return; }

  try {
    const l = await api.get(CONFIG.ENDPOINTS.lesson(id));
    const wordCount = l.wordCount ?? l.totalWords ?? l.words ?? 0;
    const type = l.type || l.testType || 'TRANSLATION';
    card.innerHTML = `
      <div class="card-body">
        <h2 style="font-size:19px;margin-bottom:8px">${UI.escapeHtml(l.name || l.title)}</h2>
        <div class="detail-tags">
          <span class="badge badge-primary">${UI.escapeHtml(type)}</span>
          <span class="badge badge-neutral">${UI.formatDate(l.date || l.createdAt)}</span>
        </div>
        <p class="detail-desc">${UI.escapeHtml(l.description || 'This lesson contains vocabulary commonly used in everyday conversations.')}</p>
        <div class="detail-meta-grid">
          <div class="result-stat"><span>${I18n.t('detail_total_words')}</span><strong>${wordCount}</strong></div>
          <div class="result-stat"><span>${I18n.t('detail_type')}</span><strong>${UI.escapeHtml(type)}</strong></div>
        </div>
        <a class="btn btn-primary btn-block" href="test.html?lessonId=${id}">${I18n.t('btn_start_test')}</a>
      </div>`;
  } catch (err) {
    card.innerHTML = `<div class="card-body">${UI.escapeHtml(err.message)}</div>`;
    UI.toast(err.message, 'error');
  }
});
