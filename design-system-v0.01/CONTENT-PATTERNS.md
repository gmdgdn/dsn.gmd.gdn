# Bilingual content patterns — DS v0.01

The editable [Pen board preview](previews/Mkm6H.png) corresponds to node `Mkm6H` in the shared source document. It is a 1600 × 1200 review board, not a homepage mockup. The English search field is an instance of reusable component `p5X7xf`; the Arabic search and navigation are deliberately mirrored visual patterns. Component masters live on catalog board `qOJxD`.

## Composition

- English navigation begins with GMD at the left and language choice at the right. Arabic navigation reverses this hierarchy: GMD at the right, links read right-to-left, and the English choice sits at the left. The filter and search controls also reverse positions.
- Archive records put title and context first, then keep **source**, **rights**, **publication status**, and **AI dataset suitability** in separate rows. The example is explicitly illustrative; no collection, rights clearance, or released dataset is being claimed. Its mixed-script `SAMPLE-AR-001 / Cairo / القاهرة` identifier remains legible in both directions.
- Noto Sans Arabic is used for Arabic running text at 14–29 px in this board. English body text uses Suisse Intl, display type Perfectlynineties, and utility labels FK Raster Grotesk Compact Blended. Arabic headings and data rows align to the right with sufficient line height and do not rely on automatic text reversal of Latin identifiers.
- Semantic examples show documented source, rights review, use blocked, and keyboard focus as separate states. These are **component-state examples** and do not describe the sample record. The Pen variables are `gmd-v01-focus`, `gmd-v01-warning`, `gmd-v01-error`, and corresponding light status surfaces; all are namespaced to avoid overwriting imported reference design tokens.

## Intended behavior for later implementation

The visual board has no running interactions. A coded version should set `lang` and `dir` at the appropriate document or region boundary, retain the natural reading order for keyboard navigation, keep Latin IDs isolated within Arabic lines, mirror layout rather than glyph shapes, and show a visible focus ring on search/filter controls. On narrow screens, stack the columns into one language-specific view and let long metadata values wrap without clipping. Transitions should remain brief on controls and honor reduced-motion preferences. None of these runtime behaviors is certified by the Pen image.

The archive pattern assumes that collection, reuse rights, and model-training permission can differ. A record may be visible in a public archive while distribution or training remains blocked pending review.
