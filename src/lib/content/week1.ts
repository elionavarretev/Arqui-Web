export interface Exercise {
  id: string;
  title: string;
  concept: "abstraccion" | "encapsulamiento" | "herencia" | "polimorfismo";
  conceptLabel: string;
  conceptColor: string;
  explanation: string;
  analogy: string;
  diagram: string; // SVG string inline
  starterCode: string;
  solution: string;
  hint: string;
  expectedOutput: string;
}

export interface WeekContent {
  week: number;
  title: string;
  description: string;
  exercises: Exercise[];
}

export const week1: WeekContent = {
  week: 1,
  title: "Java OO Features",
  description: "Los 4 pilares de la Programación Orientada a Objetos en Java aplicados al desarrollo web.",
  exercises: [
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
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="320" height="180" fill="#1e2030" rx="8"/>
  <!-- Interface box -->
  <rect x="90" y="20" width="140" height="50" rx="6" fill="none" stroke="#6366f1" stroke-width="2"/>
  <text x="160" y="38" text-anchor="middle" fill="#818cf8" font-size="10" font-family="monospace">«interface»</text>
  <text x="160" y="55" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="monospace">Vehiculo</text>
  <text x="160" y="68" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">+ encender(): void</text>
  <!-- Arrow down -->
  <line x1="160" y1="70" x2="100" y2="110" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4"/>
  <line x1="160" y1="70" x2="220" y2="110" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4"/>
  <!-- Impl boxes -->
  <rect x="40" y="110" width="110" height="45" rx="6" fill="#16213e" stroke="#4f46e5" stroke-width="1.5"/>
  <text x="95" y="128" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="monospace">Auto</text>
  <text x="95" y="145" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">encender() { ... }</text>
  <rect x="170" y="110" width="110" height="45" rx="6" fill="#16213e" stroke="#4f46e5" stroke-width="1.5"/>
  <text x="225" y="128" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="monospace">Moto</text>
  <text x="225" y="145" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">encender() { ... }</text>
  <!-- Label -->
  <text x="160" y="172" text-anchor="middle" fill="#475569" font-size="9" font-family="monospace">La interfaz define el QUÉ, las clases el CÓMO</text>
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
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="320" height="180" fill="#1e2030" rx="8"/>
  <!-- Class box -->
  <rect x="80" y="20" width="160" height="130" rx="8" fill="#16213e" stroke="#10b981" stroke-width="2"/>
  <rect x="80" y="20" width="160" height="28" rx="8" fill="#10b981" fill-opacity="0.3"/>
  <text x="160" y="38" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="monospace">CuentaBancaria</text>
  <!-- Private fields -->
  <text x="92" y="62" fill="#f87171" font-size="10" font-family="monospace">🔒 private saldo</text>
  <text x="92" y="78" fill="#f87171" font-size="10" font-family="monospace">🔒 private titular</text>
  <!-- Line -->
  <line x1="80" y1="88" x2="240" y2="88" stroke="#374151" stroke-width="1"/>
  <!-- Public methods -->
  <text x="92" y="105" fill="#34d399" font-size="10" font-family="monospace">✅ getSaldo()</text>
  <text x="92" y="120" fill="#34d399" font-size="10" font-family="monospace">✅ depositar(monto)</text>
  <text x="92" y="135" fill="#34d399" font-size="10" font-family="monospace">✅ retirar(monto)</text>
  <!-- External arrow blocked -->
  <text x="18" y="95" fill="#f87171" font-size="18">✗</text>
  <line x1="38" y1="93" x2="78" y2="80" stroke="#f87171" stroke-width="1.5" stroke-dasharray="3"/>
  <text x="4" y="115" fill="#f87171" font-size="8" font-family="monospace">direct</text>
  <text x="4" y="125" fill="#f87171" font-size="8" font-family="monospace">access</text>
  <!-- Label -->
  <text x="160" y="173" text-anchor="middle" fill="#475569" font-size="9" font-family="monospace">Acceso solo por métodos públicos</text>
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
      diagram: `<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="320" height="190" fill="#1e2030" rx="8"/>
  <!-- Parent -->
  <rect x="90" y="15" width="140" height="60" rx="6" fill="#16213e" stroke="#f59e0b" stroke-width="2"/>
  <text x="160" y="35" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="monospace">Empleado</text>
  <text x="160" y="50" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">- nombre: String</text>
  <text x="160" y="63" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">+ trabajar(): void</text>
  <!-- Arrow -->
  <line x1="100" y1="75" x2="80" y2="115" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="220" y1="75" x2="240" y2="115" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="50" y="100" fill="#f59e0b" font-size="18" font-family="monospace">↙</text>
  <text x="225" y="100" fill="#f59e0b" font-size="18" font-family="monospace">↘</text>
  <text x="160" y="100" text-anchor="middle" fill="#f59e0b" font-size="8" font-family="monospace">extends</text>
  <!-- Children -->
  <rect x="18" y="115" width="118" height="60" rx="6" fill="#16213e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="77" y="133" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="monospace">Gerente</text>
  <text x="77" y="148" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">- equipo: List</text>
  <text x="77" y="163" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">+ liderar(): void</text>
  <rect x="184" y="115" width="118" height="60" rx="6" fill="#16213e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="243" y="133" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="monospace">Desarrollador</text>
  <text x="243" y="148" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">- lenguaje: String</text>
  <text x="243" y="163" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">+ programar(): void</text>
  <text x="160" y="185" text-anchor="middle" fill="#475569" font-size="9" font-family="monospace">Hereda nombre + trabajar()</text>
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
      diagram: `<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="320" height="190" fill="#1e2030" rx="8"/>
  <!-- Array -->
  <text x="10" y="30" fill="#94a3b8" font-size="10" font-family="monospace">Animal[] animales = {</text>
  <rect x="10" y="38" width="60" height="28" rx="4" fill="#831843" stroke="#ec4899" stroke-width="1.5"/>
  <text x="40" y="56" text-anchor="middle" fill="#f9a8d4" font-size="10" font-family="monospace">Perro</text>
  <rect x="80" y="38" width="60" height="28" rx="4" fill="#831843" stroke="#ec4899" stroke-width="1.5"/>
  <text x="110" y="56" text-anchor="middle" fill="#f9a8d4" font-size="10" font-family="monospace">Gato</text>
  <rect x="150" y="38" width="60" height="28" rx="4" fill="#831843" stroke="#ec4899" stroke-width="1.5"/>
  <text x="180" y="56" text-anchor="middle" fill="#f9a8d4" font-size="10" font-family="monospace">Vaca</text>
  <text x="216" y="57" fill="#94a3b8" font-size="10" font-family="monospace">}</text>
  <!-- Arrow -->
  <text x="100" y="88" text-anchor="middle" fill="#ec4899" font-size="18">↓</text>
  <text x="170" y="88" fill="#94a3b8" font-size="9" font-family="monospace">a.hacerSonido()</text>
  <!-- Results -->
  <rect x="10" y="100" width="88" height="30" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
  <text x="54" y="119" text-anchor="middle" fill="#a5b4fc" font-size="10" font-family="monospace">"¡Guau!"</text>
  <rect x="108" y="100" width="88" height="30" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
  <text x="152" y="119" text-anchor="middle" fill="#a5b4fc" font-size="10" font-family="monospace">"¡Miau!"</text>
  <rect x="206" y="100" width="88" height="30" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
  <text x="250" y="119" text-anchor="middle" fill="#a5b4fc" font-size="10" font-family="monospace">"¡Muuu!"</text>
  <!-- Lines from array to results -->
  <line x1="40" y1="66" x2="54" y2="100" stroke="#ec4899" stroke-width="1" stroke-dasharray="3"/>
  <line x1="110" y1="66" x2="152" y2="100" stroke="#ec4899" stroke-width="1" stroke-dasharray="3"/>
  <line x1="180" y1="66" x2="250" y2="100" stroke="#ec4899" stroke-width="1" stroke-dasharray="3"/>
  <!-- Loop -->
  <text x="10" y="152" fill="#94a3b8" font-size="9" font-family="monospace">for (Animal a : animales) {</text>
  <text x="20" y="165" fill="#ec4899" font-size="9" font-family="monospace">  a.hacerSonido(); // diferente en cada uno</text>
  <text x="10" y="178" fill="#94a3b8" font-size="9" font-family="monospace">}</text>
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
  ],
};
