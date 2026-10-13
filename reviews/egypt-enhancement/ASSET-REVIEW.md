# Egypt inspiration asset review

## Inventory and handling

The source folder contains **37 image files**: 21 under `graphics/` and 16 under `images/` (19 JPG, 14 WEBP, 4 PNG). Every image appears on one of the four numbered contact sheets. The manifest records original path and filename, source subfolder, decoded dimensions after EXIF orientation, raw dimensions before EXIF orientation, byte size, SHA-256, and the safe-name review copy. Copies use IDs `EG-001`–`EG-037`; originals were left untouched. A byte/hash check passed for all 37 copies.

- [Asset manifest](asset-manifest.json)
- [Contact sheet 01 — EG-001–EG-012](contact-sheets/contact-sheet-01.png)
- [Contact sheet 02 — EG-013–EG-024](contact-sheets/contact-sheet-02.png)
- [Contact sheet 03 — EG-025–EG-036](contact-sheets/contact-sheet-03.png)
- [Contact sheet 04 — EG-037](contact-sheets/contact-sheet-04.png)
- Review copies: [assets/](assets/)

The descriptions below are visual observations from the supplied images. Filenames are retained as supplied, not independently verified catalog records. They do not establish date, authorship, subject identity, publication, location, or reproduction rights. Several filenames make stronger claims than the image alone can confirm. Treat these as design references until the underlying collections and rights are checked.

## Visual findings and useful examples

| IDs | What is visible | Design-system / component opportunity |
|---|---|---|
| EG-001, EG-006, EG-007, EG-013 | Tall printed covers with centered title/subject, fine rules or line-art frame; EG-013 has Arabic display lettering and a monochrome portrait. | Cover and title-card specimens; define frame inset, title block, image area, and bilingual title alignment as distinct slots. EG-001/006/013 are especially legible portrait-format references; EG-007 is landscape and uses a central figure with smaller side panels. |
| EG-002, EG-011 | First-day mail pieces with stamps, cancellation marks, Arabic/Latin text, and compact illustration. | Archive record detail: source image alongside date, issuer, language, medium, and provenance metadata. The overlays are useful examples for annotation hierarchy, not for UI decoration. |
| EG-003, EG-008, EG-010, EG-012, EG-016, EG-017, EG-019 | Tourism/travel print pieces. Several combine a strong illustrated/photographic field with small supporting copy, maps, or borders. EG-010 is a near-square, high-color illustrated spread; EG-012 and EG-016 are tall, graphic posters; EG-019 is a landscape postcard with a picture window and ornamental frame. EG-017 is visibly an American travel brochure using Egyptian imagery, so it is a comparative reference rather than evidence of Egyptian design provenance. | Collection landing/hero composition, media-card aspect-ratio variants, editorial split layouts, and caption treatments. EG-019 is a useful framed-image pattern; EG-003 is useful for a picture/text split. Preserve each image’s natural ratio in the viewer and use a crop position control for cards. |
| EG-004, EG-018, EG-022 | Highly patterned surfaces: a colorful radial/medallion calendar (EG-004), a dark calligraphic panel with repeated architectural silhouettes and angular framing (EG-018), and a green ornamental Arabic magazine cover (EG-022). | Motif research and optional decorative accents. Use these as visual references for border rhythm, dense/sparse contrast, and radial balance; do not trace culturally specific calligraphy or ornamental details into generic UI chrome. |
| EG-005, EG-009, EG-014 | Tall, illustration-forward pieces with geometric or repeated border structure. EG-005 has a narrow architectural composition and large wordmark; EG-009 is a blue field with dense hand lettering and a triangular top/bottom rhythm; EG-014 is a portrait game card with an illustrated face and bright ornamental border. | Poster/card specimen with robust text-safe areas, image bleed, border toggle, and legible display title. EG-014’s game-card framing can inform a clearly labeled playful variant, not the default archive card. |
| EG-015, EG-020, EG-021, EG-023 | Portrait images/cards with limited contextual information in the pixels; EG-020 and EG-021 show similar framed portraits with different color borders. EG-023 is a photographed print with a group portrait and pyramid background. | Paired image-variant comparison, archive caption/provenance slots, and uncertainty state for incomplete metadata. Don’t infer person identity or the subject of EG-015/023 from filenames alone. |
| EG-024–EG-037 | Primarily historical-looking photographs: posed portraits, group/venue scenes, sport, a television studio, an artist/workshop, an archaeological close-up, a city view, and field work. The contact sheets show mostly sepia/monochrome treatments, variable contrast, and borders/mounts on some prints. | Image viewer states for portrait/landscape, archival border, grayscale/aged source, zoom, and caption placement; editorial story module that puts description and source metadata next to the image. Prefer contextualized archival use over a decorative background. |

The most actionable examples for layout studies are **EG-003 / EG-019** (split and framed compositions), **EG-005 / EG-010 / EG-012 / EG-016** (poster hierarchy and image-led title areas), **EG-004 / EG-018 / EG-022** (pattern density and edge treatment), **EG-002 / EG-011** (annotation-rich archive pieces), and **EG-026 / EG-027 / EG-034 / EG-036** (group, venue, workroom, and city-scene photography). These are reference IDs, not endorsements that the images are cleared to ship.

## System implications

- Add a media frame primitive with `contain` as the archival default, explicit `cover` for cropped catalog cards, a configurable focal point, and a visible original/zoom affordance. The set ranges from very tall posters (e.g. EG-005 at 664×1600) to landscape mail pieces (EG-011 at 1600×956), so one fixed ratio will discard useful composition.
- Treat title, caption, date, source, language, and rights/provenance as separate metadata fields. Keep Arabic and Latin text alignment/direction independently configurable. EG-002/011/013/018/022 visibly reward language-aware layouts, but the images alone cannot verify transcriptions.
- Keep ornament as a controlled optional treatment. EG-004, EG-018, and EG-022 show dense edges; the calmer framed pieces EG-006/019 show how a margin can let content breathe. Do not place decorative borders over archival details.
- Provide image-viewer states for missing metadata, low-contrast scans, large portrait artwork, landscape scans, and grayscale/aged sources. Don’t use historical image wear as an automatic CSS filter: visible wear belongs to the supplied scan.
- Separate direct historical references from comparative or thematic material. The contact sheets include at least one clearly Cleveland-branded travel piece (EG-017) and other images whose connection to Egypt is not established by the image content alone.

## Limits

This is a visual inventory of local files, not an archival or rights audit. There are no source URLs, acquisition records, verified captions, dates, photographer credits, or licenses in this review. Small text was not transcribed. Some scans have visible wear, low contrast, cut-off framing, or unclear context. The contact sheets use fitted thumbnails, so inspect the numbered original review copy before judging fine typography, texture, or legibility. No source image was edited; only copies and contact sheets were created.
