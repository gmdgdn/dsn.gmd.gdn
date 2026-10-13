# GMD Design System — Agent Reference

> This document is written for AI coding agents. It provides everything an
> agent needs to understand, navigate, modify, and extend the GMD Design
> System without requiring human guidance for orientation.

---

## 1. Identity

| Field | Value |
|-------|-------|
| **Name** | GMD Design System (`dsn.gmd.gdn`) |
| **Version** | v0.05 (active); v0.01 (archived reference) |
| **Stack** | React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Radix · Vite 8 |
| **Package manager** | pnpm (v9+) |
| **Registry URL** | `https://gmd-ui-registry.anagmdgdn.workers.dev` |
| **Registry version** | 0.7.2 (current); 0.7.0 and 0.6.0 (pinned) |
| **Languages** | English (LTR) and Arabic (RTL) — bilingual first-class |
| **Deployment** | Cloudflare Workers |

---

## 2. Repository map

### Active working tree

```
design-system-v0.05/system/         ← START HERE
├── tokens/
│   ├── tokens.json                 ← Single source of truth for all design tokens
│   ├── tokens.css                  ← Generated CSS custom properties (do not edit)
│   ├── shadcn.css                  ← Generated shadcn adapter (do not edit)
│   ├── build.py                    ← Token → CSS generator
│   └── build-shadcn.py             ← Token → shadcn CSS generator
│
├── gmd-ui/                         ← React component library
│   ├── src/
│   │   ├── components/ui/          ← 61 shadcn primitives (owned source)
│   │   ├── components/gmd/         ← 12 GMD editorial components
│   │   ├── page-patterns/          ← Full page templates (home, services, etc.)
│   │   ├── catalog/                ← Interactive catalog app
│   │   ├── themes/                 ← Theme configurations
│   │   ├── hooks/                  ← Shared React hooks
│   │   ├── gmd.css                 ← GMD token integration for React
│   │   └── index.css               ← Global styles
│   ├── scripts/                    ← Build & registry tooling
│   ├── public/                     ← Static assets
│   ├── registry.json               ← Registry manifest
│   ├── components.json             ← shadcn component config
│   ├── package.json                ← Dependencies & scripts
│   ├── vite.config.ts              ← App build config
│   └── vite.registry.config.ts     ← Registry/catalog build config
│
├── components.css                  ← Native HTML prototype components
├── components.js                   ← Prototype interaction behaviors
├── system.css / system.js          ← Portal layout & behavior
├── compatibility.css               ← Legacy alias mappings
├── registry.json                   ← Historical inventory
│
├── FOUNDATIONS.md                  ← READ THIS: Token contracts & usage rules
├── COMPONENTS.md                  ← READ THIS: Component catalog & contracts
├── CHANGELOG.md                   ← Version history
├── README.md                      ← Entry-point documentation
├── SHADCN-ADOPTION.md             ← Architecture decisions
├── INVENTORY.md                   ← Migration map
└── index.html                     ← Portal entry
```

### Supporting directories

| Path | Purpose | Agent action |
|------|---------|--------------|
| `evidence/` | Tavus source-site audit: screenshots, DOM captures, CSS extractions, design tokens | Read-only reference. Do not modify. |
| `exports/pen/` | 8 Pencil design-frame HTML+PNG exports with full asset manifests | Read-only reference. Source visual specifications. |
| `reviews/` | QA reviews, refinement feedback, geometry library evaluation | Read for quality criteria. |
| `checkpoints/` | Version milestone archives (zips are gitignored) | Read `.md` milestone docs only. |
| `design-system-v0.01/` | Historical first version | Reference only. Do not extend. |

---

## 3. Token system

### Architecture

```
Reference (palette)  →  Semantic (purpose)  →  Component (control)
   #FF6183           →  --gmd-color-action  →  --gmd-component-button-action-background
```

### Source of truth

**`design-system-v0.05/system/tokens/tokens.json`**

After modifying tokens:
```sh
cd design-system-v0.05/system/tokens
python build.py          # Regenerate tokens.css
python build-shadcn.py   # Regenerate shadcn.css
```

### Key tokens

| Semantic variable | Value | Use |
|-------------------|-------|-----|
| `--gmd-color-surface` | `#F7F4EF` (Paper) | Page backgrounds |
| `--gmd-color-text` | `#140206` (Ink) | Primary text |
| `--gmd-color-primary` | `#1034A6` (Nile) | Links, focus rings, selection |
| `--gmd-color-action` | `#FF6183` (Pink) | Buttons, CTAs |
| `--gmd-color-border` | token-derived | Borders |
| `--gmd-shape-border` | `1px` | Border width |
| `--gmd-component-button-depth` | Hard 5/3/0 offset shadow | Button depth |

### Typography tokens

| Variable pattern | Latin face | Arabic face |
|------------------|-----------|-------------|
| `--gmd-font-heading` | Source Sans 3 | Mada |
| `--gmd-font-body` | Source Serif 4 | Amiri |
| `--gmd-font-accent` | Handjet | Handjet |
| `--gmd-font-display` | Perfectly Nineties | — |

### Arabic sizing rules

- Display headings: ≤60px
- Section headings: ≤44px
- Mobile headings: ≤36px
- Body copy: ≥16px
- Use CSS logical properties (`margin-inline-start`, `padding-block`, etc.)
- Set `dir="rtl"` at document/section level

---

## 4. Component guidelines

### Adding a new shadcn primitive

1. Add the `.tsx` file to `gmd-ui/src/components/ui/`
2. Use GMD tokens via the CSS adapter (not raw hex values)
3. Ensure keyboard navigation and focus management
4. Test both LTR and RTL layouts
5. Update `registry.json` with the new entry
6. Run `pnpm registry:build` and `pnpm registry:check`

### Adding a GMD editorial component

1. Add to `gmd-ui/src/components/gmd/`
2. Include corresponding `.css` file if needed
3. Export from `gmd/index.tsx`
4. Use semantic tokens, not reference values
5. Test bilingual rendering

### Component contracts (from COMPONENTS.md)

All components must document:
- Purpose and anatomy
- Variants and states (default, hover, focus, active, disabled, loading, error)
- Label/help/error semantics
- Keyboard behavior
- EN/AR direction handling
- Responsive constraints
- Reduced-motion behavior

### Style rules

- Pink action buttons use fill + hard depth (5/3/0)
- Nile blue for links, focus rings, and selected controls
- Egyptian decorative assets go in expressive content areas only
- Keep `.gmd-focusable` on elements needing focus rings
- Keep `.gmd-disabled` for visual disabled treatment
- Keep `.gmd-motion` on elements using tokenized transitions

---

## 5. Build & dev commands

```sh
# From gmd-ui/
pnpm install             # Install dependencies
pnpm dev                 # Start Vite dev server
pnpm build               # Production build (tsc + vite)
pnpm lint                # ESLint
pnpm format              # Prettier
pnpm typecheck           # TypeScript check
pnpm registry:build      # Build component registry JSON
pnpm registry:check      # Validate registry integrity
pnpm catalog:build       # Build public interactive catalog
```

### Responsive breakpoints

| Breakpoint | Width |
|------------|-------|
| Mobile | <720px |
| Tablet | 720px–1050px |
| Desktop | 1050px–1600px |
| Wide | >1600px |

### Motion

- All transitions capped at 240ms
- `prefers-reduced-motion: reduce` disables non-essential animation
- State changes must still occur — only motion is suppressed

---

## 6. File modification rules

### ✅ Safe to modify

- `gmd-ui/src/components/ui/*.tsx` — owned shadcn source
- `gmd-ui/src/components/gmd/*.tsx` — GMD editorial components
- `gmd-ui/src/page-patterns/` — page templates
- `gmd-ui/src/catalog/` — catalog UI
- `gmd-ui/src/themes/` — theme configurations
- `tokens/tokens.json` — then regenerate CSS
- `system/*.css`, `system/*.js` — native prototypes
- `system/*.md` — documentation

### ⚠️ Modify with caution

- `gmd-ui/registry.json` — must stay in sync with components
- `gmd-ui/components.json` — shadcn configuration
- `gmd-ui/vite.config.ts` — build configuration
- `compatibility.css` — legacy page aliases

### 🚫 Do not modify

- `evidence/` — audit reference captures
- `exports/pen/` — Pencil source exports
- `design-system-v0.01/` — archived version
- `tokens/tokens.css` — generated file (edit tokens.json instead)
- `tokens/shadcn.css` — generated file

---

## 7. Quality checklist

Before submitting changes, verify:

1. **TypeScript**: `pnpm typecheck` passes
2. **Lint**: `pnpm lint` passes
3. **Build**: `pnpm build` succeeds
4. **Registry**: `pnpm registry:check` passes (if components changed)
5. **Bilingual**: Component renders correctly in both LTR and RTL
6. **Tokens**: No raw hex values — use semantic/component tokens
7. **Keyboard**: All interactive elements reachable and operable
8. **Focus**: Visible focus indicators on all focusable elements
9. **Motion**: Transitions respect `prefers-reduced-motion`
10. **Responsive**: No horizontal overflow at 375px, 768px, 1440px

---

## 8. Key reference documents

| Document | Path | Read when… |
|----------|------|------------|
| Token contracts | `system/FOUNDATIONS.md` | Adding/modifying tokens |
| Component catalog | `system/COMPONENTS.md` | Adding/modifying components |
| shadcn adoption | `system/SHADCN-ADOPTION.md` | Understanding architecture |
| GMD UI readme | `system/gmd-ui/README.md` | Working with React components |
| GMD UI adaptation | `system/gmd-ui/ADAPTATION.md` | Understanding upstream preservation |
| Component refinement | `system/gmd-ui/COMPONENT-REFINEMENT.md` | Reviewing styling decisions |
| Registry docs | `system/gmd-ui/REGISTRY.md` | Publishing to registry |
| Interaction coverage | `system/gmd-ui/INTERACTION-COVERAGE.md` | Understanding test coverage |
| QA reports | `system/gmd-ui/QA.md`, `QA-REGISTRY.md` | Reviewing quality status |
| Design audit | `evidence/DESIGN-AUDIT.md` | Understanding source design |
| Motion notes | `evidence/MOTION.md` | Implementing animations |
| Component spec | `evidence/COMPONENT-SPEC.md` | Understanding component anatomy |
| Project overview | `OVERVIEW.md` | Understanding scope and limits |

---

## 9. Common agent tasks

### "Add a new component"
1. Read `COMPONENTS.md` for contracts
2. Create `gmd-ui/src/components/ui/my-component.tsx`
3. Use tokens from `gmd.css`
4. Test LTR + RTL
5. Update `registry.json`
6. Run build + check

### "Change a color"
1. Edit `tokens/tokens.json`
2. Run `python build.py` and `python build-shadcn.py`
3. Verify downstream consumers still render correctly

### "Add a page template"
1. Read existing patterns in `gmd-ui/src/page-patterns/`
2. Create new pattern using GMD components
3. Test all breakpoints + both languages
4. Update catalog if needed

### "Fix an accessibility issue"
1. Check `INTERACTION-COVERAGE.md` for known gaps
2. Fix in the component source (`components/ui/` or `components/gmd/`)
3. Test keyboard navigation, screen reader labels, focus management
4. Update `INTERACTION-COVERAGE.md`

### "Deploy registry update"
1. Bump version in `package.json`
2. Run `pnpm registry:build`
3. Run `pnpm registry:check`
4. Update `CHANGELOG.md`
5. Deploy via Cloudflare Workers (`wrangler.jsonc`)
