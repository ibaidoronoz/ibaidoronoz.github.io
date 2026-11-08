# AGENTS.md — ibaidoronoz.github.io

Public technical portfolio of Ibai Díez Oronoz, served at https://ibaidoronoz.github.io.
Static Astro site deployed to GitHub Pages by GitHub Actions. Content is in English.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # astro check (types + content schema)
npm run verify    # check + build: the gate before any commit
```

## Branches and deploys

- `development` is where work lands. `main` is production: a push to it deploys to Pages.
- Never push to `main` directly. Open a pull request from `development` into `main`.
- Commit only when the user asks. One logical change per commit, conventional style, English.
- The deploy workflow runs only on `main`. A green PR does not prove a green deploy.

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
- **Excluded projects:** Mugen, Kaizoku, Senko. Do not add them.

## Structure

```
src/data/projects.yaml           single source of truth for every project
src/data/site.ts                 hero, stats, method, experience, links
src/data/taxonomy.ts             areas and status labels
src/content.config.ts            Zod schemas (build fails on invalid data)
src/content/case-studies/*.md    one per featured project
src/pages/index.astro            home: hero, featured, method, more projects, experience
src/pages/projects/[id].astro    case-study pages
src/pages/og/[id].png.ts         social image per project, generated at build with sharp
src/pages/sitemap.xml.ts         sitemap endpoint
src/components/FlowDiagram.astro generated diagram: flow, fork, layers, loop
src/components/diagrams/*        the three hand-made diagrams
src/styles/global.css            the whole design system (system fonts, dark only)
docs/content-model.md            where every text lives and its limits
docs/design-system.md            tokens, motion budget, accessibility and perf floors
.claude/skills/*                 case-study, copy, publish
.github/workflows/ci.yml         check + build + asset guards on every PR
.github/workflows/deploy.yml     build + deploy to Pages on push to main
```

## Design

- Dark only. Colour comes from `--grad` and each project's `accent` (hex in `projects.yaml`).
- Motion is pure CSS/vanilla JS. At most three signature moments on the home page; see
  `docs/design-system.md` for the budget and the forbidden list.
- Everything must stay disabled under `prefers-reduced-motion` and the page must work
  without JS.
- Visuals may illustrate ideas but never invent data (no fake metrics, logs or users).
- Every project has a diagram, never a screenshot: `flow`, `fork`, `layers` or `loop`, defined
  in `projects.yaml`. The three complex ones stay hand-made in `src/components/diagrams/`.

## Tiers

| Tier | Where it shows | Requirement |
|---|---|---|
| `featured` | Big card on home + own page | A case study in `src/content/case-studies/<id>.md` (build fails otherwise) |
| `selected` | Expandable card under "More projects" | `highlights` filled in |
| `archive` | One-line row under "Archive & lab" | — |

## Adding or moving a project

Use the `case-study` skill. In short:

1. Add an entry to `src/data/projects.yaml` (or change its `tier`).
2. If `featured`, add `src/content/case-studies/<id>.md` with `project: <id>`.
3. `npm run verify` must pass.

## Writing rules

- Only state facts that are true in the project's repo. If unsure, leave a `> TODO` instead of inventing.
- Benefit first, technique second: the one-liner sells, `underTheHood` proves. See the `copy` skill.
- No banned adjectives, no invented percentages, no user counts. See the `copy` skill.
- Case studies follow: problem → constraints → architecture → key decisions → my role vs. the agents' → quality → status.
- Keep `draft: true` until a case study has no TODOs left.

## Verifying

- `npm run verify` before any commit: `astro check` clean and `dist/` produced.
- A Zod error in `projects.yaml` fails the build. Fix the data, never the schema.
- `dist/` is public: no source maps, no secrets, no real data, no heavy assets.

