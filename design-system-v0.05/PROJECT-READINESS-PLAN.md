# GMD v0.05 — project readiness and cultural geometry expansion

Plan established 3 October 2026. Expansion implementation authorized 4 October 2026. The integrated gallery remains the foundation/reference baseline; current expansion work is reviewed in `integration/expansion/`. The broader roadmap below remains the release criteria.

This file is the planning authority for v0.05 expansion while the board migration is underway. Older plans and board annotations should either be brought into alignment or clearly marked as historical; do not leave two competing token, typography, component, or source-claim specifications presented as current.

## The decision

Develop one shared system with two densities—editorial and workspace—and a separately specified cultural geometry library. Tavus supplies the material, typography, framing, composition and interaction language. Islamic construction and Egyptian registers extend that language through repeat structures, silhouettes, media frames, borders and section composition. Products select documented combinations rather than inventing their own buttons, colors or geometry.

The current gallery is a useful visual review. It is not yet a project-ready component library: most controls are single demonstrations; the layouts do not establish reusable APIs, full state coverage, form behavior, navigation disclosure, production media controls, or robust collection workflows.

## Board-wide consistency and migration gate

Apply this gate to all ten older GMD Pen boards and the new integration boards as one system migration. The older set includes the foundations, bilingual/RTL, catalog, revision and Antigravity study boards. Update GMD-authored content to the shared system while retaining the original Tavus-imported source frames and saved v0.01 files as read-only reference snapshots. Clearly label archived/source material so viewers can distinguish it from current GMD guidance.

For every board, reconcile:

- **Tokens:** canonical names, values, semantic roles and aliases against the shared v0.05 master. Remove stale or conflicting local token definitions from current GMD specimens; keep any source values only where they are visibly identified as source evidence.
- **Typography:** use the shared family names and roles for Perfectly Nineties, Suisse Intl, FK Raster and Arabic Naskh/Sans. Align heading, body, label, utility, Arabic line-height and direction examples with the common type guidance; do not invent board-specific font aliases.
- **Components:** align names, anatomy, variants, interaction-state vocabulary and density labels with the component backlog in this plan. A visually similar object with a different name should be reconciled or explicitly described as a distinct pattern.
- **Sources and claims:** preserve source-to-interpretation provenance. Use the same reconstruction status and wording across every board and linked note. Separate verified construction, contemporary adaptation and unresolved study; remove unsupported historical, archival, geometric-certification or ownership claims.
- **Readiness:** give every board and each promoted specimen one visible status: **study**, **draft**, **tested**, or **ready**. Use the same definitions as Gate E. Do not present a study or draft as approved library guidance.

### Board-by-board acceptance

The migration is complete only after all ten older boards and the new integration boards have been reviewed against one shared master and pass the same QA. Record a checklist or review note for each board covering:

1. Canonical tokens, typography roles and component names agree with the shared master; there are no contradictory current-looking instructions.
2. Original Tavus source frames and saved v0.01 files remain intact and identifiable as source snapshots.
3. Every GMD-authored visual has accurate source attribution and a consistent study/draft/tested/ready label; unresolved construction stays labeled as a study.
4. The board opens and exports correctly; typography and RTL examples are legible; key frames have no unintended overlap, clipping, detached annotations or missing assets at presentation scale.
5. The board links back to this plan or its canonical master references, so future edits have one authority.

If an older board is not being migrated, retain it as a clearly dated archive and exclude it from the current system set. Do not silently keep it in circulation as an alternate authoritative reference.

## What the Tavus revisit establishes

Reviewed the saved full-scroll contact sheets for Home, Enterprise, API Platform, Pricing, Research, Vision and Griffin, plus dashboard home, Faces, loaded Voices and advanced settings. Read the component specification, audit, motion notes and Pen export manifest. Luna prepared the route/component gap matrix; Sol reviewed priorities and readiness criteria.

| Tavus composition worth carrying forward | Source evidence | GMD application |
|---|---|---|
| Cinematic and illustrated heroes; quiet centered editorial heroes | Home, Enterprise, Research | Film opening; GMD company pages; collection introductions |
| Framed media windows with title registers, nested panes and offset content | Home sections 03–08; Enterprise; API | Film still/player frame; archive object viewer; linked record preview |
| Unequal image/text splits and alternating section rhythm | Enterprise; Research | Services, collection stories and provenance features |
| Varied feature cards with distinct pastel grounds and small technical graphics | Home; API; Research | Product/service cards and dataset capabilities |
| Tabbed narrative/proof panel with a stable frame | Home captured story tabs | Film genres/collections, service examples, contextual archive views |
| Technical console and diagrams | API; Griffin | Dataset/schema preview, API examples, data lineage and pipeline explanation |
| Dense comparison matrix | Pricing | Service/package comparison; dataset formats and field coverage |
| Long-form article with section navigation, captions and diagrams | Griffin; Vision | Egyptian encyclopedia, Kayffa essays and dataset documentation |
| Image library, search/facets and populated row lists | Dashboard Faces; Voices | Film collection and archive browser; uploaded assets |
| Quiet app shell, settings rows, dialogs and editor stages | Dashboard home/editor/settings | GMD tools, ingest/review workflows and workspace settings |
| Split final calls to action and multi-column footer | Shared public footer | Cross-product discovery and company navigation |

The important missing quality is variation in composition and density. A repeated three-card row with the same medallion cannot supply this breadth. Keep several section rhythms: immersive, split, stacked, inset, tabbed, dense and quiet reading.

Evidence limits: discovered routes are not all inspected pages. Seven public routes have accepted full-scroll evidence; other routes vary in coverage. Blank starter-kit captures are excluded. Static screenshots do not prove animation timing or submit/error behavior. Existing mobile source evidence must be checked separately from desktop and from our own gallery QA. See `../reviews/tavus-component-expansion.md` and `../evidence/inventory.json`.

## Foundation changes before adding more ornament

1. Keep Perfectly Nineties / Suisse Intl / FK Raster, paper, ink, Nile Blue and action pink. Add documented Arabic heading, body and utility styles with appropriate line heights and numeral/bidi handling.
2. Expand color documentation into primitive ramps, semantic roles, interaction states, data visualization roles, and product themes. Specify text/on-color pairings, borders, selected/hover/disabled states and status surfaces. Decorative colors must not silently become status colors.
3. Add an ornament palette derived as a contemporary GMD interpretation: faience teal, terracotta, ochre and pale limestone. Decide exact values through specimens and contrast review. These are optional graphic fills; Nile remains the identity anchor and pink retains its default action role. The supplied Egyptian image is a visual palette reference, not proof of historical pigment values.
4. Define page margins, max widths, reading measure, columns, gutters, stacking, density and media ratios. Use fluid typography between tested breakpoints; preserve minimum utility text and control sizes.
5. Separate editorial emphasis from workspace density. Editorial windows and primary actions use the 5/3/0 hard-depth language; workspace rows and repetitive controls use restrained dividers and shallow/flat surfaces. A hard shadow on every table cell would obscure hierarchy.
6. Specify motion for press, disclosure, modal/drawer, selection, media loading and decorative transitions. Use the saved 150–250ms Tavus control rules as a starting point, not proof of exact live interpolation. Reduced motion should retain clear state changes.

## Geometry: turn the references into named construction families

The book was checked at the supplied PDF pages. Page numbering must retain both PDF index and printed folio.

| Curated reference | Verified identity | Library proposal | Meaningful web uses |
|---|---|---|---|
| Image 1 / PDF p.251 | Bonner Fig.92, printed p.229: angle-based pattern elements across underlying polygon modules | Hexagonal/dodecagonal constructions: acute, median, obtuse and two-point variants. Preserve the selected angle and host polygon in each recipe. | Sixfold feature clusters, 12-sided editorial seals, lattice fields, clipped media corners, border terminals |
| Image 2 / PDF p.277 | Bonner Fig.123, printed p.255: square/octagonal construction variants | Square–octagon family: acute, median, obtuse, reflected and alternating two-point variants | Octagonal media apertures, framed collection tiles, octagon/square border modules, corners and interlocking section graphics |
| Image 3 / PDF p.556 | Fig.490D: eight radial dome gore segments laid flat | Radial gore/fan family: a faithful construction study plus explicitly contemporary sector derivatives | Hero art, radial project overview, segmented cover compositions, animated transitions and poster frames |
| Egyptian reference image | Alternating open flowers/buds, overlapping forms, small rosettes, color bars and chevron registers | Egyptian register family: floral/bud, rosette, overlapping scale, segmented color-bar and chevron bands | Chapter rails, collection spines, cover margins, section transitions, footer friezes and selected category markers |

Fig.490D is not simply a generic flower. The surrounding text describes dome segmentation and warns that a double-curved surface cannot flatten without distortion. A radial web composition is a contemporary adaptation; it must not be described as an exact dome reconstruction.

The Egyptian image can be decomposed into a hierarchy: main floral register, secondary rosette band, thin color register, and chevron boundary. That hierarchy is more useful than placing the entire image behind a page. Compare the visual reference with the supplied Egyptian booklet before attributing a particular motif to a page or artifact.

### Initial breadth, with explicit bounds

Build toward an atlas with eight Fig.92-derived studies, eight Fig.123-derived studies, four radial-gore compositions and eight Egyptian register modules. These are proposed review targets, not already verified assets or prerequisites for shipping core components. Begin with two accepted specimens per family and expand after construction review. Include outline, filled and widened-ribbon treatments where the underlying geometry supports them. Do not promise every pattern is an infinitely periodic repeat: isolated radial forms scale; only verified translation cells tile seamlessly.

Every approved family needs more than a standalone SVG:

- Construction diagram, source page/figure, seed geometry and parameter ranges.
- Isolated motif, repeat cell when applicable, band, corner/end-cap and large field.
- Light/dark and one/two/multiple-color roles; minimum useful size and line weight.
- Border pitch, phase, start/end treatment, joins and collision rules.
- Aperture safe area, focal-point/crop controls and a full-object viewing route.
- Editable Pen paths, canonical SVG, component usage and representative mobile crop.

### Construction and verification method

For polygonal patterns, define the underlying polygons, line origins and crossing angles before expanding by reflection/rotation. Calculate intersections, split segments and clip to the host module. Widen lines with proper joins only after the line construction passes. Build repeats using the actual translation vectors—not by stretching a screenshot into a square.

For interlace, create a crossing graph, assign alternating over/under states, detect conflicts and closed-loop inconsistencies, and test ribbon clearance. Support named presets first. The current fixed panel and previous parity solver do not prove arbitrary-pattern correctness.

For Egyptian registers, construct one measured floral/bud or rosette unit, establish baseline and spacing, create its alternating pair and then define corners and ends. Preserve the open-flower/closed-bud contrast. Keep small source studies separate from the product-colored derivative.

Geometry acceptance: nonempty valid paths; expected rotational/reflection behavior; no accidental duplicates; continuous repeat edges; intentional intersections; visible ribbon gaps; correct joins at small and large sizes. Render at 1× and 2× and compare source, construction and derivative side by side.

## Make geometry affect layouts without breaking usability

| Composition proposal | Structure | Product example |
|---|---|---|
| Octagonal editorial window | Eightfold aperture inside a rectangular framed media component; caption and action outside the crop | Film collection opening |
| Interlocking collection mosaic | Rectangular content grid with octagonal media cutouts and smaller square metadata bays; single-column mobile reading order | Film/Kayffa discovery |
| Radial opening + linear index | Eight gore sectors hold imagery or simple category marks; a parallel accessible list carries labels and links | GMD projects or Kayffa topic explorer |
| Egyptian register narrative | Alternating floral/bud band separates chapters; neutral rectangular text blocks carry stories | Archive essay or Egyptian encyclopedia |
| Lattice reveal | Geometry is confined to a large opening/media field and resolves into a quiet reading surface | Kayffa collection introduction |
| Pattern-to-information section | Expressive polygon field transitions into aligned cards or a plain schema/table | Data portal or service workflow |

Use polygon subdivision and repeated bays to inform visual alignment, but keep DOM reading order linear and responsive grids explicit. Radial navigation is optional enhancement with an equivalent ordinary list. Patterned cutouts must not shrink hit targets or focus rings. Avoid clipping faces, essential artwork, document edges or captions without a full-object alternative.

## Component library backlog

Every family gets behavior, anatomy, size/density variants, state coverage, responsive rules, Arabic rules and accessibility notes. Variant multiplication must be purposeful: do not generate dozens of cosmetic button shapes.

| Group | First release | Follow-on breadth |
|---|---|---|
| Site navigation | Segmented header, product disclosure, mobile menu, breadcrumb, footer | Announcement bar, anchor navigation, multi-column menu, compact sticky mode |
| Workspace | Sidebar, workspace header, page header, toolbar and panel | Resizable split view, inspector, editor stages and save status |
| Actions | Primary/secondary/quiet/icon buttons, link, split action | Button group, destructive confirmation and progress action |
| Forms | Labeled text/search/textarea, select, checkbox/radio/switch, help/error | Combobox, multi-select, date/range, upload/dropzone, grouped settings |
| Discovery | Search/facet toolbar, active-filter chips, card/list toggle, pagination | Command search, saved views, hierarchical filters and result highlight |
| Collections | Media card, record row, collection card, sortable table | Selection/bulk actions, column visibility, expandable row, responsive detail |
| Reading | Article/title block, metadata, source citation, related entities | Contents rail, footnotes, timeline, compare view and annotations |
| Media | Image frame, full/crop modes, caption/source, player shell | Gallery, lightbox, zoom/pan, audio/waveform, missing/blocked-media state |
| Feedback | Inline notice, toast, empty/loading/error/no-results | Progress, upload failure/retry, unsaved/saving/saved, offline state |
| Overlays | Menu, tooltip/popover, dialog, sheet/drawer | Nested flow rules, confirmation, keyboard escape/focus return |
| Marketing sections | Hero, image/text split, feature window, tabs, CTA/footer | Quote/proof, comparison/pricing, carousel, FAQ and diagram section |
| Data and developer | Key/value block, code/schema preview, download control | Tabs for formats, copy feedback, lineage graphic and basic chart/table pairing |

Some follow-on components are GMD requirements rather than observed Tavus behavior. Label them that way. For existing Tavus components, link the actual capture and DOM/style evidence in the component specification. Do not claim a form's validation flow from an idle screenshot.

## Build order and review deliverables

### Gate A — source and gap atlas

Deliver the evidence-backed Tavus component matrix, grouped by unique template rather than route count. Put each candidate beside its GMD adaptation and status: captured / inferred / new requirement. Existing matrix: `../reviews/tavus-component-expansion.md`.

### Gate B — expanded foundation and geometry direction

Create four focused Pen boards: semantic color and type; component anatomy/density; geometric construction atlas; layout/section vocabulary. Add a coded review page with paired source → construction → application examples. Review eight materially different sections, not eight copies of a card. Migrate all ten older GMD boards and the new integration boards through the board-wide consistency gate above, retaining imported Tavus frames and saved v0.01 files as source snapshots. Preserve the current integrated gallery as the comparison baseline until every in-scope board passes board-by-board acceptance.

### Gate C — core web components

Implement navigation, forms, collection controls, media objects, reading structures and feedback first. Give each a stable API and token mapping. Specify controlled state, events and slots; use a common naming scheme across Pen, CSS and runtime. Add explicit RTL and content stress examples to the component catalog.

### Gate D — three vertical product slices

- Film: collection → filters → selected item → media/detail with credits and source notes.
- Kayffa: collection/topic → record → reading/source/related entities.
- Data: search/filter/sort → dataset detail/schema → selected CSV/JSON export with inspected bytes.

These slices reveal missing relationships between components. A production homepage follows once these flows establish the system's range. Encyclopedia reading extends the Kayffa structures; business tools use the workspace primitives. Games may share tokens and identity graphics but need separate interaction requirements.

### Gate E — readiness checks

Check keyboard and pointer, focus visibility/trap/return, reading order, contrast, reduced motion, touch targets and form errors. Test 375px, tablet and desktop with long Arabic/English labels, mixed-direction IDs, no records, many records, missing media and slow loading. Inspect actual exported CSV/JSON/SVG files. Validate SVG geometry and repeats. Use component tests for meaningful behavior and visual regression for state/layout fidelity.

Release a component only when it has a documented contract, native Pen specimen, coded example and accepted critical states. Track separate maturity labels: study / draft / tested / ready. “The screenshot looks good” is not the release criterion.

Use the same four maturity labels for boards. A board is **study** while its content or source interpretation is exploratory; **draft** when its GMD-authored content follows the shared master but lacks full QA; **tested** after visual/export/accessibility checks pass with remaining known limits documented; and **ready** after it passes board-by-board acceptance and contains no conflicting current guidance. A ready board does not upgrade an individual unverified asset or component beyond its own documented status.

Project consumption is another release gate: provide versioned token, component and asset exports; an install/import example; theme override guidance; a change/deprecation policy; and a clean build in a fresh consumer project. Choose the runtime package format after checking the Film/Kayffa/Data project stacks. Validate that two separate products consume the shared package without copying its source or silently forking tokens.

## Efficient execution

Luna handles evidence indexing, asset manifests, deterministic exports and straightforward specimen wiring. Sol handles construction choices, shared component architecture, complex layouts and QA. Batch review by family and use source contact sheets before reopening pages. Revisit live Tavus only for missing behavior; avoid re-extracting the entire dashboard. Use small supported geometry sets with real checks rather than a large unverified procedural library.

## Review checkpoint

The next concrete result should be an expanded component/geometry direction board plus eight section examples. This plan does not change the current system or approve every proposed motif. Review that richer direction before the broad component implementation.

## Execution checkpoint — 4 October 2026

The first expansion implements eight section compositions, framework-neutral interaction controllers, additive ornament/density tokens and a bounded ten-seed geometry atlas with 32 variants. Four new native Pen direction boards accompany the coded review. See `integration/expansion/READINESS.md` for actual maturity and `integration/expansion/QA.md` for verification. This checkpoint does not certify the full follow-on backlog or production consumption in Film/Kayffa/Data.
