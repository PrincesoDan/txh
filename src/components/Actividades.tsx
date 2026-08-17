import { actividades } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

export function Actividades() {
  return (
    <Section width="wide" className="paper-grain bg-paper">
      <Kicker className="text-red">Lo que ya hicimos</Kicker>
      <SectionTitle>
        Actividades en <span className="text-red">territorio</span>
      </SectionTitle>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {actividades.map((actividad) => (
          <article key={actividad.imagen}>
            <img
              src={actividad.imagen}
              alt={actividad.alt}
              loading="lazy"
              width={900}
              height={1125}
              className="border-ink/15 aspect-4/5 w-full border-2 object-cover"
            />

            <h3 className="font-display mt-5 text-2xl leading-tight sm:text-3xl">
              {actividad.titulo}
            </h3>
            <p className="text-ink mt-2 text-xl leading-snug">{actividad.bajada}</p>
            <p className="text-ink/70 mt-3 text-lg leading-snug">{actividad.detalle}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
