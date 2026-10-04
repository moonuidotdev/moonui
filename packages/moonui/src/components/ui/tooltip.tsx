"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground border-success",
        warning: "bg-warning text-warning-foreground border-warning",
        destructive: "bg-destructive text-destructive-foreground",
        info: "bg-info text-info-foreground border-info",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

/* -------------------------------------------------------------------------------
 * #650 — klavye odağı kilidi (WCAG 1.4.13 "Content on Hover or Focus")
 *
 * Radix `TooltipContentImpl` içinde KOŞULSUZ bir "kaydırma → kapat" etkisi var:
 *
 *   window.addEventListener("scroll", (e) => {
 *     if (e.target?.contains(trigger)) onClose()
 *   }, { capture: true })
 *
 * Bu davranış FARE tooltip'i için doğrudur (sayfa imlecin altından kayarsa tooltip
 * bayatlar) ama KLAVYE odağı için yıkıcıdır: görünür alanın dışındaki bir
 * tetikleyiciye `Tab` ile gelindiğinde tarayıcı elemanı görünür alana KAYDIRIR ve
 * bu kaydırma tooltip'i açıldığı anda kapatır.
 *
 * Gerçek tarayıcıda ölçülen sıra (docs sayfası, 365 gerçek `Tab` basışı):
 *
 *   8244.1  FOCUSIN trigger  (scroll-behavior: smooth)
 *   8248.6  data-state=instant-open      ← Radix onFocus açtı  (+4.5 ms)
 *   8251.7  SCROLL #1  target=document containsTrigger=true
 *   8255.0  data-state=closed            ← Radix handleScroll kapattı (+6.4 ms)
 *   ... toplam 34 kaydırma olayı (yumuşak kaydırma)
 *
 * Sonuç: klavye ve ekran-okuyucu kullanıcısı içeriği HİÇ göremiyor. Tetikleyici
 * görünür alandaysa (kısa sayfa, izole test) hata görünmez — bu yüzden birim
 * testlerinden kaçmıştı.
 *
 * Çözüm: tetikleyici KLAVYE odağını tuttuğu sürece gelen kapatma isteklerini yok
 * say. Kilit yalnızca `:focus-visible` eşleşen odakta kurulur, yani fare
 * etkileşiminin davranışı hiç değişmez. `Escape` ve işaretleyici (pointer)
 * etkileşimi kilidi açar — 1.4.13'ün "Dismissible" şartı korunur.
 * ---------------------------------------------------------------------------- */

type TooltipFocusHold = {
  hold: () => void
  release: () => void
}

const TooltipFocusHoldContext = React.createContext<TooltipFocusHold | null>(null)

/**
 * Odağın klavyeden gelip gelmediğini söyler. jsdom `:focus-visible`i desteklemez
 * ve `matches()` atar; bu ortamda kilit kurulur (test edilebilirlik) çünkü jsdom'da
 * gerçek bir işaretleyici yoktur.
 */
function isKeyboardFocus(element: Element | null | undefined): boolean {
  if (!element) return false
  try {
    return element.matches(":focus-visible")
  } catch {
    return true
  }
}

const Tooltip = ({
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) => {
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const resolvedOpen = isControlled ? open : uncontrolledOpen

  // Tetikleyici klavye odağını tutuyor mu? Kapatma isteklerini süzmek için kullanılır.
  const isFocusHeldRef = React.useRef(false)

  const hold = React.useCallback(() => {
    isFocusHeldRef.current = true
  }, [])
  const release = React.useCallback(() => {
    isFocusHeldRef.current = false
  }, [])

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      // Klavye odağı tetikleyicideyken kapatma isteğini yut (kaydırma, işaretleyici
      // ayrılması vb.). Açma istekleri her zaman geçer.
      if (!next && isFocusHeldRef.current) return
      setOpen(next)
    },
    [setOpen]
  )

  // 1.4.13 "Dismissible": `Escape` kilidi açar ve kapatır. Yakalama (capture)
  // fazında dinlenir; böylece Radix'in kendi `DismissableLayer` dinleyicisiyle
  // kayıt sırasından BAĞIMSIZ olarak önce çalışır ve kapatma asla yutulmaz.
  React.useEffect(() => {
    if (!resolvedOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      isFocusHeldRef.current = false
      setOpen(false)
    }
    document.addEventListener("keydown", handleEscape, true)
    return () => document.removeEventListener("keydown", handleEscape, true)
  }, [resolvedOpen, setOpen])

  const focusHold = React.useMemo<TooltipFocusHold>(
    () => ({ hold, release }),
    [hold, release]
  )

  return (
    <TooltipFocusHoldContext.Provider value={focusHold}>
      <TooltipPrimitive.Root
        {...props}
        open={resolvedOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </TooltipPrimitive.Root>
    </TooltipFocusHoldContext.Provider>
  )
}
Tooltip.displayName = "Tooltip"

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ onFocus, onBlur, onPointerDown, ...props }, ref) => {
  const focusHold = React.useContext(TooltipFocusHoldContext)

  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      {...props}
      onFocus={(event) => {
        // Yalnızca klavye odağı kilitlenir; fare tıklaması sonrası odak
        // (`:focus-visible` eşleşmez) Radix'in normal akışında bırakılır.
        if (isKeyboardFocus(event.currentTarget)) focusHold?.hold()
        onFocus?.(event)
      }}
      onBlur={(event) => {
        // Odak ayrıldı → kilit kalkar, Radix'in kendi kapatması işler.
        focusHold?.release()
        onBlur?.(event)
      }}
      onPointerDown={(event) => {
        // Fare etkileşimi kilidi açar; "tıkla-kapat" davranışı korunur.
        focusHold?.release()
        onPointerDown?.(event)
      }}
    />
  )
})
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("moonui-theme", "fill-current", className)}
    {...props}
  />
))
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {
  showArrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, size, showArrow = false, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn("moonui-theme", tooltipVariants({ variant, size }), className)}
    {...props}
  >
    {props.children}
    {showArrow && <TooltipArrow />}
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Simplified Tooltip component for easy usage
export interface SimpleTooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  variant?: TooltipContentProps["variant"]
  size?: TooltipContentProps["size"]
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
  sideOffset?: number
  showArrow?: boolean
  className?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const SimpleTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  SimpleTooltipProps
>(
  (
    {
      children,
      content,
      variant = "default",
      size = "md",
      side = "top",
      align = "center",
      delayDuration = 400,
      sideOffset = 4,
      showArrow = false,
      className,
      open,
      defaultOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    return (
      <Tooltip
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          ref={ref}
          side={side}
          align={align}
          variant={variant}
          size={size}
          sideOffset={sideOffset}
          showArrow={showArrow}
          className={className}
          {...props}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    )
  }
)
SimpleTooltip.displayName = "SimpleTooltip"

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  SimpleTooltip,
  tooltipVariants,
}