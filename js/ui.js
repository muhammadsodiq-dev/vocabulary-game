const UI = {
  toast(message, type = 'info') {
    let stack = document.querySelector('.toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'toast-stack';
      document.body.appendChild(stack);
    }
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .2s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 200);
    }, 3200);
  },

  openModal(id) {
    document.getElementById(id)?.classList.add('show');
  },
  closeModal(id) {
    document.getElementById(id)?.classList.remove('show');
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const months = I18n.months();
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  },
  formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${this.formatDate(dateStr)} ${hh}:${mm}`;
  },

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  /** Backend paginated javob turli shaklda bo'lishi mumkin (array, {content}, {items}, {data}) — hammasini normallashtiradi */
  extractList(res) {
    if (Array.isArray(res)) return res;
    if (!res) return [];
    return res.content || res.items || res.data || res.results || [];
  },
  extractTotal(res, fallbackLength) {
    if (Array.isArray(res)) return res.length;
    if (!res) return fallbackLength || 0;
    return res.totalElements ?? res.total ?? res.totalCount ?? fallbackLength ?? 0;
  },

  qs(sel, root = document) { return root.querySelector(sel); },
  qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); },

  setLoading(btn, loading, labelWhenLoading = 'Yuklanmoqda...') {
    if (!btn) return;
    if (loading) {
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = labelWhenLoading;
      btn.disabled = true;
    } else {
      if (btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
      btn.disabled = false;
    }
  },
};

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close-modal]')) {
    const modal = e.target.closest('.modal-scrim');
    if (modal) modal.classList.remove('show');
  }
});
