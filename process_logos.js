import Jimp from 'jimp';

async function processLogos() {
    console.log("Loading Grand Est logo...");
    const image = await Jimp.read('public/region-grand-est.jpg');
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;

    const whiteLogo = new Jimp(w, h);

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const hex = image.getPixelColor(x, y);
            const r = (hex >> 24) & 255;
            const g = (hex >> 16) & 255;
            const b = (hex >> 8) & 255;

            const luminance = (r * 0.299 + g * 0.587 + b * 0.114);
            
            let alpha = 255 - luminance;
            if (alpha < 30) alpha = 0;
            if (alpha > 200) alpha = 255;
            
            whiteLogo.setPixelColor(Jimp.rgbaToInt(255, 255, 255, alpha), x, y);
        }
    }

    console.log("Saving white Grand Est logo...");
    await whiteLogo.writeAsync('public/region-grand-est-white.png');
    console.log("Done.");
}

processLogos().catch(console.error);
