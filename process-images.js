import sharp from 'sharp';
import fs from 'fs';

const sources = [
  { path: 'C:/Users/khalifa/Downloads/7dc42eac-b62a-4cf0-ad07-3ae3e71bcdc0.jpeg', id: 'invitation-fan-1' },
  { path: 'C:/Users/khalifa/Downloads/f588adaf-9ade-40e6-a20f-48f32df5eb29.jpeg', id: 'invitation-fan-2' },
  { path: 'C:/Users/khalifa/Downloads/117a586c-c1fe-4751-8a97-54eeee08cc58.jpeg', id: 'invitation-fan-3' }
];

async function process() {
  for (const src of sources) {
    const dir = 'public/' + src.id;
    const imgDir = dir + '/images';
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
    
    // Create hero.webp (thumbnail)
    await sharp(src.path)
      .resize(800)
      .webp({ quality: 80 })
      .toFile(imgDir + '/hero.webp');
      
    // Create full.webp (for the template page itself)
    await sharp(src.path)
      .resize(1600)
      .webp({ quality: 85 })
      .toFile(imgDir + '/full.webp');
      
    // Create index.html
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation Fan</title>
  <style>
    body { margin: 0; padding: 0; display: flex; justify-content: center; background: #fafafa; }
    img { max-width: 100%; height: auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <img src="images/full.webp" alt="Invitation Fan">
</body>
</html>`;
    fs.writeFileSync(dir + '/index.html', html);
  }
}
process().catch(console.error);
