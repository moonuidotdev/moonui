"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, Info, Check, X } from "lucide-react";

import { cn } from "../../lib/utils";

/**
 * Alert Component
 *
 * Yüksek kaliteli, özelleştirilebilir ve erişilebilir alert bileşeni.
 * Bildirim, uyarı ve dikkat çekmek gereken içerikler için kullanılır.
 */

const alertVariants = cva(
    "relative w-full flex items-center gap-3 p-4 border text-foreground [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground border-border",
                // KONTRAST (açık tema): metin rengi ham `text-X` DEĞİL,
                // `text-X-subtle-foreground` olmalı. `bg-X/10 + text-X` deseni
                // açık temada ölçülen 4.11–4.45 veriyor ve WCAG AA eşiğini
                // (4.5) geçmiyor. `-subtle-foreground` token'ları aynı yüzey
                // için 8.20–9.52 sağlıyor (tokens.css'te oranlar yazılı) ve
                // `bg-X-subtle`, `bg-X/10` ile AYNI görünümü verir
                // (tokens.css:217) → görsel kimlik değişmez, yalnız metin
                // koyulaşır. `warning` bu düzeltmeyi zaten taşıyordu.
                primary: "bg-primary-subtle text-primary-subtle-foreground border-primary/30",
                success: "bg-success-subtle text-success-subtle-foreground border-success/30",
                warning: "bg-warning-subtle text-warning-subtle-foreground border-warning/30",
                error: "bg-destructive-subtle text-destructive-subtle-foreground border-destructive/30",
                // `--info` token'ı (tokens.css) blue-500 ile birebir aynı değeri
                // taşır → görsel değişiklik yok, ancak varyant artık temaya ve
                // karanlık moda duyarlı. Kardeş varyantlarla simetrik.
                info: "bg-info-subtle text-info-subtle-foreground border-info/30",
            },
            size: {
                sm: "py-2 text-xs",
                md: "py-3 text-sm",
                lg: "py-4 text-base",
                /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
                default: "py-3 text-sm",
              },
            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                default: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
            withClose: {
                true: "pr-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            radius: "default",
            withClose: false,
        },
    }
);

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {
    /** Alert ikonunu gizler */
    hideIcon?: boolean;
    /** Kapatma butonu ekler */
    closable?: boolean;
    /** Kapatma butonu tıklandığında çalışacak fonksiyon */
    onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className,
            variant = "default",
            size,
            radius,
            hideIcon = false,
            closable = false,
            onClose,
            children,
            ...props
        },
        ref
    ) => {
        // Alert türüne göre ikon belirleme
        const Icon = React.useMemo(() => {
            switch (variant) {
                case "success":
                    return Check;
                case "warning":
                    return AlertTriangle;
                case "error":
                    return AlertCircle;
                case "info":
                    return Info;
                default:
                    return Info;
            }
        }, [variant]);

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(
                    "moonui-theme",
                    alertVariants({
                        variant,
                        size,
                        radius,
                        withClose: closable,
                    }),
                    className
                )}
                {...props}
            >
                {!hideIcon && <Icon className="h-5 w-5" />}
                <div className="flex-1">{children}</div>
                {closable && onClose && (
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
                        aria-label="Close alert"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        );
    }
);
Alert.displayName = "Alert";

export interface AlertTitleProps
    extends React.HTMLAttributes<HTMLHeadingElement> {
    /**
     * Render edilecek element. Varsayılan `"div"`.
     *
     * #345: Eskiden sabit `<h5>` idi. Bir component'in belge başlık SEVİYESİNİ
     * dayatması yanlıştır — doğru seviye, component'in sayfada nereye konduğuna
     * bağlıdır ve bunu yalnız tüketici bilir. Sabit `h5`, docs alert sayfasında
     * H1 → H2 → H5 sıçraması üretiyordu (10 `heading-order` ihlali) ve tüketici
     * bunu düzeltemiyordu.
     *
     * Varsayılanın `div` olması ayrıca semantik olarak daha doğru: bir uyarının
     * başlığı belge ANA HATTINA ait değildir; `Alert` zaten `role="alert"` ile
     * duyurulur ve başlık o duyurunun parçası olarak okunur.
     *
     * Başlık semantiği gerçekten isteniyorsa sayfaya uyan seviye verilir:
     * `<AlertTitle as="h3">`. Görsel çıktı her iki durumda da AYNIDIR.
     */
    as?: React.ElementType;
}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
    ({ className, as: Comp = "div", ...props }, ref) => (
        <Comp
            ref={ref}
            className={cn(
                "moonui-theme",
                "font-semibold leading-tight tracking-tight mb-1",
                className
            )}
            {...props}
        />
    )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "moonui-theme",
            // KONTRAST: sabit `text-muted-foreground` (#606f85) renkli varyant
            // yüzeylerinde 4.31–4.48 veriyordu — başlık düzelse bile açıklama
            // satırı eşiğin altında kalıyordu. `text-current` varyantın
            // `-subtle-foreground` rengini miras alır; hiyerarşi renk yerine
            // ağırlıkla (başlık `font-semibold`) ve hafif opaklıkla korunur.
            "text-sm leading-5 text-current opacity-90",
            className
        )}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
