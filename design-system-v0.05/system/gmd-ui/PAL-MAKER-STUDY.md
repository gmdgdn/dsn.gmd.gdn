# PAL Maker → GMD service patterns

Source: https://www.tavus.io/pal-maker, inspected 2026-10-05. Native saved reference: Pen frame `ywTw0`, customization subtree `MhjNG`. GMD specimen board: `C7o9Y4` / `04.04 — PATTERNS / PAL Maker-inspired service explorer`.

## Verified source behavior

- Five vertical selectors synchronize a visual panel with an expanded description. Clicking Personality and Actions changed both selected state and the image.
- Description height transitions use `500ms cubic-bezier(.4,0,.2,1)`.
- Current source selected surface is `#FFF5E3`, inactive surface `#FFDA95`. The saved offerings section uses lavender `#E4E0F2`, ink outlines and green emphasis.
- The source uses small dithered pictorial icons, serif editorial headings, pixel labels, striped window framing and a varied capability card hierarchy.
- Webflow pane duration attributes were zero. GMD’s animated media entrance is a deliberate enhancement, not a measured source behavior.

## GMD translation

`GMDMediaExplorer` composes the existing Radix/shadcn Tabs behavior with an expanding capability list and visual window. GMD’s context is collecting, describing, connecting, preparing and distributing Egyptian material. `GMDCapabilityGrid` adds a six-card hierarchy. Existing photographs and SVG patterns are content examples; no new cultural drawings were generated.

Use Nile selection, ink borders, paper/sand surfaces, a restrained lavender secondary field, Mada Arabic headings, Amiri prose and Handjet selective labels. Keep functional Lucide icons separate from cultural motifs. Reduced-motion users receive immediate state changes without media entrance motion.

## Access

- Working demo: `/catalog/?study=pal-maker`.
- Installable source: registry item `pal-sections`; photographs are caller-supplied media. SVG backgrounds in CSS are embedded by the foundation builder.
- Earlier registry v0.7.0 endpoints remain preserved. The new source addition is v0.7.1.

See `proof/pal-maker` for reference capture, native board export and focused QA evidence. Pen specimens document visual anatomy; working motion lives in the React demo.

Final QA: five responsive/locale/motion runs passed; all five tab clicks and Home/End/ArrowDown passed, no missing images or horizontal overflow. Shared Tabs now forwards orientation to Radix. New Pen section is 09.01 — MOTION & SERVICE SECTIONS. CLI consumer install and consumer TypeScript compile passed. Evidence: proof/pal-maker/qa.json.
