import { areas, principios } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

export function Principios() {
  return (
    <Section width="wide" className="paper-grain bg-paper-shade">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Kicker className="text-red">Nuestros principios</Kicker>
          <SectionTitle>
            Con qué <span className="text-red">no</span> transamos
          </SectionTitle>

          <ul className="mt-9 flex flex-wrap gap-3">
            {principios.map((principio) => (
              <li
                key={principio}
                className="border-ink/25 hover:bg-ink hover:text-paper border-2 px-4 py-2 text-xl transition-colors"
              >
                {principio}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Kicker className="text-red">Áreas de trabajo</Kicker>
          <SectionTitle>Dónde ponemos el foco</SectionTitle>

          <ul className="mt-9 space-y-4">
            {areas.map((area, i) => (
              <li key={area.titulo} className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="font-display shrink-0 text-2xl leading-none"
                  style={{ color: area.color }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-xl leading-snug sm:text-2xl"
                  style={{ borderBottom: `3px solid ${area.color}` }}
                >
                  {area.titulo}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
