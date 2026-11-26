---
project: bifrost
title: One door for every AI call
draft: false
format: short
stats:
  - { value: '5', label: 'apps behind the gateway' }
  - { value: '4', label: 'model aliases' }
  - { value: '0', label: 'prompts kept in the logs' }
blocks:
  - label: "The problem"
    title: "Every app called the models its own way"
    body: "Each app had its own client, its own place for the cloud key and its own default model, which broke whenever the provider retired it. Some of them handle data that must never leave the machine, and nothing enforced that."
  - label: "The design"
    title: "One key per app, and the policy lives in the gateway"
    body: "Apps talk to a single OpenAI-compatible endpoint with their own virtual key and ask for an alias, not a model. Each key has a provider allow-list: a local-only key that asks for the cloud is refused before the request leaves, and the same block applies to the fallback. The open-source Bifrost binary does the routing; this repo is the generator that builds its config from one YAML, the service install, the tests and the decision record."
  - label: "What it proves"
    title: "The guarantees are checked every day"
    body: "A smoke test runs daily and so does a privacy audit that reads request metadata only, never content, and raises an alert if a local-only app ever reached the cloud. Evals compare candidates before an alias changes, and a weekly check flags new Bifrost releases. The limits of the open-source version, like no per-key priority, are written down instead of hidden."
---

The useful part was not the routing; it was making the privacy rule something the system enforces and audits, not something each app promises.
