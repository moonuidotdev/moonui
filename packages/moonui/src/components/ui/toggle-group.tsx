"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { toggleVariants } from "./toggle"

/**
 * ToggleGroup Component
 *
 * Tek (single) veya çoklu (multiple) seçim destekleyen segmented toggle seti.
 * Radix UI `ToggleGroup` primitive'i üzerine kuruludur; roving-tabindex klavye
 * navigasyonu, tek/çoklu seçim mantığı ve erişilebilirlik rolleri (single için
 * `role="radiogroup"` + item `role="radio"`, multiple için `role="toolbar"` +
 * item `aria-pressed`) Radix tarafından yönetilir — bu davranış yeniden yazılmaz.
 *
 * `variant` ve `size` değerleri bir React context (`ToggleGroupContext`) ile
 * item'lara yayılır (shadcn deseni). Her `ToggleGroupItem`, `Toggle` bileşeniyle
 * görsel parite için `toggleVariants`'i yeniden kullanır — aktif durum
 * `data-[state=on]:bg-accent data-[state=on]:text-accent-foreground` ile stillenir.
 */

// Grup düzeyinde belirlenen variant/size'i item'lara taşıyan context (shadcn deseni).
// Item, önce context değerini; context tanımsızsa kendi prop'unu kullanır.
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  // #319: kanonik skalada `default` bir basamak ADI değil; `toggleVariants` artık `md`
  // kullanıyor (aynı CSS: h-10 px-3). Context varsayılanı da ona hizalandı — aksi hâlde
  // context, deprecated alias'ı item'lara yayardı.
  size: "md",
  variant: "default",
})

// NOT: Radix `ToggleGroup.Root` prop tipi ayrımlı bir union'dır
// (type="single" → value: string, type="multiple" → value: string[]). Bir `interface`
// union'ı `extend` edemediğinden burada intersection'lı `type` alias kullanılır — bu,
// tek/çoklu ayrımını (discriminated union) korur.
export type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleVariants>

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "moonui-theme inline-flex items-center justify-center gap-1",
      // Radix roving-focus kök elemana `data-orientation` yazar; dikey yerleşim
      // buna bağlanır. Yatay/tanımsız durumda taban sınıflar geçerli kalır —
      // yani mevcut render değişmez. Kardeş `button-group` ile desen paritesi.
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-start",
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = "ToggleGroup"

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  // Grup context'i varsa onun değeri, yoksa item'ın kendi prop'u geçerli olur.
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
