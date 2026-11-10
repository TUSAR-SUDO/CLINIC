/* Converts the clinic's skin concern photographs into the focus preview crops.
 * Run from aesthedent/: node scripts/build-focus-images.cjs
 */
const sharp = require("sharp");

const jobs = [
  ["../assets/skin/acne care.png", "public/images/skin/focus-acne.webp"],
  ["../assets/skin/pigmentation.png", "public/images/skin/focus-pigmentation.webp"],
  ["../assets/skin/antiaging.png", "public/images/skin/focus-anti-ageing.webp"],
  ["../assets/hair/hairfall.png", "public/images/hair/focus-hair-fall.webp"],
  ["../assets/hair/scalp treatement.png", "public/images/hair/focus-scalp.webp"],
  ["../assets/pmu/lips.png", "public/images/pmu/focus-lips.webp"],
  ["../assets/pmu/eyeliner.png", "public/images/pmu/focus-eyeliner.webp"],
];

(async () => {
  for (const [src, dest] of jobs) {
    const info = await sharp(src)
      .resize(1120, 1216, { fit: "cover", position: "centre" })
      .webp({ quality: 84, effort: 5 })
      .toFile(dest);
    console.log(dest, `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(0)} KB`);
  }
})();
