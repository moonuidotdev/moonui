"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Premium Rating Component
 *
 * Standalone yıldız-değerlendirme bileşeni (input + display).
 * Kontrollü/kontrolsüz kullanım, yarım-yıldız hassasiyeti, salt-gösterim modu
 * ve tam klavye erişilebilirliği (radiogroup) sunar. Dark/light modda uyumludur.
 */

const ratingVariants = cva(
  [
    "moonui-theme inline-flex items-center rounded-md outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Boyuta göre ikon ölçüsü (yarım-yıldız maskesinin hizalanması için sabit px gerekir)
const iconSizeMap: Record<NonNullable<VariantProps<typeof ratingVariants>["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  /** Kontrollü değer (0..max) */
  value?: number;
  /** Kontrolsüz başlangıç değeri */
  defaultValue?: number;
  /** Değer değiştiğinde çağrılır */
  onValueChange?: (value: number) => void;
  /** Yıldız sayısı (varsayılan 5) */
  max?: number;
  /** Salt-gösterim: etkileşim yok, aria-readonly işaretlenir */
  readOnly?: boolean;
  /** Yarım-yıldız desteği (varsayılan "full") */
  precision?: "full" | "half";
  /** Özel ikon (varsayılan lucide Star) */
  icon?: React.ReactNode;
}

/**
 * Premium Rating Component
 *
 * @param props.value - Kontrollü değer
 * @param props.defaultValue - Kontrolsüz başlangıç değeri
 * @param props.onValueChange - Değer değişim geri çağrımı
 * @param props.max - Yıldız sayısı (varsayılan 5)
 * @param props.readOnly - Salt-gösterim modu
 * @param props.precision - "full" | "half" hassasiyet
 * @param props.icon - Özel ikon
 * @param props.size - Boyut (sm | md | lg)
 */
const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      max = 5,
      readOnly = false,
      precision = "full",
      icon,
      size,
      "aria-label": ariaLabel = "Rating",
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "md";
    const iconSizeClass = iconSizeMap[resolvedSize];
    const step = precision === "half" ? 0.5 : 1;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(defaultValue ?? 0);
    const currentValue = isControlled ? value ?? 0 : internalValue;

    // Hover önizlemesi (geçici doldurma)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const displayValue = hoverValue !== null ? hoverValue : currentValue;

    // Değeri işle: kontrolsüzde iç state'i güncelle, her durumda geri çağrımı tetikle
    const commit = React.useCallback(
      (next: number) => {
        if (readOnly) return;
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [readOnly, isControlled, onValueChange]
    );

    // Klavye: ok-tuşları değeri step kadar artır/azalt, Home/End min/max
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (readOnly) return;
        let next: number | null = null;
        switch (event.key) {
          case "ArrowRight":
          case "ArrowUp":
            next = Math.min(max, currentValue + step);
            break;
          case "ArrowLeft":
          case "ArrowDown":
            next = Math.max(step, currentValue - step);
            break;
          case "Home":
            next = step;
            break;
          case "End":
            next = max;
            break;
          default:
            return;
        }
        event.preventDefault();
        commit(next);
      },
      [readOnly, max, currentValue, step, commit]
    );

    // #661-7: `role="radiogroup"` sarmalayıcısı tek tab durağıydı ve her
    // `role="radio"` düğmesi `tabIndex={-1}` taşıyordu; ne roving-tabindex ne de
    // `aria-activedescendant` vardı. Klavyeyle değer DEĞİŞİYORDU ama yardımcı
    // teknolojiye HANGİ radyonun aktif olduğu hiç bildirilmiyordu (ARIA composite
    // widget sözleşmesi ihlali). Odak DOM'da yerinde kalsın diye
    // `aria-activedescendant` yolu seçildi — klavye davranışı değişmez.
    const reactId = React.useId();
    const optionId = React.useCallback(
      (optionValue: number) => `${reactId}-option-${String(optionValue).replace(".", "-")}`,
      [reactId]
    );
    // Henüz seçim yoksa ARIA'nın istediği gibi İLK seçenek aktif kabul edilir.
    const activeValue = currentValue >= step && currentValue <= max ? currentValue : step;

    // İkonu doldurmalı/boş olarak üret (özel ikon desteklenir)
    const renderIcon = (filled: boolean): React.ReactNode => {
      if (React.isValidElement(icon)) {
        const element = icon as React.ReactElement<{ className?: string }>;
        return React.cloneElement(element, {
          className: cn(
            iconSizeClass,
            "shrink-0",
            filled && "fill-current",
            element.props?.className
          ),
        });
      }
      return (
        <Star
          className={cn(iconSizeClass, "shrink-0", filled && "fill-current")}
          aria-hidden="true"
        />
      );
    };

    const stars = Array.from({ length: max }, (_, index) => index + 1);

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        aria-readonly={readOnly || undefined}
        aria-activedescendant={readOnly ? undefined : optionId(activeValue)}
        tabIndex={readOnly ? undefined : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHoverValue(null)}
        className={cn(ratingVariants({ size }), className)}
        {...props}
      >
        {stars.map((starValue) => {
          // Bu yıldızın doluluk oranı (0..1) — yarım yıldız için ondalık olur
          const fraction = Math.max(0, Math.min(1, displayValue - (starValue - 1)));
          const halfValue = starValue - 0.5;

          return (
            <span
              key={starValue}
              data-slot="rating-star"
              className={cn(
                "relative inline-flex shrink-0",
                !readOnly && "cursor-pointer"
              )}
            >
              {/* Boş katman (görsel taban) */}
              <span aria-hidden="true" className="inline-flex text-muted-foreground/30">
                {renderIcon(false)}
              </span>

              {/* Dolu katman — overflow-hidden maske ile kısmi doldurma.
                  #664 S3: `text-amber-400` → `--rating-star-rgb` (tokens.css).
                  Değer AYNI (Tailwind amber-400) — yıldız rozeti bir DURUM rengi
                  değil marka/konvansiyon rengidir, `--warning` token'ına
                  çevirmek farklı bir tona (yellow ailesi) kayardı (§9). */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-full overflow-hidden text-[rgb(var(--rating-star-rgb))]"
                style={{ width: `${fraction * 100}%` }}
              >
                {renderIcon(true)}
              </span>

              {/* Etkileşim katmanı (salt-gösterimde yok) */}
              {!readOnly && precision === "half" && (
                <>
                  <button
                    type="button"
                    role="radio"
                    id={optionId(halfValue)}
                    aria-checked={currentValue === halfValue}
                    aria-label={`${halfValue} stars`}
                    tabIndex={-1}
                    onClick={() => commit(halfValue)}
                    onMouseEnter={() => setHoverValue(halfValue)}
                    className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer bg-transparent"
                  />
                  <button
                    type="button"
                    role="radio"
                    id={optionId(starValue)}
                    aria-checked={currentValue === starValue}
                    aria-label={`${starValue} stars`}
                    tabIndex={-1}
                    onClick={() => commit(starValue)}
                    onMouseEnter={() => setHoverValue(starValue)}
                    className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer bg-transparent"
                  />
                </>
              )}

              {!readOnly && precision === "full" && (
                <button
                  type="button"
                  role="radio"
                  id={optionId(starValue)}
                  aria-checked={currentValue === starValue}
                  aria-label={`${starValue} ${starValue === 1 ? "star" : "stars"}`}
                  tabIndex={-1}
                  onClick={() => commit(starValue)}
                  onMouseEnter={() => setHoverValue(starValue)}
                  className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                />
              )}
            </span>
          );
        })}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export { Rating, ratingVariants };
