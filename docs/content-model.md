# Content model

Every visible text about a project comes from one of two files. Components render data;
they never own copy. If a sentence needs to change, it changes in the data file.

| Content | Source | Limits |
|---|---|---|
| Hero, tagline, stats, method, experience, links | `src/data/site.ts` | — |
| Project name, tier, one-liner, highlights, stack | `src/data/projects.yaml` | one-liner ≤ 140 chars, highlights ≤ 4, stack ≥ 1, components ≤ 5 |
| Poster fact (big number or short phrase) | `fact` in `projects.yaml` | one per project |
| Anchor visual | `diagram` in `projects.yaml`: a name or `{ kind, nodes }` | one per project |
| Areas and status labels | `src/data/taxonomy.ts` | keys are typed; adding one is a code change |
| Case study body, stats, flow | `src/content/case-studies/<id>.md` | stats ≤ 4, flow ≤ 6 |
| Design tokens, layout, motion | `src/styles/global.css` | — |

The Zod schema in `src/content.config.ts` is the contract. It runs at build time, so an
invalid field fails `npm run verify` instead of shipping a broken card.

## Tiers

| Tier | Surface | Requirement |
|---|---|---|
| `featured` | Home card + own page | Case study in `src/content/case-studies/<id>.md` |
| `selected` | Expandable card | `highlights` filled |
| `archive` | One-line row | Nothing extra |

`assertCaseStudies()` fails the build when a featured project has no case study or a case
study points at a non-featured project.

## Case study formats

- `format: 'long'` (default): prose, decision cards from `decisions`, sticky section rail.
- `format: 'short'`: three `blocks` (problem, decision, proof) and the diagram. No prose.
- `diagram`: either a name (`kizuna`, `engineering-platform`, `oracle`) or `{ kind, nodes, highlight }`
  with `kind` in `flow | fork | layers | loop` and 3–6 nodes.
- `decisions`: max 6, each `{ title, body, why? }`, rendered as expandable cards.
- `blocks`: max 4, each `{ label, title, body }`; keep each body to two lines.

Every project in the catalogue has at least a short page. Archive rows link to it.

## Two layers of copy

1. **One-liner**: outcome first, no jargon, ≤ 140 characters.
2. **`underTheHood`**: up to four technical facts, collapsed by default.

Layer 2 exists so layer 1 can stay short without hiding anything. A technical reader opens
it; a recruiter never has to.

## Truth rules

- Every claim traces to a repository, a report or `site.ts`. No exceptions.
- Numbers are dated. `2,400+ commits` is not verifiable from outside; a count of exchanges,
  chains, findings or runtimes is.
- Screenshots use fake data. See the `capture` skill.
- Nothing about the employer beyond what `site.ts → experience` already states.
- No email, phone or contact detail other than the LinkedIn link.

## Case study shape

`title` (benefit first) → problem → architecture → key decisions → my role vs. the agents' →
quality and verification → status and what's next.

`draft: true` until the file has no `> TODO` left. Draft case studies still build; they show
a banner.

## Adding a project

Use the `case-study` skill. Do not add a project by editing a page component.
