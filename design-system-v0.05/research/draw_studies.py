from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont

OUT=Path(__file__).resolve().parents[1]
S=2
PAPER='#F7F4EF'; INK='#140206'; BLUE='#1034A6'; PINK='#FF6183'; SAND='#D5C4A8'; LIGHT='#E9EEFB'
im=Image.new('RGB',(1600*S,1280*S),PAPER); d=ImageDraw.Draw(im)
def rect(box,fill=None,outline=None,w=1): d.rectangle(tuple(int(v*S) for v in box),fill,outline,int(w*S))
def line(points,fill=INK,w=1): d.line([(int(x*S),int(y*S)) for x,y in points],fill,int(w*S),joint='curve')
def text(x,y,t,size=16,color=INK,serif=False):
 f=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf' if serif else 'C:/Windows/Fonts/arial.ttf',size*S)
 d.text((x*S,y*S),t,font=f,fill=color)
def ellipse(b,fill=None,outline=INK,w=1): d.ellipse(tuple(int(v*S) for v in b),fill,outline,int(w*S))
def polygon(p,fill=None,outline=BLUE,w=1):
 if fill:d.polygon([(int(x*S),int(y*S)) for x,y in p],fill)
 line(p+[p[0]],outline,w)
def star(cx,cy,r,color=BLUE,w=1.5):
 a=[(cx+r*math.cos(math.pi/4*i+math.pi/8),cy+r*math.sin(math.pi/4*i+math.pi/8)) for i in range(8)]
 b=[(cx+r*.76537*math.cos(math.pi/4*i+math.pi/4),cy+r*.76537*math.sin(math.pi/4*i+math.pi/4)) for i in range(8)]
 p=[]
 for i in range(8):p += [a[i],b[i]]
 polygon(p,None,color,w)
def lotus(cx,cy,r=20,color=BLUE):
 for a in [-.65,-.32,0,.32,.65]:
  tip=(cx+r*math.sin(a)*1.5,cy-r*math.cos(a))
  polygon([(cx,cy+8),(tip[0]-5,tip[1]+5),tip,(tip[0]+5,tip[1]+5)],None,color,1.2)
 line([(cx-r,cy+9),(cx+r,cy+9)],color,1.2)
def lotusband(x,y,width,color=BLUE):
 line([(x,y),(x+width,y)],color)
 for cx in range(int(x+24),int(x+width-15),48):lotus(cx,y+27,17,color)
 line([(x,y+39),(x+width,y+39)],color)
def boxes(x,y,width):
 for a in range(int(x),int(x+width-25),40):
  rect((a,y,a+26,y+26),None,BLUE,2);rect((a+7,y+7,a+19,y+19),BLUE)
def spiral(cx,cy,r,color=BLUE):
 p=[]
 for i in range(160):
  a=i/159*math.pi*4;rad=r*(1-i/170)
  p.append((cx+rad*math.cos(a),cy+rad*math.sin(a)))
 line(p,color,1.2)
def geometryfield(x,y,w,h):
 rect((x,y,x+w,y+h),LIGHT)
 for cy in range(int(y+40),int(y+h),80):
  for cx in range(int(x+40),int(x+w),80):
   star(cx,cy,32)
   polygon([(cx-40,cy),(cx,cy-40),(cx+40,cy),(cx,cy+40)],None,BLUE,.7)
def button(x,y,label):
 rect((x+5,y+5,x+155,y+47),INK);rect((x,y,x+150,y+42),PINK,INK)
 text(x+14,y+12,label,14)

rect((0,0,1600,164),INK)
text(48,27,'GMD / V0.05 / CULTURAL LAYER — DIRECTION STUDIES',14,PINK)
text(48,57,'Two traditions. One clear interface.',42,PAPER,True)
text(48,119,'Source-led abstractions for review. Current Pen system is unchanged.',17,PAPER)
text(48,196,'01 / MOTIF EXTRACTION → NEW VECTOR GRAMMAR',14,BLUE)

xs=[48,556,1064]
for x in xs:rect((x,232,x+488,428),'#FFFDFB',INK)
boxes(70,265,440)
text(70,327,'EGYPTIAN / NESTED SQUARES',14)
text(70,355,'Booklet PDF p.11 · repeat 40 px · modern redraw',14)
text(70,382,'For small indexes and section rhythm',14)
lotusband(578,258,438)
text(578,327,'EGYPTIAN / FLORAL BORDER',14)
text(578,355,'Booklet PDF p.16 · reduced lotus-like silhouette',14)
text(578,382,'For archive framing and title rules',14)
for x in range(1095,1510,65):star(x,279,25)
text(1086,327,'ISLAMIC / EIGHTFOLD GEOMETRY',14)
text(1086,355,'Bonner p.195 / PDF p.217, Fig.60 · new derivation',14)
text(1086,382,'For connected fields and special collection covers',14)

text(48,467,'02 / THE SAME CORE, THREE LEVELS OF EXPRESSION',14,BLUE)
for x in xs:
 rect((x+5,506,x+493,947),INK);rect((x,501,x+488,942),'#FFFDFB',INK)
text(70,522,'A / V0.01 CORE STUDY',14)
for y in range(561,582,4):line([(70,y),(514,y)],INK)
text(70,610,'Egyptian knowledge,',29,serif=True);text(70,648,'kept in context.',29,serif=True)
text(70,708,'Plain paper. Strong edges. Clear records.',16)
text(70,745,'Shared controls remain consistent.',16)
button(70,834,'EXPLORE ARCHIVE')
text(578,522,'B / EGYPTIAN EDGE — RECOMMENDED',14)
lotusband(578,557,438)
text(578,610,'Egyptian knowledge,',29,serif=True);text(578,648,'kept in context.',29,serif=True)
text(578,708,'A repeated border gives the archive a rhythm.',16)
text(578,745,'The title and reading surface stay open.',16)
button(578,834,'EXPLORE ARCHIVE')
text(1086,522,'C / GEOMETRIC FIELD',14)
geometryfield(1086,557,438,145)
text(1086,734,'Connected collections.',29,serif=True)
text(1086,781,'A bounded field expresses structure.',16)
button(1086,834,'EXPLORE DATA')
text(48,988,'03 / SMALL SCALE / RTL QA FOLLOWS IN PEN',14,BLUE)
rect((48,1025,488,1200),'#FFFDFB',INK)
boxes(70,1045,380)
text(70,1092,'Narrow variant / simplified repeat',20,serif=True)
text(70,1128,'Mirror layout; preserve the motif geometry.',15)
text(70,1158,'Arabic specimen is reviewed separately in Pen.',15)
text(556,1045,'KEEP',14,BLUE)
text(556,1078,'Nile / paper / ink · serif + readable Arabic · hard edges',16)
text(556,1110,'Plain buttons, data tables, focus rings and body text',16)
text(556,1151,'ADD',14,BLUE)
text(620,1151,'Repeat pitch · density · crop rules · source metadata',16)
text(48,1232,'PROPOSED DERIVATIONS / not literal historic reproductions. One prominent motif per section; never under body copy.',14)
OUT.joinpath('examples').mkdir(exist_ok=True)
im.resize((1600,1280),Image.Resampling.LANCZOS).save(OUT/'examples'/'v05-direction-studies.png')
print(OUT/'examples'/'v05-direction-studies.png')

# Small original SVG studies, independent from the historical illustrations.
def svg(name,content,source):
 OUT.joinpath('examples',name).write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><title>GMD v0.05 motif study</title><desc>Original simplified derivation; '+source+'</desc><g fill="none" stroke="#1034A6" stroke-width="1.5">'+content+'</g></svg>',encoding='utf-8')
svg('egyptian-square-study.svg',''.join(f'<rect x="{x}" y="27" width="26" height="26"/><rect x="{x+7}" y="34" width="12" height="12" fill="#1034A6"/>' for x in [7,47,87,127]),'Ancient Egyptian Designs booklet PDF page 11')
paths=[]
for cx in [30,80,130]:
 for a in [-.65,-.32,0,.32,.65]:
  tx=cx+17*math.sin(a)*1.5;ty=37-17*math.cos(a)
  paths.append(f'<path d="M {cx},45 L {tx-5},{ty+5} L {tx},{ty} L {tx+5},{ty+5} Z"/>')
 paths.append(f'<path d="M {cx-17},46 H {cx+17}"/>')
svg('egyptian-floral-study.svg','<path d="M 0,12 H160 M0,58 H160"/>'+''.join(paths),'Ancient Egyptian Designs booklet PDF page 16; upright reduced floral interpretation')
points=[]
for i in range(8):
 for a,r in [(math.pi/4*i+math.pi/8,32),(math.pi/4*i+math.pi/4,32*.76537)]:
  points.append(f'{80+r*math.cos(a):.3f},{40+r*math.sin(a):.3f}')
svg('islamic-eightfold-study.svg','<polygon points="'+' '.join(points)+'"/>','Jay Bonner printed page 195, PDF page 217, Figure 60; original eightfold outline study, not a traced figure')
