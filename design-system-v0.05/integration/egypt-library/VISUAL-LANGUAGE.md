# GMD visual language: new print and drawing collection

The `graphics/2` collection adds a modern Egyptian editorial register to the existing ancient Egyptian and Islamic geometry. These sources are drawings and printed compositions; their visual traits should not be mislabelled as ancient motifs.

## A disciplined frame, expressive contents

Keep the Tavus-derived frame: paper and ink, Nile blue, pink actions, square corners, ruled navigation, editorial display type, compact utility labels and hard 5/3/0 depth. Drawings belong inside the frame or at a deliberate section boundary. Form controls, tables and navigation retain the same anatomy across projects.

| Source cue | Reusable construction | Application |
|---|---|---|
| G2-003 / G2-021 radial hatched disk, diamond handle, mesh ovals | Separate radial outline, wedge hatching, handle and satellite meshes | Large chapter opening, circular feature beside a clean title, archival section marker |
| G2-014 / G2-023 angular abstract bird and architectural strokes | Outline, weighted black facets, nested arch, mesh inset and scattered ink marks | Company editorial feature, Kayffa chapter art, cover composition |
| G2-015 portrait frame with looped corners and uneven bursts | Reusable empty portrait frame, corner hardware and burst marks | Film/person feature with a replaceable image and caption below |
| G2-019 articulated angular body and three inset panels | Angled outline, linked nodes and small repeated comparison frames | Evidence-to-record feature or release story; use real labels outside the drawing |
| G2-002 asymmetric circle and curved stem | Clean focal disk and curling tail with separate accent | Introductory campaign marker; no simulated handwriting |
| G2-007 / G2-024 narrow image/drawing spine beside columns | Fixed art spine with flexible reading column | Kayffa long-form essays and collection chapters |
| G2-005 / G2-009 modular print collage | Unequal bounded image tiles and compact caption ribbons | Film and archive collection features, never a replacement for accessible search results |
| G2-008 irregular dense dot field | Bounded dotted vector field, with open area for content | Print atmosphere at large editorial edges; no noisy form backgrounds |
| G2-022 concentric disks, zigzag bands and figurative collage | Isolated geometric accents paired with an intact source plate | Large collection opener; preserve figurative artwork as a source image |

## Compositional limits

Use one dominant drawing or pattern per section. Combine a busy image with a quiet frame, or a quiet image with a detailed border. Let the illustration occupy roughly one-third to one-half of a feature; keep text outside its geometry. At mobile widths, stack the art and text rather than shrinking an intricate drawing into an unreadable icon.

Use full source objects in the viewer. Editorial derivatives and extracted SVG parts remain separate assets. A vector reconstruction captures selected shapes; it is not an authenticated facsimile of the complete source artwork. The catalog links each recreation to its source and explains which details were omitted.

## Project use

- **GMD company:** angular drawing for an editorial explanation of connected data; radial drawing as a chapter marker. Keep mission and services readable.
- **Film:** portrait hardware frames and print collage compositions; short expressive Arabic titles, consistent body text.
- **Kayffa:** narrow illustration spines, ink drawings and generous reading columns.
- **Datasets and business tools:** clean surfaces and shared controls; visual motifs confined to collection identity, onboarding and empty-state illustrations.
- **Encyclopedia:** full-object images, source captions and occasional chapter dividers; evidence and readability lead.

## Editable asset contract

Each drawing uses a viewBox for proportional scaling, named groups for editable parts and explicit fallback colors. Use semantic `--gmd-ink`, `--gmd-nile`, `--gmd-accent` and `--gmd-paper` roles where provided. Inline SVG inherits those variables; an SVG embedded as an image must be edited directly or replaced by a palette variant. Preserve fine-line legibility and the documented minimum display size. Pen counterparts use named native vector layers and actual paths, rather than bitmap substitutes.
