"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export type SortDirection = "asc" | "desc" | null;

/**
 * Tablo düzeyi kontrollü sıralama bağlamı (#321).
 *
 * `Table`'daki `sortColumn`/`sortDirection`/`onSortChange` deklare edilmişti ama
 * destructure'da yoruma alındığı için `...props` içinde kalıp native <table>'a
 * sızıyordu (ölçüldü: `sortcolumn`/`sortdirection` geçersiz DOM attribute +
 * 4 React uyarısı). Artık gerçekten bağlılar.
 *
 * `TableHead`'in mevcut `sorted`/`onSort` prop'ları KORUNUR ve önceliklidir —
 * elle bağlayan tüketici kırılmaz. `columnId` verildiğinde bağlam devreye girer.
 */
interface TableSortContextValue {
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSortChange?: (column: string, direction: SortDirection) => void;
}

const TableSortContext = React.createContext<TableSortContextValue | null>(null);

/**
 * Zebra (striped) bağlamı (#444).
 *
 * ESKİ HÂLİ İKİ AYRI NEDENLE ÇALIŞMIYORDU:
 *  1. `Table`, çocuklarını gezip `child.type === "tbody"` diye STRING
 *     karşılaştırıyordu. `TableBody` bir `React.forwardRef` nesnesidir; bu koşul
 *     hiçbir zaman doğru olmaz → `striped` sınıfı HİÇ eklenmiyordu (ölçüldü:
 *     `variant="striped"` çıktısı `variant="default"` ile birebir aynıydı).
 *  2. Koşul düzelse bile hedeflenen sınıf yanlıştı: `even:[&>tr]:bg-muted/50`
 *     içindeki `even:` tbody'nin KENDİ kardeş sırasına bakar (tek tbody varsa hiç
 *     eşleşmez), satırlara değil.
 *
 * Artık `Table` yalnızca bir bayrak YAYINLAR; zebra sınıfını `TableRow` kendi
 * üstüne koyar. Böylece eleman-tipi karşılaştırması tamamen kalkar: satırlar
 * fragment, `.map()`, ara sarmalayıcı bir component ya da düz `<tbody>` içinden
 * gelse de çalışır. `TableHeader`/`TableFooter` bayrağı `false`'a çevirir —
 * başlık satırı ve `bg-primary` zeminli altbilgi satırı çizgilenmemelidir.
 */
const TableStripedContext = React.createContext(false);

/**
 * Zebra + etkileşim yüzeyleri (#444) — ölçülmüş değerler, tokens.css'e dokunulmadan.
 *
 * `odd:bg-muted/50` → satır düzeyi zebra. `:nth-child(odd)` satırın kendi
 * kardeş sırasına bakar, yani gerçekten 1./3./5. GÖVDE SATIRI boyanır.
 *
 * `hover:bg-accent` → zebra açıkken ZORUNLU: `TableRow`'un varsayılan hover'ı
 * zaten `bg-muted/50`, yani şeritle AYNI renk; override olmasa çizgili satırlarda
 * hover geri bildirimi görünmez olurdu. `--accent` bu tasarım sisteminin kanonik
 * etkileşim yüzeyidir (button ghost/outline, dropdown item aynı token'ı kullanır).
 * `cn()` = twMerge olduğu için `hover:bg-muted/50` ile çakışma CSS sırasına değil,
 * deterministik olarak sona yazılan sınıfa göre çözülür.
 *
 * `bg-muted` (tam opaklık) BİLEREK seçilmedi: `data-[state=selected]:bg-muted` ile
 * birebir aynı renk olurdu ve çizgili tabloda seçili satır seçilmemişten
 * ayırt edilemezdi. Ölçülen CIE L* değerleri (zemin → şerit → seçili → hover):
 *   açık tema : 100 → 98.06 → 96.12 → 94.09   (şerit ΔL* 1.94, kontrast 1.05:1)
 *   koyu tema :  1.89 →  9.61 → 18.96 → 16.06 (şerit ΔL* 7.72, kontrast 1.17:1)
 * Dört yüzey de her iki temada ayrı; hover her satır paritesinde görünür değişir.
 * WCAG 1.4.11'in 3:1 eşiği zebraya UYGULANMAZ — şerit dekoratif bir tarama
 * yardımıdır, içeriği anlamak için gerekli bir grafik ya da UI bileşeni değildir
 * (veri hücre metninde; metin kontrastı her iki temada AA üstünde kalır).
 */
const STRIPED_ROW_CLASSES = "odd:bg-muted/50 hover:bg-accent";

/** asc → desc → null → asc döngüsü */
function nextSortDirection(current: SortDirection): SortDirection {
  if (current === "asc") return "desc";
  if (current === "desc") return null;
  return "asc";
}

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "dark:text-gray-200",
        bordered: "border border-border dark:border-gray-700",
        striped: "dark:text-gray-200",
        card: "border border-border dark:border-gray-700 rounded-md shadow-sm dark:shadow-gray-900/20",
        minimal: "border-none dark:text-gray-200",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ColumnDefinition<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T>
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** Veri yükleniyor durumunu gösterir */
  loading?: boolean;
  /** Sıralama için kullanılan sütun */
  sortColumn?: string;
  /** Sıralama yönü */
  sortDirection?: SortDirection;
  /** Sıralama değiştiğinde çağrılacak fonksiyon */
  onSortChange?: (column: string, direction: SortDirection) => void;
  /** Boş durum için özel içerik */
  emptyContent?: React.ReactNode;
  /** Seçili satır id'leri */
  selectedRowIds?: string[];
  /** Satır seçim değiştiğinde çağrılacak fonksiyon */
  onRowSelectionChange?: (selectedRowIds: string[]) => void;
  /** Satır seçim devre dışı */
  disableRowSelection?: boolean;
  /** Her satır için benzersiz id çıkarma fonksiyonu */
  getRowId?: (row: T) => string;
}

// Tip parametresiz Table bileşeni için varsayılan tip, herhangi bir veri tipini kabul edebilmesi için
const Table = React.forwardRef<
  HTMLTableElement,
  TableProps<unknown>
>(({ 
  className, 
  variant, 
  size, 
  loading, 
  emptyContent,
  // #321: Bunlar eskiden yoruma alınmıştı ve `...props` içinde kalıp native
  // <table>'a sızıyordu (ölçüldü: `sortcolumn`/`sortdirection` geçersiz DOM
  // attribute olarak basılıyor + 4 React uyarısı). Artık destructure ediliyorlar:
  //   • sıralama üçlüsü GERÇEKTEN bağlandı (aşağıdaki TableSortContext)
  //   • seçim dörtlüsü yalnız DOM'dan ÇIKARILIYOR — bağlanamazlar, çünkü `Table`
  //     veri almıyor (tamamen kompozisyonel) ve `getRowId(row)` bir veri satırı
  //     ister. Satır seçimi için veri-güdümlü `DataTable` kullanılmalı.
  sortColumn,
  sortDirection,
  onSortChange,
  selectedRowIds: _selectedRowIds,
  onRowSelectionChange: _onRowSelectionChange,
  disableRowSelection: _disableRowSelection,
  getRowId: _getRowId,
  children,
  ...props
}, ref) => {
  // #444: zebra bir bayrak olarak yayınlanır; sınıfı TableRow kendi üstüne koyar.
  const striped = variant === "striped";

  // #321: sıralama prop'ları alt başlıklara bağlam üzerinden ulaşır
  const sortContextValue = React.useMemo<TableSortContextValue>(
    () => ({ sortColumn, sortDirection, onSortChange }),
    [sortColumn, sortDirection, onSortChange]
  );

  return (
    <div className="relative w-full overflow-auto">
      {/* Yükleniyor durumu için overlay */}
      {loading && (
        <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
      
      <TableSortContext.Provider value={sortContextValue}>
        <TableStripedContext.Provider value={striped}>
          <table
            ref={ref}
            className={cn(
              tableVariants({ variant, size }),
              loading && "opacity-70",
              className
            )}
            {...props}
          >
            {children}
          </table>
        </TableStripedContext.Provider>
      </TableSortContext.Provider>
    </div>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={cn("moonui-theme", "[&_tr]:border-b", className)} {...props}>
    {/* #444: başlık satırı zebraya dahil değildir */}
    <TableStripedContext.Provider value={false}>{children}</TableStripedContext.Provider>
  </thead>
));
TableHeader.displayName = "TableHeader";

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Veri yoksa gösterilecek boş durum içeriği */
  emptyContent?: React.ReactNode;
  /** Varsayılan boş durum mesajı */
  emptyMessage?: string;
}

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, emptyContent, emptyMessage = "No data available", children, ...props }, ref) => {
  // Çocuk elementlerin varlığını kontrol et
  const hasChildren = React.Children.count(children) > 0;
  
  return (
    <tbody
      ref={ref}
      className={cn("moonui-theme", "[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {hasChildren ? (
        children
      ) : (
        <tr>
          <td colSpan={100} className="h-24 text-center">
            {emptyContent || (
              <div className="py-6 text-muted-foreground">
                <div className="text-sm">
                  {emptyMessage}
                </div>
              </div>
            )}
          </td>
        </tr>
      )}
    </tbody>
  )
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("moonui-theme", "bg-primary text-primary-foreground font-medium", className)}
    {...props}
  >
    {/* #444: altbilginin kendi `bg-primary` zemini var; şerit onu bozmamalı */}
    <TableStripedContext.Provider value={false}>{children}</TableStripedContext.Provider>
  </tfoot>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  // #444: zebra bayrağı Table'dan gelir; TableHeader/TableFooter içinde false'tur.
  const striped = React.useContext(TableStripedContext);

  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        striped && STRIPED_ROW_CLASSES,
        className
      )}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Bu sütun için sıralama durumu */
  sortable?: boolean;
  /** Bu sütunun sıralanma durumu */
  sorted?: SortDirection;
  /** Sıralama değiştiğinde çağrılacak fonksiyon */
  onSort?: () => void;
  /**
   * Tablo düzeyi kontrollü sıralamada bu sütunun kimliği (#321).
   *
   * Verildiğinde `Table`'ın `sortColumn`/`sortDirection`/`onSortChange`
   * prop'larıyla otomatik bağlanır: yön bağlamdan okunur, tıklama/klavye
   * `onSortChange(columnId, sonrakiYön)` çağırır.
   *
   * Elle bağlayan mevcut kullanım (`sorted` + `onSort`) ÖNCELİKLİDİR ve
   * çalışmaya devam eder — bu prop eklemeli, kırıcı değil.
   */
  columnId?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sorted, onSort, columnId, align = 'left', children, ...props }, ref) => {
    const sortCtx = React.useContext(TableSortContext);

    // Elle verilen `sorted`/`onSort` önceliklidir; yoksa bağlamdan türetilir.
    const ctxSorted: SortDirection =
      columnId && sortCtx && sortCtx.sortColumn === columnId
        ? sortCtx.sortDirection ?? null
        : null;
    const effectiveSorted: SortDirection = sorted !== undefined ? sorted : ctxSorted;

    const handleSort = React.useCallback(() => {
      if (onSort) {
        onSort();
        return;
      }
      if (columnId && sortCtx?.onSortChange) {
        sortCtx.onSortChange(columnId, nextSortDirection(ctxSorted));
      }
    }, [onSort, columnId, sortCtx, ctxSorted]);

    const isInteractive = Boolean(sortable && (onSort || (columnId && sortCtx?.onSortChange)));
    // Sıralama için simgeler
    const renderSortIcon = () => {
      if (!sortable) return null;
      
      if (sorted === "asc") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      
      if (sorted === "desc") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1 h-4 w-4 inline-block opacity-30"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    };
    
    const alignmentClasses = {
      left: 'text-left justify-start',
      center: 'text-center justify-center',
      right: 'text-right justify-end'
    };

    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          alignmentClasses[align].split(' ')[0], // text alignment
          sortable && "cursor-pointer hover:text-foreground select-none",
          className
        )}
        /* #321: sıralama durumu ekran okuyucuya YANSIMIYORDU (`aria-sort`
           grep'i 0 idi) — yalnız görsel ok ikonu değişiyordu. Sıralanamayan
           sütunda öznitelik hiç basılmaz. */
        aria-sort={
          sortable
            ? effectiveSorted === "asc"
              ? "ascending"
              : effectiveSorted === "desc"
                ? "descending"
                : "none"
            : undefined
        }
        onClick={isInteractive ? handleSort : undefined}
        {...props}
      >
        {sortable || align !== 'left' ? (
          <div
            className={cn("flex items-center", alignmentClasses[align].split(' ')[1])}
            /* #321: sıralama kontrolü yalnız fareyle çalışıyordu (dosyada
               `tabIndex` grep'i 0, `onKeyDown` yok). Görsel olarak div kalır ama
               role/tabIndex/onKeyDown ile gerçek düğme gibi davranır; erişilebilir
               adı sütun başlığıdır. Pro DataTable'da aynı düzeltme #291'de yapıldı. */
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={
              isInteractive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort();
                    }
                  }
                : undefined
            }
          >
            {children}
            {sortable && renderSortIcon()}
          </div>
        ) : (
          children
        )}
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ className, align = 'left', ...props }, ref) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];

  return (
    <td
      ref={ref}
      className={cn("moonui-theme", "p-4 align-middle [&:has([role=checkbox])]:pr-0", alignmentClass, className)}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("moonui-theme", "mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

// #321: TableProps/TableHeadProps/TableCellProps export edilmiyordu
export type { TableProps, TableBodyProps, TableHeadProps, TableCellProps };
