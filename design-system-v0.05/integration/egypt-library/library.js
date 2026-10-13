const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const sources = {
  'EG-005': { file: '../../../reviews/egypt-enhancement/assets/EG-005.webp', title: 'Egypt / Egitto travel brochure', alt: 'Original vertical Egypt travel brochure, shown in full' },
  'EG-011': { file: '../../../reviews/egypt-enhancement/assets/EG-011.jpg', title: 'Museum campaign envelope', alt: 'Original museum campaign envelope, shown in full' },
  'EG-013': { file: '../../../reviews/egypt-enhancement/assets/EG-013.webp', title: 'Film brochure', alt: 'Original film brochure with portrait montage, shown in full' },
  'EG-026': { file: '../../../reviews/egypt-enhancement/assets/EG-026.jpg', title: 'Family photograph', alt: 'Original group photograph on a balcony, shown in full' },
  'EG-027': { file: '../../../reviews/egypt-enhancement/assets/EG-027.jpg', title: 'Television studio photograph', alt: 'Original television studio photograph, shown in full' },
  'EG-036': { file: '../../../reviews/egypt-enhancement/assets/EG-036.png', title: 'Cairo grille photograph', alt: 'Original Cairo architectural grille photograph, shown in full' }
};
const records = [
  { id: 'EG-005', title: 'Egypt / Egitto brochure', titleAr: 'كتيّب مصر السياحي', family: 'print', source: 'Supplied graphics', status: 'Review required' },
  { id: 'EG-011', title: 'Museum campaign envelope', titleAr: 'مظروف حملة المتاحف', family: 'print', source: 'Supplied graphics', status: 'Review required' },
  { id: 'EG-013', title: 'Film brochure', titleAr: 'كتيّب فيلم', family: 'film', source: 'Supplied graphics', status: 'Review required' },
  { id: 'EG-026', title: 'Family photograph', titleAr: 'صورة عائلية', family: 'photo', source: 'Supplied images', status: 'Review required' },
  { id: 'EG-027', title: 'Television studio photograph', titleAr: 'صورة استوديو تلفزيوني', family: 'photo', source: 'Supplied images', status: 'Review required' },
  { id: 'EG-036', title: 'Cairo grille photograph', titleAr: 'صورة مشربية في القاهرة', family: 'photo', source: 'Supplied images', status: 'Review required' }
];
let locale = 'en';
function applyLocale(next) {
  locale = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  $$('[data-en][data-ar]').forEach(node => { node.innerHTML = node.dataset[next]; });
  $$('[data-locale]').forEach(button => { button.textContent = next === 'ar' ? 'English' : 'عربي'; button.setAttribute('aria-label', next === 'ar' ? 'Switch language to English' : 'Switch language to Arabic'); });
  if (document.body.dataset.page === 'library') renderRecords();
}
$$('[data-locale]').forEach(button => button.addEventListener('click', () => applyLocale(locale === 'en' ? 'ar' : 'en')));

const menu = $('[data-menu]');
const nav = $('#site-nav');
const productButton = $('[data-products]');
const productPanel = $('#product-menu');
function closeProducts() { if (!productPanel) return; productPanel.hidden = true; productButton.setAttribute('aria-expanded', 'false'); }
function closeMenu() { if (!menu) return; nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); closeProducts(); }
menu?.addEventListener('click', () => { const open = !nav.classList.contains('is-open'); nav.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open)); if (!open) closeProducts(); });
productButton?.addEventListener('click', () => { const open = productPanel.hidden; productPanel.hidden = !open; productButton.setAttribute('aria-expanded', String(open)); });
document.addEventListener('click', event => { if (productButton && !event.target.closest('.nav-products')) closeProducts(); if (menu && window.matchMedia('(max-width:1000px)').matches && !event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!productPanel?.hidden) { closeProducts(); productButton.focus(); } else if (nav?.classList.contains('is-open')) { closeMenu(); menu.focus(); } } });
$$('.site-nav a').forEach(link => link.addEventListener('click', () => { if (window.matchMedia('(max-width:1000px)').matches) closeMenu(); }));
window.matchMedia('(min-width:1001px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
$('[data-dismiss-announcement]')?.addEventListener('click', () => { $('.notice-bar').hidden = true; });

let toastTimer;
function showToast(message) { const toast = $('#toast'); if (!toast) return; clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false; toastTimer = setTimeout(() => { toast.hidden = true; }, 3500); }
document.addEventListener('click', event => { const trigger = event.target.closest('[data-toast]'); if (trigger) showToast(trigger.dataset.toast); });
$$('[data-busy]').forEach(button => button.addEventListener('click', () => { if (button.disabled) return; const label = button.textContent; button.disabled = true; button.textContent = 'Loading preview…'; setTimeout(() => { button.disabled = false; button.textContent = label; showToast('Preview prepared locally'); }, 850); }));

const sourceDialog = $('#source-dialog');
let sourceTrigger;
function openSource(id, trigger) {
  const source = sources[id]; if (!source || !sourceDialog) return;
  sourceTrigger = trigger;
  $('#source-dialog-image').src = source.file;
  $('#source-dialog-image').alt = source.alt;
  $('#source-dialog-title').textContent = source.title;
  $('#source-dialog-description').textContent = 'The supplied source file is presented in full. Filename and visual observations are not verified catalog metadata.';
  $('#source-dialog-id').textContent = id;
  $('#source-dialog-link').href = source.file;
  sourceDialog.showModal();
  $('[data-close-source]').focus();
}
document.addEventListener('click', event => { const trigger = event.target.closest('[data-open-source]'); if (trigger) openSource(trigger.dataset.openSource, trigger); });
$('[data-close-source]')?.addEventListener('click', () => sourceDialog.close());
sourceDialog?.addEventListener('close', () => sourceTrigger?.focus());
sourceDialog?.addEventListener('click', event => { if (event.target === sourceDialog) sourceDialog.close(); });

function validateForm(form, fields) {
  const failures = [];
  for (const { name, errorId, message } of fields) {
    const input = form.elements.namedItem(name);
    const invalid = input.type === 'checkbox' ? !input.checked : !input.checkValidity();
    const error = document.getElementById(errorId);
    input.setAttribute('aria-invalid', String(invalid));
    if (error) error.textContent = invalid ? message : '';
    if (invalid) failures.push(input);
  }
  failures[0]?.focus();
  return failures.length === 0;
}
$('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const okay = validateForm(form, [
    { name: 'name', errorId: 'name-error', message: locale === 'ar' ? 'أدخل اسمًا من حرفين على الأقل.' : 'Enter at least two characters.' },
    { name: 'email', errorId: 'email-error', message: locale === 'ar' ? 'أدخل بريدًا إلكترونيًا صالحًا.' : 'Enter a valid email address.' },
    { name: 'message', errorId: 'message-error', message: locale === 'ar' ? 'اكتب عشرة أحرف على الأقل.' : 'Write at least ten characters.' }
  ]);
  $('#contact-status').textContent = okay ? (locale === 'ar' ? 'تم التحقق محليًا. لم تُرسل رسالة.' : 'Checked locally. No message was sent.') : '';
  if (okay) showToast(locale === 'ar' ? 'تم التحقق من النموذج محليًا' : 'Form checked locally');
});

const tabList = $('.demo-tabs');
if (tabList) {
  const tabs = $$('[role=tab]', tabList);
  const select = tab => { tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; $('#' + item.getAttribute('aria-controls')).hidden = !active; }); };
  tabs.forEach((tab, index) => { tab.addEventListener('click', () => select(tab)); tab.addEventListener('keydown', event => { const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0; if (!delta) return; event.preventDefault(); const sign = document.documentElement.dir === 'rtl' ? -delta : delta; const next = tabs[(index + sign + tabs.length) % tabs.length]; select(next); next.focus(); }); });
}
const miniTrigger = $('[data-toggle-popover]');
const miniPopover = $('#mini-popover');
function closePopover() { if (!miniPopover) return; miniPopover.hidden = true; miniTrigger.setAttribute('aria-expanded', 'false'); }
miniTrigger?.addEventListener('click', () => { const open = miniPopover.hidden; miniPopover.hidden = !open; miniTrigger.setAttribute('aria-expanded', String(open)); });
document.addEventListener('click', event => { if (miniTrigger && !event.target.closest('.icon-demo')) closePopover(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && miniPopover && !miniPopover.hidden) { closePopover(); miniTrigger.focus(); } });

$('#demo-form')?.addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; const okay = validateForm(form, [{ name: 'title', errorId: 'demo-title-error', message: 'Enter at least three characters.' }, { name: 'note', errorId: 'demo-note-error', message: 'Write at least ten characters.' }, { name: 'sourceChecked', errorId: 'demo-check-error', message: 'Confirm the source description.' }]); $('#demo-form-status').textContent = okay ? 'Checked locally · no record saved' : ''; if (okay) showToast('Record fields checked locally'); });
$('#demo-form')?.addEventListener('reset', () => { setTimeout(() => { $$('#demo-form [aria-invalid]').forEach(node => node.removeAttribute('aria-invalid')); $$('#demo-form .field-error').forEach(node => { node.textContent = ''; }); $('#demo-form-status').textContent = ''; }, 0); });

let query = '', family = 'all', sort = 'title', view = 'cards', page = 1;
const pageSize = 3;
const escapeText = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
function filteredRecords() {
  const q = query.trim().toLocaleLowerCase();
  return records.filter(record => (family === 'all' || record.family === family) && (!q || [record.id, record.title, record.titleAr, record.source].some(value => value.toLocaleLowerCase().includes(q)))).sort((a, b) => sort === 'id' ? a.id.localeCompare(b.id) : sort === 'title-desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
}
function shownRecords() { const filtered = filteredRecords(); const pages = Math.max(1, Math.ceil(filtered.length / pageSize)); page = Math.min(page, pages); return { filtered, visible: filtered.slice((page - 1) * pageSize, page * pageSize), pages }; }
function renderRecords() {
  const host = $('#record-results'); if (!host) return;
  const { filtered, visible, pages } = shownRecords();
  $('#result-count').textContent = locale === 'ar' ? `${filtered.length} من ${records.length} سجلات` : `${filtered.length} of ${records.length} records`;
  $('#record-empty').hidden = filtered.length !== 0;
  host.hidden = filtered.length === 0;
  host.className = `record-results is-${view}`;
  const title = record => locale === 'ar' ? record.titleAr : record.title;
  const card = record => `<article class="record-card"><div class="record-card__media"><img src="${sources[record.id].file}" alt="${escapeText(sources[record.id].alt)}" loading="lazy"></div><div class="record-card__body"><span>${record.id} / ${escapeText(record.family.toUpperCase())}</span><strong>${escapeText(title(record))}</strong><p>${escapeText(record.source)} · ${escapeText(record.status)}</p><button type="button" data-open-source="${record.id}">${locale === 'ar' ? 'عرض الأصل ←' : 'Full source →'}</button></div></article>`;
  if (view === 'table') host.innerHTML = `<table class="record-table"><caption class="sr-only">Current record page</caption><thead><tr><th scope="col">ID</th><th scope="col">Title</th><th scope="col">Family</th><th scope="col">Source</th><th scope="col">Object</th></tr></thead><tbody>${visible.map(record => `<tr><td><bdi>${record.id}</bdi></td><td>${escapeText(title(record))}</td><td>${escapeText(record.family)}</td><td>${escapeText(record.source)}</td><td><button type="button" data-open-source="${record.id}">View original ↗</button></td></tr>`).join('')}</tbody></table>`;
  else host.innerHTML = visible.map(card).join('');
  $('#page-state').textContent = `${page} / ${pages}`;
  $('#page-prev').disabled = page <= 1;
  $('#page-next').disabled = page >= pages;
  $('#download-csv').disabled = visible.length === 0;
  $('#download-json').disabled = visible.length === 0;
  const chips = $('#active-chips');
  chips.replaceChildren();
  if (query.trim()) { const chip = document.createElement('button'); chip.className = 'filter-chip'; chip.type = 'button'; chip.textContent = `“${query.trim()}” ×`; chip.addEventListener('click', () => { $('#record-search').value = ''; query = ''; page = 1; renderRecords(); }); chips.append(chip); }
  if (family !== 'all') { const chip = document.createElement('button'); chip.className = 'filter-chip'; chip.type = 'button'; chip.textContent = `${family} ×`; chip.addEventListener('click', () => { $('#record-family').value = 'all'; family = 'all'; page = 1; renderRecords(); }); chips.append(chip); }
}
$('#record-search')?.addEventListener('input', event => { query = event.target.value; page = 1; renderRecords(); });
$('#record-family')?.addEventListener('change', event => { family = event.target.value; page = 1; renderRecords(); });
$('#record-sort')?.addEventListener('change', event => { sort = event.target.value; page = 1; renderRecords(); });
$$('[data-view]').forEach(button => button.addEventListener('click', () => { view = button.dataset.view; $$('[data-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); renderRecords(); }));
const clearDiscovery = () => { query = ''; family = 'all'; sort = 'title'; page = 1; $('#record-search').value = ''; $('#record-family').value = 'all'; $('#record-sort').value = 'title'; renderRecords(); };
$('#clear-discovery')?.addEventListener('click', clearDiscovery);
$('#empty-clear')?.addEventListener('click', clearDiscovery);
$('#page-prev')?.addEventListener('click', () => { page--; renderRecords(); });
$('#page-next')?.addEventListener('click', () => { page++; renderRecords(); });
function exportVisible(format) {
  const { visible } = shownRecords();
  if (visible.length === 0) return;
  const fields = ['id', 'title', 'family', 'source', 'status'];
  const rows = visible.map(record => ({ ...record, title: locale === 'ar' ? record.titleAr : record.title }));
  const csv = [fields.join(','), ...rows.map(record => fields.map(field => `"${String(record[field]).replaceAll('"', '""')}"`).join(','))].join('\r\n') + '\r\n';
  const blob = format === 'csv' ? new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }) : new Blob([JSON.stringify(rows.map(record => Object.fromEntries(fields.map(field => [field, record[field]]))), null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `gmd-visible-records.${format}`; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(`${visible.length} visible records exported as ${format.toUpperCase()}`);
}
$('#download-csv')?.addEventListener('click', () => exportVisible('csv'));
$('#download-json')?.addEventListener('click', () => exportVisible('json'));
if (document.body.dataset.page === 'library') renderRecords();

$('[data-retry-media]')?.addEventListener('click', event => { const button = event.currentTarget; button.disabled = true; button.textContent = 'Retrying…'; setTimeout(() => { $('#missing-preview > span').textContent = 'Preview still unavailable'; button.disabled = false; button.textContent = 'Retry preview →'; showToast('Original source link remains available'); }, 650); });
$('#retry-demo')?.addEventListener('click', event => { const button = event.currentTarget; button.disabled = true; button.textContent = 'Retrying…'; setTimeout(() => { $('#retry-title').textContent = 'Preview restored'; $('#retry-copy').textContent = 'This local state changed after retry.'; button.disabled = false; button.textContent = 'Retry again →'; }, 800); });
$('#progress-run')?.addEventListener('click', event => { const button = event.currentTarget; button.disabled = true; const bar = $('.progress-track'); const fill = $('#progress-fill'); let value = 0; bar.setAttribute('aria-valuenow', '0'); fill.style.width = '0%'; $('#progress-title').textContent = 'Preparing preview'; const timer = setInterval(() => { value = Math.min(100, value + 20); bar.setAttribute('aria-valuenow', String(value)); fill.style.width = `${value}%`; if (value === 100) { clearInterval(timer); button.disabled = false; $('#progress-title').textContent = 'Preview prepared'; showToast('Preview prepared locally'); } }, 180); });
