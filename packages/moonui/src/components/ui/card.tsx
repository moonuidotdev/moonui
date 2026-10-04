"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { microInteractionVariants, hoverAnimations, tapAnimations } from "@/lib/micro-interactions";

// #310: `dark:bg-gray-850` ÖLÜ SINIFTI — Tailwind gri ölçeğinde 850 basamağı yok
// (50…800, 900, 950) ve preset de eklemiyor. `elevated` varyantının karanlık zemini
// hiç uygulanmıyordu; kart kökün `dark:bg-gray-900` değerinde kalıyordu.
// Semantik `bg-card` token'ına bağlandı.
//
// #310 (ikinci tur): `size` ve `asChild` ARTIK GERÇEK.
//   • `size`: CVA'daki dört değer de boş stringdi ve `compoundVariants` yoktu — prop
//     kabul ediliyor, hiçbir görsel fark üretmiyordu. Kökte uygulanacak doğal bir hedefi
//     de yok, çünkü padding `CardHeader/Content/Footer`'ın kendi `p-6`'sında. Bu yüzden
//     kök `size`'ı CONTEXT ile alt bölümlere dağıtıyor (aşağıda).
//     KRİTİK: `md` bugünkü `p-6`'yı KORUR → varsayılan kullanımda görsel değişim YOK.
//   • `asChild`: yalnız tipteydi, gövdede hiç okunmuyordu → `...props` ile native div'e
//     sızıyor (`<div aschild="true">`, React uyarısı). Radix `Slot`a bağlandı.

// #646: cva TABANINDAKİ `dark:bg-gray-900` KALDIRILDI — `bg-card` token'ı zaten
// aynı dizede duruyordu, ikisi birden gereksiz bir İKİNCİ katmandı.
//
// NEDEN kaldırıldı (mekanizma): `tailwind-merge` yalnız AYNI değiştirici (modifier)
// kümesindeki sınıfları çakıştırır. Tüketicinin verdiği ÖNEKSİZ `bg-white/90`,
// `dark:` önekli `dark:bg-gray-900` ile aynı grupta görülmediği için ikisi birden
// hayatta kalıyor; koyu temada `.dark .dark\:bg-gray-900` daha yüksek özgüllükle
// kazanıyordu. Yani component, tüketicinin arka planını SESSİZCE eziyordu.
// Ölçüm (gradient-flow demosu, koyu tema): kart rgb(17,24,39)'de kalıyor, üstündeki
// `text-gray-900` metinler TAM 1.00:1 — matematiksel olarak görünmez. Kaldırıldıktan
// sonra `bg-white/90` kazanıyor: 1.00 → 14.46, 2.35 → 6.16, 1.72 → 8.40.
//
// GÖRSEL DELTA (tüketici override'ı YOKken): koyu temada varsayılan kart
// rgb(17,24,39) → rgb(3,7,17) (= `bg-card`). Kartın kendi metniyle kontrastı
// 16.12 → 18.31'e ÇIKAR; kenarlık (`dark:border-gray-800`) yüzeyden 1.17 → 1.35
// ile daha iyi ayrışır. Bu, `elevated` varyantının #310'dan beri zaten yayımladığı
// koyu yüzeyin ta kendisidir (`dark:bg-card`) — yani yeni bir görünüm değil.
// Açık temada hiçbir değişiklik yok (`dark:` sınıfı orada zaten uygulanmıyordu).
//
// #643 (TERS PARİTE — free geride): #646 sonrasında bu dosyada HÂLÂ 12 ham `gray-*`
// sınıfı duruyordu (issue "6" diyordu; yorumsuz gerçek sayım 12: 3+2+3+2+2), pro
// `card.tsx`te 0. Tümü token'a taşındı. Ölçümler (WCAG 2.1 kontrast oranı, önce→sonra):
//
//   • `dark:text-gray-100` / `dark:text-gray-200` (4 yer) → KALDIRILDI.
//     `text-card-foreground` zaten aynı dizede; `dark:` önekli sınıf onu ezmekle
//     kalmıyor, #646'nın `dark:bg-gray-900` için belgelediği tuzağın aynısıyla
//     TÜKETİCİNİN `text-*` override'ını da sessizce eziyordu (farklı değiştirici
//     kümesi → `tailwind-merge` çakıştırmıyor, `.dark` özgüllüğü kazanıyor).
//     Metin/yüzey kontrastı koyu temada 18.31 → 16.19 (AA 4.5'in 3.6 katı).
//   • `dark:border-gray-800` → tabanda `border-border`. Koyu tema 1.37 → 1.36.
//     BONUS: taban yalnız `border` (genişlik) taşıdığı için AÇIK temada kenar rengi
//     token'dan değil Tailwind varsayılanı `gray-200`den geliyordu; artık token.
//     Açık tema 1.24 → 1.23 (görsel olarak ayırt edilemez).
//   • `outline` › `dark:border-gray-700` → KALDIRILDI (taban `border-border` yeterli).
//     Koyu tema kenar/zemin 1.95 → 1.36. Bu bilinçli: `gray-700` sistemdeki TEK
//     aykırı değerdi — input/popover/dialog dahil her component koyu temada zaten
//     `--border`i (1.36) kullanıyor. tokens.css:163-166 `--border`i açıkça
//     "dekoratif" ilan eder (metin eşiği uygulanmaz). Kart, sistemle hizalandı.
//   • `filled` › `dark:bg-gray-800` → `dark:bg-muted`. Yüzey/sayfa-zemini AYRIŞMASI
//     1.37 → 1.49 (İYİLEŞTİ); metin/yüzey 13.34 → 10.87 (AA'nın 2.4 katı).
//     #368 `--muted`i tam bu rol için ("DEKORATİF YÜZEY", koyu temada ayrışmalı)
//     ayarlamıştı.
//     ⚠ Pro'nun seçimi (`dark:bg-secondary`) BİLİNÇLİ OLARAK REDDEDİLDİ: koyu temada
//     `--secondary` = rgb(2,8,23), sayfa zemini rgb(3,7,17) → ayrışma 1.01, yani
//     `filled` yüzeyi fiilen GÖRÜNMEZ. Ham-gri ihlalini görünmez-yüzey ihlaliyle
//     takas etmemek için (#545 dersi) pro yerine `--muted` alındı; pro `card.tsx`
//     de aynı ölçümle `--muted`e çekildi.
//   • `dark:shadow-gray-900/20`, `…/30`, `dark:shadow-gray-950/10` → aynı alfalarla
//     `dark:shadow-black`. Gölge rengi; koyu zeminde ölçülebilir kontrast rolü yok,
//     pro idiyomu. (Not: bu blokta bilerek ardışık eğik-yıldız yazılmaz — depodaki
//     regex tabanlı tarayıcılar onu blok yorum başlangıcı sanıp gerisini yutuyor.)
//   • `glass` › `dark:border-gray-700/30` → `dark:border-white/10` (kenar/cam yüzey
//     1.15 → 1.23, İYİLEŞTİ), `dark:bg-gray-800/10` → `dark:bg-black/10`
//     (yüzey/zemin 1.02 → 1.01; cam varyantı zaten arkasındaki içeriği gösterir).
const cardVariants = cva(
  "rounded-lg border border-border bg-card text-card-foreground shadow-sm dark:shadow-black/20 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-border shadow-none bg-transparent dark:bg-transparent",
        filled: "border-none bg-secondary dark:bg-muted dark:shadow-inner dark:shadow-black/10",
        elevated: "border-none shadow-md dark:shadow-lg dark:shadow-black/30 dark:bg-card",
        gradient: "border-none bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20",
        glass: "border border-white/20 bg-white/10 backdrop-blur-md dark:border-white/10 dark:bg-black/10",
      },
      size: {
        md: "",
        sm: "",
        lg: "",
        xl: "",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "",
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg hover:border-primary/20 dark:hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "default",
    },
  }
);

/**
 * #310: Kart bölümlerinin padding ölçeği. `md` = bugünkü `p-6` — bu, mevcut tüketicide
 * görsel değişim OLMAMASI için zorunlu (varsayılan `size` zaten `md`).
 */
type CardSize = "sm" | "md" | "lg" | "xl";

const CARD_SECTION_PADDING: Record<CardSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

/**
 * Kök `Card`ın çözülmüş `size`ını alt bölümlere taşıyan tek kaynak. Alt component'ler
 * `Card` dışında da tek başına kullanılabildiği için context varsayılanı `md`dir.
 */
const CardSizeContext = React.createContext<CardSize>("md");

/** `default` deprecated alias'tır (#319); kanonik `md`ye eşlenir. */
const resolveCardSize = (size: CardProps["size"]): CardSize =>
  size && size !== "default" ? size : "md";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  microInteraction?: "lift" | "glow" | "scale" | "none";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, radius, interactive, asChild = false, microInteraction = "lift", ...props }, ref) => {
    const resolvedSize = resolveCardSize(size);
    const rootClassName = cn(
      "moonui-theme",
      cardVariants({ variant, size, radius, interactive, className })
    );

    // #310: `asChild` Radix `Slot`a bağlandı. Slot ile motion sarmalayıcı BİRLİKTE
    // kullanılamaz (Slot tek çocuğa prop birleştirir, motion kendi elemanını ister) —
    // bu yüzden asChild verildiğinde micro-interaction atlanır ve bu davranış
    // belgelenir. Görsel etkileşimi tüketici kendi elemanında kurar.
    if (asChild) {
      return (
        <CardSizeContext.Provider value={resolvedSize}>
          <Slot ref={ref} className={rootClassName} {...props} />
        </CardSizeContext.Provider>
      );
    }

    // Interactive özelliği varsa motion.div, yoksa normal div kullan
    if (interactive && microInteraction !== "none") {
      const interactionProps = {
        whileHover: microInteraction === "scale" ? hoverAnimations.scale : 
                    microInteraction === "glow" ? hoverAnimations.glow : 
                    hoverAnimations.lift,
        whileTap: tapAnimations.scale,
      };
      
      return (
        <CardSizeContext.Provider value={resolvedSize}>
          <motion.div
            ref={ref}
            className={rootClassName}
            {...interactionProps}
            {...(props as any)}
          />
        </CardSizeContext.Provider>
      );
    }

    // Non-interactive version
    return (
      <CardSizeContext.Provider value={resolvedSize}>
        <div ref={ref} className={rootClassName} {...props} />
      </CardSizeContext.Provider>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // #310: padding artık kök `Card`ın `size`ından geliyor (eskiden sabit `p-6`).
  const padding = CARD_SECTION_PADDING[React.useContext(CardSizeContext)];
  return (
    <div
      ref={ref}
      className={cn("moonui-theme", "flex flex-col space-y-1.5", padding, className)}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render edilecek element. Varsayılan `"h3"` — DEĞİŞMEDİ.
   *
   * #345: `AlertTitle`ın aksine burada varsayılan bilerek korundu. Bir kart
   * çoğu zaman gerçekten bir bölümdür ve başlığının belge ana hattında olması
   * doğrudur; ayrıca `CardTitle` kütüphanenin her yerinde kullanılıyor.
   *
   * Ama seviye SABİT olduğu için, kart bir H1'in hemen altına konduğunda
   * `heading-order` sıçraması oluşabiliyor ve tüketici bunu düzeltemiyordu.
   * `as` o kapıyı açar: `<CardTitle as="h2">` ya da salt-görsel bir başlık için
   * `<CardTitle as="div">`. Görsel çıktı her durumda aynıdır.
   */
  as?: React.ElementType;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = "h3", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn("moonui-theme", "text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("moonui-theme", "text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const padding = CARD_SECTION_PADDING[React.useContext(CardSizeContext)];
  return (
    <div
      ref={ref}
      className={cn("moonui-theme", padding, "pt-0", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const padding = CARD_SECTION_PADDING[React.useContext(CardSizeContext)];
  return (
    <div
      ref={ref}
      className={cn("moonui-theme", "flex items-center", padding, "pt-0", className)}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
export type { CardSize };
