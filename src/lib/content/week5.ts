import type { ExamQuestion, WeekContent } from "./week1";

export const week5: WeekContent = {
  week: 5,
  title: "Cloud Computing · Despliegue en la nube",
  description:
    "Cloud Computing aplicado al backend: modelos de servicio (IaaS, PaaS, SaaS), modelos de despliegue, escalabilidad, y cómo desplegar una API Spring Boot en la nube.",
  exercises: [
    {
      id: "modelos-servicio",
      title: "Modelos de servicio: IaaS, PaaS, SaaS",
      concept: "modelos",
      conceptLabel: "Cloud",
      conceptColor: "#0ea5e9",
      explanation: `<p>El Cloud Computing es la provisión de recursos informáticos bajo demanda a través de Internet. Los proveedores ofrecen tres niveles de abstracción según cuánto del stack te gestionen ellos:</p>
<h3>Las tres capas</h3>
<ul>
<li><strong>IaaS</strong> (Infraestructura como Servicio): te dan máquinas virtuales, redes, almacenamiento. Tú instalas el SO, runtimes, base de datos. Ejemplos: <code>AWS EC2</code>, <code>Google Compute Engine</code>, <code>Azure VMs</code>.</li>
<li><strong>PaaS</strong> (Plataforma como Servicio): te dan ya el runtime listo (Java, Node, etc.). Tú subes tu .jar y ellos lo corren. Ejemplos: <code>AWS Elastic Beanstalk</code>, <code>Heroku</code>, <code>Google App Engine</code>, <code>Render</code>, <code>Railway</code>.</li>
<li><strong>SaaS</strong> (Software como Servicio): la aplicación ya está construida y la consumes. Ejemplos: <code>Gmail</code>, <code>Notion</code>, <code>Slack</code>.</li>
</ul>
<h3>¿Cuál usar para tu API Spring Boot?</h3>
<p>Para clase y proyectos pequeños, PaaS es el más cómodo: subes el <code>.jar</code> o conectas el repo de GitHub y la plataforma se encarga del resto. Para producción a escala, IaaS te da más control pero requiere DevOps.</p>`,
      analogy:
        "🍕 IaaS es alquilar la cocina vacía. PaaS es alquilar la cocina con horno listo. SaaS es ordenar la pizza ya hecha.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <rect x="20" y="40" width="120" height="120" rx="8" fill="#0ea5e922" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="80" y="60" fill="#7dd3fc" font-size="11" font-family="monospace" text-anchor="middle" font-weight="700">IaaS</text>
  <text x="80" y="78" fill="#bae6fd" font-size="8" font-family="monospace" text-anchor="middle">VM, red, disco</text>
  <text x="80" y="92" fill="#bae6fd" font-size="8" font-family="monospace" text-anchor="middle">EC2 · GCE</text>
  <text x="80" y="110" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">tú gestionas:</text>
  <text x="80" y="124" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">SO + runtime</text>
  <text x="80" y="138" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">+ app</text>
  <rect x="150" y="40" width="120" height="120" rx="8" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="210" y="60" fill="#6ee7b7" font-size="11" font-family="monospace" text-anchor="middle" font-weight="700">PaaS</text>
  <text x="210" y="78" fill="#a7f3d0" font-size="8" font-family="monospace" text-anchor="middle">Plataforma</text>
  <text x="210" y="92" fill="#a7f3d0" font-size="8" font-family="monospace" text-anchor="middle">Beanstalk · Render</text>
  <text x="210" y="110" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">tú gestionas:</text>
  <text x="210" y="124" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">solo app</text>
  <rect x="280" y="40" width="120" height="120" rx="8" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="340" y="60" fill="#c4b5fd" font-size="11" font-family="monospace" text-anchor="middle" font-weight="700">SaaS</text>
  <text x="340" y="78" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">Software listo</text>
  <text x="340" y="92" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">Gmail · Notion</text>
  <text x="340" y="110" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">tú gestionas:</text>
  <text x="340" y="124" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">nada técnico</text>
  <text x="210" y="190" fill="#64748b" font-size="9" font-family="sans-serif" text-anchor="middle">Más control ←  IaaS · PaaS · SaaS  → Menos esfuerzo</text>
</svg>`,
      starterCode: `// application-prod.properties — configuración para despliegue en la nube

// TODO: configurar variables de entorno en lugar de hardcodear valores

// URL de la base de datos (la plataforma la inyectará como variable de entorno)
spring.datasource.url=__COMPLETAR__

// Usuario y contraseña vienen de variables de entorno (no se commiten)
spring.datasource.username=__COMPLETAR__
spring.datasource.password=__COMPLETAR__

// Puerto: la plataforma típicamente lo asigna vía la variable PORT
server.port=__COMPLETAR__

// Hibernate en producción: validate (no update). El esquema ya existe.
spring.jpa.hibernate.ddl-auto=__COMPLETAR__`,
      solution: `# application-prod.properties — configuración para despliegue en la nube

# Las variables \${VAR} las resuelve Spring leyendo el ambiente.
# La plataforma (Render, Beanstalk, Heroku) las inyecta automáticamente.

spring.datasource.url=\${DATABASE_URL}
spring.datasource.username=\${DATABASE_USER}
spring.datasource.password=\${DATABASE_PASSWORD}

# Puerto dinámico: la plataforma asigna PORT al arrancar el contenedor
server.port=\${PORT:8080}

# En producción NO usamos update, validamos que el esquema concuerde.
spring.jpa.hibernate.ddl-auto=validate

# Logs solo a INFO en producción (no DEBUG)
logging.level.root=INFO`,
      hint: "Usa la sintaxis \${VARIABLE} para que Spring Boot lea las variables de entorno. Para el puerto, \${PORT:8080} significa 'usa PORT si existe, si no usa 8080'.",
      expectedOutput:
        "spring.datasource.url=${DATABASE_URL}\nserver.port=${PORT:8080}\nspring.jpa.hibernate.ddl-auto=validate",
    },

    {
      id: "dockerfile",
      title: "Dockerfile para una app Spring Boot",
      concept: "docker",
      conceptLabel: "Containers",
      conceptColor: "#06b6d4",
      explanation: `<p>Un <strong>contenedor</strong> empaqueta tu aplicación con todo lo que necesita para correr (JDK, librerías, configuración). Eso garantiza que se comporta igual en tu laptop, en el servidor de tu compañero y en la nube.</p>
<h3>¿Por qué Docker?</h3>
<ul>
<li>Consistencia: "funciona en mi máquina" deja de ser excusa.</li>
<li>Portabilidad: el mismo contenedor corre en AWS, Render, Railway, tu laptop.</li>
<li>Aislamiento: una app no contamina a otra.</li>
</ul>
<h3>Anatomía de un Dockerfile</h3>
<p>Un Dockerfile es la receta para construir la imagen del contenedor. Las instrucciones se ejecutan de arriba a abajo y cada una crea una capa cacheable.</p>`,
      analogy:
        "📦 Un contenedor es como una caja de mudanza: tu app y todas sus pertenencias adentro, lista para abrirse igual en cualquier casa nueva.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <rect x="40" y="40" width="340" height="120" rx="8" fill="#06b6d422" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="210" y="58" fill="#67e8f9" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">Container Spring Boot</text>
  <rect x="60" y="70" width="120" height="30" rx="4" fill="#13141f" stroke="#0e7490" stroke-width="1"/>
  <text x="120" y="89" fill="#a5f3fc" font-size="9" font-family="monospace" text-anchor="middle">FROM eclipse-temurin:17</text>
  <rect x="60" y="105" width="120" height="30" rx="4" fill="#13141f" stroke="#0e7490" stroke-width="1"/>
  <text x="120" y="124" fill="#a5f3fc" font-size="9" font-family="monospace" text-anchor="middle">COPY app.jar</text>
  <rect x="200" y="70" width="160" height="65" rx="4" fill="#13141f" stroke="#0e7490" stroke-width="1"/>
  <text x="280" y="90" fill="#67e8f9" font-size="9" font-family="monospace" text-anchor="middle">tu API</text>
  <text x="280" y="106" fill="#a5f3fc" font-size="8" font-family="monospace" text-anchor="middle">java -jar app.jar</text>
  <text x="280" y="122" fill="#a5f3fc" font-size="8" font-family="monospace" text-anchor="middle">EXPOSE 8080</text>
  <text x="210" y="180" fill="#64748b" font-size="9" font-family="sans-serif" text-anchor="middle">El contenedor empaqueta JDK + tu app.jar y la corre igual en cualquier lugar</text>
</svg>`,
      starterCode: `# Dockerfile - construye la imagen de tu app Spring Boot

# TODO: imagen base con Java 17
FROM __COMPLETAR__

# TODO: directorio de trabajo dentro del contenedor
WORKDIR __COMPLETAR__

# TODO: copiar el .jar generado por Maven al contenedor
COPY target/*.jar __COMPLETAR__

# TODO: declarar el puerto que expone la app
EXPOSE __COMPLETAR__

# TODO: comando que arranca la app cuando el contenedor inicia
ENTRYPOINT __COMPLETAR__`,
      solution: `# Dockerfile - construye la imagen de tu app Spring Boot

# Imagen base oficial con Java 17 (versión slim, más liviana)
FROM eclipse-temurin:17-jre-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el .jar generado por Maven al contenedor
COPY target/*.jar app.jar

# Puerto en el que escucha Spring Boot (informativo)
EXPOSE 8080

# Comando que arranca la app cuando el contenedor inicia
ENTRYPOINT ["java", "-jar", "app.jar"]`,
      hint: "Imagen base recomendada: eclipse-temurin:17-jre-alpine (Java 17, ligera). El comando final es ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"].",
      expectedOutput:
        "FROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nCOPY target/*.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]",
    },

    {
      id: "escalabilidad",
      title: "Escalado horizontal vs vertical",
      concept: "escalado",
      conceptLabel: "Cloud",
      conceptColor: "#a855f7",
      explanation: `<p>Cuando tu API empieza a recibir más tráfico del que un servidor solo puede manejar, hay dos formas de escalarla:</p>
<h3>Escalado vertical (scale up)</h3>
<p>Le pones más recursos al mismo servidor: más RAM, más CPU. Es simple pero tiene límite físico y suele costar más por GB/CPU adicional.</p>
<h3>Escalado horizontal (scale out)</h3>
<p>Pones varias instancias del mismo servidor en paralelo y un <strong>balanceador de carga</strong> distribuye las peticiones entre ellas. Es lo que usan Netflix, Spotify, etc.</p>
<h3>¿Qué requiere el escalado horizontal en una API Spring Boot?</h3>
<ul>
<li><strong>Stateless</strong>: no guardar sesión en memoria del servidor (usa JWT, no <code>HttpSession</code>).</li>
<li><strong>BD compartida</strong>: todas las instancias apuntan a la misma base de datos.</li>
<li><strong>Configuración por ambiente</strong>: misma imagen Docker, distinta configuración por variables de entorno.</li>
</ul>`,
      analogy:
        "🍔 Vertical: comprarle al cocinero un horno más grande. Horizontal: contratar más cocineros con el mismo horno.",
      diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
  <rect width="420" height="200" fill="#13141f" rx="10"/>
  <text x="105" y="30" fill="#fb923c" font-size="10" font-family="sans-serif" text-anchor="middle" font-weight="700">Vertical (scale up)</text>
  <rect x="55" y="40" width="100" height="40" rx="6" fill="#fb923c22" stroke="#fb923c" stroke-width="1.2"/>
  <text x="105" y="64" fill="#fed7aa" font-size="9" font-family="monospace" text-anchor="middle">2 GB RAM</text>
  <text x="105" y="100" fill="#94a3b8" font-size="14" text-anchor="middle">↓</text>
  <rect x="40" y="110" width="130" height="60" rx="6" fill="#fb923c22" stroke="#fb923c" stroke-width="1.5"/>
  <text x="105" y="135" fill="#fed7aa" font-size="9" font-family="monospace" text-anchor="middle">8 GB RAM</text>
  <text x="105" y="150" fill="#fdba74" font-size="8" font-family="monospace" text-anchor="middle">+ CPU</text>
  <line x1="210" y1="20" x2="210" y2="180" stroke="#374151" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="320" y="30" fill="#a78bfa" font-size="10" font-family="sans-serif" text-anchor="middle" font-weight="700">Horizontal (scale out)</text>
  <rect x="240" y="40" width="50" height="40" rx="4" fill="#a855f722" stroke="#a855f7" stroke-width="1"/>
  <text x="265" y="64" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">App #1</text>
  <rect x="240" y="90" width="50" height="40" rx="4" fill="#a855f722" stroke="#a855f7" stroke-width="1"/>
  <text x="265" y="114" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">App #2</text>
  <rect x="240" y="140" width="50" height="40" rx="4" fill="#a855f722" stroke="#a855f7" stroke-width="1"/>
  <text x="265" y="164" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">App #3</text>
  <rect x="320" y="80" width="80" height="60" rx="6" fill="#10b98122" stroke="#10b981" stroke-width="1.5"/>
  <text x="360" y="105" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Load</text>
  <text x="360" y="120" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Balancer</text>
  <line x1="290" y1="60" x2="320" y2="100" stroke="#a855f7" stroke-width="1"/>
  <line x1="290" y1="110" x2="320" y2="110" stroke="#a855f7" stroke-width="1"/>
  <line x1="290" y1="160" x2="320" y2="120" stroke="#a855f7" stroke-width="1"/>
</svg>`,
      starterCode: `// Para que tu API pueda escalar horizontalmente, debe ser stateless.
// Configura SecurityFilterChain de Spring Security en producción.

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        // TODO: deshabilitar CSRF (no usamos cookies, usamos JWT)
        ____________

        // TODO: política de sesión: NO crear sesión en memoria del servidor
        ____________

        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        );

    return http.build();
}`,
      solution: `@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        // 1) Desactivar CSRF: con JWT no usamos cookies de sesión
        .csrf(csrf -> csrf.disable())

        // 2) Sin sesión en memoria: cada petición trae su JWT
        // Esto es CRÍTICO para escalar horizontalmente: cualquier
        // instancia puede atender la petición porque no hay
        // estado guardado en el servidor.
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        );

    return http.build();
}`,
      hint: "STATELESS es la palabra clave: con sesión en memoria solo una instancia conoce al usuario. Con JWT cualquier instancia puede validarlo.",
      expectedOutput:
        ".csrf(csrf -> csrf.disable())\n.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))",
    },
  ],
  exam: [
    {
      id: 1,
      text: "¿Cuál de los siguientes es un ejemplo de PaaS (Plataforma como Servicio)?",
      options: ["AWS EC2", "AWS Elastic Beanstalk", "Gmail", "VMware ESXi"],
      correctAnswer: 1,
      explanation:
        "Elastic Beanstalk te permite subir un .jar y la plataforma se encarga del runtime, balanceo y escalado. EC2 es IaaS (te dan la VM cruda). Gmail es SaaS.",
      category: "Cloud Computing",
    },
    {
      id: 2,
      text: "Para que una API Spring Boot pueda escalar horizontalmente con varias instancias detrás de un balanceador, ¿qué configuración es indispensable?",
      options: [
        "ddl-auto=update en producción",
        "Sesiones HTTP en memoria con HttpSession",
        "SessionCreationPolicy.STATELESS y autenticación por JWT",
        "Una conexión Wi-Fi de baja latencia",
      ],
      correctAnswer: 2,
      explanation:
        "Si guardas la sesión en memoria del servidor, cada usuario queda 'pegado' a la instancia que lo autenticó y el balanceo no funciona. STATELESS + JWT permite que cualquier instancia atienda cualquier petición.",
      category: "Cloud Computing",
    },
    {
      id: 3,
      text: "¿Cuál es la diferencia principal entre escalado vertical y horizontal?",
      options: [
        "Vertical agrega más servidores; horizontal agrega más RAM al mismo servidor",
        "Vertical agrega más RAM/CPU al mismo servidor; horizontal agrega más servidores en paralelo",
        "Vertical es para bases de datos; horizontal es para frontend",
        "Vertical y horizontal son sinónimos",
      ],
      correctAnswer: 1,
      explanation:
        "Vertical (scale up) = mejorar el mismo servidor. Horizontal (scale out) = añadir más servidores. El horizontal escala mejor porque tiene menos límite físico.",
      category: "Cloud Computing",
    },
    {
      id: 4,
      text: "En un Dockerfile para una app Spring Boot, ¿qué hace la instrucción <code>EXPOSE 8080</code>?",
      options: [
        "Hace pública la base de datos en el puerto 8080",
        "Documenta que el contenedor escucha en el puerto 8080 (informativo)",
        "Reemplaza el server.port del application.properties",
        "Bloquea todos los demás puertos por seguridad",
      ],
      correctAnswer: 1,
      explanation:
        "EXPOSE es solo metadata, no abre puertos realmente. Para publicarlos al host se usa el flag -p al correr el contenedor (docker run -p 8080:8080).",
      category: "Docker",
    },
    {
      id: 5,
      text: "En producción, ¿qué valor de spring.jpa.hibernate.ddl-auto es el más adecuado?",
      options: ["create-drop", "update", "validate", "none"],
      correctAnswer: 2,
      explanation:
        "validate verifica al arrancar que el esquema de la BD concuerda con las entidades, pero no lo modifica. update está bien para clase, pero en producción puede causar cambios no deseados.",
      category: "Despliegue",
    },
    {
      id: 6,
      text: "¿Por qué se recomienda usar variables de entorno (\\${DATABASE_URL}) en application-prod.properties en lugar de hardcodear la URL?",
      options: [
        "Porque es más rápido",
        "Para no commitear credenciales al repositorio y permitir distintos valores por ambiente",
        "Porque Spring Boot no soporta valores hardcodeados",
        "Para reducir el tamaño del .jar",
      ],
      correctAnswer: 1,
      explanation:
        "Las credenciales nunca deben quedar en el código fuente (riesgo de filtrarse en GitHub). Las variables de entorno se inyectan en runtime y permiten que dev, staging y prod usen distintas BDs sin cambiar código.",
      category: "Despliegue",
    },
  ] as ExamQuestion[],
  recursos: [
    {
      title: "Teoría — Cloud Computing (parte 1)",
      description:
        "Introducción a Cloud Computing, modelos de servicio (IaaS, PaaS, SaaS), modelos de despliegue, transformación digital.",
      filename: "semana-5/S5-CLOUD1.pdf",
      password: "semana05",
      fileLabel: "S5-CLOUD1.pdf · 1.1 MB",
    },
    {
      title: "Teoría — Cloud Computing (parte 2)",
      description:
        "Despliegue de backend en la nube, integraciones API, escalabilidad y arquitecturas serverless / microservicios.",
      filename: "semana-5/S5-CLOUD2.pdf",
      password: "semana05",
      fileLabel: "S5-CLOUD2.pdf · 1.4 MB",
    },
  ],
};
