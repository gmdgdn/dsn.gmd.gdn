"""Deterministic, source-informed Egyptian geometry studies for GMD v0.05.

All output is contemporary adaptation, not a historical reconstruction. SVG uses
only explicit paths/circles/rectangles/polygons; no transforms or external refs.
"""
from __future__ import annotations
import json, math, re
from pathlib import Path
from xml.etree import ElementTree as ET

HERE = Path(__file__).resolve().parent
OUT = HERE / "assets"
OUT.mkdir(parents=True, exist_ok=True)
INK="#140206"; PAPER="#F7F4EF"; NILE="#1034A6"; PINK="#FF6183"
TEAL="#176F73"; OCHRE="#8B661E"; SAND="#D5C4A8"; TERRACOTTA="#9C4937"
STUDY="contemporary-adaptation"

def svg(name, vb, body, title=None, desc=None):
    title = title or name.replace('-', ' ').title()
    desc = desc or "Contemporary GMD graphic study inspired by the cited visual reference; not a historical reconstruction."
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{vb[0]}" height="{vb[1]}" viewBox="0 0 {vb[0]} {vb[1]}"><title>{title}</title><desc>{desc}</desc>{body}</svg>\n'
def path(d, stroke=INK, sw=2, fill="none", extra=""):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'
def rect(x,y,w,h,fill="none",stroke=INK,sw=2,rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def circ(x,y,r,fill="none",stroke=INK,sw=2):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def poly(points,fill="none",stroke=INK,sw=2):
    return f'<polygon points="{" ".join(f"{x},{y}" for x,y in points)}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'
def line(x1,y1,x2,y2,color=INK,sw=2): return path(f'M{x1},{y1} L{x2},{y2}',color,sw)
def points_on(cx,cy,r,n,start=-90):
    return [(round(cx+r*math.cos(math.radians(start+i*360/n)),3),round(cy+r*math.sin(math.radians(start+i*360/n)),3)) for i in range(n)]

def skyline(variant):
    b=rect(8,8,304,144,"none",SAND,1)
    b+=circ(258,45,18,PINK,INK,1.5) if variant==1 else circ(258,45,24,"none",OCHRE,1.5)
    base=132
    # varied urban silhouette: square towers, domes and stepped rooflines
    blocks=[(18,76,34,56),(57,54,38,78),(100,83,32,49),(137,63,39,69),(181,82,30,50),(216,57,38,75),(260,77,42,55)]
    for i,(x,y,w,h) in enumerate(blocks):
        color=[NILE,TEAL,OCHRE,TERRACOTTA][(i+variant)%4]
        if variant==1 and i in (1,3,5):
            b+=path(f'M{x},{base} L{x},{y+14} Q{x+w/2},{y-10} {x+w},{y+14} L{x+w},{base} Z',color,1,PAPER if i==3 else "none")
        else: b+=rect(x,y,w,h,color if variant==2 and i%2 else "none",INK,1)
        b+=line(x+5,base-6,x+w-5,base-6,PAPER,1)
    b+=path('M8,136 Q42,126 76,136 T144,136 T212,136 T280,136 T312,136',NILE,3)
    b+=line(8,148,312,148,INK,1)
    return svg('skyline-rail',(320,160),b)

def river(variant):
    b=rect(0,0,320,88,PAPER,"none",0)
    b+=line(8,17,312,17,OCHRE,1)
    if variant==1:
        b+=path('M8,45 L28,27 L48,45 L68,63 L88,45 L108,27 L128,45 L148,63 L168,45 L188,27 L208,45 L228,63 L248,45 L268,27 L288,45 L308,63',NILE,3)
        b+=path('M8,69 L28,51 L48,69 L68,87 L88,69 L108,51 L128,69 L148,87 L168,69 L188,51 L208,69 L228,87 L248,69 L268,51 L288,69 L308,87',TEAL,1.5)
    else:
        b+=path('M8,53 Q28,31 48,53 T88,53 T128,53 T168,53 T208,53 T248,53 T288,53 T308,53',NILE,3)
        b+=path('M8,68 Q28,46 48,68 T88,68 T128,68 T168,68 T208,68 T248,68 T288,68 T308,68',TEAL,1.5)
    b+=line(8,78,312,78,INK,1)
    return svg('river-chevron',(320,88),b)

def lotus(variant):
    b=rect(0,0,320,104,PAPER,"none",0)
    for i,cx in enumerate(range(24,321,40)):
        y=55 if (i+variant)%2==0 else 65
        col=[TEAL,OCHRE,TERRACOTTA,NILE][(i+variant)%4]
        if (i+variant)%2==0:
            b+=path(f'M{cx},{y+25} Q{cx-18},{y+7} {cx-10},{y-8} Q{cx},{y-2} {cx},{y-20} Q{cx+2},{y-2} {cx+12},{y-8} Q{cx+19},{y+8} {cx},{y+25} Z',col,1.5,PAPER if variant==1 else "none")
            b+=line(cx,y+24,cx,y+38,INK,1)
        else:
            b+=path(f'M{cx-8},{y+12} Q{cx-12},{y-3} {cx},{y-12} Q{cx+12},{y-3} {cx+8},{y+12} Z',col,1.5,"none")
            b+=line(cx,y+12,cx,y+37,INK,1)
    b+=line(8,92,312,92,OCHRE,1)
    return svg('lotus-register',(320,104),b)

def sun(variant):
    cx=cy=100; b=circ(cx,cy,variant*18+24,"none",OCHRE,1.5)
    for i in range(16):
        a=math.radians(i*22.5); r1=variant*18+29; r2=r1+ (18 if i%2==0 else 9)
        b+=line(round(cx+r1*math.cos(a),3),round(cy+r1*math.sin(a),3),round(cx+r2*math.cos(a),3),round(cy+r2*math.sin(a),3),TEAL if i%2==0 else TERRACOTTA,2)
    b+=circ(cx,cy,variant*12+8,PINK if variant==2 else PAPER,INK,1.5)
    if variant==2: b+=circ(cx,cy,4,INK,INK,1)
    return svg('sun-medallion',(200,200),b)

def triangle(variant):
    b=rect(0,0,320,88,PAPER,"none",0)
    for i in range(10):
        x=8+i*32; up=(i+variant)%2==0; col=[NILE,TEAL,OCHRE,TERRACOTTA][i%4]
        pts=[(x,68),(x+16,20 if up else 68),(x+32,68 if up else 20)]
        b+=poly(pts, col if variant==2 and i%3==0 else "none",col,2)
        if variant==2 and i%3==0: b+=line(x+6,62,x+16,32,PAPER,1)
    b+=line(8,76,312,76,INK,1)
    return svg('triangle-alternation',(320,88),b)

def aperture(variant):
    b=rect(8,8,144,184,"none",SAND,1)
    # pointed arch and faceted shoulders; central window intentionally empty
    if variant==1:
        outer='M36,178 L36,84 L80,22 L124,84 L124,178 Z'; inner='M48,166 L48,88 L80,42 L112,88 L112,166 Z'
    else:
        outer='M28,178 L28,100 L46,67 L46,46 L80,20 L114,46 L114,67 L132,100 L132,178 Z'; inner='M42,166 L42,103 L58,75 L58,53 L80,36 L102,53 L102,75 L118,103 L118,166 Z'
    b+=path(outer,NILE,3,"none")+path(inner,TEAL,2,"none")
    b+=line(80,28,80,variant*8+42,OCHRE,1)
    # small corner cut marks signal a framed media aperture, not face tracing
    b+=line(18,18,34,18,PINK,2)+line(18,18,18,34,PINK,2)+line(142,18,126,18,PINK,2)+line(142,18,142,34,PINK,2)
    return svg('faceted-portrait-aperture',(160,200),b,desc='Contemporary geometric media opening; keep portrait content in its own replaceable image layer. Not a traced historic frame.')

def postmark(variant):
    cx=cy=90; b=circ(cx,cy,variant*8+40,"none",INK,2)+circ(cx,cy,variant*8+34,"none",OCHRE,1)
    for i in range(variant+2):
        y=70+i*12
        b+=path(f'M{cx+44},{y} Q{cx+54},{y+5} {cx+44},{y+10}',NILE,1.5)
    b+=path('M34,90 H146 M90,34 V146',TEAL,1)
    return svg('blank-postmark-ring',(180,180),b,desc='Blank contemporary cancellation-ring diagram; no date, issuer, language, or provenance implied.')

def spiral(variant):
    # Archimedean spiral in sampled explicit polyline with axes and ticks.
    cx=cy=110; pts=[]; turns=1.45+0.35*variant
    for i in range(141):
        t=i/140*turns*2*math.pi; r=4+5.2*t
        pts.append((round(cx+r*math.cos(t),2),round(cy+r*math.sin(t),2)))
    d='M'+' L'.join(f'{x},{y}' for x,y in pts)
    b=line(14,110,206,110,OCHRE,1)+line(110,14,110,206,OCHRE,1)+path(d,NILE,2.2)
    for k in range(-4,5):
        b+=line(110+k*20,106,110+k*20,114,INK,1)+line(106,110+k*20,114,110+k*20,INK,1)
    return svg('diagram-spiral-axes',(220,220),b,desc='Contemporary diagram spiral and coordinate axes; schematic, not a measured historical cancellation mark.')

def ruled_frame(variant):
    b=rect(8,8,184,244,PAPER,INK,2)
    # layered header rules and generous replaceable media slot
    b+=line(20,28,180,28,NILE,2)+line(20,36,142 if variant==1 else 168,36,TEAL,1)
    b+=rect(20,50,160,variant*8+110,"none",OCHRE,1.5)
    b+=line(20,178,180,178,INK,1)+line(20,190,154,190,INK,1)+line(20,198,174,198,INK,1)
    b+=rect(20,214,48,20,PINK,"none",0)+line(78,224,180,224,NILE,1)
    return svg('architectural-ruled-frame',(200,260),b)

def grille(variant):
    b=rect(10,10,140,140,PAPER,NILE,2)
    step=20 if variant==1 else 28
    for x in range(30,131,step): b+=line(x,20,x,140,TEAL,1.5)
    for y in range(30,131,step): b+=line(20,y,140,y,OCHRE,1.5)
    # central clear view port; grille bars stop at frame edges and remain graphic.
    b+=rect(variant*8+48,variant*8+48,44,44,PAPER,PINK,2)
    return svg('grille-aperture',(160,160),b,desc='Contemporary grille-inspired aperture; regular linework is a visual adaptation, not an archaeological reconstruction.')

def scene(variant):
    b=rect(8,8,304,164,"none",SAND,1)
    b+=circ(variant*26+236,40,variant*4+14,PINK,"none",0)
    # distant hill / river / palm and small boat remain thin scene illustration.
    b+=path('M18,112 Q64,62 110,108 Q148,71 202,110 Q255,75 302,108',OCHRE,1.5)
    b+=path('M18,132 Q56,122 94,132 T170,132 T246,132 T312,132',NILE,2)
    b+=path('M18,151 Q56,141 94,151 T170,151 T246,151 T312,151',TEAL,1)
    palmX=variant*40+70
    b+=path(f'M{palmX},121 Q{palmX+3},91 {palmX},61 M{palmX},68 Q{palmX-22},47 {palmX-30},50 M{palmX},68 Q{palmX+22},45 {palmX+34},49 M{palmX},68 Q{palmX-10},42 {palmX-5},36 M{palmX},68 Q{palmX+5},43 {palmX+18},37',TEAL,1.5)
    b+=path('M210,124 L254,124 L244,116 L222,116 Z M230,116 L230,102 M230,103 L248,114',INK,1.4)
    return svg('thin-scene-lines',(320,180),b)

def rosette(variant):
    b=rect(0,0,320,96,PAPER,"none",0)
    for cx in range(24,321,48):
        cy=44; n=6 if variant==1 else 8; r=18 if variant==1 else 20
        for i in range(n):
            a=math.radians(i*360/n); px=cx+r*math.cos(a); py=cy+r*math.sin(a)
            b+=circ(round(px,2),round(py,2),9 if variant==1 else 7,"none",TEAL if i%2 else OCHRE,1.3)
        b+=circ(cx,cy,5,PINK if variant==1 else NILE,INK,0.8)
    b+=line(8,76,312,76,INK,1)
    return svg('rosette-border',(320,96),b)

def masonry(variant):
    b=rect(0,0,320,144,PAPER,"none",0)
    rows=4; h=28
    for row in range(rows):
        y=8+row*h; shift=(variant*14 if row%2 else 0)
        b+=line(8,y,312,y,TEAL if row%2 else OCHRE,1.4)
        for k in range(-1,8):
            x=8+k*44+shift
            if 8<x<312: b+=line(x,y,x,y+h,INK,1)
    b+=line(8,8+rows*h,312,8+rows*h,TEAL,1.4)
    return svg('brick-cutstone-courses',(320,144),b,desc='Contemporary coursing diagram inspired by architectural massing and framing; no site-specific masonry claim.')

def reed(variant):
    b=rect(0,0,320,104,PAPER,"none",0)
    # Woven reed effect: 5 sinusoidal strokes at two phases; no over/under claim.
    amp=13 if variant==1 else 16; period=64 if variant==1 else 80
    for row in range(4):
        y=18+row*22
        pts=[]
        for i in range(81):
            x=i*4; yy=y+amp*math.sin((x+(row%2)*period/2)*2*math.pi/period)
            pts.append((round(x,1),round(yy,1)))
        d='M'+' L'.join(f'{x},{yy}' for x,yy in pts)
        b+=path(d,[TEAL,OCHRE,TERRACOTTA,NILE][row],1.4)
    return svg('woven-reed-fibres',(320,104),b,desc='Contemporary fibre-like line material; curves are an illustration and do not encode an over-under weave.')

def stipple(variant):
    b=rect(0,0,240,144,PAPER,"none",0)
    step=16 if variant==1 else 20
    for y in range(12,137,step):
        for x in range(12,233,step):
            # Deterministic alternating dither density, clear content window at center.
            dx=(x-120)/80; dy=(y-72)/45; density=max(0,1-(dx*dx+dy*dy)**0.5)
            keep=((x*7+y*11)%5)<(1 if variant==1 else 2)
            if density>.25 and keep and not (75<x<165 and 45<y<100):
                b+=circ(x,y,1.2 if variant==1 else 1.8,[NILE,TEAL,OCHRE][(x+y)//step%3],"none",0)
    b+=rect(75,45,90,55,"none",PINK,1)
    return svg('inkprint-stipple',(240,144),b,desc='Contemporary deterministic stipple field with a quiet center; use as peripheral atmosphere, not under text.')

FAMILIES=[
 ('skyline-rail','EG-005; EG-016','EG-005 stack of architectural image layers; EG-016 framed skyline.','A modular skyline rail made of varied block and domed profiles over a thin river baseline. Two scene arrangements.','Chapter/collection masthead rail; keep adjacent title area clear.','200 px wide; strokes >=1.25 px.' ,skyline),
 ('river-chevron','EG-005; EG-010','EG-005 lower register and EG-010 layered landscape bands.','Alternating angular or curved water courses with a single upper rule.','Section divider; avoid text overlay.','160 px wide; strokes >=1.25 px.',river),
 ('lotus-register','EG-005; EG-009','EG-005 stacked decorative registers; EG-009 repeated edge rhythm.','Open flower and closed-bud silhouettes alternate along a shared baseline; simplified botanical geometry.','Narrow chapter spine or edge band, below content.','240 px wide; strokes >=1.2 px.',lotus),
 ('sun-medallion','EG-005; EG-004','EG-005 sun above architectural stack; EG-004 radial calendar balance.','Sixteen radial rays around a paired ring and quiet center; two ray lengths.','Isolated section marker or large cover focal; not a logo claim.','48 px diameter; strokes >=1.5 px.',sun),
 ('triangle-alternation','EG-009','EG-009 triangular top/bottom rhythm noted in visual review.','Alternating upward/downward triangles on a fixed baseline, with optional sparse filled cells.','Poster edge register; keep off small controls.','180 px wide; strokes >=1.25 px.',triangle),
 ('faceted-portrait-aperture','EG-013; EG-036','EG-013 pointed portrait enclosure; EG-036 grille as framed view.','Two pointed/faceted nested outlines define a replaceable image aperture.','Editorial portrait crop; full image route and focal control remain external.','160 px tall; inner clear area >=55% width.',aperture),
 ('blank-postmark-ring','EG-002; EG-011','EG-002/011 circular cancellation marks and rectangular stamp compositions.','Concentric blank rings, short cancellation strokes and axis cross; no fake date/text.','Archive record detail beside verified metadata only.','72 px diameter; strokes >=1.4 px.',postmark),
 ('diagram-spiral-axes','EG-011','EG-011 envelope diagram/cancellation visual; spiral interpretation is schematic.','Explicit sampled Archimedean spiral, orthogonal axes and five unit ticks per side.','Lineage/acquisition diagram accent; pair with real labels outside SVG.','110 px square; stroke >=1.3 px.',spiral),
 ('architectural-ruled-frame','EG-006; EG-013','EG-006 measured rules and calm cover; EG-013 image/title separation.','Nested page frame, short header rules, media window, caption rules and a small labelled bar.','Chapter opener or source sheet; slots remain editable/replaced.','200 x 260; content inset >=12 px.',ruled_frame),
 ('grille-aperture','EG-036; EG-013','EG-036 architectural grille as view filter; EG-013 framed image opening.','Orthogonal bars around a clear central square opening; spacing presets 20/28.','Large media aperture or background panel only; do not obscure image details.','160 px square; central aperture >=44 px.',grille),
 ('thin-scene-lines','EG-009; EG-005','EG-009 quiet line-drawn scene; EG-005 landscape/skyline stacking.','Thin hills, two water courses, palm and a simple boat silhouette.','Wide editorial scene field; standalone illustration, no claim of a depicted place.','320 x 180; preserve clear margins.',scene),
 ('rosette-border','EG-004; EG-005','EG-004 radial medallion rhythm; EG-005 layered register hierarchy.','Repeated 6- or 8-lobed circle rosettes with alternating ring colors and a baseline.','Optional border under large titles; two color/scale arrangements.','240 px wide; strokes >=1.2 px.',rosette),
 ('brick-cutstone-courses','EG-005; EG-036','EG-005 stacked architectural masses; EG-036 stone architecture view.','Staggered rectangular courses, with alternate bond offsets; diagrammatic not site-specific.','Panel background behind image only or technical section rail.','200 px wide; strokes >=1.2 px.',masonry),
 ('woven-reed-fibres','EG-009; EG-005','EG-009 repeated line rhythm; EG-005 register layering.','Four sampled sinusoidal strands with two amplitude/period pairs; illustrative fibers, not interlace.','Peripheral material strip; not a verified seamless pattern.','240 px wide; strokes >=1.2 px.',reed),
 ('inkprint-stipple','EG-004; EG-011','EG-004 dense visual field and EG-011 paper-object contrast; derived GMD surface proposal.','Deterministic sparse dot field fades toward quiet center; two dot scales.','Large bounded edge atmosphere. Keep text window clear.','240 x 144; dots >=1.2 px.',stipple),
]

def build():
    assets=[]
    for family, sources, observation, construction, use, minimum, fn in FAMILIES:
        for variant in (1,2):
            name=f'{family}-{variant:02d}.svg'
            data=fn(variant)
            (OUT/name).write_text(data,encoding='utf-8',newline='\n')
            root=ET.fromstring(data)
            vb=tuple(map(float,root.attrib['viewBox'].split()))
            nums=[]
            for el in root.iter():
                for key in ('x','y','x1','y1','x2','y2','cx','cy','r','width','height','stroke-width'):
                    if key in el.attrib:
                        try: nums.append(float(el.attrib[key]))
                        except ValueError: pass
            assets.append({"id":name[:-4],"file":f"assets/{name}","family":family,"variant":variant,
              "classification":STUDY,"sourceIDs":sources.split('; '),"visualEvidence":observation,
              "construction":construction,"parameters":{"variant":variant,"viewBox":list(vb)},
              "derivatives":"This family is delivered as two contemporary arrangements; no repeat/tile derivative is asserted.",
              "repeat":{"claimed":False,"edgeTest":None},"usage":use,"minimumUse":minimum,
              "editable":"Native SVG primitive geometry; explicit coordinates; no transforms, fonts, clipping paths or linked resources.",
              "palette":{"ink":INK,"paper":PAPER,"nile":NILE,"pink":PINK,"ornamentTeal":TEAL,"ornamentOchre":OCHRE,"sand":SAND,"terracotta":TERRACOTTA}})
    manifest={"name":"GMD v0.05 Egyptian source-informed contemporary vector studies","version":"1.0.0","generator":"generate.py","sourceReview":"../../../reviews/egypt-enhancement/ASSET-REVIEW.md","sourceManifest":"../../../reviews/egypt-enhancement/asset-manifest.json","classificationNote":"All assets are contemporary adaptations informed by visual observations of supplied image IDs. None is a verified historical reconstruction. Source image filenames and metadata are not provenance verification.","paletteNote":"Nile/pink/paper/ink preserve GMD roles; teal/ochre/sand/terracotta (#9C4937) use existing optional ornament tokens.","assets":assets}
    (HERE/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    validate(manifest)
    build_gallery(manifest)

def build_gallery(manifest):
    source_path=(HERE/'../../../reviews/egypt-enhancement/asset-manifest.json').resolve()
    source_data=json.loads(source_path.read_text(encoding='utf-8'))
    source_by_id={x['id']:x for x in source_data['assets']}
    cards=[]
    for item in manifest['assets']:
        labels=[]
        for source_id in item['sourceIDs']:
            src=source_by_id[source_id]
            rel='../../../reviews/egypt-enhancement/'+src['reviewCopy']
            labels.append(f'<a href="{rel}" title="Open source image {source_id}">{source_id}</a>')
        cards.append(f'''<article class="card">
  <div class="preview"><img src="{item['file']}" alt="{item['family']} contemporary vector preview, arrangement {item['variant']}" loading="lazy"></div>
  <div class="meta"><h2>{item['family'].replace('-', ' ').title()} <span>#{item['variant']:02d}</span></h2>
  <p class="class">{item['classification']}</p><p>{item['construction']}</p>
  <p><strong>Source observations:</strong> {' · '.join(labels)}</p><p><strong>Use:</strong> {item['usage']}</p>
  <p><strong>Minimum:</strong> {item['minimumUse']}</p><a class="download" href="{item['file']}" download>Open / download SVG</a></div>
</article>''')
    html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GMD Egyptian vector studies</title>
<style>
:root{color-scheme:light;--paper:#F7F4EF;--ink:#140206;--nile:#1034A6;--pink:#FF6183;--teal:#176F73;--ochre:#8B661E}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.45 system-ui,sans-serif}header{padding:clamp(24px,5vw,64px);background:var(--nile);color:var(--paper);border-bottom:8px solid var(--pink)}h1{font-size:clamp(30px,5vw,56px);line-height:1.05;margin:0 0 16px}header p{max-width:72ch}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:16px;padding:20px}.card{border:1px solid var(--ink);background:white;display:grid;grid-template-columns:minmax(140px,42%) 1fr;min-height:260px}.preview{background:#eae5de;display:grid;place-items:center;padding:14px;min-width:0}.preview img{display:block;max-width:100%;max-height:250px;object-fit:contain}.meta{padding:16px;overflow-wrap:anywhere}.meta h2{font-size:19px;margin:0 0 4px}.meta h2 span{color:var(--teal);font-variant-numeric:tabular-nums}.meta p{margin:8px 0}.class{color:var(--teal);font-size:13px;font-weight:700}.meta a{color:var(--nile)}.download{display:inline-block;margin-top:8px;padding:7px 10px;border:1px solid var(--nile);font-weight:650}footer{padding:24px;border-top:1px solid var(--ink)}@media(max-width:520px){.card{grid-template-columns:1fr}.preview img{max-height:220px}}
</style><header><h1>Egyptian source-informed<br>vector studies</h1><p>30 editable SVGs across 15 distinct families. Every specimen is a contemporary adaptation informed by the cited image observations, not a historical reconstruction. No asset claims a seamless repeat.</p><p>GMD roles: Nile, pink, ink, paper; optional ornament colors use the existing token palette.</p></header><main class="grid">'''+''.join(cards)+'''</main><footer><a href="../../../reviews/egypt-enhancement/ASSET-REVIEW.md">Read visual source review</a> · Generated from <code>manifest.json</code> by <code>generate.py</code>.</footer></html>'''
    (HERE/'assets-gallery.html').write_text(html,encoding='utf-8',newline='\n')

def validate(manifest):
    assert len(manifest['assets'])==30
    for item in manifest['assets']:
        root=ET.parse(HERE/item['file']).getroot()
        assert root.tag.endswith('svg')
        assert set(('width','height','viewBox'))<=set(root.attrib)
        w,h=map(float,root.attrib['viewBox'].split()[2:])
        assert w>0 and h>0
        assert len(list(root))>=2
        assert not any(key in el.attrib for el in root.iter() for key in ('transform','filter','mask','clip-path'))
        assert not item['repeat']['claimed'], 'No unverified repeat claims permitted.'
        width,height=map(float,root.attrib['viewBox'].split()[2:])
        for el in root.iter():
            for k,v in el.attrib.items():
                if _numeric(v): assert math.isfinite(float(v))
                if k=='d':
                    values=[float(q) for q in re.findall(r'(?<![A-Za-z])[-+]?(?:\d+\.?\d*|\.\d+)',v)]
                    assert all(math.isfinite(q) for q in values)
                    # Every authored path coordinate is inside the SVG viewBox.
                    # Stroke extension is intentionally allowed at the edge for crop-safe band ends.
                    assert all(-1e-6<=q<=max(width,height)+1e-6 for q in values),(item['id'],v)
    print(f"validated {len(manifest['assets'])} SVGs; XML, dimensions, finite/in-viewBox coordinates; no repeat claims")

def _numeric(v):
    try: float(v); return True
    except ValueError: return False

if __name__=='__main__': build()
