import { Link } from 'react-router-dom'
import { contacto, marca, pilares, redes } from '../content'
import { EnlaceRed } from './Instagram'

export function Footer() {
  return (
    <footer className="paper-grain bg-ink text-paper relative px-5 py-14 sm:px-8">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <img
            src="/brand/todoxhacer-claro.png"
            alt="todoxhacer"
            className="h-20 w-auto object-contain"
          />
          <p className="text-paper/60 mt-4 max-w-sm text-lg leading-snug">{marca.descriptor}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {pilares.map((pilar) => (
              <li key={pilar.id}>
                <Link
                  to={pilar.ruta}
                  className="text-paper/70 hover:text-amber text-lg transition-colors"
                >
                  {pilar.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <p className="text-paper/50 text-sm tracking-[0.25em] uppercase">Contacto</p>
          <a
            href={`mailto:${contacto.email}`}
            className="text-paper hover:text-amber mt-2 inline-block text-xl transition-colors sm:text-2xl"
          >
            {contacto.email}
          </a>

          <ul className="mt-6 flex flex-col gap-2 sm:items-end">
            {redes.map((red) => (
              <li key={red.url}>
                <EnlaceRed red={red} className="text-paper/70 hover:text-amber" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
