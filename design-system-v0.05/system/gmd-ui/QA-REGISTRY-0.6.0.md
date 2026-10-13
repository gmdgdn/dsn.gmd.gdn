# GMD UI 0.6.0 verification

Release date: 2026-10-05. Host: https://gmd-ui-registry.anagmdgdn.workers.dev

Latest deployment: 109c32db-722b-45d5-8ea8-ecbf6f0f88c5.

## Coverage

61 upstream UI modules. 72 catalog entries: 66 upstream entries/aliases and six GMD compositions. 72 registry items including foundations, mobile hook, four composed controls, visual language, two optional themes, Toast alias and complete pack. Full installation creates 70 source/SVG files plus the upstream MIT license.

## Passed checks

- Main TypeScript and Vite production builds.
- Public catalog production build after the final PatternedCover asset correction.
- Official shadcn schema, dependency graph, coverage, source content and project-root asset targets; see REGISTRY-VALIDATION.json.
- Clean shadcn CLI installs from local and public URLs, including the @gmd namespace.
- Final public consumer TypeScript and Vite builds with locally bundled Fontsource packages and zero CSS warnings. This install preceded the final PatternedCover img change; that focused change passed both catalog builds and live-host asset inspection.
- All 72 catalog entries rendered during browser traversal, with no console errors/warnings at that checkpoint.
- Film portal dialog inherited square edges, paper and hard ink depth; Escape returned focus to its trigger.
- Arabic desktop headings: Mada at 48.64px in a 1280px viewport, Amiri prose, RTL direction.
- 390px mobile viewport had no horizontal page overflow.
- Search empty state, single notification renderer, instance-scoped form IDs and generic data-table API reviewed.
- Published PatternedCover SVG loaded at /catalog/assets/true-interlace-panel.svg; natural width 1000px.
- Pen representative board completed, exported and visually inspected.

## Limits

Light mode is supported. Pen is representative across eight families, not every runtime variant. Demos use local sample records without a backend. Browser traversal verifies rendering, not exhaustive accessibility certification. Complete reference catalog JavaScript is about 407KB gzip, with a chunk-size advisory; consumers can install only selected components. Targeted lint has one TanStack/React Compiler compatibility advisory; React Compiler is not enabled.

Installed source excludes proprietary fonts and Pen binaries. Photography is application-supplied; three editable existing SVGs and font/upstream license notices are included.
