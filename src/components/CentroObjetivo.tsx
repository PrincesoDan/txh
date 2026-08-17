import { centroObjetivo } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

export function CentroObjetivo() {
  return (
    <Section width="prose" className="paper-grain bg-paper-shade">
      <Kicker className="text-red">Centro de Pensamiento</Kicker>
      <SectionTitle>{centroObjetivo.titulo}</SectionTitle>
      <p className="text-ink/85 mt-7 text-xl leading-snug sm:text-2xl">{centroObjetivo.texto}</p>
    </Section>
  )
}
