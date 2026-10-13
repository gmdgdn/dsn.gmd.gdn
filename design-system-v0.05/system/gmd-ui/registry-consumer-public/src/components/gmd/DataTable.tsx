import { useState } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type RecordRow={id:string;title:string;type:string;rights:string}
const rows:RecordRow[]=[
  {id:"KAY—1938—0042",title:"Al-Muizz street",type:"Photograph",rights:"Review"},
  {id:"FIL—1957—0118",title:"Cairo Station",type:"Film",rights:"Documented"},
  {id:"ORA—1984—0007",title:"Alexandria voices",type:"Audio",rights:"Documented"},
  {id:"DOC—1962—0321",title:"Cultural bulletin",type:"Document",rights:"Restricted"},
]

export function DataTable({locale="en"}:{locale?:"en"|"ar"}) {
  const [query,setQuery]=useState("")
  const [sorting,setSorting]=useState<SortingState>([])
  const columns:ColumnDef<RecordRow>[]=[{accessorKey:"id",header:"Record ID"},{accessorKey:"title",header:locale==="ar"?"العنوان":"Title"},{accessorKey:"type",header:locale==="ar"?"النوع":"Type"},{accessorKey:"rights",header:locale==="ar"?"الحقوق":"Rights"}]
  const table=useReactTable({data:rows,columns,state:{globalFilter:query,sorting},onGlobalFilterChange:setQuery,onSortingChange:setSorting,getCoreRowModel:getCoreRowModel(),getFilteredRowModel:getFilteredRowModel(),getSortedRowModel:getSortedRowModel()})
  return <div className="gmd-catalog-data-table">
    <Input aria-label={locale==="ar"?"ابحث في السجلات":"Search records"} placeholder={locale==="ar"?"ابحث في السجلات…":"Search records…"} value={query} onChange={e=>setQuery(e.target.value)}/>
    <Table><TableCaption>{locale==="ar"?"سجلات عينة محلية":"Local sample records"}</TableCaption><TableHeader>{table.getHeaderGroups().map(group=><TableRow key={group.id}>{group.headers.map(header=><TableHead key={header.id} aria-sort={header.column.getIsSorted()?header.column.getIsSorted()==="asc"?"ascending":"descending":"none"}><button type="button" onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header,header.getContext())} {header.column.getIsSorted()==="asc"?"↑":header.column.getIsSorted()==="desc"?"↓":"↕"}</button></TableHead>)}</TableRow>)}</TableHeader>
      <TableBody>{table.getRowModel().rows.map(row=><TableRow key={row.id}>{row.getVisibleCells().map(cell=><TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())??cell.getValue() as string}</TableCell>)}</TableRow>)}{table.getRowModel().rows.length===0&&<TableRow><TableCell colSpan={4}>{locale==="ar"?"لا توجد سجلات مطابقة.":"No matching records."}</TableCell></TableRow>}</TableBody>
    </Table>
  </div>
}
