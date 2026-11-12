// Pasos de RebelBot y la conversación de ejemplo que acompaña a cada uno.
// Lo que hace sale de lo público de la plataforma (resumido en CLAUDE.md, sección 2).
// La conversación es ILUSTRATIVA: no es de un cliente real y no nombra a ninguno.

export type Msg =
  | { kind: 'in' | 'out' | 'agent'; text: string }
  | { kind: 'system'; text: string }
  | { kind: 'buttons'; options: string[]; selected: number }
  | { kind: 'form'; title: string; options: string[]; selected: number; cta: string }
  | { kind: 'location'; title: string; text: string };

export type Paso = { titulo: string; texto: string; chat: Msg[] };

export const pasos: Paso[] = [
  {
    titulo: 'Responde al momento, a cualquier hora.',
    texto: 'Tu cliente escribe y recibe respuesta aunque sea de noche o feriado. Antes de pedir datos, le pide aceptar el tratamiento de su información, como exige la Ley 29733.',
    chat: [
      { kind: 'in', text: 'Hola, vi el departamento de 2 dormitorios. ¿Sigue disponible?' },
      { kind: 'out', text: '¡Hola! Te ayudo con gusto. Antes de seguir, ¿aceptas el tratamiento de tus datos personales?' },
      { kind: 'buttons', options: ['Acepto', 'Ver términos'], selected: 0 },
      { kind: 'out', text: 'Gracias. Sí, sigue disponible. ¿Lo buscas para vivir o para invertir?' },
    ],
  },
  {
    titulo: 'Entiende qué busca y lo registra.',
    texto: 'Pregunta de forma natural qué necesita, en qué plazo y cómo lo pagaría. El contacto queda guardado en tu sistema de ventas, listo para tu equipo.',
    chat: [
      { kind: 'in', text: 'Para vivir. Me mudaría en unos tres meses.' },
      { kind: 'out', text: 'Perfecto. ¿Cómo pensabas pagarlo: con crédito hipotecario o al contado?' },
      { kind: 'in', text: 'Con crédito.' },
      { kind: 'system', text: 'Cliente registrado en tu sistema de ventas' },
    ],
  },
  {
    titulo: 'Agenda la visita sin que muevas un dedo.',
    texto: 'Ofrece solo los horarios libres de tu negocio, evita las dobles reservas y manda la ubicación. Todo dentro de WhatsApp, con formularios propios de la app.',
    chat: [
      { kind: 'out', text: '¿Te gustaría visitarlo? Elige un horario:' },
      { kind: 'form', title: 'Agenda tu visita', options: ['Sábado 10:00', 'Sábado 11:30', 'Domingo 16:00'], selected: 1, cta: 'Confirmar' },
      { kind: 'out', text: 'Listo: sábado a las 11:30. Te envío la ubicación.' },
      { kind: 'location', title: 'Ubicación de la visita', text: 'Toca para abrir en el mapa' },
    ],
  },
  {
    titulo: 'No inventa. Si no sabe, llama a tu equipo.',
    texto: 'Precios, metrajes y disponibilidad salen solo de los datos de tu negocio. Si falta un dato, no improvisa: pasa la conversación a un asesor con todo el contexto.',
    chat: [
      { kind: 'in', text: '¿El edificio acepta mascotas?' },
      { kind: 'out', text: 'No tengo ese dato confirmado y no quiero darte información equivocada. Le pido a un asesor que te responda.' },
      { kind: 'system', text: 'Conversación pasada a un asesor' },
      { kind: 'agent', text: '¡Hola! Te escribo del equipo de ventas. Sí, se aceptan mascotas.' },
    ],
  },
];

// Lo demás que ya hace y no entra en los pasos de arriba. porNegocio: se enciende según lo que necesite cada negocio.
export const extras: { t: string; d: string; porNegocio?: true }[] = [
  { t: 'Envía fotos y planos', d: 'Manda el material de cada proyecto dentro de la misma conversación.' },
  { t: 'Lee tu web y propone qué aprender', d: 'Revisa tu página y te sugiere el conocimiento. Nada entra sin tu aprobación.' },
  { t: 'Lo pruebas antes de abrirlo', d: 'En el simulador del panel conversas con tu asistente sin usar WhatsApp.' },
  { t: 'Tu equipo, cada uno con su rol', d: 'Asesores, marketing y gerencia entran con su usuario y pueden activar la verificación en dos pasos.' },
  { t: 'Seguimiento de interesados', d: 'Estado de cada cliente, puntaje de interés y avisos cuando un chat queda sin atender.', porNegocio: true },
  { t: 'Recordatorios de cita', d: 'Le recuerda la visita a tu cliente un día antes y una hora antes.', porNegocio: true },
  { t: 'Reuniones en tu calendario', d: 'Agenda reuniones en Google Calendar con su enlace de videollamada.', porNegocio: true },
  { t: 'Campañas por WhatsApp', d: 'Envía mensajes aprobados por Meta solo a quienes aceptaron recibirlos.', porNegocio: true },
];
