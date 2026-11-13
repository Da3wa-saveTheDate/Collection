import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

// Run against a local production preview: node tests/gallery.mjs
// Set SHOTS=<folder> to also save screenshots of each step.
const origin = 'http://127.0.0.1:4173';
const shots = process.env.SHOTS;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const browser = await puppeteer.launch({ headless: true });
try {
  for (const mode of ['desktop', 'mobile']) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewport(mode === 'mobile' ? { width: 390, height: 844, isMobile: true, hasTouch: true } : { width: 1440, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', request => request.url().startsWith(origin) ? request.continue() : request.abort());
    await page.goto(origin, { waitUntil: 'networkidle0' });
    const snap = async name => { if (shots) await page.screenshot({ path: `${shots}/${mode}-${name}.png` }); };
    await snap('1-hero');

    // The page reads as one journey: how it works → designs → prices → the 3D story.
    assert.deepEqual(
      await page.$$eval('main > section[id]', sections => sections.map(section => section.id)),
      ['process', 'designs', 'pricing', 'experience'],
    );
    assert.equal(await page.$$eval('#process ol > li', steps => steps.length), 4);
    await page.$eval('#process', el => el.scrollIntoView());
    await snap('2-process');

    // One tab per invitation type, each showing its price; Premium is open first.
    await page.$eval('#designs', el => el.scrollIntoView());
    const tabs = await page.$$eval('#designs [role="tab"]', buttons => buttons.map(button => ({
      text: button.textContent, selected: button.getAttribute('aria-selected'),
    })));
    assert.equal(tabs.length, 6);
    assert.ok(tabs.every(tab => /EGP [\d,]+/.test(tab.text)), 'every tab shows a price');
    assert.deepEqual(tabs.filter(tab => tab.selected === 'true').map(tab => tab.text.replace(/EGP.*/, '')), ['Premium']);

    // Every design is a visible thumbnail — nothing depends on hovering.
    const premium = await page.$$eval('#designs-panel li button', cards => cards.length);
    assert.ok(premium >= 4);
    assert.equal(await page.$$eval('#designs-panel li img', images => images.every(image => image.getAttribute('src').includes('thumbs/'))), true);
    await wait(600);
    await snap('3-designs');

    // Switching type swaps the designs and the price.
    await page.click('#designs-tab-standard');
    const standard = await page.$$eval('#designs-panel li button', cards => cards.length);
    assert.notEqual(standard, premium);
    assert.match(await page.$eval('#designs-panel', el => el.textContent), /Standard Invitation/);

    // Opening a design shows it live with an order button that names it.
    assert.equal(await page.$eval('dialog.preview', dialog => dialog.open), false);
    const title = await page.$eval('#designs-panel li button .font-serif', el => el.textContent);
    await page.click('#designs-panel li button');
    await page.waitForFunction(() => document.querySelector('dialog.preview')?.open);
    assert.equal(await page.$eval('#preview-title', el => el.textContent), title);
    const order = decodeURIComponent(await page.$eval('.preview__order', link => link.href));
    assert.ok(order.startsWith('https://wa.me/'));
    assert.ok(order.includes(`Selected design: ${title}`) && order.includes('Standard Invitation'), 'order names the design and its type');
    const frame = await page.waitForSelector('dialog.preview iframe.is-loaded', { timeout: 20000 });
    assert.ok((await frame.evaluate(el => el.src)).endsWith('/'));
    // The phone stays fully inside the viewport, and the order button is reachable without scrolling.
    const viewport = page.viewport();
    for (const selector of ['.preview__phone', '.preview__order', '.preview__close']) {
      const box = await page.$eval(selector, el => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; });
      assert.ok(box.top >= 0 && box.left >= 0 && box.bottom <= viewport.height && box.right <= viewport.width, `${selector} must be on screen`);
    }
    await wait(1200);
    await snap('4-preview');

    // Next / previous stay within the same type; Back closes the preview instead of leaving the page.
    await page.click('.preview__steps button:last-child');
    assert.notEqual(await page.$eval('#preview-title', el => el.textContent), title);
    await page.goBack();
    await page.waitForFunction(() => !document.querySelector('dialog.preview').open);
    assert.equal(new URL(page.url()).origin, origin);
    // …and so does Escape.
    await page.click('#designs-panel li button');
    await page.waitForFunction(() => document.querySelector('dialog.preview').open);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog.preview').open);
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('preview-open')), false);

    // The price list has one row per type and leads back to that type's designs.
    await page.$eval('#pricing', el => el.scrollIntoView());
    await wait(400);
    await snap('5-pricing');
    assert.equal(await page.$$eval('#pricing ul > li', rows => rows.length), 7);
    await page.evaluate(() => [...document.querySelectorAll('#pricing a[href="#designs"]')].find(link => link.closest('li').textContent.includes('Video Invitation')).click());
    await wait(300);
    assert.equal(await page.$eval('#designs-tab-video', tab => tab.getAttribute('aria-selected')), 'true');
    assert.equal(await page.$$eval('#designs-panel li button', cards => cards.length), 3);
    // Video designs show a poster and only download the video when opened.
    assert.equal(await page.$('#designs-panel video'), null);
    await page.click('#designs-panel li button');
    await page.waitForSelector('dialog.preview video');
    await page.keyboard.press('Escape');

    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    console.log(`PASS ${mode}: journey order, type tabs, thumbnails, preview, ordering and price list`);
    await page.close();
  }
} finally { await browser.close(); }
