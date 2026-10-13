from pypdf import PdfReader
import sys
sys.stdout.reconfigure(encoding='utf-8')
r=PdfReader(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for pp in [183,195]:
 i=r.page_labels.index(str(pp)); print('\nPRINT',pp,'PDF',i+1,'\n',(r.pages[i].extract_text() or '')[:4800])
