const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const newPrem2Img = 'C:\\Users\\khalifa\\.gemini\\antigravity\\brain\\8414436a-5d60-41f3-bfa5-3cc1df351b2f\\new_prem2_hero_1784032535480.png';
const newPrem7Img = 'C:\\Users\\khalifa\\.gemini\\antigravity\\brain\\8414436a-5d60-41f3-bfa5-3cc1df351b2f\\new_prem7_hero_1784032544591.png';

const target2Webp = path.join(__dirname, 'public', 'new_prem2', 'images', 'hero.webp');
const target2Png = path.join(__dirname, 'public', 'new_prem2', 'images', 'hero.png');

const target7Webp = path.join(__dirname, 'public', 'new_prem7', 'images', 'hero.webp');
const target7Png = path.join(__dirname, 'public', 'new_prem7', 'images', 'hero.png');

async function convertAndCopy() {
  // new_prem2
  await sharp(newPrem2Img).toFile(target2Png);
  await sharp(newPrem2Img).webp({ quality: 80 }).toFile(target2Webp);
  console.log('Saved new_prem2 images');

  // new_prem7
  await sharp(newPrem7Img).toFile(target7Png);
  await sharp(newPrem7Img).webp({ quality: 80 }).toFile(target7Webp);
  console.log('Saved new_prem7 images');
}

convertAndCopy().catch(console.error);
