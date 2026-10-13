# Current native component catalog

The portal contains 21 local examples. They are prototypes and reference specimens, not framework packages. Arabic mode demonstrates a translated shell and direction; component guidance remains English.

| Family | Components | Contract |
|---|---|---|
| Actions | Button, disclosure popover | Native button/link semantics, focus, real disabled controls, Escape on disclosure |
| Forms | Text field, textarea, select, checkbox/radio, switch | Visible associated labels, helper/error descriptions, native selection, fieldset/legend |
| Feedback | Badge, alert, progress, skeleton, dialog, toast | Text alongside status color, bounded measurable progress, loading semantics, modal focus and polite local feedback |
| Navigation | Breadcrumb, pagination, accordion, tabs | Current state, native disclosure, roving tabs and logical keyboard direction |
| Data | Record card, table, empty state, media thumbnail | Source/rights context, sorting state on table headers, filtering counts and descriptive media labels |

Use `components.css` after generated tokens and the font declarations. Current examples also consume catalog layout styles in `system.css`; copied markup needs its associated styles and relevant behavior module. `components.js` demonstrates local interactions and must be adapted to a product's state, persistence and backend.

Pink action states keep their fill and use hard depth 5/3/0. Nile is used for links, focus and selected controls. Decorative Egyptian assets belong in expressive content areas; they do not replace readable labels or familiar control shapes.

Before production adoption, verify each component's accessible name, description, keyboard behavior, disabled/loading/error states, content expansion, Arabic reading order, touch targets and reduced motion in the target product. The catalog is not an accessibility certification.
