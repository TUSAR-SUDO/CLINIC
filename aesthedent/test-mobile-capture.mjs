import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outPath = "C:\\Users\\mahak\\.gemini\\antigravity\\brain\\07226e94-2e15-44bd-a1dc-3d8c94617920\\screenshots\\mobile-fullpage.png";

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
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  console.log("Fullpage mobile screenshot saved to:", outPath);
}

main().catch(console.error);

