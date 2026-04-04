import Link from "next/link";

const weeks = [
  { week: 1, title: "Java OO", subtitle: "Abstracción, Encapsulamiento, Herencia, Polimorfismo", available: true, color: "from-blue-600 to-indigo-600" },
  { week: 2, title: "APIs REST", subtitle: "Spring Boot, HTTP Verbs, REST Architecture", available: false, color: "from-purple-600 to-pink-600" },
  { week: 3, title: "Spring Data JPA", subtitle: "Entidades, Relaciones, Repositorios", available: false, color: "from-emerald-600 to-teal-600" },
  { week: 4, title: "Seguridad", subtitle: "JWT, Spring Security, Roles y Permisos", available: false, color: "from-orange-600 to-red-600" },
  { week: 5, title: "PC1 — Práctica", subtitle: "Evaluación semana 5", available: false, color: "from-yellow-600 to-amber-600" },
  { week: 6, title: "Angular Intro", subtitle: "Componentes, Templates, Servicios", available: false, color: "from-rose-600 to-pink-600" },
  { week: 7, title: "Angular + API", subtitle: "HTTP Client, Observables, Forms", available: false, color: "from-cyan-600 to-blue-600" },
  { week: 8, title: "Parcial EA1", subtitle: "Evaluación parcial", available: false, color: "from-violet-600 to-purple-600" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">UPC · 2026-10</span>
            <h1 className="text-xl font-bold text-white mt-0.5">Arquitectura de Aplicaciones Web</h1>
          </div>
          <div className="text-xs text-slate-500 font-mono">ASI705</div>
        </div>
      </header>

      {/* Official notice banner */}
      <div className="border-b border-amber-900/40 bg-amber-950/30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 text-base">📌</span>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Plataforma oficial</span>
          </div>
          <p className="text-amber-200/80 text-xs leading-relaxed">
            El material oficial del curso está en el{" "}
            <a
              href="https://aulavirtual.upc.edu.pe/ultra/courses/_529653_1/outline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline underline-offset-2 hover:text-amber-300 font-semibold"
            >
              Aula Virtual UPC
            </a>
            . Esta web es un <strong className="text-amber-300">complemento interactivo</strong> — no reemplaza las entregas, evaluaciones ni comunicaciones oficiales.
          </p>
        </div>
      </div>

      {/* Communication banner */}
      <div className="border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 text-base">✉️</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Comunicación oficial</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Toda consulta formal se realiza por correo electrónico al{" "}
            <span className="text-slate-300 font-semibold">profesor</span> o al{" "}
            <span className="text-slate-300 font-semibold">delegado del aula</span>.
            Discord es solo para soporte entre compañeros.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-950/50 border border-indigo-800/40 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-indigo-300 text-xs font-mono">Complemento interactivo · No oficial</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Aprende a tu ritmo,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">escribe código real.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Cada semana, una unidad. Lee el concepto, prueba el código en el editor y valida tu entendimiento — todo en un solo lugar.
          </p>
          <a
            href="https://aulavirtual.upc.edu.pe/ultra/courses/_529653_1/outline"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/60 text-amber-400 hover:text-amber-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <span>🎓</span>
            <span>Ir al Aula Virtual UPC (oficial)</span>
            <span className="opacity-60">↗</span>
          </a>
        </div>
      </section>

      {/* Week Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6">Semanas del curso</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeks.map((w) => (
            <div key={w.week}>
              {w.available ? (
                <Link href={`/semana/${w.week}`} className="block group">
                  <div className={`relative rounded-xl bg-gradient-to-br ${w.color} p-px`}>
                    <div className="rounded-xl bg-[#0f1117] p-5 h-full group-hover:bg-slate-900 transition-colors">
                      <span className="text-xs font-mono text-slate-400">Semana {w.week}</span>
                      <h4 className="text-white font-bold text-lg mt-1 mb-1">{w.title}</h4>
                      <p className="text-slate-400 text-sm leading-snug">{w.subtitle}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs text-indigo-400 font-medium">
                        <span>Empezar</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="rounded-xl border border-slate-800 p-5 opacity-40 cursor-not-allowed">
                  <span className="text-xs font-mono text-slate-500">Semana {w.week}</span>
                  <h4 className="text-slate-400 font-bold text-lg mt-1 mb-1">{w.title}</h4>
                  <p className="text-slate-500 text-sm leading-snug">{w.subtitle}</p>
                  <div className="mt-4 text-xs text-slate-600 font-mono">Próximamente</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-mono">
            Arquitectura de Aplicaciones Web · ASI705 · UPC 2026-10 · Prof. Elio Navarrete
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
            <a
              href="https://aulavirtual.upc.edu.pe/ultra/courses/_529653_1/outline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500/70 hover:text-amber-400 transition-colors"
            >
              📌 Aula Virtual UPC (oficial)
            </a>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <span className="text-slate-600">✉️ Consultas: correo al profesor o delegado</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
