import pypdfium2 as p,sys
sys.stdout.reconfigure(encoding='utf-8')
d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for printed in [254,376,385,403,415,439,465,480,489,490,497,503,511,531,537,549,550,563,568,569]:
 n=printed+22;t=d[n-1].get_textpage().get_text_range() or ''
 print(f'\n--- PRINT {printed}/PDF {n} ---\n{t[:1100]}')
