---
project: kitto
title: Splitting the house bills without a spreadsheet
draft: false
format: short
blocks:
  - label: "The problem"
    title: "A household is not one budget"
    body: "Spending is categories, supermarkets and months, and the bank hands you an XLS nobody wants to open. Splitting costs by income makes it worse."
  - label: "The build"
    title: "One parser per bank"
    body: "A React app with Zustand and Recharts that imports XLS and XLSX exports, one parser per format, and shows history by category, shop and month."
  - label: "What it proves"
    title: "The parser is the product"
    body: "Every bank invents its own columns. Reading them without asking for a CSV template was most of the work."
---

Proportional cost sharing, calculated from the real numbers.
