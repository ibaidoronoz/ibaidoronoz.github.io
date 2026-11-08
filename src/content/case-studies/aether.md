---
project: aether
title: Four themes, one build pipeline
draft: false
format: short
blocks:
  - label: "The problem"
    title: "Four bundles that drift"
    body: "A qBittorrent theme is a Qt stylesheet, an icon set and a resource bundle. Building four by hand is how they stop matching each other."
  - label: "The build"
    title: "Theme directory in, bundle out"
    body: "A Python pipeline that turns each theme into a resources.qrc, runs Qt’s rcc and produces a .qbtheme file ready to install."
  - label: "What it proves"
    title: "Content can have a pipeline too"
    body: "No app, no runtime, no users. CI rebuilds all four themes on every push and publishes the artifacts."
---

Install the bundle, pick the theme, no build tools on the user’s side.
