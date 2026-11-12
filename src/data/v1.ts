// Textos de la página: producto primero (RebelBot), «Solo pagas lo que consumes» y la consultoría como opción.
// Las cifras de precios están en precios.ts; las preguntas las toman de ahí.
import { credito, precioInicial, saldo, conIgv, pagoMes, soles } from './precios';

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

// Servicios a medida (especialidades de CLAUDE.md, sección 1). Los asistentes de WhatsApp van en la sección Producto.
// g: el glifo y la demo de cada uno (Glifo.astro, fina/demos/).
export const serviciosV1 = [
  { g: 'medida', t: 'Desarrollo de software a medida', d: 'Sistemas pensados para cómo trabaja tu empresa, no al revés.' },
  { g: 'auto', t: 'Automatización de procesos', d: 'Lo repetitivo lo hace el sistema; tu equipo se dedica a lo que importa.' },
  { g: 'web', t: 'Plataformas web', d: 'Webs y aplicaciones que tus clientes y tu equipo usan todos los días.' },
  { g: 'api', t: 'Backend y APIs', d: 'La base que sostiene todo: ordenada, segura y lista para crecer.' },
  { g: 'int', t: 'Integraciones', d: 'Tus herramientas conectadas entre sí, sin copiar datos a mano.' },
  { g: 'ux', t: 'Diseño UX/UI', d: 'Pantallas claras, que se entienden sin manual.' },
];

export const aMedida = {
  titulo: '¿Necesitas algo más? Lo construimos a tu medida.',
  texto: 'RebelBot es nuestro foco, pero también hacemos consultoría: soluciones con IA pensadas para cómo trabaja tu empresa. Así lo hacemos.',
};

// Los ocho pasos del proceso, cada uno con su estación (mismo orden). Duraciones del cuestionario de marca.
export const procesoV1 = [
  { t: 'Diagnóstico gratis', d: 'Media hora para ver cuántos clientes llegan y cuánto tardas en responder. Escaneamos tu web gratis para cotizarte exacto.' },
  { t: 'Demo en vivo', d: 'Con los datos reales de tu negocio, para que veas la solución antes de comprometerte.' },
  { t: 'Propuesta con retorno', d: 'Cuánto ganas con una sola venta extra frente a lo que consume tu asistente.' },
  { t: 'Arranque con tu línea base', d: 'Tomamos tus números de hoy. Nosotros configuramos tu asistente y cargamos tu información: tu web, tus brochures y tus precios.' },
  { t: 'Avances cada semana', d: 'Lo armamos por partes y te mostramos el avance cada viernes.' },
  { t: 'Primera semana gratis', d: 'Tu asistente atiende una semana en producción antes de que pagues.' },
  { t: 'Salida en vivo', d: 'Monitoreo diario las primeras dos semanas, para que no quede nada sin revisar.' },
  { t: 'Revisiones a los 30, 60 y 90 días', d: 'Revisamos las métricas contigo. Después, mejoras incluidas.' },
];

// escena: el dibujo de cada estación (Proceso.astro); marcas: sus textos. 07: un calendario de 2 semanas con un visto por día.
export const estacionesV1 = [
  { escena: 'reloj', marcas: ['30 min'] },
  { escena: 'vivo', marcas: ['En vivo', 'Con tus datos'] },
  { escena: 'balanza', marcas: ['Una venta extra', 'Lo que consume'] },
  { escena: 'base', marcas: ['Tus números de hoy'] },
  { escena: 'sprints', marcas: ['Semana 1', 'Semana 2', 'Semana 3', 'Demo'] },
  { escena: 'prueba', marcas: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom', 'En producción', 'Todavía no pagas'] },
  { escena: 'chequeo', marcas: ['Sem. 1', 'Sem. 2', 'Revisado cada día'] },
  { escena: 'revisiones', marcas: ['30 días', '60 días', '90 días', 'Mejora continua'] },
];

export const procesoV1Titulo = 'Ocho pasos, y no pagas hasta verlo atender.';
export const medidorV1 = { antes: 'Has pagado: nada todavía', despues: 'Desde aquí, solo lo que consume' };

export const comparacionV1 = [
  { k: 'Cómo pagas', a: 'Implementación por adelantado y una mensualidad fija', r: 'Solo lo que consume tu asistente, con saldo que recargas tú' },
  { k: 'Tiempo de entrega', a: 'Meses, con mucha burocracia', r: 'Semanas, construidas con IA' },
  { k: 'Riesgo para ti', a: 'Pago adelantado, contrato largo', r: 'Una semana gratis y sin contrato' },
  { k: 'Después de entregar', a: 'Cobra por cada cambio', r: 'Soporte y mejoras incluidos' },
];

export const lineasV1 = {
  nosotros: { titulo: 'En semanas', marcas: ['Demo cada viernes', 'Sin pago adelantado', 'Pagas lo que consume', 'Mejoras incluidas'] },
  agencia: { titulo: 'En meses', marcas: ['Contrato largo', 'Pago adelantado', 'Desarrollo', 'Entrega', 'Cada cambio se cobra'] },
};

// Preguntas: las cifras salen de precios.ts. Que la configuración, la carga de datos y la integración las hacemos
// nosotros lo confirmó el usuario el 7 nov 2026.
const precioCredito = soles(conIgv(credito.precio));

export const preguntasV1 = [
  { q: '¿Solo hacen asistentes de WhatsApp?', a: 'No. RebelBot es nuestro producto y nuestro foco. También hacemos consultoría: soluciones con IA a la medida de tu empresa, desde automatización de procesos hasta plataformas web e integraciones.' },
  { q: '¿Cuánto cuesta?', a: `Pagas solo lo que consume tu asistente: ${precioCredito} por crédito con IGV, y una conversación de unos ${credito.mensajesPorConversacion} mensajes cuesta cerca de 1 crédito. Tus primeros ${precioInicial.dias} días tienes ${precioInicial.descuento * 100} % de descuento: 150 conversaciones al mes te cuestan cerca de ${soles(pagoMes(150, true))}, y después, ${soles(pagoMes(150))}. No hay mensualidad. El detalle está en Precios.` },
  { q: '¿Qué es un crédito?', a: `Es la medida de lo que trabaja tu asistente: 1 crédito es S/ ${credito.precio} de tu saldo. Por dentro medimos lo que la IA lee y escribe para responder, y te lo mostramos en soles. Una conversación corta gasta menos de 1 crédito y una larga, más.` },
  { q: '¿Quién configura el asistente y carga mi información?', a: 'Nosotros, contigo. Configuramos tu asistente y cargamos tu información desde tu web o desde tus documentos, como brochures y listas de precios, así que no necesitas tener web. Tú apruebas lo que aprende y lo pruebas antes de abrirlo a tus clientes.' },
  { q: '¿Tengo que pagar antes de ver resultados?', a: 'No. La primera semana es gratis, con tu asistente atendiendo en producción. Después pagas solo lo que consume.' },
  { q: '¿Tengo que firmar un contrato?', a: `No. Recargas saldo desde S/ ${saldo.recargaMinima} y lo gastas a tu ritmo, sin mensualidad ni plazo mínimo.` },
  { q: '¿Y si me paso de créditos?', a: `Te avisamos cuando te queda el ${saldo.avisoSaldoBajo} % de tu saldo. Si se acaba, tu asistente termina la conversación que tiene abierta y las nuevas pasan a tu equipo hasta que recargues.` },
  { q: '¿RebelBot puede inventar precios o datos?', a: 'No. Responde solo con los datos de tu negocio. Si falta algo, ofrece que un asesor lo confirme.' },
  { q: '¿Qué pasa si el asistente no puede resolver algo?', a: 'Pasa la conversación a una persona de tu equipo. Si el asesor no responde a tiempo, la retoma con todo el contexto para que el cliente no se quede esperando.' },
  { q: '¿Reemplaza a mis asesores?', a: 'No. Responde a cualquier hora con los datos de tu negocio, califica al cliente y agenda la visita. La visita y la venta siguen en manos de tu equipo, y cuando hace falta una persona, le pasa la conversación con todo el contexto.' },
  { q: '¿Se conecta con mi sistema de ventas?', a: 'Sí. Trae su propio registro de clientes y citas, y hoy se conecta con Odoo. Si usas otro sistema, cuéntanoslo en el diagnóstico gratis.' },
  { q: '¿Cómo cuida los datos de mis clientes?', a: 'Pide aceptar los términos de forma explícita antes de procesar datos personales, de acuerdo con la Ley 29733. Además, oculta los teléfonos en los registros y no guarda ahí el contenido de los mensajes.' },
  { q: '¿Quién paga las plantillas de WhatsApp?', a: 'Los mensajes de WhatsApp los cobra Meta directamente a tu negocio y no consumen créditos. Los primeros 1,000 mensajes de atención de cada mes son gratis; las plantillas, como recordatorios y campañas, se pagan según su tarifa.' },
  { q: '¿Sirve para mi industria?', a: 'Nació para el sector inmobiliario y está pensado para adaptarse a otras industrias. Cuéntanos cómo vendes y vemos cómo encaja.' },
  { q: '¿Usan inteligencia artificial para construir?', a: 'Sí, para acelerar. La IA escribe borradores de código, pruebas y documentación; un ingeniero senior define la arquitectura y aprueba cada cambio. La IA acelera, no decide.' },
  { q: '¿Cómo empezamos?', a: 'Agenda una demo por WhatsApp. Escaneamos tu web gratis, te cotizamos exacto y tu asistente atiende una semana gratis antes de que pagues.' },
];

export const cierreV1 = {
  titulo: 'Prueba RebelBot una semana gratis.',
  bajada: 'Lo construimos rápido con IA y lo revisan ingenieros que han hecho sistemas para millones de personas.',
};
