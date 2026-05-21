import sharp from "sharp";
import path from "path";
import fs from "fs";

const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.resolve(here, "../public");
const brandDir = path.resolve(here, "../../brand");

// Render the "V.I.B." mark on zartrosa background as a square favicon.
// We build it via SVG because the mark is text-based.
const sizes = [16, 32, 48, 96, 180, 192, 512];

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#F4D4C6"/>
  <text x="100" y="125" font-family="'Playfair Display', 'Times New Roman', serif" font-size="68" font-weight="700" text-anchor="middle" fill="#1A1A1A">V.I.B.</text>
</svg>`;

async function run() {
  // Write the source SVG to brand/ for traceability
  fs.writeFileSync(path.join(brandDir, "favicon-source.svg"), faviconSvg);

  for (const size of sizes) {
    const buf = await sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer();
    const filename = size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`;
    fs.writeFileSync(path.join(outDir, filename), buf);
    console.log(`✓ ${filename}`);
  }

  // Also write a 32x32 PNG as favicon.ico fallback. Browsers accept PNG via .ico.
  const ico32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(outDir, "favicon.ico"), ico32);
  console.log("✓ favicon.ico (32x32 PNG)");

  console.log("Done.");
}

run().catch((e) => { console.error(e); process.exit(1); });
