const fs = require('fs');
const path = require('path');

const showcasePath = path.join(__dirname, 'src', 'components', 'sections', 'Showcase.tsx');
const content = fs.readFileSync(showcasePath, 'utf8');

const regex = /image:\s*'([^']+)'/g;
let match;
const missing = [];
const existing = [];

while ((match = regex.exec(content)) !== null) {
  const imagePath = match[1];
  const fullPath = path.join(__dirname, 'public', imagePath);
  if (!fs.existsSync(fullPath)) {
    missing.push(imagePath);
  } else {
    existing.push(imagePath);
  }
}

console.log('Missing Images:');
console.log(missing.length ? missing : 'None');

console.log('\nExisting Images Count:', existing.length);
