# GMD public site blocks and page patterns

Composable GMD company-site building blocks are in `src/components/gmd/website-blocks.tsx`; visual rules are in `website-blocks.css`. Public reference pages are assembled in `src/page-patterns/PagePatterns.tsx` with page styling in `page-patterns.css`.

## Exports

- `GMDWebsiteHeader`, `GMDWebsiteFooter`: responsive bilingual site navigation and directory footer. Header accepts `locale`, `page`, `onNavigate`, `onInquiry`, and `onLocaleChange`.
- `GMDEditorialHero`: configurable bilingual media hero with optional action and approved image path.
- `GMDServiceComparison`: reusable service scope comparison.
- `GMDDatasetCatalog`: searchable reference collection catalog; collection actions are passed to `onOpenCollection`.
- `GMDProvenancePanel`: source, attribution, rights and delivery process.
- `GMDProcessTimeline`: collection-to-distribution process sequence.
- `GMDProjectFAQ`: accessible accordion about sourcing, reuse and access.
- `GMDContactForm`: required-field and email validation, unique labels, local-only confirmation; no network or storage behavior.
- `PagePatterns` (also default export): accepts `locale`, `page` (`home`, `services`, `data`, `collection`, `about`, `contact`), `onNavigate`, `onInquiry`, and `onLocaleChange`.

## Assets and behavior

The page patterns reference these existing public assets: `eg-013.webp`, `eg-026.jpg`, `eg-028.jpg`, `eg-034.webp`, `col1-community-heart.jpg`, and `connected-parquet-morph.svg`. Relative image paths suit the public catalog subpath; pass a host-specific path to `GMDEditorialHero.image` when embedding elsewhere. All collection counts and details are labeled as illustrative samples, with rights and source status left explicit. Contact drafts remain in-page and are never transmitted.

Catalog previews and entries are in `src/catalog/Catalog.tsx` and `src/catalog/catalog-data.ts`. App routes are query-addressable through `?view=site-home|services|data|collection|about|contact`; page navigation uses the shared callback.

## QA

`tsc --noEmit` completed successfully. UI verification was not run in this environment.
