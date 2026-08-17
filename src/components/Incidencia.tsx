import { incidencia } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

export function Incidencia() {
  return (
    <Section id="incidencia" width="wide" className="paper-grain bg-paper">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Kicker className="text-red">Cómo lo hacemos</Kicker>
          <SectionTitle>{incidencia.titulo}</SectionTitle>
          <p className="text-ink/75 mt-6 text-lg leading-snug sm:text-xl">{incidencia.bajada}</p>
        </div>

        <ol className="border-ink/15 border-t-2">
          {incidencia.formas.map((forma, i) => (
            <li
              key={forma}
              className="border-ink/15 group hover:bg-paper-shade flex items-start gap-5 border-b-2 py-5 transition-colors"
            >
              <span className="text-red font-display group-hover:text-ink shrink-0 text-xl leading-tight transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-lg leading-snug sm:text-xl">{forma}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
