---
project: striker
title: Predicting the score before the game week closes
draft: false
format: short
blocks:
  - label: "The problem"
    title: "A lineup needs the next score, not the last one"
    body: "Fantasy rewards the lineup you set before the round, so last week’s points are useless. You need a prediction and an optimiser, not a table."
  - label: "The build"
    title: "Desktop app with a sidecar"
    body: "Tauri 2 and React on the surface, a Node sidecar underneath: multi-signal player matching across more than forty leagues, score prediction and weekly lineup optimisation."
  - label: "What it proves"
    title: "Identity is the hard part"
    body: "The same player has a different name in every source. Matching him reliably is the product; the prediction is the easy half."
---

A local database and no account: your data stays on the machine.
