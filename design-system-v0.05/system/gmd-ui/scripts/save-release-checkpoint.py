from pathlib import Path
import zipfile, json, hashlib, sys

app = Path(__file__).resolve().parents[1]
workspace = app.parents[2]
version = json.loads((app / 'package.json').read_text(encoding='utf-8'))['version']
stamp = sys.argv[1] if len(sys.argv)>1 else '2026-10-06'
dest = workspace / f'checkpoints/gmd-ui-registry-{version}-{stamp}'
dest.mkdir(parents=True, exist_ok=True)

def archive(name, files, base):
    target = dest / name
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as z:
        for p in files:
            if p.is_file():
                z.write(p, p.relative_to(base))
    return {'file': name, 'bytes': target.stat().st_size, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()}

source = []
for folder in ['src', 'scripts', 'public', 'licenses', 'proof']:
    source.extend((app / folder).rglob('*'))
source.extend(p for p in app.iterdir() if p.is_file() and p.name != 'pnpm-lock-install-attempt.yaml' and p.suffix not in ['.zip', '.log'])
source.extend((app.parent / 'tokens').rglob('*'))
records = [archive(f'gmd-ui-source-{version}.zip', source, app.parent), archive(f'gmd-ui-published-{version}.zip', (app / 'registry-dist').rglob('*'), app)]
(dest / 'manifest.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
(dest / 'CONTINUE.md').write_text((workspace / f'CHECKPOINT-GMD-REGISTRY-{stamp}.md').read_text(encoding='utf-8'), encoding='utf-8')
print(json.dumps(records, indent=2))
