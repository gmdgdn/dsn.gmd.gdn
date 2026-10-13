import { useId, useState } from "react"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function GMDForm({locale="en"}:{locale?:"en"|"ar"}) {
  const instanceId=useId()
  const titleId=`${instanceId}-collection-title`,sourceId=`${instanceId}-source-id`,errorId=`${instanceId}-source-id-error`
  const [title,setTitle]=useState(""),[source,setSource]=useState("KAY—1938—0042"),[touched,setTouched]=useState(false),[checked,setChecked]=useState(false)
  const ar=locale==="ar",invalid=touched&&source.trim().length<8
  return <form onSubmit={e=>{e.preventDefault();setTouched(true);if(source.trim().length>=8)setChecked(true)}}><FieldGroup><Field><FieldLabel htmlFor={titleId}>{ar?"عنوان المجموعة":"Collection title"}</FieldLabel><Input id={titleId} value={title} onChange={e=>setTitle(e.target.value)} placeholder={ar?"صور شوارع القاهرة":"Cairo street photography"}/><FieldDescription>{ar?"يمكن تعديل هذا المثال محليًا.":"This sample can be edited locally."}</FieldDescription></Field><Field data-invalid={invalid}><FieldLabel htmlFor={sourceId}>{ar?"معرّف المصدر":"Source identifier"}</FieldLabel><Input id={sourceId} value={source} onChange={e=>{setSource(e.target.value);setChecked(false)}} onBlur={()=>setTouched(true)} aria-invalid={invalid} aria-describedby={invalid?errorId:undefined}/>{invalid&&<FieldError id={errorId}>{ar?"أدخل معرّفًا من ٨ أحرف على الأقل.":"Enter a source ID with at least 8 characters."}</FieldError>}</Field><Button type="submit">{checked?(ar?"تم التحقق":"Draft checked"):(ar?"تحقق من المسودة":"Check draft")}</Button></FieldGroup></form>
}
