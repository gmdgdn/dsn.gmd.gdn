# dsn.gmd.gdn — GMD Design System

A comprehensive, bilingual (English / Arabic) design system built on
**shadcn/ui + Radix + Tailwind CSS v4**, with an editorial Egyptian-inspired
visual language, a complete design-token pipeline, and a hosted component
registry.

---

## Quick start

```sh
# 1. Clone
git clone https://github.com/gmdgdn/dsn.gmd.gdn.git
cd dsn.gmd.gdn

# 2. Install the React component library
cd design-system-v0.05/system/gmd-ui
pnpm install

# 3. Dev server (Vite)
pnpm dev

# 4. Build for production
pnpm build
```

### Consume from the registry

In any React 19 / Tailwind v4 project with shadcn initialized:

```sh
pnpm dlx shadcn@latest add \
  https://gmd-ui-registry.anagmdgdn.workers.dev/r/v0.7.0/gmd-all.json
```

---

## Repository structure

```
dsn.gmd.gdn/
├── design-system-v0.05/          ← CURRENT version
│   ├── system/                   ← Core system
│   │   ├── tokens/               ← Design tokens (JSON → CSS pipeline)
│   │   ├── gmd-ui/               ← React/shadcn component library (v0.7.2)
│   │   │   ├── src/components/ui/   61 primitives (button, dialog, table…)
│   │   │   ├── src/components/gmd/  12 GMD-specific (CVI, PAL, website blocks…)
│   │   │   ├── src/page-patterns/   Full page templates
│   │   │   └── src/catalog/         Interactive component catalog
│   │   ├── pen-exports/          ← Pencil canvas PNG exports
│   │   ├── proofs/               ← Visual QA proofs
│   │   ├── components.css        ← Native HTML component prototypes
│   │   ├── components.js         ← Prototype behaviors
│   │   ├── system.css / system.js
│   │   ├── FOUNDATIONS.md        ← Token contracts & usage
│   │   ├── COMPONENTS.md         ← Component catalog & contracts
│   │   └── CHANGELOG.md
│   ├── deep/                     ← Egyptian/Islamic pattern research & atlas
│   ├── integration/              ← Legacy page integration layer
│   ├── research/                 ← Source material research & extraction
│   └── examples/                 ← SVG pattern studies
│
├── design-system-v0.01/          ← Historical v0.01 (reference only)
├── design-system-v0.05 copy/     ← Historical snapshot
├── design-system.v0.01/          ← Earlier prototype
│
├── evidence/                     ← Source-site audit captures
│   ├── assets/                   ← Scraped CSS/images/fonts
│   ├── mobile/                   ← Mobile viewport captures + DOM/styles
│   ├── contact-sheets/           ← Section-by-section comparison PNGs
│   └── brand-kit/                ← Logos, social banners
│
├── exports/pen/                  ← 8 Pencil frame HTML+PNG exports
│   ├── homepage/  vision/  pricing/  cvi/  pal-maker/
│   ├── blog-index/  blog-memories/  blog-pals-ai-avatars/
│   └── manifest.json             ← Hashes and provenance
│
├── reviews/                      ← QA reviews & refinement notes
├── checkpoints/                  ← Versioned ZIP archives (gitignored)
│
├── OVERVIEW.md                   ← Evidence scope & QA checklist
├── CHECKPOINT-*.md               ← Version milestone documents
└── .gitignore
```

---

## Design tokens

Three-layer architecture: **Reference → Semantic → Component**.

| Layer | Example | Purpose |
|-------|---------|---------|
| Reference | `--gmd-ref-pink-500: #FF6183` | Raw palette values |
| Semantic | `--gmd-color-action: var(--gmd-ref-pink-500)` | Purpose-driven aliases |
| Component | `--gmd-component-button-action-background` | Control-specific bindings |

```css
/* Usage */
.primary-action {
  color: var(--gmd-component-button-action-text);
  background: var(--gmd-component-button-action-background);
  border: var(--gmd-shape-border) solid var(--gmd-color-border);
  box-shadow: var(--gmd-component-button-depth);
}
```

### Brand palette

| Token | Value | Role |
|-------|-------|------|
| Paper | `#F7F4EF` | Primary surface |
| Ink | `#140206` | Primary text |
| Nile | `#1034A6` | Links, focus, selection |
| Action Pink | `#FF6183` | CTAs, primary actions |
| Charcoal | `#28292A` | Secondary text |

### Typography

| Role | Latin | Arabic |
|------|-------|--------|
| Headings / UI | Source Sans 3 | Mada |
| Long reading | Source Serif 4 | Amiri |
| Pixel accents | Handjet | Handjet |
| Display / brand | Perfectly Nineties | — |

---

## Component library (gmd-ui v0.7.2)

**61 primitive UI components** + **12 GMD editorial components** built on
shadcn/ui and Radix, with bilingual (LTR/RTL) support.

### Primitives (`src/components/ui/`)

Accordion · Alert · Alert Dialog · Aspect Ratio · Attachment · Avatar · Badge ·
Breadcrumb · Bubble · Button · Button Group · Calendar · Card · Carousel ·
Chart · Checkbox · Collapsible · Combobox · Command · Context Menu · Dialog ·
Direction · Drawer · Dropdown Menu · Empty · Field · Hover Card · Input ·
Input Group · Input OTP · Item · Kbd · Label · Marker · Menubar ·
Message · Message Scroller · Native Select · Navigation Menu · Pagination ·
Popover · Progress · Questionnaire · Radio Group · Resizable · Scroll Area ·
Select · Separator · Sheet · Sidebar · Skeleton · Slider · Sonner · Spinner ·
Switch · Table · Tabs · Textarea · Toggle · Toggle Group · Tooltip

### GMD components (`src/components/gmd/`)

CVI Sections · PAL Sections · Website Blocks · Data Table · Date Picker ·
Form · GMD Icon · Typography · Index

### Page patterns

Full bilingual page templates: Home, Services, Data Catalog, Collection,
Company, Contact.

---

## Bilingual support (EN / AR)

- Arabic headings: Mada (≤60px display, ≤44px section, ≤36px mobile)
- Arabic prose: Amiri (≥16px body)
- Layout uses CSS logical properties (`margin-inline-start`, `padding-block`)
- RTL via `dir="rtl"` at document/section level
- All components tested for reading-order correctness

---

## Development

### Token pipeline

```sh
cd design-system-v0.05/system/tokens
python build.py          # tokens.json → tokens.css
python build-shadcn.py   # tokens.json → shadcn.css adapter
```

### Component library

```sh
cd design-system-v0.05/system/gmd-ui
pnpm dev                 # Vite dev server
pnpm build               # Production build
pnpm registry:build      # Build the component registry
pnpm registry:check      # Validate registry integrity
pnpm catalog:build       # Build the public interactive catalog
```

### Registry hosting

The registry is served via Cloudflare Workers at
`gmd-ui-registry.anagmdgdn.workers.dev`. Pinned version endpoints (v0.6.0,
v0.7.0) remain available for existing consumers.

---

## Architecture decisions

| Decision | Rationale |
|----------|-----------|
| shadcn/ui ownership model | Full source ownership — components are copied in, not imported as packages |
| Radix primitives | Accessible keyboard/focus/ARIA contracts out of the box |
| Tailwind CSS v4 | Native CSS cascade layers, simplified config |
| Three-layer tokens | Carbon-inspired; allows theming without touching components |
| Separate marketing / app themes | Public pages use editorial style; dashboard uses clean interface style |
| Egyptian/Islamic pattern research | Cultural visual identity grounded in documented source material |

---

## Evidence & audit trail

The `evidence/` directory contains a reference audit of the Tavus marketing
site used as the original design inspiration. See [OVERVIEW.md](OVERVIEW.md)
for scope, coverage limits, and the QA checklist.

- **29 of 246** discovered public routes captured
- **17 of 34** dashboard routes captured
- Desktop viewport: 1026×668 CSS pixels
- Mobile coverage: unverified (see OVERVIEW.md)

---

## License

Private repository. All rights reserved.
