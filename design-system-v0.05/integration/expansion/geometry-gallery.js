const $ = selector => document.querySelector(selector);
const useByFamily = {
  'hex-dodecagonal': 'Feature cluster / editorial seal',
  'square-octagon': 'Media aperture / collection bay',
  'radial-gore': 'Opening graphic / paired linear index',
  'egyptian-register': 'Chapter rail / collection spine'
};
const labelByFamily = {
  'hex-dodecagonal': 'SIX- AND TWELVE-FOLD',
  'square-octagon': 'SQUARE–OCTAGON',
  'radial-gore': 'EIGHT-SECTOR FAN',
  'egyptian-register': 'EGYPTIAN REGISTER'
};
let specimens = [];
let assetCount = 0;
const element = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = String(text); return node; };
const link = (text, href, download = false) => { const a = element('a', '', text); a.href = href; if (download) a.download = ''; return a; };
const recipe = parameters => Object.entries(parameters || {}).filter(([key]) => key !== 'construction').slice(0, 4).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' / ') : value}`).join(' · ');
function render() {
  const family = $('#family-filter').value;
  const shown = specimens.filter(item => family === 'all' || item.family === family);
  const cards = shown.map(item => {
    const card = element('article', 'asset-card');
    const head = element('div', 'asset-card__head');
    const heading = element('div'); heading.append(element('span', 'kicker', labelByFamily[item.family]), element('h3', '', item.label));
    head.append(heading, element('span', 'asset-card__status', 'CONSTRUCTION STUDY'));
    const variants = element('div', 'asset-card__variants');
    for (const name of ['outline', 'filled', 'band', 'aperture']) {
      const asset = item.variants[name]; if (!asset) continue;
      const wrap = element('div', 'asset-card__variant');
      const role = asset.derivativeRole || (name === 'band' ? 'wide-stroke' : name === 'aperture' ? 'aperture study' : name);
      const title = element('span', 'asset-card__variant-title', role);
      const img = element('img'); img.src = 'geometry/' + asset.file; img.alt = `${item.label} ${name} vector study`; img.loading = 'lazy';
      const minimum = element('span', 'asset-card__minimum', `Min. ${asset.minimumSizeCssPx} CSS px`);
      const actions = element('div', 'asset-card__links');
      actions.append(link('View ↗', img.src), link('SVG ↓', img.src, true));
      wrap.append(title, img, minimum, actions); variants.append(wrap);
    }
    const details = element('div', 'asset-card__details');
    const source = element('div'); source.append(element('strong', '', '01 / SOURCE'), element('p', '', item.source));
    const construction = element('div'); construction.append(element('strong', '', '02 / RECIPE'), element('p', '', recipe(item.parameters)), element('p', '', item.parameters?.construction || 'See manifest parameters.'));
    details.append(source, construction);
    const application = element('div', 'application');
    const preview = element('img'); preview.src = 'geometry/' + (item.variants.aperture || item.variants.filled || item.variants.outline).file; preview.alt = '';
    const appText = element('div'); appText.append(element('span', 'application__label', '03 / APPLICATION'), element('strong', '', useByFamily[item.family]));
    application.append(preview, appText);
    const foot = element('div', 'asset-card__source', `${item.variants.filled?.safeArea ?? item.variants.outline?.safeArea ?? ''} · ${Object.values(item.variants).every(asset => asset.periodic === false) ? 'Isolated composition; no seamless repeat claim' : 'See manifest for periodicity limits'}`);
    card.append(head, variants, details, application, foot); return card;
  });
  $('#atlas-grid').replaceChildren(...cards);
  $('#atlas-count').textContent = `${shown.length} OF ${specimens.length} SEEDS · ${shown.reduce((count, item) => count + Object.keys(item.variants).length, 0)} OF ${assetCount} SVGS`;
}
async function load() {
  $('#atlas-error').hidden = true;
  try {
    const response = await fetch('geometry/manifest.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Manifest ${response.status}`);
    const manifest = await response.json();
    assetCount = manifest.assets.length;
    $('#atlas-total').textContent = `${Object.keys(manifest.specimens || {}).length} SEEDS / ${assetCount} SVGS`;
    const grouped = new Map();
    for (const asset of manifest.assets) {
      if (!grouped.has(asset.specimen)) grouped.set(asset.specimen, { id: asset.specimen, label: manifest.specimens?.[asset.specimen] || asset.specimen, family: asset.family, source: asset.source, parameters: asset.parameters, variants: {} });
      grouped.get(asset.specimen).variants[asset.variant] = asset;
    }
    specimens = [...grouped.values()];
    render();
  } catch (error) {
    $('#atlas-grid').replaceChildren();
    $('#atlas-error').hidden = false;
    $('#atlas-count').textContent = 'ASSETS UNAVAILABLE';
  }
}
$('#family-filter').addEventListener('change', render);
$('#retry-atlas').addEventListener('click', load);
load();
