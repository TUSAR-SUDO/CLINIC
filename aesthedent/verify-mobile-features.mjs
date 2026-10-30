import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\mahak\\.gemini\\antigravity\\brain\\07226e94-2e15-44bd-a1dc-3d8c94617920\\screenshots";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2200));

  // 1. Initial 390px view showing mobile liquid navbar and top layout
  console.log("Capturing hero-390-liquid-nav.png...");
  await page.screenshot({ path: path.join(outDir, "hero-390-liquid-nav.png"), fullPage: false });

  // 2. Click Hair in the mobile liquid navbar strip
  console.log("Clicking 'Hair' in mobile liquid navbar...");
  const hairPill = await page.evaluate(() => {
    const navItems = Array.from(document.querySelectorAll(".hero__nav-mobile-strip .nimbus-item"));
    const hair = navItems.find((el) => el.textContent.includes("Hair"));
    if (hair) {
      hair.click();
      return true;
    }
    return false;
  });
  console.log("Hair pill clicked:", hairPill);
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(outDir, "switching-test.png"), fullPage: false });

  // 3. Scroll to bottom to inspect the 21st dev LiquidMetalButton inside mobile-bar
  console.log("Scrolling down to inspect bottom bar & footer...");
  await page.evaluate(() => {
    window.scrollTo({ top: 380, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "bottom-liquid-button.png"), fullPage: false });

  // 4. Capture full page
  console.log("Capturing mobile-fullpage.png...");
  await page.screenshot({ path: path.join(outDir, "mobile-fullpage.png"), fullPage: true });

  await browser.close();
  console.log("Verification captures complete!");
}

main().catch(console.error);

