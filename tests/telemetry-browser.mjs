import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { build } from 'vite';
import puppeteer from 'puppeteer';

// Test-only build instrumentation; these hooks are never included by npm run build.
const output = await mkdtemp(path.join(tmpdir(), 'ajwaa-telemetry-test-'));
await build({
  build: { outDir: output, copyPublicDir: false },
  define: Object.fromEntries(Object.entries({
    VITE_TELEMETRY_ENABLED: 'true', VITE_TELEMETRY_ALLOWED_HOSTS: '127.0.0.1',
    VITE_POSTHOG_PROJECT_TOKEN: 'test-project', VITE_POSTHOG_HOST: 'https://eu.i.posthog.com',
    VITE_SENTRY_DSN: 'https://public@example.ingest.sentry.io/1',
    VITE_SENTRY_TRACES_SAMPLE_RATE: '1', VITE_PERFORMANCE_SAMPLE_RATE: '1',
  }).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)])),
  plugins: [{ name: 'test-capture', enforce: 'pre', transform(code, id) {
    if (id.replaceAll('\\', '/').endsWith('/src/App.tsx')) {
      return "import { useState as useTestState } from 'react';\n" + code.replace('function App() {',
        'function App() { const [failed, fail] = useTestState(false); window.__testFailRender = () => fail(true); if (failed) throw new Error("Controlled render failure");');
    }
    if (!id.replaceAll('\\', '/').endsWith('/src/lib/telemetry.ts')) return;
    return code.replaceAll('return event;', 'window.__telemetryEvents.push(JSON.parse(JSON.stringify(event))); return event;').replaceAll('} catch {', '} catch (error) { console.error("Telemetry test failure", error);')
      + '\nwindow.__testError = () => Sentry.captureException(new Error("private@example.com"));';
  } }],
});

const server = http.createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = path.resolve(output, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(output + path.sep)) { res.writeHead(403).end(); return; }
    const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[path.extname(file)];
    res.setHeader('Content-Type', type || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await puppeteer.launch({ headless: true });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36');
    page.on('pageerror', (error) => console.error('Browser error:', error.message));
    page.on('console', (message) => { if (!message.text().includes('Failed to load resource')) console.log('Browser:', message.text()); });
    await page.setViewport(viewport);
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      // No test data reaches PostHog, Sentry, Meta, or any other third party.
      const url = request.url();
      if (url === origin + '/' || url.startsWith(origin + '/?') || url.startsWith(origin + '/assets/')) request.continue();
      else request.abort();
    });
    await page.evaluateOnNewDocument(() => {
      // Exercise human-visitor events rather than PostHog's automation filter.
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      window.__telemetryEvents = [];
      document.addEventListener('click', (event) => {
        if (event.target.closest('a[target="_blank"]')) event.preventDefault();
      }, true);
    });
    await page.goto(`${origin}/?name=private@example.com`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.__telemetryEvents.some((event) => event.event === '$pageview'));
    await page.$eval('#pricing', (element) => element.scrollIntoView());
    await page.waitForFunction(() => window.__telemetryEvents.some((event) => event.event === 'pricing_viewed'));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.$eval('#pricing', (element) => element.scrollIntoView());
    await page.$eval('#pricing a[href^="https://wa.me"]', (element) => element.click());
    await page.$eval('#designs a[target="_blank"]:not([href^="https://wa.me"])', (element) => element.click());
    await page.evaluate(() => window.__testError());
    await page.waitForFunction(() => window.__telemetryEvents.some((event) => event.exception));
    const events = await page.evaluate(() => window.__telemetryEvents);
    for (const name of ['$pageview', 'pricing_viewed', 'whatsapp_clicked', 'template_opened']) {
      assert.equal(events.filter((event) => event.event === name).length, 1, `${viewport.width}: ${name} should fire once`);
    }
    const click = events.find((event) => event.event === 'whatsapp_clicked');
    assert.equal(click.properties.location, 'pricing');
    assert.equal(click.properties.package, 'standard');
    const privatePaths = [];
    function findPrivate(value, path = '') {
      if (typeof value === 'string' && value.includes('private@example.com')) privatePaths.push(path);
      else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) findPrivate(child, `${path}.${key}`);
    }
    findPrivate(events);
    assert.deepEqual(privatePaths, [], 'Sensitive fields reached a telemetry hook');
    assert.equal(await page.$$eval('#pricing a[href^="https://wa.me"]', (links) => links.length > 0), true);
    await page.click('[data-support-widget] > button');
    await page.waitForSelector('#ajwaa-support');
    await page.click('button[aria-controls="support-delivery"]');
    assert.match(await page.$eval('#support-delivery', (el) => el.textContent), /72 hours/);
    assert.equal(await page.$eval('#ajwaa-support a[target="_blank"]', (el) => new URL(el.href).pathname), '/201042353785');
    await page.$eval('#ajwaa-support a[target="_blank"]', (el) => el.click());
    const supportEvents = await page.evaluate(() => window.__telemetryEvents);
    assert.equal(supportEvents.filter((e) => e.event === 'support_opened').length, 1);
    assert.equal(supportEvents.find((e) => e.event === 'support_answer_viewed').properties.topic, 'delivery');
    assert.equal(supportEvents.filter((e) => e.event === 'whatsapp_clicked' && e.properties.location === 'support').length, 1);
    assert.equal(await page.$eval('[data-support-widget]', (el) => el.getBoundingClientRect().right <= innerWidth), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.$('#ajwaa-support'), null);
    assert.equal(await page.$eval('[data-support-widget] > button', (el) => el === document.activeElement), true);
    await page.evaluate(() => window.__testFailRender());
    await page.waitForFunction(() => document.body.innerText.includes('We couldn’t load the collection'));
    assert.equal(await page.$eval('main a', (element) => element.href), 'https://wa.me/201042353785');
    console.log(`PASS: ${viewport.width}px page/pricing/template/order events, Sentry capture, privacy, and usable order links`);
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
