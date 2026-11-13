---
project: engineering-platform
title: La plataforma detrás de veinte repositorios construidos con agentes
draft: false
decisions:
  - title: "Un hogar por artefacto"
    body: "Cada skill vive en un único plugin; el validador falla si un slug aparece dos veces."
    why: "Sin scripts de sincronización: si algún día hace falta uno, el diseño está roto."
  - title: "Una regla sobre dónde vive el conocimiento"
    body: "Un proyecto guarda lo que su código puede falsar: un fichero, un comando, un bug. Prometheus guarda lo que es cierto en al menos dos repos y sobreviviría a borrar cualquiera de ellos."
    why: "Una skill nueva nace solo cuando dos proyectos ya la duplican, nunca por adelantado."
  - title: "Cada token siempre cargado es un coste"
    body: "En cada sesión solo carga la descripción corta de una skill; el cuerpo se carga cuando hace falta."
    why: "El contexto permanente no se añade hasta que una skill demuestra que no basta."
  - title: "Un contrato de flota, comprobado por un script"
    body: "check.py --fleet valida cada repositorio hermano: fichero de entrada, bloque de flujo de git, reglas de secretos y skills activas."
    why: "Una convención que nadie comprueba es una convención que se desvía."
  - title: "UI compartida vendorizada, con control de deriva"
    body: "Festive se copia en cada app y sync:check garantiza que todas las copias siguen idénticas."
    why: "Un runtime compartido es infraestructura; una copia comprobada es una dependencia que puedes leer."
stats:
  - { value: '20', label: 'repositorios, un contrato' }
  - { value: '4', label: 'capas compartidas' }
  - { value: '1', label: 'hogar por skill, cero copias' }
  - { value: '1', label: 'validador para toda la flota' }
flow:
  - { label: 'Prometheus', sub: 'contexto de IA compartido' }
  - { label: 'check --fleet', sub: '20 repositorios' }
  - { label: 'Proyectos', sub: 'construidos por agentes' }
  - { label: 'Torii', sub: 'una puerta de entrada' }
  - { label: 'Festive', sub: 'un motor de UI' }
---

## El problema

Con un repositorio, las instrucciones de un agente caben en un fichero. Con veinte, se
desvían: cada proyecto tiene sus reglas ligeramente distintas, la misma skill está copiada
cinco veces y un arreglo en un sitio nunca llega a los demás.

Y encima, veinte servicios tienen que ser accesibles por nombre y parecer un solo producto,
por una persona y en una máquina.

## Las piezas

| Capa | Papel |
|---|---|
| **Prometheus** | Mercado de plugins para Claude Code y la configuración global de OpenCode: skills, agentes, flujos y playbooks. El único hogar del contexto de ingeniería compartido. |
| **Torii** | Puerta de entrada: un proceso enruta cada servicio por nombre y ruta. |
| **Kagi** | Puerta de acceso delante de cada ruta: un login, una cookie y una identidad que cada app verifica en lugar de fiarse de la red. |
| **Festive** | Motor de UI compartido, vendorizado en las apps con control de deriva. |

Oracle —el panel de control de esos servicios— es un producto propio y tiene
[su propia página](/es/projects/oracle/). Consume esta plataforma; no es una capa suya.

## Mi papel frente al de los agentes

Este es el sistema dentro del que trabajan los agentes. Diseñé sus reglas —dónde vive el
conocimiento, qué se valida, qué puede y qué no puede hacer un agente— para que cada
repositorio arranque del mismo contexto probado en lugar de un prompt que alguien escribió
una vez.

## Calidad y verificación

- Prometheus: un validador que debe pasar antes de cada commit, para el hub y para toda la
  flota.
- Festive: tests unitarios, comprobación de tipos y control de deriva en cada copia.
- El contrato se prueba contra los repositorios reales, no contra un fixture.

## Estado y siguientes pasos

En uso diario: cada proyecto de esta página está construido sobre él. Sigue creciendo como
debe: una skill compartida se añade en el momento en que dos proyectos la necesitan.
