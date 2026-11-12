// /api/rebel: el chat de Rebel del landing. GET trae lo que muestra al abrirse (WhatsApp, si se puede crear una cuenta);
// POST hace una pregunta. Las dos van a la plataforma desde el servidor (ver src/lib/plataforma.ts).
import type { APIRoute } from 'astro';
import { esDeEsteSitio, pedirALaPlataforma, rechazo, texto } from '../../lib/plataforma';

export const prerender = false;

const RUTA = '/api/publico/rebel';
const MAXIMO_DE_LA_PREGUNTA = 500;
const TURNOS_RECORDADOS = 6;

export const GET: APIRoute = () => pedirALaPlataforma(RUTA, { cache: 'public, s-maxage=300, max-age=60' });

export const POST: APIRoute = async ({ request, url, clientAddress }) => {
  if (!esDeEsteSitio(request, url)) return rechazo('Pedido no permitido.', 403);
  const cuerpo = await request.json().catch(() => null);
  const pregunta = texto(cuerpo?.pregunta, MAXIMO_DE_LA_PREGUNTA);
  if (!pregunta) return rechazo('Escribe tu pregunta.', 422);

  const anteriores: unknown[] = Array.isArray(cuerpo?.historial) ? cuerpo.historial.slice(-TURNOS_RECORDADOS) : [];
  const historial = anteriores
    .map((t) => t as { role?: unknown; content?: unknown })
    .filter((t) => (t?.role === 'user' || t?.role === 'assistant') && typeof t.content === 'string')
    .map((t) => ({ role: t.role, content: texto(t.content, MAXIMO_DE_LA_PREGUNTA * 2) }));

  return pedirALaPlataforma(RUTA, { cuerpo: { pregunta, historial }, visitante: clientAddress });
};
