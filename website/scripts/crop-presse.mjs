import sharp from "sharp";
import { rename, unlink } from "node:fs/promises";

const root = new URL("../public/images/", import.meta.url).pathname;
const SRC = "/tmp/presse-original.jpg"; // 1600x970 original

// 1) Sample the four corners to learn the actual paper colour
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const sample = (x, y) => {
  const i = (y * info.width + x) * 4;
  return [data[i], data[i + 1], data[i + 2]];
};
const corners = [
  sample(2, 2),
  sample(info.width - 3, 2),
  sample(2, info.height - 3),
  sample(info.width - 3, info.height - 3),
];
const avg = corners.reduce(
  ([sr, sg, sb], [r, g, b]) => [sr + r, sg + g, sb + b],
  [0, 0, 0],
).map((v) => Math.round(v / corners.length));
const bg = { r: avg[0], g: avg[1], b: avg[2] };
console.log(`Sampled paper bg: rgb(${bg.r}, ${bg.g}, ${bg.b})`);

// 2) Trim against the sampled colour with a tight threshold (paper haze ~10)
const trimmedBuf = await sharp(SRC)
  .trim({ background: bg, threshold: 10 })
  .jpeg({ quality: 100 })
  .toBuffer();
const meta = await sharp(trimmedBuf).metadata();
console.log(`After trim: ${meta.width}x${meta.height}  ratio ${(meta.width / meta.height).toFixed(3)}`);

// 3) Variants
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
    await fmt.apply(sharp(trimmedBuf).resize({ width: w, withoutEnlargement: true })).toFile(tmpPath);
    try { await unlink(finalPath); } catch {}
    await rename(tmpPath, finalPath);
  }
  console.log(`✓ ${w}w written`);
}
