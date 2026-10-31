import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = "C:\\Users\\mahak\\.gemini\\antigravity\\brain\\07226e94-2e15-44bd-a1dc-3d8c94617920\\screenshots";

async function run() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });

  // Initial wait for load animations
  await new Promise((r) => setTimeout(r, 2600));

  // 1. Initial State (Skin active by default)
  await page.screenshot({ path: path.join(outputDir, "mobile-state-skin.png"), fullPage: false });
  console.log("Saved mobile-state-skin.png");

  // 2. Click "Dental" in top mobile nav
  const dentalNavItem = await page.$('.hero__nav-mobile-strip .nimbus-item');
  if (dentalNavItem) {
    await dentalNavItem.click();
    console.log("Clicked Dental in mobile nav");
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outputDir, "mobile-state-dental.png"), fullPage: false });
    console.log("Saved mobile-state-dental.png");
  }

  // 3. Click "PMU" card directly on stage
  const pmuCard = await page.$('#service-pmu .panel__hit');
  if (pmuCard) {
    await pmuCard.click();
    console.log("Clicked PMU card on stage");
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outputDir, "mobile-state-pmu.png"), fullPage: false });
    console.log("Saved mobile-state-pmu.png");
  }

  await browser.close();
  console.log("Interaction tests completed!");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});

