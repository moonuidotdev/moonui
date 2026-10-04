"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Popover Bileşeni
 * 
 * Tıklanabilir bir öğeden açılan, tema sistemiyle tam entegre bir içerik bileşeni.
 * Filtreler, ayarlar ve diğer içerikler için kullanışlı ve erişilebilir bir arayüz sağlar.
 */

const popoverContentVariants = cva(
  "z-50 w-72 rounded-md border border-border bg-background p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive bg-destructive/5",
        outline: "border-border bg-transparent",
        subtle: "border-transparent bg-muted/50",
      },
      size: {
        sm: "w-48 p-3",
        md: "w-72 p-4",
        lg: "w-96 p-5",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "w-72 p-4",
      },
      side: {
        top: "data-[side=top]:slide-in-from-bottom-2",
        right: "data-[side=right]:slide-in-from-left-2",
        bottom: "data-[side=bottom]:slide-in-from-top-2",
        left: "data-[side=left]:slide-in-from-right-2",
      },
      position: {
        pointerEventsNone: "pointer-events-none",
        default: "",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        default: "shadow-md",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "default",
      shadow: "default",
    },
  }
);

/* #645 — Tab odağı popover konteynerinde donuyordu.
 *
 * KÖK NEDEN (Radix kaynağı, `@radix-ui/react-popover` → `PopoverContentImpl`):
 * içerik her zaman `FocusScope`'a `loop: true` ile sarılır; `trapped` yalnız
 * `modal` popover'da true olur. Ancak `FocusScope`'un Tab işleyicisi
 * `if (!loop && !trapped) return;` diyerek `loop` tek başına yeterli sayılıyor:
 *   - içerikte hiç odaklanabilir eleman YOKSA → `event.preventDefault()` (odak donar)
 *   - varsa → son elemandan sonra başa döndürür (non-modal'da yanlış tuzak)
 * Yani kusur sarmalayıcımızda değil, Radix'in devraldığımız davranışında.
 *
 * SEÇİLEN SEMANTİK: popover = non-modal disclosure. Tab içeriğe girer, içeride
 * doğal DOM sırasında ilerler, KENARDA (ilk/son eleman ya da hiç odaklanabilir
 * yok) overlay'den çıkar; çıkış Radix'in `onFocusOutside` yolunu tetiklediği için
 * popover kapanır. `modal` popover'da WAI-ARIA gereği tuzak KORUNUR.
 */
const PopoverModalContext = React.createContext(false);

/** Bir düğümün gerçek bir Tab durağı olup olmadığı. */
const POPOVER_TAB_STOP_SELECTOR =
  "a[href],button,input,select,textarea,[tabindex],audio[controls],video[controls],[contenteditable]";

/* Görünürlük ölçütü bilinçli olarak Radix'in `findVisible`/`isHidden` mantığıyla
   AYNI: `getClientRects()` yerine hesaplanmış stil. Böylece hem tarayıcıda hem
   düzen motoru olmayan jsdom'da aynı sonucu verir. */
function isPopoverElementHidden(node: HTMLElement) {
  const view = node.ownerDocument.defaultView;
  if (!view) return false;
  if (view.getComputedStyle(node).visibility === "hidden") return true;
  let current: HTMLElement | null = node;
  while (current) {
    if (view.getComputedStyle(current).display === "none") return true;
    current = current.parentElement;
  }
  return false;
}

function isPopoverTabStop(node: HTMLElement) {
  if (node.hasAttribute("data-radix-focus-guard")) return false;
  if (node.tabIndex < 0) return false;
  if ((node as HTMLButtonElement).disabled) return false;
  if (node.hidden) return false;
  if (node.getAttribute("aria-hidden") === "true") return false;
  if (node.closest("[inert]")) return false;
  return !isPopoverElementHidden(node);
}

function getPopoverTabStopsWithin(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(POPOVER_TAB_STOP_SELECTOR)
  ).filter(isPopoverTabStop);
}

/** Radix tetikleyiciyi `aria-controls` ile içeriğe bağlar; çıkış referansı odur. */
function getPopoverTrigger(content: HTMLElement) {
  if (!content.id) return null;
  const id =
    typeof CSS !== "undefined" && typeof CSS.escape === "function"
      ? CSS.escape(content.id)
      : content.id;
  return content.ownerDocument.querySelector<HTMLElement>(
    `[aria-controls="${id}"]`
  );
}

/** İçerik dışında, referansa göre bir sonraki/önceki gerçek Tab durağı. */
function getPopoverTabStopOutside(
  reference: HTMLElement,
  content: HTMLElement,
  direction: "next" | "previous"
) {
  const candidates = Array.from(
    content.ownerDocument.querySelectorAll<HTMLElement>(
      POPOVER_TAB_STOP_SELECTOR
    )
  ).filter((node) => !content.contains(node) && isPopoverTabStop(node));

  if (direction === "next") {
    return (
      candidates.find((node) =>
        Boolean(
          reference.compareDocumentPosition(node) &
            Node.DOCUMENT_POSITION_FOLLOWING
        )
      ) ?? null
    );
  }

  let previous: HTMLElement | null = null;
  for (const node of candidates) {
    const relation = reference.compareDocumentPosition(node);
    if (node === reference || relation & Node.DOCUMENT_POSITION_PRECEDING) {
      previous = node;
    } else {
      break;
    }
  }
  return previous;
}

/* Yeni public export açılmaz (#667) — tip yerel kalır. */
type PopoverRootProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Root
>;

const Popover = ({ modal = false, children, ...props }: PopoverRootProps) => (
  <PopoverModalContext.Provider value={modal}>
    <PopoverPrimitive.Root {...props} modal={modal}>
      {children}
    </PopoverPrimitive.Root>
  </PopoverModalContext.Provider>
);
Popover.displayName = "Popover";

const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

export interface PopoverContentProps 
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContentVariants> {
  /**
   * Popover'ın arka plan bulanıklığı etkin mi
   */
  backdrop?: boolean;
  /**
   * Popover'a tıklandığında kapanıp kapanmayacağı
   */
  closeOnInteractOutside?: boolean;
  /**
   * Popover açıkken arka planın karartılması
   */
  overlayBackdrop?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({
  className,
  variant,
  size,
  side,
  position,
  radius,
  shadow,
  backdrop = false,
  closeOnInteractOutside = true,
  overlayBackdrop = false,
  sideOffset = 4,
  onKeyDown,
  ...props
}, ref) => {
  const isModal = React.useContext(PopoverModalContext);

  /* #645: yalnız KENAR durumlarını devral — Radix'in içerideki doğal Tab
     akışına dokunulmaz. Modal popover'da hiç devreye girmez. */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (isModal) return;
    if (event.key !== "Tab") return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const content = event.currentTarget;
    const active = content.ownerDocument.activeElement as HTMLElement | null;
    if (!active || (active !== content && !content.contains(active))) return;

    const tabStops = getPopoverTabStopsWithin(content);
    const forward = !event.shiftKey;
    const atEdge =
      tabStops.length === 0
        ? active === content
        : active === (forward ? tabStops[tabStops.length - 1] : tabStops[0]);
    if (!atEdge) return;

    const reference = getPopoverTrigger(content) ?? content;
    const target = getPopoverTabStopOutside(
      reference,
      content,
      forward ? "next" : "previous"
    );

    event.preventDefault();
    if (target) {
      target.focus();
    } else {
      // Gidilecek durak yoksa bile odak konteynerde kilitli KALMAMALI.
      active.blur();
    }
  };

  return (
  <>
    {overlayBackdrop && (
      <div
          /* #316: `bg-overlay` ÖLÜ SINIFTI — `overlay` adında bir renk ne
             tailwind-preset.js'te ne tokens.css'te tanımlı (ikisinde de 0 geçiş).
             Sınıf hiç CSS üretmiyordu, yani `overlayBackdrop` sessizce kapalıydı. */
          className="fixed inset-0 z-40 bg-black/50"
        />
    )}
    <PopoverPrimitive.Content
      ref={ref}
      /* #316: `side` yalnız CVA'da animasyon sınıfı seçiyordu, Radix'e HİÇ
         ulaşmıyordu — konumlandırma prop'u fiilen işlevsizdi. Artık gerçekten
         geçiriliyor; CVA'daki `data-[side=…]` animasyonları da ancak bu öznitelik
         basıldığında eşleşiyor. */
      side={side}
      sideOffset={sideOffset}
      collisionPadding={8}
      onInteractOutside={(e) => {
        if (!closeOnInteractOutside) {
          e.preventDefault();
        }
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        popoverContentVariants({
          variant,
          size,
          side,
          position,
          radius,
          shadow
        }),
        backdrop && "backdrop-blur-md bg-opacity-80",
        className
      )}
      {...props}
    />
  </>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/**
 * PopoverClose bileşeni
 */
const PopoverClose = PopoverPrimitive.Close;

/**
 * Popover için bölüm ayırıcı
 */
const PopoverSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("moonui-theme", "my-2 h-px bg-border", className)}
    {...props}
  />
);
PopoverSeparator.displayName = "PopoverSeparator";

/**
 * Popover başlık bileşeni
 */
const PopoverHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("moonui-theme", "-mx-4 -mt-4 mb-3 px-4 pt-4 pb-3 border-b border-border", className)}
    {...props}
  />
);
PopoverHeader.displayName = "PopoverHeader";

/**
 * Popover footer bileşeni
 */
const PopoverFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("moonui-theme", "-mx-4 -mb-4 mt-3 px-4 pt-3 pb-4 border-t border-border", className)}
    {...props}
  />
);
PopoverFooter.displayName = "PopoverFooter";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverSeparator,
  PopoverHeader,
  PopoverFooter,
  popoverContentVariants,
};
