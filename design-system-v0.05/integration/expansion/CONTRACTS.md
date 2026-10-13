# GMD expansion component contracts · draft

This folder is a framework-neutral coded review. `../tokens.css` is the shared foundation; `theme.css` adds optional direction tokens. The DOM and [components.js](./components.js) are editable examples, not a published package. Pen equivalents and consumer adapters remain Gate C work.

| Family | Selector / anatomy | Public control | Events and state | Density and RTL |
|---|---|---|---|---|
| Segmented navigation | `.site-header`, `#site-nav`, menu and product trigger | `createDisclosure(trigger, panel, {closeOnEscape})` returns `setOpen`, `open`, `destroy` | Trigger sets `aria-expanded`; panel `hidden` reflects state; Escape may be delegated to a parent controller | 44px minimum controls; desktop segmented, mobile disclosure; logical borders and inline spacing |
| Narrative tabs | `.tab-list [role=tab]` and linked panels | `createTabs(tablist, {onChange})` returns `select`, `tabs`, `destroy` | Arrow/Home/End and click; roving `tabIndex`, `aria-selected`, panel visibility; arrow direction mirrors in RTL | Stable rectangular content frame across tabs |
| Overlay dialog | Native `dialog` with close button | `createDialog(dialog)` returns `open(trigger)`, `close`, `destroy` | Browser modal focus trap; Escape/close; focus returns to opener | Max width constrained by viewport; no shaped hit target |
| Collection | Search, family, sort, rows, count and empty container | `createCollection({...})` returns `update`, `visible`, `reset`, `destroy` | `input`/`change`; deterministic `filterAndSort`; live result count; true empty state | Flat workspace dividers; table scrolls horizontally on narrow viewports; DOM reading order stays linear |
| Export | Visible row model | `serializeRecords(records, 'csv'|'json')` returns text; `createExportBlob` returns a Blob | CSV quotes fields, CRLF rows and a UTF-8 BOM; JSON has no BOM; UI downloads current visible rows | Format independent of language switch; mixed-direction IDs use `dir=ltr` |
| Form | Labeled fields, help, errors, acknowledgement, feedback | `validateRequest({project,email,acknowledgement})` returns field error map | Submit blocks invalid input, marks `aria-invalid`, focuses first error; valid submit reports local-only check | Dense form grid becomes one column at mobile; no remote submission |
| Toast | `#toast[role=status]` | `createToast(element)` returns `show`, `hide` | Timer replaced by newest message; status announced politely | Fixed logical corner; reduced-motion removes transitions |

The document uses actual Tavus font assets via `../tokens.css`: Perfectly Nineties for editorial display, Suisse Intl for body, FK Raster for labels, and Noto Naskh/Sans Arabic for the Arabic mode. Editorial elements use hard 5/3/0 depth; repeating workspace controls use 1px rules and mostly flat surfaces. Focus uses the shared Nile token. The four ornament fills in `theme.css` and `theme.json` are proposed contemporary GMD additions, not historical pigment claims or status colors. Pink remains the default primary action. Calculated contrast for the proposed text/fill pairs: ink on paper 18.39:1, ink on pink 7.00:1, paper on Nile 9.27:1, white on faience 5.90:1, white on terracotta 6.14:1, white on ochre 5.23:1, ink on limestone 16.27:1. Disabled text on its disabled fill is 4.23:1 and is not used as essential normal text.

## Import shape

```js
import { createTabs, createDialog, filterAndSort, serializeRecords } from './components.js';
```

No global state is required. The host owns the DOM and is responsible for `destroy()` during unmount. A future Astro/React adapter should preserve these state/event contracts rather than copying this source into Film, Kayffa or Data. Production consumption still requires a versioned package, an install example, theme overrides, deprecation policy and a fresh two-product import/build check.

## Content and source limits

All table rows, essay text and relationship labels are illustrative. The film poster image is for visual review; rights must be checked before public reuse. The existing geometric SVGs are contemporary studies. The octagonal aperture is a visual media crop with a full-object dialog; the decorative radial sector composition has an equivalent linear list. Neither claims verified reconstruction of Bonner Fig.92, Fig.123 or Fig.490D.
