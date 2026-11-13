---
project: kizuna
title: Ingeniería de IA gobernada, como producto
draft: false
decisions:
  - title: "Primero monolito modular"
    body: "Un proceso y un fichero SQLite para empezar, con fronteras de módulo estrictas para poder extraer cualquier pieza a un servicio cuando la escala lo pida."
    why: "La infraestructura que aún no necesitas es un coste que pagas todos los días."
  - title: "Un puerto para todos los runtimes de agentes"
    body: "Los playbooks y flujos nunca saben qué agente los ejecuta. Los runtimes son adaptadores intercambiables, y un adaptador simulado hace el motor testeable sin gastar un solo token."
    why: "Atar un flujo a un proveedor es una reescritura esperando a un cambio de tarifa."
  - title: "Playbooks en markdown plano"
    body: "El mismo fichero corre en OpenCode, Claude Code o cualquier otro runtime, versionado aparte del motor."
    why: "Un proceso que no se puede leer en un pull request no se puede revisar."
  - title: "Diseñado para escalar"
    body: "SQLite para instalaciones sin operación, con Postgres como segundo dialecto detrás del mismo puerto de repositorio."
    why: "La segunda base de datos es un dialecto, no una reescritura."
  - title: "Autonomía como política"
    body: "Aprobación por nodo — automática, puerta o puerta si se supera coste, tamaño de diff, rutas sensibles o tests — con roles obligatorios y separación de funciones."
    why: "La confianza es un ajuste que alguien escribió, no un valor por defecto."
stats:
  - { value: '164', label: 'hallazgos de auditoría priorizados' }
  - { value: '9', label: 'dimensiones de auditoría' }
  - { value: '8', label: 'adaptadores de runtime' }
  - { value: '7', label: 'registros de decisión de arquitectura' }
flow:
  - { label: 'Disparador', sub: 'Jira · GitHub · cron' }
  - { label: 'Flujo', sub: 'playbooks versionados' }
  - { label: 'Agente', sub: 'cualquier runtime, un puerto' }
  - { label: 'Puerta humana', sub: 'aprobar · rechazar' }
  - { label: 'Pull request', sub: 'journalado · trazado' }
---

## El problema

Todo equipo que adopta agentes de IA para programar choca con el mismo muro: cada persona
da instrucciones distintas, trabaja distinto y no deja rastro. La calidad depende de quién
ejecutó al agente, no del proceso.

Kizuna convierte el trabajo de los agentes en un flujo gobernado y repetible: ciclos de vida
estándar, playbooks versionados, cualquier runtime detrás de un puerto, puertas humanas
exactamente donde importan y una traza de auditoría completa por ejecución.

## Para quién es

Equipos y empresas que quieren desarrollo asistido por IA **sin construir antes una
plataforma**: un proceso, un fichero de base de datos, autoalojado.

## Arquitectura

Monolito modular en TypeScript estricto (ESM, Node 22). Un proceso Fastify sirve la API y
la interfaz React.

| Paquete | Responsabilidad |
|---|---|
| `shared` | Contratos Zod: dominio, flujo, eventos, puerto de adaptador |
| `core` | Dominio, base de datos y migraciones, autenticación, grafo, orquestador, cola, auditoría, métricas |
| `adapters` | Runtimes de agentes detrás de un puerto |
| `integrations` | Clientes de Jira Cloud y GitHub |
| `apps/*` | API, web, CLI, worker |

El orquestador es duradero sobre la base de datos: una entrada de journal por transición,
una instantánea inmutable del grafo por ejecución, cancelación cooperativa, reintentos con
espera creciente y presupuestos por ejecución (tokens, coste, tiempo, pasos). La salida de
los agentes se puede validar contra un esquema y reparar antes de continuar.

## Mi papel frente al de los agentes

Diseñé el dominio, los contratos y la arquitectura, escribí los ADR y dirigí la
implementación con playbooks. Los agentes escribieron el código. Después giré los agentes
contra el propio sistema: como auditores, no como autores.

Una sola auditoría ejecutó nueve playbooks de solo lectura especializados — UX,
funcionalidades, seguridad, lógica, errores, rendimiento, calidad de código, dependencias y
motor con persistencia — y entregó **164 hallazgos priorizados**, cada uno con criterios de
aceptación y un comando que lo verifica, listo para ejecutar. Lo más relevante:

- **Ejecución exactly-once.** Detectó una interacción entre el alquiler de trabajos, las
  guardas de estado y la idempotencia que podía ejecutar un paso dos veces: la misma clase
  de problema que resuelvo en sistemas de pago.
- **Permisos de nivel empresarial.** Empujó el ADR 0003: un árbol organizativo con roles
  configurables en lugar de roles globales fijos.

La seguridad es una puerta dura del proceso: nada se expone hasta cerrar los hallazgos
críticos.

## Calidad y verificación

- Comprobación de tipos estricta y ESLint en todos los workspaces.
- Vitest para el dominio, Playwright de extremo a extremo contra una API real.
- Siete ADR, un runbook y una auditoría con fecha.

## Estado y siguientes pasos

En uso sobre mi propio espacio de ingeniería, con una hoja de ruta orientada a equipos:
**journeys** como capa de negocio sobre los flujos (ADR 0004), el modelo de permisos
organizativo (ADR 0003) y la autonomía por políticas (ADR 0005).
