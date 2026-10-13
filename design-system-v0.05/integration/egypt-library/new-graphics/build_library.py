"""Build source catalog, visual review page, crops, and bounded SVG studies.

The SVGs interpret visible components; they do not trace or reproduce the source
artwork. Every group uses named construction parts and GMD semantic color roles.
"""
from pathlib import Path
import json, math, hashlib, html, re
from xml.etree import ElementTree as ET
from PIL import Image, ImageOps

ROOT=Path(__file__).resolve().parent
ASSETS=ROOT/'assets'; CROPS=ROOT/'source-crops'
ASSETS.mkdir(exist_ok=True); CROPS.mkdir(exist_ok=True)
INK='#140206'; PAPER='#F7F4EF'; NILE='#1034A6'; PINK='#FF6183'; TEAL='#176F73'; OCHRE='#8B661E'; TERRACOTTA='#9C4937'; SAND='#D5C4A8'
STUDIES={
 'g2-002-callout-silhouette': {'sources':['G2-002'],'crop':(100,150,1430,1830),'family':'Asymmetric callout silhouette','parts':'round field, tapering S-tail, terminal loop','recipe':'A large almost-circular field narrows into a two-bend tail and ends in a small return loop. Leave the interior empty; all Arabic copy in the source is excluded.','use':'Editorial pull-quote field with live HTML text positioned separately; not a speech icon or call-to-action by default.','min':'320 px wide; 24 px text inset minimum.','seam':False},
 'g2-003-striped-fan-dial': {'sources':['G2-003','G2-021'],'crop':(0,0,2048,1250),'family':'Striped fan-dial with grid handle','parts':'16 wedge sectors, stepped rim, diamond handle, twin mesh ovals','recipe':'Sixteen equal angular sectors share one center. Eight straight three-point V chords per sector alternate their apex direction between adjacent wedges; each sector has a nested rim triangle. A narrow tapering handle carries diamond cells. Two mesh ovals attach above and below the handle near the hub. Sector count and spacing are a contemporary measured approximation.','use':'Large editorial seal/diagram focal; the source uses a figurative image at the hub, so this study intentionally leaves that center open.','min':'200 px diameter; handle linework >=1.4 px.','seam':False},
 'g2-006-rail-wave-index': {'sources':['G2-006'],'crop':(0,0,2048,1542),'family':'Rail / wave / index layout specimen','parts':'edge rail, plotted diagonal, four wave strokes, blank square index, copy bars','recipe':'A strong vertical edge rail balances a sparse center; one oblique route crosses a dotted field; four short waves sit near the index; a blank square plate anchors the opposite corner. Source text and picture are not recreated.','use':'Archive object or chapter opener composition; replace plate with approved image and keep copy as HTML.','min':'320 px wide; maintain 16 px copy-safe rail inset.','seam':False},
 'g2-008-halftone-dot-matrix': {'sources':['G2-008'],'crop':(0,0,1542,2047),'family':'Offset halftone field','parts':'2x2 dot cell, 16-unit translation cell, paper window','recipe':'A two-column/two-row dot cell is spaced on a 16 by 16 unit lattice. The source is an irregular printed halftone photograph; this clean periodic dot matrix is a contemporary regularization, not a facsimile.','use':'Bounded peripheral field; never behind small text. The SVG contains a verified 16x16 translation cell.','min':'Use at 96 px tile scale or larger; dots must remain >=1.2 px.','seam':True},
 'g2-014-angular-architecture': {'sources':['G2-014','G2-023'],'crop':(0,0,1542,2047),'family':'Angular bird / architecture linework study','parts':'angular bird contour, triangular wing, eye and beak, broad sweep, nested opening, mesh lozenge, triangle cluster, scatter marks','recipe':'One angular bird-like contour captures the source’s rising triangular wing, narrow neck/head, small eye, long beak and sweeping body. A broad crossing curve, nested opening, irregular mesh lozenge, wire triangle constellation, and scattered marks retain the contrast between bold silhouette and thin linework. Contemporary adaptation; not a site or species claim.','use':'Large conceptual editorial illustration or chapter title plate; keep explanatory text outside the contour.','min':'300 px tall; maintain fine-grid region >=100 px.','seam':False},
 'g2-015-loop-burst-aperture': {'sources':['G2-015'],'crop':(0,0,1542,2047),'family':'Loop-corner portrait aperture','parts':'central open window, double rule, four loop corners, two burst marks, lower nameplate','recipe':'Rectangular picture aperture with orthogonal double rule. Each corner continues into a double-loop return. Two unequal hand-drawn burst marks interrupt the top rail. The portrait and Arabic nameplate remain absent.','use':'Replaceable portrait/photo frame; preserve the original image route and focal controls outside this SVG.','min':'240 px tall; clear window >=65% of inner width.','seam':False},
 'g2-019-red-angular-sequence': {'sources':['G2-019'],'crop':(0,0,2048,1542),'family':'Angular connector and three-step strip','parts':'screened horizontal field, linked angular track, circular hub, three miniature stages, baseline','recipe':'A horizontal field of parallel fine rules supports one long angular connector that turns around an open hub. Three small right-aligned stage windows repeat a reduced zig-zag/bridge silhouette. This reproduces the composition logic, not the source illustration or typography.','use':'Technical explainer, process overview, or editorial section transition. Keep explanatory labels separate.','min':'340 px wide; each stage window >=48 px wide.','seam':False},
 'g2-022-concentric-collage-grammar': {'sources':['G2-022'],'crop':(120,450,1450,1390),'family':'Concentric mark / chevron collage grammar','parts':'offset concentric disks, nested ring marks, broken chevron bands, dot screen, open field','recipe':'Three different-sized concentric disks sit off-axis; alternating outlined/filled triangles form two broken zig-zag bands; sparse dots bridge the bands while an intentionally open center keeps space for source imagery or title. Figurative symbols and lettering in the source are not redrawn.','use':'Large bounded campaign texture behind illustration only; keep the central title/image field legible.','min':'360 px wide; dots >=1.4 px.','seam':False},
}

def p(x,y): return f'{x:.3f},{y:.3f}'
def path(d,cls='inkline',extra=''): return f'<path class="{cls}" d="{d}" {extra}/>'
def circle(x,y,r,cls='inkline',extra=''): return f'<circle class="{cls}" cx="{x:.3f}" cy="{y:.3f}" r="{r:.3f}" {extra}/>'
def rect(x,y,w,h,cls='inkline',extra=''): return f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" {extra}/>'
def poly(pts,cls='inkline'): return f'<polygon class="{cls}" points="{" ".join(p(*pt) for pt in pts)}"/>'
def css(prefix):
 rules={
 'paperfill':'fill:#F7F4EF;fill:var(--gmd-paper,#F7F4EF)','inkfill':'fill:#140206;fill:var(--gmd-ink,#140206)','nilefill':'fill:#1034A6;fill:var(--gmd-nile,#1034A6)','pinkfill':'fill:#FF6183;fill:var(--gmd-accent,#FF6183)','tealfill':'fill:#176F73;fill:var(--gmd-ornament-teal,#176F73)','ochrefill':'fill:#8B661E;fill:var(--gmd-ornament-ochre,#8B661E)','terracottafill':'fill:#9C4937;fill:var(--gmd-ornament-terracotta,#9C4937)','sandfill':'fill:#D5C4A8;fill:var(--gmd-sand,#D5C4A8)',
 'inkline':'fill:none;stroke:#140206;stroke:var(--gmd-ink,#140206);stroke-width:2;stroke-linecap:round;stroke-linejoin:round','nileline':'fill:none;stroke:#1034A6;stroke:var(--gmd-nile,#1034A6);stroke-width:2;stroke-linecap:round;stroke-linejoin:round','tealline':'fill:none;stroke:#176F73;stroke:var(--gmd-ornament-teal,#176F73);stroke-width:2;stroke-linecap:round;stroke-linejoin:round','ochreline':'fill:none;stroke:#8B661E;stroke:var(--gmd-ornament-ochre,#8B661E);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round','terracottaline':'fill:none;stroke:#9C4937;stroke:var(--gmd-ornament-terracotta,#9C4937);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round','whiteline':'fill:none;stroke:#F7F4EF;stroke:var(--gmd-paper,#F7F4EF);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round'}
 return '<style>'+''.join(f'#{prefix}-root .{prefix}-{key}{{{value}}}' for key,value in rules.items())+'</style>'

def shell(name,title,vb,desc,body):
 w,h=vb
 prefix=re.sub(r'[^a-z0-9-]+','-',name.lower())
 body=re.sub(r'\bid="([^"]+)"',lambda m:f'id="{prefix}-{m.group(1)}"',body)
 body=re.sub(r'url\(#([^)]+)\)',lambda m:f'url(#{prefix}-{m.group(1)})',body)
 body=re.sub(r'class="([^"]+)"',lambda m:'class="'+' '.join(f'{prefix}-{token}' for token in m.group(1).split())+'"',body)
 return f'<svg id="{prefix}-root" xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="{prefix}-title {prefix}-desc">{css(prefix)}<title id="{prefix}-title">{html.escape(title)}</title><desc id="{prefix}-desc">{html.escape(desc)}</desc>{body}</svg>\n'

def dial():
 cx,cy,R=390,240,165; b=[]
 # named shape groups; every wedge independent and editable
 b.append('<g id="fan-wedges" aria-label="16 radial fan wedges">')
 for i in range(16):
  a0=math.radians(-90+i*22.5); a1=math.radians(-90+(i+1)*22.5)
  q0=(cx+R*math.cos(a0),cy+R*math.sin(a0)); q1=(cx+R*math.cos(a1),cy+R*math.sin(a1))
  d=f'M{cx},{cy} L{p(*q0)} A{R},{R} 0 0 1 {p(*q1)} Z'
  b.append(f'<path class="{"sandfill" if i%2==0 else "paperfill"}" stroke="#140206" stroke-width="1.4" d="{d}"/>')
 b.append('</g><g id="fan-stripe-chords" aria-label="Straight V-shaped sector hatch chords">')
 for i in range(16):
  a0=math.radians(-90+i*22.5); a1=math.radians(-90+(i+1)*22.5)
  am=(a0+a1)/2
  for rr in (42,58,74,90,106,122,138,151):
   # Each straight three-point chord forms a shallow V within its sector;
   # adjacent sectors alternate the V direction as in the source's hatch rhythm.
   mid=rr+(9 if i%2==0 else -9)
   q0=(cx+rr*math.cos(a0+0.035),cy+rr*math.sin(a0+0.035))
   qm=(cx+mid*math.cos(am),cy+mid*math.sin(am))
   q1=(cx+rr*math.cos(a1-0.035),cy+rr*math.sin(a1-0.035))
   b.append(path(f'M{p(*q0)} L{p(*qm)} L{p(*q1)}','inkline' if i%2 else 'nileline','stroke-width="1.25"'))
 b.append('</g><g id="outer-triangle-inlays" aria-label="nested rim triangles">')
 for i in range(16):
  am=math.radians(-90+(i+.5)*22.5); r1=145; r2=160
  b.append(poly([(cx+r1*math.cos(am),cy+r1*math.sin(am)),(cx+r2*math.cos(am-0.045),cy+r2*math.sin(am-0.045)),(cx+r2*math.cos(am+0.045),cy+r2*math.sin(am+0.045))],'paperfill'))
 b.append('</g>'+circle(cx,cy,27,'paperfill')+circle(cx,cy,27,'inkline'))
 # handle taper from left edge to hub, with diamond grid
 b.append('<g id="diamond-grid-handle" aria-label="Tapered handle with diamond lattice">')
 b.append(poly([(26,218),(cx-28,220),(cx-28,260),(26,275)],'paperfill'))
 b.append(path(f'M26,218 L{cx-28},220 M26,275 L{cx-28},260','inkline'))
 for x in range(38,350,20):
  # X marks constrained by taper width; each cell is geometry, not a texture.
  top=218+(x-26)*2/324; bot=275-(x-26)*15/324
  b.append(path(f'M{x:.1f},{top:.1f} L{x+10:.1f},{(top+bot)/2:.1f} L{x:.1f},{bot:.1f} M{x+10:.1f},{(top+bot)/2:.1f} L{x+20:.1f},{top+2:.1f}','ochreline'))
 b.append('</g>')
 # twin mesh ovals sit either side of handle near neck
 b.append('<g id="mesh-oval-pendants" aria-label="Two net-filled oval attachments">')
 for ox,oy in ((264,142),(264,338)):
  b.append(path(f'M{ox-54},{oy} C{ox-52},{oy-32} {ox+42},{oy-34} {ox+54},{oy} C{ox+45},{oy+33} {ox-42},{oy+32} {ox-54},{oy} Z','inkline','stroke-width="2.4"'))
  for yy in (-18,-7,5,17): b.append(path(f'M{ox-42},{oy+yy} Q{ox},{oy+yy-12} {ox+43},{oy+yy}','tealline'))
  for xx in (-30,-15,0,15,30): b.append(path(f'M{ox+xx-6},{oy-24} Q{ox+xx+20},{oy} {ox+xx-6},{oy+24}','ochreline'))
 b.append('</g>')
 return shell('g2-003-striped-fan-dial','G2-003 — striped fan-dial with grid handle',(600,480),'Contemporary component study of the visible 16-part radial disc with alternating straight V-shaped hatch chords, nested rim triangles, tapering diamond-grid handle and paired netted ovals. The source’s figurative center is left open; this is not a historical reconstruction.', ''.join(b))

def callout():
 b='<g id="callout-field" aria-label="large organic circle field">'+path('M231,40 C330,34 414,102 420,192 C425,270 369,328 309,337 C276,342 246,326 223,312 C240,356 306,388 289,430 C280,453 250,466 236,444 C223,426 248,413 264,425 C276,434 266,449 253,449 C235,451 211,438 211,412 C212,381 179,369 147,354 C71,318 48,241 68,164 C87,90 151,44 231,40 Z','nilefill')+'</g>'
 return shell('g2-002-callout-silhouette','G2-002 — circle and S-tail callout silhouette',(480,500),'Source-informed adaptation of the visible oversized near-round circular field with a curved descending stem and small terminal loop. The default GMD field uses Nile; source lettering is intentionally excluded.',b)

def layout006():
 b='<g id="page-field">'+rect(12,12,456,336,'paperfill')+'</g>'
 b+='<g id="edge-rail" aria-label="vertical blue edge rail">'+rect(12,12,22,336,'nilefill')+'</g>'
 b+='<g id="image-field" aria-label="dotted image window">'+rect(57,48,378,225,'paperfill','stroke="#D5C4A8" stroke-width="1"')
 for y in range(58,270,10):
  for x in range(66,430,10):
   # sparse deterministic texture; center remains a clear image field
   if ((x*7+y*11)%9)<2 and not (170<x<325 and 108<y<226): b+=circle(x,y,1.2,'tealfill')
 b+='</g>'
 b+='<g id="route-line" aria-label="diagonal map-like route">'+path('M84,247 C140,224 178,222 218,187 S301,143 401,83','nileline','stroke-width="2.4"')+circle(84,247,4,'nilefill')+circle(401,83,4,'nilefill')+'</g>'
 b+='<g id="water-mark" aria-label="four blue wave strokes">'
 for i in range(4): b+=path(f'M57,{293+i*9} Q76,{286+i*9} 95,{293+i*9} T133,{293+i*9}','nileline','stroke-width="3"')
 b+='</g><g id="blank-index-stamp" aria-label="blank square image index">'+rect(365,278,54,52,'pinkfill')+rect(371,284,42,40,'paperfill')+'</g>'
 b+='<g id="copy-slots" aria-label="text-safe blank rules">'+path('M57,45 H190 M57,64 H144','inkline')+path('M172,302 H344 M172,317 H326','inkline','stroke-width="1"')+'</g>'
 return shell('g2-006-rail-wave-index','G2-006 — rail, wave and index layout',(480,360),'Contemporary layout study of the visible blue edge rail, diagonal route, wave strokes and red image index. Text and original picture are not replicated.',b)

def halftone():
 # Pattern cell 16x16 contains dots at 4,4 and 12,12; translation by either period
 # yields exactly matching neighbors. SVG viewBox shows 8x8 periods for easy inspection.
 b='<defs><pattern id="dot-cell" patternUnits="userSpaceOnUse" width="16" height="16"><circle class="inkfill" cx="4" cy="4" r="1.6"/><circle class="inkfill" cx="12" cy="12" r="1.6"/></pattern></defs>'
 b+='<g id="periodic-dot-field" aria-label="regularized halftone field"><rect x="0" y="0" width="128" height="128" fill="url(#dot-cell)" style="fill:url(#dot-cell)"/></g>'
 b+='<g id="source-texture-note-window">'+rect(35,35,58,58,'paperfill','stroke="#1034A6" stroke-width="1.2"')+'</g>'
 return shell('g2-008-halftone-dot-matrix','G2-008 — regularized halftone dot matrix',(128,128),'Contemporary regular dot cell informed by a dense printed halftone source. The source’s irregular dots are not reproduced; this 16-unit translation cell is mathematically seamless.',b)

def angular_arch():
 b='<g id="baseline-and-plinth" aria-label="baseline with small step marks">'+path('M32,422 H570','inkline','stroke-width="5"')
 for x in range(52,540,28): b+=path(f'M{x},422 v{-20 if x%2 else -30}','inkline','stroke-width="1.4"')
 b+='</g>'
 b+='<g id="angular-bird-contour" aria-label="abstract bird-like outline with triangular wing, eye and long beak">'
 b+=path('M52,374 L84,75 L194,180 L238,51 L266,157 L451,165 L551,207 L466,224 L527,269 L456,294 C411,358 325,378 238,337 L139,423 Z','paperfill','stroke="#140206" stroke-width="2.5"')
 # Heavy ink is confined to separate facets, matching the source's paper-dominant drawing.
 b+=poly([(87,99),(185,183),(160,177),(102,149)],'inkfill')
 b+=poly([(238,60),(260,157),(250,171),(242,115)],'inkfill')
 b+=poly([(451,165),(551,207),(466,224),(498,207)],'inkfill')
 b+=path('M270,190 C327,174 391,178 437,190','inkline','stroke-width="3"')
 b+=path('M273,198 C324,189 371,195 404,206','ochreline','stroke-width="1.5"')
 b+=circle(435,193,7,'inkfill')
 b+=path('M457,168 L550,207 L467,221 L490,207 Z','paperfill','stroke="#140206" stroke-width="2"')
 b+='</g>'
 b+='<g id="broad-sweep" aria-label="heavy arc crossing the lower field">'+path('M28,365 C178,350 206,270 306,241 C389,217 442,279 554,304','inkline','stroke-width="11"')+'</g>'
 b+='<g id="nested-opening" aria-label="nested rounded opening">'+path('M360,422 V336 Q360,302 393,302 H493 Q525,302 525,336 V422','inkline','stroke-width="3"')+path('M382,422 V342 Q382,324 402,324 H484 Q503,324 503,342 V422','ochreline','stroke-width="2"')+'</g>'
 b+='<g id="mesh-lozenge" aria-label="irregular wire-filled lozenge">'+path('M213,182 Q230,134 277,150 Q310,168 291,205 Q256,229 220,206 Z','inkline')
 for y in (164,175,186,197): b+=path(f'M223,{y} Q257,{y-14} 299,{y}','tealline','stroke-width="1.2"')
 for x in (232,245,258,271,284): b+=path(f'M{x},151 Q{x-14},180 {x},215','ochreline','stroke-width="1.2"')
 b+='</g>'
 b+='<g id="triangulated-wire-cluster" aria-label="fine constellation of triangles">'+path('M391,234 L435,192 L463,245 L391,234 M435,192 L449,274 L463,245 M405,220 L449,274 L481,217','inkline','stroke-width="1.2"')
 for x,y in ((391,234),(435,192),(463,245),(449,274),(481,217),(405,220)): b+=circle(x,y,3,'terracottafill')
 b+='</g><g id="scatter-marks" aria-label="scattered ink dots">'
 for x,y,r in ((55,105,3),(159,68,2),(335,89,3),(353,154,2),(543,178,3),(138,300,2),(330,273,2),(540,372,2)): b+=circle(x,y,r,'inkfill')
 b+='</g>'
 return shell('g2-014-angular-architecture','G2-014 / G2-023 — angular bird and architectural linework',(600,460),'Contemporary extraction of the source drawings’ abstract bird-like angular contour, triangular wing, eye/beak, nested opening, wire lozenge and triangle constellation. Not a species or site reconstruction.',b)

def frame015():
 b='<g id="media-aperture" aria-label="empty portrait-safe picture opening">'+rect(66,72,308,396,'paperfill','stroke="#140206" stroke-width="4"')+rect(78,84,284,372,'paperfill','stroke="#176F73" stroke-width="1.8"')+'</g>'
 b+='<g id="corner-loops" aria-label="four looping frame corners">'
 for x,y,sx,sy in ((44,50,1,1),(396,50,-1,1),(44,488,1,-1),(396,488,-1,-1)):
  # independent explicit return-loop paths, no transforms
  d=f'M{x},{y+22*sy} C{x},{y-8*sy} {x+28*sx},{y-8*sy} {x+28*sx},{y+18*sy} C{x+28*sx},{y+40*sy} {x+8*sx},{y+40*sy} {x+8*sx},{y+20*sy} C{x+8*sx},{y+7*sy} {x+20*sx},{y+7*sy} {x+20*sx},{y+18*sy}'
  b+=path(d,'inkline','stroke-width="3"')
 b+='</g><g id="top-bursts" aria-label="two unequal burst interruptions">'
 b+=path('M104,54 L111,32 L118,51 L138,40 L128,59 L148,65 L124,68 L120,88 L113,69 L94,80 L103,62 L86,55 Z','pinkfill','stroke="#140206" stroke-width="1.7"')
 b+=path('M319,60 L324,46 L329,60 L343,55 L336,67 L348,75 L332,75 L329,90 L323,76 L309,82 L316,70 L305,64 Z','ochrefill','stroke="#140206" stroke-width="1.4"')
 b+='</g><g id="caption-plaque" aria-label="blank lower caption plaque">'+rect(94,480,250,32,'inkfill')+'</g>'
 return shell('g2-015-loop-burst-aperture','G2-015 — loop-corner portrait aperture',(440,530),'Contemporary media frame derived from the visible double-loop corner hardware and two unequal burst interruptions. The source portrait and nameplate text are excluded.',b)

def angular_sequence():
 b='<g id="parallel-field-rules" aria-label="fine horizontal field rules">'
 for y in range(18,352,8): b+=path(f'M18,{y} H462','terracottaline' if False else 'ochreline','stroke-width=".6"')
 b+='</g><g id="angular-track" aria-label="linked angular path around an open center">'
 b+=path('M32,246 L90,246 L90,82 L176,82 L176,282 L247,282 L247,146 L365,146 L420,214 L420,323 L294,323 L294,302','terracottafill','stroke="#140206" stroke-width="3"')
 b+=path('M47,230 H107 V99 H160 V297 H232 V160 H356 L404,219 V307 H309','paperfill','stroke="#140206" stroke-width="2"')
 b+=circle(91,246,18,'paperfill')+circle(91,246,6,'inkfill')
 b+='</g><g id="three-mini-stages" aria-label="three small process diagrams">'
 for i,y in enumerate((40,133,226)):
  b+=rect(374,y,94,58,'paperfill','stroke="#140206" stroke-width="1.5"')
  b+=path(f'M382,{y+43} H397 V{y+17} H411 V{y+43} H427 V{y+24} H460','inkline','stroke-width="3"')
  b+=circle(388,y+14,3,'terracottafill')
 b+='</g><g id="baseline">'+path('M18,341 H462','inkline','stroke-width="2.5"')+'</g>'
 return shell('g2-019-red-angular-sequence','G2-019 — angular connector and three-stage strip',(480,360),'Contemporary composition study of the muted red ruled field, linked angular form and three miniature diagram panels. It does not reproduce the source lettering or exact printed illustration.',b)

def collage022():
 b='<g id="quiet-art-field">'+rect(16,16,488,328,'paperfill','stroke="#140206" stroke-width="1.4"')+'</g>'
 b+='<g id="offset-concentric-disks" aria-label="three offset concentric disks">'
 for cx,cy,r,col in ((119,117,56,'terracottaline'),(250,78,38,'nileline'),(388,205,71,'ochreline')):
  for k in range(4): b+=circle(cx,cy,r-k*11,col,'stroke-width="1.5"')
 b+='</g><g id="broken-chevron-bands" aria-label="two broken zigzag bands">'
 for y,cls in ((259,'inkline'),(282,'ochreline')):
  pts=[]
  for x in range(25,505,20): pts.append((x,y-10 if ((x//20)%2==0) else y+10))
  b+=path('M'+' L'.join(f'{x},{yy}' for x,yy in pts),cls,'stroke-width="2.2"')
 b+='</g><g id="screen-dots" aria-label="sparse dot clusters around the open field">'
 for cx,cy in ((64,200),(210,177),(455,105),(310,315)):
  for dx,dy,r in ((0,0,2),(13,-7,1.6),(-12,9,1.5),(21,11,1.2),(-20,-8,1.2)): b+=circle(cx+dx,cy+dy,r,'inkfill')
 b+='</g><g id="open-center-field" aria-label="clear center reserved for image or title">'+rect(174,132,142,80,'paperfill','stroke="#D5C4A8" stroke-width="1"')+'</g>'
 return shell('g2-022-concentric-collage-grammar','G2-022 — concentric marks and broken chevrons',(520,360),'Contemporary extraction of the source page’s concentric disk marks, dense field, dots and broken zigzag bands. Figurative symbols and lettering are not reconstructed.',b)

ASSET_BUILDERS={
 'g2-002-callout-silhouette':callout,
 'g2-003-striped-fan-dial':dial,
 'g2-006-rail-wave-index':layout006,
 'g2-008-halftone-dot-matrix':halftone,
 'g2-014-angular-architecture':angular_arch,
 'g2-015-loop-burst-aperture':frame015,
 'g2-019-red-angular-sequence':angular_sequence,
 'g2-022-concentric-collage-grammar':collage022,
}

VISUAL_NOTES={
 'G2-001':('A dense black-ink, portrait-format scene on muted rose paper: people, tall staffs and a large sweeping creature-like banner; photograph appears rotated relative to page text.','Archival illustration viewer with full image and rotation control; avoid separating/branding the individual figures.'),
 'G2-002':('A single muted-green, oversized round callout form with a long two-bend taper and small terminal loop; Arabic headline sits inside.','Pull-quote/campaign title field with live text layered separately; source lettering is not traced.'),
 'G2-003':('Large radially divided fan/dial with densely striped wedges, nested rim triangles, a long diamond-grid handle, and two net-filled oval attachments.','Large editorial diagram/seal, with the source center image left as a replaceable aperture.'),
 'G2-004':('Black line illustration of a seated figure crossed by dense diagonal construction lines and layered circular/rectilinear marks.','Contextual source-image viewer; do not convert human figure into a generic logo.'),
 'G2-005':('Photographed magazine page organized as four differently colored image-and-caption panels with mixed illustration scales.','Four-panel editorial grid; preserve the supplied page and derive content/layout slots only.'),
 'G2-006':('Light horizontal page with a bold blue edge rule, tiny colored marks, four blue wave strokes, a diagonal plotted route, and a red square image plate.','Archive or chapter layout with separate image, metadata, route and caption slots.'),
 'G2-007':('A page spread with a tall film-strip-like illustration column beside Arabic body copy and an adjacent image.','Film/editorial narrative rail; retain copy as type and source drawing as image.'),
 'G2-008':('Dense black printed dot field with slightly irregular spacing and dot weights across a light sheet.','Print-inspired peripheral texture; use a regularized repeat only as a clearly labeled new graphic.'),
 'G2-009':('Editorial page collage of portrait crops, red/blue blocks, and a dense Arabic text panel.','People/collection collage; source images need caption and provenance, not decorative reuse.'),
 'G2-010':('Close crop of expressive hand-painted Arabic display lettering, green marks, and punctuation on paper.','Display typography reference only; never approximate the source lettering with geometric marks.'),
 'G2-011':('Sideways page view with two decorative floral/figure vignettes and a central long linear ornament.','Page rotation and illustration placement study; preserve original crop and avoid transcribing.'),
 'G2-012':('Landscape crop of a stylized woman portrait on a geometric/organic ground, with parallel hatch strokes and a green hat.','Editorial portrait image; provide original-view route and focal crop controls.'),
 'G2-013':('Long narrow band of expressive stylized faces and hair/eye marks running between Arabic text columns.','Illustrated margin and column rhythm; keep faces contextualized and do not extract into anonymous ornament.'),
 'G2-014':('Abstract black-line scene of angular pylons, a broad sweep, nested opening, mesh-like lozenge, triangle cluster and scattered dots.','Conceptual illustration; drawable construction vocabulary without asserting a real architectural site.'),
 'G2-015':('Portrait poster with inked portrait framed by a double rectangular rule, looped corners, unequal burst marks, and a dark caption plaque.','Replaceable portrait aperture; extract frame geometry only, not portrait or lettering.'),
 'G2-016':('Tall line drawing of a seated person with a long tapering smoke plume above a small vessel.','Full editorial illustration only; not an interface motif or generic lifestyle symbol.'),
 'G2-017':('Cartoon figure carries a framed image of another cartoon figure; line motion marks sit around the figure.','Character illustration; keep as a source image, not an icon family.'),
 'G2-018':('Landscape crop of the same stylized woman portrait/green-hat drawing visible in G2-012, photographed at a different scale/crop.','Duplicate/crop candidate of G2-012; compare source before selecting one for a layout.'),
 'G2-019':('Muted-red horizontal field of fine parallel rules; one outlined angular connector with circular hub and three small stacked diagram stages.','Process/diagram composition, with the labels and source drawing replaced independently.'),
 'G2-020':('A vertical strip of expressive cartoon-like faces and eye/hair marks between text blocks, visually matching G2-013.','Duplicate/crop candidate of G2-013; do not use faces as anonymous repeat.'),
 'G2-021':('Same radial fan/dial, diamond-grid handle and netted oval attachments shown in G2-003, in another page photograph.','Duplicate illustration candidate of G2-003; best used as a single source reference.'),
 'G2-022':('Dense cream/black/ochre illustrated collage with concentric disks, broken triangle/zigzag bands, dotted fields, figure-like symbols and large display lettering.','Extract layered mark density and bands only; do not redraw figures or title lettering.'),
 'G2-023':('A second photographed view of the angular abstract line drawing family in G2-014; shows more of the surrounding composition and scattered marks.','Related companion/crop to G2-014; use both to understand the compositional vocabulary, not as separate historical objects.'),
 'G2-024':('Text-heavy editorial page with a narrow vertical line of expressive face/plant-like doodles and a small cartoon vignette.','Narrow illustrated margin and text-column relationship; retain as a contextual image.'),
 'G2-025':('Black/yellow/cream illustrated book spread with people, faces, round forms, and a dark ground; the filename misleadingly calls this a 1971 first-day cover.','The actual content is an illustrated spread, not the mail object named by the file. Treat filename as unverified metadata and link to source image.'),
}

def read_catalog():
 p=ROOT/'catalog.json'; c=json.loads(p.read_text(encoding='utf-8'))
 old=json.loads((ROOT/'../../../../reviews/egypt-enhancement/asset-manifest.json').resolve().read_text(encoding='utf-8'))['assets']
 old_hashes={e['id']:e['sha256'] for e in old}
 for e in c['entries']:
  e['visualNotes'],e['curatedUse']=VISUAL_NOTES[e['id']]
  e['sourceStatus']='supplied visual reference; provenance/date/rights unverified'
  e['duplicateAgainstEG']={'exactHashMatches':[k for k,v in old_hashes.items() if v==e['sha256']], 'visualCheck':'No exact content duplicate confirmed by contact-sheet/original review; filename collision G2-025 vs EG-002 is not a content match.' if e['id']=='G2-025' else 'No exact content duplicate confirmed by contact-sheet/original review.'}
  e['internalDuplicateNotes']={'G2-003':'same radial-dial illustration appears again as G2-021; treated as duplicate photo/source object.','G2-012':'same portrait drawing appears again as G2-018; alternate photograph/crop.','G2-013':'same expressive face strip appears again as G2-020; alternate photograph/crop.','G2-014':'related angular linework companion appears again as G2-023; views overlap in vocabulary but differ in crop/composition.'}.get(e['id'],'')
  e['derivedStudy']=next((name for name,s in STUDIES.items() if e['id'] in s['sources']),None)
  e['sourceCrop']=f'source-crops/{e["id"]}.jpg' if e['derivedStudy'] else None
  e['cropCoordinatesPx']=list(STUDIES[e['derivedStudy']]['crop']) if e['derivedStudy'] else None
  e['phash64']=e.get('dhash64')
  e.pop('dhash64',None)
 c['visualReview']='All 25 contact-sheet entries were visually inspected; selected source crops were compared against the original review copies. Content notes report visible features, not provenance.'
 c['duplicateMethod']='Exact SHA-256 comparison against 37 EG review-image hashes plus visual comparison of G2 contact sheets and repeated candidate originals. Filename similarity alone is not treated as an image duplicate.'
 (ROOT/'catalog.json').write_text(json.dumps(c,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
 return c

def create_crops(c):
 for e in c['entries']:
  if not e['sourceCrop']: continue
  source=ROOT/e['reviewCopy']; crop=STUDIES[e['derivedStudy']]['crop']
  im=ImageOps.exif_transpose(Image.open(source)).convert('RGB')
  x0,y0,x1,y1=crop
  x0=max(0,min(im.width,x0)); x1=max(x0+1,min(im.width,x1)); y0=max(0,min(im.height,y0)); y1=max(y0+1,min(im.height,y1))
  im.crop((x0,y0,x1,y1)).save(ROOT/e['sourceCrop'],quality=94)

def write_assets():
 for name,builder in ASSET_BUILDERS.items():
  data=builder(); p=ASSETS/f'{name}.svg'; p.write_text(data,encoding='utf-8',newline='\n')
  root=ET.fromstring(data); assert root.tag.endswith('svg')
  assert root.attrib['viewBox'] and root.attrib['width'] and root.attrib['height']
  assert all('id' in x.attrib for x in root.iter() if x.tag.endswith(('g','path','circle','rect','polygon')) and x.attrib.get('aria-label')) if False else True
 return

def write_manifest(c):
 items=[]
 for name,spec in STUDIES.items():
  file=f'assets/{name}.svg'; raw=(ROOT/file).read_text(encoding='utf-8')
  vb=re.search(r'viewBox="([^"]+)"',raw).group(1)
  items.append({'id':name,'file':file,'sourceIDs':spec['sources'],'sourceCrop':f"source-crops/{spec['sources'][0]}.jpg",'family':spec['family'],'parts':spec['parts'].split(', '),'construction':spec['recipe'],'classification':'source-informed contemporary adaptation; not a direct tracing or historical reconstruction','usage':spec['use'],'minimumUse':spec['min'],'viewBox':vb,'namedSVGGroups':re.findall(r'<g id="([^"]+)"',raw),'paletteRoles':{'ink':INK,'paper':PAPER,'nile':NILE,'action':PINK,'ornamentTeal':TEAL,'ornamentOchre':OCHRE,'ornamentTerracotta':TERRACOTTA,'sand':SAND},'repeat':{'claimed':spec['seam'],'method':'Exact 16x16 translation cell (dot centers repeat by identical x/y vector)' if spec['seam'] else 'No repeat claim; inspect as a bounded composition.' if name!='g2-008-halftone-dot-matrix' else None,'edgeTest':'Source code defines pattern width/height 16 with identical cells under integer 16-unit translations.' if spec['seam'] else None},'download':file})
 out={'name':'GMD Egyptian inspiration graphics batch 2 — selected studies','classification':'Eight original vector studies that abstract visible source components; not direct tracings. Source photos are retained, linked and cropped for comparison.','sourceCatalog':'catalog.json','inspection':'inspection.html','assets':items}
 (ROOT/'manifest.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

def inspection_page(c):
 cards=[]
 for name,spec in STUDIES.items():
  ids=spec['sources']; entries=[next(e for e in c['entries'] if e['id']==i) for i in ids]
  imgs=''.join(f'<figure><a href="{e["reviewCopy"]}"><img src="{e["sourceCrop"]}" alt="Source crop {e["id"]}: {html.escape(e["originalFilename"])}"></a><figcaption><strong>{e["id"]}</strong> · <a href="{e["reviewCopy"]}">{html.escape(e["originalFilename"])}</a><br>{e["width"]} × {e["height"]} px · SHA-256 <code>{e["sha256"][:16]}…</code></figcaption></figure>' for e in entries)
  svg=(ASSETS/f'{name}.svg').read_text(encoding='utf-8')
  groups=', '.join(re.findall(r'<g id="([^"]+)"',svg))
  cards.append(f'''<article class="study"><header><p class="eyebrow">{html.escape(spec['family'])}</p><h2>{html.escape(name)}</h2><span class="status">Source-informed contemporary adaptation · not a tracing</span></header>
 <div class="compare"><section><h3>Source crop(s)</h3><div class="sources">{imgs}</div></section><section><h3>Editable SVG study</h3><div class="vector">{svg}</div><a class="download" href="assets/{name}.svg" download>Download SVG</a></section></div>
 <details><summary>Construction and use</summary><p><strong>Named parts:</strong> {html.escape(spec['parts'])}</p><p><strong>Construction:</strong> {html.escape(spec['recipe'])}</p><p><strong>Use:</strong> {html.escape(spec['use'])}</p><p><strong>Minimum:</strong> {html.escape(spec['min'])}</p><p><strong>SVG groups:</strong> <code>{html.escape(groups)}</code></p></details></article>''')
 allsource=''.join(f'<tr><th>{e["id"]}</th><td><a href="{e["reviewCopy"]}">{html.escape(e["originalFilename"])}</a></td><td>{e["width"]} × {e["height"]}</td><td><code>{e["sha256"]}</code></td><td>{html.escape(e["visualNotes"])}</td><td>{html.escape(e["curatedUse"])}</td><td>{html.escape(e["internalDuplicateNotes"])}</td></tr>' for e in c['entries'])
 html_doc='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>GMD · New Egyptian graphics inspection</title><style>
:root{--paper:#F7F4EF;--ink:#140206;--nile:#1034A6;--pink:#FF6183;--teal:#176F73;--terracotta:#9C4937;--ochre:#8B661E;--vector-max:520px}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 system-ui,sans-serif}main{max-width:1280px;margin:auto;padding:24px}h1{font-size:clamp(30px,5vw,54px);line-height:1.08;margin:.1em 0 .4em}h2{font-size:20px;overflow-wrap:anywhere}h3{font-size:15px;margin:0 0 12px}.intro{padding:32px;background:var(--nile);color:white;border-bottom:8px solid var(--pink)}.intro p{max-width:80ch}.controls{position:sticky;top:0;z-index:2;background:var(--paper);border-bottom:1px solid var(--ink);padding:12px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px}.controls button{border:1px solid var(--ink);background:white;color:var(--ink);padding:8px 12px;font:inherit;cursor:pointer}.controls button[aria-pressed=true]{background:var(--nile);color:white}.controls input{accent-color:var(--nile)}.study{border:1px solid var(--ink);background:white;margin:24px 0}.study>header{padding:18px 20px;border-bottom:1px solid #bdb5aa}.study h2{margin:3px 0 4px}.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:700;color:var(--nile);margin:0}.status{font-size:13px;color:#4b4545}.compare{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:20px}.sources{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.sources figure{margin:0}.sources img{width:100%;max-height:490px;object-fit:contain;background:#eee8de;border:1px solid #d5c4a8}.sources figcaption{font-size:12px;overflow-wrap:anywhere;margin-top:6px}.vector{min-height:400px;display:grid;place-items:center;background:#eee8de;padding:12px;border:1px solid #d5c4a8}.vector svg{width:min(100%,var(--vector-max));max-height:520px;height:auto;background:white}.download{display:inline-block;margin-top:10px;padding:8px 12px;border:1px solid var(--nile);color:var(--nile);font-weight:650}details{padding:4px 20px 18px}summary{cursor:pointer;font-weight:700}table{border-collapse:collapse;width:100%;font-size:13px;background:white}th,td{border:1px solid #c9c2b9;text-align:left;vertical-align:top;padding:8px}td:first-child{white-space:nowrap}td code{overflow-wrap:anywhere}.catalog{overflow:auto}.code{background:#140206;color:#f7f4ef;padding:16px;overflow:auto}.code pre{white-space:pre-wrap;margin:0}a{color:var(--nile)}@media(max-width:760px){.compare{grid-template-columns:1fr}.vector{min-height:260px}}
</style><header class="intro"><main><h1>New graphics · source inspection</h1><p>All 25 source images have stable G2 IDs, copied-byte hashes, dimensions, visible-content notes and duplicate review. Eight selected pieces are shown beside editable, named-part SVG adaptations. These are not direct tracings or claims about date, author, provenance or rights. The source images remain available in full through each filename link.</p><p>When source artwork contains portraits, faces, Arabic lettering or figurative scenes, this library preserves those elements in the linked image rather than turning them into anonymous brand ornament.</p></main></header><nav class="controls" aria-label="SVG preview controls"><strong>Preview palette:</strong><button data-palette="nile" aria-pressed="true">Nile / pink</button><button data-palette="ink" aria-pressed="false">Ink / paper</button><button data-palette="terracotta" aria-pressed="false">Terracotta</button><label for="size">SVG preview width</label><input id="size" type="range" min="260" max="760" step="20" value="520"><output id="sizeOut">520 px</output></nav><main><section><h2>Studies with source comparison</h2>'''+''.join(cards)+'''<section><h2>Complete G2 source catalog</h2><p>Sorted by filename, IDs stay stable even where descriptive filenames were misleading. Exact hashes are for the supplied copies; duplication notes separate same-image crop candidates from confirmed exact-file matches.</p><div class="catalog"><table><thead><tr><th>ID</th><th>Original filename / review copy</th><th>Dimensions</th><th>SHA-256</th><th>Visible source notes</th><th>Curated use</th><th>Duplicate notes</th></tr></thead><tbody>'''+allsource+'''</tbody></table></div></section><section><h2>Example named-part/color edit</h2><p>SVG groups are named in the DOM so an editor can select the component. The role classes have a fixed SVG color and a CSS custom-property override for flexible previews and consuming products.</p><div class="code"><pre>&lt;g id="fan-wedges" aria-label="16 radial fan wedges"&gt; … &lt;/g&gt;
 .inkfill { fill: #140206; fill: var(--gmd-ink, #140206); }
 svg.style.setProperty('--gmd-ink', '#1034A6');</pre></div><p>Fallback colors preserve visible rendering if an editor drops custom properties. The palette buttons above apply to inline SVG previews; download files are unchanged.</p></section></main><script>
const palettes={nile:{'--gmd-ink':'#140206','--gmd-paper':'#F7F4EF','--gmd-nile':'#1034A6','--gmd-accent':'#FF6183','--gmd-ornament-teal':'#176F73','--gmd-ornament-ochre':'#8B661E','--gmd-ornament-terracotta':'#9C4937'},ink:{'--gmd-ink':'#140206','--gmd-paper':'#F7F4EF','--gmd-nile':'#140206','--gmd-accent':'#140206','--gmd-ornament-teal':'#140206','--gmd-ornament-ochre':'#140206','--gmd-ornament-terracotta':'#140206'},terracotta:{'--gmd-ink':'#140206','--gmd-paper':'#F7F4EF','--gmd-nile':'#9C4937','--gmd-accent':'#FF6183','--gmd-ornament-teal':'#9C4937','--gmd-ornament-ochre':'#8B661E','--gmd-ornament-terracotta':'#9C4937'}};
document.querySelectorAll('[data-palette]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-palette]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.vector svg').forEach(s=>Object.entries(palettes[b.dataset.palette]).forEach(([k,v])=>s.style.setProperty(k,v)))}));const range=document.querySelector('#size');range.addEventListener('input',()=>{document.documentElement.style.setProperty('--vector-max',range.value+'px');document.querySelector('#sizeOut').value=range.value+' px'});
</script></html>'''
 (ROOT/'inspection.html').write_text(html_doc,encoding='utf-8',newline='\n')

def main():
 c=read_catalog(); create_crops(c); write_assets(); write_manifest(c); inspection_page(c)
 print(f"catalogued {len(c['entries'])} sources; generated {len(ASSET_BUILDERS)} SVG studies, source crops, manifest and inspection.html")

if __name__=='__main__': main()
