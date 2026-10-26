# Webs interesantes: las que eligió el usuario

Webs que el usuario eligió como inspiración para el landing de RebelDEV, el 23 oct 2026. **Cuando se decida el diseño, mandan sobre `benchmarking-web.md`**: ese archivo es la investigación amplia y este, la selección.

Todas las URLs se comprobaron el 23 oct 2026 y respondían.

---

## Principio guía

> **No basta con que se vea bonito: tiene que explicar lo que hacemos.**

Viene de lo que le gustó de Decagon y Runia: explican qué hace su bot y por qué es especial. Coincide con la regla de `benchmarking-web.md` (3.3): «La animación tiene que explicar algo». Cada efecto del landing debe ayudar a entender qué hace RebelDEV o RebelBot.

---

## Resumen

La columna «Nota del usuario» copia tal cual lo que escribió. La columna «Dónde iría» es una **propuesta**, no una decisión.

| Web | URL | Nota del usuario | Dónde iría (propuesta) |
|---|---|---|---|
| Terminal Industries | https://terminal-industries.com/ | «se ve moderno la estructa y el hero» | Hero y estructura general; sección fija con video |
| Zentry | https://zentry.com/ | «inicio la pantalla de carga ponerlo </>» | Pantalla de carga antes del hero |
| Philos | https://www.philos.site/ | «las particulas» | **Sección por decidir** |
| Raycast | https://www.raycast.com/ | «svg animados» | Servicios o explicación de RebelBot |
| Decagon | https://decagon.ai/ | «mas que las animaciones explica del porque hace especial su bot» | Sección de RebelBot |
| Runia (chatbot WhatsApp, Perú) | https://runia.ar/pe/chatbot-whatsapp | «me gusta su web por el motivo que explica» | Sección de RebelBot: cómo funciona |
| Runia (inicio) | https://runia.ar/ | «me gusta su estructura» | Orden de las secciones |

---

## Ficha por web

### Terminal Industries: estructura, hero y sección fija

- **Lo que le gusta:** se ve moderna, por la estructura y el hero. Hay una sección con **texto a la izquierda y un video a la derecha que se queda fijo mientras bajas; solo cambia el texto**.
- **Propuesta de uso:**
  - Tomarla como referencia del hero y de cómo se ordena la página.
  - La sección fija sirve para contar algo **paso a paso**. Dos candidatas:
    - **RebelBot:** a la derecha, un chat de WhatsApp (video o animación) fijo; a la izquierda, los pasos: califica al cliente, agenda la visita, deriva a un asesor. El chat cambia según el paso.
    - **Cómo trabajamos:** «Primero entendemos tu negocio; después construimos…», paso a paso.
- **Técnica:** GSAP ScrollTrigger con `pin`, o `position: sticky` en CSS si alcanza. En el móvil, poner el video arriba y el texto debajo, sin fijar.
- **Revisión a simple vista (26 oct 2026, con Chrome):**
  - **Hero:** pantalla de carga con el logo sobre líneas finas; después, una secuencia de imágenes en un `<canvas>` fijo (~2750 px de scroll) que avanza al bajar: camión al atardecer → la cámara sube sobre el patio → el patio se vuelve wireframe y partículas («la IA lo ve») → hilos abstractos → cuadrícula. Encima, tres frases que arman una sola idea; cada palabra pasa de apagada a blanca con el scroll y la frase anterior se va. El hero termina con un borde con muesca curva hacia una sección blanca.
  - **Sección fija:** texto a la izquierda que cambia por pasos (la palabra activa se oscurece) y un video cuadrado a la derecha, fijo, con esquinas recortadas; los videos son tomas cenitales con wireframe encima, de 5 s en bucle.
  - **Aplicado en la versión 2:** `src/components/HeroCine.astro` (video generado con Higgsfield + frases que se encienden).

### Zentry: pantalla de carga con el logo

- **Lo que le gusta:** al cargar, primero aparece el logo. Lo quiere con el `</>` de RebelDEV.
- **Propuesta de uso:** una pantalla de carga corta en la que el `</>` se dibuja (primero los signos, después la barra roja) y luego da paso al hero.
- **Ojo:**
  - El logo está **pendiente de rehacer** (el del mock está descuadrado). Por ahora se usa el isotipo provisional.
  - Que dure poco (unos segundos como máximo) y que no se repita en cada visita. Una pantalla de carga larga hace que la gente se vaya.
  - Respetar `prefers-reduced-motion`: si el usuario pide menos movimiento, se salta la animación.
- **Técnica:** SVG con trazo animado (`stroke-dasharray`) y GSAP.

### Philos: partículas

- **Lo que le gusta:** las partículas.
- **Decidido (24 oct 2026):** el `</>` del hero, hecho «como Philos». Philos usa Three.js: la escultura «El pensador» cubierta de miles de puntos redondos que suman luz, con brillo de brasa, respiración con ruido, remolino al pasar el ratón y, al bajar, una nube de polvo que gira. Lo mismo se aplicó al `</>` (ver `src/scripts/particles.ts`). La primera versión en canvas 2D (cuadraditos planos) no le gustó al usuario.
- Opciones que se habían propuesto:
  1. **Fondo del hero:** partículas suaves que reaccionan al ratón.
  2. **Partículas que forman el `</>`:** por ejemplo, al terminar la pantalla de carga o en la llamada final.
  3. **Sección de ingeniería:** partículas que se ordenan en módulos para representar la arquitectura limpia; explican la idea de «pieza por pieza».
- **Técnica:** Three.js (o canvas 2D si alcanza). Pocas partículas en el móvil y respetar `prefers-reduced-motion`.

### Raycast: SVG animados

- **Lo que le gusta:** los SVG animados de la sección «Build the perfect tools».
- **Propuesta de uso:**
  - Íconos animados para los servicios (las 7 especialidades).
  - Un diagrama animado de cómo funciona RebelBot: mensaje → IA → datos del negocio → respuesta o cita.
- **Técnica:** SVG con GSAP o animaciones CSS. Pesan poco y se ven nítidos en cualquier pantalla.

### Decagon: explicar por qué el bot es especial

- **Lo que le gusta:** más que las animaciones, que **explica por qué su bot es especial**.
- **Propuesta de uso:** la sección de RebelBot (versión 2 del landing) debe responder «¿por qué este bot y no otro?» con lo que hace de verdad (`rebeldev-landing/CLAUDE.md`, sección 2): no inventa información, trabaja con los asesores, nunca deja al cliente sin respuesta, aprende de los asesores y pide consentimiento según la Ley 29733.
- **Ojo:** sin cifras ni resultados inventados.

### Runia (página de chatbot de WhatsApp en Perú): explicar cómo funciona

- **Lo que le gusta:** la web, por cómo explica.
- **Propuesta de uso:** tomar la forma de explicar el funcionamiento del bot para la sección de RebelBot.
- **Ojo:** Runia es **competencia directa** en Perú, incluso en el sector inmobiliario (ver `benchmarking-web.md`, 2.2). Se toma la idea, no los textos ni el diseño.

### Runia (inicio): estructura

- **Lo que le gusta:** su estructura.
- **Propuesta de uso:** modelo para ordenar las secciones del landing. Hay que revisarla a simple vista y anotar aquí el orden de sus secciones.

---

## Pendientes

- **Revisión a simple vista:** de estas webs solo hay notas, sin capturas. Si se conecta Chrome, sacar capturas de las secciones que gustaron (sobre todo la sección fija de Terminal Industries, la de Raycast y el orden de secciones de Runia).
- **Logo:** la pantalla de carga depende del logo definitivo.
