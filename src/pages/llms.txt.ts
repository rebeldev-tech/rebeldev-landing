// /llms.txt: resumen del sitio para asistentes de IA. El texto se arma en src/data/seo.ts con los datos de la página.
import type { APIRoute } from 'astro';
import { textoParaIA } from '../data/seo';

export const GET: APIRoute = ({ site }) =>
  new Response(textoParaIA(site!), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
