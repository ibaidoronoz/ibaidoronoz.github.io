---
project: fortuna
title: A trading bot that refuses to trade until it is safe
draft: false
format: short
blocks:
  - label: "The problem"
    title: "A bot with real money on the other side"
    body: "A system that runs 24/7 and moves real capital has one job: not to lose it by accident. Most of the risk is not the model, it is everything around it."
  - label: "The build"
    title: "Headless engine, cockpit on top"
    body: "A Python engine that runs without the UI, with IPC, a FastAPI bridge and a PyQt6 cockpit. XGBoost and LightGBM models tuned with Optuna, feeding one decision orchestrator."
  - label: "What it proves"
    title: "The gate comes before the money"
    body: "Nothing goes live until a GO/NO-GO audit passes. It stopped the launch on six blocking issues."
---

The interesting part is the discipline around the model, not the model itself.
