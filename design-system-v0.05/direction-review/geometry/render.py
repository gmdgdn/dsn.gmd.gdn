"""Render the direction-review geometry assets as editable SVG (one layer per construction step)."""
import math
from pathlib import Path

from shapely.geometry import LineString, Polygon, box
from shapely.ops import unary_union

import gmdgeo as g

OUT = Path(__file__).resolve().parent.parent / "assets"
OUT.mkdir(exist_ok=True)

INK, PAPER, WARM, NILE, PINK, SAND = "#140206", "#F7F4EF", "#EAE5DE", "#1034A6", "#FF6183", "#D5C4A8"
SCAFFOLD = "#C9573F"     # construction red: annotation only, not a brand colour


def svg(w, h, body, title, desc, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {g.f(w)} {g.f(h)}" width="{g.f(w)}" height="{g.f(h)}">'
            f"<title>{title}</title><desc>{desc}</desc>{rect}{body}</svg>")


def scale_tiles(tiles, k, off=(0, 0)):
    return [g.Tile(t.kind, [(x * k + off[0], y * k + off[1]) for x, y in t.pts]) for t in tiles]


def tiles_layer(tiles, stroke, w, fill="none", dash=None, kinds_fill=None):
    out = []
    for t in tiles:
        fl = (kinds_fill or {}).get(t.kind, fill)
        da = f' stroke-dasharray="{dash}"' if dash else ""
        out.append(f'<path d="{g.path_d(t.pts)}" fill="{fl}" stroke="{stroke}" stroke-width="{w}"{da}/>')
    return "".join(out)


def seg_layer(segs, stroke, w, window=None):
    ls = unary_union([LineString(s) for s in segs])
    if window is not None:
        ls = ls.intersection(window)
    d = []
    for gm in getattr(ls, "geoms", [ls]):
        if gm.geom_type == "LineString" and not gm.is_empty:
            d.append(g.path_d(list(gm.coords), close=False))
    return f'<path d="{" ".join(d)}" fill="none" stroke="{stroke}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="miter"/>'


def star_outline(tile, theta):
    """Closed motif outline M0 X0 M1 X1 ... for regular tiles (adjacent pairing)."""
    rays = g.tile_rays(tile.pts, theta)
    n = len(tile.pts)
    pts = []
    for i in range(n):
        R, L = rays[2 * i], rays[2 * ((i + 1) % n) + 1]
        hit = g.intersect(R, L)
        pts += [R.origin, hit[0]]
    return pts


def field(tiling, theta, w, h, pitch, interlace=False, band=None, gap=None, star_fill=None,
          bg=None, line=NILE, scaffold=False, show_lines=True, edge_w=1.2, kinds_fill=None, origin=(0, 0),
          overrides=None):
    k = pitch / g.length(tiling.t1)
    T = g.Tiling(tiling.name, scale_tiles(tiling.tiles, k, origin), g.mul(tiling.t1, k), g.mul(tiling.t2, k))
    win = box(0, 0, w, h)
    tiles = T.cover(-pitch, -pitch, w + pitch, h + pitch)
    segs, _ = g.pattern(tiles, theta, overrides=overrides)
    body = [f'<rect width="{w}" height="{h}" fill="{bg}"/>'] if bg else []
    if kinds_fill:
        body.append(tiles_layer(tiles, "none", 0, kinds_fill=kinds_fill))
    if star_fill:
        for t in tiles:
            if t.kind in star_fill:
                body.append(f'<path d="{g.path_d(star_outline(t, theta))}" fill="{star_fill[t.kind]}"/>')
    if scaffold:
        body.append(tiles_layer(tiles, SCAFFOLD, 0.8, dash="3 3"))
    if interlace:
        nodes, adj = g.planar_graph(segs)
        st = g.strands(nodes, adj, g.terminals(segs))
        state, conflicts = g.interlace(nodes, adj, st)
        assert conflicts == 0, conflicts
        body.append(g.interlaced_svg(nodes, adj, st, state, band, gap, win, PAPER, INK, edge_w))
    elif band:
        nodes, adj = g.planar_graph(segs)
        st = g.strands(nodes, adj, g.terminals(segs))
        b = g.bands(st, nodes, band, win)
        body.append(f'<path d="{g.poly_svg(b)}" fill="{line}"/>')
    elif show_lines:
        body.append(seg_layer(segs, line, edge_w, win))
    return "".join(body)


# ------------------------------------------------------------------ 1. Fig.123 family plate
def plate_488():
    T = g.tiling_488(1)
    cols = [("ACUTE", 67.5, 45, {"oct": {"skip": 2}}), ("MEDIAN", 45, 90, None), ("OBTUSE", 22.5, 135, None)]
    W, H, pitch = 1200, 760, 150
    body = []
    for c, (nm, th, al, ov) in enumerate(cols):
        x0 = 30 + c * 390
        # row 1: scaffold + rays from one octagon and one square
        k = pitch
        tiles = scale_tiles(T.patch(range(0, 2), range(0, 2)), k, (x0 + 30, 70))
        win = box(x0, 50, x0 + 360, 380)
        body.append(f'<g clip-path="url(#c{c})">')
        body.append(tiles_layer(tiles, SCAFFOLD, 1, dash="4 3"))
        segs, _ = g.pattern(tiles, th, overrides=ov)
        body.append(seg_layer(segs, NILE, 2.2))
        for t in tiles:
            for r in g.tile_rays(t.pts, th)[::2]:
                body.append(f'<circle cx="{g.f(r.origin[0])}" cy="{g.f(r.origin[1])}" r="2.6" fill="{INK}"/>')
        body.append("</g>")
        body.append(f'<clipPath id="c{c}"><rect x="{x0}" y="50" width="360" height="330"/></clipPath>')
        body.append(f'<rect x="{x0}" y="50" width="360" height="330" fill="none" stroke="{INK}"/>')
        # row 2: finished interlaced repeat
        body.append(f'<g transform="translate({x0},400)"><clipPath id="d{c}"><rect width="360" height="300"/></clipPath>'
                    f'<g clip-path="url(#d{c})">{field(T, th, 360, 300, 90, interlace=True, band=7, gap=1.6, star_fill={"oct": SAND, "sq": PINK}, kinds_fill={"oct": PAPER, "sq": PAPER}, overrides=ov)}</g>'
                    f'<rect width="360" height="300" fill="none" stroke="{INK}"/></g>')
        body.append(f'<text x="{x0}" y="36" font-family="monospace" font-size="13" fill="{INK}">{nm} · α {al}° (Bonner) · θ {th}° (Kaplan)</text>')
    body.append(f'<text x="30" y="728" font-family="monospace" font-size="12" fill="{INK}">After Bonner Fig.123, left column (printed p.255 / PDF 277), 4.8² tessellation. Red dashes = generative tessellation; dots = contact points.</text>'
                f'<text x="30" y="746" font-family="monospace" font-size="12" fill="{INK}">2θ + α = 180° (Kaplan, p.550). Acute octagon uses full {{8/3}} chords as drawn by Bonner; obtuse octagon degenerates to the midpoint octagon, also as drawn.</text>')
    return svg(W, H, "".join(body), "4.8.8 octagon-square: acute / median / obtuse", "GMD reconstruction; seam-validated", PAPER)


# ------------------------------------------------------------------ 2. 12/8 compound field
OV128 = {"dodec": {"skip": 1}, "oct": {"skip": 2}}


def plate_12_8():
    T = g.tiling_12_8(1)
    W, H = 1200, 620
    body = [f'<g transform="translate(30,50)"><clipPath id="L"><rect width="560" height="530"/></clipPath><g clip-path="url(#L)">'
            f'{field(T, 67.5, 560, 530, 260, scaffold=True, edge_w=1.6, bg=PAPER, kinds_fill={"dodec": "#E3E9F7", "oct": "#F1E7D6", "chex": PAPER}, origin=(0, 0), overrides=OV128)}</g>'
            f'<rect width="560" height="530" fill="none" stroke="{INK}"/></g>',
            f'<g transform="translate(610,50)"><clipPath id="R"><rect width="560" height="530"/></clipPath><g clip-path="url(#R)">'
            f'{field(T, 67.5, 560, 530, 200, overrides=OV128, interlace=True, band=7, gap=1.6, star_fill={"dodec": SAND, "oct": PINK}, bg=NILE, edge_w=1.1)}</g>'
            f'<rect width="560" height="530" fill="none" stroke="{INK}"/></g>',
            f'<text x="30" y="36" font-family="monospace" font-size="13" fill="{INK}">SCAFFOLD · 12-gon / 8-gon / concave hexagon (p.439 / PDF 461)</text>',
            f'<text x="610" y="36" font-family="monospace" font-size="13" fill="{INK}">ACUTE · θ 67.5° · interlaced, alternating crossings</text>',
            f'<text x="30" y="604" font-family="monospace" font-size="12" fill="{INK}">Compare Fig.379a/d (printed p.444 / PDF 466). 12-star lines extended one crossing, 8-star as full chords: provisional match, verify in Stage 2.</text>']
    return svg(W, H, "".join(body), "12/8 compound orthogonal field", "GMD reconstruction from the edge-to-edge tessellation", PAPER)


# ------------------------------------------------------------------ 3. radial fivefold
def radial(size=560, theta=54, band=None, show_scaffold=True, fills=True):
    tiles = g.radial_fivefold(1)
    k = size / 7.0
    c = size / 2
    tiles = scale_tiles(tiles, k, (c, c))
    segs, _ = g.pattern(tiles, theta, open_edges=g.rim_edges(tiles))
    body = []
    if fills:
        body.append(tiles_layer(tiles, "none", 0, kinds_fill={"dec": "#E3E9F7", "pent": "#F1E7D6", "rh": WARM}))
        for t in tiles:
            if t.kind == "dec":
                body.append(f'<path d="{g.path_d(star_outline(t, theta))}" fill="{NILE}"/>')
            if t.kind == "pent":
                body.append(f'<path d="{g.path_d(star_outline(t, theta))}" fill="{PINK}"/>')
    if show_scaffold:
        body.append(tiles_layer(tiles, SCAFFOLD, .9, dash="3 3"))
    if band:
        nodes, adj = g.planar_graph(segs)
        st = g.strands(nodes, adj, g.terminals(segs))
        body.append(f'<path d="{g.poly_svg(g.bands(st, nodes, band))}" fill="{INK}"/>')
    else:
        body.append(seg_layer(segs, INK, 1.8))
    return "".join(body), tiles


# ------------------------------------------------------------------ 4. dual-level after Fig.448
def tiling_hex(edge, rot_deg=0.0):
    t1 = g.rot((math.sqrt(3) * edge, 0), math.radians(rot_deg))
    t2 = g.rot(t1, math.pi / 3)
    return g.Tiling("6.6.6", [g.Tile("hex", g.ccw(g.regular(6, edge, (0, 0), rot_deg)))], t1, t2)


def dual_level(w, h, E=150.0, band_k=0.22, primary=PAPER, secondary=INK, bg=SAND, under=INK):
    """Primary 6-star median pattern on hexagons (edge E) drawn as a narrow band over the
    secondary: the identical pattern at scale 1:2*sqrt(3), turned 90 degrees (= 30 modulo the
    60-degree symmetry). Parameters from Fig.448 (p.498); presentation follows Fig.448c."""
    win = box(0, 0, w, h)
    P = tiling_hex(E, 0)
    Pt = P.cover(-E, -E, w + E, h + E)
    pseg, _ = g.pattern(Pt, 60)
    e2 = E / 2 / math.sqrt(3)            # secondary edge: lattice pitch / (2*sqrt(3))
    S = tiling_hex(e2, 90)
    St = S.cover(-E, -E, w + E, h + E, margin=0)
    sseg, _ = g.pattern(St, 60)
    nodes, adj = g.planar_graph(pseg)
    st = g.strands(nodes, adj, g.terminals(pseg))
    width = math.sqrt(3) * e2 * band_k
    prim = g.bands(st, nodes, width, win)
    sec_lines = unary_union([LineString(s) for s in sseg]).intersection(win)
    inside = sec_lines.intersection(prim)
    outside = sec_lines.difference(prim)

    def lines_d(geom):
        return " ".join(g.path_d(list(x.coords), False) for x in getattr(geom, "geoms", [geom]) if x.geom_type == "LineString")
    return (f'<rect width="{w}" height="{h}" fill="{bg}"/>'
            f'<path d="{lines_d(outside)}" fill="none" stroke="{under}" stroke-width=".9"/>'
            f'<path d="{g.poly_svg(prim)}" fill="{primary}" stroke="{under}" stroke-width=".6"/>')


def main():
    (OUT / "plate-488-families.svg").write_text(plate_488(), encoding="utf8")
    (OUT / "plate-12-8-compound.svg").write_text(plate_12_8(), encoding="utf8")
    b, _ = radial(560, 54)
    (OUT / "radial-fivefold-median.svg").write_text(svg(560, 560, b, "Radial fivefold module assembly, median", "decagon + 10 pentagons + 10 thin rhombi; GMD construction", PAPER), encoding="utf8")
    (OUT / "dual-level-448.svg").write_text(svg(900, 560, dual_level(900, 560), "Dual-level study after Fig.448", "parameters from Bonner p.498; secondary registration under review"), encoding="utf8")
    (OUT / "field-4612-median.svg").write_text(svg(900, 560, field(g.tiling_4612(1), 60, 900, 560, 260, interlace=True, band=6, gap=1.4,
               star_fill={"dodec": NILE, "hex": SAND, "sq": PINK}), "4.6.12 median field", "12-, 6- and 4-point motifs on one tessellation", PAPER), encoding="utf8")
    print("wrote", sorted(p.name for p in OUT.glob("*.svg")))


if __name__ == "__main__":
    main()

