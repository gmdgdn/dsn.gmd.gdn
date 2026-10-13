# GMD public website — adaptation contract

The current priority is the three-page [GMD company website](gmd/index.html): [home](gmd/index.html), [services](gmd/services.html) and [contact](gmd/contact.html). Earlier [public/project and workspace interface drafts](drafts.html) remain available separately; they are not part of the primary GMD review. The new pages use the GMD/Tavus foundation: shared `integration/tokens.css`, paper/ink/Nile/pink, square rules, striped bars, and 5/3/0 hard depth. `typography.css` assigns Source Sans 3 to Latin UI/headings, Source Serif 4 to reading copy, Mada to Arabic headings, Amiri to Arabic paragraphs, and Handjet to selective pixel accents. Perfectly Nineties remains an optional display/wordmark role. These are static design specimens; the contact form validates locally and does not send a message.

## OpenSourceUI reference

We inspected the [OpenSourceUI component catalog](https://opensourceui.in/components) and [source repository](https://github.com/bidyut10/opensourceui). The catalog presents copyable React/Next.js components across several categories. This collection **adapts interaction and layout ideas into independent HTML/CSS/JavaScript**, rather than importing OpenSourceUI React/Tailwind source or presenting its product styling as GMD. If a later implementation copies a component source file or a substantial portion, retain the [MIT license and copyright notice](https://github.com/bidyut10/opensourceui/blob/main/LICENSE) with that copy. MIT credit is not required for conceptual inspiration, but these links are provided to make the reference explicit.

| GMD need | OpenSourceUI reference | GMD adaptation and boundary |
| --- | --- | --- |
| Archive discovery | [Search Input](https://opensourceui.in/components/search-input), [Filter Sort](https://opensourceui.in/components/filter-sort), [Gallery Grid](https://opensourceui.in/components/gallery-grid) | Source-first browse with real local filtering and visible result count; GMD rectangular controls, original-object links and review status. |
| Person and work reading | [Film Strip](https://opensourceui.in/components/film-strip), [Museum Placard](https://opensourceui.in/components/museum-placard), [Drop Cap Editorial](https://opensourceui.in/components/drop-cap-editorial) | Film and Kayffa reading surfaces preserve full object, caption and provenance, with GMD type and hard-border grammar. |
| Dense records | [Users Select Table](https://opensourceui.in/components/users-select-table), [Tasks Table](https://opensourceui.in/components/tasks-table), [Workspace Switcher](https://opensourceui.in/components/workspace-switcher) | Data workspace uses real local rows, selection/filter/sort and explicit schema; no fabricated metrics. |
| Intake and review | [File Upload Field Input](https://opensourceui.in/components/file-upload-field-input), [Text Field Input](https://opensourceui.in/components/text-field-input), [Textarea Field Input](https://opensourceui.in/components/textarea-field-input), [Radio Group Field Input](https://opensourceui.in/components/radio-group-field-input) | Local demo validation and review states; no actual upload or submitted collection. |
| Feedback and actions | [Toast Notification](https://opensourceui.in/components/toast-notification), [Download with States](https://opensourceui.in/components/download-button), [Tactile 3D](https://opensourceui.in/components/3d-button) | Native status regions, focus/disabled/loading/error states and GMD hard-depth controls; only real local download data may be offered. |
| Marketing narrative | [Resource Links Panel](https://opensourceui.in/components/resource-links-panel), [Editorial Quote](https://opensourceui.in/components/editorial-quote), [Hard Shadow Polaroid Frame](https://opensourceui.in/components/hard-shadow-polaroid-frame) | Full-page company, collection and editorial compositions; source images and Egyptian geometry remain labeled and linked. |

These are **pattern references**, not a claim of one-to-one source-code derivation. The GMD company pages use an editorial hero, a framed supplied architectural drawing, a ruled service directory, and a local inquiry form. Their conceptual references include [Resource Links Panel](https://opensourceui.in/components/resource-links-panel), [Hard Shadow Polaroid Frame](https://opensourceui.in/components/hard-shadow-polaroid-frame), and [Text Field Input](https://opensourceui.in/components/text-field-input). [Magazine Cover](https://opensourceui.in/components/magazine-cover), [Gallery Wall](https://opensourceui.in/components/gallery-wall), and [Museum Placard](https://opensourceui.in/components/museum-placard) informed the deferred collection/editorial drafts. No OpenSourceUI React, Tailwind or icon source was copied into the GMD pages. The workspace pattern mapping should be reconciled against its final code before release.

## Current public site architecture

| Page | Primary purpose | Required behavior |
| --- | --- | --- |
| [`gmd/index.html`](gmd/index.html) | Explain GMD's mission, collect → organize/segment → connect → distribute, and product portfolio | Company, Products and Data anchors; Services and Contact routes; product links without invented live destinations |
| [`gmd/services.html`](gmd/services.html) | Explain collection, metadata/taxonomy, segmentation, distribution, dataset preparation and custom tools | Inputs, outputs, meaningful service navigation and contact route |
| [`gmd/contact.html`](gmd/contact.html) | Gather a local inquiry brief | Field validation, review state and explicit local-only confirmation |

Film, Kayffa Archive, Egyptian Wikipedia, datasets, games, data portals and tools are described as GMD product areas. Film links to the supplied `film.gmd.gdn` destination; other product links lead to company descriptions or contact until actual consumer routes are confirmed. No source or performance metrics are invented.

## Deferred draft architecture

| Mode | Page | Core work | Essential states |
| --- | --- | --- | --- |
| Public | [`marketing/index.html`](marketing/index.html) | GMD mission, collect → organize → distribute, product/service network | Navigation, language, source viewer, CTA routes |
| Public | [`collection/index.html`](collection/index.html) | Source-led browse, editorial taxonomy and object detail | Search/filter/empty, selected object, provenance |
| Public | [`editorial/index.html`](editorial/index.html) | Film/person or Kayffa reading with complete source media | Contents navigation, media caption, source detail |
| Workspace | [`dataset.html`](dataset.html) | Searchable dataset and record detail | Query/filter/sort/pagination, download only visible local rows |
| Workspace | [`intake.html`](intake.html) | Contributor submission/review flow | Required-field validation, progressive steps, local completion |
| Workspace | [`insights.html`](insights.html) | Business/data analysis surface | View toggles, filters, detail disclosure, no invented live metrics |

## Component and content gate

- Every actionable control has a label, keyboard path, visible focus state and truthful disabled/loading/empty/error state where applicable.
- Desktop and 375 px mobile must avoid clipped titles, offscreen controls and horizontal overflow. Arabic mode must set `lang="ar"`, `dir="rtl"`, swap core copy, and preserve logical border/layout placement. Hard shadows keep their canonical positive direction.
- Original images are reachable at full-object size. Derived art is labeled as a study and linked to its source. The user-provided Khedival building SVG remains unchanged in `assets/user-khedival-building.svg` and is treated as a supplied drawing, not a measured reconstruction.
- Local examples should not imply authenticated accounts, live ingestion, published records, legal rights clearance, APIs, pricing or customer outcomes.
- The six templates are portable static web specimens. Film (Next/React), Kayffa (Astro/React), and GMD (Astro) consumer integration requires separate adapters and real product acceptance tests.

## QA status

The current three-page company website takes precedence. Track its static assets, semantics, behavior, desktop/mobile, Arabic/RTL and reduced-motion checks in `QA.md` before delivery. The older six-interface set is preserved for later, separate project work.



