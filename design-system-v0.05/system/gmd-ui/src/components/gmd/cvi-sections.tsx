import { useId, useState } from "react"
import { ArrowDown, ArrowRight, BookOpen, Database, FileText, Image as ImageIcon, ShieldCheck } from "lucide-react"
import type { GMDLocale } from "./website-blocks"
import "./cvi-sections.css"

type Copy = { en: string; ar: string }
const copy = (locale: GMDLocale, value: Copy) => value[locale]

export type CVIQuote = { id: string; before: Copy; source: Copy; entity: Copy; action: Copy; after: Copy; attribution: Copy; role: Copy; image: string; alt: Copy }
const voices: CVIQuote[] = [
  { id: "archive", before: { en: "A ", ar: "كل " }, source: { en: "record", ar: "سجل" }, entity: { en: " carries a story", ar: " يحمل حكاية" }, action: { en: " into the archive.", ar: " إلى الأرشيف." }, after: { en: "", ar: "" }, attribution: { en: "Illustrative request", ar: "طلب توضيحي" }, role: { en: "Example language · GMD", ar: "صياغة نموذجية · GMD" }, image: "./assets/eg-027.jpg", alt: { en: "Archival image of a woman at a television control desk", ar: "صورة أرشيفية لامرأة أمام لوحة تحكم تلفاز" } },
  { id: "artist", before: { en: "Connect ", ar: "اربط " }, source: { en: "people", ar: "الأشخاص" }, entity: { en: ", places", ar: "، والأماكن" }, action: { en: " and works to reveal new paths.", ar: " والأعمال لاكتشاف مسارات جديدة." }, after: { en: "", ar: "" }, attribution: { en: "Illustrative response", ar: "استجابة توضيحية" }, role: { en: "Example language · GMD", ar: "صياغة نموذجية · GMD" }, image: "./assets/eg-032.jpg", alt: { en: "Archival image of an artist in a studio surrounded by paintings", ar: "صورة أرشيفية لفنان في مرسم تحيط به لوحات" } },
]

export function CVIQuoteTiles({ locale = "en", items = voices, assetBase = "", className = "" }: { locale?: GMDLocale; items?: CVIQuote[]; assetBase?: string; className?: string }) {
  const titleId = useId()
  return <section className={`gmd-cvi-voices ${className}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} aria-labelledby={titleId}>
    <header className="gmd-cvi-section-head"><p className="gmd-cvi-kicker">{copy(locale,{en:"01 / VOICES IN THE ARCHIVE",ar:"٠١ / أصوات في الأرشيف"})}</p><h2 id={titleId}>{copy(locale,{en:"Knowledge lives with its people.",ar:"المعرفة تعيش مع أصحابها."})}</h2><p>{copy(locale,{en:"Short reflections keep lived experience close to the material it helps us understand.",ar:"تُبقي التأملات القصيرة الخبرة الحية قريبة من المواد التي تساعدنا على فهمها."})}</p></header>
    <div className="gmd-cvi-voices__grid">{items.map((item,index)=>{const imageSrc=items===voices?(assetBase?`${assetBase.replace(/\/$/,"")}/${item.image.split("/").pop()}`:undefined):item.image;return <figure className={`gmd-cvi-voice gmd-cvi-voice--${index % 2 ? "pink" : "blue"}`} key={item.id}><div className="gmd-cvi-voice__photo">{imageSrc?<img src={imageSrc} alt={copy(locale,item.alt)}/>:<div className="gmd-cvi-voice__placeholder"><ImageIcon aria-hidden="true"/><span>{locale==="ar"?"الصورة من المجموعة":"Collection image"}</span></div>}<span aria-hidden="true">0{index+1}</span></div><blockquote>{copy(locale,item.before)}<mark className="gmd-cvi-mark--source">{copy(locale,item.source)}</mark><mark className="gmd-cvi-mark--entity">{copy(locale,item.entity)}</mark><mark className="gmd-cvi-mark--action">{copy(locale,item.action)}</mark>{copy(locale,item.after)}</blockquote><figcaption><strong>{copy(locale,item.attribution)}</strong><span>{copy(locale,item.role)}</span></figcaption></figure>})}</div>
    <ul className="gmd-cvi-legend" aria-label={locale==="ar"?"دليل ألوان التسطير":"Underline color legend"}><li><i className="gmd-cvi-mark--source" aria-hidden="true"/>{locale==="ar"?"المصدر":"Source"}</li><li><i className="gmd-cvi-mark--entity" aria-hidden="true"/>{locale==="ar"?"الكيان":"Entity"}</li><li><i className="gmd-cvi-mark--action" aria-hidden="true"/>{locale==="ar"?"الفعل":"Action"}</li></ul>
  </section>
}

export type CVITool = { id: string; icon?: typeof Database; name: Copy; purpose: Copy; status: Copy; detail: Copy }
const tools: CVITool[] = [
  { id:"catalog", icon:BookOpen, name:{en:"Collection catalog",ar:"فهرس المجموعات"}, purpose:{en:"Describe and find source material",ar:"وصف المواد الأصلية واكتشافها"}, status:{en:"Linked",ar:"مترابط"}, detail:{en:"Records retain identifiers, contributors, dates and source relationships.",ar:"تحتفظ السجلات بالمعرفات والمساهمين والتواريخ وروابط المصدر."} },
  { id:"rights", icon:ShieldCheck, name:{en:"Rights & access",ar:"الحقوق وإمكانية الوصول"}, purpose:{en:"Make permitted use clear",ar:"توضيح الاستخدام المسموح"}, status:{en:"Reviewed · example",ar:"مراجعة · مثال"}, detail:{en:"Access notes and reuse terms stay attached to each item.",ar:"تظل ملاحظات الوصول وشروط إعادة الاستخدام مرتبطة بكل مادة."} },
  { id:"exports", icon:FileText, name:{en:"Research exports",ar:"ملفات التصدير البحثية"}, purpose:{en:"Carry context into other tools",ar:"نقل السياق إلى أدوات أخرى"}, status:{en:"CSV + JSON",ar:"CSV + JSON"}, detail:{en:"Portable files include stable references and descriptive fields.",ar:"تتضمن الملفات القابلة للنقل مراجع ثابتة وحقولًا وصفية."} },
]
export function CVIToolkitTable({ locale = "en", items = tools, className = "" }: { locale?: GMDLocale; items?: CVITool[]; className?: string }) {
  const [open,setOpen]=useState<string | null>(null)
  const instanceId = useId()
  const ar=locale === "ar"
  return <section className={`gmd-cvi-toolkit ${className}`} lang={locale} dir={ar ? "rtl" : "ltr"} aria-labelledby={`${instanceId}-title`}><header className="gmd-cvi-section-head"><p className="gmd-cvi-kicker">{ar?"٠٢ / مثال توضيحي · الأدوات والبنية":"02 / ILLUSTRATIVE CONFIGURATION · TOOLS"}</p><h2 id={`${instanceId}-title`}>{ar?"أدوات تجعل العمل متصلًا.":"A toolkit that keeps work connected."}</h2><p>{ar?"طبقة بيضاء واضحة فوق نسيج هندسي؛ كل أداة تُظهر وظيفتها وحالتها.":"A clear white working surface over a geometric pixel field. Each tool shows its purpose and state."}</p></header>
    <div className="gmd-cvi-table-wrap"><table><thead><tr><th>{ar?"الأداة":"TOOL"}</th><th>{ar?"الغرض":"PURPOSE"}</th><th>{ar?"الحالة":"STATUS"}</th><th><span className="sr-only">{ar?"تفاصيل":"Details"}</span></th></tr></thead><tbody>{items.map(item=>{const Icon=item.icon ?? Database;const expanded=open===item.id;const detailId=`${instanceId}-detail-${item.id}`;return <tr key={item.id} className={expanded?"is-open":""}><td><span className="gmd-cvi-tool-name"><Icon aria-hidden="true"/>{copy(locale,item.name)}</span></td><td>{copy(locale,item.purpose)}</td><td><span className="gmd-cvi-status"><i aria-hidden="true"/>{copy(locale,item.status)}</span></td><td><button className="gmd-cvi-disclose" type="button" aria-expanded={expanded} aria-controls={detailId} onClick={()=>setOpen(expanded?null:item.id)}><span>{expanded?(ar?"إخفاء":"Close"):(ar?"التفاصيل":"Details")}</span><ArrowDown aria-hidden="true"/></button><div className="gmd-cvi-detail" id={detailId} hidden={!expanded}>{copy(locale,item.detail)}</div></td></tr>})}</tbody></table></div>
  </section>
}

export type CVIStage = { id: string; title: Copy; text: Copy; mark: Copy }
const stages: CVIStage[] = [
 {id:"collect",title:{en:"Collect",ar:"نجمع"},text:{en:"Gather material with its source and contributor.",ar:"نجمع المواد مع مصادرها والمساهمين بها."},mark:{en:"Source",ar:"المصدر"}},
 {id:"describe",title:{en:"Describe",ar:"نوثق"},text:{en:"Add names, dates and the context we know.",ar:"نضيف الأسماء والتواريخ والسياق المتاح."},mark:{en:"Context",ar:"السياق"}},
 {id:"connect",title:{en:"Connect",ar:"نربط"},text:{en:"Link related people, places and works.",ar:"نربط الأشخاص والأماكن والأعمال ذات الصلة."},mark:{en:"Relations",ar:"العلاقات"}},
 {id:"share",title:{en:"Share",ar:"نشارك"},text:{en:"Make access and reuse terms visible.",ar:"نوضح شروط الوصول وإعادة الاستخدام."},mark:{en:"Care",ar:"العناية"}},
]
export function CVIActionPipeline({ locale = "en", items = stages, assetBase = "/assets", className = "" }: { locale?: GMDLocale; items?: CVIStage[]; assetBase?: string; className?: string }) {
 const [active,setActive]=useState(items[0]?.id ?? "");const current=items.find(x=>x.id===active) ?? items[0];const ar=locale==="ar";const titleId=useId()
 if(!current)return null
 return <section className={`gmd-cvi-pipeline ${className}`} lang={locale} dir={ar?"rtl":"ltr"} aria-labelledby={titleId}><header className="gmd-cvi-section-head"><p className="gmd-cvi-kicker">{ar?"٠٣ / مسار العمل":"03 / THE WORKFLOW"}</p><h2 id={titleId}>{ar?"كل خطوة تحفظ ما قبلها.":"Each step carries the one before."}</h2><p>{ar?"اختر خطوة لاستكشاف ما تضيفه إلى السجل.":"Select a step to see what it adds to the record."}</p></header><div className="gmd-cvi-pipeline__layout"><ol className="gmd-cvi-pipeline__steps">{items.map((item,index)=><li key={item.id}><button type="button" aria-current={active===item.id?"step":undefined} onClick={()=>setActive(item.id)}><span className="gmd-cvi-pipeline__index">0{index+1}</span><span>{copy(locale,item.title)}</span><ArrowRight aria-hidden="true"/></button></li>)}</ol><article className="gmd-cvi-pipeline__detail" key={current.id}><div className="gmd-cvi-pipeline__ornament" aria-hidden="true"><img src={`${assetBase}/pixel-parquet.svg`} alt=""/><img src={`${assetBase}/pixel-register.svg`} alt=""/></div><p className="gmd-cvi-kicker">{copy(locale,current.mark)}</p><h3>{copy(locale,current.title)}</h3><p>{copy(locale,current.text)}</p><span className="gmd-cvi-pipeline__index">GMD / 0{items.indexOf(current)+1}</span></article></div></section>
}
