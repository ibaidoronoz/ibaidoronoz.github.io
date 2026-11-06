# AGENTS.md — ibaidoronoz.github.io

Public technical portfolio of Ibai Díez Oronoz, served at https://ibaidoronoz.github.io.
Static Astro site deployed to GitHub Pages by GitHub Actions. Content is in English.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Hard constraints

- **Zero cost.** GitHub Free + GitHub Pages from this public repo. No paid domain, hosting or services.
- **Static only.** No backend, no third-party analytics, no cookies, no external fonts or CDNs.
- **Everything in `dist/` is public.** Never commit or render:
  - LAN hosts or IPs, ports of home services, internal hostnames
  - real financial, tax or personal data (screenshots use fake data only)
  - secrets, API keys, tokens
  - anything about the employer beyond what `src/data/site.ts → experience` already states
  - email, phone or any contact detail other than the LinkedIn link
- **No source maps** in production (enforced in `astro.config.mjs` and in the deploy workflow).
- **Excluded projects:** Mugen, Kaizoku, Senko, Aether. Do not add them.

## Structure

```
src/data/projects.yaml           single source of truth for every project
src/data/site.ts                 hero, stats, method, experience, links
src/data/taxonomy.ts             areas and status labels
src/content.config.ts            Zod schemas (build fails on invalid data)
src/content/case-studies/*.md    one per featured project
src/pages/index.astro            home: hero, featured, method, more projects, experience
src/pages/projects/[id].astro    case-study pages
src/styles/global.css            the whole design system (system fonts, light/dark)
.github/workflows/deploy.yml     build + deploy to Pages on push to main
```

## Design

- Dark only. Colour comes from `--grad` and each project's `accent` (hex in `projects.yaml`).
- Motion is pure CSS/vanilla JS (aurora, reveal on scroll, counters, typewriter, card spotlight).
  Everything must stay disabled under `prefers-reduced-motion` and the page must work without JS.
- Visuals may illustrate ideas but never invent data (no fake metrics, logs or users).

## Tiers

| Tier | Where it shows | Requirement |
|---|---|---|
| `featured` | Big card on home + own page | A case study in `src/content/case-studies/<id>.md` (build fails otherwise) |
| `selected` | Expandable card under "More projects" | `highlights` filled in |
| `archive` | One-line row under "Archive & lab" | — |

## Adding or moving a project

1. Add an entry to `src/data/projects.yaml` (or change its `tier`).
2. If `featured`, add `src/content/case-studies/<id>.md` with `project: <id>`.
3. `npm run build` must pass.

## Writing rules

- Only state facts that are true in the project's repo. If unsure, leave a `> TODO` instead of inventing.
- Case studies follow: problem → constraints → architecture → key decisions → my role vs. the agents' → quality → status.
- Keep `draft: true` until a case study has no TODOs left.
