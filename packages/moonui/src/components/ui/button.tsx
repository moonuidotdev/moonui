"use client"

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

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
 * Premium Button Component
 * 
 * A world-class, accessible, and versatile button component.
 * Pixel-perfect design with extensive variants and states.
 */
const buttonVariants = cva(
  ["inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "font-medium relative",
  "transition-all duration-200 ease-out",
  "transform active:scale-[0.98]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none"],
  {
    variants: {
      variant: {
        // #715 Dal 1 — GEREKSİZ `dark:` TEKRARI KALDIRILDI.
        // `--primary` ve `--primary-foreground` `.dark` bloğunda ZATEN farklı değer
        // alıyor (tokens.css:129/137 ↔ :545/546), yani öneksiz `bg-primary
        // text-primary-foreground` iki temada da doğru çifti veriyor. `dark:` ikizi
        // hiçbir şey KAZANDIRMIYOR, yalnız özgüllüğü şişiriyordu:
        //   .dark\:text-primary-foreground:is(.dark *)  → (0,2,0)
        //   tüketicinin  text-white                     → (0,1,0)
        // `cn()` = twMerge: tüketici `text-white` yazınca twMerge öneksiz
        // `text-primary-foreground`u ELER ama `dark:` ikizi AYRI modifier grubu
        // olduğu için KALIR → koyu temada metin sessizce dark
        // `--primary-foreground`a (222.2 47.4% 1.2% = rgb(2,2,5)) düşüyordu.
        // Ölçüldü: beyaz metin beklerken 1.28:1 (docs/click-animations gradyan
        // butonları). Öneksiz satır kaldığı için TEMA DAVRANIŞI DEĞİŞMEZ.
        // Kardeş presedans: #533/#646 badge'de `dark:bg-primary/90`ı aynı gerekçeyle
        // kaldırdı; button'a o turda uğranmamıştı.
        //
        // #715 Dal 3 — `primary`nin hover/active ALFA kompoziti AA altındaydı;
        // `destructive`in (Dal 2) birebir aynı kusuru. `/90` ve `/80` zemini BEYAZLA
        // karıştırıp rengi AÇIYOR, metin ise sabit `--primary-foreground` (#f8fafc):
        //   resting  bg-primary      #1067f4 → 4.70 ✓  (#442: geçiyor → DOKUNULMADI)
        //   hover    bg-primary/90   #2876f5 → 4.01 ✗
        //   active   bg-primary/80   #4085f6 → 3.40 ✗
        // Koyu tema ZATEN geçiyor (near-white zemin + near-black metin: 19.80 /
        // 15.96 / 12.50) → düzeltmenin onu bozmaması ŞART.
        //
        // ⚠️ Dal 2'nin çözümü (alfa yerine opak `error-NNN` kademesi) BURADA
        // UYGULANAMAZ — `primary`nin skala ailesi YANLIŞ HUE'DA:
        //   --primary        217.2 91.2% 51%  = #1067f4  (blue,  h≈217)
        //   --primary-700    3 105 161        = #0369a1  (sky,   h≈199)
        // `--primary-50…950` (tokens.css:15-25) Tailwind SKY paleti; `--primary`nin
        // koyusu DEĞİL, başka bir renk. Üstüne preset o kademeleri hiçbir utility'ye
        // bağlamıyor → `bg-primary-700` bugün HİÇ CSS ÜRETMEYEN ölü sınıf (#713).
        // Ölçülen adaylar ve RET gerekçeleri:
        //   · preset'e sky kademelerini bağla → açık temada 5.67 ✓, AMA (a) görünür
        //     hue kayması, (b) `bg-primary-600` (3.91 ✗) "primary'nin koyusu" sanılan
        //     yanıltıcı public API, (c) öneksiz sınıf koyu temada DA uygulanır ve
        //     near-black metinle 3.49'a ÇÖKER. → RET
        //   · `bg-blue-700` (6.41 ✓) → token'ı by-pass eder; tüketici `--primary`yi
        //     override edince hover mavide takılı kalır. → RET
        //   · `bg-primary-subtle-foreground` (#0950c3, 6.81 ✓, doğru hue, sınıf ZATEN
        //     üretiliyor) → FOREGROUND rolündeki token'ı ZEMİN yapmak iki rolü
        //     birbirine kilitler. → RET
        // SEÇİLEN: koyu tonu `--primary`nin KENDİSİNDEN türet (`color-mix`, siyaha
        // doğru). Tek öneksiz sınıf iki temada da doğru sonuç verir ve tüketici
        // `--primary`yi değiştirdiğinde hover/active KENDİLİĞİNDEN uyar —
        // tokens.css:120-128'in bilinçle koruduğu sözleşme bozulmaz.
        // GERÇEK TARAYICIDA ÖLÇÜLDÜ (headless Chrome 140, piksel örneklemesi):
        //   hover   85% + black  açık #0e57cf → 6.11 ✓ | koyu #d3d4d6 → 13.97 ✓
        //   active  75% + black  açık #0c4db7 → 7.27 ✓ | koyu #babbbd → 10.79 ✓
        // (Testteki kanal-bazlı model 1/255 yuvarlama farkıyla #0e58cf → 6.05 der;
        // ikisi de eşiğin çok üstünde. `color-mix` gerçekten ÇÖZÜLÜYOR — tarayıcı
        // `color(srgb 0.053652 0.342337 0.813348)` döndürüyor, yani sınıf ölü değil.)
        // `dark:` GUARD GEREKMEZ: Dal 1'den sonra dizide hiç `dark:bg-*` yok; tek
        // rakip öneksiz `bg-primary` (0,1,0) ve `hover:`/`active:` (0,2,0) onu yener.
        // `[color:…]` ETİKETİ BİLEREK yazıldı: sınıfın renk olarak tanınmasını hem
        // Tailwind'in hem twMerge'ün tip ÇIKARIMINA bırakmaz. (Etiketsiz form da
        // bugün doğru çalışıyor — ikisi de deterministik probe'la ölçüldü — ama
        // #715'in tamamı "sessizce yanlış sınıflandırılan sınıf" hikâyesidir.)
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-[color:color-mix(in_srgb,hsl(var(--primary))_85%,black)]",
          "active:bg-[color:color-mix(in_srgb,hsl(var(--primary))_75%,black)]",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        secondary: [
          "bg-gray-100 text-gray-900",
          "dark:bg-gray-800 dark:text-gray-100",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "active:bg-gray-300 dark:active:bg-gray-600",
          "border border-input",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "shadow-sm hover:shadow-md",
        ],
        // #715 Dal 1 — `outline`ın DÖRT `dark:` satırı da aynı token'ın tekrarıydı
        // (`--background`/`--foreground`/`--input`/`--accent(-foreground)` hepsi
        // `.dark` bloğunda tanımlı) → kaldırıldı. Kaskad davranışı korunuyor:
        // Tailwind 3.4.17 çıktısında `hover:`/`active:` kuralları `dark:`ten ÖNCE
        // yazılıyor, yani rakip `dark:bg-background` (0,2,0) gitmeden `hover:bg-accent`
        // (0,2,0) koyu temada kaybederdi — bu yüzden satırlar TEK TEK değil,
        // varyant bazında BÜTÜN olarak kaldırıldı.
        outline: [
          "bg-background text-foreground",
          "border border-input",
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        ghost: [
          "text-gray-700",
          "dark:text-gray-300",
          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
          "active:bg-gray-200 dark:active:bg-gray-700",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        // #544: AÇIK tema zaten geçiyordu (`--destructive` light = #e11313, foreground
        // #f8fafc ile 4.66) — #442'nin kuralı gereği DOKUNULMADI, regresyon yüzeyi sıfır.
        // Kırık olan yalnız KOYU temaydı: dark `--destructive` = #ef4343 metin rolü için
        // bilerek açık bırakılmış bir değer (tokens.css:518-526) ve dolgu rolünde
        // foreground'la 3.61 veriyor. Token'a dokunmadan dark dolgusu opak `error`
        // skalasına bağlandı (-600 → 4.62; ölçümle seçilen en açık geçen kademe).
        // Not: `dark:bg-destructive` KALDIRILDI, yanına eklenmedi — iki `dark:bg-*`
        // utility'si aynı anda yazılırsa hangisinin kazanacağını sınıf dizgesi sırası
        // DEĞİL Tailwind'in kendi iç sıralaması belirler.
        //
        // #715 Dal 2 — #544 yalnız RESTING durumu ölçmüştü; alfa harmanlı DURUM
        // dalları sayılmadı. Açık temada `/90` ve `/80` zemini BEYAZLA karıştırıp
        // rengi AÇIYOR, yani AA'yı düşürüyor (metin sabit `--destructive-foreground`
        // #f8fafc):
        //   resting  bg-destructive        #e11313  → 4.66 ✓ (#544'ün ölçtüğü)
        //   hover    bg-destructive/90     #e42b2b  → 4.29 ✗  (axe: 4.28, serious)
        //   active   bg-destructive/80     #e74242  → 3.82 ✗
        // Çözüm koyu dalın ZATEN kullandığı yaklaşım: alfa yerine opak `error`
        // kademesi. Açık dal da aynı kademelere bağlandı:
        //   hover    bg-error-700          #b91c1c  → 6.18 ✓
        //   active   bg-error-800          #991b1b  → 7.94 ✓
        // Yan fayda: durum ilerlemesi artık tutarlı KOYULAŞIYOR (e11313 → b91c1c →
        // 991b1b); alfa sürümünde active, hover'dan DAHA AÇIK oluyordu.
        // `--destructive` token'ına ve resting sınıfına DOKUNULMADI (#442).
        //
        // ⚠️ `dark:hover:`/`dark:active:` ikizleri öneksiziyle aynı değeri taşısa da
        // KALDIRILAMAZ — `dark:bg-error-600` (resting, farklı değer) hâlâ gerekli ve
        // Tailwind 3.4.17 `dark:`i `hover:`ten SONRA yazıyor (aynı özgüllük, 0,2,0):
        //   .hover\:bg-error-700:hover  <  .dark\:bg-error-600:is(.dark *)
        // Öneki atarsak koyu temada hover, resting rengine geri düşer. `dark:hover:`
        // (0,3,0) bu sıralamayı yener. Bu, Dal 1'deki "gereksiz tekrar"dan farklıdır:
        // burada satırın ÖLÇÜLEBİLİR bir işlevi var.
        destructive: [
          "bg-destructive text-destructive-foreground",
          "dark:bg-error-600",
          "hover:bg-error-700 dark:hover:bg-error-700",
          "active:bg-error-800 dark:active:bg-error-800",
          "shadow-sm hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        success: [
          // Koyu temada `--success` (#16a34a) foreground'uyla 3.15 veriyordu (AA 4.5
          // ister) — `--destructive`in #544'teki birebir aynı kusuru. Açık tema
          // dokunulmadı (#442 kuralı: geçen yüzeyde regresyon riski açma).
          // Dolgu opak `success` skalasına bağlandı: -600 hâlâ 3.15, ölçümle geçen
          // en açık kademe -700 (4.79).
          // #715 Dal 1: `dark:text-success-foreground` gereksiz tekrardı (aynı token,
          // `.dark` bloğunda tanımlı) → kaldırıldı. `dark:bg-success-700` FARKLI bir
          // değere işaret ettiği için KALDI.
          //
          // #715 Dal 3 — AÇIK temanın hover/active alfası da AA altındaydı
          // (metin sabit `--success-foreground` #f8fafc, zemin beyaz):
          //   resting  bg-success      #12823b → 4.69 ✓ (#442 → DOKUNULMADI)
          //   hover    bg-success/90   #2a8f4f → 3.90 ✗
          //   active   bg-success/80   #419b62 → 3.30 ✗
          // Burada `destructive`in çözümü AYNEN geçerli, çünkü `--success-NNN`
          // skalası `--success` ile AYNI hue'da (#15803d ↔ #12823b) — `primary`den
          // ayrıldığı nokta tam da bu. Açık dal, KOYU dalın zaten kullandığı
          // kademelere bağlandı (tek kaynak, tutarlı ilerleme):
          //   hover   bg-success-800  #166534 → 6.81 ✓
          //   active  bg-success-900  #14532d → 8.71 ✓
          // -700 (4.79) BİLEREK seçilmedi: hem eşiğe fazla yakın hem de `bg-success`
          // ile neredeyse aynı renk (#15803d ↔ #12823b) — hover geri bildirimi
          // görünmez olurdu.
          //
          // ⚠️ `dark:hover:`/`dark:active:` ikizleri artık öneksiziyle AYNI değeri
          // taşıyor ama KALDIRILAMAZ — `destructive`teki sıralama guard'ının aynısı.
          // Tailwind 3.4.17 çıktısı (deterministik CLI probe'uyla doğrulandı) `dark:`i
          // `hover:`ten SONRA yazıyor ve ikisi de (0,2,0):
          //   .hover\:bg-success-800:hover  <  .dark\:bg-success-700:is(.dark *)
          // `dark:hover:` (0,3,0) bu sıralamayı yener. GERÇEK TARAYICIDA KANITLANDI:
          // guard'sız ikinci bir buton üretilip koyu temada hover'landığında zemin
          // rgb(21,128,61)'de KALDI (= resting/-700, hover HİÇ uygulanmadı);
          // guard'lı buton rgb(22,101,52)'ye (-800) geçti.
          "bg-success text-success-foreground",
          "dark:bg-success-700",
          "hover:bg-success-800 dark:hover:bg-success-800",
          "active:bg-success-900 dark:active:bg-success-900",
          "shadow-sm hover:shadow-md", 
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200",
        ],
        link: [
          "text-primary bg-transparent",
          "underline-offset-4 hover:underline",
          "hover:text-primary/80 active:text-primary/70",
          "p-0 h-auto",
          "transition-colors duration-200",
        ],
        gradient: [
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          "hover:from-purple-600 hover:to-pink-600",
          "active:from-purple-700 active:to-pink-700",
          "shadow-xl shadow-purple-500/40",
          "hover:shadow-2xl hover:shadow-purple-500/50",
          "focus-visible:ring-purple-500/50",
          "transition-all duration-300",
        ],
        glow: [
          // blue-500 (#3b82f6) beyaz metinle 3.68 veriyordu (AA 4.5 ister).
          // Ölçümle geçen en açık kademe blue-600 (#2563eb → 5.17); parıltı
          // gölgesi `--glow-blue-rgb` üzerinden AYNI kaldı, yalnız dolgu koyulaştı.
          "bg-blue-600 text-white",
          // #664 S3: rgba(59,130,246,…) → --glow-blue-rgb (tokens.css). Değer AYNI
          // (Tailwind blue-500), yalnız merkezi token'a taşındı.
          // #738: #664'ün "görsel değişiklik yok" notu YANLIŞTI — token BOŞLUKLU
          // üçlüdür (`59 130 246`), alfa VİRGÜLLE eklenemez: `rgba(59 130 246, 0.5)`
          // geçersiz CSS'tir, bildirim tümden düşer ve gölge HİÇ çizilmezdi
          // (gerçek Chromium: hesaplanmış `box-shadow: none`). Alfa ayırıcısı
          // eğik çizgiye çekildi — CSS Color 4'ün boşluklu sözdizimi.
          "shadow-[0_0_30px_rgb(var(--glow-blue-rgb)_/_0.5)]",
          "hover:shadow-[0_0_40px_rgb(var(--glow-blue-rgb)_/_0.7)]",
          "active:shadow-[0_0_20px_rgb(var(--glow-blue-rgb)_/_0.4)]",
          "hover:bg-blue-700",
          "focus-visible:ring-blue-500/50",
          "transition-all duration-300",
        ],
        soft: [
          // #686: açık temada `bg-primary/10` + `text-primary` 4.28 veriyordu
          // (gereken 4.5) — #354'ün sidebar'da ölçtüğü rakamın birebir aynısı.
          // Aynı çözüm: subtle token ÇİFTİ. Zemin görsel olarak neredeyse aynı
          // kalır, metin koyulaşır → 6.21. Hover/active zeminleri korundu;
          // yeni metin rengiyle ölçüldüler: 5.65 ve 5.02 (ikisi de AA üstü).
          "bg-primary-subtle text-primary-subtle-foreground",
          "hover:bg-primary/20",
          "active:bg-primary/30",
          "focus-visible:ring-primary/50",
          // Koyu temada `bg-primary/20` + `text-primary-foreground` 1.76 veriyordu:
          // dark `--primary` neredeyse beyaz olduğu için /20 açık-gri bir zemin
          // üretiyor, `--primary-foreground` ise koyu — ikisi birbirini yiyordu.
          // #354'ün sidebar'da kanıtlanmış çözümü: subtle token ÇİFTİ (zemin+metin
          // birlikte tanımlı, koyu temada koyu zemin + açık metin).
          // #715 Dal 1: bu çift ARTIK yukarıdaki öneksiz satırdan geliyor —
          // `dark:bg-primary-subtle dark:text-primary-subtle-foreground` aynı token'ın
          // tekrarıydı, kaldırıldı (#686'nın çözümü aynen KORUNUYOR, yalnız tek
          // yerden yazılıyor). Hover/active dalları FARKLI alfa taşıdığı için KALDI.
          "dark:hover:bg-primary/30 dark:active:bg-primary/40",
          "transition-colors duration-200",
        ],
        glass: [
          "bg-white/10 backdrop-blur-md text-foreground",
          "border border-white/20",
          "hover:bg-white/20 hover:border-white/30",
          "active:bg-white/30",
          "shadow-lg",
          "focus-visible:ring-white/50",
          "dark:bg-gray-800/10 dark:border-gray-700/20",
          "dark:hover:bg-gray-800/20 dark:hover:border-gray-700/30",
          "transition-all duration-200",
        ],
        neon: [
          // #686: `text-green-400` (#4ade80) şeffaf zeminde doğrudan sayfa
          // arkaplanına düşüyor → açık temada 1.74 (gereken 4.5). Ölçümle geçen
          // en açık kademe green-700 (5.02); -600 hâlâ 3.3.
          // Koyu tema DEĞİŞMEDİ: neon estetiği orada zaten 11.56 ile geçiyor.
          // Çerçeve de metinle aynı kademeye çekildi (WCAG 1.4.11 non-text 3:1).
          "bg-transparent text-green-700 dark:text-green-400",
          "border-2 border-green-700 dark:border-green-400",
          // hover zemini parlak yeşile dönüyor + metin gray-900 → 10.18, korundu.
          "hover:bg-green-400 hover:text-gray-900",
          // #664 S3: rgba(74,222,128,…) → --glow-green-rgb (tokens.css).
          // #738: "piksel-özdeş" notu YANLIŞTI — virgüllü alfa boşluklu token'la
          // geçersiz CSS üretiyordu, gölge hiç çizilmiyordu. Bkz. `glow` varyantı.
          "hover:shadow-[0_0_30px_rgb(var(--glow-green-rgb)_/_0.6)]",
          "active:shadow-[0_0_15px_rgb(var(--glow-green-rgb)_/_0.4)]",
          "focus-visible:ring-green-400/50",
          "transition-all duration-300",
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "h-10 w-10 p-2",
        "icon-sm": "h-8 w-8 p-1.5",
        "icon-lg": "h-12 w-12 p-3",
      },
      rounded: {
        default: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
        sm: "rounded-lg",
        lg: "rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "default",
      fullWidth: false,
    },
  }
);

// Button component props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Premium Button Component
 * 
 * @param props - Button component properties
 * @param props.variant - Visual variant (primary, secondary, ghost, etc.)
 * @param props.size - Button size (xs, sm, md, lg, xl)
 * @param props.loading - Loading state display
 * @param props.leftIcon - Icon on the left side
 * @param props.rightIcon - Icon on the right side
 * @param props.fullWidth - Full width display
 * @param props.rounded - Corner rounding style (default, full, none)
 * @param props.asChild - Renders the single child element instead of a native
 *   `<button>` (Radix `Slot`), e.g. `<Button asChild><a href="/x">Go</a></Button>`.
 *   The `buttonVariants` classes, the loading spinner and `leftIcon`/`rightIcon`
 *   are merged INTO that child. Because non-button elements ignore the native
 *   `disabled` attribute, `disabled`/`loading` are expressed as `aria-disabled` +
 *   `data-disabled` plus inert styling, and activation is blocked in the click
 *   handler. Falls back to a native `<button>` when the child is not a valid
 *   React element.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    rounded,
    fullWidth,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    // #649: `asChild` daha önce `asChild ? "button" : "button"` idi — ternary'nin iki
    // dalı BİREBİR aynıydı, yani prop tipte ve docs'ta vaat edilmesine rağmen hiçbir
    // şey yapmıyordu. Radix `Slot`a bağlandı (kardeş desen: breadcrumb #309, card #310).
    //
    // Slot TEK ve GEÇERLİ bir element çocuğu ister. `asChild` bugüne dek etkisiz
    // olduğu için `<Button asChild>düz metin</Button>` yazan mevcut kullanım sorunsuz
    // çalışıyordu; doğrudan Slot'a düşseydi sessizce BOŞ render ederdi. Bu yüzden
    // çocuk element değilse native <button>'a geri düşülür.
    const renderAsSlot = asChild && React.isValidElement(children);
    const Comp = renderAsSlot ? Slot : "button";
    const isDisabled = disabled || loading;

    // asChild modunda çocuk <a>/<Link>/<span> olabilir; bu elemanlar native `disabled`
    // özniteliğini TANIMAZ:
    //   • React onu geçersiz bir öznitelik olarak DOM'a basar,
    //   • `:disabled` hiç eşleşmez → cva'daki `disabled:*` stilleri ölü kalır,
    //   • yardımcı teknoloji "devre dışı" duyurusunu alamaz.
    // Bu yüzden devre dışılık Slot dalında ARIA + veri özniteliği ile ifade edilir;
    // native `disabled` yalnız gerçek <button> dalında verilir.
    const disabledProps = renderAsSlot
      ? {
          "aria-disabled": isDisabled || undefined,
          "data-disabled": isDisabled ? "" : undefined,
        }
      : { disabled: isDisabled };

    // asChild + devre dışı: `pointer-events-none` fareyi keser ama bir <a> klavyeden
    // (Enter) hâlâ etkinleşir. Etkinleştirme burada durdurulur; `preventDefault`
    // bağlantı gezinmesini de iptal eder.
    // SINIR: Radix `Slot` olay işleyicilerini birleştirirken ÖNCE çocuğun kendi
    // işleyicisini çağırır — çocuğa doğrudan bağlanmış bir `onClick` engellenemez.
    const handleClick =
      renderAsSlot && isDisabled
        ? (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();
          }
        : onClick;

    return (
      <Comp
        className={cn(
          "moonui-theme",
          buttonVariants({ variant, size, rounded, fullWidth, className }),
          // `:disabled` eşleşmediği için görsel/etkileşimsel devre dışılık Slot
          // dalında açık sınıflarla verilir.
          renderAsSlot && isDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
        ref={ref}
        {...disabledProps}
        // Görsel spinner + data-loading vardı ama yardımcı teknolojiye meşgul
        // durumu hiç duyurulmuyordu.
        aria-busy={loading || undefined}
        data-loading={loading ? "" : undefined}
        {...props}
        onClick={handleClick}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        )}
        {!loading && leftIcon}
        {/* #649: Slot dalında spinner ve ikonlar `Slottable` sayesinde çocuğun İÇİNE
            taşınır; aksi hâlde Slot birden çok çocuk görüp `Children.only` ile patlardı
            ve `loading`/ikon sözleşmesi asChild'da tamamen kaybolurdu. */}
        {renderAsSlot ? <Slottable>{children}</Slottable> : children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
