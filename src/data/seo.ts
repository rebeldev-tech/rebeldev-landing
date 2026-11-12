// SEO y GEO: lo que leen los buscadores y los asistentes de IA (datos estructurados y /llms.txt).
// Todo sale de los mismos datos que la página, para que no se desalineen. No incluye datos de contacto
// mientras sean ficticios (contacto.ts) ni nada que la página no diga.
import { metaV1, preguntasV1, serviciosV1, procesoV1 } from './v1';
import { credito, precioInicial, saldo, comoFunciona, notaPie } from './precios';
import { pasos, extras } from './rebelbot';

export const marca = {
  nombre: 'RebelDEV',
  producto: 'RebelBot',
  lema: 'Ingeniería para empresas rebeldes.',
  resumen: 'RebelDEV es un estudio de desarrollo de software. Creamos soluciones a medida según lo que necesita cada empresa: desde asistentes de WhatsApp y automatización de procesos hasta plataformas web, backend, APIs e integraciones.',
  productoResumen: 'RebelBot es un asistente de ventas con inteligencia artificial para el WhatsApp de un negocio. Atiende a los clientes a cualquier hora, responde con la información del negocio, califica a los interesados, agenda citas y pasa la conversación a una persona cuando hace falta. El equipo lo maneja desde un panel web.',
  imagen: '/og.png',
  imagenAlt: 'RebelDEV: ingeniería para empresas rebeldes. RebelBot, tu asistente de ventas en WhatsApp.',
};

const sinPunto = (s: string) => s.replace(/\.$/, '');

// JSON-LD (schema.org): la empresa, el sitio, el producto con su precio y las preguntas frecuentes.
export function datosEstructurados(site: URL) {
  const base = site.href;
  const org = `${base}#organizacion`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': org, name: marca.nombre, url: base, slogan: marca.lema, description: marca.resumen,
        logo: new URL('/favicon.svg', site).href, image: new URL(marca.imagen, site).href, foundingDate: '2026',
        areaServed: { '@type': 'Country', name: 'Perú' },
        knowsAbout: ['Asistentes de WhatsApp con inteligencia artificial', ...serviciosV1.map((s) => s.t)],
      },
      { '@type': 'WebSite', '@id': `${base}#sitio`, url: base, name: marca.nombre, description: metaV1.description, inLanguage: 'es-PE', publisher: { '@id': org } },
      {
        '@type': 'SoftwareApplication', '@id': `${base}#rebelbot`, name: marca.producto, url: `${base}#producto`,
        applicationCategory: 'BusinessApplication', operatingSystem: 'Web, WhatsApp', inLanguage: 'es',
        description: marca.productoResumen, provider: { '@id': org },
        featureList: [...pasos.map((p) => sinPunto(p.titulo)), ...extras.map((e) => e.t)],
        offers: {
          '@type': 'Offer', price: credito.precio.toFixed(2), priceCurrency: 'PEN', availability: 'https://schema.org/InStock',
          description: `Pago por uso con saldo prepago, sin mensualidad: S/ ${credito.precio} + IGV por crédito; una conversación de unos ${credito.mensajesPorConversacion} mensajes cuesta cerca de 1 crédito. ${precioInicial.descuento * 100} % de descuento los primeros ${precioInicial.dias} días y ${saldo.diasDePrueba} días de prueba gratis.`,
        },
      },
      {
        '@type': 'FAQPage', '@id': `${base}#preguntas`, inLanguage: 'es',
        mainEntity: preguntasV1.map((p) => ({ '@type': 'Question', name: p.q, acceptedAnswer: { '@type': 'Answer', text: p.a } })),
      },
    ],
  };
}

// /llms.txt: resumen en Markdown para asistentes de IA (formato de llmstxt.org).
export function textoParaIA(site: URL) {
  const lista = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
  return `# ${marca.nombre}

> ${marca.resumen} Su producto es ${marca.producto}, un asistente de ventas con inteligencia artificial para WhatsApp, con pago por uso. ${marca.lema}

Sitio: ${site.href}
Idioma: español (Perú)

## ${marca.producto}

${marca.productoResumen}

${lista(pasos.map((p) => `${p.titulo} ${p.texto}`))}

También:

${lista(extras.map((e) => `${e.t}: ${e.d}${e.porNegocio ? ' Se activa por negocio.' : ''}`))}

## Precios

- Pago por uso con saldo prepago, sin mensualidad ni contrato.
- 1 crédito = S/ ${credito.precio} + IGV. Una conversación de unos ${credito.mensajesPorConversacion} mensajes cuesta cerca de 1 crédito.
- ${precioInicial.descuento * 100} % de descuento durante los primeros ${precioInicial.dias} días.
${lista(comoFunciona.map((c) => `${c.t}: ${c.d}`))}
- ${notaPie}

## Cómo se empieza

${procesoV1.map((p, i) => `${i + 1}. ${p.t}: ${p.d}`).join('\n')}

## Software a medida

${lista(serviciosV1.map((s) => `${s.t}: ${s.d}`))}

## Preguntas frecuentes

${preguntasV1.map((p) => `### ${p.q}\n\n${p.a}`).join('\n\n')}
`;
}
