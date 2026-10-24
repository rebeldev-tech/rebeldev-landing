// Núcleo de movimiento: registra los plugins de GSAP una sola vez y conecta Lenis con ScrollTrigger.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

(window as unknown as { __rdMotion: boolean }).__rdMotion = true;

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

export let lenis: Lenis | null = null;

if (!reduceMotion) {
  lenis = new Lenis({ autoRaf: false, lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95, anchors: { offset: -72 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

window.addEventListener('load', () => ScrollTrigger.refresh());

/** Entrada sencilla para bloques marcados con data-reveal (una sola vez, sin rebotes). */
export function initReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (reduceMotion) { gsap.set(items, { autoAlpha: 1 }); return; }
  items.forEach((el) => {
    gsap.fromTo(el, { autoAlpha: 0, y: 28 }, {
      autoAlpha: 1, y: 0, duration: 1, ease: 'power4.out',
      delay: Number(el.dataset.revealDelay || 0),
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

export { gsap, ScrollTrigger, SplitText };
