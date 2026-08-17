import { marca, redes, seccionesMedio } from '../content'
import { EnlaceRed } from './Instagram'
import { Kicker } from './Section'

const cuentaMedio = redes.find((red) => red.de === 'medio')

/**
 * Secciones editoriales de todoxdecir. Abre la página del medio, por eso el
 * padding superior extra: tiene que despejar la barra fija.
 */
export function Medio() {
  return (
    <section className="paper-grain bg-red text-paper torn-bottom relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
        {/* El logo vive sobre un recorte de papel: el círculo rojo de la marca
            no contrasta contra el fondo rojo de la sección. */}
        <div className="bg-paper torn-top torn-bottom flex justify-center px-6 py-10">
          <img
            src="/brand/todoxdecir.png"
            alt="todoxdecir"
            className="w-full max-w-xs object-contain"
          />
        </div>

        <div>
          <Kicker className="text-paper/80">Secciones</Kicker>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight uppercase sm:text-5xl">
            Dónde se cuenta el territorio
          </h2>

          <ul className="mt-8 flex flex-wrap gap-3">
            {seccionesMedio.map((seccion) => (
              <li
                key={seccion.hashtag}
                className="bg-ink text-paper px-4 py-2 text-xl tracking-wide sm:text-2xl"
                style={{ borderLeft: `5px solid ${seccion.color}` }}
              >
                {seccion.hashtag}
              </li>
            ))}
          </ul>

          {cuentaMedio ? (
            <EnlaceRed red={cuentaMedio} className="text-paper hover:text-ink mt-8" />
          ) : null}

          <p className="font-display mt-10 text-3xl leading-[0.95] uppercase sm:text-4xl">
            {marca.tagline}
          </p>
        </div>
      </div>
    </section>
  )
}
