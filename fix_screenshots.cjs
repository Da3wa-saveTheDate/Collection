const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const dirs = ['new_prem3', 'new_prem4', 'new_prem5', 'new_prem6', 'new_prem7'];

const server = http.createServer((req, res) => {
  let filePath = './public' + req.url.replace('/Collection', '');
  if (req.url.endsWith('/')) {
    filePath += 'index.html';
  }
  
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
  }
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(8082, async () => {
  const browser = await puppeteer.launch({ headless: true });
  
  for (const dir of dirs) {
    console.log(`Processing ${dir}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 480, height: 600 });
    
    await page.goto(`http://localhost:8082/Collection/${dir}/`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000)); // wait for animations/fonts
    
    const pngPath = path.join('public', dir, 'images', 'hero.png');
    const webpPath = path.join('public', dir, 'images', 'hero.webp');
    
    await page.screenshot({ path: pngPath });
    
    await sharp(pngPath).webp({ quality: 80 }).toFile(webpPath);
    console.log(`Saved screenshot and webp for ${dir}`);
    
    await page.close();
  }
  
  await browser.close();
  server.close();
});
