// Rewrite root-absolute URLs in a static build so it can be served from a subpath.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
const [dir, sub, portfolio] = process.argv.slice(2); // e.g. dist /berryscottr/quant /berryscottr
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk(dir).filter((f) => /\.(html|js|css)$/.test(f))) {
  let s = readFileSync(f, "utf8"), o = s;
  s = s.replace(/(href|src)="\/(?!\/|__PORTFOLIO__)/g, `$1="${sub}/`);
  s = s.replace(/(["'`])\/data\/site\.json/g, `$1${sub}/data/site.json`);
  s = s.replace(/url\(\/(?!\/)/g, `url(${sub}/`);
  s = s.replace(/\/__PORTFOLIO__\//g, `${portfolio}/`);
  if (s !== o) { writeFileSync(f, s); console.log("rebased", f); }
}
