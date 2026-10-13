# GMD 0.7.2 — Conversation and pixel fields

Reference: https://www.tavus.io/cvi, inspected 2026-10-05. The live page uses warm rounded conversation surfaces, ~2.15px colored phrase rules, striped window headers, pixel field surrounds, expandable deployment choices, and an editorial specification manifest. GMD adapts the anatomy and interaction; Tavus metrics and identities are not reused.

## Components
- CVIQuoteTiles: illustrative request/response, source/entity/action phrase rules, text legend, caller-supplied item images. assetBase is optional; omitted photography uses an intentional placeholder. The catalog supplies ./assets.
- CVIToolkitTable: semantic table with keyboard-operated disclosures, unique IDs, categorical example specifications.
- CVIActionPipeline: four selectable workflow stages. SVG ornaments install with the registry. assetBase defaults to /assets.
- Twelve procedural geometric SVG fields inspired by existing GMD motifs. These are interpretations, not historical tracings. Two include Bayer stipple and a clear central aperture. Palette values and geometry remain editable.

## Integration
Catalog route ?study=cvi. Home includes annotated requests; Services includes the workflow; Data includes the toolkit. Existing PAL section retained. Registry item cvi-sections includes all twelve SVGs; gmd-all includes this item. Photography remains caller-supplied.

## Pen
09.02 Conversation & Data: M9jTCN. Native editable conversation and toolkit specimens.
09.03 Pixel Fields: kJc3l. Twelve reusable frames with native vector layers grouped by color; no remote image fill dependency. Edit the individual palette layer fill, or the SVG source for consuming websites.

## QA
First pass: five EN/AR desktop/mobile/reduced-motion runs passed with no overflow, page errors, missing images or duplicate IDs; Enter/Space disclosures and all four workflow selections passed. Final post-review rerun also passed the same checks. See proof/cvi/qa.json for responsive, language, keyboard and integration results. Sol reviewed component accessibility, asset paths and provenance; implementation corrected those findings.

Published 0.7.2 at https://gmd-ui-registry.anagmdgdn.workers.dev/catalog/?study=cvi. Live endpoint verified HTTP200;12fields and no missing images. Actual shadcn CLI install created13files in the consumer fixture.
