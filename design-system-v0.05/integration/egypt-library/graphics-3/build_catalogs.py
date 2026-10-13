"""Rebuild review-only G3/KA source copies, contact sheets, and catalogs."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib, json, shutil

ROOT = Path(__file__).resolve().parent
SOURCE = Path(r"C:\Users\khorm\Desktop\gmd design system inspiration graphics\graphics\3")
KA_SOURCE = SOURCE / "khedival cairo architecture"

G3 = [
 ("Numeric-name source; no filename brief was supplied.", "Cartoon drawing of a walking bespectacled figure holding up a framed portrait of a similar cartoon figure.", "upright as supplied; portrait page"),
 ("Copy the layout and colors according to the design-system colors.", "An upright page of four distinct cartoon panels, including a long horizontal group scene at the bottom; retain panel hierarchy and color placement as layout evidence.", "upright as supplied; portrait page"),
 ("Could be a conversations graphic; remove text inside bubbles and recreate.", "Upright black-and-white page interleaves illustrated people, flowers, and fish around a vertical column of oval speech balloons containing Arabic writing.", "upright as supplied; portrait page"),
 ("Filename identifies a vintage Alexandria kids-fashion print, back side.", "Tall, upright vintage cover/back-print composition: central calligraphic/logo-like mark with thin orbital/ornamental framing and Alexandria label.", "upright as supplied; portrait page"),
 ("Egyptian pixelated style of a poster or a frame of a person.", "Upright printed poster with a woman in a waving pose, Egyptian flag, dot/halftone field, and ornate border; the visible image is not a coarse pixel grid.", "upright as supplied; portrait page"),
 ("Egyptian windows, recreate.", "Upright blue-ink scene contained by a large rounded arch: a grid of framed cartoon faces above a street-level group, with sun and buildings; windows are the main repeated feature.", "upright as supplied; portrait page"),
 ("Footer inspiration; not the main footer; extract and flip to normal position, geometricize without changing style.", "Photo of a book page laid on its side: a long comic-like line of people/objects follows a meandering connected contour beside Arabic body text.", "rotate source page 90 degrees clockwise; horizontal scene reads normally alongside upright Arabic text"),
 ("Footer inspiration; not the main footer; extract and flip to normal position, geometricize without changing style.", "Second sideways book-page scene with an extended connected line of small figures/objects and Arabic text; related visual treatment to G3-007, but different drawing.", "rotate source page 90 degrees clockwise; horizontal scene reads normally alongside upright Arabic text"),
 ("Extract patterns and recreate as a poster template after enhancing.", "Upright green cover: dense white floral border, central dark panel with geometric/calligraphic artwork and round medallions, plus a black calligraphy band and animal motif at top; preserve source typography as source content, not redraw it as generic pattern.", "upright as supplied; portrait page"),
 ("Photo frame, recreate and enhance.", "Upright portrait of a man enclosed in a strongly colored oval opening, layered blue floral frame, and rectangular outer field.", "upright as supplied; portrait page"),
 ("Poster of King Fouad of Egypt, drawn by Arabic letters.", "Upright monochrome portrait: a standing suited man constructed from repeated Arabic lettering, with printed Arabic caption beneath; portrait and lettering are inseparable source content.", "upright as supplied; portrait page"),
 ("Recreate as a photo frame and description, use same graphics.", "Landscape postcard composition: central monochrome river photograph, framed by illustrated palms, pyramids, water/reeds, small red corner flourishes, and an English caption panel below.", "upright landscape as supplied"),
 ("Recreate as seven triangles in the head; recreate the woman and her dress pattern.", "Upright woman figure with a large seven-wedge circular disk/headdress, dense V-shaped straight hatching, nested rim triangles, pebble-pattern ovals, a small framed face, narrow long diamond gown, and hands at the hem.", "upright as supplied; portrait page"),
 ("Recreate the man who looks like a star; make background drawings slightly dimmed.", "Upright elongated angular man with a face/eye at the top, dark edge at the right of the face, sharp raised left arm, long pointed legs and a netted heart-like chest; surrounding small drawings are separate background material to dim. Not a bird or a building.", "upright as supplied; portrait page"),
 ("Recreate the same drawing as is and extract it.", "Upright dense black-and-ochre illustrated panel with a tree silhouette, a small mask-like face, rosettes, triangles, zigzag registers, circles, and stippled/mesh fields; Arabic headline and page text sit outside the panel.", "upright as supplied; portrait page"),
 ("Rotate to a normal heart; keep it as it is, make it clearer and SVG.", "Dense black ornamental heart assembled from many small figure/face motifs, with a few larger figures in the central mass. In the supplied photo its point faces left.", "rotate source 90 degrees counterclockwise to put the point down and figures upright"),
 ("Rotate and recreate; these are chairs though they look like buildings; could use in something.", "A row/cluster of repeated ornate high-backed chairs with narrow legs/rails, finials, and seat panels; not buildings.", "rotate source 90 degrees counterclockwise so chair feet point down and backs face up"),
 ("Spaceship in the form of Egyptian pyramids; extract and enhance.", "Upright narrow rocket/ship illustration: triangular outer silhouette, decorated central body with a small person, smoke/cloud forms at side, and segmented exhaust below.", "upright as supplied; portrait page"),
 ("The framing and the drawings.", "Upright editorial page with a patterned diamond side border, zigzag scroll-like heading frame, heavy side bars around a man's portrait, and Arabic editorial text below.", "upright as supplied; portrait page"),
 ("The pyramids, bricks and pixels.", "Upright landscape cartoon of a large pyramid built from staggered rectangular masonry courses, with smaller pyramid and two running figures; small screen/figure appears near the apex. It is not a pixel-art grid.", "upright landscape as supplied"),
 ("This is an Arabic question mark; recreate it as-is and remove the text.", "Upright green Arabic question-mark silhouette with oversized circular head, curling tapered stem, bottom dot/terminal, and Arabic words reversed out in pale ink. This is the Arabic question mark ؟, not a speech callout.", "upright as supplied; preserve the question-mark glyph orientation; remove only internal wording if recreation is later approved"),
]

def record(path, ident, source, dest, notes=None):
    im = Image.open(path)
    return {"id":ident,"filename":path.name,"sourcePath":str(path),"reviewCopy":str(dest.relative_to(ROOT)).replace('\\','/'),
            "width":im.width,"height":im.height,"bytes":path.stat().st_size,
            "sha256":hashlib.sha256(path.read_bytes()).hexdigest(), **(notes or {})}

def sheet(records, output, title, cols=3):
    thumb_w, thumb_h, label_h, margin, gap = 360, 450, 100, 24, 20
    rows=(len(records)+cols-1)//cols
    canvas=Image.new("RGB",(margin*2+cols*thumb_w+(cols-1)*gap,100+rows*(thumb_h+label_h+gap)),"#f5f1e8")
    d=ImageDraw.Draw(canvas)
    try: font=ImageFont.truetype("arial.ttf",16); small=ImageFont.truetype("arial.ttf",13)
    except: font=small=ImageFont.load_default()
    d.text((margin,20),title,fill="#173744",font=font)
    for i,entry in enumerate(records):
        x=margin+(i%cols)*(thumb_w+gap); y=84+(i//cols)*(thumb_h+label_h+gap)
        im=Image.open(entry["path"]).convert("RGB")
        im.thumbnail((thumb_w,thumb_h),Image.Resampling.LANCZOS)
        tile=Image.new("RGB",(thumb_w,thumb_h),"white"); tile.paste(im,((thumb_w-im.width)//2,(thumb_h-im.height)//2))
        canvas.paste(tile,(x,y))
        d.text((x,y+thumb_h+4),entry["id"]+" · "+entry["path"].name[:44],fill="#173744",font=small)
        note=entry.get("label","")
        d.text((x,y+thumb_h+26),note[:54],fill="#40565e",font=small)
    canvas.save(output,quality=88)

g3_dir=ROOT
cat=json.loads((ROOT/"catalog.json").read_text(encoding="utf-8"))
by_id={f"G3-{i:03}":(req,evidence,orientation) for i,(req,evidence,orientation) in enumerate(G3,1)}
for e in cat["entries"]:
    e["userRequest"],e["visibleEvidence"],e["orientation"]=by_id[e["id"]]
    e["visualNotes"]="Direct review of supplied full-resolution source image; concise description records visible content, not inferred historical provenance. No reconstruction performed."
    e["status"]="source inspected; orientation recorded; awaiting parent confirmation before reconstruction"
(ROOT/"catalog.json").write_text(json.dumps(cat,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

ka_root=ROOT/"khedival-architecture"
src_records=[]
for i,p in enumerate(sorted([x for x in KA_SOURCE.iterdir() if x.is_file()],key=lambda x:x.name.lower()),1):
    ident=f"KA-{i:03}"
    ext=p.suffix.lower()
    dest=ka_root/"sources"/(ident+ext)
    dest.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(p,dest)
    source_no="1" if "architecture 1" in p.name.lower() else "2"
    role="whole-building elevation" if "closeup" not in p.name.lower() else "facade detail crop"
    evidence=("Portrait-oriented elevation drawing photographed on an open book page; long façade with repeated balconies/windows, lower arched arcade and a domed corner tower. User asked to recreate both complete buildings editable." if source_no=="1" and role.startswith("whole") else
              "Close crop from building 1 showing repeated balcony balustrades, festoons, window surrounds, cornices, pilasters and façade paneling; use as detail reference for its complete elevation." if source_no=="1" else
              "Portrait-oriented complete stepped façade elevation photographed on a book page: central raised arched crown, repeated pointed-arch/window bays, balconies, and lower arcade. User asked to recreate both complete buildings editable." if role.startswith("whole") else
              "Close crop from building 2 showing repeated pointed/ogive window surrounds, balcony rail motifs, paired windows, pilaster-like verticals, and lower arched arcade; use as detail reference for its complete elevation.")
    src_records.append({"id":ident,"filename":p.name,"building":"building "+source_no,"role":role,"sourcePath":str(p),"reviewCopy":str(dest.relative_to(ROOT)).replace('\\','/'),"sourceSHA256":hashlib.sha256(p.read_bytes()).hexdigest(),"width":Image.open(p).width,"height":Image.open(p).height,"bytes":p.stat().st_size,"visibleEvidence":evidence,"orientation":"upright portrait page as supplied","status":"reviewed; parent creates editable reconstruction; no redraw here"})
    src_records[-1]["path"]=dest
ka_manifest={"collection":"Khedival Cairo architecture references","sourceFolder":str(KA_SOURCE),"count":len(src_records),"scope":"Two complete building elevations plus three supplied close-ups. Full elevations are primary reconstruction references; detail photos support pattern/bay/fenestration decisions. No historical identity/date inferred beyond supplied folder label.","entries":[{k:v for k,v in e.items() if k!="path"} for e in src_records]}
(ka_root/"catalog.json").write_text(json.dumps(ka_manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
sheet([{"id":e["id"],"path":e["path"],"label":e["building"]+" · "+e["role"]} for e in src_records],ka_root/"contact-sheet.jpg","Khedival Cairo architecture · 5 source photos",cols=3)

# Human-readable G3 notes preserve full filename briefs and evidence alongside the machine-readable hashes.
lines=["# Graphics 3 source review", "", "Inventory-only pass: source images were inspected; no source was reconstructed or altered. IDs are assigned by case-insensitive filename order. Hashes verify the copied review assets against originals.", "", "Contact sheets: [sheet 1](contact-sheet-01.jpg) · [sheet 2](contact-sheet-02.jpg). Individual source copies are linked below.", "", "| ID | Original filename / user brief | Visual evidence | Orientation / requested handling | SHA-256 |", "|---|---|---|---|---|"]
for e in cat["entries"]:
    req=e["userRequest"].replace('|','\\|'); ev=e["visibleEvidence"].replace('|','\\|'); ori=e["orientation"].replace('|','\\|')
    lines.append(f"| {e['id']} · [source]({e['reviewCopy']}) | {req} | {ev} | {ori} | `{e['sha256']}` |")
(ROOT/"CATALOG.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
