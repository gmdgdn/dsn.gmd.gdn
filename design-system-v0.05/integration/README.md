# GMD v0.05 integration review gallery

Open `index.html` through a local web server. From `design-system-v0.05`, run `python -m http.server 8765` and visit `http://localhost:8765/integration/`. A server lets the studio fetch its SVG source for preview and export.

This gallery is a working visual system review. It combines the Tavus-derived v0.01 foundations with curated v0.05 and Antigravity graphic studies. Current system entry: [../system/index.html](../system/index.html). `../system/tokens/tokens.json` is the canonical token source. This gallery retains legacy `tokens.json` for compatibility; `tokens.css` and the asset manifest are maintained by the asset pipeline in `scripts/build_assets.py`. `system.css` owns the layout, and `app.js` owns the local interactions. See `MANIFEST.md` for source-to-adapted asset mappings and their limits.

The board presents foundations, graphics and imagery, shared components, and Film, Kayffa and Data compositions. Film is media led; Kayffa pairs a graphic opening with a quiet selected record; Data has a local, invented specimen dataset. Search and family filters update the table. CSV and JSON exports contain exactly the visible rows. The English/Arabic control changes document language and direction and pairs the main section copy with Arabic text.

The footer links three PNG previews exported from editable native Pen boards: Foundations, Graphics & components, and Web product compositions. They are visual specifications; the HTML/CSS/SVG gallery is the behavior reference.

The graphics chapter includes an Egyptian pendant register used as a full-width chapter rail. It is an original interpretation of the Egyptian booklet studies on PDF pages 12–16, not an artifact facsimile.

The studio works with three curated SVG files: the medallion study, two-scale field, and interlace panel. It embeds the selected source SVG in a valid standalone SVG document, applies token colors through inherited CSS custom properties, and can add or hide a square scaffold. It scales the source within a 1000 × 1000 artboard. A request revision guard prevents an earlier slow fetch from replacing a newer selection. It does not alter or claim to reconstruct the underlying geometry.

All records, interface messages and compositions here are demonstrations. The poster is local sample imagery carried from the earlier direction review; its source and rights are not verified. The graphic studies are contemporary adaptations as listed in `MANIFEST.md`. Nothing in this board establishes archival ownership, product metrics, or approval for a production homepage.
