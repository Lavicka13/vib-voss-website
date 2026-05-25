import sharp from "sharp";

const src = new URL("../public/images/logo/logo-source.png", import.meta.url).pathname;
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const samples = [
  [5, 5],
  [width - 6, 5],
  [5, height - 6],
  [width - 6, height - 6],
  [10, 10],
  [(width / 2) | 0, 5],
  [5, (height / 2) | 0],
];

const rgbs = [];
for (const [x, y] of samples) {
  const i = (y * width + x) * 4;
  const r = data[i], g = data[i + 1], b = data[i + 2];
  rgbs.push([r, g, b]);
  console.log(`(${x},${y})  rgb(${r}, ${g}, ${b})  #${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`);
}

const sum = rgbs.reduce(([sr, sg, sb], [r, g, b]) => [sr + r, sg + g, sb + b], [0, 0, 0]);
const avg = sum.map((v) => Math.round(v / rgbs.length));
console.log(`\nAvg: rgb(${avg.join(", ")})  #${avg.map((v) => v.toString(16).padStart(2, "0")).join("")}`);
