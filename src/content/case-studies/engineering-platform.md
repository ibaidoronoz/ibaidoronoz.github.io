---
project: engineering-platform
title: The platform behind twenty repositories built with AI agents
draft: false
decisions:
  - title: "One home per artifact"
    body: "Each skill lives in exactly one plugin; the validator fails if a slug appears twice."
    why: "No sync scripts — if one is ever needed, the design is broken."
  - title: "A rule for where knowledge lives"
    body: "A project keeps what its code can falsify: a file, a command, a bug. Prometheus keeps what is true in at least two repos and would survive deleting either."
    why: "A new skill is born only when two projects already duplicate it, never speculatively."
  - title: "Every always-loaded token is a cost"
    body: "Only a skill's short description loads in every session; the body loads on demand."
    why: "Always-on context is not added until a skill proves it is not enough."
  - title: "A fleet contract, checked by a script"
    body: "check.py --fleet validates every sibling repo: entry file, git workflow block, secret rules and enabled skills."
    why: "A convention nobody checks is a convention that drifts."
  - title: "Shared UI vendored, with a drift check"
    body: "Festive is copied into each app and sync:check guarantees every copy stays identical."
    why: "A shared runtime is infrastructure; a checked copy is a dependency you can read."
stats:
  - { value: '20', label: 'repositories, one contract' }
  - { value: '4', label: 'shared layers' }
  - { value: '1', label: 'home per skill, zero copies' }
  - { value: '1', label: 'validator for the whole fleet' }
flow:
  - { label: 'Prometheus', sub: 'shared AI context' }
  - { label: 'check --fleet', sub: '20 repositories' }
  - { label: 'Projects', sub: 'built by agents' }
  - { label: 'Torii', sub: 'one gateway' }
  - { label: 'Festive', sub: 'one UI engine' }
---

## The problem

With one repo, an agent's instructions live in one file. With twenty, they drift: every
project gets its own slightly different rules, the same skill is copied five times, and a
fix in one place never reaches the others.

On top of that, twenty services need to be reachable by hostname and look like one product,
by one person, on one machine.

## The pieces

| Layer | Role |
|---|---|
| **Prometheus** | Plugin marketplace for Claude Code and the global OpenCode configuration: skills, agents, flows and playbooks. The single home of the shared engineering context. |
| **Torii** | Gateway: one process routes every service by hostname and path. |
| **Kagi** | Access gate in front of every route: one login, one cookie, and an identity each app verifies instead of trusting the network. |
| **Festive** | Shared UI engine, vendored into the apps with a drift check. |

Oracle — the control panel for those services — is its own product and has
[its own page](/projects/oracle/). It consumes this platform; it is not a layer of it.

## My role vs. the agents'

This is the system the agents work inside. I designed its rules — where knowledge lives, what
gets validated, what an agent may and may not do — so that every repo starts from the same,
tested context instead of a prompt someone wrote once.

## Quality and verification

- Prometheus: a validator that must pass before every commit, for the hub and for the whole fleet.
- Festive: unit tests, type-checking and a drift check across every copy.
- The contract is tested against the real repositories, not a fixture.

## Status and what's next

In daily use: every project on this page is built on it. It keeps growing the right way — a
new shared skill is added the moment two projects need it.
