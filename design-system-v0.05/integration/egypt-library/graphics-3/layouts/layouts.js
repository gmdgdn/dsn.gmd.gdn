const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menu = $('[data-menu]');
const nav = $('#main-nav');
function closeMenu() { if (!menu || !nav) return; nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
menu?.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded', String(open)); });
$$('#main-nav a').forEach(link => link.addEventListener('click', closeMenu));
window.matchMedia('(min-width:761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const locale = $('[data-locale]');
let currentLocale = 'en';
locale?.addEventListener('click', () => {
  currentLocale = currentLocale === 'en' ? 'ar' : 'en';
  document.documentElement.lang = currentLocale;
  document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
  $$('[data-en][data-ar]').forEach(element => { element.innerHTML = element.dataset[currentLocale]; });
  locale.textContent = currentLocale === 'ar' ? 'EN' : 'عربي';
  locale.setAttribute('aria-label', currentLocale === 'ar' ? 'Switch to English' : 'Switch to Arabic');
  if (document.body.dataset.page === 'data') renderRecords();
});

const sourceFiles = {
  'G3-002':'../sources/G3-002.jpg','G3-006':'../sources/G3-006.jpg',
  'G3-007':'../sources/G3-007.jpg','G3-008':'../sources/G3-008.jpg',
  'G3-010':'../sources/G3-010.jpg','G3-011':'../sources/G3-011.png',
  'G3-017':'../sources/G3-017.jpg','G3-019':'../sources/G3-019.jpg',
  'G3-021':'../sources/G3-021.jpg','G3-004':'../sources/G3-004.png',
  'G3-009':'../sources/G3-009.jpg','G3-012':'../sources/G3-012.jpg',
  'G3-020':'../sources/G3-020.png'
};
const rotation = { 'G3-007':90, 'G3-008':90, 'G3-016':-90, 'G3-017':-90 };
let returnFocus = null;
const dialog = $('#source-dialog');
function openSource(id, label, trigger) {
  if (!dialog || !sourceFiles[id]) return;
  returnFocus = trigger;
  $('#dialog-title').textContent = label || id;
  const image = $('#dialog-image');
  image.src = sourceFiles[id]; image.alt = `Full supplied source ${id}`;
  image.classList.toggle('is-rotated', id in rotation);
  image.style.setProperty('--turn', `${rotation[id] || 90}deg`);
  $('#dialog-link').href = sourceFiles[id];
  const existing = $('.g3-dialog__orientation', dialog); existing?.remove();
  if (id in rotation) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'g3-dialog__orientation';
    button.textContent = 'Show file orientation';
    button.setAttribute('aria-pressed', 'true');
    button.addEventListener('click', () => {
      const upright = image.classList.toggle('is-rotated');
      button.textContent = upright ? 'Show file orientation' : 'Show upright reading view';
      button.setAttribute('aria-pressed', String(upright));
    });
    $('#dialog-description').after(button);
  }
  dialog.showModal();
  $('[data-close-source]', dialog)?.focus();
}
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-source]');
  if (trigger) openSource(trigger.dataset.source, trigger.dataset.sourceTitle, trigger);
});
$('[data-close-source]', dialog || document)?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('close', () => { const img = $('#dialog-image'); if (img) img.removeAttribute('src'); returnFocus?.focus(); });
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const records = [
  {id:'G3-002',title:'Four-panel illustrated spread',format:'page',feature:'Color blocks, drawings and Arabic captions',file:'../sources/G3-002.jpg'},
  {id:'G3-004',title:'Alexandrie print',format:'print',feature:'Pale cover field with central lettering',file:'../sources/G3-004.png'},
  {id:'G3-009',title:'Green magazine cover',format:'print',feature:'Ornamental border and central title field',file:'../sources/G3-009.jpg'},
  {id:'G3-010',title:'Framed portrait print',format:'print',feature:'Portrait within blue decorative frame',file:'../sources/G3-010.jpg'},
  {id:'G3-012',title:'Landscape postcard',format:'postcard',feature:'Nile scene with illustrated border',file:'../sources/G3-012.jpg'},
  {id:'G3-017',title:'Illustrated chair study',format:'drawing',feature:'Repeated chair forms, photographed sideways',file:'../sources/G3-017.jpg'},
  {id:'G3-020',title:'Pyramid cartoon',format:'drawing',feature:'Brick pyramids with small figures',file:'../sources/G3-020.png'},
  {id:'G3-021',title:'Question-form print',format:'print',feature:'Large green curved question field',file:'../sources/G3-021.jpg'}
];
const dataState = {query:'',format:'all',sort:'id',view:'table',page:0,pageSize:4};
function htmlEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function filteredRecords() {
  const q = dataState.query.trim().toLocaleLowerCase();
  const list = records.filter(record => (dataState.format === 'all' || record.format === dataState.format) && (!q || [record.id,record.title,record.format,record.feature].join(' ').toLocaleLowerCase().includes(q)));
  const collator = new Intl.Collator(currentLocale, {numeric:true,sensitivity:'base'});
  list.sort((a,b) => collator.compare(a[dataState.sort],b[dataState.sort]) || collator.compare(a.id,b.id));
  return list;
}
function visibleRecords() { return filteredRecords().slice(dataState.page*dataState.pageSize,(dataState.page+1)*dataState.pageSize); }
function renderRecords() {
  const host = $('#record-results'); if (!host) return;
  const list = filteredRecords();
  const totalPages = Math.max(1,Math.ceil(list.length/dataState.pageSize));
  dataState.page = Math.min(dataState.page,totalPages-1);
  const visible = visibleRecords();
  $('#record-count').textContent = currentLocale === 'ar' ? `${list.length} سجلًا محليًا` : `${list.length} local record${list.length===1?'':'s'}`;
  $('#page-status').textContent = currentLocale === 'ar' ? `صفحة ${dataState.page+1} من ${totalPages}` : `Page ${dataState.page+1} of ${totalPages}`;
  $('#page-prev').disabled = dataState.page === 0; $('#page-next').disabled = dataState.page >= totalPages-1;
  $('#download-csv').disabled = !visible.length; $('#download-json').disabled = !visible.length;
  const chips = [];
  if (dataState.query) chips.push(`<span>${currentLocale==='ar'?'بحث':'Query'}: ${htmlEscape(dataState.query)}</span>`);
  if (dataState.format !== 'all') chips.push(`<span>${currentLocale==='ar'?'نوع':'Format'}: ${htmlEscape(dataState.format)}</span>`);
  $('#active-filters').innerHTML = chips.join('');
  $$('[data-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.view===dataState.view)));
  if (!list.length) {
    host.className='data-results';
    host.innerHTML='<div class="data-empty"><strong>No matching local records.</strong><p>Try another title or clear the format filter.</p></div>';
    return;
  }
  if (dataState.view === 'cards') {
    host.className='data-results is-cards';
    host.innerHTML=visible.map(r=>`<article class="data-record-card"><img src="${r.file}" alt="Full supplied source ${r.id}" loading="lazy"><div><span>${r.id} / ${htmlEscape(r.format.toUpperCase())}</span><strong>${htmlEscape(r.title)}</strong><p>${htmlEscape(r.feature)}</p><button type="button" data-source="${r.id}" data-source-title="${htmlEscape(r.title)}">Full source ↗</button></div></article>`).join('');
  } else {
    host.className='data-results';
    host.innerHTML=`<table><thead><tr><th scope="col">ID</th><th scope="col">Provisional title</th><th scope="col">Format</th><th scope="col">Visible feature</th><th scope="col">Status</th><th scope="col">Source</th></tr></thead><tbody>${visible.map(r=>`<tr><td>${r.id}</td><td>${htmlEscape(r.title)}</td><td>${htmlEscape(r.format)}</td><td>${htmlEscape(r.feature)}</td><td><span class="status-pill">REVIEW</span></td><td><button type="button" data-source="${r.id}" data-source-title="${htmlEscape(r.title)}">OPEN ↗</button></td></tr>`).join('')}</tbody></table>`;
  }
}
$('#record-search')?.addEventListener('input',e=>{dataState.query=e.target.value;dataState.page=0;renderRecords();});
$('#record-format')?.addEventListener('change',e=>{dataState.format=e.target.value;dataState.page=0;renderRecords();});
$('#record-sort')?.addEventListener('change',e=>{dataState.sort=e.target.value;dataState.page=0;renderRecords();});
$$('[data-view]').forEach(button=>button.addEventListener('click',()=>{dataState.view=button.dataset.view;renderRecords();}));
$('#clear-filters')?.addEventListener('click',()=>{dataState.query='';dataState.format='all';dataState.page=0;$('#record-search').value='';$('#record-format').value='all';renderRecords();});
$('#page-prev')?.addEventListener('click',()=>{dataState.page=Math.max(0,dataState.page-1);renderRecords();});
$('#page-next')?.addEventListener('click',()=>{dataState.page++;renderRecords();});
function saveFile(name,contents,type) { const url=URL.createObjectURL(new Blob([contents],{type}));const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1500); }
function exportRows(kind) {
  const rows=visibleRecords().map(({id,title,format,feature})=>({id,title,format,visibleFeature:feature,status:'review',sourceFile:sourceFiles[id]}));
  if (!rows.length) return;
  if (kind==='json') saveFile('gmd-g3-visible-records.json',JSON.stringify(rows,null,2),'application/json;charset=utf-8');
  else {const fields=['id','title','format','visibleFeature','status','sourceFile'];const quote=v=>'"'+String(v??'').replaceAll('"','""')+'"';const csv=[fields.join(','),...rows.map(r=>fields.map(k=>quote(r[k])).join(','))].join('\r\n');saveFile('gmd-g3-visible-records.csv','\uFEFF'+csv,'text/csv;charset=utf-8');}
}
$('#download-csv')?.addEventListener('click',()=>exportRows('csv'));
$('#download-json')?.addEventListener('click',()=>exportRows('json'));
renderRecords();
