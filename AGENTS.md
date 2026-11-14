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
  - email, phone or any contact detail other than the LinkedIn link, the GitHub link and
    `ibaidiezoronoz93@gmail.com` (declared once in `src/data/cv.ts`)
- **No source maps** in production (enforced in `astro.config.mjs` and in the deploy workflow).
- **Excluded projects:** Mugen, Kaizoku, Senko. Do not add them.

## Structure

```
src/data/projects.yaml           single source of truth for every project (structure + English)
src/data/projects.es.yaml        Spanish text per project id, merged at build
src/data/site.ts                 hero, stats, method, experience: one object per language
src/data/cv.ts                   CV content per language, rendered at /cv and /es/cv
src/data/i18n/ui.ts              every chrome string, typed, one object per language
src/data/taxonomy.ts             areas and status labels (keys; labels live in ui.ts)
src/content.config.ts            Zod schemas (build fails on invalid data)
src/content/case-studies/*.md    one per project, English
src/content/case-studies/es/*.md one per project, Spanish (build fails if one is missing)
src/views/*.astro                page bodies; the pages in src/pages are thin wrappers
src/pages/index.astro            home (English); src/pages/es/ mirrors it
src/pages/projects/[id].astro    case-study pages
src/pages/cv.astro               CV page with print styles
src/pages/og/[id].png.ts         social image per project, generated at build with sharp
src/pages/sitemap.xml.ts         sitemap endpoint, with hreflang alternates
src/components/FlowDiagram.astro generated diagram: flow, fork, layers, loop
src/components/diagrams/*        the three hand-made diagrams
src/styles/global.css            the whole design system (system fonts, light + dark)
docs/content-model.md            where every text lives and its limits
docs/design-system.md            tokens, motion budget, accessibility and perf floors
.claude/skills/*                 case-study, copy, publish
.github/workflows/ci.yml         check + build + asset guards on every PR
.github/workflows/deploy.yml     build + deploy to Pages on push to main
```

## Languages

- English is the default and lives at the root. Spanish lives under `/es/` (`prefixDefaultLocale:
  false`, implemented with `src/pages/es/` wrappers over the same views).
- Every project needs a Spanish entry in `projects.es.yaml` and a Spanish case study in
  `src/content/case-studies/es/`. `assertCaseStudies('es')` fails the build otherwise: a
  half-translated site never ships.
- Chrome strings live in `src/data/i18n/ui.ts`; site prose in `src/data/site.ts`. Technical
  names (stack items, company names) stay identical so `/work?tech=` keeps working.
- Cross-links inside Spanish case studies point at `/es/projects/...`.
- Use `path(lang, '/x')` and `altPath(pathname, lang)` from `src/lib/i18n.ts`. Never hardcode
  a locale prefix.

## Theme

- Dark is the CSS default (`:root`) and what a first visit gets; light is `[data-theme='light']`.
  The toggle writes `data-theme` plus `data-theme-mode` and stores the choice (`auto` removes it).
- `auto` is resolved against `prefers-color-scheme` in `Base.astro` before paint. Do not add a
  `prefers-color-scheme` block to `global.css`: that is the drift it was removed for. No JS means
  dark.
- Every colour comes from a token; a hardcoded hex or `rgba()` dark value is what made light look
  dirty (near-black step buttons, a violet fog over the hero).
- Light builds with surfaces, not light: white cards on `--bg`, `--shadow-card` for the lift, and
  `--glow` (100% dark, 40% light) on every coloured shadow. `--wash` (1 / 0) turns the decorative
  accent washes off and the aurora is off in light. Keep it that way when adding a glow.
- Inline SVGs paint with `--dg-*` tokens (`--dg-ink`, `--dg-card`, `--dg-line`, ...). Never
  hardcode a hex in a diagram or it will disappear in one of the two themes.
- Social cards in `og/*.png.ts` are rendered dark on purpose: an image does not follow the
  theme of the page.

## Design

- Two themes. Colour comes from `--grad` and each project's `accent` (hex in `projects.yaml`);
  light and dark only differ in tokens, never in layout or copy.
- Motion is pure CSS/vanilla JS. At most three signature moments on the home page; see
  `docs/design-system.md` for the budget and the forbidden list.
- Everything must stay disabled under `prefers-reduced-motion` and the page must work
  without JS.
- Visuals may illustrate ideas but never invent data (no fake metrics, logs or users).
- `components` renders twice: the name/role strip on the featured card (`index.astro`) and
  the cards in the hand-made diagram of that project. `includes` is bookkeeping only.
- A case study's frontmatter `flow` is ignored when the project has a `diagram`: the diagram
  already shows the architecture.
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
- A translation is the same claim in another language, never a new one: numbers, names and
  trade-offs stay identical across locales.

## CV

- `/cv` and `/es/cv` render from `src/data/cv.ts`; the PDFs live in `public/cv/` and are
  generated by printing that page (Chrome headless, `--print-to-pdf`, A4).
- The only contact details are LinkedIn, GitHub, the site URL and `ibaidiezoronoz93@gmail.com`.
  No phone. The email is declared once in `src/data/cv.ts` and reused by the page, the PDF,
  the footer and the JSON-LD.
- Regenerate both PDFs after touching `cv.ts`; they cannot be verified by the build.

## Verifying

- `npm run verify` before any commit: `astro check` clean and `dist/` produced.
- A Zod error in `projects.yaml` fails the build. Fix the data, never the schema.
- `dist/` is public: no source maps, no secrets, no real data, no heavy assets.

