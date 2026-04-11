"use client";

import { useState } from "react";
import { Download, Lock, Unlock, FileArchive, AlertCircle } from "lucide-react";
import type { Recurso } from "@/lib/content/week1";

interface RecursosPanelProps {
  recursos: Recurso[];
  weekNumber: number;
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
      <div className="p-5">
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
    </div>
  );
}

export default function RecursosPanel({ recursos, weekNumber }: RecursosPanelProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-[#0d0f18] p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
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
