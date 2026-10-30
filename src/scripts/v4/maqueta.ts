// Maqueta 3D del diagnóstico (versión 4). Al centro, la base «Tu negocio»; alrededor, seis huecos
// punteados en anillo (el «plano»). Cada síntoma que marcas sube su pieza desde el piso, con el ícono
// de su servicio (Glifo) impreso en la tapa; un cable se dibuja hasta la base y un paquete rojo viaja
// por él mientras la pieza está activa.
// Three.js con cámara ortográfica isométrica. Dibuja solo cuando algo se mueve (animaciones, paquetes,
// inclinación), se pausa fuera de pantalla y con la pestaña oculta, y limita la densidad de píxeles a 2.
// Los colores salen de las variables CSS, así que con el tema claro guardado se ve como una maqueta blanca.
// Las etiquetas son HTML (se leen nítidas y respetan la fuente): se colocan proyectando su punto 3D.
import {
  BoxGeometry, BufferGeometry, CanvasTexture, Color, DirectionalLight, EdgesGeometry, Group,
  HemisphereLight, Line, LineBasicMaterial, LineDashedMaterial, LineSegments, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, OrthographicCamera, Plane, PlaneGeometry, QuadraticBezierCurve3, Scene,
  SphereGeometry, SRGBColorSpace, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { modulos as MODULOS, corto, hero, type Modulo } from '../../data/v4';

gsap.registerPlugin(CustomEase);

/** Subida de las piezas: arranca suave, empuja y se posa despacio. Nunca pasa de 1 (sin rebote). */
const SUBIDA = CustomEase.create('rd-lift', 'M0,0 C0.3,0 0.32,0.42 0.5,0.72 0.66,0.987 0.8,1 1,1');

// Medidas, en unidades de la escena.
const ANILLO = 5;                                   // radio del anillo de huecos
const BASE = { lado: 3.2, alto: 0.45, radio: 0.08 }; // «Tu negocio»: baja y ancha
const PIEZA = { lado: 1.7, alto: 0.75, radio: 0.07 };
const HUECO = PIEZA.lado + 0.24;                    // el hueco punteado enmarca la pieza ya subida
const TAPA = 1.3;                                   // lado del ícono impreso en la tapa
const BAJO_PIEZA = -PIEZA.alto - 0.01;              // bajo el piso: el plano de recorte la oculta entera
const BAJO_BASE = -BASE.alto - 0.01;
const TRAMOS = 40;                                  // tramos del cable (se dibuja tramo a tramo)
const RADIAL = 6;
const LIENZO = 256;                                 // px del lienzo del ícono
const SEPARA = 8;                                   // px entre la pieza y su etiqueta
const INCLINA = 0.08;                               // inclinación máxima con el ratón (rad)
const VUELTA = 1.9;                                 // segundos por vuelta del paquete (viaje y pausa)
const VIAJE = 0.7;                                  // parte de la vuelta en la que viaja
const VUELTAS = 3;                                  // vueltas del paquete; después se detiene (no hay movimiento sin fin)

// Cámara isométrica: en (10, 10, 10) mirando al origen. La inclinación la mueve un poco sobre esa esfera.
const CAMARA = new Vector3(10, 10, 10);
const DIST = CAMARA.length();
const PHI0 = Math.acos(1 / Math.sqrt(3));
const THETA0 = Math.PI / 4;

/** Lugar de cada pieza en el anillo, como ángulo en pantalla (0° = derecha, 90° = adelante).
 *  Las piezas que suelen ir juntas quedan vecinas: integraciones con automatización, web con diseño. */
const LUGAR: Record<Modulo, number> = { wa: 90, auto: 150, int: 210, api: 270, web: 330, ux: 30 };

type Lado = 'arriba' | 'abajo' | 'centro';
type Etiqueta = { el: HTMLElement; ancla: Vector3; lado: Lado };
type Pieza = {
  id: Modulo;
  on: boolean;
  grupo: Group;
  tapa: Mesh<PlaneGeometry, MeshBasicMaterial>;
  textura: CanvasTexture;
  hueco: Line<BufferGeometry, LineDashedMaterial>;
  cable: Mesh<TubeGeometry, MeshBasicMaterial>;
  curva: QuadraticBezierCurve3;
  paquete: Mesh<SphereGeometry, MeshBasicMaterial>;
  etiqueta: Etiqueta;
  trazo: number;   // 0..1, cuánto cable está dibujado
  fase: number;    // 0..1, vuelta del paquete
  flujo: boolean;  // el paquete viaja
  vueltas: number; // vueltas que lleva desde que se encendió o cambió la selección
  tl: gsap.core.Timeline | null;
};

export type OpcionesMaqueta = {
  /** «Menos movimiento»: sin entrada, sin inclinación ni paquetes; los cambios se aplican al instante. */
  still: boolean;
  /** Inclinación con el ratón (no con pantalla táctil). */
  interactive: boolean;
  /** Los `<svg data-glifo>` de la lista HTML de piezas: se copian como ícono de cada tapa. */
  glifos: readonly SVGSVGElement[];
};

/** Posición de la pieza en el piso a partir de su ángulo en pantalla, y de qué lado va su etiqueta. */
function lugar(id: Modulo) {
  const phi = (LUGAR[id] * Math.PI) / 180;
  const th = phi - Math.PI / 4;
  const lado: Lado = Math.sin(phi) > 0 ? 'abajo' : 'arriba';
  return { x: ANILLO * Math.cos(th), z: ANILLO * Math.sin(th), lado };
}

/** Orden de aparición de los huecos: desde el de adelante, en el sentido de las agujas del reloj. */
const giro = (id: Modulo) => (LUGAR[id] - 90 + 360) % 360;

/** Lee los colores de la marca desde las variables CSS (con el tema que esté activo). Pasa por un
 *  lienzo de 1 px para aceptar cualquier formato de color que entienda el navegador. */
function leerColores(host: HTMLElement) {
  const probe = document.createElement('span');
  probe.style.display = 'none';
  host.appendChild(probe);
  const lienzo = document.createElement('canvas');
  lienzo.width = lienzo.height = 1;
  const ctx = lienzo.getContext('2d', { willReadFrequently: true });
  const leer = (variable: string, respaldo: string) => {
    probe.style.color = respaldo;
    probe.style.color = `var(${variable}, ${respaldo})`;
    const css = getComputedStyle(probe).color;
    if (!ctx) return new Color(respaldo);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = respaldo;
    ctx.fillStyle = css; // si no lo entiende, queda el respaldo
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return new Color().setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
  };
  const c = {
    tinta: leer('--color-ink', '#0B0A0E'),
    base: leer('--color-surface', '#141019'),
    pieza: leer('--color-surface-2', '#1D1824'),
    texto: leer('--color-bone', '#F4F0E8'),
    hueco: leer('--color-ash', '#A7A0A8'),
    rojo: leer('--color-red', '#E4121F'),
    vivo: leer('--color-red-text', '#FF2D3F'),
  };
  probe.remove();
  return c;
}

export class Maqueta {
  /** ¿El navegador puede dibujar con WebGL? */
  static supported() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      return false;
    }
  }

  private renderer: WebGLRenderer;
  private escena = new Scene();
  private camara = new OrthographicCamera(-1, 1, 1, -1, 0.1, 60);
  private raiz = new Group();
  private base = new Group();
  private piso = new Plane(new Vector3(0, 1, 0), 0); // recorta lo que está bajo el piso (y < 0)
  private cielo = new HemisphereLight(0xffffff, 0x8a8590, 1.8);
  private sol = new DirectionalLight(0xffffff, 1.6);
  private geos: {
    base: RoundedBoxGeometry; baseBorde: EdgesGeometry; pieza: RoundedBoxGeometry; piezaBorde: EdgesGeometry;
    tapa: PlaneGeometry; hueco: BufferGeometry; paquete: SphereGeometry;
  };
  private mats: {
    base: MeshStandardMaterial; pieza: MeshStandardMaterial; borde: LineBasicMaterial;
    cable: MeshBasicMaterial; paquete: MeshBasicMaterial;
  };
  private piezas: Pieza[] = [];
  private etiquetas: Etiqueta[] = [];
  private centro: Etiqueta;
  private contorno: Vector3[] = []; // puntos que deben entrar en el encuadre
  private deseo = new Set<Modulo>();
  private entrada: gsap.core.Timeline | null = null;
  private io: IntersectionObserver;
  private ro: ResizeObserver;
  private espera = 0;
  private w = 1;
  private h = 1;
  private tmp = new Vector3();
  private inclina = { yaw: 0, pitch: 0 };
  private meta = { yaw: 0, pitch: 0 };
  private listo = false;     // ya se pueden subir piezas (terminó la entrada)
  private entro = false;
  private visible = false;
  private despierto = false; // el bucle de dibujo está enganchado al ticker de GSAP
  private sucio = true;      // hay que volver a dibujar
  private moverEtiquetas = true;
  private muerto = false;

  constructor(private canvas: HTMLCanvasElement, private capa: HTMLElement, private opts: OpcionesMaqueta) {
    const still = opts.still;
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'default' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.localClippingEnabled = true;
    const aniso = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());

    // Luz de maqueta: cielo y una luz principal, sin sombras ni brillos.
    this.sol.position.set(4, 10, 2);
    this.escena.add(this.cielo, this.sol, this.raiz);

    const cajaBase = new BoxGeometry(BASE.lado, BASE.alto, BASE.lado);
    const cajaPieza = new BoxGeometry(PIEZA.lado, PIEZA.alto, PIEZA.lado);
    const m = HUECO / 2;
    this.geos = {
      base: new RoundedBoxGeometry(BASE.lado, BASE.alto, BASE.lado, 3, BASE.radio),
      baseBorde: new EdgesGeometry(cajaBase),
      pieza: new RoundedBoxGeometry(PIEZA.lado, PIEZA.alto, PIEZA.lado, 3, PIEZA.radio),
      piezaBorde: new EdgesGeometry(cajaPieza),
      tapa: new PlaneGeometry(TAPA, TAPA),
      hueco: new BufferGeometry().setFromPoints([
        new Vector3(-m, 0, -m), new Vector3(m, 0, -m), new Vector3(m, 0, m), new Vector3(-m, 0, m), new Vector3(-m, 0, -m),
      ]),
      paquete: new SphereGeometry(0.085, 16, 12),
    };
    cajaBase.dispose();
    cajaPieza.dispose();

    const recorte = [this.piso];
    this.mats = {
      base: new MeshStandardMaterial({ roughness: 0.92, metalness: 0, clippingPlanes: recorte }),
      pieza: new MeshStandardMaterial({ roughness: 0.9, metalness: 0, clippingPlanes: recorte }),
      borde: new LineBasicMaterial({ transparent: true, opacity: 0.3, clippingPlanes: recorte }),
      cable: new MeshBasicMaterial(),
      paquete: new MeshBasicMaterial(),
    };

    // Base «Tu negocio»
    const baseCuerpo = new Mesh(this.geos.base, this.mats.base);
    const baseBorde = new LineSegments(this.geos.baseBorde, this.mats.borde);
    baseCuerpo.position.y = baseBorde.position.y = BASE.alto / 2;
    this.base.add(baseCuerpo, baseBorde);
    this.base.position.y = still ? 0 : BAJO_BASE;
    this.raiz.add(this.base);
    this.centro = this.etiqueta(hero.centro, new Vector3(0, BASE.alto, 0), 'centro');

    const caja = (cx: number, cz: number, mitad: number, y0: number, y1: number) => {
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) for (const y of [y0, y1]) {
        this.contorno.push(new Vector3(cx + sx * mitad, y, cz + sz * mitad));
      }
    };
    caja(0, 0, BASE.lado / 2, 0, BASE.alto);

    // Las seis piezas, cada una con su hueco, su cable y su paquete. El patrón de rayas calza justo
    // en cada lado del hueco, así cada esquina empieza con una raya.
    const periodo = HUECO / 7;
    for (const id of MODULOS) {
      const { x, z, lado } = lugar(id);

      const hueco = new Line(this.geos.hueco, new LineDashedMaterial({
        dashSize: periodo * 0.6, gapSize: periodo * 0.4, transparent: true, opacity: still ? 0.85 : 0,
      }));
      hueco.position.set(x, 0.004, z);
      hueco.computeLineDistances();

      const grupo = new Group();
      grupo.position.set(x, BAJO_PIEZA, z);
      grupo.visible = false;
      const cuerpo = new Mesh(this.geos.pieza, this.mats.pieza);
      const borde = new LineSegments(this.geos.piezaBorde, this.mats.borde);
      cuerpo.position.y = borde.position.y = PIEZA.alto / 2;

      // El ícono va «impreso» en la tapa, derecho para quien mira (se lee como una etiqueta sobre la mesa).
      const lienzo = document.createElement('canvas');
      lienzo.width = lienzo.height = LIENZO;
      const textura = new CanvasTexture(lienzo);
      textura.colorSpace = SRGBColorSpace;
      textura.anisotropy = aniso;
      const tapa = new Mesh(this.geos.tapa, new MeshBasicMaterial({ map: textura, transparent: true, depthWrite: false, clippingPlanes: recorte }));
      tapa.rotation.set(-Math.PI / 2, Math.PI / 4, 0, 'YXZ');
      tapa.position.y = PIEZA.alto + 0.004;
      grupo.add(cuerpo, borde, tapa);

      // Cable: de la tapa de la pieza a la tapa de la base, en arco.
      const u = new Vector3(-x, 0, -z).normalize();
      const hasta = (mitad: number) => mitad / Math.max(Math.abs(u.x), Math.abs(u.z));
      const ini = new Vector3(x, 0, z).addScaledVector(u, hasta(PIEZA.lado / 2) - 0.12).setY(PIEZA.alto + 0.03);
      const fin = u.clone().multiplyScalar(-(hasta(BASE.lado / 2) - 0.28)).setY(BASE.alto + 0.03);
      const ctrl = ini.clone().add(fin).multiplyScalar(0.5).setY(Math.max(ini.y, fin.y) + 0.85);
      const curva = new QuadraticBezierCurve3(ini, ctrl, fin);
      const cable = new Mesh(new TubeGeometry(curva, TRAMOS, 0.03, RADIAL, false), this.mats.cable);
      cable.geometry.setDrawRange(0, 0);
      cable.visible = false;

      const paquete = new Mesh(this.geos.paquete, this.mats.paquete);
      paquete.visible = false;

      this.raiz.add(hueco, grupo, cable, paquete);

      const ancla = lado === 'arriba'
        ? new Vector3(x - PIEZA.lado / 2, PIEZA.alto, z - PIEZA.lado / 2) // vértice más alto de la tapa
        : new Vector3(x + HUECO / 2, 0, z + HUECO / 2);                  // vértice más bajo del hueco
      const etiqueta = this.etiqueta(corto[id], ancla, lado);

      caja(x, z, HUECO / 2, 0, 0);
      caja(x, z, PIEZA.lado / 2, 0, PIEZA.alto);
      this.contorno.push(curva.getPoint(0.5));

      this.piezas.push({ id, on: false, grupo, tapa, textura, hueco, cable, curva, paquete, etiqueta, trazo: 0, fase: 0, flujo: false, vueltas: 0, tl: null });
    }

    this.aplicarTema();
    if (still) this.listo = true;
    this.encuadrar();
    // La fuente mono de las etiquetas puede terminar de cargar después de medirlas: se vuelve a encuadrar.
    document.fonts?.ready.then(() => { if (!this.muerto) { this.encuadrar(); this.invalidar(); } });

    if (opts.interactive && !still) {
      window.addEventListener('pointermove', this.alMover, { passive: true });
      document.documentElement.addEventListener('pointerleave', this.alSalir);
    }
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (!this.visible) { this.dormir(); return; }
      if (!still) this.entrar();
      this.invalidar();
    }, { threshold: 0 });
    this.io.observe(canvas);
    this.ro = new ResizeObserver(() => {
      clearTimeout(this.espera);
      this.espera = window.setTimeout(() => { this.encuadrar(); this.invalidar(); }, 150);
    });
    this.ro.observe(canvas);
    document.addEventListener('visibilitychange', this.alVer);
    window.addEventListener('rd:theme', this.alTema);
  }

  /** Enciende las piezas de `modulos` y apaga las demás. Antes de que termine la entrada, se guarda. */
  set(modulos: readonly string[]) {
    const validos = MODULOS as readonly string[];
    this.deseo = new Set(modulos.filter((m): m is Modulo => validos.includes(m)));
    if (this.listo) this.aplicar();
  }

  /** Suelta todo: bucle, observadores, animaciones, memoria de la GPU y etiquetas. */
  destroy() {
    this.muerto = true;
    this.dormir();
    this.io.disconnect();
    this.ro.disconnect();
    clearTimeout(this.espera);
    window.removeEventListener('pointermove', this.alMover);
    document.documentElement.removeEventListener('pointerleave', this.alSalir);
    document.removeEventListener('visibilitychange', this.alVer);
    window.removeEventListener('rd:theme', this.alTema);
    this.entrada?.kill();
    gsap.killTweensOf(this.etiquetas.map((t) => t.el));
    for (const p of this.piezas) {
      p.tl?.kill();
      p.textura.dispose();
      p.tapa.material.dispose();
      p.hueco.material.dispose();
      p.cable.geometry.dispose();
    }
    Object.values(this.geos).forEach((g) => g.dispose());
    Object.values(this.mats).forEach((m) => m.dispose());
    this.etiquetas.forEach((t) => t.el.remove());
    this.renderer.dispose();
  }

  // ——— Estado de las piezas ———

  private aplicar() {
    let n = 0;
    for (const p of this.piezas) {
      const on = this.deseo.has(p.id);
      // Las que siguen encendidas vuelven a mandar su paquete: la selección cambió.
      if (on && p.on && !this.opts.still && !p.tl?.isActive()) this.soltar(p);
      if (on === p.on) continue;
      p.on = on;
      p.etiqueta.el.classList.toggle('is-on', on);
      if (this.opts.still) this.fijar(p);
      else if (on) this.subir(p, n++ * 0.12);
      else this.bajar(p);
    }
    this.invalidar();
  }

  /** Sube desde el hueco (el plano de recorte la deja ver solo sobre el piso), dibuja el cable y suelta el paquete. */
  private subir(p: Pieza, retraso: number) {
    p.tl?.kill();
    p.flujo = false;
    p.paquete.visible = false;
    p.grupo.visible = true;
    p.tl = gsap.timeline({ delay: retraso, onUpdate: this.invalidar })
      .to(p.grupo.position, { y: 0, duration: 0.9, ease: SUBIDA }, 0)
      .to(p, { trazo: 1, duration: 0.6, ease: 'power2.inOut', onUpdate: () => this.trazar(p) }, 0.55)
      .add(() => { this.soltar(p); });
  }

  /** Recoge el cable y la pieza vuelve a su hueco. */
  private bajar(p: Pieza) {
    p.tl?.kill();
    p.flujo = false;
    p.paquete.visible = false;
    p.tl = gsap.timeline({ onUpdate: this.invalidar, onComplete: () => { p.grupo.visible = false; } })
      .to(p, { trazo: 0, duration: 0.3, ease: 'power2.in', onUpdate: () => this.trazar(p) }, 0)
      .to(p.grupo.position, { y: BAJO_PIEZA, duration: 0.55, ease: 'power3.in' }, 0.12);
  }

  /** «Menos movimiento»: el estado final, sin animación. */
  private fijar(p: Pieza) {
    p.tl?.kill();
    p.tl = null;
    p.grupo.visible = p.on;
    p.grupo.position.y = p.on ? 0 : BAJO_PIEZA;
    p.trazo = p.on ? 1 : 0;
    this.trazar(p);
    p.flujo = false;
    p.paquete.visible = false;
  }

  /** El cable se dibuja tramo a tramo: los índices del tubo van en orden a lo largo de la curva. */
  private trazar(p: Pieza) {
    const n = Math.round(p.trazo * TRAMOS) * RADIAL * 6;
    p.cable.geometry.setDrawRange(0, n);
    p.cable.visible = n > 0;
  }

  /** Suelta el paquete desde el inicio de su cable, por unas pocas vueltas. */
  private soltar(p: Pieza) {
    p.flujo = true;
    p.fase = 0;
    p.vueltas = 0;
    this.despertar();
  }

  /** Avanza el paquete por la curva. Devuelve si cambió algo que haya que dibujar. */
  private moverPaquete(p: Pieza, dt: number) {
    const fase = p.fase + dt / VUELTA;
    if (fase >= 1 && ++p.vueltas >= VUELTAS) {
      p.flujo = false;
      p.paquete.visible = false;
      return true;
    }
    p.fase = fase % 1;
    const u = p.fase / VIAJE;
    const q = p.paquete;
    if (u >= 1) {
      if (!q.visible) return false;
      q.visible = false;
      return true;
    }
    const e = u < 0.5 ? 2 * u * u : 1 - (2 - 2 * u) ** 2 / 2;
    p.curva.getPointAt(e, q.position);
    q.scale.setScalar(Math.max(0.001, Math.min(1, u / 0.12, (1 - u) / 0.12)));
    q.visible = true;
    return true;
  }

  // ——— Entrada: la base sube y los huecos aparecen en orden; después, las piezas guardadas ———

  private entrar() {
    if (this.entro) return;
    this.entro = true;
    const orden = [...this.piezas].sort((a, b) => giro(a.id) - giro(b.id));
    this.entrada = gsap.timeline({ onUpdate: this.invalidar })
      .to(this.base.position, { y: 0, duration: 1.1, ease: SUBIDA }, 0.1)
      .to(this.centro.el, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.8)
      .to(orden.map((p) => p.hueco.material), { opacity: 0.85, duration: 0.45, ease: 'power2.out', stagger: 0.08 }, 0.55)
      .fromTo(orden.map((p) => p.hueco.scale), { x: 0.82, z: 0.82 }, { x: 1, z: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, 0.55)
      .to(orden.map((p) => p.etiqueta.el), { autoAlpha: 1, duration: 0.45, ease: 'power2.out', stagger: 0.08 }, 0.65)
      .add(() => { this.listo = true; this.aplicar(); }, 1.0);
  }

  // ——— Dibujo a demanda ———

  private invalidar = () => {
    this.sucio = true;
    this.despertar();
  };

  private despertar() {
    if (this.despierto || this.muerto || !this.visible || document.hidden) return;
    this.despierto = true;
    gsap.ticker.add(this.cuadro);
  }

  private dormir() {
    if (!this.despierto) return;
    this.despierto = false;
    gsap.ticker.remove(this.cuadro);
  }

  /** Un cuadro del ticker de GSAP: inclinación suavizada, paquetes y dibujo si hace falta. */
  private cuadro = (_t: number, ms: number) => {
    const dt = Math.min(0.05, ms / 1000);
    let vivo = false;
    let dibuja = this.sucio;

    if (this.opts.interactive && !this.opts.still) {
      const a = this.inclina, m = this.meta;
      const dy = m.yaw - a.yaw, dp = m.pitch - a.pitch;
      if (Math.abs(dy) > 1e-5 || Math.abs(dp) > 1e-5) {
        const k = 1 - Math.exp(-dt / 0.3);
        a.yaw += dy * k;
        a.pitch += dp * k;
        this.orbitar();
        vivo = dibuja = true;
      }
    }

    if (!this.opts.still) {
      for (const p of this.piezas) {
        if (!p.flujo) continue;
        vivo = true;
        if (this.moverPaquete(p, dt)) dibuja = true;
      }
    }

    if (dibuja) {
      this.sucio = false;
      this.renderer.render(this.escena, this.camara);
      if (this.moverEtiquetas) { this.moverEtiquetas = false; this.colocarEtiquetas(); }
    }
    if (!vivo && !dibuja) this.dormir();
  };

  // ——— Cámara, encuadre y etiquetas ———

  private orbitar() {
    this.camara.position.setFromSphericalCoords(DIST, PHI0 - this.inclina.pitch, THETA0 + this.inclina.yaw);
    this.camara.lookAt(0, 0, 0);
    this.camara.updateMatrixWorld();
    this.moverEtiquetas = true;
  }

  /** Ajusta el encuadre al tamaño del lienzo: la maqueta y sus etiquetas entran completas, con aire. */
  private encuadrar() {
    const w = Math.max(1, Math.round(this.canvas.clientWidth));
    const h = Math.max(1, Math.round(this.canvas.clientHeight));
    this.w = w;
    this.h = h;
    this.renderer.setSize(w, h, false);

    // Se mide con la cámara quieta; la inclinación es tan chica que cabe en el margen.
    const cam = this.camara;
    cam.position.copy(CAMARA);
    cam.lookAt(0, 0, 0);
    cam.updateMatrixWorld();
    const vista = (v: Vector3) => v.clone().applyMatrix4(cam.matrixWorldInverse);

    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const v of this.contorno) {
      const p = vista(v);
      x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x);
      y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y);
    }
    const tags = this.etiquetas.map((t) => ({ lado: t.lado, an: t.el.offsetWidth, al: t.el.offsetHeight, p: vista(t.ancla) }));
    const pad = Math.min(24, Math.max(10, 0.035 * Math.min(w, h)));
    const escala = (bw: number, bh: number) => Math.max(1e-3, Math.min((w - 2 * pad) / bw, (h - 2 * pad) / bh));

    // Las etiquetas miden en px y la maqueta en unidades: se ajusta en unas pocas pasadas.
    let k = escala(x1 - x0, y1 - y0);
    let bx0 = x0, bx1 = x1, by0 = y0, by1 = y1;
    for (let i = 0; i < 4; i++) {
      bx0 = x0; bx1 = x1; by0 = y0; by1 = y1;
      for (const t of tags) {
        const mx = t.an / 2 / k;
        bx0 = Math.min(bx0, t.p.x - mx);
        bx1 = Math.max(bx1, t.p.x + mx);
        if (t.lado === 'arriba') by1 = Math.max(by1, t.p.y + (SEPARA + t.al) / k);
        if (t.lado === 'abajo') by0 = Math.min(by0, t.p.y - (SEPARA + t.al) / k);
      }
      k = escala(bx1 - bx0, by1 - by0);
    }

    const cx = (bx0 + bx1) / 2, cy = (by0 + by1) / 2;
    cam.left = cx - w / (2 * k);
    cam.right = cx + w / (2 * k);
    cam.top = cy + h / (2 * k);
    cam.bottom = cy - h / (2 * k);
    cam.updateProjectionMatrix();
    this.orbitar();
  }

  private etiqueta(texto: string, ancla: Vector3, lado: Lado): Etiqueta {
    const el = document.createElement('span');
    el.className = `mq-tag mq-${lado}`;
    el.textContent = texto;
    if (!this.opts.still) { el.style.opacity = '0'; el.style.visibility = 'hidden'; }
    this.capa.appendChild(el);
    const t = { el, ancla, lado };
    this.etiquetas.push(t);
    return t;
  }

  private colocarEtiquetas() {
    for (const t of this.etiquetas) {
      const p = this.tmp.copy(t.ancla).project(this.camara);
      const x = ((p.x + 1) / 2) * this.w;
      const y = ((1 - p.y) / 2) * this.h;
      const dy = t.lado === 'arriba' ? `calc(-100% - ${SEPARA}px)` : t.lado === 'abajo' ? `${SEPARA}px` : '-50%';
      t.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, ${dy})`;
    }
  }

  // ——— Colores e íconos ———

  private aplicarTema() {
    const c = leerColores(this.capa);
    const claro = 0.2126 * c.tinta.r + 0.7152 * c.tinta.g + 0.0722 * c.tinta.b > 0.4;
    // En oscuro, las superficies son casi negras: más luz para que se lean las caras.
    const luz = claro ? 1 : 2.4;
    this.cielo.intensity = 1.8 * luz;
    this.sol.intensity = 1.6 * luz;
    this.mats.base.color.copy(c.base);
    this.mats.pieza.color.copy(c.pieza);
    this.mats.borde.color.copy(c.texto);
    this.mats.borde.opacity = claro ? 0.34 : 0.3;
    this.mats.cable.color.copy(c.rojo);
    this.mats.paquete.color.copy(c.vivo);
    for (const p of this.piezas) p.hueco.material.color.copy(c.hueco);
    for (const p of this.piezas) {
      const svg = this.opts.glifos.find((s) => s.dataset.glifo === p.id);
      if (svg) this.pintarGlifo(p, svg);
    }
  }

  /** Copia el Glifo de la lista HTML como imagen de la tapa. Al SVG clonado se le pasan los colores que
   *  calculó el navegador (currentColor, las clases rojas, el trazo del cursor), porque como imagen
   *  suelta ya no tiene las hojas de estilo. */
  private pintarGlifo(p: Pieza, svg: SVGSVGElement) {
    const copia = svg.cloneNode(true) as SVGSVGElement;
    const de: Element[] = [svg, ...Array.from(svg.querySelectorAll('*'))];
    const a: Element[] = [copia, ...Array.from(copia.querySelectorAll('*'))];
    de.forEach((el, i) => {
      const cs = getComputedStyle(el), d = a[i];
      d.setAttribute('fill', cs.fill);
      d.setAttribute('stroke', cs.stroke);
      d.setAttribute('opacity', cs.opacity);
      d.removeAttribute('class');
      d.removeAttribute('style');
    });
    copia.setAttribute('width', String(LIENZO));
    copia.setAttribute('height', String(LIENZO));
    const xml = new XMLSerializer().serializeToString(copia);
    const img = new Image();
    img.onload = () => {
      if (this.muerto) return;
      const lienzo = document.createElement('canvas');
      lienzo.width = lienzo.height = LIENZO;
      const ctx = lienzo.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, LIENZO, LIENZO);
      // Si el navegador marcara el lienzo como «de otro origen», WebGL no podría usarlo: la tapa queda lisa.
      try { ctx.getImageData(0, 0, 1, 1); } catch { return; }
      p.textura.image = lienzo;
      p.textura.needsUpdate = true;
      this.invalidar();
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  }

  // ——— Eventos ———

  private alMover = (e: PointerEvent) => {
    if (e.pointerType === 'touch' || !this.visible) return;
    const nx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
    const ny = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
    this.meta.yaw = -nx * INCLINA;
    this.meta.pitch = ny * INCLINA;
    this.despertar();
  };

  private alSalir = () => {
    this.meta.yaw = 0;
    this.meta.pitch = 0;
    this.despertar();
  };

  private alVer = () => {
    if (document.hidden) this.dormir();
    else this.invalidar();
  };

  private alTema = () => {
    this.aplicarTema();
    this.invalidar();
  };
}
