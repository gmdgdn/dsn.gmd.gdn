from pathlib import Path
from PIL import Image,ImageDraw
import pypdfium2 as pdfium
src=Path(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf')
out=Path(r'E:\Eslam Builds\design-system\design-system-v0.05\research\ancient-egyptian-contact.png')
doc=pdfium.PdfDocument(src); thumbs=[]
for i in range(len(doc)):
 p=doc[i]; im=p.render(scale=.26).to_pil().convert('RGB'); im.thumbnail((280,190)); thumbs.append((i+1,im.copy()))
cols=5; cellw=300; cellh=220; rows=(len(thumbs)+cols-1)//cols
sheet=Image.new('RGB',(cols*cellw,rows*cellh),'#eeeae2'); d=ImageDraw.Draw(sheet)
for j,(num,im) in enumerate(thumbs):
 x=(j%cols)*cellw; y=(j//cols)*cellh; sheet.paste(im,(x,y+24)); d.text((x+4,y+4),f'PDF p.{num}',fill='#140206')
sheet.save(out)
print('pages',len(doc),'contact',out,'size',sheet.size)
