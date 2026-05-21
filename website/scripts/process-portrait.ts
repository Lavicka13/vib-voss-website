import sharp from "sharp";
import path from "path";
import fs from "fs";

const here = path.dirname(new URL(import.meta.url).pathname);
const src = path.resolve(here, "../../brand/portraet-edith.jpg");
const outDir = path.resolve(here, "../public/images");
fs.mkdirSync(outDir, { recursive: true });

const sizes = [400, 800, 1200];
const formats = ["avif", "webp", "jpeg"] as const;

async function run() {
  if (!fs.existsSync(src)) {
    console.error("Source missing:", src);
    process.exit(1);
  }
  for (const size of sizes) {
    for (const fmt of formats) {
      const ext = fmt === "jpeg" ? "jpg" : fmt;
      const out = path.join(outDir, `portraet-edith-${size}.${ext}`);
      let pipeline = sharp(src).resize(size, null, { withoutEnlargement: true });
      if (fmt === "avif") pipeline = pipeline.avif({ quality: 60 });
      else if (fmt === "webp") pipeline = pipeline.webp({ quality: 75 });
      else pipeline = pipeline.jpeg({ quality: 82, progressive: true });
      await pipeline.toFile(out);
      console.log("→", path.basename(out));
    }
  }
  console.log("Done.");
}

run().catch((e) => { console.error(e); process.exit(1); });
