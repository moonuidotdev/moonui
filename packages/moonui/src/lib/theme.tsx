"use client";

/**
 * MoonUI ThemeProvider — CALISIR tema sistemi.
 *
 * ONCEKI HALI BOZUKTU: eski ThemeProvider yalnizca bir React context tasiyordu;
 * DOM'a hicbir sey yazmiyordu (setProperty/classList/useEffect yoktu) ve
 * createCssVariables() export edilmis ama HIC CAGRILMAMISTI. Yani <ThemeProvider>
 * gorsel olarak no-op'tu. Ustelik token isimleri (--color-primary) ve deger formati
 * (tam `hsl(...)` string'i) component'lerin okudugu sozlesmeyle uyusmuyordu:
 * Tailwind preset'i renkleri `hsl(var(--primary) / <alpha-value>)` diye bagliyor,
 * dolayisiyla tam hsl(...) yazilsaydi `hsl(hsl(...))` olusur ve renk kirilirdi.
 *
 * BU SURUM:
 *  - tokens.css ile AYNI sozlesmeyi kullanir: --primary, --card-foreground, --radius
 *    ve ham HSL ucusu ("217.2 91.2% 59.8%").
 *  - Token'lari gercekten <html> uzerine inline custom property olarak YAZAR.
 *  - 'default' preset'te ve ozel token yokken HICBIR SEY YAZMAZ; statik tokens.css
 *    gecerli kalir. Bu, "provider'i mount etmek gorunumu degistirmez" garantisini
 *    YAPISAL olarak verir.
 *  - Karanlik mod next-themes ile uyumlu: <html>'deki `dark` sinifini MutationObserver
 *    ile IZLER ve preset'in dark varyantini uygular. `dark` sinifini kendisi YAZMAZ —
 *    o isi tema kutuphanenize birakir, cakisma olmaz.
 */

import * as React from "react";
import {
  themePresets,
  type ThemePresetName,
  type ThemePresetDefinition,
  type ThemeTokens,
} from "./theme-presets";

export { themePresets };
export type { ThemePresetName, ThemePresetDefinition, ThemeTokens };

/** camelCase token adi -> CSS custom property. cardForeground -> --card-foreground,
 *  chart1 -> --chart-1 */
const toCssVar = (key: string): string =>
  "--" +
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase();

/** Bu provider'in <html>'e yazdigi property'lerin listesi burada tutulur; temizlik
 *  yalnizca kendi yazdiklarimizi siler, sayfanin diger inline degiskenlerine dokunmaz. */
const OWNED_ATTR = "data-moonui-theme-vars";

export type ColorMode = "light" | "dark";

export interface ThemeContextValue {
  preset: ThemePresetName;
  setPreset: (preset: ThemePresetName) => void;
  /** Tum preset tanimlari — tema secici UI'lari icin (isim, aciklama, kategori) */
  presets: Record<ThemePresetName, ThemePresetDefinition>;
  /** Gecerli renk modu (<html>.dark sinifindan okunur) */
  colorMode: ColorMode;
  /** Preset uzerine binen serbest override'lar, ornek: { primary: "270 90% 60%" } */
  overrides: Partial<ThemeTokens> & Record<string, string>;
  setOverrides: (o: Partial<ThemeTokens> & Record<string, string>) => void;
  /** Su an DOM'a yazilmis efektif token'lar; hicbir sey yazilmadiysa null */
  appliedTokens: Record<string, string> | null;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Baslangic preset'i. Varsayilan "default" = statik tokens.css, hicbir sey yazilmaz */
  defaultPreset?: ThemePresetName;
  /** Kontrollu kullanim: verilirse ic state yerine bu gecerlidir */
  preset?: ThemePresetName;
  overrides?: Partial<ThemeTokens> & Record<string, string>;
  /** Secimi localStorage'a yaz/oku. Varsayilan false (opt-in) */
  persist?: boolean;
  storageKey?: string;
}

const readColorMode = (): ColorMode =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

export const ThemeProvider = ({
  children,
  defaultPreset = "default",
  preset: controlledPreset,
  overrides: controlledOverrides,
  persist = false,
  storageKey = "moonui-theme-preset",
}: ThemeProviderProps) => {
  const [uncontrolledPreset, setUncontrolledPreset] =
    React.useState<ThemePresetName>(defaultPreset);
  const [uncontrolledOverrides, setUncontrolledOverrides] = React.useState<
    Partial<ThemeTokens> & Record<string, string>
  >({});
  // SSR ile ayni ilk render icin daima "light" ile basla; gercegi effect'te oku.
  const [colorMode, setColorMode] = React.useState<ColorMode>("light");
  const [appliedTokens, setAppliedTokens] = React.useState<Record<
    string,
    string
  > | null>(null);

  const preset = controlledPreset ?? uncontrolledPreset;
  const overrides = controlledOverrides ?? uncontrolledOverrides;

  // Kaydedilmis preset + ozel token'lari geri yukle. Ozel token'lar da saklanir;
  // aksi halde kullanicinin olusturdugu tema sayfa yenilenince kaybolurdu.
  React.useEffect(() => {
    if (!persist) return;
    try {
      if (!controlledPreset) {
        const saved = window.localStorage.getItem(storageKey);
        if (saved && saved in themePresets) {
          setUncontrolledPreset(saved as ThemePresetName);
        }
      }
      if (!controlledOverrides) {
        const savedOverrides = window.localStorage.getItem(
          `${storageKey}-overrides`
        );
        if (savedOverrides) {
          const parsed = JSON.parse(savedOverrides);
          if (parsed && typeof parsed === "object") {
            setUncontrolledOverrides(parsed);
          }
        }
      }
    } catch {
      /* private mode / bozuk JSON — sessizce gec */
    }
  }, [persist, storageKey, controlledPreset, controlledOverrides]);

  // Ozel token'lari sakla (kontrolsuz kullanimda)
  React.useEffect(() => {
    if (!persist || controlledOverrides) return;
    try {
      const key = `${storageKey}-overrides`;
      if (Object.keys(uncontrolledOverrides).length === 0) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(uncontrolledOverrides));
      }
    } catch {
      /* yok say */
    }
  }, [persist, storageKey, uncontrolledOverrides, controlledOverrides]);

  // next-themes gibi kutuphaneler <html>'deki `dark` sinifini degistirir; izle.
  React.useEffect(() => {
    setColorMode(readColorMode());
    const el = document.documentElement;
    const observer = new MutationObserver(() => setColorMode(readColorMode()));
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Asil is: token'lari DOM'a yaz.
  React.useEffect(() => {
    const root = document.documentElement;

    const previous = root.getAttribute(OWNED_ATTR);
    if (previous) {
      for (const name of previous.split(",")) root.style.removeProperty(name);
      root.removeAttribute(OWNED_ATTR);
    }

    const hasOverrides = Object.keys(overrides).length > 0;

    // SIFIR-DELTA: varsayilan preset + override yok => hicbir sey yazma.
    if (preset === "default" && !hasOverrides) {
      setAppliedTokens(null);
      return;
    }

    const def = themePresets[preset] ?? themePresets.default;
    const effective: Record<string, string> = {
      ...(colorMode === "dark" ? def.dark : def.light),
      radius: `${def.radius}rem`,
      ...overrides,
    };

    const written: string[] = [];
    for (const [key, value] of Object.entries(effective)) {
      if (value == null || value === "") continue;
      // "--" ile baslayan anahtarlar oldugu gibi gecer (ornek: "--brand-600")
      const cssVar = key.startsWith("--") ? key : toCssVar(key);
      root.style.setProperty(cssVar, value);
      written.push(cssVar);
    }
    root.setAttribute(OWNED_ATTR, written.join(","));
    setAppliedTokens(effective);

    return () => {
      for (const name of written) root.style.removeProperty(name);
      root.removeAttribute(OWNED_ATTR);
    };
  }, [preset, overrides, colorMode]);

  const setPreset = React.useCallback(
    (next: ThemePresetName) => {
      setUncontrolledPreset(next);
      if (persist) {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          /* yok say */
        }
      }
    },
    [persist, storageKey]
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      preset,
      setPreset,
      presets: themePresets,
      colorMode,
      overrides,
      setOverrides: setUncontrolledOverrides,
      appliedTokens,
    }),
    [preset, setPreset, colorMode, overrides, appliedTokens]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme, <ThemeProvider> icinde cagrilmalidir.");
  }
  return ctx;
};

/**
 * Bir preset'i CSS metnine cevirir — tema secicilerdeki "disa aktar" icin.
 * Uretilen blok dogrudan globals.css'e yapistirilabilir.
 */
export const themeToCss = (
  preset: ThemePresetName,
  { selector = ":root", darkSelector = ".dark" } = {}
): string => {
  const def = themePresets[preset] ?? themePresets.default;
  const block = (tokens: ThemeTokens, radius?: string) =>
    Object.entries(tokens)
      .filter(([, v]) => v)
      .map(([k, v]) => `  ${toCssVar(k)}: ${v};`)
      .concat(radius ? [`  --radius: ${radius};`] : [])
      .join("\n");

  return (
    `${selector} {\n${block(def.light, `${def.radius}rem`)}\n}\n\n` +
    `${darkSelector} {\n${block(def.dark)}\n}\n`
  );
};
