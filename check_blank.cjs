const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function checkImages() {
  const dirs = fs.readdirSync(publicDir, { withFileTypes: true })
    .filter(d => d.isDirectory());

  const blankImages = [];

  for (const dir of dirs) {
    const webpPath = path.join(publicDir, dir.name, 'images', 'hero.webp');
    const webpPath2 = path.join(publicDir, dir.name, 'assets', 'hero.webp'); // some use assets
    
    let target = null;
    if (fs.existsSync(webpPath)) target = webpPath;
    else if (fs.existsSync(webpPath2)) target = webpPath2;
    
    if (target) {
      try {
        const stats = await sharp(target).stats();
        // Check if standard deviation of all channels is very low (meaning it's a solid color)
        const isBlank = stats.channels.every(ch => ch.stdev < 5);
        
        if (isBlank) {
          console.log(`${dir.name} has a blank/solid image! (stdev: ${stats.channels[0].stdev.toFixed(2)})`);
          blankImages.push(dir.name);
        } else {
          // console.log(`${dir.name} is fine.`);
        }
      } catch (e) {
        console.error(`Error processing ${target}: ${e.message}`);
      }
    } else {
       // console.log(`${dir.name} doesn't even have a hero.webp`);
    }
  }
  console.log('Blank Images found:', blankImages);
}

checkImages();
