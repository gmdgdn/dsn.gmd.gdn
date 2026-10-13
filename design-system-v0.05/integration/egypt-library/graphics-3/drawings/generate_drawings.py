"""Generate editable, source-informed G3 vector studies; no source pixels embedded."""
from pathlib import Path
import json, re
from xml.etree import ElementTree as ET

HERE=Path(__file__).resolve().parent
OUT=HERE/"svg"
OUT.mkdir(exist_ok=True)
INK="#140206"; NILE="#1034a6"; PAPER="#f1e5d0"; OCHRE="#b77b39"; RED="#9c4937"; PALE="#e2d4bc"

def wrap(id,title,source,body,view="0 0 600 760",note="Contemporary editable vector study informed by the supplied reference; not a historical reconstruction or exact trace."):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-labelledby="title desc" width="600" height="760">
<title id="title">{title}</title><desc id="desc">{note} Source {source}.</desc>
<metadata>Source {source}. contemporary study; editable named groups; no embedded raster.</metadata>
<style>:root{{--ink:{INK};--nile:{NILE};--paper:{PAPER};--ochre:{OCHRE};--red:{RED};--pale:{PALE}}}.ink{{stroke:var(--ink);fill:none}} .inkfill{{fill:var(--ink)}} .paperfill{{fill:var(--paper)}} .nilefill{{fill:var(--nile)}} .ochrefill{{fill:var(--ochre)}} .redfill{{fill:var(--red)}} .line{{stroke:var(--ink);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}} .fine{{stroke:var(--ink);stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}} .muted{{stroke:var(--ink);stroke-width:2;fill:none;opacity:.2}} .stipple{{fill:var(--ochre)}}</style>
{body}</svg>'''

def save(name,svg):
    path=OUT/(name+".svg")
    path.write_text(svg,encoding="utf-8")
    ET.parse(path)
    return path

def woman_disk():
    import math
    b=['<g id="seven-wedge-headdress" data-editable-part="seven-wedge-headdress">']
    cx,cy,r=300,270,235
    # Seven straight-edged triangular gores; the original's key rhythm is a field of V-shaped chords.
    boundaries=[]
    for i in range(8):
        a=math.radians(-90+i*360/7)
        boundaries.append((cx+r*math.cos(a),cy+r*math.sin(a)))
    for i in range(7):
        p1,p2=boundaries[i],boundaries[i+1]
        b.append(f'<path class="paperfill" stroke="var(--ink)" stroke-width="2.2" d="M {cx} {cy} L {p1[0]:.2f} {p1[1]:.2f} L {p2[0]:.2f} {p2[1]:.2f} Z"/>')
        # Dense straight chevron hatching follows each long gore.
        for j in range(1,16):
            t=j/16
            left=(cx+(p1[0]-cx)*t,cy+(p1[1]-cy)*t)
            right=(cx+(p2[0]-cx)*t,cy+(p2[1]-cy)*t)
            peak=(cx+(p1[0]+p2[0]-2*cx)*t*.5,cy+(p1[1]+p2[1]-2*cy)*t*.5-13*t)
            b.append(f'<path class="fine" d="M{left[0]:.2f} {left[1]:.2f} L{peak[0]:.2f} {peak[1]:.2f} L{right[0]:.2f} {right[1]:.2f}"/>')
    b.append(f'<circle class="line" cx="{cx}" cy="{cy}" r="{r}"/>')
    b.append('</g><g id="nested-rim-triangles" data-editable-part="rim-insets" class="fine">')
    # Seven rim stations each carry a nested triple triangle, matching the large-gore count.
    for i in range(7):
        a=math.radians(-90+(i+.5)*360/7); x=cx+219*math.cos(a); y=cy+219*math.sin(a)
        b.append(f'<path d="M{x-11:.1f} {y-8:.1f} L{x+11:.1f} {y-8:.1f} L{x:.1f} {y+11:.1f} Z M{x-6:.1f} {y-5:.1f} L{x+6:.1f} {y-5:.1f} L{x:.1f} {y+5:.1f} Z"/>')
    b.append('</g><g id="hanging-strands" data-editable-part="side-form-threads" class="fine"><path d="M144 433 Q158 478 157 523 M456 433 Q442 478 443 523"/></g>')
    b.append('<g id="pebble-side-forms" data-editable-part="pebble-ovals">')
    for cx0 in [155,445]:
        b.append(f'<ellipse class="paperfill" stroke="var(--ink)" stroke-width="2.3" cx="{cx0}" cy="586" rx="44" ry="66"/>')
        # Asymmetric pebble shapes, staggered with alternating sizes like the two source pendants.
        pebbles=[(-25,-46,5,7),(-9,-48,6,5),(10,-45,5,7),(27,-40,6,5),(-31,-29,6,5),(-15,-30,5,7),(4,-29,7,5),(23,-26,5,7),(-26,-10,5,7),(-8,-12,7,5),(12,-9,5,6),(31,-7,5,5),(-30,9,6,5),(-14,7,5,7),(5,11,6,5),(24,12,7,5),(-24,28,5,6),(-5,29,7,5),(15,30,5,7),(30,31,5,5),(-14,46,6,5),(6,48,5,6)]
        for dx,dy,rx,ry in pebbles:
            b.append(f'<ellipse class="fine" cx="{cx0+dx}" cy="{586+dy}" rx="{rx}" ry="{ry}" transform="rotate({dx%27-13} {cx0+dx} {586+dy})"/>')
    b.append('</g><g id="small-framed-face" data-editable-part="face">')
    b.append('<path class="inkfill" d="M266 502 Q270 484 282 482 L318 482 Q330 486 334 505 L335 570 Q328 584 300 588 Q272 584 265 570Z"/>')
    b.append('<path class="paperfill" d="M276 506 Q280 493 289 493 L311 493 Q320 495 324 507 L322 558 Q316 571 300 573 Q284 571 278 558Z"/>')
    b.append('<path class="line" d="M285 523 l8-1 M307 522 l8 1 M299 526 l-2 18 6 1 M293 558 q7 3 14 0"/>')
    b.append('</g><g id="long-diamond-gown" data-editable-part="gown">')
    b.append('<path class="paperfill" stroke="var(--ink)" stroke-width="3.5" d="M278 578 L322 578 Q331 730 337 950 L263 950 Q269 730 278 578Z"/>')
    # Thin arms run beside the gown; small hand/finger lines terminate at the hem.
    b.append('<path class="line" d="M277 608 Q260 655 260 722 L258 917 M323 608 Q340 655 340 722 L342 917"/>')
    # Dense small, nested diamond repeats are clipped within the very narrow gown.
    b.append('<defs><clipPath id="gown-clip"><path d="M278 578 L322 578 Q331 730 337 950 L263 950 Q269 730 278 578Z"/></clipPath></defs><g clip-path="url(#gown-clip)" class="fine">')
    for y in range(590,945,23):
        for x in [281,300,319]:
            b.append(f'<path d="M{x} {y} l9 10 l-9 10 l-9-10Z M{x} {y+4} l5 6 l-5 6 l-5-6Z"/>')
    b.append('</g><path class="line" d="M258 917 l-9 18 12 10 8-17 M342 917 l9 18-12 10-8-17 M270 950 H330"/>')
    b.append('</g>')
    return wrap("g3-013-seven-triangle-woman","Seven-gore headdress and long patterned gown","G3-013",''.join(b),"0 0 600 1000",note="Contemporary editable vector study following the supplied woman: 470-unit seven-wedge disk above a narrow 74-unit gown, dense straight V-shaped chord hatching and nested rim triangles; hanging pebble-pattern side ovals; small elongated framed face; narrow diamond-pattern gown, long arms and hands at hem. Source proportions are interpreted, not traced.")

def angular_man():
    b=['<g id="dimmed-background-figures" data-editable-part="background-figures" opacity=".18">']
    for x,y in [(90,160),(490,150),(105,550),(490,590),(72,360),(530,390)]:
        b.append(f'<circle class="fine" cx="{x}" cy="{y}" r="14"/><path class="fine" d="M{x-16} {y+28} q16-14 32 0 l12 62 h-56Z M{x} {y+25} v78 M{x-35} {y+45} l35 18 34-25"/>')
    b.append('</g><g id="star-man-outline" data-editable-part="elongated-angular-man">')
    b.append('<path class="paperfill" stroke="var(--ink)" stroke-width="5" stroke-linejoin="round" d="M300 75 L330 148 L489 108 L408 245 L550 324 L410 408 L464 681 L300 548 L148 688 L191 412 L55 330 L201 246 L145 108 L270 155Z"/>')
    b.append('<path class="ochrefill" stroke="var(--ink)" stroke-width="3" d="M273 115 L300 68 L326 117 L316 176 L285 180Z"/>')
    b.append('<path class="inkfill" d="M316 116 L332 140 L322 179 L306 180Z"/><ellipse class="paperfill" stroke="var(--ink)" stroke-width="3" cx="300" cy="121" rx="11" ry="8"/><circle class="inkfill" cx="304" cy="121" r="3"/>')
    b.append('<path class="line" d="M200 247 L99 153 L122 283 L190 323 M196 412 L300 306 L410 408 M300 306 L300 548 M410 408 L515 328"/>')
    # Netted heart-like chest panel, held as its own editable motif.
    b.append('<path class="paperfill" stroke="var(--ink)" stroke-width="3" d="M300 283 C279 250 238 262 242 294 C246 321 300 354 300 354 C300 354 354 321 358 294 C362 262 321 250 300 283Z"/>')
    for x in range(250,355,16): b.append(f'<path class="fine" d="M{x} 283 L{x+30} 327 M{x+28} 278 L{x-4} 326"/>')
    b.append('<path class="line" d="M245 306 L192 412 L300 548 L408 408 M270 155 L285 180 M316 179 L330 148"/>')
    b.append('<path class="inkfill" d="M190 405 L207 413 L156 676 L143 684Z M406 402 L421 407 L468 671 L453 681Z"/>')
    b.append('<path class="fine" d="M200 420 L300 530 L401 420 M165 660 L297 541 L451 662"/>')
    b.append('</g>')
    return wrap("g3-014-angular-man","Elongated angular man with subdued surrounding figures","G3-014",''.join(b),note="Source-informed editable vector study following the supplied abstract man: face at top, dark right-face edge, raised left arm, long pointed legs and a netted heart-like chest panel. Surrounding figures are separate and dimmed. Not a bird or architectural reconstruction.")

def heart():
    b=['<defs><clipPath id="heart-clip"><path d="M300 662 C270 625 88 496 77 330 C65 175 237 116 300 248 C363 116 535 175 523 330 C512 496 330 625 300 662Z"/></clipPath></defs>']
    b.append('<g id="heart-outline" data-editable-part="heart-outline"><path class="paperfill" stroke="var(--ink)" stroke-width="5" d="M300 662 C270 625 88 496 77 330 C65 175 237 116 300 248 C363 116 535 175 523 330 C512 496 330 625 300 662Z"/></g>')
    b.append('<g id="central-figures" data-editable-part="central-figures" clip-path="url(#heart-clip)">')
    # Original is a densely packed crowd/portrait collage; these figures retain a central large pair with small heads around them.
    for y in [183,227,483,527]:
        for x in range(105,520,43):
            b.append(f'<circle class="paperfill" stroke="var(--ink)" stroke-width="2" cx="{x}" cy="{y}" r="14"/><path class="line" stroke-width="1.8" d="M{x-11} {y+14} q11-10 22 0 l7 30 h-36Z M{x-6} {y-2} l4 2 M{x+4} {y-2} l4 2 M{x-4} {y+7} q4 4 8 0"/>')
    b.append('<path class="nilefill" stroke="var(--ink)" stroke-width="4" d="M195 270 Q300 225 405 270 L435 489 Q300 545 165 489Z"/>')
    for i,x in enumerate([238,300,362]):
        y=350+(i%2)*12
        b.append(f'<circle class="paperfill" stroke="var(--ink)" stroke-width="3" cx="{x}" cy="{y}" r="30"/><path class="line" d="M{x-12} {y-4} l7 3 M{x+5} {y-4} l7 3 M{x-8} {y+10} q8 8 16 0 M{x-34} {y+31} q34-23 68 0 l14 84 h-96Z"/>')
    b.append('<path class="ochrefill" stroke="var(--ink)" stroke-width="3" d="M187 432 Q300 406 413 432 L431 509 Q300 548 169 509Z"/>')
    for i in range(8):
        x=186+i*32
        b.append(f'<circle class="paperfill" cx="{x}" cy="{448+(i%2)*15}" r="5"/>')
    b.append('</g><g id="edge-rosettes" data-editable-part="outer-face-cluster">')
    for i in range(18):
        import math
        a=2*math.pi*i/18-math.pi/2; x=300+226*math.cos(a); y=390+264*math.sin(a)
        b.append(f'<circle class="redfill" stroke="var(--ink)" stroke-width="2" cx="{x:.1f}" cy="{y:.1f}" r="11"/><circle class="paperfill" cx="{x:.1f}" cy="{y:.1f}" r="4"/>')
    b.append('</g>')
    return wrap("g3-016-crowd-heart","Rotated crowd-heart composition","G3-016",''.join(b),note="Editable contemporary vector study of the supplied dense ornamental heart, rotated so the point faces down. A distinct central group is surrounded by many small faces; details are simplified and not an exact trace.")

def conversations():
    b=['<g id="conversation-field" data-editable-part="conversation-field">']
    # Ornamental side characters preserve the source's bird / human / flower / fish pairing.
    for y in [142,300,470,625]:
        b.append(f'<ellipse class="paperfill" stroke="var(--ink)" stroke-width="3" cx="300" cy="{y}" rx="78" ry="40"/><path class="fine" d="M260 {y+30} l-13 24 l34-16 M340 {y+30} l14 24 l-35-16"/>')
    for x,y,kind in [(125,155,'bird'),(468,155,'bird'),(125,314,'person'),(468,314,'person'),(125,484,'flower'),(468,484,'flower'),(125,637,'fish'),(468,637,'fish')]:
        b.append(f'<g id="{kind}-{x}-{y}" data-editable-part="{kind}">')
        if kind=='bird': b.append(f'<path class="ochrefill" stroke="var(--ink)" stroke-width="2" d="M{x-30} {y} q15-25 32 0 q16-18 29 0 q-18 21-61 0Z M{x+28} {y} l19-9 -4 16Z"/><circle class="inkfill" cx="{x+5}" cy="{y-5}" r="2"/>')
        elif kind=='person': b.append(f'<circle class="nilefill" stroke="var(--ink)" stroke-width="2" cx="{x}" cy="{y-12}" r="18"/><path class="line" d="M{x} {y+7} v46 M{x} {y+20} l-30 19 M{x} {y+20} l30 19 M{x} {y+53} l-24 28 M{x} {y+53} l24 28"/>')
        elif kind=='flower':
            for j in range(6): b.append(f'<ellipse class="ochrefill" stroke="var(--ink)" stroke-width="1.5" cx="{x+14*__import__("math").cos(j*__import__("math").pi/3):.1f}" cy="{y+14*__import__("math").sin(j*__import__("math").pi/3):.1f}" rx="8" ry="13" transform="rotate({j*60} {x} {y})"/>')
            b.append(f'<circle class="nilefill" cx="{x}" cy="{y}" r="8"/><path class="line" d="M{x} {y+26} v40 m0-22 q-23-15-24 4 m24 6 q24-18 28 0"/>')
        else: b.append(f'<path class="nilefill" stroke="var(--ink)" stroke-width="2" d="M{x-32} {y} q32-30 64 0 q-32 30-64 0Z M{x+31} {y} l21-14 -3 29Z"/><circle class="paperfill" cx="{x-7}" cy="{y-3}" r="3"/>')
        b.append('</g>')
    b.append('</g>')
    return wrap("g3-003-empty-conversations","Conversation motifs with empty speech balloons","G3-003",''.join(b),note="Editable conversation composition retaining paired bird, person, flower and fish motifs around eight empty speech balloons. Arabic source text is intentionally omitted per brief.")

def windows():
    b=['<g id="sun-and-arch" data-editable-part="arch-scene">']
    b.append('<path class="paperfill" stroke="var(--ink)" stroke-width="4" d="M60 670 V333 A240 240 0 0 1 540 333 V670Z"/><circle class="ochrefill" cx="300" cy="106" r="30"/>')
    for x in [170,300,430]:
        for y in [270,405]:
            b.append(f'<path class="nilefill" stroke="var(--ink)" stroke-width="3" d="M{x-47} {y+57} v-53 a47 47 0 0 1 94 0 v53Z"/><path class="paperfill" stroke="var(--ink)" stroke-width="2" d="M{x-34} {y+44} v-39 a34 34 0 0 1 68 0 v39Z"/><path class="line" d="M{x} {y-28} v72 M{x-34} {y+7} h68"/><circle class="redfill" cx="{x}" cy="{y-6}" r="6"/><path class="line" d="M{x-13} {y+14} q13-14 26 0"/>')
    b.append('<path class="line" d="M60 582 H540 M90 582 l-25 88 M510 582 l25 88"/>')
    for x in [210,270,330,390]: b.append(f'<circle class="ochrefill" cx="{x}" cy="600" r="9"/>')
    b.append('</g><g id="street-figures" data-editable-part="street-figures">')
    for x in [255,300,345]: b.append(f'<circle class="paperfill" stroke="var(--ink)" stroke-width="2" cx="{x}" cy="620" r="8"/><path class="line" d="M{x} 628 v30 m0-21 l-10 12 m10-12 l10 12 m-10 9 l-9 15 m9-15 l10 15"/>')
    b.append('</g>')
    return wrap("g3-006-window-village","Arched window grid and street scene","G3-006",''.join(b),note="Editable study based on the blue-ink source: one large arched enclosure, six framed portrait windows, sun, ground rail and small street figures.")

def footer(which):
    b=['<g id="continuous-footer-path" data-editable-part="footer-line">']
    b.append('<path class="line" stroke-width="5" d="M30 604 C80 604 68 530 120 530 S162 613 216 588 S270 514 320 542 S377 620 430 575 S500 522 570 543"/>')
    # distinct linked vignettes follow the source strip's connected, hand-drawn rhythm.
    for i,x in enumerate([65,145,225,305,385,465,535]):
        y=560+(i%2)*30
        b.append(f'<g id="vignette-{i+1}" data-editable-part="footer-vignette"><circle class="paperfill" stroke="var(--ink)" stroke-width="2" cx="{x}" cy="{y-30}" r="11"/><path class="line" d="M{x} {y-19} v35 m0-20 l-18 13 m18-13 l18 13 m-18 7 l-14 19 m14-19 l14 19"/><path class="nilefill" stroke="var(--ink)" stroke-width="2" d="M{x-30} {y+29} h60 l-9 15 h-42Z"/></g>')
    b.append('</g>')
    title="Connected story strip part "+str(which)
    return wrap(f"g3-00{6+which}-footer-strip-part{which}",title,f"G3-00{6+which}",''.join(b),"0 0 600 700",note="Contemporary editable horizontal footer strip study based on the supplied rotated page. Keep as a supplemental narrative footer, not a primary brand footer. No source wording is recreated.")

def poster_template():
    b=['<g id="outer-floral-rail" data-editable-part="outer-floral-rail">']
    b.append('<rect x="35" y="35" width="530" height="690" rx="5" class="nilefill"/>')
    b.append('<rect x="55" y="55" width="490" height="650" class="paperfill"/>')
    for x in range(70,540,30):
        for y in [72,688]: b.append(f'<circle class="ochrefill" cx="{x}" cy="{y}" r="6"/><path class="fine" d="M{x} {y} q-11-19-18-4 q8 14 18 4 q11-19 18-4 q-8 14-18 4"/>')
    for y in range(92,690,36):
        for x in [72,528]: b.append(f'<path class="fine" d="M{x} {y} q-20 12 0 24 q20-12 0-24Z"/>')
    b.append('</g><g id="central-art-panel" data-editable-part="central-art-panel"><rect x="115" y="176" width="370" height="390" class="inkfill"/>')
    b.append('<circle class="nilefill" stroke="var(--paper)" stroke-width="3" cx="300" cy="370" r="125"/>')
    for r in [100,78,56]: b.append(f'<circle class="fine" stroke="var(--paper)" cx="300" cy="370" r="{r}"/>')
    for i in range(16):
        import math
        a=2*math.pi*i/16; x=300+96*math.cos(a); y=370+96*math.sin(a)
        b.append(f'<path class="ochrefill" d="M{x:.1f} {y:.1f} l-9-9 l9-9 l9 9Z"/>')
    b.append('<path class="paperfill" d="M225 435 L300 270 L375 435 L300 410Z"/><circle class="ochrefill" cx="300" cy="360" r="25"/>')
    b.append('</g><g id="editable-type-zones" data-editable-part="type-zones"><rect class="paperfill" stroke="var(--ink)" stroke-width="2" x="115" y="93" width="370" height="58"/><rect class="paperfill" stroke="var(--ink)" stroke-width="2" x="115" y="590" width="370" height="65"/></g>')
    return wrap("g3-009-pattern-poster-template","Patterned poster template without source lettering","G3-009",''.join(b),note="Editable poster layout study from the ornate cover: outer floral rails, central dark art panel and open title/caption zones. Source calligraphy is not traced or imitated.")

def frame(landscape=False):
    if not landscape:
        b=['<g id="outer-frame" data-editable-part="outer-frame"><rect x="48" y="40" width="504" height="680" rx="18" class="ochrefill"/><rect x="65" y="57" width="470" height="646" rx="13" class="nilefill"/>']
        b.append('<ellipse class="paperfill" stroke="var(--ink)" stroke-width="5" cx="300" cy="356" rx="175" ry="245"/><ellipse class="line" cx="300" cy="356" rx="164" ry="234"/>')
        for y in range(112,664,44):
            for x in [87,513]: b.append(f'<circle class="paperfill" cx="{x}" cy="{y}" r="6"/><path class="fine" d="M{x} {y+7} q-22 16 0 29 q22-13 0-29"/>')
        b.append('</g>')
        nm="g3-010-portrait-frame"; ttl="Oval portrait frame and floral rail"; src="G3-010"; note="Editable frame study: preserve the reference's nested rectangular field, oval aperture and repeated floral side rails; the portrait remains a replaceable opening."
    else:
        b=['<g id="postcard-border" data-editable-part="postcard-border"><rect x="20" y="20" width="760" height="520" class="paperfill"/><rect x="48" y="48" width="704" height="464" class="nilefill"/><rect x="68" y="68" width="664" height="424" class="paperfill"/>']
        b.append('<rect class="paperfill" stroke="var(--ink)" stroke-width="3" x="220" y="90" width="476" height="300"/><path class="nilefill" d="M228 345 Q360 192 488 282 T690 155 V382 H228Z"/><path class="line" d="M228 319 Q340 255 430 300 T690 230"/>')
        for x in [112,160,716]:
            b.append(f'<path class="ochrefill" stroke="var(--ink)" stroke-width="2" d="M{x} 386 v-178 m{x} 24 q-68-76-91-19 q37 48 91 19 q40-91 100-58 q-25 61-100 58"/>')
        b.append('<path class="inkfill" d="M77 388 l38-146 l38 146Z M140 388 l26-106 l28 106Z M702 388 l23-95 l27 95Z"/><rect x="200" y="410" width="496" height="69" class="paperfill" stroke="var(--ink)" stroke-width="2"/></g>')
        nm="g3-012-river-postcard-frame"; ttl="Landscape river photograph frame"; src="G3-012"; note="Editable postcard layout study retaining the source's landscape photo aperture, pyramid-and-palm side scene and separate caption band; source English verse is omitted."
    return wrap(nm,ttl,src,''.join(b),"0 0 800 560" if landscape else "0 0 600 760",note=note)

def chairs():
    b=['<g id="chair-row" data-editable-part="chair-row">']
    for x in [90,220,350,480]:
        b.append(f'<g id="chair-{x}" data-editable-part="ornate-chair" transform="translate({x} 0)"><path class="line" d="M-40 220 V90 Q0 42 40 90 V220 M-30 206 V99 Q0 70 30 99 V206 M-43 220 H43 L37 276 H-37Z M-31 276 v180 m62-180 v180 M-31 299 H31 M-39 455 h-8 m70 0 h8"/><path class="nilefill" d="M-37 218 H37 L32 267 H-32Z"/><path class="fine" d="M-25 123 Q0 95 25 123 V201 H-25Z M-25 140 H25 M0 122 V202 M-37 222 H37 M-30 281 H30"/><circle class="ochrefill" cx="0" cy="69" r="8"/><path class="fine" d="M-13 74 L0 53 L13 74"/></g>')
    b.append('</g>')
    return wrap("g3-017-ornate-chair-row","Ornate chair collection (upright)","G3-017",''.join(b),note="Editable furniture study based on the sideways source, rotated to put chair feet down and backs up. Repeated tall chair backs, seat aprons, legs, finials and inset panels remain individually grouped; these are chairs, not buildings.")

def pyramid_ship():
    b=['<g id="outer-pyramid-ship" data-editable-part="ship-outline"><path class="paperfill" stroke="var(--ink)" stroke-width="5" d="M300 48 L520 655 H80Z"/><path class="nilefill" stroke="var(--ink)" stroke-width="4" d="M300 92 L393 598 H207Z"/></g>']
    b.append('<g id="ship-cabin" data-editable-part="decorated-cabin"><path class="ochrefill" stroke="var(--ink)" stroke-width="3" d="M221 330 Q300 285 379 330 L361 456 H239Z"/><path class="line" d="M229 337 Q300 315 371 337 M239 450 H361"/><circle class="paperfill" stroke="var(--ink)" stroke-width="2" cx="300" cy="372" r="23"/><path class="line" d="M288 370 l7 3 m10-3 l7 3 m-17 12 q5 5 10 0"/><path class="fine" d="M246 421 l27-58 M354 421 l-27-58"/></g>')
    b.append('<g id="exhaust-and-clouds" data-editable-part="exhaust"><path class="line" stroke-width="5" d="M242 604 v60 m18-57 v68 m20-65 v75 m20-77 v82 m20-82 v78 m20-74 v67 m20-61 v55"/><path class="muted" d="M475 245 q30-34 60 0 q-17 21-60 0 M65 250 q34-34 66 0 q-18 23-66 0"/></g>')
    return wrap("g3-018-pyramid-ship","Pyramid-form ship with figure cabin","G3-018",''.join(b),note="Editable contemporary redraw of the supplied triangular rocket/ship silhouette with segmented decorated body, small face, side clouds and exhaust. It is a ship motif, not an architectural pyramid reconstruction.")

def pyramids_bricks():
    b=['<g id="pyramid-course-field" data-editable-part="brick-pyramids">']
    def pyramid(x,base,height,w,scale=1):
        top=base-height
        lines=[f'<path class="paperfill" stroke="var(--ink)" stroke-width="3" d="M{x} {base} L{x+w/2} {top} L{x+w} {base}Z"/>']
        rows=5
        for j in range(1,rows):
            y=base-height*j/rows; half=w*j/rows/2
            lines.append(f'<path class="fine" d="M{x+w/2-half:.1f} {y:.1f} H{x+w/2+half:.1f}"/>')
            n=max(2,round(j*1.8))
            for k in range(n):
                xx=x+w/2-half+(2*half)*(k+.5)/n + (0 if j%2 else 9)
                lines.append(f'<path class="fine" d="M{xx:.1f} {y+1:.1f} V{base-height*(j-1)/rows:.1f}"/>')
        return ''.join(lines)
    b.append(pyramid(80,570,380,420)+pyramid(445,570,160,170))
    b.append('</g><g id="running-figures" data-editable-part="figures"><path class="line" d="M65 343 l18-26 16 7 6 28 -17 14 -8 28 -12-2 9-29 -23-15 2-12 23 10 M492 299 l17-25 15 8 8 25 -17 13 -9 28 -12-3 9-27 -24-17 4-12 22 12"/><rect class="nilefill" x="242" y="206" width="90" height="48"/><path class="fine" d="M258 239 l15-16 15 16 m5 0 14-16 15 16"/></g>')
    return wrap("g3-020-brick-pyramids","Staggered masonry pyramids with running figures","G3-020",''.join(b),"0 0 600 620",note="Editable landscape cartoon study emphasizing staggered brick/coursing on two pyramids, two running figures and a small inset screen near the apex.")

def arabic_question():
    b=['<g id="arabic-question-mark" data-editable-part="arabic-question-mark">']
    b.append('<path class="nilefill" d="M302 108 C181 108 103 184 103 302 C103 403 163 453 238 493 C278 516 292 540 292 576 L292 604 C292 638 270 657 239 657 C213 657 197 642 197 620 C197 592 218 578 246 578 L256 578 C249 538 228 518 188 494 C122 455 72 398 72 300 C72 161 166 66 304 66 C441 66 528 151 528 272 C528 353 490 410 426 441 C381 463 363 489 360 535 L299 535 C301 465 325 429 387 395 C439 366 465 328 465 271 C465 174 401 108 302 108Z"/>')
    b.append('<circle class="nilefill" cx="260" cy="690" r="26"/></g>')
    return wrap("g3-021-arabic-question-mark","Arabic question mark glyph, words removed","G3-021",''.join(b),note="Editable standalone Arabic question-mark form (؟) with its separate lower dot; source wording is removed. It is a punctuation glyph, not a speech bubble.")

def comic_layout():
    b=['<g id="four-panel-grid" data-editable-part="four-panel-layout">']
    b.append('<rect x="26" y="25" width="548" height="710" class="paperfill" stroke="var(--ink)" stroke-width="3"/>')
    b.append('<rect x="45" y="45" width="510" height="145" fill="#e8bd4b"/><rect x="45" y="205" width="245" height="188" fill="#e7a2b0"/><rect x="310" y="205" width="245" height="188" fill="#d98d3d"/><rect x="45" y="408" width="510" height="306" fill="#80b9c0"/>')
    # Panel-specific illustration rhythms echo the distinct source blocks without copying text.
    for x in [112,218,324,430]: b.append(f'<circle class="paperfill" stroke="var(--ink)" stroke-width="2" cx="{x}" cy="122" r="15"/><path class="line" d="M{x} 137 v26 m0-18 l-16 9 m16-9 l16 9 m-16 9 l-12 11 m12-11 l12 11"/>')
    b.append('<path class="line" d="M80 104 h40 l18 22 M182 104 h40 l18 22 M284 104 h40 l18 22 M386 104 h40 l18 22"/>')
    b.append('<ellipse class="nilefill" cx="165" cy="285" rx="44" ry="54"/><path class="line" d="M130 330 l-24 40 h117 l-20-40 M147 267 l12 3 m25-3 12 3 m-34 20 q13 9 26 0"/>')
    b.append('<rect class="nilefill" x="345" y="252" width="160" height="84"/><path class="line" d="M370 270 h26 v28 h-26z m45 0 h26 v28 h-26z m45 0 h26 v28 h-26z M370 315 h92"/>')
    for x in [95,155,215,275,335,395,455,515]: b.append(f'<circle class="paperfill" stroke="var(--ink)" stroke-width="2" cx="{x}" cy="478" r="9"/><path class="line" d="M{x} 487 v24 m0-15 l-9 10 m9-10 l9 10 m-9 5 l-7 12 m7-12 l8 12"/>')
    b.append('<path class="inkfill" d="M58 650 Q130 594 200 650 T342 650 T532 650 V700 H58Z"/><path class="fine" stroke="var(--paper)" d="M70 672 Q130 630 190 672 T310 672 T430 672 T530 672"/>')
    b.append('</g>')
    return wrap("g3-002-four-panel-layout","Four-panel page layout in GMD color roles","G3-002",''.join(b),note="Editable layout/color study based on the four-panel source page: one broad top panel, two side-by-side middle panels, and one broad lower panel. Source wording is not copied; panel colors are adapted to GMD roles.")

def editorial_frame():
    b=['<g id="diamond-side-rails" data-editable-part="page-rails"><rect x="42" y="32" width="516" height="696" class="paperfill" stroke="var(--ink)" stroke-width="3"/>']
    for y in range(70,700,32):
        for x in [60,540]: b.append(f'<path class="nilefill" d="M{x} {y-11} l10 11 l-10 11 l-10-11Z"/><path class="fine" d="M{x} {y-6} l6 6 l-6 6 l-6-6Z"/>')
    b.append('</g><g id="headline-scroll" data-editable-part="scroll-heading"><path class="paperfill" stroke="var(--ink)" stroke-width="3" d="M112 102 L488 102 L462 137 L488 173 L112 173 L138 137Z"/><path class="fine" d="M142 137 H458"/></g>')
    b.append('<g id="portrait-and-text-window" data-editable-part="editorial-frame"><path class="inkfill" d="M130 222 H470 L434 258 V489 L470 525 H130 L166 489 V258Z"/><rect x="192" y="255" width="216" height="238" class="paperfill"/>')
    b.append('<path class="fine" d="M215 475 Q230 408 280 406 Q330 408 346 475 M249 320 q31-57 62 0 v67 q-32 38-62 0Z"/>')
    b.append('<path class="fine" d="M92 568 H508 M92 586 H508 M92 604 H508 M92 622 H508 M92 640 H508 M92 658 H508"/>')
    b.append('</g>')
    return wrap("g3-019-editorial-frame","Editorial portrait frame and side rails","G3-019",''.join(b),note="Editable editorial frame study retaining source's side diamond rails, zigzag scroll-heading zone, heavy side fields around a replaceable portrait opening, and copy lines. Source portrait and Arabic article text are not traced.")

assets=[
 save("G3-002-four-panel-layout",comic_layout()), save("G3-003-empty-conversations",conversations()), save("G3-006-window-village",windows()),
 save("G3-007-footer-strip-part1",footer(1)),save("G3-008-footer-strip-part2",footer(2)),
 save("G3-009-pattern-poster-template",poster_template()),save("G3-010-portrait-frame",frame()),
 save("G3-012-river-postcard-frame",frame(True)),save("G3-013-seven-triangle-woman",woman_disk()),
 save("G3-014-angular-man",angular_man()),save("G3-016-crowd-heart",heart()),
 save("G3-017-ornate-chair-row",chairs()),save("G3-018-pyramid-ship",pyramid_ship()),save("G3-019-editorial-frame",editorial_frame()),
 save("G3-020-brick-pyramids",pyramids_bricks()),save("G3-021-arabic-question-mark",arabic_question())]
print("generated",len(assets),"SVGs")
