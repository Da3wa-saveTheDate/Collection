import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    await page.goto('https://da3wa-savethedate.github.io/Collection/new_prem2/', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: 'public/new_prem2/test_screenshot.png' });
    console.log("Screenshot saved.");
  } catch (err) {
    console.error("GOTO ERROR:", err);
  }
  
  await browser.close();
})();
