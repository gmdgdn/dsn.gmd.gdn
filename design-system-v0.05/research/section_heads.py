import pypdfium2 as p,re,sys
sys.stdout.reconfigure(encoding='utf-8')
d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for i in range(242,571):
 t=d[i].get_textpage().get_text_range() or ''
 for ln in t.splitlines():
  s=ln.strip()
  if re.match(r'3(?:\.\d+){1,3}\s+[A-Z]',s): print(f'PDF {i+1} PRINT~{i-21}: {s}')
