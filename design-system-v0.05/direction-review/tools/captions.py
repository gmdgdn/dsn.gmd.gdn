"""Print the caption block that follows each requested 'Fig. N' label (or inline caption in ch.4)."""
import re, sys
import pymupdf

doc = pymupdf.open(r"C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf")
want = set(map(int, sys.argv[1:]))
for p in range(195, 596):
    blocks = doc[p - 1].get_text("blocks")
    for i, b in enumerate(blocks):
        t = b[4].strip().replace("\n", " ")
        m = re.match(r"Fig\.\s*(\d+)\b(.*)", t)
        if not m or int(m.group(1)) not in want:
            continue
        cap = m.group(2).strip() or (blocks[i + 1][4].strip().replace("\n", " ") if i + 1 < len(blocks) else "")
        print(f"Fig {m.group(1)} | p{p-22}/pdf{p} | {cap[:300]}")
