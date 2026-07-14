import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure() ? request.failure().errorText : '');
  });

  console.log('Navigating to page...');
  try {
    const response = await page.goto('https://da3wa-savethedate.github.io/Collection/new_prem3/index.html', { waitUntil: 'networkidle2' });
    console.log('Status code:', response.status());
  } catch (e) {
    console.error('Error during goto:', e);
  }

  await browser.close();
})();
