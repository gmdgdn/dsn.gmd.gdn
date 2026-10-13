/** Isolated local browser audit. No installed package or shared browser required.
 * Usage: node scripts/interaction-audit.mjs http://127.0.0.1:4177/catalog.html
 * PLAYWRIGHT_MODULE may point to an existing playwright/index.mjs.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import assert from 'node:assert/strict'
const bundled = 'C:/Users/khorm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE || bundled).href)
const url = process.argv[2] || 'http://127.0.0.1:4177/catalog.html'
assert.match(url, /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//, 'Audit accepts only a local consumer')
const source = await fs.readFile(new URL('../src/catalog/catalog-data.ts', import.meta.url), 'utf8')
const entries = [...source.matchAll(/id:\s*"([^"]+)"[^\n]*?en:\s*"([^"]+)"[^\n]*?ar:\s*"([^"]+)"/g)].map(m => ({id:m[1], en:m[2], ar:m[3]}))
const results = [], errors = []
const browser = await chromium.launch({ headless:true })
const page = await browser.newPage({ viewport:{width:1280,height:900}, reducedMotion:'reduce' })
page.on('pageerror', e => errors.push(e.message))
page.setDefaultTimeout(5000)
const example = () => page.locator('.gmd-catalog-example')
async function attribute(locator,name,value) {
  await page.waitForFunction(({name,value})=>document.querySelector('[data-audit-assert]')?.getAttribute(name)===value,await locator.evaluate((e,args)=>{e.dataset.auditAssert='true';return args},{name,value}))
  await locator.evaluate(e=>delete e.dataset.auditAssert)
}
async function check(name, run) {
  try { await run(); results.push({name,status:'pass'}) }
  catch(e) { results.push({name,status:'fail',error:e.message}); console.error(`FAIL ${name}: ${e.message.split('\n')[0]}`); await page.keyboard.press('Escape').catch(()=>{}) }
}
async function select(id) {
  const entry=entries.find(e=>e.id===id)
  const locale=await page.locator('.gmd-catalog').getAttribute('lang')
  await page.locator('.gmd-catalog-component-nav button').filter({hasText:locale==='ar'?entry.ar:entry.en}).evaluateAll((els, name) => {
    const el=els.find(e=>e.childNodes[0]?.textContent.trim()===name)
    if(!el) throw new Error(`Missing navigation ${name}`)
    el.click()
  }, locale==='ar'?entry.ar:entry.en)
  await page.locator('.gmd-catalog-id').waitFor({state:'attached'})
  assert.equal(await page.locator('.gmd-catalog-id').textContent(),`cmp-${id}`)
}
async function changedByKey(locator, attribute, key='Space') {
  const before=await locator.getAttribute(attribute)
  await locator.focus(); await page.keyboard.press(key)
  await page.waitForFunction(({selector,attribute,before})=>document.querySelector(selector)?.getAttribute(attribute)!==before,{selector:await locator.evaluate(e=>{e.dataset.auditTarget='true';return '[data-audit-target="true"]'}),attribute,before})
  await locator.evaluate(e=>delete e.dataset.auditTarget)
}
async function overlay(id,role='dialog') {
  await select(id)
  const trigger=id==='menubar'?example().locator('[data-slot=menubar-trigger]').first():example().getByRole('button').first()
  await trigger.focus(); await page.keyboard.press('Enter')
  const popup=page.getByRole(role).last(); await popup.waitFor()
  if((role==='dialog'||role==='alertdialog')&&id!=='popover') {
    assert.ok(await popup.getAttribute('aria-labelledby'),'Accessible overlay title')
    await page.keyboard.press('Tab')
    await page.waitForFunction(()=>document.querySelector('[role=dialog], [role=alertdialog]')?.contains(document.activeElement))
  }
  if(id==='popover') assert.ok(await popup.getAttribute('aria-label')||await popup.getAttribute('aria-labelledby'),'Accessible popover name')
  await page.keyboard.press('Escape'); await popup.waitFor({state:'hidden'})
  await trigger.evaluate(e=>e.dataset.auditFocus='true');await page.waitForFunction(()=>document.querySelector('[data-audit-focus]')===document.activeElement);await trigger.evaluate(e=>delete e.dataset.auditFocus)
}
try {
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await page.locator('.gmd-catalog').waitFor()
  for(const locale of (process.env.INTERACTION_ONLY?[]:['en','ar'])) {
    if(await page.locator('.gmd-catalog').getAttribute('lang')!==locale) await page.getByRole('button',{name:locale==='ar'?'العربية':'English',exact:true}).click()
    for(const theme of ['gmd','film','archive']) {
      await page.locator('.gmd-catalog-theme button').nth(['gmd','film','archive'].indexOf(theme)).click()
      for(const width of [1280,390]) {
        await page.setViewportSize({width,height:900})
        for(const entry of entries) await check(`render/${locale}/${theme}/${width}/${entry.id}`,async()=>{
          await select(entry.id)
          assert.ok(await example().isVisible(),'Visible sample')
          const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,dir:getComputedStyle(document.querySelector('.gmd-catalog')).direction}))
          if(geometry.scroll>geometry.width+1){const offenders=await page.evaluate(()=>[...document.querySelectorAll('*')].map(e=>({name:e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().replace(/\s+/g,'.'):''),left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)})).filter(x=>x.left< -1||x.right>innerWidth+1).slice(0,8));assert.fail(`Horizontal page overflow ${geometry.scroll}/${geometry.width}: ${JSON.stringify(offenders)}`)}
          assert.equal(geometry.dir,locale==='ar'?'rtl':'ltr')
        })
      }
    }
  }
  await page.setViewportSize({width:1280,height:900})
  if(await page.locator('.gmd-catalog').getAttribute('lang')!=='en') await page.getByRole('button',{name:'English',exact:true}).click()
  for(const id of ['dialog','sheet','drawer','popover']) await check(`keyboard/${id}/escape-focus`,()=>overlay(id))
  await check('keyboard/alert-dialog/escape-focus',()=>overlay('alert-dialog','alertdialog'))
  for(const id of ['dropdown-menu','menubar']) await check(`keyboard/${id}/open-escape-focus`,()=>overlay(id,'menu'))
  await check('keyboard/context-menu',async()=>{await select('context-menu');await example().locator('[data-slot=context-menu-trigger]').click({button:'right'});await page.getByRole('menu').waitFor();await page.keyboard.press('ArrowDown');await page.keyboard.press('Escape');await page.getByRole('menu').waitFor({state:'hidden'})})
  for(const [id,role,attr] of [['checkbox','checkbox','aria-checked'],['switch','switch','aria-checked'],['toggle','button','aria-pressed']]) await check(`keyboard/${id}/state`,async()=>{await select(id);await changedByKey(example().getByRole(role).first(),attr)})
  for(const id of ['accordion','collapsible']) await check(`keyboard/${id}/expanded`,async()=>{await select(id);await changedByKey(example().getByRole('button').first(),'aria-expanded','Enter')})
  await check('keyboard/tabs/arrows',async()=>{await select('tabs');const tab=example().getByRole('tab').first();await tab.focus();await page.keyboard.press('ArrowRight');await attribute(example().getByRole('tab').nth(1),'aria-selected','true')})
  await check('keyboard/radio-group/arrows',async()=>{await select('radio-group');const radio=example().getByRole('radio').first();await radio.focus();await page.keyboard.down('ArrowDown');try{await attribute(example().getByRole('radio').nth(1),'aria-checked','true')}finally{await page.keyboard.up('ArrowDown')}})
  await check('keyboard/toggle-group/selection',async()=>{await select('toggle-group');const target=example().getByRole('radio').count().then(n=>n?example().getByRole('radio').nth(1):example().getByRole('button').nth(1));const el=await target;await el.focus();await page.keyboard.press('Space');assert.ok(['true','on'].includes(await el.getAttribute('aria-checked')||await el.getAttribute('aria-pressed')||await el.getAttribute('data-state')))})
  await check('keyboard/select/selection',async()=>{await select('select');const trigger=example().getByRole('combobox');const before=await trigger.textContent();await trigger.focus();await page.keyboard.press('Space');await page.getByRole('listbox').waitFor();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert.notEqual(await trigger.textContent(),before)})
  await check('keyboard/combobox/filter-selection-empty',async()=>{await select('combobox');const input=example().getByRole('combobox');await input.fill('Oral');await page.getByRole('option',{name:'Oral histories'}).waitFor();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert.equal(await input.inputValue(),'Oral histories');await input.fill('zzzz-nothing');await page.getByText('No collections found',{exact:true}).waitFor();await page.keyboard.press('Escape')})
  await check('keyboard/command/empty',async()=>{await select('command');await example().getByRole('combobox').fill('zzzz-nothing');await example().getByText('No results.',{exact:true}).waitFor()})
  await check('keyboard/input-otp/digits-delete',async()=>{await select('input-otp');const input=example().locator('input');await input.fill('123456');assert.equal(await input.inputValue(),'123456');await input.press('Backspace');assert.equal(await input.inputValue(),'12345')})
  await check('form/invalid-recovery',async()=>{await select('form');const input=example().getByRole('textbox').nth(1);await input.fill('x');await input.press('Tab');assert.equal(await input.getAttribute('aria-invalid'),'true');const errorId=await input.getAttribute('aria-describedby');assert.ok(errorId);await page.locator(`[id="${errorId}"]`).waitFor();await input.fill('VALID-123');await example().getByRole('button').click();await attribute(input,'aria-invalid','false');await example().getByRole('button',{name:'Draft checked'}).waitFor()})
  await check('button/disabled',async()=>{await select('button');assert.ok(await example().getByRole('button',{name:'Unavailable'}).isDisabled())})
  await check('data-table/filter-sort',async()=>{await select('data-table');const input=example().getByRole('textbox');await input.fill('zzzz-nothing');await example().getByText('No matching records.',{exact:true}).waitFor();await input.fill('');const header=example().getByRole('columnheader').first();await header.getByRole('button').click();assert.equal(await header.getAttribute('aria-sort'),'ascending');await header.getByRole('button').press('Enter');assert.equal(await header.getAttribute('aria-sort'),'descending')})
  await check('calendar/keyboard-date',async()=>{await select('calendar');const day=example().locator('[data-slot=calendar] button[data-day]').first();await day.focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');assert.ok(await example().locator('button[data-selected-single=true]').count())})
  await check('date-picker/escape-focus-and-selection',async()=>{await select('date-picker');const trigger=example().getByRole('button');await trigger.focus();await page.keyboard.press('Enter');await page.locator('[data-slot=calendar]').last().waitFor();await page.keyboard.press('Escape');await page.locator('[data-slot=calendar]').last().waitFor({state:'hidden'});await trigger.evaluate(e=>e.dataset.auditFocus='true');await page.waitForFunction(()=>document.querySelector('[data-audit-focus]')===document.activeElement);await trigger.evaluate(e=>delete e.dataset.auditFocus);const before=await trigger.textContent();await trigger.click();await page.locator('[data-slot=calendar]').last().waitFor();await page.locator('[data-slot=calendar] button[data-day]').last().click();assert.notEqual(await trigger.textContent(),before,'Selecting a day updates the date');await page.locator('[data-slot=calendar]').last().waitFor();await page.keyboard.press('Escape');await page.locator('[data-slot=calendar]').last().waitFor({state:'hidden'});await trigger.evaluate(e=>e.dataset.auditFocus='true');await page.waitForFunction(()=>document.querySelector('[data-audit-focus]')===document.activeElement);await trigger.evaluate(e=>delete e.dataset.auditFocus)})
  await check('keyboard/dropdown-menu/checkbox-radio',async()=>{await select('dropdown-menu');const trigger=example().getByRole('button').first();await trigger.click();const pin=page.getByRole('menuitemcheckbox');const before=await pin.getAttribute('aria-checked');await pin.click();await trigger.click();assert.notEqual(await page.getByRole('menuitemcheckbox').getAttribute('aria-checked'),before);await page.getByRole('menuitemradio',{name:'Archive'}).click();await trigger.click();assert.equal(await page.getByRole('menuitemradio',{name:'Archive'}).getAttribute('aria-checked'),'true');await page.keyboard.press('Escape')})
  await check('keyboard/input-otp/paste',async()=>{await page.goto(url,{waitUntil:'domcontentloaded'});await page.locator('.gmd-catalog').waitFor();await select('input-otp');const input=example().locator('input');await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:new URL(url).origin});await input.focus();await page.evaluate(()=>navigator.clipboard.writeText('482731'));await page.keyboard.press('ControlOrMeta+V');assert.equal(await input.inputValue(),'482731')})
  await check('keyboard/resizable/arrows',async()=>{await select('resizable');const handle=example().getByRole('separator');const before=await handle.boundingBox();assert.ok(before);await handle.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(x=>Math.round(document.querySelector('[data-slot=resizable-handle]').getBoundingClientRect().x)!==x,Math.round(before.x))})
  await check('keyboard/questionnaire/required-back-retains-choice',async()=>{await select('questionnaire');await example().getByRole('button',{name:'Next'}).click();assert.ok(await example().getByText('What kind of collection is this?',{exact:true}).isVisible());const choice=example().locator('[data-slot=questionnaire-choice-input][value=film]');await choice.check();await example().getByRole('button',{name:'Next'}).click();await example().getByText('How are reuse rights recorded?',{exact:true}).waitFor();await example().getByRole('button',{name:'Previous'}).click();assert.ok(await choice.isChecked())})
  await check('keyboard/tooltip/focus-escape',async()=>{await select('tooltip');const trigger=example().getByRole('button');await trigger.focus();const tooltip=page.getByRole('tooltip');await tooltip.waitFor();assert.ok(await tooltip.isVisible());await page.keyboard.press('Escape');await tooltip.waitFor({state:'hidden'})})
  await check('slider/keyboard-value',async()=>{await select('slider');await changedByKey(example().getByRole('slider'),'aria-valuenow','ArrowRight')})
  await check('carousel/next-movement',async()=>{await select('carousel');const track=example().locator('[data-slot=carousel-content] > div');const before=await track.evaluate(e=>getComputedStyle(e).transform);await example().getByRole('button',{name:'Next slide'}).click();await page.waitForFunction(before=>getComputedStyle(document.querySelector('[data-slot=carousel-content] > div')).transform!==before,before)})
  await check('sidebar/desktop-toggle',async()=>{await select('sidebar');const wrapper=example().locator('[data-slot=sidebar]');const before=await wrapper.getAttribute('data-state');await example().getByRole('button',{name:'Toggle Sidebar'}).click();assert.notEqual(await wrapper.getAttribute('data-state'),before)})
  await check('chart/svg-and-legend',async()=>{await select('chart');assert.ok(await example().locator('svg.recharts-surface').isVisible());assert.ok(await example().locator('[data-slot=chart]').textContent())})
  await check('table/semantic-rows',async()=>{await select('table');assert.equal(await example().getByRole('row').count(),4);assert.equal(await example().getByRole('columnheader').count(),3)})
  await check('native-select/change',async()=>{await select('native-select');const input=example().getByRole('combobox');await input.selectOption('oral');assert.equal(await input.inputValue(),'oral')})
  for(const width of [1280,390]) for(const locale of ['en','ar']) await check(`state-board/${locale}/${width}`,async()=>{
    const stateURL=new URL(url);stateURL.searchParams.set('states','1')
    await page.setViewportSize({width,height:900});await page.goto(stateURL.href,{waitUntil:'domcontentloaded'});await page.locator('.gmd-state-board').waitFor()
    if(await page.locator('.gmd-state-board').getAttribute('lang')!==locale) await page.evaluate(()=>window.dispatchEvent(new CustomEvent('gmd:toggle-locale')));await page.waitForFunction(locale=>document.querySelector('.gmd-state-board')?.lang===locale,locale)
    assert.ok(await page.locator('.gmd-state-board input[aria-invalid=true]').isVisible())
    const invalid=page.locator('.gmd-state-board input[aria-invalid=true]');const description=await invalid.getAttribute('aria-describedby');assert.ok(description);await page.locator(`[id="${description}"]`).waitFor()
    assert.ok(await page.locator('.gmd-state-board input:disabled').isDisabled())
    assert.equal(await page.locator('.gmd-state-board [role=checkbox][aria-checked=mixed]').count(),1)
    const checkbox=page.locator('.gmd-state-board [role=checkbox]').first();await changedByKey(checkbox,'aria-checked')
    const slider=page.locator('.gmd-state-board [role=slider]');await changedByKey(slider,'aria-valuenow','ArrowRight')
    const track=page.locator('.gmd-state-board [data-slot=slider-track]');assert.ok((await track.boundingBox()).height>=3,'Slider track has visible thickness')
    const stateSwitch=page.locator('.gmd-state-board [role=switch]');await changedByKey(stateSwitch,'aria-checked');const thumb=stateSwitch.locator('[data-slot=switch-thumb]');await page.waitForFunction(({locale})=>{const e=document.querySelector('.gmd-state-board [data-slot=switch-thumb]');if(!e)return false;const x=new DOMMatrixReadOnly(getComputedStyle(e).transform).m41;return locale==='ar'?x< -5:x>5},{locale})
    const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));assert.ok(geometry.scroll<=geometry.width+1)
  })
  await check('console/no-page-errors',async()=>assert.deepEqual(errors,[]))
} finally {
  await browser.close()
  const output=path.resolve('scripts/interaction-audit-results.json')
  const report={timestamp:new Date().toISOString(),url,entryCount:entries.length,summary:{pass:results.filter(r=>r.status==='pass').length,fail:results.filter(r=>r.status==='fail').length},results,pageErrors:errors}
  await fs.writeFile(output,JSON.stringify(report,null,2)+'\n')
  console.log(JSON.stringify(report.summary),output)
  if(report.summary.fail)process.exitCode=1
}

