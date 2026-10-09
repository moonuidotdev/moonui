#!/usr/bin/env node
/**
 * `"use client"` damga kapısı — dist ağacındaki HER JS çıktısı direktifle başlamalı
 * (TASK-MUY7QJ6DHTPOO). Giriş-başına çıktıda ~120 dosya var; damgasız tek dosya,
 * sunucu component'inden import edildiğinde Next production build'ini
 * `createContext is not a function` ile düşürür (pro'da bir kez yaşandı).
 * `scripts/postbuild.js` damgayı basar, bu betik BASILDIĞINI doğrular; build zincirine bağlı.
 * `dist/cdn/**` taranmaz: tarayıcıya doğrudan <script> ile girer, RSC sınırı yok.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d, rel = '') =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (e.isDirectory()) return rel === '' && e.name === 'cdn' ? [] : walk(path.join(d, e.name), r);
        return /\.(mjs|cjs|js)$/.test(e.name) ? [r] : [];
    });

if (!fs.existsSync(DIST)) {
    console.error('check-use-client: dist/ yok — önce build çalıştır');
    process.exit(1);
}
const files = walk(DIST);
const missing = files.filter((f) => !/^\s*['"]use client['"]/.test(fs.readFileSync(path.join(DIST, f), 'utf8').slice(0, 40)));
if (files.length === 0 || missing.length) {
    console.error(`❌ ${missing.length}/${files.length} çıktı "use client" taşımıyor:`);
    for (const f of missing.slice(0, 20)) console.error(`   · ${f}`);
    process.exit(1);
}
console.log(`✅ "use client": ${files.length}/${files.length} çıktı damgalı`);
