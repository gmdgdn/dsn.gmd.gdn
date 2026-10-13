import fs from 'node:fs/promises'
const dir = process.argv[2] || 'registry-consumer-test'
await fs.mkdir(`${dir}/src`,{recursive:true})
const config=JSON.parse(await fs.readFile('components.json','utf8'))
if(process.argv[3])config.registries={'@gmd':process.argv[3].replace(/\/$/,'')+'/r/v0.6.0/{name}.json'}
await fs.writeFile(`${dir}/components.json`,JSON.stringify(config,null,2))
await fs.writeFile(`${dir}/package.json`, JSON.stringify({name:'gmd-registry-consumer',private:true,type:'module',dependencies:{react:'19.2.8','react-dom':'19.2.8',tailwindcss:'4.3.3'}}))
await fs.writeFile(`${dir}/tsconfig.json`, JSON.stringify({compilerOptions:{baseUrl:'.',paths:{'@/*':['./src/*']}}}))
await fs.writeFile(`${dir}/src/index.css`, '@import "tailwindcss";\n')
await fs.writeFile(`${dir}/.npmrc`, 'ignore-workspace-root-check=true\n')
console.log(dir)
