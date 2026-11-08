---
project: oracle
title: A restart that knows when to stop
draft: false
format: short
stats:
  - { value: '80', label: 'test files' }
  - { value: '3', label: 'pieces: tray, agent, panel' }
  - { value: '1', label: 'ADR for recovery' }
blocks:
  - label: "The problem"
    title: "Twenty services, twenty ways to fail"
    body: "A process dies, the port stays taken, a dependency is not up yet, and the only monitoring is me noticing that something looks wrong. Restarting everything by hand is fine once and unbearable by the third time."
  - label: "The design"
    title: "Recovery with a stop condition"
    body: "A WinForms tray app, an ASP.NET Core agent beside each service, and a React panel reading both. Recovery is deliberately narrow: only if dependencies are up, inside a window of attempts, with a cooldown, and it stops when the window closes."
  - label: "What it proves"
    title: "Automation without limits is a louder failure"
    body: "A supervisor that restarts anything dead turns one crash into a restart storm. Giving up is a feature: a service that keeps dying needs a person, not a faster loop."
---

The interesting work was deciding when the system should stop acting on its own.
