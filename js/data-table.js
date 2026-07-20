const Paginator = {
  slice(rows, page, pageSize) {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  },

  pageNumbers(current, total) {
    const pages = [];
    const add = (v) => { if (!pages.includes(v)) pages.push(v); };
    add(1);
    for (let p = current - 1; p <= current + 1; p++) if (p > 1 && p < total) add(p);
    if (total > 1) add(total);
    return pages.sort((a, b) => a - b);
  },

  renderBar(el, { page, pageSize, total, noun, onPage }) {
    if (!el) return;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);
    const nounText = I18n.t(`noun_${noun}`);

    const nums = this.pageNumbers(page, totalPages);
    let btns = '';
    let prevShown = 1;
    nums.forEach((p) => {
      if (p - prevShown > 1) btns += `<button disabled>…</button>`;
      btns += `<button data-page="${p}" class="${p === page ? 'active' : ''}">${p}</button>`;
      prevShown = p;
    });

    el.innerHTML = `
      <div class="pagination-info">${I18n.t('pagination_showing').replace('{start}', startItem).replace('{end}', endItem).replace('{total}', total)} ${nounText}</div>
      <div class="pagination">
        <button data-page="${page - 1}" ${page === 1 ? 'disabled' : ''} aria-label="Previous">‹</button>
        ${btns}
        <button data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''} aria-label="Next">›</button>
      </div>`;

    el.querySelectorAll('button[data-page]').forEach((b) => {
      b.addEventListener('click', () => {
        const p = Number(b.dataset.page);
        if (p >= 1 && p <= totalPages) onPage(p);
      });
    });
  },
};
