/**
 * esbuild plugin — IIFE/CDN yolu icin: `react` / `react-dom` bundle'a GIRMEZ,
 * sayfanin global'lerine (`window.React`, `window.ReactDOM`) baglanir.
 *
 * ─── NEDEN GEREKLI (OLCULDU, issue #399 → #410) ──────────────────────────────
 * "Her seyi bundle'la" (her modulu esleyen noExternal) React'i bundle'in ICINE alir.
 * CDN tuketicisi sayfaya kendi React'ini de yuklemek zorundadir (createRoot lazim)
 * → CIFT React → hook dispatcher'i null kalir ve `useId`/`useContext`/`useRef`
 * kullanan HER component "Cannot read properties of null" ile coker.
 * Kontrol deneyi (docs/cdn-destegi-plani.md §2.2): ayni kaynak, tek fark React'in
 * nerede oldugu → bundle icinde 7/7 senaryo coktu, disarida 7/7 calisti.
 *
 * ─── NEDEN DUZ `external: ["react"]` YETMEZ ──────────────────────────────────
 * IIFE ciktisinda `require("react")` cagrisi oldugu gibi kalir ve tarayicida
 * `require is not defined` verir. Dogru yol: bare specifier'i kendi urettigimiz
 * bir shim modulune cozmek ve shim'in global'den okumasi.
 *
 * ─── NEDEN ELLE YAZILMIS EXPORT LISTESI DEGIL ────────────────────────────────
 * Adlandirilmis export listesi build zamaninda GERCEK react modulunden turetilir
 * (`namedExportsOf`). Elle yazilan liste React surumu degistiginde bayatlar ve
 * eksik export sessizce `undefined` olur.
 *
 * ⚠️ SINIR: bu yol `window.React` bekler, yani React'in UMD build'ini gerektirir.
 * React 19 UMD YAYIMLAMIYOR → React 19 tuketicisi ESM yolunu (bare-react-externals.mjs
 * + importmap) kullanmalidir. Ikisi de `tsup.cdn.config.ts` icinde uretilir.
 */
import { createRequire } from "node:module";

/** Gecerli JS tanimlayicisi mi (`export const <ad> = ...` uretilebilir mi) */
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * @param {object} options
 * @param {string} options.resolveFrom  Modullerin cozulecegi dosya yolu (paketin package.json'i)
 */
export function reactGlobalExternals({ resolveFrom }) {
    const require = createRequire(resolveFrom);

    /** Modulun runtime export anahtarlarini (gecerli tanimlayici olanlari) dondurur. */
    function namedExportsOf(specifier) {
        const mod = require(specifier);
        return Object.keys(mod).filter((key) => IDENTIFIER.test(key) && key !== "default");
    }

    /** `globalThis.<globalName>`den okuyan bir ESM shim kaynagi uretir. */
    function globalShim(specifier, globalName, exportNames) {
        return [
            `const __moonui_global = globalThis.${globalName};`,
            `if (!__moonui_global) {`,
            `  throw new Error(`,
            `    "[MoonUI CDN] window.${globalName} bulunamadi. MoonUI bundle'indan ONCE " +`,
            `    "React ve ReactDOM script'lerini yukleyin (\\"${specifier}\\" bu global'e baglidir)."`,
            `  );`,
            `}`,
            `export default __moonui_global;`,
            ...exportNames.map((name) => `export const ${name} = __moonui_global.${name};`),
        ].join("\n");
    }

    // Hangi bare specifier hangi global'e baglanir.
    const GLOBAL_MAP = {
        react: "React",
        "react-dom": "ReactDOM",
        // react-dom/client React 18 UMD'de ReactDOM global'i icinde yasar
        // (createRoot / hydrateRoot dogrudan ReactDOM uzerinde).
        "react-dom/client": "ReactDOM",
    };

    return {
        name: "moonui-react-global-externals",
        setup(build) {
            const filter = /^(react|react-dom|react-dom\/client|react\/jsx-runtime|react\/jsx-dev-runtime)$/;

            build.onResolve({ filter }, (args) => ({
                path: args.path,
                namespace: "moonui-react-global",
            }));

            build.onLoad({ filter: /.*/, namespace: "moonui-react-global" }, (args) => {
                // JSX runtime: React 18 UMD `react/jsx-runtime`i AYRI olarak sunmaz.
                // createElement uzerinden koprulenir. children `props` icinde kalir
                // (createElement, 2. argumandaki children'i oldugu gibi tasir) →
                // dizi children icin sahte "key" uyarisi uretmez.
                if (args.path === "react/jsx-runtime" || args.path === "react/jsx-dev-runtime") {
                    return {
                        contents: [
                            `const __moonui_React = globalThis.React;`,
                            `if (!__moonui_React) {`,
                            `  throw new Error("[MoonUI CDN] window.React bulunamadi — MoonUI'den once React script'ini yukleyin.");`,
                            `}`,
                            `export const Fragment = __moonui_React.Fragment;`,
                            `export function jsx(type, props, key) {`,
                            `  return __moonui_React.createElement(`,
                            `    type,`,
                            `    key === undefined ? props : Object.assign({}, props, { key })`,
                            `  );`,
                            `}`,
                            `export const jsxs = jsx;`,
                            `export const jsxDEV = jsx;`,
                        ].join("\n"),
                        loader: "js",
                    };
                }

                const globalName = GLOBAL_MAP[args.path];
                return {
                    contents: globalShim(args.path, globalName, namedExportsOf(args.path)),
                    loader: "js",
                };
            });
        },
    };
}
