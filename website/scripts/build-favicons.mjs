import sharp from "sharp";
import { rename, unlink } from "node:fs/promises";

const pub = new URL("../public/", import.meta.url).pathname;
const logoSource = `${pub}images/logo/logo-source.png`;

// Use the gap-detection logic from build-monogram to grab just V.I.B.
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

// Compose square favicon: rose background + centred monogram at ~70% height
async function buildFavicon(size, dest) {
  const targetHeight = Math.round(size * 0.7);
  const targetWidth = Math.round(targetHeight * (tMeta.width / tMeta.height));
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
  console.log(`✓ ${size}x${size}  →  ${dest.split("/").pop()}`);
}

const sizes = [
  { size: 16, name: "favicon-16.png" },
  { size: 32, name: "favicon-32.png" },
  { size: 48, name: "favicon-48.png" },
  { size: 96, name: "favicon-96.png" },
  { size: 192, name: "favicon-192.png" },
  { size: 512, name: "favicon-512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

for (const { size, name } of sizes) {
  await buildFavicon(size, `${pub}${name}`);
}

// favicon.ico — sharp can produce a multi-resolution ICO via .toFormat("ico")
// not built-in. Easiest: a single 32x32 PNG renamed to .ico still works
// in most browsers; for max compatibility ship the multi-PNG via manifest.
const ico32 = await sharp(trimmedBuf)
  .resize({ height: Math.round(32 * 0.7) })
  .extend({
    top: Math.round((32 - 32 * 0.7) / 2),
    bottom: Math.round((32 - 32 * 0.7) / 2),
    left: Math.round((32 - 32 * 0.7 * (tMeta.width / tMeta.height)) / 2),
    right: Math.round((32 - 32 * 0.7 * (tMeta.width / tMeta.height)) / 2),
    background: { r: 250, g: 206, b: 194, alpha: 1 },
  })
  .png()
  .toBuffer();

// Write as ICO via simple png-in-ico container (browsers accept embedded PNG in ICO)
// Header: 6 bytes; Entry: 16 bytes; PNG data
const png = ico32;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);    // reserved
header.writeUInt16LE(1, 2);    // type = ICO
header.writeUInt16LE(1, 4);    // count
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);       // width
entry.writeUInt8(32, 1);       // height
entry.writeUInt8(0, 2);        // palette
entry.writeUInt8(0, 3);        // reserved
entry.writeUInt16LE(1, 4);     // planes
entry.writeUInt16LE(32, 6);    // bpp
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(22, 12);   // offset
const ico = Buffer.concat([header, entry, png]);
const { writeFile } = await import("node:fs/promises");
await writeFile(`${pub}favicon.ico`, ico);
console.log(`✓ favicon.ico (${ico.length} bytes)`);
