import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

async function findAndConvert(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await findAndConvert(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      // Only target showcase images
      if (file.includes('hero') || file.includes('venue')) {
        const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
        
        try {
          await sharp(fullPath)
            .resize({ width: 400, withoutEnlargement: true })
            .webp({ quality: 65, effort: 6 })
            .toFile(webpPath);
            
          console.log(`Converted ${file} to WebP (${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB)`);
        } catch(e) {
          console.error("Error on", fullPath, e);
        }
      }
    }
  }
}

findAndConvert(publicDir).then(() => console.log('WebP conversion complete.'));
