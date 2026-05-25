import sharp from "sharp";
import { rename, unlink } from "node:fs/promises";

const pub = new URL("../public/", import.meta.url).pathname;
const app = new URL("../src/app/", import.meta.url).pathname;
const logoSource = `${pub}images/logo/logo-source.png`;

// Reuse the gap-detection from build-monogram to grab the V.I.B. crop
const { data, info } = await sharp(logoSource).greyscale().raw().toBuffer({ resolveWithObject: true });
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
const startSearch = Math.floor(height * 0.45);
let bestStart = -1, bestLen = 0, curStart = -1, curLen = 0;
for (let y = startSearch; y < height; y++) {
  if (inkPerRow[y] < 2) {
    if (curStart === -1) curStart = y;
    curLen++;
    if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
  } else { curStart = -1; curLen = 0; }
}
const cutY = bestStart + Math.floor(bestLen / 2);

const monogramBuf = await sharp(logoSource)
  .extract({ left: 0, top: 0, width, height: cutY })
  .png()
  .toBuffer();
const trimmedBuf = await sharp(monogramBuf).trim({ threshold: 40 }).png().toBuffer();
const tMeta = await sharp(trimmedBuf).metadata();
console.log(`Monogram source: ${tMeta.width}x${tMeta.height}`);

async function buildSquareIcon(size, dest) {
  const targetHeight = Math.round(size * 0.7);
  const monogramResized = await sharp(trimmedBuf)
    .resize({ height: targetHeight })
    .toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 250, g: 206, b: 194, alpha: 1 }, // logo-rose #facec2
    },
  })
    .composite([{ input: monogramResized, gravity: "center" }])
    .png()
    .toFile(dest + ".tmp");
  try { await unlink(dest); } catch {}
  await rename(dest + ".tmp", dest);
  console.log(`✓ ${size}x${size}  →  ${dest.replace(/^.*\//, "")}`);
}

// Next.js app-router icon conventions
await buildSquareIcon(512, `${app}icon.png`);
await buildSquareIcon(180, `${app}apple-icon.png`);

// Public favicons (still useful as fallback / for non-Next consumers)
const publicSizes = [
  { size: 16, name: "favicon-16.png" },
  { size: 32, name: "favicon-32.png" },
  { size: 48, name: "favicon-48.png" },
  { size: 96, name: "favicon-96.png" },
  { size: 192, name: "favicon-192.png" },
  { size: 512, name: "favicon-512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];
for (const { size, name } of publicSizes) {
  await buildSquareIcon(size, `${pub}${name}`);
}

// favicon.ico — single 32px PNG embedded in ICO container
const ico32Square = await sharp({
  create: {
    width: 32,
    height: 32,
    channels: 4,
    background: { r: 250, g: 206, b: 194, alpha: 1 },
  },
})
  .composite([{
    input: await sharp(trimmedBuf).resize({ height: Math.round(32 * 0.7) }).toBuffer(),
    gravity: "center",
  }])
  .png()
  .toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(ico32Square.length, 8);
entry.writeUInt32LE(22, 12);
const ico = Buffer.concat([header, entry, ico32Square]);
const { writeFile } = await import("node:fs/promises");
await writeFile(`${pub}favicon.ico`, ico);
console.log(`✓ favicon.ico (${ico.length} bytes)`);
