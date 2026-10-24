// Geometría del isotipo </> provisional (propuesta I-A de referencias/propuestas-logo.html).
// Alto T = 30 unidades; trazo = 0,22 del alto; los tres signos separados por medio trazo.
// Se usa en el logo (SVG), en la pantalla de carga y para muestrear las partículas.

export const T = 30;
const SR = 0.22;

const s = SR * T;
const h = (T - s) / 2;
const dx = (h * 10) / 11;
const Wc = dx + s;           // ancho de < y >
const Ws = (T - s) / 3 + s;  // ancho de /
const g = s / 2;             // aire entre signos
const r = s / 2;

const x0 = Wc + g;
const x1 = x0 + Ws + g;

const f = (n: number) => +n.toFixed(2);

export const MARK = {
  width: f(x1 + Wc),
  height: T,
  stroke: f(s),
  left: `M${f(Wc - r)} ${f(r)} L${f(r)} ${T / 2} L${f(Wc - r)} ${f(T - r)}`,
  slash: `M${f(x0 + Ws - r)} ${f(r)} L${f(x0 + r)} ${f(T - r)}`,
  right: `M${f(x1 + r)} ${f(r)} L${f(x1 + Wc - r)} ${T / 2} L${f(x1 + r)} ${f(T - r)}`,
};
