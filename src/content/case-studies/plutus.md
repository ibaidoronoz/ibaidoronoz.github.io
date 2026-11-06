---
project: plutus
title: Getting taxes right when every data source disagrees
draft: false
stats:
  - { value: '17', label: 'blockchains ingested' }
  - { value: '6', label: 'exchanges, API + CSV' }
  - { value: '230', label: 'passing tests' }
  - { value: '0', label: 'integrity mismatches on real data' }
flow:
  - { label: 'Sources', sub: 'exchanges · brokers · chains' }
  - { label: 'Importers', sub: 'API + CSV' }
  - { label: 'Reconciliation', sub: 'transfer matching' }
  - { label: 'FIFO engine', sub: 'tax lots · disposals' }
  - { label: 'Reports', sub: 'IRPF · 720 · 721' }
---

## The problem

Filing Spanish taxes on crypto and foreign stocks means turning years of raw history from exchanges, brokers and on-chain wallets into IRPF capital gains and Modelo 720/721 figures — FIFO cost basis, per lot, in euros.

Commercial tools ask you to upload your entire financial history to a third-party SaaS. Plutus does the whole job **without your data ever leaving your machine**.

## Constraints

- Numbers must be correct enough to file with the tax agency — zero tolerance for silent errors.
- Every source has its own quirks: CSV exports, APIs and on-chain data that overlap, duplicate and contradict each other.
- Local-first and multi-user, but self-hosted: no platform team, no managed database.

## Architecture

One FastAPI process serves both the API and the built React SPA. Each user gets an **isolated SQLite database**; authentication lives in a separate store.

## Key decisions

1. **One database per user.** Physical isolation eliminates an entire class of data-leak bugs by design — no tenant filter to forget.
2. **Zero-step deploys.** Idempotent migrations run automatically on login: starting the app *is* the deployment.
3. **Single-process engine with in-process locks.** Recalculation, wallet sync and backups are serialised with zero infrastructure, and the invariant is documented and enforced.
4. **FIFO cost basis**, the method Spanish IRPF expects, with lots keyed by `(asset_class, asset)` so stocks and crypto never collide.

## The invariants that keep the numbers honest

Most of the engineering is in rules the type system cannot enforce, written down as a checklist every agent must follow:

- Events are processed in `(timestamp, id)` order — ties sorted by timestamp alone once produced duplicate lots.
- FIFO consumption never raises on insufficient lots; it returns a shortfall, so a lot can never be left half-consumed without a matching disposal.
- A transfer match awaiting review never counts as reconciled — otherwise a real disposal could silently disappear from the tax calculation.
- A rejected match is persisted, not deleted, so the next auto-match run does not recreate it.
- A destructive operation (restore, reset) cancels **and awaits** any in-flight recalculation first.

The same problems as in payment systems: ordering, idempotency, reconciliation and never losing a record.

## My role vs. the agents'

I own the domain rules, the invariants and the audit prompts; agents implement against them. Then agents audit the result under strict rules: an isolated copy of the database, zero writes to production, every claim backed by an executed SQL query or test.

That process caught critical issues long before they could reach a tax return:

- **A missing processing branch for withdrawals** in the engine — found, fixed and verified against real data.
- **An exchange that reuses a "remark" field as a category label** — detected before it could inflate income figures.
- **About 60 internal transfers** that looked like duplicate withdrawal/deposit pairs — all reconciled, verified by a detection query returning zero rows.

## Quality and verification

- **230 passing tests** across importers, engine and reports at the latest audit.
- **Integrity verified on real data**: zero negative lot balances, zero orphan disposals, zero `proceeds − cost ≠ gain` mismatches.
- Architecture, domain and decision records written for both humans and agents.
- Audit verdict: the calculation engine is mathematically correct and consistent across everything verifiable.

## Status and what's next

In personal use for my own crypto and stocks/ETFs portfolio, covering six exchanges, multiple brokers and 17 blockchains.
