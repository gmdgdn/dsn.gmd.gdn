"""Rasterize SVG assets or HTML boards with Chromium.
python shoot.py svg assets/*.svg            -> PNG beside each SVG
python shoot.py html page.html out.png W [H] [--full]"""
import asyncio
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright


async def svgs(files):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for f in files:
            f = Path(f).resolve()
            head = f.read_text(encoding="utf8")[:400]
            w, h = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', head).groups())
            pg = await b.new_page(viewport={"width": int(w), "height": int(h)}, device_scale_factor=2)
            await pg.goto(f.as_uri())
            await pg.wait_for_timeout(300)
            await pg.screenshot(path=str(f.with_suffix(".png")), timeout=120000, animations="disabled", caret="initial")
            await pg.close()
            print(f.with_suffix(".png").name)
        await b.close()


async def html(src, out, w, h, full):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        await pg.goto(Path(src).resolve().as_uri())
        await pg.wait_for_timeout(800)
        await pg.screenshot(path=out, full_page=full, timeout=120000)
        overflow = await pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
        print(out, "horizontal overflow px:", overflow)
        await b.close()


if __name__ == "__main__":
    if sys.argv[1] == "svg":
        asyncio.run(svgs(sys.argv[2:]))
    else:
        a = sys.argv[2:]
        asyncio.run(html(a[0], a[1], int(a[2]), int(a[3]) if len(a) > 3 and a[3].isdigit() else 900, "--full" in a))
