# UI template QA

Status: public GMD company site is now the priority. The earlier six-template set is retained as deferred design drafts. Checks below describe observed local specimen behavior, not product-stack integration.

## GMD public website checkpoint — 2026-10-04

| Page | Desktop 1280 | Mobile 375 | Behavior |
| --- | --- | --- | --- |
| [Company](gmd/index.html) | No horizontal overflow or broken images; Source Sans 3 heading and Source Serif 4 body computed; supplied building visible in frame | No horizontal overflow or broken images; English and Arabic hero headlines now correctly show one at a time | Arabic switch sets `lang=ar`, `dir=rtl`, Mada heading and Amiri paragraph; mobile Menu opens and Escape closes with focus returned. |
| [Services](gmd/services.html) | Seven service articles; no overflow or broken images; supplied building visible | No overflow or broken images; Arabic heading/body render with Mada/Amiri | Navigation routes to company anchors and contact; Arabic mode persisted across page navigation in the observed session. |
| [Contact](gmd/contact.html) | No overflow or broken images | No overflow or broken images; source image and form layout visible | Empty review marks four required fields and focuses Name. A valid local demo shows success with explicit “not sent or stored.” Arabic heading/form label and Mada/Amiri font roles checked. |

Static check of launcher and all three public pages: every local `href`/`src` resolves, no duplicate IDs, and all images have `alt` attributes (one decorative image intentionally has empty alt). `node --check gmd/public.js` passes. Proof images: `proofs/gmd-home-desktop.png`, `proofs/gmd-home-mobile.png`, `proofs/gmd-services-desktop.png`, `proofs/gmd-contact-mobile.png`. The local form has no backend; actual delivery, complete bilingual copy coverage, and consumer integration remain unverified.

**Resume state:** CUA browser ID 6, agent tab ID 2; last page `gmd/contact.html` in Arabic mode. Temporary responsive viewport override was reset. The older six-template QA below is retained for later separate work.

| Surface | 1280 px | 375 px | Interaction / content check |
| --- | --- | --- | --- |
| Launch index | No overflow or broken images; Source Sans 3 heading computed | No overflow or clipped headline | Seven navigation targets, including typography, are present. |
| Marketing | No overflow or broken images; Source Sans 3 heading / Source Serif 4 paragraph computed | No overflow; headline and CTAs fit | Arabic switch sets `lang=ar`, `dir=rtl`, Mada h1 and Amiri paragraph; desktop hero SVG contrast and mobile Escape were sent for correction. |
| Collection | No overflow or broken images; source-led grid visible | No overflow; source cards and notes fit | Search unmatched query gave `0 / 4`, Figures filter gave `2 / 4`, source-note disclosure opened. |
| Editorial | No overflow or broken images; article/TOC/source visible | No overflow; fresh reload showed legible title and reading text | Source-image contrast and product-facing article copy sent for correction. |
| Dataset | No overflow or broken loaded images; local G3 records visible | No overflow; dense controls fit beside icon rail | Search returned one record and a zero-result state; illustration filter returned four, list toggle and page 2 worked. Deferred draft. |
| Intake | Not rechecked after final copy | No overflow or broken loaded images | Required title and source validation held the current step; valid values advanced to review. Submission result untested; deferred draft. |
| Insights | Not reviewed | Not reviewed | Deferred draft. |

Static check: all seven HTML files had existing local `href`/`src` paths and no duplicate IDs at the time of the check; `node --check ui.js` and `node --check workspace.js` passed. Repeat after the agents' final edits. The six pages are independent HTML/CSS/JS adaptations; no OpenSourceUI React component source was copied.

New gate: the public GMD site must lead with the company mission and have usable Home, About, Products, Services, Data and Contact routes/sections. Film, Kayffa, Wikipedia, Tools, Games and Datasets should appear as GMD products and project links, rather than pages pretending to be those products. Prioritize this IA and its desktop/mobile/Arabic checks; workspace drafts remain available but outside primary review. Do not describe any surface as product-ready until consumer integration is tested separately.

## Arabic public-site continuation — 4 October 2026

Home, Services and Contact now have Arabic page copy, navigation/footer labels, image descriptions, accessibility labels and metadata. Rich headings preserve line breaks. Arabic hero uses its own font size and measure; stylesheet/script URLs are versioned to refresh cached files. User graphics and older drafts remain unchanged.

Root browser checks: homepage at 1280 and 375 has no horizontal overflow; Arabic heading uses Mada and paragraphs use Amiri. Services at 378 has no overflow or broken images, and headings/lists/footer links are translated. Contact Arabic invalid review shows a required topic inline error. Switching language clears feedback while preserving fields; valid review gives Arabic local-only confirmation. Mobile Arabic menu Escape closes. JavaScript syntax passes. Proofs: proofs/gmd-home-ar-desktop.png and proofs/gmd-home-ar-mobile.png. Sol agent was unavailable due usage limit; root performed these checks.

Next: review the GMD public company composition with the user. Contact remains a local prototype with no message delivery. No new Pen import this phase; older project/workspace drafts remain deferred. Do not resume illustration recreation.

## Premium multipage phase
See PREMIUM-DIRECTION.md for six-page EN/AR responsive checks, interaction results and known preview limits. Static references, IDs and attributes passed; public.js and premium-shell.js syntax passed.

