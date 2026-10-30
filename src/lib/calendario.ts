// Calendario de la versión 5: el proceso de RebelDEV (CLAUDE.md, sección 5) puesto en fechas.
// Sprints semanales con demo cada viernes → una semana en producción a prueba → salida en vivo
// (primer pago, en cuotas) con monitoreo diario dos semanas → revisiones a los 30, 60 y 90 días.
// Sin fecha de inicio (lo que se arma en el servidor, sin JavaScript) se escribe en semanas relativas.

export type Papeleta = { id: string; titulo: string; lineas: string[] };

const DIA = 86_400_000;
const sumar = (d: Date, dias: number) => new Date(d.getTime() + dias * DIA);
const corta = new Intl.DateTimeFormat('es-PE', { weekday: 'short', day: 'numeric', month: 'short' });
const larga = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });
const f = (d: Date) => corta.format(d).replace(/[.,]/g, '');

/** El próximo lunes (nunca hoy): el arranque más cercano posible. */
export function proximoLunes(hoy = new Date()): Date {
  const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const faltan = ((8 - d.getDay()) % 7) || 7;
  return sumar(d, faltan);
}

export const fechaLarga = (d: Date) => larga.format(d).replace(',', '');

export function papeletas(semanas: number, inicio: Date | null): Papeleta[] {
  const demos: string[] = [];
  const visibles = Math.min(semanas, 6);
  for (let i = 0; i < visibles; i++) {
    demos.push(inicio ? `${f(sumar(inicio, i * 7 + 4))}: demo ${i + 1}` : `Viernes de la semana ${i + 1}: demo`);
  }
  if (semanas > visibles) demos.push(`… y ${semanas - visibles} viernes más`);

  const prueba = inicio ? sumar(inicio, semanas * 7) : null;
  const salida = prueba ? sumar(prueba, 7) : null;

  return [
    {
      id: 'diagnostico',
      titulo: 'Diagnóstico gratis',
      lineas: ['30 minutos para ver:', 'cuántos clientes te llegan,', 'cuánto tardas en responder', 'y cuántas citas logras.', inicio ? `Lo hacemos antes del ${f(inicio)}.` : 'Lo hacemos antes de empezar.'],
    },
    { id: 'demos', titulo: 'Demos de los viernes', lineas: demos },
    {
      id: 'revision',
      titulo: 'Cambio aprobado',
      lineas: ['Borrador: lo escribió la IA.', 'Pruebas automáticas: pasan.', 'Arquitectura: la de siempre.', 'Revisión: ingeniero senior.', 'Estado: aprobado.'],
    },
    {
      id: 'recibo',
      titulo: 'Semana a prueba',
      lineas: [
        prueba ? `En producción del ${f(prueba)}` : `En producción la semana ${semanas + 1},`,
        prueba ? `al ${f(sumar(prueba, 6))}.` : 'con tus clientes de verdad.',
        'A pagar esta semana: S/ 0.',
        salida ? `Primer pago: desde el ${f(salida)},` : 'Primer pago: después de la prueba,',
        'en cuotas.',
      ],
    },
    {
      id: 'despues',
      titulo: 'Después de salir',
      lineas: [
        salida ? `Monitoreo diario hasta el ${f(sumar(salida, 13))}.` : 'Monitoreo diario dos semanas.',
        salida ? `Revisión a los 30 días: ${f(sumar(salida, 30))}.` : 'Revisión a los 30 días.',
        salida ? `A los 60: ${f(sumar(salida, 60))}.` : 'Revisión a los 60 días.',
        salida ? `A los 90: ${f(sumar(salida, 90))}.` : 'Revisión a los 90 días.',
        'Luego, una al mes, incluida.',
      ],
    },
  ];
}
