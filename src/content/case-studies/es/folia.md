---
project: folia
title: Un pase de diapositivas que no se atasca entre foto y vídeo
draft: false
format: short
blocks:
  - label: "El problema"
    title: "Pantalla completa y nada más"
    body: "Reproducir una carpeta de fotos y vídeos suena trivial hasta que el fundido pierde fotogramas y el siguiente vídeo tarda un segundo en arrancar."
  - label: "La construcción"
    title: "Precargar y después fundir"
    body: "Python y PySide6: decodificación de imagen asíncrona, un fundido de verdad, vídeo por QVideoSink y una barra de control flotante mínima que no estorba."
  - label: "Lo que demuestra"
    title: "La máquina de estados es la app"
    body: "Qué se reproduce después, cuándo precargarlo y cómo barajar sin repetir: esa lógica es el producto, no la ventana."
---

Arrastra una carpeta y se reproduce. Nada más que configurar.
