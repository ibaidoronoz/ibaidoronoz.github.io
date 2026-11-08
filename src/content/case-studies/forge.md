---
project: forge
title: The gym app I rebuilt twice
draft: false
format: short
stats:
  - { value: '45', label: 'programs, played set by set' }
  - { value: '3', label: 'thirty-day challenges' }
  - { value: '0', label: 'accounts, backend or analytics' }
blocks:
  - label: "The problem"
    title: "An app that only worked online"
    body: "I wanted a gym app that worked in a basement with no signal, tracked every set, and did not ask for an account to open my own training history. The first version was a PWA wrapped in Capacitor: web code, a shell, and a promise that it felt native enough."
  - label: "The decision"
    title: "Native, behind an ADR"
    body: "Timers drifted, the back button behaved like a browser, and every Android release was a negotiation with the wrapper. So I rewrote it in Kotlin, Compose and Room, and wrote the migration down as an ADR. The web app still builds; new product work happens only in native/."
  - label: "What it proves"
    title: "A migration is a cost decision"
    body: "I chose native because the timer and the local database are the product; everything else — backups, Health Connect, CSV export — exists to make the data portable if I ever decide that again."
---

A migration is a decision about cost, not about taste.

Forty-five programs and three thirty-day challenges come out of a single generator, so a fix lands in every program at once. The training data is never hand-edited.
