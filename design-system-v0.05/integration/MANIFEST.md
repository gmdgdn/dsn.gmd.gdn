# Integration assets and foundations

This folder curates a review set for GMD v0.05. Source files remain in their original locations. The adapted files here are review assets; they do not assert historical reconstruction or geometric verification unless stated below.

## Foundations

`tokens.json` carries the v0.01 color ramps and foundational scale forward. Semantic names point to those original values, including Nile `#1034A6` at `gmd-v01-nile-600`. `tokens.css` is generated from that JSON by `scripts/build_assets.py`; run `python scripts/build_assets.py` from this directory to regenerate it and parse every curated SVG. The CSS also includes compatibility aliases and local font faces.

| Integration file | Source | Adaptation and use |
|---|---|---|
| `assets/icons/{family}-{16,20,24,32}px.svg` (24 files) | `E:/Eslam Builds/elfilm/design-system-v0.05/refinement/assets/icons/{family}_{size}px.svg` | Six authored utility candidates: play, search, filter, archive, sound waveform, entity node. Four sizes per family. Treat as candidates for optical review, not approved universal icons. |
| `assets/patterns/true-interlace-panel.svg` | `.../refinement/assets/true_interlace_panel.svg` | Crossing panel construction. Removed its embedded verification/stat badges. Geometry status is limited to its source description; this copy does not establish general solver correctness. |
| `assets/patterns/dual-level-field.svg` | `.../refinement/assets/cromwell_dual_level_field.svg` | Two-scale contemporary graphic. Do not label as a reconstructed historical plate. |
| `assets/patterns/egyptian-pendant-register.svg` | `design-system-v0.05/deep/motifs/egyptian-pendant-register.svg` | Original pendant-floral register interpretation from Egyptian booklet pages 12–16. Used as a chapter rail; not an artifact facsimile. |
| `assets/patterns/connected-parquet-morph.svg` | `.../refinement/assets/connected_parquet_morph.svg` | Contemporary morph study. Do not label as a Fig. 448 reconstruction. |
| `assets/medallion/mamluk-16star-medallion.svg` | `E:/Eslam Builds/elfilm/design-system-v0.05/assets/08_mamluk_16star_aperture.svg` | Original Mamluk-inspired emblem study for large editorial use. Removed embedded historical figure caption; treat as an inspired drawing, not a facsimile. |
| `assets/frames/aperture-octagonal-chamfer.svg` | `.../assets/aperture_octagonal_chamfer.svg` | Chamfered media aperture candidate. |
| `assets/frames/aperture-stepped-mamluk-notch.svg` | `.../assets/aperture_stepped_mamluk_notch.svg` | Stepped media aperture candidate. |
| `assets/posters/sample-poster-01.jpg`, `sample-poster-02.jpg` | `design-system-v0.05/direction-review/assets/` | Local sample imagery for layout review; retain image credit/context from the source board when reused. |

SVG named HTML entities were converted to Unicode (including `&bull;`), the shared palette colors use token-backed `var()` values with standalone fallbacks, and every adapted SVG was parsed as XML. The broken standalone fourfold SVGs were intentionally omitted. Source generators were not executed.

## Fonts

The three Latin fonts from `evidence/assets/public-fonts/` are copied to `assets/fonts/` with descriptive names: `PerfectlyNineties-Regular.woff`, `SuisseIntl-Regular.woff2`, and `FKRasterGroteskCompact.woff2`. The Suisse medium face is copied from `direction-review/fonts/SuisseIntl-Medium.woff2` to provide a genuine 500 weight. Arabic specimens come from `direction-review/fonts/`: Noto Naskh Arabic regular/bold and Noto Sans Arabic regular. CSS family names follow the canonical integration names `PerfectlyNineties`, `SuisseIntl`, `FKRaster`, `NotoNaskhArabic`, and `NotoSansArabic`.

## Geometry utility status

The source solver at `E:/Eslam Builds/elfilm/design-system-v0.05/refinement/geometry/interlace-solver.cjs` was not copied into this asset set. The panel SVG is a fixed graphic export. Runtime use of a parity solver should be added only with an explicit supported-preset contract, closed-loop/conflict gates, and independent validation.
