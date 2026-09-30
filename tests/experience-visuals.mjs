import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

// Run against a local production preview: node tests/experience-visuals.mjs
const origin = 'http://127.0.0.1:4173';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Average brightness (0–255) of a small square of the viewport. */
async function brightnessAt(page, x, y) {
  const data = await shot(page, { x: x - 4, y: y - 4, width: 8, height: 8 });
  let total = 0;
  for (let i = 0; i < data.length; i += 4) total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  return total / (data.length / 4);
}

/**
 * Raw RGBA pixels of a viewport region. Crops a viewport screenshot rather than using
 * puppeteer's `clip`, which is document-relative and would sample the wrong place.
 */
async function shot(page, region) {
  const box = { left: Math.round(region.x), top: Math.round(region.y), width: Math.round(region.width), height: Math.round(region.height) };
  return sharp(await page.screenshot()).extract(box).ensureAlpha().raw().toBuffer();
}

/** Mean absolute channel difference (0–255) between two equal-sized shots. */
function difference(a, b) {
  let total = 0;
  for (let i = 0; i < a.length; i++) total += Math.abs(a[i] - b[i]);
  return total / a.length;
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
    const hrefs = await page.$$eval('.xp__package .xp__reserve', links => links.map(link => link.href));
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
      assert.ok(['high', 'medium', 'low'].includes(await page.$eval('#experience', el => el.dataset.quality)));

      if (mode !== 'mobile') {
        // Hovering the phone is detected by raycasting; tapping the seal opens the envelope.
        await page.$eval('[data-xp-section="hero"]', el => el.scrollIntoView());
        await wait(2500);
        const { width, height } = page.viewport();
        const region = { x: width / 2 - 90, y: height / 2 - 160, width: 180, height: 320 };
        await page.mouse.move(width / 2, height / 2);
        await wait(300);
        assert.equal(await page.$eval('.xp__canvas canvas', el => el.style.cursor), 'grab');
        const sealed = await shot(page, region);
        await page.mouse.down();
        await page.mouse.up();
        await wait(2800);
        const opened = await shot(page, region);
        assert.ok(difference(sealed, opened) > 10, 'tapping the seal should open the envelope onto the names page');
        if (mode === 'desktop') {
          // Dragging turns the phone; releasing springs it back to its pose.
          await page.mouse.down();
          await page.mouse.move(width / 2 + 220, height / 2, { steps: 10 });
          const turned = await shot(page, region);
          await page.mouse.up();
          await wait(3000);
          const settled = await shot(page, region);
          const moved = difference(opened, turned);
          assert.ok(moved > 10, 'dragging should turn the phone');
          assert.ok(difference(opened, settled) < moved / 2, 'the phone should spring back after release');
        }
      }
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

    // Personalisation: typed names, date and design flow into the phone and the WhatsApp messages.
    await page.$eval('[data-xp-section="personalise"]', el => el.scrollIntoView({ block: 'center' }));
    await wait(2500);
    const { width: vw, height: vh } = page.viewport();
    const phoneRegion = { x: vw / 2 - 80, y: vh / 2 - 140, width: 160, height: 280 };
    const sample = mode === 'no-webgl' ? null : await shot(page, phoneRegion);
    await page.type('input[name="first"]', 'Nour');
    await page.type('input[name="second"]', 'Karim');
    await page.$eval('input[name="date"]', el => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, '2027-05-20');
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.click('.xp__swatch input[value="papercraft"]');
    const cta = decodeURIComponent(await page.$eval('.xp__form .xp__reserve', link => link.href));
    assert.ok(cta.includes('Selected design: Papercraft') && cta.includes('Premium Invitation'), 'CTA names the chosen design');
    assert.ok(cta.includes('Names to include: Nour & Karim'), 'CTA carries the names');
    assert.ok(cta.includes('20 May 2027'), 'CTA carries the date');
    const [simple, premium] = (await page.$$eval('.xp__package .xp__reserve', links => links.map(link => link.href))).map(decodeURIComponent);
    assert.ok(premium.includes('Selected design: Papercraft') && premium.includes('Nour & Karim'));
    assert.ok(simple.includes('Nour & Karim') && !simple.includes('Papercraft'));
    if (mode === 'no-webgl') {
      assert.ok((await page.$eval('.xp__slot img', img => img.src)).includes('experience/papercraft.webp'));
    } else {
      await wait(1500);
      assert.ok(difference(sample, await shot(page, phoneRegion)) > 8, 'the phone screen should redraw with the new names and design');
    }

    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    console.log(`PASS ${mode}: lazy loading, dock, interactions, personalisation and fallbacks`);
    await page.close();
  }
} finally { await browser.close(); }
