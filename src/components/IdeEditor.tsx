"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Lightbulb, RotateCcw, ChevronDown, ChevronRight } from "lucide-react";
import type { LayerTab } from "@/lib/content/week1";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface IdeEditorProps {
  layers: LayerTab[];
  projectName?: string;
  packageBase?: string;
}

// ── Icon primitives ────────────────────────────────────────────────────────────

function FolderIcon({ color = "#f59e0b", size = 13 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 4.5C1 3.67 1.67 3 2.5 3H6l1.5 2H13.5c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-11C1.67 14 1 13.33 1 12.5V4.5z" fill={color} fillOpacity="0.85" />
    </svg>
  );
}

function FolderOpenIcon({ color = "#f59e0b", size = 13 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 4.5C1 3.67 1.67 3 2.5 3H6l1.5 2H13.5c.83 0 1.5.67 1.5 1.5v.5H1V4.5z" fill={color} fillOpacity="0.9" />
      <path d="M1 7h14l-1.5 7H2.5L1 7z" fill={color} fillOpacity="0.7" />
    </svg>
  );
}

function JavaIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect width="16" height="16" rx="3" fill="#2196F3" />
      <text x="4" y="12" fontSize="9" fontFamily="serif" fontWeight="bold" fill="white">C</text>
    </svg>
  );
}

function JavaGreenIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect width="16" height="16" rx="3" fill="#4CAF50" />
      <text x="4" y="12" fontSize="9" fontFamily="serif" fontWeight="bold" fill="white">C</text>
    </svg>
  );
}

function XmlIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect width="16" height="16" rx="2" fill="#E53935" />
      <text x="1" y="11" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="white">XML</text>
    </svg>
  );
}

function PropertiesIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect width="16" height="16" rx="2" fill="#607D8B" />
      <path d="M3 5h10M3 8h8M3 11h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Folder colours matching IntelliJ layers ────────────────────────────────────

const FOLDER_COLORS: Record<string, string> = {
  entities:     "#f59e0b",
  dto:          "#a855f7",
  repositories: "#10b981",
  services:     "#6366f1",
  controllers:  "#06b6d4",
  resources:    "#94a3b8",
};

// Folders that are collapsible + collapsed by default
const DEFAULT_COLLAPSED = new Set([".idea", "target", "test"]);

// ── Component ──────────────────────────────────────────────────────────────────

export default function IdeEditor({
  layers,
  projectName = "pc1-proyecto",
  packageBase = "com.example.abcd",
}: IdeEditorProps) {
  const [active, setActive]     = useState(0);
  const [codes, setCodes]       = useState(() => layers.map((l) => l.starterCode));
  const [done, setDone]         = useState(() => layers.map(() => false));
  const [showHint, setShowHint] = useState(false);
  const [showSol, setShowSol]   = useState(false);
  const [pwInput, setPwInput]   = useState("");
  const [pwError, setPwError]   = useState(false);
  const [showPwInput, setShowPwInput] = useState(false);

  // Build folder → file-index map
  const folderMap: Record<string, number[]> = {};
  layers.forEach((l, i) => {
    const key = l.folder ?? "__root__";
    if (!folderMap[key]) folderMap[key] = [];
    folderMap[key].push(i);
  });

  // Collect all tree-node keys that can be toggled
  const allToggleKeys = [
    ".idea", "src", "main", "java", packageBase,
    "entities", "dto", "repositories", "services", "controllers",
    "resources", "test", "target",
    ...Object.keys(folderMap),
  ];

  const [openNodes, setOpenNodes] = useState<Set<string>>(() => {
    const s = new Set(allToggleKeys);
    DEFAULT_COLLAPSED.forEach((k) => s.delete(k));
    return s;
  });

  function toggle(key: string) {
    setOpenNodes((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function isOpen(key: string) {
    return openNodes.has(key);
  }

  function selectFile(i: number) {
    setActive(i);
    setShowHint(false);
    setShowSol(false);
    setPwInput("");
    setPwError(false);
    setShowPwInput(false);
  }

  function updateCode(val: string) {
    setCodes((c) => c.map((v, idx) => (idx === active ? val : v)));
  }

  function markDone() {
    const was = done[active];
    setDone((d) => d.map((v, idx) => (idx === active ? !v : v)));
    if (!was && active < layers.length - 1) selectFile(active + 1);
  }

  function reset() {
    setCodes((c) => c.map((v, idx) => (idx === active ? layers[active].starterCode : v)));
    setShowHint(false);
    setShowSol(false);
    setPwInput("");
    setPwError(false);
    setShowPwInput(false);
    setDone((d) => d.map((v, idx) => (idx === active ? false : v)));
  }

  const layer     = layers[active];
  const doneCount = done.filter(Boolean).length;

  // ── Tree helpers ─────────────────────────────────────────────────────────────

  function ChevronBtn({ nodeKey }: { nodeKey: string }) {
    return isOpen(nodeKey)
      ? <ChevronDown  size={9} className="shrink-0 text-slate-500" />
      : <ChevronRight size={9} className="shrink-0 text-slate-500" />;
  }

  function TreeDir({
    nodeKey,
    label,
    color = "#f59e0b",
    depth = 0,
    decorative = false,
    children,
  }: {
    nodeKey: string;
    label: string;
    color?: string;
    depth?: number;
    decorative?: boolean;
    children?: React.ReactNode;
  }) {
    const open = isOpen(nodeKey);
    return (
      <div>
        <button
          onClick={decorative ? undefined : () => toggle(nodeKey)}
          className="w-full flex items-center gap-1 py-[2px] text-[11px] font-mono truncate transition-colors rounded hover:bg-slate-700/30"
          style={{
            paddingLeft: `${6 + depth * 10}px`,
            color: decorative ? "#475569" : "#c4c4d4",
            cursor: decorative ? "default" : "pointer",
          }}
        >
          <ChevronBtn nodeKey={nodeKey} />
          {open
            ? <FolderOpenIcon color={color} size={13} />
            : <FolderIcon     color={color} size={13} />}
          <span className="ml-1 truncate">{label}</span>
        </button>
        {open && children && (
          <div>{children}</div>
        )}
      </div>
    );
  }

  function StaticFile({
    label,
    depth = 0,
    icon,
  }: {
    label: string;
    depth?: number;
    icon: React.ReactNode;
  }) {
    return (
      <div
        className="flex items-center gap-1.5 py-[2px] text-[11px] font-mono truncate"
        style={{ paddingLeft: `${6 + depth * 10}px`, color: "#475569", cursor: "default" }}
      >
        <span className="w-[9px] shrink-0" />
        {icon}
        <span className="truncate">{label}</span>
      </div>
    );
  }

  function EditableFileItem({ idx, depth = 0 }: { idx: number; depth?: number }) {
    const l        = layers[idx];
    const isActive = active === idx;
    const isDone   = done[idx];
    const fileIcon = l.filename.endsWith(".properties")
      ? <PropertiesIcon size={12} />
      : l.filename.endsWith(".xml")
      ? <XmlIcon size={12} />
      : <JavaIcon size={12} />;
    return (
      <button
        onClick={() => selectFile(idx)}
        className="w-full flex items-center gap-1.5 py-[2px] text-[11px] font-mono truncate transition-colors rounded hover:bg-slate-700/40"
        style={{
          paddingLeft: `${6 + depth * 10}px`,
          color: isActive ? l.color : isDone ? "#6ee7b7" : "#94a3b8",
          background: isActive ? "#2d2d4a" : "transparent",
        }}
      >
        <span className="w-[9px] shrink-0" />
        {fileIcon}
        <span className="ml-0.5 truncate">{l.filename}</span>
        {isDone && <span className="ml-auto text-emerald-400 text-[9px] pr-1">✓</span>}
      </button>
    );
  }

  // Depth reference — sidebar indentation levels:
  //  0 = root children (.idea, src, target, pom.xml)
  //  1 = src children  (main, test)
  //  2 = main children (java, resources)
  //  3 = java children (packageBase)
  //  4 = package children (entities, dto …)
  //  5 = files inside folders

  const BASE = 0;

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] rounded-xl overflow-hidden border border-slate-700">

      {/* ── Title bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#181825] border-b border-slate-700 flex-none">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-mono text-slate-400 ml-2 truncate">{projectName}</span>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div
            className="h-1 rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(doneCount / layers.length) * 48 + 4}px`, opacity: doneCount > 0 ? 1 : 0.3 }}
          />
          <span className="text-[10px] text-slate-600 font-mono">{doneCount}/{layers.length}</span>
        </div>
      </div>

      {/* ── File tabs ──────────────────────────────────────────── */}
      <div className="flex items-center bg-[#252535] border-b border-slate-700 overflow-x-auto scrollbar-none flex-none">
        {layers.map((l, i) => (
          <button
            key={i}
            onClick={() => selectFile(i)}
            title={l.role}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono whitespace-nowrap border-r border-slate-800 transition-all shrink-0"
            style={{
              background: active === i ? "#2d2d3f" : "transparent",
              color: active === i ? l.color : done[i] ? "#6ee7b7" : "#475569",
              borderBottom: active === i ? `2px solid ${l.color}` : "2px solid transparent",
            }}
          >
            {l.filename.endsWith(".properties") ? <PropertiesIcon size={10} /> : l.filename.endsWith(".xml") ? <XmlIcon size={10} /> : <JavaIcon size={10} />}
            <span>{l.filename}</span>
            {done[i] && <span className="text-emerald-400 text-[9px] ml-0.5">●</span>}
          </button>
        ))}
      </div>

      {/* ── Body: tree + editor ────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* ── Project tree (desktop only) ──────────────────────── */}
        <div className="w-52 flex-none bg-[#181825] border-r border-slate-700 overflow-y-auto hidden md:flex flex-col select-none">

          {/* Toolbar label */}
          <div className="px-3 py-1.5 text-[9px] font-mono text-slate-600 uppercase tracking-widest border-b border-slate-800 flex-none">
            Project
          </div>

          {/* Root project node */}
          <div className="pt-1 pb-2 flex flex-col">
            {/* ▸ root folder */}
            <button
              onClick={() => toggle("root")}
              className="w-full flex items-center gap-1 py-[3px] text-[11px] font-mono truncate transition-colors hover:bg-slate-700/20 rounded"
              style={{ paddingLeft: "6px", color: "#d4af37" }}
            >
              <ChevronBtn nodeKey="root" />
              {isOpen("root")
                ? <FolderOpenIcon color="#f59e0b" size={14} />
                : <FolderIcon     color="#f59e0b" size={14} />}
              <span className="ml-1 font-semibold truncate">{projectName}</span>
            </button>

            {isOpen("root") && (
              <div>

                {/* .idea — decorative collapsed */}
                <TreeDir nodeKey=".idea" label=".idea" color="#6b7280" depth={BASE + 1} decorative />

                {/* src */}
                <TreeDir nodeKey="src" label="src" color="#f59e0b" depth={BASE + 1}>

                  {/* main */}
                  <TreeDir nodeKey="main" label="main" color="#f59e0b" depth={BASE + 2}>

                    {/* java */}
                    <TreeDir nodeKey="java" label="java" color="#f59e0b" depth={BASE + 3}>

                      {/* com.example.abcd */}
                      <TreeDir nodeKey={packageBase} label={packageBase} color="#f59e0b" depth={BASE + 4}>

                        {/* Editable layer folders */}
                        {(["entities", "dto", "repositories", "services", "controllers"] as const).map((fname) => {
                          const indices = folderMap[fname];
                          if (!indices || indices.length === 0) return null;
                          const fColor = FOLDER_COLORS[fname] ?? "#94a3b8";
                          return (
                            <TreeDir key={fname} nodeKey={fname} label={fname} color={fColor} depth={BASE + 5}>
                              {indices.map((i) => (
                                <EditableFileItem key={i} idx={i} depth={BASE + 6} />
                              ))}
                            </TreeDir>
                          );
                        })}

                        {/* Root-level editable files (no folder) */}
                        {(folderMap["__root__"] ?? []).map((i) => (
                          <EditableFileItem key={i} idx={i} depth={BASE + 5} />
                        ))}

                        {/* Application.java — decorative */}
                        <StaticFile
                          label="Application.java"
                          depth={BASE + 5}
                          icon={<JavaGreenIcon size={12} />}
                        />

                      </TreeDir>
                    </TreeDir>

                    {/* resources */}
                    <TreeDir nodeKey="resources" label="resources" color="#f59e0b" depth={BASE + 3}>
                      {(folderMap["resources"] ?? []).length > 0
                        ? (folderMap["resources"] ?? []).map((i) => (
                            <EditableFileItem key={i} idx={i} depth={BASE + 4} />
                          ))
                        : (
                            <StaticFile
                              label="application.properties"
                              depth={BASE + 4}
                              icon={<PropertiesIcon size={12} />}
                            />
                          )
                      }
                    </TreeDir>

                  </TreeDir>

                  {/* test — decorative collapsed */}
                  <TreeDir nodeKey="test" label="test" color="#6b7280" depth={BASE + 2} decorative />

                </TreeDir>

                {/* target — decorative collapsed */}
                <TreeDir nodeKey="target" label="target" color="#6b7280" depth={BASE + 1} decorative />

                {/* pom.xml — clickeable if a layer with folder="root" and filename="pom.xml" exists, decorative otherwise */}
                {(() => {
                  const pomIdx = layers.findIndex(
                    (l) => l.folder === "root" && l.filename === "pom.xml"
                  );
                  return pomIdx !== -1 ? (
                    <EditableFileItem idx={pomIdx} depth={BASE + 1} />
                  ) : (
                    <StaticFile
                      label="pom.xml"
                      depth={BASE + 1}
                      icon={<XmlIcon size={12} />}
                    />
                  );
                })()}

              </div>
            )}
          </div>
        </div>

        {/* ── Editor area ──────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#2d2d3f] border-b border-slate-700 flex-none flex-wrap gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap"
                style={{
                  background: layer.color + "1a",
                  color: layer.color,
                  border: `1px solid ${layer.color}33`,
                }}
              >
                {layer.folder ? `${layer.folder}/` : ""}{layer.filename}
              </span>
              <span className="text-[10px] text-slate-500 hidden lg:inline truncate">{layer.role}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => { setShowHint(!showHint); setShowSol(false); }}
                className="flex items-center gap-1 px-2 py-1 text-[11px] text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors"
              >
                <Lightbulb size={11} />
                <span className="hidden sm:inline">Pista</span>
              </button>
              <button
                onClick={() => {
                  if (showSol) {
                    setShowSol(false);
                    setShowPwInput(false);
                    setPwInput("");
                    setPwError(false);
                  } else {
                    setShowPwInput(true);
                    setShowHint(false);
                  }
                }}
                className="text-[11px] text-slate-400 hover:bg-slate-400/10 px-2 py-1 rounded transition-colors"
              >
                {showSol ? "Ocultar" : "Solución"}
              </button>
              <button
                onClick={reset}
                className="p-1.5 text-slate-500 hover:bg-slate-700 rounded transition-colors"
                title="Reiniciar"
              >
                <RotateCcw size={11} />
              </button>
              <button
                onClick={markDone}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded transition-all"
                style={
                  done[active]
                    ? { background: "#10b98122", color: "#6ee7b7", border: "1px solid #10b98144" }
                    : { background: layer.color + "22", color: layer.color, border: `1px solid ${layer.color}44` }
                }
              >
                {done[active] ? "✓ Listo" : "Listo →"}
              </button>
            </div>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-xs text-yellow-300 flex-none">
              {layer.hint}
            </div>
          )}

          {/* Password input */}
          {showPwInput && !showSol && (
            <div className="px-4 py-2 bg-slate-800/60 border-b border-slate-700 flex items-center gap-2 flex-none">
              <span className="text-[11px] text-slate-400 font-mono shrink-0">Clave:</span>
              <input
                type="password"
                value={pwInput}
                onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (pwInput === "pizzaupc") { setShowSol(true); setShowPwInput(false); setPwInput(""); setPwError(false); }
                    else { setPwError(true); }
                  }
                }}
                placeholder="Contraseña..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-200 outline-none focus:border-slate-500"
                autoFocus
              />
              <button
                onClick={() => {
                  if (pwInput === "pizzaupc") { setShowSol(true); setShowPwInput(false); setPwInput(""); setPwError(false); }
                  else { setPwError(true); }
                }}
                className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
              >
                OK
              </button>
              {pwError && <span className="text-[10px] text-red-400 font-mono shrink-0">Clave incorrecta</span>}
            </div>
          )}

          {/* Solution */}
          {showSol && (
            <div className="px-4 py-3 bg-[#0f1117] border-b border-slate-700 flex-none max-h-52 overflow-y-auto">
              <p className="text-xs text-emerald-400 font-semibold mb-2">{layer.filename} — solución</p>
              <pre className="text-xs text-slate-300 font-mono whitespace-pre leading-relaxed overflow-x-auto">
                {layer.solution}
              </pre>
            </div>
          )}

          {/* Monaco editor */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              key={active}
              height="100%"
              language={layer.filename.endsWith(".properties") ? "ini" : layer.filename.endsWith(".xml") ? "xml" : "java"}
              defaultValue={codes[active]}
              onChange={(val) => updateCode(val ?? "")}
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
              disabled={active <= 0}
              onClick={() => selectFile(active - 1)}
              className="text-xs text-slate-500 hover:text-slate-300 disabled:opacity-30 transition-colors"
            >
              ← Anterior
            </button>
            <span className="text-[10px] text-slate-600 font-mono">
              {doneCount}/{layers.length} completados
            </span>
            <button
              disabled={active >= layers.length - 1}
              onClick={() => selectFile(active + 1)}
              className="text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
