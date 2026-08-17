import { Link } from 'react-router-dom'
import type { Pilar } from '../content'

interface PageHeroProps {
  readonly pilar: Pilar
  /**
   * `false` cuando el bloque no abre la página: baja el padding superior (no
   * hay que despejar la barra fija) y agrega el borde rasgado de arriba.
   */
  readonly abrePagina?: boolean
}

/** Bloque de identidad de las páginas de los tres pilares. */
export function PageHero({ pilar, abrePagina = true }: PageHeroProps) {
  const espaciado = abrePagina
    ? 'pt-32 pb-24 sm:pt-40 sm:pb-28'
    : 'torn-top py-20 sm:py-28'

  return (
    <section
      className={`paper-grain bg-ink text-paper torn-bottom relative overflow-hidden px-5 sm:px-8 ${espaciado}`}
    >
      <div
        aria-hidden="true"
        className="bg-red/20 pointer-events-none absolute -top-40 -right-32 h-[30rem] w-[30rem] rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <Link
          to="/"
          className="text-paper/60 hover:text-amber mb-8 inline-block text-lg transition-colors"
        >
          ← Volver a todoxhacer
        </Link>

        <h1 className="font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          {pilar.nombre}
        </h1>

        <p className="mt-7 text-2xl leading-tight sm:text-3xl">
          <span className="destacador-amber">{pilar.bajada}</span>
        </p>

        <p className="text-paper/85 mt-8 max-w-2xl text-xl leading-snug sm:text-2xl">
          {pilar.descripcion}
        </p>
      </div>
    </section>
  )
}
