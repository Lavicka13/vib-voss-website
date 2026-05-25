import sharp from "sharp";
import { rename, unlink } from "node:fs/promises";

const SRC = "/Users/lukaslavicka/.claude/image-cache/7d5961ce-bbb1-4fe9-a8bc-d817fe44dc16/1.png";
const root = new URL("../public/images/referenzen/", import.meta.url).pathname;

const sizes = [
  { w: 1600, name: "ref-villa-rheinebene-1600" },
  { w: 800, name: "ref-villa-rheinebene-800" },
];
const formats = [
  { ext: "jpg", apply: (s) => s.jpeg({ quality: 88, mozjpeg: true }) },
  { ext: "webp", apply: (s) => s.webp({ quality: 88 }) },
  { ext: "avif", apply: (s) => s.avif({ quality: 65 }) },
];

const meta = await sharp(SRC).metadata();
console.log(`Source: ${meta.width}x${meta.height}`);

for (const { w, name } of sizes) {
  for (const fmt of formats) {
    const finalPath = `${root}${name}.${fmt.ext}`;
    const tmpPath = `${root}.${name}.${fmt.ext}.tmp`;
    await fmt.apply(sharp(SRC).resize({ width: w, withoutEnlargement: true })).toFile(tmpPath);
    try { await unlink(finalPath); } catch {}
    await rename(tmpPath, finalPath);
  }
  console.log(`✓ ${w}w (jpg+webp+avif)`);
}
