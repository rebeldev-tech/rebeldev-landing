// Panel fijo con pasos: el avance dentro de un tramo alto elige el paso visible (cada uno reemplaza al anterior
// en el mismo lugar) y lleva la línea de tiempo de la escena hasta su etiqueta p1, p2… Lo usan Servicios y Producto.
import { ScrollTrigger, reduceMotion } from '../motion';

export type Pasos = { iniciar(): void; parar(): void };

type Opciones = {
  track: HTMLElement;
  pasos: HTMLElement[];
  barras?: HTMLElement[];
  tl?: gsap.core.Timeline | null;
  alCambiar?: (i: number) => void;
};

export function montarPasos({ track, pasos, barras = [], tl = null, alCambiar }: Opciones): Pasos {
  let triggers: ScrollTrigger[] = [];
  let salto: gsap.core.Animation | null = null;
  let k = -1;
  const n = pasos.length;

  function ir(i: number) {
    if (i === k) return;
    k = i;
    pasos.forEach((p, j) => { p.classList.toggle('is-on', j === i); p.classList.toggle('is-pasado', j < i); });
    barras.forEach((b, j) => { b.classList.toggle('is-on', j === i); b.classList.toggle('is-hecho', j < i); });
    alCambiar?.(i);
    if (!tl) return;
    salto?.kill();
    const etiqueta = `p${i + 1}`;
    if (reduceMotion) { tl.seek(etiqueta); return; }
    const atras = tl.time() - tl.labels[etiqueta];
    salto = tl.tweenTo(etiqueta, atras > 0 ? { duration: Math.min(0.6, atras) } : {});
  }

  return {
    iniciar() {
      k = -1;
      tl?.pause(0);
      ir(0);
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
  };
}
