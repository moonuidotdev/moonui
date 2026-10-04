"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

type SwitchSize = "sm" | "md" | "lg";
type SwitchVariant = "primary" | "success" | "warning" | "destructive" | "secondary";

/**
 * Boyut ve renk varyantları `cva()` ile yönetilir (kütüphane geneli desen).
 * Önceden `size === "x" && "..."` biçiminde manuel zincirleme kullanılıyordu;
 * `defaultVariants` yoktu ve varsayılanlar destructuring'de gizliydi.
 */
const switchVariants = cva(
  [
    "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
    "border-2 border-transparent transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Kapalı durum token'a bağlı; `--input` karanlık modda kendi değerini taşır.
    // (Önceden ayrıca `dark:data-[state=unchecked]:bg-gray-700/70` hardcode'u
    // vardı ve token'ı eziyordu — kaldırıldı.)
    "data-[state=unchecked]:bg-input",
    "dark:focus-visible:ring-primary/40",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-8",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      // #454 — checked track'in İKİ ekseni de ölçüldü (eşik 3:1, WCAG 1.4.11
      // non-text UI). Switch'te bu iki eksen AYNI sayıyı verir, çünkü thumb
      // `bg-background` taşır (switchThumbVariants tabanı):
      //   A) checked track ↔ sayfa/kart zemini  → kontrol "açık" okunuyor mu?
      //   B) thumb ↔ checked track              → tutamacın KONUMU görülüyor mu?
      // Ölçüm zeminleri: `--background` · `--card` · docs kabuğunun gerçek koyu
      // kartı (#111827). Regresyon: __tests__/switch-variant-contrast.test.tsx
      variant: {
        primary: "data-[state=checked]:bg-primary",   // light 4.920 · dark 19.256 ✓
        success: "data-[state=checked]:bg-success",   // light 4.904 · dark  6.043 ✓
        // #454 kardeş kusuru (#424/PR #440 progress · #442/PR #446 slider ile AYNI
        // sınıf, üçüncü component): `--warning` tokens.css'in `.dark` bloğunda
        // EZİLMİYOR, yani iki temada da aynı turuncu. Dark'ta zemin koyu olduğu
        // için geçiyor (9.446), LIGHT'ta beyaz üstünde 2.133 ✗ — açık temada
        // checked warning switch'in tutamacı da kayboluyordu (B ekseni 2.133).
        // ÇÖZÜM (emsalle birebir aynı şekil): eksik tema-uyarlamasını component
        // düzeyinde ver — light'ta skalanın -700 kademesine in, dark'ta semantik
        // token'a DOKUNMA (dark render bit-bit aynı kalır, regresyon yüzeyi sıfır).
        // Light'ta eşiği geçen kademe kümesi {700,800,900,950}; en açık olanı
        // seçildi (turuncu kimliğini en çok koruyan). Ölçülen: 2.133 → 4.923 ✓.
        warning:
          "data-[state=checked]:bg-[rgb(var(--warning-700))] dark:data-[state=checked]:bg-warning",
        destructive: "data-[state=checked]:bg-error", // light 3.781 · dark 5.328 ✓ (dokunulmadı)
        // #454 asıl kusuru: `secondary` varyantı `bg-accent` kullanıyordu — ADI
        // `secondary`, TOKEN'ı `accent`. `--accent` bir YÜZEY token'ı (`hover:bg-accent`
        // tinti) ve iki temada da kendi zeminine bitişik: light rgb(235,239,245)
        // beyaz üstünde 1.154 · dark rgb(29,40,58) 1.359 · docs kartı 1.197.
        // Yani checked switch hem sayfadan hem de kendi tutamacından ayrışmıyordu:
        // "açık" durum GÖRÜNMÜYORDU (switch'in tek işi durumu göstermek).
        //
        // AD ↔ TOKEN KARARI: varyant kendi ailesine, `--secondary-*` slate skalasına
        // bağlandı. `bg-secondary` (semantik) BİLEREK seçilmedi — light'ta `--accent`
        // ile BİREBİR aynı değer (1.154), dark'ta daha da kötü (1.007). Skala
        // taraması (11 kademe × 2 tema × 3 zemin × 2 eksen + kardeş ΔE*ab ≥ 10 klon
        // filtresi): light {500,600,700,800,900,950} · dark {300,400,500} → iki
        // temayı birden geçen TEK kademe **500**, yani `dark:` ayrımına gerek yok.
        // #448'in slider'daki 700/400 ayrımı burada GEREKMEZ ve İSTENMEZ: orada 500
        // elenmişti çünkü slider'ın `secondary` varyantı zaten o rengi kullanıyordu
        // (ΔE = 0.0 → klon). Switch'in `accent` adlı bir varyantı YOK, dolayısıyla
        // 500 serbest ve kardeşlerden ayrık (ΔE: primary 69.5/51.6 · success
        // 63.6/74.8 · warning 96.0 · destructive 85.0 — hepsi ≥ 10).
        // Yan fayda: slider'ın `secondary` varyantı da #389/PR #406'da aynı kademeye
        // sabitlenmişti → aynı varyant adı artık iki component'te aynı rengi veriyor.
        // Ölçülen: A/B light 1.154 → 4.759 ✓ · dark 1.359 → 4.234 ✓ · kart 1.197 → 3.728 ✓.
        secondary: "data-[state=checked]:bg-[rgb(var(--secondary-500))]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  /** Switch boyutu */
  size?: SwitchSize;
  /** Switch renk varyantı */
  variant?: SwitchVariant;
  /** Yükleniyor durumunu gösterir */
  loading?: boolean;
  /** Sol tarafta gösterilecek ikon */
  leftIcon?: React.ReactNode;
  /** Sağ tarafta gösterilecek ikon */
  rightIcon?: React.ReactNode;
  /** Switch açıklaması */
  description?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({
  className,
  size,
  variant,
  loading,
  leftIcon,
  rightIcon,
  description,
  "aria-describedby": ariaDescribedBy,
  ...props
}, ref) => {
  // `description` görsel olarak render ediliyordu ama switch ile hiçbir
  // programatik bağı yoktu — ekran okuyucu açıklamayı okuyamıyordu.
  // Stabil bir id üretilip `aria-describedby` ile bağlanır; tüketicinin
  // kendi verdiği `aria-describedby` korunur.
  const reactId = React.useId()
  const descriptionId = description ? `${reactId}-description` : undefined
  const describedBy =
    [ariaDescribedBy, descriptionId].filter(Boolean).join(" ") || undefined

  return (
    <div className="moonui-theme inline-flex items-center gap-2">
      {leftIcon && <span className="text-muted-foreground">{leftIcon}</span>}
      <SwitchPrimitives.Root
        className={cn(
          switchVariants({ size, variant }),
          loading && "opacity-80 cursor-wait",
          className
        )}
        disabled={loading || props.disabled}
        aria-describedby={describedBy}
        {...props}
        ref={ref}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-muted border-t-primary" />
          </div>
        ) : null}

        <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
      </SwitchPrimitives.Root>
      {rightIcon && <span className="text-muted-foreground">{rightIcon}</span>}
      {description && (
        <span id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </span>
      )}
    </div>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, switchVariants }
export type { SwitchSize, SwitchVariant }
