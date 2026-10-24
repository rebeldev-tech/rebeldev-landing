// Partículas que arman el </> «pieza por pieza» (idea de Philos + la marca).
// Canvas 2D: cada partícula tiene un lugar en el dibujo y vuelve a él como un resorte.
// El ratón las aparta; al bajar por la página, el dibujo se desarma.
import { MARK } from '../lib/mark';

type P = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; red: boolean; size: number; seed: number; delay: number };
type Rect = { x: number; y: number; w: number; h: number };

const BONE = '#F4F0E8';
const RED = '#FF2D3F';

/** Puntos del </> dibujado en un rectángulo, separados por `step` px. */
function samplePoints(rect: Rect, step: number) {
  const w = Math.max(1, Math.round(rect.w)), h = Math.max(1, Math.round(rect.h));
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  const k = w / MARK.width;
  ctx.scale(k, k * (h / w) / (MARK.height / MARK.width));
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = MARK.stroke;
  ctx.strokeStyle = '#fff';
  ctx.stroke(new Path2D(MARK.left)); ctx.stroke(new Path2D(MARK.right));
  ctx.strokeStyle = '#f00';
  ctx.stroke(new Path2D(MARK.slash));
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: { x: number; y: number; red: boolean }[] = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (data[i + 3] > 128) pts.push({ x: rect.x + x, y: rect.y + y, red: data[i + 1] < 100 });
    }
  }
  return pts;
}

export class ParticleMark {
  private ctx: CanvasRenderingContext2D;
  private ps: P[] = [];
  private dpr = Math.min(window.devicePixelRatio || 1, 2);
  private w = 0; private h = 0;
  private mouse = { x: -9999, y: -9999, active: false };
  private running = false;
  private visible = true;
  private t0 = performance.now();
  /** 0 = armado; 1 = totalmente desarmado (lo controla el scroll). */
  scatter = 0;

  constructor(private canvas: HTMLCanvasElement, private slot: HTMLElement, private opts: { interactive: boolean; still: boolean }) {
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    if (opts.interactive) {
      window.addEventListener('pointermove', (e) => {
        const r = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - r.left; this.mouse.y = e.clientY - r.top; this.mouse.active = true;
      }, { passive: true });
      document.addEventListener('pointerleave', () => { this.mouse.active = false; });
    }
    new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; if (this.visible) this.start(); }, { threshold: 0 }).observe(canvas);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.start(); });
    let to = 0;
    window.addEventListener('resize', () => { clearTimeout(to); to = window.setTimeout(() => this.rebuild(), 180); });
  }

  private slotRect(): Rect {
    const c = this.canvas.getBoundingClientRect(), s = this.slot.getBoundingClientRect();
    return { x: s.left - c.left, y: s.top - c.top, w: s.width, h: s.height };
  }

  private resize() {
    const r = this.canvas.getBoundingClientRect();
    this.w = r.width; this.h = r.height;
    this.canvas.width = Math.round(r.width * this.dpr);
    this.canvas.height = Math.round(r.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private homes() {
    const rect = this.slotRect();
    const max = this.w < 768 ? 1100 : 2600;
    let step = Math.max(3, Math.round(rect.w / 190));
    let pts = samplePoints(rect, step);
    while (pts.length > max) { step += 1; pts = samplePoints(rect, step); }
    return { pts, step };
  }

  private make(home: { x: number; y: number; red: boolean }, step: number): P {
    return { x: home.x, y: home.y, vx: 0, vy: 0, hx: home.x, hy: home.y, red: home.red,
      size: Math.max(1.4, step * (0.42 + Math.random() * 0.32)), seed: Math.random() * 1000, delay: 0 };
  }

  /** Arma el dibujo. Si se pasa `from`, las partículas salen de ahí (la pantalla de carga). */
  build(from?: Rect) {
    this.resize();
    const { pts, step } = this.homes();
    let starts: { x: number; y: number }[] | null = null;
    if (from) starts = samplePoints(from, Math.max(1, Math.round(from.w / 90)));
    this.ps = pts.map((home, i) => {
      const p = this.make(home, step);
      if (this.opts.still) return p;
      if (starts && starts.length) {
        const s = starts[Math.floor((i / pts.length) * starts.length)];
        p.x = s.x + (Math.random() - 0.5) * 3; p.y = s.y + (Math.random() - 0.5) * 3;
        const a = Math.random() * Math.PI * 2, f = 2 + Math.random() * 9;
        p.vx = Math.cos(a) * f; p.vy = Math.sin(a) * f;
        p.delay = Math.random() * 0.35;
      } else {
        p.x = Math.random() * this.w; p.y = Math.random() * this.h;
        p.delay = Math.random() * 0.6;
      }
      return p;
    });
    this.t0 = performance.now();
    if (this.opts.still) this.draw(0); else this.start();
  }

  private rebuild() {
    this.resize();
    const { pts, step } = this.homes();
    this.ps = pts.map((h) => this.make(h, step));
    if (this.opts.still) this.draw(0); else this.start();
  }

  start() {
    if (this.running || this.opts.still || !this.visible || document.hidden) return;
    this.running = true;
    const loop = (now: number) => {
      if (!this.visible || document.hidden) { this.running = false; return; }
      this.step((now - this.t0) / 1000);
      this.draw((now - this.t0) / 1000);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private step(t: number) {
    const R = this.w < 768 ? 70 : 120, R2 = R * R;
    const sc = this.scatter;
    for (const p of this.ps) {
      if (t < p.delay) continue;
      // Lugar de destino: con un leve vaivén y, al bajar, desarmado hacia afuera.
      const wob = 0.9 + sc * 60;
      const tx = p.hx + Math.sin(t * 0.7 + p.seed) * wob + Math.cos(p.seed) * sc * 260;
      const ty = p.hy + Math.cos(t * 0.6 + p.seed * 1.3) * wob + Math.sin(p.seed) * sc * 200 - sc * 80;
      p.vx += (tx - p.x) * 0.028;
      p.vy += (ty - p.y) * 0.028;
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2), force = (1 - d / R) ** 2 * 7;
          p.vx += (dx / d) * force; p.vy += (dy / d) * force;
        }
      }
      p.vx *= 0.86; p.vy *= 0.86;
      p.x += p.vx; p.y += p.vy;
    }
  }

  private draw(t: number) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    const fadeIn = this.opts.still ? 1 : Math.min(1, t / 0.4);
    ctx.globalAlpha = fadeIn * (1 - this.scatter * 0.85);
    for (const red of [false, true]) {
      ctx.fillStyle = red ? RED : BONE;
      for (const p of this.ps) if (p.red === red) ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }
}
