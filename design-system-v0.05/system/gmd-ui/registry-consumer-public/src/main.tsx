import {createRoot} from "react-dom/client"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/components/ui/dialog"
import {PatternedCover,RegisterDivider} from "@/components/gmd"
import {Typography} from "@/components/gmd/Typography"
import "./index.css"
document.documentElement.dataset.gmdTheme="archive"
createRoot(document.getElementById("root")!).render(<main style={{maxWidth:1000,margin:"auto",padding:32}}><h1>اختبار تثبيت GMD</h1><RegisterDivider label="ARCHIVE / REGISTER"/><PatternedCover title="المعرفة تبدأ من المصدر" subtitle="SVG assets + theme roles"/><Typography locale="ar"/><label><Checkbox defaultChecked/> المصدر موثق</label><Dialog><DialogTrigger asChild><Button>فتح المصدر</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>مصدر المادة</DialogTitle><DialogDescription>نافذة مثبتة من السجل العام</DialogDescription></DialogHeader></DialogContent></Dialog></main>)
