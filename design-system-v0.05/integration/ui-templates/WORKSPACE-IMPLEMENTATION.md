# GMD workspace specimens

Three static UI pages share the GMD token sheet and typography pack. They are independent HTML/CSS/JavaScript specimens, not connected to an archive API.

| Page | Purpose | Interaction coverage |
|---|---|---|
| `dataset.html` | Searchable, filterable local record catalog with selected-record detail | Search (including Ctrl/⌘K), type/source/decade filters, title sort, list/grid toggle, local pagination, keyboard-accessible record selection |
| `intake.html` | Four-step contributor intake | Required title/source validation, object choice, context fields, rights/source acknowledgement, review summary, browser-local draft save, local-only receipt |
| `insights.html` | Fixture data-quality dashboard | Filter by fixture type, derived counts/bars from the exact eight records in `workspace.js`, CSV export |

`workspace.css` provides the shared tool-shell, side navigation, cards, fields, controls, and small-screen layouts. `workspace.js` contains the records fixture and all page interactions. `typography.css` loads the local type set: Source Sans 3 for Latin UI/headings, Source Serif 4 for reading copy, Mada for Arabic headings, Amiri for Arabic paragraphs, and Handjet only for selective pixel accents. `assets/user-khedival-building.svg` is copied unchanged from the user-supplied asset and used as an editorial motif on the intake page. Record images link to their corresponding G3 source files or the user-provided vector; decorative geometry uses the shared integration asset library.

## Data and service boundary

The catalog contains eight actual supplied local source objects: seven G3 files and the user-provided building SVG. Source links point to those files; creator/date metadata is marked not recorded and rights remain unassessed. Dashboard counts are computed directly from these eight objects and describe only this local set. Intake saves only to browser `localStorage`; submitting creates a local receipt and sends no network request. There is no authentication, real upload, publishing, or backend connection.

## Component patterns and licensing

The pages use independently written semantic HTML, CSS, and JavaScript. No OpenSourceUI React/Next.js component source or substantial code was copied, so its MIT notice is not required for these files. The work borrows broad interface ideas visible in its component catalog—search/filter controls, choice and field states, compact cards, and composition patterns—then restyles them with GMD tokens and interaction rules. Reference: [OpenSourceUI component catalog](https://opensourceui.in/components) and [OpenSourceUI source repository](https://github.com/bidyut10/opensourceui) (repository identifies itself as MIT-licensed). The user should add a copyright/license notice if future work copies a specific source component or a substantial portion of it.

## Local QA

Use `python -m http.server 8766` from the repository root and open the pages under `design-system-v0.05/integration/ui-templates/`. Tested at desktop and a 375px browser viewport; the mobile pages keep the document width within the viewport. Automated interaction checks cover catalog filtering/selection, intake validation and local completion, and insights filtering/export.
