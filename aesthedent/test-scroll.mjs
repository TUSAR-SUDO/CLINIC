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
  await new Promise((r) => setTimeout(r, 2000));

  // Scroll down to the doctors and info section
  await page.evaluate(() => {
    window.scrollTo({ top: 460, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: path.join(outDir, "mobile-scrolled-bottom.png"), fullPage: false });
  await browser.close();
  console.log("Saved mobile-scrolled-bottom.png");
}

main().catch(console.error);

