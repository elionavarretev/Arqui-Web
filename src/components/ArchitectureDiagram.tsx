"use client";

import { useState, useEffect } from "react";

const LAYERS = [
  {
    id: "controller",
    label: "@RestController",
    sublabel: "Capa Web",
    icon: "🌐",
    color: "#6366f1",
    bg: "#6366f115",
    border: "#6366f1",
    role: "Recibe el HTTP request y devuelve la respuesta. No contiene lógica de negocio.",
    code: `@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService service;

    // ✅ Inyección por constructor
    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Producto> listar() {
        return service.listar(); // delega al service
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto p) {
        return ResponseEntity.status(201).body(service.crear(p));
    }
}`,
  },
  {
    id: "service",
    label: "@Service",
    sublabel: "Lógica de negocio",
    icon: "⚙️",
    color: "#10b981",
    bg: "#10b98115",
    border: "#10b981",
    role: "Contiene toda la lógica de negocio. Reutilizable por múltiples controllers.",
    code: `@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Producto crear(Producto p) {
        if (p.getNombre() == null || p.getNombre().isBlank())
            throw new IllegalArgumentException("Nombre requerido");
        // ← Aquí van las reglas de negocio
        return repo.save(p);
    }
}`,
  },
  {
    id: "repository",
    label: "@Repository",
    sublabel: "Acceso a datos",
    icon: "🗂️",
    color: "#f59e0b",
    bg: "#f59e0b15",
    border: "#f59e0b",
    role: "Interfaz con la base de datos. Spring Data JPA genera el SQL automáticamente.",
    code: `@Repository
public interface ProductoRepository
        extends JpaRepository<Producto, Long> {

    // Spring genera SQL automáticamente:
    // findAll()      → SELECT * FROM producto
    // findById(id)   → SELECT * WHERE id = ?
    // save(p)        → INSERT / UPDATE
    // deleteById(id) → DELETE WHERE id = ?

    // Consultas por nombre de método:
    List<Producto> findByNombreContaining(String texto);
    List<Producto> findByPrecioLessThan(double precio);
}`,
  },
  {
    id: "entity",
    label: "@Entity",
    sublabel: "Modelo de datos",
    icon: "📋",
    color: "#ec4899",
    bg: "#ec489915",
    border: "#ec4899",
    role: "Clase Java que mapea a una tabla de la BD. JPA crea la tabla automáticamente.",
    code: `@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;           // PK AUTO_INCREMENT

    @Column(nullable = false)
    private String nombre;     // NOT NULL

    private double precio;
    private boolean disponible;

    // Spring JPA genera:
    // CREATE TABLE producto (
    //   id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    //   nombre  VARCHAR(255) NOT NULL,
    //   precio  DOUBLE,
    //   disponible BOOLEAN
    // );
}`,
  },
  {
    id: "db",
    label: "Base de Datos",
    sublabel: "PostgreSQL / MySQL",
    icon: "🗄️",
    color: "#94a3b8",
    bg: "#94a3b815",
    border: "#94a3b8",
    role: "Almacenamiento persistente. Se configura en application.properties.",
    code: `# application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/midb
spring.datasource.username=postgres
spring.datasource.password=secret

# Hibernate DDL
spring.jpa.hibernate.ddl-auto=update
# update   → actualiza esquema, conserva datos
# create   → recrea tablas al iniciar (⚠ borra datos)
# validate → solo valida, no modifica

spring.jpa.show-sql=true
# Muestra el SQL generado en consola`,
  },
];

// Índices: 0=controller, 1=service, 2=repository, 3=entity, 4=db
const FLOW_STEPS = [
  { active: [0],    label: "1 → GET /api/productos llega al @RestController" },
  { active: [1],    label: "2 → Controller llama  service.listar()" },
  { active: [2, 3], label: "3 → Service llama  repo.findAll()  (usa @Entity como modelo)" },
  { active: [4],    label: "4 → Repository ejecuta  SELECT * FROM producto" },
  { active: [4],    label: "5 ← BD retorna los registros encontrados" },
  { active: [2, 3], label: "6 ← JPA mapea filas de BD → objetos  Producto (@Entity)" },
  { active: [1],    label: "7 ← Repository entrega  List<Producto>  al Service" },
  { active: [0],    label: "8 ← Service retorna lista al Controller" },
  { active: [],     label: "9 ← Controller responde  200 OK + JSON  al cliente  ✓" },
];

const STEP_DURATION = 2200;

export default function ArchitectureDiagram() {
  const [selected,    setSelected]    = useState<number | null>(null);
  const [flowStep,    setFlowStep]    = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  function runFlow() {
    if (isAnimating) return;
    setSelected(null);
    setIsAnimating(true);
    setFlowStep(0);
  }

  useEffect(() => {
    if (flowStep < 0 || flowStep >= FLOW_STEPS.length) return;
    const t = setTimeout(() => {
      if (flowStep < FLOW_STEPS.length - 1) setFlowStep(s => s + 1);
      else { setFlowStep(-1); setIsAnimating(false); }
    }, STEP_DURATION);
    return () => clearTimeout(t);
  }, [flowStep]);

  const activeSet  = flowStep >= 0 ? new Set(FLOW_STEPS[flowStep].active) : new Set<number>();
  const currentStep = flowStep >= 0 ? FLOW_STEPS[flowStep] : null;
  const isReturn   = flowStep >= 4;

  function layerStyle(i: number) {
    const isActive   = activeSet.has(i);
    const isSelected = selected === i;
    const layer = LAYERS[i];
    return {
      borderColor: isActive || isSelected ? layer.border : "#334155",
      background:  isActive || isSelected ? layer.bg     : "#1a1f2e",
      boxShadow:   isActive   ? `0 0 16px ${layer.color}55`
                 : isSelected ? `0 0 10px ${layer.color}33`
                 : "none",
      transition: "all 0.3s ease",
    };
  }

  function onClickLayer(i: number) {
    if (isAnimating) return;
    setSelected(selected === i ? null : i);
  }

  const ArrowDown = ({ color = "#334155" }: { color?: string }) => (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-4" style={{ background: color }} />
      <div style={{ color, fontSize: 10, lineHeight: 1 }}>▼</div>
    </div>
  );

  return (
    <div className="rounded-xl border border-slate-700 bg-[#0d1117] p-4 select-none">
      <p className="text-[10px] text-slate-500 font-mono text-center mb-3 uppercase tracking-widest">
        Haz click en cada capa para ver su código
      </p>

      {/* ── VERTICAL LAYOUT ─────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-0">

        {/* CLIENT */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/60">
          <span className="text-base">💻</span>
          <div>
            <div className="text-xs font-mono font-bold text-slate-300">Cliente HTTP</div>
            <div className="text-[9px] text-slate-500">Browser / App / Postman</div>
          </div>
        </div>

        <ArrowDown color={activeSet.has(0) ? LAYERS[0].color : "#334155"} />

        {/* CONTROLLER */}
        <button onClick={() => onClickLayer(0)} className="w-full rounded-xl border-2 p-3 text-left"
          style={layerStyle(0)}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{LAYERS[0].icon}</span>
            <div>
              <div className="font-mono font-bold text-sm" style={{ color: LAYERS[0].color }}>{LAYERS[0].label}</div>
              <div className="text-[10px] text-slate-500">{LAYERS[0].sublabel} · recibe el HTTP request, delega al service</div>
            </div>
          </div>
        </button>

        <ArrowDown color={activeSet.has(1) ? LAYERS[1].color : "#334155"} />

        {/* SERVICE */}
        <button onClick={() => onClickLayer(1)} className="w-full rounded-xl border-2 p-3 text-left"
          style={layerStyle(1)}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{LAYERS[1].icon}</span>
            <div>
              <div className="font-mono font-bold text-sm" style={{ color: LAYERS[1].color }}>{LAYERS[1].label}</div>
              <div className="text-[10px] text-slate-500">{LAYERS[1].sublabel} · aplica reglas de negocio, llama al repository</div>
            </div>
          </div>
        </button>

        <ArrowDown color={activeSet.has(2) ? LAYERS[2].color : "#334155"} />

        {/* REPOSITORY + ENTITY side by side */}
        <div className="w-full grid grid-cols-2 gap-2">
          <button onClick={() => onClickLayer(2)} className="rounded-xl border-2 p-3 text-left"
            style={layerStyle(2)}>
            <div className="text-lg mb-1">{LAYERS[2].icon}</div>
            <div className="font-mono font-bold text-xs" style={{ color: LAYERS[2].color }}>{LAYERS[2].label}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{LAYERS[2].sublabel}</div>
            <div className="text-[9px] text-slate-600 mt-1">extiende JpaRepository</div>
          </button>
          <button onClick={() => onClickLayer(3)} className="rounded-xl border-2 p-3 text-left"
            style={layerStyle(3)}>
            <div className="text-lg mb-1">{LAYERS[3].icon}</div>
            <div className="font-mono font-bold text-xs" style={{ color: LAYERS[3].color }}>{LAYERS[3].label}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{LAYERS[3].sublabel}</div>
            <div className="text-[9px] text-slate-600 mt-1">mapea clase → tabla SQL</div>
          </button>
        </div>

        <ArrowDown color={activeSet.has(4) ? LAYERS[4].color : "#334155"} />

        {/* DATABASE */}
        <button onClick={() => onClickLayer(4)} className="w-full rounded-xl border-2 p-3 text-left"
          style={layerStyle(4)}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{LAYERS[4].icon}</span>
            <div>
              <div className="font-mono font-bold text-sm" style={{ color: LAYERS[4].color }}>{LAYERS[4].label}</div>
              <div className="text-[10px] text-slate-500">{LAYERS[4].sublabel} · almacenamiento persistente</div>
            </div>
          </div>
        </button>
      </div>

      {/* ── FLOW STEP INDICATOR ─────────────────────────────────── */}
      <div className="h-8 flex items-center justify-center mt-3">
        {currentStep ? (
          <div className="text-[11px] font-mono px-3 py-1 rounded-full border"
            style={{
              background:   isReturn ? "#10b98115" : "#6366f115",
              borderColor:  isReturn ? "#10b98155" : "#6366f155",
              color:        isReturn ? "#6ee7b7"   : "#a5b4fc",
            }}>
            {currentStep.label}
          </div>
        ) : (
          <div className="text-[10px] text-slate-600 font-mono">
            {selected !== null ? "↑ código de la capa seleccionada" : ""}
          </div>
        )}
      </div>

      {/* ── SIMULATE BUTTON ─────────────────────────────────────── */}
      <div className="flex justify-center mt-2 mb-3">
        <button onClick={runFlow} disabled={isAnimating}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium border transition-all"
          style={isAnimating
            ? { borderColor: "#334155", color: "#475569", cursor: "not-allowed" }
            : { borderColor: "#6366f155", color: "#818cf8", background: "#6366f110" }}>
          <span>{isAnimating ? "⏳" : "▶"}</span>
          {isAnimating
            ? `Paso ${flowStep + 1} de ${FLOW_STEPS.length}…`
            : "Simular GET /api/productos"}
        </button>
      </div>

      {/* ── CODE PANEL ──────────────────────────────────────────── */}
      {selected !== null && !isAnimating && (
        <div className="rounded-lg border p-3"
          style={{ borderColor: LAYERS[selected].border + "44", background: LAYERS[selected].bg }}>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
            <span className="text-xs font-bold font-mono" style={{ color: LAYERS[selected].color }}>
              {LAYERS[selected].label}
            </span>
            <span className="text-[10px] text-slate-500">— {LAYERS[selected].role}</span>
          </div>
          <pre className="text-[11px] text-slate-300 font-mono leading-relaxed overflow-x-auto whitespace-pre">
            {LAYERS[selected].code}
          </pre>
        </div>
      )}
    </div>
  );
}
