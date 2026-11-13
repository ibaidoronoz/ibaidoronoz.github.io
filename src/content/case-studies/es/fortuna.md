---
project: fortuna
title: Un bot de trading que se niega a operar hasta estar seguro
draft: false
format: short
blocks:
  - label: "El problema"
    title: "Un bot con dinero real al otro lado"
    body: "Un sistema que corre 24/7 y mueve capital real tiene un solo trabajo: no perderlo por accidente. Casi todo el riesgo no está en el modelo, está en lo que lo rodea."
  - label: "La construcción"
    title: "Motor headless, cabina encima"
    body: "Un motor en Python que funciona sin interfaz, con IPC, un puente FastAPI y una cabina en PyQt6. Modelos XGBoost y LightGBM ajustados con Optuna, alimentando un único orquestador de decisiones."
  - label: "Lo que demuestra"
    title: "La puerta va antes que el dinero"
    body: "Nada sale a producción hasta que pasa una auditoría GO/NO-GO. Paró el lanzamiento con seis problemas bloqueantes."
---

Lo interesante es la disciplina alrededor del modelo, no el modelo.
