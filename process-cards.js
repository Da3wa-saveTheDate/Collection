import sharp from 'sharp';
import fs from 'fs';

const sources = [
  { path: 'C:/Users/khalifa/Downloads/invitaion_cards/15bc48e4-a1de-4867-a994-798095070cdf.jpeg', id: 'invitation-card-1' },
  { path: 'C:/Users/khalifa/Downloads/invitaion_cards/443132f2-556e-4848-ac27-d6e73325eb6b.jpeg', id: 'invitation-card-2' },
  { path: 'C:/Users/khalifa/Downloads/invitaion_cards/8d8e4256-999e-4d8c-9d71-48d24f215ea8.jpeg', id: 'invitation-card-3' },
  { path: 'C:/Users/khalifa/Downloads/invitaion_cards/be4578ae-ad89-4c8f-90e2-e4ef9033f7b4.jpeg', id: 'invitation-card-4' },
  { path: 'C:/Users/khalifa/Downloads/invitaion_cards/cb875b4b-ed39-4bdc-ae9d-a7024bf28707.jpeg', id: 'invitation-card-5' }
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
  <title>Invitation Card</title>
  <style>
    body { margin: 0; padding: 0; display: flex; justify-content: center; background: #fafafa; }
    img { max-width: 100%; height: auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <img src="images/full.webp" alt="Invitation Card">
</body>
</html>`;
    fs.writeFileSync(dir + '/index.html', html);
  }
}
process().catch(console.error);
