---
name: case-study
description: "Add, move or deepen a project on the portfolio: projects.yaml, tier rules, case-study frontmatter and the build check. Use it when a project is added, promoted, demoted or gets a case study."
---

# Adding or moving a project

The portfolio is data-driven. Every visible text about a project comes from
`src/data/projects.yaml` or from `src/content/case-studies/<id>.md`. Never hardcode
project content in a page or component.

## Where things live

| What | File |
|---|---|
| Project list, tiers, one-liners, stack | `src/data/projects.yaml` |
| Areas and status labels | `src/data/taxonomy.ts` |
| Schema and limits (build fails if invalid) | `src/content.config.ts` |
| Case studies | `src/content/case-studies/<id>.md` |
| Home page | `src/pages/index.astro` |
| Case-study page | `src/pages/projects/[id].astro` |

## Fields and hard limits

Enforced by Zod in `src/content.config.ts`. A violation fails `npm run build`.

- `id`: kebab-case, must match the case-study filename when featured.
- `tier`: `featured` | `selected` | `archive`.
- `order`: integer. Featured 1–9, selected 10–19, archive 20+.
- `areas`: one or more keys of `AREAS` in `src/data/taxonomy.ts`.
- `status`: one key of `STATUS`.
- `oneLiner`: **max 140 characters**, benefit first, no jargon. See the `copy` skill.
- `highlights`: max 4, each a concrete fact. Required for `selected`.
- `stack`: at least one item, real technologies from the repo.
- `underTheHood`: max 4 technical facts, shown in a collapsed block. Optional.
- `logo`: optional, must start with `/logos/` and exist in `public/logos/`.
- `accent`: `#rrggbb`.
- `includes`: other repos merged into this entry (e.g. `Engineering Platform`).

## Tiers

| Tier | Where it shows | Requirement |
|---|---|---|
| `featured` | Big card on the home and its own page | A case study in `src/content/case-studies/<id>.md` |
| `selected` | Expandable card under "More projects" | `highlights` filled in |
| `archive` | One-line row | Nothing extra |

`assertCaseStudies()` in `src/lib/projects.ts` throws if a featured project has no case
study, or if a case study points at a project that is not featured. Do not work around it:
fix the data.

## Steps

1. Read the real repo (`AGENTS.md`, `README.md`, `docs/`) before writing anything. Every
   claim must be traceable to something in that repo. If a number is not verifiable,
   leave `> TODO` in the case study instead of inventing it.
2. Edit `src/data/projects.yaml` (or change the `tier` of an existing entry).
3. If `featured`, create `src/content/case-studies/<id>.md`:

   ```markdown
   ---
   project: <id>
   title: <one line, benefit first>
   draft: true
   stats:
     - { value: '164', label: 'audit findings, prioritised' }
   flow:
     - { label: 'Trigger', sub: 'Jira · GitHub · cron' }
   ---

   ## The problem
   ## Architecture
   ## Key decisions
   ## My role vs. the agents'
   ## Quality and verification
   ## Status and what's next
   ```

   `stats` is max 4, `flow` max 6. `draft: true` until the file has no TODOs left.
4. Point the logo at an existing file, or drop the `logo` field. Never reference a path
   that does not exist.
5. Run `npm run verify`.

## Traps

- A `oneLiner` over 140 characters breaks the build, not the layout.
- `areas` and `status` are typed from `taxonomy.ts`. Adding a new key is a code change,
  not a data change: update the map and the `AREAS`/`STATUS` consumers.
- Moving a project from `featured` to `selected` leaves an orphan case study and fails the
  build. Delete or reassign the file in the same change.
- The site is public: no LAN hostnames, ports, real financial data or employer details
  ever land in this file.
