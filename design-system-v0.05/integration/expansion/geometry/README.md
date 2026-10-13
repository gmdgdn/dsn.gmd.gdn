# Geometry specimen API

Run `python build_geometry.py` from this folder to deterministically regenerate the SVGs, `manifest.json`, and `validation.json`. The generator uses only Python’s standard library. It writes individual 320 × 320 SVGs in `assets/`; SVG paths are explicit coordinates with no `<use>` or transform dependencies.

Start with these eight specimen seeds: `hex-01`, `hex-02`, `dodec-01`, `dodec-02`, `square-oct-01`, `square-oct-02`, `radial-01`, and `radial-02`. Two Egyptian register specimens are also available: `egyptian-01` and `egyptian-02`. Each seed has outline, filled, and band exports; square–octagon seeds also have an aperture export. Consult the manifest for source/page reference, construction parameters, minimum suggested CSS size, and safe area.

All exports are contemporary construction studies. The Bonner and Egyptian booklet references identify source vocabularies and composition, not traced historical artifacts. The 4.8.8 host tessellation passes the area and reversed-edge test in `validation.json`; the generated motif lines have not passed a cross-boundary continuity test, so no SVG is certified as a seamless pattern. Radial fans and register modules are isolated compositions.
