import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

async function findAndOptimize(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await findAndOptimize(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg')) {
      if (fs.statSync(fullPath).size > 200000) { // > 200KB
        console.log('Optimizing', fullPath, (fs.statSync(fullPath).size / 1024).toFixed(2), 'KB');
        const tempPath = fullPath + '.tmp';
        
        try {
          if (file.endsWith('.png')) {
            await sharp(fullPath)
              .resize({ width: 600, withoutEnlargement: true })
              .png({ quality: 70, compressionLevel: 9, palette: true })
              .toFile(tempPath);
          } else {
            await sharp(fullPath)
              .resize({ width: 600, withoutEnlargement: true })
              .jpeg({ quality: 80 })
              .toFile(tempPath);
          }
          
          fs.renameSync(tempPath, fullPath);
          console.log(' -> Done! New size:', (fs.statSync(fullPath).size / 1024).toFixed(2), 'KB');
        } catch(e) {
          console.error("Error on", fullPath, e);
        }
      }
    }
  }
}

findAndOptimize(publicDir).then(() => console.log('Optimization complete.'));
