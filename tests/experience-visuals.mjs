import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

// Run against a local production preview: node tests/experience-visuals.mjs
const origin = 'http://127.0.0.1:4173';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Average brightness (0–255) of a small square of the rendered page. */
async function brightnessAt(page, x, y) {
  const clip = { x: Math.round(x) - 4, y: Math.round(y) - 4, width: 8, height: 8 };
  const { data } = await sharp(await page.screenshot({ clip })).raw().toBuffer({ resolveWithObject: true });
  let total = 0;
  for (let i = 0; i < data.length; i += 4) total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  return total / (data.length / 4);
}

/** Scroll so the featured slot's centre sits in the middle of the viewport. */
async function scrollToSlot(page) {
  await page.evaluate(() => {
    const rect = document.querySelector('[data-xp-slot]').getBoundingClientRect();
    scrollTo(0, scrollY + rect.top + rect.height / 2 - innerHeight / 2);
  });
  await wait(2800); // scrub: 1 needs a moment to catch up
  return page.$eval('[data-xp-slot]', el => {
    const r = el.getBoundingClientRect();
    // 67% down the names page is plain paper, between the date and the countdown.
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.67 };
  });
}

const browser = await puppeteer.launch({ headless: true, args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
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
        return type === 'webgl' || type === 'webgl2' ? null : original.call(this, type, ...args);
      };
    });
    await page.goto(origin, { waitUntil: 'networkidle0' });

    // three.js must not load until the story is near.
    assert.equal(await page.evaluate(() => performance.getEntriesByType('resource').some(r => r.name.includes('InvitationScene'))), false);

    await page.$eval('#experience', el => el.scrollIntoView());
    const hrefs = await page.$$eval('.xp__reserve', links => links.map(link => link.href));
    assert.equal(hrefs.length, 3);
    assert.ok(hrefs.every(href => href.startsWith('https://wa.me/')));
    assert.ok(decodeURIComponent(hrefs[1]).includes('Premium Invitation'));

    if (mode === 'no-webgl') {
      await wait(500);
      assert.equal(await page.$eval('#experience', el => el.dataset['3d']), 'off');
      assert.equal(await page.$('.xp__canvas canvas'), null);
      assert.equal(await page.$eval('.xp__poster', el => getComputedStyle(el).display), 'block');
      assert.equal(await page.$eval('.xp__slot img', el => getComputedStyle(el).display), 'block');
    } else {
      await page.waitForFunction(() => document.querySelector('#experience')?.dataset.ready === 'true', { timeout: 20000 });
      assert.ok(await page.$('.xp__canvas canvas'));
      // The rendered phone (cream invitation page) must end up inside the featured slot.
      const point = await scrollToSlot(page);
      const inside = await brightnessAt(page, point.x, point.y);
      assert.ok(inside > 150, `expected the docked phone inside the slot, got brightness ${inside.toFixed(0)}`);
      // …and scrolling back up must undock it, returning the phone to the centre of the screen.
      await page.$eval('[data-xp-section="process"]', el => el.scrollIntoView({ block: 'center' }));
      await wait(2800);
      const viewport = page.viewport();
      const centre = await brightnessAt(page, viewport.width / 2, viewport.height / 2 + 30);
      assert.ok(centre > 150, `expected the phone back in the centre, got brightness ${centre.toFixed(0)}`);
    }

    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    console.log(`PASS ${mode}: lazy loading, order links, dock and fallbacks`);
    await page.close();
  }
} finally { await browser.close(); }
