import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to page...');
  try {
    await page.goto('https://da3wa-savethedate.github.io/Collection/new_prem3/index.html', { waitUntil: 'domcontentloaded' });
  } catch (e) {
    console.error('Error during goto:', e);
  }

  // Wait a bit just in case
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot saved to screenshot.png');

  // get the content length
  const content = await page.content();
  console.log('Body length:', content.length);

  await browser.close();
})();
