import { defineConfig } from "tsup";
import { execSync } from "child_process";

export default defineConfig([
    // Regular builds (CJS, ESM)
    {
        // theme.tsx ayrı giriş noktası: "./theme" alt yolundan sunulur.
        // index.tsx'e eklenmez — o dosyanın yapısı korunur (bkz. CLAUDE.md).
        //
        // ⚠️ TUZAK (#399'da kapatıldı): tsup'ta CLI argümanı config'i EZER.
        // `build:js` / `build:dts` eskiden giriş noktalarını ve `--format esm,cjs`
        // bayrağını CLI'dan veriyordu; bu, config'in `entry` + `format` alanlarını
        // sessizce geçersiz kılıyordu (aşağıdaki IIFE tanımı bu yüzden hiç IIFE
        // üretmedi — bkz. #399). Artık iki script de argümansız `tsup` çağırıyor:
        // giriş noktalarının ve format'ın TEK kaynağı bu dosya. Buraya yeni bir
        // giriş noktası eklemek yeterlidir; script'lere dokunmaya gerek yok.
        // (`dev` script'i bilinçli olarak dar kapsamlı kalır: yalnız index.tsx izler.)
        //
        // #294: Burada eskiden `glob.sync("src/components/ui/*.tsx")` vardı ve
        // hiç derlenmiyordu; `exports` haritasındaki "./components/*" alt yolu
        // bu yüzden ölüydü. Ölçüldü: component başına giriş noktası üretmek
        // paketi 1.7 MB -> 9.7 MB büyütüyor, tüketici tarafında kazancı ise
        // SIFIR (esbuild ile ölçüm: barrel 32 KB, alt-yol 32 KB) — çünkü
        // `sideEffects: ["**/*.css"]` doğru tanımlı ve ana barrel zaten
        // tree-shake ediliyor. Bu yüzden alt-yol ilan edilmeyi bıraktı, glob
        // da kaldırıldı.
        entry: [
            "src/index.tsx",
            "src/lib/theme.tsx",
            "src/hooks/index.ts",
        ],
        format: ["cjs", "esm"],
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake: true,
        external: ["react", "react-dom", "tailwindcss", "next", "next/link", "next/image", "next/navigation"],
        banner: {
            js: '"use client";\n/** @license MoonUI v1.0.0 - MIT License - https://moonui.dev */',
        },
        esbuildOptions(options) {
            options.jsx = "automatic";
        },
        // CSS injection for auto-import
        injectStyle: true,
        // DTS temporarily disabled due to type conflicts
        dts: true,
        async onSuccess() {
            // Add 'use client' directive after build in watch mode
            console.log("Running post-build script...");
            execSync("node scripts/postbuild.js", { stdio: "inherit" });
        },
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
