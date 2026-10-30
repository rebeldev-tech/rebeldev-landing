// Geometría del logotipo `Rebel</DEV>` y del isotipo `</>`, para la animación «Bloqueo» (versión 4).
// El bloque DATA se copió tal cual de referencias/animacion-logo.html (línea 145): letras convertidas a
// trazos desde Bricolage Grotesque 800 y los tres signos como polilíneas de trazo grueso y puntas redondas.
// Unidades: el alto de las mayúsculas es T = 30; el logotipo va de x 0 a logoW.
// Aquí solo hay funciones puras: sirven al compilar (el SVG se arma en el servidor) y en el navegador.

export const DATA = {"T": 30.0, "stroke": 6.6, "r": 3.3, "logoW": 264.773, "isoW": 55.473, "letters": [{"d": "M3.14 30V0H15.91Q18.41 0 20.45 0.39Q22.5 0.77 24.07 1.52Q25.64 2.27 26.73 3.34Q27.82 4.41 28.36 5.8Q28.91 7.18 28.91 8.86Q28.91 10.45 28.41 11.73Q27.91 13 26.89 13.95Q25.86 14.91 24.32 15.5Q22.77 16.09 20.73 16.36V17.05Q23.32 17.32 24.75 18.2Q26.18 19.09 26.95 20.55Q27.73 22 28.32 24.05L30.05 30H21.91L20.59 24.5Q20.18 22.68 19.48 21.68Q18.77 20.68 17.68 20.3Q16.59 19.91 14.95 19.91H10.45V30ZM10.45 14.5H15.41Q18.18 14.5 19.73 13.41Q21.27 12.32 21.27 10Q21.27 7.73 19.86 6.64Q18.45 5.55 15.59 5.55H10.45Z", "order": 4}, {"d": "M43.91 30.64Q40.91 30.64 38.55 29.84Q36.18 29.05 34.52 27.5Q32.86 25.95 32 23.68Q31.14 21.41 31.14 18.45Q31.14 15.59 31.98 13.18Q32.82 10.77 34.39 9.02Q35.95 7.27 38.25 6.32Q40.55 5.36 43.41 5.36Q46.32 5.36 48.52 6.3Q50.73 7.23 52.16 9.05Q53.59 10.86 54.27 13.48Q54.95 16.09 54.73 19.45L35.95 19.59V15.77L50.55 15.64L47.95 17.41Q48.27 15.14 47.68 13.7Q47.09 12.27 45.95 11.61Q44.82 10.95 43.5 10.95Q41.91 10.95 40.7 11.82Q39.5 12.68 38.82 14.32Q38.14 15.95 38.14 18.32Q38.14 22.05 39.75 23.73Q41.36 25.41 43.86 25.41Q45.09 25.41 45.91 25.07Q46.73 24.73 47.25 24.2Q47.77 23.68 48.07 23.05Q48.36 22.41 48.55 21.82L54.91 23.18Q54.55 24.86 53.75 26.23Q52.95 27.59 51.61 28.59Q50.27 29.59 48.39 30.11Q46.5 30.64 43.91 30.64Z", "order": 3}, {"d": "M72.77 30.64Q70.5 30.64 68.8 29.77Q67.09 28.91 66.02 27.18Q64.95 25.45 64.59 22.91H63.73L63.59 30H57.59V18.23V-2.73H64.91V5.23Q64.91 6.32 64.75 7.52Q64.59 8.73 64.34 10.05Q64.09 11.36 63.82 12.86H64.86Q65.5 10.41 66.55 8.77Q67.59 7.14 69.16 6.3Q70.73 5.45 72.86 5.45Q75.86 5.45 78.07 7Q80.27 8.55 81.5 11.39Q82.73 14.23 82.73 18.18Q82.73 22 81.52 24.8Q80.32 27.59 78.09 29.11Q75.86 30.64 72.77 30.64ZM70.05 24.73Q71.55 24.73 72.68 23.89Q73.82 23.05 74.43 21.52Q75.05 20 75.05 17.95Q75.05 15.86 74.45 14.39Q73.86 12.91 72.8 12.09Q71.73 11.27 70.23 11.27Q69.23 11.27 68.39 11.64Q67.55 12 66.91 12.64Q66.27 13.27 65.82 14.07Q65.36 14.86 65.14 15.75Q64.91 16.64 64.91 17.5V18.45Q64.91 19.41 65.18 20.5Q65.45 21.59 66.07 22.55Q66.68 23.5 67.66 24.11Q68.64 24.73 70.05 24.73Z", "order": 2}, {"d": "M96.86 30.64Q93.86 30.64 91.5 29.84Q89.14 29.05 87.48 27.5Q85.82 25.95 84.95 23.68Q84.09 21.41 84.09 18.45Q84.09 15.59 84.93 13.18Q85.77 10.77 87.34 9.02Q88.91 7.27 91.2 6.32Q93.5 5.36 96.36 5.36Q99.27 5.36 101.48 6.3Q103.68 7.23 105.11 9.05Q106.55 10.86 107.23 13.48Q107.91 16.09 107.68 19.45L88.91 19.59V15.77L103.5 15.64L100.91 17.41Q101.23 15.14 100.64 13.7Q100.05 12.27 98.91 11.61Q97.77 10.95 96.45 10.95Q94.86 10.95 93.66 11.82Q92.45 12.68 91.77 14.32Q91.09 15.95 91.09 18.32Q91.09 22.05 92.7 23.73Q94.32 25.41 96.82 25.41Q98.05 25.41 98.86 25.07Q99.68 24.73 100.2 24.2Q100.73 23.68 101.02 23.05Q101.32 22.41 101.5 21.82L107.86 23.18Q107.5 24.86 106.7 26.23Q105.91 27.59 104.57 28.59Q103.23 29.59 101.34 30.11Q99.45 30.64 96.86 30.64Z", "order": 1}, {"d": "M110.55 30V-2.73H117.73V30Z", "order": 0}, {"d": "M163.78 30V24.09H172.46Q174.83 24.09 176.42 23.09Q178.01 22.09 178.8 20.09Q179.6 18.09 179.6 15.09Q179.6 12.68 179.1 10.95Q178.6 9.23 177.62 8.11Q176.65 7 175.12 6.45Q173.6 5.91 171.55 5.91H163.78V0H171.28Q176.87 0 180.42 1.77Q183.96 3.55 185.6 6.84Q187.24 10.14 187.24 14.73Q187.24 18.27 186.4 20.86Q185.55 23.45 184.1 25.2Q182.65 26.95 180.76 28.02Q178.87 29.09 176.8 29.55Q174.74 30 172.69 30ZM160.37 30V0H167.69V30Z", "order": 5}, {"d": "M190.83 30V0H198.19V30ZM196.15 30V24.09H214.65V30ZM196.15 17.55V12.23H212.33V17.55ZM196.15 5.86V0H214.51V5.86Z", "order": 6}, {"d": "M225.24 30 215.46 0H223.46L230.05 23.86H230.69L237.28 0H245.19L235.42 30Z", "order": 7}], "signs": [{"kind": "l", "logoX": 122.3, "w": 17.236, "isoX": 0.0}, {"kind": "m", "logoX": 142.836, "w": 14.4, "isoX": 20.536}, {"kind": "r", "logoX": 247.536, "w": 17.236, "isoX": 38.236}]} as const;

export type Signo = (typeof DATA.signs)[number];

export const T = DATA.T;
export const R = DATA.r;
export const TRAZO = DATA.stroke;
export const W = DATA.logoW;
export const IW = DATA.isoW;

/** Margen del marco de mira alrededor del logotipo y largo de cada esquina (en unidades, como la referencia). */
export const MARGEN = 4;
export const LARGO = 5;

/**
 * Caja del logotipo final (para el viewBox): la «b» y la «l» suben hasta y −2,73 y las curvas de la
 * «e» y la «b» bajan hasta 30,64. Las esquinas del marco quedan fuera y se ven con overflow visible.
 */
export const CAJA = { x: 0, y: -2.73, w: W, h: 30.64 + 2.73 } as const;

/** Vértices de un signo con su borde izquierdo en x = 0 (los extremos quedan a R del borde por la punta redonda). */
export function signPoly(sg: Signo): [number, number][] {
  const w = sg.w, r = R;
  if (sg.kind === 'l') return [[w - r, r], [r, T / 2], [w - r, T - r]];
  if (sg.kind === 'r') return [[r, r], [w - r, T / 2], [r, T - r]];
  return [[w - r, r], [r, T - r]];
}

/** Trazo SVG del signo con su borde izquierdo en x0. */
export function signD(sg: Signo, x0: number) {
  const p = signPoly(sg).map(([px, py]) => [x0 + px, py]);
  return 'M' + p.map(([px, py]) => `${px.toFixed(3)} ${py.toFixed(3)}`).join(' L');
}

/** Posición de cada signo en el logotipo y en el isotipo (alineado a la izquierda: su `<` arranca en x 0). */
export const posLogotipo = DATA.signs.map((sg) => sg.logoX);
export const posIsotipo = DATA.signs.map((sg) => sg.isoX);

/**
 * Desplazamiento x con que arranca cada signo para formar el `</>` ALINEADO A LA IZQUIERDA (en la barra el
 * logo empieza ahí; la referencia lo centra con + (W − IW) / 2). La animación lo lleva a 0.
 */
export const desplazamientos = DATA.signs.map((sg) => sg.isoX - sg.logoX);

export type Esquina = { d: string; dx: number };

/**
 * Las cuatro esquinas del marco de mira, ya en su lugar final (alrededor del logotipo), con el
 * desplazamiento inicial que las deja encerrando el isotipo a la izquierda: las de la izquierda no se
 * mueven y las de la derecha arrancan corridas W − IW hacia la izquierda.
 */
export const esquinas: Esquina[] = [
  { cx: -MARGEN, cy: -MARGEN, sx: 1, sy: 1, dx: 0 },
  { cx: W + MARGEN, cy: -MARGEN, sx: -1, sy: 1, dx: -(W - IW) },
  { cx: -MARGEN, cy: T + MARGEN, sx: 1, sy: -1, dx: 0 },
  { cx: W + MARGEN, cy: T + MARGEN, sx: -1, sy: -1, dx: -(W - IW) },
].map((c) => ({
  d: `M${c.cx} ${c.cy + c.sy * LARGO} L${c.cx} ${c.cy} L${c.cx + c.sx * LARGO} ${c.cy}`,
  dx: c.dx,
}));
