# GMD system v0.05 — current entry

Open `index.html` through the local preview server. This portal is the current navigation and documentation authority. Earlier galleries and Pen boards are retained references, not competing component libraries.

## Source hierarchy

1. `tokens/tokens.json` — reference values → semantic roles → component roles.
2. `tokens/build.py` → `tokens/tokens.css` — generated browser bindings.
3. `components.css` and `components.js` — native HTML prototype primitives and behavior demonstrations.
4. `FOUNDATIONS.md`, `COMPONENTS.md` — usage and implementation contracts.
5. Existing integration patterns, imagery and six GMD public pages — compositions using the core.
6. `registry.json`, `INVENTORY.md` — historical inventory and migration map.

`compatibility.css` maps previous public-site aliases to the current tokens. It is consumed by the six public previews; earlier experimental galleries retain their original styling and link back here.

## Status and contribution

Reference = inspiration or historical work. Prototype = implemented local example. Reviewed = checked against recorded criteria for a specific version. Deprecated = retained for migration; do not extend. A working demo alone is not a production or accessibility certification.

Before promoting a component: document purpose, anatomy, variants, interaction states, label/help/error semantics, keyboard behavior, EN/AR direction, responsive constraints, reduced motion, and test evidence. Use semantic/component tokens rather than copied palette values. Keep decoration in media and expressive sections; preserve quiet, legible controls.

Update canonical tokens first, regenerate CSS, then review the component catalog and public consumers. Record a change in `CHANGELOG.md`. Do not update source Tavus captures or recreate user-owned illustrations.

## Adoption

The structure is informed by Carbon; component ownership by shadcn/ui; keyboard/focus/direction contracts by Radix. The main documentation portal uses native HTML and local JavaScript. `gmd-ui/` now contains an isolated React/TypeScript/Tailwind v4 consumer with actual shadcn/Radix source, a bilingual component workshop and a GMD public homepage. See `gmd-ui/ADAPTATION.md` for architecture, upstream preservation, commands and release boundaries. The native demos remain reference studies rather than imported React components.

## Pen

Active document: `C:/Users/khorm/.pencil/documents/8b4c9a2a-091b-4893-b343-951b27b66afc/pencil-new.pen`.

| Board | ID | Role |
|---|---|---|
| Start / source map | NtHnB | Current index |
| Research / adoption | k3lAUc | Architecture and source links |
| Semantic bilingual foundations | SSwwg | Current roles |
| Controls / state contracts | kgeTa | Current editable action and field masters |
| Earlier company families | XVnke | Retained reference specimens |

PNG exports are in `pen-exports/`. Editable action master: `c7CpJ`; field master: `l24OGB`. Web behavior is demonstrated in the portal; canvas instances are visual specifications. The Pen geometry inspector reports clipping for auto-layout specimens even though the rendered screenshot is clean; inspect the live board before further layout edits. Upstream browser embeds were not verified after a timeout.
