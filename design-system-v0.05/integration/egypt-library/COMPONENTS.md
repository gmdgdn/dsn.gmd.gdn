# GMD company web components · implementation contract

This folder is an implementation specimen, not a live company service. [company.html](company.html) composes a proposed public site. [index.html](index.html) exercises 30 component families with local records and reversible browser state. Both use canonical [Tavus-derived tokens](../tokens.css); `library.css` adds scoped material roles and locally bundled, provisionally chosen Arabic fonts. The [Egypt source manifest](../../../reviews/egypt-enhancement/asset-manifest.json) identifies image copies, but does not verify their captions or reuse rights.

## Anatomy and behavior

| Family | Anatomy / states in the specimen | Adoption contract |
|---|---|---|
| Announcement | Message, dismiss control | Persist dismissal only if product policy requires it; keep a plain state |
| Navigation | Header links, Products disclosure, mobile Menu | Escape/outside dismiss; mobile `aria-expanded`; keyboard and focus order |
| Breadcrumb | Ordered route with current page | Real destinations and `aria-current=page` |
| Buttons | Primary, secondary, quiet, disabled, busy | Busy keeps the action name, announces completion; don't use disabled for errors |
| Icon actions | Save/share/menu with accessible names | At least 44px targets; title alone does not replace the ARIA label |
| Tabs | Object, links, source in one panel | Roving tab focus, direction-aware arrows, selected/panel association |
| Accordion | Native disclosure and visible answer | Do not hide essential navigation in a decorative control |
| Locale | English/Arabic, `lang` and `dir` | Complete content localization, numerals and `bdi` review before product adoption |
| Text field | Label, help, required, error | Validate on submit; focus first invalid field; preserve input |
| Select | Labeled material choice | Real options and empty/unknown choice where data requires it |
| Textarea | Longer source note with minimum length | Respect multiline copy and Arabic metrics |
| Radio | Exclusive status choice | Group label, keyboard arrow behavior from native inputs |
| Checkbox | Source review acknowledgement | An acknowledgement is not rights clearance |
| Switch | Public preview state | Native checkbox with `role=switch`; real product must persist its state |
| Search | Query over six local records | Production search needs URL state, latency, errors and permission scope |
| Filter | Family facet | Every active filter appears as a removable chip |
| Sort | Title and ID | Stable order and announced count; production sort requires a data contract |
| View toggle | Cards, list, table | Same filtered set and page across views; `aria-pressed` reflects state |
| Chips | Active query/family | Remove individually without clearing unrelated selections |
| Record cards | Source image, title, family, source and action | Preserve original file and rights/provenance slots |
| Pagination | Previous/next and page count | Clamp after filtering; prevent unavailable navigation |
| Export | CSV/JSON for **the current visible page** | CSV quotes values and carries UTF-8 BOM; JSON is BOM-free; disclose scope |
| Empty state | No results and clear action | Keep user input until clear is chosen |
| Source viewer | Native modal, full image, source ID and rights warning | Focus enters close control and returns to invoking control; original file reachable |
| Focal crop | Editorial crop beside full-view action | Store focal point with content, never silently replace the master |
| Missing media | Named placeholder and retry | Preserve caption and source route through failure |
| Loading | Determinate local progress example | Real async jobs need cancel/retry and server status |
| Error | Retry and revised status | Explain failure and offer a next action |
| Dialog | Full-object viewer | Native modal and Escape behavior; no destructive actions are implemented |
| Toast | Timed status message | Nonblocking; never sole carrier of an error or decision |

The public shell has a ruled directory, named product routes, Nile close, source inventory and legal/status row. The company FAQ uses native disclosure. Its contact form validates locally and explicitly sends nothing. Six product categories and four proposed services are descriptive; no usage metrics, partnerships, availability or licensing are claimed.

## Material and source rules

The clean paper/surface role carries forms, tables and reading. Two original, contemporary raster materials—reed/papyrus and Nile/faience—are bounded backgrounds. A separate editorial pixel treatment of EG-027, if present, is a derivative and must link back to the untouched source. Fifteen locally authored vector families are documented in [README.md](README.md) and [manifest.json](manifest.json); they cite supplied EG IDs as visual inspiration and make no historical facsimile or seamless-repeat claim. Geometry stays outside hit targets, labels and focus outlines.

The additional [G2 drawing studies](new-graphics/manifest.json) provide eight bounded source-informed vector specimens with full-source links and named construction parts. The company uses G2-014 as a large chapter illustration; the library keeps its photographed source, vector construction, and live-text application together. These are contemporary editorial adaptations, not site depictions or historical reconstructions. Only G2-008 claims a verified regular 16-unit translation cell. Keep the SVG as illustration, and render titles, source status, controls and focus targets in HTML.

Amiri, IBM Plex Sans Arabic and Rakkas are bundled locally with OFL files in [fonts/](fonts/). Their proposed role split is editorial display/reading, UI/body, and short Film accent respectively. Product adoption still requires same-copy optical comparison, full Arabic editorial translation and mixed-direction QA.

## Promotion gates

1. Replace six local records and proposed copy with approved product data and source/rights metadata; connect real routes.
2. Validate form and service behavior against a backend contract, including loading, errors, retry and cancellation. The current demo must not be treated as a submission endpoint.
3. Check 375px, 768px and desktop; keyboard, screen reader and reduced-motion states; long Arabic and mixed-script IDs; image failure; focus return; contrast over every textured field.
4. Package the shared CSS/ESM API and verify clean Film and Kayffa/Data consumer builds. Existing Film and Kayffa stacks remain unchanged by this specimen.
