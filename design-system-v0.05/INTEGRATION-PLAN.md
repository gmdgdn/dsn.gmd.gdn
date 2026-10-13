# GMD v0.05 — integration plan

## Objective and baseline

Bring the useful Antigravity work into the main GMD design system in this workspace. Use the accepted v0.01 Tavus-derived foundations and the current v0.05 geometry/layout studies as the baseline. Preserve both versions and the external Antigravity snapshot. This document plans the integration; it does not implement it or approve a production homepage.

Create the integration in `design-system-v0.05/integration/`, then expose its review gallery from the main v0.05 entry page. Promote reviewed components into the main library after the visual review. Keep source material and provenance alongside adapted assets.

## What to bring across

| Material | Integration decision | Intended use |
|---|---|---|
| Semantic token roles and compatibility aliases | Adopt the architecture; map values to existing GMD tokens | Shared CSS/SVG/components; eliminate naming conflicts |
| 5/3/0 hard-depth states | Adopt and refine | Buttons, segmented navigation, framed panels |
| Six icons at four authored sizes | Import as candidates; select/refine at actual sizes | Play, search, filter, archive, waveform, entity/node |
| Crossing parity solver | Reuse as an internal construction utility with limited supported cases | Border panels, dividers, selective large graphics |
| Two-scale star field | Import as an explicitly contemporary graphic | Kayffa/Data introductory panels and identity graphics |
| Radial-profile morph field | Import as an explicitly contemporary graphic | Section transitions and selected editorial graphics |
| Mamluk-inspired medallion | Import as an original emblem study | Large cover/detail accents; not everyday UI icons |
| Media aperture presets | Select chamfered and stepped variants, repair frame/shadow behavior | Film images, archive covers, selected collections |
| Quiet utility, editorial, and richer framing directions | Turn into actual composition variants | Film, Kayffa, Data and future GMD products |
| Studio rosette/aperture controls and export approach | Reuse working interaction concepts after shared-engine integration | A small design-system authoring panel |

Do not import accomplishment badges, simulated archival ownership, broken standalone SVGs, unverified historical labels, or the missing acute construction as approved assets. Fix export serialization when adapting otherwise useful assets. Keep unfinished source reconstructions in research rather than delaying the usable system.

## Phase 1 — unify foundations

1. Inventory selected source files, retain their original copies, and record source-to-adapted mappings in a manifest.
2. Establish one canonical token JSON and generate CSS from it. Preserve existing palette ramps; Antigravity's ramp numbering must not silently replace them. For example, retain the current role of Nile #1034A6 rather than changing its scale step from 600 to 700.
3. Add useful semantic roles: canvas/surface, primary/secondary/muted text, borders, selection, focus, action, inverse, and statuses. Compatibility aliases reference canonical roles rather than creating duplicate values.
4. Retain Perfectly Nineties / Suisse Intl / FK Raster for Latin. Create explicit Arabic stacks using locally available Arabic fonts and specimen review; do not globally replace the Tavus typography with Cairo/Amiri.
5. Keep base thin ink frames, warm paper, parallel stripe bars, Nile identity color, pink actions, and 5/3/0 hard depth. Reserve added midnight/oxblood/ochre colors for named product themes with defined roles.

Deliverable: a foundations page showing ramps, role combinations, real fonts, spacing, borders, shadows, and interactive depth states.

## Phase 2 — curate graphics, icons, and images

1. Build an asset gallery with selected patterns, medallions, frames, and all six icon families. Give each an expressive/editorial/utility usage tier and source/interpretation label.
2. Repair SVG entities, namespaces, dimensions, clipping, and deterministic IDs. Parse adapted exports and reopen representative files. Theme inline SVG through shared tokens; offer explicit themed exports for standalone use.
3. Keep the improved parity solver behind supported presets. Add closed-loop/conflict gates where required, then generate one reliable border and one large panel. Expand supported geometry only as needed.
4. Present star fields and morph graphics as modern treatments. Do not call them Fig.448 or connected-parquet reconstructions.
5. Evaluate icons at 16/20/24/32px and choose optically sound variants. Keep familiar functional silhouettes; detailed emblem geometry belongs at larger sizes.
6. Define image treatments for Film posters/stills, Kayffa scans/artifacts, and portal/document previews: full-object view, cover crops, focal-point control, quiet captions, optional dither/duotone, and restrained geometric masks. Preserve text/faces and access to uncropped originals.

Deliverable: a curated graphics/images/icons page with clear placement rules and usable exports.

## Phase 3 — build the common component library

Implement shared shell/navigation, title bars/separators, buttons/links, inputs/search, filter chips/tabs, collection cards, record metadata, tables, pagination, and notice/empty/loading/error states.

Document appropriate hover/focus/pressed/selected/disabled states. Keep clipped imagery separate from rectangular hit targets and focus rings. Define minimal motion through tokens: hard-depth displacement, image/frame reveal, and restrained selection changes, with reduced-motion behavior.

Each component uses canonical tokens and actual language/direction settings. A direction preview does not change Arabic content to `lang="en"`. Prototype search/filter/export behavior may use a small honest local dataset; no production API or invented project metrics are required.

Deliverable: one coherent specimen page with functional representative interactions.

## Phase 4 — demonstrate three product compositions

- **Film / editorial aperture:** a generous media-led collection section, image openings and metadata grouping aligned to an explicit scaffold, readable typography, restrained geometry, and hard-depth actions.
- **Kayffa / knowledge and reading:** a richer framed entry/cover area with medallion or two-scale graphics, followed by a quiet reading surface and a simple related-record selection interaction. Clearly mark drawings as illustrations.
- **Data / quiet utility:** dense legible records, real local search/filter/export, fine rules, accessible states, and minimal ornament.

Use shared components with product theme overrides, not separate copies of each UI. Demonstrate long titles, missing images, and genuine Arabic/English samples. Render the same components at desktop/tablet/mobile widths. These sections demonstrate the system; they are not production product redesigns or the company homepage.

Deliverable: a visual review board connected to the main gallery, showing foundations, assets, components, and the three composed sections.

## Phase 5 — review and promote

Luna can handle inventories, straightforward asset cleanup, token mapping, documentation, and uncomplicated component assembly. Sol should handle visual direction, complex geometry adaptation, integration decisions, and final QA. Keep tasks bounded to save tokens and avoid repeatedly auditing the whole archive.

Review the rendered specimens for hierarchy, diversity, legibility, image treatment, and a recognizable Tavus/GMD identity. Check representative SVG exports, keyboard/focus, actual downloads, language semantics, and responsive overflow. Fix concrete failures without making unsupported geometry perfection a prerequisite for contemporary graphic assets.

After the user's visual review, promote the accepted library into the main v0.05 gallery and documentation. Mirror approved tokens/components/compositions into a separate editable Pen v0.05 document when available, preserving original imports and v0.01 masters. Keep HTML/CSS/SVG as the runtime behavior reference and Pen as the editable visual specification.

## Completion criteria

- One token source; consistent CSS and SVG roles.
- Curated usable graphics and six optically reviewed icon families.
- Shared components with visible interaction states.
- Three distinct product compositions that still belong to one system.
- Desktop/mobile and Arabic/English evidence.
- Honest asset provenance and demonstration content.
- A reviewable main gallery before any production homepage implementation.

Later: extend the approved rules to the GMD homepage, games, encyclopedia, business tools, social, and print. They should inherit the system rather than each introducing another visual language.
