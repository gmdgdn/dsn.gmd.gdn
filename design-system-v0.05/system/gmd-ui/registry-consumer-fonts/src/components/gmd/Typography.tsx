export function Typography({locale="en"}:{locale?:"en"|"ar"}) {
  const ar=locale==="ar"
  return <article className="gmd-typography"><small>{ar?"مجموعة ٠١ · القاهرة":"COLLECTION 01 · CAIRO"}</small><h2>{ar?"المعرفة تبدأ من المصدر.":"Knowledge begins at the source."}</h2><p>{ar?"نحفظ سياق المواد المصرية ونوثق مصادرها لتظل قابلة للبحث وإعادة الاستخدام المسؤول.":"Preserve context and document sources so Egyptian material stays discoverable and responsibly reusable."}</p><blockquote lang="ar" dir="rtl">« لكل سجل حكاية ومصدر وسياق »</blockquote></article>
}
