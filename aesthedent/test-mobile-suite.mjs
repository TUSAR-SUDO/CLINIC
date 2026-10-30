import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\mahak\\.gemini\\antigravity\\brain\\07226e94-2e15-44bd-a1dc-3d8c94617920\\screenshots";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 1. Mobile 390px initial view (above the fold)
  console.log("Capturing 390px viewport...");
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(outDir, "hero-390.png"), fullPage: false });

  // 2. Mobile 390px full page (entire scrollable content)
  console.log("Capturing 390px full page...");
  await page.screenshot({ path: path.join(outDir, "mobile-fullpage.png"), fullPage: true });

  // 3. Compact mobile 360px viewport
  console.log("Capturing 360px viewport...");
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 2 });
  await page.screenshot({ path: path.join(outDir, "hero-360.png"), fullPage: false });

  // 4. Click Dental card on mobile to test accordion expansion
  console.log("Tapping Dental card...");
  const dentalHit = await page.$("#service-dental .panel__hit");
  if (dentalHit) {
    await dentalHit.click();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, "mobile-accordion-dental.png"), fullPage: false });
  }

  // 5. Open mobile menu
  console.log("Opening mobile menu...");
  const menuBtn = await page.$(".nav-menu");
  if (menuBtn) {
    await menuBtn.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, "mobile-menu-opened.png"), fullPage: false });
  }

  await browser.close();
  console.log("All mobile test captures completed successfully!");
}

run().catch(console.error);

