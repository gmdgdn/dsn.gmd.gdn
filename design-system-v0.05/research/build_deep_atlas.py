from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import pypdfium2 as pdfium
import textwrap
src = r'C:\Users\khorm\Downloads\978-1-4419-0217-7.pdf'
base = Path(r'E:\Eslam Builds\design-system\design-system-v0.05')
research = base / 'research'
research.mkdir(exist_ok=True)
(base / 'deep').mkdir(exist_ok=True)
doc = pdfium.PdfDocument(src)
items = [
 (197, 'Fig. 34 · fivefold field', 'PRINT 175 · fivefold modules: pentagons, concave octagonal shields, kites, decagonal hourglasses; several repeat grids.', 'Historical field; study its alternate rectangular and hexagonal repeat cells.'),
 (198, 'Fig. 35 · 12s on triangle', 'PRINT 176 · twelve-point stars sit at vertices of an isometric/triangular repeat; an example from Baghdad.', 'Place a local radial motif on a triangular lattice; preserve the whole repeat unit.'),
 (217, 'Fig. 60 · star profile family', 'PRINT 195 · 8- and 10-sided star constructions vary from obtuse through median to acute.', 'Parameterize ray/contact angle and polygon point count; this plate is a construction key.'),
 (245, 'Fig. 89 · tessellation vocabulary', 'PRINT 223 · semi-regular tiling templates show vertex order and polygon adjacency.', 'Use as a scaffold layer that controls how motif cells meet.'),
 (277, 'Fig. 123 · square + octagon', 'PRINT 255 · the 4.8² cell supports acute, median, obtuse and two-point line applications.', 'Orthogonal repeat: square and octagon modules; vary line family while retaining seams.'),
 (279, 'Fig. 126 · cell variations', 'PRINT 257 · eight variations of the median design alter stars, edge crossings and offsets.', 'Retain the cell grid and expose the line treatment as a repeatable variant.'),
 (369, 'Figs. 257–258 · fivefold radial', 'PRINT 347 · radial designs built from fivefold modules; Fig. 258 uses a hexagonal repeat.', 'Useful for a focal badge or section medallion; keep its complete repeat boundary.'),
 (466, 'Fig. 379 · compound 12/8 field', 'PRINT 444 · acute family: 12-point stars on orthogonal-grid corners, 8-point stars at square centers.', 'Underlying cell recipes: octagon + pentagon ring + barrel hexagon, or dual octagon/dodecagon + concave-hexagon interstices.'),
 (467, 'Fig. 380 · compound median field', 'PRINT 445 · median derivations from the same two related underlying tessellations.', 'Change ray/line family over the same 12/8 symmetry locations; polygon scaffold remains explicit.'),
 (520, 'Fig. 448 · Type A dual level', 'PRINT 498 · jali: regular hexagons generate both scales; the same six-point median pattern repeats at a 90° turn, ratio 1:3.461.', 'Verified scale-invariant example. Keep a primary lattice, scaled copy and quarter-turn as explicit layers.'),
 (525, 'Fig. 453 · fivefold dual level', 'PRINT 503 · acute primary pattern with an obtuse secondary pattern, both from the fivefold system.', 'Nested scale is explicit, though the visual families differ; use independent controls per level.'),
 (556, 'Fig. 490 · radial gore layout', 'PRINT 534 · one gore laid flat, dome elevation, plan and a row of eight segments.', 'A 2D repeat can map to responsive panels or a radial hero; maintain segment boundaries.'),
 (560, 'Fig. 496 · polyhedral surface', 'PRINT 538 · dodecahedral pentagonal faces project onto a spherical dome and carry a two-point pattern.', 'Use as a 3D extension study; keep the projected-face scaffold separate from line art.'),
 (572, 'Fig. 503 · template tiling', 'PRINT 550 · a polygonal tiling is shown with its isolated tile shapes as construction scaffolding.', 'The algorithm chapter models a finite repeat unit plus translation vectors for infinite extension.'),
 (573, 'Fig. 509 · colored tile motifs', 'PRINT 551 · tile motifs shown with face-color treatment; neighboring faces can be filled consistently.', 'Two-color the motif planar map before styling, then repeat without color collisions at seams.'),
 (590, 'Fig. 534 · bands + interlacement', 'PRINT 568 · reflected motif edges define bend/crossing band polygons; over-under cues are a separate pass.', 'Use line geometry to make ribbons, then add crossing order as an independent web ornament layer.'),
]
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 22)
small = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 16)
W,H,cols,rows = 500,470,4,4
sheet=Image.new('RGB',(cols*W,rows*H),'#f2efe8'); draw=ImageDraw.Draw(sheet)
for j,(pdfno,title,geom,web) in enumerate(items):
    im=doc[pdfno-1].render(scale=1.0).to_pil().convert('RGB')
    # Crop upper page where the source's figure plate sits while preserving page margins.
    x0=int(im.width*.055); x1=int(im.width*.945); y0=int(im.height*.055); y1=int(im.height*.55)
    if pdfno == 560:  # Fig. 496 is below Fig. 495 on this printed page.
        y0=int(im.height*.42); y1=int(im.height*.94)
    crop=im.crop((x0,y0,x1,y1))
    crop.thumbnail((W-18,285),Image.Resampling.LANCZOS)
    x=(j%cols)*W; y=(j//cols)*H
    draw.rectangle((x,y,x+W-2,y+H-2),fill='#fffdf8',outline='#c9c0b3',width=2)
    draw.text((x+12,y+9),title,font=font,fill='#1e332f')
    draw.text((x+12,y+37),f'PDF p.{pdfno} · printed p.{pdfno-22}',font=small,fill='#74644f')
    sheet.paste(crop,(x+(W-crop.width)//2,y+62))
    # Compact annotations distinguish source observation from a GMD web application proposal.
    for k,line in enumerate(textwrap.wrap(geom,width=61)[:2]):
        draw.text((x+12,y+350+k*18),line,font=small,fill='#222222')
    for k,line in enumerate(textwrap.wrap(web,width=61)[:2]):
        draw.text((x+12,y+393+k*18),line,font=small,fill='#37645b')
sheet.save(research/'islamic-deep-atlas.png')
# A larger six-page visual board for the six strongest component studies.
large_items=[items[4],items[5],items[7],items[8],items[9],items[10]]
CW,CH=900,650; large=Image.new('RGB',(2*CW,3*CH),'#f2efe8'); ld=ImageDraw.Draw(large)
for j,(pdfno,title,geom,web) in enumerate(large_items):
    im=doc[pdfno-1].render(scale=1.35).to_pil().convert('RGB')
    ya,yb=(.4,.94) if pdfno == 560 else (.04,.78)
    crop=im.crop((int(im.width*.045),int(im.height*ya),int(im.width*.955),int(im.height*yb)))
    crop.thumbnail((CW-26,470),Image.Resampling.LANCZOS)
    x=(j%2)*CW; y=(j//2)*CH
    ld.rectangle((x,y,x+CW-2,y+CH-2),fill='#fffdf8',outline='#b8afa1',width=2)
    ld.text((x+14,y+8),title,font=font,fill='#1e332f')
    ld.text((x+14,y+36),f'PDF p.{pdfno} · printed p.{pdfno-22}',font=small,fill='#74644f')
    large.paste(crop,(x+(CW-crop.width)//2,y+60))
    for k,line in enumerate(textwrap.wrap(geom,width=112)[:2]):
        ld.text((x+14,y+526+k*18),line,font=small,fill='#222222')
    for k,line in enumerate(textwrap.wrap(web,width=112)[:2]):
        ld.text((x+14,y+575+k*18),line,font=small,fill='#37645b')
large.save(research/'islamic-deep-crops.png')
print('saved',research/'islamic-deep-atlas.png',sheet.size)
print('saved',research/'islamic-deep-crops.png',large.size)
