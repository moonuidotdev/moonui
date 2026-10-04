"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Spinner Component
 *
 * Bağımsız (standalone) dönen yükleme göstergesi. Asenkron işlemler
 * sırasında kullanıcıya süregelen bir aktivite olduğunu bildirmek için
 * kullanılır.
 *
 * Erişilebilirlik: `role="status"` + `aria-live="polite"` ile ekran
 * okuyuculara duyurulur; görsel olarak gizli (`sr-only`) `label` metni
 * seslendirilir. `prefers-reduced-motion` açıkken animasyon
 * `motion-reduce:animate-none` ile durdurulur.
 *
 * Renk `currentColor` üzerinden miras alınır; `text-primary`, `text-muted-foreground`
 * gibi metin renk yardımcılarıyla renklendirilir (hardcoded renk yoktur).
 */

// Dönen halka (default) varyantının temel stilleri + boyut eşlemesi
const spinnerVariants = cva(
  [
    "inline-block shrink-0 rounded-full",
    "border-current border-t-transparent",
    "animate-spin motion-reduce:animate-none",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2", // 16px
        md: "h-6 w-6 border-2", // 24px
        lg: "h-8 w-8 border-[3px]", // 32px
        xl: "h-10 w-10 border-4", // 40px
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Dots varyantı için nokta boyutu eşlemesi (renk `currentColor` ile gelir)
const dotSizeMap = {
  sm: "h-1 w-1",
  md: "h-1.5 w-1.5",
  lg: "h-2 w-2",
  xl: "h-2.5 w-2.5",
} as const;

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Görsel stil: dönen halka (`default`) veya zıplayan noktalar (`dots`)
   */
  variant?: "default" | "dots";
  /**
   * Ekran okuyucular için erişilebilir metin (görsel olarak gizli)
   * @default "Loading"
   */
  label?: string;
}

/**
 * Spinner — dönen yükleme göstergesi
 *
 * @param props.size - Gösterge boyutu (`sm` | `md` | `lg` | `xl`)
 * @param props.variant - Görsel stil (`default` halka | `dots` noktalar)
 * @param props.label - Ekran okuyucular için erişilebilir metin (varsayılan "Loading")
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant = "default", label = "Loading", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "moonui-theme inline-flex items-center justify-center",
          className
        )}
        {...props}
      >
        {variant === "dots" ? (
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "inline-block rounded-full bg-current",
                  "animate-bounce motion-reduce:animate-none",
                  dotSizeMap[size ?? "md"]
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        ) : (
          <span className={cn(spinnerVariants({ size }))} aria-hidden="true" />
        )}
        {/* Görsel olarak gizli erişilebilir metin */}
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
