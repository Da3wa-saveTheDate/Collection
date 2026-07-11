import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 600 });
  await page.goto('file:///C:/Users/khalifa/Desktop/Collection/Collection/public/elisa-jhon-wedding/index.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'public/elisa-jhon-wedding/images/hero.png' });
  await browser.close();
  console.log("Screenshot saved.");
})();
