# Motion extraction

This note separates animation that was visible in an accepted screenshot from motion declarations found in captured stylesheets. The original bundles and detailed extraction are preserved in `assets/` and `css-extraction.json`.

## Seen in captured screens

- Dashboard starter-kit cards declare a 200ms ease-out hover lift of 2px with a border-color change. The screenshot is static, so this describes the CSS interaction rule, not a recorded hover frame.
- Dashboard primary buttons declare a 200ms ease-out hover lift of 2px and a stronger shadow. No hover screenshot was captured.
- Dashboard page controls use common 150–200ms color, border, and background transitions. The source CSS defines these properties; still screenshots do not show their interpolation.
- The homepage and dashboard display multiple playing video/media surfaces. The screenshots prove their presence; they do not establish playback timing, scroll triggers, or reduced-motion behavior.
- The Griffin announcement and Charlie helper are persistent visible banners/cards on captured dashboard pages. Dismiss behavior was represented only where the root captured its open/closed state.

## Declared in captured stylesheets

Dashboard bundle keyframes: `live-pulse`, `shimmer`, `accordion-down`, `accordion-up`, `collapsible-down`, `collapsible-up`, `chatter-sweep`, `typing-dot-bounce`, `charlie-pulse`, `composer-open`, `composer-close`, `composer-item`, `dp-intro-rise`, `section-row-in`, `fadeIn`, `fade-up`, `row-added-wash`, `share-ghost-enter`, `share-ghost-pulse`, `spin`, `pulse`, `bounce`, `enter`, `exit`, and `caret-blink`.

Explicit durations attached to named dashboard animation declarations include 75ms (composer close), 150ms (composer item), 200ms (composer open / accordion / `dp-intro-rise`), 240ms (collapsible open/close), 250ms (section row / fade-up), 550ms (intro rise), 1s (fadeIn), 1.25s (caret blink and typing dots), 2s (live pulse), 2.25s (chatter sweep), 2.6s (row-added wash), 3s (spin), and 4s (shimmer). CSS also contains 12s, 15s, 18s, and 25s decorative timings; stylesheet literal inventory includes longer app intervals through 55s. See `css-extraction.json` for raw declarations and all keyframe bodies.

Public Webflow shared CSS declares only the `spin` keyframe in the captured shared bundle. The public computed-style capture showed button transitions around 150ms, text-color changes around 200ms, and transform changes around 250ms. Public marketing CSS has several video backgrounds; their autoplay/loop effects need their own runtime capture before reproducing exact timing.

## Not verified visually

No accepted mobile viewport was captured. No motion-reduced state was captured. Static screenshots cannot verify easing curves frame by frame, scroll-enter animation triggers, loop cadence, or every menu/card hover. Treat the stylesheet declarations as implementation evidence and the above screenshot notes as visual-state evidence; they are different confidence levels.
