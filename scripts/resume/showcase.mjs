// Build a 2560x1440 project showcase image (desktop browser + phone, caption) from a live URL.
// Used for docs/assets/<slug>.png in the README and portfolio site.
//
//   cd scripts/resume && npm install
//   node showcase.mjs --url https://example.up.railway.app --out ../../docs/assets/example.png \
//     --caption "Live since 2026 · ..." [--bg1 "#1b2a22"] [--bg2 "#0b0f0d"] [--dot "#22c55e"] [--wait 1500]
//
// Lives next to the resume builder so it shares its puppeteer-core install. Set CHROME to override the
// browser path. Only screenshot public pages; never a signed-in or admin view.
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import puppeteer from "puppeteer-core";

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) =>
  (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]]] : acc), []));
const url = args.url, out = args.out, caption = args.caption || "";
if (!url || !out) { console.error("usage: node showcase.mjs --url URL --out FILE.png --caption TEXT"); process.exit(2); }
const bg1 = args.bg1 || "#1b2a22", bg2 = args.bg2 || "#0b0f0d", dot = args.dot || "#22c55e";
const wait = Number(args.wait || 1500);

const candidates = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) { console.error("No Chrome found; set CHROME"); process.exit(1); }

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const browser = await puppeteer.launch({ executablePath, headless: true });
try {
  const shoot = async (viewport, ua) => {
    const page = await browser.newPage();
    if (ua) await page.setUserAgent(ua);
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, wait));
    const b64 = await page.screenshot({ encoding: "base64", type: "png" });
    await page.close();
    return `data:image/png;base64,${b64}`;
  };
  const desktop = await shoot({ width: 1100, height: 700, deviceScaleFactor: 2 });
  const phone = await shoot({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36");
  const host = new URL(url).host + new URL(url).pathname.replace(/\/$/, "");

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:1280px;height:720px;overflow:hidden;font-family:Inter,"Segoe UI",system-ui,sans-serif;
    background:radial-gradient(900px 500px at 20% 0%,${bg1},transparent 70%),linear-gradient(160deg,${bg1},${bg2} 70%);border-radius:24px}
  .win{position:absolute;left:56px;top:70px;width:820px;height:560px;border-radius:16px;overflow:hidden;background:#0d1117;
    box-shadow:0 30px 80px -20px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.06)}
  .bar{height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#161b22;border-bottom:1px solid rgba(255,255,255,.06)}
  .bar i{width:12px;height:12px;border-radius:50%;display:block}
  .addr{margin-left:18px;flex:0 1 520px;height:24px;border-radius:7px;background:#0d1117;color:#8b949e;font:500 13px/24px ui-monospace,Consolas,monospace;padding:0 12px}
  .win img{width:820px;display:block}
  .phone{position:absolute;right:70px;top:46px;width:270px;height:584px;border-radius:40px;padding:10px;background:#0b0b0d;transform:rotate(4deg);
    box-shadow:0 40px 90px -20px rgba(0,0,0,.8),0 0 0 2px rgba(255,255,255,.08)}
  .phone img{width:250px;height:564px;object-fit:cover;object-position:top;border-radius:31px;display:block}
  .cap{position:absolute;left:52px;bottom:30px;display:flex;align-items:center;gap:12px;color:#ecfdf5;font:600 18px/1.3 Georgia,serif}
  .cap b{width:14px;height:14px;border-radius:50%;background:${dot};box-shadow:0 0 0 5px color-mix(in srgb,${dot} 25%,transparent)}
  </style></head><body>
  <div class="win"><div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><div class="addr">${esc(host)}</div></div><img src="${desktop}"></div>
  <div class="phone"><img src="${phone}"></div>
  ${caption ? `<div class="cap"><b></b>${esc(caption)}</div>` : ""}
  </body></html>`;

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "load" });
  const png = await page.screenshot({ type: "png", omitBackground: true });
  writeFileSync(resolve(out), png);
  console.log("Wrote", resolve(out));
} finally {
  await browser.close();
}
