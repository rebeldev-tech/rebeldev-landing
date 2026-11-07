// @ts-nocheck -- corre en Bun (globales Bun y HTMLRewriter); el proyecto no instala @types/bun.
// Pasa el landing compilado (dist/index.html) a texto, en el orden de la página, para que lo lean los clientes ficticios.
// Uso (desde rebeldev-landing/): bun .claude/skills/panel-clientes/scripts/extraer.ts [entrada.html] [salida.md]
// Se descartan los duplicados decorativos (aria-hidden), salvo el panel recreado y las demos de servicios,
// que el visitante sí ve en pantalla: esos se incluyen, marcados.

export {};

const [input = 'dist/index.html', output] = Bun.argv.slice(2);
const html = await Bun.file(input).text();

const SKIP = new Set(['script', 'style', 'svg', 'noscript', 'template', 'head']);
const BLOCK = new Set([
  'p', 'li', 'tr', 'div', 'section', 'article', 'header', 'footer', 'nav', 'main', 'ul', 'ol', 'table',
  'thead', 'tbody', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'blockquote', 'details', 'summary', 'form', 'label',
]);
const HEADING: Record<string, string> = { h1: '# ', h2: '## ', h3: '### ', h4: '#### ', h5: '##### ', h6: '###### ' };
// Bloques aria-hidden que son contenido real en pantalla, no duplicados
const VISIBLE_HIDDEN = ['data-panel', 'data-escena'];
// Los elementos en línea dejan un separador suave; solo se vuelve espacio entre dos palabras (ver UNIR, abajo).
const INLINE = new Set(['span', 'b', 'strong', 'em', 'i', 'small', 'time', 'mark', 'abbr', 's']);
const SOFT = '\u0001';

let out = '';
let skip = 0; // profundidad dentro de bloques descartados

const push = (s: string) => {
  if (!skip) out += s;
};

const rewriter = new HTMLRewriter().on('*', {
  element(el) {
    const tag = el.tagName.toLowerCase();

    if (!el.canHaveContent) {
      if (tag === 'br') push('\n');
      if (tag === 'img') {
        const alt = el.getAttribute('alt');
        if (alt) push(` [imagen: ${alt}] `);
      }
      if (tag === 'input') {
        const label = el.getAttribute('aria-label') ?? el.getAttribute('placeholder');
        if (label) push(` [campo: ${label}] `);
      }
      return;
    }

    const hidden = el.getAttribute('aria-hidden') === 'true' || el.hasAttribute('hidden');
    const keepHidden = hidden && VISIBLE_HIDDEN.some((a) => el.hasAttribute(a));
    const skipThis = SKIP.has(tag) || (hidden && !keepHidden);

    let close = '';
    if (skipThis) {
      skip++;
    } else {
      if (tag === 'section' || tag === 'footer' || tag === 'nav') {
        const id = el.getAttribute('id');
        push(`\n\n---\n[${tag === 'section' ? 'sección' : tag === 'footer' ? 'pie de página' : 'barra de navegación'}${id ? ` #${id}` : ''}]\n`);
      }
      if (keepHidden) {
        push('\n[se ve en pantalla, como imagen animada:]\n');
        close += '\n[fin de la imagen]\n';
      }
      if (HEADING[tag]) {
        push(`\n\n${HEADING[tag]}`);
        close += '\n';
      } else if (tag === 'button' || tag === 'a') {
        push(' [');
        close += '] ';
      } else if (tag === 'td' || tag === 'th') {
        push(' | ');
      } else if (BLOCK.has(tag)) {
        push('\n');
        close += '\n';
      } else if (INLINE.has(tag)) {
        close += SOFT;
      }
    }

    el.onEndTag(() => {
      if (skipThis) skip--;
      else push(close);
    });
  },
  text(t) {
    push(t.text);
  },
});

await rewriter.transform(new Response(html)).text();

const decode = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

// UNIR: el separador suave se vuelve espacio entre una palabra (o . : %) y el comienzo de la siguiente.
const joined = out.replace(/([\p{L}\p{N}.:%?!])\u0001+(?=[\p{L}\p{N}¿¡])/gu, '$1 ').replaceAll(SOFT, '');

const text = decode(joined)
  .split('\n')
  .map((line) => line.replace(/[ \t]+/g, ' ').replace(/\[ +/g, '[').replace(/ +\]/g, ']').replace(/\[\]/g, '').trim())
  .join('\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

if (output) await Bun.write(output, `${text}\n`);
else console.log(text);
