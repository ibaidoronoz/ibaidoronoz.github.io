---
project: oracle
title: Un reinicio que sabe cuándo parar
draft: false
format: short
stats:
  - { value: '80', label: 'ficheros de test' }
  - { value: '3', label: 'piezas: bandeja, agente, panel' }
  - { value: '1', label: 'ADR para la recuperación' }
blocks:
  - label: "El problema"
    title: "Veinte servicios, veinte formas de fallar"
    body: "Un proceso muere, el puerto se queda ocupado, una dependencia aún no está lista y la única monitorización soy yo notando que algo va mal. Reiniciar todo a mano se hace una vez y se vuelve insoportable a la tercera."
  - label: "El diseño"
    title: "Recuperación con condición de parada"
    body: "Una app de bandeja WinForms, un agente ASP.NET Core junto a cada servicio y un panel React leyendo a los dos. La recuperación es estrecha a propósito: solo si las dependencias están arriba, dentro de una ventana de intentos, con enfriamiento, y se detiene cuando la ventana se cierra."
  - label: "Lo que demuestra"
    title: "Automatizar sin límites es fallar más alto"
    body: "Un supervisor que reinicia todo lo que está muerto convierte una caída en una tormenta de reinicios. Rendirse es una función: un servicio que muere una y otra vez necesita a una persona, no un bucle más rápido."
---

El trabajo interesante fue decidir cuándo debía el sistema dejar de actuar por su cuenta.
