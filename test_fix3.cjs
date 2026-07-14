const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const server = http.createServer((req, res) => {
  let filePath = './public' + req.url.replace('/Collection', '');
  if (req.url === '/Collection/new_prem3/') {
    filePath = './public/new_prem3/index.html';
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

server.listen(8081, async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8081/Collection/new_prem3/', { waitUntil: 'networkidle2' });
  
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML);
  console.log('Root HTML length:', rootHtml?.length);
  
  await browser.close();
  server.close();
});
