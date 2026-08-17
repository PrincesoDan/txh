import { CentroCierre } from '../components/CentroCierre'
import { CentroObjetivo } from '../components/CentroObjetivo'
import { Columnas } from '../components/Columnas'
import { CtaFinal } from '../components/CtaFinal'
import { Incidencia } from '../components/Incidencia'
import { PageHero } from '../components/PageHero'
import { Principios } from '../components/Principios'
import { pilares } from '../content'

const pilar = pilares.find((p) => p.id === 'centro')!

export function CentroDePensamiento() {
  return (
    <>
      <PageHero pilar={pilar} />
      <CentroObjetivo />
      <Principios />
      <Incidencia />
      <Columnas />
      <CentroCierre />
      <CtaFinal />
    </>
  )
}
