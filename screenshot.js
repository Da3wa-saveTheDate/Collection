import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 600 });
  await page.goto('file:///C:/Users/khalifa/Desktop/Collection/Collection/public/zeyad-lara-wedd/index.html', { waitUntil: 'load', timeout: 60000 });
  
  // Wait for fonts and animations to load
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({ path: 'public/zeyad-lara-wedd/images/hero.png' });
  await browser.close();
  console.log("Screenshot saved.");
})();
