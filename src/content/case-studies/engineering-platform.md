---
project: engineering-platform
title: The platform behind twenty repositories built with AI agents
draft: false
stats:
  - { value: '20', label: 'repositories, one contract' }
  - { value: '4', label: 'platform components' }
  - { value: '1', label: 'home per skill, zero copies' }
  - { value: '1', label: 'validator for the whole fleet' }
flow:
  - { label: 'Prometheus', sub: 'shared AI context' }
  - { label: 'check --fleet', sub: '20 repositories' }
  - { label: 'Projects', sub: 'built by agents' }
  - { label: 'Torii', sub: 'one gateway' }
  - { label: 'Oracle', sub: 'ops · auto-recovery' }
---

## The problem

With one repo, an agent's instructions live in one file. With twenty, they drift: every project gets its own slightly different rules, the same skill is copied five times, and a fix in one place never reaches the others.

On top of that, twenty services need to run, be reachable, restart when they die and be deployable — by one person, on one machine.

## The pieces

| Component | Role |
|---|---|
| **Prometheus** | Plugin marketplace for Claude Code and the global OpenCode configuration: skills, agents, flows and playbooks. The single home of the shared engineering context. |
| **Torii** | Gateway: one process routes every service by hostname and path. |
| **Oracle** | Control panel for every service: status, logs, metrics, deploys and auto-recovery. A tray app plus a service agent with a React panel. |
| **Festive** | Shared UI engine, vendored into the apps with a drift check. |

## Key decisions

1. **One home per artifact.** Each skill lives in exactly one plugin; the validator fails if a slug appears twice. No sync scripts — if one is ever needed, the design is broken.
2. **A clear rule for where knowledge lives.** A project keeps what its code can falsify: a file, a command, a bug. Prometheus keeps what is true in at least two repos and would survive deleting either. A new skill is born only when two projects already duplicate it — no speculative skills.
3. **Every always-loaded token is a cost.** Only a skill's short description loads in every session; the body loads on demand. Always-on context is not added until a skill proves it is not enough.
4. **A fleet contract, checked by a script.** `check.py --fleet` validates every sibling repo: the agent entry file points at the shared one, the git workflow block is canonical, secrets are denied, and enabled skills match the configuration.
5. **Bounded auto-recovery** (Oracle ADR 0007). A dead service is restarted only if its dependencies are up, within a window of attempts, with a cooldown, until it gives up — no restart storms.
6. **Shared UI code vendored across apps**, with `sync:check` guaranteeing every copy stays identical.

## My role vs. the agents'

This is the system the agents work inside. I designed its rules — where knowledge lives, what gets validated, what an agent may and may not do — so that every repo starts from the same, tested context instead of a prompt someone wrote once.

## Quality and verification

- Prometheus: a validator that must pass before every commit, for the hub and for the whole fleet.
- Oracle: eighty test files and decision records for every non-obvious choice.
- Festive: unit tests, type-checking and a drift check across every copy.

## Status and what's next

In daily use: every project on this page is built on it. It keeps growing the right way — a new shared skill is added the moment two projects need it.
