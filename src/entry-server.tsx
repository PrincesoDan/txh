/**
 * Entrada de build para el prerender: `scripts/prerender.mjs` la importa ya
 * compilada y genera un HTML estático por ruta.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { metasPorRuta, SITE_URL, absoluta } from './seo'
export * as contenido from './content'

export function render(ruta: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={ruta}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
