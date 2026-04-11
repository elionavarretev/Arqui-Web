export interface LayerTab {
  step: number;
  label: string;    // "1️⃣ @Entity"
  filename: string; // "Producto.java"
  role: string;     // "El modelo de datos → tabla en la BD"
  color: string;
  starterCode: string;
  solution: string;
  hint: string;
}

export interface Exercise {
  id: string;
  title: string;
  concept: string;
  conceptLabel: string;
  conceptColor: string;
  explanation: string;
  analogy: string;
  diagram: string; // SVG string inline
  starterCode: string;
  solution: string;
  hint: string;
  expectedOutput: string;
  // Optional: multi-layer guided editor
  layers?: LayerTab[];
  combinedSimulation?: string;
  combinedExpectedOutput?: string;
}

export interface ExamQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface Recurso {
  title: string;
  description: string;
  filename: string;  // path under /recursos/
  password: string;
  fileLabel?: string;
}

export interface WeekContent {
  week: number;
  title: string;
  description: string;
  exercises: Exercise[];
  exam: ExamQuestion[];
  recursos?: Recurso[];
}

export const week1: WeekContent = {
  week: 1,
  title: "Java OO Features",
  description: "Los 4 pilares de la Programación Orientada a Objetos en Java aplicados al desarrollo web.",
  exercises: [
    {
      id: "clase",
      title: "Clases en Java",
      concept: "clase",
      conceptLabel: "Fundamento",
      conceptColor: "#06b6d4",
      explanation: `<p>Una <strong>clase</strong> es el molde o plantilla a partir del cual se crean objetos. Define qué datos tiene y qué puede hacer.</p>
<h3>Partes de una clase</h3>
<ul>
<li><strong>Atributos</strong> — el estado del objeto (datos que guarda)</li>
<li><strong>Constructor</strong> — método especial que inicializa el objeto al crearlo con <code>new</code></li>
<li><strong>Métodos</strong> — el comportamiento del objeto (lo que puede hacer)</li>
</ul>
<h3>¿Qué es un objeto?</h3>
<p>Un objeto es una <strong>instancia</strong> de una clase. Si la clase es el molde, el objeto es el producto. Puedes crear miles de objetos del mismo molde.</p>
<h3>En Spring Boot</h3>
<p>Todo en Spring Boot son clases: <code>@Entity</code> para datos, <code>@Service</code> para lógica, <code>@RestController</code> para endpoints. Entender la anatomía de una clase es la base de todo.</p>`,
      analogy: "🏠 La clase es el plano de arquitectura. El objeto es la casa construida. Con un solo plano puedes construir muchas casas.",
      diagram: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="210" fill="#13141f" rx="10"/>
  <!-- Label left -->
  <text x="14" y="44" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="700" text-anchor="middle" transform="rotate(-90,14,110)">CLASE</text>
  <!-- Main class box -->
  <rect x="30" y="14" width="260" height="182" rx="10" fill="#0c1e26" stroke="#06b6d4" stroke-width="2"/>
  <!-- Class name section -->
  <rect x="30" y="14" width="260" height="34" rx="10" fill="#06b6d4" fill-opacity="0.2"/>
  <text x="44" y="27" fill="#67e8f9" font-size="9" font-family="sans-serif">class</text>
  <text x="160" y="36" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="monospace">Persona</text>
  <!-- Attributes section -->
  <text x="44" y="62" fill="#94a3b8" font-size="9" font-family="sans-serif" font-weight="600">ATRIBUTOS  (estado)</text>
  <line x1="30" y1="50" x2="290" y2="50" stroke="#1e3a4a" stroke-width="1"/>
  <text x="44" y="78" fill="#7dd3fc" font-size="11" font-family="monospace">String nombre</text>
  <text x="44" y="94" fill="#7dd3fc" font-size="11" font-family="monospace">int edad</text>
  <!-- Constructor section -->
  <line x1="30" y1="104" x2="290" y2="104" stroke="#1e3a4a" stroke-width="1"/>
  <text x="44" y="118" fill="#94a3b8" font-size="9" font-family="sans-serif" font-weight="600">CONSTRUCTOR  (inicializa)</text>
  <text x="44" y="134" fill="#a78bfa" font-size="11" font-family="monospace">Persona(nombre, edad)</text>
  <!-- Methods section -->
  <line x1="30" y1="144" x2="290" y2="144" stroke="#1e3a4a" stroke-width="1"/>
  <text x="44" y="158" fill="#94a3b8" font-size="9" font-family="sans-serif" font-weight="600">METODOS  (comportamiento)</text>
  <text x="44" y="174" fill="#86efac" font-size="11" font-family="monospace">saludar(): void</text>
  <text x="44" y="190" fill="#86efac" font-size="11" font-family="monospace">getNombre(): String</text>
  <!-- Object instances on right -->
  <text x="316" y="30" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">objetos</text>
  <text x="316" y="44" text-anchor="middle" fill="#4b5563" font-size="9" font-family="sans-serif">(instancias)</text>
  <rect x="298" y="52" width="88" height="38" rx="6" fill="#0c1e26" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.5"/>
  <text x="342" y="67" text-anchor="middle" fill="#67e8f9" font-size="9" font-family="monospace">p1: Persona</text>
  <text x="342" y="82" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">"Ana", 20</text>
  <rect x="298" y="100" width="88" height="38" rx="6" fill="#0c1e26" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.5"/>
  <text x="342" y="115" text-anchor="middle" fill="#67e8f9" font-size="9" font-family="monospace">p2: Persona</text>
  <text x="342" y="130" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">"Luis", 22</text>
  <!-- Arrow from class to objects -->
  <line x1="291" y1="70" x2="297" y2="70" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="291" y1="119" x2="297" y2="119" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="316" y="158" text-anchor="middle" fill="#4b5563" font-size="8" font-family="sans-serif">new</text>
  <text x="316" y="168" text-anchor="middle" fill="#4b5563" font-size="8" font-family="sans-serif">Persona(...)</text>
</svg>`,
      starterCode: `// Ejercicio 0: Anatomía de una clase
// Crea la clase Persona completa

class Persona {
    // TODO: declara 2 atributos private:
    // String nombre
    // int edad

    // TODO: crea el constructor que reciba nombre y edad
    // public Persona(String nombre, int edad) { ... }

    // TODO: crea getNombre() que retorne el nombre

    // TODO: crea getEdad() que retorne la edad

    // TODO: crea el método saludar() que imprima:
    // "Hola, soy [nombre] y tengo [edad] años"
}

public class Main {
    public static void main(String[] args) {
        Persona p1 = new Persona("Ana", 20);
        Persona p2 = new Persona("Luis", 22);

        p1.saludar();
        p2.saludar();

        System.out.println("Nombres: " + p1.getNombre() + ", " + p2.getNombre());
    }
}`,
      solution: `class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }

    public void saludar() {
        System.out.println("Hola, soy " + nombre + " y tengo " + edad + " años");
    }
}

public class Main {
    public static void main(String[] args) {
        Persona p1 = new Persona("Ana", 20);
        Persona p2 = new Persona("Luis", 22);
        p1.saludar();
        p2.saludar();
        System.out.println("Nombres: " + p1.getNombre() + ", " + p2.getNombre());
    }
}`,
      hint: "Declara 'private String nombre;' y 'private int edad;'. El constructor usa 'this.nombre = nombre;'. En saludar() usa System.out.println con concatenación.",
      expectedOutput: "Hola, soy Ana y tengo 20 años\nHola, soy Luis y tengo 22 años\nNombres: Ana, Luis",
    },
    {
      id: "abstraccion",
      title: "Abstracción",
      concept: "abstraccion",
      conceptLabel: "Abstracción",
      conceptColor: "#6366f1",
      explanation: `<p><strong>Abstracción</strong> es el proceso de ocultar los detalles de implementación y mostrar solo la funcionalidad esencial. En Java, usamos <code>abstract class</code> e <code>interface</code>.</p>
<p>Piénsalo así: cuando usas un cajero automático, no sabes cómo procesa internamente tu transacción. Solo ves los botones y el resultado.</p>
<h3>¿Cuándo usarlo?</h3>
<ul>
<li>Cuando múltiples clases comparten <strong>comportamiento común</strong></li>
<li>Cuando quieres definir un <strong>contrato</strong> que otras clases deben cumplir</li>
<li>Para reducir la complejidad del sistema</li>
</ul>
<h3>En Spring Boot</h3>
<p>Los <code>Repository</code>, <code>Service</code> y <code>Controller</code> usan abstracción: defines una interfaz y Spring inyecta la implementación automáticamente.</p>`,
      analogy: "☕ Como un café express: presionas el botón y sale el café. No ves ni la bomba, ni la caldera, ni el filtro.",
      diagram: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="180" fill="#13141f" rx="10"/>
  <!-- Interface -->
  <rect x="125" y="10" width="150" height="55" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
  <rect x="125" y="10" width="150" height="22" rx="8" fill="#6366f1" fill-opacity="0.25"/>
  <text x="200" y="25" text-anchor="middle" fill="#a5b4fc" font-size="10" font-family="sans-serif" font-style="italic">interface</text>
  <text x="200" y="42" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="monospace">Vehiculo</text>
  <text x="200" y="57" text-anchor="middle" fill="#818cf8" font-size="10" font-family="monospace">encender(): void</text>
  <!-- Connector lines -->
  <line x1="200" y1="65" x2="200" y2="80" stroke="#6366f1" stroke-width="1.5"/>
  <line x1="100" y1="80" x2="300" y2="80" stroke="#6366f1" stroke-width="1.5"/>
  <line x1="100" y1="80" x2="100" y2="92" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="300" y1="80" x2="300" y2="92" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Label "implements" -->
  <text x="210" y="78" fill="#6366f1" font-size="9" font-family="sans-serif" fill-opacity="0.7">implements</text>
  <!-- Auto box -->
  <rect x="20" y="92" width="155" height="55" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1.5"/>
  <text x="97" y="113" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="monospace">Auto</text>
  <text x="97" y="130" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">encender() {</text>
  <text x="97" y="143" text-anchor="middle" fill="#7c85a0" font-size="9" font-family="monospace">// llave fisica</text>
  <!-- Moto box -->
  <rect x="225" y="92" width="155" height="55" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1.5"/>
  <text x="302" y="113" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="monospace">Moto</text>
  <text x="302" y="130" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">encender() {</text>
  <text x="302" y="143" text-anchor="middle" fill="#7c85a0" font-size="9" font-family="monospace">// patada de arranque</text>
  <!-- Bottom label -->
  <text x="200" y="168" text-anchor="middle" fill="#4b5563" font-size="10" font-family="sans-serif">La interfaz define el QUE — las clases definen el COMO</text>
</svg>`,
      starterCode: `// Ejercicio 1: Abstracción
// Crea una interfaz Vehiculo con el método encender()
// Luego implementa Auto y Moto

// PASO 1: Define la interfaz
interface Vehiculo {
    // TODO: declara el método encender() que retorna void
}

// PASO 2: Implementa la clase Auto
class Auto implements Vehiculo {
    private String marca;

    public Auto(String marca) {
        this.marca = marca;
    }

    // TODO: implementa encender()
    // Debe imprimir: "Auto [marca] encendido con llave"
}

// PASO 3: Implementa la clase Moto
class Moto implements Vehiculo {
    private String marca;

    public Moto(String marca) {
        this.marca = marca;
    }

    // TODO: implementa encender()
    // Debe imprimir: "Moto [marca] encendida con patada"
}

public class Main {
    public static void main(String[] args) {
        Vehiculo v1 = new Auto("Toyota");
        Vehiculo v2 = new Moto("Honda");

        v1.encender();
        v2.encender();
    }
}`,
      solution: `interface Vehiculo {
    void encender();
}

class Auto implements Vehiculo {
    private String marca;
    public Auto(String marca) { this.marca = marca; }

    @Override
    public void encender() {
        System.out.println("Auto " + marca + " encendido con llave");
    }
}

class Moto implements Vehiculo {
    private String marca;
    public Moto(String marca) { this.marca = marca; }

    @Override
    public void encender() {
        System.out.println("Moto " + marca + " encendida con patada");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehiculo v1 = new Auto("Toyota");
        Vehiculo v2 = new Moto("Honda");
        v1.encender();
        v2.encender();
    }
}`,
      hint: "Usa 'void encender();' en la interfaz. En cada clase, añade @Override antes del método.",
      expectedOutput: "Auto Toyota encendido con llave\nMoto Honda encendida con patada",
    },
    {
      id: "encapsulamiento",
      title: "Encapsulamiento",
      concept: "encapsulamiento",
      conceptLabel: "Encapsulamiento",
      conceptColor: "#10b981",
      explanation: `<p><strong>Encapsulamiento</strong> es la práctica de restringir el acceso directo a los datos de una clase y solo permitirlo a través de métodos controlados (getters/setters).</p>
<p>Los atributos se declaran como <code>private</code> y se accede a ellos mediante métodos <code>public</code>.</p>
<h3>¿Por qué es importante?</h3>
<ul>
<li><strong>Protección de datos:</strong> evita modificaciones incorrectas</li>
<li><strong>Validación:</strong> puedes agregar lógica en el setter</li>
<li><strong>Flexibilidad:</strong> cambias la implementación sin afectar a quien usa la clase</li>
</ul>
<h3>En Spring Boot</h3>
<p>Todas las entidades (<code>@Entity</code>) usan encapsulamiento con Lombok (<code>@Getter @Setter</code>) o getters/setters manuales.</p>`,
      analogy: "🏦 Como una cuenta bancaria: no puedes modificar el saldo directamente. Solo puedes depositar() o retirar() — el banco valida antes.",
      diagram: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="210" fill="#13141f" rx="10"/>
  <!-- Class box -->
  <rect x="90" y="14" width="220" height="162" rx="10" fill="#0d1f1a" stroke="#10b981" stroke-width="2"/>
  <!-- Class name header -->
  <rect x="90" y="14" width="220" height="32" rx="10" fill="#10b981" fill-opacity="0.2"/>
  <text x="200" y="35" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="monospace">CuentaBancaria</text>
  <!-- Section label: private -->
  <text x="104" y="62" fill="#ef4444" font-size="9" font-family="sans-serif" font-weight="600" letter-spacing="1">PRIVATE</text>
  <!-- private fields with lock icon (rect) -->
  <rect x="104" y="68" width="8" height="10" rx="2" fill="#ef4444" fill-opacity="0.7"/>
  <text x="118" y="78" fill="#fca5a5" font-size="11" font-family="monospace">saldo: double</text>
  <rect x="104" y="84" width="8" height="10" rx="2" fill="#ef4444" fill-opacity="0.7"/>
  <text x="118" y="94" fill="#fca5a5" font-size="11" font-family="monospace">titular: String</text>
  <!-- Divider -->
  <line x1="90" y1="104" x2="310" y2="104" stroke="#374151" stroke-width="1"/>
  <!-- Section label: public -->
  <text x="104" y="120" fill="#10b981" font-size="9" font-family="sans-serif" font-weight="600" letter-spacing="1">PUBLIC</text>
  <!-- public methods with check -->
  <circle cx="108" cy="131" r="4" fill="#10b981" fill-opacity="0.8"/>
  <text x="118" y="135" fill="#6ee7b7" font-size="11" font-family="monospace">getSaldo()</text>
  <circle cx="108" cy="147" r="4" fill="#10b981" fill-opacity="0.8"/>
  <text x="118" y="151" fill="#6ee7b7" font-size="11" font-family="monospace">depositar(monto)</text>
  <circle cx="108" cy="163" r="4" fill="#10b981" fill-opacity="0.8"/>
  <text x="118" y="167" fill="#6ee7b7" font-size="11" font-family="monospace">retirar(monto)</text>
  <!-- Bottom label -->
  <text x="200" y="196" text-anchor="middle" fill="#4b5563" font-size="10" font-family="sans-serif">Los atributos son privados — el acceso es controlado</text>
</svg>`,
      starterCode: `// Ejercicio 2: Encapsulamiento
// Crea la clase CuentaBancaria con encapsulamiento correcto

public class Main {
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria("Ana García", 1000.0);

        cuenta.depositar(500.0);
        cuenta.retirar(200.0);

        System.out.println("Titular: " + cuenta.getTitular());
        System.out.println("Saldo: S/. " + cuenta.getSaldo());
    }
}

class CuentaBancaria {
    // TODO: declara los atributos como private
    // private String titular;
    // private double saldo;

    // TODO: crea el constructor

    // TODO: crea getSaldo() y getTitular()

    // TODO: crea depositar(double monto) que sume al saldo
    // e imprima: "Depósito de S/. [monto] exitoso"

    // TODO: crea retirar(double monto)
    // Valida que haya saldo suficiente
    // Si hay: resta y imprime "Retiro de S/. [monto] exitoso"
    // Si no: imprime "Saldo insuficiente"
}`,
      solution: `public class Main {
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria("Ana García", 1000.0);
        cuenta.depositar(500.0);
        cuenta.retirar(200.0);
        System.out.println("Titular: " + cuenta.getTitular());
        System.out.println("Saldo: S/. " + cuenta.getSaldo());
    }
}

class CuentaBancaria {
    private String titular;
    private double saldo;

    public CuentaBancaria(String titular, double saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    public String getTitular() { return titular; }
    public double getSaldo() { return saldo; }

    public void depositar(double monto) {
        saldo += monto;
        System.out.println("Depósito de S/. " + monto + " exitoso");
    }

    public void retirar(double monto) {
        if (monto <= saldo) {
            saldo -= monto;
            System.out.println("Retiro de S/. " + monto + " exitoso");
        } else {
            System.out.println("Saldo insuficiente");
        }
    }
}`,
      hint: "Usa 'private' para los atributos. Los getters solo retornan el valor. En retirar(), usa un if para validar que monto <= saldo.",
      expectedOutput: "Depósito de S/. 500.0 exitoso\nRetiro de S/. 200.0 exitoso\nTitular: Ana García\nSaldo: S/. 1300.0",
    },
    {
      id: "herencia",
      title: "Herencia",
      concept: "herencia",
      conceptLabel: "Herencia",
      conceptColor: "#f59e0b",
      explanation: `<p><strong>Herencia</strong> permite crear una clase nueva basada en una clase existente, reutilizando sus atributos y métodos. La clase hija extiende (<code>extends</code>) a la clase padre.</p>
<p>La palabra clave <code>super</code> permite llamar al constructor o métodos de la clase padre.</p>
<h3>Reglas clave</h3>
<ul>
<li>Java solo permite herencia <strong>simple</strong> (una clase padre)</li>
<li>Usa <code>super()</code> para llamar al constructor padre</li>
<li>La clase hija puede <strong>agregar</strong> atributos y métodos nuevos</li>
<li>Puede <strong>sobreescribir</strong> métodos con @Override</li>
</ul>
<h3>En Spring Boot</h3>
<p>Muy común en entidades con campos compartidos (id, createdAt, updatedAt) via una clase base <code>BaseEntity</code>.</p>`,
      analogy: "🧬 Como la herencia biológica: un hijo hereda rasgos del padre, pero también tiene sus propias características únicas.",
      diagram: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="210" fill="#13141f" rx="10"/>
  <!-- Parent class -->
  <rect x="130" y="14" width="140" height="62" rx="8" fill="#1c1a0e" stroke="#f59e0b" stroke-width="2"/>
  <rect x="130" y="14" width="140" height="26" rx="8" fill="#f59e0b" fill-opacity="0.2"/>
  <text x="200" y="32" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="bold" font-family="monospace">Empleado</text>
  <text x="200" y="50" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">nombre: String</text>
  <text x="200" y="66" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">trabajar(): void</text>
  <!-- extends labels -->
  <text x="103" y="102" text-anchor="middle" fill="#f59e0b" font-size="9" font-family="sans-serif" font-style="italic">extends</text>
  <text x="297" y="102" text-anchor="middle" fill="#f59e0b" font-size="9" font-family="sans-serif" font-style="italic">extends</text>
  <!-- Connector lines -->
  <line x1="200" y1="76" x2="200" y2="94" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="103" y1="94" x2="297" y2="94" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="103" y1="94" x2="103" y2="110" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="297" y1="94" x2="297" y2="110" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Gerente -->
  <rect x="20" y="110" width="166" height="72" rx="8" fill="#1c1a0e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="103" y="130" text-anchor="middle" fill="#fde68a" font-size="12" font-weight="bold" font-family="monospace">Gerente</text>
  <text x="103" y="148" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">equipoSize: int</text>
  <text x="103" y="164" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">liderar(): void</text>
  <text x="103" y="178" text-anchor="middle" fill="#65a30d" font-size="9" font-family="sans-serif">+ hereda trabajar()</text>
  <!-- Desarrollador -->
  <rect x="214" y="110" width="166" height="72" rx="8" fill="#1c1a0e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="297" y="130" text-anchor="middle" fill="#fde68a" font-size="12" font-weight="bold" font-family="monospace">Desarrollador</text>
  <text x="297" y="148" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">lenguaje: String</text>
  <text x="297" y="164" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">programar(): void</text>
  <text x="297" y="178" text-anchor="middle" fill="#65a30d" font-size="9" font-family="sans-serif">+ hereda trabajar()</text>
  <!-- Bottom label -->
  <text x="200" y="200" text-anchor="middle" fill="#4b5563" font-size="10" font-family="sans-serif">Los hijos heredan todo del padre y agregan lo suyo</text>
</svg>`,
      starterCode: `// Ejercicio 3: Herencia
// Crea la jerarquía: Empleado -> Gerente y Desarrollador

class Empleado {
    // TODO: atributo private String nombre

    // TODO: constructor que reciba nombre

    // TODO: getNombre()

    public void trabajar() {
        System.out.println(getNombre() + " está trabajando");
    }
}

class Gerente extends Empleado {
    // TODO: atributo private int equipoSize

    // TODO: constructor que reciba nombre y equipoSize
    // Usa super(nombre) para llamar al padre

    // TODO: método liderar() que imprima:
    // "[nombre] lidera un equipo de [equipoSize] personas"
}

class Desarrollador extends Empleado {
    // TODO: atributo private String lenguaje

    // TODO: constructor con nombre y lenguaje

    // TODO: método programar() que imprima:
    // "[nombre] está programando en [lenguaje]"
}

public class Main {
    public static void main(String[] args) {
        Gerente g = new Gerente("María", 5);
        Desarrollador d = new Desarrollador("Carlos", "Java");

        g.trabajar();
        g.liderar();
        d.trabajar();
        d.programar();
    }
}`,
      solution: `class Empleado {
    private String nombre;

    public Empleado(String nombre) { this.nombre = nombre; }
    public String getNombre() { return nombre; }

    public void trabajar() {
        System.out.println(getNombre() + " está trabajando");
    }
}

class Gerente extends Empleado {
    private int equipoSize;

    public Gerente(String nombre, int equipoSize) {
        super(nombre);
        this.equipoSize = equipoSize;
    }

    public void liderar() {
        System.out.println(getNombre() + " lidera un equipo de " + equipoSize + " personas");
    }
}

class Desarrollador extends Empleado {
    private String lenguaje;

    public Desarrollador(String nombre, String lenguaje) {
        super(nombre);
        this.lenguaje = lenguaje;
    }

    public void programar() {
        System.out.println(getNombre() + " está programando en " + lenguaje);
    }
}

public class Main {
    public static void main(String[] args) {
        Gerente g = new Gerente("María", 5);
        Desarrollador d = new Desarrollador("Carlos", "Java");
        g.trabajar();
        g.liderar();
        d.trabajar();
        d.programar();
    }
}`,
      hint: "En Gerente y Desarrollador, el constructor debe llamar a super(nombre) como primera línea. Luego asigna el atributo propio.",
      expectedOutput: "María está trabajando\nMaría lidera un equipo de 5 personas\nCarlos está trabajando\nCarlos está programando en Java",
    },
    {
      id: "polimorfismo",
      title: "Polimorfismo",
      concept: "polimorfismo",
      conceptLabel: "Polimorfismo",
      conceptColor: "#ec4899",
      explanation: `<p><strong>Polimorfismo</strong> significa "muchas formas". Un objeto puede comportarse de diferentes maneras según su tipo real en tiempo de ejecución.</p>
<p>Existen dos tipos:</p>
<ul>
<li><strong>Runtime (Overriding):</strong> la misma llamada produce resultados diferentes según el objeto</li>
<li><strong>Compile-time (Overloading):</strong> mismo nombre de método, diferentes parámetros</li>
</ul>
<h3>La clave</h3>
<p>Puedes tener una variable de tipo padre (<code>Animal a</code>) apuntando a un objeto hijo (<code>new Perro()</code>). Al llamar a <code>a.hacerSonido()</code>, se ejecuta el método del hijo.</p>
<h3>En Spring Boot</h3>
<p>Los servicios se inyectan por interfaz (<code>UserService service</code>) — Spring inyecta la implementación concreta. Eso es polimorfismo en acción.</p>`,
      analogy: "🔊 Como un control remoto universal: el mismo botón 'play' funciona diferente en la TV, el DVD y el streaming. Mismo mensaje, diferente respuesta.",
      diagram: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="210" fill="#13141f" rx="10"/>
  <!-- Title: same call -->
  <text x="200" y="22" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">a.hacerSonido()  →  resultado diferente</text>
  <!-- Three animal boxes top -->
  <rect x="22" y="32" width="104" height="40" rx="8" fill="#2d1033" stroke="#ec4899" stroke-width="1.5"/>
  <text x="74" y="48" text-anchor="middle" fill="#f9a8d4" font-size="12" font-weight="bold" font-family="monospace">Perro</text>
  <text x="74" y="64" text-anchor="middle" fill="#ec4899" font-size="10" font-family="monospace">hacerSonido()</text>
  <rect x="148" y="32" width="104" height="40" rx="8" fill="#2d1033" stroke="#ec4899" stroke-width="1.5"/>
  <text x="200" y="48" text-anchor="middle" fill="#f9a8d4" font-size="12" font-weight="bold" font-family="monospace">Gato</text>
  <text x="200" y="64" text-anchor="middle" fill="#ec4899" font-size="10" font-family="monospace">hacerSonido()</text>
  <rect x="274" y="32" width="104" height="40" rx="8" fill="#2d1033" stroke="#ec4899" stroke-width="1.5"/>
  <text x="326" y="48" text-anchor="middle" fill="#f9a8d4" font-size="12" font-weight="bold" font-family="monospace">Vaca</text>
  <text x="326" y="64" text-anchor="middle" fill="#ec4899" font-size="10" font-family="monospace">hacerSonido()</text>
  <!-- Arrows down -->
  <line x1="74" y1="72" x2="74" y2="110" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="200" y1="72" x2="200" y2="110" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="326" y1="72" x2="326" y2="110" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Output bubbles -->
  <rect x="22" y="110" width="104" height="36" rx="18" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="74" y="133" text-anchor="middle" fill="#a5b4fc" font-size="13" font-family="monospace">Guau!</text>
  <rect x="148" y="110" width="104" height="36" rx="18" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="200" y="133" text-anchor="middle" fill="#a5b4fc" font-size="13" font-family="monospace">Miau!</text>
  <rect x="274" y="110" width="104" height="36" rx="18" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="326" y="133" text-anchor="middle" fill="#a5b4fc" font-size="13" font-family="monospace">Muuu!</text>
  <!-- For loop code -->
  <rect x="20" y="158" width="360" height="38" rx="6" fill="#0f1117" stroke="#374151" stroke-width="1"/>
  <text x="36" y="173" fill="#94a3b8" font-size="10" font-family="monospace">for (Animal a : animales) {</text>
  <text x="52" y="188" fill="#ec4899" font-size="10" font-family="monospace">a.hacerSonido();  </text>
  <text x="178" y="188" fill="#4b5563" font-size="10" font-family="monospace">// mismo codigo, distinto resultado</text>
</svg>`,
      starterCode: `// Ejercicio 4: Polimorfismo
// Crea Animal con hacerSonido() y subclases Perro, Gato, Vaca

abstract class Animal {
    private String nombre;

    public Animal(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() { return nombre; }

    // TODO: declara hacerSonido() como abstract
}

class Perro extends Animal {
    public Perro(String nombre) { super(nombre); }

    // TODO: @Override hacerSonido()
    // Imprime: "[nombre] dice: ¡Guau!"
}

class Gato extends Animal {
    public Gato(String nombre) { super(nombre); }

    // TODO: @Override hacerSonido()
    // Imprime: "[nombre] dice: ¡Miau!"
}

class Vaca extends Animal {
    public Vaca(String nombre) { super(nombre); }

    // TODO: @Override hacerSonido()
    // Imprime: "[nombre] dice: ¡Muuu!"
}

public class Main {
    public static void main(String[] args) {
        Animal[] animales = {
            new Perro("Rex"),
            new Gato("Misi"),
            new Vaca("Lola")
        };

        // TODO: recorre el array y llama hacerSonido() en cada animal
        for (Animal a : animales) {
            // ???
        }
    }
}`,
      solution: `abstract class Animal {
    private String nombre;
    public Animal(String nombre) { this.nombre = nombre; }
    public String getNombre() { return nombre; }
    public abstract void hacerSonido();
}

class Perro extends Animal {
    public Perro(String nombre) { super(nombre); }
    @Override
    public void hacerSonido() { System.out.println(getNombre() + " dice: ¡Guau!"); }
}

class Gato extends Animal {
    public Gato(String nombre) { super(nombre); }
    @Override
    public void hacerSonido() { System.out.println(getNombre() + " dice: ¡Miau!"); }
}

class Vaca extends Animal {
    public Vaca(String nombre) { super(nombre); }
    @Override
    public void hacerSonido() { System.out.println(getNombre() + " dice: ¡Muuu!"); }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animales = { new Perro("Rex"), new Gato("Misi"), new Vaca("Lola") };
        for (Animal a : animales) {
            a.hacerSonido();
        }
    }
}`,
      hint: "En la clase Animal usa 'public abstract void hacerSonido();'. En el for, simplemente llama a.hacerSonido().",
      expectedOutput: "Rex dice: ¡Guau!\nMisi dice: ¡Miau!\nLola dice: ¡Muuu!",
    },
    {
      id: "overriding",
      title: "Overriding",
      concept: "overriding",
      conceptLabel: "Overriding",
      conceptColor: "#f97316",
      explanation: `<p><strong>Overriding</strong> (sobreescritura) ocurre cuando una subclase redefine un método de la clase padre con la misma firma. Se marca con <code>@Override</code>.</p>
<h3>Reglas del Overriding</h3>
<ul>
<li>El nombre del método debe ser <strong>idéntico</strong></li>
<li>Los parámetros deben ser <strong>los mismos</strong></li>
<li>El tipo de retorno puede ser igual o una <strong>subclase</strong> (covarianza)</li>
<li>No puedes reducir la visibilidad (<code>public</code> → <code>private</code> es inválido)</li>
<li>Siempre usa <code>@Override</code> — detecta errores en tiempo de compilación</li>
</ul>
<h3>Overriding vs Overloading</h3>
<ul>
<li><strong>Overriding:</strong> mismo método en subclase, mismo nombre y parámetros</li>
<li><strong>Overloading:</strong> mismo nombre, distintos parámetros, misma clase</li>
</ul>
<h3>toString() en Java</h3>
<p>Todos los objetos heredan <code>toString()</code> de <code>Object</code>. Si no lo sobreescribes, imprime algo como <code>Persona@1a2b3c</code>. Con <code>@Override</code> controlas la representación.</p>`,
      analogy: "📝 Como reescribir una receta heredada de tu abuela: misma receta base, pero tú la adaptas a tu estilo. El nombre del plato es el mismo.",
      diagram: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="400" height="210" fill="#13141f" rx="10"/>
  <!-- Parent class -->
  <rect x="120" y="14" width="160" height="68" rx="8" fill="#1a0e05" stroke="#f97316" stroke-width="2"/>
  <rect x="120" y="14" width="160" height="26" rx="8" fill="#f97316" fill-opacity="0.2"/>
  <text x="200" y="31" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold" font-family="monospace">Figura</text>
  <text x="200" y="49" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">area(): double</text>
  <text x="200" y="64" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">// retorna 0.0 por defecto</text>
  <!-- Arrow down -->
  <line x1="200" y1="82" x2="200" y2="98" stroke="#f97316" stroke-width="1.5"/>
  <line x1="104" y1="98" x2="296" y2="98" stroke="#f97316" stroke-width="1.5"/>
  <line x1="104" y1="98" x2="104" y2="114" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="296" y1="98" x2="296" y2="114" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="200" y="95" text-anchor="middle" fill="#f97316" font-size="8" font-family="sans-serif">extends</text>
  <!-- Circulo class -->
  <rect x="14" y="114" width="180" height="74" rx="8" fill="#1a0e05" stroke="#fb923c" stroke-width="1.5"/>
  <text x="104" y="132" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="bold" font-family="monospace">Circulo</text>
  <text x="104" y="148" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">radio: double</text>
  <rect x="22" y="154" width="13" height="13" rx="2" fill="#f97316" fill-opacity="0.7"/>
  <text x="104" y="166" text-anchor="middle" fill="#fdba74" font-size="10" font-family="monospace">@Override</text>
  <text x="104" y="180" text-anchor="middle" fill="#86efac" font-size="10" font-family="monospace">area() → PI * r * r</text>
  <!-- Rectangulo class -->
  <rect x="206" y="114" width="180" height="74" rx="8" fill="#1a0e05" stroke="#fb923c" stroke-width="1.5"/>
  <text x="296" y="132" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="bold" font-family="monospace">Rectangulo</text>
  <text x="296" y="148" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">ancho, alto: double</text>
  <rect x="214" y="154" width="13" height="13" rx="2" fill="#f97316" fill-opacity="0.7"/>
  <text x="296" y="166" text-anchor="middle" fill="#fdba74" font-size="10" font-family="monospace">@Override</text>
  <text x="296" y="180" text-anchor="middle" fill="#86efac" font-size="10" font-family="monospace">area() → ancho * alto</text>
  <!-- Bottom label -->
  <text x="200" y="202" text-anchor="middle" fill="#4b5563" font-size="10" font-family="sans-serif">Mismo metodo, implementacion distinta en cada clase hija</text>
</svg>`,
      starterCode: `// Ejercicio 5: Overriding
// Sobreescribe el método area() en cada figura

class Figura {
    public double area() {
        return 0.0; // implementación base por defecto
    }

    @Override
    public String toString() {
        return "Figura con area = " + area();
    }
}

class Circulo extends Figura {
    private double radio;

    public Circulo(double radio) {
        this.radio = radio;
    }

    // TODO: @Override area()
    // retorna Math.PI * radio * radio
}

class Rectangulo extends Figura {
    private double ancho;
    private double alto;

    public Rectangulo(double ancho, double alto) {
        this.ancho = ancho;
        this.alto = alto;
    }

    // TODO: @Override area()
    // retorna ancho * alto
}

public class Main {
    public static void main(String[] args) {
        Figura[] figuras = {
            new Circulo(5),
            new Rectangulo(4, 6)
        };

        for (Figura f : figuras) {
            // toString() llama a area() automaticamente (overriding en accion)
            System.out.println(f);
        }
    }
}`,
      solution: `class Figura {
    public double area() { return 0.0; }

    @Override
    public String toString() {
        return "Figura con area = " + area();
    }
}

class Circulo extends Figura {
    private double radio;
    public Circulo(double radio) { this.radio = radio; }

    @Override
    public double area() {
        return Math.PI * radio * radio;
    }
}

class Rectangulo extends Figura {
    private double ancho, alto;
    public Rectangulo(double ancho, double alto) {
        this.ancho = ancho;
        this.alto = alto;
    }

    @Override
    public double area() {
        return ancho * alto;
    }
}

public class Main {
    public static void main(String[] args) {
        Figura[] figuras = { new Circulo(5), new Rectangulo(4, 6) };
        for (Figura f : figuras) {
            System.out.println(f);
        }
    }
}`,
      hint: "Escribe '@Override' en la línea anterior al método. Para Circulo: 'return Math.PI * radio * radio;'. Para Rectangulo: 'return ancho * alto;'",
      expectedOutput: "Figura con area = 78.53981633974483\nFigura con area = 24.0",
    },
  ],
  exam: [
    {
      id: 1,
      category: "Clases en Java",
      text: "¿Cuál es la palabra clave correcta para definir una clase en Java?",
      options: ["object", "class", "type", "struct"],
      correctAnswer: 1,
      explanation: "En Java, `class` es la palabra clave para declarar una clase. Es el molde a partir del cual se crean objetos.",
    },
    {
      id: 2,
      category: "Clases en Java",
      text: "¿Qué elemento de una clase se encarga de inicializar el objeto cuando se usa `new`?",
      options: ["Un método estático", "El método main()", "El constructor", "Un atributo público"],
      correctAnswer: 2,
      explanation: "El constructor es un método especial que tiene el mismo nombre que la clase y se ejecuta automáticamente al crear un objeto con `new`.",
    },
    {
      id: 3,
      category: "Encapsulamiento",
      text: "¿Cuál modificador de acceso hace que un atributo solo sea accesible dentro de su propia clase?",
      options: ["public", "protected", "default", "private"],
      correctAnswer: 3,
      explanation: "`private` restringe el acceso al atributo únicamente dentro de la clase que lo declara. Es la base del encapsulamiento en Java.",
    },
    {
      id: 4,
      category: "Encapsulamiento",
      text: "Para acceder a un atributo privado desde fuera de la clase, usamos:",
      options: ["Acceso directo con el operador punto", "Métodos getter y setter públicos", "La palabra clave `super`", "Un constructor estático"],
      correctAnswer: 1,
      explanation: "Los métodos getter (para leer) y setter (para modificar) son la forma estándar de acceder a atributos privados, manteniendo el control sobre los datos.",
    },
    {
      id: 5,
      category: "Abstracción",
      text: "¿Qué palabra clave usa una clase concreta para implementar una interfaz en Java?",
      options: ["extends", "inherits", "implements", "overrides"],
      correctAnswer: 2,
      explanation: "`implements` es la palabra clave para que una clase concreta cumpla el contrato definido por una interfaz. Una clase puede implementar múltiples interfaces.",
    },
    {
      id: 6,
      category: "Abstracción",
      text: "Una interfaz en Java define:",
      options: [
        "La implementación completa de todos sus métodos",
        "Un contrato con métodos que las clases implementadoras deben definir",
        "Solo atributos privados compartidos",
        "Un tipo de herencia múltiple con código",
      ],
      correctAnswer: 1,
      explanation: "Una interfaz define el QUÉ (el contrato), no el CÓMO. Las clases que la implementan son responsables de definir el comportamiento de cada método.",
    },
    {
      id: 7,
      category: "Herencia",
      text: "¿Cuál es la palabra clave para que una clase herede de otra en Java?",
      options: ["implements", "extends", "inherits", "super"],
      correctAnswer: 1,
      explanation: "`extends` permite que una clase hija herede atributos y métodos de una clase padre. Java solo permite herencia simple (una clase padre).",
    },
    {
      id: 8,
      category: "Herencia",
      text: "¿Para qué se usa `super()` dentro del constructor de una clase hija?",
      options: [
        "Para crear un nuevo objeto de la clase padre",
        "Para llamar al constructor de la clase padre",
        "Para sobreescribir un método heredado",
        "Para acceder a métodos estáticos",
      ],
      correctAnswer: 1,
      explanation: "`super()` invoca el constructor de la clase padre desde la clase hija. Debe ser la primera línea del constructor hijo cuando se necesita inicializar el padre.",
    },
    {
      id: 9,
      category: "Polimorfismo",
      text: "El polimorfismo en Java permite que:",
      options: [
        "Una clase tenga múltiples constructores",
        "Un atributo sea de varios tipos a la vez",
        "Un objeto de tipo padre pueda referenciar objetos de clases hijas",
        "Se hereden múltiples clases simultáneamente",
      ],
      correctAnswer: 2,
      explanation: "Con polimorfismo, una variable del tipo padre puede apuntar a objetos de cualquier clase hija. Esto permite tratar objetos diferentes de forma uniforme.",
    },
    {
      id: 10,
      category: "Overriding",
      text: "¿Cuál de las siguientes afirmaciones sobre `@Override` es correcta?",
      options: [
        "Es obligatorio para que el método funcione correctamente",
        "Permite al compilador verificar que el método sobreescribe uno del padre",
        "Solo se usa en interfaces, no en clases abstractas",
        "Cambia el tipo de retorno del método heredado",
      ],
      correctAnswer: 1,
      explanation: "`@Override` es una anotación que le indica al compilador que este método sobreescribe uno de la clase padre. Si no existe ese método en el padre, el compilador lanza un error. Es una buena práctica siempre usarla.",
    },
    {
      id: 11,
      category: "Overriding",
      text: "¿Cuál es la diferencia principal entre Overriding y Overloading?",
      options: [
        "Overriding usa @Override, Overloading usa @Overload",
        "Overriding sobreescribe un método heredado; Overloading define métodos con el mismo nombre pero distintos parámetros",
        "Overriding solo funciona con interfaces; Overloading solo con clases abstractas",
        "No hay diferencia, son sinónimos en Java",
      ],
      correctAnswer: 1,
      explanation: "Overriding: reemplaza la implementación de un método heredado (misma firma). Overloading: múltiples métodos con el mismo nombre pero diferente número o tipo de parámetros en la misma clase.",
    },
    {
      id: 12,
      category: "Clases en Java",
      text: "¿Cuál de los siguientes NO es un pilar de la Programación Orientada a Objetos?",
      options: ["Abstracción", "Recursión", "Herencia", "Polimorfismo"],
      correctAnswer: 1,
      explanation: "Los 4 pilares de la POO son: Abstracción, Encapsulamiento, Herencia y Polimorfismo. La recursión es una técnica de programación, pero no es un pilar de la POO.",
    },
    {
      id: 13,
      category: "Clases en Java",
      text: "¿Qué significa que un método sea `static` en Java?",
      options: [
        "Solo puede ser llamado desde subclases",
        "Pertenece a la clase y se llama sin crear una instancia",
        "No puede acceder a ningún atributo de la clase",
        "Es privado y no puede ser heredado",
      ],
      correctAnswer: 1,
      explanation: "Un método `static` pertenece a la clase, no a las instancias. Se llama directamente: `MiClase.metodo()` sin necesitar `new`. Ejemplo real: `Math.sqrt()`, `Arrays.sort()`.",
    },
    {
      id: 14,
      category: "Clases en Java",
      text: "¿Qué representa la palabra clave `this` dentro de un método de instancia?",
      options: [
        "La clase padre del objeto actual",
        "El método que se está ejecutando actualmente",
        "La referencia al objeto actual sobre el que se invoca el método",
        "El tipo genérico de la clase",
      ],
      correctAnswer: 2,
      explanation: "`this` es la referencia al objeto actual. Se usa para distinguir atributos de parámetros con el mismo nombre: `this.nombre = nombre`. También permite llamar a otro constructor con `this(...)`.",
    },
    {
      id: 15,
      category: "Abstracción",
      text: "¿Puede una clase `abstract` en Java tener métodos con implementación (cuerpo)?",
      options: [
        "No, todos sus métodos deben ser abstractos sin cuerpo",
        "Sí, puede mezclar métodos abstractos y métodos con implementación",
        "Solo si implementa al menos una interfaz",
        "Solo en Java 11 o superior",
      ],
      correctAnswer: 1,
      explanation: "Una clase `abstract` puede tener métodos concretos (con cuerpo, heredables) y métodos abstractos (sin cuerpo, que las subclases deben implementar obligatoriamente). Esta combinación es su gran ventaja.",
    },
    {
      id: 16,
      category: "Abstracción",
      text: "¿Puede una clase `abstract` tener constructor en Java?",
      options: [
        "No, porque no puede ser instanciada directamente",
        "Sí, y las subclases lo invocan con `super()` para inicializar la parte heredada",
        "Solo si no tiene métodos abstractos",
        "Solo si es también `final`",
      ],
      correctAnswer: 1,
      explanation: "Las clases abstractas sí pueden tener constructores, aunque no se instancien directamente. Las subclases los llaman con `super()` para inicializar los atributos del padre. Es un patrón muy común.",
    },
    {
      id: 17,
      category: "Herencia",
      text: "¿Qué hace `super.metodo()` dentro de una clase hija que sobreescribe ese método?",
      options: [
        "Crea una nueva instancia del padre y llama su método",
        "Reemplaza el método del padre definitivamente",
        "Invoca la versión del método definida en la clase padre",
        "Accede a métodos estáticos del padre únicamente",
      ],
      correctAnswer: 2,
      explanation: "`super.metodo()` ejecuta la implementación original del padre desde dentro del override de la hija. Útil cuando quieres extender (no reemplazar) el comportamiento: ejecutas lo del padre y añades lógica propia.",
    },
    {
      id: 18,
      category: "Herencia",
      text: "¿Qué efecto tiene declarar una clase como `final` en Java?",
      options: [
        "La clase no puede tener métodos públicos",
        "La clase no puede ser instanciada con `new`",
        "La clase no puede ser extendida por ninguna subclase",
        "La clase solo puede tener atributos estáticos",
      ],
      correctAnswer: 2,
      explanation: "Una clase `final` no puede ser subclaseada. En Java, `String` e `Integer` son `final`. Se usa cuando no se desea que nadie modifique el comportamiento a través de herencia.",
    },
    {
      id: 19,
      category: "Herencia",
      text: "¿De qué clase heredan implícitamente todas las clases Java cuando no se declara `extends`?",
      options: ["Base", "Class", "Object", "Root"],
      correctAnswer: 2,
      explanation: "Toda clase en Java hereda implícitamente de `java.lang.Object`. Por eso métodos como `toString()`, `equals()` y `hashCode()` están disponibles en cualquier objeto sin necesidad de declararlos.",
    },
    {
      id: 20,
      category: "Polimorfismo",
      text: "Dado `Animal a = new Perro();`, ¿qué tipo usa Java al ejecutar `a.hablar()` si Perro lo sobreescribe?",
      options: [
        "El tipo declarado: Animal (se resuelve en compilación)",
        "El tipo real del objeto: Perro (se resuelve en ejecución)",
        "Depende del modificador de acceso del método",
        "El último tipo asignado a la variable",
      ],
      correctAnswer: 1,
      explanation: "Aunque la variable es de tipo `Animal`, Java usa el tipo real del objeto (`Perro`) en tiempo de ejecución. Esto es el 'dynamic dispatch': el motor de polimorfismo que decide qué implementación ejecutar.",
    },
    {
      id: 21,
      category: "Polimorfismo",
      text: "La sobrecarga de métodos (overloading) en Java se resuelve en:",
      options: [
        "Tiempo de ejecución, según el tipo real del objeto",
        "Tiempo de compilación, según el tipo declarado y los argumentos",
        "Tiempo de carga de la JVM",
        "Tiempo de linkeo entre clases",
      ],
      correctAnswer: 1,
      explanation: "El overloading se resuelve en compilación: el compilador elige qué versión llamar según el tipo declarado de los argumentos. Es diferente al overriding, que usa polimorfismo dinámico en ejecución.",
    },
    {
      id: 22,
      category: "Encapsulamiento",
      text: "¿Qué modificador de acceso permite que un atributo sea accesible en la misma clase Y en sus subclases, pero NO desde clases externas no relacionadas?",
      options: ["public", "private", "default (sin modificador)", "protected"],
      correctAnswer: 3,
      explanation: "`protected` da acceso dentro del mismo paquete y desde subclases en cualquier paquete. Es el punto intermedio entre `private` (solo la clase) y `public` (acceso desde cualquier lugar).",
    },
    {
      id: 23,
      category: "Encapsulamiento",
      text: "¿Cuál es el principal beneficio del encapsulamiento en el diseño de software?",
      options: [
        "Hacer el código más rápido en ejecución",
        "Controlar el acceso a los datos y ocultar la implementación interna",
        "Eliminar la necesidad de usar constructores",
        "Permitir herencia múltiple entre clases",
      ],
      correctAnswer: 1,
      explanation: "El encapsulamiento protege la integridad de los datos. Si cambias la implementación interna (ej: el tipo de un atributo), el código externo no se rompe siempre que mantengas la interfaz pública (getters/setters) igual.",
    },
    {
      id: 24,
      category: "Overriding",
      text: "¿Es posible hacer override de un método `static` en Java?",
      options: [
        "Sí, funciona igual que con métodos de instancia",
        "No, los métodos estáticos se vinculan en compilación y no admiten override real",
        "Sí, pero solo usando la anotación @Override explícitamente",
        "Solo si la subclase también declara el método como static",
      ],
      correctAnswer: 1,
      explanation: "Los métodos `static` no admiten override real. Lo que parece un override es 'method hiding': la versión del hijo oculta la del padre, pero no hay polimorfismo dinámico. Si usas `@Override` sobre un método estático, el compilador da error.",
    },
    {
      id: 25,
      category: "Overriding",
      text: "¿Qué método heredado de Object se suele sobrescribir para que `System.out.println(obj)` muestre información útil del objeto?",
      options: ["print()", "show()", "display()", "toString()"],
      correctAnswer: 3,
      explanation: "`toString()` se hereda de Object y por defecto retorna algo como `Persona@1a2b3c`. Al sobrescribirlo puedes retornar `'Persona{nombre=Ana, edad=20}'`, lo cual es invaluable para depuración y logs.",
    },
  ],
};
