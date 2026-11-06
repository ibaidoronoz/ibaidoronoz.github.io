---
project: kairos
title: A DCA engine that had to beat doing nothing
draft: false
stats:
  - { value: '30', label: 'years of DCA backtested' }
  - { value: '5', label: 'cascading price sources' }
  - { value: '3', label: 'macro regime signals' }
  - { value: '12', label: 'architecture decision records' }
flow:
  - { label: 'Market data', sub: '5+ sources' }
  - { label: 'Features', sub: 'scheduled pipeline' }
  - { label: 'Regime', sub: 'VIX · curve · liquidity' }
  - { label: 'Scoring', sub: 'per asset' }
  - { label: 'Buy plan', sub: 'monthly DCA' }
---

## The problem

Fixed dollar-cost averaging ignores everything: valuation, momentum, macro regime. Kairos scores stocks, ETFs and crypto for DCA attractiveness and turns a monthly budget into a per-ticker buy plan — and then has to prove, with backtests, that it does better than plain DCA.

## Architecture

Portfolio positions come from [Plutus](/projects/plutus/), read-only, so there is one source of truth for what I actually own.

## Key decisions

1. **Pre-computed scoring pipeline, read-only UI.** Heavy analytics run on schedule so the UI stays instant, with freshness monitoring and alerts built in.
2. **Explainable regime detection** (VIX, yield curve, liquidity) — every recommendation can be traced back to its signals.
3. **Resilient market data.** Five cascading price sources for crypto, each tier non-fatal, so no single provider can take the system down.
4. **Privacy-first AI.** The assistant runs on a local LLM by default and only falls back to the cloud with an explicit notice.
5. **Incremental UI migration.** The React + FastAPI interface is built alongside the Streamlit one — no big-bang rewrite.

## Evidence over intuition

The engine used the macro regime to change *how much* to invest each month: invest more in a bear market, hold back in a bull one. It sounds right. So I tested it.

Monthly SPY DCA from 1996 to 2026, with the regime as stored and the reserve earning T-bill interest:

| Strategy | Full period vs. plain DCA | 10-year windows that beat it |
|---|---|---|
| Rolling reserve, 10% / 50% | −0.06% / −0.51% | 15% |
| Reserve pot, 10% held, 100% released in bear | −0.39% | 15% |
| Reserve pot, 50% held, 25% released | −5.55% | 25% |

**No combination beat plain DCA over the full period.** Bull and neutral markets are about 85% of all days and keep compounding; money held back for the next bear mostly just waits.

So I removed it (ADR-12). The regime now shifts weight between tickers within each class, where it adds value — and any future feature has to beat plain DCA out of sample to ship.

## Quality and verification

- **Walk-forward backtesting**: non-overlapping two-year test windows comparing the real production formula against static DCA.
- **Correct metrics by construction**: risk time-weighted, returns money-weighted (IRR), so neither can inflate the other.
- A dedicated audit for consistency across every source of truth.
- Documented architecture, domain model and decision records.

## My role vs. the agents'

I set the questions and the bar of evidence; agents built the pipeline, the backtests and the audits. Every feature has to beat plain DCA with data — and I make the call when it doesn't.

## Status and what's next

Driving my own monthly DCA decisions. Next: completing the move to the React + FastAPI interface.
