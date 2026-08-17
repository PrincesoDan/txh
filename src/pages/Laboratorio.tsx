import { Actividades } from '../components/Actividades'
import { CtaFinal } from '../components/CtaFinal'
import { GuiaDescarga } from '../components/GuiaDescarga'
import { PageHero } from '../components/PageHero'
import { pilares } from '../content'

const pilar = pilares.find((p) => p.id === 'lab')!

export function Laboratorio() {
  return (
    <>
      <PageHero pilar={pilar} />
      <GuiaDescarga />
      <Actividades />
      <CtaFinal />
    </>
  )
}
