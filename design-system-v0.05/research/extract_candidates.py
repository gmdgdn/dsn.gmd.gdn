import pypdfium2 as p,sys
sys.stdout.reconfigure(encoding='utf-8')
d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for printed in [254,260,283,294,324,332,336,344,347,348,356,357,376,377,385,403,415,439,465,480,489,490,497,503,511,513,531,537,549,550,563,564,568,569]:
 i=printed+21
 t=d[i-1].get_textpage().get_text_range() or ''
 print(f'\n--- PRINT {printed} / PDF {i} ---\n{t[:1800]}')
