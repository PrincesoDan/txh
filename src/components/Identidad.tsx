import { identidad } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

export function Identidad() {
  return (
    <Section
      id="identidad"
      width="wide"
      className="paper-grain bg-ink text-paper torn-top torn-bottom"
    >
      <Kicker className="text-amber">Nuestra identidad</Kicker>
      <SectionTitle>
        Quiénes <span className="text-red">somos</span>
      </SectionTitle>

      <dl className="mt-12 grid gap-px sm:grid-cols-3">
        {identidad.map((bloque) => (
          <div key={bloque.etiqueta} className="bg-paper/5 p-7">
            <dt className="text-amber mb-4 text-sm tracking-[0.25em] uppercase">
              {bloque.etiqueta}
            </dt>
            <dd className="text-paper/90 text-lg leading-snug sm:text-xl">{bloque.texto}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
