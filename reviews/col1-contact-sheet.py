from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
src=Path(r'C:\Users\khorm\Desktop\gmd design system inspiration graphics\col1')
files=[p for p in src.iterdir() if p.is_file() and 'after' not in p.name]
sheet=Image.new('RGB',(1400,((len(files)+3)//4)*420),'#EAE5DE')
d=ImageDraw.Draw(sheet)
for i,p in enumerate(files):
    im=Image.open(p).convert('RGBA'); im.thumbnail((320,350))
    x=(i%4)*350;y=(i//4)*420
    sheet.paste(Image.new('RGB',(330,360),'#F7F4EF'),(x+10,y+10))
    sheet.paste(im,(x+15+(320-im.width)//2,y+15+(350-im.height)//2),im)
    d.text((x+12,y+380),f'{i+1:02d} {p.name[:34]}',fill='#140206')
    d.text((x+12,y+399),f'{Image.open(p).size}',fill='#140206')
sheet.save(Path(r'E:\Eslam Builds\design-system\reviews\col1-contact-sheet.png'))
