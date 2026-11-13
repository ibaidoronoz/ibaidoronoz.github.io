---
project: forge
title: La app de gimnasio que reescribí dos veces
draft: false
format: short
stats:
  - { value: '45', label: 'programas, serie a serie' }
  - { value: '3', label: 'retos de treinta días' }
  - { value: '0', label: 'cuentas, backend ni analítica' }
blocks:
  - label: "El problema"
    title: "Una app que solo funcionaba online"
    body: "Quería una app de gimnasio que funcionara en un sótano sin cobertura, que registrara cada serie y que no me pidiera una cuenta para abrir mi propio historial. La primera versión fue una PWA envuelta en Capacitor: código web, un cascarón y la promesa de que se sentía suficientemente nativa."
  - label: "La decisión"
    title: "Nativo, con un ADR detrás"
    body: "Los temporizadores se desviaban, el botón atrás se comportaba como un navegador y cada release de Android era una negociación con el wrapper. Así que la reescribí en Kotlin, Compose y Room, y dejé la migración por escrito en un ADR. La app web sigue compilando; el producto nuevo vive solo en native/."
  - label: "Lo que demuestra"
    title: "Una migración es una decisión de coste"
    body: "Elegí nativo porque el temporizador y la base local son el producto; todo lo demás —copias, Health Connect, exportación CSV— existe para que los datos sean portables si algún día vuelvo a decidirlo."
---

Una migración es una decisión sobre coste, no sobre gusto.

Los cuarenta y cinco programas y los tres retos de treinta días salen de un único generador, así que un arreglo llega a todos los programas a la vez. Los datos de entrenamiento nunca se editan a mano.
