import type { ExamQuestion, WeekContent } from "./week1";

export const week4: WeekContent = {
  week: 4,
  title: "Seguridad · Spring Security + JWT",
  description:
    "Protege tu API REST con Spring Security 6: autenticación con JWT, filtros personalizados, sesiones STATELESS y roles.",
  exercises: [
    // ── 1. JWT structure ─────────────────────────────────────────────────────
    {
      id: "jwt",
      title: "JWT — Header, Payload, Signature",
      concept: "jwt",
      conceptLabel: "Autenticación",
      conceptColor: "#f97316",
      explanation: `<p>Un <strong>JSON Web Token (JWT)</strong> es una cadena firmada que transporta la identidad del usuario entre cliente y servidor sin necesidad de sesión en memoria.</p>
<h3>Estructura</h3>
<ul>
<li><strong>Header</strong> — algoritmo de firma (<code>HS256</code>) y tipo (<code>JWT</code>).</li>
<li><strong>Payload</strong> — <em>claims</em>: <code>sub</code>, <code>name</code>, <code>admin</code>, <code>exp</code>, etc.</li>
<li><strong>Signature</strong> — <code>HMACSHA256(base64(header) + "." + base64(payload), secret)</code>.</li>
</ul>
<h3>Uso en HTTP</h3>
<p>El cliente envía el token en cada petición protegida:</p>
<pre><code>Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...</code></pre>
<p>El servidor valida la firma con su clave secreta — si coincide, confía en los claims y no consulta la base de datos por la sesión.</p>`,
      analogy:
        "🎫 Un JWT es como un boleto firmado por el estadio: cualquier portero (endpoint) puede validar la firma sin llamar a la taquilla (base de datos).",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <rect x="20" y="40" width="120" height="120" rx="8" fill="#f9731622" stroke="#f97316" stroke-width="1.5"/>
  <text x="80" y="58" fill="#fb923c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">HEADER</text>
  <text x="30" y="80" fill="#fdba74" font-size="8" font-family="monospace">{</text>
  <text x="30" y="94" fill="#fdba74" font-size="8" font-family="monospace"> "alg":"HS256",</text>
  <text x="30" y="108" fill="#fdba74" font-size="8" font-family="monospace"> "typ":"JWT"</text>
  <text x="30" y="122" fill="#fdba74" font-size="8" font-family="monospace">}</text>
  <rect x="150" y="40" width="120" height="120" rx="8" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="210" y="58" fill="#a78bfa" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">PAYLOAD</text>
  <text x="160" y="80" fill="#c4b5fd" font-size="8" font-family="monospace">{</text>
  <text x="160" y="94" fill="#c4b5fd" font-size="8" font-family="monospace"> "sub":"123",</text>
  <text x="160" y="108" fill="#c4b5fd" font-size="8" font-family="monospace"> "name":"Ana",</text>
  <text x="160" y="122" fill="#c4b5fd" font-size="8" font-family="monospace"> "admin":true</text>
  <text x="160" y="136" fill="#c4b5fd" font-size="8" font-family="monospace">}</text>
  <rect x="280" y="40" width="120" height="120" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="340" y="58" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">SIGNATURE</text>
  <text x="290" y="84" fill="#6ee7b7" font-size="7" font-family="monospace">HMACSHA256(</text>
  <text x="290" y="98" fill="#6ee7b7" font-size="7" font-family="monospace"> b64(header)+"."+</text>
  <text x="290" y="112" fill="#6ee7b7" font-size="7" font-family="monospace"> b64(payload),</text>
  <text x="290" y="126" fill="#6ee7b7" font-size="7" font-family="monospace"> secret)</text>
  <text x="210" y="186" fill="#64748b" font-size="9" font-family="sans-serif" text-anchor="middle">header.payload.signature</text>
</svg>`,
      starterCode: `import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtDemo {
    public static void main(String[] args) {
        // TODO: genera una clave segura para HS256
        Key key = null;

        // TODO: construye el JWT con:
        //   subject = "1234567890"
        //   claim "name"  = "John Doe"
        //   claim "admin" = true
        //   issuedAt = ahora
        //   expiration = ahora + 1 hora
        String jwt = null;

        System.out.println("TOKEN: " + jwt);
    }
}`,
      solution: `import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtDemo {
    public static void main(String[] args) {
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String jwt = Jwts.builder()
            .setSubject("1234567890")
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 3600_000))
            .claim("name", "John Doe")
            .claim("admin", true)
            .signWith(key)
            .compact();

        System.out.println("TOKEN: " + jwt);
    }
}`,
      hint: "Usa Keys.secretKeyFor(SignatureAlgorithm.HS256) y Jwts.builder().setSubject(...).claim(...).signWith(key).compact().",
      expectedOutput: "TOKEN: eyJhbGciOiJIUzI1NiJ9...",
    },

    // ── 2. SecurityFilterChain ───────────────────────────────────────────────
    {
      id: "filter-chain",
      title: "SecurityFilterChain (Spring Security 6)",
      concept: "security",
      conceptLabel: "Spring Security",
      conceptColor: "#ef4444",
      explanation: `<p>A partir de <strong>Spring Security 6</strong>, <code>WebSecurityConfigurerAdapter</code> fue eliminado. La configuración ahora se declara con un bean de tipo <code>SecurityFilterChain</code> usando un enfoque funcional con <em>lambdas</em>.</p>
<h3>Elementos clave</h3>
<ul>
<li><code>csrf().disable()</code> — en APIs REST el CSRF se desactiva (no hay formularios con cookie).</li>
<li><code>authorizeHttpRequests</code> — define qué rutas son públicas y cuáles requieren auth.</li>
<li><code>sessionCreationPolicy(STATELESS)</code> — sin sesión HTTP: cada request se autentica con el JWT.</li>
<li><code>addFilterBefore(...)</code> — engancha un filtro propio antes del <code>UsernamePasswordAuthenticationFilter</code>.</li>
</ul>`,
      analogy:
        "🛂 El SecurityFilterChain es la cadena de controles en un aeropuerto: cada request pasa por los mismos puestos (filtros) en el mismo orden antes de entrar al controller.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <rect x="14" y="78" width="72" height="44" rx="6" fill="#ef444422" stroke="#ef4444" stroke-width="1.2"/>
  <text x="50" y="104" fill="#fca5a5" font-size="9" font-family="monospace" text-anchor="middle">HTTP req</text>
  <line x1="86" y1="100" x2="108" y2="100" stroke="#64748b" stroke-width="1.5"/>
  <rect x="108" y="78" width="86" height="44" rx="6" fill="#f9731622" stroke="#f97316" stroke-width="1.2"/>
  <text x="151" y="96" fill="#fdba74" font-size="8" font-family="monospace" text-anchor="middle">JwtFilter</text>
  <text x="151" y="110" fill="#fdba74" font-size="7" font-family="monospace" text-anchor="middle">(addFilterBefore)</text>
  <line x1="194" y1="100" x2="216" y2="100" stroke="#64748b" stroke-width="1.5"/>
  <rect x="216" y="78" width="98" height="44" rx="6" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="1.2"/>
  <text x="265" y="96" fill="#c4b5fd" font-size="8" font-family="monospace" text-anchor="middle">UsernamePwd</text>
  <text x="265" y="110" fill="#c4b5fd" font-size="8" font-family="monospace" text-anchor="middle">AuthFilter</text>
  <line x1="314" y1="100" x2="336" y2="100" stroke="#64748b" stroke-width="1.5"/>
  <rect x="336" y="78" width="70" height="44" rx="6" fill="#10b98122" stroke="#10b981" stroke-width="1.2"/>
  <text x="371" y="104" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">Controller</text>
  <text x="210" y="40" fill="#ef4444" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="700">SecurityFilterChain</text>
  <text x="210" y="160" fill="#64748b" font-size="8" font-family="sans-serif" text-anchor="middle">STATELESS · csrf off · /api/auth/** permitAll · resto authenticated</text>
</svg>`,
      starterCode: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    // TODO: inyectar tu filtro JWT y el authenticationEntryPoint

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // TODO:
        //  1) deshabilitar CSRF
        //  2) permitAll() para /api/auth/**, el resto authenticated()
        //  3) política de sesión STATELESS
        //  4) addFilterBefore del filtro JWT
        return http.build();
    }
}`,
      solution: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter requestFilter;
    private final JwtAuthEntryPoint authenticationEntryPoint;

    public SecurityConfig(JwtAuthFilter f, JwtAuthEntryPoint ep) {
        this.requestFilter = f;
        this.authenticationEntryPoint = ep;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
          .csrf(csrf -> csrf.disable())
          .authorizeHttpRequests(auth -> auth
              .requestMatchers("/api/auth/**").permitAll()
              .anyRequest().authenticated()
          )
          .exceptionHandling(ex -> ex.authenticationEntryPoint(authenticationEntryPoint))
          .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}`,
      hint: "En Spring Security 6 todo se declara dentro del bean SecurityFilterChain con lambdas: csrf, authorizeHttpRequests, sessionManagement. Recuerda STATELESS para JWT.",
      expectedOutput: "SecurityFilterChain configurado · STATELESS · /api/auth/** público",
    },

    // ── 3. Validar JWT ───────────────────────────────────────────────────────
    {
      id: "parse-jwt",
      title: "Validar un JWT con JwtParser",
      concept: "jwt-parse",
      conceptLabel: "Autenticación",
      conceptColor: "#0ea5e9",
      explanation: `<p>Para validar un token entrante, Spring llama al parser con la misma clave secreta. Si la firma no coincide o el token expiró, la librería lanza una excepción y la request se rechaza con <code>401 Unauthorized</code>.</p>
<h3>Pasos</h3>
<ol>
<li>Leer el header <code>Authorization: Bearer &lt;token&gt;</code>.</li>
<li>Construir la clave con <code>Keys.hmacShaKeyFor(secret.getBytes(UTF_8))</code>.</li>
<li>Parsear con <code>Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)</code>.</li>
<li>Leer los <em>claims</em> (<code>sub</code>, <code>name</code>, <code>admin</code>, etc.).</li>
</ol>`,
      analogy:
        "🔐 Validar es pasar el boleto por el lector: si la firma no coincide con la del estadio (secret), no entras.",
      diagram: `<svg viewBox="0 0 420 190" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="190" fill="#13141f" rx="10"/>
  <rect x="20" y="40" width="150" height="110" rx="8" fill="#0ea5e922" stroke="#0ea5e9" stroke-width="1.4"/>
  <text x="95" y="60" fill="#7dd3fc" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">Token entrante</text>
  <text x="28" y="82" fill="#bae6fd" font-size="7" font-family="monospace">Authorization: Bearer</text>
  <text x="28" y="96" fill="#bae6fd" font-size="7" font-family="monospace">eyJhbGciOiJIUzI1NiJ9...</text>
  <line x1="170" y1="95" x2="200" y2="95" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrP)"/>
  <defs>
    <marker id="arrP" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="210" y="40" width="180" height="110" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.4"/>
  <text x="300" y="60" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">Jwts.parserBuilder()</text>
  <text x="220" y="82" fill="#a7f3d0" font-size="7" font-family="monospace">.setSigningKey(key)</text>
  <text x="220" y="96" fill="#a7f3d0" font-size="7" font-family="monospace">.build()</text>
  <text x="220" y="110" fill="#a7f3d0" font-size="7" font-family="monospace">.parseClaimsJws(token)</text>
  <text x="220" y="128" fill="#fca5a5" font-size="7" font-family="monospace">→ Claims | Exception</text>
  <text x="210" y="178" fill="#64748b" font-size="8" font-family="sans-serif" text-anchor="middle">firma inválida ⇒ 401 Unauthorized</text>
</svg>`,
      starterCode: `import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import io.jsonwebtoken.security.Keys;

public class JwtValidator {
    public static void main(String[] args) {
        String secret = "my-super-secret-key-that-is-at-least-256-bits!!";
        String token  = "eyJhbGciOiJIUzI1NiJ9..."; // token recibido

        // TODO: construir Key con hmacShaKeyFor(secret.getBytes(UTF_8))
        Key key = null;

        // TODO: parsear el token y obtener los Claims
        Claims claims = null;

        System.out.println("sub  = " + claims.getSubject());
        System.out.println("name = " + claims.get("name", String.class));
        System.out.println("admin= " + claims.get("admin", Boolean.class));
    }
}`,
      solution: `import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import io.jsonwebtoken.security.Keys;

public class JwtValidator {
    public static void main(String[] args) {
        String secret = "my-super-secret-key-that-is-at-least-256-bits!!";
        String token  = "eyJhbGciOiJIUzI1NiJ9...";

        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();

        System.out.println("sub  = " + claims.getSubject());
        System.out.println("name = " + claims.get("name", String.class));
        System.out.println("admin= " + claims.get("admin", Boolean.class));
    }
}`,
      hint: "Usa Keys.hmacShaKeyFor con el secret en UTF-8. parseClaimsJws(token).getBody() devuelve los Claims.",
      expectedOutput: "sub  = 1234567890\nname = John Doe\nadmin= true",
    },

    // ── 4. Pruebas unitarias con Mockito ─────────────────────────────────────
    {
      id: "mockito",
      title: "Pruebas unitarias con Mockito",
      concept: "testing",
      conceptLabel: "Calidad",
      conceptColor: "#eab308",
      explanation: `<p>Las pruebas unitarias verifican la <strong>lógica del servicio</strong> sin tocar la base de datos. <strong>Mockito</strong> simula el repositorio JPA devolviendo lo que necesitas para cada caso.</p>
<h3>Anotaciones clave</h3>
<ul>
<li><code>@Mock</code> — crea un <em>stub</em> del repositorio.</li>
<li><code>@InjectMocks</code> — inyecta los mocks en el servicio bajo prueba.</li>
<li><code>when(...).thenReturn(...)</code> — programa la respuesta del mock.</li>
<li><code>verify(...)</code> — comprueba que se llamó al método esperado.</li>
</ul>`,
      analogy:
        "🧪 Mockito es un doble de riesgo: no usas la base de datos real, usas un actor que responde lo que tú le indicas para el ensayo.",
      diagram: `<svg viewBox="0 0 420 190" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="190" fill="#13141f" rx="10"/>
  <rect x="20" y="50" width="120" height="90" rx="8" fill="#eab30822" stroke="#eab308" stroke-width="1.4"/>
  <text x="80" y="72" fill="#fde047" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">ProductoService</text>
  <text x="30" y="94" fill="#fef08a" font-size="8" font-family="monospace">@InjectMocks</text>
  <text x="30" y="108" fill="#fef08a" font-size="8" font-family="monospace">listar()</text>
  <text x="30" y="122" fill="#fef08a" font-size="8" font-family="monospace">crear(p)</text>
  <line x1="140" y1="95" x2="170" y2="95" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrM)"/>
  <defs>
    <marker id="arrM" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="180" y="50" width="140" height="90" rx="8" fill="#0ea5e922" stroke="#0ea5e9" stroke-width="1.4"/>
  <text x="250" y="72" fill="#7dd3fc" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">ProductoRepo</text>
  <text x="190" y="94" fill="#bae6fd" font-size="8" font-family="monospace">@Mock</text>
  <text x="190" y="108" fill="#bae6fd" font-size="8" font-family="monospace">when(findAll())</text>
  <text x="190" y="122" fill="#bae6fd" font-size="8" font-family="monospace">.thenReturn(list)</text>
  <rect x="330" y="50" width="72" height="90" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.4"/>
  <text x="366" y="98" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">verify()</text>
  <text x="210" y="170" fill="#64748b" font-size="8" font-family="sans-serif" text-anchor="middle">Sin tocar PostgreSQL — solo la lógica del servicio</text>
</svg>`,
      starterCode: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock ProductoRepository repo;
    @InjectMocks ProductoService service;

    @Test
    void listar_devuelveProductosDelRepo() {
        // TODO:
        //  1) cuando repo.findAll() sea llamado → devolver [Laptop, Mouse]
        //  2) llamar service.listar()
        //  3) afirmar size == 2
        //  4) verificar que findAll() se invocó exactamente 1 vez
    }
}`,
      solution: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock ProductoRepository repo;
    @InjectMocks ProductoService service;

    @Test
    void listar_devuelveProductosDelRepo() {
        when(repo.findAll()).thenReturn(List.of(
            new Producto(1L, "Laptop", 2499.0),
            new Producto(2L, "Mouse",   89.0)
        ));

        List<Producto> result = service.listar();

        assertEquals(2, result.size());
        verify(repo, times(1)).findAll();
    }
}`,
      hint: "Usa when(repo.findAll()).thenReturn(List.of(...)) y verify(repo, times(1)).findAll() al final.",
      expectedOutput: "Test passed · findAll() invocado 1 vez",
    },
  ],
  exam: [
    {
      id: 1,
      text: "En Spring Security 6, ¿cómo se declara la configuración de seguridad?",
      options: [
        "Extendiendo WebSecurityConfigurerAdapter",
        "Con un bean @Bean SecurityFilterChain usando lambdas",
        "Con @EnableGlobalMethodSecurity solamente",
        "Editando el application.properties",
      ],
      correctAnswer: 1,
      explanation:
        "A partir de Spring Security 6, WebSecurityConfigurerAdapter fue eliminado. La configuración se declara con un bean SecurityFilterChain y expresiones lambda.",
      category: "Spring Security",
    },
    {
      id: 2,
      text: "¿Qué política de sesión corresponde a una API REST con JWT?",
      options: ["ALWAYS", "IF_REQUIRED", "NEVER", "STATELESS"],
      correctAnswer: 3,
      explanation:
        "STATELESS indica a Spring que no cree ni consulte la HttpSession: cada request trae su propio JWT y se autentica de forma independiente.",
      category: "Spring Security",
    },
    {
      id: 3,
      text: "¿Cuáles son las tres partes de un JWT separadas por puntos?",
      options: [
        "user.password.token",
        "header.payload.signature",
        "iss.aud.exp",
        "alg.key.hash",
      ],
      correctAnswer: 1,
      explanation:
        "Un JWT tiene la forma header.payload.signature, cada parte codificada en Base64URL y la firma calculada con HMAC sobre header+payload.",
      category: "JWT",
    },
    {
      id: 4,
      text: "¿Cómo envía el cliente el JWT al servidor en cada petición protegida?",
      options: [
        "Como query string ?token=...",
        "En el header Authorization: Bearer <token>",
        "En una cookie HttpOnly obligatoriamente",
        "En el body JSON de cada POST",
      ],
      correctAnswer: 1,
      explanation:
        "La convención estándar es el header HTTP 'Authorization: Bearer <jwt>'. Spring Security lo extrae y valida en un filtro antes de llegar al controller.",
      category: "JWT",
    },
    {
      id: 5,
      text: "En Mockito, ¿para qué sirve @InjectMocks?",
      options: [
        "Inyecta mocks en el contexto de Spring",
        "Crea un doble vacío de la clase",
        "Inyecta los @Mock declarados dentro del objeto bajo prueba",
        "Reemplaza @Autowired en pruebas de integración",
      ],
      correctAnswer: 2,
      explanation:
        "@InjectMocks crea una instancia real de la clase bajo prueba y le inyecta automáticamente los campos marcados con @Mock.",
      category: "Testing",
    },
    {
      id: 6,
      text: "¿Por qué se suele deshabilitar CSRF (csrf().disable()) en una API REST con JWT?",
      options: [
        "Porque CSRF no existe en Spring Security 6",
        "Porque el JWT ya firma cada request y no usamos sesión con cookies",
        "Porque CSRF ralentiza la aplicación",
        "Porque Spring lo hace automáticamente",
      ],
      correctAnswer: 1,
      explanation:
        "CSRF protege formularios que dependen de la cookie de sesión. Al usar JWT en el header Authorization y sesión STATELESS no hay cookie automática que explotar, por lo que la protección CSRF deja de tener sentido.",
      category: "Spring Security",
    },
  ] as ExamQuestion[],
  recursos: [
    {
      title: "Teoría — Web Services Security (JWT + Spring Security)",
      description:
        "Diapositivas oficiales de la semana 4: flujo JWT, SecurityFilterChain, generación y validación de tokens, pruebas unitarias con Mockito.",
      filename: "semana-4/S4-SEC.pdf",
      password: "semana04",
      fileLabel: "S4-SEC.pdf · 3.8 MB",
    },
    {
      title: "Taller — APIs REST con Spring Boot + Swagger",
      description:
        "Guía paso a paso para montar una API REST con datos en memoria, documentarla con Springdoc OpenAPI y probarla desde Swagger UI.",
      filename: "semana-4/S4-TA1.pdf",
      password: "semana04",
      fileLabel: "S4-TA1.pdf · 280 KB",
    },
    {
      title: "Taller — Pruebas unitarias con Mockito sobre Spring Data JPA",
      description:
        "Ejemplo completo de pruebas de servicio con JUnit 5 y Mockito: mocks del repositorio, @InjectMocks, when().thenReturn(), verify().",
      filename: "semana-4/S4-TA3.pdf",
      password: "semana04",
      fileLabel: "S4-TA3.pdf · 3.9 MB",
    },
  ],
};
