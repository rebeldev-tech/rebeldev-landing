// Panel de RebelBot recreado para la v1 (sección Producto, parte «Así lo manejas tú»).
// TODO ES DE EJEMPLO: negocio, proyectos, personas, teléfonos y cifras son inventados y genéricos.
// Nada sale del panel real ni de un cliente; en pantalla va con la pastilla «Ejemplo».

export type Pantalla = 'bandeja' | 'citas' | 'leads' | 'conocimiento' | 'aprendizaje' | 'tablero' | 'consumo';

export const negocio = 'Inmobiliaria Demo';

// Menú del panel, agrupado como el real. k: las pantallas que se recorren en la demo.
export const menu: { grupo: string; items: { t: string; k?: Pantalla }[] }[] = [
  { grupo: 'Atender', items: [{ t: 'Bandeja', k: 'bandeja' }, { t: 'Simulador' }, { t: 'Citas', k: 'citas' }, { t: 'Leads', k: 'leads' }, { t: 'Casos y encuesta' }] },
  { grupo: 'Enseñar al asistente', items: [{ t: 'Conocimiento', k: 'conocimiento' }, { t: 'Comportamiento' }, { t: 'Aprendizaje', k: 'aprendizaje' }, { t: 'Revisión' }] },
  { grupo: 'Medir y crecer', items: [{ t: 'Tablero', k: 'tablero' }, { t: 'Supervisión' }, { t: 'Marketing' }, { t: 'WhatsApp' }, { t: 'Consumo', k: 'consumo' }] },
  { grupo: 'Tu equipo', items: [{ t: 'Usuarios y auditoría' }, { t: 'Ayuda y mejoras' }] },
];

// Cifras de arriba de cada pantalla. v es el valor final (el que muestra el CSS);
// antes: el valor previo al paso que lo cambia (tomar el control suma un caso con asesor; la cita nueva suma una cita;
// el lead nuevo suma un lead caliente; aprobar resta una sugerencia).
export const kpis: { t: string; v: number; antes?: number; k?: 'asesor' | 'citas' | 'leads' | 'sug' }[] = [
  { t: 'Conversaciones', v: 128 },
  { t: 'Con asesor', v: 4, antes: 3, k: 'asesor' },
  { t: 'Citas agendadas', v: 12, antes: 11, k: 'citas' },
  { t: 'Leads calientes', v: 9, antes: 8, k: 'leads' },
  { t: 'Sugerencias por revisar', v: 3, antes: 4, k: 'sug' },
];

// Pasos de «Así lo manejas tú»: uno por pantalla, en el orden del menú y de la línea de tiempo (p1–p7).
export const pasosPanel: { k: Pantalla; titulo: string; texto: string; enlace?: { t: string; href: string } }[] = [
  {
    k: 'bandeja',
    titulo: 'Bandeja',
    texto: 'Ves cada conversación en vivo y tomas el control cuando quieras. Si tu asesor no responde a tiempo, el asistente la retoma con todo el contexto.',
  },
  {
    k: 'citas',
    titulo: 'Citas',
    texto: 'Las visitas que agenda el asistente llegan aquí: solo en tus horarios libres, sin dobles reservas y con la ubicación enviada al cliente.',
  },
  {
    k: 'leads',
    titulo: 'Leads',
    texto: 'Cada cliente queda registrado con lo que busca, en qué plazo y cómo pagaría. Tu equipo ve primero a los que están listos para comprar.',
  },
  {
    k: 'conocimiento',
    titulo: 'Conocimiento',
    texto: 'Tú decides qué sabe: proyectos, precios y horarios. Si falta un dato, no lo inventa.',
  },
  {
    k: 'aprendizaje',
    titulo: 'Aprendizaje',
    texto: 'Aprende de tus asesores: propone preguntas nuevas a partir de lo que ellos respondieron. Solo entran si las apruebas.',
  },
  {
    k: 'tablero',
    titulo: 'Tablero',
    texto: 'Mide lo que importa: casos resueltos sin ayuda, tiempos de respuesta y satisfacción.',
  },
  {
    k: 'consumo',
    titulo: 'Consumo',
    texto: 'Ves cada crédito que usa, al día, y te avisamos al 80 %.',
    enlace: { t: 'Ver precios', href: '#precios' },
  },
];

export const bandeja = {
  conversaciones: [
    { n: 'Carlos R.', m: '¿Puedo hablar con alguien por el precio final?', quien: 'Asesor', hace: 'ahora' },
    { n: 'Lucía M.', m: 'Perfecto, el sábado a las 11:30.', quien: 'Bot', hace: 'hace 5 min' },
    { n: 'Jorge P.', m: '¿Tienen departamentos de 3 dormitorios?', quien: 'Bot', hace: 'hace 12 min' },
    { n: 'Ana T.', m: 'Gracias, espero la llamada.', quien: 'Asesor', hace: 'hace 25 min' },
    { n: 'Miguel S.', m: '¿Aceptan crédito hipotecario?', quien: 'Bot', hace: 'hace 1 h' },
  ],
  cliente: { n: 'Carlos R.', tel: '+51 9•• ••• •34' },
  hilo: [
    { de: 'in', t: 'Hola, ¿el Edificio Mirador tiene estacionamiento?' },
    { de: 'bot', t: 'Sí: los departamentos de 3 dormitorios incluyen uno. ¿Te gustaría visitarlo?' },
  ],
  nuevo: '¿Puedo hablar con alguien por el precio final?',
  aviso: 'Tomaste el control. El asistente queda en pausa.',
  lead: [
    { k: 'Interés', v: '3 dormitorios en Edificio Mirador' },
    { k: 'Plazo', v: 'De 1 a 3 meses' },
    { k: 'Financiamiento', v: 'Crédito hipotecario' },
  ],
  resumen: 'Busca 3 dormitorios con estacionamiento. Pidió hablar con un asesor por el precio final.',
};

// Citas: Lucía M. es la clienta de «Así lo vive tu cliente», que eligió el sábado a las 11:30 (los otros horarios que
// le ofreció el asistente, 10:00 y el domingo 16:00, siguen libres; 9:00 y 13:00 ya estaban tomados).
export const citas = {
  dia: 'Sábado',
  horarios: [
    { h: '9:00', quien: 'Miguel S.', tipo: 'Visita' },
    { h: '10:00' },
    { h: '11:30', quien: 'Lucía M.', tipo: 'Visita', nueva: true },
    { h: '13:00', quien: 'Jorge P.', tipo: 'Llamada' },
  ] as { h: string; quien?: string; tipo?: string; nueva?: true }[],
  proximas: [
    { cuando: 'Hoy, 16:00', n: 'Ana T.', tipo: 'Llamada', p: 'Residencial Los Olivos', por: 'Asesor' },
    { cuando: 'Sáb., 9:00', n: 'Miguel S.', tipo: 'Visita', p: 'Torre Prado', por: 'Bot' },
    { cuando: 'Sáb., 11:30', n: 'Lucía M.', tipo: 'Visita', p: 'Edificio Mirador', por: 'Bot', nueva: true },
    { cuando: 'Sáb., 13:00', n: 'Jorge P.', tipo: 'Llamada', p: 'Edificio Mirador', por: 'Bot' },
  ] as { cuando: string; n: string; tipo: string; p: string; por: string; nueva?: true }[],
  ubicacion: 'Ubicación enviada a Lucía M.',
};

// Leads: Lucía M. entra como nueva y pasa a caliente (lo que contó en «Así lo vive tu cliente»).
export type Temperatura = 'Caliente' | 'Tibio' | 'Frío';
export const leads = {
  filtros: ['Todos', 'Calientes', 'Tibios', 'Fríos'],
  filas: [
    { n: 'Lucía M.', busca: '2 dormitorios, para vivir', plazo: 'En 3 meses', pago: 'Crédito hipotecario', estado: 'Caliente', nueva: true },
    { n: 'Carlos R.', busca: '3 dormitorios en Edificio Mirador', plazo: 'De 1 a 3 meses', pago: 'Crédito hipotecario', estado: 'Caliente' },
    { n: 'Ana T.', busca: 'Casa con jardín', plazo: 'De 1 a 3 meses', pago: 'Contado', estado: 'Caliente' },
    { n: 'Miguel S.', busca: 'Departamento de 1 dormitorio', plazo: 'En 6 meses', pago: 'Crédito hipotecario', estado: 'Tibio' },
    { n: 'Jorge P.', busca: '3 dormitorios', plazo: 'Más de 6 meses', pago: 'Por definir', estado: 'Frío' },
  ] as { n: string; busca: string; plazo: string; pago: string; estado: Temperatura; nueva?: true }[],
  antes: 'Nuevo',
  resumen: 'Busca 2 dormitorios para vivir en unos 3 meses, con crédito hipotecario. Visita agendada el sábado a las 11:30.',
};

export const conocimiento = {
  proyectos: [
    { n: 'Edificio Mirador', etapa: 'En construcción', m2: 62, precio: '289,000', d: 'Departamentos de 2 y 3 dormitorios frente al parque.' },
    { n: 'Residencial Los Olivos', etapa: 'Entrega inmediata', m2: 75, precio: '345,000', d: 'Casas de 3 dormitorios con jardín propio.' },
    { n: 'Torre Prado', etapa: 'En planos', m2: 48, precio: '219,000', d: 'Departamentos de 1 y 2 dormitorios cerca del centro.' },
  ],
  // precio vacío = el dato que falta: el asistente no lo inventa.
  unidades: [
    { c: 'MIR-402', p: 'Edificio Mirador', m2: 64, dorm: 2, estado: 'Disponible', precio: '298,000' },
    { c: 'MIR-803', p: 'Edificio Mirador', m2: 86, dorm: 3, estado: 'Reservado', precio: '389,000' },
    { c: 'OLI-12', p: 'Residencial Los Olivos', m2: 92, dorm: 3, estado: 'Disponible', precio: '' },
    { c: 'PRA-1105', p: 'Torre Prado', m2: 52, dorm: 1, estado: 'Disponible', precio: '232,000' },
  ],
};

// La primera sale de la conversación de «Así lo vive tu cliente», donde el asesor respondió lo de las mascotas.
export const aprendizaje = [
  { p: '¿Se aceptan mascotas?', r: 'Sí, se aceptan mascotas en todos los proyectos.', base: 'Sale de 3 respuestas de tus asesores' },
  { p: '¿El precio incluye estacionamiento?', r: 'Solo en los departamentos de 3 dormitorios.', base: 'Sale de 2 respuestas de tus asesores' },
];

export const tablero = {
  desde: '1 oct.',
  hasta: '31 oct.',
  metricas: [
    { t: 'Tiempo de respuesta', v: 9, suf: ' s', nota: 'promedio' },
    { t: 'Casos', v: 214, suf: '', nota: 'en el periodo' },
    { t: 'Contención', v: 68, suf: ' %', nota: 'resueltos sin asesor' },
    { t: 'Satisfacción (NPS)', v: 54, suf: '', nota: 'de −100 a 100' },
    { t: 'Derivación', v: 32, suf: ' %', nota: 'pasaron a un asesor' },
  ],
  // Conversaciones por día (últimas dos semanas).
  serie: [5, 7, 6, 9, 8, 4, 3, 7, 10, 9, 11, 8, 6, 12],
};

// Del tamaño del plan Arranque (1,000 créditos), con el 80 % usado: coherente con la sección de precios.
export const consumo = {
  usados: 800,
  total: 1000,
  tokens: 80_000_000,
  usos: [
    { t: 'Conversaciones', v: 762 },
    { t: 'Seguimientos', v: 34 },
    { t: 'Lectura de web', v: 4 },
  ],
  registro: [
    { h: '10:42', t: 'Conversación', tk: '12,480' },
    { h: '10:15', t: 'Seguimiento', tk: '3,920' },
    { h: '09:58', t: 'Lectura de web', tk: '18,300' },
  ],
};

// 4000000 → «4,000,000» (mismo formato que «100,000 tokens» del panel).
export const miles = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
