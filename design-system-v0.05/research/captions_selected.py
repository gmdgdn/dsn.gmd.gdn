import pypdfium2 as p,sys
sys.stdout.reconfigure(encoding='utf-8');d=p.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for printed in [254,255,438,439,440,441,442,489,490,491,492,496,497,498,502,503,504,510,511,512,530,531,532,536,537,538]:
 n=printed+22;t=d[n-1].get_textpage().get_text_range() or '';print(f'\n--- {printed} ---\n{t[-1350:]}')
