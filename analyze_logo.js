import Jimp from 'jimp';

async function analyze() {
    const image = await Jimp.read('public/atp_logo_new.jpg');
    console.log("Image dimensions:", image.bitmap.width, "x", image.bitmap.height);
    
    // Sample a few pixels: corners, center, and a few random spots
    const points = [
        [0,0], [10,10], // corners (expected background)
        [Math.floor(image.bitmap.width/2), Math.floor(image.bitmap.height/2)], // center
        [Math.floor(image.bitmap.width/2), Math.floor(image.bitmap.height/4)], 
        [Math.floor(image.bitmap.width/4), Math.floor(image.bitmap.height/2)]
    ];

    for (let p of points) {
        const hex = image.getPixelColor(p[0], p[1]);
        const r = (hex >> 24) & 255;
        const g = (hex >> 16) & 255;
        const b = (hex >> 8) & 255;
        console.log(`Pixel at ${p[0]},${p[1]}: rgb(${r},${g},${b})`);
    }
}

analyze().catch(console.error);
