// Textos de la versión 6, «Tablero». Lo que no cambia entre versiones (servicios, proceso, preguntas, Fredy)
// sale de estudio.ts; aquí van los textos propios. Sin fotos de archivo: las imágenes son piezas del producto
// hechas en HTML y el video de la versión 2.
// La ficha, la conversación y los datos de las piezas son ILUSTRATIVOS: un negocio de ejemplo, no un cliente.
import { servicios, preguntas, fundador } from './estudio';
import { contacto } from './contacto';

// Colores de las franjas y los bloques, en el orden en que rotan
export const tonos = ['rojo', 'tinta', 'ambar', 'hueso'] as const;
export type Tono = (typeof tonos)[number];

export const portada = {
  titulo: 'Ingeniería para empresas rebeldes.',
  frase: 'Software a medida que ves funcionar cada viernes y pruebas una semana antes de pagar.',
  boton: 'Agenda una demo',
  enlaces: [
    { t: 'Pruébalo', href: '#demo' },
    { t: 'Cómo trabajamos', href: '#proceso' },
    { t: 'Preguntas', href: '#preguntas' },
  ],
};

// La hoja de la portada: piezas del producto recortadas. «ui» dice qué fragmento, «foco» qué parte se ve.
export type Cuadro = { ui: 'chat' | 'agenda' | 'revision' | 'prueba' | 'ficha' | 'video'; foco: 'arriba' | 'medio' | 'abajo'; alto: number; titulo: string };
export const hoja: Cuadro[][] = [
  [
    { ui: 'chat', foco: 'medio', alto: 420, titulo: 'Responde a las 23:14' },
    { ui: 'revision', foco: 'abajo', alto: 220, titulo: 'Cambio aprobado' },
    { ui: 'agenda', foco: 'medio', alto: 300, titulo: 'Sábado 11:30, reservado' },
  ],
  [
    { ui: 'video', foco: 'medio', alto: 360, titulo: 'Pieza por pieza' },
    { ui: 'prueba', foco: 'arriba', alto: 340, titulo: 'Semana a prueba' },
    { ui: 'chat', foco: 'abajo', alto: 300, titulo: 'Pasa a un asesor' },
  ],
  [],
  [
    { ui: 'agenda', foco: 'arriba', alto: 300, titulo: 'Sin dobles reservas' },
    { ui: 'chat', foco: 'medio', alto: 360, titulo: 'Pide permiso primero' },
    { ui: 'revision', foco: 'arriba', alto: 320, titulo: 'Propuesto por la IA' },
  ],
  [
    { ui: 'ficha', foco: 'arriba', alto: 320, titulo: 'Solo con tus datos' },
    { ui: 'prueba', foco: 'abajo', alto: 300, titulo: 'Todavía no pagas' },
    { ui: 'video', foco: 'medio', alto: 300, titulo: 'Hecho para durar' },
  ],
  [
    { ui: 'revision', foco: 'medio', alto: 300, titulo: 'Pruebas en verde' },
    { ui: 'chat', foco: 'medio', alto: 380, titulo: 'Califica al cliente' },
    { ui: 'agenda', foco: 'abajo', alto: 280, titulo: 'Manda la ubicación' },
  ],
];

export const intro = {
  lead: 'RebelDEV es un estudio de desarrollo de software. Primero entendemos tu negocio; después construimos la solución que realmente necesitas, con IA en el proceso para entregar en semanas lo que en una empresa tradicional toma meses.',
  columnas: [
    { t: 'Quiénes somos.', d: 'Un equipo pequeño de ingeniería y diseño, liderado por Fredy Ramos: ingeniero de sistemas por San Marcos que ha liderado sistemas de WhatsApp usados por millones de personas. La IA acelera; un ingeniero senior revisa y aprueba cada cambio.' },
    { t: 'Qué hacemos.', d: 'Software a medida: asistentes de WhatsApp con IA, automatización de procesos, plataformas web, backend y APIs, integraciones y diseño de pantallas. Casi siempre se empieza por RebelBot, nuestro asistente que responde, califica y agenda.' },
    { t: 'Cómo trabajamos.', d: 'Diagnóstico gratis de 30 minutos, demo con tus datos y sprints semanales con una demo cada viernes. Antes de pagar, la solución funciona una semana en producción. Después, revisiones a los 30, 60 y 90 días.' },
    { t: 'Cómo hablarnos.', d: `Escríbenos por WhatsApp al ${contacto.whatsapp} o a ${contacto.correo}. Agendamos la media hora de diagnóstico esa misma semana. Trae tus números de hoy: cuántos clientes te escriben y cuántos se quedan sin respuesta.` },
  ],
};

// La pieza viva: RebelBot responde solo con lo que está en la ficha. Cada dato se puede apagar.
export const demo = {
  titulo: 'Pruébalo tú',
  frase: 'RebelBot solo responde con lo que está en la ficha de tu negocio. Apaga un dato y vuelve a preguntar.',
  instruccion: 'Toca una pregunta. Después apaga su dato en la ficha y pregúntala otra vez.',
  negocio: 'Departamento de 2 dormitorios',
  saludo: 'Hola, soy RebelBot. ¿Qué quieres saber del departamento?',
  deriva: 'No tengo ese dato confirmado y no quiero darte información equivocada. Le pido a un asesor que te responda.',
  aviso: 'Conversación pasada a un asesor',
  filas: [
    { k: 'disponible', l: 'Disponible', v: 'Sí', q: '¿Sigue disponible?', a: 'Sí, sigue disponible. ¿Lo buscas para vivir o para invertir?', on: true },
    { k: 'precio', l: 'Precio', v: 'S/ 385 000', q: '¿Cuánto cuesta?', a: 'Cuesta S/ 385 000. Si quieres, te cuento cómo podrías financiarlo.', on: true },
    { k: 'area', l: 'Área', v: '72 m²', q: '¿Cuántos metros tiene?', a: 'Tiene 72 m², con 2 dormitorios.', on: true },
    { k: 'visitas', l: 'Visitas', v: 'Sábados, 10:00 a 13:00', q: '¿Puedo visitarlo el sábado?', a: 'Sí, los sábados de 10:00 a 13:00. ¿Te reservo las 11:30?', on: true },
    { k: 'estacionamiento', l: 'Estacionamiento', v: '1 incluido', q: '¿Tiene estacionamiento?', a: 'Sí, incluye un estacionamiento.', on: true },
    { k: 'mascotas', l: 'Mascotas', v: 'Se aceptan', q: '¿Aceptan mascotas?', a: 'Sí, el edificio acepta mascotas.', on: false },
  ],
};

// Servicios como un tablero de detalles de interfaz ampliados. «el» dice qué elemento lleva el bloque.
export const tablero = {
  titulo: 'Lo que construimos',
  bloques: [
    { ...servicios[2], el: 'burbuja', tam: '6x4', tono: 'tinta' },
    { ...servicios[1], el: 'interruptor', tam: '3x4', tono: 'rojo' },
    { ...servicios[0], el: 'llaves', tam: '3x2', tono: 'hueso' },
    { ...servicios[4], el: 'estado', tam: '3x2', tono: 'ambar' },
    { ...servicios[5], el: 'discos', tam: '3x4', tono: 'hueso' },
    { ...servicios[3], el: 'direccion', tam: '6x2', tono: 'tinta' },
    { ...servicios[6], el: 'deslizador', tam: '3x2', tono: 'rojo' },
    { t: '¿Algo más?', d: 'Si implica software, probablemente podemos construirlo. Conversemos.', el: 'cursor', tam: '3x2', tono: 'ambar' },
  ],
};

// El proceso como una sola barra: cada tramo mide lo que dura de verdad.
export const proceso = {
  titulo: 'De la primera llamada a producción',
  tramos: [
    { dura: 'Media hora', peso: 0.5, tono: 'hueso', d: 'Primero, un diagnóstico gratis: cuántos clientes llegan, cuánto tardas en responder y cuántas citas logras.' },
    { dura: 'Unas semanas', peso: 4, tono: 'tinta', d: 'Luego, sprints semanales con una demo cada viernes, con los datos reales de tu negocio.' },
    { dura: 'Una semana', peso: 1, tono: 'ambar', d: 'Después, una semana en producción a prueba. Todavía no pagas; si te convence, pagas en cuotas.' },
    { dura: 'Noventa días', peso: 13, tono: 'rojo', d: 'Al final, monitoreo diario dos semanas y revisiones contigo a los 30, 60 y 90 días.' },
  ],
};

export const fredy = {
  titulo: 'Lo lidera Fredy Ramos',
  lead: `${fundador.cargo}. Recorrió el camino completo del software: desarrollador, arquitecto de software, líder técnico, arquitecto de tecnología y Product Owner.`,
  nota: 'La IA escribe borradores de código, pruebas y documentación. Un ingeniero senior define la arquitectura y aprueba cada cambio. La IA acelera, no decide.',
  datos: [
    { k: 'Formación', v: 'Ingeniería de Sistemas, UNMSM' },
    { k: 'Rol', v: 'Responsable y líder de RebelDEV' },
    { k: 'Experiencia', v: 'Sistemas de WhatsApp usados por millones' },
    { k: 'Especialidad', v: 'Chatbots e inteligencia artificial' },
  ],
};

export const faq = { titulo: 'Preguntas frecuentes', items: preguntas };

export const cierre = {
  titulo: 'Agenda tu diagnóstico gratis',
  texto: 'Media hora por WhatsApp para ver qué te quita tiempo hoy. Sin compromiso y con tus números reales.',
  boton: 'Agenda por WhatsApp',
};

export const pie = {
  columnas: [
    { t: 'Estudio', links: [{ t: 'Lo que construimos', href: '#servicios' }, { t: 'Cómo trabajamos', href: '#proceso' }] },
    { t: 'RebelBot', links: [{ t: 'Pruébalo', href: '#demo' }, { t: 'Preguntas', href: '#preguntas' }] },
    { t: 'Equipo', links: [{ t: 'Fredy Ramos', href: '#equipo' }, { t: 'LinkedIn', href: contacto.linkedin }] },
    { t: 'Versiones', links: [{ t: 'Versión 5', href: '/v5' }, { t: 'Versión 4', href: '/v4' }] },
  ],
};

// La conversación de ejemplo que muestran las piezas de chat (ui/Chat.astro).
export const rebelbot = {
  conversacion: [
    { kind: 'in', text: 'Hola, vi el departamento de 2 dormitorios. ¿Sigue disponible?' },
    { kind: 'out', text: '¡Hola! Te ayudo con gusto. Antes de seguir, ¿aceptas el tratamiento de tus datos personales?' },
    { kind: 'buttons', options: ['Acepto', 'Ver términos'], selected: 0 },
    { kind: 'out', text: 'Gracias. Sí, sigue disponible. ¿Lo buscas para vivir o para invertir?' },
    { kind: 'in', text: 'Para vivir. ¿El edificio acepta mascotas?' },
    { kind: 'out', text: 'No tengo ese dato confirmado y no quiero darte información equivocada. Le pido a un asesor que te responda.' },
    { kind: 'system', text: 'Conversación pasada a un asesor' },
    { kind: 'agent', text: '¡Hola! Te escribo del equipo de ventas. Sí, se aceptan mascotas.' },
  ],
};
