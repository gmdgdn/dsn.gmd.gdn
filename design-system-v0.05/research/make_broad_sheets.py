from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import pypdfium2 as pdfium
src=r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf'; outdir=Path('research'); d=pdfium.PdfDocument(src)
for lo in range(197,597,50):
 hi=min(lo+49,596); pages=range(lo,hi+1,2); thumbs=[]
 for n in pages:
  im=d[n-1].render(scale=.24).to_pil().convert('RGB'); im.thumbnail((185,245)); thumbs.append((n,im))
 cols=5; cw=200; ch=270; rows=(len(thumbs)+cols-1)//cols; sheet=Image.new('RGB',(cols*cw,rows*ch),'#eee9e0'); dr=ImageDraw.Draw(sheet)
 for j,(n,im) in enumerate(thumbs):
  x=(j%cols)*cw;y=(j//cols)*ch; dr.text((x+3,y+2),f'PDF {n} / printed {n-22}',fill='#252018'); sheet.paste(im,(x,y+20))
 path=outdir/f'islamic-broad-{lo}-{hi}.png'; sheet.save(path); print(path, sheet.size)
