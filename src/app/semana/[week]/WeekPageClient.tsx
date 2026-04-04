"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, BookOpen, Code2 } from "lucide-react";
import ConceptPanel from "@/components/ConceptPanel";
import CodeEditor from "@/components/CodeEditor";
import type { WeekContent } from "@/lib/content/week1";

export default function WeekPageClient({ content }: { content: WeekContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileView, setMobileView] = useState<"teoria" | "editor">("teoria");
  const exercise = content.exercises[activeTab];

  const conceptColors: Record<string, string> = {
    clase: "#06b6d4",
    abstraccion: "#6366f1",
    encapsulamiento: "#10b981",
    herencia: "#f59e0b",
    polimorfismo: "#ec4899",
    overriding: "#f97316",
  };

  const color = conceptColors[exercise.concept];

  return (
    <div className="flex flex-col h-screen bg-[#0f1117] overflow-hidden">

      {/* Top Bar */}
      <header className="flex-none flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-[#0f1117]">
        <Link
          href="/"
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm shrink-0"
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline">Inicio</span>
        </Link>
        <div className="h-4 w-px bg-slate-700 shrink-0" />
        <div className="min-w-0 flex-1">
          <span className="text-xs font-mono text-slate-500">Semana {content.week} · </span>
          <span className="text-sm font-semibold text-white truncate">{content.title}</span>
        </div>
        <div className="shrink-0 text-xs text-slate-600 font-mono hidden md:block">ASI705 · UPC 2026-10</div>
      </header>

      {/* Exercise Tabs — scrollable on mobile */}
      <div className="flex-none flex items-center gap-1 px-3 py-2 border-b border-slate-800 bg-[#0d0f18] overflow-x-auto scrollbar-none">
        {content.exercises.map((ex, i) => {
          const c = conceptColors[ex.concept];
          return (
            <button
              key={ex.id}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === i
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              style={activeTab === i ? { background: c + "22", color: c, border: `1px solid ${c}44` } : {}}
            >
              {i + 1}. {ex.title}
            </button>
          );
        })}
      </div>

      {/* Mobile toggle: Teoría / Editor */}
      <div className="flex-none md:hidden flex border-b border-slate-800 bg-[#0d0f18]">
        <button
          onClick={() => setMobileView("teoria")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${
            mobileView === "teoria"
              ? "text-white border-b-2"
              : "text-slate-500"
          }`}
          style={mobileView === "teoria" ? { borderColor: color } : {}}
        >
          <BookOpen size={13} />
          Teoría
        </button>
        <button
          onClick={() => setMobileView("editor")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${
            mobileView === "editor"
              ? "text-white border-b-2"
              : "text-slate-500"
          }`}
          style={mobileView === "editor" ? { borderColor: color } : {}}
        >
          <Code2 size={13} />
          Editor
        </button>
      </div>

      {/* Main layout */}
      <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-2 md:gap-0">

        {/* Left: Concept — hidden on mobile when editor is active */}
        <div
          className={`md:border-r md:border-slate-800 md:p-6 md:overflow-y-auto md:block
            ${mobileView === "teoria" ? "flex flex-col flex-1 min-h-0 p-4 overflow-y-auto" : "hidden"}`}
        >
          <ConceptPanel
            title={exercise.title}
            conceptLabel={exercise.conceptLabel}
            conceptColor={color}
            explanation={exercise.explanation}
            analogy={exercise.analogy}
            diagram={exercise.diagram}
          />
        </div>

        {/* Right: Editor — hidden on mobile when teoria is active */}
        <div
          className={`md:p-4 md:overflow-hidden md:block
            ${mobileView === "editor" ? "flex flex-col flex-1 min-h-0 p-3 overflow-hidden" : "hidden"}`}
        >
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
