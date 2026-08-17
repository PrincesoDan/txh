import { porQueExistimos } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

export function Manifiesto() {
  return (
    <Section id="manifiesto" width="prose" className="paper-grain bg-paper">
      <Kicker className="text-red">TXH</Kicker>
      <SectionTitle>{porQueExistimos.titulo}</SectionTitle>

      <div className="mt-8 space-y-6">
        {porQueExistimos.parrafos.map((parrafo) => (
          <p key={parrafo} className="text-ink/85 text-xl leading-snug sm:text-2xl">
            {parrafo}
          </p>
        ))}
      </div>

      <p className="mt-10 text-3xl leading-tight sm:text-4xl">
        <span className="destacador">{porQueExistimos.remate}</span>
      </p>
    </Section>
  )
}
