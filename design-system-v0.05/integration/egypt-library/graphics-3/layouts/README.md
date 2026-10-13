# GMD graphics-3 page compositions

Open [index.html](index.html) on a local static server. Four standalone pages share `layouts.css`, `pages.css`, `layouts.js` and the canonical `integration/tokens.css` file:

| Page | Role | Distinct composition |
|---|---|---|
| [Company](company.html) | Egyptian cultural data network | Source-object hero, four-stage mission rail, connected product routes, two illustrated Cairo elevation studies |
| [Film](film.html) | Person editorial | Full portrait, reading rail, source/attribution fields, related type-built portrait and provenance passage |
| [Kayffa](kayffa.html) | Essay/archive | Longform with table of contents, source spread, full-page comparison, marginal drawing and related shelf |
| [Data](data.html) | Business/data service portal | Functional local search, format filter, sort, table/card view, paging, CSV/JSON of the visible page, schema and service matrix |

These are design specimens, not deployed product pages. The data portal's eight records are descriptive labels for supplied G3 files. It has no backend. CSV carries a UTF-8 BOM for spreadsheet compatibility; JSON has no BOM. Source dialogs show the original file and return focus to the invoking control. For G3-007/008 the upright reading view rotates clockwise, and G3-016/017 rotates counterclockwise; the linked source file is unchanged.

Company architecture assets are contemporary elevation studies under `../architecture/assets/`. The whole photographed sources are KA-002 (building 1) and KA-005 (building 2); KA-001 and KA-004 are detail views. The B2 centered-window SVG is labeled a design proposal; the original-layout SVG and source photograph remain linked. These are drawings from illustrated pages, not site measurements.

The layout inventory in [LAYOUT-INVENTORY.md](LAYOUT-INVENTORY.md) maps these page roles to retained Tavus homepage, vision, CVI/platform, pricing, PAL maker and editorial exports. The components use the Tavus paper/ink/Nile/pink, serif/sans/raster, segmented navigation, ruled strips and fixed-direction hard depth. Arabic is paired for key navigation and editorial headings; full product localization remains an adoption gate.

Before reuse in Film, Kayffa or a live GMD portal: confirm image provenance and rights, replace specimen records with approved data, connect real routes and APIs, complete Arabic translation, and run accessibility/responsive checks in each consumer stack.
