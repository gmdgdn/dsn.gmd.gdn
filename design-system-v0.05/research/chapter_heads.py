import pypdfium2 as p, re, sys
sys.stdout.reconfigure(encoding='utf-8')
d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for i in range(196,596):
 t=d[i].get_textpage().get_text_range() or ''
 if re.search(r'\b[34]\s+(?:Differentiation|Systematic|Design|Computer|Geometric)|\b[34]\.\d',t,re.I):
  lines=[x.strip() for x in t.splitlines() if x.strip()]
  print(f'PDF {i+1} PRINT~{i-21}: '+' | '.join(lines[:4])[:240])
