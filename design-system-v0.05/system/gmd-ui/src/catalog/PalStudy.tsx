import { ArrowLeft, ArrowUpRight, Database, Globe2, Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GMDCapabilityGrid, GMDMediaExplorer } from "@/components/gmd/pal-sections"
import type { GMDLocale } from "@/components/gmd/website-blocks"
import "./PalStudy.css"

type Copy = { en: string; ar: string }
const t = (locale: GMDLocale, copy: Copy) => copy[locale]

export function PalStudy({ locale = "en", onBack, onLocaleChange }: { locale?: GMDLocale; onBack?: () => void; onLocaleChange?: () => void }) {
  const ar = locale === "ar"
  return <main className="gmd-pal-study" lang={locale} dir={ar ? "rtl" : "ltr"}>
    <header className="gmd-pal-study__header"><Button className="gmd-pal-study__back" variant="ghost" size="sm" onClick={onBack}><ArrowLeft aria-hidden="true"/><span>{t(locale,{en:"Design studies",ar:"دراسات التصميم"})}</span></Button><a className="gmd-pal-study__wordmark" href="#top">GMD<span>.</span>GDN</a><div className="gmd-pal-study__tools"><span>{t(locale,{en:"DESIGN STUDY / 04",ar:"دراسة تصميم / ٠٤"})}</span><Button variant="outline" size="sm" onClick={onLocaleChange}>{ar?"English":"العربية"}</Button></div></header>
    <section className="gmd-pal-study__hero" id="top"><div className="gmd-pal-study__hero-copy"><p className="gmd-pal-study__eyebrow"><i className="gmd-pal-pixel" aria-hidden="true"/>{t(locale,{en:"A GMD SYSTEM FOR EGYPTIAN KNOWLEDGE",ar:"نظام GMD للمعرفة المصرية"})}</p><h1>{t(locale,{en:"A good system makes knowledge move.",ar:"النظام الجيد يحرّك المعرفة."})}</h1><p className="gmd-pal-study__lead">{t(locale,{en:"We collect Egyptian material, connect it to context, then distribute it for discovery and responsible use.",ar:"نجمع المواد المصرية ونربطها بسياقها، ثم نوزعها للاكتشاف والاستخدام المسؤول."})}</p><a className="gmd-pal-study__jump" href="#capabilities">{t(locale,{en:"Explore the system",ar:"استكشف النظام"})}<ArrowUpRight aria-hidden="true"/></a></div><div className="gmd-pal-study__hero-art"><img src="./assets/eg-013.webp" alt={t(locale,{en:"Printed Arabic film brochure from an Egyptian collection",ar:"كتيب سينمائي مطبوع باللغة العربية من مجموعة مصرية"})}/><span className="gmd-pal-study__art-stamp"><Sparkles aria-hidden="true"/> GMD / CAIRO</span><img className="gmd-pal-study__motif" src="./assets/egyptian-pendant-register.svg" alt="" aria-hidden="true"/></div><div className="gmd-pal-study__hero-index">01 <span>—</span> 03</div></section>
    <div className="gmd-pal-study__trust"><span><Database aria-hidden="true"/>{t(locale,{en:"Sources stay visible",ar:"المصادر تظل واضحة"})}</span><span><Globe2 aria-hidden="true"/>{t(locale,{en:"Made for local context",ar:"مصمم للسياق المحلي"})}</span><span><Menu aria-hidden="true"/>{t(locale,{en:"Useful at every scale",ar:"مفيد على كل نطاق"})}</span></div>
    <section className="gmd-pal-study__statement"><p className="gmd-pal-study__eyebrow">02 / {t(locale,{en:"THE GMD APPROACH",ar:"نهج GMD"})}</p><h2>{t(locale,{en:"Collect carefully. Describe clearly. Share with care.",ar:"نجمع بعناية. نوثق بوضوح. نشارك بمسؤولية."})}</h2><p>{t(locale,{en:"A collection becomes more useful when its records retain who contributed them, where they came from and how they may be used.",ar:"تصبح المجموعة أكثر فائدة حين تحتفظ سجلاتها بمن ساهم بها ومصدرها وكيفية استخدامها."})}</p></section>
    <div id="capabilities"><GMDMediaExplorer locale={locale}/></div>
    <div className="gmd-pal-study__grid-wrap"><GMDCapabilityGrid locale={locale}/></div>
    <footer className="gmd-pal-study__footer"><a className="gmd-pal-study__wordmark" href="#top">GMD<span>.</span>GDN</a><p>{t(locale,{en:"Egyptian knowledge, held with care.",ar:"المعرفة المصرية، بعناية."})}</p><span>CAIRO · 2026</span></footer>
  </main>
}
