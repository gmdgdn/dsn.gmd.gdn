"""Create editable threshold-contour SVGs from the supplied line-art crops.

This extracts source ink contours into vector paths. It does not ship or alter
the source raster and deliberately avoids semantic claims about tiny figures.
"""
from pathlib import Path
from collections import defaultdict
from PIL import Image, ImageOps, ImageFilter
import json, hashlib
from generate_drawings import wrap, save, OUT

BASE=Path(__file__).resolve().parents[1]
SRC=BASE/"sources"
INK="#140206"

def contour_loops(mask):
    pix=mask.load(); w,h=mask.size; edges=set()
    # Clockwise cell boundaries; shared edges are omitted.
    for y in range(h):
        for x in range(w):
            if pix[x,y]==0: continue
            if y==0 or pix[x,y-1]==0: edges.add(((x,y),(x+1,y)))
            if x==w-1 or pix[x+1,y]==0: edges.add(((x+1,y),(x+1,y+1)))
            if y==h-1 or pix[x,y+1]==0: edges.add(((x+1,y+1),(x,y+1)))
            if x==0 or pix[x-1,y]==0: edges.add(((x,y+1),(x,y)))
    outgoing=defaultdict(list)
    for a,b in edges: outgoing[a].append(b)
    loops=[]
    while edges:
        first=next(iter(edges)); start,cur=first; edges.remove(first)
        pts=[start,cur]
        guard=0
        while cur!=start and guard<200000:
            guard+=1
            options=[p for p in outgoing.get(cur,[]) if (cur,p) in edges]
            if not options: break
            prev=pts[-2]; dx,dy=cur[0]-prev[0],cur[1]-prev[1]
            # At diagonal-touch vertices, prefer a consistent right-hand boundary turn.
            def rank(p):
                nd=(p[0]-cur[0],p[1]-cur[1])
                order=[(dy,-dx),(dx,dy),(-dy,dx),(-dx,-dy)]
                try:return order.index(nd)
                except:return 9
            nxt=min(options,key=rank)
            edges.remove((cur,nxt)); pts.append(nxt); cur=nxt
        if len(pts)>=4 and pts[-1]==start:
            # Remove collinear points exactly, keeping the raster contour topology.
            simplified=[]
            for i,p in enumerate(pts[:-1]):
                prev=pts[(i-1)%(len(pts)-1)]; nxt=pts[(i+1)%(len(pts)-1)]
                if (p[0]-prev[0])*(nxt[1]-p[1])!=(p[1]-prev[1])*(nxt[0]-p[0]): simplified.append(p)
            if len(simplified)>=3: loops.append(simplified)
    return loops

def clear_specks(mask, min_area):
    """Remove only tiny isolated threshold artifacts; retain attached fine linework."""
    if min_area<=1: return mask
    px=mask.load(); w,h=mask.size; seen=set(); remove=[]
    for y in range(h):
        for x in range(w):
            if px[x,y]==0 or (x,y) in seen: continue
            stack=[(x,y)]; seen.add((x,y)); component=[]
            while stack:
                cx,cy=stack.pop(); component.append((cx,cy))
                for ny in range(max(0,cy-1),min(h,cy+2)):
                    for nx in range(max(0,cx-1),min(w,cx+2)):
                        if px[nx,ny] and (nx,ny) not in seen:
                            seen.add((nx,ny)); stack.append((nx,ny))
            if len(component)<min_area: remove.extend(component)
    for x,y in remove: px[x,y]=0
    return mask

def trace(src_path, name, title, srcid, crop=None, rotate_ccw=False, cutoff=115, scale=0.75, min_component=1, note="Source-traced contour study. Each compound ink path is editable as a group; small source details are preserved as contours without assigning anatomy or provenance."):
    im=Image.open(src_path).convert('RGB')
    if crop: im=im.crop(crop)
    if rotate_ccw: im=im.rotate(90,expand=True)
    # Modest downsample and median cleanup suppress paper texture while retaining printed contour detail.
    nw=max(1,round(im.width*scale)); nh=max(1,round(im.height*scale))
    im=im.resize((nw,nh),Image.Resampling.LANCZOS)
    gray=ImageOps.grayscale(im).filter(ImageFilter.MedianFilter(3))
    mask=gray.point(lambda v:255 if v<cutoff else 0,mode='1').convert('L')
    mask=clear_specks(mask,min_component)
    # Crop to ink extent, leaving a small, even margin.
    bbox=mask.getbbox()
    if not bbox: raise ValueError(f"no dark contours in {src_path}")
    x0,y0,x1,y1=bbox; pad=8
    x0=max(0,x0-pad); y0=max(0,y0-pad); x1=min(nw,x1+pad); y1=min(nh,y1+pad)
    mask=mask.crop((x0,y0,x1,y1)); w,h=mask.size
    loops=contour_loops(mask)
    paths=[]
    for pts in loops:
        data='M '+' '.join((f'{x} {y}' if i==0 else f'L {x} {y}') for i,(x,y) in enumerate(pts))+' Z'
        paths.append(data)
    d=' '.join(paths)
    body=f'<g id="source-contours" data-editable-part="source-ink-contours"><path fill="{INK}" fill-rule="evenodd" d="{d}"/></g>'
    svg=wrap(name,title,srcid,body,f'0 0 {w} {h}',note=f'{note} Vectorized from a cropped, thresholded view of {srcid}; full-resolution original is linked beside the SVG. This is a visual source-trace, not an independently verified historical reconstruction.')
    path=save(name,svg)
    return {"id":srcid,"filename":path.name,"sourceCopy":str(src_path.relative_to(BASE)).replace('\\','/'),"svg":str(path.relative_to(BASE)).replace('\\','/'),"traceMethod":"thresholded ink contours; median-filtered 3x3; modest downsample; topology-preserving collinear simplification","threshold":cutoff,"scale":scale,"rotation":"90 degrees counterclockwise" if rotate_ccw else "none","sourceCropPixels":crop,"vectorViewBox":f"0 0 {w} {h}","contourPaths":len(paths),"sha256":hashlib.sha256(path.read_bytes()).hexdigest(),"fidelity":"source-traced outlines; semantic parts remain grouped as editable ink contours"}

entries=[]
# G3-001 has no name-based brief; this optional source-trace simply preserves the supplied cartoon for reference.
entries.append(trace(SRC/'G3-001.jpg','G3-001-cartoon-pair-traced','Source-traced cartoon pair with held portrait','G3-001',crop=(35,110,1400,1900),cutoff=120,scale=.68,min_component=2,note="Optional source-traced extraction of the supplied cartoon because its numeric filename provided no written brief. The two figures and handheld portrait remain one grouped ink drawing."))
# Crops are defined from direct full-resolution review and exclude surrounding page captions/headlines.
entries.append(trace(SRC/'G3-005.jpg','G3-005-poster-figure-traced','Source-traced poster illustration crop','G3-005',crop=(205,190,1405,1645),cutoff=118,scale=.60))
entries.append(trace(SRC/'G3-011.png','G3-011-letterform-portrait-traced','Source-traced letterform portrait','G3-011',crop=(34,20,405,548),cutoff=120,scale=.78))
# Supplied heart points left; CCW turns the point down and figures upright.
entries.append(trace(SRC/'G3-016.jpg','G3-016-crowd-heart-traced','Source-traced crowd heart, upright','G3-016',rotate_ccw=True,cutoff=110,scale=.62,min_component=3))
# G3-015's illustrated panel sits in the middle of the editorial page; exclude title, page copy and margins.
entries.append(trace(SRC/'G3-015.jpg','G3-015-dense-illustration-traced','Source-traced dense illustrated panel','G3-015',crop=(105,350,1320,1310),cutoff=125,scale=.75))
path=BASE/'drawings-manifest.json'
path.write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
for e in entries: print(e['id'],e['contourPaths'],e['vectorViewBox'],e['filename'])
