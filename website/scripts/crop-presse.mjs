import sharp from "sharp";
import { rename, unlink } from "node:fs/promises";

const root = new URL("../public/images/", import.meta.url).pathname;
const SRC = "/tmp/presse-original.jpg"; // restored 1600x970 original

// 1) Edge detection: find the real bounding box of "ink" (non-paper) content
const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

// Paper threshold: anything brighter than this is treated as background
const PAPER = 175;
// A row/column is "content" if it has at least this many ink pixels
const MIN_INK = Math.round(width * 0.012); // ~1.2% of the row
const MIN_INK_COL = Math.round(height * 0.012);

const hasInkInRow = (y) => {
  let count = 0;
  for (let x = 0; x < width; x++) {
    if (data[y * width + x] < PAPER) {
      count++;
      if (count >= MIN_INK) return true;
    }
  }
  return false;
};
const hasInkInCol = (x) => {
  let count = 0;
  for (let y = 0; y < height; y++) {
    if (data[y * width + x] < PAPER) {
      count++;
      if (count >= MIN_INK_COL) return true;
    }
  }
  return false;
};

let top = 0;
while (top < height - 1 && !hasInkInRow(top)) top++;
let bottom = height - 1;
while (bottom > top && !hasInkInRow(bottom)) bottom--;
let left = 0;
while (left < width - 1 && !hasInkInCol(left)) left++;
let right = width - 1;
while (right > left && !hasInkInCol(right)) right--;

// Add a tiny margin so the content does not touch the edges
const PAD = 4;
const cropLeft = Math.max(0, left - PAD);
const cropTop = Math.max(0, top - PAD);
const cropWidth = Math.min(width - cropLeft, right - left + 1 + PAD * 2);
const cropHeight = Math.min(height - cropTop, bottom - top + 1 + PAD * 2);

console.log(`Source:    ${width}x${height}`);
console.log(`Ink bbox:  x=${left}-${right} y=${top}-${bottom}`);
console.log(`Crop:      ${cropWidth}x${cropHeight}  ratio ${(cropWidth / cropHeight).toFixed(3)}`);
console.log(`Saved:     ${Math.round((1 - (cropWidth * cropHeight) / (width * height)) * 100)}% of pixels`);

const croppedBuf = await sharp(SRC)
  .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
  .jpeg({ quality: 100 })
  .toBuffer();

// 2) Re-emit variants
const sizes = [1600, 800];
const formats = [
  { ext: "jpg", apply: (s) => s.jpeg({ quality: 88, mozjpeg: true }) },
  { ext: "webp", apply: (s) => s.webp({ quality: 88 }) },
  { ext: "avif", apply: (s) => s.avif({ quality: 65 }) },
];
for (const w of sizes) {
  for (const fmt of formats) {
    const finalPath = `${root}presse-2020-${w}.${fmt.ext}`;
    const tmpPath = `${root}.presse-2020-${w}.${fmt.ext}.tmp`;
    await fmt.apply(sharp(croppedBuf).resize({ width: w, withoutEnlargement: true })).toFile(tmpPath);
    try { await unlink(finalPath); } catch {}
    await rename(tmpPath, finalPath);
  }
  console.log(`✓ ${w}w written`);
}
