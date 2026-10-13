"""GMD v0.05 parametric construction engine.

Polygons-in-contact construction (Bonner ch.3; Kaplan ch.4, pp.549-568):
  tiling (translational unit + two vectors) -> rays at contact angle theta from edge
  midpoints -> paired intersections -> motif segments -> planar strands -> bands /
  interlace / filled faces.

Angle conventions: Kaplan's contact angle theta is measured from the tile edge; Bonner's
angular opening alpha is the angle between the two rays. 2*theta + alpha = 180 (p.550).
"""
from __future__ import annotations

import math
from collections import defaultdict
from dataclasses import dataclass, field

from shapely.geometry import LineString, MultiLineString, Point, Polygon, box
from shapely.ops import polygonize, unary_union

EPS = 1e-7


# ---------------------------------------------------------------- vectors
def add(a, b): return (a[0] + b[0], a[1] + b[1])
def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def mul(a, k): return (a[0] * k, a[1] * k)
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def cross(a, b): return a[0] * b[1] - a[1] * b[0]
def length(a): return math.hypot(*a)
def unit(a):
    l = length(a)
    return (a[0] / l, a[1] / l)
def rot(a, t): return (a[0] * math.cos(t) - a[1] * math.sin(t), a[0] * math.sin(t) + a[1] * math.cos(t))
def lerp(a, b, t): return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)


def regular(n, edge, center=(0.0, 0.0), normal_deg=0.0):
    """Regular n-gon with given edge length; one edge's outward normal points at normal_deg."""
    R = edge / (2 * math.sin(math.pi / n))
    start = math.radians(normal_deg) - math.pi / n
    return [(center[0] + R * math.cos(start + 2 * math.pi * k / n),
             center[1] + R * math.sin(start + 2 * math.pi * k / n)) for k in range(n)]


def inradius(n, edge): return edge / (2 * math.tan(math.pi / n))


def signed_area(pts):
    return 0.5 * sum(cross(pts[i], pts[(i + 1) % len(pts)]) for i in range(len(pts)))


def ccw(pts): return pts if signed_area(pts) > 0 else pts[::-1]


# ---------------------------------------------------------------- tilings
@dataclass
class Tile:
    kind: str
    pts: list

    def moved(self, d): return Tile(self.kind, [add(p, d) for p in self.pts])


@dataclass
class Tiling:
    name: str
    tiles: list            # tiles of one translational unit
    t1: tuple
    t2: tuple
    source: str = ""

    def patch(self, i_range, j_range):
        out = []
        for i in i_range:
            for j in j_range:
                d = add(mul(self.t1, i), mul(self.t2, j))
                out += [t.moved(d) for t in self.tiles]
        return out

    def cover(self, x0, y0, x1, y1, margin=1):
        """All translated tiles whose bbox meets the rectangle."""
        # solve lattice range generously from the rectangle corners
        M = (self.t1, self.t2)
        det = cross(M[0], M[1])
        ij = []
        for x, y in ((x0, y0), (x1, y0), (x0, y1), (x1, y1)):
            i = cross((x, y), M[1]) / det
            j = cross(M[0], (x, y)) / det
            ij.append((i, j))
        i_lo = math.floor(min(a for a, _ in ij)) - margin - 1
        i_hi = math.ceil(max(a for a, _ in ij)) + margin + 1
        j_lo = math.floor(min(b for _, b in ij)) - margin - 1
        j_hi = math.ceil(max(b for _, b in ij)) + margin + 1
        win = box(x0, y0, x1, y1)
        return [t for t in self.patch(range(i_lo, i_hi + 1), range(j_lo, j_hi + 1))
                if Polygon(t.pts).intersects(win)]


def tiling_488(s=1.0):
    """4.8.8 octagon-and-square (Bonner Fig.123, p.255). s = square repeat pitch."""
    a = s / (1 + math.sqrt(2))
    oct_ = Tile("oct", ccw(regular(8, a, (s / 2, s / 2), 0)))
    sq = Tile("sq", ccw(regular(4, a, (0, 0), 45)))
    return Tiling("4.8.8 octagon-square", [oct_, sq], (s, 0), (0, s), "Bonner Fig.123 p.255 / PDF 277")


def tiling_4612(a=1.0):
    """4.6.12 (Bonner Fig.89, p.227): dodecagons on a triangular lattice, squares + hexagons."""
    d = a * (3 + math.sqrt(3))
    t1, t2 = (d, 0), (d / 2, d * math.sqrt(3) / 2)
    tiles = [Tile("dodec", ccw(regular(12, a, (0, 0), 0)))]
    for ang, c in ((0, mul(t1, .5)), (60, mul(t2, .5)), (120, mul(sub(t2, t1), .5))):
        tiles.append(Tile("sq", ccw(regular(4, a, c, ang))))
    # hexagons at the centroids of the two lattice triangles (0, t1, t2) and (0, t2, t2 - t1)
    for c in (mul(add(t1, t2), 1 / 3), add(mul(t2, 2 / 3), mul(t1, -1 / 3))):
        tiles.append(Tile("hex", ccw(regular(6, a, c, 30))))
    return Tiling("4.6.12 dodecagon-hexagon-square", tiles, t1, t2, "Bonner Fig.89 p.227 / PDF 249")


def tiling_12_8(a=1.0):
    """Edge-to-edge dodecagons (square-grid vertices) and octagons (cell centres) with concave
    hexagon interstices: the second tessellation Bonner gives for the 12/8 orthogonal field
    (p.439 / PDF 461; Figs.379-382, pp.444-446)."""
    r12, r8 = inradius(12, a), inradius(8, a)
    s = (r12 + r8) * math.sqrt(2)
    D = Tile("dodec", ccw(regular(12, a, (0, 0), 15)))
    O = Tile("oct", ccw(regular(8, a, (s / 2, s / 2), 45)))
    R12 = a / (2 * math.sin(math.pi / 12))

    def pv(c, deg):
        return (c[0] + R12 * math.cos(math.radians(deg)), c[1] + R12 * math.sin(math.radians(deg)))

    # concave hexagon on each cell edge: reflex vertices are the facing dodecagon vertices,
    # the four 75-degree vertices are dodecagon/octagon junctions.
    hx = [pv((0, 0), -30), pv((s, 0), 210), pv((s, 0), 180), pv((s, 0), 150), pv((0, 0), 30), pv((0, 0), 0)]
    hy = [(-y, x) for x, y in hx]          # quarter turn about the shared dodecagon centre
    return Tiling("12/8 edge-to-edge dodecagon-octagon", [D, O, Tile("chex", ccw(hx)), Tile("chex", ccw(hy))],
                  (s, 0), (0, s), "Bonner p.439 / PDF 461, Figs.379-382 pp.444-446")


def radial_fivefold(a=1.0):
    """Radial assembly of fivefold-system modules (Bonner Fig.187 module set, p.299):
    central decagon, ring of 10 pentagons, ring of 10 thin rhombi (36/144). GMD construction."""
    D = ccw(regular(10, a, (0, 0), 18))           # vertex at 0deg
    tiles = [Tile("dec", D)]
    r10 = inradius(10, a)
    for k in range(10):
        ang = 18 + 36 * k
        tiles.append(Tile("pent", ccw(regular(5, a, mul((math.cos(math.radians(ang)), math.sin(math.radians(ang))), r10 + inradius(5, a)), ang + 180))))
    R10 = a / (2 * math.sin(math.pi / 10))
    for k in range(10):
        ang = math.radians(36 * k)
        V = mul((math.cos(ang), math.sin(ang)), R10 + a)      # outer shared vertex of two pentagons
        # rhombus: obtuse 144 at V, sides along both pentagons' outer edges
        Pa = _find_vertex(tiles, V, ang, +1, a)
        Pb = _find_vertex(tiles, V, ang, -1, a)
        tip = add(Pa, sub(Pb, V))
        tiles.append(Tile("rh", ccw([V, Pa, tip, Pb])))
    return tiles


def _find_vertex(tiles, V, ang, side, a):
    best = None
    for t in tiles:
        if t.kind != "pent":
            continue
        for p in t.pts:
            d = sub(p, V)
            if abs(length(d) - a) < 1e-6:
                # outer edge: direction roughly outward, on the requested side of the radial line
                rad = (math.cos(ang), math.sin(ang))
                if dot(unit(d), rad) > 0.2 and cross(rad, d) * side > 0:
                    best = p
    return best


# ---------------------------------------------------------------- motif construction
@dataclass
class Ray:
    origin: tuple
    d: tuple
    edge: int
    side: str     # 'R' heads toward pts[i+1], 'L' toward pts[i]


def tile_rays(pts, theta_deg, delta=0.0):
    """Two rays per edge, from the midpoint (delta=0) or from two contact points at
    +/- delta * edge length (two-point family), rotated inward by theta from the edge."""
    th = math.radians(theta_deg)
    rays = []
    n = len(pts)
    for i in range(n):
        p, q = pts[i], pts[(i + 1) % n]
        u = unit(sub(q, p))
        nrm = (-u[1], u[0])                       # inward for CCW polygons
        m = lerp(p, q, .5)
        L = length(sub(q, p))
        oR = add(m, mul(u, delta * L))
        oL = add(m, mul(u, -delta * L))
        rays.append(Ray(oR, add(mul(u, math.cos(th)), mul(nrm, math.sin(th))), i, "R"))
        rays.append(Ray(oL, add(mul(u, -math.cos(th)), mul(nrm, math.sin(th))), i, "L"))
    return rays


def intersect(r1: Ray, r2: Ray):
    den = cross(r1.d, r2.d)
    w = sub(r2.origin, r1.origin)
    if abs(den) < 1e-12:
        # collinear rays facing each other meet along the chord (e.g. square at theta 45)
        if abs(cross(w, r1.d)) < 1e-9 and dot(w, r1.d) > EPS and dot(r1.d, r2.d) < 0:
            half = length(w) / 2
            return add(r1.origin, mul(r1.d, half)), half, half
        return None
    t1 = cross(w, r2.d) / den
    t2 = cross(w, r1.d) / den
    if t1 <= EPS or t2 <= EPS:
        return None
    return add(r1.origin, mul(r1.d, t1)), t1, t2


def motif(tile: Tile, theta_deg, delta=0.0, mode="auto", skip=0, open_edges=frozenset()):
    """Return (segments, report). Pairing: R_i with L_{i+1+skip} (skip=0 meets on the vertex
    bisector for regular tiles; skip>0 extends lines to a later intersection, e.g. the full
    {8/3} chords of Bonner's acute octagon). Rays left unpaired, or whose pair falls outside the
    tile, are resolved by Kaplan's greedy method (p.562 Fig.523). Edges in open_edges (an
    assembly rim) emit no rays; rays still unpaired then run straight to the tile boundary."""
    pts = tile.pts
    poly = Polygon(pts).buffer(1e-6)
    rays = [r for r in tile_rays(pts, theta_deg, delta) if r.edge not in open_edges]
    n = len(pts)
    idx = {(r.edge, r.side): k for k, r in enumerate(rays)}
    used, segs = set(), []

    def ok(hit, a, b):
        if not hit:
            return False
        X = hit[0]
        return poly.contains(Point(X)) and poly.contains(LineString([rays[a].origin, X])) and poly.contains(LineString([rays[b].origin, X]))

    if mode in ("auto", "adjacent"):
        for i in range(n):
            a, b = idx.get((i, "R")), idx.get(((i + 1 + skip) % n, "L"))
            if a is None or b is None:
                continue
            hit = intersect(rays[a], rays[b])
            if ok(hit, a, b):
                used |= {a, b}
                segs += [(rays[a].origin, hit[0]), (rays[b].origin, hit[0])]
    if mode in ("auto", "greedy"):
        cands = []
        for a in range(len(rays)):
            for b in range(a + 1, len(rays)):
                if a in used or b in used or rays[a].edge == rays[b].edge:
                    continue
                hit = intersect(rays[a], rays[b])
                if ok(hit, a, b):
                    cands.append((hit[1] + hit[2], abs(hit[1] - hit[2]), a, b, hit[0]))
        for _, _, a, b, X in sorted(cands):
            if a in used or b in used:
                continue
            used |= {a, b}
            segs += [(rays[a].origin, X), (rays[b].origin, X)]
    capped = 0
    if open_edges:
        boundary = Polygon(pts).exterior
        for k, r in enumerate(rays):
            if k in used:
                continue
            far = add(r.origin, mul(r.d, 1e3 * math.sqrt(Polygon(pts).area)))
            hit = LineString([add(r.origin, mul(r.d, 1e-6)), far]).intersection(boundary)
            P = min(getattr(hit, "geoms", [hit]), key=lambda h: Point(r.origin).distance(h))
            segs.append((r.origin, (P.x, P.y)))
            used.add(k)
            capped += 1
    report = {"kind": tile.kind, "rays": len(rays), "unpaired": len(rays) - len(used), "capped": capped}
    return segs, report


def pattern(tiles, theta, delta=0.0, overrides=None, open_edges=None):
    """overrides: {kind: dict(theta=, delta=, mode=, skip=)} for per-module line placement.
    open_edges: {tile index: set(edge index)} for assembly rims."""
    overrides = overrides or {}
    segs, reports = [], []
    for i, t in enumerate(tiles):
        o = {"theta": theta, "delta": delta, "mode": "auto", "skip": 0, **overrides.get(t.kind, {})}
        s, r = motif(t, o["theta"], o["delta"], o["mode"], o["skip"], frozenset((open_edges or {}).get(i, ())))
        segs += s
        reports.append(r)
    return segs, reports


def rim_edges(tiles):
    """Edges used by exactly one tile of a finite assembly."""
    count = defaultdict(int)
    for t in tiles:
        for i in range(len(t.pts)):
            a, b = _key(t.pts[i], 1e-4), _key(t.pts[(i + 1) % len(t.pts)], 1e-4)
            count[frozenset((a, b))] += 1
    out = defaultdict(set)
    for ti, t in enumerate(tiles):
        for i in range(len(t.pts)):
            a, b = _key(t.pts[i], 1e-4), _key(t.pts[(i + 1) % len(t.pts)], 1e-4)
            if count[frozenset((a, b))] == 1:
                out[ti].add(i)
    return dict(out)


# ---------------------------------------------------------------- planar strands + interlace
def _key(p, q=1e-5):
    return (round(p[0] / q), round(p[1] / q))


def planar_graph(segs):
    """Split segments at mutual intersections; merge coincident nodes; drop doubled edges."""
    lines = [LineString(s) for s in segs if length(sub(s[1], s[0])) > EPS]
    merged = unary_union(lines)          # nodes all intersections, removes duplicates
    geoms = getattr(merged, "geoms", [merged])
    nodes, adj = {}, defaultdict(set)
    for g in geoms:
        cs = list(g.coords)
        for p, q in zip(cs, cs[1:]):
            kp, kq = _key(p), _key(q)
            if kp == kq:
                continue
            nodes[kp], nodes[kq] = p, q
            adj[kp].add(kq)
            adj[kq].add(kp)
    return nodes, adj


def terminals(segs):
    """Contact points served by one tile only (patch border): strands must end there."""
    count = defaultdict(int)
    for p, _ in segs:
        count[_key(p)] += 1
    return {k for k, c in count.items() if c < 4}


def strands(nodes, adj, stop=frozenset()):
    """Trace strands straight through even-degree nodes (opposite edges by angle)."""
    def ang(a, b):
        pa, pb = nodes[a], nodes[b]
        return math.atan2(pb[1] - pa[1], pb[0] - pa[0])

    nxt = {}
    for v, nb in adj.items():
        if v in stop:
            continue
        nb = sorted(nb, key=lambda w: ang(v, w))
        k = len(nb)
        if k % 2 == 0:
            for i in range(k):
                nxt[(nb[i], v)] = nb[(i + k // 2) % k]   # arriving from nb[i], leave opposite
    seen, out = set(), []
    for v in adj:
        for w in adj[v]:
            if (v, w) in seen:
                continue
            # walk backwards to a start (or loop)
            path = [v, w]
            seen |= {(v, w), (w, v)}
            a, b = v, w
            while (a, b) in nxt and (b, nxt[(a, b)]) not in seen:
                c = nxt[(a, b)]
                seen |= {(b, c), (c, b)}
                path.append(c)
                a, b = b, c
            a, b = w, v
            back = []
            while (a, b) in nxt and (b, nxt[(a, b)]) not in seen:
                c = nxt[(a, b)]
                seen |= {(b, c), (c, b)}
                back.append(c)
                a, b = b, c
            out.append(back[::-1] + path)
    return out


def interlace(nodes, adj, strand_list):
    """Alternate over/under along every strand, propagating constraints through crossings.
    Returns {(strand_idx, node): over?} and a conflict count (0 = consistent weave)."""
    crossings = {v for v, nb in adj.items() if len(nb) == 4}
    at = defaultdict(list)               # node -> [(strand, position)]
    for si, s in enumerate(strand_list):
        for k, v in enumerate(s):
            if v in crossings and 0 < k < len(s) - 1:
                at[v].append((si, k))
    state, conflicts = {}, 0
    for start in range(len(strand_list)):
        if any((start, v) in state for v in strand_list[start]):
            continue
        stack = [(start, None)]
        while stack:
            si, seed = stack.pop()
            seq = [v for k, v in enumerate(strand_list[si]) if v in crossings and 0 < k < len(strand_list[si]) - 1]
            if not seq:
                continue
            if seed is None:
                base = 0
            else:
                node, over = seed
                pos = seq.index(node)
                base = (pos + (0 if over else 1)) % 2
            for k, v in enumerate(seq):
                over = (k % 2 == base)
                if (si, v) in state:
                    conflicts += state[(si, v)] != over
                    continue
                state[(si, v)] = over
                for sj, _ in at[v]:
                    if sj != si and (sj, v) not in state:
                        stack.append((sj, (v, not over)))
    return state, conflicts


# ---------------------------------------------------------------- validation
def validate_tiling(tiling: Tiling):
    area = sum(Polygon(t.pts).area for t in tiling.tiles)
    cell = abs(cross(tiling.t1, tiling.t2))
    patch = tiling.patch(range(-1, 2), range(-1, 2))
    polys = [Polygon(t.pts) for t in patch]
    overlap = 0.0
    for i in range(len(polys)):
        for j in range(i + 1, len(polys)):
            if polys[i].intersects(polys[j]):
                overlap += polys[i].intersection(polys[j]).area
    # every edge of a centre-unit tile must be shared by exactly one other tile, reversed
    edges = defaultdict(int)
    for t in patch:
        for i in range(len(t.pts)):
            edges[(_key(t.pts[i], 1e-4), _key(t.pts[(i + 1) % len(t.pts)], 1e-4))] += 1
    unmatched = 0
    for t in tiling.tiles:
        for i in range(len(t.pts)):
            p, q = _key(t.pts[i], 1e-4), _key(t.pts[(i + 1) % len(t.pts)], 1e-4)
            unmatched += edges.get((q, p), 0) != 1
    return {"tiling": tiling.name, "area_ratio": round(area / cell, 9), "overlap_area": round(overlap, 9),
            "unmatched_edges": unmatched}


def validate_seams(tiles, segs):
    """Every motif endpoint lying on an interior tile edge must be met by a collinear segment
    from the neighbouring tile (lines continue straight through the contact point)."""
    ends = defaultdict(list)
    for p, q in segs:
        ends[_key(p, 1e-4)].append(unit(sub(q, p)))
    broken = 0
    for k, dirs in ends.items():
        if len(dirs) == 1:
            broken += 1          # patch boundary or a genuine break; caller crops away borders
            continue
        for d in dirs:
            if not any(dot(d, e) < -1 + 1e-6 for e in dirs):
                broken += 1
    return broken


# ---------------------------------------------------------------- SVG output
def f(x): return f"{x:.3f}".rstrip("0").rstrip(".")


def path_d(pts, close=True):
    return "M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts) + (" Z" if close else "")


def poly_svg(geom):
    """Shapely polygon / multipolygon -> SVG path data with holes (evenodd)."""
    out = []
    for g in getattr(geom, "geoms", [geom]):
        if g.is_empty or g.geom_type != "Polygon":
            continue
        out.append(path_d(list(g.exterior.coords)[:-1]))
        for h in g.interiors:
            out.append(path_d(list(h.coords)[:-1]))
    return " ".join(out)


def bands(strand_list, nodes, width, window=None):
    """Closed band polygons: each strand buffered with mitre joins and flat caps (Kaplan 4.5.2)."""
    polys = []
    for s in strand_list:
        ls = LineString([nodes[v] for v in s])
        polys.append(ls.buffer(width / 2, cap_style="flat", join_style="mitre", mitre_limit=8))
    u = unary_union(polys)
    return u.intersection(window) if window is not None else u


def interlaced_svg(nodes, adj, strand_list, state, width, gap, window, fill, edge, edge_w):
    """Draw strands as bands with a gap where they pass under. Every band is a closed path."""
    over_pieces, under_cuts = [], []
    crossings = {v for v, nb in adj.items() if len(nb) == 4}
    cut_len = width / 2 + gap
    for si, s in enumerate(strand_list):
        for k, v in enumerate(s):
            if v in crossings and (si, v) in state and not state[(si, v)]:
                under_cuts.append((si, v))
    # band per strand; subtract the over-strand's widened band at each under crossing
    strand_bands = []
    for si, s in enumerate(strand_list):
        ls = LineString([nodes[v] for v in s])
        b = ls.buffer(width / 2, cap_style="flat", join_style="mitre", mitre_limit=8)
        strand_bands.append((ls, b))
    cuts_by_strand = defaultdict(list)
    for si, v in under_cuts:
        cuts_by_strand[si].append(v)
    paths = []
    by_node = defaultdict(list)
    for si, s in enumerate(strand_list):
        for v in s:
            if v in crossings:
                by_node[v].append(si)
    for si, (ls, b) in enumerate(strand_bands):
        g = b
        for v in cuts_by_strand[si]:
            for sj in by_node[v]:
                if sj == si:
                    continue
                lsj = strand_bands[sj][0]
                P = Point(nodes[v])
                local = lsj.intersection(P.buffer(width * 2.5))
                if not local.is_empty:
                    g = g.difference(local.buffer(width / 2 + gap, cap_style="flat", join_style="mitre"))
        g = g.intersection(window)
        if not g.is_empty:
            paths.append(poly_svg(g))
    d = " ".join(paths)
    return f'<path d="{d}" fill="{fill}" stroke="{edge}" stroke-width="{edge_w}" stroke-linejoin="miter" fill-rule="nonzero"/>'


def faces(segs, tiles_window, window):
    """Faces of the motif + window boundary arrangement (for fill assignment)."""
    lines = [LineString(s) for s in segs] + [window.exterior]
    return [p for p in polygonize(unary_union(lines)) if p.area > 1e-6 and window.contains(p.representative_point())]
