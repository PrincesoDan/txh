import { Link } from 'react-router-dom'
import type { Pilar } from '../content'
import { identidad, pilares } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

/** Clases explícitas por acento: Tailwind no resuelve nombres construidos en runtime. */
const ACENTOS: Record<Pilar['acento'], { barra: string; numero: string; rol: string }> = {
  ink: { barra: 'bg-ink', numero: 'text-ink', rol: 'bg-ink text-paper' },
  red: { barra: 'bg-red', numero: 'text-red', rol: 'bg-red text-paper' },
  amber: { barra: 'bg-amber', numero: 'text-amber', rol: 'bg-amber text-ink' },
}

/** El objetivo general del proyecto hace de bajada de esta sección. */
const objetivoGeneral = identidad[2]

export function Estructura() {
  return (
    <Section id="estructura" width="wide" className="paper-grain bg-paper">
      <Kicker className="text-red">Qué estamos construyendo</Kicker>
      <SectionTitle>
        Una <span className="text-red">arquitectura</span> de tres patas
      </SectionTitle>
      <p className="text-ink/70 mt-6 max-w-2xl text-xl leading-snug sm:text-2xl">
        {objetivoGeneral.texto}
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {pilares.map((pilar, i) => {
          const acento = ACENTOS[pilar.acento]
          return (
            <Link
              key={pilar.id}
              to={pilar.ruta}
              className="border-ink/15 bg-paper-shade/40 hover:border-ink/40 group flex flex-col border-2 transition-colors"
            >
              <div className={`h-2 ${acento.barra}`} />
              <div className="flex flex-1 flex-col p-7">
                <span className={`font-display text-5xl leading-none ${acento.numero}`}>
                  0{i + 1}
                </span>

                {/* Sin uppercase: "todoxdecir" es un wordmark y va en minúsculas. */}
                <h3 className="font-display mt-4 text-2xl leading-tight sm:text-3xl">
                  {pilar.nombre}
                </h3>

                <p className="text-ink mt-3 text-xl leading-snug">{pilar.bajada}</p>

                <p className="text-ink/70 mt-4 flex-1 text-lg leading-snug">{pilar.descripcion}</p>

                <p className={`mt-6 self-start px-3 py-1 text-base ${acento.rol}`}>
                  Te necesitamos: {pilar.rol}
                </p>

                <span className="text-ink/60 group-hover:text-red mt-5 text-lg transition-colors">
                  Ver {pilar.nav} →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
