/**
 * CDN TARAYICI GUARD'I — `dist/cdn/` altindaki GERCEK artefaktlari GERCEK
 * tarayicida acar, hook kullanan component'leri render eder ve ETKILESTIRIR.
 *
 * ─── NEDEN BU TEST VAR (#399'un dersi) ───────────────────────────────────────
 * #399'da CDN yuzeyi 5+ surum boyunca SESSIZCE kirikti: dosya adi `.global.js`
 * idi, icerik ESM'di, `window.MoonUI` hicbir surumde olusmadi ve kimse fark
 * etmedi. Statik testler (format/metadata) bunu yakalar ama "component gercekten
 * calisiyor mu" sorusunu YALNIZ tarayici cevaplar — cift-React cokmesi ancak
 * calisma zamaninda gorunur.
 *
 * ─── AG GEREKTIRMEZ ──────────────────────────────────────────────────────────
 * React'in her iki surumu de YEREL node_modules'ten uretilir:
 *   React 18.3.1 → packages/moonui/node_modules (UMD + ESM)
 *   React 19.x   → repo kokundeki node_modules (yalniz ESM; React 19 UMD YOK)
 * Bu, guard'i ucuncu taraf bir CDN'in ayakta olmasina bagimli olmaktan kurtarir.
 *
 * ─── SENARYOLAR ──────────────────────────────────────────────────────────────
 *   iife-r18  moonui.global.js + React 18 UMD   (window.MoonUI yolu)
 *   esm-r18   moonui.esm.js   + importmap R18   (ESM yolu)
 *   esm-r19   moonui.esm.js   + importmap R19   (ESM yolu — IIFE'nin veremedigi)
 * React 19 icin IIFE senaryosu YOKTUR ve olmamalidir: React 19 UMD yayimlamiyor.
 *
 * Calistirma:  node scripts/cdn/verify-cdn.mjs        (paket dizininden)
 * On kosul:    npm run build:cdn
 */
import * as esbuild from "esbuild";
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { bareReactExternals } from "./bare-react-externals.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(HERE, "..", "..");
const REPO_ROOT = path.resolve(PACKAGE_ROOT, "..", "..");
const VENDOR = path.join(PACKAGE_ROOT, "scripts", "cdn", ".verify-vendor");
const DIST_CDN = path.join(PACKAGE_ROOT, "dist", "cdn");

/** playwright repo kokunde kurulu (paketin devDependency'si degil). */
const { chromium } = await import(
    path.join(REPO_ROOT, "node_modules", "playwright", "index.mjs")
).catch(() => import("playwright"));

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * Bir React kurulumundan tarayicida kullanilabilir ESM dosyalari uretir.
 *
 * `bareReactExternals` BURADA DA kullaniliyor — tesadufen degil: react-dom ve
 * react/jsx-runtime CJS'tir ve `require("react")` yazar. Duz `external: ["react"]`
 * ile esbuild bunu `__require`a cevirir ve tarayicida
 * "Dynamic require of react is not supported" firlatir. Yani bu satirlar ayni
 * zamanda plugin'in kendi dogrulamasidir.
 */
async function buildReactVendor({ installRoot, outDir, withUmd }) {
    fs.mkdirSync(outDir, { recursive: true });
    const require = createRequire(path.join(installRoot, "package.json"));

    /** Bir CJS modulunu, adlandirilmis export'lari korunarak ESM'e cevirir. */
    async function toEsm({ specifier, outfile, externals }) {
        const names = Object.keys(require(specifier)).filter(
            (key) => IDENTIFIER.test(key) && key !== "default"
        );
        const contents = [
            `import __m from ${JSON.stringify(specifier)};`,
            `export default __m;`,
            ...names.map((name) => `export const ${name} = __m.${name};`),
        ].join("\n");

        await esbuild.build({
            stdin: { contents, resolveDir: installRoot, loader: "js" },
            bundle: true,
            format: "esm",
            platform: "browser",
            target: "es2022",
            minify: true,
            outfile,
            define: { "process.env.NODE_ENV": '"production"' },
            plugins: externals.length
                ? [bareReactExternals({
                      resolveFrom: path.join(installRoot, "package.json"),
                      specifiers: externals,
                  })]
                : [],
        });
    }

    await toEsm({ specifier: "react", outfile: path.join(outDir, "react.mjs"), externals: [] });
    await toEsm({ specifier: "react/jsx-runtime", outfile: path.join(outDir, "jsx-runtime.mjs"), externals: ["react"] });
    await toEsm({ specifier: "react-dom", outfile: path.join(outDir, "react-dom.mjs"), externals: ["react"] });
    await toEsm({ specifier: "react-dom/client", outfile: path.join(outDir, "react-dom-client.mjs"), externals: ["react", "react-dom"] });

    if (withUmd) {
        // `require.resolve("react/umd/…")` KULLANILAMAZ: React'in `exports`
        // haritasi umd/ alt yolunu ilan etmiyor (ERR_PACKAGE_PATH_NOT_EXPORTED).
        // Paket kokunu package.json uzerinden bulup dosyaya dogrudan gidiyoruz.
        const umd = [
            ["react", "umd/react.production.min.js", "react.umd.js"],
            ["react-dom", "umd/react-dom.production.min.js", "react-dom.umd.js"],
        ];
        for (const [pkg, rel, name] of umd) {
            const root = path.dirname(require.resolve(`${pkg}/package.json`));
            fs.copyFileSync(path.join(root, rel), path.join(outDir, name));
        }
    }

    return require("react/package.json").version;
}

/** packages/moonui kokunden statik servis; /vendor → .verify-vendor. */
function serve() {
    const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css" };
    const server = http.createServer((req, res) => {
        let rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "");
        const file = rel.startsWith("vendor/")
            ? path.join(VENDOR, rel.slice("vendor/".length))
            : path.join(PACKAGE_ROOT, rel);
        if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
            res.writeHead(404).end("not found");
            return;
        }
        res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
        fs.createReadStream(file).pipe(res);
    });
    return new Promise((resolve) => {
        server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
    });
}

/** Tek senaryo: render + etkilesim + stil. */
async function runScenario(browser, baseUrl, scenario) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 1400 } });
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (msg) => {
        if (msg.type() === "error" || msg.type() === "warning") consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
    });
    page.on("pageerror", (err) => pageErrors.push(String(err.message ?? err)));

    const url = `${baseUrl}/scripts/cdn/fixture.html?mode=${scenario.mode}&react=${scenario.react}`;
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
    await page.waitForFunction(() => window.__moonuiDone === true, { timeout: 60_000 });

    const info = await page.evaluate(() => ({
        reactVersion: window.__reactVersionLoaded ?? null,
        exportCount: window.__moonuiExportCount ?? 0,
        mounted: window.__moonuiMounted === true,
        mountError: window.__moonuiMountError ?? null,
        boundaryFailures: window.__moonuiResults ?? {},
    }));

    // ── Render: yedi senaryonun her biri DOM'da mi, hicbiri ErrorBoundary'ye dusmus mu
    const CASES = ["Card+Button", "Switch", "Tooltip", "Accordion", "Dialog", "Select", "Tabs"];
    const rendered = {};
    for (const label of CASES) {
        rendered[label] = (await page.locator(`[data-case="${label}"]`).count()) === 1;
    }
    const crashed = await page.locator("[data-failed]").count();

    // ── Etkilesim: alti dogrudan kullanici eylemi
    //
    // Her adim `safe` ile sarili: bir etkilesim patlarsa guard CRASH ETMEZ,
    // "false" olarak RAPORLAR. Aksi halde ilk hata sonraki olcumleri gizler ve
    // rapor "hangi component kirik" sorusuna cevap veremez.
    const interactions = {};
    const interactionErrors = {};
    const safe = (name, fn) =>
        fn().then(
            (v) => v === true,
            (err) => {
                interactionErrors[name] = String(err?.message ?? err).split("\n")[0];
                return false;
            }
        );

    interactions.switchToggles = await safe("switchToggles", async () => {
        await page.locator('[data-testid="switch"]').click({ timeout: 10_000 });
        return (await page.locator('[data-testid="switch"]').getAttribute("data-state")) === "checked";
    });

    interactions.accordionOpens = await safe("accordionOpens", async () => {
        await page.locator('[data-testid="accordion-trigger"]').click({ timeout: 10_000 });
        return page.locator('[data-testid="accordion-content"]').isVisible();
    });

    interactions.dialogOpensAndCloses = await safe("dialogOpensAndCloses", async () => {
        await page.locator('[data-testid="dialog-trigger"]').click({ timeout: 10_000 });
        const dialog = page.locator('[role="dialog"]');
        await dialog.waitFor({ state: "visible", timeout: 5_000 });

        // ⚠️ "GORUNUR" ≠ "ESCAPE'I DUYUYOR" — bu dongu HARNESS TUZAGIDIR, urun bug'i degil.
        // Radix'in Escape dinleyicisi bir effect icinde baglanir. React 18'in
        // concurrent root'unda o effect boyamadan bir kare SONRA kosabiliyor;
        // goruntu gelir gelmez gonderilen tek Escape sessizce yutuluyor.
        // Olculdu (ayni bundle, ayni sayfa, TEK degisken bekleme suresi):
        //   React 18 → 0 ms: kapanmiyor · 100 / 300 / 800 ms: kapaniyor
        //   React 19 → 0 ms dahil hepsinde kapaniyor
        // Odaga bakmak AYIRT ETMIYOR: her iki surumde de odak t=0'da zaten
        // dialog'un icinde (olculdu). Bu yuzden sabit `waitForTimeout` yerine
        // "kapanana kadar tekrar dene" kullaniliyor: gercek bir kullanici da
        // ikinci kez basardi ve dinleyici hic baglanmazsa test yine DUSER.
        let dialogClosed = false;
        for (let attempt = 0; attempt < 20 && !dialogClosed; attempt++) {
            await dialog.press("Escape").catch(() => {});
            dialogClosed = await dialog
                .waitFor({ state: "detached", timeout: 250 })
                .then(() => true, () => false);
        }
        if (!dialogClosed) throw new Error("Dialog Escape ile kapanmadi (20 deneme)");
        // Overlay animasyonla cikar; kalirsa SONRAKI tiklamalari yutar
        // (olculdu: Select tiklamasi 30 sn timeout ile dustu).
        await page.locator("[data-aria-hidden]").waitFor({ state: "detached", timeout: 5_000 }).catch(() => {});
        return true;
    });

    interactions.selectPicks = await safe("selectPicks", async () => {
        await page.locator('[data-testid="select-trigger"]').click({ timeout: 10_000 });
        await page.locator('[role="listbox"]').waitFor({ state: "visible", timeout: 5_000 });
        await page.locator('[data-testid="select-item-a"]').click({ timeout: 10_000 });
        return (await page.locator('[data-testid="select-trigger"]').innerText()).includes("Option A");
    });

    interactions.tabsSwitch = await safe("tabsSwitch", async () => {
        await page.locator('[data-testid="tab-two"]').click({ timeout: 10_000 });
        return page.locator('[data-testid="tab-two-content"]').isVisible();
    });

    // Tooltip en sonda: hover birakildiginda icerik bir sure daha ekranda kalir
    // ve sonraki tiklamalarin isabetini bulandirir. Olcum degeri ayni, gurultu az.
    interactions.tooltipShows = await safe("tooltipShows", async () => {
        await page.locator('[data-testid="tooltip-trigger"]').hover({ timeout: 10_000 });
        await page.locator('[data-testid="tooltip-content"]').first().waitFor({ state: "visible", timeout: 5_000 });
        await page.mouse.move(0, 0);
        return true;
    });

    // ── Stil: CSS artefakti gercekten uygulanmis mi (JS calissa bile stilsiz olabilir)
    const style = await page.evaluate(() => {
        const btn = document.querySelector('[data-testid="btn"]');
        const cs = btn ? getComputedStyle(btn) : null;
        return {
            buttonBackground: cs ? cs.backgroundColor : null,
            buttonRadius: cs ? cs.borderRadius : null,
            primaryToken: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(),
        };
    });

    await page.close();

    const allRendered = CASES.every((label) => rendered[label]);
    const allInteractions = Object.values(interactions).every(Boolean);
    const styled = style.primaryToken.length > 0 && style.buttonBackground !== "rgba(0, 0, 0, 0)";

    return {
        ...scenario,
        pass:
            info.mounted &&
            crashed === 0 &&
            allRendered &&
            allInteractions &&
            styled &&
            pageErrors.length === 0 &&
            Object.keys(info.boundaryFailures).length === 0,
        info,
        rendered,
        crashed,
        interactions,
        interactionErrors,
        style,
        pageErrors,
        consoleErrors,
    };
}

// ─────────────────────────────────────────────────────────────────────────────

for (const file of ["moonui.global.js", "moonui.esm.js", "moonui.css"]) {
    if (!fs.existsSync(path.join(DIST_CDN, file))) {
        console.error(`HATA: dist/cdn/${file} yok — once "npm run build:cdn" calistirin.`);
        process.exit(1);
    }
}

fs.rmSync(VENDOR, { recursive: true, force: true });
const react18 = await buildReactVendor({
    installRoot: PACKAGE_ROOT,
    outDir: path.join(VENDOR, "react18"),
    withUmd: true,
});
const react19 = await buildReactVendor({
    installRoot: REPO_ROOT,
    outDir: path.join(VENDOR, "react19"),
    withUmd: false, // React 19 UMD yayimlamiyor — IIFE senaryosu bu yuzden yok
});
console.log(`vendor React hazir: 18 → ${react18} · 19 → ${react19}\n`);

const { server, port } = await serve();
const baseUrl = `http://127.0.0.1:${port}`;
const browser = await chromium.launch();

const SCENARIOS = [
    { id: "iife-r18", mode: "iife", react: "18" },
    { id: "esm-r18", mode: "esm", react: "18" },
    { id: "esm-r19", mode: "esm", react: "19" },
];

const results = [];
for (const scenario of SCENARIOS) {
    const result = await runScenario(browser, baseUrl, scenario);
    results.push(result);
    console.log(`${result.pass ? "PASS" : "FAIL"}  ${scenario.id}`);
    console.log(`   React ${result.info.reactVersion} · ${result.info.exportCount} export · coken ${result.crashed}`);
    console.log(`   render: ${Object.values(result.rendered).filter(Boolean).length}/7 · etkilesim: ${Object.values(result.interactions).filter(Boolean).length}/6`);
    console.log(`   stil: bg=${result.style.buttonBackground} radius=${result.style.buttonRadius} --primary="${result.style.primaryToken}"`);
    if (!result.pass) {
        console.log(`   rendered: ${JSON.stringify(result.rendered)}`);
        console.log(`   interactions: ${JSON.stringify(result.interactions)}`);
        console.log(`   interactionErrors: ${JSON.stringify(result.interactionErrors)}`);
        console.log(`   pageErrors: ${JSON.stringify(result.pageErrors)}`);
        console.log(`   boundary: ${JSON.stringify(result.info.boundaryFailures)}`);
    }
    if (result.consoleErrors.length) console.log(`   konsol: ${JSON.stringify(result.consoleErrors.slice(0, 5))}`);
    console.log("");
}

await browser.close();
server.close();

fs.writeFileSync(
    path.join(VENDOR, "..", "verify-cdn.result.json"),
    JSON.stringify(results, null, 2)
);

const failed = results.filter((r) => !r.pass);
if (failed.length) {
    console.error(`CDN GUARD BASARISIZ: ${failed.map((r) => r.id).join(", ")}`);
    process.exit(1);
}
console.log("CDN guard: tum senaryolar gecti.");
