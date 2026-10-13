# GMD UI — shadcn adaptation 0.05

This isolated React showcase is the first implementation slice. It preserves the existing static portal and public-site studies. The homepage demonstrates the umbrella GMD company; it is not a production website or a backend integration.

## Architecture

- `../tokens/tokens.json` owns canonical GMD values.
- `../tokens/build.py` generates the existing GMD CSS variables.
- `../tokens/build-shadcn.py` maps those values to shadcn semantic pairs and Tailwind v4 utilities.
- `src/index.css` owns local fonts, GMD component skins, focus, depth and reduced motion.
- `src/components/ui` contains installed upstream shadcn/Radix source with localized changes.
- `src/App.tsx` and `src/showcase.css` compose the public homepage and interactive workshop.
- `public/assets` reuses existing GMD images and patterns. Their provenance/rights records remain in the main asset library; inclusion here does not establish publishing rights.

The adapter deliberately maps shadcn `primary` to the pink action color. Nile remains the separate link, focus and selected-control accent. This does not rename GMD's canonical primary color.

## Local modifications

Square ink rules and 5/3/0-pixel button depth; larger touch controls; Nile selected/focus states; quiet disabled controls; square cards, overlays and badges; Arabic Mada UI/headings, Amiri prose and selective Handjet; Source Sans 3 UI, Source Serif 4 prose and PerfectlyNineties editorial Latin. Dialog/Sheet accept a localized `closeLabel`. No dark theme is defined in this release.

Original installed UI source is archived in `upstream-shadcn.zip`. Before updating, inspect upstream diffs and merge consciously rather than accepting `--overwrite` across the library.

## Reproduce

Use Node 24 and pnpm, with `pnpm-lock.yaml`. Run token generators from the system folder, then `pnpm install --frozen-lockfile` in this folder. Standard scripts are `pnpm dev`, `pnpm build`, `pnpm lint`.

On this machine, the pnpm wrapper performs an unwanted dependency check before scripts. The equivalent verified local-binary commands are:

```powershell
& 'C:\Program Files\nodejs\node.exe' node_modules/typescript/bin/tsc -b
& 'C:\Program Files\nodejs\node.exe' node_modules/vite/bin/vite.js build
& 'C:\Program Files\nodejs\node.exe' node_modules/vite/bin/vite.js
& 'C:\Program Files\nodejs\node.exe' node_modules/eslint/bin/eslint.js .
```

Vite binds only `127.0.0.1:5174`. The production build uses a relative base and can be reviewed through the existing local server at `http://127.0.0.1:8766/design-system-v0.05/system/gmd-ui/dist/`.

## Release boundaries

Public inquiry forms validate locally and show a prototype confirmation; they do not send or save data. This release is a reviewed component slice, not a complete accessibility certification or a distributable registry. Next work: extract approved public blocks into reusable modules, migrate the remaining public pages, and publish a versioned registry only after the shared API stabilizes.
