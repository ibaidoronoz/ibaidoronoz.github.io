---
project: crypto-market
title: The one I wrote by hand, then rebuilt with agents
draft: false
decisions:
  - title: "Two post types, not one mega-post"
    body: "A multi-token dashboard and a single-token detail view answer two different intents."
    why: "One form with twenty switches would be worse for both."
  - title: "The API key belongs to the subreddit"
    body: "Free, demo and pro tiers are set in the app settings, and the tier decides the refresh rate: fifteen, ten or five minutes. An install with no key still works."
    why: "A key I own is a key I have to pay for, for every community."
  - title: "Cache first, render second"
    body: "Values are stored in Redis and the post is rewritten on a schedule, never on read."
    why: "A popular post should not be able to take down the API."
  - title: "One host, two endpoints"
    body: "Network permissions are limited to api.coingecko.com and pro-api.coingecko.com."
    why: "A narrow permission surface is easy to review and hard to abuse."
  - title: "Legal pages in their own repository"
    body: "The privacy policy and terms are versioned separately from the code."
    why: "A policy change should not require an app release."
stats:
  - { value: '2', label: 'post types, installed per subreddit' }
  - { value: '15 min', label: 'refresh on the free tier' }
  - { value: '5 min', label: 'refresh with a pro key' }
  - { value: '2025', label: 'hand-written first release' }
flow:
  - { label: 'Moderator menu', sub: 'dashboard · fav token' }
  - { label: 'Form', sub: 'tokens · lite · key' }
  - { label: 'CoinGecko', sub: 'one scoped host' }
  - { label: 'Redis', sub: 'cached per subreddit' }
  - { label: 'Cron', sub: 'refresh every 15 min' }
---

## The problem

Crypto communities talk about prices all day, but the data lives outside Reddit: a link, a
screenshot, a chart that is stale by the time someone opens it. A moderator who wants a
market view inside the community has to keep posting new images by hand.

Crypto Market turns that into a post the app maintains: a moderator picks the tokens, and
the post keeps itself current.

## Architecture

A Reddit app built on Devvit Web. React 19 and Vite render the post; an Express server
fetches the data, caches it and rewrites the post on a schedule.

| Piece | Responsibility |
|---|---|
| `src/client` | Dashboard, single-token view, sparklines, lite variants |
| `src/server` | CoinGecko client, cron, forms, menu, triggers, storage |
| `src/shared` | Types, formatting and sparkline maths used by both sides |
| `devvit.json` | Entrypoints, permissions, menu, forms, triggers, scheduler |

Two cron tasks run every fifteen minutes: one refreshes dashboards, the other refreshes
single-token posts. Nothing is fetched when a reader opens the post, so a popular post does
not turn into an API outage.

## My role vs. the agents'

This one has two lives. The first version, in 2025, I wrote by hand: the forms, the post
rendering, the CoinGecko client, the caching. It shipped and ran, and it is where I learned
the platform's sharp edges.

The second version, in 2026, moved to Devvit Web: a React client, a bundled Express server
and the new manifest format. For that migration I set the target architecture, the
contract between client and server, and the acceptance criteria, and I directed agents
through the rewrite. The code was theirs inside those boundaries; I reviewed the diff,
verified it with `devvit playtest` against a real subreddit, and published it.

That order matters. Having built the first version by hand is what made the second one
reviewable: I could tell a good diff from a plausible one.

## Quality and verification

- `devvit playtest` against a live subreddit before every publish; the platform is the test
  harness.
- Network permissions and API surface reviewed at every dependency bump.
- A changelog written for users, not for git.

## Status and what's next

Published on Reddit's developer platform and installable per community. Next: richer
sparkline ranges and a clearer first-run setup for moderators who have no CoinGecko key.
