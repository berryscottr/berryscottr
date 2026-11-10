#!/usr/bin/env bash
# Rebuild docs/quant/ (the hosted Pairs Engine results site) from a local clone of the private
# schwab-quant-engine repo. Only the public, guard-checked results bundle is published.
#
#   scripts/update-quant-site.sh /path/to/schwab-quant-engine
set -euo pipefail
SRC="${1:?usage: update-quant-site.sh /path/to/schwab-quant-engine}"
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cp -r "$SRC/site" "$TMP/site"
if [ -f "$SRC/presentation/data/site.json" ]; then mkdir -p "$TMP/presentation/data" && cp "$SRC/presentation/data/site.json" "$TMP/presentation/data/"; fi
cd "$TMP/site"

# Portfolio framing: a banner linking back to the portfolio, and a demo note instead of the draft callout.
node -e '
const fs = require("fs");
let b = fs.readFileSync("src/layouts/Base.astro", "utf8");
if (!/<body>\r?\n/.test(b)) throw new Error("Base.astro: <body> not found; update this patch");
b = b.replace(/<body>\r?\n/, `<body>
    <div style="background:#0b1220;color:#cbd5e1;font:500 13px/1.4 system-ui,sans-serif;padding:8px 16px;text-align:center">
      Research case study from <a href="/__PORTFOLIO__/" style="color:#7dd3fc;text-decoration:none;font-weight:600">Scott Foxley-Berry&#39;s portfolio</a> · private codebase, public results · simulated performance, not an offering
    </div>
`);
fs.writeFileSync("src/layouts/Base.astro", b);
let d = fs.readFileSync("src/pages/disclosures.astro", "utf8");
d = d.replace(/<p class="callout">[\s\S]*?<\/p>/, `<p class="callout"><b>Portfolio demo.</b> This site presents a personal research project as an engineering and data-science case study. It is not an offer, a fund, or a service, and no money is managed or solicited.</p>`);
fs.writeFileSync("src/pages/disclosures.astro", d);
'

npm ci --no-audit --no-fund
npm run build            # sync + bundle guard (refuses pairs/parameters/account fields) + astro build
REBASE="$HERE/scripts/rebase.mjs"
if command -v cygpath >/dev/null; then REBASE="$(cygpath -m "$REBASE")"; fi   # Git Bash on Windows
MSYS_NO_PATHCONV=1 node "$REBASE" dist /berryscottr/quant /berryscottr

rm -rf "$HERE/docs/quant"
cp -r dist "$HERE/docs/quant"
echo "Updated docs/quant from $SRC"
