const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '..');
const outDir = __dirname;
const width = 390;
const height = 844;
const inventory = require(path.join(root, 'evidence', 'inventory.json'));
const routes = [...new Set(inventory.public_site
  .filter((page) => page.capture_status === 'captured' || page.route === '/solutions/healthcare')
  .map((page) => page.route)
  .filter((route) => route.startsWith('/') && !route.includes('"')))];

function fileSlug(route) {
  if (route === '/') return 'home';
  return route.replace(/^\/+|\/+$/g, '').replace(/\//g, '--').replace(/[^a-zA-Z0-9-]/g, '-');
}

function pngSize(buffer) {
  if (buffer.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function collectPageData(page) {
  return page.evaluate(() => {
    const css = (element) => {
      if (!element) return null;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        text: (element.innerText || element.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 180),
        className: typeof element.className === 'string' ? element.className.slice(0, 180) : '',
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        borderRadius: style.borderRadius,
        padding: style.padding,
        margin: style.margin,
        width: Math.round(box.width * 100) / 100,
        height: Math.round(box.height * 100) / 100,
        x: Math.round(box.x * 100) / 100,
        y: Math.round(box.y * 100) / 100,
      };
    };
    const sample = (selector, limit = 24) => [...document.querySelectorAll(selector)].slice(0, limit).map(css);
    const visible = (element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return box.width > 0 && box.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const rootStyle = getComputedStyle(document.documentElement);
    const customProperties = {};
    for (let i = 0; i < rootStyle.length; i += 1) {
      const property = rootStyle[i];
      if (property.startsWith('--')) customProperties[property] = rootStyle.getPropertyValue(property).trim();
    }
    const navButton = document.querySelector('.navbar_menu-button.w-nav-button, .w-nav-button[role="button"], [aria-label*="menu" i]');
    const nav = document.querySelector('.new-menu-wrap.w-nav-menu, nav[role="navigation"]');
    return {
      page: { title: document.title, url: location.href, lang: document.documentElement.lang },
      viewport: {
        width: innerWidth,
        height: innerHeight,
        outerWidth,
        outerHeight,
        devicePixelRatio,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        bodyScrollWidth: document.body.scrollWidth,
      },
      rootCustomProperties: customProperties,
      body: css(document.body),
      typography: {
        h1: sample('h1', 8),
        h2: sample('h2', 16),
        h3: sample('h3', 16),
        paragraphs: sample('main p, main .text-size-regular, main .text-size-small', 18),
      },
      controls: {
        buttons: sample('button, [role="button"], input[type="submit"]', 32),
        links: sample('nav a, main a, footer a', 40),
        visibleNavButton: navButton ? { ...css(navButton), expanded: navButton.getAttribute('aria-expanded'), visible: visible(navButton) } : null,
        navigation: nav ? { ...css(nav), visible: visible(nav), expanded: nav.getAttribute('aria-expanded'), className: nav.className } : null,
      },
      sections: sample('main section, main header, main article, main .section, main > div', 36),
      media: [...document.querySelectorAll('main img, main video, main picture img')].slice(0, 80).map((element) => ({
        src: element.currentSrc || element.getAttribute('src') || '',
        alt: element.alt || '',
        loading: element.loading || '',
        ...css(element),
      })),
      fonts: {
        loadedFaces: [...document.fonts].map((font) => ({ family: font.family, style: font.style, weight: font.weight, status: font.status })),
        styleSheets: [...document.styleSheets].map((sheet) => sheet.href).filter(Boolean),
      },
    };
  });
}

async function scrollForLazyContent(page) {
  const pageHeight = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  const offsets = pageHeight > 32000
    ? [0, pageHeight * 0.2, pageHeight * 0.4, pageHeight * 0.6, pageHeight * 0.8, pageHeight]
    : Array.from({ length: Math.ceil(pageHeight / 700) }, (_, index) => index * 700);
  for (const y of offsets) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
}

async function captureLongPageTiles(page, base, pageHeight) {
  const viewportHeight = await page.evaluate(() => innerHeight);
  const maxTop = Math.max(0, pageHeight - viewportHeight);
  const offsets = [...new Set([0, 0.2, 0.4, 0.6, 0.8, 1].map((fraction) => Math.round(maxTop * fraction)))];
  const captures = [];
  for (let index = 0; index < offsets.length; index += 1) {
    await page.evaluate((top) => window.scrollTo(0, top), offsets[index]);
    await page.waitForTimeout(180);
    const file = `${base}.section-${String(index).padStart(2, '0')}.png`;
    await page.screenshot({ path: file, fullPage: false, animations: 'allow' });
    captures.push({ file: path.basename(file), scrollY: offsets[index], dimensions: pngSize(await fs.readFile(file)) });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return captures;
}

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width, height },
    screen: { width, height },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    colorScheme: 'light',
    locale: 'en-US',
    reducedMotion: 'no-preference',
  });
  const results = [];
  try {
    for (let index = 0; index < routes.length; index += 1) {
      const route = routes[index];
      const slug = fileSlug(route);
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      const pageErrors = [];
      const consoleErrors = [];
      const failedRequests = [];
      page.on('pageerror', (error) => pageErrors.push(String(error).slice(0, 400)));
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text().slice(0, 400)); });
      page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'failed' }));
      const result = { route, slug, requestedUrl: `https://www.tavus.io${route}`, status: null, finalUrl: null, title: null, captureStatus: 'pending', pageErrors, consoleErrors, failedRequests };
      const base = path.join(outDir, slug);
      try {
        const response = await page.goto(result.requestedUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        result.status = response?.status() ?? null;
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 5000))]));
        await page.waitForTimeout(350);
        result.finalUrl = page.url();
        result.title = await page.title();
        const initialViewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, dpr: devicePixelRatio, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight }));
        result.viewport = initialViewport;
        if (new URL(result.finalUrl).hostname !== 'www.tavus.io') {
          result.captureStatus = 'redirected_offsite';
          result.failure = `Public route redirected to ${result.finalUrl}`;
          results.push(result);
          console.log(`[${index + 1}/${routes.length}] ${route}: redirected to ${result.finalUrl}`);
          await page.close();
          continue;
        }
        await page.screenshot({ path: `${base}.viewport.png`, fullPage: false, animations: 'allow' });
        await scrollForLazyContent(page);
        const fullHeight = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
        result.fullPageHeight = fullHeight;
        if (fullHeight > 32000) {
          result.fullPageCoverage = 'six evenly spaced viewport captures';
          result.fullPageTiles = await captureLongPageTiles(page, base, fullHeight);
        } else {
          await page.screenshot({ path: `${base}.full.png`, fullPage: true, animations: 'allow', timeout: 60000 });
        }
        result.data = await collectPageData(page);
        const html = await page.locator('body').evaluate((element) => element.outerHTML);
        await fs.writeFile(`${base}.dom.html`, `<!doctype html>\n<html lang="${result.data.page.lang || 'en'}">\n<body>${html}</body>\n</html>`, 'utf8');
        await fs.writeFile(`${base}.styles.json`, JSON.stringify(result.data, null, 2), 'utf8');
        const viewBuffer = await fs.readFile(`${base}.viewport.png`);
        result.viewportScreenshot = pngSize(viewBuffer);
        if (fullHeight <= 32000) result.fullScreenshot = pngSize(await fs.readFile(`${base}.full.png`));
        result.captureStatus = result.status >= 200 && result.status < 400 ? 'captured' : 'http_error';
        if (result.viewportScreenshot?.width !== width || result.viewportScreenshot?.height !== height) {
          result.captureStatus = 'viewport_mismatch';
          result.failure = `Screenshot ${JSON.stringify(result.viewportScreenshot)} does not match ${width}×${height}.`;
        }
        if (index === 0) {
          const button = page.locator('.navbar_menu-button.w-nav-button, .w-nav-button[role="button"], [aria-label*="menu" i]').first();
          if (await button.count() && await button.isVisible()) {
            await button.click();
            await page.waitForTimeout(450);
            result.mobileNav = await page.evaluate(() => {
              const button = document.querySelector('.navbar_menu-button.w-nav-button, .w-nav-button[role="button"], [aria-label*="menu" i]');
              const nav = document.querySelector('.new-menu-wrap.w-nav-menu, nav[role="navigation"]');
              const rect = nav?.getBoundingClientRect();
              return {
                buttonClass: button?.className || '',
                expanded: button?.getAttribute('aria-expanded'),
                navClass: nav?.className || '',
                navVisible: !!nav && getComputedStyle(nav).display !== 'none' && getComputedStyle(nav).visibility !== 'hidden' && rect.height > 0,
                navText: nav?.innerText?.trim().slice(0, 1200) || '',
              };
            });
            await page.screenshot({ path: path.join(outDir, 'home-mobile-nav-open.png'), fullPage: false, animations: 'allow' });
            await fs.writeFile(path.join(outDir, 'home-mobile-nav-open.dom.html'), await page.locator('body').evaluate((element) => element.outerHTML), 'utf8');
            result.mobileNav.screenshot = 'home-mobile-nav-open.png';
          } else {
            result.mobileNav = { available: false, reason: 'No visible mobile nav button found.' };
          }
        }
      } catch (error) {
        result.captureStatus = 'failed';
        result.failure = String(error).slice(0, 1000);
      }
      results.push(result);
      console.log(`[${index + 1}/${routes.length}] ${route}: ${result.captureStatus} ${result.viewportScreenshot ? `${result.viewportScreenshot.width}x${result.viewportScreenshot.height}` : ''}`);
      await page.close().catch(() => {});
      await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify({
        source: 'https://www.tavus.io',
        captureDate: new Date().toISOString(),
        browser: 'Google Chrome via Playwright (fresh anonymous context)',
        viewport: { width, height, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
        routeCount: routes.length,
        completedCount: results.length,
        capturedCount: results.filter((item) => item.captureStatus === 'captured').length,
        failedCount: results.filter((item) => item.captureStatus === 'failed' || item.captureStatus === 'http_error' || item.captureStatus === 'viewport_mismatch' || item.captureStatus === 'redirected_offsite').length,
        routes: results,
      }, null, 2), 'utf8');
    }
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
