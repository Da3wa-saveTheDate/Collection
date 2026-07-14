import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 667, isMobile: true });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to page...');
  try {
    const response = await page.goto('https://da3wa-savethedate.github.io/Collection/', { waitUntil: 'networkidle2' });
    console.log('Status code:', response.status());
    
    const content = await page.content();
    console.log('Body length:', content.length);
    
    // Check if root has children
    const hasChildren = await page.evaluate(() => document.getElementById('root')?.children.length > 0);
    console.log('Root has children:', hasChildren);
  } catch (e) {
    console.error('Error during goto:', e);
  }

  await browser.close();
})();
