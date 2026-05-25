import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const src = "/tmp/presse-work.jpg";
const outDir = path.resolve(here, "../public/images");
async function makeOne(size: number, fmt: "avif" | "webp" | "jpeg") {
  const ext = fmt === "jpeg" ? "jpg" : fmt;
  const out = path.join(outDir, `presse-2020-${size}.${ext}`);
  let p = sharp(src).resize(size, null, { withoutEnlargement: true });
  if (fmt === "avif") p = p.avif({ quality: 65 });
  else if (fmt === "webp") p = p.webp({ quality: 80 });
  else p = p.jpeg({ quality: 85, progressive: true });
  await p.toFile(out);
  console.log("✓", `presse-2020-${size}.${ext}`);
}
async function run() {
  for (const size of [800, 1600]) {
    for (const fmt of ["avif", "webp", "jpeg"] as const) {
      await makeOne(size, fmt);
    }
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
