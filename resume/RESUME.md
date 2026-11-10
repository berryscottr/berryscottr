# SCOTT FOXLEY-BERRY

**Backend & Platform Engineer**

Atlanta, Georgia 30317 • [berryscottr@gmail.com](mailto:berryscottr@gmail.com) • [berryscottr.github.io/berryscottr](https://berryscottr.github.io/berryscottr/) • [linkedin.com/in/scott-foxley-berry-44685694/](https://www.linkedin.com/in/scott-foxley-berry-44685694/)

## Summary

Backend and platform engineer with 8 years of experience building and operating production systems. Design Go services and automation on Kubernetes and GKE at The Home Depot for a platform serving more than 4,000 internal services and over 2 billion requests a day, and lead incident response for it. Own work end to end, from requirements through deployment, observability, and operational support, and apply a data-science background (M.S., Indiana University) to reliability and analysis problems.

## Technical Skills

**Languages:** Go, Python, SQL, Bash; also Rust, Scala

**Backend:** REST APIs, OpenAPI, PostgreSQL, GraphQL clients, server-rendered web (htmx), distributed systems

**Platform & Cloud:** Kubernetes, GKE, Docker, Terraform, Ansible, AWS, Linux, Railway

**Reliability & CI/CD:** GitHub Actions, Prometheus, Grafana, incident response and root-cause analysis, automated testing, release automation

**Data:** BigQuery, Kafka, Elasticsearch, MongoDB, Spark, ETL pipelines, Polars, NumPy, Numba, statsmodels, NLP, machine learning

## Professional Experience

### The Home Depot — Systems Engineer II | Dec 2020 – Present

*Atlanta, Georgia*

- Design and build backend services, APIs, and operational tooling in Go and Python for a Kubernetes/GKE platform serving more than 4,000 internal services and over 2 billion requests a day
- Lead incident response, root-cause analysis, and long-term remediation for critical production issues and service disruptions
- Own CI/CD pipelines in GitHub Actions that automate testing, validation, and deployment across Go and Python projects
- Build observability with Prometheus, Grafana, and custom telemetry to speed up debugging and improve service reliability
- Turn requirements from infrastructure, security, and application teams into scalable self-service tooling

**Selected projects**

- **Watchdog:** architected, and continue to lead, a production Go service that makes traffic-advertisement and health-validation decisions for thousands of services. Rule-based and anomaly-detection health evaluation determines service readiness and traffic eligibility. Exposes REST/JSON APIs with OpenAPI specifications, automated API documentation, and Prometheus metrics
- **Bifrost Bot:** designed and maintain a Go Slack application on GKE that automates infrastructure promotions, service health reporting, documentation discovery, and customer escalations, integrating multiple internal systems
- **Infrastructure validation:** created a centralized smoke-testing platform (Go, Python, GitHub Actions) that validates infrastructure health and deployment readiness, with automated certificate-expiration detection, service validation, and documentation quality checks
- **Proxy migration data platform:** led an ETL and migration platform for moving customer services to a new proxy architecture. Python and BigQuery workflows apply NLP and machine-learning classification to identify ownership and migration requirements, reducing manual triage and speeding adoption

### Featurespace — Implementation Engineer | Jul 2019 – Dec 2020

*Atlanta, Georgia*

- Deployed and supported financial fraud-detection platforms on AWS-hosted Linux infrastructure
- Operated Kafka, Elasticsearch, MongoDB, and Zookeeper for large-scale event processing and analytics workloads
- Automated deployment, configuration management, and operational support in Python and Bash
- Supported customers through system integrations, data migrations, and production deployments

### Noble Systems Corporation — Implementation Engineer | May 2018 – Jul 2019

*Atlanta, Georgia*

- Installed, configured, and supported enterprise software platforms across Linux and Windows environments
- Administered PostgreSQL databases, including configuration management, operational reporting, and customer data
- Wrote Python and Bash automation for deployment and operations, and delivered technical training to customers

## Projects

### Magic 8-Ball — live web app for APA pool league teams | 2022 – Present

*Go, PostgreSQL, htmx, Docker, GitHub Actions, Railway* · Live demo: [magic-8ball.up.railway.app/demo](https://magic-8ball.up.railway.app/demo)

- Built and run a production web app, in private beta with real league teams, for attendance, legal-lineup checks, and match-night tools. Rosters, skill levels, and schedules sync from the APA's GraphQL API every 15 minutes
- Hardened it for the public internet: APA sign-in without storing passwords, hashed session tokens, a strict Content Security Policy, same-origin checks on writes, rate limiting, and parameterized SQL
- Made CI the deploy gate: staticcheck, race-enabled tests against Postgres with a coverage floor, govulncheck, Docker builds, and headless-Chrome smoke tests, with separate dev and production environments
- Migrated it from a Python Discord bot to a ~29 MB distroless Go service, with parity tests against the original outputs and 21 architecture decision records

### Pairs Engine — statistical-arbitrage research platform | 2026 – Present

*Python, Polars, NumPy, Numba, statsmodels, Parquet, Astro* · Results: [berryscottr.github.io/berryscottr/quant](https://berryscottr.github.io/berryscottr/quant/)

- Scan 1,000 to 3,000 US stocks each week for cointegrated pairs using vectorized Engle-Granger and ADF tests, verified against statsmodels, on resumable, validated minute-bar data ingestion
- Built a walk-forward, minute-bar backtester with realistic costs and no look-ahead. All 4,699 configurations tried are logged for Deflated Sharpe and overfitting-probability checks, and a one-shot holdout was read against pre-registered pass bands
- Engineered for reproducibility: bit-identical results regardless of worker count, provenance fingerprints on every derived artifact, and more than 140 automated tests

## Education

### Indiana University — Master of Science in Data Science | 2022

Machine learning and cybersecurity concentration; GPA 3.63. Research project on detecting crime rationalizations in online discussions using NLP and classification models.

### Georgia Institute of Technology — Bachelor of Science in Industrial Engineering | 2018

Quality and statistics concentration. Senior design project with TUG Technologies, an integer-programming platform to improve assembly-line efficiency, won Overall Best Project in Georgia Tech Industrial Engineering.

## Activities & Volunteering

Competitive swimmer · Billiards team captain · Former swim team head coach and swimming referee · Math tutor · Trees Atlanta volunteer · Special Olympics fundraiser and donor
