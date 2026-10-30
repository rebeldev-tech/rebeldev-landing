// La selección del diagnóstico en el navegador (versión 4). Se guarda en la sesión y se avisa con el
// evento «rd:diag» (detail: Diagnostico). Lo escuchan la barra, el hero, las preguntas y el cierre.
import { calcular, type Diagnostico } from '../../lib/diagnostico';

const KEY = 'rd-v4-diag';
const EVENTO = 'rd:diag';

export function leer(): Diagnostico {
  try {
    const raw = JSON.parse(sessionStorage.getItem(KEY) || '[]');
    return calcular(Array.isArray(raw) ? raw.filter((x) => typeof x === 'string') : []);
  } catch (e) {
    return calcular([]);
  }
}

export function guardar(ids: readonly string[]): Diagnostico {
  const d = calcular(ids);
  try { sessionStorage.setItem(KEY, JSON.stringify(d.ids)); } catch (e) {}
  document.dispatchEvent(new CustomEvent<Diagnostico>(EVENTO, { detail: d }));
  return d;
}

/** Llama a cb ahora con el estado actual y después en cada cambio. Devuelve la función para dejar de escuchar. */
export function alCambiar(cb: (d: Diagnostico) => void) {
  const fn = (e: Event) => cb((e as CustomEvent<Diagnostico>).detail);
  document.addEventListener(EVENTO, fn);
  cb(leer());
  return () => document.removeEventListener(EVENTO, fn);
}
