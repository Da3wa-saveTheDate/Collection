const fs = require('fs');
const path = require('path');

const showcasePath = path.join(__dirname, 'src', 'components', 'sections', 'Showcase.tsx');
const content = fs.readFileSync(showcasePath, 'utf8');

// Match each template object block
const templateBlocks = content.match(/\{\s*id:\s*'[^']+',[^}]+\}/g);

if (!templateBlocks) {
  console.log("No templates found or regex failed.");
  process.exit(1);
}

const missingImageProp = [];
for (const block of templateBlocks) {
  const idMatch = block.match(/id:\s*'([^']+)'/);
  const imageMatch = block.match(/image:\s*'([^']+)'/);
  
  if (idMatch && !imageMatch) {
    missingImageProp.push(idMatch[1]);
  }
}

console.log('Templates without an image property:');
console.log(missingImageProp.length ? missingImageProp : 'None');
