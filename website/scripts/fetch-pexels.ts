import fs from "fs";
import path from "path";

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error("PEXELS_API_KEY missing — set it before running this script");
  process.exit(1);
}

const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.resolve(here, "../public/images");
fs.mkdirSync(outDir, { recursive: true });
const creditsFile = path.join(outDir, "_credits.txt");
fs.writeFileSync(creditsFile, ""); // reset

type Query = {
  name: string;
  query: string;
  orientation: "landscape" | "portrait" | "square";
};

const QUERIES: Query[] = [
  { name: "hero-interior", query: "luxury minimalist living room natural light", orientation: "landscape" },
  { name: "ueber-mich-architecture", query: "elegant architecture detail neutral interior", orientation: "portrait" },
  { name: "region-bergstrasse", query: "southern germany vineyard rolling hills landscape", orientation: "landscape" },
  { name: "home-staging-mood", query: "minimalist home staging dining room taupe", orientation: "landscape" },
  { name: "immobiliensuche-decor", query: "luxury interior elegant ivory neutral", orientation: "portrait" },
  { name: "object-mock-1", query: "villa exterior modern facade luxury", orientation: "landscape" },
  { name: "object-mock-2", query: "penthouse interior premium living minimalist", orientation: "landscape" },
  { name: "object-mock-3", query: "heritage stone house facade germany", orientation: "landscape" },
];

async function fetchOne(q: Query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q.query)}&orientation=${q.orientation}&per_page=1`;
  const res = await fetch(url, { headers: { Authorization: KEY! } });
  if (!res.ok) {
    console.warn(`HTTP ${res.status} for ${q.name}`);
    return;
  }
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) {
    console.warn(`no result for ${q.name}`);
    return;
  }
  const imageUrl = photo.src.large2x ?? photo.src.original ?? photo.src.large;
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) {
    console.warn(`download failed ${imageRes.status} for ${q.name}`);
    return;
  }
  const arrayBuffer = await imageRes.arrayBuffer();
  const out = path.join(outDir, `${q.name}-source.jpg`);
  fs.writeFileSync(out, Buffer.from(arrayBuffer));
  const credit = `${photo.photographer} (Pexels)`;
  fs.appendFileSync(creditsFile, `${q.name}: ${credit} — ${photo.url}\n`);
  console.log(`✓ ${q.name} from ${credit}`);
}

(async () => {
  for (const q of QUERIES) await fetchOne(q);
  console.log("All done.");
})();
