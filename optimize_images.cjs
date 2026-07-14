const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 1200;

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        try {
          const stats = fs.statSync(fullPath);
          const originalSize = stats.size;
          
          // Skip very small files (< 10KB) to avoid overhead
          if (originalSize < 10240) continue;

          const metadata = await sharp(fullPath).metadata();
          
          let pipeline = sharp(fullPath);
          let resized = false;
          
          // Resize if too large
          if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
            resized = true;
          }

          // Apply compression based on format
          if (ext === '.png') {
            pipeline = pipeline.png({ quality: 65, effort: 8 });
          } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 60, mozjpeg: true });
          } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 60, effort: 6 });
          }

          // Output to temp file then replace
          const tempPath = fullPath + '.tmp';
          await pipeline.toFile(tempPath);
          
          const newStats = fs.statSync(tempPath);
          
          // Only replace if it actually saved space
          if (newStats.size < originalSize) {
            fs.renameSync(tempPath, fullPath);
            const savings = ((originalSize - newStats.size) / 1024).toFixed(1);
            console.log(`Compressed: ${fullPath} - Saved ${savings}KB`);
          } else {
            fs.unlinkSync(tempPath); // remove temp file if larger
            console.log(`Skipped (No savings): ${fullPath}`);
          }
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err.message);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image compression...');
  await processDirectory(path.join(__dirname, 'public'));
  await processDirectory(path.join(__dirname, 'src'));
  console.log('Done.');
}

run();
