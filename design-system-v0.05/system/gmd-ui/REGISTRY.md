# GMD UI 0.7.2

An owned-source React 19 / Tailwind 4 system based on the existing GMD Pen foundations and Tavus-inspired editorial grammar.

## Install

Initialize shadcn first in your application. Run from its project directory:

```sh
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add https://gmd-ui-registry.anagmdgdn.workers.dev/r/v0.7.2/gmd-all.json
```

For one component, use https://gmd-ui-registry.anagmdgdn.workers.dev/r/v0.7.2/button.json instead. Each item installs its GMD dependencies and foundations. Existing files are subject to the CLI's conflict prompts; review changes before updating customized components.

## Namespace

Add to components.json:

```json
{"registries":{"@gmd":"https://gmd-ui-registry.anagmdgdn.workers.dev/r/v0.7.2/{name}.json"}}
```

Then use `pnpm dlx shadcn@latest add @gmd/button` or `@gmd/gmd-all`.

## Themes and remixes

Set `document.documentElement.dataset.gmdTheme = "gmd"`, `"film"`, or `"archive"`. Keep the attribute on the document root so portal menus/dialogs inherit the theme. Override semantic roles in your own CSS for new projects; preserve accessible contrast and the focus-ring role. GMD uses pink actions, Nile selection/focus, paper surfaces and ink hard edges. Film uses ink actions and sand surfaces; Archive uses warm surfaces, Nile actions and faience accents. Light mode is supported in this release.

The installed CSS is editable source. Independent project layouts use these roles rather than hard-coded reference colors. Keep future additions on the versioned registry URL until you review a release diff.

## Arabic

Set HTML lang="ar" and dir="rtl"; wrap Radix compositions in DirectionProvider where appropriate. Mada is the UI/heading face, Amiri is the prose face, Handjet is for selective pixel labels. Latin uses Source Sans 3, Source Serif 4 and Handjet. The hosted registry uses open font families; PerfectlyNineties is an optional licensed local brand font and is not distributed. Installed projects bundle the OFL fonts through Fontsource packages, so font loading has no Google Fonts network dependency. The hosted catalog uses the existing self-hosted OFL files.

## Components and graphics

61 upstream UI modules plus DataTable, DatePicker, GMDForm and Typography compositions, the Toast/Sonner alias, a mobile hook and six GMD visual exports. The whole-system item installs 75 source/SVG files plus the upstream license. It also includes GMDIcon, ten public website blocks and PagePatterns, with six navigable GMD reference pages. DataTable and GMDForm are working collection examples, not a backend or a complete business domain.

Import visual exports from your components alias + /gmd: RegisterDivider, CulturalMediaFrame, ProjectFeature, ProvenancePanel, PatternedCover, EmptyState. Three approved existing SVG assets install at the public root; image content is supplied by the application. Props let you change content, artwork, palette and image fit. SVG source files remain editable. Photography is shown in the catalog and is not bundled into consumer components. PagePatterns accepts assetBase (default ./assets); host the referenced photography there or replace the editable sample content. Use onNavigate, onInquiry and onLocaleChange to connect the page shell to your router and contact workflow.

## Architecture

Reference tokens → purpose tokens → shadcn semantic adapter → accessible primitive source → GMD skins → cultural media and page compositions → project theme roles. Registry style injection installs the tokens and skins into the consuming application's configured CSS entry. Component paths respect components.json aliases; public SVG targets are relative to the project root.

## Build / publish

Set GMD_REGISTRY_URL to your registry host before running scripts/build-registry.mjs. It validates the official shadcn registry schema and generates content-bearing JSON, versioned endpoints and current aliases. Run scripts/check-registry.mjs and a clean CLI consumer install before publishing. Use the checked-in Cloudflare Worker static-asset configuration to deploy registry-dist.

## Scope and provenance

Upstream UI behavior remains shadcn/Radix; Combobox uses the current Base UI implementation and Questionnaire/MessageScroller use @shadcn/react. Geometry/assets are the existing approved GMD SVGs; none were redrawn in this phase. Pen has representative editable category boards, not 61 individually drawn component masters. The catalog is a component reference rather than a production company website.

Official references: https://ui.shadcn.com/docs/registry/registry-item-json and https://ui.shadcn.com/docs/components .

## Conversation and pixel fields (0.7.2)

Install `cvi-sections` for CVIQuoteTiles, CVIToolkitTable and CVIActionPipeline plus twelve editable SVG motifs. Quote images are optional: set assetBase or supply items; otherwise placeholders render. Pattern ornaments default to /assets. See CVI-STUDY.md and PIXEL-ATLAS.md for provenance and contracts.
