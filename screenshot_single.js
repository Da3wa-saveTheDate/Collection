import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 480, height: 600 });
    const path = `file:///C:/Users/khalifa/Desktop/Collection/Collection/public/new_prem7/index.html`;
    await page.goto(path, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `C:/Users/khalifa/Desktop/Collection/Collection/public/new_prem7/images/hero.png` });
    console.log(`Saved screenshot for new_prem7`);
  } catch (e) {
    console.error(`Error:`, e);
  }
  await browser.close();
})();
