const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = ['new_prem3', 'new_prem4', 'new_prem5', 'new_prem6', 'new_prem7', 'new_prem8', 'invitation-complete'];

async function processImages() {
  for (const dir of dirs) {
    const pngPath = path.join('public', dir, 'images', 'hero.png');
    const webpPath = path.join('public', dir, 'images', 'hero.webp');
    
    if (fs.existsSync(pngPath)) {
      try {
        await sharp(pngPath).webp({ quality: 80 }).toFile(webpPath);
        console.log(`Converted ${pngPath} to ${webpPath}`);
      } catch (err) {
        console.error(`Error converting ${pngPath}:`, err.message);
      }
    } else {
        console.log(`No png found for ${dir}`);
    }
  }
}

processImages();
