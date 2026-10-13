# Antigravity prompt: deepen and refine GMD v0.05

Continue the GMD v0.05 work you created. The expanded studio, geometry assets, icons, and product studies are promising. I want greater diversity and much higher polish, but expansion must come from stronger construction and composition—not from generating more files with the same star formula.

Act as a senior art director, design system designer, computational geometry specialist, and frontend engineer. Use the attached Islamic geometry PDF as the primary construction reference. Use the Egyptian PDF if attached; otherwise mark Egyptian studies as provisional contemporary interpretations and request the missing source only when necessary.

Preserve the current work as a snapshot. Create a separate refinement directory. Do not overwrite existing design masters or modify the production Film application. Do not deploy or publish. Focus on web now; keep social and print as later applications of the same rules.

## 1. Audit what actually exists

Inspect your current engine, tokens, generated SVGs, studio, and Film/Kayffa/Data prototypes before changing them. Produce a compact table: claimed feature, actual implementation, evidence, status, and correction. Use the statuses source-verified, contemporary interpretation, working prototype, simulated, and missing.

Do not call the whole system production-grade, mathematically accurate, fully bilingual, or historically reconstructed unless the actual implementation supports the claim. Report visual reviews separately from code inspection and functional tests.

Known issues to investigate and resolve:

- **First priority: fix the broken token contract.** `tokens.css` defines names such as `--gmd-ink` and `--gmd-paper`, while new prototype pages reference undefined names such as `--gmd-color-ink` and `--gmd-color-paper`. Align the naming at the source; audit every `var()` reference against actual declarations. Then visually check backgrounds, borders, text, and hard shadows on every page. Do not mistake authored CSS for successfully rendered styling.
- The current dual-level generator uses independent macro/micro stars with different radial profiles. Its render functions use the same angular orientation. A correct scale constant alone does not reconstruct Fig.448's connected field or its 90-degree relative orientation. Rebuild the underlying primary and secondary tessellations and register them against the plate, or relabel this asset as an original two-scale star study.
- Fig.453's scale is approximately 13.7082, expressible as 4 + 6φ or 7 + 3√5. The 8.4721 value belongs to a different example. Verify the surrounding pages and fix references in code, tokens, studio, and documentation consistently.
- `(i + j) % 2` chooses crossing priority from segment indices. It does not establish alternating over/under order along connected strands. Build and traverse the strand graph, propagate crossing states, and detect conflicts. Calculate clearances using crossing angle as well as band width; index parity is not a general weaving algorithm.
- The current parquet routine interpolates the inner radius of isolated 16-vertex star outlines. At the end it remains nearly a regular 16-gon; it does not become a square grid. Either construct a genuine connected deformation with shared edge constraints or label it honestly as a radial-profile interpolation. This can still become a useful original graphic treatment.
- The Mamluk medallion uses freely chosen radial ratios. Do not call it a reconstruction of Sultan Hasan, Qaytbay, or Fig.421 without verifying the correct source and comparing its structure to the original.
- Verify every printed/PDF page reference. Printed page 175 corresponds to PDF page 197 in this edition; confirm the offset locally. References to printed pages 589–592 are suspect because the construction chapters end earlier. Do not confuse PDF indices with printed folios.
- Verify the claimed Nagwa Abdelkader publication. If you cannot identify it in the actual attached source, remove the attribution. Do not turn an unidentified Egyptian pattern booklet into a named archaeological authority.
- Correct the `Perfectlys Nineties` font name. Load available Latin fonts and define a deliberate Arabic pairing rather than merely listing fonts that are absent.
- Replace invented archival, restoration, nitrate, streaming, institutional collection, and compliance claims with verified metadata or clearly marked demonstration content. Film is a discovery/information project; a design demo must not imply that GMD owns or provides restored films.
- Mark 1920×1080 as Full HD. Offer 3840×2160 if you actually provide a 4K template.

## 2. Establish a coherent visual foundation

Retain the Tavus-derived material language:

- Ink #140206; paper #F7F4EF; warm neutral #EAE5DE; elevated surface #FFFDFB.
- Nile blue #1034A6 as the principal identity color; action pink #FF6183; sand #D5C4A8.
- Thin ink frames, visible black side/bottom depth, hard 5px/3px/0px shadow states, segmented navigation, parallel striped title bars, editorial display type, clean interface type, and raster labels.

Build a complete color system: primitive ramps, semantic roles, interactive states, focus, selection, data visualization, inverse surfaces, status colors, and documented contrast. Green may serve a tested success role; it is not the identity accent. Additional ochre, oxblood, and midnight colors belong to controlled theme roles, not arbitrary individual pages. Treat pigment/material names as inspiration, not scientific color equivalence.

Define typography, spacing, border weights, hard-depth behavior, image grading, graphic density, icon construction, and motion. Use one token source for CSS, SVG, and studio exports. Clearly specify font substitutes and licensing limitations when original fonts are unavailable.

## 3. Build real diversity of geometric families

Select 8–12 genuinely distinct families supported by the PDF. Include a balanced selection of octagon-square, hexagonal, fivefold modular, compound 12/8, dual-level, interlaced, radial/gore, and border constructions where feasible. Keep Egyptian circle-weave, nested-square, pendant, and register systems independently attributed.

Different symmetry counts on one alternating-radius formula do not constitute distinct reconstructed families. Separate a generic radial/star generator from the source-based library.

For each selected family deliver:

1. Source figure and printed/PDF page.
2. Underlying scaffold and construction steps.
3. Repeat cell and lattice vectors, or explicit nonperiodic/radial boundary rules.
4. Finished motif and connected field.
5. Positive/negative, line, fill, band, and interlace treatments where appropriate.
6. Source-faithful master and separately labeled contemporary adaptations.
7. Parameters with constraints and safe ranges.
8. Large expressive, medium editorial, and small optical variants.
9. Geometry validation plus an overlay or side-by-side source comparison.

Not every family needs every treatment. Preserve construction logic rather than forcing unsupported variants. Label unfinished families instead of faking them.

## 4. Turn geometry into layout rules

Create six noticeably different composition grammars:

- Editorial aperture: a quiet reading/media opening derived from a larger scaffold.
- Collection lattice: related content windows, metadata pockets, and grouping based on the lattice.
- Knowledge atlas: geometric relationships with a real selected node/path and a quiet record panel.
- Register/spine: vertical or horizontal chapter rhythm and collection navigation.
- Radial canopy: a focal composition with supporting regions and controlled cropping.
- Quiet utility: forms, tables, search, and long text retain spacing/frame identity with minimal ornament.

For each show the geometry diagram, actual content allocation, desktop and mobile examples, long content, missing image, and Arabic/English behavior. Avoid presenting a full-width wallpaper with a floating rectangular panel as proof that geometry organizes the layout.

Use asymmetry, contrasting densities, open space, selective cropping, and restrained color. Give each composition a clear focal point. Keep reading surfaces calm. Do not place dense linework directly beneath paragraphs.

## 5. Deepen components, images, and icons

Build a polished component specimen page covering navigation, buttons, links, inputs, filters, tabs, cards, record metadata, tables, pagination, dialogs, notices, loading, empty, and error states. Show appropriate hover, focus, pressed, selected, disabled, and validation states.

Develop image guidelines for portrait posters, landscape stills, manuscript scans, documentary photographs, and transparent artifacts. Protect faces, text, and meaningful edges from decorative masks. Offer full-image viewing. Use geometric frames selectively rather than putting every image in a star.

Review the icon collection at 16, 20, 24, and 32px. Fix optical weights, legibility, collisions, and confusing silhouettes. Standard functional icons should remain immediately recognizable. Use richly constructed emblems for project identities or large graphics. Construction-overlay exports are documentation, not additional distinct icons.

Document pattern placement, safe text zones, borders, joints, separators, masks, halftone/dither treatments, and allowable motion. Support reduced motion and keep graphic animation out of essential reading tasks.

## 6. Make the studio a reliable authoring tool

Use the same tested geometry engine in the studio and exported assets. Do not maintain disconnected implementations that produce different shapes.

Every visible control must change the preview correctly or be explicitly labeled unavailable. Implement family selection, safe parameters, scaffold toggle, optical tier, theme, crop, deterministic SVG export, token export, and reset. Make copy actions keyboard accessible and handle clipboard/download failures.

Current examples that need specific repair: the interlace workspace is a static image; the parquet preview selector does not update its download target; social editing fields do not feed the preview or exported SVG; icon scaffolds are a shared generic overlay rather than the claimed icon-specific construction. Implement these connections or clearly label the surfaces as static specimens. Use a source-labeled illustration instead of pretending a simulated graphic is an authentic manuscript scan or film poster.

Downloads must reopen correctly, include the SVG namespace, preserve dimensions and theme, avoid clipped hard shadows, and declare external font/image dependencies. Do not promise self-contained offline use while depending on Google Fonts, remote images, or fetch requests unsupported by file:// access. Supply an honest local-serving instruction if needed.

RTL/LTR switching must preserve proper language semantics. Changing `dir` and `lang` does not translate text. Provide actual English/Arabic content or call the control a direction preview and do not mislabel Arabic text as English. Mirror directional controls where needed, not all geometric art.

## 7. Deliver reviewable web specimens before completing every application

First deliver a refinement board containing:

- Three ambitious but coherent visual directions using the common foundation.
- A comparison of at least six distinct geometric families.
- Three fully composed sections: Film collection, Kayffa knowledge/reading, and Data utility.
- A component/state sheet, image-treatment sheet, and icon scale sheet.
- Desktop and narrow previews with one real Arabic specimen.
- A short account of what is verified, adapted, simulated, and unfinished.

Show rendered previews, not just an asset count or long accomplishment list. Recommend a direction based on usability, construction quality, identity, and adaptability. Stop for my visual review before polishing the entire suite or producing a company homepage.

After approval, complete the chosen system, studio, and product examples. Social and print may then inherit the approved composition rules rather than becoming separate art styles.

## Acceptance checks

Verify exported geometry independently: seams, shared edges, unintended overlaps, strand continuity, alternating crossings, source registration, and valid parameter boundaries. Check the exported files rather than only the engine's internal arrays.

Verify web behavior: meaningful search/filter results, actual download outputs, keyboard/focus, contrast, mobile overflow, long content, Arabic shaping, correct language attributes, reduced motion, and missing-asset fallbacks. Show before/after screenshots and list unresolved issues. Do not report a placeholder alert as a working export or a CSS transform as a complete manuscript viewer.

Start with a concise audit and the first refinement board. Prioritize visible quality and reusable rules. If time is limited, finish a smaller coherent set and disclose the remainder instead of claiming the entire system is complete.
