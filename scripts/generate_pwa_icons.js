import { Jimp } from 'jimp';

async function generatePWAIcons() {
    console.log("Loading official logo...");
    // Load the official logo with the blue background
    const logo = await Jimp.read('public/atp_logo_new.jpg');
    
    console.log("Generating 192x192 PWA Icon...");
    const icon192 = logo.clone();
    icon192.resize({ w: 192, h: 192 }); // Resize and crop to exactly 192x192
    await icon192.write('public/pwa-192x192.png');
    
    console.log("Generating 512x512 PWA Icon...");
    const icon512 = logo.clone();
    icon512.resize({ w: 512, h: 512 }); // Resize and crop to exactly 512x512
    await icon512.write('public/pwa-512x512.png');
    
    console.log("PWA Icons generated successfully!");
}

generatePWAIcons().catch(console.error);
