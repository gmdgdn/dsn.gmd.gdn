import pypdfium2 as p,re,sys
sys.stdout.reconfigure(encoding='utf-8');d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for i in range(196,596):
 t=d[i].get_textpage().get_text_range() or ''
 for f in [123,124,126,379,380,381,382,448,453,490,491,496,503,504,508,509,510,514,515,534]:
  if re.search(rf'\bFig\.?\s*{f}\b',t): print(f'Fig {f} PDF {i+1}/printed {i-21}')
