(() => {
  const toastRegion = document.getElementById("toast-region");
  let toastTimer;
  function toast(message, prefix = "Demo only") {
    if (!toastRegion) return;
    window.clearTimeout(toastTimer);
    toastRegion.replaceChildren();
    const node = document.createElement("div");
    node.className = "toast-message";
    node.textContent = prefix + ": " + message + " (nothing sent or stored)";
    toastRegion.append(node);
    toastTimer = window.setTimeout(() => node.remove(), 4200);
  }
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-toast]");
    if (trigger) toast(trigger.dataset.toast);
  });

  document.querySelectorAll(".alert-close").forEach(button => {
    button.addEventListener("click", () => button.closest(".alert")?.remove());
  });

  const textarea = document.getElementById("context-note");
  const counter = document.getElementById("context-count");
  textarea?.addEventListener("input", () => { counter.textContent = textarea.value.length + " / " + textarea.maxLength; });

  document.getElementById("material-type")?.addEventListener("change", event => {
    document.getElementById("material-result").textContent = event.target.value
      ? "Local selection: " + event.target.value + ". This demo changes no record."
      : "Choose a material to see the local state.";
  });

  document.getElementById("progress-step")?.addEventListener("click", () => {
    const progress = document.getElementById("demo-progress");
    const value = Number(progress.value) >= 100 ? 0 : Math.min(100, Number(progress.value) + 16);
    progress.value = value;
    document.getElementById("progress-value").textContent = value + "%";
    progress.parentElement.nextElementSibling.querySelector("span").textContent =
      Math.round(value / 100 * 20) + " of 20 records";
  });

  document.getElementById("skeleton-toggle")?.addEventListener("click", event => {
    const demo = document.getElementById("skeleton-demo");
    const busy = demo.querySelector(".skeleton-card");
    if (busy) {
      const loaded = document.createElement("div");
      loaded.className = "skeleton-loaded";
      loaded.innerHTML = "<b>Collection ready</b><span>12 records · local preview</span>";
      busy.replaceWith(loaded);
      event.currentTarget.textContent = "Show loading state";
    } else {
      const loaded = demo.querySelector(".skeleton-loaded");
      const skeleton = document.createElement("div");
      skeleton.className = "skeleton-card";
      skeleton.setAttribute("aria-busy", "true");
      skeleton.innerHTML = '<span class="sr-only">Loading preview</span><i class="skeleton-block"></i><div class="skeleton-lines"><i></i><i></i><i></i></div>';
      loaded.replaceWith(skeleton);
      event.currentTarget.textContent = "Show loaded state";
    }
  });

  const pagination = document.querySelector(".pagination-controls");
  const range = document.getElementById("page-range");
  let currentPage = 1;
  pagination?.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    const total = 4;
    currentPage = button.dataset.page
      ? Number(button.dataset.page)
      : Math.max(1, Math.min(total, currentPage + Number(button.dataset.pageStep)));
    pagination.querySelectorAll("[data-page]").forEach(page => {
      const selected = Number(page.dataset.page) === currentPage;
      if (selected) page.setAttribute("aria-current", "page");
      else page.removeAttribute("aria-current");
    });
    pagination.querySelector('[data-page-step="-1"]').disabled = currentPage === 1;
    pagination.querySelector('[data-page-step="1"]').disabled = currentPage === total;
    range.textContent = "Records " + ((currentPage - 1) * 6 + 1) + "–" + Math.min(currentPage * 6, 24) + " of 24";
  });

  const tableRows = document.getElementById("table-rows");
  const tableFilter = document.getElementById("table-filter");
  function filterRows() {
    let visible = 0;
    tableRows?.querySelectorAll("tr").forEach(row => {
      const match = row.textContent.toLocaleLowerCase().includes(tableFilter.value.trim().toLocaleLowerCase());
      row.hidden = !match;
      if (match) visible++;
    });
    document.getElementById("table-count").textContent = visible + (visible === 1 ? " record" : " records");
  }
  tableFilter?.addEventListener("input", filterRows);
  let sortDirection = 1;
  let activeSortKey;
  document.querySelectorAll("[data-sort]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.sort;
      sortDirection = activeSortKey === key ? -sortDirection : 1;
      activeSortKey = key;
      [...tableRows.querySelectorAll("tr")]
        .sort((a, b) => {
          const av = a.dataset[key], bv = b.dataset[key];
          return (key === "year" ? Number(av) - Number(bv) : av.localeCompare(bv)) * sortDirection;
        })
        .forEach(row => tableRows.append(row));
      filterRows();
      document.querySelectorAll("[data-sort]").forEach(other => { other.removeAttribute("aria-sort"); other.closest("th").removeAttribute("aria-sort"); });
      button.closest("th").setAttribute("aria-sort", sortDirection > 0 ? "ascending" : "descending");
    });
  });

  document.querySelectorAll("[data-tabs]").forEach(tabs => {
    const tablist = tabs.querySelector('[role="tablist"]');
    const tabButtons = [...tablist.querySelectorAll('[role="tab"]')];
    function activate(tab, focus = false) {
      tabButtons.forEach(button => {
        const selected = button === tab;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(button.getAttribute("aria-controls"));
        panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }
    tabButtons.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", event => {
        const rtl = getComputedStyle(tablist).direction === "rtl";
        let next = index;
        if (event.key === "ArrowRight") next = (index + (rtl ? -1 : 1) + tabButtons.length) % tabButtons.length;
        else if (event.key === "ArrowLeft") next = (index + (rtl ? 1 : -1) + tabButtons.length) % tabButtons.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabButtons.length - 1;
        else return;
        event.preventDefault();
        activate(tabButtons[next], true);
      });
    });
  });

  const dialog = document.getElementById("publish-dialog");
  document.getElementById("open-dialog")?.addEventListener("click", () => dialog?.showModal());
  document.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => dialog?.close()));
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  document.getElementById("confirm-publish")?.addEventListener("click", () => {
    dialog.close();
    toast("Publish confirmed in the local prototype; no record was changed");
  });

  document.querySelectorAll(".more-menu").forEach(menu => {
    menu.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
    document.addEventListener("click", event => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  });

  document.getElementById("empty-reset")?.addEventListener("click", () => {
    const filter = document.getElementById("table-filter");
    if (filter) filter.value = "";
    filterRows();
    toast("Filters cleared in the local table demo");
  });

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const temporary = document.createElement("textarea");
        temporary.value = text;
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.append(temporary);
        temporary.select();
        const copied = document.execCommand("copy");
        temporary.remove();
        if (!copied) throw new Error("copy unavailable");
      }
      toast("Record URL copied", "Copied");
    } catch {
      toast("Copy is unavailable here; select and copy the record ID KAY-1938-0042", "Notice");
    }
  }
  document.getElementById("copy-record-link")?.addEventListener("click", () => copyText(location.origin + location.pathname + "#record-card"));

  document.querySelectorAll(".code-details").forEach(details => {
    const code = details.querySelector("code");
    if (!code) return;
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "code-copy";
    copy.textContent = "Copy";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        copy.textContent = "Copied";
      } catch {
        copy.textContent = "Select code";
        code.tabIndex = 0;
        code.focus();
      }
      setTimeout(() => { copy.textContent = "Copy"; }, 1800);
    });
    details.querySelector("pre").append(copy);
  });
})();
