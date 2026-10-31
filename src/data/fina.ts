// Textos propios de la Versión Fina. Piezas, escenas y estaciones son ejemplos ilustrativos, no clientes ni cifras.

// Mini pantallas del hero (sin texto): las mismas herramientas sueltas que se nombran en la sección siguiente.
// x e y: lugar preferido, en % del área entre la barra de arriba y la bajada (el script evita el titular y la barra).
// z = profundidad (0 lejos); movil = se ve en pantallas angostas.
export const piezasHero = [
  { tipo: 'chat', x: 2, y: 2, z: 2, r: -5, movil: true },
  { tipo: 'hoja', x: 24, y: 12, z: 1, r: 4, movil: true },
  { tipo: 'agenda', x: 44, y: 3, z: 0, r: -3, movil: false },
  { tipo: 'correo', x: 64, y: 14, z: 2, r: 6, movil: true },
  { tipo: 'factura', x: 86, y: 2, z: 1, r: -8, movil: true },
  { tipo: 'caja', x: 96, y: 34, z: 0, r: 5, movil: false },
  { tipo: 'cuaderno', x: 84, y: 56, z: 0, r: 3, movil: false },
  { tipo: 'grafico', x: 96, y: 78, z: 1, r: -4, movil: true },
  { tipo: 'pago', x: 72, y: 92, z: 2, r: -6, movil: false },
] as const;

// nuevas: una por capa, en la columna libre de cada fila.
export const caos = {
  avisos: { 'Mensajes que llegan de noche': '3 sin leer', 'Inventario «a ojo»': '!' } as Record<string, string>,
  fantasma: { de: 'clientes_final_v3.xlsx', t: 'clientes_final_v4.xlsx' },
  etiquetas: { pantallas: 'Pantalla', reglas: 'Regla', datos: 'Dato', conexiones: 'Conexión' } as Record<string, string>,
  pulso: ['WhatsApp que responde', 'Pedidos', 'Clientes', 'Sistema de ventas'],
  nuevas: [
    { t: 'App para tu equipo', capa: 'pantallas' },
    { t: 'Recordatorios automáticos', capa: 'reglas' },
    { t: 'Reportes del mes', capa: 'datos' },
    { t: 'Envíos con tu courier', capa: 'conexiones' },
  ],
};

export type Paso = { t: string; d: string };
export type Demo = { titulo: string; bajada?: string; pasos: Paso[] };

export const demos: Record<string, Demo> = {
  medida: {
    titulo: 'Tu software, con la forma de tu empresa.',
    pasos: [
      { t: 'Partimos de cómo trabajas.', d: 'Anotamos qué pasa con cada pedido, quién lo toca y dónde se pierde tiempo.' },
      { t: 'Lo dividimos en piezas.', d: 'Cada parte de tu operación se vuelve un módulo: pedidos, clientes, reportes.' },
      { t: 'Lo ves avanzar cada viernes.', d: 'Construimos en ciclos de una semana y cada viernes te mostramos lo nuevo funcionando.' },
      { t: 'Crece sin rehacerse.', d: 'Cuando necesites algo más, se suma un módulo y lo demás sigue igual.' },
    ],
  },
  auto: {
    titulo: 'Lo repetitivo se hace solo.',
    pasos: [
      { t: 'Detecta lo que pasa.', d: 'Entra un pedido por la web y el sistema lo nota al momento.' },
      { t: 'Hace el trabajo de siempre.', d: 'Lo registra, emite la factura y actualiza el inventario sin que nadie copie nada.' },
      { t: 'Avisa a quien corresponde.', d: 'Tu cliente recibe la confirmación por WhatsApp y tu equipo, el aviso para despachar.' },
      { t: 'Deja todo registrado.', d: 'Cada paso queda anotado con su hora, para revisar qué pasó cuando lo necesites.' },
    ],
  },
  wa: {
    titulo: 'Tu WhatsApp responde, califica y agenda. Solo.',
    bajada: 'Un asistente con IA que atiende a tus clientes como lo haría tu equipo, conectado a los datos de tu negocio.',
    pasos: [], // salen de rebelbot.ts
  },
  web: {
    titulo: 'Tus clientes reservan, compran y te escriben desde tu web.',
    pasos: [
      { t: 'Se entiende al primer vistazo.', d: 'Tu cliente sabe qué ofreces y cómo pedirlo sin buscar.' },
      { t: 'Tus clientes hacen lo que vinieron a hacer.', d: 'Reservan, compran o te escriben en pocos pasos.' },
      { t: 'Tu equipo la maneja.', d: 'Desde su propio panel ve las reservas y cambia precios o fotos sin llamar a nadie.' },
      { t: 'Funciona en cualquier pantalla.', d: 'Se ve y se usa igual de bien en el celular que en la computadora.' },
    ],
  },
  api: {
    titulo: 'La base que sostiene todo.',
    pasos: [
      { t: 'Todo pasa por un solo lugar.', d: 'Tu web, tu app y tu WhatsApp leen y guardan en la misma base, así los datos coinciden.' },
      { t: 'Revisa antes de guardar.', d: 'Si llega un dato incompleto o equivocado, lo frena y explica qué falta.' },
      { t: 'Cuida tus datos.', d: 'Las claves se guardan en una bóveda en la nube y los teléfonos se ocultan en los registros.' },
      { t: 'Lista para crecer.', d: 'Sumar una app o un canal nuevo no obliga a rehacer la base. Las pruebas automáticas revisan cada cambio.' },
    ],
  },
  int: {
    titulo: 'Un dato entra una vez y aparece donde lo necesitas.',
    pasos: [
      { t: 'Hoy copias datos a mano.', d: 'El cliente que llegó por WhatsApp se vuelve a escribir en el sistema de ventas y en la hoja de cálculo.' },
      { t: 'Las conectamos.', d: 'Unimos las herramientas que ya usas para que se pasen la información entre ellas.' },
      { t: 'Los datos viajan solos.', d: 'Un cliente nuevo aparece en tu sistema de ventas y en tu facturación sin que nadie lo copie.' },
      { t: 'Si algo falla, te avisa.', d: 'Si una herramienta no responde, el sistema lo vuelve a intentar y te avisa si no lo logra.' },
    ],
  },
  ux: {
    titulo: 'Pantallas que se entienden sin manual.',
    pasos: [
      { t: 'Vemos dónde se traba la gente.', d: 'Miramos cómo usan tus pantallas de hoy y marcamos dónde dudan o abandonan.' },
      { t: 'Lo bocetamos.', d: 'Probamos el orden y los pasos en bocetos simples, antes de gastar en diseño.' },
      { t: 'Lo diseñamos con tu marca.', d: 'Le damos tus colores y tu tono, con botones que dicen qué hacen.' },
      { t: 'Lo probamos con personas.', d: 'Gente real lo usa y ajustamos lo que todavía confunde.' },
    ],
  },
};

// Mismo orden que `proceso` de estudio.ts. Solo duraciones del cuestionario de marca.
export const estaciones = [
  { escena: 'reloj', marcas: ['30 min'] },
  { escena: 'vivo', marcas: ['En vivo', 'Con tus datos'] },
  { escena: 'balanza', marcas: ['Una venta extra', 'Lo que cuesta'] },
  { escena: 'base', marcas: ['Tus números de hoy'] },
  { escena: 'sprints', marcas: ['Semana 1', 'Semana 2', 'Semana 3', 'Demo'] },
  { escena: 'prueba', marcas: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom', 'En producción', 'Todavía no pagas'] },
  { escena: 'monitoreo', marcas: ['Monitoreo diario', 'Primeras 2 semanas'] },
  { escena: 'revisiones', marcas: ['30 días', '60 días', '90 días', 'Cada mes'] },
];

export const medidor = { antes: 'Has pagado: nada todavía', despues: 'Desde aquí pagas, en cuotas' };

export const lineas = {
  nosotros: { titulo: 'En semanas', marcas: ['Demo cada viernes', 'Semana a prueba', 'Pagas en cuotas', 'Revisión mensual'] },
  agencia: { titulo: 'En meses', marcas: ['Contrato largo', 'Pago adelantado', 'Desarrollo', 'Entrega', 'Cada cambio se cobra'] },
};

// Lo que aporta cada etapa de fundador.trayectoria (texto nuestro, no un dato de Fredy).
export const aportes = [
  'Sabe cómo se construye cada pieza.',
  'Diseña sistemas que duran y crecen.',
  'Guía al equipo y revisa cada cambio.',
  'Elige las piezas y cómo se conectan.',
  'Decide qué construir primero para tu negocio.',
];

export const fredy = {
  // «Chatbots e IA» ya se ve sobre la lista de roles: aquí, el recorrido y la credencial.
  recorrido: 'Ingeniero de Sistemas que recorrió todo el camino del software, del código al producto.',
  credencial: 'Lideró sistemas de WhatsApp que usan millones de personas.',
  cimas: 'Chatbots e IA en cada etapa',
  // TEMPORAL: foto de referencia que pasó el usuario (no es Fredy). Cambiar antes de publicar.
  foto: '/fina/fredy-referencia.webp',
  fotoNota: 'Foto de referencia',
};
