import { useState } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type DataTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  locale?: "en" | "ar"
  caption?: string
  emptyMessage?: string
  searchLabel?: string
  searchPlaceholder?: string
  getGlobalFilter?: (row: TData) => string
}

/** Reusable local table with client-side filtering and sorting. Pass controlled columns and rows. */
export function DataTable<TData>({ data, columns, locale = "en", caption, emptyMessage, searchLabel, searchPlaceholder, getGlobalFilter }: DataTableProps<TData>) {
  const [query, setQuery] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: query, sorting },
    onGlobalFilterChange: setQuery,
    onSortingChange: setSorting,
    globalFilterFn: getGlobalFilter ? (row, _columnId, filterValue) => getGlobalFilter(row.original).toLocaleLowerCase().includes(String(filterValue).toLocaleLowerCase()) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  const ar = locale === "ar"
  const noRows = table.getRowModel().rows.length === 0
  return <div className="gmd-data-table">
    <Input aria-label={searchLabel ?? (ar ? "ابحث في السجلات" : "Search records")} placeholder={searchPlaceholder ?? (ar ? "ابحث في السجلات…" : "Search records…")} value={query} onChange={e => setQuery(e.target.value)} />
    <Table><TableCaption>{caption ?? (ar ? "سجلات محلية" : "Local records")}</TableCaption><TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => <TableHead key={header.id} aria-sort={header.column.getIsSorted() ? header.column.getIsSorted() === "asc" ? "ascending" : "descending" : "none"}><button type="button" onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header, header.getContext())} {header.column.getIsSorted() === "asc" ? "↑" : header.column.getIsSorted() === "desc" ? "↓" : "↕"}</button></TableHead>)}</TableRow>)}</TableHeader>
      <TableBody>{table.getRowModel().rows.map(row => <TableRow key={row.id}>{row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext()) ?? String(cell.getValue() ?? "")}</TableCell>)}</TableRow>)}{noRows && <TableRow><TableCell colSpan={Math.max(1, table.getVisibleLeafColumns().length)}>{emptyMessage ?? (ar ? "لا توجد سجلات مطابقة." : "No matching records.")}</TableCell></TableRow>}</TableBody>
    </Table>
  </div>
}

type RecordRow = { id: string; title: string; type: string; rights: string }
const sampleRows: RecordRow[] = [
  { id: "KAY—1938—0042", title: "Al-Muizz street", type: "Photograph", rights: "Review" },
  { id: "FIL—1957—0118", title: "Cairo Station", type: "Film", rights: "Documented" },
  { id: "ORA—1984—0007", title: "Alexandria voices", type: "Audio", rights: "Documented" },
  { id: "DOC—1962—0321", title: "Cultural bulletin", type: "Document", rights: "Restricted" },
]

/** Small bilingual catalog fixture; use DataTable directly for application data. */
export function CollectionDataTable({ locale = "en" }: { locale?: "en" | "ar" }) {
  const columns: ColumnDef<RecordRow, unknown>[] = [
    { accessorKey: "id", header: "Record ID" },
    { accessorKey: "title", header: locale === "ar" ? "العنوان" : "Title" },
    { accessorKey: "type", header: locale === "ar" ? "النوع" : "Type" },
    { accessorKey: "rights", header: locale === "ar" ? "الحقوق" : "Rights" },
  ]
  return <DataTable data={sampleRows} columns={columns} locale={locale} caption={locale === "ar" ? "سجلات عينة محلية" : "Local sample records"} />
}
