# GMD UI 0.7.0 verification

Verified 2026-10-05. Refinement implements the GMD / Tavus grammar across 61 upstream source modules; catalog coverage is 78 entries and registry coverage is 75 install items. Ten public website blocks compose six GMD page templates. Lucide provides functional icons. Existing artwork is reused.

## Passed

- TypeScript project build, main production build and public production build.
- Official shadcn schema, graph, source and public asset targets: REGISTRY-VALIDATION.json.
- Clean official shadcn CLI install from the local versioned registry: 74 files created. Its own component sources pass TypeScript and Vite; final foundation correction was reapplied through the CLI and rebuilt.
- Catalog static-production sweep: 977 passed / 0 failed, comprising 936 render cases (78 entries × English/Arabic × GMD/Film/Archive × desktop/mobile) and 41 focused interaction checks.
- Page patterns: 28 passed / 0 failed, comprising 24 bilingual responsive renders and four behavior/console checks.
- No page errors in either audit. Sources and results are scripts/interaction-audit*. JSON counts are actual assertions, not visual certification.
- Keyboard overlays, restore-focus, dates, selection, filtering, forms, OTP clipboard paste, nested menu selection and resizing exercised by the interaction matrix.
- Corrected slider track dimensions, switch checked thumb travel in LTR/RTL and indeterminate checkbox glyph verified. Mobile catalog header and code snippets no longer overflow.
- Arabic page headings use Mada capped at 48px; prose uses Amiri; controls retain Mada. Handjet remains selective.
- Native Pen board n0BSfr exported and visually reviewed; previous boards preserved.

## Limits

INTERACTION-COVERAGE.md distinguishes tested examples from unmounted prop combinations. Screen-reader speech, touch gestures, full contrast auditing and every possible consumer variant have not been exhaustively certified. Light mode is supported. Contact and collection demos are local sample interfaces without a backend. Photography is application-supplied; three existing editable SVGs install through the registry. Pen is representative rather than a separate master for every runtime state.

The complete reference catalog includes every preview (~422KB JavaScript gzip) and has a chunk-size advisory. Applications can install individual components; the page-only test consumer built to ~95KB JavaScript gzip. Public fonts use open licenses; proprietary reference fonts are excluded from the hosted release.

Previous verification is preserved in QA-REGISTRY-0.6.0.md.

Live-host spot checks confirmed the 0.7 catalog, Arabic Mada at 48px, English page navigation, and all homepage images loaded. A final routing-only correction supports native ?view= links alongside ?page= so opening navigation in another tab preserves the intended page; it passed TypeScript and public rebuild.

Latest deployment: 735bd3b6-17f2-4dc8-96a8-264d4a0a265f. Native service direct link verified on the live host.
