# Design system

The site has one visual idea: **a control room for software that runs**. Dense where the
data is, calm where the reading is. Every effect has to earn its place; a portfolio with
twelve animations reads as a portfolio with none.

## Constraints that are not negotiable

- **Static only.** No backend, no analytics, no cookies, no third-party fonts or CDNs.
- **Works without JavaScript.** Content, navigation and every project stay reachable with
  JS disabled. `details`, anchors and CSS do the work.
- **`prefers-reduced-motion: reduce` disables all motion**, not just the big one.
- **Zero cost.** GitHub Free + Pages. No paid service, no external image host.
- **Everything in `dist/` is public.** Treat a build artifact as a press release.

## Tokens

Defined once in `src/styles/global.css` under `:root`. Never hardcode a colour, radius or
font stack in a component.

| Token | Meaning |
|---|---|
| `--bg`, `--bg-2` | Page and raised surface |
| `--card`, `--card-strong` | Glass surfaces |
| `--ink`, `--ink-2`, `--muted` | Text hierarchy |
| `--rule` | Hairlines and borders |
| `--cyan`, `--violet`, `--pink` | Brand ramp, used in `--grad` |
| `--accent` | Per-project hex from `projects.yaml` |

Dark only. Colour arrives through `--grad` and the project accent; nothing else introduces a
new hue.

## Type

System fonts only. Identity comes from scale, weight and spacing, not from a downloaded
face:

- Display: `clamp()` steps, weight 750, tracking `-0.03em`.
- Body: 1.0625rem / 1.65.
- Labels and data: mono, uppercase, `0.16em` tracking.

Rules: one h1 per page, no more than three type sizes per section, never centre a paragraph
longer than two lines.

## Motion budget

At most **three signature moments** on the home page:

1. The career timeline: the line draws once, the stops follow.
2. The method pipeline: one step opens at a time.
3. Reveal on scroll, once per section.

Anything else is decoration and should be deleted before adding a fourth. Duration is
200–800 ms; nothing loops forever except an explicit status pulse, and that pulse must be
subtle enough to ignore.

Forbidden: parallax libraries, scroll hijacking, GSAP/Framer Motion, animated gradients on
text, more than the two stack marquee rows.

## Layout

- `--wrap: 72rem`, fluid gutters, no horizontal scroll at 320 px.
- Featured work uses a bento grid: two large cards, four medium. Do not give six cards the
  same weight; hierarchy is the point.
- Case studies: prose max 46rem, with a sticky rail for sections on wide screens.
- Breakpoints at 44rem and 52rem only.

## Visuals

- Every project has a diagram, defined in `projects.yaml` as `diagram: { kind, nodes }`:
  `flow`, `fork`, `layers` or `loop`. `FlowDiagram.astro` renders it with the project accent.
- The three complex ones (Kizuna, Engineering Platform, Oracle) are hand-made inline SVG in
  `src/components/diagrams/` and are referenced by name.
- No screenshots. A local app with demo data reads as a half-finished capture, and the light
  UI of most tools breaks the dark surface.
- Below 52rem the SVG hides and the same nodes render as a vertical list, so the text stays
  legible on a phone.

## Accessibility floor

- Visible focus on every interactive element.
- Colour is never the only carrier of meaning; status has a label.
- `details`/`summary` for expandable content: no custom accordions.
- Axe clean and Lighthouse accessibility ≥ 95 before a PR to `main`.
- The filter buttons keep every project visible when JS is off.

## Performance floor

- No client-side framework, no hydration.
- Total JS shipped under 10 KB, uncompressed.
- No source maps in `dist/`.
- Lighthouse performance ≥ 95 on a throttled mobile run before a PR to `main`.
