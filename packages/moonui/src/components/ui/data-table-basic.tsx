"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./table";
import {
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
} from "lucide-react";

/**
 * Basic DataTable Component
 * 
 * A simple data table with sorting, filtering, and pagination.
 * For advanced features, upgrade to MoonUI Pro.
 */

interface DataTableBasicProps<TData, TValue> {
  /**
   * The table columns definition
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * The data to display
   */
  data: TData[];
  /**
   * Enable/disable sorting
   */
  enableSorting?: boolean;
  /**
   * Enable/disable pagination
   */
  enablePagination?: boolean;
  /**
   * Enable/disable global search
   */
  enableSearch?: boolean;
  /**
   * Default page size
   */
  pageSize?: number;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Class name
   */
  className?: string;
}

export function DataTableBasic<TData, TValue>({
  columns,
  data,
  enableSorting = true,
  enablePagination = true,
  enableSearch = true,
  pageSize = 10,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
}: DataTableBasicProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: enableSorting ? setSorting : undefined,
    onGlobalFilterChange: enableSearch ? setGlobalFilter : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableSearch ? getFilteredRowModel() : undefined,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search */}
      {enableSearch && (
        <div className="flex items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  /* #366: mevcut ikon guard'ı ile aynı koşul — `enableSorting`
                     kapalıyken başlık tamamen etkileşimsizdir (eskiden onClick
                     ve cursor-pointer yine de kalıyordu ama sortedRowModel
                     olmadığından hiçbir görünür etki üretmiyordu). */
                  const canSort = enableSorting && header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const headerDef = header.column.columnDef.header;
                  return (
                    <TableHead
                      key={header.id}
                      /* #366: sıralama durumu ekran okuyucuya YANSIMIYORDU
                         (dosyada `aria-sort` grep'i 0 idi) — yalnız görsel ok
                         ikonu değişiyordu. Sıralanamayan sütunda öznitelik hiç
                         basılmaz. table.tsx'te #321, pro DataTable'da #291 ile
                         aynı standart. */
                      aria-sort={
                        canSort
                          ? sorted === "asc"
                            ? "ascending"
                            : sorted === "desc"
                              ? "descending"
                              : "none"
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            canSort && "cursor-pointer select-none"
                          )}
                          /* Fare kolaylığı: başlığın tamamı tıklanabilir kalır.
                             Klavye yolu aşağıdaki GERÇEK <button>'dan geçer —
                             bu div'e role="button" taklidi VERMİYORUZ çünkü
                             başlık içeriği tüketiciden gelir (flexRender +
                             `createSortableHeader` zaten Button render eder)
                             ve rol taklidi buton-içinde-buton üretirdi; aynı
                             hata pro DataTable'da #345'te düzeltilmişti. */
                          onClick={
                            canSort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {canSort && (
                            /* #366: sıralama kontrolü yalnız fareyle çalışıyordu
                               (dosyada `tabIndex`/`onKeyDown` grep'i 0 idi).
                               Gerçek <button> ile Tab + Enter/Space native
                               gelir; görünür odak focus-visible ring ile. */
                            <button
                              type="button"
                              onClick={(event) => {
                                // Sarmalayıcı div de sıralıyor; çifte tetiklenmesin
                                event.stopPropagation();
                                header.column.getToggleSortingHandler()?.(event);
                              }}
                              aria-label={`Sort by ${
                                typeof headerDef === "string"
                                  ? headerDef
                                  : header.column.id
                              }`}
                              className="ml-auto inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              {sorted === "desc" ? (
                                <ArrowDown className="h-4 w-4" />
                              ) : sorted === "asc" ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowUpDown className="h-4 w-4 opacity-50" />
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} row(s)
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Simple sortable header helper
 */
export function createSortableHeader(label: string) {
  return ({ column }: any) => (
    <Button
      variant="ghost"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

// Export utilities
export { type ColumnDef } from "@tanstack/react-table";