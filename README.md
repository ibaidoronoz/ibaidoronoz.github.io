<p align="center">
  <img src="public/brand.png" alt="ibai.d.oronoz logo" width="120">
</p>

<h1 align="center">ibai.d.oronoz — Technical Portfolio</h1>

<p align="center">
  <b>Senior Software Engineer · Payments &amp; AI Engineering</b><br>
  Case studies of the systems I design and build with governed AI agents — from payment-grade data pipelines to the platform that orchestrates the agents themselves.
</p>

<p align="center">
  <a href="https://ibaidoronoz.github.io"><img alt="Live site" src="https://img.shields.io/badge/live-ibaidoronoz.github.io-8b5cf6?logo=githubpages&logoColor=white"></a>
  <a href="https://github.com/ibaidoronoz/ibaidoronoz.github.io/actions/workflows/deploy.yml"><img alt="Deploy" src="https://github.com/ibaidoronoz/ibaidoronoz.github.io/actions/workflows/deploy.yml/badge.svg"></a>
  <img alt="Astro" src="https://img.shields.io/badge/built%20with-Astro-BC52EE?logo=astro&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white">
  <img alt="Zero JS deps" src="https://img.shields.io/badge/runtime%20deps-0-4f6bff">
  <a href="https://www.linkedin.com/in/ibai-d-oronoz"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-ibai--d--oronoz-0A66C2?logo=linkedin&logoColor=white"></a>
</p>

---

## ✨ What's inside

- **Featured case studies** — Kizuna, Plutus, Engineering Platform and Kairos: problem, architecture, key decisions, how agents were directed and audited, with headline numbers and an animated pipeline per project
- **How I build with AI** — the six principles behind every project: plan before code, audit before fix, read before write, traceable authorship, explicit over implicit, GO/NO-GO gates
- **Project catalogue** — every other project with its own logo and colour, filterable by area
- **Experience timeline** — payments infrastructure and AI enablement across the Santander ecosystem, and the path before it
- **Live tech marquee** — the professional stack and what the projects add on top

The projects themselves live in **private repositories**. This repo contains only the site — walkthroughs of the code are available on request.

## 🚀 Setup

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

Requires Node.js 22+.

## ➕ Adding a project

Everything is driven by one file: [`src/data/projects.yaml`](src/data/projects.yaml).

```yaml
- id: my-project
  logo: /logos/my-project.png   # 256 px, in public/logos/
  accent: '#8b5cf6'             # card and page colour, taken from the logo
  name: My Project
  tier: selected                # featured | selected | archive
  order: 17
  areas: [ai-agents]            # ai-agents | fintech-data | platform | mobile-desktop | tools
  status: active                # active | personal-production | experiment
  oneLiner: What it does, in one line.
  highlights: [Up to four bullets]
  stack: [TypeScript, Fastify]
```

| Tier | Where it shows | Requires |
|---|---|---|
| `featured` | Big card on the home page + its own case-study page | `src/content/case-studies/<id>.md` |
| `selected` | Expandable card under *More projects* | `highlights` |
| `archive` | One-line row under *Archive & lab* | — |

Data is validated with Zod at build time: a missing case study, an unknown area or a bad colour **fails the build**.

## 🏗️ Architecture

```
src/
  data/
    projects.yaml          — single source of truth for every project
    site.ts                — hero, stats, method, experience, tech stack
    taxonomy.ts            — areas and status labels
  content/case-studies/    — one markdown file per featured project (stats + flow in frontmatter)
  content.config.ts        — Zod schemas for projects and case studies
  components/              — Chips, AiRole, Flow (animated pipeline), WorkflowViz (hero diagram)
  layouts/Base.astro       — shell: header, ambient background, reveal-on-scroll
  pages/
    index.astro            — home
    projects/[id].astro    — case-study pages
  styles/global.css        — the whole design system
public/
  logos/                   — project logos
.github/workflows/deploy.yml — build + deploy to GitHub Pages on push to main
```

## 🎨 Design

- **Brand palette** from the iD logo: blue → violet → magenta. Each project card and case study takes its colour from its own logo.
- **Motion in plain CSS and vanilla JS** — ambient background, reveal on scroll, animated counters, typewriter, card spotlight, animated pipelines. All disabled under `prefers-reduced-motion`, and the page works without JavaScript.
- **System fonts only**, no external requests.

## 🔒 Privacy by design

- Static site: **no backend, no cookies, no analytics, no tracking**.
- No source maps in production — enforced in `astro.config.mjs` and checked again in CI.
- Nothing from private repositories beyond curated descriptions: no code, no hostnames, no real financial data, no secrets.
- The only contact channel is LinkedIn.

## 🚢 Deployment

Every push to `main` triggers [`deploy.yml`](.github/workflows/deploy.yml): install → build → fail if any source map leaked → publish to GitHub Pages. Free, with no infrastructure to maintain.
