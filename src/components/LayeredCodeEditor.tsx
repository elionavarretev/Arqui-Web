"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { LayerTab } from "@/lib/content/week1";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface LayeredCodeEditorProps {
  layers: LayerTab[];
  combinedSimulation: string;
  combinedExpectedOutput: string;
}

const SIM_TAB = -1;

export default function LayeredCodeEditor({
  layers,
  combinedSimulation,
  combinedExpectedOutput,
}: LayeredCodeEditorProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [codes, setCodes] = useState<string[]>(() => layers.map((l) => l.starterCode));
  const [done, setDone] = useState<boolean[]>(() => layers.map(() => false));
  const [showHint, setShowHint] = useState<boolean[]>(() => layers.map(() => false));
  const [showSolution, setShowSolution] = useState<boolean[]>(() => layers.map(() => false));

  // Simulation tab state
  const [simCode, setSimCode] = useState(combinedSimulation);
  const [simAttempts, setSimAttempts] = useState(0);
  const [showSimSolution, setShowSimSolution] = useState(false);
  const [output, setOutput] = useState("");
  const [simError, setSimError] = useState("");
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const SIM_ATTEMPTS_UNLOCK = 3;
  const isSimTab = activeTab === SIM_TAB;
  const doneCount = done.filter(Boolean).length;

  function updateCode(i: number, val: string) {
    setCodes((c) => c.map((v, idx) => (idx === i ? val : v)));
  }

  function markDone(i: number) {
    const alreadyDone = done[i];
    setDone((d) => d.map((v, idx) => (idx === i ? !v : v)));
    // Auto-advance to next tab (or sim) if marking as done
    if (!alreadyDone) {
      if (i < layers.length - 1) setActiveTab(i + 1);
      else setActiveTab(SIM_TAB);
    }
  }

  function resetLayer(i: number) {
    setCodes((c) => c.map((v, idx) => (idx === i ? layers[i].starterCode : v)));
    setShowHint((h) => h.map((v, idx) => (idx === i ? false : v)));
    setShowSolution((s) => s.map((v, idx) => (idx === i ? false : v)));
    setDone((d) => d.map((v, idx) => (idx === i ? false : v)));
  }

  async function runSimulation() {
    setRunning(true);
    setOutput("");
    setSimError("");
    setStatus("idle");
    setSimAttempts((a) => a + 1);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: simCode }),
      });
      const data = await res.json();
      const stdout: string = data.output ?? "";
      const stderr: string = data.error ?? "";
      setOutput(stdout);
      setSimError(stderr);
      if (stdout.trim() === combinedExpectedOutput.trim()) {
        setStatus("success");
      } else if (stderr || data.exitCode !== 0) {
        setStatus("error");
      }
    } catch {
      setSimError("Error de conexión. Verifica tu internet.");
      setStatus("error");
    } finally {
      setRunning(false);
    }
  }

  const layer = !isSimTab && activeTab >= 0 ? layers[activeTab] : null;

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] rounded-xl overflow-hidden border border-slate-700">

      {/* ── Tab bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center bg-[#181825] border-b border-slate-700 overflow-x-auto scrollbar-none">
        {layers.map((l, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            title={`${l.filename} — ${l.role}`}
            className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono whitespace-nowrap border-r border-slate-800 transition-all"
            style={{
              background: activeTab === i ? l.color + "18" : "transparent",
              color: activeTab === i ? l.color : done[i] ? "#6ee7b7" : "#475569",
              borderBottom: activeTab === i ? `2px solid ${l.color}` : "2px solid transparent",
            }}
          >
            <span style={{ color: done[i] ? "#6ee7b7" : activeTab === i ? l.color : "#475569" }}>
              {done[i] ? "✓" : `${i + 1}`}
            </span>
            <span className="hidden sm:inline">{l.filename}</span>
          </button>
        ))}

        {/* Simulation tab */}
        <button
          onClick={() => setActiveTab(SIM_TAB)}
          className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono whitespace-nowrap transition-all ml-auto border-l border-slate-800"
          style={{
            background: isSimTab ? "#6366f118" : "transparent",
            color: isSimTab ? "#818cf8" : "#475569",
            borderBottom: isSimTab ? "2px solid #6366f1" : "2px solid transparent",
          }}
        >
          <Play size={10} />
          <span className="hidden sm:inline">Simulación</span>
        </button>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div className="h-0.5 w-full bg-slate-800 flex-none">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${(doneCount / layers.length) * 100}%`, background: "#10b981" }}
        />
      </div>

      {/* ── Layer tab content ─────────────────────────────────────────── */}
      {!isSimTab && layer && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#181825] border-b border-slate-700 flex-wrap gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: layer.color + "22", color: layer.color, border: `1px solid ${layer.color}44` }}
              >
                Paso {layer.step} / {layers.length}
              </span>
              <div className="min-w-0">
                <span className="text-xs font-mono text-slate-300">{layer.filename}</span>
                <span className="text-[10px] text-slate-500 ml-2 hidden md:inline">— {layer.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowHint((h) => h.map((v, idx) => (idx === activeTab ? !v : v)))}
                className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors"
              >
                <Lightbulb size={12} />
                <span className="hidden sm:inline">Pista</span>
              </button>
              <button
                onClick={() => setShowSolution((s) => s.map((v, idx) => (idx === activeTab ? !v : v)))}
                className="text-xs text-slate-400 hover:bg-slate-400/10 px-2 py-1 rounded transition-colors"
              >
                {showSolution[activeTab] ? "Ocultar" : "Ver solución"}
              </button>
              <button
                onClick={() => resetLayer(activeTab)}
                className="p-1.5 text-slate-500 hover:bg-slate-700 rounded transition-colors"
                title="Reiniciar"
              >
                <RotateCcw size={12} />
              </button>
              <button
                onClick={() => markDone(activeTab)}
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded transition-all"
                style={
                  done[activeTab]
                    ? { background: "#10b98122", color: "#6ee7b7", border: "1px solid #10b98144" }
                    : { background: layer.color + "22", color: layer.color, border: `1px solid ${layer.color}44` }
                }
              >
                {done[activeTab] ? "✓ Listo" : "Listo →"}
              </button>
            </div>
          </div>

          {/* Role description on mobile */}
          <div className="md:hidden px-3 py-1.5 bg-slate-900/50 border-b border-slate-800">
            <span className="text-[10px] text-slate-500">{layer.role}</span>
          </div>

          {/* Hint */}
          {showHint[activeTab] && (
            <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-xs text-yellow-300 flex-none">
              💡 {layer.hint}
            </div>
          )}

          {/* Solution */}
          {showSolution[activeTab] && (
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-700 flex-none max-h-52 overflow-y-auto">
              <p className="text-xs text-emerald-400 font-semibold mb-2">✅ Solución — {layer.filename}</p>
              <pre className="text-xs text-slate-300 font-mono whitespace-pre leading-relaxed overflow-x-auto">
                {layer.solution}
              </pre>
            </div>
          )}

          {/* Editor */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              key={activeTab}
              height="100%"
              language="java"
              defaultValue={codes[activeTab]}
              onChange={(val) => updateCode(activeTab, val ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineHeight: 22,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 4,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>

          {/* Bottom nav */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#181825] border-t border-slate-700 flex-none">
            <button
              disabled={activeTab <= 0}
              onClick={() => setActiveTab((t) => t - 1)}
              className="text-xs text-slate-500 hover:text-slate-300 disabled:opacity-30 transition-colors"
            >
              ← Anterior
            </button>
            <span className="text-[10px] text-slate-600 font-mono">
              {doneCount}/{layers.length} completados
            </span>
            <button
              onClick={() =>
                activeTab < layers.length - 1
                  ? setActiveTab((t) => t + 1)
                  : setActiveTab(SIM_TAB)
              }
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {activeTab < layers.length - 1 ? "Siguiente →" : "▶ Ir a Simulación →"}
            </button>
          </div>
        </>
      )}

      {/* ── Simulation tab ────────────────────────────────────────────── */}
      {isSimTab && (
        <>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-slate-700 flex-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-60" />
              </div>
              <span className="text-xs text-slate-500 font-mono ml-1">Simulacion.java</span>
              <span className="text-[10px] text-slate-600 hidden sm:inline">— las 4 capas juntas</span>
            </div>
            <div className="flex items-center gap-2">
              {simAttempts >= SIM_ATTEMPTS_UNLOCK ? (
                <button
                  onClick={() => setShowSimSolution(!showSimSolution)}
                  className="text-xs text-slate-400 hover:bg-slate-400/10 px-2 py-1 rounded transition-colors"
                >
                  {showSimSolution ? "Ocultar" : "Ver solución"}
                </button>
              ) : (
                <span className="text-xs text-slate-600 px-2 py-1">
                  🔒 {SIM_ATTEMPTS_UNLOCK - simAttempts} intento{SIM_ATTEMPTS_UNLOCK - simAttempts !== 1 ? "s" : ""}
                </span>
              )}
              <button
                onClick={() => { setSimCode(combinedSimulation); setOutput(""); setSimError(""); setStatus("idle"); setShowSimSolution(false); }}
                className="p-1.5 text-slate-500 hover:bg-slate-700 rounded transition-colors"
              >
                <RotateCcw size={12} />
              </button>
              <button
                onClick={runSimulation}
                disabled={running}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded transition-colors"
              >
                {running ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                {running ? "Ejecutando..." : "Ejecutar"}
              </button>
            </div>
          </div>

          {/* Sim solution */}
          {showSimSolution && (
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-700 flex-none max-h-52 overflow-y-auto">
              <p className="text-xs text-emerald-400 font-semibold mb-2">✅ Simulación completa:</p>
              <pre className="text-xs text-slate-300 font-mono whitespace-pre leading-relaxed overflow-x-auto">
                {combinedSimulation}
              </pre>
            </div>
          )}

          {/* Sim intro banner */}
          {doneCount < layers.length && (
            <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20 text-xs text-indigo-300 flex-none">
              💡 Completa los {layers.length} pasos anteriores y luego ejecuta para ver las 4 capas trabajando juntas.
              <span className="text-slate-500 ml-2">{doneCount}/{layers.length} listos</span>
            </div>
          )}

          {/* Editor */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              key="simulation"
              height="100%"
              language="java"
              defaultValue={simCode}
              onChange={(val) => setSimCode(val ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineHeight: 22,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 4,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>

          {/* Console */}
          <div className="border-t border-slate-700 flex-none">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#181825] border-b border-slate-700">
              <span className="text-xs text-slate-500 font-mono">CONSOLA</span>
              {status === "success" && (
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle size={12} /> ¡Correcto! Las 4 capas funcionan.
                </span>
              )}
              {status === "error" && (
                <span className="flex items-center gap-1 text-xs text-red-400">
                  <XCircle size={12} /> Error en el código
                </span>
              )}
            </div>
            <div className="h-28 overflow-y-auto bg-[#0f1117] p-3 font-mono text-xs">
              {!output && !simError && !running && (
                <span className="text-slate-600">
                  Presiona "Ejecutar" para ver las 4 capas en acción...
                </span>
              )}
              {running && (
                <span className="text-slate-500 animate-pulse">Ejecutando Java en la nube...</span>
              )}
              {output && <pre className="text-green-300 whitespace-pre-wrap">{output}</pre>}
              {simError && <pre className="text-red-400 whitespace-pre-wrap">{simError}</pre>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
