import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, "../../../brand/portraet-edith-neu.png");
const outDir = path.resolve(here, "../public/images");
const sizes = [400, 800, 1200, 1600];
const formats = ["avif", "webp", "jpeg"] as const;

async function run() {
  for (const size of sizes) {
    for (const fmt of formats) {
      const ext = fmt === "jpeg" ? "jpg" : fmt;
      const out = path.join(outDir, `portraet-edith-${size}.${ext}`);
      let p = sharp(src).resize(size, null, { withoutEnlargement: true });
      if (fmt === "avif") p = p.avif({ quality: 65 });
      else if (fmt === "webp") p = p.webp({ quality: 80 });
      else p = p.jpeg({ quality: 85, progressive: true });
      await p.toFile(out);
      console.log("✓", `portraet-edith-${size}.${ext}`);
    }
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
