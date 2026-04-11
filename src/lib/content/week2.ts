import type { ExamQuestion, WeekContent } from "./week1";

export const week2: WeekContent = {
  week: 2,
  title: "APIs REST",
  description: "Diseño e implementación de APIs RESTful con Spring Boot: verbos HTTP, controladores, parámetros y códigos de estado.",
  exercises: [
    // ── 1. REST & HTTP ───────────────────────────────────────────────────────
    {
      id: "rest",
      title: "REST & HTTP",
      concept: "rest",
      conceptLabel: "Arquitectura",
      conceptColor: "#8b5cf6",
      explanation: `<p>Una <strong>API REST</strong> (Representational State Transfer) es una forma de diseñar servicios web que usa el protocolo HTTP para comunicar clientes y servidores.</p>
<h3>Principios REST</h3>
<ul>
<li><strong>Cliente-Servidor</strong> — separación de responsabilidades: el cliente consume, el servidor provee</li>
<li><strong>Sin estado (Stateless)</strong> — cada petición HTTP es independiente y contiene toda la info necesaria</li>
<li><strong>Interfaz uniforme</strong> — URLs claras que identifican recursos: <code>/api/productos</code>, <code>/api/usuarios/5</code></li>
<li><strong>JSON</strong> — formato estándar para intercambiar datos entre cliente y servidor</li>
</ul>
<h3>Ciclo request-response</h3>
<p>El cliente envía un <strong>HTTP Request</strong> (método + URL + body opcional). El servidor procesa y responde con un <strong>HTTP Response</strong> (status code + body JSON).</p>`,
      analogy: "🍕 La API es como un menú de restaurante: tú (cliente) pides un plato (recurso) usando el menú (API), el cocinero (servidor) lo prepara y te lo trae (response JSON).",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <!-- Cliente -->
  <rect x="16" y="70" width="90" height="60" rx="8" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="61" y="96" fill="#8b5cf6" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">CLIENTE</text>
  <text x="61" y="112" fill="#a78bfa" font-size="8" font-family="monospace" text-anchor="middle">Browser/App</text>
  <!-- Servidor -->
  <rect x="314" y="70" width="90" height="60" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="359" y="96" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">SERVIDOR</text>
  <text x="359" y="112" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Spring Boot</text>
  <!-- Arrow request -->
  <line x1="108" y1="88" x2="312" y2="88" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arr1)"/>
  <defs>
    <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6"/>
    </marker>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
  </defs>
  <text x="210" y="80" fill="#c4b5fd" font-size="8" font-family="monospace" text-anchor="middle">GET /api/productos</text>
  <!-- Arrow response -->
  <line x1="312" y1="112" x2="108" y2="112" stroke="#10b981" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="210" y="128" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">200 OK  [{...}, {...}]</text>
  <!-- JSON box -->
  <rect x="155" y="148" width="110" height="40" rx="6" fill="#1e2030" stroke="#334155" stroke-width="1"/>
  <text x="162" y="163" fill="#f59e0b" font-size="7" font-family="monospace">&#123;"id":1,"nombre":</text>
  <text x="162" y="178" fill="#f59e0b" font-size="7" font-family="monospace">"Laptop","precio":999&#125;</text>
  <!-- Labels -->
  <text x="210" y="20" fill="#64748b" font-size="9" font-family="sans-serif" text-anchor="middle">Protocolo HTTP · Formato JSON · Sin estado</text>
  <text x="210" y="40" fill="#8b5cf6" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="700">Ciclo REST Request → Response</text>
</svg>`,
      starterCode: `// Modela el cuerpo JSON que devuelve tu API
// cuando alguien hace GET /api/productos/1

public class ProductoResponse {

    // TODO: agrega los campos:
    //   - Long id
    //   - String nombre
    //   - double precio
    //   - boolean disponible

    // TODO: agrega un constructor con los 4 campos

    // TODO: agrega getters para cada campo

    public static void main(String[] args) {
        // TODO: crea un ProductoResponse con:
        //   id=1, nombre="Laptop", precio=2499.99, disponible=true
        // Imprime: Producto: Laptop - S/ 2499.99
        ProductoResponse p = null; // reemplaza esto
        System.out.println("Producto: " + p.getNombre() + " - S/ " + p.getPrecio());
    }
}`,
      solution: `public class ProductoResponse {

    private Long id;
    private String nombre;
    private double precio;
    private boolean disponible;

    public ProductoResponse(Long id, String nombre, double precio, boolean disponible) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;
    }

    public Long getId()          { return id; }
    public String getNombre()    { return nombre; }
    public double getPrecio()    { return precio; }
    public boolean isDisponible(){ return disponible; }

    public static void main(String[] args) {
        ProductoResponse p = new ProductoResponse(1L, "Laptop", 2499.99, true);
        System.out.println("Producto: " + p.getNombre() + " - S/ " + p.getPrecio());
    }
}`,
      hint: "La clase ProductoResponse es el objeto Java que Spring Boot convierte automáticamente a JSON cuando tu endpoint devuelve datos.",
      expectedOutput: "Producto: Laptop - S/ 2499.99",
    },

    // ── 2. @RestController ───────────────────────────────────────────────────
    {
      id: "controller",
      title: "@RestController",
      concept: "controller",
      conceptLabel: "Spring Boot",
      conceptColor: "#10b981",
      explanation: `<p><code>@RestController</code> es la anotación principal de Spring Boot para crear APIs. Es la combinación de <code>@Controller</code> + <code>@ResponseBody</code>: indica que la clase maneja peticiones HTTP y que los métodos retornan datos directamente (no vistas HTML).</p>
<h3>Anotaciones clave</h3>
<ul>
<li><code>@RestController</code> — marca la clase como controlador REST</li>
<li><code>@RequestMapping("/api/ruta")</code> — define la URL base del controlador</li>
<li><code>@GetMapping</code> — método que responde a peticiones GET</li>
<li><code>@PostMapping</code> — método que responde a peticiones POST</li>
</ul>
<h3>¿Qué hace Spring Boot?</h3>
<p>Spring Boot detecta la anotación, registra el controlador automáticamente y convierte el valor de retorno a JSON usando Jackson. Tú solo defines la lógica, Spring hace el resto.</p>`,
      analogy: "📞 @RestController es como una centralita telefónica: atiende llamadas (HTTP requests) en ciertos números (URLs) y las dirige al operador correcto (método).",
      diagram: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="210" fill="#13141f" rx="10"/>
  <!-- Class box -->
  <rect x="80" y="30" width="240" height="160" rx="8" fill="#0d1117" stroke="#10b981" stroke-width="1.5"/>
  <!-- Annotation bar -->
  <rect x="80" y="30" width="240" height="30" rx="8" fill="#10b98122"/>
  <rect x="80" y="50" width="240" height="10" fill="#10b98122"/>
  <text x="200" y="50" fill="#6ee7b7" font-size="11" font-family="monospace" text-anchor="middle" font-weight="700">@RestController</text>
  <rect x="80" y="60" width="240" height="18" fill="#8b5cf622"/>
  <text x="200" y="73" fill="#a78bfa" font-size="9" font-family="monospace" text-anchor="middle">@RequestMapping("/api/productos")</text>
  <!-- Class name -->
  <rect x="80" y="78" width="240" height="22" fill="#1e2030"/>
  <text x="200" y="93" fill="#e2e8f0" font-size="11" font-family="monospace" text-anchor="middle" font-weight="700">ProductoController</text>
  <!-- Methods -->
  <line x1="80" y1="100" x2="320" y2="100" stroke="#334155" stroke-width="1"/>
  <text x="96" y="118" fill="#f59e0b" font-size="8" font-family="monospace">@GetMapping</text>
  <text x="96" y="132" fill="#94a3b8" font-size="8" font-family="monospace">List&lt;Producto&gt; listar()  →  GET /api/productos</text>
  <line x1="96" y1="138" x2="304" y2="138" stroke="#1e2030" stroke-width="1"/>
  <text x="96" y="154" fill="#f59e0b" font-size="8" font-family="monospace">@PostMapping</text>
  <text x="96" y="168" fill="#94a3b8" font-size="8" font-family="monospace">Producto crear(...)     →  POST /api/productos</text>
  <!-- Label -->
  <text x="200" y="205" fill="#10b981" font-size="8" font-family="sans-serif" text-anchor="middle">Spring convierte el retorno a JSON automáticamente</text>
</svg>`,
      starterCode: `import java.util.List;
import java.util.ArrayList;

// TODO: agrega @RestController
// TODO: agrega @RequestMapping("/api/cursos")
public class CursoController {

    private List<String> cursos = new ArrayList<>(
        List.of("ASI705 - Arqui Web", "BAS101 - Algebra", "FIS201 - Física")
    );

    // TODO: agrega @GetMapping
    // Este método debe retornar la lista de cursos
    public List<String> listarCursos() {
        return cursos;
    }

    // TODO: agrega @GetMapping("/count")
    // Este método debe retornar el número de cursos como String
    // Ej: "Total de cursos: 3"
    public String contarCursos() {
        return null; // implementa esto
    }
}`,
      solution: `import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private List<String> cursos = new ArrayList<>(
        List.of("ASI705 - Arqui Web", "BAS101 - Algebra", "FIS201 - Física")
    );

    @GetMapping
    public List<String> listarCursos() {
        return cursos;
    }

    @GetMapping("/count")
    public String contarCursos() {
        return "Total de cursos: " + cursos.size();
    }
}`,
      hint: "Las anotaciones van justo encima de la clase o método. @RequestMapping define la ruta base; @GetMapping la extiende para responder a GET.",
      expectedOutput: `GET /api/cursos       → ["ASI705 - Arqui Web","BAS101 - Algebra","FIS201 - Física"]
GET /api/cursos/count → "Total de cursos: 3"`,
    },

    // ── 3. HTTP Verbs ────────────────────────────────────────────────────────
    {
      id: "http_verbs",
      title: "Verbos HTTP",
      concept: "http_verbs",
      conceptLabel: "CRUD",
      conceptColor: "#06b6d4",
      explanation: `<p>Los <strong>verbos HTTP</strong> definen el tipo de operación que el cliente quiere realizar sobre un recurso. En REST se mapean directamente a operaciones CRUD.</p>
<h3>Los 4 verbos principales</h3>
<ul>
<li><code>GET</code> — <strong>Read</strong>: obtener datos (no modifica nada). Ej: listar productos</li>
<li><code>POST</code> — <strong>Create</strong>: crear un nuevo recurso. Ej: registrar un estudiante</li>
<li><code>PUT</code> — <strong>Update</strong>: actualizar un recurso existente (completo)</li>
<li><code>DELETE</code> — <strong>Delete</strong>: eliminar un recurso</li>
</ul>
<h3>En Spring Boot</h3>
<p>Cada verbo tiene su anotación: <code>@GetMapping</code>, <code>@PostMapping</code>, <code>@PutMapping</code>, <code>@DeleteMapping</code>. Se combinan con la URL del recurso.</p>`,
      analogy: "📋 Es como las operaciones de una lista de tareas: Ver tareas (GET), Agregar tarea (POST), Editar tarea (PUT), Eliminar tarea (DELETE).",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <text x="210" y="22" fill="#06b6d4" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="700">Verbos HTTP → CRUD → Anotación Spring</text>
  <!-- Headers -->
  <rect x="14" y="30" width="80" height="18" rx="3" fill="#1e2030"/>
  <rect x="100" y="30" width="90" height="18" rx="3" fill="#1e2030"/>
  <rect x="196" y="30" width="90" height="18" rx="3" fill="#1e2030"/>
  <rect x="292" y="30" width="115" height="18" rx="3" fill="#1e2030"/>
  <text x="54"  y="43" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">VERBO</text>
  <text x="145" y="43" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">OPERACIÓN</text>
  <text x="241" y="43" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">URL ejemplo</text>
  <text x="349" y="43" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">Anotación Spring</text>
  <!-- GET row -->
  <rect x="14" y="52" width="393" height="30" rx="3" fill="#10b98110"/>
  <text x="54"  y="71" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">GET</text>
  <text x="145" y="71" fill="#6ee7b7" font-size="8"  font-family="monospace" text-anchor="middle">Read (Leer)</text>
  <text x="241" y="71" fill="#94a3b8" font-size="8"  font-family="monospace" text-anchor="middle">/api/productos</text>
  <text x="349" y="71" fill="#f59e0b" font-size="8"  font-family="monospace" text-anchor="middle">@GetMapping</text>
  <!-- POST row -->
  <rect x="14" y="86" width="393" height="30" rx="3" fill="#6366f110"/>
  <text x="54"  y="105" fill="#818cf8" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">POST</text>
  <text x="145" y="105" fill="#a5b4fc" font-size="8"  font-family="monospace" text-anchor="middle">Create (Crear)</text>
  <text x="241" y="105" fill="#94a3b8" font-size="8"  font-family="monospace" text-anchor="middle">/api/productos</text>
  <text x="349" y="105" fill="#f59e0b" font-size="8"  font-family="monospace" text-anchor="middle">@PostMapping</text>
  <!-- PUT row -->
  <rect x="14" y="120" width="393" height="30" rx="3" fill="#f59e0b10"/>
  <text x="54"  y="139" fill="#f59e0b" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">PUT</text>
  <text x="145" y="139" fill="#fcd34d" font-size="8"  font-family="monospace" text-anchor="middle">Update (Actualizar)</text>
  <text x="241" y="139" fill="#94a3b8" font-size="8"  font-family="monospace" text-anchor="middle">/api/productos/1</text>
  <text x="349" y="139" fill="#f59e0b" font-size="8"  font-family="monospace" text-anchor="middle">@PutMapping("/{id}")</text>
  <!-- DELETE row -->
  <rect x="14" y="154" width="393" height="30" rx="3" fill="#ef444410"/>
  <text x="54"  y="173" fill="#f87171" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">DELETE</text>
  <text x="145" y="173" fill="#fca5a5" font-size="8"  font-family="monospace" text-anchor="middle">Delete (Eliminar)</text>
  <text x="241" y="173" fill="#94a3b8" font-size="8"  font-family="monospace" text-anchor="middle">/api/productos/1</text>
  <text x="349" y="173" fill="#f59e0b" font-size="8"  font-family="monospace" text-anchor="middle">@DeleteMapping("/{id}")</text>
  <text x="210" y="196" fill="#334155" font-size="7" font-family="sans-serif" text-anchor="middle">GET es seguro e idempotente · POST crea · PUT reemplaza · DELETE elimina</text>
</svg>`,
      starterCode: `import java.util.*;

// Implementa un CRUD completo de estudiantes en memoria
public class EstudianteController {

    private List<String> estudiantes = new ArrayList<>(
        List.of("Ana García", "Luis Pérez")
    );

    // GET /api/estudiantes — retorna la lista completa
    // TODO: agrega @GetMapping
    public List<String> listar() {
        return estudiantes;
    }

    // POST /api/estudiantes — agrega un estudiante
    // TODO: agrega @PostMapping y @RequestBody String nombre
    public String agregar(String nombre) {
        return null; // agrega nombre a la lista y retorna "Agregado: " + nombre
    }

    // PUT /api/estudiantes/{id} — actualiza por índice
    // TODO: agrega @PutMapping("/{id}"), @PathVariable int id, @RequestBody String nombre
    public String actualizar(int id, String nombre) {
        return null; // actualiza la lista y retorna "Actualizado: " + nombre
    }

    // DELETE /api/estudiantes/{id} — elimina por índice
    // TODO: agrega @DeleteMapping("/{id}") y @PathVariable int id
    public String eliminar(int id) {
        return null; // elimina de la lista y retorna "Eliminado"
    }
}`,
      solution: `import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    private List<String> estudiantes = new ArrayList<>(
        List.of("Ana García", "Luis Pérez")
    );

    @GetMapping
    public List<String> listar() {
        return estudiantes;
    }

    @PostMapping
    public String agregar(@RequestBody String nombre) {
        estudiantes.add(nombre);
        return "Agregado: " + nombre;
    }

    @PutMapping("/{id}")
    public String actualizar(@PathVariable int id, @RequestBody String nombre) {
        estudiantes.set(id, nombre);
        return "Actualizado: " + nombre;
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable int id) {
        estudiantes.remove(id);
        return "Eliminado";
    }
}`,
      hint: "Cada verbo HTTP tiene su anotación. Para enviar datos en el cuerpo usa @RequestBody; para leer de la URL usa @PathVariable.",
      expectedOutput: `GET    /api/estudiantes   → ["Ana García","Luis Pérez"]
POST   /api/estudiantes   → "Agregado: Carlos"
PUT    /api/estudiantes/0 → "Actualizado: Ana López"
DELETE /api/estudiantes/1 → "Eliminado"`,
    },

    // ── 4. @PathVariable & @RequestParam ────────────────────────────────────
    {
      id: "request",
      title: "@PathVariable & @RequestParam",
      concept: "request",
      conceptLabel: "Parámetros",
      conceptColor: "#f59e0b",
      explanation: `<p>Spring Boot ofrece dos formas de leer parámetros de la URL en tus endpoints:</p>
<h3>@PathVariable — parámetro en la ruta</h3>
<p>Extrae un valor directamente del segmento de la URL. Se define con <code>{variable}</code> en la URL del mapping.</p>
<pre>GET /api/usuarios/42  →  @GetMapping("/{id}") + @PathVariable Long id</pre>
<h3>@RequestParam — query string</h3>
<p>Extrae parámetros del query string de la URL (después del <code>?</code>). Ideal para filtros y búsquedas.</p>
<pre>GET /api/productos?nombre=laptop  →  @RequestParam String nombre</pre>
<h3>@RequestBody — cuerpo JSON</h3>
<p>Lee el cuerpo del request (JSON) y lo convierte automáticamente a un objeto Java. Se usa en POST y PUT.</p>`,
      analogy: "🏠 Es como una dirección: la ruta (/calle/42) es @PathVariable, los detalles (?piso=3&lado=B) son @RequestParam, y el contenido del paquete es @RequestBody.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <text x="210" y="20" fill="#f59e0b" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="700">Anatomía de una URL en Spring Boot</text>
  <!-- URL bar -->
  <rect x="14" y="34" width="392" height="28" rx="6" fill="#1e2030" stroke="#334155" stroke-width="1"/>
  <text x="22" y="53" fill="#94a3b8" font-size="9" font-family="monospace">GET </text>
  <text x="50" y="53" fill="#e2e8f0" font-size="9" font-family="monospace">http://localhost:8080</text>
  <text x="185" y="53" fill="#f59e0b" font-size="9" font-family="monospace" font-weight="700">/api/productos/</text>
  <text x="295" y="53" fill="#10b981" font-size="9" font-family="monospace" font-weight="700">5</text>
  <text x="307" y="53" fill="#94a3b8" font-size="9" font-family="monospace">?</text>
  <text x="313" y="53" fill="#8b5cf6" font-size="9" font-family="monospace" font-weight="700">orden=precio</text>
  <!-- Bracket PathVariable -->
  <line x1="300" y1="64" x2="300" y2="80" stroke="#10b981" stroke-width="1.5"/>
  <line x1="300" y1="80" x2="210" y2="80" stroke="#10b981" stroke-width="1.5"/>
  <line x1="210" y1="80" x2="210" y2="95" stroke="#10b981" stroke-width="1.5"/>
  <rect x="130" y="95" width="160" height="22" rx="4" fill="#10b98122" stroke="#10b981" stroke-width="1"/>
  <text x="210" y="110" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">@PathVariable Long id = 5</text>
  <!-- Bracket RequestParam -->
  <line x1="360" y1="64" x2="360" y2="130" stroke="#8b5cf6" stroke-width="1.5"/>
  <line x1="360" y1="130" x2="300" y2="130" stroke="#8b5cf6" stroke-width="1.5"/>
  <line x1="300" y1="130" x2="300" y2="145" stroke="#8b5cf6" stroke-width="1.5"/>
  <rect x="200" y="145" width="200" height="22" rx="4" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="1"/>
  <text x="300" y="160" fill="#c4b5fd" font-size="8" font-family="monospace" text-anchor="middle">@RequestParam String orden = "precio"</text>
  <!-- Code -->
  <rect x="14" y="172" width="392" height="22" rx="4" fill="#0d1117"/>
  <text x="22" y="187" fill="#f59e0b" font-size="8" font-family="monospace">@GetMapping("/{id}")  getProducto(@PathVariable Long id, @RequestParam String orden)</text>
</svg>`,
      starterCode: `import java.util.*;

public class BuscadorController {

    private Map<Long, String> productos = new HashMap<>(Map.of(
        1L, "Laptop", 2L, "Mouse", 3L, "Teclado"
    ));

    // GET /api/productos/{id}
    // Retorna: "Producto #1: Laptop"
    // TODO: agrega @GetMapping("/{id}") y @PathVariable Long id
    public String obtenerProducto(Long id) {
        return null; // implementa: busca en el map y retorna el texto
    }

    // GET /api/buscar?q=texto
    // Retorna: "Buscando productos con: laptop"
    // TODO: agrega @GetMapping("/buscar") y @RequestParam String q
    public String buscar(String q) {
        return null; // retorna "Buscando productos con: " + q.toLowerCase()
    }

    // GET /api/productos/{id}/info?moneda=USD
    // Retorna: "Producto #2 en USD"
    // TODO: usa @PathVariable Long id y @RequestParam(defaultValue="PEN") String moneda
    public String info(Long id, String moneda) {
        return null;
    }
}`,
      solution: `import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class BuscadorController {

    private Map<Long, String> productos = new HashMap<>(Map.of(
        1L, "Laptop", 2L, "Mouse", 3L, "Teclado"
    ));

    @GetMapping("/productos/{id}")
    public String obtenerProducto(@PathVariable Long id) {
        String nombre = productos.getOrDefault(id, "No encontrado");
        return "Producto #" + id + ": " + nombre;
    }

    @GetMapping("/buscar")
    public String buscar(@RequestParam String q) {
        return "Buscando productos con: " + q.toLowerCase();
    }

    @GetMapping("/productos/{id}/info")
    public String info(@PathVariable Long id,
                       @RequestParam(defaultValue = "PEN") String moneda) {
        return "Producto #" + id + " en " + moneda;
    }
}`,
      hint: "@PathVariable lee de la URL: /productos/{id}. @RequestParam lee del query string: /buscar?q=texto. Puedes tener defaultValue para hacer el param opcional.",
      expectedOutput: `GET /api/productos/1        → "Producto #1: Laptop"
GET /api/buscar?q=LAPTOP    → "Buscando productos con: laptop"
GET /api/productos/2/info?moneda=USD → "Producto #2 en USD"
GET /api/productos/3/info   → "Producto #3 en PEN"`,
    },

    // ── 5. ResponseEntity & Status Codes ────────────────────────────────────
    {
      id: "response",
      title: "ResponseEntity & Status Codes",
      concept: "response",
      conceptLabel: "HTTP Responses",
      conceptColor: "#ec4899",
      explanation: `<p><code>ResponseEntity</code> es la forma en Spring Boot de controlar tanto el <strong>cuerpo</strong> como el <strong>código de estado HTTP</strong> de la respuesta.</p>
<h3>Códigos de estado más importantes</h3>
<ul>
<li><strong>200 OK</strong> — solicitud exitosa (GET, PUT, DELETE)</li>
<li><strong>201 Created</strong> — recurso creado exitosamente (POST)</li>
<li><strong>400 Bad Request</strong> — datos inválidos en el request</li>
<li><strong>404 Not Found</strong> — recurso no existe</li>
<li><strong>500 Internal Server Error</strong> — error en el servidor</li>
</ul>
<h3>Usando ResponseEntity</h3>
<pre>ResponseEntity.ok(datos)           // 200 + body
ResponseEntity.status(201).body(obj) // 201 + body
ResponseEntity.notFound().build()    // 404 sin body
ResponseEntity.badRequest().build()  // 400 sin body</pre>`,
      analogy: "📦 ResponseEntity es el paquete de envío: el código de estado es el estado del envío (entregado, no encontrado, error) y el body es el contenido del paquete.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <text x="210" y="20" fill="#ec4899" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="700">Códigos de Estado HTTP más comunes</text>
  <!-- 2xx -->
  <rect x="14" y="30" width="60" height="16" rx="3" fill="#10b98130"/>
  <text x="44" y="42" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">2xx Éxito</text>
  <rect x="14" y="50" width="392" height="22" rx="3" fill="#10b98110"/>
  <text x="22"  y="65" fill="#10b981" font-size="9" font-family="monospace" font-weight="700">200 OK</text>
  <text x="75"  y="65" fill="#94a3b8" font-size="8" font-family="monospace">Solicitud exitosa · GET/PUT/DELETE</text>
  <text x="330" y="65" fill="#6ee7b7" font-size="8" font-family="monospace">ResponseEntity.ok(body)</text>
  <rect x="14" y="76" width="392" height="22" rx="3" fill="#10b98108"/>
  <text x="22"  y="91" fill="#10b981" font-size="9" font-family="monospace" font-weight="700">201 Created</text>
  <text x="100" y="91" fill="#94a3b8" font-size="8" font-family="monospace">Recurso creado · POST</text>
  <text x="316" y="91" fill="#6ee7b7" font-size="8" font-family="monospace">.status(201).body(obj)</text>
  <!-- 4xx -->
  <rect x="14" y="104" width="70" height="16" rx="3" fill="#f59e0b30"/>
  <text x="49" y="116" fill="#fcd34d" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">4xx Cliente</text>
  <rect x="14" y="124" width="392" height="22" rx="3" fill="#f59e0b10"/>
  <text x="22"  y="139" fill="#f59e0b" font-size="9" font-family="monospace" font-weight="700">400 Bad Request</text>
  <text x="130" y="139" fill="#94a3b8" font-size="8" font-family="monospace">Datos inválidos en el request</text>
  <text x="308" y="139" fill="#fcd34d" font-size="8" font-family="monospace">.badRequest().build()</text>
  <rect x="14" y="150" width="392" height="22" rx="3" fill="#ef444410"/>
  <text x="22"  y="165" fill="#f87171" font-size="9" font-family="monospace" font-weight="700">404 Not Found</text>
  <text x="120" y="165" fill="#94a3b8" font-size="8" font-family="monospace">El recurso no existe en el servidor</text>
  <text x="308" y="165" fill="#fca5a5" font-size="8" font-family="monospace">.notFound().build()</text>
  <!-- 5xx -->
  <rect x="14" y="176" width="392" height="20" rx="3" fill="#ef444418"/>
  <text x="22"  y="190" fill="#f87171" font-size="9" font-family="monospace" font-weight="700">500 Internal Error</text>
  <text x="135" y="190" fill="#94a3b8" font-size="8" font-family="monospace">Error inesperado en el servidor</text>
  <text x="310" y="190" fill="#fca5a5" font-size="8" font-family="monospace">.status(500).build()</text>
</svg>`,
      starterCode: `import java.util.*;

public class ItemController {

    private Map<Integer, String> items = new HashMap<>(
        Map.of(1, "Laptop", 2, "Mouse", 3, "Teclado")
    );
    private int nextId = 4;

    // GET /api/items/{id}
    // Si existe → 200 OK con el nombre
    // Si no existe → 404 Not Found
    // TODO: retorna ResponseEntity<String>
    public Object obtener(int id) {
        // implementa la lógica con ResponseEntity
        return null;
    }

    // POST /api/items
    // Si nombre es vacío → 400 Bad Request con "Nombre requerido"
    // Si válido → 201 Created con "Creado: " + nombre
    // TODO: retorna ResponseEntity<String>
    public Object crear(String nombre) {
        // implementa validación y creación
        return null;
    }

    // DELETE /api/items/{id}
    // Si existe → 200 OK con "Eliminado"
    // Si no existe → 404 Not Found
    public Object eliminar(int id) {
        return null;
    }
}`,
      solution: `import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private Map<Integer, String> items = new HashMap<>(
        Map.of(1, "Laptop", 2, "Mouse", 3, "Teclado")
    );
    private int nextId = 4;

    @GetMapping("/{id}")
    public ResponseEntity<String> obtener(@PathVariable int id) {
        if (!items.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(items.get(id));
    }

    @PostMapping
    public ResponseEntity<String> crear(@RequestBody String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return ResponseEntity.badRequest().body("Nombre requerido");
        }
        items.put(nextId++, nombre);
        return ResponseEntity.status(201).body("Creado: " + nombre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        if (!items.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        items.remove(id);
        return ResponseEntity.ok("Eliminado");
    }
}`,
      hint: "ResponseEntity.ok() para 200, .status(201).body() para 201 Created, .notFound().build() para 404, .badRequest().body() para 400.",
      expectedOutput: `GET  /api/items/1   → 200 OK  "Laptop"
GET  /api/items/99  → 404 Not Found
POST /api/items ""  → 400 Bad Request  "Nombre requerido"
POST /api/items "Webcam" → 201 Created "Creado: Webcam"
DELETE /api/items/2 → 200 OK  "Eliminado"`,
    },

    // ── 6. @Service & Capas ──────────────────────────────────────────────────
    {
      id: "service",
      title: "@Service y Capas",
      concept: "service",
      conceptLabel: "Arquitectura",
      conceptColor: "#6366f1",
      explanation: `<p>En Spring Boot, se separa la aplicación en <strong>capas</strong> para mantener el código organizado, testeable y mantenible.</p>
<h3>Las capas principales</h3>
<ul>
<li><strong>Controller</strong> — recibe el HTTP request, llama al servicio, retorna la respuesta</li>
<li><strong>Service</strong> — contiene la lógica de negocio. Se anota con <code>@Service</code></li>
<li><strong>Repository</strong> — accede a la base de datos (semana 3)</li>
</ul>
<h3>@Autowired e Inyección de Dependencias</h3>
<p>Spring crea instancias de los beans (<code>@Service</code>, <code>@Repository</code>) y las "inyecta" automáticamente donde se necesitan. Lo más recomendado es usar <strong>inyección por constructor</strong>.</p>
<pre>@RestController
public class ProductoController {
    private final ProductoService service;
    // Inyección por constructor (recomendado)
    public ProductoController(ProductoService service) {
        this.service = service;
    }
}</pre>`,
      analogy: "🏢 Como un edificio: el Controller es la recepción (atiende clientes), el Service es la oficina (procesa el trabajo), el Repository es el archivo (guarda los datos).",
      diagram: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="230" fill="#13141f" rx="10"/>
  <text x="200" y="20" fill="#6366f1" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="700">Arquitectura en Capas — Spring Boot</text>
  <defs>
    <marker id="ai1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/></marker>
    <marker id="ai2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#10b981"/></marker>
    <marker id="ai3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
  </defs>
  <!-- Client -->
  <rect x="10" y="75" width="62" height="44" rx="6" fill="#1e2030" stroke="#334155" stroke-width="1"/>
  <text x="41" y="95" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">Cliente</text>
  <text x="41" y="109" fill="#64748b" font-size="7" font-family="monospace" text-anchor="middle">HTTP</text>
  <!-- Arrow client→controller -->
  <line x1="74" y1="97" x2="98" y2="97" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ai1)"/>
  <!-- Controller -->
  <rect x="100" y="55" width="76" height="84" rx="6" fill="#6366f122" stroke="#6366f1" stroke-width="1.5"/>
  <text x="138" y="78" fill="#818cf8" font-size="9" font-family="monospace" text-anchor="middle">@Rest</text>
  <text x="138" y="91" fill="#818cf8" font-size="9" font-family="monospace" text-anchor="middle">Controller</text>
  <line x1="110" y1="98" x2="166" y2="98" stroke="#334155" stroke-width="1"/>
  <text x="138" y="112" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">recibe</text>
  <text x="138" y="124" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">request</text>
  <!-- Arrow controller→service -->
  <line x1="178" y1="97" x2="202" y2="97" stroke="#10b981" stroke-width="1.5" marker-end="url(#ai2)"/>
  <!-- Service -->
  <rect x="204" y="55" width="76" height="84" rx="6" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="242" y="85" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">@Service</text>
  <line x1="214" y1="92" x2="270" y2="92" stroke="#334155" stroke-width="1"/>
  <text x="242" y="108" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">lógica de</text>
  <text x="242" y="120" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">negocio</text>
  <!-- Arrow service→repo -->
  <line x1="282" y1="97" x2="306" y2="97" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ai3)"/>
  <!-- Repository -->
  <rect x="308" y="55" width="80" height="84" rx="6" fill="#f59e0b22" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="348" y="82" fill="#fcd34d" font-size="9" font-family="monospace" text-anchor="middle">@Repository</text>
  <line x1="318" y1="89" x2="378" y2="89" stroke="#334155" stroke-width="1"/>
  <text x="348" y="105" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">accede a</text>
  <text x="348" y="117" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">la DB</text>
  <!-- Arrow repo→DB -->
  <line x1="348" y1="141" x2="348" y2="158" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#ai3)"/>
  <!-- DB cylinder -->
  <ellipse cx="348" cy="170" rx="34" ry="11" fill="#1a1f2e" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="314" y="170" width="68" height="28" fill="#1a1f2e"/>
  <line x1="314" y1="170" x2="314" y2="198" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="382" y1="170" x2="382" y2="198" stroke="#f59e0b" stroke-width="1.5"/>
  <ellipse cx="348" cy="198" rx="34" ry="11" fill="#1a1f2e" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="348" y="187" fill="#fcd34d" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">DB</text>
</svg>`,
      starterCode: `import java.util.*;

// ❌ MAL: todo mezclado en el controller
// Mueve la lógica al Service

public class ProductoController {

    // TODO: extrae esto a una clase ProductoService anotada con @Service
    private List<String> productos = new ArrayList<>(
        List.of("Laptop", "Mouse")
    );

    // TODO: inyecta ProductoService por constructor en lugar de tener la lista aquí
    public List<String> listar() {
        return productos; // debería ser: return productoService.listar();
    }

    public String agregar(String nombre) {
        if (nombre == null || nombre.isBlank()) return "Error: nombre vacío";
        productos.add(nombre);
        return "Agregado: " + nombre;
        // TODO: mover esta lógica al service
    }
}`,
      solution: `import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.*;

// ✅ BIEN: separación de capas

@Service
public class ProductoService {
    private List<String> productos = new ArrayList<>(
        List.of("Laptop", "Mouse")
    );

    public List<String> listar() { return productos; }

    public String agregar(String nombre) {
        if (nombre == null || nombre.isBlank())
            throw new IllegalArgumentException("Nombre vacío");
        productos.add(nombre);
        return "Agregado: " + nombre;
    }
}

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    // Inyección por constructor (recomendado sobre @Autowired)
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<String> listar() {
        return productoService.listar();
    }

    @PostMapping
    public String agregar(@RequestBody String nombre) {
        return productoService.agregar(nombre);
    }
}`,
      hint: "El Controller solo delega al Service. El Service contiene la lógica. Usa inyección por constructor (más testeable que @Autowired en campo).",
      expectedOutput: `GET  /api/productos        → ["Laptop","Mouse"]
POST /api/productos "Webcam" → "Agregado: Webcam"
// Capas separadas: Controller no tiene lógica de negocio`,

      // ── Multi-layer guided editor ──────────────────────────────────────
      layers: [
        {
          step: 1,
          label: "1️⃣ @Entity",
          filename: "Producto.java",
          role: "El modelo de datos → se convierte en tabla SQL",
          color: "#ec4899",
          starterCode: `// 1️⃣ EMPIEZA AQUÍ — @Entity
// Esta clase representa un producto en la base de datos.
// JPA lee estas anotaciones y crea la tabla automáticamente.

import javax.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;           // PK AUTO_INCREMENT — ya está dado

    // TODO 1: agrega el campo "nombre"
    //         Debe ser NOT NULL → usa @Column(nullable = false)

    // TODO 2: agrega el campo "precio" como double

    // TODO 3: agrega el campo "disponible" como boolean

    // TODO 4: genera getters y setters para cada campo
    //   public String getNombre() { ... }
    //   public void setNombre(String nombre) { ... }
    //   ... etc
}`,
          solution: `import javax.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private double precio;
    private boolean disponible;

    public Long getId() { return id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }

    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean d) { this.disponible = d; }
}`,
          hint: "@Column(nullable = false) equivale a NOT NULL en SQL. Los getters/setters permiten que JPA lea y escriba los campos. En proyectos reales se usa Lombok (@Getter @Setter) para no escribirlos a mano.",
        },
        {
          step: 2,
          label: "2️⃣ @Repository",
          filename: "ProductoRepository.java",
          role: "Acceso a datos → Spring genera el SQL automáticamente",
          color: "#f59e0b",
          starterCode: `// 2️⃣ @Repository — Acceso a datos
// Al extender JpaRepository obtienes CRUD gratis:
//   findAll(), findById(), save(), deleteById()
// Spring genera SQL a partir del nombre del método.

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository
        extends JpaRepository<Producto, Long> {

    // Spring genera: SELECT * FROM producto WHERE nombre LIKE %texto%
    // TODO: completa el nombre — ¿qué keyword va después de "Nombre"?
    List<Producto> findByNombre_______(String texto);

    // Spring genera: SELECT * FROM producto WHERE precio < ?
    // TODO: completa el nombre — ¿qué keyword indica "menor que"?
    List<Producto> findByPrecio_______(double maxPrecio);
}`,
          solution: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository
        extends JpaRepository<Producto, Long> {

    // Containing → WHERE nombre LIKE %texto%
    List<Producto> findByNombreContaining(String texto);

    // LessThan → WHERE precio < maxPrecio
    List<Producto> findByPrecioLessThan(double maxPrecio);
}`,
          hint: "Spring Data JPA construye el SQL del nombre del método: findByX → WHERE x=?, findByXContaining → LIKE %x%, findByXLessThan → WHERE x < ?, findByXGreaterThan → WHERE x > ?",
        },
        {
          step: 3,
          label: "3️⃣ @Service",
          filename: "ProductoService.java",
          role: "Lógica de negocio → reglas del negocio aquí, nunca en el Controller",
          color: "#10b981",
          starterCode: `// 3️⃣ @Service — Lógica de negocio
// Spring detecta @Service y lo registra como bean inyectable.
// Aquí van los ifs, validaciones y reglas del negocio.

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService {

    // TODO 1: declara el repositorio como campo final
    // private final ProductoRepository ___;

    // TODO 2: inyección por constructor (mejor que @Autowired en campo)
    public ProductoService(/* parámetro aquí */) {
        // this.___ = ___;
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Producto crear(Producto p) {
        // TODO 3: valida que nombre no sea null ni blank
        //   Lanza: throw new IllegalArgumentException("Nombre requerido");

        // TODO 4: guarda y retorna
        //   return repo.save(p);
        return null;
    }
}`,
          solution: `import org.springframework.stereotype.Service;
import java.util.List;

@Service
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
        return repo.save(p);
    }
}`,
          hint: "La inyección por constructor (no @Autowired en campo) hace el código más testeable y permite declarar los campos como final — Spring detecta automáticamente el constructor y lo usa para inyectar.",
        },
        {
          step: 4,
          label: "4️⃣ @RestController",
          filename: "ProductoController.java",
          role: "Capa Web → solo recibe requests y delega, sin lógica de negocio",
          color: "#6366f1",
          starterCode: `// 4️⃣ @RestController — Capa Web (la última en construirse)
// REGLA: el Controller solo delega al Service.
// Si ves un if/for aquí → muévelo al Service.

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    // TODO 1: declara el service como campo final
    // private final ProductoService ___;

    // TODO 2: inyecta ProductoService por constructor
    public ProductoController(/* parámetro */) {
        // this.___ = ___;
    }

    // GET /api/productos
    @GetMapping
    public List<Producto> listar() {
        // TODO 3: delega al service (1 línea)
        return null;
    }

    // POST /api/productos
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto p) {
        // TODO 4: crea con el service y retorna 201 Created
        // Pista: ResponseEntity.status(201).body(...)
        return null;
    }
}`,
          solution: `import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Producto> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto p) {
        return ResponseEntity.status(201).body(service.crear(p));
    }
}`,
          hint: "El Controller es solo un puente. Cada método debe tener 1-2 líneas máximo: llamar al service y retornar. Si tiene más lógica, esa lógica pertenece al Service.",
        },
      ],

      combinedSimulation: `import java.util.*;

// ══ SIMULACIÓN: las 4 capas de Spring Boot trabajando juntas ══

// 1️⃣ @Entity — Modelo de datos
class Producto {
    private Long id;
    private String nombre;
    private double precio;
    private boolean disponible;

    public Producto(Long id, String nombre, double precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = true;
    }

    public Long getId()            { return id; }
    public String getNombre()      { return nombre; }
    public void setNombre(String n){ this.nombre = n; }
    public double getPrecio()      { return precio; }
    public void setPrecio(double p){ this.precio = p; }
    public boolean isDisponible()  { return disponible; }

    @Override
    public String toString() {
        return nombre + " - S/" + String.format("%.2f", precio);
    }
}

// 2️⃣ @Repository — Acceso a datos (JpaRepository simulado)
class ProductoRepository {
    private List<Producto> db = new ArrayList<>(Arrays.asList(
        new Producto(1L, "Laptop", 2499.99),
        new Producto(2L, "Mouse",  49.90)
    ));

    public List<Producto> findAll()      { return new ArrayList<>(db); }
    public Producto save(Producto p)     { db.add(p); return p; }
}

// 3️⃣ @Service — Lógica de negocio
class ProductoService {
    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) { this.repo = repo; }

    public List<Producto> listar() { return repo.findAll(); }

    public Producto crear(Producto p) {
        if (p.getNombre() == null || p.getNombre().isBlank())
            throw new IllegalArgumentException("Nombre requerido");
        return repo.save(p);
    }
}

// 4️⃣ @RestController — Capa Web
class ProductoController {
    private final ProductoService service;

    public ProductoController(ProductoService service) { this.service = service; }

    public List<Producto> listar()         { return service.listar(); }
    public Producto crear(Producto p)      { return service.crear(p); }
}

public class Main {
    public static void main(String[] args) {
        // Spring hace este "wiring" automáticamente con @Autowired
        ProductoRepository repo       = new ProductoRepository();
        ProductoService    service    = new ProductoService(repo);
        ProductoController controller = new ProductoController(service);

        // GET /api/productos
        System.out.println("GET /api/productos →");
        for (Producto p : controller.listar())
            System.out.println("  " + p);

        // POST /api/productos
        controller.crear(new Producto(3L, "Webcam", 199.90));
        System.out.println("\\nPOST /api/productos → 201 Created: Webcam");

        // GET /api/productos de nuevo
        System.out.println("\\nGET /api/productos → (después del POST)");
        for (Producto p : controller.listar())
            System.out.println("  " + p);
    }
}`,

      combinedExpectedOutput: `GET /api/productos →
  Laptop - S/2499.99
  Mouse - S/49.90

POST /api/productos → 201 Created: Webcam

GET /api/productos → (después del POST)
  Laptop - S/2499.99
  Mouse - S/49.90
  Webcam - S/199.90`,
    },
  ],

  // ── EXAM ──────────────────────────────────────────────────────────────────
  exam: [
    {
      id: 1,
      category: "REST & HTTP",
      text: "¿Qué significa que una API REST sea 'stateless' (sin estado)?",
      options: [
        "El servidor guarda el estado de cada cliente en memoria",
        "Cada petición HTTP es independiente y contiene toda la información necesaria",
        "El cliente no puede enviar datos al servidor",
        "Solo se permiten peticiones GET sin cuerpo",
      ],
      correctAnswer: 1,
      explanation: "'Stateless' significa que el servidor no guarda información de sesión entre peticiones. Cada request debe contener todo lo que el servidor necesita para procesarlo (ej: token de autenticación).",
    },
    {
      id: 2,
      category: "REST & HTTP",
      text: "¿Cuál es el formato estándar para intercambiar datos en una API REST moderna?",
      options: ["XML", "CSV", "JSON", "HTML"],
      correctAnswer: 2,
      explanation: "JSON (JavaScript Object Notation) es el formato estándar de facto en APIs REST modernas. Es ligero, legible y soportado nativamente por todos los lenguajes modernos.",
    },
    {
      id: 3,
      category: "REST & HTTP",
      text: "En una API REST, ¿qué representa la URL `/api/estudiantes/42`?",
      options: [
        "Una acción a ejecutar sobre el sistema",
        "Un recurso específico: el estudiante con id 42",
        "Un método HTTP que devuelve 42 resultados",
        "Un filtro que busca estudiantes con edad 42",
      ],
      correctAnswer: 1,
      explanation: "En REST las URLs representan recursos. `/api/estudiantes/42` identifica de forma única al estudiante con id 42. El verbo HTTP (GET, PUT, DELETE) determina la operación sobre ese recurso.",
    },
    {
      id: 4,
      category: "REST & HTTP",
      text: "¿Cuál es la diferencia entre una API REST y una página web HTML?",
      options: [
        "Las APIs REST solo funcionan con Java, las páginas web con cualquier lenguaje",
        "Las APIs REST retornan datos (JSON/XML) para ser consumidos por aplicaciones; las web retornan HTML para navegadores",
        "No hay diferencia, ambas usan el mismo protocolo y formato",
        "Las APIs REST requieren autenticación, las páginas web no",
      ],
      correctAnswer: 1,
      explanation: "Las APIs REST retornan datos estructurados (JSON) para que otras aplicaciones (frontend, móvil) los consuman. Las páginas web retornan HTML pensado para ser renderizado por el navegador.",
    },
    {
      id: 5,
      category: "Verbos HTTP",
      text: "¿Qué verbo HTTP se debe usar para crear un nuevo recurso en el servidor?",
      options: ["GET", "PUT", "POST", "PATCH"],
      correctAnswer: 2,
      explanation: "POST se usa para crear nuevos recursos. La URL es el colección del recurso (ej: POST /api/productos) y el cuerpo contiene los datos del nuevo recurso. El servidor retorna 201 Created.",
    },
    {
      id: 6,
      category: "Verbos HTTP",
      text: "¿Cuál es la diferencia principal entre PUT y PATCH?",
      options: [
        "PUT elimina el recurso, PATCH lo crea",
        "PUT reemplaza el recurso completo; PATCH actualiza solo los campos enviados",
        "PUT es para texto, PATCH es para archivos binarios",
        "No hay diferencia, son sinónimos en REST",
      ],
      correctAnswer: 1,
      explanation: "PUT reemplaza el recurso completo (debes enviar todos los campos). PATCH actualiza parcialmente (solo los campos que cambias). En proyectos Spring Boot es común ver ambos según el caso de uso.",
    },
    {
      id: 7,
      category: "Verbos HTTP",
      text: "Un endpoint GET /api/productos debe retornar la lista de productos. ¿Qué sucede si llamas a GET varias veces seguidas?",
      options: [
        "El servidor crea una copia del recurso en cada llamada",
        "La segunda llamada falla porque el recurso ya fue consumido",
        "Siempre retorna la misma lista sin efecto secundario — GET es idempotente y seguro",
        "Depende del servidor: puede crear recursos nuevos cada vez",
      ],
      correctAnswer: 2,
      explanation: "GET es 'safe' (no modifica datos) e idempotente (misma respuesta múltiples veces). Nunca debes usar GET para operaciones que modifiquen el estado del servidor.",
    },
    {
      id: 8,
      category: "Verbos HTTP",
      text: "¿Cuál es la anotación Spring Boot para un endpoint que responde a DELETE /api/productos/5?",
      options: [
        "@RequestMapping(method=Method.DELETE, value=\"/5\")",
        "@DeleteMapping(\"/{id}\")",
        "@RemoveMapping(\"/{id}\")",
        "@GetMapping(method=\"DELETE\", path=\"/{id}\")",
      ],
      correctAnswer: 1,
      explanation: "@DeleteMapping(\"/{id}\") es la forma concisa y moderna. El {id} es el path variable que captura el valor 5 de la URL con @PathVariable.",
    },
    {
      id: 9,
      category: "@RestController",
      text: "¿Qué hace exactamente la anotación @RestController en Spring Boot?",
      options: [
        "Solo marca la clase para que Spring la encuentre automáticamente",
        "Combina @Controller + @ResponseBody: indica que los métodos retornan datos (no vistas)",
        "Configura automáticamente la seguridad del endpoint",
        "Registra el controlador en la base de datos de rutas",
      ],
      correctAnswer: 1,
      explanation: "@RestController = @Controller + @ResponseBody. Indica que la clase maneja peticiones HTTP y que los métodos retornan datos serializados (JSON) directamente, no nombres de vistas.",
    },
    {
      id: 10,
      category: "@RestController",
      text: "¿Cuál es el efecto de @RequestMapping(\"/api/v1\") a nivel de clase en un @RestController?",
      options: [
        "Solo afecta al primer método del controlador",
        "Define la URL base que se antepone a todas las rutas de los métodos del controlador",
        "Restringe el controlador solo a peticiones desde /api/v1 IP",
        "Versiona automáticamente la API en la base de datos",
      ],
      correctAnswer: 1,
      explanation: "@RequestMapping a nivel de clase define el prefijo de URL para todos los endpoints del controlador. Si el controller tiene /api/v1 y un método @GetMapping('/productos'), la ruta completa es GET /api/v1/productos.",
    },
    {
      id: 11,
      category: "@RestController",
      text: "¿Cómo convierte Spring Boot automáticamente un objeto Java a JSON?",
      options: [
        "El programador debe llamar a JSON.stringify() manualmente",
        "Spring usa la librería Jackson que viene incluida y serializa el objeto automáticamente",
        "Solo funciona con objetos que extiendan JSONSerializable",
        "Spring Boot no convierte Java a JSON, requiere una librería externa adicional",
      ],
      correctAnswer: 1,
      explanation: "Spring Boot incluye Jackson en el classpath por defecto. Cuando un @RestController retorna un objeto Java, Jackson lo serializa automáticamente a JSON. No necesitas configurar nada adicional.",
    },
    {
      id: 12,
      category: "@RestController",
      text: "¿Cuál es la diferencia entre @GetMapping y @RequestMapping(method = RequestMethod.GET)?",
      options: [
        "@GetMapping es más rápido en ejecución",
        "Son equivalentes; @GetMapping es la forma abreviada y más legible",
        "@RequestMapping soporta más parámetros que @GetMapping",
        "@GetMapping solo funciona en Spring Boot 3+",
      ],
      correctAnswer: 1,
      explanation: "@GetMapping es un shortcut de @RequestMapping(method = RequestMethod.GET). Ambos hacen exactamente lo mismo. Las anotaciones @PostMapping, @PutMapping, @DeleteMapping siguen el mismo patrón.",
    },
    {
      id: 13,
      category: "Parámetros",
      text: "¿Cuál es la diferencia entre @PathVariable y @RequestParam?",
      options: [
        "@PathVariable es para POST, @RequestParam es para GET",
        "@PathVariable extrae valores de la ruta URL (/id); @RequestParam extrae del query string (?key=value)",
        "@PathVariable es obligatorio, @RequestParam siempre es opcional",
        "Son sinónimos, Spring decide cuál usar automáticamente",
      ],
      correctAnswer: 1,
      explanation: "@PathVariable lee de la URL: GET /productos/5 → @PathVariable Long id = 5. @RequestParam lee del query string: GET /buscar?q=laptop → @RequestParam String q = 'laptop'.",
    },
    {
      id: 14,
      category: "Parámetros",
      text: "¿Cómo se hace un @RequestParam opcional con valor por defecto en Spring Boot?",
      options: [
        "@RequestParam(optional = true) String orden",
        "@RequestParam(defaultValue = \"asc\") String orden",
        "@RequestParam(required = false, defaultValue = \"asc\") String orden",
        "Tanto B como C son correctas",
      ],
      correctAnswer: 3,
      explanation: "Ambas formas funcionan: puedes usar solo defaultValue (que implica required=false) o especificar ambos explícitamente. Si hay defaultValue, el parámetro automáticamente es opcional.",
    },
    {
      id: 15,
      category: "Parámetros",
      text: "Para recibir un objeto JSON en el cuerpo de un POST, ¿qué anotación usas?",
      options: ["@PathVariable", "@RequestParam", "@RequestBody", "@RequestHeader"],
      correctAnswer: 2,
      explanation: "@RequestBody indica a Spring que debe deserializar el cuerpo JSON del request y mapearlo al objeto Java especificado. Spring usa Jackson para la conversión automática.",
    },
    {
      id: 16,
      category: "Parámetros",
      text: "Dado el endpoint `@GetMapping(\"/productos/{id}/reviews/{reviewId}\")`, ¿cuántos @PathVariable necesitas?",
      options: ["Uno, con el último valor de la URL", "Dos, uno para id y otro para reviewId", "Uno, Spring los agrupa automáticamente", "Cero, Spring los lee del query string"],
      correctAnswer: 1,
      explanation: "Cada {variable} en la URL requiere su propio @PathVariable. Para este caso: @PathVariable Long id y @PathVariable Long reviewId como parámetros del método.",
    },
    {
      id: 17,
      category: "Status Codes",
      text: "¿Qué código de estado HTTP se debe retornar cuando se crea exitosamente un recurso con POST?",
      options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
      correctAnswer: 1,
      explanation: "201 Created es el código semánticamente correcto para indicar que un nuevo recurso fue creado exitosamente. En Spring: ResponseEntity.status(201).body(nuevoRecurso) o ResponseEntity.created(uri).body(obj).",
    },
    {
      id: 18,
      category: "Status Codes",
      text: "Un usuario intenta acceder a GET /api/productos/999 pero ese producto no existe. ¿Qué código retornas?",
      options: ["200 OK con null", "400 Bad Request", "404 Not Found", "500 Internal Server Error"],
      correctAnswer: 2,
      explanation: "404 Not Found indica que el recurso solicitado no existe en el servidor. En Spring: ResponseEntity.notFound().build(). Retornar 200 con null es un anti-patrón que dificulta el manejo de errores en el cliente.",
    },
    {
      id: 19,
      category: "Status Codes",
      text: "¿Cuándo es apropiado retornar 400 Bad Request?",
      options: [
        "Cuando el recurso no se encuentra en la base de datos",
        "Cuando hay un error de NullPointerException en el servidor",
        "Cuando el cliente envía datos inválidos o mal formados",
        "Cuando el servidor no tiene permisos para leer un archivo",
      ],
      correctAnswer: 2,
      explanation: "400 Bad Request indica un error del cliente: datos faltantes, formato incorrecto, validaciones fallidas. El error 500 es para fallos del servidor. El 404 es para recursos no encontrados.",
    },
    {
      id: 20,
      category: "Status Codes",
      text: "¿Qué hace `ResponseEntity.ok(body)` en Spring Boot?",
      options: [
        "Retorna 201 Created con el body especificado",
        "Retorna 200 OK con el body especificado",
        "Valida que el body no sea null antes de retornar",
        "Retorna 204 No Content ignorando el body",
      ],
      correctAnswer: 1,
      explanation: "ResponseEntity.ok(body) es un método estático que crea un ResponseEntity con código 200 OK y el body dado. Es equivalente a ResponseEntity.status(200).body(body).",
    },
    {
      id: 21,
      category: "@Service y Capas",
      text: "¿Por qué se separa la lógica de negocio en un @Service en lugar de ponerla en el @RestController?",
      options: [
        "Porque Spring exige esta separación para compilar",
        "Para mejorar el rendimiento de la aplicación",
        "Para que la lógica sea reutilizable, testeable y el controller solo orqueste",
        "Porque los controllers no pueden tener atributos de instancia",
      ],
      correctAnswer: 2,
      explanation: "La separación de capas (SoC - Separation of Concerns) mantiene el código limpio: el Controller solo maneja HTTP, el Service contiene la lógica de negocio (testeable unitariamente) y puede ser usado por múltiples controllers.",
    },
    {
      id: 22,
      category: "@Service y Capas",
      text: "¿Cuál es la forma recomendada de inyectar un @Service en un @RestController en Spring Boot?",
      options: [
        "@Autowired directamente en el campo privado",
        "Inyección por constructor (constructor injection)",
        "Usando new ProductoService() en el controller",
        "Declarando el service como static en el controller",
      ],
      correctAnswer: 1,
      explanation: "La inyección por constructor es la forma recomendada: hace la dependencia explícita, facilita el testing (puedes pasar mocks) y Spring la gestiona automáticamente cuando hay un solo constructor.",
    },
    {
      id: 23,
      category: "@Service y Capas",
      text: "¿Qué anotación de Spring indica que una clase es un componente de lógica de negocio?",
      options: ["@Component", "@Service", "@Bean", "@Logic"],
      correctAnswer: 1,
      explanation: "@Service es una especialización semántica de @Component. Ambas hacen que Spring gestione el bean, pero @Service comunica la intención: esta clase contiene lógica de negocio.",
    },
    {
      id: 24,
      category: "@Service y Capas",
      text: "¿Cuál de las siguientes describe mejor la responsabilidad de un @RestController?",
      options: [
        "Conectarse a la base de datos y ejecutar queries SQL",
        "Contener toda la lógica de negocio de la aplicación",
        "Recibir peticiones HTTP, delegar al Service y retornar la respuesta HTTP correcta",
        "Gestionar la seguridad y autenticación de todos los endpoints",
      ],
      correctAnswer: 2,
      explanation: "El Controller es solo un adaptador HTTP: recibe la petición, extrae los datos necesarios, llama al Service con esos datos y forma la respuesta HTTP adecuada. No debe contener lógica de negocio.",
    },
    {
      id: 25,
      category: "REST & HTTP",
      text: "¿Cuál de las siguientes URLs sigue mejor las convenciones REST para un endpoint que obtiene los pedidos del usuario con id 3?",
      options: [
        "/api/obtenerPedidosDeUsuario?userId=3",
        "/api/usuarios/3/pedidos",
        "/api/getPedidos/userId/3",
        "/api/pedidos?action=getByUser&id=3",
      ],
      correctAnswer: 1,
      explanation: "Las URLs REST deben representar recursos (sustantivos), no acciones. '/api/usuarios/3/pedidos' expresa claramente: 'los pedidos del usuario 3'. Evita verbos en URLs (obtener, get, fetch) y query strings para identificar recursos.",
    },
  ] as ExamQuestion[],
  recursos: [
    {
      title: "Proyecto Spring Boot — Taller S2",
      description: "Proyecto Maven completo con Spring Web y DevTools. Contiene Producto.java, ProductoController.java y la aplicación principal. Ábrelo directamente en IntelliJ IDEA.",
      filename: "s2-taller-api.zip",
      password: "semana02",
      fileLabel: "s2-taller-api.zip · ~8 KB",
      baseUrl: "http://localhost:8080",
      postmanTests: [
        {
          method: "GET",
          endpoint: "/productos",
          description: "Obtener lista completa de productos",
          response: '200 · [ {...}, {...} ]',
        },
        {
          method: "POST",
          endpoint: "/productos",
          body: '{"nombre":"...", "precio":0.0}',
          description: "Crear un nuevo producto",
          response: '200 · Producto creado',
        },
        {
          method: "PUT",
          endpoint: "/productos/{id}",
          body: '{"nombre":"...", "precio":0.0}',
          description: "Actualizar nombre y precio",
          response: '200 · Producto actualizado',
        },
        {
          method: "DELETE",
          endpoint: "/productos/{id}",
          description: "Eliminar un producto por ID",
          response: '200 · "Producto eliminado"',
        },
      ],
    },
  ],
};
