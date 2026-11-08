---
project: atlas
title: A hundred instruments on one screen
draft: false
format: short
stats:
  - { value: '~100', label: 'instruments' }
  - { value: '5m', label: 'shortest timeframe' }
  - { value: '4', label: 'asset classes' }
blocks:
  - label: "The problem"
    title: "Four tabs and no comparison"
    body: "Watching crypto, equities, forex and indices means four tabs, four chart widgets and no way to compare them. I wanted a five-minute candle and a weekly trend on the same screen, with the context that usually gets lost: correlation, breadth and regime."
  - label: "The build"
    title: "A hundred series that stay honest"
    body: "A Python collector writes instruments and candles into SQLite. The front end is TypeScript on lightweight-charts, with timeframes from five minutes to one week, indicators, drawing tools and the cross-asset views built on the same store."
  - label: "What it proves"
    title: "Breadth is a data problem"
    body: "The hard part is not the chart. It is keeping a hundred series sane when a source is late, repeats a candle or returns a gap. The collector treats every response as suspect and the dashboard shows what is missing instead of drawing through it."
---

Most of the work went into the store and the ingestion rules, not the interface.
