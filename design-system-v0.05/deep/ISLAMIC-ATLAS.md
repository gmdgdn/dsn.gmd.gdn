# Islamic Geometry Atlas for v0.05

Research notes for expanding the visual system into a repeatable library of geometric layouts, section frames, and graphic treatments. Source statements below are marked **Verified**; application ideas are **Proposed**. Figure references identify where to inspect the original construction. The accompanying boards are navigation and design-study aids, not reproductions intended for publication.

**Primary source:** Jay Bonner, *Islamic Geometric Patterns: Their Historical Development and Traditional Methods of Construction*, 616-page PDF. Printed pages map to PDF pages by `PDF page = printed page + 22` (confirmed against printed folios at pp. 175, 221, and 549).

- [Annotated 16-figure atlas](../research/islamic-deep-atlas.png)
- [Six larger crops: square–octagon, 12/8 field, and dual-level systems](../research/islamic-deep-crops.png)
- Broad visual sweep: eight contact sheets in `research/islamic-broad-197-246.png` through `research/islamic-broad-547-596.png`. They sample every second PDF page from p.197 through p.596, covering the classification, construction, and algorithm chapters. The text scan covered the same interval for section headings, captions, and figure references.

## Chapter map: printed page / PDF page

| Printed pages | PDF pages | What the source covers |
|---|---:|---|
| 175–219 | 197–241 | Chapter 2: numeric and symmetry-based design classification, then construction methods and the Topkapi Scroll. Includes four pattern families and repeat-cell descriptions. |
| 221–253 | 243–275 | Chapter 3.1: polygonal technique background and regular-polygon systems. |
| 254–259 | 276–281 | Octagon-and-square patterns on the 4.8² tessellation. |
| 260–293 | 282–315 | Fourfold System A, then Fourfold System B. |
| 294–323 | 316–345 | Fivefold System and pattern variations. |
| 324–331 | 346–353 | Fivefold wide-rhombic repeat. |
| 332–335 | 354–357 | Fivefold thin-rhombic repeat. |
| 336–343 | 358–365 | Fivefold rectangular repeat. |
| 344–346 | 366–368 | Fivefold hexagonal repeat. |
| 347 | 369 | Fivefold radial designs. |
| 348–355 | 370–377 | Fivefold hybrid designs. |
| 356 | 378 | Fivefold variable-scale patterns. |
| 357–375 | 379–397 | Sevenfold System. |
| 376–489 | 398–511 | Nonsystematic designs: isometric, orthogonal, rectangular, hexagonal, and radial repeat structures; single and multiple local-symmetry regions. |
| 490–529 | 512–551 | Dual-level designs: historical Types A–D and potential recursive multilevel construction. |
| 530–536 | 552–558 | Dome ornament using radial gore segments. |
| 537–543 | 559–565 | Dome ornament on Platonic and Archimedean polyhedra. |
| 544–548 | 566–570 | Chapter 3 conclusion and construction principles. |
| 549–573 | 571–595 | Chapter 4: computer algorithms—template tilings, repeat units, tile motifs, ray intersections, face coloring, thick bands, interlacement, and non-periodic or curved-surface extensions. |

## Figure families for scalable web graphics

| Figure and source page | Verified geometry and construction | Proposed use in the system |
|---|---|---|
| Fig. 34 — p.175 / PDF 197 | A fivefold field from the Great Mosque at Malatya uses regular pentagons, concave octagonal shields, kites, and decagonal hourglass forms. Bonner describes rectangular, dual-rectangular, and hexagonal repeat grids. | A dense field or hero background. Keep the whole repeat cell and polygon relationships intact; vary scale and density through tokens. |
| Fig. 35 — p.176 / PDF 198 | A threefold/isometric design places 12-point stars at vertices of a triangular grid (“12s on triangle” in Bonner’s shorthand). | A triangular repeat variant for section transitions, edge masks, or a compact radial badge. |
| Fig. 60 — p.195 / PDF 217 | Construction plate for 8- and 10-sided star forms, ranging from obtuse through median to acute profiles. This is a family diagram, not a finished tessellation. | Make point count and ray/contact angle controllable inputs to one star component. Pair the star with a separate repeat-cell component. |
| Fig. 89 — p.223 / PDF 245 | Semi-regular tessellation templates make polygon adjacency and vertex order visible. | Grid library for assembling repeat cells; use the vertex sequence as data and layer visual motifs on top. |
| Fig. 123 — p.255 / PDF 277 | The 4.8² arrangement combines squares and octagons. The plate shows acute, median, obtuse, and two-point applications, including variants inside either polygon. | A foundational orthogonal system: square/octagon scaffold, then interchangeable line-family and fill treatments. Good for tile grids, card backs, and section end-caps. |
| Fig. 126 — p.257 / PDF 279 | Eight variations on the median design change star placement, line routing, and offsets over the octagon-square base. | Preserve one repeat cell while exposing alternate path treatments as a visual skin or density setting. |
| Figs. 257–258 — p.347 / PDF 369 | Fivefold radial examples; Fig. 258 is a two-point field on a hexagonal grid, with decagons, pentagons, wide rhombi, and a stellated interstice region. The selected historical example uses a limited region to avoid tightly constrained parallel lines. | Contained circular medallion, progress ring, or radial section marker. Treat the clipped panel and complete repeat as separate assets. |
| Fig. 379 — p.444 / PDF 466 | Acute compound orthogonal field: 12-point stars at square-grid vertices and 8-point stars at square-cell centers. The common scaffold surrounds octagons with pentagons and separates dodecagons with barrel hexagons. An alternative uses edge-to-edge octagons and dodecagons with concave-hexagon interstices. | High-value repeat for a content-card field or large section band. Keep the 12-point and 8-point anchor locations as distinct layers so density and color can be tuned independently. |
| Fig. 380 — p.445 / PDF 467 | Median derivations from the same pair of related underlying tessellations as Fig. 379. Other source passages note modifications, including occasional heptagonal elements in the pattern matrix. | A second line-family treatment over the same compound cell. This gives the system a useful “same grid, different rhythm” variant. |
| Fig. 448 — p.498 / PDF 520 | Type A dual-level Mughal jali: regular-hexagon tessellations generate both levels. Six-point median stars appear at the midpoints of both primary and secondary hexagons. The source gives a scale ratio of 1:3.461 and a 90° rotation between identical patterns, identifying it as scale-invariant. | Recursive background or framed panel with two controlled scales. Preserve the exact ratio and quarter-turn when reproducing this source study; for new designs expose ratio and rotation as parameters. |
| Fig. 453 — p.503 / PDF 525 | Type A fivefold design with an acute primary pattern and obtuse secondary pattern. It is recursively built from fivefold modules, but the differing pattern families mean its visual result is not scale-invariant. | A compound section background where the primary and secondary layers use separate colors and contrast levels. Keep the two line families independently editable. |
| Fig. 490 — p.534 / PDF 556 | Diagram of an eightfold radial dome layout: one gore is flattened, with elevation, plan, and a row of eight segments shown. | Responsive radial hero or segmented cover graphic. Build the 2D segment first, then repeat it around the center; preserve seams where segments meet. |
| Fig. 496 — p.538 / PDF 560 | A two-point design is mapped over pentagonal faces projected from a dodecahedron onto a spherical surface. | Optional 3D study or spherical section graphic. Keep face projection and decorative line work as separate geometry layers. |
| Fig. 503 — p.550 / PDF 572 | Algorithm chapter’s template tiling shows the repeat arrangement alongside its isolated polygon tile shapes. The text defines an infinite periodic tiling through a finite repeat unit and two translation vectors. | Core scalable primitive: store a cell, tile motifs, and repeat vectors; render any viewport by copying the cell without resizing or redrawing motif geometry. |
| Fig. 509 — p.551 / PDF 573 | Decorated tile motifs demonstrate that tile faces can receive consistent two-color fills before assembly into the full field. | Color enclosed regions as a separate pass, then apply the design-system palette. This keeps adjacent cells consistent across seams. |
| Fig. 534 — p.568 / PDF 590 | Reflected copies of motif edges determine band polygons at bends and crossings; the resulting band shapes have four, five, or six points. Interlacement cues are a further step. | Strapwork treatment for dividers, framed cards, and section ornaments. Construct band geometry first; add over/under cues after the crossing graph is stable. |

## Construction notes for the 12/8 compound field

This is the strongest candidate for the third web study because the text explains the field’s cell structure directly. On printed p.439 / PDF p.461, Bonner describes 12-point stars at the orthogonal-grid vertices and 8-point stars at square-cell centers. The most common underlying tessellation places a pentagon ring around each octagon and barrel hexagons between dodecagons. He also gives a dual-like alternative: edge-to-edge octagons and dodecagons, with concave hexagons filling the interstices. Figs. 379–382 (pp.444–446 / PDF pp.466–468) show the four pattern families from these related tessellations. The radii-matrix construction is Fig. 304a.

**Verified source model:** two repeating anchor classes (grid corners and cell centers); two star orders (12 and 8); polygon scaffolds that close between anchors; more than one compatible tessellation; four alternative ray/line families. The source does not say one line treatment exhausts the possibilities.

**Proposed web model:** represent this as a reusable object containing (1) orthogonal repeat vectors, (2) anchor positions, (3) polygon scaffold, (4) ray angle/line-family setting, (5) enclosed-face colors, and (6) an optional widened-band/interlacement pass. Store a square repeat unit in vector space and render it through an SVG `viewBox` or user-space pattern so the artwork scales with a container while retaining exact seams. Section edges and cards can clip the same field to different shapes; keep the repeat cell intact for each component.

## Web-first applications and style boundaries

- **Layouts:** use grid topology to establish content columns or nested panels; leave text areas clear and let the pattern occupy section boundaries, empty panels, or low-contrast backgrounds.
- **Sections:** crop complete repeat fields into hero bands, cards, footers, and chapter dividers. Use a terminal tile or explicit border cap where a section edge cuts across the repeat.
- **Graphics:** expose the polygon scaffold, star/ray family, fill, and strapwork as separate layers. This allows color changes and density variants without changing geometry.
- **Infinite scaling:** build each motif in a local coordinate system; repeat by translation vectors; scale the whole viewBox to fit responsive containers. For non-square repeat cells, preserve rectangular or hexagonal repeat vectors rather than forcing a square.
- **Tavus core:** apply the existing product palette and surface tokens after geometry is set. The book’s color plates document construction differences, not an authoritative color palette for the system.
- **Attribution:** label redraws as contemporary source studies and retain figure, printed page, PDF page, and construction notes with each asset. This atlas is not a rights assessment.

## Evidence limits

The geometry, figure names, and page references above were checked in Bonner’s text and figure plates. The source often describes a historical example’s building or medium, but this research task did not verify the provenance of every cited object independently. Proposed layout roles and the vector data model are contemporary design recommendations, not historical claims. The broad contact sheets are sampling aids; inspect the cited full page in the PDF before drawing.
