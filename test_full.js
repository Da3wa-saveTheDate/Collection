import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://da3wa-savethedate.github.io/Collection/new_prem3/index.html', { waitUntil: 'networkidle2' });
  
  const rootHtml = await page.evaluate(() => document.documentElement.outerHTML);
  console.log(rootHtml.substring(0, 1000));
  console.log('---');
  console.log(rootHtml.substring(rootHtml.length - 1000));
  
  await browser.close();
})();
