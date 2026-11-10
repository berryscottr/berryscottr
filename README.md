<a href="https://berryscottr.github.io/berryscottr/">
  <img src="docs/assets/banner.png" alt="Scott Foxley-Berry: Backend & Data Engineer, Atlanta GA" width="100%">
</a>

<p align="center">
  <a href="https://berryscottr.github.io/berryscottr/"><img src="https://img.shields.io/badge/Portfolio-berryscottr.github.io-0ea5e9?style=for-the-badge&logo=githubpages&logoColor=white" alt="Portfolio"></a>
  <a href="resume/RESUME.pdf"><img src="https://img.shields.io/badge/Resume-PDF-10b981?style=for-the-badge&logo=readdotcv&logoColor=white" alt="Resume"></a>
  <a href="https://www.linkedin.com/in/scott-foxley-berry-44685694/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="mailto:berryscottr@gmail.com"><img src="https://img.shields.io/badge/Email-Say%20hello-f59e0b?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>

<p align="center"><i>Hello there.</i> I build backend systems that stay up and data work that holds up under scrutiny.</p>

|  |  |  |  |
|:---:|:---:|:---:|:---:|
| **8 years**<br><sub>backend, data & platform engineering</sub> | **2B+ requests/day**<br><sub>across 4,000+ services at The Home Depot</sub> | **M.S. Data Science**<br><sub>Indiana University · ML & cybersecurity</sub> | **B.S. Industrial Eng.**<br><sub>Georgia Tech · best senior design project</sub> |

---

## 🚀 Featured work

Both flagship projects are private repos. Each one has a public demo you can open right now.

### 🎱 Magic 8-Ball: match-night app for APA pool league teams

<a href="https://magic-8ball.up.railway.app/demo"><img src="docs/assets/m8b.png" alt="Magic 8-Ball: desktop and phone views of the live demo" width="100%"></a>

<p>
  <a href="https://magic-8ball.up.railway.app/demo"><img src="https://img.shields.io/badge/▶%20Try%20the%20live%20demo-magic--8ball.up.railway.app-22c55e?style=flat-square" alt="Live demo"></a>
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/htmx-3366CC?style=flat-square&logo=htmx&logoColor=white" alt="htmx">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white" alt="Railway">
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions">
</p>

Captains share one link per team. Players tap their name once, answer In, Late, or Out, and see a legal lineup form as answers arrive. One answer covers every team a player has that night. Captains sign in with their APA account to get the full board, opponent rosters, and match-night strategy tools. Rosters, skill levels, and schedules sync from the APA every 15 minutes.

- **Production service, owned end to end:** a single Go binary that runs the web app, the background APA sync, and the demo, backed by Postgres with embedded migrations. It deploys to Railway with separate dev and production environments.
- **Built to be safe on the public internet:** captains sign in with APA credentials, but passwords are never stored. Session tokens are kept only as hashes. The app uses a strict CSP with no inline script, same-origin checks on every write, per-IP rate limits, and parameterized SQL only.
- **CI is the deploy gate:** gofmt, vet, staticcheck, race-enabled tests against a real Postgres with a coverage floor, govulncheck, a Docker build, and a headless-Chrome smoke test. Railway deploys only after CI passes, and CI also enforces the branching policy.
- **Evolved, not rewritten:** it started in 2022 as a Python Discord bot and became a Go web app. The original formulas were ported and parity-tested against the old outputs, and the image shrank from Python + Chromium to a ~29 MB distroless binary. 21 architecture decision records document why things are the way they are.

### 📈 Pairs Engine: market-neutral statistical-arbitrage research platform

<a href="https://berryscottr.github.io/berryscottr/quant/"><img src="docs/assets/quant.png" alt="Pairs Engine: interactive research results site" width="100%"></a>

<p>
  <a href="https://berryscottr.github.io/berryscottr/quant/"><img src="https://img.shields.io/badge/▶%20Explore%20the%20results-interactive%20site-3b82f6?style=flat-square" alt="Results site"></a>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Polars-CD792C?style=flat-square&logo=polars&logoColor=white" alt="Polars">
  <img src="https://img.shields.io/badge/NumPy%20%2B%20Numba-013243?style=flat-square&logo=numpy&logoColor=white" alt="NumPy + Numba">
  <img src="https://img.shields.io/badge/statsmodels-4051b5?style=flat-square" alt="statsmodels">
  <img src="https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro">
</p>

Every week the engine scans 1,000 to 3,000 liquid US stocks for pairs whose prices are cointegrated. It trades their temporary divergences in a minute-bar simulator with realistic costs. Above all, it's an exercise in **not fooling yourself** with a backtest.

- **Whole-market discovery:** vectorized Engle-Granger and ADF tests, verified against statsmodels, run over the market every week. Data comes from Alpaca (SIP minute bars) and SEC EDGAR, stored in Parquet with resumable, validated ingest.
- **Honest validation:** a walk-forward design with no look-ahead (fills land on the next bar), a tune / validation / holdout split, and a trial ledger covering all **4,699 configurations** tried. That ledger feeds a Deflated Sharpe ratio and the probability of backtest overfitting (PBO). Parameters were chosen as interior points of profitable plateaus, never as the single best point.
- **A pre-registered holdout, reported straight:** the final year was read once, against pass bands committed in advance. The result (excess Sharpe 0.16, "weak but positive") is published as-is, not tuned away.
- **Engineering discipline:** results are bit-identical for any worker count, invariant checks run on every result path, every known pitfall has a guard and a test (140+ tests), and every derived artifact carries a provenance fingerprint.

<sub>Simulated research results, not live trading or an offering. The codebase is private; the results site shows aggregates only.</sub>

---

## 🏢 At The Home Depot (Systems Engineer II · 2020 to present)

| Project | What I built |
|---|---|
| **Watchdog** | A production Go service that decides traffic advertisement and health validation for thousands of services, using rule-based and anomaly-detection health evaluation. It exposes REST/OpenAPI endpoints and Prometheus metrics. |
| **Bifrost Bot** | A Go Slack app on GKE that automates infrastructure promotions, health reporting, documentation discovery, and escalations. |
| **Infra validation** | A centralized smoke-testing platform (Go, Python, GitHub Actions) that checks deployment readiness, certificate expiry, and documentation quality. |
| **Migration ETL** | Python and BigQuery pipelines that use NLP and ML to classify service ownership and drive a proxy-architecture migration. |

<sub>Earlier: Implementation Engineer at <b>Featurespace</b> (fraud-detection platforms on AWS with Kafka, Elasticsearch, and MongoDB) and at <b>Noble Systems</b> (PostgreSQL, Linux, deployment automation). Full details in the <a href="resume/RESUME.md">resume</a>.</sub>

## 🧰 Toolbox

<p align="center">
  <img src="https://skillicons.dev/icons?i=go,py,rust,scala,bash,postgres,mongodb,elasticsearch,kafka,docker&perline=10" alt="Languages and data stores"><br>
  <img src="https://skillicons.dev/icons?i=kubernetes,gcp,aws,terraform,ansible,githubactions,prometheus,grafana,linux,astro&perline=10" alt="Cloud, infrastructure and observability">
</p>

**Also:** BigQuery · Spark · Hadoop · OpenAPI · htmx · polars · numba · statsmodels · NLP · ML classification · time-series statistics · integer programming · AI-assisted engineering (agent-ready repos with per-package guides and project skills)

## 🗂️ More projects

| Project | About |
|---|---|
| [apa-rankings](https://github.com/berryscottr/apa-rankings) | Classification models that predict APA match results. This was the seed of Magic 8-Ball. |
| [nfl_ref_sentiment](https://github.com/berryscottr/nfl_ref_sentiment) | Reddit game-thread NLP: how win-probability swings change sentiment toward referees. |
| [palantir](https://github.com/berryscottr/palantir) | A Lord of the Rings chatbot trained on the books. |
| [DataVisualization](https://github.com/berryscottr/DataVisualization/blob/main/spotify.ipynb) | Visual analysis of my Spotify streaming history. |
| [Go-Thats-A-Baseball](https://github.com/berryscottr/Go-Thats-A-Baseball) | Machine learning in Go, aimed at beating Vegas MLB lines. |
| [cfb-rankings-superleague-edition](https://github.com/berryscottr/cfb-rankings-superleague-edition) | "The definitive CFB rankings." |
| [pure-pazaak](https://github.com/berryscottr/pure-pazaak) | The Pazaak card game, written in Rust. |

<p align="center"><sub>Atlanta, GA · swimmer, billiards team captain, Trees Atlanta volunteer</sub></p>
