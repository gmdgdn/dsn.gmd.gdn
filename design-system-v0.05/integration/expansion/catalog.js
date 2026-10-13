import { createDisclosure, createTabs, createDialog, createCollection, createExportBlob, validateRequest, createToast } from './components.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const toast = createToast($('#toast'));
const menu = createDisclosure($('#menu-toggle'), $('#site-nav'), { closeOnEscape: false });
const products = createDisclosure($('#products-toggle'), $('#products-menu'));
const mobileNav = matchMedia('(max-width:1050px)');
const syncMenuForViewport = () => { if (mobileNav.matches) { menu.setOpen(false); $('#site-nav').classList.remove('is-open'); } else { menu.setOpen(true); $('#site-nav').classList.remove('is-open'); } };
mobileNav.addEventListener('change', syncMenuForViewport);
syncMenuForViewport();
$('#menu-toggle').addEventListener('click', () => $('#site-nav').classList.toggle('is-open', menu.open));
$$('#site-nav a').forEach(link => link.addEventListener('click', () => { if (mobileNav.matches) { menu.setOpen(false); $('#site-nav').classList.remove('is-open'); } products.setOpen(false); }));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  products.setOpen(false);
  if (mobileNav.matches) { menu.setOpen(false); $('#site-nav').classList.remove('is-open'); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-disclosure')) products.setOpen(false);
});

const languages = {
  en: { label: 'عربي', intro: 'One language.<br><em>Many ways in.</em>', introBody: 'Eight distinct section studies bring the Tavus material, typography and hard depth into film, reading and data. The controls below are working component examples; the records are illustrative.', density: 'EDITORIAL ↔ WORKSPACE', film: 'The frame<br>holds a <em>story.</em>', mosaic: 'A collection with <em>many entrances.</em>', radial: 'Follow a thread.', reading: 'A chapter has <em>room to breathe.</em>', lattice: 'Patterns become paths.', data: 'Geometry steps aside for <em>precision.</em>', workspace: 'The same identity at <em>working scale.</em>', proof: 'Different products.<br><em>One clear grammar.</em>', editorialCard: 'A generous opening.', editorialCardBody: 'Large display type, a raised action and room for an image or long story.', workspaceCard: 'More in view.' },
  ar: { label: 'EN', intro: 'لغة واحدة.<br><em>ومداخل كثيرة.</em>', introBody: 'ثمانية تكوينات مختلفة تنقل مادة تافوس وخطوطه وعمقه الواضح إلى السينما والقراءة والبيانات. الأدوات هنا أمثلة عملية، والسجلات توضيحية.', density: 'تحريري ↔ مساحة عمل', film: 'الإطار يحمل<br><em>حكاية.</em>', mosaic: 'للمجموعة <em>مداخل كثيرة.</em>', radial: 'اتبع الخيط.', reading: 'فصل يمنح <em>القراءة مساحتها.</em>', lattice: 'الأنماط تفتح مسارات.', data: 'تفسح الهندسة المجال <em>للدقة.</em>', workspace: 'الهوية نفسها <em>في مساحة العمل.</em>', proof: 'منتجات مختلفة.<br><em>لغة واحدة واضحة.</em>', editorialCard: 'افتتاحية رحبة.', editorialCardBody: 'عنوان كبير وإجراء بارز ومساحة لصورة أو حكاية طويلة.', workspaceCard: 'المزيد في المتناول.' }
};
const ids = { intro: '#intro-title', introBody: '#intro-body', density: '#intro-density', film: '#film-title', mosaic: '#mosaic-title', radial: '#radial-title', reading: '#reading-title', lattice: '#lattice-title', data: '#data-title', workspace: '#workspace-title', proof: '#proof-title', editorialCard: '#editorial-card-title', editorialCardBody: '#editorial-card-body', workspaceCard: '#workspace-card-title' };
$('#language-toggle').addEventListener('click', () => {
  const next = document.documentElement.lang === 'en' ? 'ar' : 'en';
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  $('#language-toggle').textContent = languages[next].label;
  $('#language-toggle').setAttribute('aria-pressed', String(next === 'ar'));
  for (const [key, selector] of Object.entries(ids)) $(selector).innerHTML = languages[next][key];
  $('#collection-search').placeholder = next === 'ar' ? 'العنوان أو الفئة أو المعرّف' : 'Title, family or ID';
  toast.show(next === 'ar' ? 'تم تفعيل اتجاه القراءة من اليمين إلى اليسار.' : 'Left-to-right reading restored.');
});

createTabs($('.tab-list'));
const dialogs = {
  record: createDialog($('#record-dialog')),
  contract: createDialog($('#contract-dialog')),
  notes: createDialog($('#notes-dialog'))
};
$$('[data-open-record]').forEach(button => button.addEventListener('click', () => dialogs.record.open(button)));
$('#open-dialog').addEventListener('click', event => dialogs.contract.open(event.currentTarget));
$('#open-notes').addEventListener('click', event => dialogs.notes.open(event.currentTarget));

const records = [
  { id: 'film-001', title: 'A film and its context', family: 'film', status: 'study' },
  { id: 'film-002', title: 'Poster source trail', family: 'film', status: 'draft' },
  { id: 'read-001', title: 'The archive as conversation', family: 'reading', status: 'study' },
  { id: 'read-002', title: 'Related entities', family: 'reading', status: 'draft' },
  { id: 'data-001', title: 'Illustrative record schema', family: 'data', status: 'tested' },
  { id: 'data-002', title: 'Export format specimen', family: 'data', status: 'draft' }
];
const renderRow = record => {
  const tr = document.createElement('tr');
  for (const key of ['id', 'title', 'family', 'status']) {
    const td = document.createElement('td');
    if (key === 'status') { const tag = document.createElement('span'); tag.className = 'status-tag'; tag.textContent = record[key]; td.append(tag); }
    else { td.textContent = record[key]; if (key === 'id') td.dir = 'ltr'; }
    tr.append(td);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'text-link'; button.textContent = 'Inspect →';
  button.addEventListener('click', () => {
    if (record.family === 'film') dialogs.record.open(button);
    else { dialogs.contract.open(button); }
  });
  action.append(button); tr.append(action);
  return tr;
};
const collection = createCollection({ records, search: $('#collection-search'), family: $('#collection-family'), sort: $('#collection-sort'), rows: $('#collection-rows'), count: $('#collection-count'), empty: $('#collection-empty'), renderRow });
$('#clear-filters').addEventListener('click', () => collection.reset());
const download = format => {
  const blob = createExportBlob(collection.visible, format);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `gmd-specimen-records.${format}`; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast.show(`${collection.visible.length} visible records exported as ${format.toUpperCase()}.`);
};
$('#download-csv').addEventListener('click', () => download('csv'));
$('#download-json').addEventListener('click', () => download('json'));

const form = $('#request-form');
const project = $('#project-name');
const email = $('#contact-email');
const acknowledgement = $('#rights-ack');
const clearErrors = () => {
  for (const field of [project, email, acknowledgement]) field.removeAttribute('aria-invalid');
  $('#project-error').textContent = $('#email-error').textContent = $('#rights-error').textContent = '';
};
form.addEventListener('submit', event => {
  event.preventDefault(); clearErrors();
  const errors = validateRequest({ project: project.value, email: email.value, acknowledgement: acknowledgement.checked });
  if (Object.keys(errors).length) {
    if (errors.project) { project.setAttribute('aria-invalid', 'true'); $('#project-error').textContent = errors.project; }
    if (errors.email) { email.setAttribute('aria-invalid', 'true'); $('#email-error').textContent = errors.email; }
    if (errors.acknowledgement) { acknowledgement.setAttribute('aria-invalid', 'true'); $('#rights-error').textContent = errors.acknowledgement; }
    ({ project, email, acknowledgement })[Object.keys(errors)[0]].focus();
    $('#save-state').textContent = 'CHECK FIELDS';
    return;
  }
  $('#save-state').textContent = 'CHECKED LOCALLY';
  $('#form-success').hidden = false;
  toast.show('Request checked locally; nothing was sent.');
});
form.addEventListener('input', () => { $('#save-state').textContent = 'UNSAVED'; $('#form-success').hidden = true; });
form.addEventListener('reset', () => { queueMicrotask(() => { clearErrors(); $('#save-state').textContent = 'UNSAVED'; $('#form-success').hidden = true; }); });
$('#show-toast').addEventListener('click', () => toast.show('Changes are visible. No remote state was changed.'));
