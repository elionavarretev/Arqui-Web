# Arqui Web — Plataforma de Aprendizaje ASI705 · UPC 2026-10

Plataforma interactiva para el curso **Arquitectura Web (ASI705)** de UPC. Los estudiantes aprenden Java OO y Spring Boot con ejercicios guiados, editor de código en vivo y exámenes de teoría por semana.

**Produccion:** https://arqui-web-two.vercel.app

---

## Stack

- **Next.js 16.2.2** — App Router, `generateStaticParams` para semanas
- **Tailwind CSS v4** — sin JIT, NO usar clases dinamicas generadas en runtime
- **Monaco Editor** (`@monaco-editor/react`) — editor Java en el navegador
- **TypeScript** estricto
- **Vercel** — deploy con integracion GitHub (o CLI desde `/opt/homebrew/bin/vercel`)

---

## Estructura de archivos clave

```
src/
├── app/
│   ├── page.tsx                          # Homepage con lista de semanas
│   ├── semana/[week]/
│   │   ├── page.tsx                      # Server component — carga WeekContent
│   │   └── WeekPageClient.tsx            # Client component — tabs, layout, editor/exam
│   └── api/execute/route.ts              # Ejecuta Java via Wandbox API
│
├── components/
│   ├── CodeEditor.tsx                    # Editor Monaco single-file
│   ├── LayeredCodeEditor.tsx             # Editor multi-tab por capas (ejercicio "service")
│   ├── ArchitectureDiagram.tsx           # Diagrama animado interactivo
│   ├── ConceptPanel.tsx                  # Panel izquierdo: teoria + diagrama
│   └── ExamPanel.tsx                     # Examen de teoria con localStorage
│
└── lib/content/
    ├── week1.ts                          # Semana 1: Java OO + interfaces exportadas
    └── week2.ts                          # Semana 2: APIs REST / Spring Boot
```

---

## Agregar una nueva semana

1. Crear `src/lib/content/weekN.ts` e importar los tipos desde `week1.ts`:
   ```ts
   import type { ExamQuestion, WeekContent, LayerTab } from "./week1"
   ```
2. Exportar `weekN: WeekContent` con `week: N`, `exercises[]` y `exam[]` (25 preguntas)
3. En `src/app/semana/[week]/page.tsx` — agregar al mapa y a `generateStaticParams`
4. En `src/app/page.tsx` — agregar la semana con `available: true`
5. En `WeekPageClient.tsx` — agregar los colores del concepto en `conceptColors`

### Estructura de un Exercise

```ts
{
  id: string               // clave unica, debe tener entrada en conceptColors (WeekPageClient)
  title: string
  concept: string
  conceptLabel: string
  conceptColor: string     // hex
  explanation: string      // HTML
  analogy: string
  diagram: string          // SVG inline (ignorado si se pasa diagramComponent)
  starterCode: string      // Java — codigo inicial
  solution: string         // Java — se muestra tras N intentos
  hint: string
  expectedOutput: string   // output exacto para marcar como correcto

  // Solo para el editor por capas (LayeredCodeEditor):
  layers?: LayerTab[]
  combinedSimulation?: string
  combinedExpectedOutput?: string
}
```

### LayeredCodeEditor (editor por capas)

Se activa cuando `exercise.layers` esta definido. Un tab por capa con:
- Badge "Paso N / Total", archivo, rol, pista, solucion, "Listo ->" que avanza al siguiente
- Barra de progreso N/total completados
- Tab final "Simulacion" que ejecuta el `combinedSimulation` completo

Actualmente solo lo usa el ejercicio `service` de Semana 2.

### ArchitectureDiagram

Componente React animado. Se inyecta como `diagramComponent` en ConceptPanel cuando
`exercise.concept === "service"` (WeekPageClient ~linea 139).

- `STEP_DURATION = 2200` ms por paso
- 5 capas verticales: Cliente > @RestController > @Service > [@Repository|@Entity] > Base de Datos
- Clickeable: muestra codigo Java real de cada capa

---

## ExamPanel — comportamiento clave

- **25 preguntas**, orden aleatorio (Fisher-Yates shuffle en cada inicio)
- **Umbral: 90%** (`PASS_THRESHOLD = 90` en ExamPanel.tsx)
- **localStorage** con scope por semana: `asi705_semana${week}_results`, `_bookmarks`, `_failed`
- Resetea al hacer click en tab "Examen" via `key={examKey}` en WeekPageClient
- Modos disponibles: `"completo"` | `"fallidas"` | `"marcadas"`
- IMPORTANTE: al cambiar claves de localStorage agregar migracion en `migrateStorage(week)`
  para no romper datos existentes de usuarios

---

## Ejecucion de codigo Java

`src/app/api/execute/route.ts` — proxy hacia **Wandbox API**. Codigo enviado como `prog.java`.

No soporta Spring Boot real (anotaciones, contexto, JPA). Los ejercicios usan clases Java
standalone con `main()` que simulan el comportamiento de las capas.

---

## Deploy

```bash
# Push a main dispara deploy automatico por integracion GitHub-Vercel
git push origin main

# O manualmente (node no esta en PATH por defecto en este equipo):
PATH="/opt/homebrew/opt/node/bin:$PATH" /opt/homebrew/bin/vercel --prod --yes
```

---

## Dev local

```bash
npm run dev     # http://localhost:3000
# Claude Code preview usa puerto 3001 (ver .claude/launch.json)
```

---

## Semanas disponibles

| Semana | Tema | Ejercicios | Examen |
|--------|------|-----------|--------|
| 1 | Java OO (clases, herencia, polimorfismo, overriding) | 6 | 25 preguntas |
| 2 | APIs REST / Spring Boot (@RestController, verbos HTTP, @Service y Capas) | 6 | 25 preguntas |
| 3+ | Pendiente | — | — |
