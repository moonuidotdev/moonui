import { defineConfig } from "tsup";
import { execSync } from "child_process";

const EXTERNAL = ["react", "react-dom", "tailwindcss", "next", "next/link", "next/image", "next/navigation"];

// Yalnız-DTS ve CJS çıktısının girişleri: tek kaynak.
// theme.tsx ayrı giriş noktası: "./theme" alt yolundan sunulur.
// index.tsx'e eklenmez — o dosyanın yapısı korunur (bkz. CLAUDE.md).
const PUBLIC_ENTRIES = ["src/index.tsx", "src/lib/theme.tsx", "src/hooks/index.ts"];

export default defineConfig([
    // ── ESM — GİRİŞ-BAŞINA ÇIKTI (TASK-MUY7QJ6DHTPOO) ───────────────────────────
    //
    // Bu build eskiden üç girişle (`index`, `theme`, `hooks`) tek bir `dist/index.mjs`
    // üretiyordu. Tüketici tek `Button` import etse bile ~171 KB gzip JS iniyordu
    // (yalnız `cn` bile aynı — TASK-MUY69TIF9N0YV §2.1; shadcn Button: +8,5 KB).
    //
    // ── NEDEN her component AYRI giriş ──────────────────────────────────────
    // Tek modülün İÇİNDEN parça eleyebilmek statement düzeyi tree-shaking'e kalır ve
    // paketin üst düzey `displayName` atamaları + saf işaretlenmemiş `forwardRef`/`cva`
    // çağrıları bunu engeller. İKİSİ BİRLİKTE tutucudur (tek tek kaldırınca −%1,2 /
    // −%0,04; ikisi birden −%91,3 — TASK-MUY69TIF9N0YV §3.1). Giriş-başına çıktıda paket
    // modüllere bölünür; `sideEffects: ["**/*.css"]` sayesinde bundler KULLANILMAYAN
    // MODÜLÜN TAMAMINI atar ve içindeki statement'ların saf olup olmaması önemsizleşir.
    // Tüketici import'u DEĞİŞMEZ (`import { MoonUIButton } from "@moontra/moonui"`).
    //
    // ⚠️ `splitting: true` TEK BAŞINA ETKİSİZDİR; kazancı `entry` listesi verir.
    // `splitting` yalnız modüller arası ortak kodu paylaşılan chunk'lara taşır.
    //
    // 🔴 `scripts/postbuild.js` BU YAPIYA BAĞLIDIR: çıktının TAMAMI `"use client"` ile
    // damgalanır ve damgasız dosya kalırsa build DURUR (sunucu component'inden import
    // Next production build'ini `createContext is not a function` ile düşürür).
    //
    // ⚠️ TUZAK (#399): tsup'ta CLI argümanı config'i EZER. `build:js` / `build:dts`
    // argümansız `tsup` çağırır; giriş noktalarının ve format'ın TEK kaynağı bu dosya.
    // `tsup --dts` / `--dts-only` kullanma: `dts` seçeneği ezilir ve aşağıdaki dar
    // dts girişleri yerine ~130 girişlik rollup-dts geçişi (bellek) başlar.
    {
        entry: [
            ...PUBLIC_ENTRIES,
            // Her component kendi giriş noktası olur (test/story hariç).
            "src/components/ui/**/*.tsx",
            "!src/components/ui/**/__tests__/**",
            "!src/components/ui/**/*.stories.tsx",
        ],
        format: ["esm"],
        splitting: true,
        sourcemap: true,
        // clean: false — iki tanım paralel koşar; `build` betiği `npm run clean` ile başlar.
        clean: false,
        treeshake: true,
        external: EXTERNAL,
        banner: {
            js: '"use client";\n/** @license MoonUI v1.0.0 - MIT License - https://moonui.dev */',
        },
        esbuildOptions(options) {
            options.jsx = "automatic";
        },
        // CSS injection for auto-import (kaynakta `import "*.css"` yok → fiilen no-op)
        injectStyle: true,
        // ⚠️ `dts` GİRİŞ LİSTESİNDEN AYRI: `dts: true` tüm `entry`yi kapsar.
        // Tip yüzeyi eskisiyle birebir (3 giriş) kalır.
        dts: { entry: PUBLIC_ENTRIES },
        async onSuccess() {
            console.log("Running post-build script...");
            execSync("node scripts/postbuild.js", { stdio: "inherit" });
        },
    },
    // ── CJS — `require` koşulu için TEK-DOSYA çıktı (davranış korunur) ───────────
    // CJS çıktısı bundler tree-shaking'inden yararlanmaz (require grafiği), bu yüzden
    // giriş-başına bölmenin faydası yok, yalnız tarball büyütür. Eski yapıyla aynı
    // üç giriş + `dist/index.js` / `dist/lib/theme.js` / `dist/hooks/index.js`.
    {
        entry: PUBLIC_ENTRIES,
        format: ["cjs"],
        splitting: true,
        sourcemap: true,
        clean: false,
        treeshake: true,
        external: EXTERNAL,
        banner: {
            js: '"use client";\n/** @license MoonUI v1.0.0 - MIT License - https://moonui.dev */',
        },
        esbuildOptions(options) {
            options.jsx = "automatic";
        },
        injectStyle: true,
        dts: { entry: PUBLIC_ENTRIES },
    },
    // ⛔ CDN (IIFE) build'i #399 ile KALDIRILDI — geri eklemeden önce oku.
    //
    // Burada `format: ["iife"] + globalName: "MoonUI"` ilan eden ikinci bir tanım
    // vardı. CLI argümanı config'i ezdiği için hiç IIFE üretmedi: `.global.js`
    // adıyla ESM yayımlandı, `window.MoonUI` hiçbir sürümde oluşmadı. Yani bu
    // yol hiç çalışmadı, kimse tüketemedi; her tarball'a 4.7 MB ölü artefakt
    // (index/hooks/theme/chunk `.global.js` + map'leri) taşındı.
    //
    // "CLI argümanını kaldırıp gerçek IIFE üretelim" YETMEZ. Ölçüldü (#399,
    // gerçek tarayıcı, React 18 UMD + gerçek IIFE bundle):
    //   - `window.MoonUI` oluşuyor (410 export) ✔
    //   - ama React bundle'ın İÇİNE giriyor (`noExternal: [/.*/]`) ve dışarı
    //     React/ReactDOM API'si sunulmuyor → sayfa kendi React'ini yüklemek
    //     zorunda → ÇİFT React → hook kullanan her component çöküyor:
    //     Switch `useId` / Tooltip `useContext` / Accordion `useRef` üzerinde
    //     "Cannot read properties of null". Yalnız hooksuz Card/Button render oldu.
    //   - CDN için stil artefaktı da yok (bu paketin stili tüketicinin Tailwind'inden
    //     gelir) → bundle çalışsa bile componentler stilsiz çıkardı.
    //
    // Yani gerçek bir CDN yolu = react/react-dom'u sayfa global'lerine
    // externalize eden esbuild plugin'i + CDN için derlenmiş Tailwind CSS
    // artefaktı + README bölümü. Bu bir build-config düzeltmesi değil, ayrı bir
    // ÜRÜN kararı; istenirse kendi issue'suyla yapılır. O gün gelene kadar
    // `unpkg`/`jsdelivr` alanları da package.json'dan kaldırıldı (#399) ve
    // `src/__tests__/cdn-iife-removed.test.ts` bu kararı kilitler.
]);
