"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, readableText } from "../../lib/utils";

/**
 * Premium Badge Component
 * 
 * Durum, kategori ve etiketleme için yüksek kaliteli badge bileşeni.
 * Dark ve light modda uyumlu, erişilebilir ve çeşitli varyantlar sunar.
 */

const badgeVariants = cva(
  ["inline-flex items-center justify-center gap-1.5", 
  "font-medium transition-colors duration-200", 
  "border focus:outline-none",
  "focus-visible:ring-2 focus-visible:ring-offset-1",
  // Auto spacing between badges
  "mr-2 mb-2 last:mr-0"],
  {
    variants: {
      variant: {
        // KIRICI (issue #261): önceden ham `gray-900`/`white` kullanılıyordu;
        // aynı varyant pro pakette token'lıydı → free ve pro `primary` için
        // farklı renk üretiyordu. Artık token'a bağlı (tema/karanlık moda duyarlı).
        // `primary` VARSAYILAN varyant olduğu için görünür bir renk değişimidir.
        // #646: `dark:bg-primary/90` KALDIRILDI. `primary` VARSAYILAN varyant olduğu
        // için varyant verilmeyen HER `<Badge>` bu sınıfı alıyordu; `tailwind-merge`
        // `dark:` önekli arka planı tüketicinin ÖNEKSİZ `bg-*` sınıfıyla aynı grupta
        // görmediğinden ikisi birden hayatta kalıyor ve koyu temada `dark:` özgüllükle
        // kazanıyordu. Sonuç: `<Badge className="bg-green-500/20 text-green-300">`
        // koyu temada near-white zemin + açık yeşil metin = 1.10:1 (ölçüldü,
        // magnetic-button "Pending"; swipe-actions'ta 6 rozet 1.10–1.48 aralığında).
        // ÖNEKSİZ `bg-primary` bırakıldı: tüketici sınıfıyla AYNI grupta çakışır ve
        // doğru şekilde ezilir. Rozetin kendi görünümü BOZULMAZ — koyu temada
        // `bg-primary` + `text-primary-foreground` 16.16 → 19.80'e çıkar
        // (yarı saydamlık kalktığı için); açık temada değişiklik yok.
        // #710 (kardeş dal taraması): `success` ölçülürken AYNI CVA bloğunun
        // `primary` HOVER dalı da sayıldı ve AA altında çıktı — #715'in `button`da
        // kapattığı deliğin badge'deki ikizi:
        //   resting  bg-primary      #1067f4 / #f8fafc → 4.70 ✓ (#442 → DOKUNULMADI)
        //   hover    bg-primary/90   #2876f5           → 4.01 ✗ (button'da ölçülen
        //                                                değerin BİREBİR aynısı)
        // Alfa, zemini BEYAZLA karıştırıp rengi AÇIYOR. `--primary-NNN` skalası
        // SKY paleti (token BLUE) ve preset onu hiçbir utility'ye bağlamıyor →
        // `bg-primary-700` ölü sınıf olurdu (#713). Bu yüzden #715'in `primary`
        // için seçtiği reçete aynen alındı: koyu ton `color-mix` ile TOKEN'IN
        // KENDİSİNDEN türetilir → tüketici `--primary`yi override edince hover
        // kendiliğinden uyar, sonuç opak olduğu için zemine bağımlılık biter.
        //   hover  color-mix(…85%,black) #0e58cf → 6.28 ✓
        primary: [
          "border-transparent bg-primary text-primary-foreground",
          "hover:bg-[color:color-mix(in_srgb,hsl(var(--primary))_85%,black)]",
          "focus-visible:ring-primary/30 dark:focus-visible:ring-primary/40",
          "dark:shadow-inner dark:shadow-primary/10",
        ],
        secondary: [
          "border-transparent bg-secondary text-secondary-foreground",
          "hover:bg-gray-200 dark:hover:bg-gray-600",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:bg-gray-700/50 dark:text-gray-50 dark:shadow-inner dark:shadow-gray-950/10",
        ],
        // #708 kalem 3: `outline` varyantı TÜKETİCİYİ EZİYORDU — #715'in `button`da
        // kapattığı deliğin birebir aynısı. `cn()` = `twMerge(clsx(...))`; tüketici
        // `className="text-white"` yazınca twMerge ÖNEKSİZ `text-foreground`u eler,
        // ama `dark:text-gray-100` AYRI modifier grubu olduğu için ELENMEZ ve koyu
        // temada özgüllükle kazanır: (0,2,0) > (0,1,0).
        //
        // Ölçülen sonuç (docs "PRO" rozeti, `from-brand-600 to-brand-accent-600`
        // gradyanı üstünde, `text-xs` = küçük metin → AA 4.5:1):
        //   light  beyaz    → en kötü uç 4.60  ✓   (tüketicinin istediği renk)
        //   dark   gray-100 → en kötü uç 4.18  ✗   (varyantın dayattığı renk)
        // A18-V 10/10 sayfada ölçtü; axe bunu `violations`a HİÇ yazmıyor (gradyan
        // zemin → `incomplete` kovası), bu yüzden 11 koşu boyunca görülmedi.
        //
        // #715'in AYRIMI satır satır uygulandı:
        //   · `dark:bg-transparent`   → öneksiz `bg-transparent` zaten aşağıda ve
        //     `outline`da başka `bg-*` yok (sıralama guard'ı da değil) → SAF TEKRAR,
        //     kaldırıldı.
        //   · `dark:text-gray-100`    → öneksiz ikizinden (`--foreground` dark =
        //     rgb(225,231,239)) FARKLI bir değere gidiyordu, ama fark rozetin kendi
        //     okunurluğunda ölçülemeyecek kadar küçük (koyu kart üstünde 15.0 → 13.5;
        //     ikisi de AA'nın çok üstünde) ve karşılığında tüketicinin AA'yı GEÇEN
        //     `text-white`ını eziyordu → kaldırıldı.
        //   · `dark:backdrop-blur-sm` → öneksiz ikizi yok, koyu-temaya özgü gerçek
        //     bir efekt → KORUNDU.
        outline: [
          "border-gray-200 dark:border-gray-600",
          "bg-transparent text-foreground",
          "hover:border-gray-300 dark:hover:border-gray-500",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:backdrop-blur-sm",
        ],
        // #544: `bg-error` (= --error, #ef4343) beyaz metinle 3.78 veriyordu (AA 4.5 ister),
        // `dark:bg-error/90` ise gerçek koyu kart (#111827) üstünde 4.43 ile kalıyordu.
        //
        // TOKEN DEĞİŞTİRİLMEDİ: dark `--destructive`/`--error` METİN rolü için bilerek
        // açık tutuluyor (tokens.css:518-526); değeri koyulaştırmak `text-destructive`
        // yazan yüzleri kırardı ve dark-token-contrast.test.ts'in belgelediği uzlaşmayı
        // bozardı. Bunun yerine #424/#442/#454'ün presedansı uygulandı: token'a değil
        // VARYANTA dokunulup skalanın bir kademesine inildi.
        //
        // `-600` ölçümle seçildi — AA'yı geçen EN AÇIK kademe (beyazla 4.83; -500 3.76 ✗)
        // ve bugünkü kırmızıya EN YAKIN aday (ΔE*ab 10.3; -700 → 16.2, `--destructive`
        // light → 18.8). Hue 0° korunur, "uyarı kırmızısı" kimliği kaybolmaz.
        //
        // Skala kademeleri tema-BAĞIMSIZ (`.dark` onları ezmez) → tek sınıf iki temayı
        // birden kapatır ve eski YARI SAYDAM `dark:bg-error/90`ın zemine bağımlılığı
        // ortadan kalkar. Hover koyulaşır (-700, 6.47), açılmaz.
        destructive: [
          "border-transparent bg-error-600 text-white",
          "hover:bg-error-700 dark:hover:bg-error-700",
          "focus-visible:ring-error/30 dark:focus-visible:ring-error/25",
          "dark:text-white dark:shadow-inner dark:shadow-error/10",
        ],
        // #710 vaka 1 — `destructive`in #544'te aldığı düzeltmenin KOMŞU dalı.
        // Düzeltmeyi yapan zaten bu bloğun içindeydi; atlanan şey kapsam değil DALDI.
        //
        // ÖLÇÜM (zemin her satırda adıyla anılır):
        //   light resting  bg-success        #12823b / #f8fafc      → 4.69 ✓
        //   light hover    bg-success/90     #2a8f4f (beyaz üstüne) → 3.90 ✗
        //   dark  resting  dark:bg-success/90 (kart #111827)        → 3.75 ✗
        //   dark  hover    dark:hover:bg-success/80                 → 4.44 ✗
        // A8-V axe-native İKİ sayfada birden yakaladı: `data-table` dark 8 serious
        // düğüm ("In Stock"×3, "Completed"×3, "Shipped"×2) · `widgets` dark 9 serious.
        //
        // KARDEŞ DOSYANIN REÇETESİ AYNEN ALINDI (desen icat edilmedi): `button.tsx`
        // `success` dalı #715'te tam bu kusuru kapattı ve kademeleri ölçümle seçti —
        // `dark:bg-success-700` (4.79) + `hover:bg-success-800` (6.81). `toggle.tsx`
        // :188/:266 de aynı `dark:bg-success-700`ü kullanıyor (aile içi 3. tanık).
        // TOKEN DEĞİŞTİRİLMEDİ: dark `--success` METİN rolü için bilerek açık
        // (tokens.css:601-605) — #424/#442/#454/#544 presedansı: token'a değil
        // VARYANTA dokunulup skalanın bir kademesine inilir. Açık tema RESTING
        // dolgusu 4.69 ile geçtiği için #442 gereği DOKUNULMADI.
        //
        // `dark:` SATIRLARININ AYRIMI (#708/#715 disiplini, satır satır):
        //   · `dark:bg-success/90` → öneksizinden FARKLI değer ama YARI SAYDAM,
        //     yani zemine bağımlı; ölçülen ihlalin kaynağı → opak `-700` ile
        //     DEĞİŞTİRİLDİ (kaldırılmadı; dark'ta farklı değer hâlâ gerekli).
        //   · `dark:text-success-foreground` → `--success-foreground` `.dark`
        //     bloğunda EZİLMİYOR (yalnız `:root`ta tanımlı) → öneksiz ikiziyle AYNI
        //     değer, sıralama guard'ı da değil → SAF TEKRAR. Üstelik #708'in
        //     `outline`da ölçtüğü zararı veriyordu: twMerge `dark:` önekli metni
        //     tüketicinin ÖNEKSİZ `text-*`iyle aynı grupta görmez, `dark:` özgüllükle
        //     kazanır → KALDIRILDI.
        //   · `dark:hover:bg-success-800` → öneksiziyle AYNI değeri taşır ama
        //     SIRALAMA GUARD'ıdır: Tailwind 3.4.17 `dark:`i `hover:`ten SONRA yazar
        //     ve ikisi de (0,2,0) → `hover:bg-success-800` koyu temada
        //     `dark:bg-success-700`e kaybederdi. KORUNDU (button.tsx bunu gerçek
        //     tarayıcıda kanıtladı).
        //   · `dark:shadow-inner`/`dark:shadow-success/10` → öneksiz ikizi YOK,
        //     koyu-temaya özgü gerçek efekt → KORUNDU.
        //   · `focus-visible:ring-success/30` ↔ `dark:focus-visible:ring-success/25`
        //     → FARKLI alfa → farklı değer → KORUNDU.
        //
        // ⚠️ KARDEŞ SAYIMI: bloğun 9 dalının 4'ü token dolgulu ve ölçülebilir
        // (primary/destructive/success/warning). `warning` DE ölçüldü ve GEÇİYOR
        // (light 8.20 · dark `/90` kart üstünde 6.85) → bilinçli DOKUNULMADI.
        success: [
          "border-transparent bg-success text-success-foreground",
          "dark:bg-success-700",
          "hover:bg-success-800 dark:hover:bg-success-800",
          "focus-visible:ring-success/30 dark:focus-visible:ring-success/25",
          "dark:shadow-inner dark:shadow-success/10",
        ],
        warning: [
          "border-transparent bg-warning text-warning-foreground",
          "hover:bg-warning/90 dark:hover:bg-warning/80",
          "focus-visible:ring-warning/30 dark:focus-visible:ring-warning/25",
          "dark:bg-warning/90 dark:text-warning-foreground dark:shadow-inner dark:shadow-warning/10",
        ],
        ghost: [
          "border border-gray-200 bg-gray-50/50 text-gray-700",
          "hover:bg-gray-100 dark:hover:bg-gray-800/60",
          "focus-visible:ring-gray-400/30 dark:focus-visible:ring-gray-500/40",
          "dark:border-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
          "transition-all duration-200",
        ],
        pro: [
          "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          "hover:from-purple-700 hover:to-pink-700",
          "focus-visible:ring-purple-400/30 dark:focus-visible:ring-purple-500/40",
          "shadow-md dark:shadow-lg dark:shadow-purple-500/10",
        ],
        admin: [
          "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          "hover:from-purple-700 hover:to-pink-700", 
          "focus-visible:ring-purple-400/30 dark:focus-visible:ring-purple-500/40",
          "shadow-md dark:shadow-lg dark:shadow-purple-500/10",
        ],
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-sm",
        lg: "h-8 px-4 text-base",
      },
      radius: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        none: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof badgeVariants>, 'variant'> {
  withDot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
  /**
   * Kaldırma düğmesinin erişilebilir adı için açık değer.
   * Verilmezse ad rozetin görünen içeriğinden türetilir; içerik metne
   * çevrilemiyorsa (ör. yalnız ikon) "Remove badge"e düşülür. (#298)
   */
  removeLabel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'ghost' | 'pro' | 'admin';
  /** Disable automatic spacing between badges */
  noAutoSpacing?: boolean;
}

/**
 * Premium Badge Component
 * 
 * @param props - Badge bileşeni özellikleri
 * @param props.variant - Badgenin görsel varyantı
 * @param props.size - Badge boyutu
 * @param props.radius - Köşe yuvarlama stili
 * @param props.withDot - Başında nokta gösterimi
 * @param props.dotColor - Noktanın rengi (özel)
 * @param props.removable - Kaldırılabilir badge (X simgesi ile)
 * @param props.onRemove - Kaldırma işlevi
 * @param props.leftIcon - Badge'in solunda görüntülenecek ikon
 * @param props.rightIcon - Badge'in sağında görüntülenecek ikon
 * @param props.noAutoSpacing - Otomatik spacing'i devre dışı bırak
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({
  className,
  variant,
  size,
  radius,
  withDot,
  dotColor,
  removable,
  onRemove,
  removeLabel,
  leftIcon,
  rightIcon,
  noAutoSpacing,
  children,
  ...props
}, ref) => {
  // Auto-assign icons and content for special variants
  let autoLeftIcon = leftIcon;
  let autoChildren = children;
  
  if (variant === 'pro') {
    // Auto Sparkles icon for pro
    autoLeftIcon = leftIcon || (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
        <path d="M12 0L13.09 8.26L22 9L13.09 9.74L12 18L10.91 9.74L2 9L10.91 8.26L12 0Z" fill="currentColor"/>
        <path d="M19 5L19.5 7L21 7.5L19.5 8L19 10L18.5 8L17 7.5L18.5 7L19 5Z" fill="currentColor"/>
        <path d="M19 15L19.5 17L21 17.5L19.5 18L19 20L18.5 18L17 17.5L18.5 17L19 15Z" fill="currentColor"/>
      </svg>
    );
    autoChildren = children || 'Pro';
  }
  
  if (variant === 'admin') {
    // Auto CheckCircle icon for admin
    autoLeftIcon = leftIcon || (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
      </svg>
    );
    autoChildren = children || 'Admin Pro';
  }

  return (
    <div
      ref={ref}
      className={cn(
        "moonui-theme",
        badgeVariants({ variant, size, radius }),
        // Remove auto-spacing if noAutoSpacing is true
        noAutoSpacing && "mr-0 mb-0",
        className
      )}
      data-removable={removable ? "" : undefined}
      {...props}
    >
      {withDot && (
        <span 
          className={cn(
            "h-2 w-2 rounded-full", 
            dotColor || 
              (variant === "destructive" ? "bg-white" :
               variant === "success" ? "bg-white" :
               variant === "warning" ? "bg-white" :
               variant === "secondary" ? "bg-secondary-foreground" :
               variant === "outline" ? "bg-foreground" :
               variant === "ghost" ? "bg-foreground" :
               variant === "pro" ? "bg-white" :
               variant === "admin" ? "bg-white" :
               "bg-primary-foreground")
          )} 
          aria-hidden="true"
        />
      )}
      {autoLeftIcon && (
        <span className="inline-flex shrink-0 items-center">
          {autoLeftIcon}
        </span>
      )}
      <span className="inline-flex items-center">{autoChildren}</span>
      {rightIcon && (
        <span className="inline-flex shrink-0 items-center">
          {rightIcon}
        </span>
      )}
      {removable && onRemove && (
        <button 
          type="button"
          className="ml-1 -mr-1 h-3.5 w-3.5 rounded-full inline-flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          /* #298: SABİT ad ("Remove badge") liste hâlindeki rozetlerde hangi
             öğenin kaldırılacağını ayırt ettirmiyordu (WCAG 4.1.2). Ad önce
             açık prop'tan, sonra görünen içerikten türetilir. */
          aria-label={removeLabel || (readableText(autoChildren) ? `Remove ${readableText(autoChildren)}` : "Remove badge")}
        >
          <svg 
            width="8" 
            height="8" 
            viewBox="0 0 8 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70"
            aria-hidden="true"
          >
            <path d="M0.799988 7.19999L7.19999 0.799988M0.799988 0.799988L7.19999 7.19999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants };
