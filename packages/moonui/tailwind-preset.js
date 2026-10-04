/**
 * MoonUI Tailwind preset
 *
 * Component'ler `bg-primary`, `border-border`, `rounded-lg` gibi utility'ler kullanir.
 * Bu utility'ler ancak Tailwind renkleri CSS degiskenlerine baglandiginda uretilir —
 * aksi halde siniflar hic olusmaz ve component'ler renksiz gorunur.
 *
 * Kullanim:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require("@moontra/moonui/tailwind-preset")],
 *     content: [
 *       "./src/**\/*.{ts,tsx}",
 *       "./node_modules/@moontra/moonui/dist/**\/*.{js,mjs}",
 *     ],
 *   };
 *
 * Degiskenlerin kendisi @moontra/moonui/tokens.css icinde tanimlidir; preset tek
 * basina yeterli DEGILDIR, token CSS'i de import edilmelidir.
 *
 * `content` bilerek disarida birakildi: tuketicinin kendi dosya yollarina bagli.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        /* MoonUI marka paleti — imza gradient: from-brand-600 to-brand-accent-600.
         * Degerleri tokens.css'te; Tailwind'in purple/pink paletiyle birebir ayni,
         * ama artik degistirilebilir token'lar. */
        brand: {
          DEFAULT: "hsl(var(--brand-600) / <alpha-value>)",
          50: "hsl(var(--brand-50) / <alpha-value>)",
          100: "hsl(var(--brand-100) / <alpha-value>)",
          200: "hsl(var(--brand-200) / <alpha-value>)",
          300: "hsl(var(--brand-300) / <alpha-value>)",
          400: "hsl(var(--brand-400) / <alpha-value>)",
          500: "hsl(var(--brand-500) / <alpha-value>)",
          600: "hsl(var(--brand-600) / <alpha-value>)",
          700: "hsl(var(--brand-700) / <alpha-value>)",
          800: "hsl(var(--brand-800) / <alpha-value>)",
          900: "hsl(var(--brand-900) / <alpha-value>)",
          950: "hsl(var(--brand-950) / <alpha-value>)",
        },
        "brand-accent": {
          DEFAULT: "hsl(var(--brand-accent-600) / <alpha-value>)",
          50: "hsl(var(--brand-accent-50) / <alpha-value>)",
          100: "hsl(var(--brand-accent-100) / <alpha-value>)",
          200: "hsl(var(--brand-accent-200) / <alpha-value>)",
          300: "hsl(var(--brand-accent-300) / <alpha-value>)",
          400: "hsl(var(--brand-accent-400) / <alpha-value>)",
          500: "hsl(var(--brand-accent-500) / <alpha-value>)",
          600: "hsl(var(--brand-accent-600) / <alpha-value>)",
          700: "hsl(var(--brand-accent-700) / <alpha-value>)",
          800: "hsl(var(--brand-accent-800) / <alpha-value>)",
          900: "hsl(var(--brand-accent-900) / <alpha-value>)",
          950: "hsl(var(--brand-accent-950) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          // #354: `primary` yumuşak-ton yüzeyi — `bg-primary-subtle` +
          // `text-primary-subtle-foreground`. Aile destructive/success/warning/
          // info için vardı, primary EKSİKTİ ve pro Sidebar'ın aktif öğesi bu
          // yüzden ham `primary/10` kompozisyonuna düşüp light temada 4.28:1
          // veriyordu.
          subtle: "hsl(var(--primary-subtle) / <alpha-value>)",
          "subtle-foreground": "hsl(var(--primary-subtle-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          // #313/#314/#323: yumuşak-ton yüzey — `bg-destructive-subtle` +
          // `text-destructive-subtle-foreground` olarak kullanılır.
          subtle: "hsl(var(--destructive-subtle) / <alpha-value>)",
          "subtle-foreground": "hsl(var(--destructive-subtle-foreground) / <alpha-value>)",
        },
        /* #524: durum ailelerine 50-950 SKALASI baglandi.
         *
         * NEDEN: `tokens.css:41-75` bu skalalari (`--success-50..950`, `--warning-*`,
         * `--error-*`) UZUN ZAMANDIR tanimliyordu ama preset onlari hicbir utility'ye
         * BAGLAMAMISTI — yani `text-success-700` gecersiz bir sinifti ve sessizce
         * hicbir CSS uretmiyordu. Dort Pro component (performance-monitor,
         * performance-debugger, health-check, memory-efficient-data) bu yuzden ham
         * Tailwind literaline (`text-green-500`) dusmus, acik temada 2.08-2.27:1
         * kontrast uretiyordu (gerekli 4.5:1).
         *
         * NEDEN DUZ TOKEN YETMEDI: issue'nun onerdigi `text-warning` / `text-error`
         * eslemesi olculdu ve beyaz zeminde AA'yi GECMIYOR (2.13 ve 3.78). Skala
         * tonlari geciyor: -700 acik temada 5.02 / 4.92 / 6.47, -400 koyu zeminde
         * 11.56 / 13.16 / 7.28.
         *
         * ⚠️ rgb(), hsl() DEGIL: bu skalalarin tokens.css'teki degeri RGB uclusudur
         * ("--success-700: 21 128 61"), yukaridaki DEFAULT/subtle girdileri ise HSL.
         * Bloklardaki mevcut hsl() desenini bu satirlara kopyalamak SESSIZCE yanlis
         * renk uretir (hsl(21 128 61) gecerli bir renktir — 21° hue, kirmizimsi).
         * Bekci: packages/moonui-pro/src/__tests__/issue-524-durum-renkleri.test.tsx
         * (Tailwind'i gercekten kosturup uretilen CSS'i olcer).
         *
         * ⚠️ `.dark` blogu bu tonlari OVERRIDE ETMEZ — tek ton iki temada da ayni
         * hex'i verir. Tuketici koyu tema icin `dark:` ikizini ACIKCA yazmalidir. */
        error: {
          DEFAULT: "hsl(var(--error) / <alpha-value>)",
          50: "rgb(var(--error-50) / <alpha-value>)",
          100: "rgb(var(--error-100) / <alpha-value>)",
          200: "rgb(var(--error-200) / <alpha-value>)",
          300: "rgb(var(--error-300) / <alpha-value>)",
          400: "rgb(var(--error-400) / <alpha-value>)",
          500: "rgb(var(--error-500) / <alpha-value>)",
          600: "rgb(var(--error-600) / <alpha-value>)",
          700: "rgb(var(--error-700) / <alpha-value>)",
          800: "rgb(var(--error-800) / <alpha-value>)",
          900: "rgb(var(--error-900) / <alpha-value>)",
          950: "rgb(var(--error-950) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
          subtle: "hsl(var(--success-subtle) / <alpha-value>)",
          "subtle-foreground": "hsl(var(--success-subtle-foreground) / <alpha-value>)",
          50: "rgb(var(--success-50) / <alpha-value>)",
          100: "rgb(var(--success-100) / <alpha-value>)",
          200: "rgb(var(--success-200) / <alpha-value>)",
          300: "rgb(var(--success-300) / <alpha-value>)",
          400: "rgb(var(--success-400) / <alpha-value>)",
          500: "rgb(var(--success-500) / <alpha-value>)",
          600: "rgb(var(--success-600) / <alpha-value>)",
          700: "rgb(var(--success-700) / <alpha-value>)",
          800: "rgb(var(--success-800) / <alpha-value>)",
          900: "rgb(var(--success-900) / <alpha-value>)",
          950: "rgb(var(--success-950) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
          subtle: "hsl(var(--warning-subtle) / <alpha-value>)",
          "subtle-foreground": "hsl(var(--warning-subtle-foreground) / <alpha-value>)",
          50: "rgb(var(--warning-50) / <alpha-value>)",
          100: "rgb(var(--warning-100) / <alpha-value>)",
          200: "rgb(var(--warning-200) / <alpha-value>)",
          300: "rgb(var(--warning-300) / <alpha-value>)",
          400: "rgb(var(--warning-400) / <alpha-value>)",
          500: "rgb(var(--warning-500) / <alpha-value>)",
          600: "rgb(var(--warning-600) / <alpha-value>)",
          700: "rgb(var(--warning-700) / <alpha-value>)",
          800: "rgb(var(--warning-800) / <alpha-value>)",
          900: "rgb(var(--warning-900) / <alpha-value>)",
          950: "rgb(var(--warning-950) / <alpha-value>)",
        },
        caution: {
          DEFAULT: "hsl(var(--caution) / <alpha-value>)",
          foreground: "hsl(var(--caution-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
          subtle: "hsl(var(--info-subtle) / <alpha-value>)",
          "subtle-foreground": "hsl(var(--info-subtle-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.5s ease-in-out",
        rotate: "rotate 0.5s ease-in-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        // InputOTP sahte imleç animasyonu
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
        "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))",
        "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
      },
      /* #313/#314/#323: `borderColor` extend'i KALDIRILDI.
         Buradaki DÜZ string değerler, `theme.colors` altındaki İÇ İÇE nesneleri
         `border-*` ailesi için EZİYORDU — o beş isimde yalnız DEFAULT hayatta kalıyor,
         `border-success-subtle-foreground` gibi alt anahtarlar hiç CSS ÜRETMİYORDU.
         (Deterministik Tailwind CLI probe'uyla doğrulandı: destructive bu listede
         olmadığı için çalışıyor, diğer üçü çalışmıyordu.)
         `border-*` sınıfları `theme.colors`tan zaten türer; blok gereksizdi. */
    },
  },
  plugins: [],
};
