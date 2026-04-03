"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle, Loader2 } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  starterCode: string;
  solution: string;
  hint: string;
  expectedOutput: string;
}

export default function CodeEditor({ starterCode, solution, hint, expectedOutput }: CodeEditorProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const runCode = async () => {
    setRunning(true);
    setOutput("");
    setError("");
    setStatus("idle");
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      const stdout = data.output ?? "";
      const stderr = data.error ?? "";
      setOutput(stdout);
      setError(stderr);
      if (stdout.trim() === expectedOutput.trim()) {
        setStatus("success");
      } else if (stderr || data.exitCode !== 0) {
        setStatus("error");
      }
    } catch (e) {
      setError("Error de conexión. Verifica tu internet.");
      setStatus("error");
    } finally {
      setRunning(false);
    }
  };

  const reset = () => {
    setCode(starterCode);
    setOutput("");
    setError("");
    setStatus("idle");
    setShowHint(false);
    setShowSolution(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] rounded-xl overflow-hidden border border-slate-700">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-60" />
          <span className="ml-2 text-xs text-slate-500 font-mono">Main.java</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors"
          >
            <Lightbulb size={12} />
            Pista
          </button>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:bg-slate-400/10 rounded transition-colors"
          >
            Ver solución
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:bg-slate-400/10 rounded transition-colors"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={runCode}
            disabled={running}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded transition-colors"
          >
            {running ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {running ? "Ejecutando..." : "Ejecutar"}
          </button>
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-xs text-yellow-300">
          💡 {hint}
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700">
          <p className="text-xs text-slate-400 mb-2">Solución:</p>
          <MonacoEditor
            height="200px"
            language="java"
            value={solution}
            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12, lineNumbers: "off", scrollBeyondLastLine: false }}
            theme="vs-dark"
          />
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language="java"
          value={code}
          onChange={(val) => setCode(val ?? "")}
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

      {/* Output Console */}
      <div className="border-t border-slate-700">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#181825] border-b border-slate-700">
          <span className="text-xs text-slate-500 font-mono">CONSOLA</span>
          {status === "success" && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <CheckCircle size={12} /> ¡Correcto!
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1 text-xs text-red-400">
              <XCircle size={12} /> Error en el código
            </span>
          )}
        </div>
        <div className="h-28 overflow-y-auto bg-[#0f1117] p-3 font-mono text-xs">
          {!output && !error && !running && (
            <span className="text-slate-600">Presiona "Ejecutar" para ver el output aquí...</span>
          )}
          {running && <span className="text-slate-500 animate-pulse">Ejecutando Java en la nube...</span>}
          {output && <pre className="text-green-300 whitespace-pre-wrap">{output}</pre>}
          {error && <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>}
        </div>
      </div>
    </div>
  );
}
