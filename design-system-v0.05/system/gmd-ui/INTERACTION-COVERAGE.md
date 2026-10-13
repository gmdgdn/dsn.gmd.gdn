# Interaction and component-state coverage

This is a verification contract for the 61 UI source modules, four public composed controls (Data Table, Date Picker, Form, Typography), Toast alias and six GMD editorial compositions. A matrix row is a required review surface, **not a claim that every state passed**. The JSON audit report records each executed assertion and failure separately. Rendering in 12 environments does not prove keyboard, screen-reader, touch, contrast or every prop variant correctness.

## Reproduce

Start the existing local Vite source consumer with `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4177 --strictPort`, then run `node scripts/interaction-audit.mjs http://127.0.0.1:4177/catalog.html`. It launches its own headless Chromium and accepts only localhost URLs. It imports existing bundled Playwright; set `PLAYWRIGHT_MODULE` to an installed `playwright/index.mjs` on another machine. It does not attach to the user's browser, install dependencies, publish or modify component source.

Results: `scripts/interaction-audit-results.json`. Nonzero exit means failed assertions or a runner error. The detailed rows distinguish environmental rendering checks from interaction checks. Review source changes against this matrix before publishing; rerun against the final built consumer as well as source. Run `scripts/interaction-audit-pages.mjs` with the same URL for the six website pages; its report is `scripts/interaction-audit-pages-results.json`.

The 0.7 static catalog at `/design-system-v0.05/system/gmd-ui/registry-dist/catalog/` passed **977/977** assertions on 2026-10-05: 78 catalog entries in 12 locale/theme/width environments (936 render assertions) and 41 focused interaction assertions. The six website pages passed **28/28** assertions: 24 page renders across English/Arabic and desktop/mobile, plus data filtering/navigation, contact form validation/recovery, keyboard navigation and console checks. The audit includes state-board invalid, disabled, mixed checkbox, slider thickness, RTL/LTR switch thumb travel, popup Escape/focus, menu selection, OTP paste, keyboard resize, and questionnaire required/back behavior. These counts describe executed assertions, not every matrix state below.

## Shared state contract

Every applicable interactive component needs resting, pointer hover, keyboard focus-visible, active/pressed, disabled, invalid/error, loading, empty and long-content review. Disabled controls must not activate or enter normal tab order. Field invalid styling and `aria-invalid` must agree; errors must have a stable associated ID. Name icon-only actions. Labels must focus their controls. Verify contrast without relying on color alone, zoom/reflow, reduced motion, and RTL logical edges.

Every popup needs trigger keyboard activation; initial focus; expected Tab behavior (trapped for modal dialogs, free for nonmodal popovers); Escape; close action; focus restoration; outside interaction; stacking/nested popup behavior; accessible name and description; disabled trigger; edge collision and mobile scrolling. Menu and listbox roles differ from dialog roles; use their own arrow-key/typeahead contract. A screen-reader pass and touch drag are manual checks beyond this headless runner.

Environment sweep: GMD, Film, Archive × English LTR / Arabic RTL × 1280px / 390px. The runner measures page overflow for every catalog sample. Theme portal inheritance, content direction and localization must also be checked while popups are open; resting render coverage alone cannot establish those.

## Per-module matrix

| Module | Specific states and composition checks | Keyboard / interaction contract |
|---|---|---|
| accordion | Single/multiple, open/closed, collapsible, disabled item, lengthy content | Enter/Space expand; arrows/Home/End move triggers; `aria-expanded`, content association |
| alert | Default/destructive, icon/no icon, title/description, multiline | Informative role; no accidental tab stop; alert announcement without repetition |
| alert-dialog | Closed/open, destructive confirmation, cancel, nested portal | Trigger Enter; initial safe action focus; Tab trap; Escape/cancel restore; confirm closes |
| aspect-ratio | 4:3/16:9/portrait, image/video, absent media | Ratio preserved, alternative text, no unnecessary focus, responsive media |
| attachment | Pending/uploading/done/error, image/file, disabled remove | Named remove action Enter/Space; state announcement; removal result; no decorative icon name |
| avatar | Loaded/failed/delayed image, initials, groups/count | Fallback retained, image alternative text, no tab stop unless linked |
| badge | Default/secondary/destructive/outline, long labels, linked badge | Link/action semantics when interactive; status distinguishable beyond hue |
| breadcrumb | One/many levels, truncation, current page, RTL separator | Links keyboard reachable; current `aria-current`; separators decorative |
| bubble | Incoming/outgoing, variants, multiline, reactions | Reaction toggles expose pressed/count state and accessible name |
| button | All variants/sizes, icon placement, disabled/loading, asChild link | Enter/Space once; focus ring; disabled no activation; loading named status |
| button-group | Horizontal/vertical, separators, attached controls, pagination bounds | Each control reachable; group name; previous/next preserve bounds |
| calendar | Single/range/multiple, outside/today/disabled days, month/year navigation, locales | Roving date focus; arrows/Home/End/PageUp/PageDown; Enter/Space selection; disabled days excluded |
| card | Full header/title/description/content/footer/action, long text/media | Heading hierarchy, distinct actions; no whole-card nested links |
| carousel | Horizontal/vertical, loop/nonloop, zero/one/many slides, controls | Previous/next bounds; arrows; visible slide movement; drag/touch; RTL direction; named region |
| chart | Area/bar/line, tooltip/legend, empty data, multiple series, narrow width | Accessible data alternative; hover/focus tooltip; legend labels; reduced animation; no zero-size chart |
| checkbox | Checked/unchecked/indeterminate, disabled/invalid, label | Space toggles; `aria-checked` including mixed; label click; disabled inert |
| collapsible | Open/closed, disabled, long content | Enter/Space; `aria-expanded`; focus retained when content closes |
| combobox | Empty/populated/filtered/no results, single/multiple, clear, disabled/invalid | Input typing, arrows/Home/End, Enter selection, Escape, `aria-expanded`/active descendant; clear returns focus |
| command | Groups/separator/shortcut, filtered/no results, disabled items, dialog palette | Typing filters; arrows select; Enter action; Escape palette; shortcut labels do not promise unimplemented keys |
| context-menu | Pointer/keyboard opening, item/check/radio/submenu, disabled | Right click; Shift+F10/Menu key on focusable target; arrows/typeahead; Escape restores; check/radio result |
| dialog | Open/closed, long content, nested menu, hidden title if needed | Enter trigger; Tab trap; Escape/close/outside policy; named dialog; restore trigger |
| direction | LTR/RTL nested scopes, portals, mixed bidi identifiers | Direction inherited by primitives and portals; arrows follow expected RTL convention |
| drawer | Bottom/side, snap points, scroll content, nested, closed/open | Focus trap/restore, Escape, close; touch drag threshold; scroll versus drag; title/description |
| dropdown-menu | Item/checkbox/radio/submenu, disabled, separators | Enter/Space trigger; arrows/typeahead; Enter action; Escape restores; check state persists |
| empty | Icon/media, description/action, long localized message | Named clear/retry action; meaningful empty reason and next action |
| field | Vertical/horizontal/responsive, group/set/legend, invalid/disabled | Control label association; error description ID; field and control states agree |
| hover-card | Closed/open, link trigger, delayed opening, interactive contents | Focus opens equivalent info; Escape; pointer travel retains card; touch alternative |
| input | Text/email/password/number/file, empty/filled, readonly/disabled/invalid | Label association, edit/select/delete, native validation, placeholder not sole name |
| input-group | Start/end addons, button/icon/text, textarea, invalid/disabled | Addon click focuses input; internal button named and reachable; no nested labels/buttons |
| input-otp | Empty/partial/complete, invalid/disabled, grouped digits, paste | Digit input/paste, max length, nondigit rejection, arrows/delete; one named logical input |
| item | List/group/separator, media, actions, long description, link | Accessible list semantics, separate action focus, full link name |
| kbd | Single/chord/group, different platform symbols | Descriptive shortcut only; actual key handler verified separately |
| label | Long/nested/bidi label, optional/required/disabled | Label click focuses/toggles exactly one unique control |
| marker | Border/separator/icon/content, compact/long | Decorative icon hidden; meaningful status text; no accidental focus |
| menubar | Multiple menus, check/radio/submenus, disabled | Left/right switch menus; down opens; up/down/Home/End items; Escape returns trigger |
| message | Avatar/fallback/header/footer, own/other, long content | Sender/time readable, actions named; live update policy avoids replaying history |
| message-scroller | Empty/few/many, new messages, manual scroll, bottom indicator | Keyboard/wheel scroll; new item preserves user's position unless anchored at bottom |
| native-select | Placeholder/options/optgroups, disabled/required/invalid | Native arrows/typeahead/selection; label and selected value; disabled options inert |
| navigation-menu | Links/panel, viewport indicator, multiple triggers, mobile | Tab and arrow navigation; Enter open/link; Escape; focus return; long menu collision |
| pagination | First/middle/last, ellipsis, disabled limits | Link Enter, `aria-current=page`, named next/previous; prevent invalid page |
| popover | Open/closed, anchor variants, form contents, collision | Enter trigger; Escape restores; nonmodal Tab route; outside click; named contents |
| progress | 0/intermediate/100, indeterminate, accessible label | Correct range/value or omitted indeterminate value; status text |
| questionnaire | Required/optional/skipped, choice/free input, validation, finish | Next guards required value; Previous retains answer; errors announced; submission result; keyboard choice |
| radio-group | None/one selected, disabled/invalid, horizontal/vertical | Arrow roving focus and selection; Space; one tab stop; label association |
| resizable | Horizontal/vertical, min/max, collapsed, handle/no handle | Focusable separator, arrows resize, Home/End limits; pointer drag; RTL orientation |
| scroll-area | Vertical/horizontal/both, short/long, custom thumb | Wheel/keyboard/touch scroll; visible scrollbar; no trapped focus; RTL horizontal offset |
| select | Placeholder/value, groups/separators, disabled/invalid/long option | Enter/Space opens; arrows/typeahead/Home/End; Enter selection; Escape restore; selected check |
| separator | Horizontal/vertical, decorative/nondecorative | Correct separator orientation; decorative role removed; no tab stop |
| sheet | All sides, long body/footer, RTL logical side, nested popup | Dialog naming/trap/Escape/restore; dismiss button; viewport height scroll |
| sidebar | Expanded/icon/offcanvas, controlled/uncontrolled, active/disabled item, mobile | Trigger and Ctrl/Cmd+B; mobile dialog trap/Escape; active link; tooltip in collapsed mode |
| skeleton | Avatar/text/card, static/reduced motion, light/dark surfaces | Decorative placeholders; containing region's loading label, no false content |
| slider | Single/range, min/max/step, disabled/invalid, vertical | Arrows/PageUp/PageDown/Home/End; named thumbs/range; pointer/touch; RTL increases predictably |
| sonner | Success/info/error/loading, actions, duration/dismiss, many toasts | One renderer; announcement without repeated noise; action/close focus; timeout policy |
| spinner | Sizes/icon/text, reduced motion, pending action | Named loading status; SVG decorative when adjacent status already names it |
| switch | On/off, disabled/invalid, labeled control | Space toggle, `aria-checked`; label click; disabled inert |
| table | Caption/head/body/footer, selection, empty/long cells, responsive | Header association; row state; horizontal scroll contained, interactive cells named |
| tabs | Horizontal/vertical, automatic/manual activation, disabled, RTL | Roving arrows/Home/End; Enter manual mode; one selected tab, associated panel |
| textarea | Empty/filled/multiline, readonly/disabled/invalid, resize | Edit/newline/select; label/error association; no unintended submit |
| toggle | Off/on, variant/size, icon only, disabled | Enter/Space changes `aria-pressed`; stable accessible name |
| toggle-group | Single/multiple, empty selection, disabled item, orientation | Arrow roving focus; Enter/Space; correct selected set; cannot clear required single selection |
| tooltip | Hover/focus, delayed, long content, disabled wrapper | Focus equivalent to hover; Escape hides; `aria-describedby`; no interactive content |

## Public composites, alias and GMD compositions

| Entry | State and interaction requirements |
|---|---|
| Data Table | Generic caller columns/data; filter matching/no results/reset; sort asc/desc/none; unsortable columns; empty data; long cell and narrow table; `aria-sort`; keyboard header activation |
| Date Picker | Empty/selected date; locale formatting; popover Escape/focus restore; calendar arrows/date choice; disabled dates and range behavior only if API supports them |
| Form | Multiple mounted instances with unique IDs; source blur/submit invalid; error association; correction clears invalid; success button; Enter submission; no backend implied |
| Typography | Heading hierarchy; semantic prose/list/quote/code; English and Arabic font/line-height; narrow reflow and long bidi identifiers |
| Toast alias | Same Sonner API/renderer, no second renderer; success/info/error dispatch and dismissal |
| Register Divider | Label/no label, ornament/no ornament, decorative alternative text and narrow width |
| Cultural Media Frame | Image loading/failure; meaningful alt; source/caption/index; portrait/landscape; responsive crop |
| Project Feature | Heading/description/media/CTA variants, long localized text, heading hierarchy, CTA keyboard activation when supplied |
| Provenance Panel | Empty/long metadata, source/rights values, optional note; readable semantic label/value association |
| Patterned Cover | Compact/feature sizes, missing artwork, long title/subtitle; decorative pattern; image successfully loads |
| Empty State | Empty reason/action/no action, long translation; action keyboard activation and accurate resulting state |

## Scope gaps and honest interpretation

The automated runner exercises the catalog's actual examples, not an exhaustive prop-generated consumer fixture. Many modules expose states the catalog never mounts (disabled options, indeterminate checkbox, multiple selection, range dates, nested overlays, RTL drag, all tooltip/hover delays, upload failures). Those cells remain review requirements. Chart semantic presence is tested; tooltip and equivalent accessible data are not. Calendar disabled/range constraints, OTP paste/nondigit constraints, resizable drag, message anchoring, screen-reader announcements and touch gestures need dedicated fixtures/manual review. The source consumer reflects current files; a previous registry install or deployed catalog can lag it. Exporting this contract must not convert untested cells into passed checks.
