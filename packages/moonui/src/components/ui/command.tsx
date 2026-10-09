"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Command as CommandPrimitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Dialog, DialogContent, DialogTitle } from "./dialog"

/**
 * Command (Komut Paleti) Bileşeni
 * 
 * Gerçek command palette işlevselliği ile klavye navigasyonu, arama ve filtreleme.
 * cmdk kütüphanesi üzerine inşa edilmiş, tam özellikli command interface.
 */

const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        glass: "bg-background/80 text-foreground backdrop-blur-sm",
        bordered: "bg-popover text-popover-foreground border border-border",
      },
      size: {
        sm: "min-h-[200px]",
        md: "min-h-[300px]",
        lg: "min-h-[400px]",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "min-h-[300px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

/**
 * cmdk seçili öğeyi `scrollIntoView({ block: "nearest" })` ile görünüme alır: bileşen takılınca ve
 * seçim değişince (öğe grubun ilkiyse grup başlığı için de). Tarayıcı bu çağrıda listeyle birlikte
 * TÜM kaydırılabilir ataları — sayfanın kendisini de — kaydırır. Sayfaya gömülü bir Command, ziyaretçi
 * aşağı kaydırmışken geç takılırsa sayfa Command'a geri çekilir. Öğe ve başlık yalnız en yakın
 * `[cmdk-list]` içinde ('nearest' anlamıyla) görünüme alınır; liste dışındaysa yerel davranışa düşer.
 */
function scrollWithinList(this: HTMLElement, arg?: boolean | ScrollIntoViewOptions) {
  const list = this.closest<HTMLElement>("[cmdk-list]")
  if (!list) return Element.prototype.scrollIntoView.call(this, arg)
  const box = list.getBoundingClientRect()
  const own = this.getBoundingClientRect()
  if (own.top < box.top) list.scrollTop -= box.top - own.top
  else if (own.bottom > box.bottom) list.scrollTop += own.bottom - box.bottom
}

function containScroll(node: HTMLElement | null | undefined) {
  if (node) node.scrollIntoView = scrollWithinList
}

// Grup başlığını cmdk kendisi çizer (ref'i yok): grubun ref'inden bulunur.
function containGroupScroll(node: HTMLElement | null) {
  containScroll(node?.querySelector<HTMLElement>(":scope > [cmdk-group-heading]"))
}

function useContainedRef<T extends HTMLElement>(ref: React.ForwardedRef<T>, contain: (node: T | null) => void) {
  return React.useCallback((node: T | null) => {
    contain(node)
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }, [ref, contain])
}

// Command bileşeni - cmdk primitive wrapper
interface CommandProps 
  extends React.ComponentProps<typeof CommandPrimitive>,
    VariantProps<typeof commandVariants> {}

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, variant, size, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("moonui-theme", commandVariants({ variant, size }), className)}
    {...props}
  />
))
// NOT: cmdk primitive'leri displayName tanımlamaz (Radix'ten farklı olarak). Bu yüzden
// `CommandPrimitive.*.displayName` okumak `undefined` üretiyordu ve React DevTools ile hata
// mesajlarında bileşenler isimsiz görünüyordu. Kütüphane genelindeki konvansiyona uyarak
// displayName'ler açık string olarak verilir.
Command.displayName = "Command"

// CommandDialog bileşeni
interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  commandClassName?: string
  children?: React.ReactNode
}

const CommandDialog = ({ 
  children, 
  commandClassName,
  ...props 
}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg" hideCloseButton>
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <Command className={cn(
          "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
          commandClassName
        )}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// CommandInput bileşeni
interface CommandInputProps 
  extends React.ComponentProps<typeof CommandPrimitive.Input> {}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = "CommandInput"

// CommandList bileşeni
interface CommandListProps 
  extends React.ComponentProps<typeof CommandPrimitive.List> {}

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("moonui-theme", "max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = "CommandList"

// CommandEmpty bileşeni
interface CommandEmptyProps 
  extends React.ComponentProps<typeof CommandPrimitive.Empty> {}

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("moonui-theme", "py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
CommandEmpty.displayName = "CommandEmpty"

// CommandGroup bileşeni
interface CommandGroupProps 
  extends React.ComponentProps<typeof CommandPrimitive.Group> {}

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => {
  const groupRef = useContainedRef(ref, containGroupScroll)
  return (
  <CommandPrimitive.Group
    ref={groupRef}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
  )
})
CommandGroup.displayName = "CommandGroup"

// CommandSeparator bileşeni
interface CommandSeparatorProps 
  extends React.ComponentProps<typeof CommandPrimitive.Separator> {}

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    /**
     * #308-6: cmdk, Separator'a `role="separator"` basıyor ve bu eleman
     * `CommandList`'in (`role="listbox"`) çocuğu oluyor → listbox'ın izinli çocuğu
     * yalnız `option`/`group` olduğu için axe `aria-required-children` (critical) veriyordu.
     *
     * `role` EZİLEMİYOR: cmdk 1.1.1 `{...props, "cmdk-separator":"", role:"separator"}`
     * sırasıyla yazıyor, yani kendi rolü prop'lardan SONRA geliyor (kaynak doğrulandı).
     * `aria-hidden` ise prop yayılımının içinde olduğu için geçiyor — ve ayraç zaten
     * tümüyle dekoratif olduğundan erişilebilirlik ağacından çıkarılması DOĞRU davranış.
     * Böylece listbox'ın sahiplendiği çocuklar arasında görünmez.
     */
    aria-hidden="true"
    className={cn("moonui-theme", "-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = "CommandSeparator"

// CommandItem bileşeni
interface CommandItemProps 
  extends React.ComponentProps<typeof CommandPrimitive.Item> {}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => {
  const itemRef = useContainedRef(ref, containScroll)
  return (
  <CommandPrimitive.Item
    ref={itemRef}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
  )
})
CommandItem.displayName = "CommandItem"

// CommandShortcut bileşeni - utility component
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

// #308-5: Sekiz Props interface'inin HİÇBİRİ export edilmiyordu → tüketici sarmalayıcı
// yazarken tipi yeniden türetmek zorundaydı.
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandSeparatorProps,
  CommandItemProps,
}