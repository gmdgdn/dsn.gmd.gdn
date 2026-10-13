import {createRoot} from "react-dom/client"
import {useState} from "react"
import {PagePatterns,type GMDPage} from "@/components/gmd/page-patterns/PagePatterns"
import {DirectionProvider} from "@/components/ui/direction"
import "./index.css"
function App(){const [page,setPage]=useState<GMDPage>("home");return <DirectionProvider dir="ltr"><PagePatterns page={page} onNavigate={v=>setPage(v as GMDPage)} /></DirectionProvider>}
createRoot(document.getElementById("root")!).render(<App/>)
