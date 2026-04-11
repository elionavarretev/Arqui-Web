"use client";

import { useState } from "react";
import { Download, Lock, Unlock, FileArchive, AlertCircle } from "lucide-react";
import type { Recurso } from "@/lib/content/week1";

interface RecursosPanelProps {
  recursos: Recurso[];
  weekNumber: number;
}

const METHOD_COLORS: Record<string, string> = {
  GET:    { bg: "#0ea5e918", text: "#38bdf8", border: "#0ea5e940" } as unknown as string,
  POST:   { bg: "#10b98118", text: "#34d399", border: "#10b98140" } as unknown as string,
  PUT:    { bg: "#f59e0b18", text: "#fbbf24", border: "#f59e0b40" } as unknown as string,
  DELETE: { bg: "#ef444418", text: "#f87171", border: "#ef444440" } as unknown as string,
};

function MethodBadge({ method }: { method: string }) {
  const c = METHOD_COLORS[method] as unknown as { bg: string; text: string; border: string };
  return (
    <span
      className="inline-block text-[10px] font-bold px-2 py-0.5 rounded font-mono whitespace-nowrap"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {method}
    </span>
  );
}

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleUnlock() {
    if (input.trim() === recurso.password) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  }

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-[#181825]">
      {/* Header */}
      <div className="flex items-start gap-3 p-5 border-b border-slate-700">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <FileArchive size={18} className="text-indigo-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{recurso.title}</p>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{recurso.description}</p>
          {recurso.fileLabel && (
            <p className="text-[10px] font-mono text-slate-600 mt-2">{recurso.fileLabel}</p>
          )}
        </div>
      </div>

      {/* Password gate / Download */}
      <div className="p-5 border-b border-slate-700">
        {!unlocked ? (
          <div>
            <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
              <Lock size={11} />
              Este archivo requiere clave de acceso
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="Ingresa la clave..."
                className="flex-1 bg-[#0f1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleUnlock}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Acceder
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-400 mt-2">
                <AlertCircle size={11} />
                Clave incorrecta. Inténtalo de nuevo.
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-xs text-emerald-400 mb-3 flex items-center gap-1.5">
              <Unlock size={11} />
              Acceso concedido — descarga disponible
            </p>
            <a
              href={`/recursos/${recurso.filename}`}
              download={recurso.filename}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download size={14} />
              Descargar {recurso.filename}
            </a>
          </div>
        )}
      </div>

      {/* Postman tests table */}
      {recurso.postmanTests && recurso.postmanTests.length > 0 && (
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xs font-semibold text-slate-300">Pruebas con Postman</p>
            {recurso.baseUrl && (
              <span className="text-[10px] font-mono text-slate-600 bg-slate-800 px-2 py-0.5 rounded">
                Base URL: {recurso.baseUrl}
              </span>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 text-left">
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Método</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Endpoint</th>
                  <th className="px-3 py-2 font-medium">Descripción</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Body requerido</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Respuesta</th>
                </tr>
              </thead>
              <tbody>
                {recurso.postmanTests.map((t, i) => (
                  <tr key={i} className="border-t border-slate-700/60 hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2.5">
                      <MethodBadge method={t.method} />
                    </td>
                    <td className="px-3 py-2.5 font-mono text-indigo-300 whitespace-nowrap">{t.endpoint}</td>
                    <td className="px-3 py-2.5 text-slate-300">{t.description}</td>
                    <td className="px-3 py-2.5 font-mono text-slate-400">
                      {t.body ? (
                        <span className="text-amber-300">{t.body}</span>
                      ) : (
                        <span className="text-slate-600">— ninguno —</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-emerald-400 whitespace-nowrap">{t.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* JSON examples */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-mono text-slate-500 mb-1.5">Ejemplo POST /productos</p>
              <pre className="bg-[#0f1117] border border-slate-700 rounded-lg p-3 text-xs text-emerald-300 font-mono leading-relaxed overflow-x-auto">
{`{
  "nombre": "Monitor",
  "precio": 299.99
}`}
              </pre>
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-500 mb-1.5">Respuesta GET /productos</p>
              <pre className="bg-[#0f1117] border border-slate-700 rounded-lg p-3 text-xs text-sky-300 font-mono leading-relaxed overflow-x-auto">
{`[
  { "id": 1, "nombre": "Laptop",
    "precio": 1500.99 },
  { "id": 2, "nombre": "Mouse",
    "precio": 25.50 },
  { "id": 3, "nombre": "Teclado",
    "precio": 45.75 }
]`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecursosPanel({ recursos, weekNumber }: RecursosPanelProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-[#0d0f18] p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-1">Recursos — Semana {weekNumber}</h2>
          <p className="text-sm text-slate-400">
            Archivos de apoyo para el taller. Ingresa la clave que te dio el profesor para descargar.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {recursos.map((r) => (
            <RecursoCard key={r.filename} recurso={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
