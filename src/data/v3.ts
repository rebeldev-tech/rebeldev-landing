// Textos propios de la versión 3. Lo compartido (servicios, proceso, garantías, Fredy, preguntas) sigue en estudio.ts.
// Las frases largas salen del resumen oficial (CLAUDE.md, sección 1) y del cuestionario de marca.
// Las «piezas» y el código son EJEMPLOS ilustrativos de un negocio cualquiera: no son clientes ni casos reales.

export const hero = {
  titulo: ['Ingeniería para', 'empresas rebeldes.'],
  bajada: 'RebelDEV es un estudio de desarrollo de software. Creamos soluciones a medida según lo que necesita cada empresa.',
};

// Del caos al sistema: cuatro frases a la izquierda, una por paso.
export const pasosCaos = [
  { t: 'Hoy tu negocio funciona con piezas sueltas.', d: 'Pedidos que llegan por WhatsApp, clientes en un Excel, la agenda en un cuaderno. Todo funciona, hasta que alguien se va de vacaciones.' },
  { t: 'Primero entendemos tu negocio.', d: 'Vemos cómo trabajas de verdad: qué pasa con cada pedido, quién lo toca y dónde se pierde tiempo.' },
  { t: 'Después construimos la solución que realmente necesitas.', d: 'Cada pieza encuentra su lugar: lo que ven tus clientes, las reglas de tu negocio, tus datos y lo que ya usas.' },
  { t: 'Pieza por pieza. Hecho para durar y crecer.', d: 'Cuando necesites algo nuevo, se suma una pieza. El resto sigue funcionando.' },
];

// Capas del sistema ordenado (de arriba abajo).
export const capas = [
  { id: 'pantallas', t: 'Lo que ven tus clientes y tu equipo' },
  { id: 'reglas', t: 'Las reglas de tu negocio' },
  { id: 'datos', t: 'Tus datos, en un solo lugar' },
  { id: 'conexiones', t: 'Conectado con lo que ya usas' },
];

// Cada pieza: cómo se ve en el caos («antes»), cómo se llama ya ordenada («despues»), su capa
// y su lugar en el desorden (x e y en % del escenario, giro en grados).
export const piezas = [
  { antes: 'Web que nadie actualiza', despues: 'Web', capa: 'pantallas', x: 6, y: 8, r: -7 },
  { antes: 'Reporte del lunes, a mano', despues: 'Panel del equipo', capa: 'pantallas', x: 52, y: 4, r: 5 },
  { antes: 'Mensajes que llegan de noche', despues: 'WhatsApp que responde', capa: 'pantallas', x: 30, y: 74, r: -4 },
  { antes: 'Pedidos por WhatsApp', despues: 'Pedidos', capa: 'reglas', x: 58, y: 30, r: 9 },
  { antes: 'Agenda en un cuaderno', despues: 'Agenda', capa: 'reglas', x: 2, y: 42, r: 4 },
  { antes: 'Facturas a mano', despues: 'Facturación', capa: 'reglas', x: 64, y: 62, r: -10 },
  { antes: 'clientes_final_v3.xlsx', despues: 'Clientes', capa: 'datos', x: 26, y: 24, r: -3 },
  { antes: 'Inventario «a ojo»', despues: 'Inventario', capa: 'datos', x: 8, y: 86, r: 8 },
  { antes: 'Ventas en otra hoja', despues: 'Ventas', capa: 'datos', x: 36, y: 50, r: 6 },
  { antes: 'Correos sin responder', despues: 'Correo', capa: 'conexiones', x: 70, y: 86, r: 3 },
  { antes: 'El sistema de ventas, aparte', despues: 'Sistema de ventas', capa: 'conexiones', x: 4, y: 62, r: -6 },
  { antes: 'Cobros por transferencia', despues: 'Pagos', capa: 'conexiones', x: 62, y: 46, r: -2 },
];

// La pieza que llega en el último paso: el sistema crece sin rehacerse.
export const piezaNueva = { t: 'App para tu equipo', capa: 'pantallas' };

// Panel «La IA acelera, no decide»: lo que escribe la IA y lo que decide el ingeniero.
// Un bloque vuelve con un pedido de cambio, para mostrar que la revisión decide de verdad.
export const revision = [
  {
    archivo: 'agenda.ts',
    codigo: [
      'export function reservar(cita, agenda) {',
      '  if (agenda.ocupada(cita.hora)) {',
      '    return agenda.sugerirOtra(cita);',
      '  }',
      '  return agenda.guardar(cita);',
      '}',
    ],
    nota: 'Aprobado por un ingeniero senior',
  },
  {
    archivo: 'agenda.test.ts',
    codigo: [
      "test('no reserva dos citas a la misma hora', () => {",
      '  agenda.guardar(citaDe10);',
      '  expect(reservar(otraDe10, agenda)).not.toBe(guardada);',
      '});',
    ],
    pedido: 'Falta el caso de feriados',
    arreglo: "test('no reserva en un feriado', () => { … });",
    nota: 'Aprobado por un ingeniero senior, después del cambio',
  },
];

export const cierre = {
  titulo: 'Cuéntanos qué necesita tu negocio.',
  bajada: 'Ingeniería de sistemas usados por millones, entregada en semanas.',
};
