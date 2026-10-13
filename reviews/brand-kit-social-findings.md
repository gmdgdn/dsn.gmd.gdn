# Tavus Brand Lite social banner findings

## Inventory and verification

The ZIP at `C:/Users/khorm/Downloads/68defe67290d1a25593c5525_Tavus Brand Lite.zip` contains 36 real assets after excluding macOS metadata: 30 PNG, four SVG and two ICO. The 20 social banner files are all PNG: 10 under `Social Banners/X - General/` and 10 under `Social Banners/Linkedin/`. The ZIP's social banner names match all 20 corresponding paths in [`evidence/brand-kit/manifest.json`](../evidence/brand-kit/manifest.json); byte length and SHA-256 matched for every one. All four social banners that appear to be logo-only still are raster PNGs.

| Channel group | Count | Actual dimensions | Approx. canvas ratio |
|---|---:|---|---:|
| X - General | 10 | 2171–2180 × 726–729 px | 2.98–3.00:1 |
| Linkedin | 10 | 2912–2913 × 728–730 px | 3.99–4.00:1 |

The output sizes vary by a few pixels within each channel group. Choose a single canonical canvas for each template family and normalize placement and safe areas there; do not inherit these minor export inconsistencies as separate layout variants. The files are named with Figma-like `Frame <id>.png` labels but do not include their corresponding editable frame/source document. The archive has no Figma, Sketch, Illustrator, Photoshop or other layered social-template files. The four SVGs are logo artwork only, not editable banner compositions. The existing [`brand-kit-social.png`](../evidence/contact-sheets/brand-kit-social.png) contact sheet labels and previews all 20 exports.

## Composition families visible in the sheet

| Family | Count | Composition read |
|---|---:|---|
| Simple logo lockup on flat cream, black or pink field | 7 | Logo-only canvas with generous negative space; mostly centered. Useful as a basic cover, but offers little message hierarchy. |
| Logo with pixel/path graphic | 2 | Wordmark anchors one end while a bright pixel-like shape carries movement across the open field. |
| Human/retro-window image | 2 | Hands and a small computer-window composition span the horizontal field; pink pixels connect the image to the brand motif. |
| Image-led, grayscale photographic/art background | 7 | Cropped scene spans the canvas, with the lockup either centered or anchored near a corner; some versions darken/desaturate the image for a white mark. |
| 3D object and split tonal ground | 2 | Small dimensional object sits near center with a sharp light/dark division and pixel texture. |

The repeated variants largely change platform canvas, logo position/color, or background treatment. This is a set of finished export alternatives rather than a broad social-campaign template system. There is little evidence of reusable headline/body/call-to-action zones, issue/date labels, quote attribution, product screenshots, carousel sequencing, or story/reel composition rules.

## Layout rules to carry into new editable templates

1. **Start with the platform canvas.** Maintain separate 3:1 X and 4:1 LinkedIn masters, then define a protected logo/focal area that survives profile/avatar overlays and responsive cropping. Keep the focal image or brand mark away from the far edge.
2. **Pick one message hierarchy per layout.** Choose a single dominant element: a short headline, an image, or the wordmark. Keep supporting copy to one compact tier and avoid letting the logo become the only information when the banner is meant to announce a product or idea.
3. **Use three distinct composition templates:** typographic/editorial statement, image-led story with a quiet lockup, and abstract brand field with pixel/3D motif. Vary scale, alignment and image/copy balance within those templates rather than making every banner a logo recolor.
4. **Control contrast by background.** Use the ink mark on light fields and reverse white on dark fields. When placing white over photography, deliberately quiet or darken the image beneath the protected logo zone; avoid placing a mark over busy detail.
5. **Treat texture as one accent.** Pixel spray, grain, grayscale photography and a 3D mark each have a different visual weight. Use one leading texture per canvas and reserve clean space for the logo and any copy.
6. **Build from vectors and editable layers.** Reuse the SVG wordmark/symbol and construct image, color field, pixel motif, text and crop as separate editable objects. Export channel-specific PNGs only at handoff; the supplied social PNGs are references, not template files.

The kit gives useful direction for horizontal brand-cover compositions—especially the pixel-path and quiet image/mark pairings—but it does not establish a complete or directly editable social layout system. A new template should add text hierarchy and safe-area/crop rules while treating these images as visual references, not as source templates.
