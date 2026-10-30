import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = "C:\\Users\\mahak\\.gemini\\antigravity\\brain\\07226e94-2e15-44bd-a1dc-3d8c94617920\\screenshots";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { name: "hero-1440.png", width: 1440, height: 900 },
  { name: "hero-1024.png", width: 1024, height: 768 },
  { name: "hero-768.png", width: 768, height: 1024 },
  { name: "hero-390.png", width: 390, height: 844 },
];

async function capture() {
  console.log("Launching browser with path:", chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
    // Wait for hero animations and webgl initialization
    await new Promise((r) => setTimeout(r, 2500));

    const outPath = path.join(outputDir, vp.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
