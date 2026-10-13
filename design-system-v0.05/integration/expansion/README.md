# GMD v0.05 — web component and geometry expansion

4 October 2026. This is the next reviewable system layer, extending the shared Tavus-derived material and typography, not a replacement token system.

## Review

- `index.html`: eight distinct Film, collection, topic, reading, Kayffa, Data, workspace and proof compositions.
- `component-lab.html`: individual controls, local interactions, states and a twelve-family coverage matrix.
- `geometry.html`: ten contemporary seeds / 32 SVG variants, source → construction → application, family filtering and individual downloads.
- `boards.html`: four editable native Pen direction boards with current PNG exports.

Use the existing workspace server at `http://127.0.0.1:8766/design-system-v0.05/integration/expansion/`. Shared fonts and tokens resolve from `../tokens.css`. The original integrated gallery and social family remain linked references.

## Use and maintain

`components.js` exports framework-neutral controllers and pure collection/export helpers; `CONTRACTS.md` specifies anatomy, selectors, events and cleanup. `theme.json` / `theme.css` add optional ornament, state, density and layout roles. The shared master remains `../tokens.json`. Import the controller module and shared styles into a review host; do not silently fork their token values in a product.

Geometry generation uses only Python's standard library: `python geometry/build_geometry.py`. The manifest identifies sources, actual parameters, treatment, minimum size and safe area. The verified 4.8.8 host tiling does not certify the decorative motif as a seamless repeat. Native Pen paths represent selected canonical variants; see `PEN-BOARDS.json`.

Run `node --test components.test.mjs`. See `QA.md`, `WEB-QA.md`, `READINESS.md` and `COVERAGE.md` for evidence and limits. Film (Next/React), Kayffa (Astro/React) and GMD (Astro) require adapters and two separate consumer builds before a released package. Full Arabic copy, production media/backend behavior and further backlog remain separate release gates.
