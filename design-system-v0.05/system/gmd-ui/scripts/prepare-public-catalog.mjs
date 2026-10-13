import fs from 'node:fs/promises'
import postcss from 'postcss'
const css = postcss.parse(await fs.readFile('src/gmd.css','utf8'))
css.walkAtRules('font-face',rule=>{
  if(rule.toString().includes('PerfectlyNineties')) rule.remove()
})
await fs.writeFile('src/gmd-public.css',css.toString().replaceAll('/assets/', '../public/assets/')+'\n:root{--gmd-font-display:"Source Serif 4"}\n')
