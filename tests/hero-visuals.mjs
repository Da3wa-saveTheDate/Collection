import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

// Run against a local production preview: node tests/hero-visuals.mjs
const origin = 'http://127.0.0.1:4173';
const browser = await puppeteer.launch({ headless: true, args: ['--enable-unsafe-swiftshader'] });
try {
  for (const mode of ['desktop', 'mobile', 'reduced-motion', 'no-webgl']) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewport(mode === 'mobile' ? { width: 390, height: 844, isMobile: true, hasTouch: true } : { width: 1440, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', request => request.url().startsWith(origin) ? request.continue() : request.abort());
    if (mode === 'reduced-motion') await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    if (mode === 'no-webgl') await page.evaluateOnNewDocument(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        return type === 'webgl' ? null : original.call(this, type, ...args);
      };
    });
    await page.goto(origin, { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('.invitation-stage__card--front', el => el.getAttribute('href')), '#designs');
    assert.equal(await page.$$eval('.invitation-stage img', images => images.every(img => img.complete && img.naturalWidth > 0)), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (mode === 'desktop') {
      await page.waitForFunction(() => document.querySelector('.invitation-ribbons')?.style.opacity === '1');
      await page.mouse.move(1100, 350);
      assert.notEqual(await page.$eval('.invitation-stage', el => el.style.getPropertyValue('--tilt-y')), '');
      // Runtime preference change must remove the GPU effect as well.
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.waitForFunction(() => !document.querySelector('.invitation-ribbons'));
    } else if (mode === 'no-webgl') {
      assert.equal(await page.$eval('.invitation-ribbons', el => el.style.opacity), '');
      assert.equal(await page.$('h1') !== null, true);
    } else {
      assert.equal(await page.$('.invitation-ribbons'), null);
      assert.equal(await page.evaluate(() => performance.getEntriesByType('resource').some(r => r.name.includes('RibbonFieldBackground'))), false);
    }
    assert.deepEqual(errors, []);
    console.log(`PASS ${mode}: imagery, layout, collection link, and motion fallback`);
    await page.close();
  }
} finally { await browser.close(); }
