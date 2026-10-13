import { useEffect, useRef, useState } from "react"
import {
  ArrowDownLeft, ArrowLeft, ArrowUpRight, Check,
  Compass, Database, Globe2, Layers3, Menu, Search, Sparkles
} from "lucide-react"
import { DirectionProvider } from "@/components/ui/direction"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import "./showcase.css"
import { Catalog } from "./catalog/Catalog"
import { PagePatterns, type GMDPage } from "./page-patterns/PagePatterns"

type Locale = "en" | "ar"
type View = "home" | "workshop" | "catalog" | "site-home" | GMDPage

const COPY = {
  en: {
    home: "Public home",
    workshop: "Component workshop",
    catalog: "System catalog",
    switchLocale: "العربية",
    menu: "Open menu",
    close: "Close",
    navCompany: "Company",
    navProducts: "Products",
    navServices: "Services",
    navData: "Data",
    navContact: "Contact",
    eyebrow: "GMD / EGYPTIAN KNOWLEDGE COMPANY",
    heroTitle: "A new way into what’s already here.",
    heroLead: "GMD brings Egyptian content and data into clearer view — carefully collected, thoughtfully organized, and made useful for people, research and new products.",
    explore: "Explore the work",
    startInquiry: "Start a conversation",
    note: "An Egyptian company for the long life of useful knowledge.",
    noteLabel: "THE GMD IDEA",
    publicProjects: "A growing body of work",
    publicProjectsIntro: "Different entry points. One shared commitment to context, care and access.",
    active: "ACTIVE PROJECT",
    inBuild: "BUILDING",
    planned: "IN DEVELOPMENT",
    film: "Film",
    filmDesc: "A discovery guide to Egyptian cinema and the people, works and histories around it.",
    kayffa: "Kayffa",
    kayffaDesc: "A cultural archive connecting Egyptian material, people, places and stories.",
    data: "GMD Data",
    dataDesc: "Structured collections prepared for research, publishing and responsible AI use.",
    visitProject: "Visit project",
    readDirection: "Explore direction",
    collections: "A considered way to work with content",
    collectionsIntro: "Good information stays useful when the source, structure and rights travel with it.",
    collect: "Collect with care",
    collectDesc: "Bring scattered Egyptian materials into a legible, sourced collection.",
    organize: "Organize for connection",
    organizeDesc: "Build durable structures around people, works, places and themes.",
    distribute: "Make it findable",
    distributeDesc: "Turn archives and data into helpful public experiences and new tools.",
    aboutLabel: "WHY GMD",
    aboutTitle: "The material deserves a future.",
    aboutCopy: "Egypt holds an extraordinary depth of cultural and practical knowledge. GMD works across archives, media and data to make that material easier to find, understand and use — while keeping its source and context in view.",
    aboutNote: "The aim is not to flatten every collection into the same format. Each project keeps its own audience and character, connected by shared care for the material.",
    services: "What we can build together",
    servicesIntro: "GMD works with cultural organizations, publishers, researchers and businesses that need to bring valuable information into view.",
    serviceOne: "Content and archive systems",
    serviceTwo: "Data portals and research collections",
    serviceThree: "AI-ready datasets with provenance",
    serviceFour: "Digital products and interactive experiences",
    serviceFive: "Publishing and distribution workflows",
    inquiryTitle: "Tell us what you’re trying to make.",
    inquiryCopy: "Share a little context. This prototype validates your draft locally and does not send or store it.",
    inquiryName: "Your name",
    inquiryEmail: "Email address",
    inquiryOrg: "Organization",
    inquiryTopic: "What are you exploring?",
    chooseTopic: "Choose a starting point",
    inquiryMessage: "A little about the work",
    submitInquiry: "Review inquiry",
    cancel: "Cancel",
    required: "Required",
    inquirySuccess: "Your draft is ready.",
    inquirySuccessCopy: "Nothing was sent or saved. GMD’s real inquiry delivery will be connected separately.",
    done: "Done",
    footer: "Egyptian knowledge, held with care.",
    workshopEyebrow: "GMD / SYSTEM LIBRARY",
    workshopTitle: "A working set for useful interfaces.",
    workshopLead: "Real shadcn and Radix components adapted to GMD’s editorial character, bilingual layouts and information-rich products.",
    prototype: "LOCAL PROTOTYPE",
    reference: "SOURCE REFERENCE",
    searchComponents: "Find a component…",
    foundations: "Foundations",
    components: "Components",
    actions: "Actions",
    forms: "Forms",
    structure: "Structure",
    overlays: "Overlays",
    direction: "Direction & language",
    color: "Color roles",
    type: "Type pairing",
    edges: "Edges & depth",
    colorLead: "Ink defines structure. Nile blue carries navigation, focus and confidence. Pink marks the primary invitation.",
    typeLead: "Perfectly Nineties gives the Latin display voice its editorial tone. Source Sans 3 carries interface reading; Mada leads Arabic headings and Amiri supports longer Arabic reading.",
    edgesLead: "Square outlines and clean rules carry the structure. A short, unblurred ink shadow gives active elements a slight physical lift.",
    componentCatalogue: "Component index",
    buttonTitle: "Buttons",
    buttonDesc: "Use one clear primary action. The action pink keeps its identity through hover and press.",
    default: "Default",
    actionPink: "Action pink",
    outline: "Outline",
    secondary: "Secondary",
    ghost: "Quiet",
    destructive: "Destructive",
    disabled: "Disabled",
    loading: "Loading",
    fieldTitle: "Fields",
    fieldDesc: "Visible labels, helpful instructions and errors connected to their controls.",
    collectionName: "Collection name",
    fieldHelp: "Use the public title people will recognize.",
    invalidURL: "Archive URL",
    invalidHelp: "Enter a complete URL, including https://.",
    emailField: "Contact email",
    emailHelp: "Used only for the local form behavior demonstration.",
    notes: "Context note",
    notesHelp: "Keep source and collection context close to the record.",
    selectLabel: "Material type",
    selectPlaceholder: "Choose a material",
    selectOptions: ["Photograph", "Printed work", "Audio recording", "Moving image"],
    recordCard: "Record card",
    recordCardDesc: "A card summary keeps its source and usage status readable.",
    recordTitle: "Cairo street scene, c. 1938",
    recordContext: "Street life near Bab al-Luq. Photographer not identified.",
    source: "Source",
    rights: "Rights",
    publicDescription: "Public description",
    reviewNeeded: "Review needed",
    published: "Published",
    restricted: "Reuse restricted",
    rightsAlert: "Rights need review",
    rightsAlertCopy: "Archive visibility does not grant reuse or model-training permission.",
    progress: "Collection processing",
    ofRecords: "of records",
    accordionTitle: "Disclosure",
    accordionQuestion: "How is a collection sourced?",
    accordionAnswer: "Every item should point to its contributing collection and available acquisition context. Unknown details stay marked as unknown.",
    tabsTitle: "Tabs",
    details: "Details",
    context: "Context",
    connections: "Connections",
    tabBody: ["The record description and primary source.", "Dates, language and editorial notes travel with the item.", "Related people, places, works and events lead to discovery."],
    dialogTitle: "Dialog",
    dialogDesc: "A modal asks for a focused decision and returns keyboard focus to the control that opened it.",
    openDialog: "Open local dialog",
    confirmTitle: "Review this record?",
    confirmCopy: "The record would move to editorial review in a live product. This demo changes no record.",
    confirm: "Confirm demo",
    sheetTitle: "Sheet",
    sheetDesc: "A responsive side panel is useful for focused navigation and short supporting tasks.",
    openSheet: "Open navigation sheet",
    sheetBody: "A compact navigation panel keeps the current task in view.",
    skeletonTitle: "Skeleton",
    skeletonDesc: "A short loading state reserves content space without suggesting a permanent empty state.",
    switchTitle: "Switch",
    switchDesc: "An immediate on/off setting with a label that names the setting.",
    publishToggle: "Visible in public browse",
    language: "Language",
    sampleArabic: "كل أثر له حكاية",
    sampleArabicNote: "Arabic specimen · Mada heading · Amiri reading",
    demoNotice: "Prototype interaction only. Nothing sent, stored or published.",
    openHome: "Open public homepage",
    stableId: "STABLE REFERENCE",
    copies: "Copy example"
  },
  ar: {
    home: "الصفحة العامة",
    workshop: "ورشة المكوّنات",
    catalog: "فهرس النظام",
    switchLocale: "English",
    menu: "افتح القائمة",
    close: "إغلاق",
    navCompany: "عن الشركة",
    navProducts: "المنتجات",
    navServices: "الخدمات",
    navData: "البيانات",
    navContact: "تواصل",
    eyebrow: "GMD / شركة معرفة مصرية",
    heroTitle: "مدخل جديد إلى ما هو موجود بالفعل.",
    heroLead: "تُظهر GMD المحتوى والبيانات المصرية بوضوح أكبر؛ نجمعها بعناية، وننظمها بفكر، ونجعلها مفيدة للناس والبحث والمنتجات الجديدة.",
    explore: "اكتشف العمل",
    startInquiry: "ابدأ حوارًا",
    note: "شركة مصرية تمنح المعرفة المفيدة عمرًا أطول.",
    noteLabel: "فكرة GMD",
    publicProjects: "عمل يتسع باستمرار",
    publicProjectsIntro: "مداخل مختلفة، يجمعها الاهتمام بالسياق والعناية وإتاحة المعرفة.",
    active: "مشروع نشط",
    inBuild: "قيد البناء",
    planned: "قيد التطوير",
    film: "فيلم",
    filmDesc: "دليل لاكتشاف السينما المصرية والأعمال وصنّاعها وتاريخها.",
    kayffa: "كيفا",
    kayffaDesc: "أرشيف ثقافي يربط المواد المصرية بالأشخاص والأماكن والحكايات.",
    data: "بيانات GMD",
    dataDesc: "مجموعات منظمة للبحث والنشر والاستخدام المسؤول في الذكاء الاصطناعي.",
    visitProject: "اكتشف المشروع",
    readDirection: "استكشف الفكرة",
    collections: "طريقة مدروسة للعمل مع المحتوى",
    collectionsIntro: "تظل المعلومات مفيدة عندما يبقى المصدر والبنية والحقوق مرتبطة بها.",
    collect: "نجمع بعناية",
    collectDesc: "نضم المواد المصرية المتفرقة في مجموعات واضحة ومعروفة المصدر.",
    organize: "ننظم لنبني الروابط",
    organizeDesc: "نبني بنية مستدامة حول الأشخاص والأعمال والأماكن والموضوعات.",
    distribute: "نجعل المعرفة أقرب",
    distributeDesc: "نحوّل الأرشيفات والبيانات إلى تجارب عامة وأدوات نافعة.",
    aboutLabel: "لماذا GMD",
    aboutTitle: "المادة تستحق مستقبلًا.",
    aboutCopy: "تحتفظ مصر بعمق استثنائي من المعرفة الثقافية والعملية. تعمل GMD عبر الأرشيفات والإعلام والبيانات لتجعل هذه المادة أسهل في البحث والفهم والاستخدام، مع إبقاء مصدرها وسياقها واضحين.",
    aboutNote: "لا نختزل كل مجموعة في قالب واحد. لكل مشروع جمهوره وشخصيته، وتجمعها عناية مشتركة بالمادة.",
    services: "ما يمكننا بناؤه معًا",
    servicesIntro: "نعمل مع المؤسسات الثقافية والناشرين والباحثين والشركات التي تريد إظهار معلوماتها القيّمة.",
    serviceOne: "أنظمة المحتوى والأرشيف",
    serviceTwo: "بوابات بيانات ومجموعات بحثية",
    serviceThree: "مجموعات بيانات موثّقة وجاهزة للذكاء الاصطناعي",
    serviceFour: "منتجات رقمية وتجارب تفاعلية",
    serviceFive: "مسارات للنشر والتوزيع",
    inquiryTitle: "أخبرنا بما تريد إنجازه.",
    inquiryCopy: "شاركنا بعض السياق. يتحقق هذا النموذج من المسودة محليًا ولا يرسلها أو يحفظها.",
    inquiryName: "الاسم",
    inquiryEmail: "البريد الإلكتروني",
    inquiryOrg: "المؤسسة",
    inquiryTopic: "ما المجال الذي تستكشفه؟",
    chooseTopic: "اختر نقطة بداية",
    inquiryMessage: "نبذة عن العمل",
    submitInquiry: "مراجعة الاستفسار",
    cancel: "إلغاء",
    required: "مطلوب",
    inquirySuccess: "المسودة جاهزة.",
    inquirySuccessCopy: "لم يُرسل شيء ولم يُحفظ. سيُربط إرسال الاستفسارات الفعلي لاحقًا.",
    done: "تم",
    footer: "المعرفة المصرية، بعناية.",
    workshopEyebrow: "GMD / مكتبة النظام",
    workshopTitle: "مجموعة عملية لواجهات نافعة.",
    workshopLead: "مكوّنات shadcn وRadix حقيقية، مُكيّفة مع الطابع التحريري لـGMD والواجهات ثنائية اللغة والمنتجات الغنية بالمعلومات.",
    prototype: "نموذج محلي",
    reference: "مرجع المصدر",
    searchComponents: "ابحث عن مكوّن…",
    foundations: "الأسس",
    components: "المكوّنات",
    actions: "الإجراءات",
    forms: "النماذج",
    structure: "البنية",
    overlays: "النوافذ",
    direction: "الاتجاه واللغة",
    color: "أدوار الألوان",
    type: "التوليفة الطباعية",
    edges: "الحواف والعمق",
    colorLead: "يبني الحبر الهيكل. يحمل الأزرق النيلي التنقل والتركيز والثقة، ويحدد الوردي الدعوة الأساسية.",
    typeLead: "يمنح Perfectly Nineties العناوين اللاتينية طابعًا تحريريًا. يحمل Source Sans 3 نصوص الواجهة، وتتقدم Mada العناوين العربية ويدعمها Amiri في القراءة الطويلة.",
    edgesLead: "تُظهر الحدود المربعة والخطوط الواضحة بنية المحتوى. ويمنح الظل القصير بلا تمويه العناصر النشطة ارتفاعًا بسيطًا.",
    componentCatalogue: "فهرس المكوّنات",
    buttonTitle: "الأزرار",
    buttonDesc: "استخدم إجراءً أساسيًا واحدًا واضحًا. يحافظ الوردي على حضوره عند المرور والضغط.",
    default: "أساسي",
    actionPink: "وردي الإجراء",
    outline: "محدد",
    secondary: "ثانوي",
    ghost: "هادئ",
    destructive: "تحذيري",
    disabled: "معطّل",
    loading: "جارٍ التحميل",
    fieldTitle: "الحقول",
    fieldDesc: "تسميات ظاهرة، وتعليمات مفيدة، ورسائل خطأ مرتبطة بعناصر التحكم.",
    collectionName: "اسم المجموعة",
    fieldHelp: "استخدم الاسم العلني الذي سيتعرف عليه الزوار.",
    invalidURL: "رابط الأرشيف",
    invalidHelp: "أدخل رابطًا كاملًا يبدأ بـ https://.",
    emailField: "بريد التواصل",
    emailHelp: "لشرح سلوك النموذج المحلي فقط.",
    notes: "ملاحظة سياقية",
    notesHelp: "أبقِ المصدر وسياق المجموعة قريبين من السجل.",
    selectLabel: "نوع المادة",
    selectPlaceholder: "اختر نوع المادة",
    selectOptions: ["صورة فوتوغرافية", "عمل مطبوع", "تسجيل صوتي", "فيلم"],
    recordCard: "بطاقة سجل",
    recordCardDesc: "تلخص البطاقة السجل وتُبقي مصدره وحالة استخدامه واضحة.",
    recordTitle: "مشهد من القاهرة، نحو ١٩٣٨",
    recordContext: "حياة الشارع قرب باب اللوق. المصور غير معروف.",
    source: "المصدر",
    rights: "الحقوق",
    publicDescription: "وصف علني",
    reviewNeeded: "تحتاج مراجعة",
    published: "منشور",
    restricted: "إعادة الاستخدام مقيّدة",
    rightsAlert: "تحتاج الحقوق إلى مراجعة",
    rightsAlertCopy: "ظهور المادة في الأرشيف لا يمنح حق إعادة استخدامها أو تدريب النماذج عليها.",
    progress: "معالجة المجموعة",
    ofRecords: "من السجلات",
    accordionTitle: "إفصاح",
    accordionQuestion: "كيف نعرف مصدر المجموعة؟",
    accordionAnswer: "يشير كل عنصر إلى المجموعة المساهمة وسياق الاقتناء المتاح. ونوضح التفاصيل غير المعروفة كما هي.",
    tabsTitle: "علامات التبويب",
    details: "التفاصيل",
    context: "السياق",
    connections: "الروابط",
    tabBody: ["وصف السجل ومصدره الأساسي.", "تبقى التواريخ واللغة والملاحظات التحريرية مرتبطة بالمادة.", "تساعد صلات الأشخاص والأماكن والأعمال والأحداث على الاكتشاف."],
    dialogTitle: "نافذة حوار",
    dialogDesc: "تساعد النافذة المنبثقة على اتخاذ قرار محدد، ثم تعيد تركيز لوحة المفاتيح إلى زر الفتح.",
    openDialog: "افتح حوارًا محليًا",
    confirmTitle: "هل نراجع هذا السجل؟",
    confirmCopy: "في المنتج الفعلي ينتقل السجل للمراجعة التحريرية. لا يغيّر هذا النموذج أي سجل.",
    confirm: "تأكيد النموذج",
    sheetTitle: "لوحة جانبية",
    sheetDesc: "تفيد اللوحة الجانبية المتجاوبة في التنقل المركّز والمهام القصيرة.",
    openSheet: "افتح لوحة التنقل",
    sheetBody: "تُبقي لوحة التنقل المدمجة المهمة الحالية واضحة.",
    skeletonTitle: "هيكل تحميل",
    skeletonDesc: "يحجز التحميل المؤقت مساحة المحتوى، ولا يوحي بحالة فراغ دائمة.",
    switchTitle: "مفتاح",
    switchDesc: "إعداد فوري للتشغيل والإيقاف، مع تسمية تصف الإعداد.",
    publishToggle: "ظاهر في التصفح العام",
    language: "اللغة",
    sampleArabic: "كل أثر له حكاية",
    sampleArabicNote: "عينة عربية · عنوان Mada · قراءة Amiri",
    demoNotice: "تفاعل تجريبي فقط. لم يُرسل أو يُحفظ أو يُنشر شيء.",
    openHome: "افتح الصفحة العامة",
    stableId: "مرجع ثابت",
    copies: "انسخ المثال"
  }
} as const

const referenceBase = import.meta.env.VITE_GMD_REFERENCE_BASE ?? "http://127.0.0.1:8766/design-system-v0.05/integration/ui-templates/gmd"
const productHrefs = {
  film: `${referenceBase}/products.html#film`,
  kayffa: `${referenceBase}/products.html#kayffa`,
  data: `${referenceBase}/data.html`,
  services: `${referenceBase}/services.html`,
  contact: `${referenceBase}/contact.html`
}

type CopyShape = typeof COPY.en
type C = { [K in keyof CopyShape]: CopyShape[K] extends readonly string[] ? readonly string[] : string }

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`

function SectionLabel({ children, index }: { children: React.ReactNode; index: string }) {
  return <div className="gmd-section-label"><span>{index}</span><span>{children}</span><i /></div>
}

function ComponentMeta({ id, status }: { id: string; status: string }) {
  return <div className="gmd-component-meta"><span>{id}</span><span className="gmd-status">{status}</span></div>
}

function CopySnippet({ children, c }: { children: string; c: C }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }
  return <div className="gmd-code"><pre><code>{children}</code></pre><Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check aria-hidden="true" /> : null}{copied ? (c.copies === "Copy example" ? "Copied" : "تم النسخ") : c.copies}</Button></div>
}

function PublicPage({ c, locale, onInquiry }: { c: C; locale: Locale; onInquiry: () => void }) {
  const serviceItems = [c.serviceOne, c.serviceTwo, c.serviceThree, c.serviceFour, c.serviceFive]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuOpener = useRef<HTMLElement | null>(null)
  return <div className="gmd-public" id="home">
    <header className="gmd-public-header">
      <a className="gmd-wordmark" href="#home" aria-label="GMD home"><span className="gmd-glyph" aria-hidden="true"><i /><i /><b /></span><span>GMD<span>.</span>GDN</span></a>
      <nav className="gmd-public-nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
        <a href="#company">{c.navCompany}</a><a href="#products">{c.navProducts}</a><a href="#services">{c.navServices}</a><a href="#data">{c.navData}</a>
      </nav>
      <div className="gmd-header-actions"><Button variant="outline" size="sm" className="gmd-locale" onClick={() => window.dispatchEvent(new CustomEvent("gmd:toggle-locale"))}>{c.switchLocale}</Button><Button size="sm" className="gmd-mobile-menu-trigger" aria-label={c.menu} onClick={event => { mobileMenuOpener.current = event.currentTarget; setMobileMenuOpen(true) }}><Menu aria-hidden="true" /></Button><Button size="sm" className="gmd-header-cta" onClick={onInquiry}>{c.startInquiry}<ArrowUpRight aria-hidden="true" /></Button></div>
    </header>
    <main>
      <section className="gmd-home-hero">
        <div className="gmd-hero-copy"><SectionLabel index="01">{c.eyebrow}</SectionLabel><h1>{c.heroTitle}</h1><p className="gmd-hero-lead">{c.heroLead}</p><div className="gmd-hero-buttons"><Button size="lg" asChild><a href="#products">{c.explore}<ArrowDownLeft aria-hidden="true" /></a></Button><Button variant="link" onClick={onInquiry}>{c.startInquiry}<ArrowUpRight aria-hidden="true" /></Button></div><div className="gmd-hero-foot"><span>30°02′N / 31°14′E</span><span>COLLECT · CONNECT · SHARE</span></div></div>
        <div className="gmd-hero-visual"><div className="gmd-hero-index"><span>GMD / FIELD NOTE 001</span><span>CAIRO</span></div><div className="gmd-hero-frame"><img src={asset("eg-036.png")} alt={locale === "ar" ? "مشهد للقاهرة من خلال شبكة نافذة" : "Cairo seen through a window lattice"} /><div className="gmd-image-caption"><span>EGYPT / EVERYDAY ARCHIVE</span><span>01—06</span></div></div><div className="gmd-door-pair"><img src={asset("col1-door-01.png")} alt="" /><img src={asset("col1-door-02.png")} alt="" /></div></div>
      </section>
      <section className="gmd-principle-band"><span>{c.noteLabel}</span><p>{c.note}</p><span className="gmd-band-mark">G / 01</span></section>
      <section className="gmd-page-section" id="products"><div className="gmd-section-intro"><SectionLabel index="02">{c.publicProjects}</SectionLabel><h2>{c.publicProjects}</h2><p>{c.publicProjectsIntro}</p></div><div className="gmd-product-grid">
        <Card className="gmd-product-card gmd-product-film"><div className="gmd-product-image"><img src={asset("eg-026.jpg")} alt={locale === "ar" ? "مشهد عائلي من أرشيف مصور" : "A family scene from a photographic archive"} /><span className="gmd-card-index">01 / FILM</span><span className="gmd-image-stamp">CINEMA<br />&amp; PEOPLE</span></div><CardHeader><div className="gmd-product-title"><CardTitle>{c.film}</CardTitle><Badge className="gmd-badge-active">{c.active}</Badge></div><CardDescription>{c.filmDesc}</CardDescription></CardHeader><CardFooter className="gmd-product-footer"><a href={productHrefs.film}>{c.visitProject}<ArrowUpRight aria-hidden="true" /></a><span>film.gmd.gdn</span></CardFooter></Card>
        <Card className="gmd-product-card gmd-product-kayffa"><div className="gmd-product-image"><img src={asset("eg-013.webp")} alt={locale === "ar" ? "كتيّب مصري محفوظ ضمن مجموعة ثقافية" : "An Egyptian brochure held in a cultural collection"} /><span className="gmd-card-index">02 / KAYFFA</span><span className="gmd-image-stamp">CULTURE<br />&amp; MEMORY</span></div><CardHeader><div className="gmd-product-title"><CardTitle>{c.kayffa}</CardTitle><Badge variant="outline" className="gmd-badge-build">{c.inBuild}</Badge></div><CardDescription>{c.kayffaDesc}</CardDescription></CardHeader><CardFooter className="gmd-product-footer"><a href={productHrefs.kayffa}>{c.visitProject}<ArrowUpRight aria-hidden="true" /></a><span>ARCHIVE / GRAPH</span></CardFooter></Card>
        <Card className="gmd-product-card gmd-product-data"><div className="gmd-data-graphic"><div className="gmd-data-graphic-inner"><Database aria-hidden="true" /><span>EG / DATA</span><b>01—∞</b><i className="gmd-grid-cross" /></div><span className="gmd-card-index">03 / DATA</span></div><CardHeader><div className="gmd-product-title"><CardTitle>{c.data}</CardTitle><Badge variant="secondary" className="gmd-badge-planned">{c.planned}</Badge></div><CardDescription>{c.dataDesc}</CardDescription></CardHeader><CardFooter className="gmd-product-footer"><a href={productHrefs.data}>{c.readDirection}<ArrowUpRight aria-hidden="true" /></a><span>COLLECTIONS / AI</span></CardFooter></Card>
      </div></section>
      <section className="gmd-process-section"><div className="gmd-process-heading"><SectionLabel index="03">{c.collections}</SectionLabel><h2>{c.collections}</h2><p>{c.collectionsIntro}</p></div><div className="gmd-process-steps"><article><span>01</span><div><h3>{c.collect}</h3><p>{c.collectDesc}</p></div><Compass aria-hidden="true" /></article><article><span>02</span><div><h3>{c.organize}</h3><p>{c.organizeDesc}</p></div><Layers3 aria-hidden="true" /></article><article><span>03</span><div><h3>{c.distribute}</h3><p>{c.distributeDesc}</p></div><Globe2 aria-hidden="true" /></article></div></section>
      <section className="gmd-about-section" id="company"><div className="gmd-about-image"><img src={asset("col1-community-heart.jpg")} alt={locale === "ar" ? "رسم توضيحي لمجتمع يلتقي حول معرفة مشتركة" : "Illustration of a community gathering around shared knowledge"} /><span>COLLECTIVE MEMORY / SHARED FUTURE</span></div><div className="gmd-about-copy"><SectionLabel index="04">{c.aboutLabel}</SectionLabel><h2>{c.aboutTitle}</h2><p>{c.aboutCopy}</p><blockquote>{c.aboutNote}</blockquote><Button variant="link" asChild><a href={productHrefs.services}>{c.navServices}<ArrowUpRight aria-hidden="true" /></a></Button></div></section>
      <section className="gmd-services-section" id="services"><div><SectionLabel index="05">{c.navServices}</SectionLabel><h2>{c.services}</h2><p>{c.servicesIntro}</p></div><div className="gmd-service-list">{serviceItems.map((item, index) => <a href={productHrefs.services} key={item}><span>0{index + 1}</span><b>{item}</b><ArrowUpRight aria-hidden="true" /></a>)}</div></section>
      <section className="gmd-data-section" id="data"><div className="gmd-data-copy"><SectionLabel index="06">{c.navData}</SectionLabel><h2>{c.data}</h2><p>{c.dataDesc}</p><div className="gmd-data-flags"><span><Check aria-hidden="true" />{c.source}</span><span><Check aria-hidden="true" />{c.rights}</span><span><Check aria-hidden="true" />{c.connections}</span></div><Button variant="outline" asChild><a href={productHrefs.data}>{c.readDirection}<ArrowUpRight aria-hidden="true" /></a></Button></div><div className="gmd-data-window"><div className="gmd-data-window-bar"><span>GMD / DATA REGISTER</span><span>NO. 024</span></div><div className="gmd-data-window-grid"><span>COLLECTION</span><strong>EG—CULTURE—01</strong><span>LANGUAGES</span><strong>AR / EN / FR</strong><span>SOURCE</span><strong>DOCUMENTED</strong><span>AI USE</span><strong>REVIEWED SEPARATELY</strong></div><div className="gmd-data-window-foot"><span>SOURCE → STRUCTURE → EXPERIENCE</span><span>↗</span></div></div></section>
      <section className="gmd-inquiry-band" id="contact"><div><SectionLabel index="07">{c.navContact}</SectionLabel><h2>{c.inquiryTitle}</h2><p>{c.inquiryCopy}</p></div><Button size="lg" onClick={onInquiry}>{c.startInquiry}<ArrowUpRight aria-hidden="true" /></Button></section>
    </main>
    <footer className="gmd-public-footer"><a className="gmd-wordmark" href="#home"><span>GMD<span>.</span>GDN</span></a><span>{c.footer}</span><div><a href={productHrefs.film}>Film</a><a href={productHrefs.kayffa}>Kayffa</a><a href={productHrefs.contact}>{c.navContact}</a></div><small>© GMD · CAIRO</small></footer>
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}><SheetContent closeLabel={c.close} onCloseAutoFocus={event => { if (mobileMenuOpener.current?.isConnected) { event.preventDefault(); mobileMenuOpener.current.focus() } }} side={locale === "ar" ? "right" : "left"} dir={locale === "ar" ? "rtl" : "ltr"}><SheetHeader><SheetTitle>{c.menu}</SheetTitle></SheetHeader><nav className="gmd-sheet-links"><a href="#company" onClick={() => setMobileMenuOpen(false)}>{c.navCompany}</a><a href="#products" onClick={() => setMobileMenuOpen(false)}>{c.navProducts}</a><a href="#services" onClick={() => setMobileMenuOpen(false)}>{c.navServices}</a><a href="#data" onClick={() => setMobileMenuOpen(false)}>{c.navData}</a></nav></SheetContent></Sheet>
  </div>
}

function Workshop({ c, locale, onInquiry, notify }: { c: C; locale: Locale; onInquiry: () => void; notify: (text: string) => void }) {
  const [query, setQuery] = useState("")
  const items = [
    ["buttons","Buttons / الأزرار","cmp-action-button"],["fields","Fields / الحقول","cmp-field"],["record","Record card / بطاقة سجل","cmp-record-card"],["feedback","Alerts & states / التنبيهات","cmp-feedback"],["disclosure","Accordion / الإفصاح","cmp-accordion"],["tabs","Tabs / علامات التبويب","cmp-tabs"],["overlays","Dialog & sheet / النوافذ","cmp-overlays"],["direction","Direction / الاتجاه","cmp-direction"]
  ]
  const visibleItems = items.filter(item => item[1].toLocaleLowerCase().includes(query.toLocaleLowerCase()) || item[2].toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  const [step, setStep] = useState(3)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sampleToggle, setSampleToggle] = useState(true)
  const dialogOpener = useRef<HTMLElement | null>(null)
  const sheetOpener = useRef<HTMLElement | null>(null)
  return <div className="gmd-workshop-shell">
    <aside className="gmd-workshop-sidebar"><a className="gmd-workshop-back" href="#home" onClick={event => { event.preventDefault(); window.dispatchEvent(new CustomEvent("gmd:set-view",{detail:"home"})) }}><ArrowLeft aria-hidden="true" />{c.openHome}</a><span className="gmd-side-kicker">{c.componentCatalogue}</span><label className="gmd-workshop-search"><Search aria-hidden="true" /><input aria-label={c.searchComponents} value={query} onChange={event => setQuery(event.target.value)} placeholder={c.searchComponents} /></label><nav aria-label={locale === "ar" ? "أقسام المكوّنات" : "Component sections"}>{visibleItems.map((item,index) => <a href={"#"+item[0]} key={item[0]}><span>0{index+1}</span>{item[1]}</a>)}</nav><div className="gmd-workshop-sidebar-foot"><span className="gmd-live-dot" />{c.prototype}</div></aside>
    <div className="gmd-workshop-content">
      <header className="gmd-workshop-top"><SectionLabel index="GMD / 0.05">{c.workshopEyebrow}</SectionLabel><div><Button variant="outline" size="sm" onClick={event => { sheetOpener.current = event.currentTarget; setSheetOpen(true) }}><Menu aria-hidden="true" />{c.openSheet}</Button><Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent("gmd:toggle-locale"))}>{c.switchLocale}</Button><Button size="sm" onClick={onInquiry}>{c.startInquiry}</Button></div></header>
      <main className="gmd-workshop-main">
        <section className="gmd-workshop-hero"><Badge className="gmd-badge-build">{c.prototype}</Badge><h1>{c.workshopTitle}</h1><p>{c.workshopLead}</p><p className="gmd-reference-note"><span />{c.demoNotice}</p></section>
        <section className="gmd-foundations-lab" id="foundations"><SectionLabel index="01">{c.foundations}</SectionLabel><div className="gmd-foundation-lab-grid">
          <Card className="gmd-lab-card"><CardHeader><CardTitle>{c.color}</CardTitle><CardDescription>{c.colorLead}</CardDescription></CardHeader><CardContent><div className="gmd-color-ramp"><span style={{background:"#140206"}}>INK <small>#140206</small></span><span style={{background:"#f7f4ef"}}>PAPER <small>#F7F4EF</small></span><span style={{background:"#1034a6",color:"white"}}>NILE <small>#1034A6</small></span><span style={{background:"#ff6183"}}>ACTION <small>#FF6183</small></span></div></CardContent></Card>
          <Card className="gmd-lab-card"><CardHeader><CardTitle>{c.type}</CardTitle><CardDescription>{c.typeLead}</CardDescription></CardHeader><CardContent><div className="gmd-type-pair"><span>Knowledge / collection / archive</span><strong lang="ar" dir="rtl">{c.sampleArabic}</strong></div><small className="gmd-inline-note">{c.sampleArabicNote}</small></CardContent></Card>
          <Card className="gmd-lab-card"><CardHeader><CardTitle>{c.edges}</CardTitle><CardDescription>{c.edgesLead}</CardDescription></CardHeader><CardContent><div className="gmd-depth-spec"><span>DEFAULT <i /></span><span>HOVER <i /></span><span>PRESSED <i /></span></div></CardContent></Card>
        </div></section>
        <section className="gmd-component-section" id="components"><div className="gmd-component-heading"><SectionLabel index="02">{c.components}</SectionLabel><div><h2>{c.components}</h2><p>{c.componentCatalogue} · {locale === "ar" ? "كل مثال تفاعلي محلي" : "Every example is an interactive local prototype"}</p></div></div>
          <div className="gmd-workshop-grid">
            <Card className="gmd-showcase-card" id="buttons"><CardHeader><ComponentMeta id="ACT / 01 · cmp-action-button" status={c.stableId} /><CardTitle>{c.buttonTitle}</CardTitle><CardDescription>{c.buttonDesc}</CardDescription></CardHeader><CardContent><div className="gmd-button-matrix"><Button onClick={() => notify(c.demoNotice)}>{c.default}</Button><Button onClick={() => notify(c.demoNotice)}>{c.actionPink}</Button><Button variant="outline">{c.outline}</Button><Button variant="secondary">{c.secondary}</Button><Button variant="ghost">{c.ghost}</Button><Button variant="destructive">{c.destructive}</Button><Button size="sm">{c.default} · S</Button><Button size="lg">{c.default} · L</Button><Button disabled>{c.disabled}</Button><Button disabled><Sparkles aria-hidden="true" />{c.loading}</Button></div><CopySnippet c={c}>{'<Button>Save record</Button>'}</CopySnippet></CardContent></Card>
            <Card className="gmd-showcase-card" id="fields"><CardHeader><ComponentMeta id="FRM / 01 · cmp-field" status={c.stableId} /><CardTitle>{c.fieldTitle}</CardTitle><CardDescription>{c.fieldDesc}</CardDescription></CardHeader><CardContent><FieldGroup><FieldSet><Field><FieldLabel htmlFor="demo-name">{c.collectionName}</FieldLabel><Input id="demo-name" defaultValue={locale === "ar" ? "أرشيف صور القاهرة" : "Cairo street photography"} aria-describedby="demo-name-help" /><FieldDescription id="demo-name-help">{c.fieldHelp}</FieldDescription></Field><Field data-invalid="true"><FieldLabel htmlFor="demo-url">{c.invalidURL}</FieldLabel><Input id="demo-url" aria-invalid="true" defaultValue="ht:/archive" aria-describedby="demo-url-error" /><FieldError id="demo-url-error">{c.invalidHelp}</FieldError></Field><Field><FieldLabel htmlFor="demo-email">{c.emailField}</FieldLabel><Input id="demo-email" type="email" placeholder="name@example.com" /><FieldDescription>{c.emailHelp}</FieldDescription></Field><Field><FieldLabel htmlFor="demo-notes">{c.notes}</FieldLabel><Textarea id="demo-notes" placeholder={c.notesHelp} rows={3} /><FieldDescription>{c.notesHelp}</FieldDescription></Field><Field><FieldLabel htmlFor="demo-kind">{c.selectLabel}</FieldLabel><Select defaultValue=""><SelectTrigger id="demo-kind"><SelectValue placeholder={c.selectPlaceholder} /></SelectTrigger><SelectContent><SelectGroup>{c.selectOptions.map(option => <SelectItem value={option} key={option}>{option}</SelectItem>)}</SelectGroup></SelectContent></Select></Field></FieldSet></FieldGroup></CardContent></Card>
            <Card className="gmd-showcase-card" id="record"><CardHeader><ComponentMeta id="DAT / 01 · cmp-record-card" status={c.stableId} /><CardTitle>{c.recordCard}</CardTitle><CardDescription>{c.recordCardDesc}</CardDescription></CardHeader><CardContent><Card className="gmd-record-card"><CardHeader><div className="gmd-record-card-row"><Badge variant="outline">PHOTOGRAPH / 1938</Badge><span>KAY—1938—0042</span></div><CardTitle>{c.recordTitle}</CardTitle><CardDescription>{c.recordContext}</CardDescription></CardHeader><CardContent><Separator /><dl><div><dt>{c.source}</dt><dd>Family collection, Cairo</dd></div><div><dt>{c.rights}</dt><dd><Badge variant="secondary" className="gmd-badge-review">{c.reviewNeeded}</Badge></dd></div><div><dt>{c.language}</dt><dd>AR / EN</dd></div><div><dt>{c.components}</dt><dd>{c.publicDescription}</dd></div></dl></CardContent><CardFooter><a href="#data" className="gmd-card-link">{c.explore}<ArrowUpRight aria-hidden="true" /></a></CardFooter></Card></CardContent></Card>
            <Card className="gmd-showcase-card" id="feedback"><CardHeader><ComponentMeta id="FDB / 01 · cmp-feedback" status={c.stableId} /><CardTitle>Badges, alerts &amp; progress</CardTitle><CardDescription>Semantic state uses labels and icons alongside color.</CardDescription></CardHeader><CardContent><div className="gmd-badge-row"><Badge className="gmd-badge-active"><Check aria-hidden="true" />{c.published}</Badge><Badge variant="secondary" className="gmd-badge-review">● {c.reviewNeeded}</Badge><Badge variant="destructive" className="gmd-badge-restricted">{c.restricted}</Badge><Badge variant="outline">PHOTOGRAPH</Badge></div><Alert className="gmd-rights-alert"><AlertTitle><Database aria-hidden="true" />{c.rightsAlert}</AlertTitle><AlertDescription>{c.rightsAlertCopy}</AlertDescription></Alert><div className="gmd-progress-demo"><div><Label htmlFor="collection-progress">{c.progress}</Label><span>{step*20}%</span></div><progress id="collection-progress" max={100} value={step*20} /><Button variant="link" size="sm" onClick={() => setStep(current => current >= 5 ? 1 : current+1)}>{locale === "ar" ? "تقدّم بالنموذج" : "Advance local demo"}</Button></div></CardContent></Card>
            <Card className="gmd-showcase-card" id="disclosure"><CardHeader><ComponentMeta id="NAV / 01 · cmp-accordion" status={c.stableId} /><CardTitle>{c.accordionTitle}</CardTitle><CardDescription>Radix Accordion · keyboard and screen-reader behavior supplied by the primitive.</CardDescription></CardHeader><CardContent><Accordion type="single" collapsible className="gmd-accordion"><AccordionItem value="source"><AccordionTrigger>{c.accordionQuestion}</AccordionTrigger><AccordionContent>{c.accordionAnswer}</AccordionContent></AccordionItem><AccordionItem value="reuse"><AccordionTrigger>{c.rightsAlert}</AccordionTrigger><AccordionContent>{c.rightsAlertCopy}</AccordionContent></AccordionItem></Accordion></CardContent></Card>
            <Card className="gmd-showcase-card" id="tabs"><CardHeader><ComponentMeta id="NAV / 02 · cmp-tabs" status={c.stableId} /><CardTitle>{c.tabsTitle}</CardTitle><CardDescription>Radix Tabs · arrow-key movement follows the current writing direction.</CardDescription></CardHeader><CardContent><Tabs defaultValue="details" dir={locale === "ar" ? "rtl" : "ltr"}><TabsList variant="line" className="gmd-tabs-list"><TabsTrigger value="details">{c.details}</TabsTrigger><TabsTrigger value="context">{c.context}</TabsTrigger><TabsTrigger value="connections">{c.connections}</TabsTrigger></TabsList><TabsContent value="details">{c.tabBody[0]}</TabsContent><TabsContent value="context">{c.tabBody[1]}</TabsContent><TabsContent value="connections">{c.tabBody[2]}</TabsContent></Tabs></CardContent></Card>
            <Card className="gmd-showcase-card" id="overlays"><CardHeader><ComponentMeta id="OVL / 01 · cmp-overlays" status={c.stableId} /><CardTitle>{c.dialogTitle} &amp; {c.sheetTitle}</CardTitle><CardDescription>{c.dialogDesc}</CardDescription></CardHeader><CardContent><div className="gmd-overlay-actions"><Button onClick={event => { dialogOpener.current = event.currentTarget; setDialogOpen(true) }}>{c.openDialog}</Button><Button variant="outline" onClick={event => { sheetOpener.current = event.currentTarget; setSheetOpen(true) }}>{c.openSheet}</Button></div><Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent closeLabel={c.close} onCloseAutoFocus={event => { if (dialogOpener.current?.isConnected) { event.preventDefault(); dialogOpener.current.focus() } }} dir={locale === "ar" ? "rtl" : "ltr"}><DialogHeader><DialogTitle>{c.confirmTitle}</DialogTitle><DialogDescription>{c.confirmCopy}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>{c.cancel}</Button><Button onClick={() => { setDialogOpen(false); notify(c.demoNotice) }}>{c.confirm}</Button></DialogFooter></DialogContent></Dialog></CardContent></Card>
            <Card className="gmd-showcase-card" id="direction"><CardHeader><ComponentMeta id="SYS / 01 · cmp-direction" status={c.stableId} /><CardTitle>{c.direction}</CardTitle><CardDescription>DirectionProvider and document dir are changed together; the component examples below remain individually labeled.</CardDescription></CardHeader><CardContent><div className="gmd-direction-panel" dir={locale === "ar" ? "rtl" : "ltr"}><div><span>{c.language}</span><b>{locale === "ar" ? "العربية · RTL" : "English · LTR"}</b></div><Separator orientation="vertical" /><div><span>{c.sampleArabicNote}</span><strong lang="ar" dir="rtl">{c.sampleArabic}</strong></div></div></CardContent></Card>
            <Card className="gmd-showcase-card" id="loading"><CardHeader><ComponentMeta id="FDB / 02 · cmp-loading" status={c.stableId} /><CardTitle>{c.skeletonTitle} &amp; {c.switchTitle}</CardTitle><CardDescription>{c.skeletonDesc}</CardDescription></CardHeader><CardContent><div className="gmd-skeleton-demo"><Skeleton className="gmd-skeleton-thumb" /><div><Skeleton className="gmd-skeleton-line" /><Skeleton className="gmd-skeleton-line gmd-short" /><Skeleton className="gmd-skeleton-line gmd-shorter" /></div></div><div className="gmd-switch-line"><div><b>{c.publishToggle}</b><small>{c.switchDesc}</small></div><Switch checked={sampleToggle} onCheckedChange={setSampleToggle} aria-label={c.publishToggle} /></div><p className="gmd-demo-status" role="status">{sampleToggle ? c.published : c.disabled} · {c.demoNotice}</p></CardContent></Card>
          </div>
        </section>
        <section className="gmd-workshop-cta"><div><SectionLabel index="03">{c.navContact}</SectionLabel><h2>{c.inquiryTitle}</h2><p>{c.inquiryCopy}</p></div><Button onClick={onInquiry}>{c.startInquiry}<ArrowUpRight aria-hidden="true" /></Button></section>
        <footer className="gmd-workshop-footer"><span>GMD UI / 0.05</span><span>{c.prototype} · No backend actions</span><button onClick={() => window.dispatchEvent(new CustomEvent("gmd:set-view",{detail:"home"}))}>{c.home} ↗</button></footer>
      </main>
    </div>
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}><SheetContent closeLabel={c.close} onCloseAutoFocus={event => { if (sheetOpener.current?.isConnected) { event.preventDefault(); sheetOpener.current.focus() } }} side={locale === "ar" ? "right" : "left"} dir={locale === "ar" ? "rtl" : "ltr"}><SheetHeader><SheetTitle>{c.sheetTitle}</SheetTitle><SheetDescription>{c.sheetBody}</SheetDescription></SheetHeader><nav className="gmd-sheet-links"><a href="#buttons" onClick={() => setSheetOpen(false)}>{c.buttonTitle}</a><a href="#fields" onClick={() => setSheetOpen(false)}>{c.fieldTitle}</a><a href="#record" onClick={() => setSheetOpen(false)}>{c.recordCard}</a><a href="#overlays" onClick={() => setSheetOpen(false)}>{c.dialogTitle}</a></nav></SheetContent></Sheet>
  </div>
}

function Inquiry({ c, open, setOpen, locale, opener }: { c: C; open: boolean; setOpen: (open: boolean) => void; locale: Locale; opener: React.RefObject<HTMLElement | null> }) {
  const [submitted, setSubmitted] = useState(false)
  const [topic, setTopic] = useState("")
  const [topicError, setTopicError] = useState(false)
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    if (!topic) { setTopicError(true); document.getElementById("inquiry-topic")?.focus(); return }
    setSubmitted(true)
  }
  return <Dialog open={open} onOpenChange={value => { setOpen(value); if (!value) { setSubmitted(false); setTopic(""); setTopicError(false) } }}><DialogContent closeLabel={c.close} className="gmd-inquiry-dialog" onCloseAutoFocus={event => { if (opener.current?.isConnected) { event.preventDefault(); opener.current.focus() } }} dir={locale === "ar" ? "rtl" : "ltr"}><DialogHeader><DialogTitle>{submitted ? c.inquirySuccess : c.inquiryTitle}</DialogTitle><DialogDescription>{submitted ? c.inquirySuccessCopy : c.inquiryCopy}</DialogDescription></DialogHeader>{submitted ? <div className="gmd-inquiry-success"><span><Check aria-hidden="true" /></span><p>{c.demoNotice}</p><Button onClick={() => { setOpen(false); setSubmitted(false) }}>{c.done}</Button></div> : <form className="gmd-inquiry-form" onSubmit={submit} noValidate><FieldGroup><FieldSet><Field><FieldLabel htmlFor="inquiry-name">{c.inquiryName} · {c.required}</FieldLabel><Input id="inquiry-name" name="name" autoComplete="name" required minLength={2} /></Field><Field><FieldLabel htmlFor="inquiry-email">{c.inquiryEmail} · {c.required}</FieldLabel><Input id="inquiry-email" name="email" type="email" autoComplete="email" required /></Field><Field><FieldLabel htmlFor="inquiry-org">{c.inquiryOrg}</FieldLabel><Input id="inquiry-org" name="organization" autoComplete="organization" /></Field><Field data-invalid={topicError}><FieldLabel id="inquiry-topic-label">{c.inquiryTopic} · {c.required}</FieldLabel><Select value={topic} onValueChange={value => { setTopic(value); setTopicError(false) }}><SelectTrigger id="inquiry-topic" aria-labelledby="inquiry-topic-label" aria-describedby={topicError ? "inquiry-topic-error" : undefined} aria-invalid={topicError}><SelectValue placeholder={c.chooseTopic} /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="archive">{c.serviceOne}</SelectItem><SelectItem value="data">{c.serviceTwo}</SelectItem><SelectItem value="ai">{c.serviceThree}</SelectItem><SelectItem value="product">{c.serviceFour}</SelectItem><SelectItem value="distribution">{c.serviceFive}</SelectItem></SelectGroup></SelectContent></Select>{topicError && <FieldError id="inquiry-topic-error">{c.required}</FieldError>}</Field><Field><FieldLabel htmlFor="inquiry-message">{c.inquiryMessage}</FieldLabel><Textarea id="inquiry-message" name="message" rows={3} /></Field></FieldSet></FieldGroup><p className="gmd-form-local-note">{c.demoNotice}</p><DialogFooter><Button variant="outline" type="button" onClick={() => setOpen(false)}>{c.cancel}</Button><Button type="submit">{c.submitInquiry}<ArrowUpRight aria-hidden="true" /></Button></DialogFooter></form>}</DialogContent></Dialog>
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("en")
  const [view, setView] = useState<View>(() => {
    const initial = new URLSearchParams(window.location.search).get("view")
    return initial === "home" ? "home" : initial === "workshop" ? "workshop" : initial === "catalog" ? "catalog" : (["site-home","services","data","collection","about","contact"] as string[]).includes(initial ?? "") ? initial as View : "catalog"
  })
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const inquiryOpener = useRef<HTMLElement | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const c = COPY[locale] as C
  const direction = locale === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = direction
    document.title = locale === "ar" ? "GMD · نظام للمعرفة المصرية" : "GMD · Egyptian knowledge, connected"
  }, [locale, direction])

  useEffect(() => { window.scrollTo(0, 0) }, [view])

  useEffect(() => {
    const url = new URL(window.location.href)
    if (view === "home") url.searchParams.delete("view")
    else url.searchParams.set("view", view)
    window.history.replaceState({}, "", url)
  }, [view])

  useEffect(() => {
    const toggleLocale = () => setLocale(current => current === "en" ? "ar" : "en")
    const setViewFromEvent = (event: Event) => {
      const detail = (event as CustomEvent<View>).detail
      if (["home","workshop","catalog","site-home","services","data","collection","about","contact"].includes(detail)) setView(detail)
    }
    window.addEventListener("gmd:toggle-locale", toggleLocale)
    window.addEventListener("gmd:set-view", setViewFromEvent)
    return () => {
      window.removeEventListener("gmd:toggle-locale", toggleLocale)
      window.removeEventListener("gmd:set-view", setViewFromEvent)
    }
  }, [])

  function notify(message: string) {
    setAnnouncement(message)
    window.setTimeout(() => setAnnouncement(""), 4500)
  }

  return <DirectionProvider dir={direction}>
    <div className="gmd-app" lang={locale} dir={direction} data-view={view}>
      <div className="gmd-view-switch" role="navigation" aria-label={locale === "ar" ? "مساحات GMD" : "GMD surfaces"}>
        <a className="gmd-view-brand" href="#home" onClick={event => { event.preventDefault(); setView("home") }}>GMD<span>.</span>GDN</a>
        <div><button className={view === "home" ? "is-current" : ""} onClick={() => setView("home")}>{c.home}</button><button className={view === "site-home" || view === "services" || view === "data" || view === "collection" || view === "about" || view === "contact" ? "is-current" : ""} onClick={() => setView("site-home")}>{locale === "en" ? "Website pages" : "صفحات الموقع"}</button><button className={view === "workshop" ? "is-current" : ""} onClick={() => setView("workshop")}>{c.workshop}</button><button className={view === "catalog" ? "is-current" : ""} onClick={() => setView("catalog")}>{c.catalog}</button></div>
        <button className="gmd-view-locale" onClick={() => setLocale(current => current === "en" ? "ar" : "en")} aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}>{c.switchLocale}</button>
      </div>
      {view === "home" ? <PublicPage c={c} locale={locale} onInquiry={() => { inquiryOpener.current = document.activeElement as HTMLElement; setInquiryOpen(true) }} /> : view === "workshop" ? <Workshop c={c} locale={locale} onInquiry={() => { inquiryOpener.current = document.activeElement as HTMLElement; setInquiryOpen(true) }} notify={notify} /> : view === "catalog" ? <Catalog locale={locale} onHome={() => setView("home")} /> : <PagePatterns locale={locale} page={view === "site-home" ? "home" : view} onNavigate={page => setView(page === "home" ? "site-home" : page as View)} onInquiry={() => { inquiryOpener.current = document.activeElement as HTMLElement; setInquiryOpen(true) }} onLocaleChange={() => setLocale(current => current === "en" ? "ar" : "en")} />}
      <Inquiry c={c} opener={inquiryOpener} open={inquiryOpen} setOpen={setInquiryOpen} locale={locale} />
      <div className="gmd-live-announcement" aria-live="polite" role="status">{announcement}</div>
    </div>
  </DirectionProvider>
}
