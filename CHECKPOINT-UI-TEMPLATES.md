# UI templates checkpoint — 4 October 2026

Current scope supersedes unfinished illustration work: user will handle graphics. Continue with complete UI templates, using Luna implementation and Sol review/QA. Preserve older graphics and design-system work.

## Priority correction from user

GMD PUBLIC COMPANY WEBSITE FIRST. Film and Kayffa should appear as GMD portfolio projects, not separate project interfaces. Prior six templates are saved drafts and deferred. Active delivery is `ui-templates/gmd/index.html` (complete company homepage), `gmd/services.html` and `gmd/contact.html`, shared `gmd/gmd.css` and `gmd/public.js`. Navigation: Home, Company (#about), Products (#products), Services, Data (#data), Contact. Launcher must lead with these public company pages. Do not resume workspace/project-site expansion before this company website is handled.

## New work

Location: `design-system-v0.05/integration/ui-templates/`.

- Six templates: marketing/index.html, collection/index.html, editorial/index.html, dataset.html, intake.html, insights.html.
- Launcher index.html; reusable public ui.css/ui.js and workspace.css/workspace.js.
- OpenSourceUI catalog/source inspected; ADAPTATION.md maps reference patterns. Implementations are independent static HTML/CSS/JS adaptations rather than copied React components.
- User's `khedival_building_editable.svg` copied unchanged to assets/user-khedival-building.svg; XML parses, 60 paths and no embedded bitmap images. Prefer this supplied illustration over our earlier building reconstructions.
- User font choices implemented in typography.css: Mada Arabic headings/UI, Amiri Arabic paragraphs, Handjet selective pixel accents. Latin Source Sans 3 headings/UI, Source Serif 4 paragraphs, Handjet pixel accents; optional existing Perfectly Nineties brand display.
- Fonts and OFL notices bundled under fonts/. typography.html shows bilingual samples; proof at proofs/typography-desktop.png. Root verified rendered Arabic roles and desktop layout.

## Current checks and remaining work

Sol owns six-page browser QA and final corrections. Root requested content speak directly to GMD collecting, structuring, segmenting and distributing Egyptian data, with Film, Kayffa, datasets, tools, games and Egyptian Wikipedia. Avoid design-process/provenance warnings filling product flows; keep source-specific notes in captions and a single specimen footer.

User requested saving and stopping to conserve credits. Current priority is the GMD public company website, not the six earlier templates. All three public pages and styles/scripts are saved. Public proofs are in `ui-templates/proofs/`: gmd-home-desktop.png, gmd-home-mobile.png, gmd-services-desktop.png, gmd-contact-mobile.png and typography-desktop.png.

Homepage has the collect → organize → segment → distribute mission, portfolio including Film, Kayffa Archive, Egyptian Wikipedia, datasets, tools/games and data portals, services, data foundation and contact. Services/contact pages use direct company copy; contact stays local-only with no message transmission. User-provided SVG remains unchanged. Earlier illustration reconstructions and workspace/project drafts remain preserved and deferred.

## Resume next

1. Read `ui-templates/QA.md` and any final public QA notes from Sol; distinguish observed checks from pending checks.
2. Finish only unresolved GMD public-site QA: Arabic display/translation and font roles, mobile menu Escape/focus, contact invalid/valid local result, navigation and responsive sections. Hero simultaneous EN/AR display and Escape were corrected; verify final reload if not recorded.
3. Review the whole GMD company composition with the user before extending project-specific UIs. Film/Kayffa should stay portfolio items here.
4. Use user-supplied graphics; do not restart illustration recreation. Do not claim full Arabic translation or production backend completion.

No new UI templates were imported into Pen in this phase. Workspace submission/export and Insights QA are deferred with those drafts, not blockers for the GMD public-first review.

## Final Sol QA received before saving

All three public pages passed 1280/375 overflow and broken-image checks. Home EN/AR hero switching, RTL Mada/Amiri roles, and mobile Menu Escape/focus return passed. Services has seven articles. Contact empty review focuses Name and marks four required fields; valid local review produces the explicit no-send success state. Arabic heading/form label roles checked. Launcher and three public pages have no missing local references or duplicate IDs; public.js syntax passes. Full bilingual copy coverage, backend delivery and consumer integration remain unverified. Browser ID 6, tab 2 ended on Contact Arabic; viewport override reset.

Older architecture Pen imports were paused before creating any new board. Their resume notes remain at graphics-3/PEN-RESUME.md, but user now owns graphics; do not resume illustration reconstruction without a new request.

## Arabic public-site continuation — 4 October 2026

Home, Services and Contact now have Arabic page copy, navigation/footer labels, image descriptions, accessibility labels and metadata. Rich headings preserve line breaks. Arabic hero uses its own font size and measure; stylesheet/script URLs are versioned to refresh cached files. User graphics and older drafts remain unchanged.

Root browser checks: homepage at 1280 and 375 has no horizontal overflow; Arabic heading uses Mada and paragraphs use Amiri. Services at 378 has no overflow or broken images, and headings/lists/footer links are translated. Contact Arabic invalid review shows a required topic inline error. Switching language clears feedback while preserving fields; valid review gives Arabic local-only confirmation. Mobile Arabic menu Escape closes. JavaScript syntax passes. Proofs: proofs/gmd-home-ar-desktop.png and proofs/gmd-home-ar-mobile.png. Sol agent was unavailable due usage limit; root performed these checks.

Next: review the GMD public company composition with the user. Contact remains a local prototype with no message delivery. No new Pen import this phase; older project/workspace drafts remain deferred. Do not resume illustration recreation.

## Premium multipage and col1 — 4 October 2026
Six public pages are implemented. See design-system-v0.05/integration/ui-templates/PREMIUM-DIRECTION.md for assets, review evidence and next work. Previous public sources are preserved in gmd/previous-public. Root reviewed Luna implementation; the separate Sol agent was unavailable due usage limit. No graphics recreation and no Pen mutation this phase. Contact stays local-only.

