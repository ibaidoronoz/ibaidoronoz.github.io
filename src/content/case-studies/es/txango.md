---
project: txango
title: Un mapa en el bolsillo cuando desaparece la cobertura
draft: false
decisions:
  - title: "Offline primero, stack nativo"
    body: "Kotlin, Compose y Mapsforge, porque el renderizador es el producto y tiene que funcionar con teselas vectoriales locales y sombreado del terreno."
    why: "Un mapa que necesita conexión es inútil justo donde hace falta."
  - title: "Sin raspar webs privadas de rutas"
    body: "El catálogo sale de datos abiertos: OpenStreetMap, datos abiertos de Gipuzkoa, senderos del CNIG y GPX de usuarios."
    why: "Un catálogo construido con las condiciones de otro desaparece con ellas."
  - title: "El tiempo se pide y se guarda"
    body: "Open-Meteo, cacheado para las horas de la salida."
    why: "La previsión tiene que estar en el aparcamiento, sin cobertura."
  - title: "Sin Google Play Services"
    body: "La ubicación viene de LocationManager. La app funciona en un móvil sin cuenta de Google."
    why: "Cada dependencia de plataforma es un permiso y un consumo de batería que no elegiste."
  - title: "La altitud forma parte del modelo"
    body: "La elevación del terreno se guarda en local, lo que hace que el perfil, la estimación de llegada y el aviso de puesta de sol funcionen sin red."
    why: "Las funciones que importan en la montaña son las que no pueden llamar a casa."
stats:
  - { value: '2.034', label: 'rutas incluidas sin conexión' }
  - { value: '19.737', label: 'puntos de interés' }
  - { value: '108', label: 'tests unitarios' }
  - { value: '0', label: 'servicios de Google' }
flow:
  - { label: 'Mapa', sub: 'vector · sin conexión' }
  - { label: 'Ruta', sub: 'catálogo o GPX' }
  - { label: 'Marcha', sub: 'GPS · avisos' }
  - { label: 'Traza', sub: 'sobrevive al cierre' }
  - { label: 'Copia', sub: 'un fichero zip' }
---

## El problema

Una app de senderismo que necesita conexión es inútil justo donde hace falta. En la montaña
vasca la cobertura va y viene, la batería es finita y el móvil es el único mapa que llevas.
Casi todas las apps de rutas lo resuelven pidiéndote que planifiques online y cruces los
dedos.

Txango parte del supuesto contrario: el mapa, las rutas, las cumbres, los puntos de interés
y el perfil del terreno ya están en el teléfono. La red sirve para descargar mapas y una
previsión del tiempo antes de salir, y para nada más.

## Arquitectura

Android nativo, sin web view y sin capa multiplataforma.

| Pieza | Responsabilidad |
|---|---|
| `ui/` | Pantallas Compose, cinco pestañas, el view model |
| `map/` | Mapa Mapsforge, traza, catálogo, POI y capas aéreas |
| `route/` | Seguimiento, enrutado sobre grafo de senderos, perfil de elevación, ritmo |
| `gpx/`, `dem/` | Lectura y escritura de GPX, elevación del terreno |
| `location/` | Tracker GPS y el servicio de grabación |
| `assets/` | Los datos offline incluidos |

Los datos incluidos se generan, no se curan a mano: `tools/` contiene generadores en Python
para el catálogo de rutas, los POI, las teselas de terreno y el índice del mapa. Ejecutarlos
es un cambio de datos con diff, no un script que reescribe la app en silencio.

## Mi papel frente al de los agentes

Fijé el modelo offline, elegí el stack y escribí los ADR que explican el porqué. Las partes
que no se pueden adivinar —el servicio de grabación que sobrevive al cierre de la app, el
enrutado sobre el grafo de senderos, el pipeline de elevación, las migraciones de Room— las
especifiqué al detalle y las revisé contra tests.

Los agentes hicieron el grueso de la implementación dentro de esos límites, incluidos los
generadores en Python que reconstruyen los datos incluidos. La regla era simple: un cambio
de esquema viaja con su esquema exportado y su test de migración, o no viaja.

## Calidad y verificación

- 108 tests unitarios, más tests de migración que corren en un emulador contra esquemas
  exportados reales.
- Cada versión de Room tiene su esquema JSON versionado.
- El pipeline de datos offline está documentado con sus modos de fallo, porque Overpass falla
  a menudo y una descarga parcial silenciosa es peor que ninguna.
- Las builds de release se instalan en un dispositivo físico antes de compartirlas.

## Estado y siguientes pasos

En uso diario en Gipuzkoa, en castellano, euskera e inglés. Siguiente: un paquete de mapas
más ligero por provincia, para que la primera descarga sean minutos y no un gigabyte.
