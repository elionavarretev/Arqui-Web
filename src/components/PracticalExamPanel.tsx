"use client";

import type { PracticalExam } from "@/lib/content/week1";
import { Clock, Database, CheckCircle2, AlertCircle, Terminal } from "lucide-react";

export default function PracticalExamPanel({ exam }: { exam: PracticalExam }) {
  const huColors: Record<string, string> = {
    HU01: "#10b981",
    HU02: "#6366f1",
    HU03: "#f59e0b",
    HU04: "#ec4899",
  };

  return (
    <div className="h-full overflow-y-auto bg-[#0d0f18] px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded">
              Examen Práctico
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
              <Clock size={11} />
              {exam.duration} minutos
            </span>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
              {exam.points} puntos
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mb-1">{exam.title}</h1>
          <p className="text-slate-400 text-sm leading-relaxed">{exam.context}</p>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Tecnologías requeridas</h2>
          <div className="flex flex-wrap gap-2">
            {exam.technologies.map((tech) => (
              <span key={tech} className="text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tables */}
        <div>
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Database size={12} />
            Modelo de datos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exam.tables.map((table) => (
              <div key={table.name} className="bg-[#13141f] border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-800/60 px-4 py-2 border-b border-slate-700">
                  <span className="text-xs font-mono text-indigo-400 font-bold">@Entity</span>
                  <span className="text-sm font-bold text-white ml-2">{table.name}</span>
                </div>
                <ul className="px-4 py-3 space-y-1.5">
                  {table.fields.map((field) => (
                    <li key={field} className="flex items-start gap-2 text-xs font-mono text-slate-400">
                      <span className="text-slate-600 mt-0.5">▸</span>
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 font-mono mt-2">
            Cancion.idArtista es FK → Artista (@ManyToOne)
          </p>
        </div>

        {/* User Stories */}
        <div>
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Historias de usuario</h2>
          <div className="space-y-4">
            {exam.userStories.map((hu) => {
              const color = huColors[hu.id] ?? "#6366f1";
              return (
                <div
                  key={hu.id}
                  className="bg-[#13141f] border rounded-xl overflow-hidden"
                  style={{ borderColor: color + "33" }}
                >
                  {/* HU Header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 border-b"
                    style={{ borderColor: color + "22", background: color + "11" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{ color, background: color + "22", border: `1px solid ${color}44` }}
                      >
                        {hu.id}
                      </span>
                      <span className="text-sm font-semibold text-white">{hu.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span style={{ color }}>{hu.points} pts</span>
                      <span className="text-slate-600">/ {hu.promptPoints} promedio</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-slate-400 text-xs italic leading-relaxed">{hu.description}</p>
                  </div>

                  {/* Criteria */}
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Criterios de aceptación</p>
                    <ul className="space-y-1.5">
                      {hu.criteria.map((criterion, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color }} />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Naming Conventions */}
        <div>
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Terminal size={12} />
            Convenciones de nombres (obligatorio)
          </h2>
          <div className="bg-[#13141f] border border-amber-900/30 rounded-xl overflow-hidden">
            <div className="bg-amber-950/20 px-4 py-2 border-b border-amber-900/20">
              <div className="flex items-center gap-2">
                <AlertCircle size={12} className="text-amber-400" />
                <span className="text-xs font-mono text-amber-400 font-semibold">El incumplimiento descuenta puntos</span>
              </div>
            </div>
            <ul className="px-4 py-3 space-y-2">
              {exam.namingConventions.map((conv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-mono text-slate-400 leading-relaxed">
                  <span className="text-amber-600 shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                  <span>{conv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rubric summary */}
        <div>
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Rúbrica de evaluación</h2>
          <div className="bg-[#13141f] border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40">
                  <th className="text-left px-4 py-2 font-mono text-slate-400">Criterio</th>
                  <th className="text-center px-3 py-2 font-mono text-green-400">Excelente</th>
                  <th className="text-center px-3 py-2 font-mono text-yellow-400">Promedio</th>
                  <th className="text-center px-3 py-2 font-mono text-red-400">Deficiente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {exam.userStories.map((hu) => (
                  <tr key={hu.id} className="hover:bg-slate-800/20">
                    <td className="px-4 py-2 text-slate-300 font-mono">{hu.id} — {hu.title}</td>
                    <td className="px-3 py-2 text-center text-green-400 font-mono">{hu.points} pts</td>
                    <td className="px-3 py-2 text-center text-yellow-400 font-mono">{hu.promptPoints} pts</td>
                    <td className="px-3 py-2 text-center text-red-400 font-mono">0 pts</td>
                  </tr>
                ))}
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 text-slate-300 font-mono">C01 — Organización del código</td>
                  <td className="px-3 py-2 text-center text-green-400 font-mono">1 pt</td>
                  <td className="px-3 py-2 text-center text-yellow-400 font-mono">—</td>
                  <td className="px-3 py-2 text-center text-red-400 font-mono">-1 pt</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 text-slate-300 font-mono">C02 — Convenciones de nombre</td>
                  <td className="px-3 py-2 text-center text-green-400 font-mono">3 pts</td>
                  <td className="px-3 py-2 text-center text-yellow-400 font-mono">—</td>
                  <td className="px-3 py-2 text-center text-red-400 font-mono">-1 x ítem</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 text-slate-300 font-mono">C03 — Proyecto creado desde cero</td>
                  <td className="px-3 py-2 text-center text-green-400 font-mono">—</td>
                  <td className="px-3 py-2 text-center text-yellow-400 font-mono">—</td>
                  <td className="px-3 py-2 text-center text-red-400 font-mono">-2 / -3</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 text-slate-300 font-mono">C04 — Código limpio</td>
                  <td className="px-3 py-2 text-center text-green-400 font-mono">1 pt</td>
                  <td className="px-3 py-2 text-center text-yellow-400 font-mono">—</td>
                  <td className="px-3 py-2 text-center text-red-400 font-mono">-3 pts</td>
                </tr>
                <tr className="bg-slate-800/30 font-bold">
                  <td className="px-4 py-2 text-white font-mono">Total</td>
                  <td className="px-3 py-2 text-center text-white font-mono">15 pts</td>
                  <td className="px-3 py-2 text-center text-slate-400 font-mono">—</td>
                  <td className="px-3 py-2 text-center text-slate-400 font-mono">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-3">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-400 font-semibold">Nota:</span> Se califica funcionalidad. Puedes usar material del curso, StackOverflow y GitHub como referencia.
            No se permite intercambiar material con compañeros. La entrega es en la carpeta del laboratorio asignada — no en el aula virtual.
          </p>
        </div>

      </div>
    </div>
  );
}
