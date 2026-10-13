import fs from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'
import { registryItemSchema, registrySchema } from 'shadcn/schema'

const version = '0.7.2'
const host = JSON.parse(await fs.readFile('registry-host.json','utf8').catch(()=>'{}'))
const base = (process.env.GMD_REGISTRY_URL || host.url || 'http://127.0.0.1:8766/design-system-v0.05/system/gmd-ui/registry-dist').replace(/\/$/, '')
const output = path.resolve('registry-dist')
const pkg = JSON.parse(await fs.readFile('package.json', 'utf8'))
const url = name => `${base}/r/v${version}/${name}.json`
const items = []
const sourceItems = []
const toObject = nodes => {
  const result = {}
  for (const n of nodes || []) {
    if (n.type === 'decl') result[n.prop] = n.value + (n.important ? ' !important' : '')
    else if (n.type === 'rule' || n.type === 'atrule') {
      if (n.type === 'atrule' && ['font-face', 'theme', 'import'].includes(n.name)) continue
      const key = n.type === 'rule' ? n.selector : `@${n.name}${n.params ? ' ' + n.params : ''}`
      result[key] = { ...(result[key] || {}), ...toObject(n.nodes) }
    }
  }
  return result
}
const tokenCss = await fs.readFile('../tokens/tokens.css', 'utf8')
const adapterCss = await fs.readFile('../tokens/shadcn.css', 'utf8')
let skinCss = await fs.readFile('src/gmd.css', 'utf8')
for(const file of ['src/components/gmd/icons.css','src/components/gmd/website-blocks.css','src/page-patterns/page-patterns.css','src/components/gmd/pal-sections.css','src/components/gmd/cvi-sections.css']) {
  skinCss += '\n' + await fs.readFile(file,'utf8').catch(()=> '')
}
const assets = await fs.readdir('public/assets').catch(() => [])
// Consumer CSS owns its source: embed approved SVG patterns instead of requiring
// undocumented public paths. Photographs remain caller-supplied content.
for (const name of assets.filter(n => n.endsWith('.svg'))) {
  const svg = await fs.readFile(`public/assets/${name}`, 'utf8')
  const data = `data:image/svg+xml,${encodeURIComponent(svg).replaceAll("'",'%27').replaceAll('(','%28').replaceAll(')','%29')}`
  skinCss = skinCss.replaceAll(`../../../public/assets/${name}`, data).replaceAll(`./assets/${name}`, data).replaceAll(`/assets/${name}`, data)
}
const parsedTokens = postcss.parse(tokenCss + '\n' + adapterCss)
const light = {}
const theme = {}
parsedTokens.walkRules(':root', rule => rule.walkDecls(d => {
  if (d.prop.startsWith('--')) light[d.prop.slice(2)] = d.value.replaceAll('PerfectlyNineties', 'Source Serif 4')
}))
parsedTokens.walkAtRules('theme', rule => rule.walkDecls(d => { if(!d.prop.startsWith('--gmd-')) theme[d.prop.slice(2)] = d.value }))
for(let i=1;i<=5;i++) theme[`color-chart-${i}`] = `var(--chart-${i})`
const parsedSkin=postcss.parse(skinCss)
parsedSkin.walkDecls(d=>{
  if(d.prop==='font-family'||d.prop==='font') {
    for(const family of ['Mada','Handjet','Source Sans 3','Source Serif 4']) {
      const escaped=family.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
      d.value=d.value.replace(new RegExp(`(['"]?)${escaped}\\1(?! Variable)`,'g'),`'${family} Variable'`)
    }
  }
})
const css = {
  '@import "tw-animate-css"':{},
  ...toObject(parsedSkin.nodes),
}
const fontPackages=['@fontsource-variable/mada','@fontsource/amiri','@fontsource-variable/handjet','@fontsource-variable/source-sans-3','@fontsource-variable/source-serif-4']
for(const dependency of fontPackages)css[`@import "${dependency}"`]={}
const variableFamilies=['Mada','Handjet','Source Sans 3','Source Serif 4']
for(const family of variableFamilies){
  for(const key of Object.keys(light))light[key]=light[key].replaceAll(`'${family}'`,`'${family} Variable'`)
}
light['gmd-font-pixel']="'Handjet Variable'"
theme['font-pixel']='var(--gmd-font-pixel)'
let portableCss=JSON.stringify(css)
for(const family of variableFamilies)portableCss=portableCss.replaceAll(`'${family}'`,`'${family} Variable'`)
function add(item) {
  const validated = registryItemSchema.parse({$schema:'https://ui.shadcn.com/schema/registry-item.json', ...item})
  items.push(validated)
}
const upstreamLicense=await fs.readFile('node_modules/shadcn/LICENSE.md','utf8')
await fs.mkdir('licenses',{recursive:true})
await fs.writeFile('licenses/SHADCN-UI.txt',upstreamLicense)
add({name:'foundations',title:'GMD foundations',type:'registry:style',description:'GMD semantic tokens, bilingual typography, hard depth, interaction states and project theme scopes. Light mode release.',dependencies:['tw-animate-css@'+pkg.dependencies['tw-animate-css'].replace(/^[~^]/,''),...fontPackages.map(name=>name+'@^5')],cssVars:{theme,light},css:JSON.parse(portableCss),files:[{path:'licenses/SHADCN-UI.txt',type:'registry:file',target:'~/licenses/gmd/SHADCN-UI.txt',content:upstreamLicense}]})
const sourceFiles = [
  ...(await fs.readdir('src/components/ui')).filter(n=>n.endsWith('.tsx')).map(n=>`src/components/ui/${n}`),
  'src/hooks/use-mobile.ts',
  ...(await fs.readdir('src/components/gmd')).filter(n=>/\.(tsx|ts)$/.test(n)).map(n=>`src/components/gmd/${n}`),
  ...(await fs.readdir('src/page-patterns').catch(()=>[])).filter(n=>/\.(tsx|ts)$/.test(n)).map(n=>`src/page-patterns/${n}`),
]
const normalizeName = file => {
  const stem = path.basename(file).replace(/\.(tsx|ts)$/,'')
  if(file === 'src/components/gmd/index.tsx') return 'gmd-visual-language'
  if(stem==='GMDIcon') return 'gmd-icon'
  if(stem==='CollectionForm') return 'form'
  if(file.includes('/page-patterns/')) return 'gmd-pages-'+stem.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()
  return stem.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()
}
const names = new Map(sourceFiles.map(file=>[file,normalizeName(file)]))
for (const file of sourceFiles) {
  const content = (await fs.readFile(file,'utf8')).replace(/^import\s+["'][^"']+\.css["'];?\s*$/gm,'')
  const imports = [...content.matchAll(/(?:from\s*|import\s*)["']([^"']+)["']/g)].map(m=>m[1])
  const dependencies = new Set()
  const registryDependencies = new Set([url('foundations')])
  for (const ref of imports) {
    if(ref.startsWith('@/')) {
      const stem = 'src/' + ref.slice(2)
      const match = sourceFiles.find(f=>f === stem+'.tsx' || f===stem+'.ts' || f===stem+'/index.tsx')
      if(match && match!==file) registryDependencies.add(url(names.get(match)))
    } else if(ref.startsWith('.')) {
      const stem=path.posix.normalize(path.posix.join(path.posix.dirname(file),ref))
      const match=sourceFiles.find(f=>f===stem+'.tsx'||f===stem+'.ts'||f===stem+'/index.tsx')
      if(match&&match!==file) registryDependencies.add(url(names.get(match)))
    } else if (!ref.startsWith('.') && !ref.startsWith('react')) {
      const dep = ref.startsWith('@') ? ref.split('/').slice(0,2).join('/') : ref.split('/')[0]
      if(pkg.dependencies[dep]) dependencies.add(`${dep}@${pkg.dependencies[dep].replace(/^[~^]/,'')}`)
    }
  }
  const pageFile=file.includes('/page-patterns/')
  const type = pageFile ? 'registry:block' : file.includes('/hooks/') ? 'registry:hook' : file.includes('/gmd/') ? 'registry:component' : 'registry:ui'
  const files = [{path:file,type,content,...(pageFile?{target:`@components/gmd/page-patterns/${path.basename(file)}`} : file.includes('/gmd/')?{target:`@components/gmd/${path.basename(file)}`}:{})}]
  if(names.get(file)==='gmd-visual-language') {
    for(const asset of ['true-interlace-panel.svg','egyptian-pendant-register.svg','connected-parquet-morph.svg']) {
      files.push({path:`public/assets/${asset}`,type:'registry:file',target:`~/public/assets/${asset}`,content:await fs.readFile(`public/assets/${asset}`,'utf8')})
    }
  }
  if(names.get(file)==='cvi-sections') {
    for(const asset of (await fs.readdir('public/assets')).filter(name=>name.startsWith('pixel-')&&name.endsWith('.svg'))) {
      files.push({path:`public/assets/${asset}`,type:'registry:file',target:`~/public/assets/${asset}`,content:await fs.readFile(`public/assets/${asset}`,'utf8')})
    }
  }
  if(names.get(file)==='pal-sections') {
    for(const asset of ['true-interlace-panel.svg','egyptian-pendant-register.svg','connected-parquet-morph.svg','dual-level-field.svg']) {
      files.push({path:`public/assets/${asset}`,type:'registry:file',target:`~/public/assets/${asset}`,content:await fs.readFile(`public/assets/${asset}`,'utf8')})
    }
  }
  const item = {name:names.get(file),type,title:`GMD ${names.get(file)}`,dependencies:[...dependencies],registryDependencies:[...registryDependencies],files}
  add(item)
  sourceItems.push({...item,files:files.map(({content,...f})=>f)})
}
add({name:'toast',title:'Toast (Sonner)',type:'registry:ui',description:'Current toast implementation is Sonner; this alias avoids installing a second toast stack.',registryDependencies:[url('sonner')]})
for(const project of ['film','archive']) {
  const presets = toObject(postcss.parse(skinCss).nodes.filter(n=>n.type==='rule' && n.selector.includes(`data-gmd-theme="${project}"`)))
  add({name:`theme-${project}`,title:`GMD ${project} theme`,type:'registry:style',description:`Use data-gmd-theme="${project}" on document.documentElement. Own the installed CSS to remix project roles.`,registryDependencies:[url('foundations')],css:presets})
}
add({name:'gmd-all',title:'GMD complete component system',type:'registry:block',description:'Full adapted shadcn catalog, GMD visual compositions, foundations and project themes. React 19, Tailwind 4.',registryDependencies:items.filter(i=>i.name!=='gmd-all').map(i=>url(i.name))})
await fs.mkdir(`${output}/r/v${version}`,{recursive:true})
for(const dir of [`${output}/r/v${version}`,`${output}/r`]) {
  for(const file of await fs.readdir(dir)) {
    if(file.endsWith('.json') && !items.some(i=>file===i.name+'.json')) await fs.unlink(path.join(dir,file))
  }
}
for(const item of items) {
  const json = JSON.stringify(item,null,2)+'\n'
  await fs.writeFile(`${output}/r/v${version}/${item.name}.json`,json)
  await fs.writeFile(`${output}/r/${item.name}.json`,json)
}
const registry = registrySchema.parse({$schema:'https://ui.shadcn.com/schema/registry.json',name:'gmd',homepage:base,items})
await fs.writeFile(`${output}/registry.json`,JSON.stringify(registry,null,2)+'\n')
await fs.writeFile('registry.json',JSON.stringify({...registry,items:items.map(item=>sourceItems.find(i=>i.name===item.name)||item)},null,2)+'\n')
await fs.writeFile(`${output}/_headers`, '/r/*\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n/fonts/*\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n/registry.json\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n')
await fs.mkdir(`${output}/licenses`,{recursive:true})
await fs.writeFile(`${output}/licenses/SHADCN-UI.txt`,upstreamLicense)
for(const name of (await fs.readdir('public/fonts')).filter(n=>n.toLowerCase().includes('ofl')))await fs.writeFile(`${output}/licenses/${name}`,await fs.readFile(`public/fonts/${name}`))
await fs.writeFile(`${output}/404.html`,'<!doctype html><title>GMD registry — not found</title><h1>Registry item not found</h1><a href="/">Registry index</a>')
const guide = `# GMD UI ${version}\n\nAn owned-source React 19 / Tailwind 4 system based on the existing GMD Pen foundations and Tavus-inspired editorial grammar.\n\n## Install\n\nInitialize shadcn first in your application. Run from its project directory:\n\n\`\`\`sh\npnpm dlx shadcn@latest init\npnpm dlx shadcn@latest add ${url('gmd-all')}\n\`\`\`\n\nFor one component, use ${url('button')} instead. Each item installs its GMD dependencies and foundations. Existing files are subject to the CLI's conflict prompts; review changes before updating customized components.\n\n## Namespace\n\nAdd to components.json:\n\n\`\`\`json\n{"registries":{"@gmd":"${base}/r/v${version}/{name}.json"}}\n\`\`\`\n\nThen use \`pnpm dlx shadcn@latest add @gmd/button\` or \`@gmd/gmd-all\`.\n\n## Themes and remixes\n\nSet \`document.documentElement.dataset.gmdTheme = "gmd"\`, \`"film"\`, or \`"archive"\`. Keep the attribute on the document root so portal menus/dialogs inherit the theme. Override semantic roles in your own CSS for new projects; preserve accessible contrast and the focus-ring role. GMD uses pink actions, Nile selection/focus, paper surfaces and ink hard edges. Film uses ink actions and sand surfaces; Archive uses warm surfaces, Nile actions and faience accents. Light mode is supported in this release.\n\nThe installed CSS is editable source. Independent project layouts use these roles rather than hard-coded reference colors. Keep future additions on the versioned registry URL until you review a release diff.\n\n## Arabic\n\nSet HTML lang="ar" and dir="rtl"; wrap Radix compositions in DirectionProvider where appropriate. Mada is the UI/heading face, Amiri is the prose face, Handjet is for selective pixel labels. Latin uses Source Sans 3, Source Serif 4 and Handjet. The hosted registry uses open font families; PerfectlyNineties is an optional licensed local brand font and is not distributed. Installed projects bundle the OFL fonts through Fontsource packages, so font loading has no Google Fonts network dependency. The hosted catalog uses the existing self-hosted OFL files.\n\n## Components and graphics\n\n61 upstream UI modules plus DataTable, DatePicker, GMDForm and Typography compositions, the Toast/Sonner alias, a mobile hook and six GMD visual exports. The whole-system item installs ${sourceFiles.length+3} source/SVG files plus the upstream license. It also includes GMDIcon, ten public website blocks and PagePatterns, with six navigable GMD reference pages. DataTable and GMDForm are working collection examples, not a backend or a complete business domain.\n\nImport visual exports from your components alias + /gmd: RegisterDivider, CulturalMediaFrame, ProjectFeature, ProvenancePanel, PatternedCover, EmptyState. Three approved existing SVG assets install at the public root; image content is supplied by the application. Props let you change content, artwork, palette and image fit. SVG source files remain editable. Photography is shown in the catalog and is not bundled into consumer components. PagePatterns accepts assetBase (default ./assets); host the referenced photography there or replace the editable sample content. Use onNavigate, onInquiry and onLocaleChange to connect the page shell to your router and contact workflow.\n\n## Architecture\n\nReference tokens → purpose tokens → shadcn semantic adapter → accessible primitive source → GMD skins → cultural media and page compositions → project theme roles. Registry style injection installs the tokens and skins into the consuming application's configured CSS entry. Component paths respect components.json aliases; public SVG targets are relative to the project root.\n\n## Build / publish\n\nSet GMD_REGISTRY_URL to your registry host before running scripts/build-registry.mjs. It validates the official shadcn registry schema and generates content-bearing JSON, versioned endpoints and current aliases. Run scripts/check-registry.mjs and a clean CLI consumer install before publishing. Use the checked-in Cloudflare Worker static-asset configuration to deploy registry-dist.\n\n## Scope and provenance\n\nUpstream UI behavior remains shadcn/Radix; Combobox uses the current Base UI implementation and Questionnaire/MessageScroller use @shadcn/react. Geometry/assets are the existing approved GMD SVGs; none were redrawn in this phase. Pen has representative editable category boards, not 61 individually drawn component masters. The catalog is a component reference rather than a production company website.\n\nOfficial references: https://ui.shadcn.com/docs/registry/registry-item-json and https://ui.shadcn.com/docs/components .\n`
await fs.writeFile(`${output}/GUIDE.md`,guide)
await fs.writeFile('REGISTRY.md',guide)
await fs.writeFile(`${output}/index.html`, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>GMD UI registry ${version}</title><style>body{margin:0;background:#F7F4EF;color:#140206;font:18px/1.6 system-ui}main{max-width:1000px;margin:auto;padding:48px 24px}h1{font:600 clamp(38px,6vw,72px)/1.1 Georgia}a{color:#1034A6}pre{overflow:auto;background:#FFFDFB;border:1px solid;padding:24px;box-shadow:5px 5px #140206}ul{columns:3;column-width:220px}li{margin:8px 0}small{color:#625E5B}</style><main><small>GMD / OPEN COMPONENT SYSTEM / ${version}</small><h1>Egyptian context.<br>Reusable interface foundations.</h1><p>Square ink frames, hard depth, Nile focus, editorial registers and bilingual typography. Built on owned shadcn source with accessible primitives; project roles can be remixed for Film and Archive.</p><h2>Install</h2><p>Initialize shadcn in a React + Tailwind 4 project first. Install one component or the full system.</p><pre>pnpm dlx shadcn@latest add ${url('button')}\npnpm dlx shadcn@latest add ${url('gmd-all')}</pre><p><a href="./catalog/">Explore the interactive catalog</a> · <a href="./catalog/?states=1">States and icons</a> · <a href="./catalog/?page=home">GMD page templates</a> · <a href="./registry.json">Registry manifest</a> · <a href="./GUIDE.md">Installation and remix guide</a></p><h2>${items.length} registry items</h2><ul>${items.map(i=>`<li><a href="r/v${version}/${i.name}.json">${i.title||i.name}</a></li>`).join('')}</ul><p>Light mode release. Open font families bundled through Fontsource dependencies. Proprietary brand fonts and photographs are excluded from installable components. Content images are supplied by the consuming project.</p></main></html>`)
console.log(JSON.stringify({version,items:items.length,ui:sourceFiles.filter(f=>f.includes('/ui/')).length,base,output},null,2))
