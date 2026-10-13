import pypdfium2 as pdfium, re, sys
sys.stdout.reconfigure(encoding='utf-8')
d=pdfium.PdfDocument(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for i in range(196,len(d)):
    txt=d[i].get_textpage().get_text_range() or ''
    clean=' '.join(txt.split())
    if re.search(r'chapter\s+\d+|fig(?:ure)?\.?\s*\d+|\b(?:four|five|seven|eight|ten|twelve)[- ]fold\b|dual.level|nonsystematic|non.systematic',clean,re.I):
        print(f'PDF {i+1} PRINT~{i-21}: {clean[:550]}')
