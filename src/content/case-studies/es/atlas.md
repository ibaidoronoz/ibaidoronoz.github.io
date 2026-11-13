---
project: atlas
title: Cien instrumentos en una sola pantalla
draft: false
format: short
stats:
  - { value: '~100', label: 'instrumentos' }
  - { value: '5m', label: 'marco más corto' }
  - { value: '4', label: 'clases de activo' }
blocks:
  - label: "El problema"
    title: "Cuatro pestañas y ninguna comparación"
    body: "Seguir cripto, acciones, divisas e índices significa cuatro pestañas, cuatro widgets de gráfico y ninguna forma de compararlos. Quería una vela de cinco minutos y una tendencia semanal en la misma pantalla, con el contexto que siempre se pierde: correlación, amplitud y régimen."
  - label: "La construcción"
    title: "Cien series que se mantienen honestas"
    body: "Un colector en Python escribe instrumentos y velas en SQLite. El frontend es TypeScript sobre lightweight-charts, con marcos de cinco minutos a una semana, indicadores, herramientas de dibujo y las vistas entre activos construidas sobre el mismo almacén."
  - label: "Lo que demuestra"
    title: "La amplitud es un problema de datos"
    body: "Lo difícil no es el gráfico. Es mantener cien series sanas cuando una fuente llega tarde, repite una vela o devuelve un hueco. El colector trata cada respuesta como sospechosa y el dashboard enseña lo que falta en vez de dibujar a través de ello."
---

Casi todo el trabajo se fue al almacén y a las reglas de ingesta, no a la interfaz.
