# Integration checks

Checked on 2026-10-03 using Luna for asset preparation and Sol for implementation/review.

- Local build generates token CSS and parses 31 curated SVGs. All 24 icons have SVG namespaces; icon size switching was visually checked at 16 and 24 pixels.
- Desktop opening, graphics and Film/Kayffa compositions visually inspected. Root review confirms the actual Tavus font pairing, framed navigation, stripe separators, paper/ink/Nile/pink foundation and visible hard depth.
- Sol checked 375px English and Arabic layouts with no horizontal document overflow. Language controls change document language/direction and paired main copy; this is an Arabic specimen, not a completed translation of every annotation.
- Data search `film` returns two rows; adding Composition selects one row. CSV/JSON buttons and SVG export trigger success feedback. Downloaded file bytes were not independently inspected because the browser download event did not return a file.
- Studio loads a real SVG blob preview. Components, dialog, drawer, record selection and studio controls exercised. JavaScript syntax check passed.
- Pen: 13 GMD root boards, zero overlapping pairs. Three new integrated boards have no unintended bounds warnings. Geometry fields intentionally clip to their frames. Real native vector shapes and document-relative poster imagery render.

The gallery is a working design-system review with local specimen data. It is not a production homepage, a complete product application, or proof of historical geometry reconstruction. Geometry remains scoped to curated exports; no general-purpose interlace solver has been promoted.
