"""Print sentences that cite each requested figure ('Fig. N' / 'Figure N' / 'Figs. N')."""
import re, sys
import pymupdf

doc = pymupdf.open(r"C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf")
text = []
for p in range(195, 596):
    t = doc[p - 1].get_text().replace("-\n", "").replace("\n", " ")
    text.append((p, t))
for n in sys.argv[1:]:
    pat = re.compile(rf"(?:Fig\.|Figs\.|Figure|Figures)\s*(?:\d+[a-z]?(?:–|-|,\s*| and )?)*{n}[a-z]?\b")
    print(f"\n=== Fig {n} ===")
    for p, t in text:
        for s in re.split(r"(?<=[.!?])\s+(?=[A-Z])", t):
            if pat.search(s) and len(s) < 700:
                print(f"[pdf{p}/p{p-22}] {s.strip()}")
