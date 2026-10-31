# CLAUDE.md — Landing de RebelDEV

Guía para Claude Code al construir el landing de RebelDEV. Las pautas generales del proyecto (idioma, orden, privacidad) están en `../CLAUDE.md`.

- **Marca y contenido:** secciones 1 a 6.
- **Para programar** (stack, comandos, carpetas, librerías, skills y MCP): sección 7.

## Fuentes

| Fuente | Qué aporta |
|---|---|
| Página de LinkedIn de RebelDEV (texto que pegó el usuario el 23 oct 2026) | Resumen oficial, ficha y especialidades. |
| `referencias/linkedin-rebeldev.png` | Cabecera de LinkedIn (logo y banner): la referencia visual. |
| `referencias/rebeldev-mock.html` | «Brand Hub» de RebelDEV (agregado el 23 oct 2026): paleta, tipografías, logo, voz de marca y servicios. **Es la base visual, pero hay que mejorarlo**; el logo está descuadrado y se rehará más adelante. Resumen en la sección 4. |
| `referencias/mapeo-mejoras-marca.md` | Mapa de lo que hay que mejorar de la marca (23 oct 2026), en orden: logo, nombre, color (con contraste calculado), tipografía, recursos gráficos, voz y piezas derivadas. Incluye las preguntas pendientes para el usuario o Fredy. **Aquí se anotan las decisiones de marca a medida que se toman.** |
| `referencias/cuestionario-marca.md` | Respuestas de Fredy al cuestionario de marca (25 oct 2026): esencia, oferta, proceso, diferenciación, tono y límites. **Privado** (clientes, competidores y datos personales). Resumen en la sección 5. |
| `referencias/animacion-logo.html` | Galería de variantes vectoriales de animación del logo (isotipo ↔ logotipo) en GSAP, sin partículas, con pestañas. **Decidido por ahora: «Bloqueo»** (25 oct 2026). Las demás (pulso, inversión, estela, latido, halo, cinta, rotación) quedan como referencia. Se abre en el navegador (25 oct 2026). |
| `referencias/logo-rebeldev.html` | Vista visual del logo decidido (`Rebel</DEV>`) y del isotipo en cuadrado, en versión clara y oscura, con favicons a 48, 32 y 16 px. Incluye la explicación visual de las decisiones pendientes 4, 6, 7 y 13 (25 oct 2026). Se abre en el navegador. |
| `referencias/propuestas-logo.html` | Hoja visual con las propuestas de logo del 23 oct 2026: 5 isotipos, 10 logotipos, 4 sistemas y las variantes. Se abre en el navegador. El resumen y la recomendación están en la sección 8 del mapeo. |
| `referencias/webs-interesantes.md` | Las 7 webs que eligió el usuario (23 oct 2026) y qué tomar de cada una: hero y sección fija con video (Terminal Industries), pantalla de carga con el `</>` (Zentry), partículas (Philos), SVG animados (Raycast) y webs que explican su bot (Decagon, Runia). **Como inspiración, mandan sobre el benchmarking.** |
| `referencias/benchmarking-web.md` | Investigación del 23 oct 2026: webs premiadas (3D, GSAP, scroll), competencia en Perú y LATAM, huecos que aprovechar e ideas por sección. |
| `C:\Users\USUARIO\Desktop\rebeca-agent` | El software que RebelDEV está construyendo: Rebeca. Leer `README.md`, `CLAUDE.md` y `docs/v0.1-requerimientos.md`. |

**Del repositorio `rebeca-agent` solo se usa lo público:** `README.md`, `CLAUDE.md`, `docs/`, el código. Nunca usar ni mencionar `.env`, `CLAUDE.local.md`, `acuache.md`, `ROADMAP.md` ni `curso/`, que son privados.

---

## 1. Qué es RebelDEV

Estudio de desarrollo de software. Hace soluciones a medida según lo que necesita cada empresa.

**Resumen (texto oficial, copiar tal cual):**

> RebelDEV es un estudio de desarrollo de software. Creamos soluciones a medida según lo que necesita cada empresa: desde asistentes de WhatsApp y automatización de procesos hasta plataformas web, backend, APIs e integraciones.
>
> Nuestro equipo está formado por profesionales con experiencia real en ingeniería y diseño. Integramos inteligencia artificial en nuestro proceso para elevar la calidad de cada entrega y reducir los tiempos: cada proyecto se trabaja con el detalle y el criterio de un desarrollo hecho pieza por pieza, con arquitectura limpia, código sólido y listo para escalar.
>
> Primero entendemos tu negocio; después construimos la solución que realmente necesitas.
>
> Ingeniería para empresas rebeldes.

| Campo | Valor |
|---|---|
| Sector | Desarrollo de software |
| Tamaño | 2-10 empleados |
| Fundación | 2026 |
| Tipo | De financiación privada |

**Especialidades (7):** Desarrollo de software a medida · Automatización de procesos · Asistentes de WhatsApp · Plataformas web · Backend y APIs · Integraciones · Diseño UX/UI

---

## 2. El producto: agentes de WhatsApp con IA (Rebeca)

Es la prueba concreta de la especialidad «Asistentes de WhatsApp» y de la promesa de «arquitectura limpia, código sólido y listo para escalar».

- **Qué es:** una plataforma para que varios negocios tengan su propio agente de ventas y atención en WhatsApp con IA generativa. Cada negocio tiene su propia base de datos, su configuración, sus usuarios y su número de WhatsApp.
- **Nombres:** en el landing el producto se llama **RebelBot** (nombre provisional, decidido el 23 oct 2026). «Rebeca» es el nombre del bot del primer cliente y no se usa.
- **Primer cliente:** Beca Inmobiliaria. **No se nombra en el landing** (ver sección 5). El producto parte de una versión para inmobiliarias y está pensado para adaptarse a otras industrias.
- **Estado:** versión 0.1 en construcción («Fundación y Analítica»): convertirlo en un producto que sirva para varios negocios, que se pueda medir y que esté listo para lanzar.

### Qué hace (lenguaje de cliente; fuente: `README.md` de rebeca-agent)

| Capacidad | En palabras simples |
|---|---|
| Califica y registra clientes potenciales | Pregunta de forma natural qué busca el cliente, en qué plazo y cómo lo financiaría, y deja el lead registrado. Se conecta con el CRM (Odoo). |
| No inventa información | Precios, metrajes, disponibilidad y direcciones salen solo de los datos del negocio. Si falta un dato, ofrece que un asesor lo confirme. |
| Agenda visitas y llamadas | Respeta los horarios del negocio, evita las dobles reservas y envía la ubicación. Usa formularios nativos de WhatsApp. |
| Trabaja con los asesores | Deriva la conversación a una persona cuando hace falta. Si el asesor no responde a tiempo, retoma la conversación con todo el contexto. |
| Nunca deja al cliente sin respuesta | Si algo falla, se disculpa y pasa la conversación a un asesor. |
| Aprende de los asesores | Propone nuevas preguntas frecuentes a partir de lo que respondieron los asesores. Solo se agregan cuando alguien las aprueba. |
| Pide consentimiento | Pide aceptar los términos de forma explícita antes de procesar datos, de acuerdo con la Ley 29733 de protección de datos personales del Perú. |
| Panel de administración | Bandeja de conversaciones, simulador, base de conocimiento editable, citas, leads, encuestas de satisfacción (NPS), aprendizaje, usuarios y auditoría. |
| Mide resultados | Casos resueltos sin intervención humana, satisfacción, tiempos de respuesta y uso de IA. |
| Seguridad | Los secretos se guardan en una bóveda en la nube, los teléfonos se ocultan en los registros y no se guarda el contenido de los mensajes en los registros. |

### Cómo está construido (prueba de «código sólido»)

- **Tecnología:** Java 21 con Spring Boot, React con TypeScript, PostgreSQL, OpenAI, WhatsApp Cloud API y WhatsApp Flows, Microsoft Azure.
- **Arquitectura limpia** en módulos, con reglas que se verifican automáticamente.
- **Pruebas automáticas** en cada cambio, con despliegue continuo a un ambiente de pruebas antes de pasar a producción.
- **Decisiones documentadas** (ADR) y operación con alertas y monitoreo.

---

## 3. Mensajes clave (textuales)

- **Eslogan:** «Ingeniería para empresas rebeldes.» En el banner, «rebeldes.» va en rojo.
- **Titular de LinkedIn:** «Ingeniería para empresas rebeldes | Software a medida y soluciones digitales para cada negocio»
- **Promesa:** «Primero entendemos tu negocio; después construimos la solución que realmente necesitas.»
- **Diferencial:** IA integrada en el proceso para más calidad y menos tiempo, con un trabajo «pieza por pieza»: arquitectura limpia, código sólido y listo para escalar.
- **Línea de servicios del banner:** Software a medida / Automatización de procesos / Plataformas web / Integraciones (las barras van en rojo).

---

## 4. Identidad visual

Dos fuentes: la captura de LinkedIn y el mock `referencias/rebeldev-mock.html`. **El mock manda como base**, pero es un punto de partida que hay que mejorar, no un diseño final. No copiar su HTML ni su CSS: tomar las decisiones (colores, fuentes, tono) y construir con Astro y Tailwind.

### Nombre y logo

- **Nombre:** «RebelDEV» en textos.
- **Logotipo (decidido 25 oct 2026):** `Rebel</DEV>`, con «Rebel» en crema, «DEV» en crema y los signos `<`, `/`, `>` en rojo. Va solo, sin isotipo al lado. En los textos corridos se escribe «RebelDEV». El mock (`rebel‹DEV›`) y el banner de LinkedIn (`REBEL‹DEV›`) quedan como referencia, no como logo.
- **Isotipo:** dos signos `<` `>` en crema con una barra `/` roja que los corta (como `</>`). Trazos gruesos y puntas redondeadas. En LinkedIn va sobre un cuadrado negro de esquinas redondeadas.
- **El logo del mock está descuadrado y ya no se usa.** Archivos del logo (25 oct 2026) en `public/brand/`: `logotipo-oscuro.svg`, `logotipo-claro.svg` (letras convertidas a trazos desde Bricolage Grotesque 800), `isotipo-oscuro.svg` e `isotipo-claro.svg` (cuadrado con esquinas redondeadas). El favicon es `public/favicon.svg` (isotipo I-A en cuadrado oscuro). Pendiente: monocromo rojo para grabados.
- **La barra roja va siempre y siempre en rojo:** es la firma de la marca.

### Colores (del mock)

| Nombre | Color | Uso |
|---|---|---|
| Ink | `#0B0A0E` | Fondo principal |
| Surface | `#141019` | Tarjetas y bloques |
| Surface 2 | `#1D1824` | Elevación / hover |
| Rojo | `#E4121F` | Acento principal |
| Rojo vivo | `#FF2D3F` | Enlaces, foco, acentos sobre oscuro |
| Ámbar | `#FF6A2C` | Acento muy puntual |
| Bone | `#F4F0E8` | Texto principal |
| Ash | `#A7A0A8` | Texto secundario |
| Ash dim | `#7C757F` | Texto terciario, notas |

- El rojo se usa con disciplina: para marcar, no para rellenar.
- **Modo claro (24 oct 2026, a pedido del usuario):** la paleta invertida. Fondo crema `#F4F0E8`, bloques `#ECE6DB` y `#E4DDD0`, texto `#0B0A0E` (17,4:1), gris `#4F4954` (7,7:1), notas `#5B5560` (6,3:1) y rojo para texto `#C40F1B` (5,4:1). El rojo de marca `#E4121F` no cambia. **El tema oscuro sigue siendo el principal y el que sale por defecto.** El teléfono de RebelBot es oscuro en los dos temas.
- El fondo del mock lleva un brillo rojo y ámbar muy suave arriba, con degradados radiales.
- Los colores de LinkedIn (muestreados de la captura: negro `#080808`, crema `#F4F0E7`, rojo `#F43042`) son casi los mismos. Si hay duda, se usa el mock.

### Tipografía (del mock, todas gratis en Google Fonts)

| Fuente | Uso |
|---|---|
| **Bricolage Grotesque** 800 | Titulares y logotipo |
| **Instrument Sans** 400 / 600 | Texto e interfaz |
| **JetBrains Mono** 400 / 500 | Etiquetas, números de sección y detalles «de código» |

- **Recursos:** etiquetas en mayúsculas espaciadas y monoespaciadas («01 — La marca»); la barra `/` roja como separador; un chip con punto rojo brillante para el eslogan; tarjetas oscuras con borde fino y esquinas redondeadas.

### Voz de marca (del mock)

Directa, segura y sin jerga innecesaria. «Rebelde en la actitud, premium en la ejecución.» Se habla de resultados del negocio, no de tecnología por la tecnología.

- **Sí:** frases cortas y afirmativas; hablar en resultados («responde solo», «agenda sin que muevas un dedo»); confianza tranquila; un toque rebelde con criterio: retar lo establecido, nunca al cliente.
- **No:** jerga técnica sin traducir (CRM, endpoints, flujos) frente al cliente; promesas infladas o métricas inventadas; tono de agencia genérica; rebeldía de pose (groserías, gritar en mayúsculas).
- Al describir RebelBot (sección 2), traducir la jerga: por ejemplo, «se conecta con tu sistema de ventas» en vez de «CRM (Odoo)».

### Estrategia de la oferta (del mock)

- **«Casa amplia, puerta angosta»:** se vende por el asistente de WhatsApp (concreto y demostrable) y, una vez dentro, se abre la conversación al resto del software. Coincide con la versión 2 del landing (RebelBot destacado).
- Las tarjetas de servicios del mock incluyen una última, «¿Algo más?»: «Si implica software, probablemente podemos construirlo. Conversemos.»
- El mock menciona un diseño interno de landing con estas secciones: hero, servicios, fundador, preguntas frecuentes y llamada a la acción (agendar una demo).
- Los textos del mock que describen la marca («Un estudio de software construido con IA…») **no son los oficiales**. Para el resumen se usa el texto de la sección 1.

---

## 5. Decisiones y pendientes

### Decidido (23 oct 2026)

- **Tecnología: Astro 7 + Tailwind CSS 4 + GSAP + Lenis, con Bun.** Detalle en la sección 7. La estructura de páginas y versiones la define el usuario.
- **Logotipo `Rebel</DEV>` (25 oct 2026):** elegido entre `Rebel</DEV>` y `rebel</dev>`. Detalle en la sección 4.
- **Isotipo (25 oct 2026):** siempre dentro de un cuadrado, en dos versiones: clara y oscura. Muestra visual en `referencias/logo-rebeldev.html`.
- **Por ahora (25 oct 2026):** rojo de marca `#E4121F`; favicon con el isotipo I-A; puntas redondeadas; JetBrains Mono se mantiene; «rebeldes.» sin rojo (se cambiará después); ámbar `#FF6A2C` como acento.
- **Multilenguaje:** se usará el soporte de Astro para varios idiomas. Los idiomas quedan por definir.
- **Datos de prueba (25 oct 2026):** el BCP y la edad de Fredy son datos ficticios para ver el landing; se cambian por los reales después.
- **Grabados de un color (25 oct 2026):** el logo va completo, con la barra del mismo color que el resto.
- **Ámbar `#FF6A2C` (25 oct 2026):** se queda como acento.
- **Fondo liso (25 oct 2026):** negro sólido, sin grano ni degradado.
- **Varias versiones para debatir:** se harán dos o más versiones del landing para decidir qué secciones van y cuáles no. Cada versión debe poder verse por separado y compararse. Cómo se organizan dentro del proyecto lo define el usuario al armarlo.
- **Beca Inmobiliaria no se nombra:** ni su nombre, ni su logo, ni capturas del panel, ni el nombre «Rebeca» (lo delata). El producto se describe por lo que hace.
- **Contacto ficticio por ahora:** correo, WhatsApp y redes con datos de ejemplo que se vean falsos a simple vista (por ejemplo `hola@rebeldev.example` y `+51 900 000 000`). Todos en un solo lugar del código, para cambiarlos de una vez.
- **Fredy Ramos es el responsable y líder de RebelDEV** y aparece en el landing. Su información está en `../fredy-ramos.md`.
- **El agente de WhatsApp es un producto: RebelBot** (nombre provisional). Se comparan dos formas de mostrarlo:
  - **Versión 1:** como un servicio más, «Asistentes de WhatsApp», dentro de la lista de servicios.
  - **Versión 2 (la preferida):** como producto propio, RebelBot, con su sección destacada (qué hace y una llamada a pedir una demo), además de la lista de servicios.

### Cuestionario de marca (Fredy, 25 oct 2026)

Las respuestas completas están en `referencias/cuestionario-marca.md` (**privado**: tiene clientes, competidores y datos personales de Fredy). Lo que el landing puede usar:

- **Esencia:** «RebelDEV es el equipo de ingeniería que elimina la burocracia: entregamos en semanas lo que en una empresa tradicional toma meses.» La rebeldía es velocidad con calidad, no estética punk.
- **Propuesta única (versión web):** «Ingeniería de sistemas usados por millones, entregada en semanas.»
- **Oferta de entrada:** el asistente de WhatsApp con IA (responde en menos de 1 minuto, 24/7, califica, agenda visitas, hace seguimiento y registra en el CRM). Las demás líneas (plantilla inmobiliaria, panel de métricas, postventa, software a medida) tienen fecha de 2027 y **no se muestran como disponibles**.
- **Proceso (8 pasos):** diagnóstico gratis de 30 min; demo en vivo con los datos del cliente; propuesta con retorno; arranque con línea base; sprints semanales con demo cada viernes; una semana en producción a prueba antes de pagar; salida en vivo con monitoreo diario las primeras 2 semanas; revisiones a los 30, 60 y 90 días.
- **Garantías que se pueden decir:** prueba de una semana en producción antes de pagar; pago en cuotas después; revisión mensual incluida.
- **Uso de IA:** «La IA acelera, no decide.» Un ingeniero senior define la arquitectura y aprueba cada cambio. El asistente solo responde con datos del CRM y deriva a una persona ante la duda.
- **Credencial que sí se muestra:** liderazgo de sistemas de WhatsApp «usados por millones de personas», **sin nombrar a la empresa**. Frase de venta: «Lo construimos rápido con IA y lo revisan ingenieros que han hecho sistemas para millones de personas.»
- **Botón «Pruébalo»** para el bot de agendamiento propio (demo que cualquiera puede probar).
- **Tono:** tuteo por defecto. Donde el cliente decide, hablar en beneficios, sin jerga. Traducciones obligatorias: «Clean Architecture» → «Hecho para durar y crecer»; «Escalar» → «Crecer, funcionar a lo grande»; «Deuda técnica» → «Sin problemas escondidos»; «Conversacional» → «Habla como una persona»; «Retainer» → «Sin pagos mensuales eternos».
- **Sí / no visual:** titulares con beneficio, demos reales, contraste fuerte y pocas palabras. No: fotos de stock de robots, degradados neón, estética gamer, anime.
- **Referentes:** ambición de Globant, claridad de Stripe, velocidad de un equipo sin burocracia.
- **No se muestra en el landing:** competidores por nombre, nombres de clientes o productos de terceros (Beca, Rebeca Reload, Mantra), la empresa de formación, datos personales de Fredy (edad, aficiones).

**Diferencias con el cuestionario (resueltas el 25 oct 2026):**
- **Logo:** se queda `Rebel</DEV>` (L-5). La «Ruta Brackets» del cuestionario queda descartada.
- **Ámbar `#FF6A2C`:** se queda como acento, aunque el cuestionario no lo menciona.
- **Carmesí sobre obsidiana y «Brasa» `#FF2D3F`:** coinciden con la paleta actual; «Brasa» es el rojo para texto sobre oscuro.

### Pendiente

- **Video del hero «Pieza por pieza» (26 oct 2026):** el usuario lo eligió tras rechazar el del teléfono («el chatbot es solo una parte lo que hacemos realmente»). El hero habla del estudio completo y RebelBot queda en su sección. Se genera con la CLI `higgsfield` (el conector MCP no genera). En plan gratis solo funcionó Seedance 1.5 Pro (`seedance1_5`, 4 s a 720p = 4,8 créditos; a 480p = 1,2). Se generó el 26 oct 2026 en 480p (quedan 3,4 créditos), pero el usuario lo descartó: prefirió el anterior porque se ve mejor. Si se retoma, hacerlo en 720p o más. Frases del hero: «Ingeniería para empresas rebeldes.» → «Cada empresa trabaja distinto. Su software también debería.» → «Lo construimos pieza por pieza: web, automatización, integraciones y asistentes de WhatsApp.» → «Hecho para durar y crecer.»

- **Landing, primera versión (23 oct 2026):** pantalla de carga con el `</>` que se deshace en partículas y arma un `</>` grande en el hero (reacciona al ratón y se desarma al bajar). **Partículas al estilo Philos (24 oct 2026, a pedido del usuario, que no quería las de canvas 2D):** el `</>` en 3D cubierto de miles de puntos redondos y brillantes, con luz, que respiran, se inclinan hacia el ratón, se apartan con un remolino y al bajar se hacen polvo que gira; RebelBot con un teléfono fijo cuyo chat avanza por pasos; por qué es distinto; cómo se prueba cada cambio; servicios; proceso; Fredy; preguntas; contacto. Las fuentes se sirven desde el sitio (API de fuentes de Astro). Tiene modo claro con un botón en la barra (24 oct 2026): se guarda en el navegador (`rd-theme`) y el cambio entra con un barrido en diagonal con borde difuminado (View Transitions, idea del efecto «polygon-gradient» de theme-toggle.rdsx.dev; código propio porque ese repositorio no tiene licencia). Sin soporte o con «menos movimiento», cambia al instante. Pendientes de esa versión: foto de Fredy (no hay), URL de LinkedIn, «rebeldes.» en rojo o no (va sin rojo), y el SVG definitivo del logo.
- **Mejorar la marca, empezando por el logo:** el plan, los problemas detectados y las preguntas abiertas están en `referencias/mapeo-mejoras-marca.md`. El logotipo ya está elegido (`Rebel</DEV>`, L-5 en `referencias/propuestas-logo.html`).
- **Foto de Fredy (31 oct 2026):** la Versión Fina usa una foto de referencia que no es de Fredy (`public/fina/fredy-referencia.webp`), marcada «Foto de referencia». Cambiarla por la real antes de publicar.
- **Dominio y hosting.**
- **Idioma:** solo español o también inglés.

### Fredy en el landing

- **Qué sí se puede usar:** nombre, rol en RebelDEV, formación (Ingeniería de Sistemas, UNMSM), trayectoria técnica (desarrollador → arquitecto de software → líder técnico → arquitecto de tecnología → Product Owner), experiencia con chatbots e IA, y sus frases textuales de la sección 3 de `../fredy-ramos.md`.
- **Confirmar antes de usar:** nombrar al **BCP** o su cargo actual allí (lidera RebelDEV en paralelo a ese trabajo), su edad, y cualquier dato de su vida personal o familiar. En las versiones de debate pueden ir como opción, marcadas para revisar.
- Nunca inventar ni cambiar citas: se copian tal cual de la entrevista.

---

## 6. Pautas

- **Explicar, no solo decorar:** el landing no solo tiene que verse bonito, también tiene que explicar qué hace RebelDEV y por qué RebelBot es especial. Cada animación debe ayudar a entender algo (ver `referencias/webs-interesantes.md`).
- **No inventar** clientes, casos, testimonios, cifras ni miembros del equipo. Si una sección necesita esos datos y no los hay, se deja fuera o se pregunta.
- **No inventar resultados de Rebeca:** el producto todavía no tiene métricas publicadas. Se describe lo que hace, no cuánto rinde.
- **No mostrar** métricas de LinkedIn (seguidores, miembros asociados).
- **No usar en el landing** las secciones internas del mock (índice de entregables con enlaces a claude.ai y la sección «Para ti»): son material de trabajo del equipo.
- **No publicar detalles internos de Rebeca:** nombres de recursos de Azure, URLs de los ambientes, variables, códigos de defectos o historias, ni nada de los archivos privados del repositorio.
- Los textos oficiales de la sección 1 se copian tal cual; los textos nuevos deben seguir el mismo tono.
- **No nombrar al cliente** (Beca Inmobiliaria) ni a su bot (Rebeca). Ver sección 5.
- **Repositorio privado (25 oct 2026):** se usa para llenar la info y generar versiones. Al final se crea otro repositorio, limpio, también privado. Hasta entonces no hace falta excluir archivos como `referencias/cuestionario-marca.md`.
- **Carpeta limpia:** solo el proyecto Astro, `referencias/` y la configuración (`.claude/`, `.vscode/`, `skills-lock.json`). Nada de copias, borradores ni archivos sueltos.

---

## 7. Proyecto y herramientas

### Stack (creado el 23 oct 2026, a pedido del usuario)

| Pieza | Versión | Notas |
|---|---|---|
| **Astro** | 7.4 | Plantilla `minimal`. Sitio estático. |
| **Tailwind CSS** | 4.3 | Entra por el plugin de Vite en `astro.config.mjs`. No hay `tailwind.config.js`: colores y fuentes de la marca se definen en `src/styles/global.css` con `@theme`. |
| **GSAP** | 3.15 | Gratis con todos sus plugins (licencia propia de GSAP, no MIT; vale para uso comercial). |
| **Lenis** | 1.3 | Scroll suave, sincronizado con ScrollTrigger. |
| **Three.js** | 0.186 | Solo para las partículas del hero (24 oct 2026). Se carga aparte con `import()` para no frenar la página (~134 KB comprimido). |
| **Bun** | 1.3 | Gestor de paquetes. Usar `bun`/`bunx`, no `npm`/`npx`. |

### Comandos (dentro de `rebeldev-landing/`)

| Comando | Para qué |
|---|---|
| `bun install` | Instalar dependencias |
| `bun run dev` | Servidor de desarrollo en http://localhost:4321 |
| `bunx astro dev --background` | Servidor en segundo plano, que es como debe arrancarlo Claude (lo indica `AGENTS.md`). Se maneja con `bunx astro dev stop`, `status` y `logs`. |
| `bun run build` | Compilar a `dist/`. Correrlo antes de dar algo por terminado. |
| `bunx astro check` | Revisar errores de tipos. La primera vez pide instalar `@astrojs/check` y `typescript`, que no están instalados; preguntar al usuario antes. |
| `bun add <paquete>` | Agregar una librería (consultar antes su documentación en Context7) |
| `bunx skills update` | Actualizar las skills de IA |

`dist/` y `.astro/` son generados: se pueden borrar y no se editan a mano.

### Carpetas

| Ruta | Contenido |
|---|---|
| `src/pages/index.astro` | **Versión 2** (26 oct 2026): portada en video que avanza al bajar (`HeroCine`), íconos animados en servicios (`Glifo`), RebelBot en recorrido horizontal que «escribe» en cada paso, proceso que se llena en orden, columna de RebelDEV que se enciende en la comparación y cierre rojo que se abre. |
| `src/pages/v1.astro` | **Versión 1**: la publicada en https://rebeldev-landing.vercel.app (pantalla de carga, partículas en el hero, RebelBot en teléfono fijo). Junta los componentes `Nav`, `Hero`, `RebelBot`, `Diferencial`, `Ingenieria`, `Servicios`, `Proceso`, `Fundador`, `Preguntas` y `Cierre`. **No se reemplaza por otro diseño** (el 26 oct 2026 se había cambiado por error y se restauró). Las versiones se listan en `src/data/versiones.ts` (selector abajo a la izquierda). |
| `src/pages/v3.astro` | **Versión 3** (28 oct 2026), «Del caos al sistema»: el estudio completo, no solo el asistente. La barra roja corta el titular (`HeroCorte`); las piezas sueltas de un negocio se ordenan en capas con GSAP Flip en una sección fija (`CaosSistema`, el momento fuerte); servicios en índice tipográfico con el glifo que sigue al cursor; la IA escribe y un senior aprueba (ScrambleText); proceso en circuito; comparador con la `/` arrastrable (Draggable + Inertia); Fredy con escalera; preguntas en acordeón; cierre con el `</>` armado por piezas. Sin grano (`<Base grano={false}>`), cursor `/` propio. Componentes en `src/components/v3/` y textos propios en `src/data/v3.ts`. RebelBot aparece solo como ejemplo dentro de los servicios. |
| `src/pages/v4.astro` | **Versión 4** (29 oct 2026), «Tu diagnóstico»: el visitante marca lo que hoy le quita tiempo y una maqueta 3D en Three.js (`src/scripts/v4/maqueta.ts`) arma las piezas que construiríamos (el único momento fuerte). La selección se guarda en la sesión (`src/scripts/v4/estado.ts`, evento `rd:diag`) y cambia el botón de la barra, el orden de las preguntas y el cierre; el mensaje de WhatsApp ya lleva lo marcado (`src/lib/diagnostico.ts`). RebelBot en un diagrama de cómo responde (MotionPath + MorphSVG); proceso en sección clara con el aviso «Todavía no pagas» y el ámbar como «a prueba»; logo con la animación «Bloqueo» (`LogoBloqueo`, datos en `src/lib/logotipo.ts`). Barra mínima, sin grano ni interruptor de tema. Componentes en `src/components/v4/` y textos en `src/data/v4.ts`. |
| `src/pages/v5.astro` | **Versión 5** (29 oct 2026), «Cartel»: hecha con la skill `design-taste-frontend` (dirección «Loud and flat», semilla 691477906, con la paleta y las fuentes de la marca). Paneles planos que alternan negro y crema; el nombre `Rebel</DEV>` corre sobre un cuadrado con el video del hero (con botón de pausa); la promesa en escalera; papeletas sobre una foto de archivo que se llenan con fechas reales desde el próximo lunes según las semanas que elijas (la pieza viva, `src/lib/calendario.ts`); servicios con el titular fijo; cuatro verbos a pantalla completa (Entender, Construir, Probar, Cuidar); Fredy en texto grande con palabras marcadas; preguntas como fichas con pestaña (`<details name>`); franja roja «Agenda» y el correo como titular del pie. Sin etiquetas en mayúsculas, sin monoespaciada, sin numeración, sin líneas finas ni degradados (reglas de la skill). Componentes en `src/components/v5/` y textos en `src/data/v5.ts`. **Pendiente de confirmar:** «Perú · 2026» en el pie (la sede no está confirmada). |
| `src/pages/v6.astro` | **Versión 6** (30 oct 2026), «Tablero»: con la skill `design-taste-frontend` (dirección «The well-kept board», hoja en `.taste-skill/v6/`). Un primer intento, «Sala oscura» (fondo negro y fotos de archivo), se descartó porque se parecía a la v5. Fondo crema del modo claro y bloques encajados en negro, rojo, ámbar y hueso; las imágenes son piezas del producto hechas en HTML (`src/components/v6/ui/`: chat, agenda, revisión, semana a prueba, ficha) y el video de la v2. Portada como hoja de piezas con un panel de texto; la pieza viva es la demo de RebelBot con su ficha (si apagas un dato, no lo inventa y pasa a un asesor); servicios como tablero de detalles de interfaz ampliados; el proceso como una barra con tramos proporcionales a lo que duran; Fredy con el video y cuatro datos; preguntas en índice con la respuesta al lado; cierre en fila de bloques y el logo armado con bloques. Componentes en `src/components/v6/` y textos en `src/data/v6.ts` (la ficha del departamento y sus datos son de ejemplo). |
| `src/pages/fina.astro` | **Versión Fina** (31 oct 2026), la que eligió el equipo: barra de la v1 (`Nav` con la prop `links`), el corte de la v3 con mini pantallas sin texto (`Mini.astro`: chat, hoja, agenda, factura…) que caen hacia la sección siguiente; la cinta tapa la barra roja, «Del caos al sistema» con escáner, Flip por capas y una pieza nueva por capa, servicios en índice: un clic abre debajo una demo de 4 pasos; el panel queda fijo y, al bajar, cada paso reemplaza al anterior en el mismo lugar mientras la escena avanza (31 oct 2026, a pedido del usuario: nada de abrir con el ratón, de avance automático ni de pasos en lista; WhatsApp = RebelBot con su teléfono; escenas en `src/components/fina/demos/` y `src/scripts/fina/escenas.ts`), proceso en ruta horizontal con el medidor «Has pagado: nada todavía», comparador con dibujos en las mitades vacías, Fredy con la foto recortada (fondo transparente) y la trayectoria como lista de roles que muestra al lado lo que aporta cada uno (las barras se descartaron), preguntas de la v1 y cierre con las partículas de la v1 que se juntan al bajar (`ParticleMark` con las opciones `formado` y `polvo`, que abre más la nube al llegar). Componentes en `src/components/fina/` y textos en `src/data/fina.ts`. |
| `public/fina/` | `fredy-referencia.webp`: **foto de referencia temporal** que pasó el usuario (no es Fredy; recortada desde el original detectando el cuadriculado pegado, con fondo transparente). Cambiarla por una foto real de Fredy antes de publicar. |
| `public/v5/` | Fotos de archivo de ingeniería para la versión 5 (dominio público o sin restricciones conocidas, Wikimedia Commons): sala de dibujo (1923), obrero en el Empire State (Lewis Hine, 1930), gráfico de una prueba de carga de puente (1911), centralita telefónica y sala de telégrafos. Los créditos están en `src/data/v5.ts` y se muestran en el pie. Muestran el mundo de la ingeniería, nunca al equipo ni a un cliente. |
| `public/video/hero.mp4` | Video del hero de la versión 2, generado con Higgsfield (Seedance 1.5 Pro, 4 s, 720p, 4,8 MB): teléfono que recibe mensajes, partículas rojas y una red. Se probó el de «Pieza por pieza» (bloques que forman una torre, 480p) y el usuario prefirió este porque se ve mejor (26 oct 2026). Para cambiarlo basta reemplazar el archivo; no hay que tocar el código. |
| `src/components/` | `HeroCine` (portada de la versión 2: pantalla de carga con el `</>` y video fijo que avanza con el scroll, con frases que se encienden palabra por palabra, como Terminal Industries) y `Glifo` (íconos SVG animados de cada servicio, como Raycast). De la versión 1 (con partículas): `Nav`, `Hero` (pantalla de carga + partículas), `RebelBot` (teléfono fijo con el chat), `Diferencial`, `Ingenieria`, `Servicios`, `Proceso`, `Fundador`, `Preguntas`, `Cierre` (llamada final y pie). `Logo.astro` es el logotipo `Rebel</DEV>` en texto (provisional; el SVG definitivo está pendiente). |
| `src/data/` | `contacto.ts` (datos ficticios, en un solo lugar), `rebelbot.ts` (pasos y conversación de ejemplo), `estudio.ts` (servicios, proceso, garantías, Fredy y preguntas, compartidos por las versiones), `v3.ts` (textos propios de la versión 3; las piezas y el código son ejemplos ilustrativos) y `versiones.ts`. |
| `src/lib/mark.ts` | Geometría del `</>` provisional; la usan el logo, la pantalla de carga y las partículas. |
| `src/scripts/` | `motion.ts` (registra GSAP y sus plugins una vez, Lenis, entradas con `data-reveal`), `glifos.ts` (animaciones de los íconos de servicios, para v2 y v3; Flip, Draggable, Inertia y ScrambleText se registran solo en los componentes de la v3) y `particles.ts` (partículas del `</>` con Three.js y shaders propios; sin WebGL queda el `</>` en SVG). |
| `src/layouts/Base.astro` | `<head>`, fuentes y grano. |
| `src/styles/global.css` | Tailwind, paleta y escala tipográfica en `@theme` y `@utility`; el modo claro (`:root.light`) y el barrido del cambio de tema. Los nombres de color son de la marca: `ink` es el fondo y `bone` el texto en los dos temas. |
| `public/` | Archivos que se sirven tal cual (favicon, imágenes, videos). |
| `referencias/` | Material de marca e inspiración (ver «Fuentes»). No es código. |
| `.claude/skills/` | Skills de IA del proyecto. |
| `skills-lock.json` | Registro de las skills instaladas y su origen. |
| `AGENTS.md` | Indicaciones oficiales de Astro para asistentes de IA (vienen con la plantilla). |
| `.vscode/` | Extensión recomendada de Astro y lanzador del servidor. |

### Librerías: cómo se usan

- **GSAP directo en `<script>` de Astro, sin React.** Plugins previstos:
  - **ScrollTrigger:** sección fija con video.
  - **DrawSVG:** pantalla de carga con el `</>`.
  - **MorphSVG:** SVG animados.
  - **SplitText:** textos por partes.
  - Registrar los plugins una sola vez, en un módulo compartido.
- **Lenis** se mueve con el ticker de GSAP para que el scroll y ScrollTrigger vayan sincronizados (patrón de la skill `cinematic-gsap-lenis-motion-system`).
- **Partículas:** Three.js (instalado el 24 oct 2026) con un `ShaderMaterial` propio: el movimiento se calcula en la GPU. Importar solo las clases que se usan (no `import * as THREE`).
- **React Bits:** solo como catálogo de ideas. No se agrega React (`@astrojs/react`) salvo que un componente concreto lo justifique y el usuario lo apruebe.
- **Siempre:** respetar `prefers-reduced-motion` (con `gsap.matchMedia()`) y probar en el móvil.

### Skills de IA

**Instaladas en el proyecto** (11, en `.claude/skills/`; 10 el 23 oct 2026 y `design-taste-frontend` el 29 oct 2026). Se activan al trabajar con archivos de `rebeldev-landing/`. Cargar la que corresponda **antes** de escribir la animación.

| Skill | Origen | Usarla para |
|---|---|---|
| `gsap-core` | Oficial (GreenSock) | Cualquier animación: `to`/`from`, curvas, `stagger`, `matchMedia` y menos movimiento |
| `gsap-timeline` | Oficial | Encadenar animaciones (pantalla de carga, entrada del hero) |
| `gsap-scrolltrigger` | Oficial | Scroll, secciones fijas (`pin`), `scrub`, parallax |
| `gsap-plugins` | Oficial | SplitText, DrawSVG, MorphSVG, Flip y registro de plugins |
| `gsap-utils` | Oficial | `clamp`, `mapRange`, `random` y otras ayudas (ratón, partículas) |
| `gsap-performance` | Oficial | Fluidez a 60 fps, evitar trabas, móvil |
| `cinematic-gsap-lenis-motion-system` | Comunidad (Meng To) | Conectar Lenis con GSAP y el estilo general: movimientos elegantes, sin rebotes. Sus valores son punto de partida, no reglas de la marca. |
| `frontend-design` | Oficial (Anthropic) | Criterio visual al diseñar cada sección: que no parezca plantilla, un solo momento llamativo, tipografía cuidada, accesible y adaptada al móvil. Primero un plan de diseño y después el código. |
| `web-design-guidelines` | Vercel | **Revisar** el código terminado contra las guías de interfaz de Vercel (accesibilidad, foco, contraste, formularios, móvil). Descarga las guías actualizadas de GitHub en cada uso. Da los hallazgos como `archivo:línea`. |
| `design-taste-frontend` | Comunidad (`Leonxlnx/taste-skill`, instalada a pedido del usuario el 29 oct 2026) | Dirección de arte «anti-plantilla»: `scripts/draw.mjs` sortea direcciones (composición, hero, secciones) desde un estudio de 247 webs premiadas; `scripts/assets.mjs` busca fotos de archivo con licencia libre; `scripts/lint.mjs` e `scripts/inspect.mjs` (Chrome real a 1440, 768 y 390 px) revisan sus reglas. Necesita Node 22+ y Chrome. Deja su trabajo en `.taste-skill/` (fuera de git). Con la marca se usa `--keep palette,type`. Sus reglas prohíben etiquetas monoespaciadas, numeración «01» y líneas finas: valen para la versión 5, no para las demás. Se usó en la versión 5. |
| `copywriting` | Comunidad (Corey Haines) | Textos **nuevos**: hero, RebelBot, llamada a pedir una demo. Evita muletillas de IA y no permite afirmaciones sin respaldo. Busca `.claude/product-marketing.md`, que no existe: el contexto está en las secciones 1 a 6 de este archivo. |

**Cómo encajan con la marca:**
- **Lo decidido manda sobre las skills.** Los textos oficiales (sección 1), los mensajes clave (sección 3), la identidad (sección 4) y las pautas (sección 6) no se cambian por lo que diga una skill.
- **Choque con `frontend-design`:** esta skill marca como «señales de diseño hecho por IA» varios rasgos del mock: fondo casi negro con un solo acento rojo, etiquetas en mayúsculas espaciadas sobre cada título, el formato «01 — La marca» y etiquetas en monoespaciada. La misma skill dice que, si el encargo fija una dirección visual, se sigue. Así que **la paleta y las fuentes de la sección 4 se mantienen**. Sus consejos se aplican en lo que queda libre: numerar solo lo que de verdad es una secuencia, no poner una etiqueta sobre cada título y concentrar lo llamativo en un solo punto. Si un rasgo del mock choca, se comenta con el usuario en vez de cambiarlo por cuenta propia.
- **`copywriting` es una herramienta, no la voz:** la voz es la de la sección 4 y el idioma es el español.

**No instaladas a propósito:**
- `gsap-react` y `gsap-frameworks`: no usamos React, Vue ni Svelte.
- `impeccable` y `ui-ux-pro-max`: se pisan con `frontend-design` y `design-taste-frontend`.

**Para más adelante:**
- Three.js (`cloudai-x/threejs-skills`): si las partículas crecen o se usa 3D en otra sección.
- `web-perf` (Cloudflare): velocidad, antes de publicar.
- `seo-audit` (`coreyhaines31/marketingskills`): cuando haya dominio. Astro no tiene skill oficial: su repositorio `withastro/skills` está vacío y la más popular de la comunidad (`astrolicious/agent-skills`) es básica y anterior a Astro 7. Para Astro se usan `AGENTS.md` y Context7.

**Globales útiles** (vienen con Claude Code):
- **`run`:** levantar el landing y verlo funcionando.
- **`claude-in-chrome`:** usar el navegador.
- **`code-review` y `simplify`:** revisar el código.

### MCP

| Servidor | Para qué | Cuándo usarlo |
|---|---|---|
| **Context7** | Documentación actual de librerías | **Siempre antes de escribir o explicar código de una librería** (regla global del usuario). IDs: Astro `/withastro/docs`, GSAP `/websites/gsap`, Lenis `/darkroomengineering/lenis`, React Bits `/davidhdev/react-bits`. Para otras (Tailwind, Three.js, OGL), resolver el ID primero. |
| **Claude in Chrome** | Abrir webs, capturas, consola, tamaño de ventana | Ver a simple vista las webs de `referencias/webs-interesantes.md` y probar el landing en http://localhost:4321, también en tamaño móvil. Necesita la extensión conectada (el 23 oct 2026 no lo estaba al hacer el benchmarking). |
| **Claude Artifacts** | Publicar páginas privadas en claude.ai | **Solo con confirmación del usuario.** El landing tiene datos de Fredy y una marca sin lanzar (ver privacidad en `../CLAUDE.md`). |
| **Claude Docs** (claude.ai) | Documentos colaborativos | No se usa para el landing salvo pedido. |

### Antes de dar una tarea por terminada

1. `bun run build` sin errores.
2. Si hay animaciones: probarlas en el navegador, en escritorio y móvil, y con menos movimiento activado.
3. Pasar `web-design-guidelines` por los archivos cambiados y corregir lo que corresponda.
4. Revisar las pautas de la sección 6 (nada inventado, cliente sin nombrar).
