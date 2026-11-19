---
project: kagi
title: One gate in front of every app
draft: false
format: short
stats:
  - { value: '280', label: 'tests on the gate' }
  - { value: '6', label: 'headers per request' }
  - { value: '1', label: 'cookie for every app' }
blocks:
  - label: "The problem"
    title: "Every tool ships its own login"
    body: "Self-hosting means an account system per tool, a session per tool and a different way of forgetting who you are. One password per service is a habit nobody keeps, and every app ends up protecting its own user table."
  - label: "The design"
    title: "Ask once, sign everything"
    body: "The proxy asks one service before each request. With a session it gets the identity already signed — user, local user, roles, app, timestamp and an HMAC over all of them — and hands it to the app. Without one, the gate sends you to the login and back. If the gate cannot answer, nothing passes."
  - label: "What it proves"
    title: "The trade-offs are written down"
    body: "A gate is only as good as what it refuses to trust: upstreams bound to loopback, a closed catalogue of hosts, sessions stored as hashes and purged on a schedule, CSRF tied to the session. The missing TLS is named as the next step instead of assumed away."
---

The interesting part was not the login form; it was deciding what the system must refuse to do.
