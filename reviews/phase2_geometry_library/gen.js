const G=require('./geometry.js'),fs=require('fs');const {FAM,build,P,poly}=G;
const DEF={hex:60,tri:45,sq:67.5,oct:67.5,trihex:45,dod:75};const K=100,N=4,HI=89;
const rng=JSON.parse(fs.readFileSync('ranges.json'));fs.mkdirSync('out/svg',{recursive:true});
const tr=(f,i,j)=>[i*f.a[0][0]+j*f.a[1][0],i*f.a[0][1]+j*f.a[1][1]];
const key=(x,y)=>Math.round(x*50)+','+Math.round(y*50);
const css=`<style>.ink{stroke:var(--pg-ink,#10343a)}.paper{stroke:var(--pg-paper,#eef2ee)}.t3{fill:var(--pg-t3,#c8472b)}.t4{fill:var(--pg-t4,#2f6f68)}.t6{fill:var(--pg-t6,#10343a)}.t8{fill:var(--pg-t8,#b5651d)}.t12{fill:var(--pg-t12,#3b1f2b)}.sc{fill:none;stroke:var(--pg-ink,#10343a);stroke-width:1;stroke-dasharray:4 4;opacity:.5}</style>`;
const layers=(r,w)=>{const f=r.f,d=P(r.segs,K);
 return `<g id="tint" opacity=".22">${f.poly().map(p=>`<path class="t${p.length}" d="${poly(p,K)}"/>`).join('')}</g>`+
 `<g id="scaffold">${f.poly().map(p=>`<path class="sc" d="${poly(p,K)}"/>`).join('')}</g>`+
 `<g id="band" fill="none" stroke-linecap="butt" stroke-linejoin="miter"><path class="ink" stroke-width="${((w+.05)*K).toFixed(2)}" d="${d}"/><path class="paper" stroke-width="${(w*K).toFixed(2)}" d="${d}"/></g>`+
 `<g id="lines" fill="none" stroke-linecap="round"><path class="ink" stroke-width="2" d="${d}"/></g>`};
const rep={};const man=[];
for(const k in FAM){const f=FAM[k],th=DEF[k],r=build(k,th);if(!r.ok)throw k+' default invalid';
 // bounds of cell
 const all=f.poly().flat(),xs=all.map(p=>p[0]*K),ys=all.map(p=>p[1]*K),m=20;
 const vb=[Math.min(...xs)-m,Math.min(...ys)-m,Math.max(...xs)-Math.min(...xs)+2*m,Math.max(...ys)-Math.min(...ys)+2*m].map(v=>v.toFixed(1)).join(' ');
 const base=`out/svg/${f.id}_${k}`;
 fs.writeFileSync(base+'_cell.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" data-family="${f.name}" data-theta="${th}" data-source="generic polygonal-technique construction (Bonner p.187, p.222); not a copy of a specific figure">${css}<title>${f.name} θ=${th}° fundamental cell (layers: tint, scaffold, band, lines)</title>${layers(r,.07)}</svg>`);
 // field N x N cells, banded
 const a1=f.a[0],a2=f.a[1],W=N*a1[0]*K,H=N*a2[1]*K;let u='';
 for(let j=-2;j<=N+2;j++)for(let i=-N-3;i<=N+3;i++){const[x,y]=tr(f,i,j);u+=`<use href="#cell" x="${(x*K).toFixed(2)}" y="${(y*K).toFixed(2)}"/>`}
 fs.writeFileSync(base+'_field.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" data-repeat="${N}x${N}" data-theta="${th}">${css}<defs><g id="cell"><g id="band" fill="none"><path class="ink" stroke-width="${(.12*K).toFixed(2)}" d="${P(r.segs,K)}"/><path class="paper" stroke-width="${(.07*K).toFixed(2)}" d="${P(r.segs,K)}"/></g></g></defs><rect width="100%" height="100%" style="fill:var(--pg-paper,#eef2ee)"/>${u}</svg>`);
 fs.writeFileSync(base+'_simple.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(2*a1[0]*K).toFixed(1)} ${(2*a2[1]*K).toFixed(1)}" data-use="unit &lt; 24px">${css}<defs><path id="c" fill="none" class="ink" stroke-width="${(.16*K).toFixed(1)}" stroke-linecap="butt" d="${P(r.segs,K)}"/></defs><rect width="100%" height="100%" style="fill:var(--pg-paper,#eef2ee)"/>${[-3,-2,-1,0,1,2,3].flatMap(j=>[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(i=>{const[x,y]=tr(f,i,j);return `<use href="#c" x="${(x*K).toFixed(1)}" y="${(y*K).toFixed(1)}"/>`})).join('')}</svg>`);
 // ---- independent verification on 3x3 field, after SVG-precision rounding ----
 const segsR=r.segs.map(s=>s.map(v=>Math.round(v*K*100)/100/K)); // 2-decimal rounding at K=100
 const pts=new Map(),add=(x,y)=>pts.set(key(x,y),(pts.get(key(x,y))||0)+1);const F=[];
 for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const[x,y]=tr(f,i,j);for(const s of segsR){F.push([s[0]+x,s[1]+y,s[2]+x,s[3]+y]);add(s[0]+x,s[1]+y);add(s[2]+x,s[3]+y)}}
 const centre=segsR.flatMap(s=>[[s[0],s[1]],[s[2],s[3]]]);let minDeg=1e9,badDeg=0,mid=0;const degs={};
 for(const[x,y]of centre){const dg=pts.get(key(x,y));minDeg=Math.min(minDeg,dg);degs[dg]=(degs[dg]||0)+1;if(dg<2)badDeg++}
 // crossing angle check at edge midpoints: lines through midpoint differ by 2θ (mod 180)
 let angBad=0,angN=0;const byPt=new Map();
 for(const s of segsR){const k2=key(s[0],s[1]);(byPt.get(k2)||byPt.set(k2,[]).get(k2)).push(Math.atan2(s[3]-s[1],s[2]-s[0]))}
 for(const[,a]of byPt){const ds=a.map(x=>((x*180/Math.PI)%180+180)%180);const u=[...new Set(ds.map(v=>v.toFixed(1)))];if(u.length>=2){const d=Math.abs(+u[0]-+u[1]);const e=Math.min(Math.abs(d-2*th%180),Math.abs(d-(180-2*th%180)),Math.abs(d-(2*th%180)));angN++;if(e>0.6&&Math.abs(d-(180-th*2))>.6&&Math.abs(d-(2*th))>.6)angBad++}}
 rep[k]={id:f.id,name:f.name,theta:th,validRange:`${rng[k].ranges[0][0]}–${HI}°`,segments:r.segs.length,chordCase:r.chord,minDegree:minDeg,danglingEnds:badDeg,degreeHistogram:degs,crossings:angN,crossingAngleMismatch:angBad,finestFeature_edgeUnits:+r.minLen.toFixed(3),minUnitPx_for_1p5px_feature:Math.ceil(1.5/r.minLen)};
 man.push({file:base+'_cell.svg'})}
fs.writeFileSync('out/verification.json',JSON.stringify(rep,null,1));console.log(JSON.stringify(rep,null,0));
