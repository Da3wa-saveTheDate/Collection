import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 667, isMobile: true });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to page...');
  await page.goto('https://da3wa-savethedate.github.io/Collection/', { waitUntil: 'networkidle2' });
  
  console.log('Page loaded. Checking for elements...');
  
  // Try to find the hero section or showcase
  const heroExists = await page.evaluate(() => !!document.querySelector('#designs'));
  console.log('Designs section exists:', heroExists);

  await browser.close();
})();
