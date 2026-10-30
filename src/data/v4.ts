// Textos propios de la versión 4 «Tu diagnóstico». Lo compartido (servicios, proceso, hechos, Fredy,
// preguntas) sale de estudio.ts; las conversaciones de ejemplo, de rebelbot.ts; el contacto, de contacto.ts.
// Los síntomas están escritos como los diría el cliente. Cada uno enciende las piezas que lo resuelven.

/** Las seis piezas de la maqueta (las especialidades concretas; «a medida» es el paraguas de todas). */
export const modulos = ['wa', 'auto', 'web', 'api', 'int', 'ux'] as const;
export type Modulo = (typeof modulos)[number];

/** Nombre corto de cada pieza, para las etiquetas de la maqueta. */
export const corto: Record<Modulo, string> = {
  wa: 'WhatsApp',
  auto: 'Automatización',
  web: 'Plataforma web',
  api: 'Backend y APIs',
  int: 'Integraciones',
  ux: 'Diseño UX/UI',
};

export type Sintoma = { id: string; t: string; modulos: Modulo[] };

export const sintomas: Sintoma[] = [
  { id: 'whatsapp', t: 'Me escriben por WhatsApp y no alcanzo a responder a todos.', modulos: ['wa'] },
  { id: 'repetitivo', t: 'Hago a mano las mismas tareas cada semana.', modulos: ['auto'] },
  { id: 'copiar', t: 'Copio datos de un programa a otro.', modulos: ['int', 'auto'] },
  { id: 'web', t: 'Mi web no me trae clientes.', modulos: ['web', 'ux'] },
  { id: 'pantallas', t: 'Mi equipo se pierde en pantallas difíciles de usar.', modulos: ['ux'] },
  { id: 'hojas', t: 'Mi información está regada en hojas de cálculo.', modulos: ['api'] },
  { id: 'otra', t: 'Es otra cosa.', modulos: [] },
];

export const hero = {
  titulo: 'Primero entendemos tu negocio.',
  bajada: 'Marca lo que hoy te quita tiempo y vas a ver qué pieza construiríamos para cada cosa.',
  pregunta: '¿Qué te quita tiempo hoy?',
  vacio: 'Marca una o varias opciones para ver qué construiríamos.',
  soloOtra: 'Cuéntanos en el diagnóstico y vemos juntos qué hace falta.',
  prefijo: 'Construiríamos',
  paraguas: 'Todo a medida, según cómo trabaja tu negocio.',
  centro: 'Tu negocio',
  cta: 'Agenda tu diagnóstico gratis',
  nota: 'Son 30 minutos y es gratis. El mensaje de WhatsApp ya lleva lo que marcaste.',
};

// En pantallas angostas el botón de la barra usa la versión corta (no cabe junto al logo).
export const barra = { sin: 'Haz tu diagnóstico', con: 'Agenda tu diagnóstico', sinCorto: 'Diagnóstico', conCorto: 'Agendar' };

export const mensajeWa = {
  saludo: 'Hola, RebelDEV. Quiero agendar mi diagnóstico gratis.',
  sintomas: 'Hoy me quita tiempo:',
};

// Conversaciones de ejemplo tomadas de rebelbot.ts (pasos 1 y 4). No son de un cliente real.
export const flujo = {
  titulo: 'Así responde RebelBot.',
  texto: 'Tu cliente escribe y RebelBot busca la respuesta en los datos de tu negocio. Si la tiene, responde y sigue hasta agendar. Si le falta, le pasa la conversación a tu equipo con todo el contexto.',
  leyenda: 'Elige un caso',
  nodos: { mensaje: 'Mensaje de tu cliente', bot: 'RebelBot', datos: 'Datos de tu negocio', a: 'Responde y agenda', b: 'Pasa a un asesor' },
  casos: [
    { id: 'tiene', label: 'Tiene el dato', in: 'Hola, vi el departamento de 2 dormitorios. ¿Sigue disponible?', out: 'Sí, sigue disponible. ¿Lo buscas para vivir o para invertir?', fin: 'Responde con el dato de tu negocio y sigue hasta agendar la visita.' },
    { id: 'falta', label: 'Le falta el dato', in: '¿El edificio acepta mascotas?', out: 'No tengo ese dato confirmado y no quiero darte información equivocada. Le pido a un asesor que te responda.', fin: 'No improvisa: pasa la conversación a un asesor con todo el contexto.' },
  ],
  nota: 'Conversación de ejemplo.',
};

// Aviso fijo del proceso: qué pasa con el pago en cada paso (cuestionario: una semana en producción
// a prueba antes de pagar, cuotas después, revisión mensual incluida).
export const pago = {
  titulo: 'Así trabajamos.',
  pildora: 'A prueba',
  avisos: [
    { desde: 0, t: 'Todavía no pagas.', d: 'Ves la solución funcionando en producción antes de pagar.' },
    { desde: 6, t: 'Desde aquí, en cuotas.', d: 'Después de la semana a prueba, el pago se reparte en cuotas.' },
    { desde: 7, t: 'La revisión mensual va incluida.', d: 'Revisamos tus métricas cada mes y las mejoras siguen incluidas.' },
  ],
};

export const ia = {
  titulo: 'La IA acelera, no decide.',
  texto: 'La IA escribe borradores de código, pruebas y documentación. Un ingeniero senior define la arquitectura y aprueba cada cambio.',
  credencial: 'Lo construimos rápido con IA y lo revisan ingenieros que han hecho sistemas para millones de personas.',
};

// Preguntas: índices de estudio.preguntas. Primero las del estudio; las que tocan lo que marcaste suben.
export const preguntasV4 = {
  titulo: 'Preguntas frecuentes.',
  nota: 'Primero, las que tienen que ver con lo que marcaste.',
  orden: [0, 6, 7, 8, 9, 1, 2, 3, 4, 5],
  etiquetas: { 1: ['wa'], 2: ['wa'], 3: ['wa', 'int'], 4: ['wa'], 5: ['wa'] } as Record<number, Modulo[]>,
  // La de «¿Cómo empezamos?» cambia porque en esta versión se empieza por el diagnóstico.
  respuestas: {
    9: 'Marca arriba lo que te quita tiempo y agenda tu diagnóstico gratis por WhatsApp. Primero entendemos tu negocio; después te proponemos la solución que realmente necesitas.',
  } as Record<number, string>,
};

export const cierre = {
  con: 'Tu diagnóstico empieza con esto.',
  sin: 'Cuéntanos qué necesita tu negocio.',
  texto: 'Son 30 minutos y es gratis: lo agendas por WhatsApp. Nos cuentas cómo trabajas y te decimos qué construiríamos.',
  cta: 'Agenda tu diagnóstico gratis',
  correo: 'O escríbenos a',
  firma: 'Ingeniería para empresas rebeldes.',
};
