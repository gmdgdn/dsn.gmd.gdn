#!/usr/bin/env python3
"""Validate curated integration SVGs and build tokens.css from tokens.json.

This script is intentionally local and deterministic. It does not run or import
any of the Antigravity geometry generators.
"""
from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NAMED_XML_ENTITIES = {"bull": "•"}
TOKEN_COLORS = {
    "#140206": ("ink", "var(--ink, #140206)"),
    "#F7F4EF": ("paper", "var(--paper, #F7F4EF)"),
    "#EAE5DE": ("warm", "var(--warm, #EAE5DE)"),
    "#1034A6": ("nile", "var(--nile, #1034A6)"),
    "#FF6183": ("pink", "var(--pink, #FF6183)"),
    "#D5C4A8": ("sand", "var(--sand, #D5C4A8)"),
}


def build_css(data: dict) -> str:
    colors = data["color"]
    semantic = data["semantic"]
    lines = ["/* Generated from tokens.json by scripts/build_assets.py. */", "@font-face { font-family: 'PerfectlyNineties'; src: url('./assets/fonts/PerfectlyNineties-Regular.woff') format('woff'); font-display: swap; }"]
    lines += [
        "@font-face { font-family: 'SuisseIntl'; src: url('./assets/fonts/SuisseIntl-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }",
        "@font-face { font-family: 'SuisseIntl'; src: url('./assets/fonts/SuisseIntl-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }",
        "@font-face { font-family: 'FKRaster'; src: url('./assets/fonts/FKRasterGroteskCompact.woff2') format('woff2'); font-display: swap; }",
        "@font-face { font-family: 'NotoNaskhArabic'; src: url('./assets/fonts/NotoNaskhArabic-Regular.ttf') format('truetype'); font-display: swap; }",
        "@font-face { font-family: 'NotoNaskhArabic'; src: url('./assets/fonts/NotoNaskhArabic-Bold.ttf') format('truetype'); font-weight: 700; font-display: swap; }",
        "@font-face { font-family: 'NotoSansArabic'; src: url('./assets/fonts/NotoSansArabic-Regular.ttf') format('truetype'); font-display: swap; }",
        ":root {",
    ]
    lines.extend(f"  --{name}: {value};" for name, value in colors.items())
    for role, token in semantic.items():
        lines.append(f"  --{role}: var(--{token});")
    lines.extend([
        "  --font-display: 'PerfectlyNineties', Georgia, serif;",
        "  --font-body: 'SuisseIntl', Arial, sans-serif;",
        "  --font-label: 'FKRaster', 'SuisseIntl', sans-serif;",
        "  --font-ar-display: 'NotoNaskhArabic', serif;",
        "  --font-ar-body: 'NotoSansArabic', 'NotoNaskhArabic', sans-serif;",
        "  --shadow: 5px 5px 0 var(--ink);",
        "  --shadow-hover: 3px 3px 0 var(--ink);",
        f"  --radius: {data['shape']['radiusPx']}px; --workspace-radius: {data['shape'].get('workspaceRadiusPx', 2)}px; --border-width: {data['shape']['borderPx']}px;",
        "  --focus-ring: 0 0 0 2px var(--paper), 0 0 0 4px var(--focus);",
        "  --depth-default: 5px 5px 0 var(--ink); --depth-hover: 3px 3px 0 var(--ink); --depth-pressed: 0 0 0 var(--ink);",
        "  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;",
        "}", "",
    ])
    return "\n".join(lines)


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    token_path = root / "tokens.json"
    data = json.loads(token_path.read_text(encoding="utf-8"))
    css_path = root / "tokens.css"
    css_path.write_text(build_css(data), encoding="utf-8", newline="\n")

    svg_paths = sorted((root / "assets").rglob("*.svg"))
    failures: list[str] = []
    for path in svg_paths:
        raw = path.read_text(encoding="utf-8")
        raw = re.sub(r"&([A-Za-z][A-Za-z0-9]+);", lambda m: NAMED_XML_ENTITIES.get(m.group(1), m.group(0)), raw)
        for color, (role, token) in TOKEN_COLORS.items():
            # Existing fallbacks are stable across repeated builds.
            raw = re.sub(rf"(?<!var\(--{role}, ){re.escape(color)}", lambda _: token, raw)
        # SVGs loaded through <img> need the SVG namespace on their root.
        raw = re.sub(r"<svg(\s|>)", r'<svg xmlns="http://www.w3.org/2000/svg"\1', raw, count=1) if not re.search(r"<svg\s+[^>]*xmlns=", raw) else raw
        path.write_text(raw, encoding="utf-8", newline="\n")
        try:
            ET.fromstring(raw)
        except ET.ParseError as exc:
            failures.append(f"{path.relative_to(root)}: {exc}")
    print(f"Generated {css_path.name}; parsed {len(svg_paths)} curated SVG files.")
    if failures:
        print("SVG parse failures:", file=sys.stderr)
        print("\n".join(failures), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
