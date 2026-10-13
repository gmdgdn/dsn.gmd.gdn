"""Index every 'Fig. N' label in Bonner to its PDF page and printed folio (printed = PDF - 22)."""
import json, re, sys
from pathlib import Path
import pymupdf

PDF = r"C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf"
OUT = Path(__file__).resolve().parent.parent / "source" / "fig-index.json"
OUT.parent.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(PDF)
index = {}
for pno in range(190, 600):
    page = doc[pno]
    for x0, y0, x1, y1, text, *_ in page.get_text("blocks"):
        m = re.fullmatch(r"Fig\.\s*(\d+)\s*", text.strip())
        if m:
            n = int(m.group(1))
            index.setdefault(n, {"pdf": pno + 1, "printed": pno + 1 - 22, "bbox": [x0, y0, x1, y1]})
OUT.write_text(json.dumps(index, indent=1))

if __name__ == "__main__":
    for n in map(int, sys.argv[1:]):
        print(n, index.get(n))
