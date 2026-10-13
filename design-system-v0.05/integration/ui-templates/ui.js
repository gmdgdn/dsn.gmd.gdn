(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  $$('[data-menu]').forEach(button => button.addEventListener('click', () => {
    const nav = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  }));
  const menuButton = $('[data-menu]');
  const mainNav = menuButton && document.getElementById(menuButton.getAttribute('aria-controls'));
  function closeMenu(returnFocus = false) {
    if (!menuButton || !mainNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
    if (returnFocus) menuButton.focus();
  }
  mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  $$('[data-locale]').forEach(button => button.addEventListener('click', () => {
    const locale = button.dataset.locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    $$('[data-en][data-ar]').forEach(node => { node.textContent = node.dataset[locale]; });
    $$('[data-locale]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    try { localStorage.setItem('gmd-locale', locale); } catch (_) { /* preference is optional */ }
  }));

  const email = $('#signup-email');
  const signup = $('#signup-form');
  signup?.addEventListener('submit', event => {
    event.preventDefault();
    const status = $('#signup-status');
    if (!email?.reportValidity()) return;
    status.textContent = document.documentElement.lang === 'ar'
      ? 'تم التحقق محلياً. هذا النموذج التجريبي لا يرسل بيانات.'
      : 'Email checked locally. This specimen does not send or store it.';
    signup.reset();
  });

  const search = $('#collection-search');
  const cards = $$('.collection-item');
  const filters = $$('.collection-filter [data-filter]');
  let activeFilter = 'all';
  function filterCollection() {
    if (!cards.length) return;
    const term = (search?.value || '').trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const match = (activeFilter === 'all' || card.dataset.category === activeFilter)
        && (!term || card.dataset.search.toLocaleLowerCase().includes(term));
      card.hidden = !match;
      if (match) visible++;
    });
    const count = $('#collection-count');
    if (count) count.textContent = `${visible} / ${cards.length}`;
    const empty = $('#collection-empty');
    if (empty) empty.hidden = visible > 0;
  }
  search?.addEventListener('input', filterCollection);
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterCollection();
  }));
  $$('.collection-view').forEach(button => button.addEventListener('click', () => {
    const placard = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    placard.hidden = !open;
    placard.classList.toggle('is-open', open);
    button.textContent = open ? 'Close source note −' : 'Read source note +';
  }));

  const progress = $('.reading-progress span');
  if (progress) {
    const update = () => {
      const range = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${range > 0 ? Math.min(100, scrollY / range * 100) : 0}%`;
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  try {
    const savedLocale = localStorage.getItem('gmd-locale');
    const localeButton = savedLocale && $(`[data-locale="${savedLocale}"]`);
    localeButton?.click();
  } catch (_) { /* storage may be disabled */ }
})();
