# Pen export QA

Reviewed the eight visual exports under this folder against the captured Tavus design audit. These are generated layer exports from the Pen document, with one HTML rendering and one PNG overview per frame. The source `.pen` document was not modified for this review.

| Export | HTML | PNG | Design frame size in generated HTML |
|---|---:|---:|---:|
| [Homepage](homepage/index.html) | Yes | [PNG](homepage/png/A0DZwY.png) | 1304.8 × 11117 px |
| [CVI](cvi/index.html) | Yes | [PNG](cvi/png/nLmug.png) | 1304.8 × 12965 px |
| [Vision](vision/index.html) | Yes | [PNG](vision/png/BlyMq.png) | 1304.8 × 14307 px |
| [PAL Maker](pal-maker/index.html) | Yes | [PNG](pal-maker/png/ywTw0.png) | 1304.8 × 9105 px |
| [Pricing](pricing/index.html) | Yes | [PNG](pricing/png/OJZH3.png) | 1884.8 × 9455 px |
| [Blog index](blog-index/index.html) | Yes | [PNG](blog-index/png/i8Rbt.png) | 1884.8 × 45081 px |
| [PALs article](blog-pals-ai-avatars/index.html) | Yes | [PNG](blog-pals-ai-avatars/png/I5dm6.png) | 1884.8 × 12367 px |
| [Memories article](blog-memories/index.html) | Yes | [PNG](blog-memories/png/M2dVVM.png) | 1884.8 × 11534 px |

## Checks and findings

- All eight `index.html` files are nonempty and all eight PNGs are nonempty. Each PNG is 8192px high. The dimensions show proportional downsampling of tall frames, rather than a cropped first 8192px: for example, the 1884.8 × 45081 blog frame became a 343 × 8192 overview. Use the HTML or source Pen file for fine visual detail.
- All **184 per-page relative font and image references** extracted from `url(...)`, `src`, and `href` in the eight HTML files resolve to files inside their respective export folders. They correspond to 122 unique source files reused across frames. The brand fonts, including FK Raster Grotesk Compact Blended, are packaged. The repaired [asset manifest](asset-manifest.json) confirms 184 reference occurrences and zero missing files.
- Visual inspection of the Homepage overview confirms the broad source composition: segmented navigation, editorial hero, PAL anatomy panel, feature grid, customer tabs, model cards, and pink footer. The page belongs to the same design family recorded in [the source audit](../../evidence/DESIGN-AUDIT.md). The export is a Pen design artifact; matching composition does not certify pixel fidelity to the live Tavus site.
- All eight HTML files contain **zero `<a>` and zero `<button>` elements**. Their graphics and text are arranged in positioned `div`/SVG layers. Navigation, tabs, dialogs, forms, animation, and dashboard behavior are therefore not implemented by this export. The HTML includes a Tailwind CDN dependency, so an offline HTML preview may differ unless Tailwind is bundled or the generated classes are compiled.
- These eight frames cover public marketing/editorial designs only. They do not include the signed-in dashboard. The wider [workspace overview](../../OVERVIEW.md) and [source inventory](../../evidence/inventory.json) describe the dashboard evidence and source-capture limits; neither the Pen export nor the audit constitutes a finished interactive recreation.

## Next validation for a coded recreation

Compare each implemented page at its intended frame width and at a normal browser viewport. Confirm font load, image crop, section order, responsive breakpoints, links and actions, keyboard focus, and reduced-motion behavior. Test the authenticated dashboard separately against its captured states. Keep the Pen HTML as a visual reference rather than treating it as production page logic.
