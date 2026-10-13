# GMD v0.05 — generative visual system architecture

**Status:** architecture and QA contract for three review compositions. The user reviews the compositions and source atlas before the v0.01 Pen masters are copied or changed. This document proposes a visual system; it does not certify a historic reconstruction or a running component library.

## Design thesis

GMD needs a recognizable way to **organize** Egyptian media and knowledge, not a pattern pasted around a generic website. The v0.01 Tavus-derived core provides warm paper, near-black ink, editorial type, tiny utility labels, segmented navigation, a seven-line stripe separator, square controls, pink actions, Nile blue information/focus, and selected hard offset depth. v0.05 adds source-informed geometry as a *construction system*: it determines openings for images, relationships between objects, relative panel spans, section transitions, and distinctive details. Dense text, metadata, filters, buttons, and tables remain quiet, flat reading surfaces.

The system should be recognizable even with all ornaments hidden: a deliberate asymmetrical editorial hierarchy, ink rules, generous paper, graphic sectional cuts, precise metadata, and an image or data object placed in a designed aperture. Source-derived geometry must do structural work in at least two places in each major composition. A repeated stripe along a card's top edge does not meet that standard.

## Six-layer architecture

| Layer | Defines | Output / constraint |
| --- | --- | --- |
| **1. Source register** | Tradition, actual PDF/page/figure, visible construction, limits of attribution, rights, modern redraw decisions. | Every family has an asset record. Unverified motifs cannot silently become “ancient Egyptian” or “historic Islamic.” |
| **2. Primitives** | Lines, point, square, circle, polygon, petal/fan, spiral/lozenge, ribbon, terminal, crop and aperture. | Vector paths in local coordinates; strokes are independent of viewport size. |
| **3. Construction grids** | Orthogonal module, register/band, polygon radial divisions, adjacency graph, rhythm and seam rules. | Parameters generate variants with repeatable joints and deliberate cropping. |
| **4. Motif families** | Three related but distinguishable GMD families described below. | Each family has a hero, medium, and micro/detail expression, with minimum sizes and omission rules. |
| **5. Compositions** | Media aperture, knowledge atlas, collection lattice, chapter/section cut. | Geometry sets content grouping and placement. Each composition has content slots and fallback behavior. |
| **6. Product themes** | Film, Kayffa, Data, Tools, Play and future destinations. | Shared shell and semantics; product-specific imagery, density, accent budget, and composition choice. Planned products must be labeled as such. |

The construction layers are not CSS backgrounds alone. The same normalized geometry should be exportable as SVG paths for clipping, drawing, seam tests and Pen editing, while HTML owns text order, links, controls and accessibility.

## Source-informed families

These are candidate **modern derivatives** based on the current [source inventory](../research/SOURCES.md) and the completed deeper visual page survey. The atlas should finalize each figure, construction and attribution record before production. No exact trace is approved for production.

### A. Register / square rhythm — Egyptian booklet PDF pp. 9–11

An orthogonal lattice of nested light/dark square modules and their negative spaces. Its value is a *measured rhythm*: a sequence of index compartments, steps and square reveals. Build from a base square `u` with integer subdivisions; alternate open/closed modules without allowing the black mass to flatten into a checkerboard. The module can set archive entry numbers, chapter panels, collection gaps, corner notches and the ends of a stripe band. At large scale, selected squares can become actual content windows; at micro scale, use one square index mark rather than a miniaturized tile.

Potential construction record: `cell=u`, `innerInset`, `fillCycle`, `rowOffset`, `join` and `terminal`. Treat the PDF page as a printed design plate, not proof of an object's period, place or material.

### B. Register / fan, pendant and circle weave — Egyptian booklet PDF p. 8, pp. 12–16, 20–25

The [full booklet atlas](EGYPTIAN-ATLAS.md) distinguishes a radial fan on p. 8, pendant registers on pp. 12–16, and circle/weave fields on pp. 20–25. Keep them as separate **construction options**, not an arbitrary combined historic motif. A circle/weave grid can set an opening for a film image or quotation; a pendant register can locate an archival caption or chapter change. The rhythm may set a section's top/bottom profile and paired content bays. The p. 27 lozenge plate remains a separate candidate, not a default ingredient in one composite. An actual source image stays intact on its record page; editorial crop apertures are for approved preview imagery only.

At small size, retain a single broad silhouette or omit. Do not call a fan a verified lotus, do not describe a source plate as a specific artifact without provenance, and do not turn a sacred or inscriptional mark into decoration.

### C. Polygon / parent-and-child field — Bonner, Figs. 123, 126, 379, 380, 448 and 453

The [Islamic geometry atlas](ISLAMIC-ATLAS.md) records the checked figures. Fig. 123 (printed p. 255 / PDF p. 277) and Fig. 126 (printed p. 257 / PDF p. 279) inform the fourfold construction study. Compound examples appear in Figs. 379–380 (printed pp. 444–445 / PDF pp. 466–467), while Type A dual-level Fig. 448 (printed p. 498 / PDF p. 520) and fivefold dual-level Fig. 453 (printed p. 503 / PDF p. 525) inform the subordinate detail. These are different source ideas, not proof of one historical composite. Use the *logic of connected polygons, parent grid and subordinate detail* to compose knowledge and data views. One or several large cells may hold actual linked entities, with connectors representing real relations. The field may continue into a collection cover or a clipped side aperture. It must not degrade into a generic “Islamic star wallpaper.” The named figure, polygon class, modern derivation, and any historical example must remain distinct in its asset record. A design with a matching symmetry group is not evidence that a historical maker used that construction method.

At large scale, preserve a readable primary cell and edge junctions. At medium scale, use a limited cluster or one aperture. At small scale, substitute a simple polygonal node icon or omit the pattern; never shrink a dense lattice until its interstices fill in.

The families should not be fused by superimposing Egyptian and Islamic marks. Coherence comes from shared ink weight, paper, editorial alignment, color hierarchy and content semantics. A page may use one family as its structural lead and another only for an explicit cross-collection connection with enough separation to keep their provenance clear.

## Parameter model and vector rules

Represent each asset as a generative recipe, not a fixed-width banner. A practical manifest entry should include:

```json
{
  "id": "gmd-register-square-01",
  "status": "modern-derivative-for-review",
  "source": { "work": "Ancient Egyptian Designs", "pdfPages": [9, 10, 11], "figure": null },
  "family": "register-square",
  "coordinateUnit": 100,
  "parameters": ["cell", "inset", "duty", "phase", "lineWeight", "terminal"],
  "roles": ["section-layout", "index", "aperture"],
  "avoid": ["body-text-background", "unverified-historic-label"],
  "rtl": "reorder-layout; preserve-undirected-geometry"
}
```

The generator emits named paths for `construction`, `visibleStroke`, `solidFill`, `aperture`, `nodeAnchor`, and `safeContent`. An SVG viewBox and CSS layout may share a module value, but content should never depend on raster scaling of a source plate. Expose a fixed repeat pitch and phase so neighboring modules meet precisely. Define starts, endings, inside/outside corners, and clipped edges as intentional variants. For irregular windows, create a legible rectangular inset *inside* the aperture for text; the expressive outline can shape the outer media or panel. Avoid content that follows a sharp zigzag edge line by line.

Use the existing 4 px spacing rhythm and 1 px ink rule as the utility baseline. In large expressive geometry, a hairline alone may disappear: choose line weight by rendered size, optical density and display pixel ratio, then verify at 1× and 2×. The following are **QA bands, not historic measurements**: a hero unit roughly 160–320 px, a medium unit 64–120 px, and a micro mark 20–32 px. At a narrower viewport, use fewer cells and a simpler level of detail instead of scaling an entire dense field to 30%. The same source logic may yield a different drawing at each optical size.

Color is semantic. Ink carries structure; paper is breathing room; sand is quiet archival context; Nile marks selected paths, links, focus and data states; pink belongs to action or one deliberately active focal point. Do not color every polygon. The black hard offset edge is reserved for a foreground control or a chosen editorial feature, not every tile. The seven-line stripe may bridge between compositions as a modern GMD sign; it should not be falsely attributed to either historical source.

## Composition grammar: three review studies

The examples should be large, web-first **sections**, with real content hierarchy. They are direction studies rather than homepage code. Each should show one full composition, a close detail of the underlying geometry, a narrow responsive variant, and a source/derivation caption. A simple three-card comparison is insufficient.

| Study | Content and structure | How geometry changes the layout | Product fit |
| --- | --- | --- | --- |
| **1. Film / Kayffa editorial aperture** | Large editorial headline; one rights-cleared image or typographic title; source/rights/status context; one clear action. | A register-derived stepped or fan/lozenge aperture determines the image area and its neighboring text bay. Square units set issue/index spacing and a provenance pocket. The section edge is an assembled profile, not a border glued to a plain rectangle. | Film campaigns, Kayffa object or collection introductions. |
| **2. Data / knowledge atlas** | One selected entity or dataset, 3–6 meaningful linked nodes, relationship labels, explanatory panel, source and coverage note. | A polygon cluster gives nodes genuine positions and connection ports; node size and adjacent rectangular detail panels reflect hierarchy. A selected Nile path follows a real relationship. At narrow width the graph becomes a short navigable list that preserves the same relations. | Kayffa graph, documented datasets, encyclopedia or portal concepts. |
| **3. Tools / Play collection lattice** | An editorial index of differently sized projects, status labels, short summaries and destinations. Existing Film/Kayffa remain distinct from exploratory Tools/Play ideas. | Square/register modules create a window lattice with varied spans and stepped joins. One large focus window anchors the page; smaller modules hold sibling projects or captions. A game may use a separate pixel identity inside its window, not in shared GMD controls. | Parent portfolio, product index, toolkit or interactive collection. |

For each composition, a designer should be able to remove the strokes and still see a distinctive allocation of space. If all remaining boxes collapse into three equal cards, the geometry was only decoration. The [three web studies](web-studies.html) show the v0.01 shell's color, type, rules and controls as a baseline. None claims that the newly assembled composition reproduces a historic artifact.

## Shared components and product expression

The shared system owns navigation, segmented controls, buttons, focus rings, forms, metadata rows, search/filter UI, archive provenance fields, status labels, responsive behavior and bilingual rules. These are readable first. Source geometry can shape their parent section or provide an index mark; it must not interrupt the interaction target or obscure state. All real archive records keep source, rights, publication status and AI-use suitability distinct. A dataset view exposes coverage and permitted use rather than treating “AI-ready” as an unrestricted training license.

Products choose different compositions and density. Film can lead with a generous image aperture and more expressive type. Kayffa can lead with archival context and a relation atlas. Data needs the quietest density: legible charts, tables and filters, with geometry in the introduction, navigation or a selected relation view. Tools can use task-oriented sections with a structural index; Play can adopt a more vivid focal window while preserving the shared shell. The future products in the [ecosystem inventory](../../design-system-v0.01/ECOSYSTEM.md) are proposals; example labels must say `Exploring` or `Concept` until their launch status is supported.

## Interaction, RTL and accessible reading order

DOM order follows meaning: title, summary, main item, context, related items, action. SVG is a visual map of those items, not the sole carrier of names or relationships. Connected-node diagrams require labeled interactive targets, a synchronized list or table alternative, keyboard navigation and an explicit selected state. Decorative SVG layers use `aria-hidden`; informative diagrams have text equivalents. Focus stays visibly blue with its two-pixel gap on every surface. Pink action and Nile active state also carry a label, underline, shape or border so color is not the only cue.

In Arabic, set `lang`/`dir` on the appropriate region, reflow the asymmetric composition and reverse directional flow such as sequence arrows. Preserve undirected polygons, source artwork, letters and numeric IDs. Isolate mixed-script codes; let Arabic headings and body wrap at comfortable widths with generous line height. Test real Arabic content instead of mirroring an English screenshot. At narrow widths, reorder large compositions into a meaningful single column. Keep a readable selected node/list and provenance before optional decoration. Hide secondary polygon edges if they compete with text; do not hide required information.

Geometry is static by default. Any hover/selection movement uses the v0.01 short control timings as a design proposal, with reduced-motion behavior that immediately switches state without travel. Historic design sources provide construction evidence, not a motion vocabulary. No spinning stars, looped ornament, parallax, or invented “traditional” animation.

## Review and QA contract

**Before Pen migration:** deliver the three large section studies, source atlas with page/figure references and source confidence, vector recipes, and at least one narrow layout per study. Review the families, not isolated border samples. Preserve v0.01 assets and Pen masters until the user selects the direction. The updated [v0.05 plan](../PLAN.md) summarizes this deeper proposal. The initial border studies remain archived as earlier review history.

**Construction QA:** regenerate every SVG from its parameters; check repeat pitch, seam continuity, terminal and corner paths, controlled crop, overlap, and fill closure. Export at 1×/2× and compare sharpness. The hero, medium and micro variants may have different internal detail but must share a visible family resemblance. Record the source page/figure and modern alteration in the asset manifest. Rights and provenance review precede publication of any reproduced source image.

**Layout QA:** at desktop, tablet and narrow mobile widths, verify no unwanted horizontal overflow, no orphaned motif fragment, no forced image distortion, and a clear title → object → context → action hierarchy. Vary real content length, missing image, long Arabic title, unknown rights and empty graph. Geometry must adapt or yield; it cannot force truncation of provenance. Test at 200% browser zoom.

**Interaction QA:** compare plain, hover, pressed, focus, selected, loading, empty and error states. Test pointer and keyboard order, visible focus, minimum touch targets, graph/list equivalence, text contrast on each actual pair, reduced motion and image alt text. A static Pen board can show intent only; a coded prototype is needed for runtime sign-off.

**Acceptance question:** Can a reviewer identify a consistent GMD composition system across Film, Kayffa and Data/Tools/Play, explain what each geometric family does, trace each historic inspiration to a cited page, and use the content when the ornament is removed? If any answer is no, revise the composition before touching the component masters.
