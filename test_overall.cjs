const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const port = 8083;
const server = http.createServer((req, res) => {
  let filePath = './dist' + req.url.replace('/Collection', '');
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  
  if (!fs.existsSync(filePath)) {
    // React Router fallback for the homepage (though not needed for sub-templates usually)
    if (req.url.startsWith('/Collection/') && !req.url.includes('.')) {
        filePath = './dist/index.html';
    } else {
        res.writeHead(404);
        res.end('Not found');
        return;
    }
  }
  
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.webp': contentType = 'image/webp'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpeg'; break;
    case '.svg': contentType = 'image/svg+xml'; break;
  }
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}/Collection/`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[Console Error on ${page.url()}]: ${msg.text()}`);
    }
  });
  
  page.on('pageerror', err => {
    errors.push(`[Page Error on ${page.url()}]: ${err.toString()}`);
  });
  
  page.on('requestfailed', request => {
    errors.push(`[Network Error on ${page.url()}]: Failed to load ${request.url()} - ${request.failure()?.errorText}`);
  });

  console.log('Visiting Homepage...');
  await page.goto(`http://localhost:${port}/Collection/`, { waitUntil: 'networkidle0' });
  
  // Extract all template links
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors.map(a => a.href).filter(href => href.includes('/Collection/'));
  });
  
  // Dedup links
  const uniqueLinks = [...new Set(links)];
  console.log(`Found ${uniqueLinks.length} links to test.`);
  
  for (const link of uniqueLinks) {
    if (link === `http://localhost:${port}/Collection/`) continue; // skip self
    
    console.log(`Testing: ${link}`);
    try {
      const response = await page.goto(link, { waitUntil: 'networkidle2', timeout: 10000 });
      if (!response.ok()) {
        errors.push(`[HTTP Error]: ${link} returned ${response.status()}`);
      }
      
      // Check if it's a blank screen (empty root)
      const rootHtml = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root ? root.innerHTML.length : -1;
      });
      
      if (rootHtml === 0 || rootHtml < 500) {
        errors.push(`[Blank Screen Warning]: ${link} has #root length ${rootHtml}`);
      }
    } catch (e) {
      errors.push(`[Navigation Error]: Failed to navigate to ${link} - ${e.message}`);
    }
  }
  
  console.log('\n--- TEST RESULTS ---');
  if (errors.length === 0) {
    console.log('ALL TESTS PASSED! No errors found.');
  } else {
    console.log(`Found ${errors.length} issues:`);
    errors.forEach(err => console.log(err));
  }
  
  await browser.close();
  server.close();
});
