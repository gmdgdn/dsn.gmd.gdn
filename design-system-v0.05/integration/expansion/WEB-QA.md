# Expanded web catalog QA · 4 October 2026

Scope: [index.html](./index.html), [component-lab.html](./component-lab.html), [geometry.html](./geometry.html) and [components.js](./components.js). The specimens remain **draft**; these checks do not promote them to production-ready components.

## Completed

- Chrome local preview opened at `/integration/expansion/`. The Tavus fonts, shared colors and curated SVG/poster assets rendered; no blank or collapsed first-screen sections were observed.
- At 375px, 768px and 1440px, `document.documentElement.scrollWidth` did not exceed the viewport. Mobile navigation collapses at 1050px and opens with the Menu button. The desktop segmented navigation remains visible at 1440px after the responsive synchronization fix.
- At 375px, the Arabic switch sets `lang=ar`, `dir=rtl`, renders paired main headings and intro copy in Arabic, and produces no horizontal overflow. English utility/content copy remains in this draft, so it is an RTL stress specimen rather than a full translation.
- Product disclosure exposed its three links and updated `aria-expanded`. The Kayffa People tab updated `aria-selected` and displayed its panel. Record dialog opened with Close focused; closing returned focus to Explore the record.
- Searching `film` yielded 2 of 6 rows. Empty search and Clear filters state were observed in root's parallel browser QA. Invalid form submit displayed project/email/acknowledgement errors and focused Project name; valid local-only values changed the state to CHECKED LOCALLY and showed confirmation.
- Root's browser QA verified the component lab's list/card toggle and actual next-page records, empty/reset behavior, `aria-invalid` on an invalid title, switch state, and retry feedback. Its 375px RTL view had no horizontal overflow.
- Root opened filtered CSV and JSON browser downloads. Both contained the same two Film records; the CSV started with a UTF-8 BOM and the JSON parsed without one. Saved evidence is in `qa/filtered-records.{csv,json}`.
- Root rechecked the nested Products/Escape sequence after reload: desktop navigation stayed visible, and closing the full-object dialog returned focus to its trigger.
- Node syntax checks pass for `catalog.js`, `components.js`, `component-lab.js` and `geometry-gallery.js`. `node --test components.test.mjs` passes six behavior/reference tests: filter/sort, pagination, CSV escaping/visible subset, CSV-vs-JSON Blob bytes, form validation and local asset existence/eight sections. `theme.json` parses.
- All 32 geometry SVGs are included through the corrected manifest, with view/download links, per-variant size guidance, and source/recipe/application copy. A raster contact sheet of ten seeds is in `qa/geometry-contact.png`; its distinct compositions rendered. The manifest and validation record the verified 4.8.8 host tiling and explicit absence of seamless motif certification.
- Color-pair calculations for proposed roles: ink/paper 18.39:1, ink/pink 7.00:1, paper/Nile 9.27:1, white/faience 5.90:1, white/terracotta 6.14:1, white/ochre 5.23:1, ink/limestone 16.27:1. Disabled text/fill is 4.23:1 and should not carry essential content.

## Open verification before promotion

- Visual comparison across all eight sections at tablet/desktop was sampled, not fully captured as a regression set. Repeat screenshots at 375px, tablet and desktop after any further copy or geometry revision. Test long Arabic labels, mixed-direction IDs, many-record states and slow-loading media.
- The new geometry is a contemporary construction study grounded in cited family vocabulary. The 4.8.8 host tessellation is validated; motif seams are not. Radial and register studies remain isolated, and none should be advertised as a historical facsimile or certified seamless tile.
- No Film/Kayffa/Data product imported this module. Film web uses Next/React; Kayffa and GMDgdn use Astro/React/Astro. Versioned packaging and two separate consumer builds remain an explicit release gate.

## Independent root follow-up

See [QA.md](QA.md) for the final integration pass. It resolves the earlier download-event limitation by inspecting the actual browser-downloaded CSV/JSON files, verifies desktop Product-menu Escape after reload, and checks the lab and atlas at 375px. Ten final seeds / 32 SVGs replace the preliminary 30-asset draft. Specified contrast pairs pass. Remaining production gates in READINESS.md remain open.
