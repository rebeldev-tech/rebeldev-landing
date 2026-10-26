// Contenido del estudio compartido por las versiones. Los textos oficiales salen de CLAUDE.md (sección 1)
// y el resto de las respuestas del cuestionario de marca. No hay cifras ni clientes.

export const servicios = [
  { g: 'medida', t: 'Desarrollo de software a medida', d: 'Sistemas pensados para cómo trabaja tu empresa, no al revés.', tamano: 'grande' },
  { g: 'auto', t: 'Automatización de procesos', d: 'Lo repetitivo lo hace el sistema; tu equipo se dedica a lo que importa.', tamano: 'normal' },
  { g: 'wa', t: 'Asistentes de WhatsApp', d: 'Como RebelBot: atienden, califican y agendan con los datos de tu negocio.', tamano: 'ancho' },
  { g: 'web', t: 'Plataformas web', d: 'Webs y aplicaciones que tus clientes y tu equipo usan todos los días.', tamano: 'normal' },
  { g: 'api', t: 'Backend y APIs', d: 'La base que sostiene todo: ordenada, segura y lista para crecer.', tamano: 'normal' },
  { g: 'int', t: 'Integraciones', d: 'Tus herramientas conectadas entre sí, sin copiar datos a mano.', tamano: 'normal' },
  { g: 'ux', t: 'Diseño UX/UI', d: 'Pantallas claras, que se entienden sin manual.', tamano: 'normal' },
];

export const proceso = [
  { t: 'Diagnóstico gratis', d: 'Media hora para ver cuántos clientes llegan, cuánto tardas en responder y cuántas citas logras.' },
  { t: 'Demo en vivo', d: 'Con los datos reales de tu negocio, para que veas la solución antes de comprometerte.' },
  { t: 'Propuesta con retorno', d: 'Cuánto ganas con una sola venta extra frente a lo que cuesta.' },
  { t: 'Arranque con tu línea base', d: 'Tomamos tus números de hoy y migramos lo que ya funciona en tu operación.' },
  { t: 'Sprints semanales', d: 'Construimos en ciclos cortos y te mostramos el avance cada viernes.' },
  { t: 'Una semana a prueba', d: 'La solución funciona una semana en producción antes de que empieces a pagar.' },
  { t: 'Salida en vivo', d: 'Monitoreo diario las primeras dos semanas, para que no quede nada sin revisar.' },
  { t: 'Revisiones a los 30, 60 y 90 días', d: 'Revisamos las métricas contigo. Después, revisión mensual con mejoras incluidas.' },
];

export const garantias = [
  { t: 'Una semana en producción, a prueba.', d: 'Antes de pagar, la solución funciona una semana en producción.' },
  { t: 'Pagas en cuotas.', d: 'Después de la prueba, el pago se reparte en cuotas.' },
  { t: 'Revisión mensual incluida.', d: 'Revisamos tus métricas cada mes y las mejoras siguen incluidas.' },
];

export const comparacion = [
  { k: 'Tiempo de entrega', a: 'Meses, con mucha burocracia', f: 'Variable', r: 'Semanas, construidas con IA' },
  { k: 'Calidad', a: 'Pareja, con rotación de juniors', f: 'Depende de una persona', r: 'Arquitectura senior, código revisado y probado' },
  { k: 'Riesgo para ti', a: 'Pago adelantado, contrato largo', f: 'Pago adelantado, sin garantía', r: 'Una semana en producción antes de pagar' },
  { k: 'Después de entregar', a: 'Cobra por cada cambio', f: 'Desaparece', r: 'Revisión mensual y mejoras incluidas' },
];

export const hechos = [
  { t: 'Hecho para durar y crecer', d: 'Arquitectura limpia: el sistema está dividido en módulos, con reglas que se revisan solas en cada cambio. Las piezas se pueden cambiar sin rehacer el sistema.' },
  { t: 'Probado antes de salir', d: 'Pruebas automáticas en cada cambio y un ambiente de pruebas antes de pasar a producción.' },
  { t: 'Nada a ciegas', d: 'Las decisiones quedan documentadas y la operación tiene alertas y monitoreo.' },
  { t: 'Datos cuidados', d: 'Las claves se guardan en una bóveda en la nube y los teléfonos se ocultan en los registros.' },
];

export const stack = ['Java 21', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'WhatsApp Cloud API', 'Microsoft Azure'];

export const cita = '«No todo el que pelea gana, pero solo gana el que pelea.»';

export const fundador = {
  cargo: 'Responsable y líder de RebelDEV',
  formacion: 'Ingeniero de Sistemas por la Universidad Nacional Mayor de San Marcos. Ha recorrido el camino completo del software, del código al producto, con experiencia en chatbots e inteligencia artificial.',
  trayectoria: ['Desarrollador', 'Arquitecto de software', 'Líder técnico', 'Arquitecto de tecnología', 'Product Owner'],
};

export const preguntas = [
  { q: '¿Solo hacen asistentes de WhatsApp?', a: 'No. RebelBot es nuestro producto, pero somos un estudio de software: creamos soluciones a medida, desde automatización de procesos hasta plataformas web, backend, APIs e integraciones.' },
  { q: '¿RebelBot puede inventar precios o datos?', a: 'No. Responde solo con los datos de tu negocio. Si falta algo, ofrece que un asesor lo confirme.' },
  { q: '¿Qué pasa si el asistente no puede resolver algo?', a: 'Pasa la conversación a una persona de tu equipo. Si el asesor no responde a tiempo, la retoma con todo el contexto para que el cliente no se quede esperando.' },
  { q: '¿Se conecta con mi sistema de ventas?', a: 'Sí: registra a cada cliente potencial en tu sistema de ventas. Hoy se conecta con Odoo; si usas otro, conversemos.' },
  { q: '¿Cómo cuida los datos de mis clientes?', a: 'Pide aceptar los términos de forma explícita antes de procesar datos personales, de acuerdo con la Ley 29733. Además, oculta los teléfonos en los registros y no guarda ahí el contenido de los mensajes.' },
  { q: '¿Sirve para mi industria?', a: 'Nació para el sector inmobiliario y está pensado para adaptarse a otras industrias. Cuéntanos cómo vendes y vemos cómo encaja.' },
  { q: '¿Tengo que pagar antes de ver resultados?', a: 'No. La solución funciona una semana en producción antes de que empieces a pagar, y después el pago se reparte en cuotas.' },
  { q: '¿Usan inteligencia artificial para construir?', a: 'Sí, para acelerar. La IA escribe borradores de código, pruebas y documentación; un ingeniero senior define la arquitectura y aprueba cada cambio. La IA acelera, no decide.' },
  { q: '¿Qué pasa después de entregar?', a: 'Revisamos tus métricas a los 30, 60 y 90 días, y después tienes una revisión mensual con mejoras incluidas.' },
  { q: '¿Cómo empezamos?', a: 'Agenda una demo por WhatsApp. Primero entendemos tu negocio; después te proponemos la solución que realmente necesitas.' },
];
