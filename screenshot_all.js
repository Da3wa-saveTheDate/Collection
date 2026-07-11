import puppeteer from 'puppeteer';

const templates = [
  'invitation-complete',
  'new_prem3',
  'new_prem4',
  'new_prem5',
  'new_prem6',
  'new_prem7',
  'new_prem8'
];

(async () => {
  const browser = await puppeteer.launch();
  for (const template of templates) {
    console.log(`Processing ${template}...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 480, height: 600 });
      const path = `file:///C:/Users/khalifa/Desktop/Collection/Collection/public/${template}/index.html`;
      await page.goto(path, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1000)); // Wait an extra second for animations
      await page.screenshot({ path: `C:/Users/khalifa/Desktop/Collection/Collection/public/${template}/images/hero.png` });
      console.log(`Saved screenshot for ${template}`);
      await page.close();
    } catch (e) {
      console.error(`Error on ${template}:`, e);
    }
  }
  await browser.clo