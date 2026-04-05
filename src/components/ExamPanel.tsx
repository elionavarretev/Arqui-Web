"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle, XCircle, ChevronRight, ChevronLeft,
  Trophy, RotateCcw, Clock, Bookmark, BookmarkCheck,
  GraduationCap, AlertTriangle,
} from "lucide-react";

export interface ExamQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // 0-3
  explanation: string;
  category: string;
}

export interface ExamResult {
  date: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  mode: string;
}

const PASS_THRESHOLD = 90;

function storageKey(week: number, suffix: string) {
  return `asi705_semana${week}_${suffix}`;
}

// Migración única: mueve datos de claves antiguas a las nuevas sin perder historial
function migrateStorage(week: number) {
  if (typeof window === "undefined") return;
  const migrations: Array<{ oldKey: string; newKey: string }> = [
    { oldKey: `asi705_semana${week}_exam_results`,   newKey: storageKey(week, "results") },
    { oldKey: `asi705_semana${week}_last_failed_ids`, newKey: storageKey(week, "failed")  },
  ];
  migrations.forEach(({ oldKey, newKey }) => {
    const oldData = localStorage.getItem(oldKey);
    if (oldData && !localStorage.getItem(newKey)) {
      localStorage.setItem(newKey, oldData);
    }
    if (oldData) localStorage.removeItem(oldKey);
  });
}

function loadResults(week: number): ExamResult[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(storageKey(week, "results")) || "[]"); } catch { return []; }
}

function saveResult(week: number, r: ExamResult) {
  const prev = loadResults(week);
  localStorage.setItem(storageKey(week, "results"), JSON.stringify([r, ...prev].slice(0, 10)));
}

function loadBookmarks(week: number): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(storageKey(week, "bookmarks"));
    return raw ? new Set<number>(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveBookmarks(week: number, b: Set<number>) {
  localStorage.setItem(storageKey(week, "bookmarks"), JSON.stringify([...b]));
}

function loadLastFailedIds(week: number): number[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(storageKey(week, "failed")) || "[]"); } catch { return []; }
}

function saveLastFailedIds(week: number, ids: number[]) {
  localStorage.setItem(storageKey(week, "failed"), JSON.stringify(ids));
}

interface ExamPanelProps {
  questions: ExamQuestion[];
  conceptColor: string;
  weekNumber: number;
  weekTitle: string;
}

type ExamState = "idle" | "running" | "finished";
type ExamMode  = "completo" | "fallidas" | "marcadas";

export default function ExamPanel({ questions, conceptColor, weekNumber, weekTitle }: ExamPanelProps) {
  const [state,            setState]          = useState<ExamState>("idle");
  const [examMode,         setExamMode]       = useState<ExamMode>("completo");
  const [activeQuestions,  setActiveQuestions] = useState<ExamQuestion[]>(questions);
  const [current,          setCurrent]        = useState(0);
  const [answers,          setAnswers]        = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation,  setShowExplanation] = useState(false);
  const [history,          setHistory]        = useState<ExamResult[]>([]);
  const [bookmarked,       setBookmarked]     = useState<Set<number>>(new Set());
  const [lastFailedIds,    setLastFailedIds]  = useState<number[]>([]);

  useEffect(() => {
    migrateStorage(weekNumber); // corre una vez, no rompe datos existentes
    setHistory(loadResults(weekNumber));
    setBookmarked(loadBookmarks(weekNumber));
    setLastFailedIds(loadLastFailedIds(weekNumber));
  }, [weekNumber]);

  const q        = activeQuestions[current];
  const selected = answers[current];
  const isAnswered = selected !== null;
  const isCorrect  = selected === q?.correctAnswer;

  const correct  = answers.filter((a, i) => a === activeQuestions[i]?.correctAnswer).length;
  const answered = answers.filter(a => a !== null).length;
  const pct      = Math.round((correct / activeQuestions.length) * 100);
  const passed   = pct >= PASS_THRESHOLD;

  const failedQs    = activeQuestions.filter((q, i) => answers[i] !== null && answers[i] !== q.correctAnswer);
  const bookmarkedQs = questions.filter(q => bookmarked.has(q.id));

  const optionLabel = ["A", "B", "C", "D"];

  // ── ACTIONS ───────────────────────────────────────────────────────────────
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startExam(qs: ExamQuestion[], mode: ExamMode) {
    setActiveQuestions(shuffle(qs));
    setExamMode(mode);
    setCurrent(0);
    setAnswers(Array(qs.length).fill(null));
    setShowExplanation(false);
    setState("running");
  }

  function selectAnswer(idx: number) {
    if (isAnswered) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    setShowExplanation(true);
  }

  function goNext() {
    if (current < activeQuestions.length - 1) {
      setCurrent(c => c + 1);
      setShowExplanation(answers[current + 1] !== null);
    } else {
      const modeLabel = examMode === "completo" ? "Completo" : examMode === "fallidas" ? "Solo fallidas" : "Solo marcadas";
      const result: ExamResult = {
        date: new Date().toISOString(),
        score: pct, correct, total: activeQuestions.length, passed, mode: modeLabel,
      };
      saveResult(weekNumber, result);
      setHistory(loadResults(weekNumber));
      // Guardar IDs de preguntas fallidas para poder repasar desde idle
      const failedIds = activeQuestions
        .filter((q, i) => answers[i] !== null && answers[i] !== q.correctAnswer)
        .map(q => q.id);
      saveLastFailedIds(weekNumber, failedIds);
      setLastFailedIds(failedIds);
      setState("finished");
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent(c => c - 1);
      setShowExplanation(answers[current - 1] !== null);
    }
  }

  function restart() {
    setActiveQuestions(questions);
    setExamMode("completo");
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setState("idle");
  }

  function toggleBookmark(id: number) {
    setBookmarked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveBookmarks(weekNumber, next);
      return next;
    });
  }

  function getOptionStyle(idx: number) {
    if (!isAnswered) return "border-slate-700 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer";
    if (idx === q.correctAnswer) return "border-emerald-500 bg-emerald-500/10 cursor-default";
    if (idx === selected)        return "border-red-500 bg-red-500/10 cursor-default";
    return "border-slate-700 bg-slate-800/20 opacity-50 cursor-default";
  }

  // ── IDLE ──────────────────────────────────────────────────────────────────
  if (state === "idle") {
    return (
      <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col items-center text-center px-6 py-10 w-full">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-3xl"
          style={{ background: conceptColor + "22", border: `1px solid ${conceptColor}44` }}>
          🎯
        </div>

        <div className="mb-1 flex items-center gap-2 justify-center">
          <GraduationCap size={16} className="text-amber-400" />
          <h2 className="text-xl font-bold text-white">Examen de Teoría — Semana {weekNumber}</h2>
        </div>
        <p className="text-slate-400 text-sm mb-1">{weekTitle}</p>
        <p className="text-slate-500 text-xs mb-6">
          {questions.length} preguntas · Aprobado con {PASS_THRESHOLD}% · Sin límite de tiempo
        </p>

        {/* Topics — derived from unique categories in questions */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-1.5 mb-7 text-left">
          {[...new Set(questions.map(q => q.category))].map(t => (
            <div key={t} className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: conceptColor }} />
              {t}
            </div>
          ))}
        </div>

        {/* Start buttons */}
        <div className="w-full max-w-sm space-y-2.5">
          <button
            onClick={() => startExam(questions, "completo")}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${conceptColor}, ${conceptColor}99)` }}
          >
            Comenzar examen completo →
          </button>

          {lastFailedIds.length > 0 && (
            <button
              onClick={() => {
                const failedQs = questions.filter(q => lastFailedIds.includes(q.id));
                startExam(failedQs, "fallidas");
              }}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-red-300 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
            >
              <AlertTriangle size={14} />
              Repasar fallidas del último intento ({lastFailedIds.length} preguntas)
            </button>
          )}

          {bookmarkedQs.length > 0 && (
            <button
              onClick={() => startExam(bookmarkedQs, "marcadas")}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-amber-300 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <BookmarkCheck size={14} />
              Estudiar marcadas ({bookmarkedQs.length} preguntas)
            </button>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8 w-full max-w-sm text-left">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">
              <Clock size={10} className="inline mr-1" />Intentos anteriores
            </p>
            <div className="space-y-1.5">
              {history.slice(0, 5).map((r, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-800/40 border border-slate-700/60 rounded-lg px-3 py-2">
                  <div>
                    <span className="text-xs text-slate-500 block">
                      {new Date(r.date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {r.mode && <span className="text-xs text-slate-600">{r.mode}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{r.correct}/{r.total}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${r.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {r.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    );
  }

  // ── FINISHED ──────────────────────────────────────────────────────────────
  if (state === "finished") {
    return (
      <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col items-center text-center px-6 py-8 w-full">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-4xl ${
          passed ? "bg-emerald-500/20 border-2 border-emerald-500" : "bg-red-500/20 border-2 border-red-500"
        }`}>
          {passed ? "🏆" : "📚"}
        </div>

        <h2 className={`text-3xl font-bold mb-1 ${passed ? "text-emerald-400" : "text-red-400"}`}>
          {passed ? "¡Aprobado!" : "No aprobado"}
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          {passed
            ? "Excelente dominio de los conceptos de teoría"
            : `Necesitas ${PASS_THRESHOLD}% para aprobar. ¡Repasa y vuelve a intentarlo!`}
        </p>

        {/* Score grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-5">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
            <div className="text-2xl font-bold text-emerald-400">{correct}</div>
            <div className="text-xs text-slate-500 mt-1">Correctas</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
            <div className="text-2xl font-bold text-red-400">{activeQuestions.length - correct}</div>
            <div className="text-xs text-slate-500 mt-1">Incorrectas</div>
          </div>
          <div className={`rounded-xl p-3 border ${passed ? "bg-emerald-500/10 border-emerald-500/40" : "bg-red-500/10 border-red-500/40"}`}>
            <div className={`text-2xl font-bold ${passed ? "text-emerald-400" : "text-red-400"}`}>{pct}%</div>
            <div className="text-xs text-slate-500 mt-1">Puntaje</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-sm space-y-2 mb-6">
          {failedQs.length > 0 && (
            <button
              onClick={() => startExam(failedQs, "fallidas")}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition-all"
            >
              <AlertTriangle size={14} />
              Estudiar solo fallidas ({failedQs.length} preguntas)
            </button>
          )}
          <button
            onClick={restart}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white border border-slate-600 hover:border-slate-400 transition-colors"
          >
            <RotateCcw size={14} /> Volver a intentar completo
          </button>
        </div>

        {/* Review by question */}
        <div className="w-full max-w-sm space-y-2 text-left">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Revisión pregunta a pregunta</p>
          {activeQuestions.map((q, i) => {
            const ok = answers[i] === q.correctAnswer;
            return (
              <div key={q.id} className={`p-3 rounded-lg text-xs border ${
                ok ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
              }`}>
                <div className="flex items-start gap-2">
                  {ok
                    ? <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    : <XCircle    size={13} className="text-red-400 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-slate-300 leading-snug">{q.text}</p>
                    {!ok && (
                      <>
                        <p className="text-red-400 mt-1 line-through opacity-60">
                          Tu respuesta: {answers[i] !== null ? q.options[answers[i]!] : "Sin responder"}
                        </p>
                        <p className="text-emerald-400 mt-0.5">✓ {q.options[q.correctAnswer]}</p>
                        <p className="text-amber-300/80 mt-1.5 leading-relaxed border-t border-slate-700/60 pt-1.5">
                          💡 {q.explanation}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    );
  }

  // ── RUNNING ───────────────────────────────────────────────────────────────
  const progress = ((current + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100;
  const isBookmarked = bookmarked.has(q?.id);

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Progress */}
      <div className="flex-none px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 font-mono">
            Pregunta {current + 1} de {activeQuestions.length}
            {examMode !== "completo" && (
              <span className="ml-2 text-amber-400/70">
                ({examMode === "fallidas" ? "solo fallidas" : "solo marcadas"})
              </span>
            )}
          </span>
          <span className="text-xs font-mono" style={{ color: conceptColor }}>
            {answered} respondidas
          </span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: conceptColor }}
          />
        </div>

        {/* Question dots */}
        <div className="flex gap-1 mt-2 flex-wrap">
          {activeQuestions.map((_, i) => {
            const a = answers[i];
            const done = a !== null;
            const ok   = a === activeQuestions[i].correctAnswer;
            return (
              <button
                key={i}
                onClick={() => { setCurrent(i); setShowExplanation(answers[i] !== null); }}
                className="w-6 h-6 rounded text-xs font-mono transition-all"
                style={
                  i === current
                    ? { background: conceptColor, color: "#fff" }
                    : done
                    ? { background: ok ? "#10b98133" : "#ef444433", color: ok ? "#6ee7b7" : "#fca5a5", border: `1px solid ${ok ? "#10b98166" : "#ef444466"}` }
                    : { background: "#1e2030", color: "#64748b", border: "1px solid #334155" }
                }
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">

        {/* Category + bookmark */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: conceptColor + "22", color: conceptColor, border: `1px solid ${conceptColor}44` }}>
            {q?.category}
          </span>
          <button
            onClick={() => q && toggleBookmark(q.id)}
            title={isBookmarked ? "Quitar de marcadas" : "Estudiar luego"}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all ${
              isBookmarked
                ? "text-amber-400 bg-amber-500/15 border border-amber-500/40"
                : "text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent"
            }`}
          >
            {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            <span>{isBookmarked ? "Marcada" : "Estudiar luego"}</span>
          </button>
        </div>

        <p className="text-white text-sm font-medium leading-relaxed mb-4">{q?.text}</p>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {q?.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => selectAnswer(idx)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all text-sm ${getOptionStyle(idx)}`}
            >
              <span className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                style={
                  isAnswered && idx === q.correctAnswer
                    ? { background: "#10b98133", color: "#6ee7b7" }
                    : isAnswered && idx === selected && !isCorrect
                    ? { background: "#ef444433", color: "#fca5a5" }
                    : { background: "#1e2030", color: "#64748b" }
                }>
                {optionLabel[idx]}
              </span>
              <span className={`leading-snug mt-0.5 ${
                isAnswered && idx === q.correctAnswer ? "text-emerald-300" :
                isAnswered && idx === selected && !isCorrect ? "text-red-300" :
                "text-slate-300"
              }`}>
                {opt}
              </span>
              {isAnswered && idx === q.correctAnswer && (
                <CheckCircle size={14} className="text-emerald-400 shrink-0 ml-auto mt-0.5" />
              )}
              {isAnswered && idx === selected && !isCorrect && (
                <XCircle size={14} className="text-red-400 shrink-0 ml-auto mt-0.5" />
              )}
            </button>
          ))}
        </div>

        {/* Explanation — always visible after answering */}
        {showExplanation && isAnswered && (
          <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
            isCorrect
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-amber-500/10 border-amber-500/40 text-amber-200"
          }`}>
            <p className="font-semibold mb-1">
              {isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto — aquí está la explicación:"}
            </p>
            {!isCorrect && (
              <p className="text-emerald-400 mb-1.5">
                Respuesta correcta: <strong>{q.options[q.correctAnswer]}</strong>
              </p>
            )}
            <p className="text-slate-300">{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-none flex items-center justify-between px-5 py-3 border-t border-slate-800">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={14} /> Anterior
        </button>

        <button
          onClick={goNext}
          disabled={!isAnswered}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={isAnswered ? { background: conceptColor } : { background: "#334155" }}
        >
          {current === activeQuestions.length - 1 ? (
            <><Trophy size={13} /> Ver resultados</>
          ) : (
            <>Siguiente <ChevronRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
}
