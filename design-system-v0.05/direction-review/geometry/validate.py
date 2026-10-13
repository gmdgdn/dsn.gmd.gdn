"""Geometry QA for the direction-review constructions. Writes validation.json."""
import json
from pathlib import Path

from shapely.geometry import box

import gmdgeo as g

OUT = Path(__file__).parent / "validation.json"
results = []

CASES = [
    ("4.8.8 acute, octagon {8/3} chords (alpha 45 / theta 67.5)", g.tiling_488(1), 67.5, {"oct": {"skip": 2}}),
    ("4.8.8 median (alpha 90 / theta 45)", g.tiling_488(1), 45, None),
    ("4.8.8 obtuse (alpha 135 / theta 22.5)", g.tiling_488(1), 22.5, None),
    ("4.6.12 median (theta 60)", g.tiling_4612(1), 60, None),
    ("12/8 edge-to-edge acute, extended (theta 67.5)", g.tiling_12_8(1), 67.5, {"dodec": {"skip": 1}, "oct": {"skip": 2}}),
    ("12/8 edge-to-edge acute, first intersection (theta 67.5)", g.tiling_12_8(1), 67.5, None),
]
for name, T, th, ov in CASES:
    tv = g.validate_tiling(T)
    tiles = T.patch(range(-2, 3), range(-2, 3))
    segs, reps = g.pattern(tiles, th, overrides=ov)
    unpaired = sum(r["unpaired"] for r in reps)
    nodes, adj = g.planar_graph(segs)
    st = g.strands(nodes, adj, g.terminals(segs))
    state, conflicts = g.interlace(nodes, adj, st)
    # seam check on the interior only: count broken ends inside the centre 3x3 units
    inner = g.Polygon([g.add(g.mul(T.t1, i), g.mul(T.t2, j)) for i, j in ((-1, -1), (2, -1), (2, 2), (-1, 2))])
    inner_segs = [s for s in segs if inner.contains(g.Point(s[0])) and inner.contains(g.Point(s[1]))]
    broken = g.validate_seams(tiles, [s for s in segs])
    # broken ends that lie inside the inner region are real defects
    from collections import defaultdict
    ends = defaultdict(list)
    for p, q in segs:
        ends[g._key(p, 1e-4)].append((p, g.unit(g.sub(q, p))))
    real = 0
    for k, lst in ends.items():
        p = lst[0][0]
        if not inner.buffer(-1e-3).contains(g.Point(p)):
            continue
        dirs = [d for _, d in lst]
        if len(dirs) < 2 or any(not any(g.dot(d, e) < -1 + 1e-6 for e in dirs) for d in dirs):
            real += 1
    degs = defaultdict(int)
    for v, nb in adj.items():
        degs[len(nb)] += 1
    results.append({**tv, "case": name, "unpaired_rays": unpaired, "interior_seam_breaks": real,
                    "node_degrees": dict(sorted(degs.items())), "strands": len(st),
                    "interlace_conflicts": conflicts})

# radial fivefold
tiles = g.radial_fivefold(1)
from shapely.ops import unary_union
from shapely.geometry import Polygon
u = unary_union([Polygon(t.pts).buffer(1e-9) for t in tiles])
ov = sum(Polygon(a.pts).intersection(Polygon(b.pts)).area for i, a in enumerate(tiles) for b in tiles[i + 1:])
rim = g.rim_edges(tiles)
for th, nm in ((54, "median alpha 72"), (72, "acute alpha 36")):
    segs, reps = g.pattern(tiles, th, open_edges=rim)
    results.append({"case": f"radial fivefold {nm}", "tiles": len(tiles), "union_is_single_polygon": u.geom_type == "Polygon",
                    "holes": len(u.interiors) if u.geom_type == "Polygon" else None, "overlap_area": round(ov, 9),
                    "rim_edges": sum(len(v) for v in rim.values()),
                    "unpaired_rays": sum(r["unpaired"] for r in reps), "rays_capped_at_rim": sum(r["capped"] for r in reps)})

OUT.write_text(json.dumps(results, indent=1))
for r in results:
    print(json.dumps(r))
