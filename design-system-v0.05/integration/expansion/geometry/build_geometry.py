"""Deterministic, dependency-free SVG geometry specimens for v0.05."""
from __future__ import annotations
import json, math
from pathlib import Path
from xml.etree import ElementTree as ET

HERE=Path(__file__).resolve().parent; OUT=HERE/'assets'; OUT.mkdir(exist_ok=True)
INK='#140206'; PAPER='#F7F4EF'; WARM='#EAE5DE'; NILE='#1034A6'; PINK='#FF6183'; SAND='#D5C4A8'; OCHRE='#8B661E'; TEAL='#176F73'
def f(x):
    if not math.isfinite(x): raise ValueError(f'nonfinite {x}')
    return f'{x:.4f}'.rstrip('0').rstrip('.') or '0'
def xy(p): return f'{f(p[0])},{f(p[1])}'
def poly(pts): return 'M'+' L'.join(xy(p) for p in pts)+' Z'
def regular(n,r,c=(160,160),rot=-90): return [(c[0]+r*math.cos(math.radians(rot+360*k/n)),c[1]+r*math.sin(math.radians(rot+360*k/n))) for k in range(n)]
def star(n,step,r,c=(160,160),rot=-90):
    pts=regular(n,r,c,rot);out=[];i=0
    for _ in range(n//math.gcd(n,step)):out.append(pts[i]);i=(i+step)%n
    return out
S=[]
def emit(sid,variant,title,source,family,params,body,periodic=False):
    content=f'<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><title>{title}</title><desc>Contemporary parameterized construction study; not a historical reconstruction.</desc><rect width="320" height="320" fill="{PAPER}"/>{body}</svg>'
    ET.fromstring(content)
    if 'transform=' in content:raise ValueError('SVG transform found')
    p=OUT/f'{sid}-{variant}.svg';p.write_text(content,encoding='utf-8',newline='\n')
    nums=[float(v) for v in __import__('re').findall(r'(?<![A-Za-z])[-+]?(?:\d+\.?\d*|\.\d+)',content)]
    if any(not math.isfinite(v) for v in nums):raise ValueError('nonfinite SVG number')
    S.append({'id':f'{sid}-{variant}','specimen':sid,'variant':variant,'file':f'assets/{p.name}','dimensions':[320,320],'family':family,'source':source,'status':'contemporary parameterized construction study','parameters':params,'periodic':periodic,'minimumSizeCssPx':{'outline':144,'filled':96,'band':112,'field':180,'aperture':96}.get(variant,112),'safeArea':'Central geometry inset 9%; keep text and controls outside strokes.'})

SRC={
 'hex':'Jay Bonner, Islamic Geometric Patterns, Fig.92, printed p.229 / PDF p.251; angle and polygon vocabulary reference, not traced.',
 'square':'Jay Bonner, Islamic Geometric Patterns, Fig.123, printed p.255 / PDF p.277; 4.8.8 construction family.',
 'radial':'Jay Bonner, Islamic Geometric Patterns, Fig.490D, printed p.534 / PDF p.556; eight radial segments, used only as 2D composition reference.',
 'egypt':'Ancient Egyptian Designs, PDF pp.12–16; visual register reference. Artifact, date and object attribution unverified.'}

def polygon_spec(sid,n,step,opening,seed):
    outer=regular(n,112,rot=opening-90);ratio=.48 if seed=='closed' else .62
    inner=regular(n,112*ratio,rot=opening-90+180/n);pts=[]
    for a,b in zip(outer,inner):pts.extend((a,b))
    connections=''.join(f'<path d="M{xy(outer[i])} L{xy(inner[(i+step)%n])}" fill="none" stroke="{NILE}" stroke-width="2.4"/>' for i in range(n))
    params={'hostPolygonSides':n,'orientationDeg':opening-90,'sourceAngleReferenceDeg':opening,'rayStep':step,'outerRadius':112,'innerRadiusRatio':ratio,'innerRingPhaseDeg':180/n,'construction':'rotated regular host; half-step inner ring; each outer vertex connects to inner index (i + rayStep) mod n; local radial specimen'}
    label={'hex-01':'Six-sided host / step-2 rays','hex-02':'Six-sided host / step-1 rays','dodec-01':'Twelve-sided host / step-5 rays','dodec-02':'Twelve-sided host / step-4 rays'}[sid]
    emit(sid,'outline',f'{label} / outline',SRC['hex'],'hex-dodecagonal',params,f'<path d="{poly(outer)}" fill="none" stroke="{INK}" stroke-width="2.5"/>'+f'<path d="{poly(inner)}" fill="none" stroke="{PINK}" stroke-width="2"/>'+connections)
    emit(sid,'filled',f'{label} / filled',SRC['hex'],'hex-dodecagonal',params,f'<path d="{poly(pts)}" fill="{SAND if seed=="closed" else PINK}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>'+connections)
    emit(sid,'band',f'{label} / band',SRC['hex'],'hex-dodecagonal',params,connections.replace('stroke-width="2.4"','stroke-width="12"')+f'<path d="{poly(inner)}" fill="none" stroke="{PAPER}" stroke-width="2"/>')

def sqoct(sid,theta,seed):
    pitch=64.;edge=pitch/(1+math.sqrt(2));parts=[];filled=[]
    for j in range(-1,6):
      for i in range(-1,6):
        op=regular(8,edge/(2*math.sin(math.pi/8)),(i*pitch+pitch/2,j*pitch+pitch/2),-22.5)
        sq=regular(4,edge/(2*math.sin(math.pi/4)),(i*pitch,j*pitch),0)
        parts.extend((f'<path d="{poly(op)}" fill="none" stroke="{SAND}" stroke-width=".8"/>',f'<path d="{poly(sq)}" fill="none" stroke="{SAND}" stroke-width=".8"/>'))
        filled.extend((f'<path d="{poly(op)}" fill="{SAND}" stroke="{INK}" stroke-width=".75"/>',f'<path d="{poly(sq)}" fill="{WARM}" stroke="{INK}" stroke-width=".75"/>'))
        for pts,n,st in ((op,8,3 if seed=='extended' else 2),(sq,4,1)):
          q=[];idx=0
          for _ in range(n//math.gcd(n,st)):q.append(pts[idx]);idx=(idx+st)%n
          parts.append(f'<path d="{poly(q)}" fill="none" stroke="{NILE}" stroke-width="1.15"/>')
    d=''.join(parts);params={'tiling':'4.8.8','cellPitch':pitch,'seed':seed,'sourceAngleReferenceDeg':theta,'octagonChordStep':3 if seed=='extended' else 2,'construction':'regular squares and octagons on a square translation cell with local star-chord overlays; the angle is recorded as source-family vocabulary, not as a reproduced ray construction'}
    emit(sid,'outline',f'{sid} outline',SRC['square'],'square-octagon',params,d,False)
    emit(sid,'filled',f'{sid} filled',SRC['square'],'square-octagon',params,''.join(filled)+d,False)
    emit(sid,'band',f'{sid} band',SRC['square'],'square-octagon',params,d.replace('stroke-width="1.15"','stroke-width="5"'),False)
    aperture=regular(8,118,rot=-22.5);square=regular(4,40,rot=0)
    emit(sid,'aperture',f'{sid} octagonal aperture',SRC['square'],'square-octagon',params,f'<path d="{poly(aperture)}" fill="{WARM}" stroke="{INK}" stroke-width="3"/><path d="{poly(square)}" fill="{PAPER}" stroke="{NILE}" stroke-width="2"/>',False)

def radial(sid,seed):
    base=[]
    for k in range(8):
      a0=-112.5+45*k;a1=a0+45;ri=48 if seed=='open' else 28;ro=126 if k%2==0 else 112
      pts=[(160+ri*math.cos(math.radians(a0)),160+ri*math.sin(math.radians(a0))),(160+ro*math.cos(math.radians(a0)),160+ro*math.sin(math.radians(a0))),(160+ro*math.cos(math.radians(a1)),160+ro*math.sin(math.radians(a1))),(160+ri*math.cos(math.radians(a1)),160+ri*math.sin(math.radians(a1)))]
      if seed=='ribbed':
       for t in (.34,.67):
        r=ri+(ro-ri)*t;base.append(f'<path d="M{xy((160+r*math.cos(math.radians(a0)),160+r*math.sin(math.radians(a0))))} L{xy((160+r*math.cos(math.radians(a1)),160+r*math.sin(math.radians(a1))))}" stroke="{NILE}" fill="none" stroke-width="1.5"/>')
      base.append(f'<path d="{poly(pts)}" fill="none" stroke="{NILE}" stroke-width="2.4"/>')
    params={'sectorCount':8,'sectorAngleDeg':45,'seed':seed,'innerRadius':48 if seed=='open' else 28,'outerRadiiAlternating':[126,112],'construction':'2D radial fan segments; not a dome surface or flattened gore reconstruction'}
    outlines=''.join(base);fills=[]
    for k in range(8):
      a0=-112.5+45*k;a1=a0+45;ri=48 if seed=='open' else 28;ro=126 if k%2==0 else 112
      pts=[(160+ri*math.cos(math.radians(a0)),160+ri*math.sin(math.radians(a0))),(160+ro*math.cos(math.radians(a0)),160+ro*math.sin(math.radians(a0))),(160+ro*math.cos(math.radians(a1)),160+ro*math.sin(math.radians(a1))),(160+ri*math.cos(math.radians(a1)),160+ri*math.sin(math.radians(a1)))]
      fills.append(f'<path d="{poly(pts)}" fill="{[NILE,SAND,TEAL,PINK,WARM,OCHRE][k%6]}" stroke="{PAPER}" stroke-width="2"/>')
    center='<circle cx="160" cy="160" r="28" fill="'+PAPER+'" stroke="'+INK+'" stroke-width="2"/>'
    emit(sid,'outline',sid+' outline',SRC['radial'],'radial-gore',params,outlines+center)
    emit(sid,'filled',sid+' filled',SRC['radial'],'radial-gore',params,''.join(fills)+center)
    emit(sid,'band',sid+' band',SRC['radial'],'radial-gore',params,outlines.replace('stroke-width="2.4"','stroke-width="12"')+center)

def egypt(sid,seed):
    parts=[];ink=NILE if seed=='pendant' else TEAL
    for idx,cx in enumerate((52,124,196,268)):
      if seed=='pendant':
       for j in range(5):
        x=cx+(j-2)*8;parts.append(f'<path d="M{cx},74 Q{x},108 {x},156" fill="none" stroke="{ink}" stroke-width="2"/>')
       isopen=idx%2==0;parts.append(f'<circle cx="{cx}" cy="66" r="{12 if isopen else 8}" fill="{PAPER if isopen else SAND}" stroke="{ink}" stroke-width="2"/>')
       parts.append(f'<path d="M{cx-26},164 Q{cx},182 {cx+26},164 M{cx},80 L{cx},208 M{cx-9},153 Q{cx},170 {cx+9},153 L{cx},208 Z" fill="none" stroke="{ink}" stroke-width="1.8"/>')
      else:
       for k in range(8):
        a=math.radians(45*k);x=cx+14*math.cos(a);y=72+14*math.sin(a);parts.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="5" fill="{SAND if k%2==0 else PAPER}" stroke="{ink}" stroke-width="1.5"/>')
       parts.append(f'<circle cx="{cx}" cy="72" r="5" fill="{PINK}"/><path d="M{cx-24},118 L{cx-12},136 L{cx},118 L{cx+12},136 L{cx+24},118 M{cx-24},146 L{cx-12},130 L{cx},146 L{cx+12},130 L{cx+24},146 M{cx-22},186 Q{cx-10},164 {cx},186 Q{cx+10},208 {cx+22},186" fill="none" stroke="{ink}" stroke-width="2"/>')
    params={'seed':seed,'moduleCenters':[52,124,196,268],'modulePitch':72,'baselineY':225,'construction':'contemporary vector register, paired variation and baseline; source page is visual reference only'}
    base=''.join(parts)+'<path d="M24,225 H296 M24,238 H296" stroke="'+ink+'" stroke-width="1.5"/>'
    emit(sid,'outline',sid+' outline',SRC['egypt'],'egyptian-register',params,base)
    emit(sid,'filled',sid+' filled',SRC['egypt'],'egyptian-register',params,base.replace('fill="none"','fill="'+SAND+'"'))
    emit(sid,'band',sid+' band',SRC['egypt'],'egyptian-register',params,base+f'<path d="M24,250 H296" stroke="{PINK}" stroke-width="8"/>')

polygon_spec('hex-01',6,2,60,'closed');polygon_spec('hex-02',6,1,90,'open')
polygon_spec('dodec-01',12,5,30,'closed');polygon_spec('dodec-02',12,4,60,'open')
sqoct('square-oct-01',45,'median');sqoct('square-oct-02',67.5,'extended')
radial('radial-01','open');radial('radial-02','ribbed')
egypt('egyptian-01','pendant');egypt('egyptian-02','rosette-chevron')

# Independently verify 4.8.8 area and every central-tile edge against its neighbor in a 3x3 patch.
pitch=1.;edge=pitch/(1+math.sqrt(2));area=(8*edge*edge/(4*math.tan(math.pi/8))+edge*edge)/pitch**2
def key(a,b):return (round(a[0],8),round(a[1],8),round(b[0],8),round(b[1],8))
counts={}
for j in range(-1,2):
 for i in range(-1,2):
  for pts in (regular(8,edge/(2*math.sin(math.pi/8)),(i+.5,j+.5),-22.5),regular(4,edge/(2*math.sin(math.pi/4)),(i,j),0)):
   for k,p in enumerate(pts):q=pts[(k+1)%len(pts)];z=key(p,q);counts[z]=counts.get(z,0)+1
unmatched=0
for pts,c in ((regular(8,edge/(2*math.sin(math.pi/8)),(.5,.5),-22.5),(.5,.5)),(regular(4,edge/(2*math.sin(math.pi/4)),(0,0),0),(0,0))):
 for k,p in enumerate(pts):
  q=pts[(k+1)%len(pts)]
  if counts.get(key(q,p),0)!=1:unmatched+=1
validation={'svgCount':len(S),'xmlParsed':True,'finiteNumericCoordinates':True,'transformAttributes':0,'repeatCheck':{'tiling':'4.8.8 square+octagon host cell','cellAreaRatio':round(area,10),'unmatchedInteriorEdges':unmatched,'edgeTest':'directed polygon edges in central unit checked against reversed neighbor edge across 3x3 translated cells','hostTilingVerified':abs(area-1.0)<1e-9 and unmatched==0,'generatedMotifSeamClaim':False,'reason':'current star-chord overlays are local motif studies; cross-boundary line continuity was not tested'},'nonRepeatFamilies':'radial and Egyptian compositions have no translation/seam claim'}
(HERE/'validation.json').write_text(json.dumps(validation,indent=2),encoding='utf-8',newline='\n')
manifest={'version':'0.1.0','generator':'build_geometry.py','classification':'contemporary parameterized construction studies; never historical facsimiles','assets':S,'specimens':{'hex-01':'Six-sided host / step-2 rays','hex-02':'Six-sided host / step-1 rays','dodec-01':'Twelve-sided host / step-5 rays','dodec-02':'Twelve-sided host / step-4 rays','square-oct-01':'4.8.8 median chord field','square-oct-02':'4.8.8 extended star-chord field','radial-01':'Eight-sector open-center fan','radial-02':'Eight-sector ribbed fan','egyptian-01':'Alternating open/closed pendant register','egyptian-02':'Rosette-chevron register'},'validation':'validation.json'}
(HERE/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8',newline='\n')
print(json.dumps(validation,indent=2))
