"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// #318: `variant` TRACK'i boyuyordu, dolguyu ise bağımsız `indicatorVariant`
// boyuyordu ve varsayılanı sabit "primary" idi. Sonuç: `<Progress variant="success" />`
// yeşil track + MAVİ dolgu üretiyordu — deklare edilen varyant dolguya hiç ulaşmıyordu.
// Artık `indicatorVariant` verilmezse `variant`e düşer; açıkça verildiğinde yine ezer.

/**
 * Progress Bileşeni
 *
 * İlerleme durumunu görsel olarak gösteren, tema sistemiyle tam entegre bir bileşen.
 * Yükleme işlemleri, form gönderimi ve diğer zaman alan işlemleri göstermek için kullanılır.
 */

const progressVariants = cva(
  "relative overflow-hidden bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        error: "bg-error/20",
      },
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-2.5",
        xl: "h-3",
        "2xl": "h-4",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "h-2",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md", 
        lg: "rounded-lg",
        full: "rounded-full",
      },
      animation: {
        default: "[&>div]:transition-all [&>div]:duration-500",
        smooth: "[&>div]:transition-all [&>div]:duration-700",
        fast: "[&>div]:transition-all [&>div]:duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "full",
      animation: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1",
  {
    variants: {
      variant: {
        default: "bg-foreground",
        primary: "bg-primary",
        // #372: dolgu `bg-secondary` idi — track (`bg-secondary/20`) ile AYNI
        // yüzey token'ına basıyordu; %20 alfa track ile tam dolgu iki temada da
        // ~1.0 oranında kalıyor, bar görünmüyordu (light rgb(235,239,245) /
        // dark rgb(2,8,23)). `bg-secondary-foreground` BİLEREK seçilmedi:
        // light'ta --primary ile aynı hue/sat'ta yalnız ΔL=%2 (49 vs 51,
        // fill↔fill 1.07), dark'ta birebir --primary değeri (210 40% 98%) —
        // secondary varyantı primary'nin klonuna dönerdi. `--secondary-500`
        // (tokens.css slate skalası, RGB üçlüsü) iki temada da track'e ≥3:1
        // (WCAG 1.4.11) veren TEK kademe: light 4.63, dark 4.23 (gerçek kart
        // #111827 üstünde 3.83; 400 light'ta 2.50 ✗, 600 dark'ta 2.66 ✗).
        // Skala :root'ta tanımlı olduğundan tema değişiminde sabittir;
        // tüketici --secondary-500'ü ezerek özelleştirebilir.
        // Regresyon: __tests__/progress-secondary-contrast.test.ts
        secondary: "bg-[rgb(var(--secondary-500))]",
        success: "bg-success",
        // #424 (#372'nin kardeşi): dolgu `bg-warning`/`bg-error` idi — track
        // (`bg-warning/20` · `bg-error/20`) AYNI token'ın alfalı hâli olduğundan
        // LIGHT temada ayrım kayboluyordu: warning 1.83 · error 2.89 (eşik 3:1,
        // WCAG 1.4.11). DARK tema zaten temizdi (warning 6.97 · error 4.46).
        //
        // KÖK NEDEN: `--warning` ve `--error` tokens.css'te `.dark` bloğunda
        // EZİLMİYOR — iki temada aynı renk. Kardeşleri `--success` (light 29% →
        // dark 36%) ve `--primary` tema-uyarlanabilir olduğu için eşiği geçiyor;
        // bu iki aile o uyarlamadan yoksun kaldığı için light'ta kalıyor.
        //
        // ÇÖZÜM: eksik tema-uyarlamasını component düzeyinde ver — light'ta
        // skalanın -700 kademesine in, dark'ta semantik token'a DOKUNMA.
        // Tema-KÖR bir -700 ataması dark'ı kırardı (docs kartında warning 2.50 ✗
        // · error 2.23 ✗); `dark:` ayrımı tam olarak bunu önler ve dark render'ı
        // bit-bit aynı bırakır. Aynı desen badge.tsx:51-63'te zaten kullanılıyor.
        // Track alfaları BİLEREK `/20` kaldı: altı varyantın tamamı o konvansiyonu
        // paylaşıyor ve alfayı düşürmek track↔zemin ayrımını zayıflatırdı
        // (warning 1.162 → 1.081). Ölçülen sonuç — warning: light 4.24 ✓ /
        // dark 6.97 ✓ (docs kartı #111827: 5.77) · error: light 4.95 ✓ /
        // dark 4.46 ✓ (docs kartı 3.82). Skala token'ları RGB üçlüsüdür
        // (semantiklerin HSL'inden farklı) → `rgb(var(--x-700))` kompozisyonu;
        // `bg-warning-700` YAZILMADI, preset o sınıfı üretmez (#307 ölü-sınıf).
        // Regresyon: __tests__/progress-warning-error-contrast.test.ts
        warning: "bg-[rgb(var(--warning-700))] dark:bg-warning",
        error: "bg-[rgb(var(--error-700))] dark:bg-error",
      },
      animation: {
        default: "transition-all duration-500",
        smooth: "transition-all duration-700",
        fast: "transition-all duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      animation: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /**
   * İlerleme çubuğu değeri (0-100)
   */
  value?: number;
  /**
   * İndikatör (dolgu) için renk varyantı
   */
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  /**
   * İlerleme durumunu gösteren metin görünürlüğü
   */
  showValueLabel?: boolean;
  /**
   * İlerleme değeri etiketi için format (ör: "30%" veya "3/10")
   */
  valueLabel?: string;
  /**
   * Etiket stili
   */
  labelClassName?: string;
  /**
   * Belirsiz ilerleme animasyonu (indeterminate)
   */
  indeterminate?: boolean;
  /**
   * İlerleme değeri maksimumu (default: 100)
   */
  max?: number;
}

const Progress = React.forwardRef<
  HTMLDivElement,
  ProgressProps
>(({
  className,
  value = 0,
  variant,
  size,
  radius,
  animation,
  indicatorVariant,
  showValueLabel = false,
  valueLabel,
  labelClassName,
  indeterminate = false,
  max = 100,
  ...props
}, ref) => {
  // İlerleme değeri 0-100 arasında olmalı
  const normalizedValue = Math.max(0, Math.min(value, max));
  const percentage = max > 0 ? (normalizedValue / max) * 100 : 0;
  
  // Etiket içeriği
  const label = valueLabel || `${Math.round(percentage)}%`;

  // Tüketici kendi adını verdiyse varsayılanı basma. `aria-labelledby` accname
  // algoritmasında `aria-label`i zaten ezer; yine de ikisini birden basmamak daha temiz.
  const hasExplicitName =
    props["aria-label"] != null || props["aria-labelledby"] != null;
  
  return (
    <>
      {showValueLabel && (
        <div className="flex justify-between items-center mb-1">
          <span 
            className={cn(
              "text-sm font-medium text-muted-foreground",
              labelClassName
            )}
          >
            {label}
          </span>
        </div>
      )}
      <div
        ref={ref}
        className={cn("moonui-theme", progressVariants({ variant, size, radius, animation }), className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : normalizedValue}
        // #343: WAI-ARIA `progressbar`ın adlandırılmış olmasını ister. Adsız kalırsa
        // ekran okuyucu yalnız yüzdeyi duyurur: "67%" — neyin %67'si belli olmaz.
        // Varsayılan ad component'ten gelir; "tüketici hatırlarsa" bir a11y stratejisi
        // değildir (#334'ün dersi). `{...props}` bu satırlardan SONRA yayıldığı için
        // tüketicinin verdiği `aria-label` her zaman kazanır.
        aria-label={hasExplicitName ? undefined : "Progress"}
        // Sayısal olmayan bir etiket verildiğinde ("3/10", "Uploading") ekran okuyucu
        // ham sayı yerine bunu okumalı.
        aria-valuetext={valueLabel}
        {...props}
      >
        <div
          className={cn(
            progressIndicatorVariants({ variant: indicatorVariant ?? variant ?? "primary", animation }),
            indeterminate && "animate-indeterminate-progress"
          )}
          style={indeterminate ? {} : { transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    </>
  );
});
Progress.displayName = "Progress";

// Not: Belirsiz ilerleme animasyonu için CSS keyframe styles.css veya Tailwind config içinde tanımlanmalı
// @keyframes indeterminate-progress içeren bir tanımlama yapılmalıdır
// .animate-indeterminate-progress sınıfı da bu animasyonu kullanmalıdır

export { Progress, progressVariants };
