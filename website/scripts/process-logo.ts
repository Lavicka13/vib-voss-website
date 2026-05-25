/**
 * Logo Asset Pipeline
 *
 * Input:  public/images/logo/logo-source.png  (V.I.B. Logo, schwarz auf zartrosa BG)
 *
 * Output variants:
 *   1. Plaque (mit rosa BG, trimmed + 3 sizes, PNG + WebP)
 *      → für Hero-Wappen oben rechts
 *   2. Mono Mark (schwarzes Logo auf transparent, 3 sizes, PNG + WebP)
 *      → für Edition-Strip, kompaktere Verwendung
 *   3. Inverse Mono (cremeweißes Logo auf transparent)
 *      → für dunkle Backgrounds (falls benötigt)
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const ROOT = new URL("../public/images/logo/", import.meta.url).pathname;
const SOURCE = join(ROOT, "logo-source.png");

const SIZES = [240, 480, 720] as const;

async function ensureDir() {
  await mkdir(ROOT, { recursive: true });
}

/**
 * Variant 1: Plaque — original rosa Hintergrund, getrimmt, mehrere Größen
 */
async function buildPlaque() {
  for (const w of SIZES) {
    const base = sharp(SOURCE).trim().resize({ width: w, withoutEnlargement: true });
    await base.clone().png({ quality: 92, compressionLevel: 9 }).toFile(join(ROOT, `logo-plaque-${w}.png`));
    await base.clone().webp({ quality: 92 }).toFile(join(ROOT, `logo-plaque-${w}.webp`));
  }
  console.log("✓ plaque variants written");
}

/**
 * Variant 2: Mono Mark — schwarzes Logo auf transparent via chroma-key
 *
 * Strategie:
 *   1. Original auf RAW lesen (RGBA)
 *   2. Pro Pixel: Luminanz berechnen
 *      - Wenn Pixel dunkel ist (< threshold) → behalten, voll opak
 *      - Wenn hell (rosa BG) → alpha=0
 *      - Soft edge zwischen min und max → Alpha-Ramp
 *   3. Sharp baut neues PNG aus RGBA buffer
 */
async function buildMonoMark() {
  const { data, info } = await sharp(SOURCE)
    .trim() // remove uniform border pink
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Expected RGBA, got ${channels} channels`);

  const out = Buffer.alloc(data.length);

  // Soft threshold ramp: <90 = full opaque, >180 = transparent, linear between
  const SOLID = 90;
  const CLEAR = 180;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // perceptual luminance
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    let alpha: number;
    if (lum <= SOLID) alpha = 255;
    else if (lum >= CLEAR) alpha = 0;
    else alpha = Math.round(255 * (1 - (lum - SOLID) / (CLEAR - SOLID)));

    // Force pure black for the visible mark — kills rosa anti-alias bleed
    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = alpha;
  }

  const baseImg = sharp(out, { raw: { width, height, channels: 4 } });

  for (const w of SIZES) {
    const resized = baseImg.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().png({ quality: 92, compressionLevel: 9 }).toFile(join(ROOT, `logo-mono-${w}.png`));
    await resized.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(join(ROOT, `logo-mono-${w}.webp`));
  }
  console.log("✓ mono mark variants written");
}

/**
 * Variant 3: Inverse Mono — cremeweißes Logo (für Dark-BG Sektionen)
 */
async function buildInverseMono() {
  const { data, info } = await sharp(SOURCE)
    .trim()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Expected RGBA`);

  const out = Buffer.alloc(data.length);
  const SOLID = 90;
  const CLEAR = 180;
  // Creme: #F8F4EE
  const FILL_R = 248;
  const FILL_G = 244;
  const FILL_B = 238;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    let alpha: number;
    if (lum <= SOLID) alpha = 255;
    else if (lum >= CLEAR) alpha = 0;
    else alpha = Math.round(255 * (1 - (lum - SOLID) / (CLEAR - SOLID)));

    out[i] = FILL_R;
    out[i + 1] = FILL_G;
    out[i + 2] = FILL_B;
    out[i + 3] = alpha;
  }

  const baseImg = sharp(out, { raw: { width, height, channels: 4 } });
  for (const w of SIZES) {
    const resized = baseImg.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().png({ quality: 92, compressionLevel: 9 }).toFile(join(ROOT, `logo-creme-${w}.png`));
    await resized.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(join(ROOT, `logo-creme-${w}.webp`));
  }
  console.log("✓ creme variants written");
}

async function main() {
  await ensureDir();
  await buildPlaque();
  await buildMonoMark();
  await buildInverseMono();
  console.log("\nDone. Source remains at:", SOURCE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
