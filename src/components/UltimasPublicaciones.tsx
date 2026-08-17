import { useEffect } from 'react'
import { feedInstagram, redes } from '../content'
import { EnlaceRed } from './Instagram'
import { Kicker, Section, SectionTitle } from './Section'

const cuentaMedio = redes.find((red) => red.de === 'medio')

/**
 * Carga el script de LightWidget una sola vez. Es el que escucha los mensajes
 * del iframe y le ajusta el alto al contenido.
 */
function useScriptLightWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${feedInstagram.script}"]`)) return

    const script = document.createElement('script')
    script.src = feedInstagram.script
    script.async = true
    document.body.appendChild(script)
  }, [])
}

export function UltimasPublicaciones() {
  useScriptLightWidget()

  return (
    <Section width="wide" className="paper-grain bg-paper">
      <Kicker className="text-red">En Instagram</Kicker>
      <SectionTitle>
        Últimas <span className="text-red">publicaciones</span>
      </SectionTitle>

      <div className="mt-10">
        <iframe
          src={feedInstagram.iframe}
          title="Últimas publicaciones de @todoxdecir.cl en Instagram"
          scrolling="no"
          loading="lazy"
          className="lightwidget-widget w-full overflow-hidden border-0"
          style={{ height: feedInstagram.altoInicial }}
        />
      </div>

      {cuentaMedio ? (
        <div className="mt-8">
          <EnlaceRed red={cuentaMedio} className="text-ink hover:text-red" />
        </div>
      ) : null}
    </Section>
  )
}
