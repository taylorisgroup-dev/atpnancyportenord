import Jimp from 'jimp';

function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(Math.pow(r1-r2, 2) + Math.pow(g1-g2, 2) + Math.pow(b1-b2, 2));
}

async function processLogos() {
    console.log("Processing ATP Logo...");
    const atp = await Jimp.read('public/atp_logo_new.jpg');
    
    // ATP background is around rgb(0, 85, 120)
    const targetAtpR = 0;
    const targetAtpG = 85;
    const targetAtpB = 120;
    
    const atpTrans = new Jimp(atp.bitmap.width, atp.bitmap.height);
    for (let y = 0; y < atp.bitmap.height; y++) {
        for (let x = 0; x < atp.bitmap.width; x++) {
            const hex = atp.getPixelColor(x, y);
            const r = (hex >> 24) & 255;
            const g = (hex >> 16) & 255;
            const b = (hex >> 8) & 255;
            
            const dist = colorDistance(r, g, b, targetAtpR, targetAtpG, targetAtpB);
            
            // If distance is small, it's the background. Make it transparent.
            // Soft threshold for anti-aliasing.
            let alpha = 255;
            if (dist < 30) {
                alpha = 0;
            } else if (dist < 60) {
                alpha = Math.floor(((dist - 30) / 30) * 255);
            }
            
            // Keep original colors, just change alpha
            atpTrans.setPixelColor(Jimp.rgbaToInt(r, g, b, alpha), x, y);
        }
    }
    await atpTrans.writeAsync('public/atp_logo_transparent.png');
    console.log("Saved atp_logo_transparent.png");

    console.log("Processing Grand Est Logo...");
    const ge = await Jimp.read('public/region-grand-est.jpg');
    
    // Grand Est background is white rgb(255, 255, 255)
    const targetGeR = 255;
    const targetGeG = 255;
    const targetGeB = 255;
    
    const geTrans = new Jimp(ge.bitmap.width, ge.bitmap.height);
    for (let y = 0; y < ge.bitmap.height; y++) {
        for (let x = 0; x < ge.bitmap.width; x++) {
            const hex = ge.getPixelColor(x, y);
            const r = (hex >> 24) & 255;
            const g = (hex >> 16) & 255;
            const b = (hex >> 8) & 255;
            
            const dist = colorDistance(r, g, b, targetGeR, targetGeG, targetGeB);
            
            let alpha = 255;
            if (dist < 15) {
                alpha = 0;
            } else if (dist < 40) {
                alpha = Math.floor(((dist - 15) / 25) * 255);
            }
            
            geTrans.setPixelColor(Jimp.rgbaToInt(r, g, b, alpha), x, y);
        }
    }
    await geTrans.writeAsync('public/region-grand-est-transparent.png');
    console.log("Saved region-grand-est-transparent.png");
}

processLogos().catch(console.error);
