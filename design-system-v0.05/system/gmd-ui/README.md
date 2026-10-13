# GMD UI 0.7.0

Owned shadcn source, GMD editorial components and bilingual website patterns, based on the GMD Pen foundations and Tavus reference.

- [Interactive catalog](https://gmd-ui-registry.anagmdgdn.workers.dev/catalog/): 78 entries, including 66 upstream entries/aliases and twelve GMD examples.
- [States and icons](https://gmd-ui-registry.anagmdgdn.workers.dev/catalog/?states=1): action hierarchy, validation, selection, loading and Lucide vocabulary.
- [GMD website templates](https://gmd-ui-registry.anagmdgdn.workers.dev/catalog/?page=home): home, services, data catalog, collection, company and contact.

```sh
pnpm dlx shadcn@latest add https://gmd-ui-registry.anagmdgdn.workers.dev/r/v0.7.0/gmd-all.json
```

Initialize shadcn in a React 19 / Tailwind 4 application first. The registry has 75 install items: 61 primitive modules, collection compositions, public website blocks, page patterns, icons, foundations, optional themes and aliases. See REGISTRY.md for installation and remixing, COMPONENT-REFINEMENT.md for the 61-module styling record, ICONOGRAPHY.md for icons, and QA-REGISTRY.md / INTERACTION-COVERAGE.md for actual verification and limits.

Pen retains earlier masters and representative family boards; native board n0BSfr adds interaction, icon and website composition contracts. The React catalog supplies the runtime examples. Photography remains application-supplied; the existing editable SVG patterns are packaged. Demos use local sample records without a backend.

Pinned 0.6.0 registry endpoints remain available for existing projects. Update owned source deliberately after reviewing your project modifications.
