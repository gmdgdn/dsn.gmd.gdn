# GMD foundations

This is a versioned token contract for new GMD work. It does not rewrite the existing integration tokens or their consumers. Use the layers in order: **reference values** hold the palette and scales, **semantic roles** describe purpose, and **component roles** bind those purposes to controls and surfaces.

## Provenance and decisions

The measured base palette and ramps come from [`design-system-v0.01/tokens.json`](../../design-system-v0.01/tokens.json) and are preserved in [`integration/tokens.json`](../integration/tokens.json). The public-site stylesheet [`integration/ui-templates/gmd/premium.css`](../integration/ui-templates/gmd/premium.css) confirms the working paper `#F7F4EF`, ink `#140206`, Nile `#1034A6`, action pink `#FF6183`, square borders, and hard 5/3/0 depth. The earlier integration file remains authoritative for its existing pages; this token set is deliberately prefixed `gmd-` so new rules can adopt it without changing those pages.

Typeface roles and available font files follow [`integration/ui-templates/typography.css`](../integration/ui-templates/typography.css): Source Sans 3 for Latin UI/headings, Source Serif 4 for long reading, Mada for Arabic headings/UI, Amiri for Arabic prose, and Handjet for selective pixel accents. Perfectly Nineties remains a Latin display/brand face. Compatibility families Suisse Intl, FK Raster, Noto Naskh Arabic, and Noto Sans Arabic remain in the integration system but are not the preferred new-site roles.

The `success` color intentionally uses a Nile tone because the approved palette has no separate green success family. Disabled and inverse-muted values are explicit working additions to complete interface states. The existing pink `#FF6183` is retained; `#FF5B86` is not introduced because it conflicts with the shipped stylesheet and ramp.

## Use

Load `system/tokens/tokens.css` before product-specific styles. Prefer semantic or component variables in UI rules; use reference variables only when defining a new semantic mapping. For example:

```css
.primary-action {
  color: var(--gmd-component-button-action-text);
  background: var(--gmd-component-button-action-background);
  border: var(--gmd-shape-border) solid var(--gmd-color-border);
  box-shadow: var(--gmd-component-button-depth);
}
```

Compatibility-friendly semantic names include `--gmd-color-surface`, `--gmd-color-text`, `--gmd-color-primary`, and `--gmd-color-action`. Keep editorial corners square and use the hard, unblurred depth tokens for layered actions and windows. Add `.gmd-focusable` to elements that need the tokenized `:focus-visible` ring; add `.gmd-disabled` for the visual disabled treatment while retaining native disabled semantics. Opt elements into `.gmd-motion` when they use tokenized transitions so the reduced-motion rule can suppress them.

For Arabic, use Mada for headings and interface labels, Amiri for paragraph and long-form reading, and Handjet only for short accents. Keep Arabic display headings at or below 60px, section headings at or below 44px, and mobile headings at or below 36px; body copy should be at least 16px. These are maximum/recommended sizes, not required sizes. Let Arabic text use natural shaping and line height rather than Latin letter spacing or Latin `ch` widths. Write shared layout with logical properties such as `margin-inline-start`, `padding-block`, and `border-inline-end`; set `dir="rtl"` at the document or section level instead of mirroring individual strings manually.

Use the 4px spacing scale and the 720px/1050px/1600px responsive breakpoints. Motion tokens are capped at 240ms; the reduced-motion media rule disables nonessential animation and transitions. Preserve the content and state change when motion is reduced.

## Validation limits

The JSON structure and token references are validated as part of this change. Color pairings have not been measured against a WCAG contrast target, so this document makes no contrast-compliance claim. Teams should measure actual text and control pairings at their rendered sizes before release.

