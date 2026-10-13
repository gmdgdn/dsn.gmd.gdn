# Review: direction board and submitted Phase 2 library

Reviewed 2026-10-03. Read-only assessment of submitted work; existing design masters unchanged. The archive was extracted into `reviews/phase2_geometry_library`. Its JavaScript was inspected, not executed. All six exported fields were inspected in the browser. Sol reviewed construction and validation code.

## Verdict

Keep both as research assets. The direction board is a useful research and construction proposal. The ZIP is a narrower, editable polygonal-pattern prototype. Neither yet demonstrates a universal web design system or a source-verified motif library.

## Direction board

Strengths: specific references; actual construction diagrams; clear provisional labels for compound and dual-level studies; retained paper/ink/Nile/pink typography and hard depth; separate attribution of Egyptian material.

1. **Direction A's example contradicts its stated construction.** `direction-review/index.html:235` loads `field-4612-median.svg`, while its caption and text describe a 4.8² octagon-square aperture. The media crop is a standalone CSS octagon and the content is a conventional two-column grid (:65, :69, :238). Neighboring square cells do not actually allocate metadata as described. The approximation at 29% is also distinct from a geometrically derived regular octagon. Use the intended scaffold and derive content openings from its coordinates.
2. **Direction B illustrates texture, not relations.** The large background and floating text panel do not demonstrate graph nodes, selected edges, or primary-band navigation. Keep the geometric study, but build one actual selected-path interaction before judging the proposed knowledge interface.
3. **Direction C does not demonstrate its named Egyptian family.** Its only background is `radial-fivefold-median.svg` (:293), while the text promises Egyptian registers/spines and dome-gores. Show a reconstructed Egyptian register and a distinct source-based radial/gore example, with an actual reading/index layout.
4. **Readability needs designed quiet areas.** Direction A places paragraph text over linework; background opacity is the main mitigation. Reserve a quiet content aperture with a fixed hierarchy and sufficient space for longer titles.
5. **Keep numeric and source distinctions clear.** Fig.89 itself is printed 227/PDF 249; printed 223/PDF 245 discusses it but shows Fig.85. The book gives Fig.448's factor as both `2√3` and `3.4610...`; these disagree mathematically. Use `2√3 ≈ 3.464101615` in code and flag the source's decimal discrepancy. Do not silently convert source prose into an unchecked numeric token.

## ZIP library

Strengths: six nontrivial polygonal constructions; 18 SVG exports; small readable construction engine; reusable lattice vectors; cell, field, and heavier-stroke exports; unusually candid manifest.

1. **Scope is narrower than the requested library.** The six families are 6.6.6, 3^6, 4^4, 4.8.8, 3.6.3.6, and 3.12.12. The manifest explicitly excludes interlacement, dual-level, fivefold/sevenfold, and irregular modular systems. These are generic technique reconstructions, not matched historical figures. Source reading for F4 is only a heading; F5 is not compared with the illustrated variants.
2. **Verification is not independent.** `gen.js:24-33` reuses engine segments and does not parse exported SVGs. Endpoint keys round to 1/50 geometry unit, equivalent to 2 SVG pixels at the export scale. Degree counts under that tolerance do not certify exact seams. F6 has a 0.004 SVG-pixel endpoint discrepancy from path/translation rounding: visually negligible, but incompatible with an exact-repeat claim.
3. **Crossing tests do not test woven bands.** They examine segment-start angles within a cell. The double strokes have no over/under topology. The manifest correctly says interlacement is not delivered.
4. **Angle ranges are sampled, not continuous guarantees.** Scanning uses one-degree increments and a built-in minimum gap threshold. `ranges.json` ends at 90°, while the generated report hardcodes 89°. Document the threshold and unify the endpoint rule; distinguish mathematical validity from optical usability.
5. **Small-size variants do not simplify topology.** `*_simple.svg` uses the same segments with a heavier stroke. A real optical tier should remove selected internal detail or substitute a separately designed motif, then be inspected at intended pixel sizes.
6. **Styling is not yet GMD/Tavus-compatible.** Defaults are dark teal `#10343a` and cool pale paper `#eef2ee`, not current ink/Nile/warm paper. CSS custom properties inside external SVGs loaded with `<img>` do not inherit from the parent page. Use inline SVG, explicit themed exports, or controlled masks for reliable token application.
7. **A field crop is not necessarily a repeat tile.** The slanted lattices are exported into rectangular windows. The internal copies can make a coherent field while the opposite edges of that rectangular image do not form a seamless CSS repeat. Derive a rectangular supercell or use the lattice vectors directly.

## Recommended next gate

Retain Direction A as a candidate architecture, with B and C as specialized composition candidates. Approval should be based on corrected visual specimens, not the current promises.

Build only these three review specimens first:

1. A 4.8² collection section whose image and metadata openings genuinely follow the scaffold, with a narrow version and a long-title case.
2. A dual-level knowledge section with one real selected node/path and a quiet record panel; keep its reconstruction provisional until plate registration is verified.
3. A source-labeled Egyptian register/spine reading layout with Arabic and English examples.

Separately strengthen the library with exported-SVG seam checks, a source-overlay comparison for one eightfold family, actual interlace topology, and genuine optical simplification. Expand to further families only after those construction rules work.

This review does not authorize or begin a production homepage or overwrite either design system version.
