const images = {
  'EG-027': { file: 'assets/EG-027.jpg', title: 'Egyptian television studio photograph', alt: 'Historic Egyptian television studio photograph, shown in full', position: 'center' },
  'EG-026': { file: 'assets/EG-026.jpg', title: 'Family photograph on a balcony', alt: 'Historic group photograph of a family on a balcony, shown in full', position: 'center 45%' },
  'EG-016': { file: 'assets/EG-016.webp', title: 'Tower of Cairo printed brochure', alt: 'Tower of Cairo travel brochure, shown in full', position: 'center' },
  'EG-005': { file: 'assets/EG-005.webp', title: 'Egypt / Egitto travel brochure with map', alt: 'Vertical Egypt travel brochure with architectural collage, shown in full', position: 'center' }
};

const imageButtons = [...document.querySelectorAll('[data-asset]')];
const treatmentButtons = [...document.querySelectorAll('[data-treatment]')];
const fullImage = document.querySelector('#full-image');
const treatmentImage = document.querySelector('#treatment-image');
const treatmentCanvas = document.querySelector('#treatment-canvas');

imageButtons.forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.asset;
  const asset = images[id];
  if (!asset) return;
  imageButtons.forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
  fullImage.src = asset.file;
  fullImage.alt = asset.alt;
  treatmentImage.src = asset.file;
  treatmentImage.alt = `Editorial crop of ${asset.title}`;
  treatmentImage.style.objectPosition = asset.position;
  document.querySelector('#asset-id').textContent = id;
  document.querySelector('#asset-title').textContent = asset.title;
  document.querySelector('#source-link').href = asset.file;
}));

treatmentButtons.forEach(button => button.addEventListener('click', () => {
  treatmentButtons.forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
  treatmentCanvas.className = `editorial-plate__canvas treatment--${button.dataset.treatment}`;
}));

const fontSettings = {
  amiri: { role: 'A / AMIRI + IBM PLEX SANS ARABIC', rationale: 'Editorial title, calm reading and precise UI' },
  rakkas: { role: 'B / RAKKAS + IBM PLEX SANS ARABIC', rationale: 'An expressive short Film title; restrained reading' },
  plex: { role: 'C / IBM PLEX SANS ARABIC', rationale: 'Predictable metrics for a dense workspace' }
};
const fontTabs = [...document.querySelectorAll('[data-font]')];
const specimen = document.querySelector('#panel-type');
function selectFont(button) {
  const key = button.dataset.font;
  fontTabs.forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  specimen.className = `type-specimen type-specimen--${key}`;
  specimen.setAttribute('aria-labelledby', button.id);
  document.querySelector('#type-role').textContent = fontSettings[key].role;
  document.querySelector('#type-rationale').textContent = fontSettings[key].rationale;
}
fontTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFont(tab));
  tab.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const next = fontTabs[(index + direction + fontTabs.length) % fontTabs.length];
    selectFont(next);
    next.focus();
  });
});
document.querySelector('#ar-demo-action').addEventListener('click', () => {
  document.querySelector('#ar-demo-status').textContent = 'مثال توضيحي: رابط السجل يحتاج بيانات حقيقية';
});
