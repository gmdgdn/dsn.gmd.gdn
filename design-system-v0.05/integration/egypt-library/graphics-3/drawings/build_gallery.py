"""Build a source-comparison gallery for every generated drawing SVG."""
from pathlib import Path
from xml.etree import ElementTree as ET
import json,html
import hashlib

HERE=Path(__file__).resolve().parent
BASE=HERE.parent
catalog=json.loads((BASE/'catalog.json').read_text(encoding='utf-8'))
entries={e['id']:e for e in catalog['entries']}
svgdir=HERE/'svg'
files=sorted(svgdir.glob('*.svg'))
# Keep only the source-traced heart in the review index; its early hand-drawn draft stays available for development but not parity review.
files=[p for p in files if p.name!='G3-016-crowd-heart.svg']
cards=[]
assets_manifest=[]
for p in files:
    root=ET.parse(p).getroot()
    title=root.find('{http://www.w3.org/2000/svg}title')
    desc=root.find('{http://www.w3.org/2000/svg}desc')
    ident=next((k for k in entries if p.name.startswith(k)),None)
    if not ident: continue
    e=entries[ident]
    source=html.escape(e['reviewCopy'].replace('sources/','../sources/'),quote=True)
    svg='svg/'+html.escape(p.name,quote=True)
    title_text=html.escape(title.text if title is not None else p.stem)
    desc_text=html.escape(desc.text if desc is not None else 'Editable vector study.')
    brief=html.escape(e['userRequest'])
    width,height=e['width'],e['height']
    traced='traced' in p.name
    group_ids=[node.attrib.get('id') for node in root.iter() if node.attrib.get('id')]
    roles=sorted({token for node in root.iter() for token in node.attrib.get('class','').split()})
    assets_manifest.append({"assetId":p.stem,"svg":'svg/'+p.name,"sourceId":ident,"sourceFilename":e['filenameBrief'],"sourcePath":e['sourcePath'],"sourceCopy":e['reviewCopy'],"sourceSHA256":e['sha256'],"userRequest":e['userRequest'],"visibleEvidence":e['visibleEvidence'],"orientation":e['orientation'],"classification":"source-traced ink contours" if traced else "contemporary editable vector study","title":title_text,"description":desc_text,"viewBox":root.attrib.get('viewBox'),"editableGroups":group_ids,"colorRoles":roles,"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()})
    card=f'''<article class="card" id="{ident}"><div class="card-top"><p class="eyebrow">{ident} · {width} × {height} source</p><h2>{title_text}</h2><p class="brief">User brief: {brief}</p><p class="desc">{desc_text}</p></div><div class="comparison"><section><h3>Original source</h3><div class="preview source"><img src="{source}" alt="Original source {ident}: {brief}"></div></section><section><h3>Editable vector drawing</h3><div class="preview"><object data="{svg}" type="image/svg+xml" title="{title_text}"></object></div></section></div><footer><a href="{source}">Open source copy</a><a download href="{svg}">Download SVG</a></footer></article>'''
    cards.append(card)
source_only=entries.get('G3-004')
if source_only:
    source='../sources/G3-004.png'
    cards.insert(3,f'''<article class="card" id="G3-004"><div class="card-top"><p class="eyebrow">G3-004 · original source retained</p><h2>Alexandria vintage print · no vector reconstruction</h2><p class="brief">Filename: {html.escape(source_only['filenameBrief'])}</p><p class="desc">The supplied image is a tall vintage mark/cover with ornamental orbit lines and Alexandrie lettering. Original lettering and identity remain in the source image; no replacement lettering is fabricated.</p></div><div class="comparison"><section><h3>Original source</h3><div class="preview source"><img src="{source}" alt="Untouched source print with original lettering and mark"></div></section><section><h3>Source handling</h3><div class="preview"><div style="padding:24px;max-width:40ch"><p>Source only in this pass.</p><p>Historical lettering is preserved as supplied. Use the copied image for any exact reference; no editable lettering has been guessed.</p><a href="{source}">Open original source copy</a></div></div></section></div><footer><a href="{source}">Open source copy</a></footer></article>''')

# Publish asset links and evidence statuses back into the G3 machine-readable source catalog.
for e in catalog['entries']:
    ident=e['id']
    matches=[p for p in files if p.name.startswith(ident)]
    if matches:
        e['vectorFiles']=['drawings/svg/'+p.name for p in matches]
        e['fidelity']='source-traced ink contours' if any('traced' in p.name for p in matches) else 'contemporary editable source-informed study'
        e['status']='editable SVG comparison published in drawings/index.html'
    elif ident=='G3-004':
        e['vectorFiles']=[]; e['fidelity']='original source retained; lettering not redrawn'; e['status']='source-only preservation card in drawings/index.html'
    elif ident=='G3-001':
        e['status']='optional numeric-source cartoon trace published'
    else:
        e['vectorFiles']=[]; e['status']='source reviewed; no explicit reconstruction in this set'
(BASE/'catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(HERE/'assets-manifest.json').write_text(json.dumps({"collection":"G3 editable vector output","assetCount":len(assets_manifest),"sourceIntegrity":"all source images remain unchanged; SVGs are independent vector files","assets":assets_manifest},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
html_doc='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Graphics 3 · source-faithful editable vector studies</title>
<style>
:root{color-scheme:light;--ink:#140206;--paper:#f1e5d0;--nile:#1034a6;--ochre:#b77b39;font:16px/1.5 system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;background:#eee8dc;color:var(--ink)}header.hero{padding:28px max(20px,calc((100vw - 1180px)/2));background:var(--ink);color:var(--paper)}h1{margin:0 0 .4rem;font-size:clamp(1.5rem,3vw,2.4rem)}.hero p{max-width:84ch;margin:.4rem 0;color:#e8dcc7}.hero a{color:#f3d899}.cards{max-width:1180px;margin:22px auto;padding:0 20px;display:grid;gap:18px}.card{background:#fffdf8;border:1px solid #d8ccb7;border-radius:12px;overflow:hidden}.card-top{padding:18px 20px;background:repeating-linear-gradient(135deg,#e8ddc9 0px,#e8ddc9 16px,#e3d7c3 16px,#e3d7c3 32px)}.card h2{margin:0;font-size:1.2rem}.card p{margin:.35rem 0 0}.eyebrow{text-transform:uppercase;letter-spacing:.1em;font-size:.75rem;font-weight:700;color:#3b5b5e}.brief,.desc{max-width:96ch}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:0}.comparison section{padding:14px;min-width:0}.comparison h3{font-size:.95rem;margin:0 0 8px}.preview{height:500px;display:grid;place-items:center;background:#e8e0d2;border:1px solid #d4c9b7;overflow:auto}.preview img,.preview object{display:block;width:100%;height:100%;object-fit:contain}.preview.source img{height:100%;width:100%;object-fit:contain}.preview object{border:0}.card footer{display:flex;gap:18px;flex-wrap:wrap;padding:0 14px 16px}.card a{color:#1034a6}.notice{max-width:1180px;margin:16px auto;padding:0 20px}.notice nav{display:flex;gap:14px;flex-wrap:wrap}.notice a{color:#1034a6}@media(max-width:720px){.comparison{grid-template-columns:1fr}.preview{height:420px}}
</style><link rel="stylesheet" href="gallery-canonical.css"></head><body><header class="hero"><h1>Graphics 3 · editable vector studies</h1><p>Source comparisons for every requested visual. Hand-built drawings are contemporary interpretations grouped into editable parts. Source-traced pieces are identified in their captions and preserve cropped ink contours as editable paths; no source raster is embedded in the SVGs.</p></header><div class="notice"><nav><a href="../CATALOG.md">G3 source inventory</a><a href="../contact-sheet-01.jpg">Contact sheet 1</a><a href="../contact-sheet-02.jpg">Contact sheet 2</a><a href="../khedival-architecture/catalog.json">Khedival architecture source catalog</a><a href="../khedival-architecture/contact-sheet.jpg">Architecture contact sheet</a><a href="../layouts/LAYOUT-INVENTORY.md">Layout inventory</a></nav></div><main class="cards">'''+''.join(cards)+'''</main></body></html>'''
(HERE/'index.html').write_text(html_doc,encoding='utf-8')
print('gallery cards',len(cards))
