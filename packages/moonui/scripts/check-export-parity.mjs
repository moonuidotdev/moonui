#!/usr/bin/env node
/**
 * Export paritesi kapısı — `@moontra/moonui` (TASK-MUY7QJ6DHTPOO).
 *
 * NEDEN: build tek dosyadan giriş-başına çıktıya geçti. Bir bileşen yeni yapıda
 * sessizce düşerse ya da fazladan bir şey sızarsa tüketici import'u kırılır.
 * Bu kapı, dist'in dışa açtığı adları YAYIMLI REFERANS SÜRÜMÜN adlarıyla
 * karşılaştırır: eksik 0, fazla 0 — hem çalışma zamanı (ESM + CJS) hem `.d.ts`.
 *
 * KULLANIM
 *   node scripts/check-export-parity.mjs                      # dist ↔ fixture
 *   node scripts/check-export-parity.mjs --write-fixture <paket-dizini>
 *        # yayımlı tarball'dan (npm pack + tar -x → <dizin>/package) fixture üretir
 *
 * Fixture (scripts/fixtures/export-surface.json) bir SÜRÜM SÖZLEŞMESİDİR: export
 * yüzeyi bilerek değişiyorsa (yeni bileşen) fixture aynı PR'da yeniden üretilir;
 * "fazla" çıktısı o zaman yalnız yeni eklenenleri göstermeli.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURE = path.join(ROOT, 'scripts', 'fixtures', 'export-surface.json');
const require = createRequire(import.meta.url);
const ts = require('typescript');

/** alt yol → [ESM dosyası, CJS dosyası, .d.ts dosyası] (paket köküne göre). */
const SURFACES = {
    '.': ['dist/index.mjs', 'dist/index.js', 'dist/index.d.ts'],
    './theme': ['dist/lib/theme.mjs', 'dist/lib/theme.js', 'dist/lib/theme.d.ts'],
    './hooks': ['dist/hooks/index.mjs', 'dist/hooks/index.js', 'dist/hooks/index.d.ts'],
};

function typeExports(file) {
    const program = ts.createProgram([file], { skipLibCheck: true, noEmit: true, moduleResolution: ts.ModuleResolutionKind.Node10 });
    const checker = program.getTypeChecker();
    const sf = program.getSourceFile(file);
    const sym = checker.getSymbolAtLocation(sf);
    return sym ? checker.getExportsOfModule(sym).map((s) => s.name).sort() : [];
}

async function collect(pkgDir) {
    const out = {};
    for (const [sub, [esm, cjs, dts]] of Object.entries(SURFACES)) {
        const esmNames = Object.keys(await import(pathToFileURL(path.join(pkgDir, esm)).href)).sort();
        const cjsNames = Object.keys(createRequire(path.join(pkgDir, 'package.json'))(path.join(pkgDir, cjs)))
            .filter((k) => k !== '__esModule')
            .sort();
        out[sub] = { esm: esmNames, cjs: cjsNames, types: typeExports(path.join(pkgDir, dts)) };
    }
    return out;
}

const args = process.argv.slice(2);
if (args[0] === '--write-fixture') {
    const dir = path.resolve(args[1] ?? '');
    const surface = await collect(dir);
    const version = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version;
    fs.writeFileSync(FIXTURE, JSON.stringify({ baseline: version, surface }, null, 1) + '\n');
    console.log(`fixture yazıldı: ${path.relative(ROOT, FIXTURE)} (referans ${version})`);
    process.exit(0);
}

const { baseline, surface: expected } = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'));
const actual = await collect(ROOT);
let bad = 0;
for (const sub of Object.keys(expected)) {
    for (const kind of ['esm', 'cjs', 'types']) {
        const want = new Set(expected[sub][kind]);
        const got = new Set(actual[sub][kind]);
        const missing = [...want].filter((n) => !got.has(n));
        const extra = [...got].filter((n) => !want.has(n));
        console.log(`${sub.padEnd(8)} ${kind.padEnd(5)} referans ${want.size} · yeni ${got.size} · eksik ${missing.length} · fazla ${extra.length}`);
        if (missing.length || extra.length) {
            bad++;
            if (missing.length) console.error(`   eksik: ${missing.slice(0, 30).join(', ')}`);
            if (extra.length) console.error(`   fazla: ${extra.slice(0, 30).join(', ')}`);
        }
    }
}
if (bad) {
    console.error(`\n❌ export paritesi bozuk (referans @moontra/moonui@${baseline})`);
    process.exit(1);
}
console.log(`\n✅ export paritesi: @moontra/moonui@${baseline} ile eksik 0, fazla 0`);
