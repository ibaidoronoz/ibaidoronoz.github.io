---
project: yojo
title: A diet tracker two people can use from four devices
draft: false
format: short
blocks:
  - label: "The problem"
    title: "The history lived in one browser"
    body: "A therapeutic diet needs daily tracking, and localStorage only knows about the browser it was written in. Two people, several devices, one history."
  - label: "The build"
    title: "No build step, optional backend"
    body: "Plain HTML, CSS and JavaScript, plus a zero-dependency Node server for sync. With the server off, the app still works local-only."
  - label: "What it proves"
    title: "The fallback is a requirement"
    body: "The frontend must never depend on the server. That constraint shaped every decision, including how state is stored."
---

Two files to run it, no package manager, no framework.
