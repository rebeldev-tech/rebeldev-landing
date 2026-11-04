// Precios de RebelBot: cifras del cotizador «Créditos Rebel» (vista para clientes, modalidad «Implementación incluida»),
// tomadas el 3 nov 2026. Si el equipo cambia el modelo, se cambia solo aquí.
// Precios en soles. «Con IGV» suma el 18 %.

export const IGV = 0.18;

export const credito = {
  precio: 1, // S/ por crédito, sin IGV (modalidad por uso)
  tokens: 100_000,
  // Créditos por conversación: promedio de la mezcla del cotizador (reproduce sus ejemplos al céntimo).
  porConversacion: 1.048833,
  porSeguimiento: 1 / 20, // 1 crédito cada 20 mensajes de seguimiento
  cargaPor10Paginas: 0.2, // lectura de web o documentos, solo el primer mes
  topePorUso: 1_500, // créditos al mes; arriba de eso conviene un plan
};

export const porUso = {
  nombre: 'Por uso',
  etiqueta: 'Para empezar',
  ejemplos: [150, 300, 600], // conversaciones al mes
  incluye: [
    'Sin contrato: cancelas cuando quieras',
    'Asistente 24/7 con plantilla estándar para inmobiliarias',
    'Hasta 1,500 créditos al mes; arriba de eso te conviene un plan',
  ],
};

export type Plan = { id: string; nombre: string; base: number; creditos: number; conversaciones: number; crm: boolean; incluye: string[] };

export const planes: Plan[] = [
  {
    id: 'arranque', nombre: 'Arranque', base: 1870, creditos: 1000, conversaciones: 897, crm: false,
    incluye: ['Asistente 24/7 que responde, califica y agenda', 'Carga de tu web y brochures', 'Reporte mensual de resultados'],
  },
  {
    id: 'crecimiento', nombre: 'Crecimiento', base: 3630, creditos: 2000, conversaciones: 1794, crm: true,
    incluye: ['Todo lo de Arranque', 'Conexión con tu sistema de ventas (CRM)', 'Seguimientos automáticos a leads', 'Revisión mensual con el equipo'],
  },
  {
    id: 'pro', nombre: 'Pro', base: 5630, creditos: 5000, conversaciones: 4484, crm: true,
    incluye: ['Todo lo de Crecimiento', 'Varios proyectos o sedes', 'Reporte de aprendizaje con asesores', 'Soporte prioritario'],
  },
];

export const notaPlanes = 'Implementación incluida, sin pago inicial. Contrato mínimo de 12 meses. La conexión con tu sistema de ventas (CRM) está incluida en Crecimiento y Pro.';

// Por uso o plan mensual: lo que cambia entre las dos formas de pagar (la primera semana gratis es igual y ya se dice
// en la portada, en Proceso y en el cierre). v: lo que se lee primero; d: el detalle. cifra: la fila va grande.
export const ladosModo = {
  uso: { nombre: 'Por uso', para: 'Para empezar.' },
  plan: { nombre: 'Planes mensuales', para: 'Cuando ya atiendes mucho.' },
};

export type Lado = { v: string; d?: string };
export const modalidades: { tema: string; uso: Lado; plan: Lado; cifra?: true }[] = [
  { tema: 'Contrato', uso: { v: 'Mes a mes', d: 'Cancelas cuando quieras' }, plan: { v: '12 meses', d: 'Implementación incluida, sin pago inicial' }, cifra: true },
  { tema: 'Si el asistente deja de responder', uso: { v: 'Menos de 4 h', d: 'Te atendemos 24/7' }, plan: { v: 'Menos de 1 h', d: 'Te atendemos 24/7' }, cifra: true },
  { tema: 'Consultas y cambios', uso: { v: '1 día hábil', d: 'En horario laboral' }, plan: { v: '4 horas', d: 'En horario laboral' }, cifra: true },
  { tema: 'Disponibilidad de la plataforma', uso: { v: '99.5 %', d: 'Al mes' }, plan: { v: '99.9 %', d: 'Al mes' }, cifra: true },
  { tema: 'Volumen', uso: { v: 'Hasta 1,500 créditos al mes' }, plan: { v: 'Sin tope, con recargas' } },
  { tema: 'Configuración', uso: { v: 'Plantilla estándar' }, plan: { v: 'A la medida de tu negocio' } },
  { tema: 'Conexión con tu sistema de ventas (CRM)', uso: { v: 'No incluida' }, plan: { v: 'Incluida en Crecimiento y Pro' } },
  { tema: 'Mejora continua', uso: { v: 'Encuesta de opinión cada 3 meses' }, plan: { v: 'Revisión mensual y canal directo con el equipo' } },
];

// Lo que consume cada acción (créditos aproximados). n: null = gratis. ref: la que sirve de medida (≈ 1 crédito).
export type Accion = { t: string; d: string; n: number | null; ref?: true };
export const acciones: { grupo: string; items: Accion[] }[] = [
  {
    grupo: 'Conversaciones',
    items: [
      { t: 'Corta', d: 'Hasta 5 mensajes del cliente', n: 0.4 },
      { t: 'Típica', d: 'De 6 a 12 mensajes', n: 1.1, ref: true },
      { t: 'Larga', d: 'De 13 a 20 mensajes', n: 2.4 },
      { t: 'Muy larga', d: 'Más de 20 mensajes', n: 4 },
    ],
  },
  {
    grupo: 'Otras tareas',
    items: [
      { t: 'Leer tu web', d: 'Cada 10 páginas, nivel Básico', n: 0.2 },
      { t: 'Leer documentos', d: 'Cada 10 páginas, nivel Básico', n: 0.2 },
      { t: 'Seguimientos automáticos', d: 'Cada 20 mensajes', n: 1 },
      { t: 'Reporte mensual de aprendizaje', d: '300 chats de asesores, nivel Básico', n: 5 },
      { t: 'Escaneo inicial de tu web', d: 'Para cotizarte exacto', n: null },
    ],
  },
];
// Tope de la regla: la acción que más consume.
export const topeAcciones = 5;

export const notaAcciones = 'Antes de cargar tu web hacemos un escaneo gratuito y te decimos exactamente cuántos créditos consumirá. Te avisamos al llegar al 80 % de tus créditos, y tu asistente nunca se apaga a mitad de una conversación.';

// Transparencia: qué es un crédito y qué paga cada sol.
export const queEs = {
  titulo: '1 crédito = 100,000 tokens procesados',
  texto: 'Un token es un pedazo de palabra. Cuentan los tokens que la IA lee y escribe en cada respuesta. De esos 100,000, solo cerca del 1 % es la conversación que ves: unos 10 mensajes de ida y vuelta. El resto es lo que tu asistente relee antes de contestar: sus instrucciones, tu catálogo, tus precios y tu agenda.',
  nota: 'Es como un asesor que revisa la ficha del proyecto antes de responder cada mensaje. Por eso cobramos por lo procesado y no por palabras.',
};

export const cadaSol: [string, number][] = [
  ['Inteligencia artificial (Claude)', 0.25],
  ['Servidores y conexión con WhatsApp', 0.05],
  ['Soporte, monitoreo y mejoras', 0.4],
  ['Margen de RebelDEV', 0.3],
];

export const notaCadaSol = 'Si nuestro costo de IA baja, revisamos el precio del crédito cada 6 meses y compartimos el ahorro contigo.';

export const niveles: [string, string, number][] = [
  ['Básico', 'Preguntas frecuentes, precios, ubicación, leer tu web y documentos', 0.7],
  ['Estándar', 'Calificar leads, agendar visitas, hacer seguimiento', 1],
  ['Avanzado', 'Casos complejos, comparar proyectos, negociar condiciones', 1.5],
];

export const notaNiveles = 'Por defecto tu asistente elige el nivel según la pregunta, para que ahorres sin perder calidad. Si prefieres, puedes fijar un nivel. Tu factura muestra los tokens y créditos de cada nivel.';

export const notaPie = 'Precios en soles. «Con IGV» incluye el 18 % de IGV. Las plantillas de WhatsApp (recordatorios y campañas fuera de la ventana de 24 horas) las cobra Meta directamente a tu negocio y no consumen créditos.';

// Ayudas de cálculo (las usa el cotizador y la tarjeta de «por uso»).
export const conIgv = (s: number) => Math.round(s * (1 + IGV) * 100) / 100;
export const creditosMes = (conversaciones: number, seguimientos: number) =>
  conversaciones * credito.porConversacion + seguimientos * credito.porSeguimiento;
export const soles = (n: number) => `S/ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const solesEnteros = (n: number) => `S/ ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
