---
name: copy
description: "Rewrite portfolio copy so it sells without inventing: benefit-first one-liners, a technical layer for engineers, and a list of banned claims. Use it when writing or reviewing any text that appears on the site."
---

# Writing copy that sells without lying

The site's value is that everything on it is true. One invented number costs more than
ten good adjectives earn.

## The rule

**One claim, one source.** Every number, capability and superlative must be traceable to a
repository, a merged PR, an audit report or `src/data/site.ts`. If it is not, it does not
ship. Write `> TODO` and move on.

## Two layers

1. **One-liner** (max 140 chars): what it does, for whom, and the hook. No acronyms that a
   recruiter would have to look up.
2. **`underTheHood`** (max 4 bullets, collapsed): the technical facts a hiring manager
   needs. This is where the architecture, the protocols and the trade-offs live.

Removing detail from layer 1 is not hiding it: layer 2 keeps it, and the collapsed block
reads as confidence rather than clutter.

## Shape of a one-liner

`[outcome the reader cares about] — [concrete proof or context]`

Good:

- `Six exchanges, seventeen blockchains, one correct Spanish tax report.`
- `AI agents that work a ticket end to end — planned, gated and auditable.`
- `Native Android hiking app that works with no signal, no account and no Google.`

Bad:

- `Self-hosted control plane that orchestrates AI coding agents across the ticket lifecycle.`
  (accurate, but it is a feature list; the reader has to translate it)
- `Revolutionary platform that unlocks the power of AI.` (says nothing)

## Banned

Words: revolutionary, seamless, cutting-edge, game-changing, next-generation, world-class,
best-in-class, state-of-the-art, robust, powerful, leverage, unlock, empower, passionate,
synergy.

Patterns, unless the source is cited:

- Percentages of improvement ("reduces fraud by 40%").
- User counts, install counts or revenue.
- "Production-grade" for anything that runs on a personal machine.
- "Enterprise" as an adjective.

Never describe a trade-off as absent. State the decision instead: "SQLite first, Postgres
behind the same port" beats "scales infinitely".

## Voice

- Verb first, present tense, active. `Reconciles`, not `is capable of reconciling`.
- Short sentences. One idea each.
- British spelling in English copy (`prioritised`, `behaviour`) to match the case studies.
- No exclamation marks, no emojis, no rhetorical questions.
- The reader is a hiring manager skimming for eight seconds. The first six words decide.

## Review checklist

1. Can every claim be pointed at a file or a report? If not, cut it.
2. Does the first line say what the thing does, not how it is built?
3. Is there an adjective doing the work a fact should do?
4. Is anything in the text only true for a demo?
5. Does it read well out loud, in one breath?
