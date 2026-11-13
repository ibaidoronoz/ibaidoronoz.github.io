---
project: crypto-market
title: El que escribí a mano y luego reconstruí con agentes
draft: false
decisions:
  - title: "Dos tipos de post, no un megapost"
    body: "Un dashboard multi-token y una ficha de un solo token responden a dos intenciones distintas."
    why: "Un formulario con veinte interruptores sería peor para las dos."
  - title: "La clave de API es del subreddit"
    body: "Los niveles free, demo y pro se configuran en los ajustes de la app, y el nivel decide la frecuencia de refresco: quince, diez o cinco minutos. Una instalación sin clave sigue funcionando."
    why: "Una clave mía es una clave que tengo que pagar, para cada comunidad."
  - title: "Primero caché, después pintar"
    body: "Los valores se guardan en Redis y el post se reescribe por calendario, nunca al leerlo."
    why: "Un post popular no debería poder tumbar la API."
  - title: "Un host, dos endpoints"
    body: "Los permisos de red se limitan a api.coingecko.com y pro-api.coingecko.com."
    why: "Una superficie de permisos estrecha es fácil de revisar y difícil de abusar."
  - title: "Las páginas legales, en su propio repositorio"
    body: "La política de privacidad y los términos se versionan aparte del código."
    why: "Un cambio de política no debería exigir publicar una versión de la app."
stats:
  - { value: '2', label: 'tipos de post, instalables por subreddit' }
  - { value: '15 min', label: 'refresco en el nivel free' }
  - { value: '5 min', label: 'refresco con clave pro' }
  - { value: '2025', label: 'primera versión escrita a mano' }
flow:
  - { label: 'Menú del moderador', sub: 'dashboard · token favorito' }
  - { label: 'Formulario', sub: 'tokens · lite · clave' }
  - { label: 'CoinGecko', sub: 'un host acotado' }
  - { label: 'Redis', sub: 'caché por subreddit' }
  - { label: 'Cron', sub: 'refresco cada 15 min' }
---

## El problema

Las comunidades de cripto hablan de precios todo el día, pero los datos viven fuera de
Reddit: un enlace, una captura, un gráfico que ya está viejo cuando alguien lo abre. Un
moderador que quiere una vista de mercado dentro de la comunidad tiene que ir publicando
imágenes nuevas a mano.

Crypto Market convierte eso en un post que la app mantiene: el moderador elige los tokens y
el post se actualiza solo.

## Arquitectura

Una app de Reddit construida sobre Devvit Web. React 19 y Vite pintan el post; un servidor
Express pide los datos, los cachea y reescribe el post por calendario.

| Pieza | Responsabilidad |
|---|---|
| `src/client` | Dashboard, ficha de un token, sparklines, variantes lite |
| `src/server` | Cliente de CoinGecko, cron, formularios, menú, disparadores, almacenamiento |
| `src/shared` | Tipos, formateo y cálculo de sparklines usados por ambos lados |
| `devvit.json` | Puntos de entrada, permisos, menú, formularios, disparadores, planificador |

Dos tareas de cron corren cada quince minutos: una refresca los dashboards y otra los posts
de un solo token. No se pide nada cuando un lector abre el post, así que un post popular no
se convierte en una caída de la API.

## Mi papel frente al de los agentes

Este tiene dos vidas. La primera versión, en 2025, la escribí a mano: los formularios, el
pintado del post, el cliente de CoinGecko, la caché. Se publicó y funcionó, y ahí aprendí
dónde araña la plataforma.

La segunda versión, en 2026, pasó a Devvit Web: cliente React, servidor Express empaquetado
y el nuevo formato de manifiesto. Para esa migración fijé la arquitectura objetivo, el
contrato entre cliente y servidor y los criterios de aceptación, y dirigí a los agentes
durante la reescritura. El código fue suyo dentro de esos límites; revisé el diff, lo
verifiqué con `devvit playtest` contra un subreddit real y lo publiqué.

Ese orden importa. Haber construido la primera versión a mano es lo que hizo revisable la
segunda: sabía distinguir un diff bueno de uno plausible.

## Calidad y verificación

- `devvit playtest` contra un subreddit en vivo antes de cada publicación; la plataforma es
  el banco de pruebas.
- Permisos de red y superficie de API revisados en cada actualización de dependencias.
- Un changelog escrito para usuarios, no para git.

## Estado y siguientes pasos

Publicado en la plataforma de desarrollo de Reddit e instalable por comunidad. Siguiente:
rangos de sparkline más ricos y un arranque más claro para moderadores sin clave de
CoinGecko.
