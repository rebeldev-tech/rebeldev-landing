// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Dirección pública del sitio: la usan la URL canónica, el mapa del sitio, /robots.txt y los datos estructurados.
  // Si cambia el dominio, se cambia solo aquí.
  site: 'https://rebeldev.tech',
  // El sitio sigue siendo estático. El adaptador solo sirve las rutas de src/pages/api/ (el chat de Rebel),
  // que corren en el servidor de Vercel.
  adapter: vercel(),
  // Las fuentes se descargan al compilar y se sirven desde el propio sitio
  // (más rápido y sin enviar datos de los visitantes a Google).
  fonts: [
    {
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      provider: fontProviders.google(),
      weights: [400, 600, 800],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'Instrument Sans',
      cssVariable: '--font-instrument',
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
