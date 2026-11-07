# CLAUDE.md — Landing de RebelDEV

Guía para Claude Code al construir el landing de RebelDEV. Las pautas generales del proyecto (idioma, orden, privacidad) están en `../CLAUDE.md`.

- **Marca y contenido:** secciones 1 a 6.
- **Para programar** (stack, comandos, carpetas, librerías, skills y MCP): sección 7.

## Fuentes

| Fuente | Qué aporta |
|---|---|
| Página de LinkedIn de RebelDEV (texto que pegó el usuario el 23 oct 2026) | Resumen oficial, ficha y especialidades. |
| Material de marca e inspiración (antigua carpeta `referencias/`) | Captura de LinkedIn, «Brand Hub» (mock), mapeo de mejoras de marca, cuestionario de Fredy (**privado**), propuestas y animaciones del logo, webs de inspiración y benchmarking. **Se borró el 3 nov 2026** a pedido del usuario; lo que importa está resumido en las secciones 3 a 5. Si hace falta algo, se recupera del historial de git: `git show 119a08f:referencias/<archivo>`. |
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
- **Precio (3 nov 2026):** «Solo pagas lo que consumes.» Es la mentalidad del pago por uso (como Azure): el cliente paga los créditos que consume su asistente; implementación, soporte y mejoras van por cuenta de RebelDEV.
- **Posicionamiento (3 nov 2026):** especialistas en soluciones con IA, con producto propio (RebelBot). La consultoría a medida es una opción, no lo principal.

---

## 4. Identidad visual

Dos fuentes: la captura de LinkedIn y el mock «Brand Hub» (los dos se borraron el 3 nov 2026; están en git, ver «Fuentes»). **El mock fue la base**, pero era un punto de partida que había que mejorar, no un diseño final. Lo que se tomó de él (colores, fuentes, tono) está resumido aquí y ya vive en `src/styles/global.css`.

### Nombre y logo

- **Nombre:** «RebelDEV» en textos.
- **Logotipo (decidido 25 oct 2026):** `Rebel</DEV>`, con «Rebel» en crema, «DEV» en crema y los signos `<`, `/`, `>` en rojo. Va solo, sin isotipo al lado. En los textos corridos se escribe «RebelDEV». El mock (`rebel‹DEV›`) y el banner de LinkedIn (`REBEL‹DEV›`) quedan como referencia, no como logo.
- **Isotipo:** dos signos `<` `>` en crema con una barra `/` roja que los corta (como `</>`). Trazos gruesos y puntas redondeadas. En LinkedIn va sobre un cuadrado negro de esquinas redondeadas.
- **El logo del mock está descuadrado y ya no se usa.** El favicon es `public/favicon.svg` (isotipo I-A en cuadrado oscuro) y en la página el logotipo se escribe en texto (`src/components/Logo.astro`). **Pendiente:** los SVG del logo (`logotipo-oscuro.svg`, `logotipo-claro.svg` con letras en trazos desde Bricolage Grotesque 800, `isotipo-oscuro.svg` e `isotipo-claro.svg`) se iban a guardar en `public/brand/`, pero nunca entraron al proyecto (revisado el 3 nov 2026); también falta el monocromo rojo para grabados.
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

- **«Casa amplia, puerta angosta»:** se vende por el asistente de WhatsApp (concreto y demostrable) y, una vez dentro, se abre la conversación al resto del software. En la Fina, el asistente es uno de los servicios, con su demo en un teléfono.
- Las tarjetas de servicios del mock incluyen una última, «¿Algo más?»: «Si implica software, probablemente podemos construirlo. Conversemos.» En el landing (7 nov 2026, a pedido del usuario) dice «Si implica software, lo construimos. Conversemos.»: sin «probablemente».
- El mock menciona un diseño interno de landing con estas secciones: hero, servicios, fundador, preguntas frecuentes y llamada a la acción (agendar una demo).
- Los textos del mock que describen la marca («Un estudio de software construido con IA…») **no son los oficiales**. Para el resumen se usa el texto de la sección 1.

---

## 5. Decisiones y pendientes

### Decidido (23 oct 2026)

- **Tecnología: Astro 7 + Tailwind CSS 4 + GSAP + Lenis, con Bun.** Detalle en la sección 7. La estructura de páginas y versiones la define el usuario.
- **Logotipo `Rebel</DEV>` (25 oct 2026):** elegido entre `Rebel</DEV>` y `rebel</dev>`. Detalle en la sección 4.
- **Isotipo (25 oct 2026):** siempre dentro de un cuadrado, en dos versiones: clara y oscura.
- **Por ahora (25 oct 2026):** rojo de marca `#E4121F`; favicon con el isotipo I-A; puntas redondeadas; JetBrains Mono se mantiene; «rebeldes.» sin rojo (se cambiará después); ámbar `#FF6A2C` como acento.
- **Multilenguaje:** se usará el soporte de Astro para varios idiomas. Los idiomas quedan por definir.
- **Datos de prueba (25 oct 2026):** el BCP y la edad de Fredy son datos ficticios para ver el landing; se cambian por los reales después.
- **Grabados de un color (25 oct 2026):** el logo va completo, con la barra del mismo color que el resto.
- **Ámbar `#FF6A2C` (25 oct 2026):** se queda como acento.
- **Fondo liso (25 oct 2026):** negro sólido, sin grano ni degradado.
- **Una sola versión (3 nov 2026):** se hicieron siete versiones para debatir (v1 a v6 y la Fina). El equipo eligió la **Versión Fina** y el 3 nov 2026 se borraron las demás, con el selector de versiones: la Fina es la portada (`/`). Las anteriores se recuperan del historial de git (`119a08f`).
- **Beca Inmobiliaria no se nombra:** ni su nombre, ni su logo, ni capturas del panel, ni el nombre «Rebeca» (lo delata). El producto se describe por lo que hace.
- **Contacto ficticio por ahora:** correo, WhatsApp y redes con datos de ejemplo que se vean falsos a simple vista (por ejemplo `hola@rebeldev.example` y `+51 900 000 000`). Todos en un solo lugar del código, para cambiarlos de una vez.
- **Fredy Ramos es el responsable y líder de RebelDEV** y aparece en el landing. Su información está en `../fredy-ramos.md`.
- **El agente de WhatsApp es un producto: RebelBot** (nombre provisional). En la Versión Fina aparece dentro de los servicios («Asistentes de WhatsApp»), con su demo en un teléfono.

### Decidido (3 nov 2026): v1 con producto propio

El equipo ya tiene el producto funcionando y cambió el mensaje. Se armó la **v1** en una ruta aparte (`/v1`). **El 7 nov 2026 el equipo la aprobó: la v1 es la portada (`/`) y la única página; la Fina se recupera del historial de git (`355392a`).** Ese mismo día se armó la **v1.1** con las mejoras que pidió el panel de clientes ficticios (skill `panel-clientes`) y, a pedido del usuario, **reemplazó a la v1: la v1.1 es la portada (`/`) y la única página**. La v1 de antes de esas mejoras (en `/v1`) y la Fina se recuperan del commit `355392a`.
- **Producto primero:** RebelBot tiene su propia sección (teléfono + panel) justo después de la portada. La fila «Asistentes de WhatsApp» sale de los servicios.
- **Precios públicos:** las cifras del cotizador «Créditos Rebel» (vista para clientes, implementación incluida) viven en `src/data/precios.ts`: S/ 1.00 + IGV por crédito (1 crédito = 100,000 tokens ≈ 1 conversación), planes Arranque, Crecimiento y Pro, consumo por acción. El cotizador es de otra cuenta de claude.ai; la vista interna (costos y márgenes) nunca va al landing.
- **Todo incluido:** el cliente paga lo que consume; implementación, soporte y mejoras van por cuenta de RebelDEV. Planes: contrato de 12 meses sin pago inicial; por uso: mes a mes.
- **Garantías:** primera semana gratis en producción. **Ya no hay cuotas.**
- **Panel:** se muestra **recreado en código con datos ficticios** («Inmobiliaria Demo»). Nunca capturas del panel real: muestra el nombre del cliente, sus proyectos y teléfonos reales.
- **Consultoría:** «Del caos al sistema» y los servicios quedan bajo «A medida».
- No se dice «más barato que el mercado» con cifras; el comparador lo transmite («Solo lo que consume tu asistente» frente a «implementación por adelantado y una mensualidad fija»).

### Cuestionario de marca (Fredy, 25 oct 2026)

Las respuestas completas estaban en `referencias/cuestionario-marca.md` (**privado**: tiene clientes, competidores y datos personales de Fredy; se borró el 3 nov 2026 y está en git, `119a08f`). Lo que el landing puede usar:

- **Esencia:** «RebelDEV es el equipo de ingeniería que elimina la burocracia: entregamos en semanas lo que en una empresa tradicional toma meses.» La rebeldía es velocidad con calidad, no estética punk.
- **Propuesta única (versión web):** «Ingeniería de sistemas usados por millones, entregada en semanas.»
- **Oferta de entrada:** el asistente de WhatsApp con IA (responde en menos de 1 minuto, 24/7, califica, agenda visitas, hace seguimiento y registra en el CRM). Las demás líneas (plantilla inmobiliaria, panel de métricas, postventa, software a medida) tienen fecha de 2027 y **no se muestran como disponibles**.
- **Proceso (8 pasos):** diagnóstico gratis de 30 min; demo en vivo con los datos del cliente; propuesta con retorno; arranque con línea base; sprints semanales con demo cada viernes; una semana en producción a prueba antes de pagar; salida en vivo con monitoreo diario las primeras 2 semanas; revisiones a los 30, 60 y 90 días.
- **Garantías que se pueden decir:** prueba de una semana en producción antes de pagar; pago en cuotas después; revisión mensual incluida. (En la v1, 3 nov 2026: sin cuotas; se paga lo que consume.)
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

- **Video del hero (26 oct 2026):** se generó con Higgsfield para la portada de la versión 2. La Fina no lo usa y el archivo (`public/video/hero.mp4`) se borró el 3 nov 2026 (está en git, `119a08f`). Si se retoma un video: se genera con la CLI `higgsfield` (el conector MCP no genera); en plan gratis solo funcionó Seedance 1.5 Pro (`seedance1_5`, 4 s a 720p = 4,8 créditos; a 480p = 1,2; quedaban 3,4 créditos), y conviene hacerlo en 720p o más.
- **Video de marca (3 nov 2026, aparte del landing):** 12 s en 480p con voz en español («RebelDEV crea software a medida con inteligencia artificial. Su plataforma, RebelBot, atiende a tus clientes por WhatsApp, agenda citas y registra cada contacto. Ingeniería para empresas rebeldes.»). Hecho con `seedance1_5` (7,19 créditos), con un cuadro propio del logo (`Rebel</DEV>` + eslogan, renderizado desde HTML) como imagen inicial y final, para que el texto salga bien. No va en el proyecto: quedó en la carpeta Descargas del usuario (`rebeldev-video.mp4`). Lo aprendido: Seedance 2.0 Mini pide plan de pago; en `seedance1_5`, `end_image` exige `start_image`; hay dos cuentas de Higgsfield, y la CLI quedó con la segunda (1,31 créditos). Para cambiar de cuenta en la CLI, primero hay que cambiarla en higgsfield.ai en el navegador. El conector «claude.ai Higgsfield» (`mcp.higgsfield.ai`) está sin autorizar.
- **Detalles del landing:** URL de LinkedIn, «rebeldes.» en rojo o no (va sin rojo) y el SVG definitivo del logo.
- **Mejorar la marca, empezando por el logo:** el plan, los problemas detectados y las preguntas abiertas estaban en `referencias/mapeo-mejoras-marca.md` (borrado el 3 nov 2026; en git, `119a08f`). El logotipo ya está elegido (`Rebel</DEV>`, L-5).
- **Foto de Fredy (31 oct 2026):** el landing usa una foto de referencia que no es de Fredy (`public/fina/fredy-referencia.webp`), marcada «Foto de referencia». Cambiarla por la real antes de publicar.
- **Dominio y hosting.** La versión 1 estaba publicada en https://rebeldev-landing.vercel.app; al volver a publicar se verá la Fina.
- **Idioma:** solo español o también inglés.

### Fredy en el landing

- **Qué sí se puede usar:** nombre, rol en RebelDEV, formación (Ingeniería de Sistemas, UNMSM), trayectoria técnica (desarrollador → arquitecto de software → líder técnico → arquitecto de tecnología → Product Owner), experiencia con chatbots e IA, y sus frases textuales de la sección 3 de `../fredy-ramos.md`.
- **Confirmar antes de usar:** nombrar al **BCP** o su cargo actual allí (lidera RebelDEV en paralelo a ese trabajo), su edad, y cualquier dato de su vida personal o familiar. Mientras no se confirmen, solo pueden ir como opción, marcados para revisar.
- Nunca inventar ni cambiar citas: se copian tal cual de la entrevista.

---

## 6. Pautas

- **Explicar, no solo decorar:** el landing no solo tiene que verse bonito, también tiene que explicar qué hace RebelDEV y por qué RebelBot es especial. Cada animación debe ayudar a entender algo.
- **No inventar** clientes, casos, testimonios, cifras ni miembros del equipo. Si una sección necesita esos datos y no los hay, se deja fuera o se pregunta.
- **No inventar resultados de Rebeca:** el producto todavía no tiene métricas publicadas. Se describe lo que hace, no cuánto rinde.
- **No mostrar** métricas de LinkedIn (seguidores, miembros asociados).
- **No usar en el landing** las secciones internas del mock (índice de entregables con enlaces a claude.ai y la sección «Para ti»): son material de trabajo del equipo.
- **No publicar detalles internos de Rebeca:** nombres de recursos de Azure, URLs de los ambientes, variables, códigos de defectos o historias, ni nada de los archivos privados del repositorio.
- Los textos oficiales de la sección 1 se copian tal cual; los textos nuevos deben seguir el mismo tono.
- **No nombrar al cliente** (Beca Inmobiliaria) ni a su bot (Rebeca). Ver sección 5.
- **Repositorio privado (25 oct 2026):** se usa para llenar la info y generar versiones. Al final se crea otro repositorio, limpio, también privado: el historial de este tiene material privado (por ejemplo, `referencias/cuestionario-marca.md`, borrado el 3 nov 2026 pero todavía en git).
- **Carpeta limpia:** solo el proyecto Astro y la configuración (`.claude/`, `.vscode/`, `skills-lock.json`). Nada de copias, borradores ni archivos sueltos.

---

## 7. Proyecto y herramientas

### Stack (creado el 23 oct 2026, a pedido del usuario)

| Pieza | Versión | Notas |
|---|---|---|
| **Astro** | 7.4 | Plantilla `minimal`. Sitio estático. |
| **Tailwind CSS** | 4.3 | Entra por el plugin de Vite en `astro.config.mjs`. No hay `tailwind.config.js`: colores y fuentes de la marca se definen en `src/styles/global.css` con `@theme`. |
| **GSAP** | 3.15 | Gratis con todos sus plugins (licencia propia de GSAP, no MIT; vale para uso comercial). |
| **Lenis** | 1.3 | Scroll suave, sincronizado con ScrollTrigger. |
| **Three.js** | 0.186 | Solo para las partículas del cierre (24 oct 2026). Se carga aparte con `import()` para no frenar la página (~134 KB comprimido). |
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
| Versión Fina (en git, `355392a`) | **La Versión Fina** (31 oct 2026), la que eligió el equipo; fue la portada del 3 al 7 nov 2026, cuando la reemplazó la v1. Sus componentes siguen en uso en la portada, así que lo que sigue describe cómo funcionan; lo que solo usaba la Fina (sus valores por defecto, la fila de WhatsApp en servicios, las garantías del comparador y el pie simple) se borró el 7 nov 2026. Orden: barra (`Nav` con sus `links`); portada con el corte de la barra roja y mini pantallas sin texto (`Mini.astro`: chat, hoja, agenda, factura…) que caen hacia la sección siguiente, y la cinta que tapa la barra roja; «Del caos al sistema» con escáner, Flip por capas y una pieza nueva por capa; servicios en índice: un clic abre debajo una demo de 4 pasos, el panel queda fijo y, al bajar, cada paso reemplaza al anterior en el mismo lugar mientras la escena avanza (31 oct 2026, a pedido del usuario: nada de abrir con el ratón, de avance automático ni de pasos en lista; WhatsApp = RebelBot con su teléfono); proceso en ruta horizontal con el medidor «Has pagado: nada todavía»; comparador con la `/` arrastrable (Draggable + Inertia) y dibujos en las mitades vacías; Fredy con la foto recortada (fondo transparente) y la trayectoria como lista de roles que muestra al lado lo que aporta cada uno (las barras se descartaron); preguntas en acordeón; cierre con las partículas que se juntan al bajar (`ParticleMark` con las opciones `formado` y `polvo`, que abre más la nube al llegar); pie y cursor `/` propio. Responsive revisado el 1 nov 2026 (de 320 px a escritorio y con el celular en horizontal): bajo 900 px los enlaces y el botón de tema pasan a un menú desplegable; bajo 1024 px las demos de servicios son cuadradas y con letra más grande, y se achican según el alto de su texto (`--copia`); con el celular en horizontal, las demos y «Del caos al sistema» ponen texto e imagen lado a lado. |
| `src/pages/index.astro` | **El landing: la v1.1**, portada desde el 7 nov 2026 y única página (la v1 es del 3 nov 2026). Las mejoras que pidió el panel de clientes ficticios ya son los textos de base: precios en dos opciones («Opción 1: sin cargo fijo» y «Opción 2: planes mensuales»), calculadora desde 150 conversaciones, «Acceso clientes», preguntas nuevas, menú del panel con 7 opciones y el botón flotante que se esconde sobre la calculadora en el celular. Orden (3 nov 2026, revisión de flujo): portada (misma raya, otra bajada y cinta) · Producto · Precios · Comparador · Proceso · A medida (Del caos al sistema, pegado a su título, + servicios sin WhatsApp) · Fredy · Preguntas · Cierre (dentro de `<main>`). En Precios, «Por uso o plan mensual» son dos fichas enfrentadas y «Lo que consume cada acción» son barras sobre una regla de créditos y soles. «Primera semana gratis» se dice solo en la portada, en Proceso y en el Cierre. Usa los componentes de `fina/` y `v1/`, que desde el 7 nov 2026 ya no tienen opciones para otras versiones. Barra (3 nov 2026, a pedido del usuario): «Acceso clientes» en lugar de «Agenda una demo» (por ahora lleva a `contacto.acceso`, google.com, hasta tener la dirección del panel) y la demo pasa a un botón flotante abajo a la derecha (`.demo-flot`), que abre el WhatsApp de `contacto.ts`. En Proceso, con el ratón encima de una estación, su animación se repite en bucle (pausa de 0,6 s entre vueltas) hasta que sale (en táctil, tocar el dibujo la repite una vez); el paso 07 usa la escena `chequeo` (dos semanas de L a D con un visto por día). En Servicios, al abrir un servicio la página baja hasta que su demo ocupa la pantalla con el contenido centrado. |
| `src/components/v1/` | Secciones nuevas de la v1: `Producto` (teléfono de RebelBot + `Panel`, el panel recreado con datos ficticios; recorre 7 pantallas en el orden del menú: Bandeja, Citas, Leads, Conocimiento, Aprendizaje, Tablero y Consumo. Citas y Leads, del 3 nov 2026, siguen a la clienta de «Así lo vive tu cliente»), `Precios`, `Cotizador` y `Pie` (3 nov 2026: eslogan y promesa oficiales, columnas de secciones, servicios y contacto, y el logotipo enorme cortado por el borde, con los signos en rojo, que sube al llegar al final; reemplaza al pie simple de la Fina). |
| `src/components/fina/` | Las secciones de la página: `Hero`, `Mini`, `Caos`, `Servicios`, `Proceso`, `Comparador`, `Fredy` y `Cierre`. Las escenas de las demos de servicios están en `fina/demos/` y su animación en `src/scripts/fina/escenas.ts`. |
| `src/components/` | Piezas compartidas: `Nav` (barra, menú del móvil y cambio de tema), `Logo` (logotipo `Rebel</DEV>` en texto, provisional; el SVG definitivo está pendiente), `Preguntas` (acordeón; las preguntas están en `src/data/v1.ts`), `Glifo` (íconos SVG animados de cada servicio, como Raycast) y `Chat` (conversación de RebelBot en burbujas, para la demo de WhatsApp). |
| `src/data/` | `fina.ts` (textos de la portada, de «Del caos al sistema», de las demos de servicios y de Fredy; las piezas y escenas son ejemplos ilustrativos), `estudio.ts` (la cita y la ficha de Fredy), `rebelbot.ts` (pasos y conversación de ejemplo), `contacto.ts` (datos ficticios, en un solo lugar), `v1.ts` (los demás textos: barra, portada, servicios, proceso, comparador, preguntas y cierre), `precios.ts` (cifras del cotizador y las fórmulas; reproduce sus ejemplos al céntimo) y `panel.ts` (datos ficticios del panel). |
| `src/lib/mark.ts` | Geometría del `</>` provisional; la usan el cierre y las partículas. |
| `src/scripts/` | `motion.ts` (registra GSAP, ScrollTrigger, SplitText y DrawSVG una vez, Lenis, entradas con `data-reveal`), `glifos.ts` (animaciones de los íconos de servicios), `particles.ts` (partículas del `</>` con Three.js y shaders propios; sin WebGL queda el `</>` en SVG), `fina/escenas.ts` (escenas de las demos) y `fina/pasos.ts` (panel fijo con pasos que avanzan al bajar; lo usan Servicios y Producto). Flip, ScrambleText, Draggable e Inertia se registran solo en los componentes que los usan. |
| `src/layouts/Base.astro` | `<head>`, fuentes, tema guardado y la marca `has-motion` (oculta lo que va a entrar; sin JS o con «menos movimiento», todo se ve). |
| `src/styles/global.css` | Tailwind, paleta y escala tipográfica en `@theme` y `@utility`; el modo claro (`:root.light`) y el barrido del cambio de tema (View Transitions, idea del efecto «polygon-gradient» de theme-toggle.rdsx.dev; código propio porque ese repositorio no tiene licencia). Los nombres de color son de la marca: `ink` es el fondo y `bone` el texto en los dos temas. |
| `public/` | `favicon.svg` y `fina/fredy-referencia.webp`: **foto de referencia temporal** que pasó el usuario (no es Fredy; recortada desde el original detectando el cuadriculado pegado, con fondo transparente). Cambiarla por una foto real de Fredy antes de publicar. |
| `.claude/skills/` | Skills de IA del proyecto. |
| `skills-lock.json` | Registro de las skills instaladas y su origen. |
| `AGENTS.md` | Indicaciones oficiales de Astro para asistentes de IA (vienen con la plantilla). |
| `.vscode/` | Extensión recomendada de Astro y lanzador del servidor. |

### Librerías: cómo se usan

- **GSAP directo en `<script>` de Astro, sin React.** Plugins en uso:
  - **ScrollTrigger:** secciones fijas («Del caos al sistema», servicios) y entradas al bajar.
  - **DrawSVG:** íconos de servicios y trazos de las escenas.
  - **SplitText:** textos por partes.
  - **Flip** y **ScrambleText:** «Del caos al sistema». **Draggable** e **Inertia:** el comparador.
  - Los de uso general se registran una sola vez, en `src/scripts/motion.ts`.
- **Lenis** se mueve con el ticker de GSAP para que el scroll y ScrollTrigger vayan sincronizados (patrón de la skill `cinematic-gsap-lenis-motion-system`).
- **Partículas:** Three.js (instalado el 24 oct 2026) con un `ShaderMaterial` propio: el movimiento se calcula en la GPU. Importar solo las clases que se usan (no `import * as THREE`).
- **React Bits:** solo como catálogo de ideas. No se agrega React (`@astrojs/react`) salvo que un componente concreto lo justifique y el usuario lo apruebe.
- **Siempre:** respetar `prefers-reduced-motion` (con `gsap.matchMedia()`) y probar en el móvil.

### Skills de IA

**Instaladas en el proyecto** (12, en `.claude/skills/`; 10 el 23 oct 2026, `design-taste-frontend` el 29 oct 2026 y `panel-clientes`, propia, el 7 nov 2026). Se activan al trabajar con archivos de `rebeldev-landing/`. Cargar la que corresponda **antes** de escribir la animación.

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
| `design-taste-frontend` | Comunidad (`Leonxlnx/taste-skill`, instalada a pedido del usuario el 29 oct 2026) | Dirección de arte «anti-plantilla»: `scripts/draw.mjs` sortea direcciones (composición, hero, secciones) desde un estudio de 247 webs premiadas; `scripts/assets.mjs` busca fotos de archivo con licencia libre; `scripts/lint.mjs` e `scripts/inspect.mjs` (Chrome real a 1440, 768 y 390 px) revisan sus reglas. Necesita Node 22+ y Chrome. Deja su trabajo en `.taste-skill/` (fuera de git). Con la marca se usa `--keep palette,type`. Sus reglas prohíben etiquetas monoespaciadas, numeración «01» y líneas finas: valían para las versiones 5 y 6 (borradas), no para la Fina. |
| `copywriting` | Comunidad (Corey Haines) | Textos **nuevos**: hero, RebelBot, llamada a pedir una demo. Evita muletillas de IA y no permite afirmaciones sin respaldo. Busca `.claude/product-marketing.md`, que no existe: el contexto está en las secciones 1 a 6 de este archivo. |
| `panel-clientes` | Propia (7 nov 2026, a pedido del usuario) | **Probar la página sin publicidad:** 12 clientes ficticios (distintos trabajos, edades y recursos; fichas inventadas en `personas.md`) revisan la página, cada uno en un agente aparte, y responden «¿Lo compran o lo ignoran?». El informe se arma solo con conteos y citas de los clientes. Es una simulación: muestra lo que confunde y las objeciones, pero no predice ventas. Usa `scripts/extraer.ts` (página → texto) y `inspect.mjs` de `design-taste-frontend` (capturas). Deja su trabajo en `.panel-clientes/` (fuera de git). Se repite después de cada cambio para comparar. |

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
| **Claude in Chrome** | Abrir webs, capturas, consola, tamaño de ventana | Ver webs de inspiración y probar el landing en http://localhost:4321, también en tamaño móvil. Necesita la extensión conectada (el 23 oct 2026 no lo estaba al hacer el benchmarking). |
| **Claude Artifacts** | Publicar páginas privadas en claude.ai | **Solo con confirmación del usuario.** El landing tiene datos de Fredy y una marca sin lanzar (ver privacidad en `../CLAUDE.md`). |
| **Claude Docs** (claude.ai) | Documentos colaborativos | No se usa para el landing salvo pedido. |

### Antes de dar una tarea por terminada

1. `bun run build` sin errores.
2. Si hay animaciones: probarlas en el navegador, en escritorio y móvil, y con menos movimiento activado.
3. Pasar `web-design-guidelines` por los archivos cambiados y corregir lo que corresponda.
4. Revisar las pautas de la sección 6 (nada inventado, cliente sin nombrar).
