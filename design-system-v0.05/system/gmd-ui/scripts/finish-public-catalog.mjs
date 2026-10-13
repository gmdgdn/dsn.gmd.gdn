import fs from 'node:fs/promises'
await fs.rename('registry-dist/catalog/catalog.html','registry-dist/catalog/index.html').catch(async error=>{
  if(error.code!=='ENOENT')throw error
  await fs.access('registry-dist/catalog/index.html')
})
await fs.mkdir('registry-dist/catalog/assets',{recursive:true})
for(const name of ['eg-026.jpg','eg-027.jpg','eg-032.jpg','eg-013.webp','eg-034.webp','eg-028.jpg','col1-community-heart.jpg','true-interlace-panel.svg','egyptian-pendant-register.svg','connected-parquet-morph.svg','dual-level-field.svg']) {
  const data=await fs.readFile(`public/assets/${name}`)
  const previous=await fs.readFile(`registry-dist/catalog/assets/${name}`).catch(()=>null)
  if(!previous?.equals(data))await fs.writeFile(`registry-dist/catalog/assets/${name}`,data)
}
console.log('Public catalog packaged without proprietary font files or private project files.')


for(const name of (await fs.readdir('public/assets')).filter(n=>n.startsWith('pixel-')))await fs.copyFile(`public/assets/${name}`,`registry-dist/catalog/assets/${name}`)
