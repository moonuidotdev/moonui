/**
 * esbuild plugin — ESM/CDN yolu icin: `react` / `react-dom` bundle'a GIRMEZ,
 * CIPLAK (bare) ESM import'u olarak kalir; sayfadaki importmap cozer.
 *
 * `react-global-externals.mjs`in ESM kardesidir. Fark: orada React
 * `window.React`ten okunur (React 19 UMD yayimlamadigi icin React 19'a uymaz),
 * burada gercek bir `import "react"` olarak kalir → **React 19 de calisir**.
 * Olcum: docs/cdn-destegi-plani.md §11.2/§11.4 (React 18 ve 19, 7/7 render).
 *
 * ─── NEDEN DUZ `external: ["react"]` YETMIYOR (OLCULDU) ──────────────────────
 * tsup/esbuild ESM ciktisinda, bundle'a giren bir CJS bagimliligi
 * `require("react")` yazdiginda ve `react` external ise, esbuild bunu kendi
 * `__require` yardimcisina cevirir; o yardimci tarayicida
 *     Uncaught Error: Dynamic require of "react" is not supported
 * firlatir. Olculdu: `use-sync-external-store/shim` (Radix/cmdk/framer-motion
 * zincirinden gelir, CJS'tir ve `var React = require('react')` yazar) yuzunden
 * ESM bundle sayfada HIC yuklenmedi (export sayisi 0).
 *
 * Cozum: bare specifier'i bundle ICINDEKI bir shim modulune cozmek. Shim, dis
 * dunyaya gercek `import` ile baglanir; `require()` eden CJS modul ise shim'i
 * bundle ici bir modul olarak gorur → `__require` hic uretilmez.
 *
 * ⚠️ Bu plugin'in calisabilmesi icin React specifier'lari tsup'ta `external`a
 * DEGIL `noExternal`a konmalidir — gerekcesi tsup.cdn.config.ts'te.
 *
 * Adlandirilmis export listesi build zamaninda GERCEK modulden turetilir
 * (elle yazilmis liste bayatlar). Erisim `__ns.<ad>` uzerinden yapilir: modul
 * namespace'inde olmayan bir ad `undefined` doner, HATA vermez — boylece
 * React 18 kurulumundan turetilen liste React 19 yukleyen sayfada da guvenlidir.
 */
import { createRequire } from "node:module";

/** Gecerli JS tanimlayicisi mi (`export const <ad> = ...` uretilebilir mi) */
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export const REACT_SPECIFIERS = [
    "react",
    "react-dom",
    "react-dom/client",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
];

/**
 * @param {object} options
 * @param {string} options.resolveFrom  Export listesinin turetilecegi kurulum (paketin package.json'i)
 * @param {string[]} [options.specifiers]
 */
export function bareReactExternals({ resolveFrom, specifiers = REACT_SPECIFIERS }) {
    const require = createRequire(resolveFrom);
    const NAMESPACE = "moonui-bare-react";

    function namedExportsOf(specifier) {
        try {
            const mod = require(specifier);
            return Object.keys(mod).filter((key) => IDENTIFIER.test(key) && key !== "default");
        } catch {
            // Node'da yuklenemeyen giris (or. tarayiciya ozgu alt yol) — yalniz
            // default + namespace koprusu kalir.
            return [];
        }
    }

    const escaped = specifiers.map((s) => s.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const filter = new RegExp(`^(${escaped.join("|")})$`);

    return {
        name: "moonui-bare-react-externals",
        setup(build) {
            build.onResolve({ filter }, (args) => {
                // Shim'in KENDI dis import'u: burada gercekten external olur.
                if (args.namespace === NAMESPACE) return { path: args.path, external: true };
                return { path: args.path, namespace: NAMESPACE };
            });

            build.onLoad({ filter: /.*/, namespace: NAMESPACE }, (args) => {
                const names = namedExportsOf(args.path);
                const spec = JSON.stringify(args.path);
                return {
                    contents: [
                        `import * as __ns from ${spec};`,
                        // Statik export adlari: CJS `require()` interop'u bunlara bakar.
                        ...names.map((name) => `export const ${name} = __ns.${name};`),
                        // CJS moduller cogu zaman `require("react")` sonucunu dogrudan
                        // kullanir; default yoksa namespace'in kendisi verilir.
                        `export default (__ns.default !== undefined ? __ns.default : __ns);`,
                    ].join("\n"),
                    loader: "js",
                };
            });
        },
    };
}
