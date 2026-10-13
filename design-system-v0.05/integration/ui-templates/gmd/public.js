(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const html=document.documentElement;
  let language=html.lang==='ar'?'ar':'en';
  try{const saved=localStorage.getItem('gmd-public-language');if(saved==='ar'||saved==='en')language=saved}catch{}
  let clearFormFeedback=()=>{}

  function applyLanguage(next){
    language=next==='ar'?'ar':'en';
    html.lang=language;
    html.dir=language==='ar'?'rtl':'ltr';
    try{localStorage.setItem('gmd-public-language',language)}catch{}
    clearFormFeedback()
    $$('[data-placeholder-en][data-placeholder-ar]').forEach(el=>{el.placeholder=language==='ar'?el.dataset.placeholderAr:el.dataset.placeholderEn});
    $$('[data-alt-en][data-alt-ar]').forEach(el=>{el.alt=language==='ar'?el.dataset.altAr:el.dataset.altEn});
    const description=$('meta[name=description][data-meta-description-en][data-meta-description-ar]');
    if(description)description.content=language==='ar'?description.dataset.metaDescriptionAr:description.dataset.metaDescriptionEn;
    $$('[data-aria-en][data-aria-ar]').forEach(el=>el.setAttribute('aria-label',language==='ar'?el.dataset.ariaAr:el.dataset.ariaEn));
    const title=$('title[data-title-en][data-title-ar]');
    if(title)document.title=language==='ar'?title.dataset.titleAr:title.dataset.titleEn;
    $$('[data-en][data-ar]').forEach(el=>{
      const value=el.dataset[language];
      if(value===undefined)return;
      const textNode=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
      if(textNode)textNode.textContent=el.children.length?value+' ':value;
      else if(!el.children.length)el.textContent=value;
    });
    const locale=$('[data-locale]');
    if(locale){locale.textContent=language==='ar'?'English':'عربي';locale.setAttribute('aria-label',language==='ar'?'Switch language to English':'Switch language to Arabic')}
    const menu=$('[data-menu]');
    if(menu)menu.setAttribute('aria-expanded','false');
    const nav=$('.gmd-nav__links');
    if(nav)nav.classList.remove('is-open');
  }

  const nav=$('.gmd-nav__links');
  const menu=$('[data-menu]');
  menu?.addEventListener('click',()=>{
    const open=menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(open));
    nav?.classList.toggle('is-open',open);
  });
  function closeMenu(returnFocus=false){
    if(!menu||!nav)return;
    menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');
    if(returnFocus)menu.focus();
  }
  nav?.addEventListener('click',e=>{
    if(e.target.closest('a'))closeMenu();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true')closeMenu(true)});
  document.addEventListener('click',e=>{if(menu?.getAttribute('aria-expanded')==='true'&&!e.target.closest('.gmd-nav'))closeMenu()});
  $('[data-locale]')?.addEventListener('click',()=>applyLanguage(language==='en'?'ar':'en'));
  if(language!==html.lang)applyLanguage(language);

  const form=$('#inquiry-form');
  if(form){
    const status=$('#inquiry-status');
    clearFormFeedback=()=>{
      form.querySelectorAll('[aria-invalid="true"]').forEach(field=>field.removeAttribute('aria-invalid'));
      form.querySelectorAll('.gmd-field-error').forEach(error=>error.textContent='');
      status.textContent='';status.classList.remove('is-success');
    };
    const messages={
      en:{required:'Please complete this field.',email:'Enter a valid email address.',short:'Add a little more detail (at least 20 characters).',success:'Inquiry draft reviewed. It was not sent or stored; this page has no contact service.'},
      ar:{required:'يرجى إكمال هذا الحقل.',email:'أدخل عنوان بريد إلكتروني صحيحًا.',short:'أضف مزيدًا من التفاصيل (20 حرفًا على الأقل).',success:'تمت مراجعة مسودة الاستفسار. لم تُرسل أو تُحفظ؛ لا تتصل هذه الصفحة بخدمة تواصل.'}
    };
    form.querySelectorAll('input,select,textarea').forEach(field=>['input','change'].forEach(eventName=>field.addEventListener(eventName,()=>{
      field.removeAttribute('aria-invalid');
      const error=field.getAttribute('aria-describedby')&&$('#'+field.getAttribute('aria-describedby'));
      if(error)error.textContent='';
    }))); 
    form.addEventListener('submit',e=>{
      e.preventDefault();
      status.textContent='';status.classList.remove('is-success');
      let firstInvalid=null;
      form.querySelectorAll('[required]').forEach(field=>{
        const error=field.getAttribute('aria-describedby')&&$('#'+field.getAttribute('aria-describedby'));
        const validity=field.validity;
        let message='';
        if(!field.value.trim())message=messages[language].required;
        else if(field.type==='email'&&!validity.valid)message=messages[language].email;
        else if(field.name==='name'&&field.value.trim().length<2)message=language==='ar'?'اكتب حرفين على الأقل.':'Enter at least two characters.';
        else if(field.name==='message'&&field.value.trim().length<20)message=messages[language].short;
        if(message){field.setAttribute('aria-invalid','true');if(error)error.textContent=message;firstInvalid??=field}
        else{field.removeAttribute('aria-invalid');if(error)error.textContent=''}
      });
      if(firstInvalid){firstInvalid.focus();status.textContent=language==='ar'?'راجع الحقول المحددة.':'Please review the highlighted fields.';return}
      status.textContent=messages[language].success;
      status.classList.add('is-success');
    });
  }
})();
