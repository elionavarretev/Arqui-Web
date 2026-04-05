import type { ReactNode } from "react";

interface ConceptPanelProps {
  title: string;
  conceptLabel: string;
  conceptColor: string;
  explanation: string;
  analogy: string;
  diagram: string;
  diagramComponent?: ReactNode;
}

export default function ConceptPanel({ title, conceptLabel, conceptColor, explanation, analogy, diagram, diagramComponent }: ConceptPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Concept badge */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
          style={{ background: conceptColor + "22", color: conceptColor, border: `1px solid ${conceptColor}44` }}
        >
          {conceptLabel}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      {/* Diagram — interactive component or static SVG */}
      <div className="flex-shrink-0 mb-5">
        {diagramComponent ?? (
          <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#1e2030] [&_svg]:block [&_svg]:w-full">
            <div dangerouslySetInnerHTML={{ __html: diagram }} />
          </div>
        )}
      </div>

      {/* Analogy */}
      <div className="mb-4 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300 italic">
        {analogy}
      </div>

      {/* Explanation */}
      <div
        className="concept-prose text-sm flex-1"
        dangerouslySetInnerHTML={{ __html: explanation }}
      />
    </div>
  );
}
