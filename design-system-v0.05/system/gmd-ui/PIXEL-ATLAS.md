# GMD Pixel Background Atlas

Twelve deterministic, editable SVG surfaces turn the geometry already present in the GMD asset library into discrete pixel fields. The SVGs use an explicit per-file custom-property palette (`--paper`, `--nile`, `--ink`, `--pink`, `--sand`, `--warm`, and `--ice`) and crisp-edged rect cells. Adjust the properties near the top of each file to recolor a motif.

These are new geometric interpretations. They are not traced cultural artwork and do not claim to reproduce historical objects. Their source files and the structural cues used are documented below. The fine stipple in two fields uses a fixed Bayer matrix, so regeneration produces the same result every time.

| SVG | Existing source | Cell | Geometry / suggested use |
| --- | --- | ---: | --- |
| `pixel-rosette.svg` | `public/assets/connected-parquet-morph.svg` | 5 px | Repeated 16-fold parquet rosettes; use as a soft hero or section field. |
| `pixel-parquet.svg` | `public/assets/connected-parquet-morph.svg` | 6 px | Staggered linked 8-fold cells; use for broad tiled surfaces. |
| `pixel-register.svg` | `public/assets/egyptian-pendant-register.svg` | 5 px | Loop chain over five-rib hanging leaves; use as a horizontal band. |
| `pixel-star-field.svg` | `public/assets/dual-level-field.svg` | 6 px | Nested eight-point field, blue stipple, and a clear central reading aperture. |
| `pixel-strapwork.svg` | `public/assets/true-interlace-panel.svg` | 5 px | Narrow alternating diagonal ribbons with crossing nodes. |
| `pixel-river-bands.svg` | `public/assets/connected-parquet-morph.svg` | 8 px | Horizontal bands interrupted by stepped parquet lozenges. |
| `pixel-pendant-arches.svg` | `public/assets/egyptian-pendant-register.svg` | 7 px | Repeating stepped loop crowns with descending fan ribs. |
| `pixel-star-lattice.svg` | `public/assets/dual-level-field.svg` | 4 px | Fine eight-point lattice, blue stipple, and a wide central reading aperture. |
| `pixel-crossing-ribbons.svg` | `public/assets/true-interlace-panel.svg` | 8 px | Broad stepped over-under diagonals. |
| `pixel-rosette-medallion.svg` | `public/assets/connected-parquet-morph.svg` | 9 px | Large 16-fold medallion with clipped parquet corners. |
| `pixel-leaf-register.svg` | `public/assets/egyptian-pendant-register.svg` | 4 px | Close repeat of five-rib leaves under a stepped loop border. |
| `pixel-dual-grid.svg` | `public/assets/dual-level-field.svg` | 6 px | Offset grids resolved as stars, hubs, and crossing axes. |

`public/assets/pixel-atlas.json` provides the machine-readable title, source, filename, display cell, and use. Each SVG includes source path and display cell as data attributes, plus intended use and a short motif note in its `<desc>`.

Regenerate the SVGs, manifest, and contact sheet with:

```powershell
python scripts/generate-pixel-atlas.py
```

The generator uses only Python's standard library. It writes the atlas assets to `public/assets/` and the preview contact sheet to `proof/cvi/pixel-atlas.png`.

