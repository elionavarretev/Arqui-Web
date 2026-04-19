"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, BookOpen, Code2, GraduationCap, Download, ClipboardList } from "lucide-react";
import ConceptPanel from "@/components/ConceptPanel";
import CodeEditor from "@/components/CodeEditor";
import LayeredCodeEditor from "@/components/LayeredCodeEditor";
import ExamPanel from "@/components/ExamPanel";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import RecursosPanel from "@/components/RecursosPanel";
import PracticalExamPanel from "@/components/PracticalExamPanel";
import IdeEditor from "@/components/IdeEditor";
import type { WeekContent } from "@/lib/content/week1";

export default function WeekPageClient({ content }: { content: WeekContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const [examKey, setExamKey] = useState(0);
  const [mobileView, setMobileView] = useState<"teoria" | "editor">("teoria");
  const EXAM_TAB = content.exercises.length;
  const RECURSOS_TAB = content.exercises.length + 1;
  const PC1_TAB = content.exercises.length + 2;
  const isExam = activeTab === EXAM_TAB;
  const isRecursos = activeTab === RECURSOS_TAB;
  const isPC1 = activeTab === PC1_TAB;
  const exercise = (isExam || isRecursos || isPC1) ? content.exercises[0] : content.exercises[activeTab];

  const conceptColors: Record<string, string> = {
    // Semana 1 — Java OO
    clase: "#06b6d4",
    abstraccion: "#6366f1",
    encapsulamiento: "#10b981",
    herencia: "#f59e0b",
    polimorfismo: "#ec4899",
    overriding: "#f97316",
    // Semana 2 — APIs REST
    rest: "#8b5cf6",
    controller: "#10b981",
    http_verbs: "#06b6d4",
    request: "#f59e0b",
    response: "#ec4899",
    service: "#6366f1",
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
        {/* Exam tab */}
        <button
          onClick={() => { setActiveTab(EXAM_TAB); setExamKey(k => k + 1); }}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ml-2 ${
            isExam ? "text-white" : "text-slate-500 hover:text-slate-300"
          }`}
          style={isExam ? { background: "#f59e0b22", color: "#f59e0b", border: "1px solid #f59e0b44" } : {}}
        >
          <GraduationCap size={12} />
          Examen
        </button>
        {/* Recursos tab — only when week has recursos */}
        {content.recursos && content.recursos.length > 0 && (
          <button
            onClick={() => setActiveTab(RECURSOS_TAB)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ml-1 ${
              isRecursos ? "text-white" : "text-slate-500 hover:text-slate-300"
            }`}
            style={isRecursos ? { background: "#10b98122", color: "#10b981", border: "1px solid #10b98144" } : {}}
          >
            <Download size={12} />
            Recursos
          </button>
        )}
        {/* TallerPC tab — only when week has practicalExam */}
        {content.practicalExam && (
          <button
            onClick={() => setActiveTab(PC1_TAB)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ml-1 ${
              isPC1 ? "text-white" : "text-slate-500 hover:text-slate-300"
            }`}
            style={isPC1 ? { background: "#ef444422", color: "#ef4444", border: "1px solid #ef444444" } : {}}
          >
            <ClipboardList size={12} />
            TallerPC
          </button>
        )}
      </div>

      {/* Mobile toggle: Teoría / Editor (exercises + TallerPC) */}
      {!isExam && !isRecursos && (
        <div className="flex-none md:hidden flex border-b border-slate-800 bg-[#0d0f18]">
          <button
            onClick={() => setMobileView("teoria")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${
              mobileView === "teoria" ? "text-white border-b-2" : "text-slate-500"
            }`}
            style={mobileView === "teoria" ? { borderColor: isPC1 ? "#ef4444" : color } : {}}
          >
            <BookOpen size={13} />
            {isPC1 ? "Enunciado" : "Teoría"}
          </button>
          <button
            onClick={() => setMobileView("editor")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${
              mobileView === "editor" ? "text-white border-b-2" : "text-slate-500"
            }`}
            style={mobileView === "editor" ? { borderColor: isPC1 ? "#ef4444" : color } : {}}
          >
            <Code2 size={13} />
            Editor
          </button>
        </div>
      )}

      {/* Main layout */}
      <div className="flex-1 min-h-0 flex flex-col md:grid md:gap-0"
        style={{ gridTemplateColumns: (isExam || isRecursos) ? "1fr" : "1fr 1fr" }}>

        {/* EXAM VIEW */}
        {isExam && (
          <div className="flex-1 min-h-0 overflow-hidden bg-[#0d0f18]">
            <ExamPanel key={examKey} questions={content.exam} conceptColor="#f59e0b" weekNumber={content.week} weekTitle={content.title} />
          </div>
        )}

        {/* RECURSOS VIEW */}
        {isRecursos && content.recursos && (
          <RecursosPanel recursos={content.recursos} weekNumber={content.week} />
        )}

        {/* TallerPC — LEFT: Enunciado */}
        {isPC1 && content.practicalExam && (
          <div className={`md:border-r md:border-slate-800 md:overflow-hidden md:block
            ${mobileView === "teoria" ? "flex flex-col flex-1 min-h-0 overflow-hidden" : "hidden"}`}>
            <PracticalExamPanel exam={content.practicalExam} />
          </div>
        )}

        {/* TallerPC — RIGHT: Editor de código */}
        {isPC1 && content.practicalExam && (
          <div className={`md:p-4 md:overflow-hidden md:block
            ${mobileView === "editor" ? "flex flex-col flex-1 min-h-0 p-3 overflow-hidden" : "hidden"}`}>
            {content.practicalExam.layers && content.practicalExam.layers.length > 0 ? (
              <IdeEditor
                layers={content.practicalExam.layers}
                projectName="pc1-musica"
              />
            ) : (
              <CodeEditor
                starterCode={content.practicalExam.starterCode ?? "// Escribe tu solución aquí"}
                solution={content.practicalExam.solution ?? ""}
                hint={content.practicalExam.hint ?? ""}
                expectedOutput=""
              />
            )}
          </div>
        )}

        {/* Left: Concept */}
        {!isExam && !isRecursos && !isPC1 && (
          <div className={`md:border-r md:border-slate-800 md:p-6 md:overflow-y-auto md:block
            ${mobileView === "teoria" ? "flex flex-col flex-1 min-h-0 p-4 overflow-y-auto" : "hidden"}`}
          >
            <ConceptPanel
              title={exercise.title}
              conceptLabel={exercise.conceptLabel}
              conceptColor={color}
              explanation={exercise.explanation}
              analogy={exercise.analogy}
              diagram={exercise.diagram}
              diagramComponent={exercise.concept === "service" ? <ArchitectureDiagram /> : undefined}
            />
          </div>
        )}

        {/* Right: Editor */}
        {!isExam && !isRecursos && !isPC1 && (
          <div className={`md:p-4 md:overflow-hidden md:block
            ${mobileView === "editor" ? "flex flex-col flex-1 min-h-0 p-3 overflow-hidden" : "hidden"}`}
          >
            {exercise.layers && exercise.combinedSimulation && exercise.combinedExpectedOutput ? (
              <LayeredCodeEditor
                layers={exercise.layers}
                combinedSimulation={exercise.combinedSimulation}
                combinedExpectedOutput={exercise.combinedExpectedOutput}
              />
            ) : (
              <CodeEditor
                starterCode={exercise.starterCode}
                solution={exercise.solution}
                hint={exercise.hint}
                expectedOutput={exercise.expectedOutput}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
