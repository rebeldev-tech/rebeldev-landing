---
name: panel-clientes
description: Panel de 12 clientes ficticios (distintos trabajos, edades y recursos) que revisan el landing de RebelDEV y responden «¿Lo compran o lo ignoran?». Usar cuando el usuario pida «panel de clientes», «clientes ficticios», «¿lo compran o lo ignoran?», probar la reacción a la página o a los precios sin publicidad, o repetir el panel después de cambiar la página.
---

# Panel de clientes ficticios

Cada cliente es un agente aparte, con su ficha, que revisa la página como lo haría esa persona y decide qué hace. El informe se arma **solo con lo que dicen ellos**: conteos y citas, sin opinión propia.

**Límite (decirlo siempre en el resumen):** es una simulación. Sirve para encontrar lo que confunde, las objeciones y en qué parte se va la gente. No predice cuántos compran de verdad: los clientes simulados con IA suelen ser más optimistas y parecidos entre sí que la gente real. Las 3 conclusiones principales se confirman con 5 conversaciones reales.

## Archivos

| Archivo | Qué es |
|---|---|
| `personas.md` | Las 12 fichas y los grupos A a D. Todo inventado. |
| `consigna.md` | La instrucción para cada cliente y el formato de su respuesta. |
| `scripts/extraer.ts` | Pasa `dist/index.html` a texto, en el orden de la página. |

Los resultados van a `.panel-clientes/<fecha>/` (fuera de git): `pagina.md`, `capturas/`, `respuestas/` e `informe.md`.

## Procedimiento

Todo desde `rebeldev-landing/`. `<fecha>` = AAAA-MM-DD de hoy; si ya existe, agregar `-2`, `-3`…

1. **Texto de la página.** `bun run build` y después `bun .claude/skills/panel-clientes/scripts/extraer.ts dist/index.html .panel-clientes/<fecha>/pagina.md`. Revisar que estén todas las secciones (`grep "^\[sección"`).
2. **Capturas.** Desde `dist/` (para que los recursos `/_astro/` carguen): `node ../.claude/skills/design-taste-frontend/scripts/inspect.mjs index.html --widths 1440,390 --out ../.panel-clientes/<fecha>/capturas`. Sus FAIL y WARN son reglas de esa skill y no aplican aquí; solo importan las imágenes (`desktop-*` y `mobile-*`). Si no se pueden sacar, los clientes trabajan solo con el texto, y el informe lo dice.
3. **Prueba con un cliente.** Lanzar solo a la #02 (Rosa). Revisar que respete el formato, que hable como persona y no como consultor, y que haga su cuenta. Si falla, ajustar `consigna.md` antes de seguir.
4. **El resto, todos juntos.** Un agente `general-purpose` por cliente, los 11 lanzados en el mismo mensaje. El encargo es la consigna (entre las líneas `=====`) con `{{FICHA}}` (solo la ficha de ese cliente; nunca la ruta de `personas.md`), `{{CARPETA}}` (ruta absoluta) y `{{DISPOSITIVO}}` (`mobile` si su ficha dice celular, `desktop` si dice laptop).
5. **Guardar.** Cada respuesta, tal cual, en `respuestas/NN-nombre.md`. Comprobar que tenga todas las secciones y un veredicto válido. Si no, se relanza ese cliente una sola vez.
6. **Informe** (`informe.md`), solo con conteos y citas:
   1. **¿Lo compran o lo ignoran?** «Lo compran» = AGENDA DEMO o COMPRA. «Lo ignoran» = IGNORA o LO GUARDA PARA DESPUÉS. PREGUNTA POR WHATSAPP se cuenta aparte, como interés. Total y por grupo (A a D).
   2. **Embudo:** cuántos SIGUEN después del primer vistazo y en qué sección dudan o se van.
   3. **Comprensión:** cuántos explican bien qué es el producto en una frase.
   4. **Precio:** la cuenta de cada uno frente a la cuenta correcta, con `creditosMes` y `conIgv` de `src/data/precios.ts` (créditos = conversaciones × 1.048833; por uso hasta 1,500 créditos al mes; por encima, el plan que corresponda). Si alguien entendió mal, no se corrige: se cuenta como un problema de claridad. También va lo máximo que pagaría cada uno.
   5. **Objeciones**, ordenadas por cuántos las dijeron, con citas textuales.
   6. **Mejoras:** cada una con la sección, el archivo (`src/data/v1.ts`, `src/data/precios.ts`, `src/components/v1/…`) y los clientes que la pidieron. Lo que ningún cliente pidió no entra.
   7. **Límites y siguiente paso:** las 3 conclusiones principales, para confirmarlas con 5 conversaciones reales.
7. **Cerrar.** Resumen corto en el chat, con el límite de arriba y la ruta del informe. **No cambiar la página:** las mejoras se aplican en otro pedido.

## Para comparar corridas

Si hay una corrida anterior en `.panel-clientes/`, agregar al informe una tabla con los veredictos por cliente, antes y ahora. Los clientes no cambian entre corridas: si se edita una ficha, decirlo en el informe.
