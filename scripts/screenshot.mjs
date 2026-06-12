import { chromium } from "playwright-core";
import fs from "node:fs";

const OUT = "scripts/shots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function capture(name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${name}-0-intro.png` });

  await page.getByRole("button", { name: /Abrir com amor/ }).click();
  await page.waitForTimeout(4500); // animações do hero
  await page.screenshot({ path: `${OUT}/${name}-1-hero.png` });

  const sections = ["contador", "video", "carta", "carrossel", "galeria"];
  const handles = await page.locator("main > section").all();
  for (let i = 1; i < handles.length; i++) {
    await handles[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}/${name}-${i + 1}-${sections[i - 1] ?? i}.png` });
  }
  await page.close();
}

await capture("desktop", { width: 1440, height: 900 });
await capture("mobile", { width: 390, height: 844 });

await browser.close();
console.log("screenshots OK");
