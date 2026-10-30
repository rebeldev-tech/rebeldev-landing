// Lógica del diagnóstico de la versión 4. Funciones puras: sirven al compilar (enlace por defecto,
// sin JavaScript) y en el navegador. El estado vivo está en src/scripts/v4/estado.ts.
import { contacto } from '../data/contacto';
import { servicios } from '../data/estudio';
import { sintomas, modulos as ordenModulos, hero, mensajeWa, type Modulo, type Sintoma } from '../data/v4';

export type Diagnostico = { ids: string[]; sintomas: Sintoma[]; modulos: Modulo[] };

/** Síntomas elegidos (en el orden de la lista) y las piezas que encienden, sin repetir y en orden fijo. */
export function calcular(ids: readonly string[]): Diagnostico {
  const elegidos = sintomas.filter((s) => ids.includes(s.id));
  const set = new Set(elegidos.flatMap((s) => s.modulos));
  return { ids: elegidos.map((s) => s.id), sintomas: elegidos, modulos: ordenModulos.filter((m) => set.has(m)) };
}

/** Nombre largo del servicio de cada pieza (sale de estudio.servicios). */
export function nombre(m: Modulo) {
  return servicios.find((s) => s.g === m)?.t ?? m;
}

/** «a, b y c», con «e» delante de palabras que empiezan con sonido i («e integraciones»).
 *  Si algún nombre ya lleva «y» («backend y APIs»), va coma antes de la última, para que se lea bien. */
function unir(xs: string[]) {
  if (xs.length < 2) return xs.join('');
  const last = xs[xs.length - 1];
  const y = /^h?i(?![aeou])/i.test(last) ? 'e' : 'y';
  const coma = xs.length > 2 && xs.some((x) => / y /.test(x)) ? ',' : '';
  return `${xs.slice(0, -1).join(', ')}${coma} ${y} ${last}`;
}

/** Frase del resultado bajo los síntomas. */
export function resumen(d: Diagnostico) {
  if (!d.ids.length) return hero.vacio;
  if (!d.modulos.length) return hero.soloOtra;
  const xs = d.modulos.map(nombre);
  return `${hero.prefijo}: ${unir(xs.map((x, i) => (i ? x.charAt(0).toLowerCase() + x.slice(1) : x)))}.`;
}

/** Texto que llega por WhatsApp. */
export function mensaje(ids: readonly string[]) {
  const d = calcular(ids);
  if (!d.sintomas.length) return mensajeWa.saludo;
  return `${mensajeWa.saludo}\n${mensajeWa.sintomas}\n${d.sintomas.map((s) => `- ${s.t}`).join('\n')}`;
}

/** Enlace de WhatsApp con el mensaje ya escrito. Los espacios van como %20 (con «+» podrían verse tal cual). */
export function enlaceWhatsApp(ids: readonly string[] = []) {
  const url = new URL(contacto.whatsappLink);
  return `${url.origin}${url.pathname}?text=${encodeURIComponent(mensaje(ids))}`;
}
