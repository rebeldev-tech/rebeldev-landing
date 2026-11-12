// Panel fijo con pasos: el avance dentro de un tramo alto elige el paso visible (cada uno reemplaza al anterior
// en el mismo lugar) y lleva la línea de tiempo de la escena hasta su etiqueta p1, p2… Lo usan Servicios y Producto.
// Con porClic no hay tramo alto: el paso lo elige quien llama a ir().
import { ScrollTrigger, reduceMotion } from '../motion';

export type Pasos = { iniciar(): void; parar(): void; ir(i: number): void; actual(): number };

type Opciones = {
  track: HTMLElement;
  pasos: HTMLElement[];
  barras?: HTMLElement[];
  tl?: gsap.core.Timeline | null;
  alCambiar?: (i: number) => void;
  porClic?: boolean;
};

export function montarPasos({ track, pasos, barras = [], tl = null, alCambiar, porClic = false }: Opciones): Pasos {
  let triggers: ScrollTrigger[] = [];
  let salto: gsap.core.Animation | null = null;
  let k = -1;
  const n = pasos.length;

  function ir(i: number) {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === k) return;
    const contiguo = i === k + 1;
    k = i;
    pasos.forEach((p, j) => { p.classList.toggle('is-on', j === i); p.classList.toggle('is-pasado', j < i); });
    barras.forEach((b, j) => { b.classList.toggle('is-on', j === i); b.classList.toggle('is-hecho', j < i); });
    alCambiar?.(i);
    if (!tl) return;
    salto?.kill();
    const etiqueta = `p${i + 1}`;
    if (reduceMotion) { tl.seek(etiqueta); return; }
    // Por clic se puede saltar a cualquier paso: se va al inicio de ese paso y se reproduce solo su parte,
    // en vez de pasar corriendo por todos los del medio.
    if (porClic && !contiguo) {
      tl.seek(i === 0 ? 0 : `p${i}`);
      salto = tl.tweenTo(etiqueta);
      return;
    }
    const atras = tl.time() - tl.labels[etiqueta];
    salto = tl.tweenTo(etiqueta, atras > 0 ? { duration: Math.min(0.6, atras) } : {});
  }

  return {
    iniciar() {
      k = -1;
      tl?.pause(0);
      ir(0);
      if (porClic) return;
      triggers = [ScrollTrigger.create({
        trigger: track, start: 'top top', end: 'bottom bottom',
        onUpdate: (self) => ir(Math.min(n - 1, Math.floor(self.progress * n))),
      })];
    },
    parar() {
      triggers.forEach((t) => t.kill());
      triggers = [];
      salto?.kill();
    },
    ir,
    actual: () => k,
  };
}
