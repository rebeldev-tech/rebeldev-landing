# Mapeo de mejoras de la marca

Mapa de lo básico que hay que mejorar en la marca de RebelDEV antes de construir el landing. Hecho el 23 oct 2026.

- **De dónde sale:** el mock (`rebeldev-mock.html`), la captura de LinkedIn (`linkedin-rebeldev.png`) y la guía (`../CLAUDE.md`).
- **Cómo usarlo:** se mejora una pieza a la vez, en el orden de la sección «Orden de trabajo». Cuando algo se decide, se anota en su ficha (campo «Decidido») y en `../CLAUDE.md`.
- **Qué es propuesta:** todo lo que dice «Propuesta» lo sugiere Claude. Nada está decidido hasta que lo aprueben el usuario o Fredy.

---

## Resumen

| # | Elemento | Estado | Prioridad | Decide |
|---|---|---|---|---|
| 1 | Logo (isotipo, logotipo, variantes) | Propuestas listas (sección 8) | 1 | Usuario / Fredy |
| 2 | Nombre: cómo se escribe | Decidir | 1 | Usuario / Fredy |
| 3 | Color | Mejorar | 2 | Usuario |
| 4 | Tipografía | Mejorar | 2 | Usuario |
| 5 | Recursos gráficos | Mejorar | 3 | Usuario |
| 6 | Voz y eslogan | Casi bien, una decisión | 3 | Usuario / Fredy |
| 7 | Piezas derivadas (favicon, imagen para redes) | Falta | 4 | Sale del logo |

---

## 1. Logo

### 1.1 Isotipo (el `</>`)

**Hoy:**
- **Mock:** dos signos `<` `>` en crema y una barra `/` roja, dibujados en SVG (cuadro de 64 × 64).
  - `<`: de (27,14) a (12,32) y a (27,50), trazo 6,5.
  - `>`: de (37,14) a (52,32) y a (37,50), trazo 6,5.
  - `/`: de (36,14) a (28,50), trazo 5.
  - Todas las puntas son redondeadas.
- **LinkedIn:** el mismo concepto, sobre un cuadrado negro de esquinas redondeadas. A simple vista, los signos están más separados y la barra no los toca.

**Problemas:**
1. **La barra se pega a los signos.** Su extremo de arriba (36,14) está a 1 unidad de la punta del `>` (37,14). El de abajo (28,50) está a 1 unidad de la punta del `<` (27,50). Con las puntas redondeadas, los trazos se superponen casi 5 unidades, y el `</>` se lee como un solo zigzag. **Esto es lo que lo hace ver descuadrado.**
2. **Grosores distintos:** los signos tienen 6,5 y la barra 5, así que la barra se ve más débil.
3. **La barra ocupa toda la altura** de los signos (de 14 a 50) y no le queda aire.
4. **En tamaños chicos** (favicon de 16 px), un trazo de 5/64 mide poco más de 1 px y la barra roja casi desaparece.

**Propuesta:**
- Separar la barra de los signos con un espacio visible, al menos tanto como el grosor del trazo.
- Un solo grosor para los tres trazos.
- Barra algo más corta que los signos y centrada, para que el rojo respire.
- Revisar el ángulo de la barra para que sea paralelo, o claramente distinto, al de los brazos de los signos, no «casi igual».
- Construirlo sobre una cuadrícula (por ejemplo, 24 o 48 unidades) con medidas redondas, para que se pueda redibujar exacto.
- Comparar dos o tres versiones lado a lado (en una página de prueba o en el lienzo de diseño) antes de elegir.

**Decisiones pendientes:**
- ¿El isotipo va solo o siempre dentro del cuadrado negro, como en LinkedIn?
- ¿Puntas redondeadas (como ahora) o rectas?

**Entregable:** `isotipo.svg` limpio, con medidas redondas, más sus variantes (1.4).

### 1.2 Logotipo (el nombre escrito)

**Hoy:**
- **Mock:** `rebel‹DEV›` en Bricolage Grotesque 800. Los `‹ ›` son **caracteres de la fuente**, en rojo.
- **LinkedIn (banner):** `REBEL‹DEV›` en mayúsculas espaciadas, en pequeño.

**Problemas:**
1. Los `‹ ›` de la fuente son pequeños y quedan a la altura de las minúsculas, mientras «DEV» va en mayúsculas. Se ven bajos y desalineados.
2. No tienen el ángulo ni el grosor de los `< >` del isotipo, así que el ícono y el nombre no parecen de la misma familia.
3. Al ser texto, cambian si la fuente no carga o según el navegador.

**Propuesta:**
- Dibujar los `‹ ›` del logotipo como vectores, iguales en ángulo y grosor a los del isotipo y con la altura de las mayúsculas.
- Pasar todo el logotipo a SVG, sin depender de la fuente.
- Ajustar a mano el espacio entre las letras (en «rebel» y alrededor de los signos).

**Decisiones pendientes:** cómo se escribe (ver 2).

**Entregable:** `logotipo.svg`.

### 1.3 Isotipo + logotipo juntos

**Hoy:** el mock los pone uno al lado del otro con 74 px de ícono y 20 px de espacio, sin regla.

**Propuesta:**
- Definir la proporción: por ejemplo, el ícono igual de alto que las mayúsculas más los rasgos que bajan, y un espacio igual al grosor de uno de los signos.
- Fijar un área de respeto alrededor (el mock propone «la altura de un corchete»).
- Fijar tamaños mínimos (el mock propone 24 px para el isotipo).
- Una versión horizontal (ícono a la izquierda) y, si hace falta, una vertical (ícono arriba).

**Entregable:** `logo-horizontal.svg` (y la vertical, si se decide).

### 1.4 Variantes

**Hoy (mock):** sobre oscuro, sobre claro, isotipo solo y «monocromo rojo».

**Problemas:**
1. **Contradicción:** el mock dice que la barra va «siempre presente y siempre roja», pero en la variante «monocromo rojo» la pone **negra**.
2. **Dos rojos distintos:** `#FF2D3F` sobre oscuro y `#E4121F` sobre claro.

**Propuesta:**
- Variantes: sobre oscuro (principal), sobre claro y una de un solo color (todo crema o todo negro) para sellos y grabados.
- Si se mantiene la variante sobre fondo rojo, la barra va en crema, no en negro, o se quita esa variante.
- Usar el mismo rojo en todas las variantes, o dos rojos con una regla clara (ver 3).

**Entregable:** las variantes en SVG, más una hoja de uso con lo que sí y lo que no se puede hacer.

### 1.5 Favicon e ícono de app

**Hoy:** `public/favicon.svg` es todavía el de Astro.

**Propuesta:** una versión simplificada del isotipo para 16–32 px, con trazos más gruesos y la barra bien separada, sobre el cuadrado negro. Exportar en SVG, en PNG de 180 px (Apple) y de 512 px.

**Entregable:** `favicon.svg`, `apple-touch-icon.png` e `icon-512.png`.

---

## 2. Nombre: cómo se escribe

**Hoy, tres formas:**

| Forma | Dónde aparece |
|---|---|
| `RebelDEV` | LinkedIn y textos |
| `rebel‹DEV›` | Logotipo del mock |
| `REBEL‹DEV›` | Banner de LinkedIn |

**Propuesta:**
- **En textos corridos,** siempre `RebelDEV` (ya es la regla de `../CLAUDE.md`).
- **En el logotipo,** elegir una sola forma, `rebel‹DEV›` o `REBEL‹DEV›`, y usarla en todo: web, redes y banner.

**Decisión pendiente:** ¿minúscula + mayúscula (`rebel‹DEV›`) o todo en mayúsculas (`REBEL‹DEV›`)?

---

## 3. Color

**Hoy (mock):** fondo `#0B0A0E`, tarjetas `#141019` y `#1D1824`, rojos `#E4121F` y `#FF2D3F`, ámbar `#FF6A2C`, crema `#F4F0E8` y grises `#A7A0A8` y `#7C757F`. En LinkedIn, el rojo es `#F43042` y el negro `#080808`.

### Contraste calculado (fórmula WCAG, 23 oct 2026)

El texto normal necesita **4,5:1**. El texto grande (más de 24 px, o 19 px en negrita) y los íconos necesitan **3:1**.

| Color de texto | Sobre `#0B0A0E` | Sobre `#141019` | Sobre `#1D1824` |
|---|---|---|---|
| Crema `#F4F0E8` | 17,36 ✔ | 16,53 ✔ | 15,29 ✔ |
| Gris `#A7A0A8` | 7,74 ✔ | 7,37 ✔ | 6,82 ✔ |
| Gris tenue `#7C757F` | **4,42 ✘** | **4,21 ✘** | **3,90 ✘** |
| Rojo `#E4121F` | **4,14 ✘** | **3,94 ✘** | **3,65 ✘** |
| Rojo vivo `#FF2D3F` | 5,36 ✔ | 5,10 ✔ | 4,72 ✔ |
| Rojo LinkedIn `#F43042` | 5,03 ✔ | 4,78 ✔ | **4,43 ✘** |
| Ámbar `#FF6A2C` | 6,91 ✔ | 6,57 ✔ | 6,08 ✔ |

Sobre fondo claro (crema `#F4F0E8`): el negro da 17,36 ✔, el rojo `#E4121F` 4,19 (solo sirve para texto grande o el logo) y el rojo vivo `#FF2D3F` **3,24** (solo para elementos grandes).

**Problemas:**
1. **El gris tenue `#7C757F` no se lee bien en texto pequeño** sobre ningún fondo oscuro, y el mock lo usa justo en lo más pequeño: etiquetas de 10–12 px y notas.
2. **El rojo `#E4121F` no sirve para texto pequeño sobre oscuro.** Sirve para el logo, botones grandes o fondos.
3. **Tres rojos y un ámbar** (`#E4121F`, `#FF2D3F`, `#F43042`, `#FF6A2C`) es mucho acento para la regla de «rojo con disciplina».

**Propuesta:**
- **Un rojo de marca** para el logo, los botones y la barra `/`, y como máximo **un rojo para texto** sobre oscuro (el rojo vivo `#FF2D3F` pasa la prueba). Elegir uno y retirar los otros.
- **Aclarar el gris tenue** hasta pasar 4,5:1, o usarlo solo en texto grande.
- **Ámbar:** quitarlo o dejarlo para un único uso concreto. Hoy no tiene un papel claro.
- **Fondo:** elegir entre el grano de LinkedIn y los degradados del mock, o combinarlos, pero con un solo criterio.
- Pasar la paleta final a variables de Tailwind (`@theme` en `src/styles/global.css`).

**Decisiones pendientes:**
- ¿Qué rojo es el principal?
- ¿Se queda el ámbar?
- ¿Fondo con grano, con degradado o ambos?

**Entregable:** la paleta final con nombre, uso y contraste de cada color, más el bloque `@theme`.

---

## 4. Tipografía

**Hoy (mock):** Bricolage Grotesque 800 en titulares y logotipo, Instrument Sans en el texto y JetBrains Mono en etiquetas y números. Se cargan desde Google Fonts.

**Problemas:**
1. **Tres familias.** `frontend-design` recomienda una o dos, y la monoespaciada en etiquetas es una de sus «señales de diseño hecho por IA».
2. **No hay una escala de tamaños:** el mock usa tamaños sueltos (12, 13, 14, 15,5, 17, 19 px…).
3. **Se cargan desde Google Fonts:** servirlas desde el propio sitio es más rápido y no envía datos de los visitantes a Google.

**Propuesta:**
- **Mantener** Bricolage (titulares) e Instrument Sans (texto).
- **Reducir JetBrains Mono** a lo que de verdad es «código» (por ejemplo, fragmentos que muestren cómo trabaja RebelDEV) o quitarla.
- **Definir una escala** de 6 o 7 tamaños con su interlineado y usar solo esos.
- **Servir las fuentes desde el sitio** y probar tildes, ñ, ¿ y ¡ en cada una.

**Decisión pendiente:** ¿se queda la monoespaciada, y para qué?

**Entregable:** la tabla de tipos (familia, peso y uso), la escala de tamaños y las fuentes servidas desde el proyecto.

---

## 5. Recursos gráficos

| Recurso | Hoy (mock) | Propuesta |
|---|---|---|
| Barra `/` roja | Separador en los servicios del banner | **Se queda:** es la firma de la marca. Usarla poco, para que no pierda fuerza. |
| Etiqueta en mayúsculas con número («01 — La marca») | Encima de cada título | **Cambiar:** numerar solo lo que es una secuencia (pasos de cómo funciona RebelBot, cómo trabajamos). El resto, sin etiqueta. |
| Tarjetas oscuras con borde fino | En casi todas las secciones, todas iguales | **Cambiar:** tarjetas solo donde se compara o se agrupa. Variar la forma según lo que importa. |
| Chip del eslogan con punto rojo brillante | En el hero | **Revisar:** decidir si aporta o es adorno. |
| Degradados radiales rojo y ámbar | Fondo de toda la página | **Decidir** junto con el fondo (ver 3). |
| Grano | Solo en LinkedIn | **Decidir** junto con el fondo (ver 3). |

**Criterio:** según `frontend-design`, se elige **un solo elemento memorable** (por ejemplo, la pantalla de carga con el `</>` o la sección fija de RebelBot) y el resto se mantiene sobrio.

**Entregable:** la lista final de recursos con su regla de uso.

---

## 6. Voz y eslogan

**Hoy:** la voz del mock está bien definida (directa, segura, sin jerga, sin cifras inventadas) y ya está pasada a `../CLAUDE.md`. El eslogan oficial es «Ingeniería para empresas rebeldes.», con «rebeldes.» en rojo en el banner.

**Problema:** resaltar una sola palabra del titular en otro color es una de las «señales de IA» que marca `frontend-design`. Aquí, en cambio, viene de la marca (el banner de LinkedIn), y la skill misma dice que lo decidido por el cliente manda.

**Propuesta:**
- Mantener el texto del eslogan tal cual (es oficial).
- Decidir si «rebeldes.» va en rojo **solo en el logo o banner** o también en el titular del hero.

**Decisión pendiente:** ¿«rebeldes.» en rojo también en el hero del landing?

---

## 7. Piezas derivadas

Dependen del logo (1) y del color (3). Se hacen al final.

| Pieza | Para qué | Hoy |
|---|---|---|
| Favicon e íconos | Pestaña del navegador, acceso directo en el celular | El de Astro |
| Imagen para compartir (Open Graph, 1200 × 630) | Vista previa al compartir el enlace en WhatsApp, LinkedIn y otras redes | No existe |
| Foto de perfil y portada | LinkedIn y otras redes | La actual de LinkedIn; actualizarla con el logo nuevo |

---

## 8. Propuestas de logo (23 oct 2026)

A pedido del usuario. **Se ven en `propuestas-logo.html`** (abrirlo en el navegador): cada opción dibujada sobre oscuro, sobre claro y a tamaño real. Todas siguen lo propuesto en 1.1 y 1.2: un solo grosor, la barra separada de los signos y con otro ángulo, cuadrícula de 48 y los signos del nombre dibujados como los del isotipo, a la altura de las mayúsculas. Son propuestas de Claude; nada está decidido.

### 8.1 Isotipos

| Código | Nombre | Idea | A favor | En contra |
|---|---|---|---|---|
| **I-A** | Clásico corregido | El de LinkedIn, arreglado. | Continuidad con lo publicado. | Es el `</>` que usan muchos estudios. |
| I-B | Recto | Puntas y vértices en ángulo. | Preciso, más «ingeniería». | Menos cercano. |
| I-C | La barra se sale | La barra roja es más alta que los signos y rompe el molde. | Cuenta la idea rebelde en un gesto; se distingue. | Pide más alto; en el cuadrado los signos quedan más chicos. |
| I-D | Solo la barra | La barra roja en el cuadrado negro. | Perfecto a 16 px; marca secundaria. | Sola no dice «software». |
| I-E | Llaves | `{/}` en vez de `</>`. | Habla de lógica y backend; casi nadie lo usa. | Rompe con lo publicado. |

### 8.2 Logotipos

| Código | Forma | Comentario |
|---|---|---|
| L-1 | `rebel‹DEV›` | El del mock, corregido. No lleva la barra roja. |
| L-2 | `REBEL</DEV>` | Mayúsculas, como el banner. Sobrio; muy ancho. |
| L-3 | `rebel</dev>` | Idea del usuario. Con actitud; pierde el «DEV» del nombre oficial. |
| L-4a | `Rebel<DEV>` | Idea del usuario. El más fiel al nombre; sin barra. |
| L-4b | `Rebel<dev>` | Idea del usuario. Más amable; sin barra. |
| L-5 | `Rebel</DEV>` | Nombre oficial con barra; la etiqueta de cierre sola puede leerse como «terminado». |
| **L-6** | `<RebelDEV/>` | El nombre como componente que se cierra solo: lleva los tres signos del isotipo. |
| L-7 | `rebel/dev` | Solo la barra roja, como una ruta. El más limpio. |
| L-8 | `rebel</dev>` en JetBrains Mono | Literal, «de editor»; menos premium. |
| L-9 | `RebelDEV` limpio | «Rebel» grueso y «DEV» fino; el código lo pone el isotipo al lado. |

**Regla que sale de aquí:** si el logotipo lleva signos (L-1 a L-8), conviene usarlo solo, sin el isotipo al lado, para no repetir el `</>`. El isotipo queda para favicon, foto de perfil y sellos.

### 8.3 Isotipo + logotipo: imagotipo o isologo

**Términos:**

| Término | Qué es |
|---|---|
| Isotipo | Solo el símbolo (el `</>`). |
| Logotipo | Solo el nombre escrito. |
| Imagotipo | Símbolo + nombre, uno al lado del otro. Se pueden separar. |
| Isologo | Símbolo y nombre fundidos en una sola pieza. No se separan. |

**Primera versión descartada (23 oct 2026):** al usuario le parecieron feas y sin coherencia. Fallaba: el `</>` aparecía dos veces (en el ícono y en el nombre), el ícono tenía otro grosor que las letras, tamaños y separación a ojo, y «Estudio de software» diminuto.

**Reglas de la versión nueva:**
1. **Un solo trazo:** signos e ícono con el grosor de las letras (0,22 de la altura de una mayúscula; las letras de Bricolage 800 miden 0,25 y las diagonales se compensan).
2. **Sin repetir:** si el nombre lleva signos, va solo (isologo). Si lleva el ícono al lado, el nombre va limpio (imagotipo).
3. **Medidas fijas:** el ícono mide una mayúscula de alto; separación de media mayúscula; entre signo y signo, medio trazo.
4. **Sin texto chico pegado:** «Estudio de software» va aparte.
5. El isotipo I-A se arma con los mismos tres signos del nombre.

| Código | Tipo | Forma | Su ícono |
|---|---|---|---|
| **S-1** | Isologo | `<RebelDEV/>` | `</>` (I-A): el mismo dibujo sin el nombre |
| S-2 | Imagotipo | `</>` + `RebelDEV`, el ícono del alto de una mayúscula | `</>` (I-A) |
| S-3 | Imagotipo | Cuadrado con `</>` + `RebelDEV` (sobre oscuro, cuadrado claro) | El cuadrado |
| S-4 | Isologo | `rebel/dev` | La barra sola (I-D) |

### 8.4 Variantes (mostradas con S-1)

Sobre oscuro (principal), sobre claro (con el rojo `#E4121F`), una tinta clara y una tinta oscura (para grabados), isotipo en cuadrado, isotipo suelto, favicon (48, 32 y 16 px), en la barra de la web y como foto de perfil circular. **Sobre rojo:** la barra no puede ir roja, así que se propone no usar esa variante (resuelve la contradicción de 1.4).

### 8.5 Recomendación de Claude

- **S-1 (isologo):** `<RebelDEV/>`, con I-A como ícono aparte. Se lee igual que el nombre en los textos, lleva la barra roja y el isotipo es el logotipo sin el nombre. El componente que se cierra solo encaja con «pieza por pieza».
- **Alternativa:** S-2 (imagotipo), si prefieren el nombre sin signos.
- **Con la idea del usuario:** `rebel</dev>` (L-3) en lugar de L-6; funciona igual que S-1.
- **Favicon:** probar I-D si I-A no se lee bien a 16 px.

**Decidido (25 oct 2026):** logotipo `Rebel</DEV>` (L-5), sin isotipo al lado (regla de 8.2). Los signos y la barra van en rojo. Pendiente: SVG definitivo del logotipo, en versión oscura y clara, con el isotipo en cuadrado.

---

## Orden de trabajo

1. **Isotipo** (1.1): versiones de prueba lado a lado → elegir una.
2. **Nombre** (2) y **logotipo** (1.2).
3. **Logo completo y variantes** (1.3 y 1.4).
4. **Color** (3): paleta final y `@theme`.
5. **Tipografía** (4).
6. **Recursos gráficos** (5) y **eslogan** (6).
7. **Piezas derivadas** (7).

---

## Preguntas para el usuario o Fredy

**Respuestas (25 oct 2026):**
- 1. El isotipo va dentro de un cuadrado. Hay dos versiones: clara y oscura (ver `logo-rebeldev.html`).
- 2. Puntas redondeadas.
- 3. Favicon con I-A.
- 5. Rojo principal `#E4121F`, por ahora.
- 8. «rebeldes.» sin rojo por ahora; el color se cambiará más adelante.
- 9. Se mantiene JetBrains Mono por ahora.
- 10. Multilenguaje (se usa el soporte de Astro para varios idiomas); los idiomas, por definir.
- 11. Dominio y hosting: se definen después.
- 12. Foto de Fredy y URL de LinkedIn: para futuras versiones.
- 4. En grabados de un solo color la barra se mantiene: el logo va completo, con la barra del mismo color que el resto.
- 6. Se queda el ámbar `#FF6A2C`.
- 13. Datos de Fredy (BCP, edad): son datos de prueba. Se usan para ver cómo queda el landing y se cambian por los reales después.

- 7. Fondo liso: negro sólido, sin grano ni degradado.

**Siguen abiertas:** ninguna. Todas las preguntas de esta lista están respondidas.

Las preguntas originales:

1. ¿El isotipo va siempre dentro del cuadrado negro o también solo?
2. ¿Puntas redondeadas o rectas?
3. ¿Logotipo `rebel‹DEV›` o `REBEL‹DEV›`?
4. ¿Cuál es el rojo principal: `#E4121F`, `#FF2D3F` o `#F43042`?
5. ¿Se queda el ámbar?
6. ¿Fondo con grano, con degradado o ambos?
7. ¿Se queda la fuente monoespaciada, y para qué?
8. ¿«rebeldes.» en rojo también en el hero?
9. ¿Qué isotipo (I-A a I-E), qué logotipo (L-1 a L-9) y qué sistema (S-1 a S-4)? Ver sección 8.
10. ¿Isologo (el nombre lleva los signos y va solo) o imagotipo (ícono al lado y nombre limpio)?
11. Para grabados de un solo color, ¿se permite que la barra pierda el rojo?
