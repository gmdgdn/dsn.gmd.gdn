import { chromium } from 'file:///C:/Users/khorm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const url = 'http://127.0.0.1:8766/design-system-v0.05/system/gmd-ui/registry-dist/catalog/?study=pal-maker'
const out = new URL('.', import.meta.url)
const report = { url, runs: [], errors: [] }
const browser = await chromium.launch({ headless: true })

async function run(name, options, arabic = false) {
  const context = await browser.newContext(options)
  const page = await context.newPage()
  const failures = []
  page.on('pageerror', error => failures.push(error.message))
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`) })
  await page.goto(url, { waitUntil: 'networkidle' })
  if (arabic) await page.getByRole('button', { name: 'العربية' }).click()
  const initial = await page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent,
    lang: document.querySelector('.gmd-pal-study')?.getAttribute('lang'),
    dir: document.querySelector('.gmd-pal-study')?.getAttribute('dir'),
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    displayFont: getComputedStyle(document.querySelector('h1')).fontFamily,
    displaySize: getComputedStyle(document.querySelector('h1')).fontSize,
    proseFont: getComputedStyle(document.querySelector('.gmd-pal-study__lead')).fontFamily,
    badImages: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src),
  }))
  const triggers = page.getByRole('tab')
  const count = await triggers.count()
  const clicks = []
  for (let i = 0; i < count; i++) {
    const trigger = triggers.nth(i)
    await trigger.click()
    clicks.push({ name: await trigger.innerText(), selected: await trigger.getAttribute('aria-selected'), panel: await page.getByRole('tabpanel').count(), image: await page.getByRole('tabpanel').locator('img').first().getAttribute('src') })
  }
  await triggers.nth(0).focus()
  await page.keyboard.press('End'); await page.waitForTimeout(120)
  const end = await triggers.nth(count - 1).getAttribute('aria-selected')
  await page.keyboard.press('Home'); await page.waitForTimeout(120)
  const home = await triggers.nth(0).getAttribute('aria-selected')
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(120)
  const down = await triggers.nth(1).getAttribute('aria-selected')
  const motion = await page.evaluate(() => ({ trigger: getComputedStyle(document.querySelector('.gmd-pal-explorer__trigger')).transitionDuration, image: getComputedStyle(document.querySelector('.gmd-pal-media__image img')).animationDuration }))
  await page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, out)), fullPage: true })
  report.runs.push({ name, initial, count, clicks, keyboard: { end, home, down }, motion, failures })
  await context.close()
}

try {
  await run('desktop-en', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  await run('mobile-en', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  await run('desktop-ar', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, true)
  await run('mobile-ar', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 }, true)
  await run('reduced-motion', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
} catch (error) {
  report.errors.push(String(error.stack || error))
} finally {
  await browser.close()
  await fs.writeFile(new URL('qa.json', out), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
}

