# GMD component refinement record

This pass applies the editorial GMD system to all 61 source modules through `src/gmd.css`. Ink square geometry and compact Source Sans/Mada control typography establish the frame; Nile blue is reserved for active, selected, focused, and navigational states; the action pink is reserved for primary actions; display serif is limited to headings. Hard depth is limited to primary actions, modal sheets, the opt-in raised card, tooltip, and message-scroller affordance. Portal descendants receive explicit surface and highlighted/disabled styles so their rendering remains consistent outside local component ancestry.

The source modules retain their existing APIs, primitive behavior, and ARIA contracts. The stylesheet adds visible state styling for invalid, disabled, selected/checked/indeterminate, open, busy, and loading where those states are exposed by the component. The four composed controls (Attachment, Bubble, Message, Questionnaire) receive state-specific styling on their constituent slots.

| Source module | Exact visual refinement and state coverage |
|---|---|
| `accordion.tsx` | Ink dividers; compact editorial trigger sizing; Nile hover/open trigger and keyboard focus; trigger icon inherits active color. |
| `alert-dialog.tsx` | Ink overlay and framed, scroll-bounded panel; serif title, quiet description/header, clear close/action affordance, visible focus and pink primary action. |
| `alert.tsx` | Quiet paper surface with Nile leading rule; destructive variant uses error color/surface; title/description hierarchy and action color. |
| `aspect-ratio.tsx` | Ink hairline around reserved media surface; responsive dimensions remain caller-controlled. |
| `attachment.tsx` | Square ink frame, dashed idle, Nile uploading/processing, destructive error, Nile done; focused trigger, paper media, visible disabled/action behavior. |
| `avatar.tsx` | Square fallback and image crop; Nile-soft fallback, ink-edged badge/group count; image and fallback remain distinct. |
| `badge.tsx` | Compact square label with explicit default Nile and destructive error variants; stable legible text weight. |
| `breadcrumb.tsx` | Nile links and focus, muted separators/ellipsis, wrapping list, current page remains semantically distinct. |
| `bubble.tsx` | Square conversation blocks; outgoing/default bubble Nile, outline paper/ink, ghost stays unframed; reactions are compact ink-edged paper. |
| `button-group.tsx` | Joined square borders with one shared seam; each button retains its individual focus ring and selected/disabled style. |
| `button.tsx` | Pink primary with restrained 4px hard depth; outline/secondary use quiet ink/Nile hover, ghost/link stay flat, destructive stays flat; active press, disabled, invalid, busy, and focus states. |
| `calendar.tsx` | Compact UI type; Nile selected date, Nile-soft hover, visible focus, disabled dates muted, responsive grid retained. |
| `card.tsx` | Paper surface and ink rule without default heavy depth; depth is opt-in with `data-emphasis="raised"`; title uses editorial display hierarchy. |
| `carousel.tsx` | Square, low-noise media rail; framed previous/next controls with Nile hover; items retain responsive sizing. |
| `chart.tsx` | Nile chart emphasis, square stroke ends, restrained tooltip/legend; data colors remain owned by chart input. |
| `checkbox.tsx` | Square ink outline; checked and indeterminate use Nile, disabled is muted, visible keyboard focus. |
| `collapsible.tsx` | Quiet ink boundary; Nile hover/open trigger and accessible keyboard focus; content remains unboxed. |
| `combobox.tsx` | Framed portal surface, selected/highlighted Nile-soft rows, disabled options muted; open trigger, chip/remove, clear, empty, separator, and focus states. |
| `command.tsx` | Paper command surface with framed input/list; selected item Nile-soft, empty state centered/muted, separators and shortcut labels quiet. |
| `context-menu.tsx` | Portalled square ink frame; nested submenu surfaces, highlighted and checked/radio rows use Nile; disabled labels dim, separators remain hairline. |
| `dialog.tsx` | Ink veil, square framed scroll-bounded panel, serif title, header divider; explicit focus, close, and compact viewport constraints. |
| `direction.tsx` | No visual language override; preserves direction primitive semantics, with global focus and font rules following active locale. |
| `drawer.tsx` | Square sheet surface with ink top/side frame, dark overlay, Nile handle, serif title and header rule; bounded viewport and focus. |
| `dropdown-menu.tsx` | Portalled square paper menus and nested submenu panels; Nile highlight/open states, muted disabled rows, grouped labels, checkbox/radio indicators. |
| `empty.tsx` | Open paper state with dashed boundary, generous responsive padding, framed Nile icon, serif title and muted supporting copy. |
| `field.tsx` | Tighter, consistent field rhythm; legible label/legend, muted description, high-contrast destructive error and disabled label states. |
| `hover-card.tsx` | Square ink-edged popup with paper surface and viewport-safe width; focus-trigger affordance remains visible. |
| `input-group.tsx` | Square shared frame; focus-within Nile outline, separated muted addon, flat nested control/button, error/disabled control handling. |
| `input-otp.tsx` | Square OTP slots; active slot receives Nile focus and border; focus-visible remains clear at narrow widths. |
| `input.tsx` | Paper field with ink hairline and 48px target; Nile hover/focus; invalid destructive inset marker; disabled muted/read-only clarity. |
| `item.tsx` | Content-first flat item rows; title weight, muted description/footer, square media marker, separators avoid card-like depth. |
| `kbd.tsx` | Compact Handjet key legend with ink hairline and small single-step shadow; group layout stays dense. |
| `label.tsx` | Strong UI weight and readable contrast; disabled associated input dims label without altering label API. |
| `marker.tsx` | Nile leading register rule, square media and content, ink/paper contrast; interaction focus remains global. |
| `menubar.tsx` | Ink-edged portalled menu/submenu family; Nile open/highlight and checked/radio state; muted shortcuts/disabled rows; focus-visible triggers. |
| `message-scroller.tsx` | Native scroll region with Nile thumb and square scrollbar; floating scroll button gets ink frame and small depth, including visible focus. |
| `message.tsx` | Quiet chat content with Nile incoming rule and pink outgoing rule; square avatar marker, restrained header/footer metadata. |
| `native-select.tsx` | Square native field and wrapper; Nile focus/open affordance and icon; optgroups stand out, checked options use selected wash, disabled rows dim. |
| `navigation-menu.tsx` | Nile open/current links, ink-framed content/viewport, blue indicator, focus-visible trigger and link; content remains readable when portalled. |
| `pagination.tsx` | Nile links with focus and current-page ink frame/Nile fill; muted ellipsis and compact spaced targets. |
| `popover.tsx` | Square paper popup with ink edge, safe maximum width, serif title, muted description, and a consistent portalled focus treatment. |
| `progress.tsx` | Muted track and Nile fill with thin ink frame; value transition remains restrained and does not imply loading completion semantics. |
| `questionnaire.tsx` | Flat framed choices, Nile hover/checked, destructive invalid, muted disabled; square indicators, quiet progress/skip, pink primary next/submit, disabled/busy/focus states. |
| `radio-group.tsx` | Square ink radio frame and Nile checked fill with paper inset; disabled muted; high-contrast focus outline. |
| `resizable.tsx` | Low-contrast handle until hover/focus, then Nile; visible keyboard focus without permanently heavy divider. |
| `scroll-area.tsx` | Muted track, square Nile thumb that darkens on hover; minimum thumb width supports pointer access. |
| `select.tsx` | Square trigger with Nile open/focus/hover; portal paper frame; highlighted Nile rows, disabled options muted, separators ink hairlines. |
| `separator.tsx` | One-pixel ink rule, correct orientation thickness, no ornamental fill. |
| `sheet.tsx` | Ink-veiled square side sheet with compact bounded scrolling, serif title, divided header, visible close/focus affordances. |
| `sidebar.tsx` | Quiet sidebar surface and fine edge; Nile active/hover marker, small uppercase Handjet group labels, square badges, accessible rail/trigger focus. |
| `skeleton.tsx` | Square muted-to-Nile-soft loading sweep; reduced-motion preference continues to stop animation. |
| `slider.tsx` | Square ink-edged Nile range and paper thumb with slight depth; focused thumb gets distinct outline, disabled thumb dims. |
| `sonner.tsx` | Square toast with ink frame and small offset shadow; feedback surface and text remain readable over both project canvases. |
| `spinner.tsx` | Nile indicator with shorter, restrained rotation; reduced motion policy applies. |
| `switch.tsx` | Square track/thumb; checked is Nile, disabled is muted, keyboard focus is explicit. |
| `table.tsx` | Scrollable ink-edged container, compact header, spacious cells, fine row rules; selected rows get Nile leading marker, hover wash stays subtle. |
| `tabs.tsx` | Square list/triggers with Nile active underline/wash and focus; avoids depth on inactive tabs. |
| `textarea.tsx` | Square paper field with ink hairline; Nile hover/focus; invalid destructive marker and muted disabled state. |
| `toggle-group.tsx` | Joined square controls with Nile active wash/underline, hover for off state, focus stacking and disabled clarity. |
| `toggle.tsx` | Flat square toggle; Nile active state, subtle Nile hover, visible focus, muted disabled state. |
| `tooltip.tsx` | Ink surface with paper text and Nile offset cue; trigger gets focus; portal surface remains square and compact. |

## Remaining QA

The changes are source-level style refinements. Build/type checks are run separately and reported with their exact outcome. No browser pass was performed for every one of the 61 modules and all primitive state permutations, so portal positioning, narrow viewport rendering, locale direction, and runtime state screenshots remain visual QA follow-up. Tavus captures are used as information hierarchy and state references only; the cited review explicitly cautions that many states, routes, and responsive captures are unverified.
