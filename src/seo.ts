/**
 * Metadatos por ruta: título, descripción, imagen para compartir y datos
 * estructurados (JSON-LD).
 *
 * Lo consumen dos lados:
 *   - `scripts/prerender.mjs`, que los escribe en el HTML estático de cada
 *     ruta. Es lo que leen Meta, LinkedIn, X, Google y los crawlers de LLMs:
 *     ninguno de los de redes ejecuta JavaScript.
 *   - `useSeo` en el cliente, que actualiza título y canonical al navegar.
 */
import {
  actividades,
  columnas,
  contacto,
  guia,
  hero,
  identidad,
  marca,
  pilares,
  redes,
  type Pilar,
} from './content'

/** Dominio canónico. `www.todoxhacer.cl` redirige acá (ver `vercel.json`). */
export const SITE_URL = 'https://todoxhacer.cl'

export const absoluta = (ruta: string) => new URL(ruta, SITE_URL).href

export interface MetaRuta {
  readonly ruta: string
  readonly titulo: string
  readonly descripcion: string
  /** Imagen 1200×630 en `public/og/`, generada con `scripts/og-images.py`. */
  readonly imagen: string
  readonly imagenAlt: string
  readonly jsonLd: readonly object[]
}

const pilar = (id: string): Pilar => pilares.find((p) => p.id === id)!

const ORG_ID = `${SITE_URL}/#organizacion`
const WEB_ID = `${SITE_URL}/#sitio`

const organizacion = {
  '@type': 'NGO',
  '@id': ORG_ID,
  name: marca.nombre,
  alternateName: [marca.sigla, 'Todo por Hacer', 'todo x hacer'],
  url: `${SITE_URL}/`,
  logo: absoluta('/brand/todoxhacer-oscuro.png'),
  description: identidad[0].texto,
  slogan: hero.destacado,
  email: contacto.email,
  areaServed: { '@type': 'Country', name: 'Chile' },
  knowsLanguage: 'es-CL',
  sameAs: redes.filter((r) => r.de === 'txh').map((r) => r.url),
  subOrganization: [
    { '@id': `${SITE_URL}/centro-de-pensamiento#org` },
    { '@id': `${SITE_URL}/todoxdecir#org` },
    { '@id': `${SITE_URL}/laboratorio#org` },
  ],
}

const sitioWeb = {
  '@type': 'WebSite',
  '@id': WEB_ID,
  url: `${SITE_URL}/`,
  name: marca.nombre,
  inLanguage: 'es-CL',
  publisher: { '@id': ORG_ID },
}

const paginaWeb = (ruta: string, titulo: string, descripcion: string, about: string) => ({
  '@type': 'WebPage',
  '@id': `${absoluta(ruta)}#pagina`,
  url: absoluta(ruta),
  name: titulo,
  description: descripcion,
  inLanguage: 'es-CL',
  isPartOf: { '@id': WEB_ID },
  about: { '@id': about },
})

const migas = (ruta: string, nombre: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: marca.nombre, item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: nombre, item: absoluta(ruta) },
  ],
})

const subOrg = (p: Pilar, tipo: string, extra: object = {}) => ({
  '@type': tipo,
  '@id': `${absoluta(p.ruta)}#org`,
  name: p.id === 'medio' ? p.nombre : `${p.nombre} — ${marca.nombre}`,
  url: absoluta(p.ruta),
  description: p.descripcion,
  parentOrganization: { '@id': ORG_ID },
  ...extra,
})

const grafo = (...nodos: object[]) => [{ '@context': 'https://schema.org', '@graph': nodos }]

const centro = pilar('centro')
const medio = pilar('medio')
const lab = pilar('lab')

const tituloInicio = `${marca.nombre} — Pensar, disputar y organizar`
// Las descripciones van cortas (~155 caracteres): es lo que muestran Google y
// las tarjetas de redes antes de cortar. El detalle va en el JSON-LD y en
// `llms.txt`.
const descInicio = `${marca.nombre} (${marca.sigla}): centro de pensamiento, medio de comunicación y laboratorio de acción territorial en Chile. Pensar, disputar y organizar.`

export const metasPorRuta: readonly MetaRuta[] = [
  {
    ruta: '/',
    titulo: tituloInicio,
    descripcion: descInicio,
    imagen: '/og/inicio.jpg',
    imagenAlt: 'todoxhacer — Pensar, disputar y organizar. Sigamos haciendo política.',
    jsonLd: grafo(
      organizacion,
      sitioWeb,
      paginaWeb('/', tituloInicio, descInicio, ORG_ID),
    ),
  },
  {
    ruta: centro.ruta,
    titulo: `Centro de Pensamiento — ${marca.nombre}`,
    descripcion: `${centro.bajada} Investigación aplicada con anclaje territorial sobre democracia, movimientos sociales, extrema derecha y cultura.`,
    imagen: '/og/centro-de-pensamiento.jpg',
    imagenAlt: `Centro de Pensamiento de todoxhacer: ${centro.bajada}`,
    jsonLd: grafo(
      organizacion,
      subOrg(centro, 'ResearchOrganization', {
        knowsAbout: [
          'Política pública y democracia',
          'Activismo y movimientos sociales',
          'Extrema derecha y autoritarismos',
          'Comunicación y cultura',
        ],
      }),
      paginaWeb(
        centro.ruta,
        `Centro de Pensamiento — ${marca.nombre}`,
        centro.descripcion,
        `${absoluta(centro.ruta)}#org`,
      ),
      migas(centro.ruta, centro.nombre),
      {
        '@type': 'ItemList',
        name: 'Columnas publicadas',
        itemListElement: columnas.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'OpinionNewsArticle',
            headline: c.titulo,
            url: c.url,
            author: c.autoria.split(' y ').map((name) => ({ '@type': 'Person', name })),
            publisher: { '@type': 'Organization', name: c.medio },
            ...(c.imagen ? { image: absoluta(c.imagen) } : {}),
          },
        })),
      },
    ),
  },
  {
    ruta: medio.ruta,
    titulo: `todoxdecir — ${marca.tagline}`,
    descripcion: `todoxdecir es un medio de comunicación regional independiente, crítico y creativo. ${marca.tagline}.`,
    imagen: '/og/todoxdecir.jpg',
    imagenAlt: `todoxdecir: ${marca.tagline}`,
    jsonLd: grafo(
      organizacion,
      subOrg(medio, 'NewsMediaOrganization', {
        slogan: marca.tagline,
        logo: absoluta('/brand/todoxdecir.png'),
        sameAs: redes.filter((r) => r.de === 'medio').map((r) => r.url),
      }),
      paginaWeb(
        medio.ruta,
        `todoxdecir — ${marca.tagline}`,
        medio.descripcion,
        `${absoluta(medio.ruta)}#org`,
      ),
      migas(medio.ruta, medio.nombre),
    ),
  },
  {
    ruta: lab.ruta,
    titulo: `Laboratorio de Innovación y Acción Territorial — ${marca.nombre}`,
    descripcion: `Diagnóstico territorial y acompañamiento a organizaciones. Descarga gratis la guía de incidencia “${guia.nombre}”.`,
    imagen: '/og/laboratorio.jpg',
    imagenAlt: `Laboratorio de Innovación y Acción Territorial de todoxhacer: ${lab.bajada}`,
    jsonLd: grafo(
      organizacion,
      subOrg(lab, 'Organization'),
      paginaWeb(lab.ruta, `${lab.nombre} — ${marca.nombre}`, lab.descripcion, `${absoluta(lab.ruta)}#org`),
      migas(lab.ruta, lab.nombre),
      {
        '@type': 'DigitalDocument',
        name: `${guia.nombre} Guía práctica para relacionarnos con instituciones y autoridades`,
        url: absoluta(guia.archivo),
        encodingFormat: 'application/pdf',
        inLanguage: 'es-CL',
        isAccessibleForFree: true,
        author: { '@id': `${absoluta(lab.ruta)}#org` },
        audience: { '@type': 'Audience', audienceType: 'Dirigentes sociales' },
      },
      {
        '@type': 'ItemList',
        name: 'Actividades del Laboratorio',
        itemListElement: actividades.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a.titulo,
          description: `${a.bajada} ${a.detalle}`,
          image: absoluta(a.imagen),
        })),
      },
    ),
  },
]

/** Las rutas desconocidas caen al landing (ver `App.tsx`), así que usan su meta. */
export const metaDeRuta = (ruta: string): MetaRuta =>
  metasPorRuta.find((m) => m.ruta === ruta) ?? metasPorRuta[0]
