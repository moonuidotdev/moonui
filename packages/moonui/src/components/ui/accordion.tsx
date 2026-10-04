"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

// #307: `dark:hover:text-primary-400` ÖLÜ SINIFTI — tailwind-preset'te `primary`
// yalnız DEFAULT+foreground içeriyor, `400` ölçeği SADECE `brand` ailesinde tanımlı.
// Sınıf hiç CSS üretmiyordu, yani karanlık modda hover rengi işlevsizdi.
// Kaldırıldı: `hover:text-primary` zaten yeterli — `--primary` hem :root hem .dark
// bloğunda tanımlı olduğu için her iki temada doğru rengi verir.

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    // #661-17: ham `border-gray-200 dark:border-gray-800` → `border-border`.
    // Pro ikizi (accordion.tsx:21-23) zaten `border-border` kullanıyor; free
    // taraf ham palette kalınca tema/marka özelleştirmesi bu kenarlığa
    // İŞLEMİYORDU. Token değerleri görsel olarak denk: --border açık temada
    // 214.3 31.8% 91.4% (≈ gray-200), koyu temada 216 34% 17% (≈ gray-800).
    className={cn("moonui-theme", "border-b border-border", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // #661-17: `dark:text-gray-100` KALDIRILDI — tetikleyici artık iki temada
        // da `--foreground`u miras alır (koyu temada 213 31% 91% ≈ gray-100).
        "flex flex-1 items-center justify-between py-4 font-medium transition-all",
        "hover:underline hover:text-primary",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 opacity-70 group-hover:opacity-100" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      // #661-17: ham `text-gray-700 dark:text-gray-300` → `text-foreground/80`.
      // Ölçüldü (iki tema, kart zemini): açık 10.30 → 11.48, koyu 12.19 → 9.44.
      // İkisi de AA'nın (4.5) çok üstünde, yani eşik geçilmiyor — `#545 ihlal
      // takası` sınıfı bir gerileme YOK. `text-muted-foreground` bilerek
      // SEÇİLMEDİ: açık temada 4.76'ya inip gövde metnini görünür biçimde
      // soldururdu (§9 estetik değişiklik olurdu).
      "overflow-hidden text-sm text-foreground/80 transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
