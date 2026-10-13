import { createDisclosure, paginateRecords } from './components.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const readout = $('#action-readout');
for (const id of ['lab-primary', 'lab-secondary', 'lab-quiet', 'lab-icon']) {
  $('#' + id).addEventListener('click', () => { readout.textContent = `${id.replace('lab-', '').toUpperCase()} PRESSED`; });
}
let loadingTimer;
$('#lab-loading').addEventListener('click', event => {
  const button = event.currentTarget;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = 'Checking…';
  readout.textContent = 'LOADING';
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.textContent = 'Try loading state';
    readout.textContent = 'LOCAL CHECK COMPLETE';
  }, 1100);
});

const form = $('#lab-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const title = $('#lab-title');
  const valid = title.value.trim().length >= 3;
  title.setAttribute('aria-invalid', String(!valid));
  $('#lab-title-error').textContent = valid ? '' : 'Enter a title with at least three characters.';
  $('#form-readout').textContent = valid ? 'FIELDS CHECKED LOCALLY' : 'CHECK THE TITLE';
  if (!valid) title.focus();
});
form.addEventListener('reset', () => queueMicrotask(() => {
  $('#lab-title').removeAttribute('aria-invalid');
  $('#lab-title-error').textContent = '';
  $('#form-readout').textContent = 'LOCAL SPECIMEN';
}));
$('#dismiss-announcement').addEventListener('click', () => { $('#announcement').hidden = true; });
const popover = createDisclosure($('#popover-trigger'), $('#popover-panel'));
document.addEventListener('click', event => { if (!event.target.closest('.popover-wrap')) popover.setOpen(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') popover.setOpen(false); });

const records = [
  { id: 'film-001', title: 'A film and its context', family: 'Film', detail: 'Poster, people and place in one route.' },
  { id: 'read-001', title: 'The archive as conversation', family: 'Reading', detail: 'An essay with source and related entities.' },
  { id: 'data-001', title: 'Illustrative schema', family: 'Data', detail: 'Fields and formats for a local study.' },
  { id: 'film-002', title: 'Credits and places', family: 'Film', detail: 'A linked record with visible provenance.' },
  { id: 'read-002', title: 'Pattern and narrative', family: 'Reading', detail: 'A calm surface after a graphic opening.' },
  { id: 'data-002', title: 'Export formats', family: 'Data', detail: 'A pair of inspected CSV and JSON examples.' },
  { id: 'film-003', title: 'Moving image frame', family: 'Film', detail: 'Media crop with full-object route.' }
];
let view = 'cards', page = 0;
const pageSize = 3;
const render = () => {
  const query = $('#lab-filter').value.trim().toLocaleLowerCase();
  const filtered = records.filter(record => `${record.id} ${record.title} ${record.family}`.toLocaleLowerCase().includes(query));
  const paged = paginateRecords(filtered, page, pageSize);
  page = paged.page;
  const { pages, visible } = paged;
  const host = $('#lab-records');
  host.classList.toggle('is-list', view === 'list');
  host.replaceChildren(...visible.map(record => {
    const article = document.createElement('article'); article.className = 'record-card';
    const id = document.createElement('span'); id.className = 'record-card__id'; id.textContent = record.id; id.dir = 'ltr';
    const title = document.createElement('h3'); title.textContent = record.title;
    const family = document.createElement('span'); family.className = 'record-card__family'; family.textContent = record.family;
    const detail = document.createElement('p'); detail.textContent = record.detail;
    const action = document.createElement('button'); action.type = 'button'; action.textContent = 'Select record →';
    action.addEventListener('click', () => { $('#collection-readout').textContent = `SELECTED ${record.id} / ${record.title}`; });
    article.append(id, title, family, detail, action); return article;
  }));
  $('#lab-empty').hidden = filtered.length !== 0;
  $('#collection-readout').textContent = `${filtered.length} MATCHING RECORDS / ${visible.length} IN VIEW`;
  $('#page-label').textContent = `PAGE ${page + 1} / ${pages}`;
  $('#page-prev').disabled = page === 0;
  $('#page-next').disabled = page >= pages - 1;
};
$('#lab-filter').addEventListener('input', () => { page = 0; render(); });
$('#reset-filter').addEventListener('click', () => { $('#lab-filter').value = ''; page = 0; render(); $('#lab-filter').focus(); });
$('#view-cards').addEventListener('click', () => setView('cards'));
$('#view-list').addEventListener('click', () => setView('list'));
function setView(next) {
  view = next;
  $('#view-cards').setAttribute('aria-pressed', String(view === 'cards'));
  $('#view-list').setAttribute('aria-pressed', String(view === 'list'));
  render();
}
$('#page-prev').addEventListener('click', () => { page -= 1; render(); });
$('#page-next').addEventListener('click', () => { page += 1; render(); });
render();

$('#start-loading').addEventListener('click', event => {
  const button = event.currentTarget;
  button.disabled = true;
  $('#loading-panel').innerHTML = '<strong>Checking…</strong><p>Simulated local delay.</p>';
  setTimeout(() => { $('#loading-panel').innerHTML = '<strong>Check complete.</strong><p>No remote work occurred.</p>'; button.disabled = false; }, 900);
});
$('#retry-preview').addEventListener('click', event => {
  const button = event.currentTarget;
  button.disabled = true;
  $('#error-panel').innerHTML = '<strong>Retrying…</strong><p>Simulated local recovery.</p>';
  setTimeout(() => { $('#error-panel').innerHTML = '<strong>Preview restored.</strong><p>This specimen still has no service connection.</p>'; button.disabled = false; }, 900);
});

const copy = {
  en: { intro: 'Parts with<br><em>purpose.</em>', lead: 'Small components and their critical states, shown separately from the composed sections. Every action is local; no request reaches a server.', actions: 'A physical response.', forms: 'Ask only what is needed.', navigation: 'Orient before moving.', collections: 'The same set, two views.', feedback: 'Say what changed.', media: 'Keep the object legible.', matrix: 'What this draft covers.' },
  ar: { intro: 'مكوّنات<br><em>لها وظيفة.</em>', lead: 'مكوّنات صغيرة وحالاتها الأساسية، معروضة خارج التكوينات الكاملة. كل إجراء محلي ولا يُرسل طلبًا إلى خادم.', actions: 'استجابة واضحة.', forms: 'اسأل عمّا تحتاجه فقط.', navigation: 'حدّد المكان قبل الانتقال.', collections: 'مجموعة واحدة، عرضان.', feedback: 'أوضح ما تغيّر.', media: 'أبقِ المادة مقروءة.', matrix: 'حدود هذه المسودة.' }
};
const titleTargets = { intro: '.lab-intro h1', lead: '.lab-intro>p:not(.lab-kicker)', actions: '#action-title', forms: '#form-title', navigation: '#nav-title', collections: '#collection-title', feedback: '#feedback-title', media: '#media-title', matrix: '#matrix-title' };
$('#lab-lang').addEventListener('click', () => {
  const next = document.documentElement.lang === 'en' ? 'ar' : 'en';
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  $('#lab-lang').textContent = next === 'ar' ? 'EN' : 'عربي';
  $('#lab-lang').setAttribute('aria-pressed', String(next === 'ar'));
  for (const [key, selector] of Object.entries(titleTargets)) $(selector).innerHTML = copy[next][key];
});
