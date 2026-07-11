import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 480, height: 600 });
    const path = `file:///C:/Users/khalifa/Desktop/Collection/Collection/public/invitation-complete/index.html`;
    await page.goto(path, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `C:/Users/khalifa/Desktop/Collection/Collection/public/invitation-complete/images/hero.png` });
    console.log(`Saved screenshot for invitation-complete`);
  } catch (e) {
    console.error(`Error:`, e);
  }
  await browser.close();
})();
