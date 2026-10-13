(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const root = document.documentElement;

  const translations = {
    en: {
      version: 'V0.05 / INTEGRATION REVIEW', status: 'WORKING SYSTEM · OCT 2026',
      navFoundations: '01 / Foundations', navGraphics: '02 / Graphics', navComponents: '03 / Components', navStudio: 'Studio',
      heroKicker: 'GMD / A LIVING VISUAL SYSTEM', heroTitle: 'A language for <em>what comes next.</em>',
      heroIntro: 'Paper, ink and Nile blue carry one identity across stories, cultural reading and useful data. These are working specimens for visual review.',
      heroCaveat: 'Illustrative content · modern vector interpretations · no production product screens',
      tickerLeft: 'ONE TOKEN SOURCE / THREE PRODUCT EXPRESSIONS', tickerRight: 'DESKTOP · TABLET · MOBILE / EN · AR',
      foundationKicker: 'THE MATERIAL', foundationsTitle: 'Foundations', foundationsIntro: 'The inherited Tavus palette and typography remain the anchor. Semantic roles make the same decisions available to every composition.',
      colorTitle: 'Color has a job.', colorNote: 'A role changes with context; a color value stays traceable.',
      typeTitle: 'Four voices, one page.', rhythmTitle: 'A measured edge.', rhythmNote: 'Square corners, fine ink rules and parallel lines make a repeatable scaffold.',
      depthTitle: 'Depth responds.', depthNote: 'The same physical response runs through buttons, navigation and raised panels.',
      graphicsKicker: 'THE VISUAL FAMILY', graphicsTitle: 'Graphics & imagery', graphicsIntro: 'An editorial emblem, contemporary geometric fields and a useful icon set each have a different scale and purpose.',
      graphicLeadTitle: 'Let geometry hold space.', graphicLeadBody: 'The medallion is a modern vector study for covers and transitions. Small functional controls use simple icons instead.',
      sourceLabel: 'Source / interpretation', graphicLeadSource: 'GMD integration medallion SVG adapted from an Antigravity study. Contemporary interpretation; no exact historical reconstruction claimed.',
      railKicker: 'EDITORIAL / CHAPTER RAIL', railTitle: 'A line between chapters.', railBody: 'The pendant register is a contemporary interpretation of Egyptian booklet studies. It marks a section edge, with text and source kept outside the ornament.', railSource: 'SOURCE STUDY / EGYPTIAN BOOKLET PDF PP. 12–16 · ORIGINAL INTERPRETATION, NOT AN ARTIFACT FACSIMILE',
      iconTitle: 'Icons at working sizes.', iconIntro: 'Familiar silhouettes carry actions. Review each at 16, 20, 24 and 32 pixels before promotion.',
      componentsKicker: 'THE SHARED KIT', componentsTitle: 'Components', componentsIntro: 'One set of controls changes its volume by context. Selection, focus, empty and error states remain legible.',
      filmTitle: 'An opening for stories.', filmIntro: 'Media leads. The title has room to breathe; context and a clear next step sit beside it.', filmHeroTitle: 'The frame holds a story.', filmHeroBody: 'A shaped window can introduce a moving image, a still or a collection. The content stays readable without requiring a poster to carry the words.',
      kayffaTitle: 'A field for reading.', kayffaIntro: 'A richer graphic opening invites exploration. The selected record resolves into a calm, readable page.', kayffaCoverTitle: 'Patterns become paths.', kayffaCoverBody: 'A constructed graphic introduces the collection; the reading surface carries the substance.',
      dataTitle: 'Clarity at working scale.', dataIntro: 'Small records and precise controls take priority. The demonstration dataset is local and explicitly invented for interaction testing.', dataHead: 'A small, useful index.', dataBody: 'Search, filter and export exactly the rows shown. These entries describe system specimens, not an external collection.',
      studioTitle: 'Pattern studio', studioIntro: 'Try a curated graphic at a useful scale and export the actual SVG file with a selected background and ink color.',
      studioOptionMedallion: 'Medallion study', studioOptionField: 'Two-scale field', studioOptionInterlace: 'Interlace panel',
      penTitle: 'The editable boards.', penIntro: 'Three native Pen review boards carry the integrated foundations, graphics and product compositions. These exports provide a quick visual route back to the editable source.', penFoundations: '01 / Foundations', penGraphics: '02 / Graphics & components', penCompositions: '03 / Web product compositions',
      footerText: 'Integration review gallery · illustrative content and contemporary graphic studies. Promotion into the main library follows visual review.'
    },
    ar: {
      version: 'الإصدار ٠٫٠٥ / مراجعة الدمج', status: 'نظام قيد التطوير · أكتوبر ٢٠٢٦',
      navFoundations: '٠١ / الأسس', navGraphics: '٠٢ / الرسوم', navComponents: '٠٣ / المكوّنات', navStudio: 'الاستوديو',
      heroKicker: 'جي إم دي / نظام بصري حي', heroTitle: 'لغة بصرية <em>لما يأتي.</em>',
      heroIntro: 'يجمع الورق والحبر وأزرق النيل هوية واحدة للحكايات والقراءة الثقافية والبيانات المفيدة. هذه نماذج عمل للمراجعة البصرية.',
      heroCaveat: 'محتوى توضيحي · معالجات هندسية معاصرة · ليست شاشات منتج نهائية',
      tickerLeft: 'مصدر واحد للرموز / ثلاثة تطبيقات للهوية', tickerRight: 'حاسوب · لوحي · هاتف / العربية · الإنجليزية',
      foundationKicker: 'المادة الأساسية', foundationsTitle: 'الأسس', foundationsIntro: 'تبقى ألوان وخطوط تافوس الموروثة نقطة الانطلاق. وتتيح الأدوار الدلالية تطبيق القرار نفسه في كل تكوين.',
      colorTitle: 'لكل لون وظيفة.', colorNote: 'يتبدل دور اللون حسب السياق، ويبقى مصدر قيمته واضحًا.',
      typeTitle: 'أربعة أصوات لصفحة واحدة.', rhythmTitle: 'حافة موزونة.', rhythmNote: 'تمنح الزوايا المربعة والخطوط الرفيعة والمتوازية الصفحة بنية قابلة للتكرار.',
      depthTitle: 'عمق يستجيب.', depthNote: 'تتكرر استجابة الضغط نفسها في الأزرار والتنقل واللوحات البارزة.',
      graphicsKicker: 'العائلة البصرية', graphicsTitle: 'الرسوم والصور', graphicsIntro: 'للشارة التحريرية والحقول الهندسية المعاصرة والأيقونات العملية مقاييس واستخدامات مختلفة.',
      graphicLeadTitle: 'الهندسة تصنع مساحة.', graphicLeadBody: 'الشارة الهندسية دراسة متجهة معاصرة للأغلفة والانتقالات. أما أدوات الاستخدام الصغيرة فتحتاج أيقونات بسيطة.',
      sourceLabel: 'المصدر / التفسير', graphicLeadSource: 'ملف الشارة الهندسية في دمج جي إم دي، مقتبس من دراسة Antigravity. تفسير معاصر وليس إعادة بناء تاريخية مطابقة.',
      railKicker: 'تحريري / فاصل الفصول', railTitle: 'خطّ بين فصلين.', railBody: 'الشريط المتدلي تفسير معاصر لدراسات الكتيّب المصري. يحدّد طرف القسم، فيما يبقى النص والمصدر خارج الزخرفة.', railSource: 'دراسة مصدر / الكتيّب المصري، صفحات PDF ١٢–١٦ · تفسير أصلي وليس نسخة مطابقة لقطعة أثرية',
      iconTitle: 'أيقونات بأحجام الاستخدام.', iconIntro: 'الأشكال المألوفة توضّح الأفعال. تُراجع بأحجام ١٦ و٢٠ و٢٤ و٣٢ بكسل قبل اعتمادها.',
      componentsKicker: 'الأدوات المشتركة', componentsTitle: 'المكوّنات', componentsIntro: 'تتغير كثافة الأدوات بحسب السياق. ويظل التحديد والتركيز وحالات الفراغ والخطأ واضحًا.',
      filmTitle: 'نافذة للحكايات.', filmIntro: 'تتقدم الصورة، ويأخذ العنوان مساحته، بينما يظهر السياق والخطوة التالية بجانبه.', filmHeroTitle: 'الإطار يحمل حكاية.', filmHeroBody: 'يمكن لنافذة ذات شكل محدد أن تقدّم صورة متحركة أو لقطة أو مجموعة. ويبقى النص مقروءًا من دون الاعتماد على الملصق.',
      kayffaTitle: 'مساحة للقراءة.', kayffaIntro: 'تدعو واجهة غنية بالرسوم إلى الاستكشاف، ثم ينتقل السجل المختار إلى صفحة قراءة هادئة.', kayffaCoverTitle: 'الأنماط تفتح مسارات.', kayffaCoverBody: 'يقدّم الرسم المصمم المجموعة، وتحمل مساحة القراءة مضمونها.',
      dataTitle: 'وضوح أثناء العمل.', dataIntro: 'تتقدم السجلات الصغيرة والأدوات الدقيقة. مجموعة البيانات محلية ومبتكرة بوضوح لاختبار التفاعل.', dataHead: 'فهرس صغير ومفيد.', dataBody: 'ابحث وصفِّ وصدِّر الصفوف الظاهرة. تصف هذه السجلات نماذج النظام، لا مجموعة خارجية.',
      studioTitle: 'استوديو الأنماط', studioIntro: 'جرّب رسمًا مختارًا بحجم مناسب، وصدِّر ملف SVG نفسه مع لون خلفية وحبر محددين.',
      studioOptionMedallion: 'دراسة الشارة الهندسية', studioOptionField: 'حقل بنجمتين متدرجتين', studioOptionInterlace: 'لوحة التشابك',
      penTitle: 'اللوحات القابلة للتحرير.', penIntro: 'تجمع ثلاث لوحات أصلية في Pen الأسس والرسوم وتكوينات المنتجات المدمجة. وتتيح هذه الصور معاينة سريعة للمصدر القابل للتحرير.', penFoundations: '٠١ / الأسس', penGraphics: '٠٢ / الرسوم والمكوّنات', penCompositions: '٠٣ / تكوينات المنتجات للويب',
      footerText: 'معرض مراجعة الدمج · محتوى توضيحي ودراسات رسومية معاصرة. يعتمد نقل العناصر إلى المكتبة الرئيسية على المراجعة البصرية.'
    }
  };
  let language = 'en';
  function setLanguage(next) {
    language = next;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => { el.innerHTML = translations[next][el.dataset.i18n]; });
    $$('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === next)));
    $('#data-search').placeholder = next === 'ar' ? 'ابحث في العنوان أو العائلة أو الاستخدام' : 'Search title, family or use';
    const studioSource = assets[$('#studio-pattern').value];
    const studioLabel = next === 'ar' ? studioSource.labelAr : studioSource.labelEn;
    $('.studio-preview__label').textContent = studioLabel;
    $('#studio-image').alt = `${studioLabel} preview`;
    renderData();
  }
  $$('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));

  const navLinks = $$('[data-nav]');
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) navLinks.forEach(link => link.classList.toggle('is-current', link.dataset.nav === visible.target.id));
  }, {rootMargin: '-16% 0px -67% 0px', threshold: [0, .1, .5]});
  $$('main > section[id]').forEach(section => sectionObserver.observe(section));

  const tabs = $$('[role=tab]', $('.component-tabs'));
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      $('#' + item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const delta = (event.key === 'ArrowRight' ? 1 : -1) * (root.dir === 'rtl' ? -1 : 1);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + delta + tabs.length) % tabs.length;
      selectTab(tabs[next], true);
    });
  });

  const specimenResult = $('#specimen-result');
  $$('[data-specimen-filter]').forEach(button => button.addEventListener('click', () => {
    $$('[data-specimen-filter]').forEach(other => {
      const active = other === button;
      other.classList.toggle('is-active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    specimenResult.textContent = button.dataset.specimenFilter === 'all' ? 'Showing all specimen types.' : `Showing ${button.dataset.specimenFilter} specimens.`;
  }));
  $('#specimen-search').addEventListener('input', event => {
    const value = event.target.value.trim();
    specimenResult.textContent = value ? `Search specimen: “${value}”` : 'Showing all specimen types.';
  });

  const toast = $('#toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
  }
  $$('[data-toast]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
  $('#icon-size').addEventListener('change', event => {
    const size = event.target.value;
    $$('[data-icon]').forEach(tile => {
      const image = $('img', tile);
      image.src = `assets/icons/${tile.dataset.icon}-${size}px.svg`;
      image.style.width = `${size}px`;
      image.style.height = `${size}px`;
    });
  });

  const dialog = $('#detail-dialog');
  let dialogTrigger;
  $$('[data-dialog-open]').forEach(button => button.addEventListener('click', () => { dialogTrigger = button; dialog.showModal(); }));
  dialog.addEventListener('close', () => dialogTrigger?.focus());
  const drawer = $('#notes-drawer');
  const backdrop = $('#drawer-backdrop');
  let drawerTrigger;
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
    drawerTrigger?.focus();
  }
  $$('[data-drawer-open]').forEach(button => button.addEventListener('click', () => {
    drawerTrigger = button;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
    $('[data-drawer-close]', drawer).focus();
  }));
  $('[data-drawer-close]').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    if (event.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
    const focusables = $$('button,a,input,select,[tabindex]:not([tabindex="-1"])', drawer).filter(el => !el.disabled);
    const first = focusables[0], last = focusables.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const readingRecords = [
    {type:'ILLUSTRATIVE ESSAY',title:'A note on pattern',body:'A pattern can help a reader notice a relationship. It cannot replace the source, the words, or the context around an object.',source:'Original demonstration text',use:'Reading specimen'},
    {type:'ILLUSTRATIVE OBJECT',title:'A drawn fragment',body:'A large illustration gives the reader a way in. The adjacent record keeps a separate place for description, source and permitted use.',source:'Original system illustration',use:'Object view specimen'},
    {type:'ILLUSTRATIVE CONTEXT',title:'Related readings',body:'Relationships belong to named records. A plain list remains available alongside any more expressive map or graphic.',source:'Original demonstration text',use:'Related record specimen'}
  ];
  $$('[data-record]').forEach(button => button.addEventListener('click', () => {
    const record = readingRecords[Number(button.dataset.record)];
    $$('[data-record]').forEach(other => { const active = other === button; other.classList.toggle('is-active', active); other.setAttribute('aria-pressed', String(active)); });
    $('#record-type').textContent = record.type;
    $('#record-title').textContent = record.title;
    $('#record-body').textContent = record.body;
    $('#record-source').textContent = record.source;
    $('#record-use').textContent = record.use;
  }));

  const rows = [
    {id:'GMD-01',title:'Medallion study',titleAr:'دراسة الشارة الهندسية',family:'Graphic',use:'Editorial cover',useAr:'غلاف تحريري',status:'Review'},
    {id:'GMD-02',title:'Stepped aperture',titleAr:'نافذة متدرجة',family:'Graphic',use:'Film image frame',useAr:'إطار صورة فيلم',status:'Review'},
    {id:'GMD-03',title:'Hard depth button',titleAr:'زر بعمق ثابت',family:'Component',use:'Primary action',useAr:'إجراء رئيسي',status:'Working'},
    {id:'GMD-04',title:'Film opening',titleAr:'افتتاحية فيلم',family:'Composition',use:'Media introduction',useAr:'تقديم بصري',status:'Working'},
    {id:'GMD-05',title:'Data index',titleAr:'فهرس البيانات',family:'Composition',use:'Record browsing',useAr:'تصفح السجلات',status:'Working'}
  ];
  let selectedFamily = 'all';
  let visibleRows = rows;
  const familyAr = {Graphic:'رسوم',Component:'مكوّن',Composition:'تكوين'};
  const statusAr = {Review:'للمراجعة',Working:'قيد العمل'};
  function renderData() {
    const search = $('#data-search').value.trim().toLocaleLowerCase();
    visibleRows = rows.filter(row => (selectedFamily === 'all' || row.family === selectedFamily) &&
      [row.id,row.title,row.titleAr,row.family,familyAr[row.family],row.use,row.useAr,row.status].join(' ').toLocaleLowerCase().includes(search));
    const body = $('#data-body');
    body.replaceChildren();
    if (!visibleRows.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td'); td.colSpan = 5; td.className = 'data-empty'; td.textContent = language === 'ar' ? 'لا توجد نتائج. غيّر البحث أو المرشح.' : 'No results. Change the search or filter.'; tr.append(td); body.append(tr);
    } else visibleRows.forEach(row => {
      const tr = document.createElement('tr');
      [row.id, language === 'ar' ? row.titleAr : row.title, language === 'ar' ? familyAr[row.family] : row.family, language === 'ar' ? row.useAr : row.use, language === 'ar' ? statusAr[row.status] : row.status].forEach((value, index) => {
        const td = document.createElement('td');
        if (index === 4) { const badge = document.createElement('span'); badge.textContent = value; td.append(badge); }
        else td.textContent = value;
        tr.append(td);
      });
      body.append(tr);
    });
    $('#data-count').textContent = language === 'ar' ? `${visibleRows.length} سجل` : `${visibleRows.length} ${visibleRows.length === 1 ? 'record' : 'records'}`;
  }
  $('#data-search').addEventListener('input', renderData);
  $$('[data-family]').forEach(button => button.addEventListener('click', () => {
    selectedFamily = button.dataset.family;
    $$('[data-family]').forEach(other => {const active = other === button; other.classList.toggle('is-active', active); other.setAttribute('aria-pressed', String(active));});
    renderData();
  }));
  function download(name, type, content) {
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = name; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function csvCell(value) { return `"${String(value).replaceAll('"','""')}"`; }
  $$('[data-export]').forEach(button => button.addEventListener('click', () => {
    const fields = ['id','title','family','use','status'];
    const exported = visibleRows.map(row => ({id:row.id,title:language === 'ar' ? row.titleAr : row.title,family:language === 'ar' ? familyAr[row.family] : row.family,use:language === 'ar' ? row.useAr : row.use,status:language === 'ar' ? statusAr[row.status] : row.status}));
    if (button.dataset.export === 'json') download('gmd-demo-records.json','application/json;charset=utf-8',JSON.stringify(exported,null,2));
    else download('gmd-demo-records.csv','text/csv;charset=utf-8','\ufeff' + [fields.join(','),...exported.map(row => fields.map(field => csvCell(row[field])).join(','))].join('\r\n'));
    showToast(language === 'ar' ? `تم تصدير ${exported.length} سجل` : `Exported ${exported.length} ${exported.length === 1 ? 'record' : 'records'}`);
  }));
  renderData();

  const assets = {
    medallion: {path:'assets/medallion/mamluk-16star-medallion.svg', labelEn:'MEDALLION / MODERN STUDY', labelAr:'شارة هندسية / دراسة معاصرة'},
    field: {path:'assets/patterns/dual-level-field.svg', labelEn:'TWO-SCALE FIELD / MODERN STUDY', labelAr:'حقل بمقياسين / دراسة معاصرة'},
    interlace: {path:'assets/patterns/true-interlace-panel.svg', labelEn:'INTERLACE PANEL / SUPPORTED PRESET', labelAr:'لوحة تشابك / نموذج محدد'}
  };
  const palette = {paper:'#F7F4EF',nile:'#1034A6',ink:'#140206',pink:'#FF6183'};
  const assetCache = new Map();
  let previewURL;
  let studioSVG;
  let studioRevision = 0;
  async function buildStudio() {
    const revision = ++studioRevision;
    studioSVG = null;
    $('#studio-download').disabled = true;
    const pattern = $('#studio-pattern').value;
    const ground = palette[$('#studio-ground').value];
    const ink = palette[$('#studio-ink').value];
    const scale = Number($('#studio-scale').value) / 100;
    $('#studio-scale-value').textContent = `${Math.round(scale * 100)}%`;
    const scaffold = $('#studio-scaffold').checked;
    const source = assets[pattern];
    try {
      if (!assetCache.has(source.path)) {
        const response = await fetch(source.path);
        if (!response.ok) throw new Error(`Asset ${response.status}`);
        assetCache.set(source.path, await response.text());
      }
      if (revision !== studioRevision) return;
      const parser = new DOMParser();
      const parsed = parser.parseFromString(assetCache.get(source.path),'image/svg+xml');
      if (parsed.querySelector('parsererror')) throw new Error('Invalid SVG');
      const original = parsed.documentElement;
      original.setAttribute('x',String(500 * (1 - scale)));
      original.setAttribute('y',String(500 * (1 - scale)));
      original.setAttribute('width',String(1000 * scale));
      original.setAttribute('height',String(1000 * scale));
      original.setAttribute('preserveAspectRatio','xMidYMid meet');
      original.style.setProperty('--ink',ink);
      original.style.setProperty('--nile',ink);
      original.style.setProperty('--pink',ink);
      original.style.setProperty('--paper',ground);
      original.style.setProperty('--warm',ground);
      original.style.setProperty('--sand',ink);
      $$('.scaffold', original).forEach(node => { node.style.display = scaffold ? '' : 'none'; });
      const outer = document.createElementNS('http://www.w3.org/2000/svg','svg');
      outer.setAttribute('xmlns','http://www.w3.org/2000/svg');
      outer.setAttribute('viewBox','0 0 1000 1000');
      outer.setAttribute('width','1000'); outer.setAttribute('height','1000');
      const bg = document.createElementNS('http://www.w3.org/2000/svg','rect');
      bg.setAttribute('width','1000'); bg.setAttribute('height','1000'); bg.setAttribute('fill',ground); outer.append(bg);
      if (scaffold) {
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        g.setAttribute('stroke',ink); g.setAttribute('stroke-opacity','.16'); g.setAttribute('fill','none');
        for (let n = 0; n <= 1000; n += 100) {
          for (const d of [`M${n} 0V1000`,`M0 ${n}H1000`]) { const line = document.createElementNS('http://www.w3.org/2000/svg','path'); line.setAttribute('d',d); g.append(line); }
        }
        outer.append(g);
      }
      outer.append(document.importNode(original,true));
      studioSVG = new XMLSerializer().serializeToString(outer);
      if (previewURL) URL.revokeObjectURL(previewURL);
      previewURL = URL.createObjectURL(new Blob([studioSVG],{type:'image/svg+xml'}));
      $('#studio-image').src = previewURL;
      $('#studio-image').alt = `${language === 'ar' ? source.labelAr : source.labelEn} preview`;
      $('#studio-preview').className = 'studio-preview studio-preview--' + $('#studio-ground').value;
      $('#studio-scaffold-view').hidden = true;
      $('.studio-preview__label').textContent = language === 'ar' ? source.labelAr : source.labelEn;
      $('#studio-download').disabled = false;
    } catch (error) {
      if (revision !== studioRevision) return;
      studioSVG = null;
      $('#studio-download').disabled = true;
      showToast('SVG preview needs a local web server to load the selected asset.');
    }
  }
  ['studio-pattern','studio-ground','studio-ink','studio-scale','studio-scaffold'].forEach(id => $('#'+id).addEventListener(id === 'studio-scale' ? 'input' : 'change', buildStudio));
  $('#studio-download').addEventListener('click', () => {
    if (!studioSVG) return;
    download(`gmd-${$('#studio-pattern').value}-study.svg`,'image/svg+xml;charset=utf-8',studioSVG);
    showToast(language === 'ar' ? 'تم تصدير ملف SVG' : 'SVG exported');
  });
  buildStudio();
})();
