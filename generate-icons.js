import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'public', 'atp_logo_new.jpg');
const outputDir = path.join(process.cwd(), 'public');

async function generateIcons() {
  try {
    const img = sharp(inputFile);

    // Generate 192x192
    await img.clone().resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).toFile(path.join(outputDir, 'pwa-192x192.png'));
    console.log('Generated pwa-192x192.png');

    // Generate 512x512
    await img.clone().resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).toFile(path.join(outputDir, 'pwa-512x512.png'));
    console.log('Generated pwa-512x512.png');

    // Generate Apple Touch Icon (180x180)
    await img.clone().resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
