from pathlib import Path
from PIL import Image, ImageDraw
import pypdfium2 as pdfium
src=Path(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf')
outdir=Path(r'E:\Eslam Builds\design-system\design-system-v0.05\research')
doc=pdfium.PdfDocument(src)
thumbs=[]
for i in range(len(doc)):
    im=doc[i].render(scale=.32).to_pil().convert('RGB')
    im.thumbnail((220,300))
    thumbs.append(im)
cols=5; cw=240; ch=330
out=Image.new('RGB',(cols*cw,((len(thumbs)+cols-1)//cols)*ch),'#e9e4dc')
d=ImageDraw.Draw(out)
for i,im in enumerate(thumbs):
    x=(i%cols)*cw; y=(i//cols)*ch
    out.paste(im,(x,y+24)); d.text((x+5,y+5),f'PDF p. {i+1}',fill='#140206')
out.save(outdir/'egyptian-all-pages-contact.png')
print('pages',len(doc),'saved',outdir/'egyptian-all-pages-contact.png')
