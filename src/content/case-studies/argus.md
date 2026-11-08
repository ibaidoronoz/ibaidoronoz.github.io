---
project: argus
title: A toolbox that lives in the toolbar
draft: false
format: short
blocks:
  - label: "The problem"
    title: "Dev tooling means another tab"
    body: "Most tools ask for a build step, a permission prompt and a new tab before they do anything useful."
  - label: "The build"
    title: "Shipped as-is"
    body: "A Manifest V3 extension loaded straight from src/: a background worker, an analysis engine and an offscreen document for the APIs the worker cannot reach."
  - label: "What it proves"
    title: "What is in the repo is what runs"
    body: "No bundler, no transpiler, no artifacts. The extension is the source, and it survives Chrome updates without a rebuild."
---

A small tool that does one thing without getting in the way.
