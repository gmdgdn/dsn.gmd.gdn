from PIL import Image,ImageDraw
import pypdfium2 as p
src=r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf'; d=p.PdfDocument(src)
nums=[277,279,466,467,520,525,553,560,572,590]
ims=[]
for n in nums:
 im=d[n-1].render(scale=.7).to_pil().convert('RGB'); im.thumbnail((360,470)); ims.append((n,im))
out=Image.new('RGB',(1080,((len(ims)+2)//3)*500),'#eee9e0');dr=ImageDraw.Draw(out)
for j,(n,im) in enumerate(ims):
 x=j%3*360;y=j//3*500;dr.text((x+4,y+4),f'PDF {n} / printed {n-22}',fill='#222');out.paste(im,(x,y+24))
out.save('research/deep-inspection.png')
