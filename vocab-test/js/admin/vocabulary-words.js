document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('words');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('tblBody');
  const pager = document.getElementById('pager');
  const pageSize = 5;
  let page = 1;
  let all = [];
  let lessons = [];

  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const aspectFilter = document.getElementById('aspectFilter');
  const levelFilter = document.getElementById('levelFilter');

  let debounce;
  searchInput.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(() => { page = 1; load(); }, 350); });
  [typeFilter, aspectFilter, levelFilter].forEach((el) => el.addEventListener('change', () => { page = 1; load(); }));

  try {
    const lessonsRes = await api.get(CONFIG.ENDPOINTS.adminLessons);
    lessons = UI.extractList(lessonsRes);
    document.getElementById('wordLesson').innerHTML = lessons.map((l) => `<option value="${l.id ?? l.lessonId}">${UI.escapeHtml(l.name || l.title)}</option>`).join('');
  } catch (e) { /* lesson dropdown best-effort */ }

  await load();

  async function load() {
    body.innerHTML = `<tr><td colspan="8"><div class="skeleton" style="height:20px"></div></td></tr>`;
    const params = new URLSearchParams();
    if (searchInput.value.trim()) params.set('search', searchInput.value.trim());
    if (typeFilter.value) params.set('type', typeFilter.value);
    if (aspectFilter.value) params.set('aspect', aspectFilter.value);
    if (levelFilter.value) params.set('level', levelFilter.value);
    try {
      const res = await api.get(`${CONFIG.ENDPOINTS.adminWords}?${params.toString()}`);
      all = UI.extractList(res);
      render();
    } catch (err) {
      body.innerHTML = `<tr><td colspan="8" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
    }
  }

  function render() {
    if (!all.length) {
      body.innerHTML = `<tr><td colspan="8" class="table-empty">${I18n.t('no_words_row')}</td></tr>`;
      pager.innerHTML = '';
      return;
    }
    const rows = Paginator.slice(all, page, pageSize);
    body.innerHTML = rows.map(rowHtml).join('');
    Paginator.renderBar(pager, { page, pageSize, total: all.length, noun: 'words', onPage: (p) => { page = p; render(); } });
    wireRowActions();
  }

  function lessonName(w) {
    const lid = w.lessonId ?? (w.lesson && w.lesson.id);
    const found = lessons.find((l) => String(l.id ?? l.lessonId) === String(lid));
    return w.lessonName || (found ? (found.name || found.title) : '—');
  }

  function rowHtml(w) {
    const id = w.id ?? w.wordId;
    return `
      <tr data-id="${id}">
        <td class="cell-muted">${id}</td>
        <td class="cell-strong">${UI.escapeHtml(w.russianWord || w.word)}</td>
        <td class="cell-muted">${UI.escapeHtml(w.uzbekMeaning || w.meaning)}</td>
        <td><span class="badge badge-primary">${UI.escapeHtml(w.type || w.wordType || '—')}</span></td>
        <td class="cell-muted">${UI.escapeHtml(w.aspect || '—')}</td>
        <td><span class="badge badge-neutral">${UI.escapeHtml(w.level || w.wordLevel || '—')}</span></td>
        <td class="cell-muted">${UI.escapeHtml(lessonName(w))}</td>
        <td>
          <div class="row-actions">
            <button class="btn-icon edit-btn" data-id="${id}" aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg></button>
            <button class="btn-icon del-btn" data-id="${id}" aria-label="Delete" style="color:var(--error)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg></button>
          </div>
        </td>
      </tr>`;
  }

  function wireRowActions() {
    UI.qsa('.edit-btn', body).forEach((b) => b.addEventListener('click', () => openModal(all.find((w) => String(w.id ?? w.wordId) === b.dataset.id))));
    UI.qsa('.del-btn', body).forEach((b) => b.addEventListener('click', () => removeWord(b.dataset.id)));
  }

  document.getElementById('addWordBtn').addEventListener('click', () => openModal(null));

  function openModal(w) {
    document.getElementById('modalTitle').textContent = I18n.t(w ? 'modal_edit_word' : 'modal_add_word');
    document.getElementById('wordId').value = w ? (w.id ?? w.wordId) : '';
    document.getElementById('russianWord').value = w ? (w.russianWord || w.word || '') : '';
    document.getElementById('uzbekMeaning').value = w ? (w.uzbekMeaning || w.meaning || '') : '';
    document.getElementById('wordType').value = w ? (w.type || w.wordType || 'VERB') : 'VERB';
    document.getElementById('wordAspect').value = w ? (w.aspect || 'PERFECTIVE') : 'PERFECTIVE';
    document.getElementById('exampleSentence').value = w ? (w.exampleSentence || '') : '';
    document.getElementById('wordLevel').value = w ? (w.level || w.wordLevel || 'A1') : 'A1';
    document.getElementById('exampleMeaning').value = w ? (w.exampleMeaning || '') : '';
    if (w && (w.lessonId ?? (w.lesson && w.lesson.id)) != null) document.getElementById('wordLesson').value = w.lessonId ?? w.lesson.id;
    UI.openModal('wordModal');
  }

  document.getElementById('wordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('wordId').value;
    const payload = {
      russianWord: document.getElementById('russianWord').value.trim(),
      uzbekMeaning: document.getElementById('uzbekMeaning').value.trim(),
      type: document.getElementById('wordType').value,
      aspect: document.getElementById('wordAspect').value,
      exampleSentence: document.getElementById('exampleSentence').value.trim(),
      level: document.getElementById('wordLevel').value,
      exampleMeaning: document.getElementById('exampleMeaning').value.trim(),
      lessonId: document.getElementById('wordLesson').value,
    };
    const btn = document.getElementById('saveWordBtn');
    UI.setLoading(btn, true, 'Saving…');
    try {
      if (id) await api.put(CONFIG.ENDPOINTS.adminWord(id), payload);
      else await api.post(CONFIG.ENDPOINTS.adminWords, payload);
      UI.toast('Word saved!', 'success');
      UI.closeModal('wordModal');
      await load();
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });

  async function removeWord(id) {
    if (!confirm(I18n.t('confirm_delete_word'))) return;
    try {
      await api.delete(CONFIG.ENDPOINTS.adminWord(id));
      UI.toast('Word deleted.', 'success');
      await load();
    } catch (err) {
      UI.toast(err.message, 'error');
    }
  }
});
