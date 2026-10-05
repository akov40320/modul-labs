import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional verification tool. The application itself has no dependencies.
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const evidence = resolve(process.env.SMOKE_EVIDENCE_DIR || resolve(project, '../evidence'));
const logs = resolve(project, 'evidence');
await mkdir(evidence, { recursive: true }); await mkdir(logs, { recursive: true });
const moduleLocation = process.env.PLAYWRIGHT_MODULE_PATH;
const { chromium } = await import(moduleLocation ? pathToFileURL(moduleLocation).href : 'playwright');
const port = Number(process.env.SMOKE_PORT || 4174);
const baseURL = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [resolve(project, 'scripts/serve.mjs'), '--root', 'dist', '--port', String(port)], { cwd: project, stdio: ['ignore', 'pipe', 'pipe'] });
let serverLog = ''; server.stdout.on('data', (data) => { serverLog += data; }); server.stderr.on('data', (data) => { serverLog += data; });
const checks = []; const runtimeErrors = []; const failedRequests = []; const externalRequests = [];
const startedAt = new Date().toISOString();
let browser; let failure;
async function check(name, run) {
  try { const details = await run(); checks.push({ name, status: 'passed', ...(details === undefined ? {} : { details }) }); process.stdout.write(`PASS ${name}\n`); }
  catch (error) { checks.push({ name, status: 'failed', error: error.message }); throw error; }
}
try {
  for (let attempt = 0; ; attempt += 1) {
    try { if ((await fetch(baseURL)).ok) break; } catch { /* Server may still be starting. */ }
    if (attempt >= 60) throw new Error(`Local server did not start: ${serverLog}`);
    await new Promise((done) => setTimeout(done, 100));
  }
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on('request', (request) => { if (!request.url().startsWith(baseURL) && !/^(data:|blob:)/.test(request.url())) externalRequests.push(request.url()); });
  const badResponses = [];
  page.on('response', (response) => { if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() }); });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await check('initial catalog and hero illustration', async () => {
    assert.equal(await page.locator('.product-card').count(), 6);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.hero-art img').evaluate((image) => image.complete && image.naturalWidth > 0), true);
    await page.screenshot({ path: resolve(evidence, 'app-desktop.png') });
    return { viewport: '1440×1000', catalogItems: 6 };
  });
  await check('category, search, budget, reset and sorting', async () => {
    await page.locator('[data-category="education"]').click();
    assert.equal(await page.locator('.product-card').count(), 2);
    await page.locator('#search').fill('ИНЖЕНЕР');
    assert.equal(await page.locator('.product-card').count(), 1);
    assert.equal(await page.locator('.product-card h3').textContent(), 'Юный инженер');
    await page.locator('#max-price').selectOption('2500');
    assert.equal(await page.locator('.product-card').count(), 0);
    assert.match(await page.locator('#catalog-grid').textContent(), /Подходящих наборов пока нет/);
    await page.locator('#reset-filters').click();
    assert.equal(await page.locator('.product-card').count(), 6);
    await page.locator('#sort').selectOption('price-asc');
    assert.equal(await page.locator('.product-card h3').first().textContent(), 'Маленький мир');
    await page.locator('#reset-filters').click();
  });
  await check('product details dialog and selection', async () => {
    await page.locator('.product-card').first().getByRole('button', { name: 'Подробнее' }).click();
    assert.equal(await page.locator('#product-dialog').evaluate((dialog) => dialog.open), true);
    await page.locator('#dialog-content').getByRole('button', { name: 'Выбрать набор' }).click();
    assert.equal(await page.locator('#lead-product').inputValue(), 'school-start');
    assert.equal(await page.locator('#product-dialog').evaluate((dialog) => dialog.open), false);
  });
  await check('invalid form is blocked with accessible field errors', async () => {
    await page.locator('#lead-quantity').fill('9');
    await page.locator('#lead-form button[type="submit"]').click();
    assert.equal(await page.locator('#lead-count').textContent(), '0');
    assert.equal(await page.locator('#lead-form [aria-invalid="true"]').count(), 5);
    assert.match(await page.locator('[data-error="quantity"]').textContent(), /Минимум 10/);
    assert.match(await page.locator('#lead-status').textContent(), /Проверьте/);
  });
  await check('valid lead, discount calculation and local persistence', async () => {
    await page.locator('#lead-form [name="name"]').fill('Тестовый клиент');
    await page.locator('#lead-form [name="company"]').fill('Учебная компания');
    await page.locator('#lead-form [name="email"]').fill('demo@example.com');
    await page.locator('#lead-quantity').fill('100');
    await page.locator('#lead-form [name="message"]').fill('Вымышленные данные для проверки локального MVP.');
    await page.locator('#lead-form [name="consent"]').check();
    assert.equal(await page.locator('#lead-form [aria-invalid="true"]').count(), 0);
    assert.equal(await page.locator('#lead-status').textContent(), '');
    assert.match(await page.locator('#quote-box').textContent(), /224\s100/);
    assert.match(await page.locator('#quote-box').textContent(), /скидка 10%/);
    await page.locator('#request').screenshot({ path: resolve(evidence, 'app-form.png') });
    await page.locator('#lead-form button[type="submit"]').click();
    assert.match(await page.locator('#lead-status').textContent(), /сохранена в этом браузере/);
    assert.equal(await page.locator('#lead-count').textContent(), '1');
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('#lead-count').textContent(), '1');
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('modul.leads.v1')));
    assert.equal(stored.length, 1); assert.equal(stored[0].total, 224100); assert.equal(stored[0].quantity, 100);
    return { savedLeads: stored.length, totalRubles: stored[0].total };
  });
  await check('catalog editor updates price and survives reload', async () => {
    await page.locator('#show-editor').click();
    await page.locator('.editor-item').first().getByRole('button', { name: 'Изменить', exact: true }).click();
    await page.locator('#product-form [name="price"]').fill('3000');
    await page.locator('#product-form [type="submit"]').click();
    assert.match(await page.locator('#product-status').textContent(), /сохранён/);
    await page.reload({ waitUntil: 'networkidle' });
    assert.match(await page.locator('.product-card .product-specs').first().textContent(), /3\s000/);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('modul.catalog.v1'))[0].price), 3000);
  });
  await check('JSON export contains saved lead', async () => {
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#export-leads').click();
    const download = await downloadPromise;
    const stream = await download.createReadStream(); const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    assert.equal(payload.leads[0].total, 224100);
    assert.match(download.suggestedFilename(), /^modul-demo-leads-.*\.json$/);
  });
  await check('mobile navigation and no horizontal overflow at 390 and 320 px', async () => {
    const widths = [];
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.locator('#show-editor').click();
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      assert.ok(dimensions.document <= dimensions.viewport, `Overflow at ${width}: ${JSON.stringify(dimensions)}`);
      widths.push(dimensions);
    }
    await page.locator('#menu-toggle').click();
    assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('#main-nav a[href="#catalog"]').click();
    assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'false');
    return widths;
  });
  await check('delete lead and restore initial catalog', async () => {
    await page.locator('#show-leads').click();
    await page.getByRole('button', { name: 'Удалить заявку', exact: true }).click();
    assert.equal(await page.locator('#lead-count').textContent(), '0');
    await page.locator('#show-editor').click(); await page.locator('#reset-catalog').click();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('modul.catalog.v1'))[0].price), 2490);
  });
  await check('all SVG assets load and no runtime or network errors', async () => {
    for (const asset of ['favicon.svg', 'hero.svg', 'blocks-blue.svg', 'blocks-red.svg', 'blocks-yellow.svg']) {
      const response = await fetch(`${baseURL}/assets/${asset}`);
      assert.equal(response.status, 200); assert.match(response.headers.get('content-type'), /image\/svg\+xml/);
      assert.match(await response.text(), /<svg/);
    }
    assert.deepEqual(runtimeErrors, []); assert.deepEqual(failedRequests, []); assert.deepEqual(externalRequests, []); assert.deepEqual(badResponses, []);
    return { runtimeErrors, failedRequests, externalRequests, badResponses };
  });
} catch (error) { failure = error; process.stderr.write(`${error.stack}\n`); }
finally {
  if (browser) await browser.close();
  server.kill();
  await writeFile(resolve(logs, 'browser-server.log'), serverLog);
  const result = { startedAt, finishedAt: new Date().toISOString(), baseURL, engine: 'Chromium / Microsoft Edge', source: 'local built dist', status: failure ? 'failed' : 'passed', checks, ...(failure ? { failure: failure.message } : {}) };
  await writeFile(resolve(evidence, 'browser-checks.json'), JSON.stringify(result, null, 2) + '\n');
  await writeFile(resolve(logs, 'browser-smoke.log'), checks.map((entry) => `${entry.status.toUpperCase()} ${entry.name}${entry.error ? ': ' + entry.error : ''}`).join('\n') + '\n');
}
if (failure) process.exitCode = 1;
