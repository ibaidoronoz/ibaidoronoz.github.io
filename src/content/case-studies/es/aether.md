---
project: aether
title: Cuatro temas, un pipeline de construcción
draft: false
format: short
blocks:
  - label: "El problema"
    title: "Cuatro paquetes que se desvían"
    body: "Un tema de qBittorrent es una hoja de estilos Qt, un juego de iconos y un paquete de recursos. Construir cuatro a mano es cómo dejan de parecerse entre ellos."
  - label: "La construcción"
    title: "Entra el directorio del tema, sale el paquete"
    body: "Un pipeline en Python que convierte cada tema en un resources.qrc, ejecuta rcc de Qt y produce un .qbtheme listo para instalar."
  - label: "Lo que demuestra"
    title: "El contenido también puede tener pipeline"
    body: "Sin app, sin runtime y sin usuarios. CI reconstruye los cuatro temas en cada push y publica los artefactos."
---

Instala el paquete, elige el tema y ningún compilador en el lado del usuario.
