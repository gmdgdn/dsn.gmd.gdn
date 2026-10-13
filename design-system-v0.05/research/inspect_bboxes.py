import pypdfium2 as pdfium
from pathlib import Path
from PIL import Image, ImageChops, ImageOps
src=pdfium.PdfDocument(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf')
for n in [2,3,5,6,8,9,10,11,12,16,17,18,19,20,21,22,23,24,25,26,27]:
 im=src[n-1].render(scale=1).to_pil().convert('L')
 mask=im.point(lambda p:255 if p<225 else 0)
 print(n,im.size,mask.getbbox())
