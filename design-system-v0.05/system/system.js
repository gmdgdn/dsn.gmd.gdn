(() => {
  const sectionIds = ["start","foundations","components","patterns","templates","assets","governance","references"];
  const sections = new Map(sectionIds.map(id => [id, document.getElementById(id)]));
  const navLinks = [...document.querySelectorAll(".nav-link[data-section]")];
  const introStrip = document.querySelector(".intro-strip");
  const search = document.getElementById("library-search");
  let activeSection = "start";
  let searchMode = false;
  let currentCategory = "all";

  function updateCount() {
    const count = document.getElementById("component-count");
    const items = [...document.querySelectorAll(".component-card")].filter(card => !card.hidden);
    if (count) count.textContent = searchMode ? items.length + (items.length === 1 ? " matching component" : " matching components") : items.length + " components";
  }
  function showSection(id, { updateHash = true, focus = false } = {}) {
    if (!sections.has(id)) return;
    searchMode = false;
    activeSection = id;
    if (search) search.value = "";
    document.querySelectorAll(".searchable").forEach(item => { item.hidden = false; });
    document.querySelectorAll(".component-card").forEach(item => { item.hidden = false; });
    sections.forEach((section, key) => { if (section) section.hidden = key !== id; });
    if (introStrip) introStrip.hidden = id !== "start";
    navLinks.forEach(link => {
      const selected = link.dataset.section === id;
      link.classList.toggle("is-active", selected);
      if (selected) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-component-filter]").forEach(button => {
      const selected = button.dataset.componentFilter === "all";
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.getElementById("no-results").hidden = true;
    currentCategory = "all";
    updateCount();
    if (updateHash) history.replaceState(null, "", "#" + id);
    if (focus) {
      const heading = sections.get(id)?.querySelector("h1,h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: "start" });
    } else window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.getElementById("sidebar")?.classList.remove("is-open");
    document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
  }
  function runSearch(query) {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) {
      showSection(activeSection, { updateHash: false });
      return;
    }
    searchMode = true;
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("is-active"));
    const targets = [...document.querySelectorAll(".searchable")];
    targets.forEach(item => {
      const haystack = (item.textContent + " " + (item.dataset.search || "")).toLocaleLowerCase();
      item.hidden = !haystack.includes(normalized);
    });
    const matchedSections = new Set();
    targets.filter(item => !item.hidden).forEach(item => {
      const section = item.closest("section.content-section");
      if (section?.id) matchedSections.add(section.id);
    });
    sections.forEach((section, id) => { if (section) section.hidden = !matchedSections.has(id); });
    if (introStrip) introStrip.hidden = true;
    const componentCards = [...document.querySelectorAll(".component-card")];
    componentCards.forEach(card => {
      const haystack = (card.textContent + " " + (card.dataset.search || "")).toLocaleLowerCase();
      card.hidden = !haystack.includes(normalized) || (currentCategory !== "all" && card.dataset.category !== currentCategory);
    });
    const allTargets = targets.filter(item => !item.hidden && !item.classList.contains("component-card")).length;
    const totalMatches = allTargets + componentCards.filter(card => !card.hidden).length;
    const noResults = document.getElementById("no-results");
    noResults.hidden = totalMatches > 0;
    if (matchedSections.has("components") && !componentCards.some(card => !card.hidden)) noResults.hidden = false;
    if (!totalMatches) {
      sections.forEach((section, id) => { if (section) section.hidden = id !== "components"; });
      noResults.hidden = false;
    }
    updateCount();
    if (matchedSections.size) history.replaceState(null, "", "#search");
  }
  navLinks.forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    showSection(link.dataset.section, { focus: true });
  }));
  document.addEventListener("click", event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute("href").slice(1);
    if (sections.has(id)) {
      event.preventDefault();
      showSection(id, { focus: true });
    } else {
      const target = document.getElementById(id);
      const parentId = target?.closest("section.content-section")?.id;
      if (target && sections.has(parentId) && parentId !== activeSection && !searchMode) {
        event.preventDefault();
        showSection(parentId);
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    }
  });
  search?.addEventListener("input", () => runSearch(search.value));
  document.querySelectorAll("[data-component-filter]").forEach(button => button.addEventListener("click", () => {
    currentCategory = button.dataset.componentFilter;
    document.querySelectorAll("[data-component-filter]").forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    if (!search?.value.trim()) {
      document.querySelectorAll(".component-card").forEach(card => {
        card.hidden = currentCategory !== "all" && card.dataset.category !== currentCategory;
      });
      document.getElementById("no-results").hidden = [...document.querySelectorAll(".component-card")].some(card => !card.hidden);
      updateCount();
    } else runSearch(search.value);
  }));
  document.getElementById("clear-search")?.addEventListener("click", () => {
    search.value = "";
    showSection("components", { focus: true });
    search.focus();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)) {
      event.preventDefault(); search?.focus();
    }
    if (event.key === "Escape" && document.activeElement === search && search.value) {
      search.value = ""; runSearch("");
    }
  });
  document.querySelector(".menu-toggle")?.addEventListener("click", event => {
    const sidebar = document.getElementById("sidebar");
    const open = sidebar.classList.toggle("is-open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
    event.currentTarget.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  const localeToggle = document.querySelector("[data-locale-toggle]");
  function setLocale(language) {
    const arabic = language === "ar";
    document.documentElement.lang = "en";
    document.documentElement.dataset.locale = language;
    document.documentElement.dir = arabic ? "rtl" : "ltr";
    localeToggle?.setAttribute("aria-pressed", String(arabic));
    localeToggle?.setAttribute("aria-label", arabic ? "Switch to English" : "Switch to Arabic");
    document.querySelectorAll("[data-en][data-ar]").forEach(element => {
      const value = element.dataset[arabic ? "ar" : "en"];
      if (value) { element.textContent = value; element.lang = arabic ? "ar" : "en"; }
    });
    const headings = {
      "foundations-title": ["The material sets the rules.", "المادة هي التي تحدد القواعد."],
      "components-title": ["Small pieces. Real behavior.", "مكوّنات صغيرة. سلوك حقيقي."],
      "patterns-title": ["A rhythm for real material.", "إيقاع يناسب المادة الحقيقية."],
      "templates-title": ["Shared shell. Different work.", "إطار مشترك. أعمال مختلفة."],
      "assets-title": ["Images have a history.", "للصور تاريخ."],
      "governance-title": ["Ready to share means ready to trust.", "الجاهزية للمشاركة تبدأ بالثقة."],
      "references-title": ["Useful links. Clear lineage.", "روابط مفيدة. ومراجع واضحة."]
    };
    Object.entries(headings).forEach(([id, pair]) => {
      const element = document.getElementById(id);
      if (element) { element.textContent = pair[arabic ? 1 : 0]; element.lang = arabic ? "ar" : "en"; }
    });
    if (search) search.placeholder = search.dataset[arabic ? "placeholderAr" : "placeholderEn"];
    document.querySelectorAll(".component-list,.catalog-filter,.catalog-count,.pattern-grid,.template-index,.asset-gallery,.asset-note,.governance-grid,.reference-list,.component-info,.component-preview").forEach(element => {
      element.lang = "en";
      element.dir = "ltr";
    });
    document.querySelectorAll(".section-heading>p,.foundation-card,.hero-art,.breadcrumbs>span:last-child").forEach(element => {
      element.lang = "en";
      element.dir = "ltr";
    });
    document.querySelectorAll(".eyebrow,.component-id,.component-status,.preview-label,.type-caption,.art-label,.window-title,.window-foot,.sidebar-bottom,.strip-label,.hero-meta,.catalog-count,.preview-foot,.template-foot,.governance-footer,.reference-kind").forEach(element => { element.lang = "en"; });
    const crumb = document.querySelector(".breadcrumbs>span:last-child");
    if (crumb) crumb.textContent = arabic ? "مكتبة النظام" : "System library";
    const intro = document.querySelector(".sidebar-intro p");
    if (intro) intro.textContent = arabic ? "أنظمة لمادة تستحق البقاء." : "Systems for material that matters.";
    const strip = document.querySelector(".intro-strip p");
    if (strip) {
      strip.lang = arabic ? "ar" : "en";
      strip.dir = arabic ? "rtl" : "ltr";
      strip.innerHTML = arabic ? "<b>واضح بما يكفي للاستخدام.</b> غني بما يكفي لحفظ السياق، ومفتوح لمواد جديدة دون أن يفقد كل أرشيف خصوصيته." : "<b>Clear enough to use.</b> Rich enough to preserve context. Open to new material without losing what makes each collection distinct.";
    }
    const navLabel = document.querySelector(".breadcrumbs a");
    if (navLabel) navLabel.lang = "en";
    try { localStorage.setItem("gmd-system-locale", language); } catch {}
  }
  localeToggle?.addEventListener("click", () => {
    setLocale(document.documentElement.dataset.locale === "ar" ? "en" : "ar");
  });
  try { if (localStorage.getItem("gmd-system-locale") === "ar") setLocale("ar"); } catch {}
  const initial = location.hash.slice(1);
  showSection(sections.has(initial) ? initial : "start", { updateHash: false });
})();
