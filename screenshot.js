import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 600 });
  await page.goto('file:///C:/Users/khalifa/Desktop/Collection/Collection/public/maya-youssef-engagement/index.html', { waitUntil: 'load', timeout: 60000 });
  
  // Wait a couple of seconds for animations/fonts to load
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({ path: 'public/maya-youssef-engagement/images/hero.png' });
  await browser.close();
  console.log("Screenshot saved.");
})();
