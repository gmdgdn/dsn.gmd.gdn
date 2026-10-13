// Polygonal-technique engine (rays from edge midpoints at contact angle θ), cell-based so repeats match by construction.
(function(g){
const R3=Math.sqrt(3),R2=Math.SQRT2,D=Math.PI/180,EPS=1e-6;
const ng=(n,x,y,r,o)=>[...Array(n)].map((_,i)=>[x+r*Math.cos(o+2*Math.PI*i/n),y+r*Math.sin(o+2*Math.PI*i/n)]);
const L12=1/Math.tan(Math.PI/12), d8=1+R2;
const a12=[[L12,0],[L12/2,L12*R3/2]];
const tri12=()=>{const[A,B]=a12,s=[A[0]+B[0],A[1]+B[1]],c1=[s[0]/3,s[1]/3],c2=[s[0]*2/3,s[1]*2/3];
 return [ng(3,c1[0],c1[1],1/R3,Math.atan2(-c1[1],-c1[0])+Math.PI/3),ng(3,c2[0],c2[1],1/R3,Math.atan2(s[1]-c2[1],s[0]-c2[0])+Math.PI/3)]};
const FAM={
 hex:{id:'F1',name:'Hexagonal 6.6.6',a:[[R3,0],[R3/2,1.5]],poly:()=>[ng(6,0,0,1,Math.PI/6)]},
 tri:{id:'F2',name:'Triangular 3^6',a:[[1,0],[.5,R3/2]],poly:()=>[[[0,0],[1,0],[.5,R3/2]],[[1,0],[.5,R3/2],[1.5,R3/2]]]},
 sq:{id:'F3',name:'Square 4.4.4.4',a:[[1,0],[0,1]],poly:()=>[ng(4,.5,.5,R2/2,Math.PI/4)]},
 oct:{id:'F4',name:'Octagon-square 4.8.8',a:[[d8,0],[0,d8]],poly:()=>[ng(8,0,0,.5/Math.sin(Math.PI/8),Math.PI/8),ng(4,d8/2,d8/2,R2/2,0)]},
 trihex:{id:'F5',name:'Trihexagonal 3.6.3.6',a:[[2,0],[1,R3]],poly:()=>[ng(6,0,0,1,0),[[1,0],[1.5,R3/2],[.5,R3/2]],[[.5,R3/2],[0,R3],[-.5,R3/2]]]},
 dod:{id:'F6',name:'Dodecagon-triangle 3.12.12',a:a12,poly:()=>[ng(12,0,0,.5/Math.sin(Math.PI/12),Math.PI/12),...tri12()]}
};
function rays(pg,th){const n=pg.length,c=pg.reduce((p,q)=>[p[0]+q[0]/n,p[1]+q[1]/n],[0,0]),r=[];
 for(let i=0;i<n;i++){const a=pg[i],b=pg[(i+1)%n],m=[(a[0]+b[0])/2,(a[1]+b[1])/2],e=Math.atan2(b[1]-a[1],b[0]-a[0]);
  const s=((b[0]-a[0])*(c[1]-m[1])-(b[1]-a[1])*(c[0]-m[0]))>0?1:-1;
  r.push({o:m,e:i,a:e+s*th},{o:m,e:i,a:e+Math.PI-s*th})}return r}
function nearest(p,R){let best=null;for(const q of R){if(q.e===p.e)continue;
 const dx=Math.cos(p.a),dy=Math.sin(p.a),ex=Math.cos(q.a),ey=Math.sin(q.a),k=dx*ey-dy*ex;if(Math.abs(k)<1e-9)continue;
 const ox=q.o[0]-p.o[0],oy=q.o[1]-p.o[1],t=(ox*ey-oy*ex)/k,u=(ox*dy-oy*dx)/k;
 if(t>1e-7&&u>1e-7&&(!best||t<best.t))best={t,q}}return best}
const pt=(p,t)=>[p.o[0]+t*Math.cos(p.a),p.o[1]+t*Math.sin(p.a)];
const inside=(pg,P)=>pg.every((a,i)=>{const b=pg[(i+1)%pg.length];return (b[0]-a[0])*(P[1]-a[1])-(b[1]-a[1])*(P[0]-a[0])>-1e-7*Math.max(1,0)}) ||
  pg.every((a,i)=>{const b=pg[(i+1)%pg.length];return (b[0]-a[0])*(P[1]-a[1])-(b[1]-a[1])*(P[0]-a[0])<1e-7});
// Adjacent-edge rule: the ray leaving edge i toward vertex i+1 meets the ray leaving edge i+1 toward that same vertex.
// Verified per polygon: both rays reach the meeting point at equal distance (symmetric apex) and it lies inside the polygon.
function build(key,deg,minF=0.12){const f=FAM[key],th=deg*D,segs=[],why=new Set();let ok=true,minLen=1e9,chord=false;
 for(const pg of f.poly()){const n=pg.length,R=rays(pg,th),F=[],B=[];
  for(let i=0;i<n;i++){F[i]=R[2*i];B[i]=R[2*i+1]}
  for(let i=0;i<n;i++){const p=F[i],q=B[(i+1)%n],dx=Math.cos(p.a),dy=Math.sin(p.a),ex=Math.cos(q.a),ey=Math.sin(q.a),k=dx*ey-dy*ex;
   if(Math.abs(k)<1e-9){const vx=q.o[0]-p.o[0],vy=q.o[1]-p.o[1],L=Math.hypot(vx,vy);
    if(Math.abs(vx*dy-vy*dx)<1e-9&&vx*dx+vy*dy>0){segs.push([p.o[0],p.o[1],q.o[0],q.o[1]]);minLen=Math.min(minLen,L);chord=true;continue}
    ok=false;why.add('parallel rays');continue}
   const ox=q.o[0]-p.o[0],oy=q.o[1]-p.o[1],t=(ox*ey-oy*ex)/k,u=(ox*dy-oy*dx)/k;
   if(t<=1e-7||u<=1e-7){ok=false;why.add('rays diverge');continue}
   if(Math.abs(t-u)>EPS){ok=false;why.add('asymmetric apex')}
   const P=pt(p,t);if(!inside(pg,P)){ok=false;why.add('apex outside polygon')}
   const gap=Math.min(...pg.map((a,j)=>{const b=pg[(j+1)%n],L=Math.hypot(b[0]-a[0],b[1]-a[1]);return Math.abs((b[0]-a[0])*(P[1]-a[1])-(b[1]-a[1])*(P[0]-a[0]))/L}));
   minLen=Math.min(minLen,gap);if(gap<minF){ok=false;why.add('sliver narrower than '+minF+' edge-units')}
   segs.push([p.o[0],p.o[1],P[0],P[1]],[q.o[0],q.o[1],P[0],P[1]]);minLen=Math.min(minLen,t,u)}}
 return{segs,ok,why:[...why],minLen,f,chord}}
function validRanges(key,step=1){const r=[];let s=null;for(let d=step;d<=90+1e-9;d+=step){const v=build(key,d).ok;if(v&&s===null)s=d;if(!v&&s!==null){r.push([s,d-step]);s=null}}if(s!==null)r.push([s,90]);return r}
const P=(s,k=1)=>s.map(g=>`M${(g[0]*k).toFixed(3)} ${(g[1]*k).toFixed(3)}L${(g[2]*k).toFixed(3)} ${(g[3]*k).toFixed(3)}`).join('');
const poly=(pg,k=1)=>'M'+pg.map(p=>(p[0]*k).toFixed(3)+' '+(p[1]*k).toFixed(3)).join('L')+'Z';
g.PG={FAM,build,validRanges,P,poly,rays,nearest};if(typeof module!=='undefined')module.exports=g.PG;
})(typeof window!=='undefined'?window:globalThis);
