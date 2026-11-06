---
project: kizuna
title: Governed AI engineering, as a product
draft: false
stats:
  - { value: '164', label: 'audit findings, prioritised' }
  - { value: '9', label: 'audit dimensions' }
  - { value: '8', label: 'agent runtime adapters' }
  - { value: '7', label: 'architecture decision records' }
flow:
  - { label: 'Trigger', sub: 'Jira · GitHub · cron' }
  - { label: 'Workflow', sub: 'versioned playbooks' }
  - { label: 'Agent', sub: 'any runtime, one port' }
  - { label: 'Human gate', sub: 'approve · reject' }
  - { label: 'Pull request', sub: 'journaled · traced' }
---

## The problem

Every team adopting AI coding agents hits the same wall: everyone prompts differently, works differently and leaves no trail. Quality depends on who ran the agent, not on the process.

Kizuna turns agent work into a governed, repeatable workflow: standard lifecycles, versioned playbooks, any agent runtime behind one port, human gates exactly where they matter, and a full audit trail for every run.

## Who it is for

Teams and companies that want governed AI-assisted development **without building a platform first**: one process, one database file, self-hosted.

## Architecture

Modular monolith in strict TypeScript (ESM, Node 22). One Fastify process serves both the API and the React UI.

| Package | Responsibility |
|---|---|
| `shared` | Zod contracts: domain, workflow, events, adapter port |
| `core` | Domain, DB and migrations, auth, graph, orchestrator, queue, audit, metrics |
| `adapters` | Agent runtimes behind one port |
| `integrations` | Jira Cloud and GitHub clients |
| `apps/*` | API, web, CLI, worker |

The orchestrator is durable on top of the database: a journal entry per state transition, an immutable snapshot of the graph per run, cooperative cancellation, retries with backoff, and budgets per run (tokens, cost, time, steps). Agent outputs can be validated against a schema and repaired before they move on.

## Key decisions

1. **Modular monolith first** (ADR 0001). Zero infrastructure to start — one process, one SQLite file — with strict module boundaries so any piece can be extracted into its own service when scale demands it.
2. **One port for every agent runtime.** Playbooks and workflows never know which agent runs them. Runtimes are swappable adapters, and a mock adapter makes the whole engine testable without spending a single token.
3. **Playbooks as plain markdown in their own repository.** The same file runs in OpenCode, Claude Code or any other runtime, versioned independently of the engine.
4. **Built to scale up** (ADR 0006). SQLite for zero-ops installs, with Postgres as a second dialect behind the same repository port.
5. **Autonomy as policy** (ADR 0005). Approval per node — auto, gate, or gate-if on cost, diff size, sensitive paths or tests — with required roles and separation of duties.

## My role vs. the agents'

I designed the domain, the contracts and the architecture, wrote the ADRs, and directed implementation through playbooks. Agents wrote the code. Then I turned the agents on the system itself — as auditors, not authors.

A single audit ran nine specialised read-only playbooks — UX, features, security, logic, error handling, performance, code quality, dependencies, engine and persistence — and delivered **164 prioritised findings**, each with acceptance criteria and a verification command, ready to execute. Highlights:

- **Exactly-once execution.** It caught an interaction between job leasing, state guards and idempotency that could run a step twice — the same class of problem I solve in payment systems.
- **Enterprise-grade permissions.** It drove ADR 0003: an organisational tree with configurable roles instead of fixed global ones.

Security is a hard gate in the process: nothing is exposed until the critical findings are closed.

## Quality and verification

- Strict type-checking and ESLint across all workspaces.
- Vitest for the domain, Playwright end-to-end against a real API instance.
- Seven ADRs, a runbook and a dated audit.

## Status and what's next

Running on my own engineering workspace, with a roadmap aimed at teams: **journeys** as a business-level layer above workflows (ADR 0004), the organisational permission model (ADR 0003) and policy-driven autonomy (ADR 0005).
