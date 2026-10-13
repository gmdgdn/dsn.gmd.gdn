from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import pypdfium2 as pdfium
src=pdfium.PdfDocument(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf')
outdir=Path(r'E:\Eslam Builds\design-system\design-system-v0.05\research')
entries=[
 (2,'Modular floral and arch vignettes',(60,220,1380,620)),
 (3,'Plant silhouettes / vertical growth',(45,200,1390,875)),
 (5,'Radial roundels / nested bands',(35,190,1410,885)),
 (8,'Concentric radial ceiling field',(55,120,1380,980)),
 (9,'Square meander and nested units',(35,165,1410,645)),
 (12,'Pendant border / hanging drops',(40,280,1390,790)),
 (16,'Interlinked rosettes and pendant friezes',(30,120,1410,960)),
 (17,'Spiral and nested-circle column',(490,35,950,1045)),
 (20,'Rooster? lattice of circular lozenges',(25,285,1410,790)),
 (22,'Interlacing rounded bands',(45,245,1400,825)),
 (25,'Rosette-and-arc medallion field',(35,235,1410,850)),
 (27,'Spiral lozenge repeat on square grid',(25,285,1405,805)),
]
# Correct generic label on p20 after visual source: interlocking circle/diamond rosette network.
entries[8]=(20,'Interlocking circle / diamond network',entries[8][2])
W,H=700,470; cols=3; rows=4; sheet=Image.new('RGB',(cols*W,rows*H),'#f7f4ef'); d=ImageDraw.Draw(sheet)
for idx,(page,label,box) in enumerate(entries):
 im=src[page-1].render(scale=1.35).to_pil().convert('RGB')
 scale=1.35; box=tuple(round(v*scale) for v in box)
 art=im.crop(box)
 art.thumbnail((W-28,H-70))
 x=(idx%cols)*W; y=(idx//cols)*H
 d.rectangle((x,y,x+W-1,y+H-1),fill='#f7f4ef')
 d.text((x+14,y+10),f'PDF p. {page}  |  {label}',fill='#140206')
 sheet.paste(art,(x+(W-art.width)//2,y+45+(H-55-art.height)//2))
 d.line((x,y+H-1,x+W,y+H-1),fill='#c8c2ba',width=1)
sheet.save(outdir/'egyptian-12-tiles.png')
print(outdir/'egyptian-12-tiles.png',sheet.size)
