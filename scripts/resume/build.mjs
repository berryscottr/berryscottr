// Build resume/RESUME.pdf (and a preview resume.html in this folder) from resume/RESUME.md.
//
//   cd scripts/resume && npm install && npm run build
//
// Conventions in RESUME.md: "### Left side | Right side" renders as a row with the right side
// (dates) right-aligned. Everything else is plain Markdown. Set CHROME to override the browser path.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { marked } from "marked";
import puppeteer from "puppeteer-core";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const md = readFileSync(join(root, "resume", "RESUME.md"), "utf8");

let body = marked.parse(md);
body = body.replace(/<h3>(.*?) \| (.*?)<\/h3>/g, '<h3><span>$1</span><span class="when">$2</span></h3>');
// The first paragraphs after the name are the title and the contact line.
body = body.replace(/(<\/h1>\s*)<p>(.*?)<\/p>\s*<p>(.*?)<\/p>/s, '$1<p class="title">$2</p><p class="contact">$3</p>');
// Section bodies get a wrapper so a heading never ends a page alone.
body = body.replace(/<h2>/g, '</section><section><h2>').replace('</section>', '') + "</section>";

const css = `
@page { size: Letter; margin: 0.45in 0.55in; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 9.3pt/1.38 Inter, "Segoe UI", Arial, sans-serif; color: #1f2937; }
a { color: inherit; text-decoration: none; }
h1 { font-size: 23pt; letter-spacing: .5px; margin: 0; color: #0f172a; font-weight: 800; }
.title { margin: 2px 0 0; font-size: 11.5pt; color: #0369a1; }
.title strong { font-weight: 600; }
.contact { margin: 5px 0 0; font-size: 8.6pt; color: #475569; }
.contact a { white-space: nowrap; }
.contact a { color: #0369a1; }
h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: 1.6px; color: #0369a1; font-weight: 700;
     margin: 13px 0 6px; padding-bottom: 3px; border-bottom: 1.2px solid #cbd5e1; break-after: avoid; }
h3 { display: flex; justify-content: space-between; gap: 12px; font-size: 10.2pt; margin: 9px 0 0; color: #0f172a;
     font-weight: 700; break-after: avoid; }
h3 .when { font-weight: 500; color: #475569; font-size: 9.4pt; white-space: nowrap; }
h3 + p { margin-top: 1px; }
p { margin: 4px 0; }
p em { color: #64748b; }
ul { margin: 3px 0 2px; padding-left: 15px; }
li { margin: 2px 0; padding-left: 2px; break-inside: avoid; }
li::marker { color: #0369a1; }
strong { color: #0f172a; font-weight: 600; }
section > p > strong:first-child { color: #0f172a; }
section h2 + p strong, section h2 ~ p strong { font-weight: 600; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Scott Foxley-Berry — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${body}</body></html>`;
writeFileSync(join(here, "resume.html"), html);

const candidates = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) throw new Error("Chrome not found; set CHROME=/path/to/chrome");

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
const out = join(root, "resume", "RESUME.pdf");
const pdf = await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true, tagged: true });
await browser.close();
const pages = (Buffer.from(pdf).toString("latin1").match(/\/Type\s*\/Page(?!s)/g) || []).length;
console.log(`wrote ${out} (${pages} page${pages === 1 ? "" : "s"})`);
if (pages > 2) { console.error("Resume is longer than two pages; tighten RESUME.md or the CSS."); process.exitCode = 1; }
