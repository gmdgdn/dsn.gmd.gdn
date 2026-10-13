from pathlib import Path
from math import sin,cos,pi,sqrt
OUT=Path(__file__).parent/'motifs';OUT.mkdir(parents=True,exist_ok=True)
INK='#140206';BLUE='#1034A6'
def fmt(p):return ' '.join(f'{x:.3f},{y:.3f}' for x,y in p)
def poly(p,stroke=BLUE,width=1,fill='none'):
 return f'<polygon points="{fmt(p)}" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>'
def star(cx,cy,r,n=8,ratio=.7653668,phase=0):
 return [(cx+(r if i%2==0 else r*ratio)*cos(phase+i*pi/n),cy+(r if i%2==0 else r*ratio)*sin(phase+i*pi/n)) for i in range(n*2)]
def circle(cx,cy,r,stroke=BLUE,width=1):return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{stroke}" stroke-width="{width}"/>'
def line(a,b,stroke=BLUE,width=1):return f'<path d="M{a[0]},{a[1]} L{b[0]},{b[1]}" fill="none" stroke="{stroke}" stroke-width="{width}"/>'
def save(name,w,h,body,title,desc):
 (OUT/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><title>{title}</title><desc>{desc}</desc><g stroke-linejoin="miter">{body}</g></svg>',encoding='utf8')

# Original geometries constructed on explicit parent/child grids, not traced plates.
body=''
for y in range(0,481,120):
 for x in range(0,721,120):
  t=120/(2+sqrt(2));p=[(x+t,y),(x+120-t,y),(x+120,y+t),(x+120,y+120-t),(x+120-t,y+120),(x+t,y+120),(x,y+120-t),(x,y+t)]
  body+=poly(p,width=1.4)
  body+=poly(star(x+60,y+60,45,8,.7653668,pi/8),width=1.4)
  body+=poly(star(x+60,y+60,31,8,.7653668,pi/8),width=.65)
  for i in range(8):
   a=pi/8+i*pi/4
   body+=line((x+60+31*cos(a),y+60+31*sin(a)),(x+60+45*cos(a),y+60+45*sin(a)),width=.65)
  body+=circle(x+60,y+60,8,width=.8)
save('fourfold-lattice.svg',720,480,body,'GMD fourfold lattice study','Original octagon-square and nested eightfold outline construction. Bonner polygonal methodology is the source of the grid approach; this is not a historical plate reproduction.')

body=''
for cy in range(100,601,200):
 for cx in range(100,801,200):
  body+=poly(star(cx,cy,96,8,.7653668,pi/8),width=1.5)
  body+=poly(star(cx,cy,83,8,.7653668,pi/8),width=.8)
  body+=poly(star(cx,cy,50,8,.7653668,0),width=1.2)
  body+=poly(star(cx,cy,39,8,.7653668,0),width=.65)
  for i in range(8):
   a=pi/8+i*pi/4;sx=cx+65*cos(a);sy=cy+65*sin(a)
   body+=poly(star(sx,sy,15,8,.7653668,a),width=.8)
   body+=line((cx+50*cos(a),cy+50*sin(a)),(cx+83*cos(a),cy+83*sin(a)),width=.65)
  body+=circle(cx,cy,11,width=.7)
  for a in [0,pi/2,pi,3*pi/2]:
   px=cx+100*cos(a);py=cy+100*sin(a)
   body+=poly(star(px,py,20,8,.7653668,pi/8),width=.9)
save('dual-level-rosette.svg',800,600,body,'GMD parent-child geometry study','Original two-scale composition inspired by Bonner dual-level methodology. Repeated child motifs are subordinate to a visible parent grid; this is not a validated historical construction.')

body=''
for cy in range(0,481,80):
 for cx in range(0,721,80):
  body+=circle(cx,cy,40,width=1.2)+circle(cx,cy,34,width=.55)
  body+=circle(cx+40,cy+40,40,width=1.2)+circle(cx+40,cy+40,34,width=.55)
  body+=poly([(cx,cy+40),(cx+40,cy),(cx+80,cy+40),(cx+40,cy+80)],width=.65)
  body+=circle(cx+40,cy+40,3,width=1)
save('egyptian-circle-weave.svg',720,480,body,'GMD Egyptian circle-field study','Original repeated circle and diamond construction, interpreted from the educational booklet circle/interlace studies around PDF pages 20-24. Source motifs remain separately labelled from Islamic families.')

body='<path d="M0,10 H720 M0,116 H720" stroke="#1034A6" fill="none"/>'
for cx in range(36,720,72):
 body+=f'<path d="M{cx-36},23 Q{cx-18},0 {cx},23 Q{cx+18},46 {cx+36},23" stroke="#1034A6" fill="none" stroke-width="1.4"/>'
 for dx in [-24,-12,0,12,24]:
  body+=f'<path d="M{cx},35 Q{cx+dx*.4},57 {cx+dx},94 Q{cx+dx*.45},73 {cx},35 Z" stroke="#1034A6" fill="none" stroke-width="1.1"/>'
 body+=circle(cx,24,10,width=1)+circle(cx,24,5,width=.65)
 body+=f'<path d="M{cx-24},103 H{cx+24}" stroke="#1034A6" fill="none"/>'
save('egyptian-pendant-register.svg',720,128,body,'GMD hanging floral register study','Original pendant-floral and loop register interpretation from Ancient Egyptian Designs PDF pages 12-16; not an attributed artifact reproduction.')
print('Generated four original scalable motif construction studies in',OUT)
