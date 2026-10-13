# Tavus design audit

Audit evidence is in this folder. Screenshots and DOM/style snapshots came from the accepted in-app browser session at a 1026 × 668 CSS-pixel viewport. A viewport-sized capture shows only the screen area visible at capture time; it is not a full-page image.

## Captured screens

| Surface | Evidence files | Visible template and state |
|---|---|---|
| Public home | [01-public-home-viewport.png](01-public-home-viewport.png), [01-public-home.dom.txt](01-public-home.dom.txt), [01-public-home.styles.json](01-public-home.styles.json) | Homepage hero and client logo strip. The hero uses a dark cinematic background, large white serif type, compact segmented navigation, and pink call-to-action. |
| Dashboard home | [02-dashboard-home-top.png](02-dashboard-home-top.png), [02-dashboard-home-top.dom.txt](02-dashboard-home-top.dom.txt), [02-dashboard-home-top.styles.json](02-dashboard-home-top.styles.json) | Authenticated dashboard, Griffin announcement, Charlie tour panel, create-with-Charlie prompt, and starter kit cards. |
| Dashboard PALs | [03-dashboard-pals.png](03-dashboard-pals.png), matching `.dom.txt` and `.styles.json` | PAL collection listing state. |
| Dashboard deployments | [04-dashboard-deployments.png](04-dashboard-deployments.png), matching `.dom.txt` and `.styles.json` | Deployments listing state. |
| Dashboard conversations | [05-dashboard-conversations.png](05-dashboard-conversations.png), matching `.dom.txt` and `.styles.json` | Conversations listing state. |
| Dashboard starter kits | [06-dashboard-starter-kits.png](06-dashboard-starter-kits.png), matching `.dom.txt` and `.styles.json` | Starter kit catalog. |
| Dashboard faces | [07-dashboard-faces.png](07-dashboard-faces.png), matching `.dom.txt` and `.styles.json` | Faces asset library. |
| Dashboard voices | [08-dashboard-voices.png](08-dashboard-voices.png), matching `.dom.txt` and `.styles.json` | Voices asset library. |
| Dashboard knowledge base | [09-dashboard-knowledge.png](09-dashboard-knowledge.png), matching `.dom.txt` and `.styles.json` | Knowledge base / documents surface. |
| Dashboard memories | [10-dashboard-memories.png](10-dashboard-memories.png), matching `.dom.txt` and `.styles.json` | Memories surface. |
| Dashboard connectors | [11-dashboard-connectors.png](11-dashboard-connectors.png), matching `.dom.txt` and `.styles.json` | Connectors and tools surface. |
| Dashboard guardrails | [12-dashboard-guardrails.png](12-dashboard-guardrails.png), matching `.dom.txt` and `.styles.json` | Guardrails surface. |
| Dashboard pronunciations | [13-dashboard-pronunciations.png](13-dashboard-pronunciations.png), matching `.dom.txt` and `.styles.json` | Pronunciation dictionaries surface. |
| Dashboard new PAL | [14-dashboard-new-pal.png](14-dashboard-new-pal.png), matching `.dom.txt` and `.styles.json` | New PAL creation entry point. |
| PAL editor | [15-dashboard-pal-editor.png](15-dashboard-pal-editor.png), matching `.dom.txt` and `.styles.json` | PAL editing template. |
| PAL advanced settings | [16-dashboard-advanced-settings.png](16-dashboard-advanced-settings.png), matching `.dom.txt` and `.styles.json` | Advanced settings state. |
| PAL test | [17-dashboard-editor-test.png](17-dashboard-editor-test.png), matching `.dom.txt` and `.styles.json` | Editor test state. |
| PAL deploy | [18-dashboard-editor-deploy.png](18-dashboard-editor-deploy.png), matching `.dom.txt` and `.styles.json` | Deployment step from the editor. |
| Dashboard billing | [19-dashboard-billing.png](19-dashboard-billing.png), matching `.dom.txt` and `.styles.json` | Free tier, usage meters, coupon disclosure, promotion, and plan section. |
| Dashboard account menu | [20-dashboard-account-menu.png](20-dashboard-account-menu.png), matching `.dom.txt` and `.styles.json` | Workspace/profile menu open. Personal account values are intentionally omitted from this report. |
| Dashboard video library | [21-dashboard-videos.png](21-dashboard-videos.png), matching `.dom.txt` and `.styles.json` | Empty video library and create-video entry point. |
| Dashboard support dialog | [22-dashboard-support.png](22-dashboard-support.png), matching `.dom.txt` and `.styles.json` | Contact-support form. The form was not submitted. |
| Dashboard API keys | [23-dashboard-api-keys.png](23-dashboard-api-keys.png), matching `.dom.txt` and `.styles.json` | Empty API-key state. No key was created or exposed. |
| Dashboard voices loaded | [24-dashboard-voices-loaded.png](24-dashboard-voices-loaded.png), matching `.dom.txt` and `.styles.json` | Loaded system voice table with audition buttons, filters, and New Voice action. |
| Public enterprise | [25-public-enterprise.png](25-public-enterprise.png), matching `.dom.txt` and `.styles.json` | Video-agent product hero. |
| Public API platform | [26-public-api-platform.png](26-public-api-platform.png), matching `.dom.txt` and `.styles.json` | Developer API page hero with role selection and conversation console preview. |
| Public research | [27-public-research.png](27-public-research.png), matching `.dom.txt` and `.styles.json` | Research overview hero. |
| Public vision | [28-public-vision.png](28-public-vision.png), matching `.dom.txt` and `.styles.json` | Vision timeline opening state. |
| Public pricing | [29-public-pricing.png](29-public-pricing.png), matching `.dom.txt` and `.styles.json` | Pricing surface top view. |
| Public Griffin | [30-public-griffin.png](30-public-griffin.png), matching `.dom.txt` and `.styles.json` | Griffin research/product page opening state. |
| Public demo | [31-public-demo.png](31-public-demo.png), matching `.dom.txt` and `.styles.json` | Demo contact page opening state. |
| Public careers | [32-public-careers.png](32-public-careers.png), matching `.dom.txt` and `.styles.json` | Careers page opening state. |
| Public partnerships | [33-public-partnerships.png](33-public-partnerships.png), matching `.dom.txt` and `.styles.json` | Partnerships landing page opening state. |
| Public blog | [34-public-blog.png](34-public-blog.png), matching `.dom.txt` and `.styles.json` | Blog index opening state. |
| Public perspectives | [35-public-perspectives.png](35-public-perspectives.png), matching `.dom.txt` and `.styles.json` | Perspectives article index opening state. |
| Public PAL Maker | [36-public-pal-maker.png](36-public-pal-maker.png), matching `.dom.txt` and `.styles.json` | PAL Maker marketing page opening state. |
| Public AI information | [37-public-ai-info.png](37-public-ai-info.png), matching `.dom.txt` and `.styles.json` | AI information page opening state. |
| Public support | [38-public-support.png](38-public-support.png), matching `.dom.txt` and `.styles.json` | Support destination page opening state. |
| Public accessibility | [39-public-ada.png](39-public-ada.png), matching `.dom.txt` and `.styles.json` | Accessibility statement opening state. |
| Public privacy | [40-public-privacy.png](40-public-privacy.png), matching `.dom.txt` and `.styles.json` | Privacy policy opening state. |
| Public terms | [41-public-terms.png](41-public-terms.png), matching `.dom.txt` and `.styles.json` | Terms of service opening state. |
| Public website terms | [42-public-website-terms.png](42-public-website-terms.png), matching `.dom.txt` and `.styles.json` | Website terms opening state. |
| Public PAL terms | [43-public-pals-terms.png](43-public-pals-terms.png), matching `.dom.txt` and `.styles.json` | PAL supplemental terms opening state. |
| Public Custom Agents solutions | [52-public-solutions.png](52-public-solutions.png), matching `.dom.txt` and `.styles.json` | Solutions overview hero. |
| Public AI interviewer solution | [53-public-ai-interviewer.png](53-public-ai-interviewer.png), matching `.dom.txt` and `.styles.json` | Interview-agent hero; embedded demo/form panel rendered blank. |
| Public AI L&D solution | [54-public-ai-ld.png](54-public-ai-ld.png), matching `.dom.txt` and `.styles.json` | L&D-agent hero; embedded demo/form panel rendered blank. |
| Public AI SDR solution | [56-public-ai-sdr.png](56-public-ai-sdr.png), matching `.dom.txt` and `.styles.json` | AI SDR hero. |
| Knowledge Navigator article | [57-public-knowledge-navigator.png](57-public-knowledge-navigator.png), matching `.dom.txt` and `.styles.json` | Blog article template. |
| Public acceptable use | [44-public-acceptable-use.png](44-public-acceptable-use.png), matching `.dom.txt` and `.styles.json` | Acceptable use policy opening state. |
| Phoenix research article | [45-public-phoenix.png](45-public-phoenix.png), matching `.dom.txt` and `.styles.json` | Phoenix model article opening state. |
| Raven research article | [46-public-raven.png](46-public-raven.png), matching `.dom.txt` and `.styles.json` | Raven model article opening state. |
| Sparrow research article | [47-public-sparrow.png](47-public-sparrow.png), matching `.dom.txt` and `.styles.json` | Sparrow model article opening state. |

| Dashboard voice type filter | [58-dashboard-voice-type-filter.png](58-dashboard-voice-type-filter.png), matching `.dom.txt` and `.styles.json` | Voice filter menu open. |
| Dashboard filtered voices | [59-dashboard-voices-filtered.png](59-dashboard-voices-filtered.png), matching `.dom.txt` and `.styles.json` | User voice filter result. |
| Dashboard new voice dialog | [60-dashboard-new-voice.png](60-dashboard-new-voice.png), matching `.dom.txt` and `.styles.json` | Create voice dialog opened read-only; no resource created. |
| Dashboard add document URL dialog | [61-dashboard-document-url-dialog.png](61-dashboard-document-url-dialog.png), matching `.dom.txt` and `.styles.json` | URL-source dialog; no URL submitted. |
| Dashboard refresh options | [62-dashboard-refresh-options.png](62-dashboard-refresh-options.png), matching `.dom.txt` and `.styles.json` | Refresh schedule options. |
| Dashboard new memory dialog | [63-dashboard-new-memory.png](63-dashboard-new-memory.png), matching `.dom.txt` and `.styles.json` | Memory creation dialog opened read-only. |
| Dashboard new guardrail dialog | [64-dashboard-new-guardrail.png](64-dashboard-new-guardrail.png), matching `.dom.txt` and `.styles.json` | Guardrail creation dialog opened read-only. |

| Dashboard new guardrail form | [65-new-guardrail-form.png](65-new-guardrail-form.png), matching `.dom.txt` and `.styles.json` | New guardrail form state. |
| Dashboard create pronunciation dictionary | [66-new-pronunciation-dictionary.png](66-new-pronunciation-dictionary.png), matching `.dom.txt` and `.styles.json` | Dictionary creation form. |
| Dashboard pronunciation rule | [67-pronunciation-rule.png](67-pronunciation-rule.png), matching `.dom.txt` and `.styles.json` | Add pronunciation rule row state. |
| Dashboard Tools tab | [68-tools.png](68-tools.png), matching `.dom.txt` and `.styles.json` | App tool list. |
| Dashboard New Tool menu | [69-new-tool.png](69-new-tool.png), matching `.dom.txt` and `.styles.json` | New tool menu with App Tool option. |
| Dashboard app tool editor | [70-app-tool-editor.png](70-app-tool-editor.png), matching `.dom.txt` and `.styles.json` | App tool configuration form. |

| Dashboard new conversation | [71-new-conversation.png](71-new-conversation.png), matching DOM and style snapshots | Conversation setup form. |
| Dashboard conversation properties | [72-conversation-properties.png](72-conversation-properties.png), matching DOM and style snapshots | Properties panel state. |
| Dashboard new video | [73-new-video.png](73-new-video.png), matching DOM and style snapshots | Video generation editor. |
| Dashboard video audio settings | [74-video-audio-settings.png](74-video-audio-settings.png), matching DOM and style snapshots | Audio upload/record settings. No upload or recording performed. |
| Dashboard starter employee onboarding | [75-starter-employee-onboarding.png](75-starter-employee-onboarding.png), matching DOM and style snapshots | Starter kit example preview. |

## Brand assets

The provided Brand Lite archive is extracted and hashed in [brand-kit/manifest.json](brand-kit/manifest.json); see [BRAND-KIT.md](BRAND-KIT.md) for the source and reconciliation notes. The official logo SVGs confirm ink `#140206` and white reverse marks, matching the live marketing palette. The kit adds dark/light logo and symbol variants, favicons, two 3D marks, and social banners. It has no font files. Reviewed previews: [logos and symbols](contact-sheets/brand-kit-logos.png), [social banners](contact-sheets/brand-kit-social.png), and [recent dashboard form and tool states](contact-sheets/dashboard-new-states.png), plus [conversation and video states](contact-sheets/dashboard-new-conversation-video.png).

## Visual system findings

The public marketing site and PAL Maker dashboard share brand colors and some typography, while using different hierarchy and spacing. The marketing site has an editorial, intentionally compact Webflow layout with square edges; the dashboard is a denser application interface with a fixed left rail, readable 14–16px interface text, very small corner rounding, and clear pink/green status accents.

The public page uses Suisse Intl for body text, Perfectlynineties for display headings, and FK Raster Grotesk Compact Blended for navigation, labels, and button captions. In the sampled page, the hero heading was 62.78px, large section headings about 50px, body copy about 16.44px, navigation and button labels about 10px, and eyebrow labels around 6.85px. The principal sampled colors are ink `rgb(20, 2, 6)`, charcoal `rgb(40, 41, 42)`, pink `rgb(255, 97, 131)`, paper `rgb(247, 244, 239)`, warm white `rgb(255, 253, 251)`, warm gray `rgb(234, 229, 222)`, and muted text `rgb(78, 76, 71)`. Every one of the 180 sampled public elements had a 0px border radius. Observed transitions include background color at 150ms, text color at 200ms, and transforms at 250ms.

The dashboard uses SuisseIntl with system sans fallbacks, BerkeleyMono for code-like content, and PerfectlyNineties as an occasional display face. The captured 1026px desktop viewport has a 240.8px fixed sidebar. Its samples include foreground `rgb(68, 64, 58)`, muted text `rgb(99, 97, 98)`, surfaces `rgb(255, 255, 255)` and `rgb(252, 252, 252)`, pink `rgb(241, 76, 112)`, pale pink `rgb(255, 240, 244)`, ink `rgb(18, 2, 6)`, and bright tour green `rgb(122, 255, 151)`. Typical page headings are 32px/500, body and button text 14px, sidebar text 16px, and compact labels 12px. Sampled card radii are 1.5px. Starter cards lift 2px and strengthen their border on hover; primary dashboard buttons lift 2px and gain a stronger shadow over 200ms.

Across dashboard sections, the information architecture is held by a fixed left rail, a persistent Griffin banner, compact page title and helper copy, then search/filter controls and a bordered content area. Empty resources share an icon above concise status and a centered pink action. The Faces library uses photographic tiles and filters; Connectors switch between Connectors and Tools and group integrations by category. Create and editor screens replace the left rail with a thin top bar and faint square grid, with Build/Test/Deploy tabs and a floating Charlie helper. The advanced settings state is a white centered sheet over a dimmed editor. The voices screenshot is a skeleton/loading state, so it does not prove an empty voice library.

Machine-readable computed samples are collected in [design-tokens.json](design-tokens.json), with namespaced CSS variables and available local fonts in [tokens.css](tokens.css). Original public asset URLs map to files under [assets](assets) via [asset-manifest.json](asset-manifest.json). The dashboard has a separate local bundle under `assets/dashboard` with mappings in [dashboard-asset-manifest.json](dashboard-asset-manifest.json). Public bundle capture saved 81 assets and reported 22 fetch failures. Dashboard capture saved 50 assets and reported 9 failures. The public bundle could not fetch its WOFF2 fonts, but Pen HTML export references resolved to the source document asset cache. FK Raster Grotesk Compact Blended, Perfectly Nineties, and Suisse Intl binaries are now saved under `assets/public-fonts`; Berkeley Mono and medium dashboard variants remain under `assets/dashboard`. File hashes and family-to-file mapping are in [font-provenance.json](font-provenance.json).

The extracted stylesheet declarations are archived in [css-extraction.json](css-extraction.json). Public CSS variables include `--primatives--pc-plastic-1: #f7f4ef`, `--primatives--hardware-gray-9: #28292a`, `--primatives--bubbletech-4: #ff6183`, and `--primatives--terminal-black: #140206`, plus warm, lilac, blue, orange, and green tones. Dashboard CSS declares `--primary: 347 85.5% 62.2%`, `--foreground: 36 7.9% 24.7%`, `--terminal-black: 347 80% 4%`, a light green primary-button color, and radii of 0px, 1.5px, 3px, and 5px. Captured stylesheet keyframes cover live pulse, shimmer, accordion/collapsible opening and closing, typing dots, Charlie's status pulse, added-row wash, share ghost states, composer open/close, intro rise, row entry, spin, pulse, bounce, enter/exit, and caret blink. The stylesheet includes motion durations from 75ms to 55s; sampled public UI transitions are 150–250ms, while app controls commonly transition over 150–200ms. The transition durations used for decorative long-running animation are retained verbatim in the extraction JSON and [MOTION.md](MOTION.md) distinguishes declarations from states seen in screenshots.

Heading samples across the captured public pages include 62.78px and 71.34px editorial H1s, section headings around 50px, 42.12px, 33.10px, and 28.54px, with 400 weight in Perfectly Nineties. The API and product pages also use around 52px and 64.26px H1s. Dashboard list pages use 20px/500 SuisseIntl H1s, the home/create flow uses 32px/500, one section header uses 24px/500, and the Charlie card uses 30px/400 Perfectly Nineties. The full heading sample list is [typography-samples.json](typography-samples.json).

## Coverage and limits

`inventory.json` is the route-by-route source of truth. It merges URLs discovered in every saved page style snapshot and DOM link set, and separates pages with screenshot evidence from linked paths that have not been visited. The current discovery pass contains 246 public same-host paths and 34 dashboard path/query variants; many public paths are individual blog articles, author pages, categories, or legacy destinations. These paths do not all represent unique page designs: captured article examples document the editorial article template, while the route inventory keeps every discovered URL visible. Captures include the homepage and major product, research, pricing, policy, blog index, solution, and model-article templates. Some newly linked routes may still be in progress while root finishes the sweep; consult the inventory for current status rather than treating the route count as completed coverage.

Nine starter-kit detail screenshots currently on disk are blank white images and are explicitly marked rejected in inventory; their DOM/style snapshots remain available for route discovery. The employee-onboarding example has valid top and four sequential section captures. The authenticated dashboard has captured its distinct list, library, editor, billing, API-key, video, and dialog states. Creation dialogs were inspected without submitting or creating resources. The attempted 390 × 844 in-app viewport override remained at 1026 × 668 and is retained as rejected mobile evidence. A separate responsive capture is pending; this audit does not claim mobile verification until valid viewport evidence exists. Some external link destinations and dynamically embedded forms may be unavailable in the captured state. The interviewer and L&D demo panels appeared blank, so their form interactions remain unverified. Interactions are documented only when a corresponding state has screenshot/DOM/style evidence.

The account menu screenshot contains workspace identity details; those values are intentionally omitted here. No API key was created, no file or URL was uploaded, and no payment or account setting was changed. The support form was not submitted.

## Long-page section review

The homepage, Enterprise, API Platform, Pricing, Research, Vision, and Griffin have sequential viewport captures through their footers. The contact sheets in `contact-sheets/` were visually reviewed against every numbered source frame for these seven routes. The screenshots show consecutive page sections with consistent sticky navigation, illustration/video blocks, framed media, hard-edged cards, and repeated footer treatment; no blank or unrelated source frames appeared in those sweeps. These contact sheets summarize original captures rather than replacing them. The four customer-story tabs on the homepage also have their alternate content states captured. This gives full scroll-section evidence for the seven listed routes at desktop; other captured routes still have only an opening viewport unless separate section files are listed in the inventory.

For the screenshot contact maps, see [home](contact-sheets/home-sections.jpg), [Enterprise](contact-sheets/enterprise-sections.jpg), [API Platform](contact-sheets/api-platform-sections.jpg), [Pricing](contact-sheets/pricing-sections.jpg), [Research](contact-sheets/research-sections.jpg), and [Vision](contact-sheets/vision-sections.jpg). Griffin frames are reviewed in [sheet one](contact-sheets/griffin-sections-1.jpg) and [sheet two](contact-sheets/griffin-sections-2.jpg). `inventory.json` records each section filename and the rejected desktop-sized mobile attempt.

The captured dashboard contains workspace-authored starter templates. The audit records their screens and makes no changes to the signed-in account or its resources.
