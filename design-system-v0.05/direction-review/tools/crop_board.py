"""Capture named sections of the direction board at 1440 and the hero at 390."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "previews"
HTML = ROOT / "index.html"


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        await page.goto(HTML.resolve().as_uri())
        await page.wait_for_timeout(600)
        for sel, name in (("#top", "hero"), ("#sources", "sources"), ("#geometry", "geometry"), ("#directions", "directions")):
            el = page.locator(sel)
            await el.scroll_into_view_if_needed()
            await el.screenshot(path=str(OUT / f"{name}-1440.png"))
        mob = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        await mob.goto(HTML.resolve().as_uri())
        await mob.wait_for_timeout(600)
        await mob.locator("#top").screenshot(path=str(OUT / "hero-390.png"))
        await mob.locator("#directions").screenshot(path=str(OUT / "directions-390.png"))
        overflow = await mob.evaluate(
            """() => {
              const w = document.documentElement.scrollWidth;
              const bad = [...document.querySelectorAll('*')].filter(el => el.scrollWidth > innerWidth + 8)
                .slice(0, 8).map(el => ({t: el.tagName, c: (el.className||'').toString().slice(0,40), w: el.scrollWidth}));
              return {w, bad};
            }"""
        )
        print(overflow)
        await b.close()


asyncio.run(main())
