import { useState } from "react"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function GMDForm({locale="en"}:{locale?:"en"|"ar"}) {
  const [title,setTitle]=useState(""),[source,setSource]=useState("KAY—1938—0042"),[touched,setTouched]=useState(false),[checked,setChecked]=useState(false)
  const ar=locale==="ar",invalid=touched&&source.trim().length<8
  return <form onSubmit={e=>{e.preventDefault();setTouched(true);if(source.trim().length>=8)setChecked(true)}}><FieldGroup><Field><FieldLabel htmlFor="gmd-collection-title">{ar?"عنوان المجموعة":"Collection title"}</FieldLabel><Input id="gmd-collection-title" value={title} onChange={e=>setTitle(e.target.value)} placeholder={ar?"صور شوارع القاهرة":"Cairo street photography"}/><FieldDescription>{ar?"يمكن تعديل هذا المثال محليًا.":"This sample can be edited locally."}</FieldDescription></Field><Field data-invalid={invalid}><FieldLabel htmlFor="gmd-source-id">{ar?"معرّف المصدر":"Source identifier"}</FieldLabel><Input id="gmd-source-id" value={source} onChange={e=>{setSource(e.target.value);setChecked(false)}} onBlur={()=>setTouched(true)} aria-invalid={invalid} aria-describedby={invalid?"gmd-source-id-error":undefined}/>{invalid&&<FieldError id="gmd-source-id-error">{ar?"أدخل معرّفًا من ٨ أحرف على الأقل.":"Enter a source ID with at least 8 characters."}</FieldError>}</Field><Button type="submit">{checked?(ar?"تم التحقق":"Draft checked"):(ar?"تحقق من المسودة":"Check draft")}</Button></FieldGroup></form>
}
