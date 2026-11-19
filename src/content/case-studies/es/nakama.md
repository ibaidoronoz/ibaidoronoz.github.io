---
project: nakama
title: Una mascota que se gana cada interrupción
draft: false
decisions:
  - title: "La política de interrupción es el producto"
    body: "Una función pura recibe el evento, el contexto y la hora, y devuelve una decisión: mostrarlo o rechazarlo con un motivo. Duplicados, horario de silencio, pantalla completa, ráfagas, enfriamientos y el presupuesto por hora viven en ese único sitio."
    why: "Un rechazo es un dato: con los motivos guardados, la política se ajusta con uso real y no con intuición."
  - title: "La cara nunca habla con las apps"
    body: "Solo el cerebro guarda tokens, llama a las herramientas y conserva las claves del modelo. La mascota recibe un feed ya curado y confirma lo que ha pintado; no consulta nada."
    why: "Un segundo llamante es un segundo sitio donde filtrar un token o contar de más una cifra fiscal."
  - title: "El agente propone, la persona confirma"
    body: "Nada de lo que produce el modelo se ejecuta directamente. Una propuesta se convierte en una tarjeta con el cambio exacto; el cerebro llama a la app solo tras la confirmación y la auditoría guarda el antes y el después."
    why: "Un asistente que puede actuar solo está a una entrada mala de actuar por otra persona."
  - title: "Podar el motor en vez de heredarlo"
    body: "La primera versión envolvía un motor de mascotas vendorizado. La segunda lo borró: ventana por capas en WinForms con alfa real, animador, bandeja y chat compacto propios. Unas 3.600 líneas de C#, con la atribución original en NOTICE."
    why: "Un fork que no es tuyo es un bug que no puedes arreglar."
  - title: "Lo sensible se queda en la máquina"
    body: "Los datos fiscales van marcados como sensibles y se desvían de la voz y de los proveedores en la nube. Una rutina con modelo local se niega a correr contra una URL que no sea local y lo anota en su estado."
    why: "El dato más seguro es el que nunca llega a ser una petición."
stats:
  - { value: '6', label: 'apps en un cerebro' }
  - { value: '29', label: 'herramientas, chat y MCP' }
  - { value: '118', label: 'tests en dos runtimes' }
  - { value: '6/h', label: 'presupuesto de interrupciones' }
---

## El problema

Seis de las cosas que ejecuto pueden generar un aviso, y todas creen que su evento importa. El
resultado es un chorro de interrupciones que cuesta atención y, peor, te enseña a ignorarlas
todas. El momento que merece una persona se parece exactamente a los cinco que no.

## Qué es

Una mascota de escritorio con un cerebro detrás. El cerebro recoge eventos de seis
herramientas propias, decide si alguno merece interrumpirme y convierte los supervivientes en
una frase que el personaje pueda decir. El mismo cerebro lleva un chat con herramientas de solo
lectura y propone los cambios que yo confirmo.

## Restricciones

- La atención es el recurso escaso, así que el sistema tiene que decir «no» mucho más que «sí».
- Local primero: corre en la máquina donde trabajo, por loopback, y nada sale de ahí salvo que
  yo pida la web.
- La mascota no puede ser la parte frágil. Si el personaje falla, el cerebro sigue recogiendo.
- Sin build en el panel: la interfaz la sirve el mismo proceso que es dueño de los datos.

## Arquitectura

Dos procesos y una sola dirección de datos.

| Proceso | Es dueño de | Nunca hace |
|---|---|---|
| Cerebro | política, bandeja, base, claves del modelo, catálogo de herramientas | pintar nada |
| Mascota | ventana por capas, animador, icono de bandeja, chat compacto | consultar una app |
| Panel | seis vistas sobre SSE, el mismo proceso que el cerebro | salir del cerebro |

El cerebro es FastAPI sobre `sqlite3` de la biblioteca estándar: sin ORM, sin Redis, sin cola.
Los eventos llegan por push o por sondeo, la decisión es pura y la bandeja guarda lo que
sobrevive. La mascota recibe un feed curado, pinta una burbuja cada vez y responde con un acuse.
El panel es HTML, CSS y módulos ES servidos por el mismo proceso y actualizados por SSE.

## Lo que la política rechaza

La ingeniería interesante es la lista de motivos para callar:

- Duplicados durante 24 horas, y silencio manual hasta que yo diga lo contrario.
- Horario de silencio por la noche, y supresión mientras algo está a pantalla completa.
- Ráfagas agrupadas en un solo aviso, con enfriamiento por fuente.
- Un presupuesto de seis avisos mostrados por hora. Solo `critical` se salta todo esto.

Cada rechazo se guarda con su motivo, así que las reglas se ajustan contra historial real y no
contra suposiciones, y una vista de salud agrupa los últimos días por motivo y por fuente.

## El personaje

La mascota es una app nativa en WinForms con ventana por capas y alfa real por píxel: sin clave
de color y sin motor ajeno. La animación es código, no arte: nueve estados declarados en un
manifiesto, frames RGBA de 240 px, respiración y transiciones aplicadas al cargar. Los disfraces
salen de un calendario festivo y caen al gato base si falta uno. Un validador comprueba frames
por estado, tamaño de lienzo, deriva y halo antes de que CI acepte el arte.

## Mi papel

Lo diseñé, escribí las reglas y tomé las decisiones que piden criterio: qué merece una
interrupción, cuándo el sistema debe rendirse y qué datos no salen nunca de la máquina. Esas
reglas están escritas en el repositorio para que cualquier agente —o yo dentro de un año—
trabaje bajo las mismas restricciones.

## Calidad y verificación

- 102 tests en Python y 16 casos de test en .NET; Ruff con límite de 100 columnas.
- CI en dos runners: Ubuntu para el cerebro, Windows para la mascota y el validador de arte.
- Tres registros de decisión de arquitectura y siete contratos de interfaz, escritos antes del
  código que los implementa.
- Retención por edad de eventos, mensajes, caché web y auditoría, con tamaño de base y
  contadores expuestos por el cerebro.

## Estado y siguientes pasos

En uso diario en mi escritorio: seis fuentes, resumen de la mañana, rutinas por horario y un
chat que puede leer la flota pero no escribir en ella. Lo siguiente es arte, no arquitectura:
poses de caminar, bostezar y estirarse del mismo personaje, y más disfraces para el calendario.
