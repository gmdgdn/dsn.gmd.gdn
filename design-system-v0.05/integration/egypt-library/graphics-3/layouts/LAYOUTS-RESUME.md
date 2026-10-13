# Layouts QA checkpoint — 2026-10-04

User requested pause. No further browser or design edits after this checkpoint.

## Current browser state

- Separate Codex in-app browser (`iab`, browser ID `2`), agent-created tab ID `1`, currently on `http://127.0.0.1:8766/design-system-v0.05/integration/egypt-library/graphics-3/drawings/index.html`.
- Explicit viewport override: `1280 × 800`; reset it when QA finishes. Parent's preview tab `8` was not used.
- Local development server: `http://127.0.0.1:8766/`.

## Verified

- Film at 1280 and 375: no horizontal overflow, source image loaded, full-source dialog opened, Escape closed it and returned focus to its trigger.
- Kayffa at 1280 and 375: no horizontal overflow, source images loaded. Mobile eyebrow labels ran together; CSS was changed to stack them at <=540 px, pending reload verification.
- Data at 1280 and 375: no horizontal overflow, images loaded. Format filter `print` returned four rows; search `Alexandrie` narrowed to one; clear restored eight; card view and next page showed G3-012, G3-017, G3-020, G3-021; sort by title reset to page one and reordered cards. The G3-017 record title was corrected from “Architectural chair drawing” to “Illustrated chair study,” pending reload verification.
- Data JSON download click ran, but in-app browser download event timed out after 5 seconds. Receipt and downloaded bytes remain unverified in this phase.
- Drawing gallery restyle is stable with geometry agent coordination. Added `drawings/gallery-canonical.css` and linked it from `drawings/index.html`; generator `drawings/build_gallery.py` already includes the same stylesheet link for future regeneration. At 1280, all 22 cards rendered, Perfectly Nineties was computed for the title, and no horizontal overflow.

## Remaining

- Reload Kayffa at 375 and verify separated metadata labels.
- Reload Data and verify the chair title in card/table; test mobile source dialog orientation and focus return.
- Drawing gallery at 375: check overflow, card/source comparison, and font loading.
- If feasible, verify actual CSV/JSON download bytes; otherwise report browser-event limitation accurately.
- Optional RTL spot-check of Film/Kayffa/Data; company RTL was already checked by parent.
- Reset in-app browser viewport override after QA.

## Source and ownership

- Four page layouts and launch gallery live in this directory. No original G3 source files were changed.
- Drawing gallery shell was restyled only after `luna_integration_assets` confirmed it had stopped editing `drawings/index.html` and assets were stable.
- Parent owns final integration, Pen, and broader browser QA.
