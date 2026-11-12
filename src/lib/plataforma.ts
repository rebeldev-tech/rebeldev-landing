// Puente con la plataforma para el chat de Rebel. El navegador no puede llamar a su API pública desde otro sitio,
// así que el landing la llama desde el servidor (src/pages/api/) y devuelve la respuesta tal cual.
// La plataforma no se toca: se usan sus rutas públicas, las mismas que usa su propio chat.
import { contacto } from '../data/contacto';

const ESPERA_MS = 25_000;
const FALLO = 'No pude conectarme ahora. Inténtalo de nuevo en un momento.';

const json = (cuerpo: unknown, status = 200, cabeceras: Record<string, string> = {}) =>
  new Response(JSON.stringify(cuerpo), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cabeceras } });

export const rechazo = (detail: string, status: number) => json({ detail }, status);

/** Solo acepta pedidos hechos desde las páginas de este mismo sitio. */
export function esDeEsteSitio(request: Request, url: URL): boolean {
  const origen = request.headers.get('origin');
  return origen === null || origen === url.origin;
}

/** Texto recortado; lo que no es texto queda vacío. */
export const texto = (valor: unknown, maximo: number): string => (typeof valor === 'string' ? valor.trim().slice(0, maximo) : '');

/**
 * Llama a una ruta pública de la plataforma y devuelve su respuesta. `visitante` es la dirección de quien pregunta:
 * la plataforma lleva con ella el cupo de preguntas de cada persona (sin esto, todos compartirían un solo cupo).
 */
export async function pedirALaPlataforma(
  ruta: string,
  { cuerpo, visitante, cache }: { cuerpo?: unknown; visitante?: string; cache?: string } = {},
): Promise<Response> {
  if (!contacto.rebel) return rechazo('El chat no está disponible.', 503);
  try {
    const respuesta = await fetch(`${contacto.rebel}${ruta}`, {
      method: cuerpo === undefined ? 'GET' : 'POST',
      headers: {
        Accept: 'application/json',
        ...(cuerpo === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(visitante ? { 'X-Forwarded-For': visitante } : {}),
      },
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(ESPERA_MS),
    });
    const datos: unknown = await respuesta.json().catch(() => null);
    // Lo que el visitante puede corregir o entender pasa tal cual; lo demás es una falla nuestra.
    if (datos !== null && (respuesta.ok || [400, 409, 422, 429].includes(respuesta.status))) {
      return json(datos, respuesta.status, respuesta.ok && cache ? { 'Cache-Control': cache } : {});
    }
    return rechazo(FALLO, 502);
  } catch {
    return rechazo(FALLO, 502);
  }
}
