# GMD enhancement plan — surfaces, imagery, Arabic type and public shell

4 October 2026 · Direction review. The canonical system and Pen boards retain their current definitions until these specimens are accepted.

## Design decision

Keep Tavus's paper/ink/Nile/pink palette, editorial serif/sans/utility hierarchy, square windows, ruled partitions, labelled bars and hard offset depth. Expand the system through **surface, media, typography and component contracts**, with Egyptian and Islamic sources influencing composition and rhythm as well as decoration. A dense dataset table and a Film campaign must feel related without having identical layouts.

The visual review accompanies this plan in [index.html](index.html). All 37 supplied images are inventoried in [asset-manifest.json](asset-manifest.json), shown on four contact sheets and mapped in [ASSET-REVIEW.md](ASSET-REVIEW.md). Copies preserve the originals byte for byte. Filenames are collection labels, not verified dates, creators, locations or rights records.

## What Tavus actually contributes

Rechecked the live public homepage on 4 October. Evidence: [directory screenshot](tavus-footer-directory.png), [footer closing panel](tavus-footer-live.png), [dither composition](tavus-dither-live.png), and [DOM/computed-style observations](tavus-live-observations.json). The earlier desktop sweep remains useful for its wider seven-column footer arrangement: [home contact sheet](../../evidence/contact-sheets/home-sections.jpg).

- Footer link cells use the actual `texture-denim.avif` background on white, thin rules, black header tabs and tiny square markers. This is a material behind a directory, rather than a decorative card border.
- Its large pink closing field contains pixel blocks, the brand mark and an embedded Minesweeper game. GMD can have a distinct optional interactive closing panel, but an archive or product directory must remain usable without that interaction.
- The photographic composition contrasts a relatively sharp hand with a visibly coarse pixelated hand, and places a dithered cloud inside a labelled window. Pixelation, halftone/dither and subtle material grain are separate mechanisms.
- Different sections combine media windows, asymmetric feature fields, tabs, result rails, split calls to action and conceptual images. Richness comes from layout and media hierarchy, not from adding more shadows to the same card.

## Surface system: five named roles

These are proposed starting settings to test, not contrast or performance certifications. Preserve the plain surface as the default. Store the texture independently from the surface colour, and specify its scale in CSS pixels rather than stretching a tile to fill every section.

| Surface role | Application | Proposed treatment | Restrictions |
|---|---|---|---|
| `surface.clean` | Forms, tables, long reading, overlays | Existing paper/surface colour | No noise beneath dense text or small icons |
| `surface.print` | Kayffa metadata plates, footer directory | Original GMD paper/ink texture; 2–4% visible contrast, fixed tile scale | Test a solid fallback and text contrast; do not enlarge a low-resolution tile |
| `surface.dither-edge` | Introductory editorial sections | Nile/cream stipple concentrated outside a clear text zone | One bounded field; no dither crossing Arabic marks or controls |
| `surface.pixel-field` | Closing campaign/footer panel, games | Sparse blocks at 4/8/16 CSS-pixel scales; one colour family | No perpetual flashing; static reduced-motion version, stop when off-screen |
| `surface.register` | Section thresholds, masthead base, archive chapter breaks | Existing Egyptian bands or verified polygonal interlace at controlled width/density | Keep borders and cultural content distinct; do not tile an isolated motif and call it seamless |

Use one dominant material and, at most, one border/register accent in a section. Illustrations, images and patterns can coexist across a page; they should not all compete behind a paragraph. Any new GMD texture must be its own asset, with the Tavus texture retained as reference evidence.

## Image treatment contracts

| Treatment | What remains visible | Where it belongs | Required states/metadata |
|---|---|---|---|
| Archive object | Full sheet/photo, margins, wear, original colour | Kayffa record, encyclopedia source, research detail | Fit/zoom, original view, caption, source, uncertain metadata, unavailable/loading |
| Editorial photograph | Intentional focal crop, natural grain | Film feature, people/story, project overview | Stored focal point; original escape; aspect ratios 3:2/4:5/16:9; do not crop identifying context silently |
| Nile duotone | Clear tonal separation in a derived editorial image | Campaign cover, story teaser | Explicit derived treatment; preserve master; compare facial/detail readability |
| Ordered dither | Tonal image encoded as a deliberate dot/pixel pattern | Large atmosphere, editorial hero | Trial 4×4 versus 8×8 matrix, limited palette, output-size preview; not just a blur or CSS `image-rendering` flag |
| Coarse pixel | Deliberately reduced spatial resolution and crisp enlarged blocks | Games, experimental campaign, closing panel | Trial 2/4/8px blocks at display size; caption outside treatment; no documents or small portrait thumbnails |
| Flat graphic | Original illustration's colour planes and line logic | Tourism/tools landing, collection issue cover | Original GMD compositions; palette roles; thin/thick stroke hierarchy; scalable vector only where appropriate |

The review page uses original images and reversible browser styling to compare composition. It does not claim to deliver processed dither masters. The next implementation should compare **the same image** untreated, duotone, ordered-dither and coarse-pixel at the same size; approve the transformation before producing the batch. Generate suitable output-size derivatives once rather than doing heavy pixel processing during scrolling. Keep the archival original accessible and independent.

## How the supplied graphics become usable design grammar

1. **EG-005 architectural collage:** vertical stacking, sun/skyline/river and register at the base. Develop tall campaign rails and a wide architectural panorama through original illustration. Use it for tourism, business tools and collection gateways; avoid making one pyramid the logo for every product.
2. **EG-009 hotel brochure:** quiet thin cream drawing on a saturated field, with triangular border rhythm. Develop an original scene-illustration vocabulary with ordinary people, venues and activities. The source's green is artwork content; GMD UI keeps Nile as the primary colour.
3. **EG-002/011 envelopes:** open space, grouped bilingual titles, rectangular object stamps, circular cancellation marks and a spiral/axis diagram. Adapt to source manifests, collection issue covers, dataset lineage and acquisition records. Never use a stamp-like graphic to imply rights clearance or historical authenticity.
4. **EG-013 Film brochure:** pointed portrait enclosure, asymmetric image/calligraphy balance and a montage beneath. Use for a Film editorial hero and a portrait frame. Keep navigation and body copy in ordinary legible type; the display accent can evoke poster rhythm without tracing the lettering.
5. **EG-006 school cover:** architectural rules and type over a calm page. Use for encyclopedia chapter openings, bibliographic records and documentation section plates.
6. **EG-027/032/034/037 photographs:** media work, artists, workshops and labour. Use as substantive stories about people creating knowledge, with source context. They broaden the visual identity beyond monuments.
7. **EG-036 grille photograph:** architectural framing makes a natural bridge to the current interlace/aperture studies. Derive the concept of revealing a view through a structure, while keeping the source photo itself intact.
8. **EG-004/018/020/021/022:** patterned/calendar/calligraphic/political objects belong in contextual collections. Separate decorative frame geometry from inscriptions and portrait subjects. Sacred text and political portraiture should not become anonymous brand noise.

The existing polygon families and Egyptian registers remain the geometric foundation. Add layout applications—edge frames, open apertures, chapter registers, paired crops and a clear central field—before increasing seed counts. The resulting anatomy must survive 375px, RTL and variable content without clipping.

## Arabic typography recommendation

Compare with identical copy, buttons, diacritics and mixed-script metadata before adopting. [Detailed review and primary sources](TYPE-AND-COMPONENT-REVIEW.md).

- **System body/UI: IBM Plex Sans Arabic.** Candidate replacement for Noto Sans Arabic in navigation, form labels, controls, tables and captions; medium/semibold for utility roles. Arabic stays solid rather than using a raster glyph effect.
- **Editorial and reading: Amiri.** Candidate for Kayffa and encyclopedia headings and a distinct reading mode. Longer prose needs its own size/line-height and column width. Keep current Noto Naskh available in the comparison.
- **Film campaign accent: Rakkas.** Short, deliberate poster-style display, never the universal body or button font. It has a specific Egyptian film-poster reference; using it selectively is more convincing than applying it to every product.

Arabic uses zero added tracking, natural shaping, appropriate line-height, no synthetic uppercase and separate optical sizes. Test 14/16/18px UI, 20/24px reading and 36/56/72px display; these are specimen sizes, not finalized tokens. Check dots/diacritics, wrapping, weight, focus/error states, RTL ordering and `bdi` for IDs/Latin product names. Bundle only the approved weights locally with license files, then mirror exact font metrics and styles in Pen.

## Component expansion and delivery order

| Phase | Deliverables | Required proof |
|---|---|---|
| 1 · Public shell + material | Full and compact footer; grouped navigation/mega menu; announcement; directory tabs; material roles; Arabic specimens | Desktop/mobile, English/Arabic content, keyboard menu/dismissal/focus, no clipping; solid background fallback |
| 2 · Media and content | Object viewer/zoom; image figure with source/caption; video/still window; poster/portrait; media unavailable/loading; editorial feature and reading chapter | Focal crops/original escape; long captions; image-failure path; keyboard viewer; same-image treatment comparison |
| 3 · Collection products | Faceted search, active filters, sort, card/list/table; no-results; pagination; selection, row actions; dataset schema/license/version/lineage | Shared records across views; clear/reset; correct export; mobile adaptation; accessible names and sort state |
| 4 · Tools and submission | Combo box, date range, upload queue, progress/retry/cancel, repeatable form rows, bulk actions, settings sections, confirmation/toasts | Real validation/loading/error/success; Escape/focus return; no pointer-only interactions; RTL/wrapping |
| 5 · Adoption and unification | Implement approved shared assets/tokens/contracts in existing and older Pen boards and web galleries; demonstrate Film + Kayffa + Data | One canonical source; no independently drifting font/colour copies; two real consumer builds; visual and interaction QA |

Keep the current component-lab demonstrations, but audit each contract before marking it reusable. This phase should deepen missing families rather than producing additional static button grids. Existing readiness labels remain draft until the proof is present.

## Footer specification

Create a wide **project directory** with bounded lightly textured cells, black label tabs and rules shared with Tavus's window language. Groups: Projects, Collections, Organization, Build with GMD, Resources, Support/rights. Populate only routes that exist; speculative projects stay in the review page. Follow with a **Nile closing field**, a large GMD mark and an original architectural/register composition. An optional discovery interaction can reveal related collection topics; its static state must work fully. Finish with a plain bilingual language/source/legal row.

Wide layout can use six columns; medium two or three; narrow stacks labelled groups with visible link content or properly controlled disclosure. Don't force six cramped columns or move essential links into an artwork/game. Use link underlines/focus, current-page semantics where relevant, long Arabic label tests and reduced motion. The footer should serve Film, Kayffa, datasets and tools with configurable groups, rather than four separate hand-built versions.

## Acceptance checklist

The review is a direction proposal. Before integrating: compare images at intended sizes; check small text contrast over every textured material; approve Arabic specimens with real copy; validate local fonts and licenses; test 375/768/1440px and RTL; preserve original-image access; define component states and keyboard behavior; validate geometry seams only where repetition is actually intended. Export the approved Pen board and verify it visually against the same canonical tokens and web specimen.
