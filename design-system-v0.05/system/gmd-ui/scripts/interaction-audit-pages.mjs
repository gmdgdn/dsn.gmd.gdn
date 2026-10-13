import fs from 'node:fs/promises'
import {pathToFileURL} from 'node:url'
import assert from 'node:assert/strict'
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE||'C:/Users/khorm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs').href)
const base=process.argv[2]||'http://127.0.0.1:4177/catalog.html'
assert.match(base,/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//)
const browser=await chromium.launch(),page=await browser.newPage(),results=[],errors=[]
page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message))
async function check(name,run){try{await run();results.push({name,status:'pass'})}catch(e){results.push({name,status:'fail',error:e.message});console.error(name,e.message.split('\n')[0])}}
try{
for(const locale of ['en','ar'])for(const width of [1280,390])for(const view of ['home','services','data','collection','about','contact'])await check(`page/${locale}/${width}/${view}`,async()=>{
 await page.setViewportSize({width,height:900});await page.goto(`${base}?page=${view}`,{waitUntil:'domcontentloaded',timeout:60000});await page.locator('.gmd-pattern-site').waitFor()
 if(await page.locator('.gmd-pattern-site').getAttribute('lang')!==locale)await page.locator('.gmd-site-actions button').first().click()
 await page.evaluate(()=>document.fonts.ready)
 assert.equal(await page.locator('.gmd-pattern-site').getAttribute('dir'),locale==='ar'?'rtl':'ltr')
 assert.equal(await page.locator('.gmd-pattern-site h1').count(),1)
 const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));assert.ok(geometry.scroll<=geometry.width+1,`overflow ${geometry.scroll}/${geometry.width}`)
 const imgs=page.locator('.gmd-pattern-site img');for(let i=0;i<await imgs.count();i++){const img=imgs.nth(i);await img.scrollIntoViewIfNeeded();await page.waitForFunction(index=>document.querySelectorAll('.gmd-pattern-site img')[index].complete,i);assert.ok(await img.evaluate(e=>e.naturalWidth>0),'Image successfully loaded');assert.ok(await img.getAttribute('alt'),'Image alternative text')}
 const typography=await page.locator('h1').evaluate(e=>({font:getComputedStyle(e).fontFamily,size:parseFloat(getComputedStyle(e).fontSize),loaded:document.fonts.check(`${getComputedStyle(e).fontSize} ${getComputedStyle(e).fontFamily.split(',')[0]}`)}));assert.ok(typography.size>=30);assert.ok(typography.loaded,'Heading font loaded');if(locale==='ar')assert.match(typography.font,/Mada/)
})
await page.goto(`${base}?page=data`);await page.locator('.gmd-dataset-catalog').waitFor()
await check('pages/data/filter-empty-reset-navigation',async()=>{
const input=page.locator('.gmd-dataset-search input');const before=await page.locator('.gmd-dataset-card').count();assert.ok(before>0);await input.fill('zzzz-none');await page.locator('.gmd-dataset-empty').waitFor();assert.equal(await page.locator('.gmd-dataset-card').count(),0);await input.fill('');await page.locator('.gmd-dataset-card').first().waitFor();assert.equal(await page.locator('.gmd-dataset-card').count(),before);await page.locator('.gmd-dataset-card button').first().click();await page.waitForURL(/page=collection/)
})
await page.goto(`${base}?page=contact`);await page.locator('.gmd-contact-form').waitFor()
await check('pages/contact/native-invalid-success',async()=>{
const form=page.locator('.gmd-contact-form');await form.getByRole('button').click();assert.equal(await page.locator('.gmd-contact-success').count(),0);assert.equal(await form.evaluate(e=>e.checkValidity()),false);await form.locator('[name=name]').fill('Test User');await form.locator('[name=email]').fill('bad');await form.locator('[name=message]').fill('A sufficiently descriptive local test message.');assert.equal(await form.evaluate(e=>e.checkValidity()),false);await form.locator('[name=email]').fill('test@example.com');await form.getByRole('button').click();await page.locator('.gmd-contact-success').waitFor();await page.locator('.gmd-contact-success button').click();await form.waitFor()
})
await check('pages/header-keyboard-navigation',async()=>{await page.locator('.gmd-site-header nav a[href="?view=services"]').focus();await page.keyboard.press('Enter');await page.waitForURL(/page=services/);assert.equal(await page.locator('.gmd-site-header nav a[href="?view=services"]').getAttribute('aria-current'),'page')})
await check('pages/console',async()=>assert.deepEqual(errors,[]))
}finally{await browser.close();const report={timestamp:new Date().toISOString(),base,summary:{pass:results.filter(r=>r.status==='pass').length,fail:results.filter(r=>r.status==='fail').length},results,pageErrors:errors};await fs.writeFile('scripts/interaction-audit-pages-results.json',JSON.stringify(report,null,2)+'\n');console.log(report.summary);if(report.summary.fail)process.exitCode=1}

