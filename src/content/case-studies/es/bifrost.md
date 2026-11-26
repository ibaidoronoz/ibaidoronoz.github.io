---
project: bifrost
title: Una puerta para cada llamada a la IA
draft: false
format: short
stats:
  - { value: '5', label: 'apps tras la pasarela' }
  - { value: '4', label: 'alias de modelo' }
  - { value: '0', label: 'prompts guardados en los logs' }
blocks:
  - label: "El problema"
    title: "Cada app llamaba a los modelos a su manera"
    body: "Cada app tenía su propio cliente, su propio sitio para la clave de la nube y su propio modelo por defecto, que se rompía cuando el proveedor lo retiraba. Algunas manejan datos que nunca deben salir del equipo, y nada lo garantizaba."
  - label: "El diseño"
    title: "Una clave por app, y la política vive en la pasarela"
    body: "Las apps hablan con un único endpoint compatible con OpenAI, con su propia clave virtual, y piden un alias, no un modelo. Cada clave tiene una lista blanca de proveedores: una clave solo local que pide la nube es rechazada antes de que la petición salga, y el mismo bloqueo vale para el respaldo. El binario abierto de Bifrost hace el enrutado; este repo es el generador que construye su configuración desde un YAML, la instalación del servicio, las pruebas y el registro de decisiones."
  - label: "Lo que demuestra"
    title: "Las garantías se comprueban cada día"
    body: "Cada día corre una prueba de humo y una auditoría de privacidad que lee solo metadatos de las peticiones, nunca contenido, y avisa si una app solo local llegó alguna vez a la nube. Unos evals comparan candidatos antes de cambiar un alias y una comprobación semanal avisa de versiones nuevas de Bifrost. Los límites de la versión abierta, como la ausencia de prioridad por clave, están escritos en lugar de ocultos."
---

Lo útil no era el enrutado, era conseguir que la regla de privacidad la haga cumplir y la audite el sistema, y no que cada app la prometa.
