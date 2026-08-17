import { CtaFinal } from '../components/CtaFinal'
import { Medio } from '../components/Medio'
import { PageHero } from '../components/PageHero'
import { UltimasPublicaciones } from '../components/UltimasPublicaciones'
import { pilares } from '../content'

const pilar = pilares.find((p) => p.id === 'medio')!

export function Todoxdecir() {
  return (
    <>
      <Medio />
      <UltimasPublicaciones />
      <PageHero pilar={pilar} abrePagina={false} />
      <CtaFinal />
    </>
  )
}
