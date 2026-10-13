# Expansion readiness map · 4 October 2026

The eight section specimens are **draft**. Their purpose is to review composition and component relationships before promotion. The code demonstrates interaction but does not establish production readiness or verified historical construction.

| Specimen | Composition | Components exercised | Current status |
|---|---|---|---|
| 01 Film | Immersive octagonal media opening | Primary action, full-object dialog, caption/source note | Draft; illustrative poster rights pending |
| 02 Mosaic | Unequal collection bays | Record links, editorial and metadata density | Draft; content illustrative |
| 03 Topics | Radial overview beside linear index | Accessible ordinary links and decorative sectors | Study; Fig.490D is not reconstructed |
| 04 Reading | Egyptian register chapter rail | TOC, reading measure, citation/source, related entities | Draft; register interpretation requires attribution review |
| 05 Kayffa | Lattice opening to stable tabbed frame | Roving tabs, selected panel, reading surface | Draft; interlace asset is a curated study |
| 06 Data | Pattern to schema/table | Search, family filter, sort, empty, CSV/JSON export, row action | Tested for pure filtering/export logic; UI draft |
| 07 Workspace | Quiet sidebar and validation panel | Form errors, focus-first-error, reset, local feedback | Draft; no backend submission |
| 08 Proof | Editorial/workspace density pair | Dialog, toast, shared controls | Draft; specified contrast pairs and sampled states pass, exhaustive visual QA remains |

Gate A source mapping is maintained in `../../../reviews/tavus-component-expansion.md` and [COVERAGE.md](./COVERAGE.md). Gate B has native Pen section boards and 32 generated geometry assets with source/recipe metadata; product-specific approval and motif seam validation remain open. Gate C requires accepted anatomy, controlled state and tests per component; the [component lab](./component-lab.html) is a draft state-matrix surface. Gate D requires live Film, Kayffa and Data slices with real data contracts. Gate E requires keyboard and pointer QA, focus trap/return, contrast, 375px/tablet/desktop, long Arabic and mixed-direction text, missing/slow media, empty/many-record states, exported bytes and a clean consumer build in two products.

Automated tests in [components.test.mjs](./components.test.mjs) cover deterministic filtering, serialization and form validation. Syntax/static reference checks are part of handoff. Completed browser, keyboard, contrast and actual export checks are recorded in [QA.md](./QA.md); no test here certifies the entire catalog as ready. Current UI copy is primarily English with Arabic core-heading and direction stress. A complete Arabic content pass remains required before production use.
