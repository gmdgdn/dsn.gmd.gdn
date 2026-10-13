from pathlib import Path
import pypdfium2 as pdfium
out=Path(r'E:\Eslam Builds\design-system\design-system-v0.05\research')
for src,pages,prefix,scale in [
(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf',[11,16,27],'ancient',.8),
(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf',[197,198,199],'islamic',1.05)]:
 d=pdfium.PdfDocument(src)
 for n in pages:
  im=d[n-1].render(scale=scale).to_pil()
  path=out/f'{prefix}-pdf-{n:03d}.png';im.save(path);print(path,im.size)
