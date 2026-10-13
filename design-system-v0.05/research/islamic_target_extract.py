from pypdf import PdfReader
from pathlib import Path
import sys
sys.stdout.reconfigure(encoding='utf-8')
r=PdfReader(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')
for printed in [175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242]:
 i=r.page_labels.index(str(printed)); text=(r.pages[i].extract_text() or '').replace('\n',' | ')
 if text.strip(): print(f'PRINT {printed} / PDF {i+1}: {text[:750]}')
