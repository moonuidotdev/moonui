"use client"

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Tabs Root
 * -----------------------------------------------------------------------------------------------*/
type TabsOrientation = "horizontal" | "vertical";

/**
 * #322: Yönelim için TEK KAYNAK.
 *
 * Eskiden üç ayrı yol vardı ve birbirini eziyordu:
 *  1. Root `vertical` prop'undan `orientation` hesaplıyor, ARDINDAN `{...props}` yayıyordu
 *     → tüketicinin (ya da Radix'in kalıtsal) `orientation` prop'u `vertical`'ı SESSİZCE
 *     eziyordu.
 *  2. `TabsList`/`TabsTrigger` kendi `orientation` prop'unu yalnız CVA sınıfına veriyor,
 *     Root'tan hiç beslenmiyordu → klavye yönü dikey, görünüm yatay kalabiliyordu.
 *
 * Artık Root çözülmüş yönelimi context ile dağıtıyor; alt component'ler kendi prop'unu
 * verirse o kazanır (yerel ezme kasıtlı olarak korundu).
 */
const TabsOrientationContext = React.createContext<TabsOrientation>("horizontal");

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /**
   * @deprecated `orientation="vertical"` kullanın — pro `MoonUITabsPro` ile aynı ad ve
   * tip. `vertical` yalnız `orientation` verilmediğinde dikkate alınır.
   */
  vertical?: boolean;
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ vertical = false, orientation, className, ...props }, ref) => {
  const resolvedOrientation: TabsOrientation =
    orientation ?? (vertical ? "vertical" : "horizontal");

  return (
    <TabsOrientationContext.Provider value={resolvedOrientation}>
      <TabsPrimitive.Root
        ref={ref}
        // #322: `className` eskiden destructure EDİLMİYORDU; `cn("moonui-theme", …)`
        // hesaplanıp ardından `{...props}` yayıldığı için tüketici `className` verdiğinde
        // hesaplanan değer tümüyle eziliyor ve `moonui-theme` tema kapsamı düşüyordu.
        className={cn("moonui-theme", className)}
        orientation={resolvedOrientation}
        {...props}
      />
    </TabsOrientationContext.Provider>
  );
});

Tabs.displayName = TabsPrimitive.Root.displayName;

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/
const tabsListVariants = cva(
  "flex items-center justify-start transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-muted rounded-md p-1 text-muted-foreground dark:bg-gray-800/80 dark:text-gray-400",
        pills: "bg-transparent gap-3 p-0 dark:text-gray-400",
        underline: "bg-transparent border-b border-border dark:border-gray-700 gap-4 dark:text-gray-400",
        cards: "bg-transparent gap-2 p-0 dark:text-gray-400",
        minimal: "bg-transparent gap-1 p-0 dark:text-gray-400",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-start gap-1"
      },
      fullWidth: {
        true: "w-full"
      },
      scrollable: {
        true: "overflow-x-auto overflow-y-hidden flex-nowrap hide-scrollbar",
        false: "flex-wrap"
      }
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      fullWidth: false,
      scrollable: false
    }
  }
);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  /** Dikey düzende göster */
  orientation?: "horizontal" | "vertical";
  /** Mobil için yatay scroll */
  scrollable?: boolean;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, orientation, fullWidth, scrollable, ...props }, ref) => {
  // scrollable prop'unu DOM'a geçirmemek için destructure ediyoruz
  // #322: yönelim Root'tan context ile geliyor; yerel prop verilirse o kazanır.
  const contextOrientation = React.useContext(TabsOrientationContext);
  const resolvedOrientation = orientation ?? contextOrientation;

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("moonui-theme", tabsListVariants({ variant, orientation: resolvedOrientation, fullWidth, scrollable, className }))}
      {...props}
    />
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap flex-shrink-0 font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100 dark:data-[state=active]:shadow-gray-950/10",
        underline: "rounded-none border-b-2 border-transparent pb-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground dark:data-[state=active]:border-primary/80 dark:data-[state=active]:text-gray-100",
        // #646: `dark:data-[state=active]:text-white` KALDIRILDI. `--primary` koyu
        // temada BİLİNÇLİ near-white'tır (tokens.css:500, #368 kararı — DEĞİŞMEZ),
        // dolayısıyla aktif pill'e açıkça beyaz metin yazmak beyaz-üstüne-beyaz
        // demekti: ölçülen 1.28:1 (gerçek tarayıcı, /docs/components/tabs, koyu tema).
        // Sınıf kalkınca öneksiz `data-[state=active]:text-primary-foreground`
        // (koyu temada near-black) devreye girer → 15.91:1. Açık temada hiçbir
        // değişiklik yok (`dark:` sınıfı orada zaten uygulanmıyordu; ölçülen 4.70:1).
        //
        // ⚠️ `dark:data-[state=active]:bg-primary/90` BİLEREK KORUNDU: onu da
        // kaldırmak #545'in "ihlal takası" tuzağına düşürüyor. Aynı varyanttaki
        // `dark:bg-gray-800` (inaktif zemin) ile `data-[state=active]:bg-primary`
        // ÖZGÜLLÜKÇE EŞİT (0,2,0); kaynak sırası nedeniyle `dark:bg-gray-800`
        // kazanıyor ve aktif pill koyu temada inaktif görünüyordu — near-black metin
        // gray-800 üstünde 1.41:1 ile YENİ bir ihlal (ölçüldü). Koyu temada aktif
        // durumun zemini bu yüzden `dark:` özgüllüğünde kalmak ZORUNDA.
        pills: "rounded-lg bg-gray-100 hover:bg-gray-200/80 border border-gray-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:data-[state=active]:bg-primary/90 dark:data-[state=active]:border-primary",
        cards: "rounded-md bg-muted/50 hover:bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100 dark:data-[state=active]:shadow-gray-950/20",
        minimal: "rounded-sm bg-transparent hover:bg-muted/30 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:underline data-[state=active]:underline-offset-4 dark:hover:bg-gray-800/30 dark:data-[state=active]:text-gray-200",
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3 py-1.5 text-sm",
        lg: "h-10 px-4 py-2 text-base",
      },
      orientation: {
        horizontal: "",
        vertical: "justify-start w-full text-left"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
      fullWidth: false
    }
  }
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  /** İkon konumu */
  iconPosition?: "left" | "right" | "none";
  /** İkon */
  icon?: React.ReactNode;
  /** Badge içeriği */
  badge?: React.ReactNode;
  /** Aktif olmayan durumda yarı saydam */
  fadeTabs?: boolean;
  /** Dikey düzende göster */
  orientation?: "horizontal" | "vertical";
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ 
  className, 
  variant, 
  size, 
  icon, 
  iconPosition = "left", 
  badge,
  fadeTabs = false,
  orientation,
  fullWidth,
  children,
  ...props
}, ref) => {
  // #322: yönelim Root'tan context ile geliyor; yerel prop verilirse o kazanır.
  const contextOrientation = React.useContext(TabsOrientationContext);
  const resolvedOrientation = orientation ?? contextOrientation;

  return (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "moonui-theme",
      tabsTriggerVariants({ variant, size, orientation: resolvedOrientation, fullWidth }),
      fadeTabs && "data-[state=inactive]:opacity-60",
      className
    )}
    {...props}
  >
    {icon && iconPosition === "left" && (
      <span className="mr-2">{icon}</span>
    )}
    {children}
    {icon && iconPosition === "right" && (
      <span className="ml-2">{icon}</span>
    )}
    {badge && (
      <span className="ml-2">{badge}</span>
    )}
  </TabsPrimitive.Trigger>
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/
interface TabsContentProps 
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /** İçerik animasyonu */
  animated?: boolean;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, animated = false, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "moonui-theme",
      "mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      animated && "data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };

// #322: Props interface'lerinin hiçbiri export edilmiyordu (pro tarafı `MoonUITabsProProps`
// ve `TabItem`'ı export ediyor — asimetriydi).
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsOrientation,
};
