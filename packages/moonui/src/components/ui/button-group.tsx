"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "./button";

/**
 * Premium ButtonGroup Component
 *
 * Bitişik (segmentli) veya boşluklu buton grupları için yüksek kaliteli,
 * erişilebilir bir kapsayıcı bileşen. Yatay/dikey yerleşim, bitişik kenar
 * radius birleştirme ve çocuk `<Button>`'lara size/variant yayılımı sunar.
 *
 * Tamamen token-tabanlıdır: kenarlık ve köşe yuvarlama değerleri mevcut Button
 * token'larından gelir; hardcoded renk YOKtur.
 */
const buttonGroupVariants = cva(
  // Temel kapsayıcı: inline-flex; çocuklar akış içinde hizalanır
  "moonui-theme inline-flex",
  {
    variants: {
      orientation: {
        // Yatay: butonlar dikeyde ortalanır (içerik-genişliği korunur)
        horizontal: "flex-row items-center",
        // Dikey: butonlar aynı genişliğe uzar (items-stretch) → kenarlar hizalanır
        vertical: "flex-col items-stretch",
      },
      attached: {
        // Bitişik: boşluk yok; radius birleştirme compoundVariants ile uygulanır
        true: "",
        // Boşluklu: normal aralık, radius korunur
        false: "gap-2",
      },
    },
    compoundVariants: [
      {
        // Yatay + bitişik: bitişik yatay kenarlar düzleşir, -ml-px ile kenarlık örtüşür
        orientation: "horizontal",
        attached: true,
        class: [
          "[&>*:not(:first-child)]:rounded-l-none",
          "[&>*:not(:last-child)]:rounded-r-none",
          "[&>*:not(:first-child)]:-ml-px",
        ],
      },
      {
        // Dikey + bitişik: bitişik dikey kenarlar düzleşir, -mt-px ile kenarlık örtüşür
        orientation: "vertical",
        attached: true,
        class: [
          "[&>*:not(:first-child)]:rounded-t-none",
          "[&>*:not(:last-child)]:rounded-b-none",
          "[&>*:not(:first-child)]:-mt-px",
        ],
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
    },
  }
);

// ButtonGroup component props
export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  /** Çocuk Button'lara yayılacak boyut (yalnızca çocuk kendi size'ını vermemişse) */
  size?: ButtonProps["size"];
  /** Çocuk Button'lara yayılacak varyant (yalnızca çocuk kendi variant'ını vermemişse) */
  variant?: ButtonProps["variant"];
}

/**
 * Premium ButtonGroup Component
 *
 * @param props - ButtonGroup bileşeni özellikleri
 * @param props.orientation - Yerleşim yönü ("horizontal" | "vertical"), varsayılan "horizontal"
 * @param props.attached - Bitişik (segmentli) mi yoksa boşluklu mu, varsayılan true
 * @param props.size - Çocuk Button'lara yayılacak boyut (opsiyonel)
 * @param props.variant - Çocuk Button'lara yayılacak varyant (opsiyonel)
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, orientation, attached, size, variant, children, ...props },
    ref
  ) => {
    // size/variant yalnızca en az biri tanımlıysa çocuklara enjekte edilir
    const shouldPropagate = size !== undefined || variant !== undefined;

    const enhancedChildren = shouldPropagate
      ? React.Children.map(children, (child) => {
          // Geçersiz element (string/number/null) veya Button olmayan çocuklar
          // GRACEFUL geçilir — geçersiz prop enjekte edilmez
          if (!React.isValidElement(child) || child.type !== Button) {
            return child;
          }

          const childProps = child.props as ButtonProps;

          // Çocuğun kendi prop'u önceliklidir (child.props.size ?? size)
          return React.cloneElement(child as React.ReactElement<ButtonProps>, {
            size: childProps.size ?? size,
            variant: childProps.variant ?? variant,
          });
        })
      : children;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(buttonGroupVariants({ orientation, attached }), className)}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup, buttonGroupVariants };
