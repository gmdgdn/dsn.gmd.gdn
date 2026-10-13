# Egyptian source-informed vector studies

This library adds 15 distinct contemporary graphic families, each with two intentionally different arrangements (30 standalone SVGs). The cited IDs point to supplied inspiration images in `reviews/egypt-enhancement/asset-manifest.json`; the asset review only verifies what is visibly present in those files. No SVG is claimed as an archaeological or historical reconstruction.

## Files and use

- `assets/*.svg` — canonical, editable SVGs. Native paths, circles, rectangles and polygons; explicit coordinates; no transforms, embedded type, clipping masks, external links, or raster data.
- `manifest.json` — per-file family, source image IDs, visible-source observation, construction summary, usage, minimum size, palette and repeat status.
- `assets-gallery.html` — generated selector with previews of all 30 files, classification, source-image links, construction/use notes and minimum-size guidance.
- `generate.py` — deterministic standard-library generator and XML/coordinate validation. Run with `python generate.py` from this directory; it overwrites only the generated assets and manifest.

The motifs are standalone or bounded bands/fields. **No seamless tile/repeat is claimed.** A visual rhythm at the edges is not a seam test. For Pen, import each SVG as vector artwork or use its primitive geometry as a construction reference; SVG viewBox sizes are drawing units, not CSS pixel prescriptions. Keep production text and image layers separate and replaceable.

## Families

| Family | Source observations | Construction / layout role |
|---|---|---|
| Skyline rail | EG-005, EG-016 | Varied tower/dome skyline above water rule; masthead or chapter rail |
| River chevron | EG-005, EG-010 | Angular or curved water courses; section divider |
| Lotus register | EG-005, EG-009 | Open flower / closed bud alternation on baseline; narrow chapter spine |
| Sun medallion | EG-005, EG-004 | Sixteen-ray ring composition; isolated large section marker |
| Triangle alternation | EG-009 | Up/down triangles with sparse filled cells; poster edge |
| Faceted portrait aperture | EG-013, EG-036 | Nested pointed/faceted replaceable media window |
| Blank postmark ring | EG-002, EG-011 | Blank rings, cancellation strokes and axes; no implied date/provenance |
| Diagram spiral axes | EG-011 | Schematic sampled spiral with measured orthogonal ticks |
| Architectural ruled frame | EG-006, EG-013 | Replaceable image, caption and header slots in a measured page frame |
| Grille aperture | EG-036, EG-013 | Orthogonal grille with clear center view |
| Thin scene lines | EG-009, EG-005 | Hills, water, palm and boat as a generic scene (not a named place) |
| Rosette border | EG-004, EG-005 | Repeated 6- or 8-lobed circular units as bounded border |
| Brick / cutstone courses | EG-005, EG-036 | Staggered rectangular course diagram; no site-specific masonry claim |
| Woven reed fibres | EG-009, EG-005 | Sampled sinusoidal strands as line material; explicitly not over-under weave |
| Inkprint stipple | EG-004, EG-011 | Deterministic peripheral dots around a quiet center; not under text |

## GMD palette and limits

Nile `#1034A6`, action pink `#FF6183`, paper `#F7F4EF`, and ink `#140206` retain their GMD roles. Optional graphic colors use the existing ornament roles: teal `#176F73`, ochre `#8B661E`, sand `#D5C4A8`, and terracotta `#9C4937`. The palette is a contemporary GMD interpretation, not a claim about historic pigment. The minimum-use guidance is a visual floor for the stated line weights, not a contrast certification; check contrast and legibility in the target background and output size.

These files contain no sacred text, copied portrait, political figure, historical issuer, stamp date, or inferred artifact provenance. The source bundle is a visual inspiration review, not a rights or archival audit. Treat references as composition/geometry cues and preserve the image’s context if a source image itself is shown.

## Validation

`python generate.py` parses all 30 SVGs as XML and checks dimensions, finite path numbers, viewBox-bounded authored coordinates, explicit vector content, no transform/filter/mask/clip-path dependencies, and absence of unsupported repeat claims. It does not certify browser/Pen import behavior, small-size optical quality, color contrast, or historical fidelity.
