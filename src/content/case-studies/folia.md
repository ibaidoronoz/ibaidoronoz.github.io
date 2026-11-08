---
project: folia
title: A slideshow that does not stutter between photo and video
draft: false
format: short
blocks:
  - label: "The problem"
    title: "Fullscreen, and nothing else"
    body: "Playing a folder of photos and videos sounds trivial until the crossfade drops frames and the next video takes a second to start."
  - label: "The build"
    title: "Preload, then fade"
    body: "Python and PySide6: asynchronous image decoding, a real crossfade, video through QVideoSink, and a minimal floating control bar that stays out of the way."
  - label: "What it proves"
    title: "The state machine is the app"
    body: "What plays next, when to preload it and how to reshuffle without repeating: that logic is the product, not the window."
---

Drag a folder in and it plays. Nothing else to configure.
