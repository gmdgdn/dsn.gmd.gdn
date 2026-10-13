# GMD design system v0.05 — pattern integration plan

**Status: plan for review.** Preserve the v0.01 Pen boards, PNGs, and tokens unchanged as the baseline. Create v0.05 copies only after the user reviews a small example board. No pattern has been applied to the existing components yet.

## System architecture

Keep the v0.01 core: paper/ink/Nile/pink/sand palette, editorial type, 0.8–1 px rules, segmented navigation, 5/3/0 px hard-shadow states, icon grammar, and bilingual content behavior. Add two independent decorative families on top:

| Family | Primitive | Intended role |
| --- | --- | --- |
| Egyptian border | A source-checked, repeatable linear motif with a defined corner/end treatment | Primary section rule, archive mastheads, collection edges, image/provenance frames |
| Islamic geometry | A source-checked modular geometric tile with a repeat grid and cropped edge variants | Navigation-of-knowledge graphic, collection covers, feature fields, transitions |

Treat these as configurable vector primitives, not new global backgrounds. Define each motif's source/provenance, path geometry, repeat pitch, line weight, positive/negative variants, inset, corner join, and minimum render size before promoting it to a token. Use the current ink, sand, and Nile colors; reserve pink for actions. Do not use script, sacred text, hieroglyphs, or an artifact's marks as generic ornament. Egyptian and Islamic sources should remain identified as distinct traditions rather than blended into a single ambiguous motif.

## Where patterns belong

Use the **Egyptian border** as a repeatable GMD section rule and on collection or record headers and archival image frames. Use **Islamic geometry** as a shared visual for navigating connected knowledge, as well as on collection covers, feature fields, and selected transitions. This draws on a broader Islamic geometric tradition; it must not be presented as uniquely Egyptian without source support. The striped window title bar remains a neutral separator. Buttons, form fields, tables, dense metadata, body copy, focus rings, and status indicators retain the plain v0.01 treatment. A screen section gets at most one prominent pattern field; patterned surfaces never sit directly behind reading text. Leave clear paper between pattern and content. When an archive image already has strong visual detail, use only a hairline border.

Prepare three desktop examples before any component migration: (1) v0.01 plain record frame, (2) the same frame with an Egyptian edge, (3) a navigation/feature panel with Islamic geometry. Add one narrow geometry example to test scaling and crop. These previews do not claim Arabic shaping or RTL behavior; apply the chosen motif to a real Arabic/RTL Pen component in the next phase. Label historical source, drawn interpretation, and proposed GMD use; these examples are studies, not claims of historical authenticity or image rights.

The [direction study](examples/v05-direction-studies.png) uses the *Ancient Egyptian Designs* booklet's nested-square construction (PDF p.11) and floral band (PDF p.16) as two distinct modern redraws. Its eightfold field is a new vector derivation informed by Bonner, Fig. 60 (printed p.195; PDF p.217), not a literal historical reproduction. **Recommended starting direction:** B, the Egyptian edge, becomes the recurring section/header rule; C, the eightfold geometry, stays a bounded knowledge-navigation or feature field. Keep A as the plain control for density and readability comparisons. These are review examples, not copied v0.01 Pen components.

## Scale, direction, and behavior

Store motifs as vector geometry with repeat pitch independent of container width. Test 1× and 2× rendering, a 24–48 px border band, and a reduced 12–16 px mobile rule. Crop at deliberate tile boundaries; avoid squeezed or uneven repeats. RTL mirrors **component placement and directional UI**, while nondirectional geometric tiling keeps its geometry. Do not mirror letters, inscriptions, artifact images, or a historically directional motif automatically. Pattern layers are decorative and excluded from accessibility names and reading order.

Patterns are static by default. If a later implementation animates an entrance, it should use the v0.01 short transition tokens and become fully static under reduced-motion settings. No scroll parallax or perpetual movement. Check contrast on text-adjacent areas, focus visibility, export sharpness, tile seams, responsive cropping, Arabic layout, and data-dense screens before release. A visual Pen board alone does not validate runtime behavior.

## Decision gate

Review the three examples against the local source PDFs and choose one lead motif from each family, with the nested-square unit allowed as a quiet secondary index rule if approved. Record citation/page, abstraction choices, and where each motif may appear. Only then copy the v0.01 masters into v0.05, replace local decorative layers, update tokens, and run visual/RTL QA. Keep the unchanged v0.01 gallery available for comparison and rollback. This bounded local review should precede any broad research handoff or homepage work.
