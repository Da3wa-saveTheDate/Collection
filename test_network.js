import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText, request.response()?.status());
  });

  await page.goto('https://da3wa-savethedate.github.io/Collection/new_prem3/index.html', { waitUntil: 'networkidle2' });
  
  await browser.close();
})();
