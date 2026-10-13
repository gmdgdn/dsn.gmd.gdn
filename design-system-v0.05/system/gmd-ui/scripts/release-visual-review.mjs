import fs from 'node:fs/promises'
import {chromium} from 'file:///C:/Users/khorm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
const browser=await chromium.launch({headless:true})
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'})
await fs.mkdir('proof/release-07',{recursive:true})
for(const view of ['?page=home','?states=1','?page=services']){
 await page.goto((process.argv[2]||'http://127.0.0.1:8766/design-system-v0.05/system/gmd-ui/registry-dist/catalog/')+view)
 await page.locator('h1').waitFor()
 await page.evaluate(()=>document.fonts.ready)
 await page.screenshot({path:'proof/release-07/'+(view.includes('states')?'states':view.split('=')[1])+'.png',fullPage:!view.includes('home')})
}
await browser.close()

