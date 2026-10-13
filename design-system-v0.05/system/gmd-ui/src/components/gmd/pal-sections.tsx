import { useState } from "react"
import { ArrowUpRight, Archive, BookOpen, Database, Network, Search, ShieldCheck, Sparkles, Tags } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { GMDLocale } from "./website-blocks"
import "./pal-sections.css"

export type GMDMediaAsset = { src: string; alt: string; pattern?: string; label?: string }
type Copy = { en: string; ar: string }
type Capability = { id: string; icon: typeof Archive; title: Copy; description: Copy; note: Copy; media: GMDMediaAsset }

const defaultCapabilities: Capability[] = [
  { id: "collect", icon: Archive, title: { en: "Collect with context", ar: "نجمع بسياق واضح" }, description: { en: "Bring photographs, films, documents and oral histories into one carefully described collection.", ar: "نجمع الصور والأفلام والوثائق والتاريخ الشفهي في مجموعة موصوفة بعناية." }, note: { en: "Collection building", ar: "بناء المجموعات" }, media: { src: "./assets/eg-026.jpg", alt: "Group portrait on a balcony in an archival Egyptian photograph", pattern: "./assets/connected-parquet-morph.svg" } },
  { id: "describe", icon: BookOpen, title: { en: "Describe each source", ar: "نوثق كل مصدر" }, description: { en: "Keep attribution, dates, contributors and uncertainty attached to every record.", ar: "نحفظ النسبة والتواريخ والمساهمين وما لا نعرفه ضمن كل سجل." }, note: { en: "Editorial metadata", ar: "بيانات وصفية تحريرية" }, media: { src: "./assets/eg-027.jpg", alt: "Woman seated at a control desk with television monitors", pattern: "./assets/dual-level-field.svg" } },
  { id: "connect", icon: Network, title: { en: "Connect the knowledge", ar: "نربط المعرفة" }, description: { en: "Link people, works, places and themes so that each record opens useful paths through the archive.", ar: "نربط الأشخاص والأعمال والأماكن والموضوعات لتفتح السجلات مسارات مفيدة داخل الأرشيف." }, note: { en: "Linked records", ar: "سجلات مترابطة" }, media: { src: "./assets/eg-028.jpg", alt: "Group portrait of athletes with a shield", pattern: "./assets/connected-parquet-morph.svg" } },
  { id: "prepare", icon: ShieldCheck, title: { en: "Prepare responsibly", ar: "نُعد بمسؤولية" }, description: { en: "Review rights, sensitive details and permitted reuse before material moves into a new product.", ar: "نراجع الحقوق والتفاصيل الحساسة والاستخدام المسموح قبل انتقال المادة إلى منتج جديد." }, note: { en: "Rights-aware preparation", ar: "إعداد يراعي الحقوق" }, media: { src: "./assets/eg-032.jpg", alt: "Artist in a studio with portraits and paintings", pattern: "./assets/true-interlace-panel.svg" } },
  { id: "distribute", icon: Database, title: { en: "Distribute for discovery", ar: "نوزع للاكتشاف" }, description: { en: "Deliver clear catalogs, research data and licensed datasets with their source and access terms intact.", ar: "نقدم فهارس واضحة وبيانات بحثية ومجموعات مرخصة مع الحفاظ على المصدر وشروط الوصول." }, note: { en: "Useful, traceable outputs", ar: "مخرجات نافعة وموثقة" }, media: { src: "./assets/eg-034.webp", alt: "Women beside a display of pottery and textiles in a craft shop", pattern: "./assets/egyptian-pendant-register.svg" } },
]

export function GMDMediaExplorer({ locale = "en", media, className }: { locale?: GMDLocale; media?: GMDMediaAsset[]; className?: string }) {
  const [selected, setSelected] = useState(defaultCapabilities[0].id)
  const arabicAlts = ["صورة جماعية على شرفة في صورة أرشيفية مصرية","امرأة تجلس أمام لوحة تحكم وشاشات تلفاز","صورة جماعية لرياضيين يحملون درعًا","فنان في مرسم تحيط به صور ولوحات","نساء بجوار معروضات من الفخار والمنسوجات في متجر حرفي"]
  const items = media?.length === 5 ? defaultCapabilities.map((item, index) => ({ ...item, media: media[index] })) : defaultCapabilities.map((item, index) => ({ ...item, media: { ...item.media, alt: locale === "ar" ? arabicAlts[index] : item.media.alt } }))
  const rtl = locale === "ar"
  return <section className={`gmd-pal-explorer ${className ?? ""}`} lang={locale} dir={rtl ? "rtl" : "ltr"}>
    <div className="gmd-pal-explorer__intro"><p className="gmd-pal-kicker">{rtl ? "من المادة إلى المعرفة" : "FROM MATERIAL TO KNOWLEDGE"}</p><h2>{rtl ? "نحوّل المجموعات إلى معرفة نافعة." : "Make collections useful knowledge."}</h2><p>{rtl ? "مسار GMD من جمع المادة المصرية إلى توزيعها مع سياقها ومصدرها." : "GMD’s path from collecting Egyptian material to sharing it with its context and source."}</p></div>
    <Tabs value={selected} onValueChange={setSelected} orientation="vertical" className="gmd-pal-explorer__tabs">
      <TabsList variant="line" className="gmd-pal-explorer__list" aria-label={rtl ? "قدرات GMD" : "GMD capabilities"}>
        {items.map((item, index) => { const Icon = item.icon; return <TabsTrigger key={item.id} value={item.id} className="gmd-pal-explorer__trigger"><span className="gmd-pal-explorer__number">0{index + 1}</span><span className="gmd-pal-explorer__trigger-copy"><span className="gmd-pal-explorer__title"><Icon aria-hidden="true"/><span>{item.title[locale]}</span><ArrowUpRight className="gmd-pal-explorer__arrow" aria-hidden="true"/></span><span className="gmd-pal-explorer__description" aria-hidden={selected !== item.id}><span>{item.description[locale]}</span></span></span></TabsTrigger> })}
      </TabsList>
      <div className="gmd-pal-explorer__panels">{items.map(item => <TabsContent key={item.id} value={item.id} className="gmd-pal-explorer__panel"><figure className="gmd-pal-media" key={`${item.id}-${selected}`}><div className="gmd-pal-media__image"><img src={item.media.src} alt={item.media.alt}/><span className="gmd-pal-media__grain" aria-hidden="true"/></div>{item.media.pattern && <img className="gmd-pal-media__pattern" src={item.media.pattern} alt="" aria-hidden="true"/>}<figcaption><span><i className="gmd-pal-pixel" aria-hidden="true"/>{item.media.label ?? item.note[locale]}</span><span>GMD / CAIRO</span></figcaption></figure></TabsContent>)}</div>
    </Tabs>
    <p className="gmd-pal-explorer__footnote"><Sparkles aria-hidden="true"/>{rtl ? "السياق والمصدر وشروط الوصول ترافق كل مخرج." : "Context, source and access terms travel with every output."}</p>
  </section>
}

const gridCards = [
  { n: "01", icon: Archive, title: { en: "Collect", ar: "نجمع" }, desc: { en: "Bring Egyptian photographs, film, text and sound into a thoughtful home.", ar: "نجمع الصور والأفلام والنصوص والصوت المصري في مكان مدروس." }, kind: "collect", tone: "paper" },
  { n: "02", icon: Search, title: { en: "Find", ar: "نكتشف" }, desc: { en: "Build clear catalogs that help people find relevant material and its original source.", ar: "نبني فهارس واضحة تساعد الناس على اكتشاف المواد ومصادرها الأصلية." }, kind: "find", tone: "sand" },
  { n: "03", icon: Tags, title: { en: "Describe", ar: "نوصف" }, desc: { en: "Use consistent metadata while leaving room for local knowledge and editorial care.", ar: "نستخدم بيانات متسقة مع مساحة للمعرفة المحلية والعناية التحريرية." }, kind: "describe", tone: "lavender" },
  { n: "04", icon: Network, title: { en: "Connect", ar: "نربط" }, desc: { en: "Relate people, places and works to reveal new ways through a collection.", ar: "نربط الأشخاص والأماكن والأعمال لنكشف طرقًا جديدة داخل المجموعة." }, kind: "connect", tone: "sand" },
  { n: "05", icon: ShieldCheck, title: { en: "Prepare", ar: "نُعد" }, desc: { en: "Review rights and context before making material available for research or reuse.", ar: "نراجع الحقوق والسياق قبل إتاحة المواد للبحث أو إعادة الاستخدام." }, kind: "prepare", tone: "paper" },
  { n: "06", icon: Database, title: { en: "Distribute", ar: "نوزع" }, desc: { en: "Share useful records, collections and licensed data with provenance attached.", ar: "نشارك سجلات ومجموعات وبيانات مرخصة نافعة مع توثيق مصادرها." }, kind: "distribute", tone: "lavender" },
] as const

export function GMDCapabilityGrid({ locale = "en", className }: { locale?: GMDLocale; className?: string }) {
  const rtl = locale === "ar"
  return <section className={`gmd-pal-grid ${className ?? ""}`} lang={locale} dir={rtl ? "rtl" : "ltr"}><div className="gmd-pal-grid__heading"><p className="gmd-pal-kicker">{rtl ? "ما نبنيه معًا" : "WHAT WE MAKE POSSIBLE"}</p><h2>{rtl ? "من المصدر إلى الاستخدام المسؤول." : "From source to responsible use."}</h2><p>{rtl ? "طبقات متصلة تساعد المؤسسات على جمع المعرفة المصرية وتنظيمها وتوزيعها." : "Connected capabilities help institutions collect, organize and share Egyptian knowledge."}</p></div><div className="gmd-pal-grid__cards">{gridCards.map(card => { const Icon = card.icon; return <article key={card.n} className={`gmd-pal-card gmd-pal-card--${card.kind} gmd-pal-card--${card.tone}`}><span className="gmd-pal-card__index">{card.n} / GMD</span><span className="gmd-pal-card__icon"><Icon aria-hidden="true"/><i className="gmd-pal-pixel" aria-hidden="true"/></span><h3>{card.title[locale]}</h3><p>{card.desc[locale]}</p>{card.kind === "connect" && <img className="gmd-pal-card__pattern" src="./assets/connected-parquet-morph.svg" alt="" aria-hidden="true"/>}</article> })}</div></section>
}
