// Animaciones de los íconos de servicios (Glifo.astro).
// Cada una arma el ícono en pequeño: la pieza roja es la que «hace el trabajo».
import { gsap } from './motion';

type Q = (a: string) => Element[];

const glifos: Record<string, (q: Q) => gsap.core.Timeline> = {
  medida: (q) => gsap.timeline({ paused: true })
    .from(q('l'), { x: -10, autoAlpha: 0, duration: 0.6 })
    .from(q('r'), { x: 10, autoAlpha: 0, duration: 0.6 }, '<')
    .fromTo(q('s'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.5, ease: 'power4.out' }, '-=0.2'),
  auto: (q) => gsap.timeline({ paused: true })
    .from(q('ring'), { rotation: -300, svgOrigin: '32 32', autoAlpha: 0, duration: 1.2, ease: 'power3.inOut' })
    .from(q('dot'), { scale: 0, transformOrigin: '50% 50%', duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, '-=0.5'),
  web: (q) => gsap.timeline({ paused: true })
    .fromTo(q('frame'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.8, ease: 'power2.inOut', stagger: 0.15 })
    .from(q('blk'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, stagger: 0.1 }, '-=0.3'),
  api: (q) => gsap.timeline({ paused: true })
    .from(q('layer'), { x: -12, autoAlpha: 0, duration: 0.5, stagger: 0.12 })
    .fromTo(q('pkt'), { y: 0, autoAlpha: 1 }, { keyframes: [{ y: 15, duration: 0.35 }, { y: 30, duration: 0.35 }], ease: 'power1.inOut' }),
  int: (q) => gsap.timeline({ paused: true })
    .from(q('node'), { scale: 0, transformOrigin: '50% 50%', duration: 0.45, stagger: 0.15, ease: 'back.out(1.8)' })
    .fromTo(q('link'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.4 })
    .fromTo(q('pkt'), { x: 0, autoAlpha: 0 }, { x: 20, autoAlpha: 1, duration: 0.7, ease: 'power1.inOut', repeat: 1 }),
  ux: (q) => gsap.timeline({ paused: true })
    .from(q('cur'), { x: 16, y: 14, autoAlpha: 0, duration: 0.7, ease: 'power3.out' })
    .to(q('btn'), { scale: 0.94, transformOrigin: '50% 50%', duration: 0.12, yoyo: true, repeat: 1 })
    .fromTo(q('rip'), { scale: 0, autoAlpha: 1, transformOrigin: '50% 50%' }, { scale: 3, autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, '<'),
};

/** Timeline en pausa del glifo (o null si el SVG no tiene animación). */
export function glifoTl(svg: SVGSVGElement | null) {
  const make = svg && glifos[svg.dataset.glifo!];
  return make ? make((a) => Array.from(svg.querySelectorAll(`[data-a="${a}"]`))) : null;
}
