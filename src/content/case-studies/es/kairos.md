---
project: kairos
title: Un motor de DCA que tenía que ganar a no hacer nada
draft: false
decisions:
  - title: "Puntuación precalculada, interfaz de solo lectura"
    body: "El análisis pesado corre por calendario para que la interfaz sea instantánea, con monitorización de frescura y alertas incluidas."
    why: "Un dashboard que calcula al leer es un dashboard que falla cuando lo necesitas."
  - title: "Detección de régimen explicable"
    body: "VIX, curva de tipos y liquidez, con cada recomendación rastreable hasta sus señales."
    why: "Una puntuación con la que no puedes discutir es una puntuación en la que no puedes confiar."
  - title: "Datos de mercado resilientes"
    body: "Cinco fuentes de precio en cascada para cripto, y ningún nivel es fatal."
    why: "Ningún proveedor debería poder tumbar el sistema."
  - title: "IA que respeta la privacidad"
    body: "El asistente corre en un modelo local por defecto y solo baja a la nube con un aviso explícito."
    why: "El contexto financiero no es algo que se envía por accidente."
  - title: "Migración incremental de la interfaz"
    body: "La interfaz React y FastAPI se construye al lado de la de Streamlit."
    why: "Nada de reescrituras de golpe para una herramienta que uso cada mes."
stats:
  - { value: '30', label: 'años de DCA con backtest' }
  - { value: '5', label: 'fuentes de precio en cascada' }
  - { value: '3', label: 'señales de régimen macro' }
  - { value: '12', label: 'registros de decisión de arquitectura' }
flow:
  - { label: 'Datos', sub: '5+ fuentes' }
  - { label: 'Variables', sub: 'pipeline por calendario' }
  - { label: 'Régimen', sub: 'VIX · curva · liquidez' }
  - { label: 'Puntuación', sub: 'por activo' }
  - { label: 'Plan de compra', sub: 'DCA mensual' }
---

## El problema

El DCA fijo ignora todo: valoración, momento y régimen macro. Kairos puntúa acciones, ETF y
cripto por atractivo para DCA y convierte un presupuesto mensual en un plan de compra por
ticker, y después tiene que demostrar con backtests que lo hace mejor que el DCA simple.

## Arquitectura

Las posiciones de cartera vienen de [Plutus](/es/projects/plutus/), en solo lectura, para
que haya una única fuente de verdad sobre lo que tengo.

## Evidencia antes que intuición

El motor usaba el régimen macro para cambiar *cuánto* invertir cada mes: más en mercado
bajista, menos en uno alcista. Suena bien. Así que lo probé.

DCA mensual sobre SPY de 1996 a 2026, con el régimen tal como está guardado y la reserva
generando intereses de letras:

| Estrategia | Periodo completo frente a DCA simple | Ventanas de 10 años que lo superan |
|---|---|---|
| Reserva rotatoria, 10% / 50% | −0,06% / −0,51% | 15% |
| Bote de reserva, 10% retenido, 100% liberado en bajista | −0,39% | 15% |
| Bote de reserva, 50% retenido, 25% liberado | −5,55% | 25% |

**Ninguna combinación superó al DCA simple en el periodo completo.** Los mercados alcistas
y neutros son cerca del 85% de los días y siguen componiendo; el dinero retenido para el
siguiente bajista, casi siempre, solo espera.

Así que lo eliminé (ADR-12). El régimen ahora reparte peso entre tickers dentro de cada
clase, donde sí aporta, y cualquier función futura tiene que ganar al DCA simple fuera de
muestra para publicarse.

## Calidad y verificación

- **Backtesting walk-forward**: ventanas de test de dos años no solapadas que comparan la
  fórmula real de producción contra el DCA estático.
- **Métricas correctas por construcción**: riesgo ponderado por tiempo, rentabilidad
  ponderada por dinero (TIR), para que ninguna pueda inflar la otra.
- Una auditoría específica de coherencia entre todas las fuentes de verdad.
- Arquitectura, modelo de dominio y registros de decisión documentados.

## Mi papel frente al de los agentes

Yo pongo las preguntas y el listón de la evidencia; los agentes construyeron el pipeline,
los backtests y las auditorías. Cada función tiene que ganar al DCA simple con datos, y
cuando no lo hace, la decisión es mía.

## Estado y siguientes pasos

Gobierna mis propias decisiones mensuales de DCA. Siguiente: terminar el traslado a la
interfaz React + FastAPI.
