document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAdmin()) return;
  Layout.mountAdmin('lessons');
  document.getElementById('userMenuSlot').innerHTML = Layout.renderUserMenu();

  const body = document.getElementById('tblBody');
  const pager = document.getElementById('pager');
  const pageSize = 5;
  let page = 1;
  let all = [];

  await load();

  async function load() {
    body.innerHTML = `<tr><td colspan="5"><div class="skeleton" style="height:20px"></div></td></tr>`;
    try {
      const res = await api.get(CONFIG.ENDPOINTS.adminLessons);
      all = UI.extractList(res);
      render();
    } catch (err) {
      body.innerHTML = `<tr><td colspan="5" class="table-empty">${UI.escapeHtml(err.message)}</td></tr>`;
    }
  }

  function render() {
    if (!all.length) {
      body.innerHTML = `<tr><td colspan="5" class="table-empty">${I18n.t('no_lessons_row')}</td></tr>`;
      pager.innerHTML = '';
      return;
    }
    const rows = Paginator.slice(all, page, pageSize);
    body.innerHTML = rows.map(rowHtml).join('');
    Paginator.renderBar(pager, { page, pageSize, total: all.length, noun: 'lessons', onPage: (p) => { page = p; render(); } });
    wireRowActions();
  }

  function rowHtml(l) {
    const id = l.id ?? l.lessonId;
    const wordCount = l.wordCount ?? l.totalWords ?? l.words ?? 0;
    return `
      <tr data-id="${id}">
        <td class="cell-muted">${id}</td>
        <td class="cell-strong">${UI.escapeHtml(l.name || l.title)}</td>
        <td class="cell-muted">${UI.formatDate(l.date || l.createdAt)}</td>
        <td class="cell-muted">${wordCount}</td>
        <td>
          <div class="row-actions">
            <button class="btn-icon edit-btn" data-id="${id}" aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg></button>
            <button class="btn-icon del-btn" data-id="${id}" aria-label="Delete" style="color:var(--error)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg></button>
          </div>
        </td>
      </tr>`;
  }

  function wireRowActions() {
    UI.qsa('.edit-btn', body).forEach((b) => b.addEventListener('click', () => openModal(all.find((l) => String(l.id ?? l.lessonId) === b.dataset.id))));
    UI.qsa('.del-btn', body).forEach((b) => b.addEventListener('click', () => removeLesson(b.dataset.id)));
  }

  const modal = document.getElementById('lessonModal');
  document.getElementById('addLessonBtn').addEventListener('click', () => openModal(null));

  function openModal(lesson) {
    document.getElementById('modalTitle').textContent = I18n.t(lesson ? 'modal_edit_lesson' : 'modal_add_lesson');
    document.getElementById('lessonId').value = lesson ? (lesson.id ?? lesson.lessonId) : '';
    document.getElementById('lessonName').value = lesson ? (lesson.name || lesson.title || '') : '';
    document.getElementById('lessonDate').value = lesson && lesson.date ? String(lesson.date).slice(0, 10) : '';
    document.getElementById('lessonDesc').value = lesson ? (lesson.description || '') : '';
    UI.openModal('lessonModal');
  }

  document.getElementById('lessonForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('lessonId').value;
    const payload = {
      name: document.getElementById('lessonName').value.trim(),
      date: document.getElementById('lessonDate').value,
      description: document.getElementById('lessonDesc').value.trim(),
    };
    const btn = document.getElementById('saveLessonBtn');
    UI.setLoading(btn, true, I18n.t('loading'));
    try {
      if (id) await api.put(CONFIG.ENDPOINTS.adminLesson(id), payload);
      else await api.post(CONFIG.ENDPOINTS.adminLessons, payload);
      UI.toast('Lesson saved!', 'success');
      UI.closeModal('lessonModal');
      await load();
    } catch (err) {
      UI.toast(err.message, 'error');
    } finally {
      UI.setLoading(btn, false);
    }
  });

  async function removeLesson(id) {
    if (!confirm(I18n.t('confirm_delete_lesson'))) return;
    try {
      await api.delete(CONFIG.ENDPOINTS.adminLesson(id));
      UI.toast('Lesson deleted.', 'success');
      await load();
    } catch (err) {
      UI.toast(err.message, 'error');
    }
  }
});
