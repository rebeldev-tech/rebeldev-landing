// Textos de la v1 (3 nov 2026): producto primero (RebelBot), «Solo pagas lo que consumes» y la consultoría como opción.
// Lo que no cambia sigue saliendo de estudio.ts y fina.ts. Las cifras de precios están en precios.ts.
import { proceso, comparacion, servicios } from './estudio';
import { estaciones } from './fina';

export const metaV1 = {
  title: 'RebelDEV · Soluciones con IA y RebelBot, tu asistente de ventas en WhatsApp',
  description: 'RebelDEV es especialista en soluciones con inteligencia artificial. RebelBot, nuestro asistente de ventas en WhatsApp, atiende, califica y agenda las 24 horas, y solo pagas lo que consume. También hacemos software a medida.',
};

export const linksV1 = [
  { href: '#producto', label: 'Producto' },
  { href: '#precios', label: 'Precios' },
  { href: '#a-medida', label: 'A medida' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const heroV1 = {
  bajada: 'Especialistas en soluciones con IA. RebelBot, nuestro asistente de WhatsApp, atiende, califica y agenda las 24 horas. Solo pagas lo que consume.',
  primario: 'Prueba una semana gratis',
  secundario: { texto: 'Mira el producto', href: '#producto' },
  cinta: ['Responde 24/7', 'Califica a tus clientes', 'Agenda visitas', 'No inventa datos', 'Pasa la conversación a tu equipo', 'Aprende de tus asesores', 'Solo pagas lo que consume'],
};

// La fila de WhatsApp pasa a la sección Producto.
export const serviciosV1 = servicios.filter((s) => s.g !== 'wa');

export const aMedida = {
  titulo: '¿Necesitas algo más? Lo construimos a tu medida.',
  texto: 'RebelBot es nuestro foco, pero también hacemos consultoría: soluciones con IA pensadas para cómo trabaja tu empresa. Así lo hacemos.',
};

const cambiosProceso: Record<number, { t?: string; d: string }> = {
  0: { d: 'Media hora para ver cuántos clientes llegan y cuánto tardas en responder. Escaneamos tu web gratis para cotizarte exacto.' },
  2: { d: 'Cuánto ganas con una sola venta extra frente a lo que consume tu asistente.' },
  5: { t: 'Primera semana gratis', d: 'Tu asistente atiende una semana en producción antes de que pagues.' },
  7: { d: 'Revisamos las métricas contigo. Después, mejoras incluidas; en los planes, revisión mensual con el equipo.' },
};
export const procesoV1 = proceso.map((p, i) => ({ ...p, ...cambiosProceso[i] }));

export const estacionesV1 = estaciones.map((e) => {
  if (e.escena === 'balanza') return { ...e, marcas: ['Una venta extra', 'Lo que consume'] };
  if (e.escena === 'revisiones') return { ...e, marcas: ['30 días', '60 días', '90 días', 'Mejora continua'] };
  // 07: un calendario de 2 semanas con un visto por día se lee mejor que los cuadritos sueltos de la Fina
  if (e.escena === 'monitoreo') return { ...e, escena: 'chequeo', marcas: ['Sem. 1', 'Sem. 2', 'Revisado cada día'] };
  return e;
});

export const procesoV1Titulo = 'Ocho pasos, y no pagas hasta verlo atender.';
export const medidorV1 = { antes: 'Has pagado: nada todavía', despues: 'Desde aquí, solo lo que consume' };

export const comparacionV1 = [
  { k: 'Cómo pagas', a: 'Implementación por adelantado y una mensualidad fija', r: 'Solo lo que consume tu asistente' },
  comparacion[0], // tiempo de entrega
  { k: 'Riesgo para ti', a: 'Pago adelantado, contrato largo', r: 'Nada por adelantado; por uso, sin contrato' },
  { k: 'Después de entregar', a: 'Cobra por cada cambio', r: 'Soporte y mejoras incluidos' },
];

export const lineasV1 = {
  nosotros: { titulo: 'En semanas', marcas: ['Demo cada viernes', 'Sin pago adelantado', 'Pagas lo que consume', 'Mejoras incluidas'] },
  agencia: { titulo: 'En meses', marcas: ['Contrato largo', 'Pago adelantado', 'Desarrollo', 'Entrega', 'Cada cambio se cobra'] },
};

// Sin frase de garantías debajo del comparador: las tres ya se dicen en Precios, Proceso y el cierre.
export const garantiasV1: { t: string }[] = [];

export const preguntasV1 = [
  { q: '¿Solo hacen asistentes de WhatsApp?', a: 'No. RebelBot es nuestro producto y nuestro foco. También hacemos consultoría: soluciones con IA a la medida de tu empresa, desde automatización de procesos hasta plataformas web e integraciones.' },
  { q: '¿Cuánto cuesta?', a: 'Solo pagas lo que consume tu asistente: S/ 1.18 por crédito con IGV, y una conversación típica usa más o menos un crédito. Si atiendes mucho, un plan mensual te conviene más. El detalle está en Precios.' },
  { q: '¿Qué es un crédito?', a: 'Son 100,000 tokens procesados: lo que la IA lee y escribe para responder, incluidas sus instrucciones y los datos de tu negocio que relee antes de contestar.' },
  { q: '¿Tengo que pagar antes de ver resultados?', a: 'No. La primera semana es gratis, con tu asistente atendiendo en producción. Después pagas solo lo que consume.' },
  { q: '¿Tengo que firmar un contrato?', a: 'En la modalidad por uso, no: pagas mes a mes y cancelas cuando quieras. Los planes mensuales son de 12 meses e incluyen la implementación, sin pago inicial.' },
  { q: '¿Y si me paso de créditos?', a: 'Te avisamos al llegar al 80 %, y tu asistente nunca se apaga a mitad de una conversación. En los planes puedes sumar recargas.' },
  { q: '¿RebelBot puede inventar precios o datos?', a: 'No. Responde solo con los datos de tu negocio. Si falta algo, ofrece que un asesor lo confirme.' },
  { q: '¿Qué pasa si el asistente no puede resolver algo?', a: 'Pasa la conversación a una persona de tu equipo. Si el asesor no responde a tiempo, la retoma con todo el contexto para que el cliente no se quede esperando.' },
  { q: '¿Se conecta con mi sistema de ventas?', a: 'Sí, en los planes Crecimiento y Pro: registra a cada cliente potencial en tu sistema de ventas. Hoy se conecta con Odoo; si usas otro, conversemos.' },
  { q: '¿Cómo cuida los datos de mis clientes?', a: 'Pide aceptar los términos de forma explícita antes de procesar datos personales, de acuerdo con la Ley 29733. Además, oculta los teléfonos en los registros y no guarda ahí el contenido de los mensajes.' },
  { q: '¿Quién paga las plantillas de WhatsApp?', a: 'Meta. Los recordatorios y campañas fuera de la ventana de 24 horas los cobra Meta directamente a tu negocio y no consumen créditos.' },
  { q: '¿Sirve para mi industria?', a: 'Nació para el sector inmobiliario y está pensado para adaptarse a otras industrias. Cuéntanos cómo vendes y vemos cómo encaja.' },
  { q: '¿Usan inteligencia artificial para construir?', a: 'Sí, para acelerar. La IA escribe borradores de código, pruebas y documentación; un ingeniero senior define la arquitectura y aprueba cada cambio. La IA acelera, no decide.' },
  { q: '¿Cómo empezamos?', a: 'Agenda una demo por WhatsApp. Escaneamos tu web gratis, te cotizamos exacto y tu asistente atiende una semana gratis antes de que pagues.' },
];

export const cierreV1 = {
  titulo: 'Prueba RebelBot una semana gratis.',
  bajada: 'Lo construimos rápido con IA y lo revisan ingenieros que han hecho sistemas para millones de personas.',
};
