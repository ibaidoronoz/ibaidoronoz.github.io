---
project: nakama
title: A mascot that earns every interruption
draft: false
decisions:
  - title: "The interruption policy is the product"
    body: "One pure function receives the event, the context and the current time, and returns a decision: show it, or reject it with a reason. Duplicates, quiet hours, fullscreen, bursts, cooldowns and the hourly budget all live in that one place."
    why: "A rejection is data: with the reasons stored, the policy gets tuned by real use instead of taste."
  - title: "The face never talks to the apps"
    body: "Only the brain holds tokens, calls the tools and keeps the model keys. The mascot receives an already curated feed and confirms what it painted; it queries nothing."
    why: "A second caller is a second place to leak a token or to overshare a fiscal figure."
  - title: "The agent proposes, the human confirms"
    body: "Nothing the model produces is executed directly. A proposal becomes a card with the exact change; the brain calls the app only after confirmation, and the audit records before and after."
    why: "An assistant that can act alone is one bad input away from acting for someone else."
  - title: "Prune the engine instead of inheriting it"
    body: "The first version wrapped a vendored desktop-pet engine. The second deleted it: a layered WinForms window with per-pixel alpha, its own animator, tray and compact chat. About 3.6k lines of C#, with the original attribution kept in NOTICE."
    why: "A fork you do not own is a bug you cannot fix."
  - title: "Sensitive data stays on the machine"
    body: "Tax data is marked sensitive and routed away from voice and cloud providers. A routine set to the local model refuses to run against a non-local URL and records why in its state."
    why: "The safest data is the data that never becomes a request."
stats:
  - { value: '6', label: 'apps on one brain' }
  - { value: '29', label: 'tools, chat and MCP' }
  - { value: '118', label: 'tests across two runtimes' }
  - { value: '6/h', label: 'interruption budget' }
---

## The problem

Six of the things I run can each produce a notification, and every one of them believes its
event matters. The result is a stream of interruptions that costs attention and, worse,
teaches you to ignore the whole stream. The moment that deserves a person looks exactly like
the five that do not.

## What it is

A desktop mascot with a brain behind it. The brain collects events from six of my own tools,
decides whether one deserves to interrupt me, and turns the survivors into a single line the
character can say. The same brain runs a chat with read-only tools, and proposes the changes
I have to confirm.

## Constraints

- Attention is the scarce resource, so the system has to say no far more often than yes.
- Local first: it runs on the machine I work on, over loopback, and nothing leaves it unless I
  ask for the web.
- The mascot must never be the fragile part. If the character crashes, the brain keeps
  collecting.
- No build step in the panel: the process that owns the data serves the UI.

## Architecture

Two processes, one direction of data.

| Process | Owns | Never does |
|---|---|---|
| Brain | policy, inbox, database, model keys, tool catalogue | draw anything |
| Mascot | layered window, animator, tray icon, compact chat | query an app |
| Panel | six views over SSE, same process as the brain | reach outside the brain |

The brain is FastAPI over `sqlite3` from the standard library: no ORM, no Redis, no queue.
Events arrive by push or by poll, the decision is pure, and the inbox holds what survives.
The mascot receives a curated feed, paints one bubble at a time and answers with an ack. The
panel is plain HTML, CSS and ES modules, served by the same process and updated over SSE.

## What the policy refuses

The interesting engineering is the list of reasons to stay quiet:

- Duplicates for 24 hours, and manual silence until I say otherwise.
- Quiet hours overnight, plus suppression while something is fullscreen.
- Bursts grouped into one notice, with a cooldown per source.
- A budget of six shown events per hour. Only `critical` bypasses any of it.

Every rejection is stored with its reason, so the rules can be adjusted against real history
instead of guesses, and a health view groups the last days by reason and source.

## The character

The mascot is a native WinForms app with a layered window and real per-pixel alpha: no colour
key, no vendor engine. Animation is code, not art: nine states declared in a manifest, 240 px
RGBA frames, breathing and transitions applied at load. Costumes come from a festive calendar
and fall back to the base cat when one is missing. A validator checks frames per state, canvas
size, drift and halo before CI accepts the art.

## My role

I designed it, wrote the rules and made the judgement calls: what deserves an interruption,
when the system should give up, which data never leaves the machine. Those rules are written
down in the repo so that any agent — or future me — works under the same constraints.

## Quality and verification

- 102 Python tests and 16 .NET test cases; Ruff with a 100-column limit.
- CI on two runners: Ubuntu for the brain, Windows for the mascot plus the art validator.
- Three architecture decision records and seven interface contracts, written before the code
  that implements them.
- Retention by age for events, messages, web cache and audit, with database size and counters
  exposed by the brain.

## Status and what's next

Running on my desktop every day: six sources, a morning briefing, routines on a schedule, and
a chat that can read the fleet but not write to it. Next is art, not architecture: walk, yawn
and stretch poses from the same character, and more costumes for the calendar.
