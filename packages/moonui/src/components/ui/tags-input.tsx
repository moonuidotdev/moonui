"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "./badge";

export interface TagsInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  variant?: "primary" | "secondary" | "destructive" | "outline";
  allowDuplicates?: boolean;
  delimiter?: string;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      value = [],
      onChange,
      maxTags,
      variant = "primary",
      allowDuplicates = false,
      delimiter = ",",
      placeholder = "Add tag and press Enter",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [error, setError] = React.useState("");

    // Klavye navigasyonu için hem dışa verilen ref hem iç ref gerekiyor:
    // etiketler arasında gezinirken odağı input'a geri döndürebilmeliyiz.
    const innerInputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerInputRef.current as HTMLInputElement);

    const tagButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const errorId = React.useId();

    const focusTag = (index: number) => {
      if (value.length === 0) return;
      const clamped = Math.max(0, Math.min(value.length - 1, index));
      tagButtonRefs.current[clamped]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === delimiter) {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        removeTag(value.length - 1);
      } else if (e.key === "ArrowLeft" && inputValue === "" && value.length > 0) {
        // Boş input'ta sola ok → son etikete geç (hedefli silme için giriş noktası).
        e.preventDefault();
        focusTag(value.length - 1);
      }
    };

    /**
     * Etiketler arası klavye gezintisi. Önceden etiketlere yalnızca Tab ile
     * ulaşılabiliyor ve hedefli silme yoktu — Backspace her zaman SON etiketi
     * siliyordu, aradaki bir etiketi klavyeyle silmenin yolu yoktu.
     */
    const handleTagKeyDown =
      (index: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            focusTag(index - 1);
            break;
          case "ArrowRight":
            e.preventDefault();
            if (index >= value.length - 1) innerInputRef.current?.focus();
            else focusTag(index + 1);
            break;
          case "Home":
            e.preventDefault();
            focusTag(0);
            break;
          case "End":
            e.preventDefault();
            focusTag(value.length - 1);
            break;
          case "Delete":
          case "Backspace": {
            e.preventDefault();
            const remaining = value.length - 1;
            removeTag(index);
            // Silinenin yerine geçen etikete odaklan; liste bittiyse input'a dön.
            requestAnimationFrame(() => {
              if (remaining > 0) focusTag(Math.min(index, remaining - 1));
              else innerInputRef.current?.focus();
            });
            break;
          }
          default:
            break;
        }
      };

    const addTag = () => {
      const tag = inputValue.trim();

      if (!tag) return;

      if (!allowDuplicates && value.includes(tag)) {
        setError("This tag already exists");
        setTimeout(() => setError(""), 2000);
        return;
      }

      if (maxTags && value.length >= maxTags) {
        setError(`Maximum ${maxTags} tags allowed`);
        setTimeout(() => setError(""), 2000);
        return;
      }

      onChange([...value, tag]);
      setInputValue("");
      setError("");
    };

    const removeTag = (index: number) => {
      if (disabled) return;
      onChange(value.filter((_, i) => i !== index));
    };

    return (
      <div className="relative">
        <div
          className={cn(
            "flex items-center min-h-[2.5rem] w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            // NOT: burada `dark:bg-zinc-950/50 dark:border-zinc-800` hardcode'u
            // vardı ve aynı satırdaki `bg-background`/`border-input` token'larını
            // karanlık modda eziyordu. Token'lar zaten dark-mode duyarlı.
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          {value.map((tag, index) => (
            <Badge key={index} variant={variant} className="gap-1 pr-1.5">
              <span className="text-xs">{tag}</span>
              {!disabled && (
                <button
                  ref={(el) => {
                    tagButtonRefs.current[index] = el;
                  }}
                  type="button"
                  // Buton içeriği yalnızca X ikonu — erişilebilir ad olmadan
                  // ekran okuyucu hangi etiketin silineceğini söyleyemez.
                  aria-label={`Remove ${tag}`}
                  onClick={() => removeTag(index)}
                  onKeyDown={handleTagKeyDown(index)}
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </Badge>
          ))}
          <input
            ref={innerInputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : ""}
            // Etiket eklendikçe placeholder kalkıyor; erişilebilir ad olmadan
            // input tamamen adsız kalıyordu. Tüketici kendi aria-label'ını
            // verirse aşağıdaki {...props} yayılımı bunu ezer.
            aria-label="Add tag"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
              "min-w-[120px]",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} role="status" className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TagsInput.displayName = "TagsInput";

export { TagsInput };
