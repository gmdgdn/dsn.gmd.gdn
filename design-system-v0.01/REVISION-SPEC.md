# GMD design system v0.01 — revision spec

This replaces the earlier light token summary as the working visual direction. The Pen reference contributes warm paper, near-black ink, editorial typography, square controls, pink accents, and offset edges. GMD adds Nile blue as the main informational and confirmation color. **Measured** values were checked on copied Tavus nodes; other neutrals are working GMD choices. The revised rules are applied in editable Pen boards, while behavior remains a proposal until implemented.

## 1. Color and use

| Role | Token / value | Use |
| --- | --- | --- |
| Ink | `#140206` **measured** | Main text, rules, hard borders, offset edges |
| Paper | `#F7F4EF` **measured** | Editorial canvas and page background |
| Warm | `#EAE5DE` **working neutral** | Secondary panels, separators, inactive areas |
| Sand | `#D5C4A8` **GMD direction** | Archive metadata and quiet material panels |
| Surface | `#FFFDFB` **working neutral** | Cards, fields, menus, dialogs |
| Charcoal | `#28292A` **working neutral** | Secondary dark surface and dense utility zones |
| Muted | `#625E5B` **working neutral** | Supporting text; use only where contrast remains legible |
| Action pink | `#FF6183` **measured** | Primary action and selected emphasis; pair with ink text when contrast requires it |
| Nile blue | `#1034A6` **direction selected** | Links, focus, active navigation, confirmation, data emphasis |
| Blue surface | `#E9EEFB` **proposal** | Low-emphasis confirmation and selected data panels |

Build neutral ramps around the selected anchors instead of inventing a second palette: paper `#F7F4EF`, warm `#EAE5DE`, sand `#D5C4A8`, surface `#FFFDFB`, ink `#140206`, charcoal `#28292A`. Use the ordered Nile-blue, sand, and pink ramps in `tokens.json`; Nile `600` is the selected base, pink `500` is the action anchor. Intermediate steps are proposed mixes for interface hierarchy, not extracted from Tavus. Keep pink as a small, distinctive action accent. Retire green from the GMD palette. The blue is a contemporary design choice inspired by the Nile and Egyptian visual context; it does not claim to reproduce an ancient pigment or historical standard.

Semantic mapping: `text.primary=ink`, `text.secondary=muted`, `surface.page=paper`, `surface.raised=surface`, `surface.subtle=warm`, `action.primary=pink`, `action.link=blue.600`, `focus=blue.600`, `status.success=blue.600`, `status.successSurface=blue.050`, `status.warning=#8A4B0B`, `status.error=#A12B38`. Warning and error remain distinct from the brand accent. Keep status labels and icons with color so meaning never depends on hue alone. Validate text contrast for each actual pair during implementation.

## 2. Geometry, borders, and controls

Use a 4 px base spacing rhythm: `4, 8, 12, 16, 24, 32, 48, 64`. Core interface controls use 40–48 px height; compact utility controls may use 32 px when touch targets remain accessible. Use 1 px rules for metadata and table divisions. The copied source CTA and segmented navigation use 0.8 px ink strokes (1 px is a practical implementation equivalent); default corner radius is 2 px. Avoid soft card shadows. The source's black offset edge is a recognizable graphic device: default `5 px 5 px 0 ink`, hover `3 px 3 px 0 ink`, pressed `0 px 0 px 0 ink`, with no blur. Do not apply offset depth to every card.

Buttons have a square silhouette, visible black edge, and an offset press response. Primary: pink fill, ink text and border; hover shifts 2 px toward the edge while its shadow contracts to 3 px; pressed translates the full 5 px and removes the offset so the edge appears to meet the control. Secondary: surface or paper fill with ink border and ink label; hover gets a warm fill. Blue links and tertiary buttons use blue text with an underline or border, never color alone. Disabled controls use warm fill, muted text, and a subdued border with no offset or hover response. Keyboard focus uses a clearly separated 2 px Nile-blue ring with 2 px gap; it must remain visible on pink, paper, and white. Loading retains button dimensions and label context.

## 3. Separators and graphics

Use horizontal stripe rules as a repeatable editorial separator: the copied source bar uses seven 1 px ink rules about 2.5 px apart, grouped into a short band rather than stretched as decoration everywhere. A second variant can alternate ink and warm lines for denser data tables. Keep separators quiet around long reading text; use the band to divide project sections, metadata groups, or transitions between archive and product stories. In Arabic layouts, bands span the content width and do not imply a left-to-right reading order.

The graphic vocabulary combines ruled grids, labels, small indexes, crop marks, and occasional connected-node diagrams. Lines should clarify provenance, relationships, or sequence. Do not turn the node motif into a generic network texture. Use blue for the active node or current path, ink for structure, and pink sparingly for the current action. Any map or archival mark must have a source or be clearly presented as abstract decoration.

## 4. Image, type, and icon direction

Prefer authentic Egyptian material: credited film stills and posters where rights allow, archival scans, documentary photography, artifacts, and contemporary everyday scenes. Preserve original aspect ratio and crop intentionally per module; show the full item on record pages and use controlled editorial crops for cards. Do not recolor, erase, fabricate details, or use generated imagery to stand in for a real historic source. Keep provenance, creator, date, and rights adjacent to archive images. If no cleared image exists, use a typographic title panel or abstract ruled graphic rather than a fake archive image.

Use Perfectly Nineties for large English editorial headlines, Suisse Intl for interface and body copy, FK Raster Grotesk Compact Blended for short utility labels, and Noto Sans Arabic for Arabic running text and UI. Source font names are measured; confirm licensing and actual Arabic glyph coverage before product use. Proposed scale: 12/14 px metadata, 16 px body, 20/28 px section lead, 40/56 px display. Keep Arabic line-height generous (at least 1.55 for body); right align Arabic blocks, mirror layout and control order, and isolate Latin IDs, URLs, and numeric codes with correct direction. Avoid shrinking Arabic to fit a Latin layout.

Icons should share a consistent 1.5 px stroke, square terminals, and a 20 px default grid. Prefer simple symbols that retain their meaning at 16 px; use filled silhouettes only for selected/active state. For dataset and archive metadata, pair icons with text labels. Avoid mixing outline, filled, emoji, and pixel-art families within one surface. Reserve deliberately pixelated treatment for a game identity or game content, not the shared GMD utility layer.

## 5. Motion and state intent

Motion values are proposals because static Pen boards cannot prove runtime timing. Use 120 ms for button press and focus-adjacent feedback, 180 ms for hover/selection and small menus, and 240 ms for drawers or content panels. Prefer ease-out for entering and ease-in for leaving; avoid bouncing, parallax, and long reveal sequences. Reduced-motion mode removes spatial travel and nonessential transitions while preserving immediate state changes. Focus, disabled, pressed, selected, loading, empty, warning, and error states must be authored as components, not implied by color alone.

## 6. GMD identity over source references

Tavus imports are comparative visual evidence. Copied pieces in the Pen study remain labeled references; production GMD identity needs its own marks, text, licensed imagery, product terms, and compositions. Map the reference's cream canvas, ink contrast, editorial display type, pink emphasis, compact labels, and offset black edges to GMD's content archive, datasets, projects, and tools. Nile blue carries links, focus, confirmation, and structured data. Film and Kayffa keep their own project imagery and content; the shared shell carries GMD typography, rules, spacing, navigation, and accessible interaction states.

## Source boundary

Checked source colors on copied nodes: ink `#140206`, paper `#F7F4EF`, and CTA pink `#FF6183`. Warm, surface, charcoal, and muted are working GMD neutrals and should be verified before calling them measured source values. The GMD revision uses Nile blue `#1034A6` for confirmation and links; intermediate ramp values and component recipes are design choices. Motion and image behaviors above are intent, not runtime measurements.
