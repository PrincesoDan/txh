/**
 * Prerender post-build: escribe un HTML estático por ruta con su contenido y
 * sus metadatos, más los archivos para buscadores y LLMs.
 *
 * Por qué: los bots que arman las previews (Meta, LinkedIn, X, WhatsApp,
 * Slack) no ejecutan JavaScript, y la mayoría de los crawlers de LLMs
 * tampoco. Sin esto todos verían un <div id="root"> vacío y el mismo
 * og:image para cualquier link.
 *
 * Corre después de `vite build` (cliente) y `vite build --ssr` (servidor),
 * ver `npm run build`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')
const distSsr = join(raiz, 'dist-ssr')

const { render, metasPorRuta, SITE_URL, absoluta, contenido } = await import(
  pathToFileURL(join(distSsr, 'entry-server.js')).href
)

const plantilla = await readFile(join(dist, 'index.html'), 'utf8')

const attr = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

// `</script>` dentro del JSON cerraría el tag antes de tiempo.
const jsonSeguro = (obj) => JSON.stringify(obj).replaceAll('<', '\\u003c')

function cabecera(meta) {
  const url = absoluta(meta.ruta)
  const imagen = absoluta(meta.imagen)
  return [
    `<title>${attr(meta.titulo)}</title>`,
    `<meta name="description" content="${attr(meta.descripcion)}" />`,
    `<link rel="canonical" href="${url}" />`,

    // Open Graph: Facebook, Instagram, WhatsApp, LinkedIn, Slack, Telegram.
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(contenido.marca.nombre)}" />`,
    `<meta property="og:locale" content="es_CL" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${attr(meta.titulo)}" />`,
    `<meta property="og:description" content="${attr(meta.descripcion)}" />`,
    `<meta property="og:image" content="${imagen}" />`,
    `<meta property="og:image:secure_url" content="${imagen}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attr(meta.imagenAlt)}" />`,

    // X / Twitter. Sin cuenta de X no va `twitter:site`.
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(meta.titulo)}" />`,
    `<meta name="twitter:description" content="${attr(meta.descripcion)}" />`,
    `<meta name="twitter:image" content="${imagen}" />`,
    `<meta name="twitter:image:alt" content="${attr(meta.imagenAlt)}" />`,

    ...meta.jsonLd.map((j) => `<script type="application/ld+json">${jsonSeguro(j)}</script>`),
  ].join('\n    ')
}

const BLOQUE_SEO = /<!--seo:inicio-->[\s\S]*?<!--seo:fin-->/

for (const meta of metasPorRuta) {
  if (!BLOQUE_SEO.test(plantilla) || !plantilla.includes('<!--app-->')) {
    throw new Error('index.html no tiene los marcadores <!--seo:inicio/fin--> y <!--app-->')
  }
  const html = plantilla
    .replace(BLOQUE_SEO, () => cabecera(meta))
    .replace('<!--app-->', () => render(meta.ruta))

  // `/laboratorio` -> `dist/laboratorio.html`; Vercel lo sirve sin extensión
  // gracias a `cleanUrls` en vercel.json.
  const archivo = meta.ruta === '/' ? 'index.html' : `${meta.ruta.slice(1)}.html`
  await mkdir(dirname(join(dist, archivo)), { recursive: true })
  await writeFile(join(dist, archivo), html)
  console.log(`prerender  ${meta.ruta.padEnd(24)} -> dist/${archivo}`)
}

/* ---------------------------------------------------------------- sitemap */

const hoy = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${metasPorRuta
  .map(
    (m) => `  <url>
    <loc>${absoluta(m.ruta)}</loc>
    <lastmod>${hoy}</lastmod>
    <image:image><image:loc>${absoluta(m.imagen)}</image:loc></image:image>
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)

/* ----------------------------------------------------------------- robots */

// Los crawlers de IA se nombran explícitamente: algunos hosts y CDNs los
// bloquean por defecto, y dejarlos escrito deja claro que es a propósito.
const botsIa = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'CCBot',
]
const robots = `User-agent: *
Allow: /

${botsIa.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
await writeFile(join(dist, 'robots.txt'), robots)

/* --------------------------------------------------------------- llms.txt */

const { marca, hero, porQueExistimos, identidad, pilares, principios, areas, incidencia } =
  contenido
const { columnas, guia, actividades, seccionesMedio, contacto, redes, centroObjetivo } = contenido

const enlacesPilares = pilares
  .map((p) => `- [${p.nombre}](${absoluta(p.ruta)}): ${p.bajada}`)
  .join('\n')

const llms = `# ${marca.nombre} (${marca.sigla})

> ${marca.nombre} es una organización política y cultural chilena que articula tres áreas: un centro de pensamiento, un medio de comunicación regional (todoxdecir) y un laboratorio de innovación y acción territorial. ${hero.bajada}

${porQueExistimos.parrafos.join(' ')}

## Páginas

- [Inicio](${SITE_URL}/): quiénes somos, misión, visión, principios y formas de incidencia.
${enlacesPilares}

## Recursos

- [Guía “${guia.nombre}” (PDF, ${guia.peso})](${absoluta(guia.archivo)}): guía práctica para dirigentes sociales sobre cómo relacionarse con instituciones y autoridades.
${columnas.map((c) => `- [${c.titulo}](${c.url}): columna de ${c.autoria} en ${c.medio}, ${c.fecha}.`).join('\n')}

## Contacto

- Correo: ${contacto.email}
${redes.map((r) => `- Instagram: [${r.cuenta}](${r.url})`).join('\n')}

## Optional

- [Versión completa del contenido del sitio](${SITE_URL}/llms-full.txt)
`
await writeFile(join(dist, 'llms.txt'), llms)

const llmsFull = `# ${marca.nombre} (${marca.sigla})

> ${marca.descriptor}. ${hero.destacado}

Sitio: ${SITE_URL}/

## ${porQueExistimos.titulo}

${porQueExistimos.parrafos.join('\n\n')}

${porQueExistimos.remate}

${identidad.map((i) => `## ${i.etiqueta}\n\n${i.texto}`).join('\n\n')}

## Estructura: las tres áreas

${pilares
  .map((p) => `### ${p.nombre}\n\nURL: ${absoluta(p.ruta)}\n\n${p.bajada}\n\n${p.descripcion}\n\nRol: ${p.rol}`)
  .join('\n\n')}

## Centro de Pensamiento

${centroObjetivo.texto}

### Principios

${principios.map((p) => `- ${p}`).join('\n')}

### Áreas de trabajo

${areas.map((a) => `- ${a.titulo}`).join('\n')}

### ${incidencia.titulo}

${incidencia.formas.map((f) => `- ${f}`).join('\n')}

### Columnas publicadas

${columnas.map((c) => `- “${c.titulo}”. ${c.autoria}. ${c.medio}, ${c.fecha}. ${c.url}`).join('\n')}

## todoxdecir (medio de comunicación)

${marca.tagline}.

Secciones: ${seccionesMedio.map((s) => s.hashtag).join(', ')}.

## Laboratorio de Innovación y Acción Territorial

### Guía de incidencia: ${guia.nombre}

Descarga gratuita (${guia.peso}): ${absoluta(guia.archivo)}

### Actividades

${actividades.map((a) => `- **${a.titulo}** ${a.bajada} ${a.detalle}`).join('\n')}

## Contacto

- Correo: ${contacto.email}
${redes.map((r) => `- Instagram: ${r.cuenta} (${r.url})`).join('\n')}
`
await writeFile(join(dist, 'llms-full.txt'), llmsFull)

console.log('generados  sitemap.xml, robots.txt, llms.txt, llms-full.txt')

await rm(distSsr, { recursive: true, force: true })
