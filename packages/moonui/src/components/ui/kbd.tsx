"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Premium Kbd Component
 *
 * Klavye tuşlarını (⌘, Ctrl, K vb.) görsel olarak temsil eden standalone
 * bir rozet bileşeni. Dark ve light modda uyumlu, token tabanlı stiller
 * kullanır ve hafif kabartma/gölge ile fiziksel bir tuş görünümü verir.
 */
const kbdVariants = cva(
  [
    // Temel klavye-tuşu görünümü — token tabanlı, hardcoded renk yok
    "inline-flex items-center justify-center rounded",
    "border border-border bg-muted",
    "px-1.5 font-mono font-medium text-muted-foreground",
    // Alt kenarda hafif kabartma (border token'ı ile — [#...] hex sınıfı DEĞİL)
    "shadow-[0_1px_0_1px_hsl(var(--border))]",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 text-[10px]",
        md: "h-6 min-w-6 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** Tuş içeriği (⌘, K, Ctrl vb.) */
  children: React.ReactNode;
}

/**
 * Premium Kbd Component
 *
 * @param props - Kbd bileşeni özellikleri
 * @param props.size - Tuş boyutu ("sm" | "md")
 * @param props.children - Tuş içeriği (⌘, K, Ctrl vb.)
 */
const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn("moonui-theme", kbdVariants({ size }), className)}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);
Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
