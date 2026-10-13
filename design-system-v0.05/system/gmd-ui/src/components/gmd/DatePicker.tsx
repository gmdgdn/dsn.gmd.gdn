import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { ar as arabic } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePicker({ locale="en" }: { locale?: "en"|"ar" }) {
  const [date,setDate]=useState<Date|undefined>(new Date(2026,9,5))
  const ar=locale==="ar"
  return <Popover><PopoverTrigger asChild><Button variant="outline"><CalendarDays/>{date?.toLocaleDateString(ar?"ar-EG":"en-US")??(ar?"اختر تاريخًا":"Choose a date")}</Button></PopoverTrigger><PopoverContent align="start" aria-label={ar ? "اختيار التاريخ" : "Choose date"}><Calendar mode="single" selected={date} onSelect={setDate} locale={ar?arabic:undefined} dir={ar?"rtl":"ltr"}/></PopoverContent></Popover>
}
