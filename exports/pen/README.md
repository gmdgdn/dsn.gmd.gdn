# Pen source-page exports

Open [index.html](index.html) for the eight exported source frames, color-token swatches, and PNG previews. `manifest.json` records source node IDs, page URLs, frame dimensions, output sizes/hashes, and limitations. `asset-manifest.json` lists every explicit local font/image URL in the HTML exports; all **184 of 184** references resolve to files shipped beside each page.

The original `.pen` file was accessed only via the Pencil MCP. It was not edited or read as a raw file. Each folder contains `index.html`, local `fonts/` and `images/` resources, and a `png/` frame overview. The empty source frame `bi8Au` was excluded. PNG exports are proportionally scaled to an 8192px maximum height for very tall imported pages.

The HTML is static Tailwind markup; interactive behavior, animation playback, and responsive runtime behavior remain to be implemented and QAed.
