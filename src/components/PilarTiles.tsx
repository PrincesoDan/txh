import { Link } from 'react-router-dom'
import type { Pilar } from '../content'
import { pilares } from '../content'

const FONDOS: Record<Pilar['tile']['fondo'], string> = {
  amber: 'bg-amber',
  ink: 'bg-ink',
}

const DESCRIPTORES: Record<Pilar['tile']['fondo'], string> = {
  amber: 'text-ink',
  ink: 'text-paper',
}

export function PilarTiles() {
  return (
    <section className="paper-grain bg-paper relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="relative mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {pilares.map((pilar) => (
          <Link
            key={pilar.id}
            to={pilar.ruta}
            className="group focus-visible:outline-red block focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <div
              className={`flex aspect-square flex-col items-center justify-center gap-5 p-8 transition-transform duration-200 group-hover:-translate-y-1.5 ${FONDOS[pilar.tile.fondo]}`}
            >
              <img
                src={pilar.tile.logo}
                alt=""
                className="max-h-[70%] w-auto max-w-[88%] object-contain"
              />
              {pilar.tile.descriptor ? (
                <p
                  className={`text-center text-sm tracking-[0.18em] uppercase sm:text-base ${DESCRIPTORES[pilar.tile.fondo]}`}
                >
                  {pilar.tile.descriptor}
                </p>
              ) : null}
            </div>

            <p className="group-hover:text-red mt-5 text-xl leading-snug transition-colors sm:text-2xl">
              {pilar.bajada}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
