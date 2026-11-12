// Precios de RebelBot: pago por uso con saldo prepago, según la tarifa vigente de la plataforma
// (revisada el 12 nov 2026). Si el equipo cambia el modelo, se cambia solo aquí.
// Precios en soles. «Con IGV» suma el 18 %.

export const IGV = 0.18;

export const credito = {
  precio: 1, // S/ por crédito, sin IGV
  porConversacion: 1, // una conversación de unos 10 mensajes cuesta cerca de 1 crédito
  mensajesPorConversacion: 10,
};

// Precio inicial: descuento sobre el precio estándar durante los primeros días de uso.
export const precioInicial = { descuento: 0.5, dias: 90 };

export const saldo = {
  recargaMinima: 10, // S/ con IGV
  diasDePrueba: 7,
  avisoSaldoBajo: 20, // % del saldo que queda cuando llega el aviso
};

export const porUso = {
  nombre: 'Por uso',
  etiqueta: 'Sin mensualidad',
  ejemplos: [50, 150, 300, 600, 1000], // conversaciones al mes
  incluye: [
    'Sin contrato: recargas saldo y lo gastas a tu ritmo',
    'Nosotros configuramos tu asistente y cargamos tu información',
    'Bandeja, panel y soporte incluidos',
  ],
};

// Cómo funciona el saldo: lo que el cliente necesita saber antes de recargar.
export const comoFunciona: { t: string; d: string }[] = [
  { t: `${saldo.diasDePrueba} días gratis`, d: 'Tu asistente atiende de verdad durante la prueba, con créditos incluidos. No se te cobra nada.' },
  { t: `Recargas desde S/ ${saldo.recargaMinima}`, d: 'Pones saldo cuando quieras y se descuenta con cada uso. No hay cargo fijo al mes.' },
  { t: 'Ves cada sol que gastas', d: 'En tu panel, la pestaña Consumo muestra cada uso con su costo en soles.' },
  { t: 'Nunca corta una conversación', d: `Te avisamos cuando te queda el ${saldo.avisoSaldoBajo} % de tu saldo. Si se acaba, la conversación abierta sigue hasta terminar.` },
];

// Qué es un crédito, en palabras de cliente.
export const queEs = {
  titulo: `1 crédito = S/ ${credito.precio}`,
  texto: 'Cobramos por lo que usa la inteligencia artificial, medido en tokens y mostrado en soles. Un token es un pedazo de palabra que la IA lee o escribe: cada respuesta a tus clientes, cada resumen para tus asesores, cada página de tu web que lee.',
  nota: 'No vendemos tokens sueltos: vendemos conversaciones que ya traen tu catálogo, tus reglas y tu agenda. Lo que se repite en cada respuesta se reutiliza y cuesta 10 veces menos.',
};

export const notaMedida = 'Si atiendes mucho o necesitas algo a tu medida, armamos un plan mensual contigo. Lo vemos en la reunión.';

export const notaPie = 'Precios en soles. «Con IGV» incluye el 18 % de IGV. Los mensajes de WhatsApp los cobra Meta directamente a tu negocio: los primeros 1,000 mensajes de atención de cada mes son gratis y las plantillas (campañas) se pagan según su tarifa.';

// Ayudas de cálculo (las usan el cotizador, la tarjeta de «por uso» y las preguntas frecuentes).
export const conIgv = (s: number) => Math.round(s * (1 + IGV) * 100) / 100;
export const creditosMes = (conversaciones: number) => conversaciones * credito.porConversacion;
// Lo que se paga al mes con IGV: a precio estándar o con el descuento del precio inicial.
export const pagoMes = (conversaciones: number, inicial = false) =>
  conIgv(creditosMes(conversaciones) * credito.precio * (inicial ? 1 - precioInicial.descuento : 1));
export const soles = (n: number) => `S/ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
