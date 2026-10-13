from pathlib import Path
import math, json

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'assets'
OUT.mkdir(parents=True,exist_ok=True)
W,H=60,36
P={"paper":"#F7F4EF","nile":"#1034A6","ink":"#140206","pink":"#FF6183","sand":"#D5C4A8","warm":"#EAE5DE","ice":"#B8D9E5"}
# Palette layers are intentionally semantic and can be edited from each SVG's CSS custom properties.
items=[
 ('rosette','Rosette Bloom','connected-parquet-morph.svg',5,'A geometric pixel interpretation of the existing 16-fold connected parquet cells.','radial'),
 ('parquet','Connected Parquet','connected-parquet-morph.svg',6,'A geometric interpretation of the staggered connected parquet grid.','parquet'),
 ('register','Hanging Register','egyptian-pendant-register.svg',5,'A geometric interpretation of the loop-chain header and five-rib hanging leaves in the existing register.','register'),
 ('star-field','Eight-Point Field','dual-level-field.svg',6,'A geometric interpretation of the nested eight-point stars and rotated secondary grid in the existing field.','star'),
 ('strapwork','Interlace Crossings','true-interlace-panel.svg',5,'A geometric interpretation of alternating diagonal ribbons and crossing nodes in the existing strapwork.','interlace'),
 ('river-bands','River Bands','connected-parquet-morph.svg',8,'A geometric interpretation of the parquet cell rhythm as horizontal broken bands and lozenges.','river'),
 ('pendant-arches','Pendant Arches','egyptian-pendant-register.svg',7,'A geometric interpretation of the register’s looped crown and descending fan ribs.','arches'),
 ('star-lattice','Star Lattice','dual-level-field.svg',4,'A geometric interpretation of compact eight-point hubs and the existing field’s rotated lattice cadence.','lattice'),
 ('crossing-ribbons','Crossing Ribbons','true-interlace-panel.svg',8,'A geometric interpretation of the existing strapwork’s broad over-under diagonal cadence.','ribbons'),
 ('rosette-medallion','Medallion Field','connected-parquet-morph.svg',9,'A 16-fold medallion interpretation of the existing parquet cell geometry.','medallion'),
 ('leaf-register','Leaf Register','egyptian-pendant-register.svg',4,'A close pixel interpretation of the existing register’s five-rib leaf pendants and loop border.','leaves'),
 ('dual-grid','Dual Grid Mosaic','dual-level-field.svg',6,'A geometric interpretation of the existing field’s two offset square grids, stars, and hubs.','dual'),
]

def dist_angle(x,y,cx,cy):
 dx=x-cx; dy=y-cy
 return math.hypot(dx,dy), math.atan2(dy,dx)
def rosette(x,y,cx,cy,scale=1):
 r,a=dist_angle(x,y,cx,cy)
 # 16-fold star outline plus inner ring, low radial bands produce readable stepped rosette silhouettes
 edge=6.3*scale + 2.0*scale*math.cos(8*a)
 if r < 1.25*scale: return 3
 if abs(r-(3.0*scale+0.45*scale*math.cos(8*a))) < .62*scale: return 1
 if r < edge and r > 1.5*scale:
  return 2 if int((a+math.pi)*8/math.pi)%2==0 else 1
 return 0
def cell(kind,x,y):
 if kind=='radial':
  best=0
  for cx,cy in [(15,11),(45,11),(15,27),(45,27)]: best=max(best,rosette(x,y,cx,cy,.8))
  return best
 if kind=='parquet':
  best=0
  # 8-lobed connecting cells on staggered centers
  for row,cy in enumerate((2,14,26,38)):
   for cx in range(-5,66,12):
    v=rosette(x,y,cx+(6 if row%2 else 0),cy,0.72)
    if v: best=max(best, (v if row%2==0 else (2 if v==1 else 1)))
  return best
 if kind=='register':
  # horizontal wave-loop chain and fan leaves. Shape follows the actual repeated register proportions.
  q=x%12; row=y%25
  if row<5 and abs(row-(2+1.5*math.cos((q/12)*2*math.pi)))<.8: return 2
  if 5<=row<=21:
   t=(row-5)/16
   center=6
   half=0.8+4.3*t
   if abs(q-center)<=half and ((q-center)/max(half,.5))**2 + (t-.35)**2 < 1.25:
    ribs=min(range(5),key=lambda k:abs(q-(center+(k-2)*half/2)))
    return 3 if row==5 else (1 if ribs%2 else 2)
  if row==23 and 2<=q<=10:return 1
  return 0
 if kind in ('star','lattice','dual'):
  step=12 if kind!='dual' else 10
  ox,oy=(6,6) if kind=='star' else (0,0)
  best=0
  for cy in range(-step,H+step,step):
   for cx in range(-step,W+step,step):
    cxx=cx+ox; cyy=cy+oy
    r,a=dist_angle(x,y,cxx,cyy)
    # 8-point star body with inner ring, in accordance with existing field geometry
    edge=4.0+1.5*math.cos(4*a)
    if r<1:return 3
    if abs(r-2.2)<.8:return 2
    if r<edge:return 1
    if kind=='lattice' and abs((x-cxx)-(y-cyy))<.75 and abs(x-cxx)<5:return 2
    if kind=='dual' and (abs(x-cxx)<.65 and abs(y-cyy)<5 or abs(y-cyy)<.65 and abs(x-cxx)<5):return 2
    best=max(best,0)
  # secondary diagonals recall offset interlocking field grid
  if kind in ('star','dual') and abs(((x+y)%12)-6)<.7:return 1
  return best
 if kind in ('interlace','ribbons'):
  period=20 if kind=='interlace' else 16
  s=(x+y)%period; t=(x-y)%period
  wide=2.3 if kind=='interlace' else 3.4
  a=abs(s-period/2)<wide; b=abs(t-period/2)<wide
  if a and b: return 3
  if a or b:
   return 2 if ((math.floor((x+y)/period)+math.floor((x-y)/period))%2==0) else 1
  # ribbon edge markers
  if (a and abs(s-period/2)<wide+.8) or (b and abs(t-period/2)<wide+.8): return 1
  return 0
 if kind=='river':
  # Horizontal segmented water bands, broken by pointed linked parquet cells.
  band= y%12
  if abs(band-2)<1:return 2
  if abs(band-9)<1:return 1
  q=(x+((y//12)%2)*6)%12
  if abs(q-6)<1 and (band<5 or band>6):return 3
  if band in (4,5,6,7) and abs(q-6)<(band-3 if band<6 else 8-band): return 1
  return 0
 if kind=='arches':
  q=x%15; row=y%24
  # stepped scalloped arch crown, tapered pendant and foot
  arch=abs(row-(4-abs(q-7)/2.0))<1.1 and 1<q<14
  if arch:return 2
  if 5<=row<=19:
   half=(row-4)*.30+1
   if abs(q-7)<half:
    return 3 if row==5 else (1 if abs(q-7)<.8 else 2)
  if row==21 and 3<=q<=11:return 1
  return 0
 if kind=='medallion':
  v=rosette(x,y,30,18,1.5)
  if v:return v
  # clipped quarter medallions repeat in corners like a tile panel
  return max(rosette(x,y,cx,cy,.72) for cx,cy in [(0,0),(60,0),(0,36),(60,36)])
 if kind=='leaves':
  q=x%10; row=y%22
  if row<3 and abs(row-(1+math.cos(q*math.pi/5)))<.75:return 2
  if 3<=row<=19:
   t=(row-3)/16; half=1+4*t
   if abs(q-5)<half and abs(q-5)<(row-1)*.29+1:
    return 3 if row==3 else (1 if int((q-5+5)*5)%2 else 2)
  if row==20 and 2<=q<=8:return 1
  return 0
 return 0

# write coherent color roles; blue is the signature field; pink is a restrained crossing/heart accent.
role_colors={0:None,1:'nile',2:'sand',3:'pink',4:'nile'}
manifest=[]
for slug,title,source,cell_px,description,kind in items:
 # Narrow four-role palette variations tune mood while maintaining shared system palette.
 if kind in ('interlace','ribbons'): role_colors_local={1:'ink',2:'nile',3:'pink'}
 elif kind in ('register','arches','leaves'): role_colors_local={1:'nile',2:'sand',3:'pink'}
 elif kind in ('river','dual'): role_colors_local={1:'nile',2:'ice',3:'pink'}
 elif kind=='medallion': role_colors_local={1:'nile',2:'sand',3:'ink'}
 else: role_colors_local={1:'nile',2:'sand',3:'pink'}
 grid=[[cell(kind,x,y) for x in range(W)] for y in range(H)]
 # Two fine blue stipple fields leave intentional paper apertures for text.
 # Bayer thresholding keeps this deterministic and avoids arbitrary noise.
 aperture = {'star-field':(30,18,12,8),'star-lattice':(30,18,15,9)}.get(slug)
 if aperture:
  ax,ay,rx,ry=aperture
  bayer=((0,8,2,10),(12,4,14,6),(3,11,1,9),(15,7,13,5))
  for gy in range(H):
   for gx in range(W):
    if ((gx-ax)/rx)**2+((gy-ay)/ry)**2 < 1.0:
     grid[gy][gx]=0
    elif grid[gy][gx]==0 and bayer[gy%4][gx%4] <= 2 + (1 if min(gx,W-1-gx,gy,H-1-gy)>5 else 0):
     grid[gy][gx]=4
 # Deterministic edge fade: stepwise strength variation based on Manhattan distance to closest edge, leaving a quiet center.
 # Keep highest contrast motif cells on the inside; fade edge cells by dropping selected low-priority pixels.
 rects=[]
 for y,row in enumerate(grid):
  x=0
  while x<W:
   role=row[x]
   if not role:
    x+=1; continue
   # selective stepped clipping/fade varies by motif, no randomness
   edge=min(x,W-1-x,y,H-1-y)
   if edge==0 and role==1 and (x+y)%2: x+=1; continue
   # merge same-color horizontal runs, while retaining grid boundaries and editable rect cells
   end=x+1
   while end<W and row[end]==role and (min(end,W-1-end,y,H-1-y)>0 or role!=1): end+=1
   # occasional cutout gaps at silhouette edge
   color=role_colors_local.get(role,'nile')
   opacity=' opacity="0.18"' if role==4 else ''
   rects.append(f'<rect x="{x}" y="{y}" width="{end-x}" height="1" fill="var(--{color})"{opacity}/>')
   x=end
 description=description.replace('&','&amp;').replace('<','&lt;')
 srcpath=f'public/assets/{source}'
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*cell_px}" height="{H*cell_px}" data-source="{srcpath}" data-cell="{cell_px}px">
<title>{title} · pixel background</title><desc>Source: {srcpath}. Use: decorative low-contrast surface behind text or cards. Cell size: {cell_px}px. {description}</desc>
<style>:root{{--paper:{P['paper']};--nile:{P['nile']};--ink:{P['ink']};--pink:{P['pink']};--sand:{P['sand']};--warm:{P['warm']};--ice:{P['ice']};}} .paper{{fill:var(--paper)}} .pixel{{shape-rendering:crispEdges}}</style>
<rect class="paper" width="{W}" height="{H}"/>
<g class="pixel" aria-label="{title}">{''.join(rects)}</g>
</svg>'''
 filename=f'pixel-{slug}.svg'
 (OUT/filename).write_text(svg,encoding='utf-8')
 manifest.append({'title':title,'source':srcpath,'filename':filename,'cell':f'{cell_px}px','use':'Decorative low-contrast surface behind text or cards.'})
(OUT/'pixel-atlas.json').write_text(json.dumps({'title':'GMD Pixel Background Atlas','version':'1.0.0','items':manifest},indent=2),encoding='utf-8')

# Reproducible contact sheet renderer using only the Python standard library (same rect geometry as SVGs).
import struct, zlib, xml.etree.ElementTree as ET
SHEET=ROOT/'proof'/'cvi'/'pixel-atlas.png'
SHEET.parent.mkdir(parents=True,exist_ok=True)
SW,SH=320,192; PAD=20; GAP=16; COLS=3; ROWS=4
SHEET_W=COLS*SW+(COLS+1)*PAD; SHEET_H=ROWS*SH+(ROWS+1)*GAP
canvas=[bytearray([247,244,239,255]*SHEET_W) for _ in range(SHEET_H)]
color_rgb={f'var(--{k})':tuple(bytes.fromhex(v[1:])) for k,v in P.items()}
for idx,(slug,title,source,cell_px,description,kind) in enumerate(items):
 svgroot=ET.parse(OUT/f'pixel-{slug}.svg').getroot()
 col=idx%COLS; row=idx//COLS; ox=PAD+col*(SW+PAD); oy=GAP+row*(SH+GAP)
 # keep proportional to the 60x36 viewBox; nearest-neighbor gives an honest crisp preview
 for el in svgroot.iter():
  if el.tag.endswith('rect') and el.get('class')!='paper':
   fill=el.get('fill'); rgb=color_rgb.get(fill,(16,52,166))
   if el.get('opacity'):
    alpha=float(el.get('opacity')); rgb=tuple(round(rgb[i]*alpha+(247,244,239)[i]*(1-alpha)) for i in range(3))
   x=int(float(el.get('x','0'))/W*SW); x2=max(x+1,int((float(el.get('x','0'))+float(el.get('width','1')))/W*SW))
   y=int(float(el.get('y','0'))/H*SH); y2=max(y+1,int((float(el.get('y','0'))+float(el.get('height','1')))/H*SH))
   px=bytes(rgb)+bytes((255,))
   for yy in range(oy+y, min(oy+y2,len(canvas))):
    for xx in range(ox+x,min(ox+x2,len(canvas[0])//4)):
     start=xx*4; canvas[yy][start:start+4]=px

def chunk(tag,data):
 return struct.pack('>I',len(data))+tag+data+struct.pack('>I',zlib.crc32(tag+data)&0xffffffff)
png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>2I5B',SHEET_W,SHEET_H,8,6,0,0,0))+chunk(b'IDAT',zlib.compress(b''.join(b'\x00'+bytes(r) for r in canvas),9))+chunk(b'IEND',b'')
SHEET.write_bytes(png)


