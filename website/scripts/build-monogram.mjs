import sharp from "sharp";

const root = new URL("../public/images/logo/", import.meta.url).pathname;
const SRC = `${root}logo-source.png`;

// 1) Find the vertical gap between the V.I.B. monogram and the
//    "IMMOBILIEN BERATUNG" caption so we can crop exactly the
//    monogram out
const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const INK = 130;
const inkPerRow = new Array(height).fill(0);
for (let y = 0; y < height; y++) {
  let c = 0;
  for (let x = 0; x < width; x++) {
    if (data[y * width + x] < INK) c++;
  }
  inkPerRow[y] = c;
}

const findGap = () => {
  // Find the largest consecutive run of low-ink rows after the upper third
  const startSearch = Math.floor(height * 0.45);
  let bestStart = -1, bestLen = 0;
  let curStart = -1, curLen = 0;
  for (let y = startSearch; y < height; y++) {
    if (inkPerRow[y] < 2) {
      if (curStart === -1) curStart = y;
      curLen++;
      if (curLen > bestLen) {
        bestLen = curLen;
        bestStart = curStart;
      }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }
  return { start: bestStart, len: bestLen };
};

const gap = findGap();
const cutY = gap.start + Math.floor(gap.len / 2);
console.log(`Whitespace gap: y=${gap.start} length=${gap.len}  →  cut at y=${cutY}`);

// 2) Crop the top part (monogram only), write to buffer, then a light trim
const extractedBuf = await sharp(SRC)
  .extract({ left: 0, top: 0, width, height: cutY })
  .png()
  .toBuffer();
const trimmedBuf = await sharp(extractedBuf).trim({ threshold: 40 }).png().toBuffer();
const tMeta = await sharp(trimmedBuf).metadata();
console.log(`Monogram bbox: ${tMeta.width}x${tMeta.height}`);

// 3) Build mono-on-transparent variants via chroma-key on the rosa
const { data: rgbaData, info: rgbaInfo } = await sharp(trimmedBuf)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(rgbaData.length);
const SOLID = 90;
const CLEAR = 180;
for (let i = 0; i < rgbaData.length; i += 4) {
  const lum = 0.2126 * rgbaData[i] + 0.7152 * rgbaData[i + 1] + 0.0722 * rgbaData[i + 2];
  let alpha;
  if (lum <= SOLID) alpha = 255;
  else if (lum >= CLEAR) alpha = 0;
  else alpha = Math.round(255 * (1 - (lum - SOLID) / (CLEAR - SOLID)));
  out[i] = 0;
  out[i + 1] = 0;
  out[i + 2] = 0;
  out[i + 3] = alpha;
}

const sizes = [240, 480, 720];
const monoImg = sharp(out, { raw: { width: rgbaInfo.width, height: rgbaInfo.height, channels: 4 } });
for (const w of sizes) {
  const base = monoImg.clone().resize({ width: w, withoutEnlargement: true });
  await base.clone().png({ quality: 92, compressionLevel: 9 }).toFile(`${root}logo-monogram-${w}.png`);
  await base.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(`${root}logo-monogram-${w}.webp`);
}

// Also a plaque (rosa BG, just the monogram crop)
for (const w of sizes) {
  const base = sharp(trimmedBuf).resize({ width: w, withoutEnlargement: true });
  await base.clone().png({ quality: 92, compressionLevel: 9 }).toFile(`${root}logo-monogram-plaque-${w}.png`);
  await base.clone().webp({ quality: 92 }).toFile(`${root}logo-monogram-plaque-${w}.webp`);
}

console.log("✓ monogram variants written (mono transparent + rosa plaque)");
