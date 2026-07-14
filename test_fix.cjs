const fs = require('fs');
const http = require('http');
const path = require('path');
const puppeteer = require('puppeteer');

// Patch index.html
let html = fs.readFileSync('public/new_prem3/index.html', 'utf8');
if (!html.includes('replaceState')) {
  html = html.replace('<head>', '<head><base href="/Collection/new_prem3/"><script>window.history.replaceState(null, "", "/");</script>');
  fs.writeFileSync('public/new_prem3/index.html', html);
}

const server = http.createServer((req, res) => {
  let filePath = './public' + req.url.replace('/Collection', '');
  if (req.url === '/') {
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

server.listen(8080, async () => {
  console.log('Server running at http://localhost:8080/');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  // Navigate to root (which is rewritten to /Collection/new_prem3/index.html locally by our server if we hit /)
  // Actually let's navigate to /Collection/new_prem3/index.html
  await page.goto('http://localhost:8080/Collection/new_prem3/index.html', { waitUntil: 'networkidle2' });
  
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML);
  console.log('Root HTML length:', rootHtml?.length);
  console.log(rootHtml?.substring(0, 200));
  
  await browser.close();
  server.close();
});
