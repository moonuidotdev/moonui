"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Slider Component
 *
 * Accessible, customizable slider component fully integrated with the theme system.
 * Used for value ranges like volume, brightness, price ranges.
 */

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-5",
        md: "h-6",
        lg: "h-8",
        xl: "h-10",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const sliderTrackVariants = cva(
  "relative h-1.5 w-full grow overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        accent: "bg-accent/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        error: "bg-error/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderRangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        default: "bg-foreground",
        primary: "bg-primary",
        // #389 (#372'nin birebir ardılı): range `bg-secondary` idi — track'in
        // (`bg-secondary/20`) AYNI yüzey token'ına basıyordu; %20 alfa track ile
        // tam dolgu iki temada da ~1.0 oranında kalıyor, dolu kısım görünmüyordu
        // (light rgb(235,239,245) → 1.12 · dark rgb(2,8,23) → 1.01).
        // `bg-secondary-foreground` BİLEREK seçilmedi: light'ta --primary ile aynı
        // hue/sat'ta yalnız ΔL=%2 (fill↔fill 1.07), dark'ta birebir --primary
        // değeri (210 40% 98%) — secondary varyantı primary klonuna dönerdi.
        // `--secondary-500` (tokens.css slate skalası, RGB üçlüsü) iki temada da
        // track'e ≥3:1 (WCAG 1.4.11) veren TEK kademe: light 4.63, dark 4.23
        // (gerçek kart #111827 üstünde 3.83; 400 light'ta 2.50 ✗, 600 dark'ta
        // 2.66 ✗). Skala :root'ta tanımlı olduğundan tema değişiminde sabittir;
        // tüketici --secondary-500'ü ezerek özelleştirebilir.
        // Regresyon: __tests__/slider-secondary-contrast.test.ts
        secondary: "bg-[rgb(var(--secondary-500))]",
        // #448 (#389/#407'nin `accent` kardeşi — ama ÇÖZÜM SINIFI farklı): range
        // `bg-accent`, track `bg-accent/20` idi — aynı yüzey token'ının iki alfası.
        // `--accent` HER İKİ temada da kusurluydu (warning/error'dan ağır: onlar
        // yalnız light'ta kusurluydu): A ekseni light 1.123 · dark 1.303 · gerçek
        // docs kartı (#111827) 1.162. Eşik 3:1 (WCAG 1.4.11 non-text).
        //
        // KÖK NEDEN: `--accent` bir YÜZEY token'ı — `hover:bg-accent` tinti olarak
        // tasarlanmış ve iki temada da kendi zeminine BİTİŞİK duruyor (light
        // rgb(235,239,245) beyaz üstünde, dark rgb(29,40,58) rgb(3,7,17) üstünde).
        // Dolgu/kenarlık rolüne yapısal olarak uygun değil; bu yüzden track'i
        // değiştirerek onarmak da MÜMKÜN DEĞİL (light'ta accent'ten 3:1 uzakta
        // duran daha açık bir yüzey yok).
        //
        // #389'un tek-orta-ton kademe araması AYNEN uygulanamadı: tokens.css'te
        // `--accent-50 … --accent-950` skalası YOK (skalası olan aileler:
        // primary/secondary/success/warning/error/brand/brand-accent).
        // `bg-accent-foreground` de elendi — `--accent-foreground` iki temada da
        // `--primary` ile BİREBİR aynı değer (varyant primary klonuna dönerdi) ve
        // 7 tema preset'inin 2'sinde beyaz (Creative/Nature), yani tek başına
        // dolgu olamaz.
        //
        // ÇÖZÜM: sistemin TEK nötr skalası olan slate (`--secondary-*`) — `--accent`
        // ile aynı hue ailesi (216° ↔ 215°), üstelik light temada `--accent` ile
        // `--secondary` BİREBİR aynı token değerini taşıyor. Tema-kör tek kademe
        // SEÇİLEMEDİ: bu ailede iki temayı birden geçen tek kademe 500'dür, o da
        // `secondary` varyantının kendi rengi (ΔE*ab = 0.0 — iki varyant klon olurdu).
        // Bu yüzden #442'nin `dark:` ayrımı deseni kullanıldı, tema başına ayrı kademe.
        // Tam tarama (11 kademe × 2 tema × 3 zemin × 2 eksen): DARK'ta eşiği geçen VE
        // kardeş varyantlardan ayırt edilebilen (ΔE*ab ≥ 10) TEK kademe 400
        // (500 = secondary klonu · ≤300 `default`/`primary` ile çakışıyor · ≥600 eşiğin
        // altında). LIGHT'ta {600,700,800} uygun; 700 kardeş ayrımını maksimize eder
        // (ΔE 21.2 · 600→12.7 · 800→14.9).
        // Ölçülen — A: light 1.123 → 10.081 ✓ · dark 1.303 → 7.533 ✓ · docs kartı
        // 1.162 → 6.717 ✓. Track `bg-accent/20` DEĞİŞMEDİ (yedi varyantın ortak deseni).
        // Regresyon: __tests__/slider-accent-contrast.test.ts
        accent: "bg-[rgb(var(--secondary-700))] dark:bg-[rgb(var(--secondary-400))]",
        success: "bg-success",
        // #442 (#424/PR #440'ın slider ikizi): range `bg-warning`/`bg-error` idi —
        // track (`bg-warning/20` · `bg-error/20`) AYNI token'ın alfalı hâli olduğundan
        // LIGHT temada ayrım kayboluyordu: warning 1.835 · error 2.893 (eşik 3:1,
        // WCAG 1.4.11 non-text). DARK tema zaten temizdi (warning 6.97 · error 4.46).
        //
        // KÖK NEDEN: `--warning` ve `--error` tokens.css'in `.dark` bloğunda
        // EZİLMİYOR — iki temada aynı renk. Kardeşleri tema-uyarlanabilir olduğu
        // için geçiyor (`--success` light %29 → dark %36; ölçüm: success A ekseni
        // light 3.73 / dark 4.83). Bu iki aile o uyarlamadan yoksun.
        //
        // ÇÖZÜM: eksik tema-uyarlamasını component düzeyinde ver — light'ta skalanın
        // -700 kademesine in, dark'ta semantik token'a DOKUNMA (dark render bit-bit
        // aynı kalır, regresyon yüzeyi sıfır). Tema-KÖR bir -700 ataması dark'ı
        // kırardı: gerçek docs kartı (#111827) üstünde warning 2.499 ✗ · error 2.232 ✗.
        // Tam skala taraması (11 kademe × 2 aile × 3 zemin × 2 tema) track `/20` iken
        // iki temayı birden geçen kademe kümesini BOŞ buluyor → `dark:` ayrımı ZORUNLU;
        // #389'un tek-orta-ton (`--secondary-500`) çözümü burada uygulanamaz, çünkü
        // orada `--secondary` temaya göre değişiyordu. Aynı `dark:` deseni badge.tsx:51-63
        // ve progress.tsx:110-111'de zaten kullanılıyor.
        // Ölçülen sonuç — warning: light 1.835 → 4.235 ✓ · error: light 2.893 → 4.950 ✓
        // (dark değişmedi: 6.97 / 4.46; docs kartı 5.77 / 3.82).
        // Skala token'ları RGB üçlüsüdür (semantiklerin HSL'inden farklı) →
        // `rgb(var(--x-700))` kompozisyonu; `bg-warning-700` YAZILMADI, preset bu
        // ailelere sayısal skala açmıyor (#307 ölü-sınıf tuzağı).
        // Regresyon: __tests__/slider-warning-error-contrast.test.ts
        warning: "bg-[rgb(var(--warning-700))] dark:bg-warning",
        error: "bg-[rgb(var(--error-700))] dark:bg-error",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

const sliderThumbVariants = cva(
  "block rounded-full border-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-foreground bg-background",
        primary: "border-primary bg-background",
        // #407 (P2, #389'un range eksenine EK ayrı eksen): tutamacın kenarlığı
        // `border-secondary`, dolgusu `bg-background` idi. Bu bileşen↔sayfa-zemini
        // ekseni: `--secondary` light'ta neredeyse beyaz (rgb(235,239,245)), dark'ta
        // `--background` ile neredeyse aynı → kenarlık 1.15 (light) / 1.01 (dark)
        // oranında kalıyor, secondary slider'ın tutamacı zeminde kayboluyordu.
        // #389'da bilerek kapsam dışıydı (mevcut kusuru testle "doğru" ilan etmemek için).
        // Non-text UI bileşeni → WCAG 1.4.11 ≥3:1. Skala taraması bu eksende de TEK
        // kademe bırakıyor — `--secondary-500`: light 4.76, dark 4.23 (gerçek kart
        // #111827 üstünde 3.73); 400 light'ta 2.56 ✗, 600 dark'ta 2.66 ✗. Range ile
        // aynı kademe: tutamaç ve dolgu tek renkte okunur.
        // Regresyon: __tests__/slider-secondary-contrast.test.ts
        secondary: "border-[rgb(var(--secondary-500))] bg-background",
        // #448 EKSEN B (range'den FARKLI eksen: bileşen↔sayfa-zemini) — tutamacın
        // dolgusu `bg-background`, yani zeminin kendisi; ayırt edilebilirliğini
        // YALNIZ kenarlık taşır → non-text UI bileşeni, WCAG 1.4.11 ≥3:1.
        // `border-accent` iki temada da kayboluyordu: light 1.154 · dark 1.359 ·
        // gerçek docs kartı 1.197. Range ile AYNI kademeler seçildi — #407'nin
        // gerekçesi burada da geçerli: "tutamaç ve dolgu tek renkte okunur".
        // Ölçülen — light 1.154 → 10.355 ✓ · dark 1.359 → 7.857 ✓ · docs kartı
        // 1.197 → 6.919 ✓.
        // Regresyon: __tests__/slider-accent-contrast.test.ts
        accent: "border-[rgb(var(--secondary-700))] dark:border-[rgb(var(--secondary-400))] bg-background",
        success: "border-success bg-background",
        // #442 EKSEN B (range'den FARKLI eksen: bileşen↔sayfa-zemini) — #407'de
        // `secondary` için açılan eksenin warning/error karşılığı. Tutamacın dolgusu
        // `bg-background`, yani zeminin kendisi; ayırt edilebilirliği YALNIZ kenarlık
        // taşır → non-text UI bileşeni, WCAG 1.4.11 ≥3:1.
        // ÖLÇÜLEN (eski değerler): warning light **2.133 ✗** · error light 3.781 ✓;
        // dark ikisi de rahat geçiyordu (9.45 / 5.33).
        //
        // `warning` KUSURLUYDU, düzeltildi. `error` bu eksende zaten geçiyordu ama
        // yine de aynı ifadeye çekildi: range light'ta -700'e indiği için kenarlık
        // `border-error`da bırakılsaydı LIGHT temada dolgu rgb(185,28,28), tutamaç
        // rgb(239,67,67) olurdu — düzeltmenin KENDİSİ iki-tonlu bir görünüm üretirdi.
        // #407'nin gerekçesi birebir geçerli: "tutamaç ve dolgu tek renkte okunur".
        // Değişim kontrastı düşürmüyor, artırıyor: error light 3.781 → 6.470.
        // Dark'ta `dark:border-*` semantik token'ı koruduğu için render bit-bit aynı.
        // Ölçülen sonuç — warning: light 2.133 → 4.923 ✓ · error: light 3.781 → 6.470 ✓
        // (dark değişmedi: 9.45 / 5.33; docs kartı 8.32 / 4.69).
        // Regresyon: __tests__/slider-warning-error-contrast.test.ts
        warning: "border-[rgb(var(--warning-700))] dark:border-warning bg-background",
        error: "border-[rgb(var(--error-700))] dark:border-error bg-background",
      },
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
        /** @deprecated `md` kullanın — #319 kanonik skala; aynı çıktıyı üretir. */
        default: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

// Custom type definition for component properties
export type SliderBaseProps = {
  /**
   * Track variant
   */
  trackVariant?: VariantProps<typeof sliderTrackVariants>["variant"];
  /**
   * Range variant
   */
  rangeVariant?: VariantProps<typeof sliderRangeVariants>["variant"];
  /**
   * Thumb variant
   */
  thumbVariant?: VariantProps<typeof sliderThumbVariants>["variant"];
  /**
   * Thumb size
   */
  thumbSize?: VariantProps<typeof sliderThumbVariants>["size"];
  /**
   * Show value label
   */
  showValueLabel?: boolean;
  /**
   * Value label format function
   */
  valueLabelFormat?: (value: number) => string;
  /**
   * Value label class name
   */
  valueLabelClassName?: string;
  /**
   * Slider value
   */
  value?: number[];
  /**
   * Default value
   */
  defaultValue?: number[];
  /**
   * Function called when value changes
   */
  onValueChange?: (value: number[]) => void;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step value
   */
  step?: number;
  /**
   * Slider size
   */
  size?: VariantProps<typeof sliderVariants>["size"];
  /**
   * Disabled state
   */
  disabled?: boolean;
}

// Merge HTML properties without defaultValue conflicts
export type SliderProps = SliderBaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'>

const Slider = React.forwardRef<
  HTMLDivElement,
  SliderProps
>(({
  className,
  size,
  trackVariant,
  rangeVariant,
  thumbVariant,
  thumbSize,
  showValueLabel = false,
  valueLabelFormat,
  valueLabelClassName,
  value,
  defaultValue = [0],
  onValueChange,
  disabled,
  ...props
}, ref) => {
  // Value management
  const [sliderValue, setSliderValue] = React.useState<number[]>(
    value as number[] || defaultValue as number[] || [0]
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSliderValue(value as number[]);
    }
  }, [value]);

  // Format value label with proper precision handling
  const formatValue = (val: number) => {
    if (valueLabelFormat) {
      return valueLabelFormat(val);
    }
    // Round to avoid floating point precision issues
    const roundedValue = Math.round(val * 100) / 100;
    return `${roundedValue}`;
  };

  // Calculate percentage for thumb position
  const calculateThumbPercent = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Handle mouse/touch events
  const trackRef = React.useRef<HTMLDivElement>(null);
  
  const min = props.min || 0;
  const max = props.max || 100;
  const step = props.step || 1;

  // Handle value change with proper precision
  const handleValueChange = (newValues: number[]) => {
    // Round values to avoid floating point precision issues
    const roundedValues = newValues.map(val => {
      if (step < 1) {
        // For decimal steps, round to appropriate decimal places
        const decimals = step.toString().split('.')[1]?.length || 0;
        return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
      }
      return Math.round(val);
    });
    
    setSliderValue(roundedValues);
    if (onValueChange) {
      onValueChange(roundedValues);
    }
  };

  // Handle track click
  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const boundedValue = Math.max(min, Math.min(max, steppedValue));
    
    const newValues = [...sliderValue];
    // Just update the first thumb for simplicity
    newValues[0] = boundedValue;
    handleValueChange(newValues);
  };

  const handleThumbMouseDown = (index: number) => (event: React.MouseEvent) => {
    if (disabled) return;
    event.preventDefault();
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const boundedValue = Math.max(min, Math.min(max, steppedValue));
      
      const newValues = [...sliderValue];
      newValues[index] = boundedValue;
      handleValueChange(newValues);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Klavyeyle değer değiştirme (WCAG 2.1.1 Keyboard).
  //
  // Thumb'lar `role="slider"` + `aria-valuenow` + `tabIndex=0` taşıyıp
  // odaklanabiliyordu, ancak hiçbir klavye handler'ı yoktu: bileşen ARIA
  // sözleşmesinde slider olduğunu duyuruyor ama yalnızca fareyle çalışıyordu.
  // Tuş eşlemesi Radix Slider davranışını izler.
  const handleThumbKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    if (disabled) return;

    const largeStep = step * 10;
    const current = sliderValue[index];
    let next: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - step;
        break;
      case "PageUp":
        next = current + largeStep;
        break;
      case "PageDown":
        next = current - largeStep;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }

    // Yalnızca yukarıdaki tuşlarda varsayılan davranışı engelle (sayfa kaydırma).
    event.preventDefault();

    // Çoklu thumb'da komşu değerleri aşma; tek thumb'da min/max sınırları geçerli.
    const lowerBound = index > 0 ? sliderValue[index - 1] : min;
    const upperBound =
      index < sliderValue.length - 1 ? sliderValue[index + 1] : max;
    const bounded = Math.max(lowerBound, Math.min(upperBound, next));

    const newValues = [...sliderValue];
    newValues[index] = bounded;
    // handleValueChange, step hassasiyetine göre yuvarlamayı zaten uyguluyor.
    handleValueChange(newValues);
  };

  return (
    <div className="w-full" ref={ref} {...props}>
      {showValueLabel && (
        <div className={cn(
          "flex justify-end mb-1 text-sm text-muted-foreground",
          valueLabelClassName
        )}>
          {sliderValue.length === 1 ? (
            <span>{formatValue(sliderValue[0])}</span>
          ) : (
            <span>{formatValue(sliderValue[0])} - {formatValue(sliderValue[sliderValue.length - 1])}</span>
          )}
        </div>
      )}
      
      <div
        className={cn("moonui-theme", sliderVariants({ size }), className)}
        data-disabled={disabled ? true : undefined}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants({ variant: trackVariant || thumbVariant || "default" }))}
          onClick={handleTrackClick}
        >
          {/* Range */}
          <div
            className={cn(sliderRangeVariants({ variant: rangeVariant || thumbVariant || "primary" }))}
            style={{
              left: '0%',
              width: `${calculateThumbPercent(sliderValue[0], min, max)}%`,
            }}
          />
        </div>

        {/* Thumbs */}
        {sliderValue.map((value, i) => (
          <div
            key={i}
            className={cn(sliderThumbVariants({
              variant: thumbVariant || "primary",
              size: thumbSize
            }))}
            style={{
              left: `${calculateThumbPercent(value, min, max)}%`,
              transform: 'translateX(-50%)',
              position: 'absolute',
              top: '50%',
              marginTop: thumbSize === "sm" ? '-6px' : thumbSize === "lg" ? '-12px' : '-8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onMouseDown={handleThumbMouseDown(i)}
            onKeyDown={handleThumbKeyDown(i)}
            aria-label={`Thumb ${i + 1}`}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
})

Slider.displayName = "Slider"

export { Slider }
