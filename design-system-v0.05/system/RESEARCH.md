# GMD system architecture and library decision

Researched 5 October 2026. This is an adaptation decision, not a claim that any upstream library is already installed.

## Recommendation

Use **Carbon for the system structure**, **shadcn/ui for component ownership and composition**, and **Radix for behavior contracts when implementing future React products**. Keep GMD's Tavus-informed visual language. The current static website and catalog use native HTML controls; no framework migration is needed to organize and improve them.

| Reference | What the official source establishes | GMD adaptation |
|---|---|---|
| [Carbon](https://www.carbondesignsystem.com/getting-started/about-carbon) | A shared core combines foundations, components, patterns, code and guidance; specialist expressions extend it. | One core, with public/editorial layouts and future product/workspace layouts as separate expressions. |
| [Spectrum tokens](https://spectrum.adobe.com/foundations/design-data/design-tokens) | Tokens express reusable decisions, with emphasis on semantic purpose. | Reference values → semantic roles → component bindings; generated CSS from one JSON input. |
| [shadcn/ui](https://ui.shadcn.com/docs) | Component code can be owned, modified, composed and distributed. | Document anatomy, variants, states, usage and source for each GMD component. Do not adopt a second competing visual theme. |
| [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility) and [Direction Provider](https://www.radix-ui.com/primitives/docs/utilities/direction-provider) | Its actual primitives provide semantics, keyboard/focus behavior and direction support. | Specify and test those behaviors. Native demos do not inherit Radix's implementation or accessibility assurance. |

This choice is our judgment about GMD's needs: an Egyptian public company, archives, datasets and future tools need a stable core without forcing every product into the same layout. Carbon's enterprise appearance is not being copied. Tavus supplies visual references, not the engineering library.

## Navigation and responsibilities

1. **Start:** purpose, installation/consumption and system status.
2. **Foundations:** palette/contrast, bilingual type, spacing, grid, depth, motion, icons, responsiveness.
3. **Components:** anatomy, variants, state matrix, behavior, code and checks.
4. **Patterns:** search/filter, source/provenance, contact inquiry, editorial media windows, content relationships.
5. **Templates:** complete GMD public pages; future workspace pages remain separate prototypes.
6. **Assets:** sourced imagery, geometry, illustration, textures, rights/provenance and usage limits.
7. **Governance:** status, owner, change log, migration rules and release criteria.
8. **References:** Tavus captures, earlier boards and external sources, clearly labelled as evidence.

An SVG repeat is an asset. A media window is a component. A composition of media window, heading and CTA is a pattern. A complete Services page is a template. Keeping these categories separate resolves much of the current scattering.

## GMD visual rules

- Retain paper, ink, Nile, shipped pink #FF6183, square frames, thin rules and hard 5/3/0 depth.
- Use Mada for Arabic headings/UI, Amiri for prose, Handjet for selective pixel accents. Keep smaller Arabic heading limits separate from Latin display sizing.
- Use Islamic geometry and Egyptian registers in expressive media/section zones. Keep controls, metadata and dense tables quiet and legible.
- Preserve user-supplied illustrations. Keep intact views available; do not imply an illustration is an authenticated historical reconstruction.
- Use utility icons with a consistent 16/20/24/32px scale. Directional icons follow reading direction; fixed brand depth does not automatically mirror.
- Separate success/error/warning semantics from cultural illustration accents. Pair status color with text and, where useful, an icon.

## Scope of this consolidation

Create an authoritative entry, traceable tokens, documented native components, an asset/legacy registry and an updated Pen source map. Preserve earlier work. Integrate the current public website through a compatibility layer rather than rename or delete all previous files. Framework-specific packages, a Storybook build and production certification remain subsequent implementation work.
