/** GMD expansion draft API: DOM-owned, framework-neutral controls. */
export function createDisclosure(trigger, panel, { closeOnEscape = true } = {}) {
  if (!trigger || !panel) throw new TypeError('Disclosure requires trigger and panel');
  const setOpen = open => { trigger.setAttribute('aria-expanded', String(open)); panel.hidden = !open; };
  const onClick = () => setOpen(trigger.getAttribute('aria-expanded') !== 'true');
  const onKey = event => { if (event.key === 'Escape') { setOpen(false); trigger.focus(); } };
  trigger.addEventListener('click', onClick);
  if (closeOnEscape) panel.addEventListener('keydown', onKey);
  return { setOpen, get open() { return !panel.hidden; }, destroy() { trigger.removeEventListener('click', onClick); if (closeOnEscape) panel.removeEventListener('keydown', onKey); } };
}

export function createTabs(tablist, { onChange = () => {} } = {}) {
  if (!tablist) throw new TypeError('Tablist is required');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  if (!tabs.length) throw new TypeError('Tablist needs at least one tab');
  const select = (index, focus = false) => {
    const next = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const active = i === next;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    if (focus) tabs[next].focus();
    onChange(next, tabs[next]);
  };
  const onClick = event => { const i = tabs.indexOf(event.target.closest('[role="tab"]')); if (i >= 0) select(i); };
  const onKey = event => {
    const index = tabs.indexOf(event.target.closest('[role="tab"]'));
    if (index < 0) return;
    const rtl = getComputedStyle(tablist).direction === 'rtl';
    const delta = event.key === 'ArrowRight' ? (rtl ? -1 : 1) : event.key === 'ArrowLeft' ? (rtl ? 1 : -1) : 0;
    if (!delta && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    select(event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : index + delta, true);
  };
  tablist.addEventListener('click', onClick);
  tablist.addEventListener('keydown', onKey);
  select(Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true')));
  return { select, get tabs() { return tabs; }, destroy() { tablist.removeEventListener('click', onClick); tablist.removeEventListener('keydown', onKey); } };
}

export function createDialog(dialog) {
  if (!dialog || typeof dialog.showModal !== 'function') throw new TypeError('Native dialog required');
  let returnFocus = null;
  const close = () => { if (dialog.open) dialog.close(); };
  const open = trigger => {
    returnFocus = trigger || document.activeElement;
    dialog.showModal();
    const initial = dialog.querySelector('[data-close-dialog],button,[href],input,select,textarea');
    initial?.focus();
  };
  const onClick = event => { if (event.target.closest('[data-close-dialog]')) close(); };
  const onClose = () => { if (returnFocus?.isConnected) returnFocus.focus(); returnFocus = null; };
  dialog.addEventListener('click', onClick);
  dialog.addEventListener('close', onClose);
  return { open, close, destroy() { dialog.removeEventListener('click', onClick); dialog.removeEventListener('close', onClose); } };
}

export function filterAndSort(records, { query = '', family = 'all', sort = 'title' } = {}) {
  const needle = query.trim().toLocaleLowerCase();
  const filtered = records.filter(record => (family === 'all' || record.family === family) &&
    [record.id, record.title, record.family, record.status].some(value => String(value).toLocaleLowerCase().includes(needle)));
  const key = sort === 'id' ? 'id' : 'title';
  filtered.sort((a, b) => String(a[key]).localeCompare(String(b[key])) * (sort === 'title-desc' ? -1 : 1));
  return filtered;
}

export function paginateRecords(records, requestedPage = 0, pageSize = 3) {
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new RangeError('Page size must be positive');
  const pages = Math.max(1, Math.ceil(records.length / pageSize));
  const page = Math.max(0, Math.min(requestedPage, pages - 1));
  return { page, pages, visible: records.slice(page * pageSize, (page + 1) * pageSize) };
}

export function serializeRecords(records, format) {
  const fields = ['id', 'title', 'family', 'status'];
  if (format === 'json') return JSON.stringify(records.map(record => Object.fromEntries(fields.map(key => [key, record[key]]))), null, 2) + '\n';
  if (format === 'csv') {
    const cell = value => '"' + String(value ?? '').replaceAll('"', '""') + '"';
    return fields.join(',') + '\r\n' + records.map(record => fields.map(key => cell(record[key])).join(',')).join('\r\n') + '\r\n';
  }
  throw new RangeError('Format must be csv or json');
}

export function createExportBlob(records, format) {
  const content = serializeRecords(records, format);
  const type = format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json;charset=utf-8';
  return new Blob(format === 'csv' ? ['\ufeff', content] : [content], { type });
}

export function createCollection({ records, search, family, sort, rows, count, empty, renderRow, onChange = () => {} }) {
  if (!Array.isArray(records) || !search || !family || !sort || !rows || !count || !empty || !renderRow) throw new TypeError('Collection inputs missing');
  let visible = [];
  const update = () => {
    visible = filterAndSort(records, { query: search.value, family: family.value, sort: sort.value });
    rows.replaceChildren(...visible.map(renderRow));
    count.textContent = `${visible.length} of ${records.length} records`;
    empty.hidden = visible.length !== 0;
    onChange(visible);
    return visible;
  };
  const subscriptions = [[search, 'input'], [family, 'change'], [sort, 'change']];
  for (const [input, event] of subscriptions) input.addEventListener(event, update);
  update();
  return { update, get visible() { return [...visible]; }, reset() { search.value = ''; family.value = 'all'; sort.value = 'title'; update(); }, destroy() { for (const [input, event] of subscriptions) input.removeEventListener(event, update); } };
}

export function validateRequest({ project, email, acknowledgement }) {
  const errors = {};
  if (project.trim().length < 3) errors.project = 'Enter a project name with at least three characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (!acknowledgement) errors.acknowledgement = 'Confirm the media rights review requirement.';
  return errors;
}

export function createToast(element) {
  let timer;
  return {
    show(message, duration = 3500) {
      clearTimeout(timer);
      element.textContent = message;
      element.hidden = false;
      timer = setTimeout(() => { element.hidden = true; }, duration);
    },
    hide() { clearTimeout(timer); element.hidden = true; }
  };
}
