"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

// #296: Form kontrolü kenarlıkları hardcode Tailwind grisi kullanıyordu ve
// `--input` token'ını tamamen atlıyordu; #284'ün token onarımı bu yüzeylere
// hiç ulaşmıyordu. Ölçüldü (WCAG 1.4.11, eşik 3.0):
//   border-gray-200 1.24 · border-gray-300 1.47 · dark:border-gray-700 1.72
//   dark:border-gray-600 2.35 · hover:border-gray-400 2.54  → hepsi KALIYOR
// `border-input` ile: açık 3.11, koyu 3.37 — ikisi de geçiyor.
// Hover kenarlık ezmeleri kaldırıldı: taban kenarlık zaten eşiği geçiyor,
// ayrı bir hover grisi tutmak yalnız token'ı yeniden atlamak olurdu.
// NOT: text-gray-* sınıflarına DOKUNULMADI — hepsi kontrastı geçiyor
// (4.83–17.74); onları çevirmek estetik refactor olurdu, a11y kazancı yok.

/**
 * Premium Select Component
 * 
 * Advanced dropdown/select component with variants, sizes and accessibility features.
 * Compatible with dark and light mode, providing a modern user experience with smooth animations.
 */

// Directly re-exporting the Root component
const Select = SelectPrimitive.Root
Select.displayName = "Select"

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

type SelectTriggerVariant = "standard" | "outline" | "ghost" | "underline";
type SelectTriggerSize = "sm" | "md" | "lg";

/**
 * Trigger varyantları `cva()` ile yönetilir (kütüphane geneli desen). Önceden
 * `variant === "x" && "..."` manuel zincirlemesi kullanılıyor ve tüm renkler ham
 * `gray-*` paletiyle yazılıyordu — tema/karanlık mod bu değerleri etkileyemiyordu.
 * Artık semantik token'lara bağlı (`border-input`, `bg-background`, `bg-muted`…).
 */
const selectTriggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-1 rounded-md transition-all duration-200",
    "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    "focus-visible:outline-none text-foreground",
  ],
  {
    variants: {
      variant: {
        standard:
          "border border-input bg-background hover:border-ring focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
        outline:
          "border border-input bg-transparent hover:border-ring focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
        ghost:
          "border-none bg-muted hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-primary/30",
        underline:
          "border-t-0 border-l-0 border-r-0 border-b border-input rounded-none px-0 bg-transparent hover:border-ring focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary",
      },
      size: {
        sm: "h-8 text-xs px-2",
        md: "h-10 text-sm px-3",
        lg: "h-12 text-base px-4",
      },
      state: {
        none: "",
        error: "border-error focus-visible:ring-error/30 focus-visible:border-error",
        success:
          "border-success focus-visible:ring-success/30 focus-visible:border-success",
      },
    },
    defaultVariants: {
      variant: "standard",
      size: "md",
      state: "none",
    },
  }
)

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Visual variant */
  variant?: SelectTriggerVariant;
  /** Size */
  size?: SelectTriggerSize;
  /** Error state */
  error?: boolean | string;
  /** Success state */
  success?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon displayed on the left */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right (instead of default chevron) */
  rightIcon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant, size, error, success, loading, leftIcon, rightIcon, ...props }, ref) => {
  /**
   * #340: `SelectPrimitive.Trigger` `role="combobox"` render eder. ARIA'da bu rol
   * **"name from author"**dur — yani erişilebilir ad İÇERİKTEN GELMEZ. Tetikleyicinin
   * içindeki görünür metin ("Select a theme") gözle okunur ama ekran okuyucuya HİÇ
   * ad taşımaz; axe bunu `button-name` (critical) sayar.
   *
   * Sonuç: `aria-label` verilmeyen HER MoonUI Select adsızdı — docs örneği değil,
   * component yüzeyi. Bu yüzden tetikleyicinin görünür içeriğine bir id verilip
   * `aria-labelledby` ile ona bağlanıyor: ad, kullanıcının GÖRDÜĞÜ metin olur.
   *
   * Tüketici kendi `aria-label`/`aria-labelledby`sini verdiyse ona dokunulmaz.
   */
  const icerikId = React.useId()
  const isNamed =
    props["aria-label"] != null || props["aria-labelledby"] != null

  return (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      selectTriggerVariants({
        variant,
        size,
        state: error ? "error" : success ? "success" : "none",
      }),
      className
    )}
    {...props}
    disabled={props.disabled || loading}
    // `error` görsel olarak işaretleniyordu ama yardımcı teknolojiye hiç
    // duyurulmuyordu; Input/Textarea aynı kavramda `aria-invalid` set ediyor.
    aria-invalid={error ? true : undefined}
    data-error={error ? true : undefined}
    data-success={success ? true : undefined}
    data-loading={loading ? true : undefined}
    aria-labelledby={isNamed ? props["aria-labelledby"] : icerikId}
  >
    <div id={icerikId} className="flex items-center flex-1 gap-2">
      {leftIcon && (
        <span className="flex items-center justify-center text-muted-foreground">
          {leftIcon}
        </span>
      )}
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      ) : children}
    </div>
    {!loading && (
      <SelectPrimitive.Icon asChild>
        {rightIcon ? (
          <span className="opacity-60">{rightIcon}</span>
        ) : (
          <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
        )}
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * Scroll Up Button Component
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground transition-colors",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * Scroll Down Button Component
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground transition-colors",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", side = "bottom", sideOffset = 4, align = "start", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      align={align}
      avoidCollisions={false}
      className={cn(
        ["relative z-50 max-h-96 min-w-[8rem] overflow-hidden",
        "rounded-md border border-input",
        "bg-background dark:bg-gray-800/80 backdrop-blur-sm text-foreground dark:text-gray-200",
        "shadow-lg dark:shadow-gray-900/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", 
        "data-[state=open]:duration-150"],
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("moonui-theme", "py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

type SelectItemVariant = "default" | "subtle" | "destructive" | "success" | "warning";
type SelectItemSize = "sm" | "md" | "lg";

export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  /** Visual variant */
  variant?: SelectItemVariant;
  /** Size */
  size?: SelectItemSize;
  /** Icon displayed on the right */
  rightIcon?: React.ReactNode;
  /** Custom indicator icon (instead of default check) */
  customIndicator?: React.ReactNode;
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, variant = "default", size = "md", rightIcon, customIndicator, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "moonui-theme",
      "relative flex w-full cursor-default select-none items-center rounded-sm outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "transition-colors duration-150",

      /* Size variants */
      size === "sm" && "py-1 pl-7 pr-2 text-xs",
      size === "md" && "py-1.5 pl-8 pr-2 text-sm",
      size === "lg" && "py-2 pl-9 pr-3 text-base",
      
      /* Color variants */
      variant === "default" && "focus:bg-accent focus:text-accent-foreground dark:focus:bg-gray-700 dark:focus:text-gray-100",
      variant === "subtle" && "focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-foreground dark:focus:text-gray-200",
      variant === "destructive" && "text-destructive-subtle-foreground focus:bg-destructive-subtle focus:text-destructive-subtle-foreground",
      variant === "success" && "text-success-subtle-foreground focus:bg-success-subtle focus:text-success-subtle-foreground",
      variant === "warning" && "text-warning-subtle-foreground focus:bg-warning-subtle focus:text-warning-subtle-foreground",
      
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        {customIndicator || <Check className="h-4 w-4" />}
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    
    {rightIcon && (
      <span className="ml-auto pl-2 opacity-70">
        {rightIcon}
      </span>
    )}
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("moonui-theme", "-mx-1 my-1 h-px bg-muted dark:bg-gray-700", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
