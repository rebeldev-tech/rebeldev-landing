// /api/interesados: «Déjanos tus datos» del chat de Rebel. Envía a la plataforma lo que la persona escribió en el
// formulario, para que el equipo le escriba. El landing no guarda nada.
import type { APIRoute } from 'astro';
import { esDeEsteSitio, pedirALaPlataforma, rechazo, texto } from '../../lib/plataforma';

export const prerender = false;

export const POST: APIRoute = async ({ request, url, clientAddress }) => {
  if (!esDeEsteSitio(request, url)) return rechazo('Pedido no permitido.', 403);
  const c = await request.json().catch(() => null);
  if (c === null || typeof c !== 'object') return rechazo('Faltan tus datos.', 422);
  if (c.acepta !== true) return rechazo('Marca la casilla para que podamos contactarte.', 422);

  return pedirALaPlataforma('/api/publico/interesados', {
    visitante: clientAddress,
    cuerpo: {
      nombre: texto(c.nombre, 80),
      empresa: texto(c.empresa, 80),
      whatsapp: texto(c.whatsapp, 20),
      correo: texto(c.correo, 120),
      mensaje: texto(c.mensaje, 500),
      origen: 'web',
      acepta: true,
    },
  });
};
