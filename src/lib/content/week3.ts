import type { ExamQuestion, WeekContent, PracticalExam } from "./week1";

export const week3: WeekContent = {
  week: 3,
  title: "Spring Data JPA",
  description: "Persistencia de datos con Spring Data JPA: entidades, repositorios, relaciones y consultas personalizadas con PostgreSQL.",
  exercises: [
    // ── 1. @Entity ───────────────────────────────────────────────────────────
    {
      id: "entity",
      title: "@Entity — La tabla en Java",
      concept: "entity",
      conceptLabel: "Persistencia",
      conceptColor: "#10b981",
      explanation: `<p>Con <strong>Spring Data JPA</strong> ya no escribes SQL a mano. Anotas una clase Java con <code>@Entity</code> y JPA la convierte automáticamente en una tabla de PostgreSQL.</p>
<h3>Anotaciones clave</h3>
<ul>
<li><code>@Entity</code> — marca la clase como tabla en la base de datos</li>
<li><code>@Table(name = "...")</code> — nombre de la tabla (opcional, por defecto usa el nombre de la clase)</li>
<li><code>@Id</code> — columna que actúa como llave primaria</li>
<li><code>@GeneratedValue</code> — PostgreSQL genera el ID automáticamente (SERIAL / SEQUENCE)</li>
<li><code>@Column</code> — configura propiedades de la columna (nullable, length, unique)</li>
</ul>
<h3>Ciclo de vida</h3>
<p>Cuando guardas un objeto con <code>repository.save(obj)</code>, JPA traduce eso a un <code>INSERT INTO ...</code> en PostgreSQL. Al buscar, ejecuta un <code>SELECT</code>.</p>`,
      analogy: "🗄️ Una clase @Entity es como un formulario: cada campo es una columna, cada objeto guardado es una fila en la tabla de PostgreSQL.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <!-- Java class box -->
  <rect x="20" y="30" width="160" height="140" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="100" y="52" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">@Entity</text>
  <text x="100" y="68" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Juego.java</text>
  <text x="30" y="90" fill="#94a3b8" font-size="8" font-family="monospace">@Id Long id</text>
  <text x="30" y="106" fill="#94a3b8" font-size="8" font-family="monospace">String titulo</text>
  <text x="30" y="122" fill="#94a3b8" font-size="8" font-family="monospace">String genero</text>
  <text x="30" y="138" fill="#94a3b8" font-size="8" font-family="monospace">double precio</text>
  <text x="30" y="154" fill="#94a3b8" font-size="8" font-family="monospace">LocalDate lanzamiento</text>
  <!-- Arrow -->
  <line x1="182" y1="100" x2="238" y2="100" stroke="#6366f1" stroke-width="2" marker-end="url(#arrE)"/>
  <defs>
    <marker id="arrE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/>
    </marker>
  </defs>
  <text x="210" y="92" fill="#818cf8" font-size="7" font-family="monospace" text-anchor="middle">JPA</text>
  <!-- DB table -->
  <rect x="240" y="30" width="160" height="140" rx="8" fill="#6366f122" stroke="#6366f1" stroke-width="1.5"/>
  <text x="320" y="52" fill="#6366f1" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">PostgreSQL</text>
  <text x="320" y="68" fill="#a5b4fc" font-size="8" font-family="monospace" text-anchor="middle">tabla: juego</text>
  <text x="250" y="90" fill="#94a3b8" font-size="8" font-family="monospace">id BIGSERIAL PK</text>
  <text x="250" y="106" fill="#94a3b8" font-size="8" font-family="monospace">titulo VARCHAR</text>
  <text x="250" y="122" fill="#94a3b8" font-size="8" font-family="monospace">genero VARCHAR</text>
  <text x="250" y="138" fill="#94a3b8" font-size="8" font-family="monospace">precio NUMERIC</text>
  <text x="250" y="154" fill="#94a3b8" font-size="8" font-family="monospace">lanzamiento DATE</text>
  <!-- Title -->
  <text x="210" y="188" fill="#64748b" font-size="8" font-family="sans-serif" text-anchor="middle">@Entity convierte Java → tabla SQL automáticamente</text>
</svg>`,
      starterCode: `import jakarta.persistence.*;
import java.time.LocalDate;

// TODO: anota esta clase como entidad JPA
// Tabla en la BD se llamará "juego"
public class Juego {

    // TODO: marca este campo como llave primaria
    // con generación automática (IDENTITY)
    private Long id;

    // TODO: anota como columna NOT NULL, max 100 chars
    private String titulo;

    private String genero;

    // TODO: anota como columna NOT NULL
    private double precio;

    private LocalDate lanzamiento;

    // TODO: agrega constructor vacío (requerido por JPA)

    // TODO: agrega constructor con todos los campos excepto id

    // Getters y setters omitidos por brevedad
    // (en proyecto real usar Lombok @Data)
}`,
      solution: `import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "juego")
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    private String genero;

    @Column(nullable = false)
    private double precio;

    private LocalDate lanzamiento;

    // Constructor vacío obligatorio para JPA
    public Juego() {}

    public Juego(String titulo, String genero, double precio, LocalDate lanzamiento) {
        this.titulo = titulo;
        this.genero = genero;
        this.precio = precio;
        this.lanzamiento = lanzamiento;
    }

    // Getters y setters ...
}`,
      hint: "Usa @Entity en la clase, @Id + @GeneratedValue(strategy = GenerationType.IDENTITY) en el campo id, y @Column(nullable = false) donde corresponda. JPA necesita un constructor vacío.",
      expectedOutput: `// JPA genera en PostgreSQL:
CREATE TABLE juego (
  id        BIGSERIAL PRIMARY KEY,
  titulo    VARCHAR(100) NOT NULL,
  genero    VARCHAR(255),
  precio    FLOAT8 NOT NULL,
  lanzamiento DATE
);`,
    },

    // ── 2. JpaRepository ─────────────────────────────────────────────────────
    {
      id: "repository",
      title: "JpaRepository — CRUD sin SQL",
      concept: "repository",
      conceptLabel: "Repositorio",
      conceptColor: "#6366f1",
      explanation: `<p><strong>Spring Data JPA</strong> genera automáticamente todas las operaciones CRUD. Solo tienes que declarar una interfaz que extienda <code>JpaRepository&lt;Entidad, TipoId&gt;</code>.</p>
<h3>Métodos heredados automáticamente</h3>
<ul>
<li><code>save(entity)</code> — INSERT si es nuevo, UPDATE si ya tiene id</li>
<li><code>findById(id)</code> — SELECT por PK, devuelve <code>Optional&lt;T&gt;</code></li>
<li><code>findAll()</code> — SELECT * FROM tabla</li>
<li><code>deleteById(id)</code> — DELETE WHERE id = ?</li>
<li><code>count()</code> — COUNT(*)</li>
<li><code>existsById(id)</code> — comprueba existencia sin cargar el objeto</li>
</ul>
<h3>Query Methods (convención de nombre)</h3>
<p>Spring interpreta el nombre del método y genera la query:</p>
<ul>
<li><code>findByGenero(String genero)</code> → <code>SELECT * WHERE genero = ?</code></li>
<li><code>findByPrecioLessThan(double max)</code> → <code>SELECT * WHERE precio &lt; ?</code></li>
<li><code>findByTituloContainingIgnoreCase(String texto)</code> → LIKE</li>
</ul>`,
      analogy: "🤖 JpaRepository es como un asistente que ya sabe todos los comandos SQL de memoria. Tú solo dices 'guarda esto' o 'busca por género' y él lo hace por ti.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <!-- Interface box -->
  <rect x="20" y="40" width="175" height="120" rx="8" fill="#6366f122" stroke="#6366f1" stroke-width="1.5"/>
  <text x="108" y="60" fill="#6366f1" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">JuegoRepository</text>
  <text x="108" y="76" fill="#a5b4fc" font-size="7" font-family="monospace" text-anchor="middle">extends JpaRepository</text>
  <line x1="30" y1="84" x2="185" y2="84" stroke="#334155" stroke-width="1"/>
  <text x="30" y="100" fill="#94a3b8" font-size="7.5" font-family="monospace">findByGenero()</text>
  <text x="30" y="116" fill="#94a3b8" font-size="7.5" font-family="monospace">findByPrecioLessThan()</text>
  <text x="30" y="132" fill="#6ee7b7" font-size="7.5" font-family="monospace">// heredados:</text>
  <text x="30" y="148" fill="#64748b" font-size="7.5" font-family="monospace">save() findAll() deleteById()</text>
  <!-- Arrow -->
  <line x1="197" y1="100" x2="243" y2="100" stroke="#10b981" stroke-width="2" marker-end="url(#arrR)"/>
  <defs>
    <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
  </defs>
  <text x="220" y="92" fill="#6ee7b7" font-size="7" font-family="monospace" text-anchor="middle">genera</text>
  <!-- SQL box -->
  <rect x="245" y="40" width="155" height="120" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="323" y="60" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">SQL Automático</text>
  <line x1="255" y1="68" x2="390" y2="68" stroke="#334155" stroke-width="1"/>
  <text x="255" y="85" fill="#64748b" font-size="7" font-family="monospace">SELECT * FROM juego</text>
  <text x="255" y="100" fill="#64748b" font-size="7" font-family="monospace">WHERE genero = ?</text>
  <text x="255" y="118" fill="#64748b" font-size="7" font-family="monospace">INSERT INTO juego ...</text>
  <text x="255" y="133" fill="#64748b" font-size="7" font-family="monospace">DELETE FROM juego</text>
  <text x="255" y="148" fill="#64748b" font-size="7" font-family="monospace">WHERE id = ?</text>
  <text x="210" y="188" fill="#64748b" font-size="8" font-family="sans-serif" text-anchor="middle">Spring genera el SQL en runtime — cero boilerplate</text>
</svg>`,
      starterCode: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// TODO: anota esta interfaz con @Repository
// TODO: extiende JpaRepository<Juego, Long>
public interface JuegoRepository {

    // TODO: declara un método que busque juegos por género
    // Spring lo implementará automáticamente por convención de nombre

    // TODO: declara un método que busque juegos
    // cuyo precio sea menor que un valor dado

    // TODO: declara un método que busque juegos
    // cuyo título contenga un texto (case insensitive)

    // save(), findAll(), findById(), deleteById()
    // ya vienen heredados de JpaRepository — no los declares aquí
}`,
      solution: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {

    // Spring genera: SELECT * FROM juego WHERE genero = ?
    List<Juego> findByGenero(String genero);

    // Spring genera: SELECT * FROM juego WHERE precio < ?
    List<Juego> findByPrecioLessThan(double precio);

    // Spring genera: SELECT * FROM juego WHERE LOWER(titulo) LIKE %texto%
    List<Juego> findByTituloContainingIgnoreCase(String texto);
}`,
      hint: "Extiende JpaRepository<Juego, Long>. Para query methods sigue la convención: findBy + NombreCampo + Condición. Spring los implementa automáticamente.",
      expectedOutput: `// Ejemplos de uso en el Service:
List<Juego> accion = juegoRepository.findByGenero("Acción");
// → SELECT * FROM juego WHERE genero = 'Acción'

List<Juego> baratos = juegoRepository.findByPrecioLessThan(50.0);
// → SELECT * FROM juego WHERE precio < 50.0

Optional<Juego> juego = juegoRepository.findById(1L);
// → SELECT * FROM juego WHERE id = 1`,
    },

    // ── 3. Relaciones @ManyToOne ──────────────────────────────────────────────
    {
      id: "relaciones",
      title: "Relaciones — @ManyToOne y @OneToMany",
      concept: "relaciones",
      conceptLabel: "Asociaciones",
      conceptColor: "#f59e0b",
      explanation: `<p>En bases de datos relacionales, las tablas se conectan mediante llaves foráneas (FK). JPA modela estas relaciones directamente en Java con anotaciones.</p>
<h3>@ManyToOne — "muchos pertenecen a uno"</h3>
<p>Ej: muchos juegos pertenecen a una categoría. La FK queda en la tabla del lado "muchos" (juego).</p>
<pre><code>@ManyToOne
@JoinColumn(name = "categoria_id")
private Categoria categoria;</code></pre>
<h3>@OneToMany — "uno tiene muchos"</h3>
<p>El lado inverso de la relación. No genera columna nueva.</p>
<pre><code>@OneToMany(mappedBy = "categoria")
private List&lt;Juego&gt; juegos;</code></pre>
<h3>Fetch types</h3>
<ul>
<li><code>FetchType.EAGER</code> — carga la relación al instante (puede ser costoso)</li>
<li><code>FetchType.LAZY</code> — carga la relación solo cuando la accedes (recomendado)</li>
</ul>`,
      analogy: "🏷️ Una Categoria tiene muchos Juegos, como una estantería tiene muchos libros. El libro sabe en qué estantería está (ManyToOne), la estantería sabe qué libros tiene (OneToMany).",
      diagram: `<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="210" fill="#13141f" rx="10"/>
  <!-- Categoria -->
  <rect x="20" y="30" width="140" height="100" rx="8" fill="#f59e0b22" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="90" y="50" fill="#f59e0b" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">Categoria</text>
  <line x1="30" y1="58" x2="150" y2="58" stroke="#334155" stroke-width="1"/>
  <text x="30" y="74" fill="#94a3b8" font-size="7.5" font-family="monospace">@Id Long id</text>
  <text x="30" y="90" fill="#94a3b8" font-size="7.5" font-family="monospace">String nombre</text>
  <text x="30" y="108" fill="#fbbf24" font-size="7.5" font-family="monospace">@OneToMany</text>
  <text x="30" y="122" fill="#fbbf24" font-size="7.5" font-family="monospace">List&lt;Juego&gt; juegos</text>
  <!-- Juego -->
  <rect x="260" y="30" width="140" height="110" rx="8" fill="#6366f122" stroke="#6366f1" stroke-width="1.5"/>
  <text x="330" y="50" fill="#6366f1" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">Juego</text>
  <line x1="270" y1="58" x2="390" y2="58" stroke="#334155" stroke-width="1"/>
  <text x="270" y="74" fill="#94a3b8" font-size="7.5" font-family="monospace">@Id Long id</text>
  <text x="270" y="90" fill="#94a3b8" font-size="7.5" font-family="monospace">String titulo</text>
  <text x="270" y="106" fill="#94a3b8" font-size="7.5" font-family="monospace">double precio</text>
  <text x="270" y="124" fill="#a5b4fc" font-size="7.5" font-family="monospace">@ManyToOne</text>
  <text x="270" y="138" fill="#a5b4fc" font-size="7.5" font-family="monospace">Categoria categoria</text>
  <!-- Arrow -->
  <line x1="160" y1="90" x2="258" y2="90" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrM)"/>
  <defs>
    <marker id="arrM" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
  <text x="209" y="82" fill="#fbbf24" font-size="7" font-family="monospace" text-anchor="middle">1</text>
  <text x="209" y="102" fill="#fbbf24" font-size="7" font-family="monospace" text-anchor="middle">N</text>
  <!-- FK label -->
  <rect x="120" y="155" width="180" height="30" rx="6" fill="#1e2030" stroke="#334155" stroke-width="1"/>
  <text x="210" y="168" fill="#f59e0b" font-size="7.5" font-family="monospace" text-anchor="middle">FK: juego.categoria_id</text>
  <text x="210" y="180" fill="#64748b" font-size="7" font-family="monospace" text-anchor="middle">@JoinColumn(name = "categoria_id")</text>
</svg>`,
      starterCode: `import jakarta.persistence.*;
import java.util.List;

// Entidad Categoria — el lado "uno"
@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // TODO: declara la relación @OneToMany con Juego
    // mappedBy = "categoria" (campo en Juego que apunta acá)
    // fetch = LAZY para no cargar todos los juegos al consultar categoría
    // Lista de juegos:

}

// Entidad Juego — el lado "muchos"
@Entity
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private double precio;

    // TODO: declara la relación @ManyToOne con Categoria
    // La FK en la tabla juego se llamará "categoria_id"
    // Carga: LAZY

}`,
      solution: `import jakarta.persistence.*;
import java.util.List;

@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // mappedBy indica que Juego.categoria es el dueño de la relación
    @OneToMany(mappedBy = "categoria", fetch = FetchType.LAZY)
    private List<Juego> juegos;

    // constructores, getters...
}

@Entity
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private double precio;

    // FK: juego.categoria_id -> categoria.id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    // constructores, getters...
}`,
      hint: "El lado @ManyToOne es el 'dueño' de la relación y tiene la FK (@JoinColumn). El lado @OneToMany usa mappedBy apuntando al nombre del campo en la clase hija.",
      expectedOutput: `// JPA genera en PostgreSQL:
CREATE TABLE categoria (
  id     BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255)
);

CREATE TABLE juego (
  id           BIGSERIAL PRIMARY KEY,
  titulo       VARCHAR(255),
  precio       FLOAT8,
  categoria_id BIGINT REFERENCES categoria(id)  -- FK generada por @JoinColumn
);`,
    },

    // ── 4. @Query personalizada ───────────────────────────────────────────────
    {
      id: "query",
      title: "@Query — Consultas personalizadas",
      concept: "query",
      conceptLabel: "JPQL",
      conceptColor: "#ec4899",
      explanation: `<p>Cuando los query methods por convención no son suficientes, puedes escribir tus propias consultas con <code>@Query</code> usando <strong>JPQL</strong> (Java Persistence Query Language).</p>
<h3>JPQL vs SQL</h3>
<ul>
<li>JPQL opera sobre <strong>clases y campos Java</strong>, no sobre tablas y columnas SQL</li>
<li><code>SELECT j FROM Juego j</code> — <code>Juego</code> es la clase, no la tabla</li>
<li><code>j.titulo</code> — campo Java, no columna SQL</li>
</ul>
<h3>Parámetros</h3>
<ul>
<li><code>:nombre</code> — parámetro nombrado (recomendado)</li>
<li>Se vinculan con <code>@Param("nombre")</code> en el método</li>
</ul>
<h3>@Query nativa</h3>
<p>Si necesitas SQL puro, agrega <code>nativeQuery = true</code>. Útil para funciones específicas de PostgreSQL.</p>`,
      analogy: "🔍 JPQL es como SQL pero hablas de tus objetos Java en vez de tablas. En vez de 'SELECT * FROM juego WHERE precio < 50', dices 'SELECT j FROM Juego j WHERE j.precio < :max'.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <!-- JPQL box -->
  <rect x="20" y="30" width="180" height="80" rx="8" fill="#ec489922" stroke="#ec4899" stroke-width="1.5"/>
  <text x="110" y="50" fill="#ec4899" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">JPQL (clases Java)</text>
  <text x="30" y="68" fill="#f9a8d4" font-size="7.5" font-family="monospace">SELECT j FROM Juego j</text>
  <text x="30" y="84" fill="#f9a8d4" font-size="7.5" font-family="monospace">WHERE j.precio &lt; :max</text>
  <text x="30" y="100" fill="#f9a8d4" font-size="7.5" font-family="monospace">AND j.genero = :genero</text>
  <!-- Arrow -->
  <line x1="202" y1="70" x2="238" y2="70" stroke="#ec4899" stroke-width="1.5" marker-end="url(#arrQ)"/>
  <defs>
    <marker id="arrQ" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#ec4899"/>
    </marker>
  </defs>
  <text x="220" y="62" fill="#f9a8d4" font-size="7" font-family="monospace" text-anchor="middle">JPA</text>
  <!-- SQL box -->
  <rect x="240" y="30" width="160" height="80" rx="8" fill="#6366f122" stroke="#6366f1" stroke-width="1.5"/>
  <text x="320" y="50" fill="#6366f1" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">SQL generado</text>
  <text x="250" y="68" fill="#a5b4fc" font-size="7.5" font-family="monospace">SELECT * FROM juego</text>
  <text x="250" y="84" fill="#a5b4fc" font-size="7.5" font-family="monospace">WHERE precio &lt; $1</text>
  <text x="250" y="100" fill="#a5b4fc" font-size="7.5" font-family="monospace">AND genero = $2</text>
  <!-- Code example -->
  <rect x="20" y="128" width="380" height="52" rx="6" fill="#1e2030" stroke="#334155" stroke-width="1"/>
  <text x="30" y="144" fill="#ec4899" font-size="7.5" font-family="monospace">@Query("SELECT j FROM Juego j WHERE j.precio &lt; :max AND j.genero = :genero")</text>
  <text x="30" y="160" fill="#94a3b8" font-size="7.5" font-family="monospace">List&lt;Juego&gt; findBaratosPorGenero(@Param("max") double max, @Param("genero") String genero);</text>
  <text x="30" y="174" fill="#64748b" font-size="7" font-family="monospace">// en JuegoRepository</text>
</svg>`,
      starterCode: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JuegoRepository extends JpaRepository<Juego, Long> {

    // TODO: escribe una @Query JPQL que devuelva juegos
    // cuyo precio sea menor que :maxPrecio
    // y cuyo genero sea igual a :genero
    // Ordena por precio ascendente


    // TODO: escribe una @Query JPQL que busque juegos
    // lanzados después de un año dado (:anio)
    // Tip: usa j.lanzamiento.year > :anio


    // TODO: escribe una @Query con nativeQuery=true
    // que devuelva los 5 juegos más caros
    // (SQL puro: SELECT * FROM juego ORDER BY precio DESC LIMIT 5)
    List<Juego> findTop5ByPrecio();
}`,
      solution: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JuegoRepository extends JpaRepository<Juego, Long> {

    // JPQL — usa nombres de clase y campo Java, no tabla/columna SQL
    @Query("SELECT j FROM Juego j WHERE j.precio < :maxPrecio AND j.genero = :genero ORDER BY j.precio ASC")
    List<Juego> findBaratosPorGenero(
        @Param("maxPrecio") double maxPrecio,
        @Param("genero") String genero
    );

    @Query("SELECT j FROM Juego j WHERE YEAR(j.lanzamiento) > :anio")
    List<Juego> findLanzadosDespuesDe(@Param("anio") int anio);

    // SQL nativo — útil para funciones específicas de PostgreSQL
    @Query(value = "SELECT * FROM juego ORDER BY precio DESC LIMIT 5", nativeQuery = true)
    List<Juego> findTop5ByPrecio();
}`,
      hint: "En JPQL usa el nombre de la clase Java (Juego) y sus campos (j.precio), no la tabla SQL. Para SQL nativo agrega nativeQuery = true. Vincula parámetros con @Param.",
      expectedOutput: `// Ejemplo de uso en JuegoService:
List<Juego> baratos = repo.findBaratosPorGenero(50.0, "Acción");
// → SELECT * FROM juego WHERE precio < 50 AND genero = 'Acción' ORDER BY precio ASC

List<Juego> recientes = repo.findLanzadosDespuesDe(2020);
// → SELECT * FROM juego WHERE YEAR(lanzamiento) > 2020

List<Juego> top5 = repo.findTop5ByPrecio();
// → SELECT * FROM juego ORDER BY precio DESC LIMIT 5`,
    },

    // ── 5. DTOs ───────────────────────────────────────────────────────────────
    {
      id: "dto",
      title: "DTOs — Separar la API de la Entidad",
      concept: "dto",
      conceptLabel: "Diseño API",
      conceptColor: "#a855f7",
      explanation: `<p>Un <strong>DTO (Data Transfer Object)</strong> es una clase simple que representa exactamente los datos que viajan entre el cliente y el servidor — ni más, ni menos.</p>
<h3>¿Por qué no exponer la @Entity directamente?</h3>
<ul>
<li><strong>Loops de serialización</strong> — con relaciones @OneToMany/@ManyToOne, Jackson entra en un bucle infinito: Juego -> Categoria -> [Juego...] -> Categoria...</li>
<li><strong>Datos sensibles</strong> — la entidad puede tener campos internos que no deben llegar al cliente (passwords, auditoría, IDs internos)</li>
<li><strong>Contratos distintos</strong> — el body del POST para crear no es igual al JSON que devuelve el GET</li>
</ul>
<h3>Patrón Request / Response</h3>
<ul>
<li><code>JuegoRequestDTO</code> — lo que el cliente envía (POST/PUT). Sin ID, sin campos generados.</li>
<li><code>JuegoResponseDTO</code> — lo que el servidor devuelve (GET). Puede incluir campos calculados, nombre de la categoría en texto plano, etc.</li>
</ul>
<h3>Flujo por capas</h3>
<p>Controller recibe RequestDTO → Service convierte a Entity → Repository persiste → Service convierte a ResponseDTO → Controller devuelve ResponseDTO.</p>`,
      analogy: "📦 El DTO es como el embalaje de un producto: hacia afuera muestras solo lo que el cliente necesita ver (precio, nombre), no los detalles internos del almacén (IDs de proveedor, costos internos).",
      diagram: `<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="210" fill="#13141f" rx="10"/>
  <!-- Controller -->
  <rect x="10" y="80" width="80" height="50" rx="6" fill="#a855f722" stroke="#a855f7" stroke-width="1.5"/>
  <text x="50" y="100" fill="#a855f7" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">Controller</text>
  <text x="50" y="114" fill="#d8b4fe" font-size="7" font-family="monospace" text-anchor="middle">@RestController</text>
  <!-- Arrow: client -> controller (RequestDTO) -->
  <line x1="10" y1="72" x2="50" y2="80" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="5" y="68" fill="#d8b4fe" font-size="6.5" font-family="monospace">RequestDTO</text>
  <!-- Arrow controller -> service -->
  <line x1="92" y1="105" x2="128" y2="105" stroke="#a855f7" stroke-width="1.5" marker-end="url(#arrD1)"/>
  <defs>
    <marker id="arrD1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#a855f7"/></marker>
    <marker id="arrD2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#10b981"/></marker>
    <marker id="arrD3" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#6366f1"/></marker>
    <marker id="arrD4" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#10b981"/></marker>
  </defs>
  <!-- Service -->
  <rect x="130" y="70" width="100" height="70" rx="6" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="180" y="90" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">Service</text>
  <text x="180" y="104" fill="#6ee7b7" font-size="6.5" font-family="monospace" text-anchor="middle">toEntity(dto)</text>
  <text x="180" y="116" fill="#6ee7b7" font-size="6.5" font-family="monospace" text-anchor="middle">toResponseDto(entity)</text>
  <text x="180" y="130" fill="#64748b" font-size="6" font-family="monospace" text-anchor="middle">mapeo manual</text>
  <!-- Arrow service -> repository -->
  <line x1="232" y1="105" x2="268" y2="105" stroke="#6366f1" stroke-width="1.5" marker-end="url(#arrD3)"/>
  <!-- Repository -->
  <rect x="270" y="80" width="80" height="50" rx="6" fill="#6366f122" stroke="#6366f1" stroke-width="1.5"/>
  <text x="310" y="100" fill="#6366f1" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">Repository</text>
  <text x="310" y="114" fill="#a5b4fc" font-size="7" font-family="monospace" text-anchor="middle">@Entity</text>
  <!-- Arrow: controller -> client (ResponseDTO) -->
  <line x1="50" y1="130" x2="50" y2="145" stroke="#10b981" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="5" y="160" fill="#6ee7b7" font-size="6.5" font-family="monospace">ResponseDTO</text>
  <!-- Labels bottom -->
  <rect x="60" y="165" width="300" height="34" rx="6" fill="#1e2030" stroke="#334155" stroke-width="1"/>
  <text x="210" y="179" fill="#a855f7" font-size="7.5" font-family="monospace" text-anchor="middle">RequestDTO → Entity → Repository → Entity → ResponseDTO</text>
  <text x="210" y="192" fill="#64748b" font-size="7" font-family="monospace" text-anchor="middle">El cliente nunca ve la @Entity directamente</text>
</svg>`,
      starterCode: `// ── JuegoRequestDTO.java ──────────────────────────────
// Lo que el cliente envía en POST /api/juegos
public class JuegoRequestDTO {

    // TODO: agrega los campos que el cliente debe enviar:
    //   - String titulo  (no nulo)
    //   - String genero
    //   - double precio  (no nulo)
    //   - Long categoriaId  (el cliente solo envía el ID, no el objeto completo)

    // TODO: agrega constructor vacío y constructor con todos los campos

    // TODO: agrega getters
}

// ── JuegoResponseDTO.java ─────────────────────────────
// Lo que el servidor devuelve en GET /api/juegos
public class JuegoResponseDTO {

    // TODO: agrega los campos de respuesta:
    //   - Long id
    //   - String titulo
    //   - String genero
    //   - double precio
    //   - String categoriaNombre  // <- nombre de la categoría, NO el objeto Categoria entero

    // TODO: agrega constructor con todos los campos
    // TODO: agrega getters
}

// ── En JuegoService.java ──────────────────────────────
// TODO: implementa el método que convierte Entity -> ResponseDTO
// private JuegoResponseDTO toResponseDto(Juego juego) { ... }

// TODO: implementa el método que convierte RequestDTO -> Entity
// private Juego toEntity(JuegoRequestDTO dto, Categoria categoria) { ... }`,
      solution: `// ── JuegoRequestDTO.java ──────────────────────────────
public class JuegoRequestDTO {
    private String titulo;
    private String genero;
    private double precio;
    private Long categoriaId; // solo el ID, no el objeto completo

    public JuegoRequestDTO() {}

    public JuegoRequestDTO(String titulo, String genero, double precio, Long categoriaId) {
        this.titulo = titulo;
        this.genero = genero;
        this.precio = precio;
        this.categoriaId = categoriaId;
    }

    public String getTitulo()      { return titulo; }
    public String getGenero()      { return genero; }
    public double getPrecio()      { return precio; }
    public Long getCategoriaId()   { return categoriaId; }
}

// ── JuegoResponseDTO.java ─────────────────────────────
public class JuegoResponseDTO {
    private Long id;
    private String titulo;
    private String genero;
    private double precio;
    private String categoriaNombre; // texto plano, sin loop de serialización

    public JuegoResponseDTO(Long id, String titulo, String genero,
                             double precio, String categoriaNombre) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.precio = precio;
        this.categoriaNombre = categoriaNombre;
    }

    public Long getId()               { return id; }
    public String getTitulo()         { return titulo; }
    public String getGenero()         { return genero; }
    public double getPrecio()         { return precio; }
    public String getCategoriaNombre(){ return categoriaNombre; }
}

// ── JuegoService.java — métodos de mapeo ──────────────
@Service
public class JuegoService {

    private final JuegoRepository juegoRepo;
    private final CategoriaRepository categoriaRepo;

    public JuegoService(JuegoRepository juegoRepo, CategoriaRepository categoriaRepo) {
        this.juegoRepo = juegoRepo;
        this.categoriaRepo = categoriaRepo;
    }

    // Entity -> ResponseDTO
    private JuegoResponseDTO toResponseDto(Juego juego) {
        String nombreCat = juego.getCategoria() != null
            ? juego.getCategoria().getNombre()
            : "Sin categoría";
        return new JuegoResponseDTO(
            juego.getId(),
            juego.getTitulo(),
            juego.getGenero(),
            juego.getPrecio(),
            nombreCat
        );
    }

    // RequestDTO -> Entity
    private Juego toEntity(JuegoRequestDTO dto, Categoria categoria) {
        return new Juego(dto.getTitulo(), dto.getGenero(), dto.getPrecio(), categoria);
    }

    public JuegoResponseDTO crear(JuegoRequestDTO dto) {
        Categoria cat = categoriaRepo.findById(dto.getCategoriaId())
            .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));
        Juego nuevo = juegoRepo.save(toEntity(dto, cat));
        return toResponseDto(nuevo);
    }

    public List<JuegoResponseDTO> listarTodos() {
        return juegoRepo.findAll().stream()
            .map(this::toResponseDto)
            .toList();
    }
}`,
      hint: "El RequestDTO no tiene ID (lo genera la BD). El ResponseDTO tiene el nombre de la categoría como String, no el objeto Categoria — así evitas el loop de serialización. El Service hace el mapeo en métodos privados toEntity() y toResponseDto().",
      expectedOutput: `// POST /api/juegos — el cliente envía:
{
  "titulo": "Elden Ring",
  "genero": "RPG",
  "precio": 199.90,
  "categoriaId": 1
}

// GET /api/juegos — el servidor responde:
{
  "id": 1,
  "titulo": "Elden Ring",
  "genero": "RPG",
  "precio": 199.90,
  "categoriaNombre": "Acción-RPG"   // <- string plano, sin objeto Categoria anidado
}`,
    },

  ],

  exam: [
    {
      id: 1,
      text: "¿Qué anotación convierte una clase Java en una tabla de base de datos con JPA?",
      options: ["@Table", "@Entity", "@Column", "@Repository"],
      correctAnswer: 1,
      explanation: "@Entity es la anotación que marca una clase Java como entidad JPA, lo que indica que debe mapearse a una tabla en la base de datos.",
      category: "JPA Entities",
    },
    {
      id: 2,
      text: "¿Cuál es el propósito de @GeneratedValue(strategy = GenerationType.IDENTITY)?",
      options: [
        "Define el nombre de la tabla en la BD",
        "Indica que la base de datos genera el valor del ID automáticamente",
        "Crea un índice único en la columna",
        "Valida que el campo no sea nulo",
      ],
      correctAnswer: 1,
      explanation: "GenerationType.IDENTITY delega la generación del ID a la base de datos (PostgreSQL usa SERIAL/BIGSERIAL). El ID se asigna automáticamente en cada INSERT.",
      category: "JPA Entities",
    },
    {
      id: 3,
      text: "¿Qué interfaz debes extender para obtener operaciones CRUD automáticas en Spring Data JPA?",
      options: ["CrudInterface<T, ID>", "JPARepository<T>", "JpaRepository<T, ID>", "DataRepository<T, ID>"],
      correctAnswer: 2,
      explanation: "JpaRepository<T, ID> es la interfaz de Spring Data JPA que provee operaciones CRUD completas (save, findById, findAll, deleteById, etc.) sin necesidad de implementación.",
      category: "Spring Data JPA",
    },
    {
      id: 4,
      text: "Si tienes un método findByGeneroAndPrecioLessThan(String genero, double precio) en tu repositorio, ¿qué hace Spring Data JPA?",
      options: [
        "Lanza un error porque el nombre es demasiado largo",
        "Genera automáticamente una query SQL: WHERE genero = ? AND precio < ?",
        "Requiere que lo implementes manualmente",
        "Busca solo por genero e ignora precio",
      ],
      correctAnswer: 1,
      explanation: "Spring Data JPA interpreta el nombre del método y genera la query automáticamente. Este es el patrón 'Query Method' o 'Derived Query'.",
      category: "Query Methods",
    },
    {
      id: 5,
      text: "¿Qué anotación usas en la clase Juego para indicar que muchos juegos pertenecen a una Categoria?",
      options: ["@OneToMany", "@ManyToOne", "@ManyToMany", "@OneToOne"],
      correctAnswer: 1,
      explanation: "@ManyToOne se coloca en el lado 'muchos' (Juego). Indica que muchos juegos pueden pertenecer a una sola categoría. La FK (categoria_id) se crea en la tabla juego.",
      category: "Relaciones JPA",
    },
    {
      id: 6,
      text: "¿Cuál es la diferencia entre FetchType.LAZY y FetchType.EAGER?",
      options: [
        "LAZY es más rápido que EAGER en todos los casos",
        "EAGER carga la relación solo cuando se accede; LAZY la carga siempre",
        "LAZY carga la relación solo cuando se accede; EAGER la carga inmediatamente con el padre",
        "No hay diferencia funcional, solo de nombre",
      ],
      correctAnswer: 2,
      explanation: "LAZY (perezoso) carga la relación bajo demanda — solo cuando accedes al campo. EAGER (ansioso) la carga inmediatamente junto al objeto padre. LAZY es recomendado para @OneToMany para evitar cargas masivas.",
      category: "Relaciones JPA",
    },
    {
      id: 7,
      text: "En JPQL, ¿sobre qué opera la consulta?",
      options: [
        "Sobre tablas y columnas SQL directamente",
        "Sobre clases y campos Java (entidades JPA)",
        "Sobre archivos XML de configuración",
        "Sobre procedimientos almacenados",
      ],
      correctAnswer: 1,
      explanation: "JPQL (Java Persistence Query Language) opera sobre el modelo de objetos Java, no sobre las tablas SQL. Usas el nombre de la clase (Juego) y sus campos (j.precio), no la tabla (juego) ni la columna.",
      category: "JPQL",
    },
    {
      id: 8,
      text: "¿Qué hace repository.save(juego) si el objeto juego ya tiene un ID?",
      options: [
        "Lanza una excepción porque el ID ya existe",
        "Ignora la operación",
        "Ejecuta un UPDATE en la base de datos",
        "Crea un nuevo registro con un ID diferente",
      ],
      correctAnswer: 2,
      explanation: "save() en JpaRepository es inteligente: si el objeto tiene ID, ejecuta un UPDATE (merge). Si no tiene ID, ejecuta un INSERT. Esto se llama 'upsert' semántico.",
      category: "Spring Data JPA",
    },
    {
      id: 9,
      text: "¿Para qué sirve @JoinColumn(name = \"categoria_id\")?",
      options: [
        "Crea una nueva tabla de unión entre Juego y Categoria",
        "Especifica el nombre de la columna FK en la tabla del lado @ManyToOne",
        "Define la llave primaria de la relación",
        "Indica que la columna es única",
      ],
      correctAnswer: 1,
      explanation: "@JoinColumn se usa en el lado @ManyToOne para especificar el nombre de la columna de llave foránea en la tabla actual. Sin ella, JPA genera un nombre automático.",
      category: "Relaciones JPA",
    },
    {
      id: 10,
      text: "¿Cuándo usarías @Query con nativeQuery = true?",
      options: [
        "Siempre, porque es más eficiente que JPQL",
        "Cuando necesitas usar funciones o sintaxis específica de la base de datos (ej: LIMIT, array_agg de PostgreSQL)",
        "Cuando la entidad no tiene @Id",
        "Para relaciones @ManyToMany únicamente",
      ],
      correctAnswer: 1,
      explanation: "nativeQuery = true permite escribir SQL puro, útil cuando necesitas funciones específicas de PostgreSQL (como LIMIT, OFFSET, array_agg, jsonb_agg) que JPQL no soporta.",
      category: "JPQL",
    },
    {
      id: 11,
      text: "¿Cuál es el principal problema de devolver una @Entity JPA directamente desde un @RestController cuando hay relaciones @ManyToOne?",
      options: [
        "El código no compila porque @Entity no es serializable",
        "Jackson puede entrar en un loop infinito al serializar las relaciones bidireccionales",
        "Spring Boot no permite mezclar @Entity con @RestController",
        "La base de datos recibe peticiones duplicadas",
      ],
      correctAnswer: 1,
      explanation: "Con relaciones @OneToMany/@ManyToOne bidireccionales, Jackson intenta serializar Juego -> Categoria -> [Juego, Juego...] -> Categoria... en bucle infinito. Los DTOs cortan este problema al exponer solo los campos necesarios (ej: categoriaNombre como String).",
      category: "DTOs",
    },
    {
      id: 12,
      text: "¿Cuál es la diferencia principal entre un RequestDTO y un ResponseDTO?",
      options: [
        "No hay diferencia, son el mismo objeto",
        "RequestDTO se usa para GET, ResponseDTO para POST",
        "RequestDTO modela lo que el cliente envía (sin ID generado); ResponseDTO modela lo que el servidor devuelve (con ID y datos calculados)",
        "RequestDTO lo usa el Repository y ResponseDTO el Controller",
      ],
      correctAnswer: 2,
      explanation: "RequestDTO representa el body que el cliente envía (POST/PUT) — no incluye el ID porque la BD lo genera. ResponseDTO representa lo que el servidor devuelve (GET) — incluye el ID generado y puede tener campos calculados o simplificados como el nombre de la categoría.",
      category: "DTOs",
    },
  ] as ExamQuestion[],


  practicalExam: {
    title: "Taller - Plataforma de Música en Streaming",
    context: "Se solicita desarrollar una API REST Backend que permita gestionar una plataforma de música en streaming. La API administrará artistas y sus canciones usando arquitectura por capas con Spring Boot, Spring Data JPA y PostgreSQL.",
    duration: 110,
    points: 15,
    technologies: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "DTO (RequestDTO / ResponseDTO)", "Swagger", "Postman"],
    tables: [
      {
        name: "Artista",
        fields: ["id", "nombre", "pais", "generoMusical", "fechaDebut", "numeroPistas", "estado (Activo / Inactivo)"],
      },
      {
        name: "Cancion",
        fields: ["id", "titulo", "duracion (segundos)", "reproducciones", "fechaLanzamiento", "idArtista (FK → Artista)"],
      },
    ],
    userStories: [
      {
        id: "HU01",
        title: "Registrar una canción",
        description: "Como desarrollador quiero registrar una canción en la plataforma para gestionarla.",
        criteria: [
          "Registrar una canción con todos los atributos de la Tabla Cancion. Todos los campos son obligatorios.",
          "Utilizar el patrón DTO (RequestDTO para recibir datos, ResponseDTO para devolver la respuesta).",
          "Incluir la dependencia de Swagger en la API REST.",
          "Adjuntar captura de Postman con el request y la respuesta (HTTP 201 Created).",
        ],
        points: 2,
        promptPoints: 1,
      },
      {
        id: "HU02",
        title: "Buscar artista por ID",
        description: "Como desarrollador quiero buscar un artista por su id para visualizar su información.",
        criteria: [
          "Permitir buscar un artista por su id.",
          "Si el id no existe, retornar un mensaje indicando que el artista no fue encontrado (HTTP 404).",
          "Utilizar el patrón DTO (ResponseDTO).",
          "Incluir la dependencia de Swagger en la API REST.",
          "Adjuntar captura de Postman (caso encontrado y caso no encontrado).",
        ],
        points: 2,
        promptPoints: 1,
      },
      {
        id: "HU03",
        title: "Canciones por rango de fechas y reproducciones",
        description: "Como desarrollador quiero visualizar las canciones lanzadas en un rango de fechas y con más de un número de reproducciones dado para analizarlas.",
        criteria: [
          "Listar canciones cuya fechaLanzamiento esté entre una fecha de inicio y una fecha de fin (parámetros del request).",
          "Solo incluir canciones con reproducciones mayores al valor ingresado como parámetro.",
          "El resultado debe mostrar: titulo, fechaLanzamiento, reproducciones y nombre del artista.",
          "Resultado en formato JSON.",
          "Utilizar el patrón DTO.",
          "Incluir Swagger y adjuntar captura de Postman.",
        ],
        points: 3,
        promptPoints: 1,
      },
      {
        id: "HU04",
        title: "Conteo de canciones por artista",
        description: "Como desarrollador quiero visualizar la cantidad total de canciones agrupadas por artista para conocer la producción de cada uno.",
        criteria: [
          "Mostrar el nombre del artista y la cantidad de canciones que tiene registradas.",
          "Resultado en formato JSON.",
          "Utilizar el patrón DTO.",
          "Incluir Swagger y adjuntar captura de Postman.",
        ],
        points: 3,
        promptPoints: 1,
      },
    ],
    namingConventions: [
      "Clases: iniciales de nombres y apellidos + nombre en inglés. Ej: rmjmArtist (Ramírez Méndez Juana Martina)",
      "Packages: iniciales en minúscula. Ej: jmlaentities, jmlacontrollers, jmlaservices",
      "Base de datos: iniciales + BDPC1. Ej: jmlaBDPC1",
      "Ruta del controlador: número de PC + apellido paterno. Ej: @RequestMapping(\"/pc01/ramirez\")",
      "Rutas de los métodos: combinación de apellidos del estudiante. Ej: /ramirez-mendez/artistas",
      "Nombre del proyecto: PC1PrimerNombreComputadora01 (número varía según la máquina asignada)",
    ],
    layers: [

      // ── 1. Artista.java ───────────────────────────────────────────
      {
        step: 1,
        label: "1. Artista.java",
        filename: "Artista.java",
        folder: "entities",
        role: "@Entity — tabla artista en la BD",
        color: "#f59e0b",
        starterCode: `package com.example.abcdentities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class abcdArtista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: declara los campos:
    // nombre (String)
    // pais (String)
    // generoMusical (String)
    // fechaDebut (LocalDate)
    // numeroPistas (int)
    // estado (String) — "Activo" o "Inactivo"
}`,
        solution: `package com.example.abcdentities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class abcdArtista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String pais;
    private String generoMusical;
    private LocalDate fechaDebut;
    private int numeroPistas;
    private String estado; // "Activo" o "Inactivo"
}`,
        hint: "@Data genera automáticamente getters, setters, equals, hashCode y toString. @NoArgsConstructor y @AllArgsConstructor generan los constructores. Lombok elimina todo el boilerplate — solo declares los campos.",
      },

      // ── 2. Cancion.java ───────────────────────────────────────────
      {
        step: 2,
        label: "2. Cancion.java",
        filename: "Cancion.java",
        folder: "entities",
        role: "@Entity con @ManyToOne → artista",
        color: "#f59e0b",
        starterCode: `package com.example.abcdentities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class abcdCancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private int duracion;          // segundos
    private long reproducciones;
    private LocalDate fechaLanzamiento;

    // TODO: agrega la relación con abcdArtista
    // Escribe las anotaciones @ManyToOne y @JoinColumn(name = "id_artista")
    // El campo se llama "artista" y es de tipo abcdArtista
}`,
        solution: `package com.example.abcdentities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class abcdCancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private int duracion;
    private long reproducciones;
    private LocalDate fechaLanzamiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_artista")
    private abcdArtista artista;
}`,
        hint: "@Data con @ManyToOne puede causar StackOverflow en toString/hashCode si la relación es bidireccional. Si eso ocurre, agrega @ToString(exclude = \"artista\") y @EqualsAndHashCode(exclude = \"artista\").",
      },

      // ── 3. CancionRequestDTO.java ─────────────────────────────────
      {
        step: 3,
        label: "3. CancionRequestDTO.java",
        filename: "CancionRequestDTO.java",
        folder: "dto",
        role: "Body del POST — datos que envía el cliente",
        color: "#a855f7",
        starterCode: `package com.example.abcddto;

import java.time.LocalDate;

// RequestDTO: modela EXACTAMENTE lo que el cliente envía en el body del POST
// No incluye 'id' — la BD lo genera automáticamente
public class abcdCancionRequestDTO {

    // TODO: declara los campos:
    // titulo (String)
    // duracion (int)
    // reproducciones (long)
    // fechaLanzamiento (LocalDate)
    // idArtista (Long)  ← la FK, no el objeto completo

    // TODO: genera getters y setters
}`,
        solution: `package com.example.abcddto;

import java.time.LocalDate;

public class abcdCancionRequestDTO {

    private String titulo;
    private int duracion;
    private long reproducciones;
    private LocalDate fechaLanzamiento;
    private Long idArtista;

    public String getTitulo() { return titulo; }
    public void setTitulo(String t) { this.titulo = t; }
    public int getDuracion() { return duracion; }
    public void setDuracion(int d) { this.duracion = d; }
    public long getReproducciones() { return reproducciones; }
    public void setReproducciones(long r) { this.reproducciones = r; }
    public LocalDate getFechaLanzamiento() { return fechaLanzamiento; }
    public void setFechaLanzamiento(LocalDate f) { this.fechaLanzamiento = f; }
    public Long getIdArtista() { return idArtista; }
    public void setIdArtista(Long id) { this.idArtista = id; }
}`,
        hint: "El RequestDTO no tiene 'id' porque es generado por la BD. El artista se referencia solo por su 'idArtista' (Long), nunca por el objeto completo.",
      },

      // ── 4. CancionResponseDTO.java ────────────────────────────────
      {
        step: 4,
        label: "4. CancionResponseDTO.java",
        filename: "CancionResponseDTO.java",
        folder: "dto",
        role: "Body del response — datos que devuelve la API",
        color: "#a855f7",
        starterCode: `package com.example.abcddto;

// ResponseDTO: modela lo que el servidor devuelve al cliente
// Incluye el id generado y datos calculados/aplanados
public class abcdCancionResponseDTO {

    // TODO: declara los campos:
    // id (Long)
    // titulo (String)
    // duracion (int)
    // reproducciones (long)
    // nombreArtista (String)  ← String, no el objeto abcdArtista
    //                            así evitamos el loop infinito de Jackson

    // TODO: genera getters y setters
}`,
        solution: `package com.example.abcddto;

public class abcdCancionResponseDTO {

    private Long id;
    private String titulo;
    private int duracion;
    private long reproducciones;
    private String nombreArtista; // String plano, sin referencias circulares

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String t) { this.titulo = t; }
    public int getDuracion() { return duracion; }
    public void setDuracion(int d) { this.duracion = d; }
    public long getReproducciones() { return reproducciones; }
    public void setReproducciones(long r) { this.reproducciones = r; }
    public String getNombreArtista() { return nombreArtista; }
    public void setNombreArtista(String n) { this.nombreArtista = n; }
}`,
        hint: "El ResponseDTO sí lleva 'id'. El artista se aplanó a 'nombreArtista: String' — así Jackson no entra en loop y el JSON queda limpio.",
      },

      // ── 5. ArtistaRepository.java ─────────────────────────────────
      {
        step: 5,
        label: "5. ArtistaRepository.java",
        filename: "ArtistaRepository.java",
        folder: "repositories",
        role: "CRUD automático para Artista",
        color: "#10b981",
        starterCode: `package com.example.abcdrepositories;

import com.example.abcdentities.abcdArtista;
import org.springframework.data.jpa.repository.JpaRepository;

// TODO: declara la interfaz abcdArtistaRepository
// Debe extender JpaRepository con los tipos correctos:
//   - T  = abcdArtista  (la entidad)
//   - ID = Long          (tipo del @Id)
//
// Spring Data JPA genera automáticamente:
// save(), findById(), findAll(), deleteById(), existsById()...
// ¡Sin escribir una sola línea de implementación!

public interface abcdArtistaRepository {
    // TODO: reemplaza la firma para extender JpaRepository correctamente
}`,
        solution: `package com.example.abcdrepositories;

import com.example.abcdentities.abcdArtista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface abcdArtistaRepository extends JpaRepository<abcdArtista, Long> {
    // Spring Data JPA genera toda la implementación automáticamente.
    // findById(Long id) ya está disponible para HU02.
}`,
        hint: "JpaRepository<T, ID> requiere dos tipos genéricos: la entidad y el tipo de su @Id. Con eso tienes save(), findById(), findAll() y más sin escribir código.",
      },

      // ── 6. CancionRepository.java ─────────────────────────────────
      {
        step: 6,
        label: "6. CancionRepository.java",
        filename: "CancionRepository.java",
        folder: "repositories",
        role: "@Query JPQL para HU03 y HU04",
        color: "#10b981",
        starterCode: `package com.example.abcdrepositories;

import com.example.abcdentities.abcdCancion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface abcdCancionRepository extends JpaRepository<abcdCancion, Long> {

    // HU03: canciones entre dos fechas y con reproducciones > mínimo
    // Escribe la @Query JPQL:
    // - Opera sobre abcdCancion c
    // - Filtra: c.fechaLanzamiento BETWEEN :inicio AND :fin
    // - Filtra: c.reproducciones > :minRep
    // - Usa @Param para vincular los tres parámetros
    // TODO: ...


    // HU04: nombre del artista y cantidad de canciones agrupadas
    // Escribe la @Query JPQL:
    // - SELECT a.nombre, COUNT(c)
    // - FROM abcdCancion c JOIN c.artista a
    // - GROUP BY a.nombre
    // TODO: ...
}`,
        solution: `package com.example.abcdrepositories;

import com.example.abcdentities.abcdCancion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface abcdCancionRepository extends JpaRepository<abcdCancion, Long> {

    @Query("SELECT c FROM abcdCancion c " +
           "WHERE c.fechaLanzamiento BETWEEN :inicio AND :fin " +
           "AND c.reproducciones > :minRep")
    List<abcdCancion> findByFechaYReproducciones(
        @Param("inicio") LocalDate inicio,
        @Param("fin")    LocalDate fin,
        @Param("minRep") long minRep
    );

    @Query("SELECT a.nombre, COUNT(c) " +
           "FROM abcdCancion c JOIN c.artista a " +
           "GROUP BY a.nombre")
    List<Object[]> countCancionesByArtista();
}`,
        hint: "En JPQL usa nombres de clase Java (abcdCancion, no la tabla). Para el JOIN escribe c.artista — la referencia al campo de la entidad, no 'id_artista'.",
      },

      // ── 7. CancionService.java ────────────────────────────────────
      {
        step: 7,
        label: "7. CancionService.java",
        filename: "CancionService.java",
        folder: "services",
        role: "Lógica de negocio — orquesta entity ↔ DTO",
        color: "#6366f1",
        starterCode: `package com.example.abcdservices;

import com.example.abcdentities.abcdArtista;
import com.example.abcdentities.abcdCancion;
import com.example.abcddto.abcdCancionRequestDTO;
import com.example.abcddto.abcdCancionResponseDTO;
import com.example.abcdrepositories.abcdArtistaRepository;
import com.example.abcdrepositories.abcdCancionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class abcdCancionService {

    @Autowired private abcdCancionRepository cancionRepo;
    @Autowired private abcdArtistaRepository artistaRepo;

    // HU01 — registrar canción
    public abcdCancionResponseDTO registrar(abcdCancionRequestDTO dto) {
        // TODO 1: busca el artista con artistaRepo.findById(dto.getIdArtista())
        //         lanza RuntimeException("Artista no encontrado") si no existe
        // TODO 2: crea un objeto abcdCancion y setea sus campos desde el dto
        // TODO 3: guarda con cancionRepo.save(cancion)
        // TODO 4: mapea la entidad guardada a abcdCancionResponseDTO y retorna
        return null;
    }

    // HU03 — filtrar por fecha y reproducciones
    public List<abcdCancionResponseDTO> filtrar(
            LocalDate inicio, LocalDate fin, long minRep) {
        // TODO: llama cancionRepo.findByFechaYReproducciones(...)
        //       convierte cada abcdCancion a abcdCancionResponseDTO
        return null;
    }

    // HU04 — conteo por artista
    public List<Object[]> conteo() {
        // TODO: llama cancionRepo.countCancionesByArtista()
        return null;
    }
}`,
        solution: `package com.example.abcdservices;

import com.example.abcdentities.abcdArtista;
import com.example.abcdentities.abcdCancion;
import com.example.abcddto.abcdCancionRequestDTO;
import com.example.abcddto.abcdCancionResponseDTO;
import com.example.abcdrepositories.abcdArtistaRepository;
import com.example.abcdrepositories.abcdCancionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class abcdCancionService {

    @Autowired private abcdCancionRepository cancionRepo;
    @Autowired private abcdArtistaRepository artistaRepo;

    public abcdCancionResponseDTO registrar(abcdCancionRequestDTO dto) {
        abcdArtista artista = artistaRepo.findById(dto.getIdArtista())
            .orElseThrow(() -> new RuntimeException("Artista no encontrado"));

        abcdCancion c = new abcdCancion();
        c.setTitulo(dto.getTitulo());
        c.setDuracion(dto.getDuracion());
        c.setReproducciones(dto.getReproducciones());
        c.setFechaLanzamiento(dto.getFechaLanzamiento());
        c.setArtista(artista);

        abcdCancion saved = cancionRepo.save(c);

        abcdCancionResponseDTO resp = new abcdCancionResponseDTO();
        resp.setId(saved.getId());
        resp.setTitulo(saved.getTitulo());
        resp.setDuracion(saved.getDuracion());
        resp.setReproducciones(saved.getReproducciones());
        resp.setNombreArtista(artista.getNombre());
        return resp;
    }

    public List<abcdCancionResponseDTO> filtrar(
            LocalDate inicio, LocalDate fin, long minRep) {
        return cancionRepo.findByFechaYReproducciones(inicio, fin, minRep)
            .stream()
            .map(c -> {
                abcdCancionResponseDTO dto = new abcdCancionResponseDTO();
                dto.setId(c.getId());
                dto.setTitulo(c.getTitulo());
                dto.setDuracion(c.getDuracion());
                dto.setReproducciones(c.getReproducciones());
                dto.setNombreArtista(c.getArtista().getNombre());
                return dto;
            })
            .toList();
    }

    public List<Object[]> conteo() {
        return cancionRepo.countCancionesByArtista();
    }
}`,
        hint: "El Service hace de puente: recibe DTO → busca/crea entidades → llama al Repository → convierte de vuelta a DTO. Nunca devuelvas la @Entity directamente desde el Service.",
      },

      // ── 8. CancionController.java ─────────────────────────────────
      {
        step: 8,
        label: "8. CancionController.java",
        filename: "CancionController.java",
        folder: "controllers",
        role: "@RestController — endpoints REST de la API",
        color: "#06b6d4",
        starterCode: `package com.example.abcdcontrollers;

import com.example.abcddto.abcdCancionRequestDTO;
import com.example.abcddto.abcdCancionResponseDTO;
import com.example.abcdrepositories.abcdArtistaRepository;
import com.example.abcdservices.abcdCancionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/pc01/apellido")   // TODO: reemplaza "apellido" con tu apellido paterno
public class abcdCancionController {

    @Autowired private abcdCancionService cancionService;
    @Autowired private abcdArtistaRepository artistaRepo;

    // HU01 — POST: registrar canción  (HTTP 201 Created)
    @PostMapping("/apellido-apellido/canciones")  // TODO: reemplaza con tus apellidos
    public ResponseEntity<abcdCancionResponseDTO> registrar(
            @RequestBody abcdCancionRequestDTO dto) {
        // TODO: llama cancionService.registrar(dto)
        //       devuelve ResponseEntity.status(HttpStatus.CREATED).body(...)
        return null;
    }

    // HU02 — GET: buscar artista por ID  (HTTP 200 / 404)
    @GetMapping("/apellido-apellido/artistas/{id}")
    public ResponseEntity<?> buscarArtista(@PathVariable Long id) {
        // TODO: usa artistaRepo.findById(id)
        //   Si existe  → ResponseEntity.ok(artista)
        //   Si no      → ResponseEntity.status(404).body("Artista no encontrado")
        return null;
    }

    // HU03 — GET: filtrar canciones por fecha y reproducciones
    @GetMapping("/apellido-apellido/canciones/filtro")
    public ResponseEntity<List<abcdCancionResponseDTO>> filtrar(
            @RequestParam LocalDate fechaInicio,
            @RequestParam LocalDate fechaFin,
            @RequestParam long reproducciones) {
        // TODO: llama cancionService.filtrar(...)
        return null;
    }

    // HU04 — GET: conteo de canciones por artista
    @GetMapping("/apellido-apellido/canciones/conteo")
    public ResponseEntity<List<Object[]>> conteo() {
        // TODO: llama cancionService.conteo()
        return null;
    }
}`,
        solution: `package com.example.abcdcontrollers;

import com.example.abcddto.abcdCancionRequestDTO;
import com.example.abcddto.abcdCancionResponseDTO;
import com.example.abcdrepositories.abcdArtistaRepository;
import com.example.abcdservices.abcdCancionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/pc01/garcia")  // iniciales + apellido paterno
public class abcdCancionController {

    @Autowired private abcdCancionService cancionService;
    @Autowired private abcdArtistaRepository artistaRepo;

    @PostMapping("/garcia-lopez/canciones")
    public ResponseEntity<abcdCancionResponseDTO> registrar(
            @RequestBody abcdCancionRequestDTO dto) {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(cancionService.registrar(dto));
    }

    @GetMapping("/garcia-lopez/artistas/{id}")
    public ResponseEntity<?> buscarArtista(@PathVariable Long id) {
        return artistaRepo.findById(id)
            .map(a -> ResponseEntity.ok((Object) a))
            .orElse(ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Artista no encontrado"));
    }

    @GetMapping("/garcia-lopez/canciones/filtro")
    public ResponseEntity<List<abcdCancionResponseDTO>> filtrar(
            @RequestParam LocalDate fechaInicio,
            @RequestParam LocalDate fechaFin,
            @RequestParam long reproducciones) {
        return ResponseEntity.ok(
            cancionService.filtrar(fechaInicio, fechaFin, reproducciones));
    }

    @GetMapping("/garcia-lopez/canciones/conteo")
    public ResponseEntity<List<Object[]>> conteo() {
        return ResponseEntity.ok(cancionService.conteo());
    }
}`,
        hint: "@RequestParam va en los parámetros de la URL (?fecha=...), @PathVariable en el path (/{id}), @RequestBody en el body JSON. Recuerda cambiar 'apellido' por tu apellido real.",
      },

      // ── 9. application.properties ────────────────────────────────
      {
        step: 9,
        label: "9. application.properties",
        filename: "application.properties",
        folder: "resources",
        role: "Configuración de BD y servidor",
        color: "#94a3b8",
        starterCode: `# ─── Servidor ─────────────────────────────────────────────────
server.port=8080

# ─── Base de datos PostgreSQL ──────────────────────────────────
spring.datasource.url=jdbc:postgresql://localhost:5432/abcdBDPC1
spring.datasource.username=postgres
spring.datasource.password=

# TODO: completa la contraseña de tu BD local
# TODO: cambia "abcdBDPC1" por tu base de datos (iniciales + BDPC1)

# ─── JPA / Hibernate ───────────────────────────────────────────
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# ─── Swagger / OpenAPI ─────────────────────────────────────────
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html`,
        solution: `# ─── Servidor ─────────────────────────────────────────────────
server.port=8080

# ─── Base de datos PostgreSQL ──────────────────────────────────
spring.datasource.url=jdbc:postgresql://localhost:5432/jmlaBDPC1
spring.datasource.username=postgres
spring.datasource.password=1234

# ─── JPA / Hibernate ───────────────────────────────────────────
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# ─── Swagger / OpenAPI ─────────────────────────────────────────
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html`,
        hint: "Cambia 'abcdBDPC1' por tus iniciales + BDPC1. La contraseña es la que usaste al instalar PostgreSQL. ddl-auto=update crea/actualiza las tablas automáticamente.",
      },

      // ── 10. pom.xml ──────────────────────────────────────────────
      {
        step: 10,
        label: "10. pom.xml",
        filename: "pom.xml",
        folder: "root",
        role: "Dependencias Maven del proyecto",
        color: "#ef4444",
        starterCode: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <!-- ── Proyecto padre de Spring Boot ─────────────────────────── -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <!-- ── Identificación del proyecto ───────────────────────────── -->
    <groupId>com.example</groupId>
    <artifactId>pc1-musica</artifactId>   <!-- TODO: cambia por PC1TuNombreComputadora01 -->
    <version>0.0.1-SNAPSHOT</version>
    <name>pc1-musica</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>

        <!-- ── API REST ────────────────────────────────────────────
             Incluye Spring MVC, Tomcat embebido y Jackson (JSON).
             Es el corazón de cualquier API REST con Spring Boot.    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- ── JPA + Hibernate ─────────────────────────────────────
             Permite usar @Entity, @Repository, JpaRepository, @Query.
             Hibernate traduce objetos Java ↔ tablas PostgreSQL.      -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- ── PostgreSQL Driver ───────────────────────────────────
             Conector JDBC para que Java se comunique con PostgreSQL.
             Sin este driver, la aplicación no puede conectarse a la BD. -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- ── Lombok ──────────────────────────────────────────────
             Genera automáticamente: getters, setters, constructores,
             equals, hashCode y toString mediante anotaciones.
             @Data = getters + setters + equals + hashCode + toString
             @NoArgsConstructor = constructor vacío
             @AllArgsConstructor = constructor con todos los campos    -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- ── Swagger / OpenAPI (SpringDoc) ───────────────────────
             Genera documentación interactiva de la API automáticamente.
             Disponible en: http://localhost:8080/swagger-ui.html
             Permite probar los endpoints directamente desde el navegador. -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.3.0</version>
        </dependency>

        <!-- ── Testing ─────────────────────────────────────────────
             Incluye JUnit 5, Mockito y Spring Test.
             Se usa para pruebas unitarias e integración.              -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <!-- Plugin principal de Spring Boot: permite ejecutar
                 la app con "mvn spring-boot:run" y empaquetar el JAR -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>`,
        solution: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>PC1GarciaComputadora01</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>PC1GarciaComputadora01</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>`,
        hint: "El pom.xml define todas las dependencias del proyecto. Spring Boot parent gestiona las versiones automáticamente — no necesitas especificar versión en la mayoría de dependencias. Lombok debe excluirse del plugin de build para no incluirse en el JAR final.",
      },
    ],
  } as PracticalExam,
};
