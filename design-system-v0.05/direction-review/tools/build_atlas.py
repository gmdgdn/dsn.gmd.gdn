"""Annotated source atlas: crops of the 12 shortlisted Bonner figures, cut from the PDF at the
figure label, with page references and a verified-construction note under each crop."""
import json
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
doc = pymupdf.open(r"C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf")
IDX = {int(k): v for k, v in json.loads((ROOT / "source" / "fig-index.json").read_text()).items()}
F = "C:/Windows/Fonts/"
mono = ImageFont.truetype(F + "consola.ttf", 15)
monob = ImageFont.truetype(F + "consolab.ttf", 17)
sans = ImageFont.truetype(F + "segoeui.ttf", 15)

# (id, figure label, pdf page, clip in page points (x0,y0,x1,y1) or None = above label, title, verified, use)
ENTRIES = [
    ("S01", "Fig. 60", 217, (45, 40, 560, 300), "Star-profile families, 8- and 10-fold",
     "8-s1 obtuse, 8-s2 median, 8-s3 acute; 10-s1 meta-obtuse…10-s4 acute, from midpoint-to-midpoint lines.",
     "Star profile token (order × family)."),
    ("S02", "Fig. 89", 249, (45, 40, 560, 296), "Regular-polygon tessellations (system of regular polygons)",
     "3.6.3.6, 3⁴.6, 3³.4², 3².4.3.4, 3.4.6.4, 4.8², 3.12², 4.6.12 as generative tessellations.",
     "Grid library: module adjacency as layout scaffold."),
    ("S03", "Fig. 123", 277, None, "4.8² octagon-and-square line families",
     "Acute 45°, median 60°/90°, obtuse 135°, six two-point variants, in both modules.",
     "Fourfold base system; density + family switch."),
    ("S04", "Fig. 126", 279, None, "Eight variations on the 4.8² median design",
     "Ring of squares in octagons (126c: Great Mosque of Córdoba, 971); 126g–h typical of the Maghreb.",
     "Same lattice, many skins: theme variation."),
    ("S05", "Fig. 130", 283, None, "Fourfold System A modules",
     "Large/small octagon, square, pentagon, large/small hexagon, trapezoid, triangle, rhombus; 4 families.",
     "Mixed-span panels from one module kit."),
    ("S06", "Fig. 187", 321, None, "Fivefold System modules and families",
     "Acute 36°, median 72°, obtuse 108°, two-point 36°/144°; decagon, pentagon, barrel/long/concave hexagon, rhombi.",
     "Fivefold module kit; radial assemblies."),
    ("S07", "Fig. 258", 369, None, "Fivefold two-point design, hexagonal repeat",
     "Decagons at repeat vertices; isolated region used at the Ashrafiyya madrasa, Jerusalem (1482).",
     "Explicit crop of a field: crop-rule precedent."),
    ("S08", "Fig. 379", 466, None, "12/8 compound orthogonal field: acute",
     "12-stars at grid vertices, 8-stars at cell centres; two tessellations (p.439). 379b: Divriği (1180–81).",
     "Hierarchy field: two anchor classes."),
    ("S09", "Fig. 448", 520, None, "Type A dual-level, hexagonal",
     "Six-point median stars at both levels; 2×√3 scale (printed 1:3.4610…), 90° turn. Agra (1622–28).",
     "Macro path network over micro texture."),
    ("S10", "Fig. 453", 525, None, "Type A fivefold dual-level",
     "Acute primary, obtuse secondary; scale 1:13.7082 = 4 + φ·6. Madar-i Shah, Isfahan (1706–14).",
     "Cover-scale hero with readable sub-level."),
    ("S11", "Fig. 490", 556, (45, 330, 560, 770), "Radial gore segmentation of a dome",
     "Eightfold: one gore flat (a), elevation (b), plan (c), eight segments laid flat (d).",
     "Radial canopy and segmented section heads."),
    ("S12", "Figs. 508, 534", 574, (45, 40, 560, 470), "Kaplan: tiles → motifs → bands → interlace",
     "Decorated tiles assembled into a field (508); mitred band polygons and over/under (534–535, p.568).",
     "The engine: tiling + θ + band + weave."),
]


def crop(entry):
    sid, lab, pno, clip, *_ = entry
    page = doc[pno - 1]
    if clip is None:
        n = int(lab.split()[1].rstrip(","))
        x0, y0, x1, y1 = IDX[n]["bbox"]
        # top: previous label on the same page, else page head
        tops = [v["bbox"][3] for k, v in IDX.items() if v["pdf"] == pno and v["bbox"][3] < y0 - 5]
        top = max(tops) + 6 if tops else 48
        clip = (45, top, 560, y1 + 2)
    r = pymupdf.Rect(*clip)
    z = 1000 / r.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(z, z), clip=r)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


COLS, CW, IMG_H, NOTE_H, PAD = 3, 620, 520, 150, 24
rows = (len(ENTRIES) + COLS - 1) // COLS
W = COLS * CW + (COLS + 1) * PAD
H = 120 + rows * (IMG_H + NOTE_H + PAD) + 60
sheet = Image.new("RGB", (W, H), (247, 244, 239))
d = ImageDraw.Draw(sheet)
d.text((PAD, 28), "GMD v0.05 · SOURCE ATLAS (DIRECTION REVIEW) · Bonner, Islamic Geometric Patterns (Springer 2017)", font=monob, fill=(20, 2, 6))
d.text((PAD, 58), "Printed page = PDF page − 22 (verified on folios 175, 255, 549). Crops are study references only; construction notes below each are verified against Bonner’s text.", font=sans, fill=(20, 2, 6))
for i, e in enumerate(ENTRIES):
    sid, lab, pno, _, title, verified, use = e
    c, r = i % COLS, i // COLS
    x, y = PAD + c * (CW + PAD), 110 + r * (IMG_H + NOTE_H + PAD)
    im = crop(e)
    im.thumbnail((CW, IMG_H))
    d.rectangle([x, y, x + CW, y + IMG_H], fill=(234, 229, 222))
    sheet.paste(im, (x + (CW - im.width) // 2, y + (IMG_H - im.height) // 2))
    d.rectangle([x, y, x + CW, y + IMG_H + NOTE_H], outline=(20, 2, 6), width=1)
    d.rectangle([x, y, x + 64, y + 26], fill=(16, 52, 166))
    d.text((x + 8, y + 4), sid, font=monob, fill="white")
    ny = y + IMG_H + 10
    d.text((x + 10, ny), f"{lab} · printed p.{pno - 22} / PDF {pno}", font=monob, fill=(16, 52, 166))
    d.text((x + 10, ny + 26), title, font=ImageFont.truetype(F + "segoeuib.ttf", 16), fill=(20, 2, 6))
    # wrap verified note
    words, line, ly = verified.split(), "", ny + 52
    for w_ in words:
        if d.textlength(line + " " + w_, font=sans) > CW - 20:
            d.text((x + 10, ly), line.strip(), font=sans, fill=(20, 2, 6)); ly += 20; line = ""
        line += " " + w_
    d.text((x + 10, ly), line.strip(), font=sans, fill=(20, 2, 6))
    d.text((x + 10, y + IMG_H + NOTE_H - 26), "GMD USE → " + use, font=mono, fill=(200, 60, 90))
d.text((PAD, H - 40), "Verified = stated in Bonner’s text/plates. “GMD use” is a design interpretation, not a historical claim.", font=sans, fill=(20, 2, 6))
out = ROOT / "source" / "source-atlas-12.png"
sheet.save(out, optimize=True)
print(out, sheet.size)
