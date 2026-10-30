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

  console.log("Initial state:", await page.evaluate(() =>
    Array.from(document.querySelectorAll(".panel")).map((p) => p.id + ": " + p.className)
  ));

  // Click dental
  console.log("Clicking #service-dental .panel__hit");
  await page.click("#service-dental .panel__hit");
  await new Promise((r) => setTimeout(r, 600));

  console.log("After clicking Dental:", await page.evaluate(() =>
    Array.from(document.querySelectorAll(".panel")).map((p) => p.id + ": " + p.className)
  ));

  await page.screenshot({ path: path.join(outDir, "dental-test.png"), fullPage: false });

  // Now click Hair
  console.log("Clicking #service-hair .panel__hit");
  await page.click("#service-hair .panel__hit");
  await new Promise((r) => setTimeout(r, 600));

  console.log("After clicking Hair:", await page.evaluate(() =>
    Array.from(document.querySelectorAll(".panel")).map((p) => p.id + ": " + p.className)
  ));

  await page.screenshot({ path: path.join(outDir, "hair-test.png"), fullPage: false });

  await browser.close();
}

main().catch(console.error);

