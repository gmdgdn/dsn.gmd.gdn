from pathlib import Path
p=Path(__file__).parent.parent
plan='''# GMD v0.05 — geometry as a web system

This proposal supersedes the initial three-border sketches. It is a review stage before copying the v0.01 Pen masters. The aim is a shared visual language that can extend to web, social and print; this phase develops its web grammar.

## Current review

- [Live construction explorer](deep/index.html): change motif family, scale, color and construction-grid visibility.
- [Three full web section studies](deep/web-studies.html): editorial aperture, knowledge atlas and collection lattice.
- [System architecture](deep/SYSTEM-ARCHITECTURE.md): construction parameters, component roles, themes, responsive and bilingual rules.
- [Islamic source atlas](deep/ISLAMIC-ATLAS.md): 16 construction references spanning the book's later methodologies, with exact pages and figures.
- [Egyptian source atlas](deep/EGYPTIAN-ATLAS.md): 10 motif families from all 29 booklet pages.

## What the research changes

The Islamic survey covers PDF pp.197–596: classification, polygonal methods, varied repeat grids, compound 12/8 fields, dual-level systems, radial layouts, and algorithms for tiles, rosettes, bands and interlacement. The Egyptian survey covers radial canopies, painted-square modules, registers, vertical spines, overlapping circles, ribbons, and spiral-diamond fields. We should use their construction logic, hierarchy and negative spaces as well as their detail.

The grammar is **source → primitives → construction grid → motif family → composition → component → product theme**. Normalized vector geometry provides repeatable parameters; content order and interaction remain in accessible HTML. A complete asset recipe defines grid, symmetry, line placement, parent/child scale, strand width, tile seam, crop, aperture and optical-detail tier.

## Three structural compositions

1. **Editorial aperture:** a shaped media opening determines the neighboring headline bay, index register and provenance pocket. Film and Kayffa can choose different imagery within the same composition grammar.
2. **Knowledge atlas:** a polygonal relationship layout gives named records, links and selected context a visual hierarchy. Data and Kayffa pair it with plain, readable record panels and a text/list equivalent.
3. **Collection lattice:** related window modules with varied spans organize a portfolio or tool collection. Geometry defines openings and joints rather than merely decorating equal cards.

The shared Tavus-derived base remains paper/ink/Nile/pink, actual editorial and interface fonts, segmented navigation, stripe windows, thin rules and 5/3/0 hard control depth. Product themes vary aperture, geometry family, density and imagery without creating unrelated interfaces.

## Next implementation stage

After direction review, duplicate the existing Pen boards/masters into v0.05. Author an atlas of editable vector constructions, macro/medium/micro variants, aperture and window components, source-linked asset records, product theme examples and real Arabic/RTL layouts. Review tile continuity, focus states, long content, narrow layouts and optical simplification. Keep the original v0.01 source intact.

The current SVGs are original mathematical studies informed by the references; they are not exact traced historical plates. The three HTML sections are illustrative review compositions, not a production homepage or completed universal component library. Source imagery and modern derivations remain labelled separately.
'''
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GMD v0.05 review</title><style>body{margin:0;background:#f7f4ef;color:#140206;font:18px/1.5 Arial,sans-serif}main{max-width:1100px;margin:auto;padding:40px 24px}h1{font:56px Georgia,serif}a{color:#1034a6}nav{display:flex;flex-wrap:wrap;gap:20px}img{display:block;width:100%;margin:28px 0;border:1px solid #140206}section{padding:24px;border:1px solid #140206;box-shadow:5px 5px #140206;margin:30px 0}small{color:#625e5b}</style><main><h1>GMD v0.05 — constructed geometry</h1><p>A deeper web-system proposal using the Islamic book's polygonal, compound and dual-level methods, and the Egyptian booklet's registers, radial forms and interlocking fields.</p><nav><a href="deep/index.html">Interactive geometry explorer</a><a href="deep/web-studies.html">Three web compositions</a><a href="PLAN.md">Updated plan</a><a href="deep/SYSTEM-ARCHITECTURE.md">Architecture</a></nav><section><h2>The editorial aperture</h2><img src="deep/previews/editorial-aperture.jpg" alt="A shaped blue media opening and layered geometric field beside an editorial title"><a href="deep/web-studies.html">See aperture, atlas and lattice studies →</a></section><section><h2>Source constructions</h2><nav><a href="deep/ISLAMIC-ATLAS.md">Islamic atlas: 16 references</a><a href="deep/EGYPTIAN-ATLAS.md">Egyptian atlas: 10 families</a></nav><img src="research/islamic-deep-atlas.png" alt="Sixteen Islamic geometric construction references labelled with pages, figures and proposed web use"><img src="research/egyptian-12-tiles.png" alt="Twelve illustrated Egyptian pattern references with PDF page labels"></section><small>The first simple border proposal is superseded. Current examples are review artifacts; no v0.01 Pen masters have been changed.</small></main></html>'''
for name,data in [('PLAN.md',plan),('index.html',html)]:
 target=p/name
 backup=p/('INITIAL-'+name)
 if target.exists() and not backup.exists():backup.write_bytes(target.read_bytes())
 target.write_text(data,encoding='utf8')
print('Updated current plan and review gallery; initial versions preserved.')
