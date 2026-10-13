"""Import supported curated SVG primitives into native Pen paths; no geometry regeneration."""
import json,re,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sources=[('patterns/true-interlace-panel.svg','iUACr',80),('patterns/dual-level-field.svg','Z43Pep',500),('../../deep/motifs/egyptian-pendant-register.svg','DPExt',920),('medallion/mamluk-16star-medallion.svg','X4cTE2',1340)]
commands=[]
for filename,old,x in sources:
    tree=ET.parse(root/'assets'/filename).getroot()
    vb=list(map(float,tree.attrib['viewBox'].split()))
    rules={}
    for e in tree.iter():
        if e.tag.endswith('style'):
            for cls,body in re.findall(r'\.([\w-]+)\s*\{([^}]+)\}',e.text or ''):
                rules[cls]=dict(re.findall(r'([\w-]+)\s*:\s*([^;]+)',body))
    scale=min(350/vb[2],128/vb[3]); w,h=vb[2]*scale,vb[3]*scale
    frame={'type':'frame','name':'Native '+Path(filename).stem,'x':x+(350-w)/2,'y':342+(128-h)/2,'width':w,'height':h,'clip':True,'layout':'none'}
    commands.append('Delete('+json.dumps(old)+'); const f'+str(x)+'=Insert("ygYfW",'+json.dumps(frame)+');')
    def walk(e,inherited):
        style={**inherited,**rules.get(e.attrib.get('class',''),{}),**e.attrib}
        tag=e.tag.split('}')[-1]
        if tag in ('defs','style','text','title','desc'):return
        if 'transform' in e.attrib:return
        d=None
        if tag=='path':d=e.attrib.get('d')
        elif tag=='polygon':
            pts=e.attrib.get('points','').strip().split(); d='M '+' L '.join(pts)+' Z' if pts else None
        elif tag=='rect':
            a,b=float(e.attrib.get('x',0)),float(e.attrib.get('y',0)); rw,rh=float(e.attrib.get('width',0)),float(e.attrib.get('height',0));d=f'M {a},{b} h {rw} v {rh} h {-rw} Z'
        elif tag=='line':d=f'M {e.attrib.get("x1",0)},{e.attrib.get("y1",0)} L {e.attrib.get("x2",0)},{e.attrib.get("y2",0)}'
        elif tag=='circle':
            a,b,r=float(e.attrib['cx']),float(e.attrib['cy']),float(e.attrib['r']);d=f'M {a-r},{b} a {r},{r} 0 1,0 {2*r},0 a {r},{r} 0 1,0 {-2*r},0'
        if d:
            n={'type':'path','name':Path(filename).stem+' '+tag,'geometry':d,'viewBox':vb,'width':w,'height':h}
            for k in ('fill','stroke'):
                val=style.get(k,'#000000' if k=='fill' else 'none');val=re.sub(r'var\([^,]+,\s*([^\)]+)\)',r'\1',val)
                if val!='none':n[k]=val
            if 'stroke' in n:n['strokeWidth']=float(style.get('stroke-width',1))*scale
            if 'opacity' in style:n['opacity']=float(style['opacity'])
            commands.append('Insert(f'+str(x)+','+json.dumps(n)+');')
        for child in e:walk(child,style)
    walk(tree,{})
commands.append('Update("mz0EL",{fill:Get("V4qJG").fill}); Delete("fUL76");')
commands.append('Get("ygYfW",n=>n.type==="text"&&Update(n.id,{fontFamily:n.name==="Header Title"?"Perfectly Nineties":n.name.includes("CTA")?"Fk Raster Grotesk Compact Blended":"Suisse Intl",fontWeight:"normal"})); Update("ygYfW",{placeholder:false}); TakeScreenshot(["ygYfW"]);')
(root/'scripts'/'pen-native-import.js').write_text('\n'.join(commands),encoding='utf8')
print(len(commands),'native import operations')
