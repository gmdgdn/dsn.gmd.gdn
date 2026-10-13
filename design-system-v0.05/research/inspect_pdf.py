from pypdf import PdfReader
from pathlib import Path
files=[Path(r'C:\Users\khorm\Downloads\79176a587b864217-high.pdf'),Path(r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf')]
for f in files:
 r=PdfReader(str(f)); print('\nFILE',f.name,'PAGES',len(r.pages),'META',r.metadata)
 print('PAGE_LABELS', getattr(r,'page_labels',[])[:20])
 outlines=r.outline
 def dump(items,depth=0):
  for item in items:
   if isinstance(item,list): dump(item,depth+1)
   else:
    print('OUTLINE',depth,getattr(item,'title',str(item)), 'PAGE', (r.get_destination_page_number(item)+1 if hasattr(item,'title') else ''))
 dump(outlines[:60])
 for i in list(range(min(12,len(r.pages))))+([174,175,176,177,178,179,180,181,182,183,184,185] if f.name.startswith('978') else []):
  if i<len(r.pages):
   t=(r.pages[i].extract_text() or '').replace('\n',' | ')
   print('PAGE',i+1,repr(t[:1300]))
