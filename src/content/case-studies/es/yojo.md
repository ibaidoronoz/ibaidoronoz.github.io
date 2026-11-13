---
project: yojo
title: Un tracker de dieta que dos personas usan desde cuatro dispositivos
draft: false
format: short
blocks:
  - label: "El problema"
    title: "El historial vivía en un navegador"
    body: "Una dieta terapéutica necesita registro diario, y localStorage solo conoce el navegador donde se escribió. Dos personas, varios dispositivos, un solo historial."
  - label: "La construcción"
    title: "Sin paso de compilación, backend opcional"
    body: "HTML, CSS y JavaScript planos, más un servidor Node sin dependencias para sincronizar. Con el servidor apagado, la app sigue funcionando en local."
  - label: "Lo que demuestra"
    title: "El respaldo es un requisito"
    body: "El frontend nunca debe depender del servidor. Esa restricción moldeó todas las decisiones, incluida la forma de guardar el estado."
---

Dos ficheros para arrancarlo, sin gestor de paquetes y sin framework.
