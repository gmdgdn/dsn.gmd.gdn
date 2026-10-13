import pypdfium2 as p,sys
sys.stdout.reconfigure(encoding='utf-8');d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for printed in [498,499,503,504,534,535,537,538,550,551,568]:
 t=d[printed+21].get_textpage().get_text_range() or ''
 print(f'\n--- p.{printed} ---\n{t[:1800]}')
