# GMD × shadcn adoption decision

Researched 5 October 2026. This is an implementation plan; shadcn has not been installed. The current workspace contains static HTML previews, not an initialized React/Tailwind application.

## Recommendation

Build a GMD-owned React component layer from official shadcn source. Use semantic CSS-variable theming plus centralized component variants. Retain the upstream primitive behavior; customize the visual contract once in the owned components. Compose GMD-specific content blocks above that layer.

Start with a small React + TypeScript + Tailwind showcase beside the existing system portal. Vite is a practical default for this isolated library proof; the eventual public-site framework can consume the same components. Select one primitive base consistently. Radix is the recommended initial base for continuity with our prior accessibility/direction research. Use a current RTL-capable style such as radix-nova and verify the installed CLI configuration before adding components.

Do not mechanically convert all historical galleries. Prove the core on one real GMD public page first.

## 1. GMD tokens remain authoritative

Generate a shadcn adapter from `tokens/tokens.json`; do not maintain another manually copied palette. Keep `tailwind.cssVariables: true`. The adapter exposes shadcn's background/foreground pairs to Tailwind; reference values continue to belong to GMD.

| shadcn role | GMD role |
|---|---|
| background / foreground | paper canvas / ink text |
| card and popover / foreground | raised paper surface / ink |
| primary / primary-foreground | action pink / ink |
| secondary / secondary-foreground | warm surface / ink |
| muted / muted-foreground | warm surface / muted readable text |
| accent / accent-foreground | pale Nile selection / dark Nile |
| destructive | semantic error |
| border | ink editorial rule |
| input | dedicated readable control-border role |
| ring | Nile focus |
| radius | zero for editorial controls and panels |
| sidebar roles | separately mapped surface, selected, text and focus pairs |

Important mismatch: GMD's existing `primary` color means Nile, while shadcn's `primary` is commonly the high-emphasis action. The adapter should intentionally map shadcn primary to GMD action pink. Preserve separate GMD link/selected-control roles so links, checkbox selection and focus do not all become pink. Customize those component variants explicitly.

Charts need a dedicated accessible categorical palette and labels; do not reuse illustration colors blindly. Dark mode is a later explicit theme, not an automatic inversion of the paper system.

## 2. Visual customization belongs in shared components

- **Button:** pink/ink default, paper outline, quiet Nile link, destructive variant. Square 1px edge, hard 5px rest / 3px hover / 0 pressed depth; consistent displacement so pressing does not shift surrounding layout. Disabled controls lose depth; loading uses a spinner, disabled state and a stable label.
- **Input and Field:** consistent height and internal padding, visible label, helper/error description and Nile focus ring. Use error text as well as color. Avoid aggressive shadows on every field.
- **Card:** quiet record panel and expressive editorial variants; source, rights and status are distinct content roles. Apply hard depth selectively.
- **Tabs/selection controls:** Nile selection treatment with readable text; preserve the primitive's state and keyboard APIs.
- **Dialog/Sheet/Popover/Menu:** shared paper surfaces, ink borders and restrained hard depth. Keep focus handling, title requirements and trigger contracts. Explicit direction reaches portalled content.
- **Separator:** retain ordinary semantic separators. Build a separate decorative register/separator block for multi-line Tavus-inspired rules or Egyptian bands; decorative details are hidden from assistive technology.
- **Typography:** Source Sans 3 for Latin controls; PerfectlyNineties editorial display; Source Serif 4 reading. Mada for Arabic headings and controls, Amiri for Arabic prose, Handjet only for selective pixel accents. Do not apply Amiri to every small UI label.

Use named variants in the component source. Page-level className should handle composition and layout, not repeat brand color/font/shadow overrides.

## 3. Arabic is a first-class implementation requirement

Enable RTL before component generation. Use DirectionProvider and correct document lang/dir. Use logical spacing/positioning and inspect portal content direction. Mirror directional icons, not buildings, photographs, numerals or every glyph. Dates, record IDs and URLs need explicit LTR isolation within Arabic text.

Verify mixed-language content, headings with long strings, tabs, keyboard arrows, menus, sheets, pagination and calendar layouts. shadcn documents special migration steps and a directional animation limitation for portal content; enabling RTL alone is not a complete test.

## 4. Two expressions share one core

**Public/editorial:** spacious sections, serif/Mada headlines, image-and-pattern compositions, register bands, hard CTA depth and Tavus-like modular navigation/footer framing.

**Product/workspace:** compact controls, quiet surfaces, structured tables, filters and metadata. Egyptian identity can appear in empty states, cover media and restrained separators without reducing task readability.

Create GMD-specific blocks: PublicHeader, PublicFooter, SplitHero, CollectionFeature, ProjectCard, ServiceStep, DatasetPreview, SourceRightsPanel, PatternBand and InquirySection. Use our existing images/SVGs with provenance; keep illustrations user-owned. shadcn supplies the controls, not GMD's visual storytelling or page content.

## 5. Implementation sequence

1. Initialize the isolated React showcase and verify framework/base/style/aliases through the CLI. Import the canonical generated tokens and local fonts.
2. Add official Button, Field, Input, Textarea, Card, Badge and Separator. Customize central variants and show default/hover/pressed/focus/disabled/loading/error states in EN and AR.
3. Add NavigationMenu, Sheet, Accordion, Dialog, Tabs, Select, Popover, Checkbox, RadioGroup, Switch and Sonner as needed by the public site. Preserve upstream composition.
4. Build one complete public GMD page with the existing imagery, patterns, project cards and substantial footer. Review desktop/mobile and Arabic before migrating the other five pages.
5. Add advanced workspace components only when actual product needs justify them: Combobox, Command, data tables, date pickers and charts.
6. Version the stable library. If projects share a monorepo, use a shared UI package. If repositories are separate, distribute vetted components/blocks via a GMD registry with an explicit version/update process.

Record upstream versions and local changes. Inspect CLI dry-run/diffs before accepting updates; do not overwrite GMD customizations. Mirror reviewed variants in Pen and mark stale visual specimens clearly.

## Review gates

Build/type checks; target-page screenshots at mobile/tablet/desktop; EN/AR content expansion; keyboard/focus/escape behavior; labels and errors; no broken visible media; contrast by state; reduced motion; tests against the actual selected primitives. Avoid claiming production accessibility from visual similarity.

## Official sources

- [Introduction / source ownership](https://ui.shadcn.com/docs)
- [Theming / semantic pairs and CSS variables](https://ui.shadcn.com/docs/theming)
- [RTL / generation and migration limits](https://ui.shadcn.com/docs/rtl)
- [Configuration](https://ui.shadcn.com/docs/components-json)
- [Shared UI in a monorepo](https://ui.shadcn.com/docs/monorepo)
- [Custom registry distribution](https://ui.shadcn.com/docs/registry)
