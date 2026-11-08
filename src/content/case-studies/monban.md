---
project: monban
title: A guard that notices the file nobody opened
draft: false
format: short
blocks:
  - label: "The problem"
    title: "The download folder is the front door"
    body: "A disguised executable waits there: a double extension, an icon that looks like a video, a file that runs when someone finally clicks it."
  - label: "The build"
    title: "Classify on arrival"
    body: "A Windows tray app in C# and .NET, WinForms with a WPF panel, watching folders and classifying new files by path, first bytes and signature."
  - label: "What it proves"
    title: "The rules are the product"
    body: "One self-contained binary, no admin rights, and a test suite around the classifier, because the detection rules are where the value is."
---

Windows 11, local-first, and loud only when it matters.
