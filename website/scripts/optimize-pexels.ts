import sharp from "sharp";
import path from "path";
import fs from "fs";

const here = path.dirname(new URL(import.meta.url).pathname);
const dir = path.resolve(here, "../public/images");

const sources = fs.readdirSync(dir).filter((f) => f.endsWith("-source.jpg"));
const sizes = [800, 1600];
const formats = ["avif", "webp", "jpeg"] as const;

async function run() {
  for (const src of sources) {
    const name = src.replace("-source.jpg", "");
    const inPath = path.join(dir, src);
    for (const size of sizes) {
      for (const fmt of formats) {
        const ext = fmt === "jpeg" ? "jpg" : fmt;
        const out = path.join(dir, `${name}-${size}.${ext}`);
        let pipeline = sharp(inPath).resize(size, null, { withoutEnlargement: true });
        if (fmt === "avif") pipeline = pipeline.avif({ quality: 60 });
        else if (fmt === "webp") pipeline = pipeline.webp({ quality: 75 });
        else pipeline = pipeline.jpeg({ quality: 82, progressive: true });
        await pipeline.toFile(out);
      }
    }
    console.log(`✓ ${name}`);
  }
  // remove source files after optimization (save disk)
  for (const src of sources) {
    fs.unlinkSync(path.join(dir, src));
  }
  console.log("Sources removed.");
}

run().catch((e) => { console.error(e); process.exit(1); });
