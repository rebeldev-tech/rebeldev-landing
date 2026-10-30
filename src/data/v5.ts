// Textos propios de la versión 5 «Cartel» (hecha con la skill design-taste-frontend, dirección «Loud and flat»).
// Todo sale de CLAUDE.md (secciones 1 a 5) y de las frases de Fredy; no hay cifras ni clientes.
// Las fotos son de archivo (dominio público, Wikimedia Commons): muestran el mundo de la ingeniería,
// nunca al equipo ni a un cliente. Sus créditos van en `fotos` y se muestran en el pie.

export const portada = {
  frase: 'Estudio de software: en semanas, lo que a otros les toma meses.',
  dato: 'Y funciona una semana en producción antes de que pagues.',
  lema: 'Ingeniería para empresas rebeldes.',
  accion: 'Agenda tu diagnóstico',
  accionCorta: 'Agenda tu diagnóstico gratis',
};

// La promesa oficial (sección 3), partida en cinco renglones para la escalera.
export const escalera = {
  renglones: ['Primero entendemos', 'tu negocio;', 'después construimos', 'la solución que', 'realmente necesitas.'],
  nota: 'RebelDEV es un estudio de desarrollo de software: asistentes de WhatsApp, automatización, plataformas web, backend, APIs e integraciones.',
};

export const entregas = {
  titulo: 'Lo que te llega cada semana',
  texto: 'Una demo cada viernes. Código que escribe la IA y aprueba un ingeniero senior. Y una semana en producción antes del primer pago.',
  semanas: { min: 2, max: 12, inicial: 4 },
  aviso: 'Las semanas reales las definimos juntos en el diagnóstico.',
};

// Conversación ILUSTRATIVA de RebelBot (no es de un cliente real).
export const chat = [
  { de: 'cliente', t: 'Hola, vi el departamento de 2 dormitorios. ¿Sigue disponible?' },
  { de: 'bot', t: 'Sí, sigue disponible. ¿Lo buscas para vivir o para invertir?' },
  { de: 'cliente', t: 'Para vivir. Me mudaría en unos tres meses.' },
  { de: 'bot', t: '¿Te gustaría visitarlo? Tengo el sábado a las 11:30.' },
  { de: 'sistema', t: 'Visita agendada. Cliente registrado en tu sistema de ventas.' },
];

export const construimos = {
  titulo: 'Qué construimos',
  bloques: [
    {
      t: 'Asistentes de WhatsApp',
      foto: 'chat',
      lineas: [
        'Responde en menos de un minuto, a toda hora.',
        'Pregunta qué busca tu cliente y lo registra en tu sistema de ventas.',
        'Agenda visitas sin dobles reservas y manda la ubicación.',
        'No inventa: responde solo con los datos de tu negocio.',
        'Si no sabe, pasa la conversación a tu equipo.',
      ],
    },
    {
      t: 'Automatización de procesos',
      foto: 'telegrafo',
      lineas: [
        'Lo repetitivo lo hace el sistema.',
        'Tu equipo se dedica a lo que importa.',
        'Pruebas automáticas en cada cambio.',
        'Alertas y monitoreo cuando ya está en marcha.',
      ],
    },
    {
      t: 'Plataformas web y diseño',
      foto: 'dibujo',
      lineas: [
        'Webs y aplicaciones que tus clientes y tu equipo usan todos los días.',
        'Pantallas claras, que se entienden sin manual.',
        'Ves el avance en la demo de cada viernes.',
        'Hecho para durar y crecer.',
      ],
    },
    {
      t: 'Backend, APIs e integraciones',
      foto: 'acero',
      lineas: [
        'La base que sostiene todo: ordenada, segura y lista para crecer.',
        'Tus herramientas conectadas entre sí, sin copiar datos a mano.',
        'Las claves se guardan en una bóveda en la nube.',
        'Decisiones documentadas: sin problemas escondidos.',
      ],
    },
    {
      t: 'Software a medida',
      foto: 'prueba',
      lineas: [
        'Sistemas pensados para cómo trabaja tu empresa, no al revés.',
        'Arquitectura definida por un ingeniero senior.',
        'Probado antes de salir, en un ambiente de pruebas.',
        'Si implica software, probablemente podemos construirlo.',
      ],
    },
  ],
};

export const verbos = [
  { v: 'Entender', foto: 'dibujo', t: 'Diagnóstico gratis de 30 minutos y una demo en vivo con los datos de tu negocio. Después, una propuesta con el retorno a la vista.' },
  { v: 'Construir', foto: 'acero', t: 'Sprints semanales y una demo cada viernes. La IA acelera; un ingeniero senior define la arquitectura y aprueba cada cambio.' },
  { v: 'Probar', foto: 'prueba', t: 'Una semana en producción antes de pagar. Después, el pago se reparte en cuotas.' },
  { v: 'Cuidar', foto: 'telegrafo', t: 'Monitoreo diario las dos primeras semanas y revisiones a los 30, 60 y 90 días. Luego, revisión mensual incluida.' },
];

// Fredy: solo lo permitido (CLAUDE.md del landing, sección 5). Las citas son textuales.
// Cada trozo es texto normal o, con `m`, una palabra marcada con el color indicado.
export const fredy: { t: string; m?: 'nombre' | 'rojo' | 'ambar' | 'tinta' }[] = [
  { t: 'Fredy Ramos', m: 'nombre' },
  { t: ' es el responsable y líder de RebelDEV. Es ingeniero de Sistemas por ' },
  { t: 'San Marcos', m: 'ambar' },
  { t: ' y ha recorrido el camino completo del software: desarrollador, arquitecto de software, líder técnico, arquitecto de tecnología y ' },
  { t: 'Product Owner', m: 'tinta' },
  { t: '. Ha trabajado con chatbots e inteligencia artificial, y ha liderado sistemas de WhatsApp ' },
  { t: 'usados por millones de personas', m: 'ambar' },
  { t: '. De ahí sale la forma de trabajar del estudio: ' },
  { t: 'la IA acelera, no decide', m: 'tinta' },
  { t: '; un ingeniero senior define la arquitectura y aprueba cada cambio. Su regla para avanzar: «El truco es sentarse y avanzar, de manera constante.» Y la que explica el nombre: ' },
  { t: '«No todo el que pelea gana, pero solo gana el que pelea.»', m: 'nombre' },
];
export const fredyCierre = 'Si tu empresa también pelea, conversemos.';

export const preguntas = {
  titulo: 'Lo que nos preguntan',
  // `de` apunta a la pregunta compartida en estudio.ts; `tema` es la pestaña.
  lista: [
    { tema: 'Servicios', de: 0 },
    { tema: 'Pago', de: 6 },
    { tema: 'IA', de: 7 },
    { tema: 'Datos', de: 1 },
    { tema: 'Tu equipo', de: 2 },
    { tema: 'Después', de: 8 },
  ],
};

export const cierre = {
  frase: 'Escríbenos por WhatsApp. El diagnóstico dura 30 minutos y es gratis.',
  palabra: 'Agenda',
  notas: ['Estudio de desarrollo de software', 'Ingeniería para empresas rebeldes.'],
  lugar: 'Perú · 2026', // por confirmar: dónde está el estudio
};

// Fotos de archivo, en dominio público o sin restricciones conocidas (Wikimedia Commons).
export const fotos = {
  dibujo: { src: '/v5/dibujo.jpg', w: 1920, h: 1529, alt: 'Sala de dibujo de una oficina de obras en 1923: ingenieros inclinados sobre planos, con rollos de papel en primer plano.', autor: 'Joseph E. Quigley', titulo: 'Drafting Room, Bureau of Buildings (1923)', url: 'https://commons.wikimedia.org/wiki/File:Drafting_Room,_Bureau_of_Buildings,_Division_of_Design_and_Inspection_-_DPLA_-_dcf6494fc2a4c61ac821205d0b5b9c6c.jpg' },
  acero: { src: '/v5/acero.jpg', w: 1920, h: 1506, alt: 'Un obrero colgado de un cable de acero en lo alto del Empire State en construcción, con la ciudad abajo.', autor: 'Lewis Hine', titulo: 'Icarus, Empire State Building (1930)', url: 'https://commons.wikimedia.org/wiki/File:Icarus,_Empire_State_Building_MET_DP106525.jpg' },
  prueba: { src: '/v5/prueba.jpg', w: 1920, h: 1363, alt: 'Gráfico dibujado a mano en papel milimetrado con las tensiones medidas en la prueba de carga de un puente, 1911.', autor: 'H. W. Kaar y H. P. Kettron', titulo: 'Test of a highway bridge (1911)', url: 'https://commons.wikimedia.org/wiki/File:Test_of_a_highway_bridge_(1911)_(14593436057).jpg' },
  centralita: { src: '/v5/centralita.jpg', w: 1920, h: 1525, alt: 'Una fila de operadoras con auriculares conectando llamadas en una gran centralita telefónica.', autor: 'U.S. National Archives', titulo: 'Women Working at a Bell System Telephone Switchboard', url: 'https://commons.wikimedia.org/wiki/File:Photograph_of_Women_Working_at_a_Bell_System_Telephone_Switchboard_(3660047829).jpg' },
  telegrafo: { src: '/v5/telegrafo.jpg', w: 1920, h: 1440, alt: 'Sala de telégrafos de una oficina de correos: hombres en sus puestos, en dos filas, bajo un reloj.', autor: 'State Government Photographer', titulo: 'Men Working in Telegraph Section of Post Office', url: 'https://commons.wikimedia.org/wiki/File:Men_Working_in_Telegraph_Section_of_Post_Office(GN04965).jpg' },
} as const;
export type FotoId = keyof typeof fotos;
