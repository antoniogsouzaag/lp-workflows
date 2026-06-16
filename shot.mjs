import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

// Hero viewport
await page.screenshot({ path: "shots/hero.png" });

// Full page
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.screenshot({ path: "shots/full.png", fullPage: true });

// Device + watermark area (scroll down para ver o mockup inteiro + watermark)
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.evaluate(() => window.scrollTo(0, 400));
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: "shots/device.png" });

// Sections
const sections = ["solucoes", "fluxo", "casos", "resultados", "contato"];
for (const id of sections) {
  await page.evaluate((sid) => {
    document.getElementById(sid)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: `shots/${id}.png` });
}

await browser.close();
console.log("done");
