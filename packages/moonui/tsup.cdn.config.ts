/**
 * CDN build tanimi — @moontra/moonui.
 *
 * ─── NEDEN AYRI DOSYA (tsup.config.ts'e eklenmedi) ───────────────────────────
 * `build:dts` script'i `tsup --dts-only` cagirir ve bu bayrak config'teki TUM
 * tanimlara uygulanir. CDN tanimlarinin dts uretmesi anlamsiz (CDN'de tip yok)
 * ve IIFE + dts etkilesimi riskli. Ayri config bu etkilesimi tamamen kaldirir.
 *
 * ─── IKI CIKTI, IKI FARKLI TUKETICI ──────────────────────────────────────────
 *   dist/cdn/moonui.global.js  IIFE · `window.MoonUI` · React'i `window.React`ten alir
 *                              → React 18 UMD ile calisir. React 19 UMD YAYIMLAMIYOR,
 *                                bu yuzden React 19 tuketicisi asagidakini kullanmali.
 *   dist/cdn/moonui.esm.js     ESM  · `<script type="module">` + importmap
 *                              → React 18 VE 19 ile calisir (olcum: plan §11.4)
 *
 * Ikisinde de ORTAK kural: **React bundle'a girmez.** Icine alinirsa sayfanin
 * React'iyle cift-React olusur ve hook kullanan her component coker (plan §2.2,
 * kontrol deneyi: 7/7 cokme). `scripts/cdn/*-externals.mjs` basliklarini oku.
 *
 * Stil AYRI bir artefakttir: `dist/cdn/moonui.css` (bkz. `tailwind.cdn.config.js`).
 * JS tek basina yeterli degildir — component'lerin `bg-primary` gibi utility'leri
 * normalde TUKETICININ Tailwind build'inde uretilir, CDN tuketicisinde oyle bir
 * build yoktur.
 *
 * Calistirma: `npm run build:cdn` (build zincirinin SON adimi — gerekcesi
 * package.json'daki `build` script'inin yaninda).
 */
import { defineConfig } from "tsup";
import * as fs from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";
import { reactGlobalExternals } from "./scripts/cdn/react-global-externals.mjs";
import { bareReactExternals, REACT_SPECIFIERS } from "./scripts/cdn/bare-react-externals.mjs";

const packageRoot = process.cwd();
const packageJsonPath = path.join(packageRoot, "package.json");
const { version } = createRequire(import.meta.url)("./package.json") as { version: string };

// ESM tanimi icin: paketin KENDI dependency'leri adiyla noExternal'a konur.
//
// ⚠️ `noExternal: [/.*/]` KULLANILMIYOR (ESM'de) — olculdu: o kalip React'i
// bundle'a soktu (801 071 B, icinde "Minified React error" ve react-dom.production
// izleri) ve tam da yukarida anlatilan cift-React cokmesini uretti.
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
    dependencies?: Record<string, string>;
};
const bundledDeps = Object.keys(pkg.dependencies ?? {});

const banner = (loader: string) => `/** @license MoonUI v${version} — MIT — https://moonui.dev
 * CDN build (${loader}). React bundle'a DAHIL DEGILDIR — sayfadan gelir.
 * Stil icin moonui.css de yuklenmelidir.
 */`;

export default defineConfig([
    // ── 1) IIFE / window.MoonUI ──────────────────────────────────────────────
    {
        entry: { moonui: "src/index.tsx" },
        format: ["iife"],
        globalName: "MoonUI",
        platform: "browser",
        target: "es2020",
        outDir: "dist/cdn",
        outExtension: () => ({ js: ".global.js" }),
        sourcemap: false,
        minify: true,
        // ⚠️ clean: false — iki tanim AYNI outDir'e yazar; true olsaydi ikinci
        // tanim birincinin ciktisini silerdi. Temizlik `build` zincirindeki
        // `clean` script'ine (rm -rf dist) birakilir.
        clean: false,
        dts: false,
        splitting: false,
        // Radix, framer-motion, lucide, cva… hepsi ICERI alinir: CDN tuketicisinin
        // node_modules'u yoktur. React'i disarida birakan TEK sey asagidaki plugin.
        noExternal: [/.*/],
        external: [],
        esbuildPlugins: [reactGlobalExternals({ resolveFrom: packageJsonPath })],
        esbuildOptions(options) {
            options.jsx = "automatic";
            options.define = { "process.env.NODE_ENV": '"production"' };
        },
        banner: { js: banner("IIFE — window.React bekler") },
    },

    // ── 2) ESM / importmap (React 18 + 19) ───────────────────────────────────
    {
        entry: { moonui: "src/index.tsx" },
        format: ["esm"],
        platform: "browser",
        target: "es2022",
        outDir: "dist/cdn",
        outExtension: () => ({ js: ".esm.js" }),
        sourcemap: false,
        minify: true,
        clean: false,
        dts: false,
        splitting: false,
        // React specifier'lari BILEREK `noExternal`a konur — `external`a DEGIL.
        // esbuild'in `external` dizisi plugin onResolve'undan ONCE degerlendirilir;
        // oraya konursa plugin hic calismaz (olculdu: `require("react")` bundle'da
        // kalip tarayicida patladi). tsup'in kendi external plugin'i ise `noExternal`
        // eslesmesinde cozumu BIRAKIR → plugin'imiz devreye girer.
        noExternal: [...bundledDeps, ...REACT_SPECIFIERS],
        esbuildPlugins: [bareReactExternals({ resolveFrom: packageJsonPath })],
        esbuildOptions(options) {
            options.jsx = "automatic";
            options.define = { "process.env.NODE_ENV": '"production"' };
        },
        banner: { js: banner("ESM — sayfada importmap gerektirir") },
    },
]);
