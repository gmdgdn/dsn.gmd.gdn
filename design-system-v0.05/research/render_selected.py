from pathlib import Path
from PIL import Image,ImageDraw
import pypdfium2 as pdfium
base=Path(r'E:\Eslam Builds\design-system\design-system-v0.05\research')
def make(src,name,pages):
 doc=pdfium.PdfDocument(src); ims=[]
 for label,page_no in pages:
  p=doc[page_no-1]; im=p.render(scale=.65).to_pil().convert('RGB'); im.thumbnail((620,780)); ims.append((label,im.copy()))
 cols=2; cw=650; ch=820; out=Image.new('RGB',(cw*cols,ch*((len(ims)+1)//2)),'#eeeae2'); d=ImageDraw.Draw(out)
 for j,(lab,im) in enumerate(ims):
  x=j%cols*cw;y=j//cols*ch;out.paste(im,(x,y+28));d.text((x+4,y+5),lab,fill='#140206')
 path=base/name;out.save(path);print(path,out.size)
make(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf','ancient-selected-contact.png',[(f'Ancient Egyptian booklet · PDF page {p}',p) for p in [11,16,27]])
make(r'C:\\Users\\khorm\\Downloads\\978-1-4419-0217-7.pdf','islamic-selected-contact.png',[(f'Islamic geometric patterns - printed p.{p} / PDF p.{p+22}',p+22) for p in [175,177,183,195,196,197]])


