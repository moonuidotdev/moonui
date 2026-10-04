"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "../../lib/utils"

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /**
   * #308-1: Kaydırma alanının klavyeyle odaklanabilir olup olmayacağı. Varsayılan `true`
   * — odaklanabilir içeriği olmayan bir kaydırma alanı aksi hâlde klavyeyle erişilemez
   * (WCAG 2.1.1). Fazladan sekme durağı istenmeyen durumlarda `false`.
   */
  focusable?: boolean
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, focusable = true, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {/*
      #308-1: Viewport'a `tabIndex` VERİLMİYORDU ve bu davranış Radix'ten kalıtsal DEĞİL
      (`@radix-ui/react-scroll-area` kaynağında tabIndex geçmiyor). Sonuç: içinde
      odaklanabilir eleman bulunmayan bir ScrollArea klavyeyle HİÇ kaydırılamıyordu
      (WCAG 2.1.1). Kaydırılabilir bölgenin odaklanabilir olması kanonik çözümdür;
      ek sekme durağı istemeyen tüketici `focusable={false}` diyebilir.
    */}
    <ScrollAreaPrimitive.Viewport
      tabIndex={focusable ? 0 : undefined}
      className="h-full w-full rounded-[inherit]"
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }