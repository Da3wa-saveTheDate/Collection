import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 600 });
  await page.goto('file:///C:/Users/khalifa/Desktop/Collection/Collection/public/new_prem2/index.html', { waitUntil: 'load', timeout: 60000 });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({ path: 'public/new_prem2/images/hero.png' });
  await browser.close();
  console.log("Screenshot saved.");
})();
