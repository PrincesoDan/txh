import { centroCierre } from '../content'
import { Section, SectionTitle } from './Section'

export function CentroCierre() {
  return (
    <Section width="prose" className="paper-grain bg-ink text-paper torn-top torn-bottom">
      <SectionTitle>
        Todo está aún por <span className="text-red">construirse</span>
      </SectionTitle>

      <div className="mt-8 space-y-6">
        {centroCierre.parrafos.map((parrafo) => (
          <p key={parrafo} className="text-paper/85 text-xl leading-snug sm:text-2xl">
            {parrafo}
          </p>
        ))}
      </div>

      <p className="mt-10 text-2xl leading-tight sm:text-3xl">
        <span className="destacador">{centroCierre.remate}</span>
      </p>
    </Section>
  )
}
