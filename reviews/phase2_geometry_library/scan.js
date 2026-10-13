const G=require('./geometry.js');const out={};
for(const k in G.FAM){out[k]={name:G.FAM[k].name,ranges:G.validRanges(k,1)};console.log(k,JSON.stringify(out[k].ranges))}
require('fs').writeFileSync('ranges.json',JSON.stringify(out));
