#!/usr/bin/env node

/**
 * Uretilen her JS bundle'inin basina "use client" direktifini koyar.
 *
 * NEDEN GEREKLI: tsup, kaynaktaki "use client" direktifini bundle'a tasimaz. Direktifsiz
 * bir modulu Next.js App Router SERVER component sayar; icindeki React.createContext
 * cagrisi "TypeError: createContext is not a function" ile patlar. Paketin butun giris
 * noktalari (component'ler ve ThemeProvider) client tarafidir.
 *
 * NEDEN ELLE LISTE DEGIL: onceden burada ['dist/index.mjs', 'dist/index.js'] diye SABIT
 * bir liste vardi. src/lib/theme.tsx yeni bir tsup giris noktasi olarak eklendiginde bu
 * liste guncellenmedi; dist/lib/theme.* direktifsiz yayimlandi (2.5.0) ve @moontra/moonui/theme
 * Next App Router'da kullanilamaz hale geldi. Artik liste dist'ten TURETILIYOR, yani yeni
 * bir giris noktasi eklendiginde kendiliginden kapsanir.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const DIRECTIVE = "'use client';";
// Zaten direktifi olan dosyayi tekrar isaretlemeyelim (tek/cift tirnak, ES/CJS farketmez)
const HAS_DIRECTIVE = /^\s*['"]use client['"]/;

/** dist altindaki tum .js/.mjs bundle'lari (sourcemap ve .d.ts haric). */
function collectBundles(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...collectBundles(full));
        } else if (/\.(js|mjs|cjs)$/.test(entry.name) && !entry.name.endsWith('.map')) {
            out.push(full);
        }
    }
    return out;
}

if (!fs.existsSync(DIST)) {
    console.error('postbuild: dist/ yok — once build calistirin');
    process.exit(1);
}

const bundles = collectBundles(DIST);

if (bundles.length === 0) {
    console.error('postbuild: dist/ altinda bundle bulunamadi');
    process.exit(1);
}

let added = 0;

for (const file of bundles) {
    const rel = path.relative(path.join(__dirname, '..'), file);
    const content = fs.readFileSync(file, 'utf8');

    if (HAS_DIRECTIVE.test(content)) {
        console.log(`  atlandi (zaten var): ${rel}`);
        continue;
    }

    fs.writeFileSync(file, `${DIRECTIVE}\n\n${content}`);
    console.log(`  eklendi "use client": ${rel}`);
    added++;
}

console.log(`postbuild: ${bundles.length} bundle tarandi, ${added} tanesine direktif eklendi`);
