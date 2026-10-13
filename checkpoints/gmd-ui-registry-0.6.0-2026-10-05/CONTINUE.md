# GMD registry release checkpoint

Completed GMD UI 0.6.0: full current shadcn source catalog, GMD compositions, project themes, public registry and representative Pen board.

Workspace: design-system-v0.05/system/gmd-ui.

Catalog: https://gmd-ui-registry.anagmdgdn.workers.dev/catalog/

Install in an initialized shadcn React / Tailwind 4 project:

```sh
pnpm dlx shadcn@latest add https://gmd-ui-registry.anagmdgdn.workers.dev/r/v0.6.0/gmd-all.json
```

Read REGISTRY.md, QA-REGISTRY.md and PEN-REGISTRY.md in the implementation directory. Pen board Hbta7 is complete; export: proof/pen-registry/Hbta7.png. Previous boards remain intact.

Snapshots: checkpoints/gmd-ui-registry-0.6.0-2026-10-05. Source archive includes sibling tokens for rebuilding. Published archive preserves registry-dist. Dependency caches and private Pen binaries are excluded.

Next: consume this system in the GMD public multipage website, then create Film/Archive remixes from semantic project roles. Use user-authored graphics and approved SVGs. Preserve older source boards. Bump the registry version for future changes, test a clean CLI consumer before publishing, and retain 0.6.0 endpoints for existing imports.
