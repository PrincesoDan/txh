import { momentum } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

const hechos = momentum.filter((hito) => hito.estado === 'hecho')
const proximos = momentum.filter((hito) => hito.estado === 'proximo')

export function Momentum() {
  return (
    <Section id="momentum" width="wide" className="paper-grain bg-ink text-paper torn-top">
      <Kicker className="text-amber">Momentum</Kicker>
      <SectionTitle>
        Dónde estamos <span className="text-red">hoy</span>
      </SectionTitle>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-amber mb-6 text-2xl tracking-wide">¿En qué hemos avanzado?</h3>
          <ul className="space-y-4">
            {hechos.map((hito) => (
              <li key={hito.texto} className="flex items-start gap-4">
                <span aria-hidden="true" className="text-amber mt-1 shrink-0 text-xl leading-none">
                  ✳
                </span>
                <span className="text-paper/85 text-lg leading-snug sm:text-xl">{hito.texto}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-red border-l-4 pl-7">
          <h3 className="text-red mb-6 text-2xl tracking-wide">Lo que viene</h3>
          <ul className="space-y-6">
            {proximos.map((hito) => (
              <li key={hito.texto} className="text-xl leading-snug sm:text-2xl">
                {hito.texto}
              </li>
            ))}
          </ul>

          <p className="mt-10 text-xl leading-tight sm:text-2xl">
            <span className="destacador">Tu incorporación ahora es crítica.</span>
          </p>
        </div>
      </div>
    </Section>
  )
}
