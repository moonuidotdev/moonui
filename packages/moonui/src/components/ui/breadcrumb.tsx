"use client"

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const breadcrumbVariants = cva(
  "flex items-center gap-1.5 text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground transition-colors",
        muted: "text-muted-foreground transition-colors",
        ghost: "text-foreground/60 transition-colors",
      },
      size: {
        md: "text-sm",
        sm: "text-xs",
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

interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  /**
   * Alt `BreadcrumbSeparator`'ların varsayılan ayracı. #309: bu prop tipte tanımlıydı ama
   * component gövdesinde HİÇ okunmuyordu → `{...props}` ile `<nav>`'a sızıyor, React
   * bilinmeyen-öznitelik uyarısı basıyordu. Artık context ile alt ayraçlara iniyor;
   * ayracın kendi `children`/`icon` prop'u bunu ezer.
   */
  separator?: React.ReactNode;
  /**
   * @deprecated Hiçbir zaman uygulanmadı — kaynakta okunmuyordu ve `<nav>`'a sızıyordu
   * (#309'da sızıntı kesildi, davranış eklenmedi). Ev ikonu için ilk `BreadcrumbItem`
   * içine ikonu doğrudan koyun; işaretleme kararı tüketiciye ait olmalı.
   */
  showHomeIcon?: boolean;
}

/** #309: kök `separator`'ı alt `BreadcrumbSeparator`'lara taşıyan tek kaynak. */
const BreadcrumbSeparatorContext = React.createContext<React.ReactNode>(undefined);

interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
  collapsed?: boolean;
  collapsedWidth?: number;
}

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean;
  href?: string;
  asChild?: boolean;
}

interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom separator icon or text */
  icon?: React.ReactNode;
}

interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom ellipsis icon */
  icon?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  // #309: `separator` ve `showHomeIcon` ESKİDEN destructure EDİLMİYORDU → `{...props}` ile
  // `<nav>`'a öznitelik olarak basılıyor, React uyarı veriyordu. İkisi de artık ayrılıyor.
  ({ className, variant, size, separator, showHomeIcon: _showHomeIcon, ...props }, ref) => (
    <BreadcrumbSeparatorContext.Provider value={separator}>
      <nav
        ref={ref}
        className={cn("moonui-theme", breadcrumbVariants({ variant, size }), className)}
        aria-label="breadcrumb"
        {...props}
      />
    </BreadcrumbSeparatorContext.Provider>
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, collapsed, collapsedWidth = 3, ...props }, ref) => {
    const childrenArray = React.Children.toArray(props.children).filter(Boolean);
    const childCount = childrenArray.length;

    if (collapsed && childCount > collapsedWidth) {
      const firstItem = childrenArray[0];
      // const middleItems = childrenArray.slice(1, -2); // Uncomment when needed
      const lastTwoItems = childrenArray.slice(-2);

      return (
        <ol
          ref={ref}
          className={cn(
            "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
            className
          )}
          {...props}
        >
          {firstItem}
          <BreadcrumbEllipsis />
          {lastTwoItems}
        </ol>
      );
    }

    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
          className
        )}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, isCurrent, href, asChild = false, children, ...props }, ref) => {
    // #309: `asChild` eskiden `React.Fragment`'e düşüyordu. Fragment yalnız `key` ve
    // `children` kabul eder → aşağıdaki `className` sessizce KAYBOLUYOR ve React
    // geliştirme modunda geçersiz-prop uyarısı basıyordu. Radix `Slot` prop'ları tek
    // çocuğa birleştirir (className/style dahil) → hem stil hem a11y korunur.
    const Comp = asChild ? Slot : href ? "a" : "span";
    const itemProps = !asChild && href ? { href } : {};

    return (
      <li
        ref={ref}
        className={cn("moonui-theme", "inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <Comp
          // #309: `aria-current` eskiden yalnız sarmalayıcı <li>'deydi; APG breadcrumb
          // deseni onu geçerli sayfayı temsil eden ELEMANDA ister. İkisinde birden
          // bulunması çift duyuruya yol açacağı için <li>'den taşındı (kaldırılmadı).
          aria-current={isCurrent ? "page" : undefined}
          className={cn(
            "transition-colors duration-200 hover:text-foreground",
            isCurrent
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground hover:underline hover:underline-offset-4 hover:decoration-muted-foreground/30"
          )}
          {...itemProps}
        >
          {children}
        </Comp>
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbSeparator = ({
  children,
  className,
  icon,
  ...props
}: BreadcrumbSeparatorProps) => {
  // #309: kök `<Breadcrumb separator={…}>` değeri; yerel `children`/`icon` bunu ezer.
  const rootSeparator = React.useContext(BreadcrumbSeparatorContext);

  return (
    // Ayraç tümüyle dekoratiftir → `aria-hidden` burada DOĞRU (ellipsis'in aksine içinde
    // ekran-okuyucuya ait metin yok).
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("moonui-theme", "text-muted-foreground opacity-70", className)}
      {...props}
    >
      {/* #309: `icon` prop'u tipte tanımlıydı ama HİÇ OKUNMUYORDU → `{...props}` ile
          DOM'a sızıyor, React bilinmeyen-öznitelik uyarısı basıyordu. Artık `children`
          verilmediğinde ayraç ikonu olarak kullanılıyor. */}
      {children || icon || rootSeparator || <ChevronRight className="h-3.5 w-3.5" />}
    </span>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  icon,
  ...props
}: BreadcrumbEllipsisProps) => (
  // #309: `aria-hidden="true"` ESKİDEN BU ELEMANDAYDI → alt ağacın tamamı, içindeki
  // `sr-only` "More pages" metni DAHİL, erişilebilirlik ağacından düşüyordu; yani metin
  // hiçbir zaman duyurulmuyordu (eleman kendi amacını geçersiz kılıyordu). Gizleme artık
  // yalnız dekoratif ikonda.
  //
  // `role="presentation"` KASITLI olarak korundu: span'in zaten örtük rolü yok, dolayısıyla
  // zararsız ve alt ağacı GİZLEMEZ (aria-hidden'ın aksine) — kusur yalnız aria-hidden'dı.
  <span
    role="presentation"
    className={cn("moonui-theme", "flex items-center text-muted-foreground hover:text-foreground/80 transition-colors duration-200", className)}
    {...props}
  >
    <span aria-hidden="true" className="flex items-center">
      {/* #309: `icon` prop'u — ayraçtaki ile aynı ölü-prop kusuru. */}
      {icon || <MoreHorizontal className="h-4 w-4" />}
    </span>
    <span className="sr-only">More pages</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, href, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(
        "transition-colors duration-200 hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4 hover:decoration-muted-foreground/30",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-medium text-foreground dark:text-white dark:text-opacity-95",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
};

// #309: Props interface'lerinin hiçbiri export edilmiyordu → tüketici sarmalayıcı
// yazarken tipi yeniden türetmek zorunda kalıyordu.
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
};
