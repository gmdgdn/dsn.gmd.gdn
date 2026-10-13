# Source component specification

This is a reusable source map for recreating the captured design language. Dimensions below refer to the accepted 1026 × 668 desktop capture unless specified.

## Shared brand primitives

- Warm paper backgrounds (`#f7f4ef`), almost-black burgundy ink (`#140206`), dark neutral text (`#28292a`), warm-gray panels (`#eae5de`), vivid pink (`#ff6183`) and pale pink (`#ffb4c5`). The marketing stylesheet stores these under named custom properties in `tokens.css`.
- Suisse Intl carries most paragraph/interface text. Perfectly Nineties is the editorial display face. FK Raster Grotesk Compact Blended labels the marketing navigation, actions, and overlines. Berkeley Mono labels compact dashboard groups and monospace fields.
- Marketing chrome has square 0px corners, thin dark outlines, hard offsets/shadows, uppercase microtype, and close segmented navigation. The dashboard has mostly white panels, around 1.5px radius controls/cards, softer neutral dividers, and lower contrast in explanatory copy.

## Marketing site components

**Segmented top navigation.** The homepage nav is a compact, horizontally segmented strip with logo, Products, product-section links, Login, and a pink Get Started action. Captured inner nav segments are around 35.8px high; label size is around 10px. Products is a menu disclosure with a multi-column destination menu in source DOM. Links in the homepage DOM are recorded in `01-public-home.dom.txt` and `inventory.json`.

**Editorial hero.** Full-bleed background media or illustration, centered/left editorial serif heading, small raster label, one outlined/pink action, and limited copy. Home h1 in the sampled viewport is 62.78px/400 with 59.64px line-height; other marketing pages vary from about 33px to 71px by template.

**Section eyebrow and display heading.** Tiny raster uppercase overline followed by large serif h2/h3. Homepage examples: roughly 50px h2, 42.12px h2, and 28.54px h3. Body copy uses 16.44px Suisse Intl, generally muted on cream backgrounds.

**Hard-edged CTA.** Pink fill with black border/offset shadow, uppercase raster caption, height about 41.2px. Secondary actions use white/cream fill. Observed computed transitions: background color 150–200ms and transforms 250ms.

**Media feature panel.** Text labels/headings pair with looping muted Cloudflare Stream media. Preserve crop, dark frame treatments, and layout proportions. Media is a captured source asset; the videos themselves are not copied by this asset bundle unless listed in `asset-manifest.json`.

**Tabbed customer story.** Four category tabs alter the proof panel contents (Sales & GTM, L&D, Healthcare, Dream your own); the first state is visible in homepage DOM. Exact alternate states should be taken from subsequent capture evidence before coding them.

## Dashboard components

**App shell and sidebar.** Fixed, pale sidebar about 240.8px wide. Logo at the top; pink New PAL action; core task links; an Assets group; billing promo; API Keys and Support; workspace menu at the bottom. Current item uses a light pink row with pink icon/text. Main viewport scrolls independently from the rail.

**Announcement banner.** Wide photographic/illustrated Griffin strip across the content top with small uppercase monospaced kicker, serif title, two actions, and a close control.

**Page header.** 20px/500 Suisse Intl page title, 14px muted description, and optional docs link. List pages generally put search, filters, and pink create action directly below.

**List/search/filter surface.** White search input with a magnifier and light border; dropdown buttons for facets; compact 14px typography. Tables use a fine neutral divider. Faces use image cards with all/stock/custom tabs, model/sort/tags filters, and system/pro tags.

**Empty-state panel.** Large, softly outlined neutral rectangle with centered line icon, 14–16px medium status line, 14px supporting copy, and optional pink primary button. The captured PALs, deployments, conversations, documents, memories, guardrails, pronunciations, API keys, and video library screens use related variants.

**Dashboard cards.** White backgrounds, hairline border, restrained 1.5px rounding; starter kit cards combine wide video thumbnails, names, 14px/500 heading, line-clamped copy, divider, and Get started link. CSS declares a 2px upward hover shift, 200ms ease-out, and border emphasis.

**Create/edit PAL shell.** Thin top bar with Exit, PAL title, Build/Test/Deploy tabs, and save status. Editor canvas uses pale graph-paper grid, centered content region, Griffin banner where applicable, and floating Charlie assistant card. Create-with-Charlie page uses a large video panel and a secondary type-in path.

**Advanced settings panel.** Centered white dialog over darkened editor backdrop. Single-column rows with setting on the left, current value and chevron on the right, fine horizontal rules, and close icon.

**Test and deploy panels.** Test uses black media canvas with centered missing-face icon/heading/action and a usage line beneath. Deploy uses grouped bordered destination cards: meeting integrations, shareable PAL page, embed/widget, and app integrations; headings use tiny Berkeley Mono uppercase.

**Floating support/Charlie controls.** Charlie appears as a small video thumbnail, status dot, title, and one-line state at the bottom corner. Support opens a centered contact form with email, subject, message, Cancel, and Send; the audited form was not submitted.

Screen states and exact copy are cross-referenced in `DESIGN-AUDIT.md` and their same-number screenshot/DOM/style files. Editable or consequential flows should only be rebuilt from inspected states; empty-state CTAs are captured visually without creating persistent account resources.
