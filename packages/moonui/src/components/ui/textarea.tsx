"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

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
 * Textarea Variant Styles
 */
const textareaVariants = cva(
  [
    "flex w-full rounded-md px-3 py-2 text-sm transition-all duration-200",
    "text-foreground placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none dark:text-gray-200",
    "resize-none" // Always disable manual resize, we control it
  ],
  {
    variants: {
      variant: {
        default: "border border-input bg-background dark:bg-gray-800/80 focus-visible:ring-2 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80 dark:shadow-inner dark:shadow-gray-950/10",
        outline: "border-2 border-input bg-transparent focus-visible:border-primary dark:focus-visible:border-primary/80",
        ghost: "border-none bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/30 focus-visible:bg-transparent",
        underline: "border-t-0 border-l-0 border-r-0 border-b-2 border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary dark:focus-visible:border-primary/80 bg-transparent dark:bg-transparent"
      },
      size: {
        sm: "min-h-[60px] text-xs",
        md: "min-h-[80px] text-sm",
        lg: "min-h-[120px] text-base"
      },
      isError: {
        true: "border-error focus-visible:ring-error/30 focus-visible:border-error hover:border-error/80 dark:hover:border-error/80",
        false: ""
      },
      isSuccess: {
        true: "border-success focus-visible:ring-success/30 focus-visible:border-success hover:border-success/80 dark:hover:border-success/80",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      isError: false,
      isSuccess: false
    }
  }
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Omit<VariantProps<typeof textareaVariants>, "isError" | "isSuccess"> {
  /** Hata mesajı */
  error?: boolean | string
  /** Başarı mesajı */
  success?: boolean | string
  /** Yükleniyor durumu */
  loading?: boolean
  /** Otomatik yükseklik ayarlama */
  autoResize?: boolean
  /** Maksimum yükseklik (px) */
  maxHeight?: number
  /** Karakter sayacı göster */
  characterCount?: boolean
  /** Wrapper için ek sınıflar */
  wrapperClassName?: string
  /** Mesaj için ek sınıflar */
  messageClassName?: string
}

/**
 * Advanced Textarea Component
 *
 * Features:
 * - Auto-resize based on content
 * - Character count display
 * - Max height constraint
 * - Multiple variants
 * - Error/Success states
 * - Loading state
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    wrapperClassName,
    messageClassName,
    variant,
    size,
    error,
    success,
    loading,
    autoResize = false,
    maxHeight,
    characterCount = false,
    disabled,
    maxLength,
    value,
    defaultValue,
    onChange,
    ...props
  }, ref) => {
    // Mesaj id'leri `props.id` yoksa sabit string'e düşüyordu -> aynı sayfada
    // iki id'siz Textarea'da yinelenen DOM id'si oluşuyordu.
    const reactId = React.useId()
    const fieldId = props.id || reactId
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const [internalValue, setInternalValue] = React.useState(value || defaultValue || "")

    // Merge refs
    React.useImperativeHandle(ref, () => textareaRef.current!)

    // Auto-resize logic
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea || !autoResize) return

      // Reset height to get correct scrollHeight
      textarea.style.height = 'auto'

      // Set new height
      const newHeight = textarea.scrollHeight
      if (maxHeight && newHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`
        textarea.style.overflowY = 'auto'
      } else {
        textarea.style.height = `${newHeight}px`
        textarea.style.overflowY = 'hidden'
      }
    }, [autoResize, maxHeight])

    // Adjust height on value change
    React.useEffect(() => {
      adjustHeight()
    }, [internalValue, adjustHeight])

    // Handle value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    // Character count
    const currentLength = String(internalValue).length
    const showCharCount = characterCount && (maxLength !== undefined || currentLength > 0)

    // Messages
    const errorMessage = typeof error === "string" ? error : undefined
    const successMessage = typeof success === "string" ? success : undefined
    const showMessage = errorMessage || successMessage

    return (
      <div className={cn("moonui-theme", "space-y-1.5 w-full", wrapperClassName)}>
        <div className="relative">
          <textarea
            ref={textareaRef}
            className={cn(
              textareaVariants({
                variant,
                size,
                isError: !!error,
                isSuccess: !!success
              }),
              loading && "pr-10",
              className
            )}
            disabled={disabled || loading}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            aria-invalid={!!error || undefined}
            aria-describedby={
              errorMessage ? `${fieldId}-error` :
              successMessage ? `${fieldId}-success` :
              undefined
            }
            {...props}
          />

          {loading && (
            <div className="absolute top-3 right-3 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Error/Success Message */}
          {showMessage && (
            <p
              className={cn(
                "text-xs transition-all",
                errorMessage && "text-error",
                successMessage && "text-success",
                messageClassName
              )}
              id={
                errorMessage ? `${fieldId}-error` :
                successMessage ? `${fieldId}-success` :
                undefined
              }
            >
              {errorMessage || successMessage}
            </p>
          )}

          {/* Character Count */}
          {/* #661-14: `dark:text-gray-500` KALDIRILDI. `text-muted-foreground`
              zaten koyu temada 62% L üretiyor (kart üstünde 6.29:1); üstüne
              binen `dark:` katmanı gray-500'e düşürüp 3.68:1 veriyordu — yani
              token DOĞRUYKEN ikinci katman onu AA altına indiriyordu (#646 ile
              aynı kusur sınıfı). Açık temada değişiklik yok. */}
          {showCharCount && (
            <p className="text-xs text-muted-foreground ml-auto">
              {currentLength}{maxLength !== undefined && ` / ${maxLength}`}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }