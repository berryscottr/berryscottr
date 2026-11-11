---
name: portfolio-project
description: Add or refresh a personal project across Scott's public presence - the profile README, the resume (Markdown + PDF), the GitHub Pages portfolio site, and a paste-ready LinkedIn About (linkedin_about.txt). Use when asked to "add <project> to my portfolio/resume/README", "feature <project>", "update my LinkedIn About", or after a project launches or changes status.
---

# Add a project to the portfolio

Works in this repo (`berryscottr`, **public**). The source project is usually a private sibling
repo under `D:\workspace\<project>`. Argument: the project folder name (e.g. `shelved`).

## 0. Ground rules

- **Public repo.** Only publishable facts: what it does, stack, engineering practices, live URLs.
  No source code, secrets, env var values, admin URLs, internal hostnames, PINs, or account names.
- Respect each project's confidentiality rule in `~/.claude/CLAUDE.md` (e.g. magic-8ball: no code or
  strategy details; schwab-quant-engine: aggregates only, no pairs/parameters/broker). If the source
  project has its own "don't say" rules (trademarks, competitors it must not be compared to), follow them.
- **Never invent metrics.** Use only numbers you can count in the source repo (ADRs, tests, CI jobs,
  dates in git/docs) or that already appear in this repo. No user/traffic numbers unless the owner gives them.
- Voice: README and site in first person sparingly, resume in implied first person (no "I"), present
  tense for ongoing work. LinkedIn in first person. Professional, a little warm, no hype.
- Work on a branch (`feat/<project>`); ask before pushing or opening a PR.

## 1. Gather facts (read, don't guess)

From the source repo read `CLAUDE.md`, `README.md`, `docs/status.md`, `docs/decisions.md` (count ADRs:
`grep -c '^## ADR' docs/decisions.md`), `docs/security.md`, and `.github/workflows/*.yml` (CI jobs).
Write down: one-line pitch, who uses it, live URL, status/launch date, stack, 3-4 engineering
highlights with evidence, and anything that must not be said publicly.

## 2. Showcase image -> `docs/assets/<project>.png`

```sh
cd scripts/resume && npm install   # once
node showcase.mjs --url <public live URL> --out ../../docs/assets/<project>.png \
  --caption "<status line>" --bg1 "<dark brand color>" --bg2 "<darker>" --dot "<accent>"
```

Only public pages (never the dev/admin site). Open the PNG and check it: no secrets, no dev banners,
readable at half size. 2560x1440 like `m8b.png` and `quant.png`.

## 3. README.md

- "Featured work": add a `### <emoji> <Name>: <pitch>` block in the same shape as the others
  (linked image, badge row with a "▶ Try it" badge + shields.io stack badges, one paragraph, 3-4 bold-led
  bullets). Order by strength for a backend/platform hiring manager.
- Update the "Both/All flagship projects are private" sentence to the right count.
- Add new tools to the Toolbox "Also" line only if they are real and missing.

## 4. Portfolio site `docs/index.html`

- Hero: add a CTA button if the project has a live URL.
- `#work`: add an `<article class="project">` (alternate `flip` so images zig-zag) with badge, h3,
  paragraph, `<ul>` highlights, `.stack` chips, `.ctas`. Update the section `.sub` sentence count.
- Strengths cards: add the project to the `.proof` line where it is real evidence.
- Keep the page's own rules: tokens in `:root`, works at 390px, no new third-party scripts.
- Preview it (open the file in the browser pane) at desktop and 390px wide.

## 5. Resume `resume/RESUME.md` -> `resume/RESUME.pdf`

- Add under `## Projects` as `### <Name> — <pitch> | <years>`, an italic stack line with the live link,
  then 2-3 bullets (implied first person, impact first).
- Keep it to the same page count. Check with the build; trim older/weaker bullets if it spills.
- Build: `cd scripts/resume && npm run build`, then read `resume/RESUME.pdf` to check layout.

## 6. LinkedIn About -> `linkedin_about.txt`

- Start from the current text in `D:\workspace\notes\career\linkedin.md` (private notes).
- Rewrite with the new project; plain text only (LinkedIn strips Markdown), bullets as `•`, arrows `→`.
  Keep under 2,600 characters (aim for 1,200-1,800). First person.
- Save to `D:\workspace\notes\career\linkedin_about.txt` (private notes, not this public repo), and
  update the "About (current)" block and character count in `notes/career/linkedin.md`.
- If the headline or Featured links should change, add them to that file's "To do on LinkedIn" list.

## 7. Verify and hand off

- `git diff --stat`; no secrets (`git diff | grep -iE 'pin|token|password|secret|DATABASE_URL'`).
- Links: every new URL returns 200 (`curl -sI`).
- Resume PDF rebuilt; site previewed at 390px.
- Commit on the branch. Ask before pushing or opening the PR (GitHub Pages deploys from `main`).
- Update the project's row in `D:\workspace\CLAUDE.md` if its status changed.
