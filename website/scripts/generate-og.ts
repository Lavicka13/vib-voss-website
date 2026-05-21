import sharp from "sharp";
import path from "path";
import fs from "fs";

const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.resolve(here, "../public");

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDFBFB"/>
      <stop offset="100%" stop-color="#F4D4C6" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#1A1A1A"/>
  <text x="80" y="240" font-family="'Playfair Display', 'Times New Roman', serif" font-size="120" font-weight="700" fill="#1A1A1A">V.I.B.</text>
  <text x="80" y="290" font-family="'Manrope', 'Helvetica Neue', sans-serif" font-size="22" font-weight="500" letter-spacing="4" fill="#1A1A1A">IMMOBILIEN BERATUNG</text>
  <text x="80" y="430" font-family="'Playfair Display', 'Times New Roman', serif" font-size="56" font-weight="400" font-style="italic" fill="#1A1A1A">Verkaufen aus Leidenschaft.</text>
  <text x="80" y="490" font-family="'Manrope', 'Helvetica Neue', sans-serif" font-size="24" font-weight="300" fill="#6B6B6B">Edith Voss · Rhein-Neckar-Region · Off-Market-Netzwerk</text>
  <text x="80" y="570" font-family="'Manrope', 'Helvetica Neue', sans-serif" font-size="18" font-weight="600" letter-spacing="3" fill="#71594E">E-VIB.DE</text>
</svg>`;

async function run() {
  const buf = await sharp(Buffer.from(ogSvg)).jpeg({ quality: 90 }).toBuffer();
  fs.writeFileSync(path.join(outDir, "og-image.jpg"), buf);
  console.log("✓ og-image.jpg");
}

run().catch((e) => { console.error(e); process.exit(1); });
