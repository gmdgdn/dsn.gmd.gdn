# Phase 2 source and reconstruction manifest
Source: Jay Bonner, *Islamic Geometric Patterns* (Springer 2017). Printed page = PDF page − 22.
| ID | Tiling | Default θ | Source basis | Status |
|----|--------|-----------|--------------|--------|
| F1 | 6.6.6 | 60° | §3.1.1 p.222 (PDF 244): regular hexagonal grid | Reconstruction of the technique (p.187) |
| F2 | 3^6 | 45° | §3.1.1 p.222 | same |
| F3 | 4.4.4.4 | 67.5° | §3.1.1 p.222 (square grid) | same |
| F4 | 4.8.8 | 67.5° | §3.1.2 p.254 (PDF 276), section heading only; text not read | same, tiling proportions generic |
| F5 | 3.6.3.6 | 45° | Fig. 99 p.236 (PDF 258) names 3.6.3.6 | same, not compared to the figure's six variants |
| F6 | 3.12.12 | 75° | §3.1.1 p.222 lists dodecagons in the system | same |
**Source-faithful:** the construction (rays from edge midpoints, adjacent-edge meeting). **Interpretation:** band widths, polygon tints, colour roles, <24px simple variant. None of the six is pixel-compared to a specific printed figure.
**Not delivered:** interlacement; dual-level types A–D; fivefold/sevenfold systems; irregular-module systems (fourfold A/B).
Files: svg/Fx_*_cell.svg (layers: tint, scaffold, band, lines), *_field.svg (4x4, `<use>` of one cell), *_simple.svg (heavy stroke), verification.json, geometry.js (engine), gen.js (library generator), scan.js (valid-angle scan).
Colour roles are CSS variables with fallbacks: --pg-ink, --pg-paper, --pg-t3/t4/t6/t8/t12.
