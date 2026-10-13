import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { Catalog } from "./catalog/Catalog"
import { Toaster } from "./components/ui/sonner"
import { DirectionProvider } from "./components/ui/direction"
import { PagePatterns, type GMDPage } from "./page-patterns/PagePatterns"
import { StateBoard } from "./catalog/StateBoard"
import { CviStudy } from "./catalog/CviStudy"
import { PalStudy } from "./catalog/PalStudy"
import "./components/gmd/icons.css"
import "./registry.css"

function RegistryCatalog() {
  const [study,setStudy]=useState(()=>new URLSearchParams(window.location.search).get('study'))
  const [locale,setLocale] = useState<"en"|"ar">("en")
  const [states,setStates]=useState(()=>new URLSearchParams(window.location.search).has('states'))
  const [page,setPage] = useState<GMDPage | null>(()=>{
    const selected=(new URLSearchParams(window.location.search).get('page')||new URLSearchParams(window.location.search).get('view'))
    return ['home','services','data','collection','about','contact'].includes(selected||'') ? selected as GMDPage : null
  })
  function navigate(next:string){
    const selected=['home','services','data','collection','about','contact'].includes(next) ? next as GMDPage : null
    const url=new URL(window.location.href)
    url.searchParams.delete('states')
    url.searchParams.delete('view')
    url.searchParams.delete('study')
    setStudy(null)
    setStates(false)
    if(selected)url.searchParams.set('page',selected);else url.searchParams.delete('page')
    window.history.pushState(null,'',url)
    setPage(selected)
    window.scrollTo({top:0,behavior:'instant'})
  }
  useEffect(()=>{
    const restore=()=>{
      setStudy(new URLSearchParams(window.location.search).get('study'))
      const selected=(new URLSearchParams(window.location.search).get('page')||new URLSearchParams(window.location.search).get('view'))
      setStates(new URLSearchParams(window.location.search).has('states'))
      setPage(['home','services','data','collection','about','contact'].includes(selected||'')?selected as GMDPage:null)
    }
    window.addEventListener('popstate',restore)
    return()=>window.removeEventListener('popstate',restore)
  },[])
  useEffect(()=>{
    const toggle = ()=>setLocale(current=>current==="en"?"ar":"en")
    const showStates=()=>{const url=new URL(window.location.href);url.searchParams.delete("page");url.searchParams.delete("study");setStudy(null);url.searchParams.set("states","1");window.history.pushState(null,"",url);setPage(null);setStates(true);window.scrollTo({top:0,behavior:"instant"})}
    window.addEventListener("gmd:show-states",showStates)
    window.addEventListener("gmd:toggle-locale",toggle)
    return ()=>{window.removeEventListener("gmd:toggle-locale",toggle);window.removeEventListener("gmd:show-states",showStates)}
  },[])
  useEffect(()=>{
    document.documentElement.lang=locale
    document.documentElement.dir=locale==="ar"?"rtl":"ltr"
  },[locale])
  return <DirectionProvider dir={locale==="ar"?"rtl":"ltr"}>{study === "cvi" ? <CviStudy locale={locale} onBack={()=>navigate("catalog")} onLocaleChange={()=>setLocale(current=>current==="en"?"ar":"en")}/> : study === "pal-maker" ? <PalStudy locale={locale} onBack={()=>navigate('catalog')} onLocaleChange={()=>setLocale(current=>current==='en'?'ar':'en')}/> : states ? <StateBoard locale={locale} onBack={()=>navigate('catalog')}/> : page ? <PagePatterns locale={locale} page={page} onNavigate={navigate} onInquiry={()=>navigate('contact')} onLocaleChange={()=>setLocale(current=>current==='en'?'ar':'en')}/> : <Catalog locale={locale} onHome={()=>navigate('home')}/>}<Toaster/></DirectionProvider>
}
createRoot(document.getElementById("root")!).render(<StrictMode><RegistryCatalog/></StrictMode>)
