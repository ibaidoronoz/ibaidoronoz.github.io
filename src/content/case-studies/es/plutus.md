---
project: plutus
title: Cuadrar los impuestos cuando cada fuente dice algo distinto
draft: false
decisions:
  - title: "Una base de datos por usuario"
    body: "El aislamiento físico elimina por diseño una clase entera de fugas de datos: no hay filtro de inquilino que olvidar."
    why: "Un WHERE que falta es un titular; un fichero aparte, no."
  - title: "Despliegues de cero pasos"
    body: "Las migraciones idempotentes corren solas al iniciar sesión: arrancar la app es el despliegue."
    why: "No hay equipo de plataforma que ejecute un proceso de release."
  - title: "Un proceso, cerrojos en memoria"
    body: "El recálculo, la sincronización de carteras y las copias se serializan dentro de un proceso, con el invariante documentado y exigido."
    why: "Una cola que nadie opera es una cola que se para en silencio."
  - title: "FIFO con lotes con clave"
    body: "El método que espera el IRPF español, con lotes identificados por clase de activo y activo para que acciones y cripto nunca choquen."
    why: "A Hacienda le da igual que tu modelo sea elegante."
stats:
  - { value: '17', label: 'blockchains ingeridas' }
  - { value: '6', label: 'exchanges, API + CSV' }
  - { value: '230', label: 'tests en verde' }
  - { value: '0', label: 'descuadres de integridad con datos reales' }
flow:
  - { label: 'Fuentes', sub: 'exchanges · brókers · cadenas' }
  - { label: 'Importadores', sub: 'API + CSV' }
  - { label: 'Conciliación', sub: 'emparejar transferencias' }
  - { label: 'Motor FIFO', sub: 'lotes · transmisiones' }
  - { label: 'Informes', sub: 'IRPF · 720 · 721' }
---

## El problema

Declarar los impuestos españoles de cripto y acciones extranjeras significa convertir años
de historial en bruto —de exchanges, brókers y carteras on-chain— en ganancias
patrimoniales del IRPF y cifras del modelo 720/721: coste FIFO, por lote, en euros.

Las herramientas comerciales te piden subir todo tu historial financiero a un SaaS de
terceros. Plutus hace el trabajo entero **sin que tus datos salgan de tu máquina**.

## Restricciones

- Los números tienen que ser correctos como para presentarlos: tolerancia cero a errores
  silenciosos.
- Cada fuente tiene sus manías: exportaciones CSV, APIs y datos on-chain que se solapan, se
  duplican y se contradicen.
- Local primero y multiusuario, pero autoalojado: sin equipo de plataforma y sin base de
  datos gestionada.

## Arquitectura

Un proceso FastAPI sirve la API y la SPA de React ya compilada. Cada usuario tiene una
**base SQLite aislada**; la autenticación vive en un almacén aparte.

## Los invariantes que sostienen los números

Casi toda la ingeniería está en reglas que el sistema de tipos no puede exigir, escritas
como una lista que cada agente debe seguir:

- Los eventos se procesan en orden `(timestamp, id)`: ordenar solo por fecha ya produjo lotes
  duplicados.
- El consumo FIFO nunca lanza una excepción por lotes insuficientes; devuelve un déficit,
  para que un lote no quede a medio consumir sin su transmisión correspondiente.
- Una transferencia pendiente de revisión nunca cuenta como conciliada; si no, una
  transmisión real podría desaparecer del cálculo.
- Una coincidencia rechazada se guarda, no se borra, para que la siguiente pasada automática
  no la recree.
- Una operación destructiva (restaurar, reiniciar) cancela **y espera** cualquier recálculo
  en curso.

Los mismos problemas que en sistemas de pago: orden, idempotencia, conciliación y no perder
nunca un registro.

## Mi papel frente al de los agentes

Yo soy dueño de las reglas de dominio, los invariantes y los prompts de auditoría; los
agentes implementan contra ellos. Después auditan el resultado con reglas estrictas: una
copia aislada de la base, cero escrituras a producción y cada afirmación respaldada por una
consulta SQL ejecutada o un test.

Ese proceso encontró problemas críticos mucho antes de que llegaran a una declaración:

- **Una rama de procesamiento que faltaba para los retiros** en el motor: encontrada,
  corregida y verificada con datos reales.
- **Un exchange que reutiliza un campo «remark» como etiqueta de categoría**: detectado
  antes de que inflara las cifras de ingresos.
- **Unos 60 traspasos internos** que parecían pares duplicados de retiro y depósito: todos
  conciliados y verificados con una consulta que devuelve cero filas.

## Calidad y verificación

- **230 tests en verde** entre importadores, motor e informes en la última auditoría.
- **Integridad verificada con datos reales**: cero saldos de lote negativos, cero
  transmisiones huérfanas, cero descuadres entre `importe − coste ≠ ganancia`.
- Arquitectura, dominio y registros de decisión escritos para humanos y para agentes.
- Veredicto de la auditoría: el motor de cálculo es matemáticamente correcto y coherente en
  todo lo verificable.

## Estado y siguientes pasos

En uso personal para mi propia cartera de cripto y acciones/ETF, con seis exchanges, varios
brókers y 17 blockchains.
