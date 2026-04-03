"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ConceptPanel from "@/components/ConceptPanel";
import CodeEditor from "@/components/CodeEditor";
import type { WeekContent } from "@/lib/content/week1";

export default function WeekPageClient({ content }: { content: WeekContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const exercise = content.exercises[activeTab];

  const conceptColors: Record<string, string> = {
    abstraccion: "#6366f1",
    encapsulamiento: "#10b981",
    herencia: "#f59e0b",
    polimorfismo: "#ec4899",
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f1117] overflow-hidden">
      {/* Top Bar */}
      <header className="flex-none flex items-center gap-4 px-6 py-3 border-b border-slate-800 bg-[#0f1117]">
        <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm">
          <ChevronLeft size={16} />
          Inicio
        </Link>
        <div className="h-4 w-px bg-slate-700" />
        <div>
          <span className="text-xs font-mono text-slate-500">Semana {content.week} · </span>
          <span className="text-sm font-semibold text-white">{content.title}</span>
        </div>
        <div className="ml-auto text-xs text-slate-600 font-mono">ASI705 · UPC 2026-10</div>
      </header>

      {/* Exercise Tabs */}
      <div className="flex-none flex items-center gap-1 px-6 py-2 border-b border-slate-800 bg-[#0d0f18]">
        {content.exercises.map((ex, i) => {
          const color = conceptColors[ex.concept];
          return (
            <button
              key={ex.id}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === i
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              style={activeTab === i ? { background: color + "22", color, border: `1px solid ${color}44` } : {}}
            >
              {i + 1}. {ex.title}
            </button>
          );
        })}
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-0">
        {/* Left: Concept */}
        <div className="border-r border-slate-800 p-6 overflow-y-auto">
          <ConceptPanel
            title={exercise.title}
            conceptLabel={exercise.conceptLabel}
            conceptColor={conceptColors[exercise.concept]}
            explanation={exercise.explanation}
            analogy={exercise.analogy}
            diagram={exercise.diagram}
          />
        </div>

        {/* Right: Editor */}
        <div className="p-4 overflow-hidden">
          <CodeEditor
            starterCode={exercise.starterCode}
            solution={exercise.solution}
            hint={exercise.hint}
            expectedOutput={exercise.expectedOutput}
          />
        </div>
      </div>
    </div>
  );
}
