// Partículas del </> al estilo de Philos (philos.site): miles de puntos redondos y brillantes
// sobre la superficie de un </> en 3D (cada trazo es un tubo con puntas redondas).
// Respiran, se apartan del ratón con un remolino y, al bajar por la página, se deshacen
// en polvo que gira. Three.js con shaders propios; el movimiento se calcula en la GPU.
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Group, NormalBlending, PerspectiveCamera,
  Plane, Points, Raycaster, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { MARK } from '../lib/mark';

type Rect = { x: number; y: number; w: number; h: number };

const CAM_Z = 10;
const FOV = 35;

/** Puntos de un trazo «M x y L x y ...» con el centro del </> en el origen y la y hacia arriba. */
function polyline(d: string) {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const pts: [number, number][] = [];
  for (let i = 0; i < n.length; i += 2) pts.push([n[i] - MARK.width / 2, MARK.height / 2 - n[i + 1]]);
  return pts;
}

/** Reparte `count` puntos sobre la superficie del </> en 3D, con su normal.
 *  Cada trazo es un tubo con puntas y esquinas redondas; los puntos que quedan dentro
 *  de otra pieza del mismo trazo se descartan, para que no se vean aros en las uniones. */
function sampleMark(count: number) {
  const r = MARK.stroke / 2;
  type Prim = { w: number; red: boolean; stroke: number; seg?: [number, number, number, number, number]; ball?: [number, number] };
  const prims: Prim[] = [];
  ([[MARK.left, false], [MARK.slash, true], [MARK.right, false]] as const).forEach(([d, red], stroke) => {
    const pts = polyline(d);
    pts.forEach(([x, y], i) => {
      prims.push({ w: 4 * Math.PI * r * r, red, stroke, ball: [x, y] });
      if (i === 0) return;
      const [ax, ay] = pts[i - 1];
      const len = Math.hypot(x - ax, y - ay);
      prims.push({ w: 2 * Math.PI * r * len, red, stroke, seg: [ax, ay, x, y, len] });
    });
  });
  const total = prims.reduce((s, p) => s + p.w, 0);

  /** ¿El punto (x, y, z) está dentro de otra pieza del mismo trazo? */
  const inside = (x: number, y: number, z: number, self: Prim) => prims.some((q) => {
    if (q === self || q.stroke !== self.stroke) return false;
    let cx: number, cy: number;
    if (q.seg) {
      const [ax, ay, bx, by, len] = q.seg;
      const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / (len * len)));
      cx = ax + (bx - ax) * t; cy = ay + (by - ay) * t;
    } else [cx, cy] = q.ball!;
    return Math.hypot(x - cx, y - cy, z) < r * 0.985;
  });

  const pos = new Float32Array(count * 3), nrm = new Float32Array(count * 3);
  const rand = new Float32Array(count * 4), scat = new Float32Array(count * 3), red = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    let p = prims[0], cx = 0, cy = 0, nx = 0, ny = 0, nz = 1;
    do {
      let pick = Math.random() * total;
      for (const q of prims) { p = q; if ((pick -= q.w) <= 0) break; }
      if (p.seg) {
        const [ax, ay, bx, by, len] = p.seg, t = Math.random();
        const ux = (bx - ax) / len, uy = (by - ay) / len, th = Math.random() * Math.PI * 2;
        cx = ax + (bx - ax) * t; cy = ay + (by - ay) * t;
        nx = -uy * Math.cos(th); ny = ux * Math.cos(th); nz = Math.sin(th);
      } else {
        const z = Math.random() * 2 - 1, ph = Math.random() * Math.PI * 2, s = Math.sqrt(1 - z * z);
        [cx, cy] = p.ball!; nx = s * Math.cos(ph); ny = s * Math.sin(ph); nz = z;
      }
    } while (inside(cx + nx * r, cy + ny * r, nz * r, p));
    const rr = r * (0.97 + Math.random() * 0.06);
    pos.set([cx + nx * rr, cy + ny * rr, nz * rr], i * 3);
    nrm.set([nx, ny, nz], i * 3);
    rand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    red[i] = p.red ? 1 : 0;
    // Lugar en la nube de polvo (al bajar por la página).
    const u = 10 + Math.pow(Math.random(), 1.6) * 48, h = Math.random() * Math.PI * 2;
    scat.set([Math.cos(h) * u, (Math.random() - 0.45) * 30 * (0.4 + u / 50), Math.sin(h) * u * 0.7], i * 3);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setAttribute('normal', new BufferAttribute(nrm, 3));
  g.setAttribute('aRand', new BufferAttribute(rand, 4));
  g.setAttribute('aScatter', new BufferAttribute(scat, 3));
  g.setAttribute('aRed', new BufferAttribute(red, 1));
  return g;
}

// Ruido simplex 3D (Ashima Arts / Stefan Gustavson, licencia MIT) y ruido «curl» para los remolinos.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
vec3 snoiseVec3(vec3 x) {
  return vec3(snoise(x), snoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2)), snoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4)));
}
vec3 curlNoise(vec3 p) {
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0), dy = vec3(0.0, e, 0.0), dz = vec3(0.0, 0.0, e);
  vec3 px0 = snoiseVec3(p - dx), px1 = snoiseVec3(p + dx);
  vec3 py0 = snoiseVec3(p - dy), py1 = snoiseVec3(p + dy);
  vec3 pz0 = snoiseVec3(p - dz), pz1 = snoiseVec3(p + dz);
  return normalize(vec3(py1.z - py0.z - pz1.y + pz0.y, pz1.x - pz0.x - px1.z + px0.z, px1.y - px0.y - py1.x + py0.x) / (2.0 * e));
}`;

const VERTEX = /* glsl */ `
${NOISE}
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uForm;      // 0 = por armarse, 1 = armado
uniform float uFromDust;  // 1 = se arma desde el polvo; 0 = desde el </> pequeño de la pantalla de carga
uniform vec3 uStart;
uniform float uStartScale;
uniform float uVortex;    // 0 = armado, 1 = hecho polvo (lo controla el scroll)
uniform float uPointerStrength;
uniform vec3 uPointer;
uniform float uLight;     // 1 = modo claro

attribute vec4 aRand;
attribute vec3 aScatter;
attribute float aRed;

varying vec3 vColor;
varying float vAlpha;

mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }

void main() {
  vec3 home = position;
  vec3 n = normal;

  // Respira: se hincha y se encoge un poco, como brasas.
  vec3 p = home + n * (0.15 + 0.45 * aRand.x) * snoise(home * 0.09 + vec3(0.0, uTime * 0.25, 0.0));

  // El ratón las aparta y las hace girar.
  vec3 d = p - uPointer;
  float f = smoothstep(11.0, 0.0, length(d.xy)) * uPointerStrength;
  if (f > 0.001) {
    p += normalize(vec3(d.xy, d.z * 0.4) + n * 0.6) * f * (3.5 + aRand.z * 9.0);
    p += curlNoise(p * 0.08 + uTime * 0.2) * f * 4.0;
  }

  // Polvo que gira alrededor.
  vec3 s = aScatter;
  float vt = smoothstep(aRand.w * 0.55, aRand.w * 0.55 + 0.45, uVortex);
  s.xz = rot(uTime * (0.015 + aRand.x * 0.03) + (1.0 - vt) * (2.5 + aRand.y * 2.0)) * s.xz;
  vec3 ph = aRand.xyz * 6.2831;
  s += vec3(sin(s.y * 0.035 + uTime * 0.21 + ph.x), sin(s.z * 0.03 + uTime * 0.17 + ph.y) * 0.6, cos(s.x * 0.033 + uTime * 0.19 + ph.z)) * (4.0 + aRand.z * 7.0);
  if (vt > 0.001) {
    vec3 mid = mix(p, s, 0.5) + curlNoise(p * 0.05 + uTime * 0.3) * 18.0 * sin(vt * 3.14159);
    p = mix(mix(p, mid, smoothstep(0.0, 0.5, vt)), s, smoothstep(0.5, 1.0, vt));
  }

  // Se arma: cada partícula sale de su sitio de partida y llega en remolino.
  float k = smoothstep(aRand.w * 0.45, aRand.w * 0.45 + 0.55, uForm);
  if (k < 0.999) {
    vec3 st = mix(uStart + home * uStartScale, s, uFromDust);
    vec3 mid = mix(st, p, 0.5) + curlNoise(home * 0.05 + 3.7) * 14.0 * sin(k * 3.14159);
    p = mix(mix(st, mid, smoothstep(0.0, 0.5, k)), p, smoothstep(0.5, 1.0, k));
  }

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (0.35 + aRand.x * 1.15) * mix(1.0, 0.65, vt) * mix(mix(0.45, 1.0, k), 1.0, uFromDust);
  gl_PointSize = min(size * uPixelRatio / -mv.z, 14.0 * uPixelRatio);

  // Luz: una principal arriba a la izquierda, borde encendido y algún destello.
  vec3 nw = normalize(mat3(modelMatrix) * n);
  float lam = max(dot(nw, normalize(vec3(-0.45, 0.55, 0.7))), 0.0);
  float rim = pow(1.0 - abs(normalize(normalMatrix * n).z), 3.0);
  float tw = pow(0.5 + 0.5 * sin(uTime * (1.0 + aRand.y * 4.0) + aRand.z * 80.0), 12.0);

  vec3 bone = vec3(0.957, 0.941, 0.910);
  vec3 red = vec3(0.894, 0.071, 0.122);
  vec3 hot = vec3(1.0, 0.176, 0.247);
  vec3 amber = vec3(1.0, 0.416, 0.173);
  vec3 ink = vec3(0.043, 0.039, 0.055);

  vec3 darkC = mix(
    bone * (0.16 + 0.9 * lam) + hot * rim * 0.3 + bone * tw * 0.5,
    red * 0.3 + hot * lam * 0.9 + amber * rim * 0.3 + amber * tw * 0.5,
    aRed);
  vec3 darkDust = mix(bone * 0.42, hot * 0.6, aRed) + mix(bone, amber, aRed) * tw * 0.6;
  vec3 lightC = mix(mix(ink, vec3(0.31, 0.29, 0.33), (1.0 - lam) * 0.4 + rim * 0.3), mix(red, vec3(0.6, 0.03, 0.07), (1.0 - lam) * 0.5), aRed);

  vColor = mix(mix(darkC, darkDust, vt), lightC, uLight);
  vAlpha = (0.55 + 0.45 * aRand.y) * mix(1.0, 0.7, vt) * mix(1.0, 0.75, uLight * (1.0 - aRed));
}`;

const FRAGMENT = /* glsl */ `
uniform float uLight;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = uLight > 0.5 ? smoothstep(0.5, 0.2, d) : pow(smoothstep(0.5, 0.0, d), 2.0);
  if (a < 0.01) discard;
  // Salida con alfa premultiplicado: en oscuro las partículas suman luz; en claro se pintan encima.
  if (uLight > 0.5) { float al = a * vAlpha; gl_FragColor = vec4(vColor * al, al); }
  else { vec3 c = vColor * a * vAlpha; gl_FragColor = vec4(c, max(c.r, max(c.g, c.b))); }
}`;

export class ParticleMark {
  /** ¿El navegador puede dibujar con WebGL? */
  static supported() {
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
  }

  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  private group = new Group();
  private mat: ShaderMaterial;
  private u: Record<string, { value: any }>;
  private w = 1; private h = 1; private markScale = 1; private slotW = 1;
  private ndc = new Vector2(); private pointerIn = false;
  private ray = new Raycaster(); private plane = new Plane(new Vector3(0, 0, 1), 0);
  private hit = new Vector3(); private target = new Vector3(0, 0, 999);
  private running = false; private visible = true;
  private clock = 0; private last = 0; private formT0 = -1;

  constructor(private canvas: HTMLCanvasElement, private slot: HTMLElement, private opts: { interactive: boolean; still: boolean }) {
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.camera.position.z = CAM_Z;

    const count = window.innerWidth < 768 ? 9000 : 16000;
    this.u = {
      uTime: { value: 0 }, uSize: { value: 30 }, uPixelRatio: { value: this.renderer.getPixelRatio() },
      uForm: { value: opts.still ? 1 : 0 }, uFromDust: { value: 1 }, uStart: { value: new Vector3() }, uStartScale: { value: 1 },
      uVortex: { value: 0 }, uPointerStrength: { value: 0 }, uPointer: { value: new Vector3(0, 0, 999) }, uLight: { value: 0 },
    };
    this.mat = new ShaderMaterial({
      vertexShader: VERTEX, fragmentShader: FRAGMENT, uniforms: this.u,
      transparent: true, depthWrite: false, depthTest: false, premultipliedAlpha: true, blending: AdditiveBlending,
    });
    const pts = new Points(sampleMark(count), this.mat);
    pts.frustumCulled = false;
    this.group.add(pts);
    this.scene.add(this.group);
    this.applyTheme();
    this.layout();

    if (opts.interactive) {
      window.addEventListener('pointermove', (e) => {
        const r = this.canvas.getBoundingClientRect();
        this.pointerIn = e.clientY >= r.top && e.clientY <= r.bottom;
        this.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      }, { passive: true });
      document.addEventListener('pointerleave', () => { this.pointerIn = false; });
    }
    new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; if (this.visible) this.start(); }, { threshold: 0 }).observe(canvas);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.start(); });
    // Se dibuja al instante para que el barrido del cambio de tema ya muestre los colores nuevos.
    window.addEventListener('rd:theme', () => { this.applyTheme(); this.render(); });
    let to = 0;
    window.addEventListener('resize', () => { clearTimeout(to); to = window.setTimeout(() => { this.layout(); if (!this.running) this.render(); }, 150); });
  }

  /** 0 = armado; 1 = hecho polvo (lo controla el scroll). */
  set scatter(v: number) { this.u.uVortex.value = v; if (this.opts.still) this.render(); }

  private applyTheme() {
    const light = document.documentElement.classList.contains('light');
    this.u.uLight.value = light ? 1 : 0;
    this.mat.blending = light ? NormalBlending : AdditiveBlending;
  }

  /** Coloca el </> 3D justo sobre el hueco del hero (`slot`). */
  private layout() {
    const c = this.canvas.getBoundingClientRect(), s = this.slot.getBoundingClientRect();
    this.w = Math.max(1, c.width); this.h = Math.max(1, c.height);
    this.renderer.setSize(this.w, this.h, false);
    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();
    const wpp = this.px();
    this.group.position.set((s.left - c.left + s.width / 2 - this.w / 2) * wpp, -(s.top - c.top + s.height / 2 - this.h / 2) * wpp, 0);
    this.slotW = Math.max(1, s.width);
    this.markScale = (s.width * wpp) / MARK.width;
    this.group.scale.setScalar(this.markScale);
    this.u.uSize.value = 30 * Math.min(1.15, Math.max(0.65, s.width / 560));
  }

  /** Unidades del mundo por píxel en el plano del </>. */
  private px() { return (2 * CAM_Z * Math.tan((FOV * Math.PI) / 360)) / this.h; }

  /** Arma el dibujo. Si se pasa `from` (el </> de la pantalla de carga), las partículas salen de ahí. */
  build(from?: Rect) {
    if (this.opts.still) { this.render(); return; }
    if (from) {
      const wpp = this.px(), g = this.group.position;
      this.u.uStart.value.set(
        ((from.x + from.w / 2 - this.w / 2) * wpp - g.x) / this.markScale,
        (-(from.y + from.h / 2 - this.h / 2) * wpp - g.y) / this.markScale, 0);
      this.u.uStartScale.value = from.w / this.slotW;
      this.u.uFromDust.value = 0;
    } else {
      this.u.uFromDust.value = 1;
    }
    this.u.uForm.value = 0;
    this.formT0 = this.clock;
    this.start();
  }

  start() {
    if (this.running || this.opts.still || !this.visible || document.hidden) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (!this.visible || document.hidden) { this.running = false; return; }
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.tick(dt);
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private tick(dt: number) {
    this.clock += dt;
    const t = this.clock, u = this.u, damp = (k: number) => 1 - Math.exp(-dt / k);
    u.uTime.value = t;
    if (this.formT0 >= 0) u.uForm.value = Math.min(1, (t - this.formT0) / 2.4);

    // Se balancea despacio y se inclina hacia el ratón.
    const px = this.opts.interactive ? this.ndc.x : 0, py = this.opts.interactive ? this.ndc.y : 0;
    const g = this.group.rotation;
    g.y += (Math.sin(t * 0.35) * 0.14 + px * 0.22 - g.y) * damp(0.5);
    g.x += (Math.sin(t * 0.27) * 0.05 - py * 0.12 - g.x) * damp(0.5);

    // El ratón, llevado al plano del </>.
    const on = this.opts.interactive && this.pointerIn;
    u.uPointerStrength.value += ((on ? 1 : 0) - u.uPointerStrength.value) * damp(0.3);
    if (on) {
      this.group.updateMatrixWorld();
      this.plane.constant = -this.group.position.z;
      this.ray.setFromCamera(this.ndc, this.camera);
      if (this.ray.ray.intersectPlane(this.plane, this.hit)) {
        this.target.copy(this.group.worldToLocal(this.hit));
        if (u.uPointer.value.z > 900) u.uPointer.value.copy(this.target);
        u.uPointer.value.lerp(this.target, damp(0.12));
      }
    }
  }

  private render() { this.renderer.render(this.scene, this.camera); }
}
