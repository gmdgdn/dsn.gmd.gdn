# Bilingual typography — UI expansion

| Role | Arabic | Latin | Use |
|---|---|---|---|
| Headings and interface | Mada | Source Sans 3 | Headings, navigation, buttons, form labels, tables |
| Paragraphs and long reading | Amiri | Source Serif 4 | Descriptions, essays, explanatory copy |
| Selective pixel text | Handjet | Handjet | Short large expressive words; avoid small dense controls |
| Large brand statement | Mada | Existing Perfectly Nineties | Optional Tavus-based editorial display treatment |

Source Sans 3 is the closest family match for Mada: the official Google Fonts description identifies Mada's Latin component as a modified Source Sans Pro. Source Serif 4 is an editorial pairing, rather than an exact Latin equivalent of Amiri; it complements Source Sans 3 and provides readable extended text. Handjet supports both Arabic and Latin.

Fonts are bundled locally under `fonts/`, with accompanying OFL licenses; no font CDN is required. `typography.css` loads after template styles. Use `lang="ar"` on Arabic content (and `dir="rtl"` for Arabic layouts), not direction alone. Keep Arabic letter spacing normal. Handjet's element settings are isolated to `.pixel-text`; do not apply pixel styling to whole paragraphs or navigation.

Sources: [Mada description](https://github.com/google/fonts/blob/main/ofl/mada/DESCRIPTION.en_us.html), [Source Serif 4 description](https://github.com/google/fonts/blob/main/ofl/sourceserif4/DESCRIPTION.en_us.html), [Handjet description](https://github.com/google/fonts/blob/main/ofl/handjet/DESCRIPTION.en_us.html).
