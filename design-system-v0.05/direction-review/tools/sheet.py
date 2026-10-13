"""Render Bonner PDF pages into a labelled grid sheet: python sheet.py out.png 217 249 277 279 [--cols 2 --w 700]"""
import argparse
from pathlib import Path
import pymupdf
from PIL import Image, ImageDraw, ImageFont

ap = argparse.ArgumentParser()
ap.add_argument("out")
ap.add_argument("pages", nargs="+", type=int)
ap.add_argument("--cols", type=int, default=2)
ap.add_argument("--w", type=int, default=700)
ap.add_argument("--clip", default=None, help="x0,y0,x1,y1 fraction of page to crop (applies to all)")
a = ap.parse_args()

doc = pymupdf.open(r"C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf")
tiles = []
for p in a.pages:
    page = doc[p - 1]
    r = page.rect
    clip = None
    if a.clip:
        fx0, fy0, fx1, fy1 = map(float, a.clip.split(","))
        clip = pymupdf.Rect(r.x0 + fx0 * r.width, r.y0 + fy0 * r.height, r.x0 + fx1 * r.width, r.y0 + fy1 * r.height)
    zoom = a.w / (clip or r).width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=clip)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 190, 22], fill=(16, 52, 166))
    d.text((6, 4), f"PDF {p} / printed {p-22}", fill="white", font=ImageFont.load_default(15))
    tiles.append(img)

rows = (len(tiles) + a.cols - 1) // a.cols
h = max(t.height for t in tiles)
sheet = Image.new("RGB", (a.cols * a.w + (a.cols - 1) * 8, rows * h + (rows - 1) * 8), (40, 40, 40))
for i, t in enumerate(tiles):
    sheet.paste(t, ((i % a.cols) * (a.w + 8), (i // a.cols) * (h + 8)))
Path(a.out).parent.mkdir(parents=True, exist_ok=True)
sheet.save(a.out)
print(a.out, sheet.size)
