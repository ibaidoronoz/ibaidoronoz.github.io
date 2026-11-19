---
project: kagi
title: Una puerta delante de todas las apps
draft: false
format: short
stats:
  - { value: '280', label: 'tests en la puerta' }
  - { value: '6', label: 'cabeceras por petición' }
  - { value: '1', label: 'cookie para todas las apps' }
blocks:
  - label: "El problema"
    title: "Cada herramienta trae su propio login"
    body: "Autoalojar significa un sistema de cuentas por herramienta, una sesión por herramienta y una forma distinta de olvidar quién eres. Una contraseña por servicio es una costumbre que nadie mantiene, y cada app acaba protegiendo su propia tabla de usuarios."
  - label: "El diseño"
    title: "Preguntar una vez, firmar todo"
    body: "El proxy pregunta a un solo servicio antes de cada petición. Si hay sesión, recibe la identidad ya firmada —usuario, usuario local, roles, app, marca de tiempo y un HMAC sobre todo ello— y se la entrega a la app. Si no la hay, la puerta te lleva al login y te devuelve. Si la puerta no responde, no pasa nada."
  - label: "Lo que demuestra"
    title: "Los equilibrios están escritos"
    body: "Una puerta vale lo que vale aquello en lo que se niega a confiar: servicios escuchando solo en loopback, un catálogo cerrado de hosts, sesiones guardadas en hash y purgadas con calendario, CSRF atado a la sesión. El TLS que falta aparece como siguiente paso, no como algo que se da por hecho."
---

Lo interesante no era el formulario de login, era decidir qué debe negarse a hacer el sistema.
