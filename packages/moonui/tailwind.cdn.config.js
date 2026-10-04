/**
 * CDN icin onceden derlenmis Tailwind CSS artefakti — @moontra/moonui.
 *
 * NEDEN GEREKLI: MoonUI component'lerinin stili paketten GELMEZ; `bg-primary`,
 * `border-border` gibi utility'ler tuketicinin Tailwind build'inde uretilir
 * (bkz. tailwind-preset.js basligi). CDN tuketicisinin Tailwind build'i YOKTUR
 * → JS bundle calissa bile component'ler stilsiz cikar. Bu yuzden CDN yolu
 * JS'in yaninda bir CSS artefakti da yayimlar.
 *
 * `content` olarak paketin KENDI kaynagi taranir: yalnizca component'lerin
 * gercekten kullandigi siniflar uretilir (tam Tailwind degil).
 *
 * ⚠️ KAPANMAYAN SINIR (olculdu, plan §2.3): tuketicinin kendi HTML'inde yazdigi
 * siniflar (`mt-[37px]` gibi) bu CSS'te YOKTUR ve uretilemez — tarama build
 * zamaninda bizim kaynagimiz uzerinde yapilir. README bunu acikca soyler ve
 * cozum olarak Tailwind Play CDN'i gosterir.
 *
 * Kullanim: `npm run build:cdn:css` (paket dizininden).
 */
const path = require("node:path");

const packageRoot = __dirname;

/** @type {import('tailwindcss').Config} */
module.exports = {
    // Yayimlanan preset tek kaynaktir — CDN CSS'i ile npm tuketicisinin CSS'i
    // ayni theme'den uretilsin diye burada da o kullanilir.
    presets: [require(path.join(packageRoot, "tailwind-preset.js"))],
    darkMode: "class",
    content: [path.join(packageRoot, "src/**/*.{js,ts,jsx,tsx}")],
};
