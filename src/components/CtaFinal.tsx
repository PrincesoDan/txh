import { contacto, cta, hrefSuscripcion, redes, suscripcionEsProvisoria } from '../content'
import { EnlaceRed } from './Instagram'
import { Kicker } from './Section'

export function CtaFinal() {
  return (
    <section
      id="sumate"
      className="paper-grain bg-amber text-ink torn-top relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <Kicker className="text-ink/70 justify-center">{cta.kicker}</Kicker>

        <h2 className="font-display text-4xl leading-[0.92] tracking-tight uppercase sm:text-6xl lg:text-7xl">
          {cta.titulo}
        </h2>

        <p className="text-ink/80 mx-auto mt-8 max-w-2xl text-xl leading-snug sm:text-2xl">
          {cta.bajada}
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-2xl leading-tight sm:text-3xl">{cta.remate}</p>

        <div className="mt-12">
          <a
            href={hrefSuscripcion}
            className="bg-ink text-paper hover:bg-red inline-block px-9 py-4 text-2xl tracking-wide transition-colors sm:text-3xl"
          >
            {cta.boton}
          </a>

          {suscripcionEsProvisoria ? (
            <p className="text-ink/60 mt-5 text-base" data-pendiente="urlFormularioSuscripcion">
              Provisorio: abre un correo a {contacto.email}. Falta pegar la URL del formulario de
              Google.
            </p>
          ) : null}
        </div>

        <div className="border-ink/20 mt-14 border-t pt-8">
          <p className="text-ink/60 mb-4 text-sm tracking-[0.25em] uppercase">Síguenos</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {redes.map((red) => (
              <li key={red.url}>
                <EnlaceRed red={red} className="text-ink hover:text-red" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
