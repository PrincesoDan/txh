import { CtaFinal } from '../components/CtaFinal'
import { Estructura } from '../components/Estructura'
import { Hero } from '../components/Hero'
import { Identidad } from '../components/Identidad'
import { Incidencia } from '../components/Incidencia'
import { Manifiesto } from '../components/Manifiesto'
import { PilarTiles } from '../components/PilarTiles'
import { Principios } from '../components/Principios'

export function Landing() {
  return (
    <>
      <Hero />
      <PilarTiles />
      <Manifiesto />
      <Identidad />
      <Estructura />
      <Principios />
      <Incidencia />
      <CtaFinal />
    </>
  )
}
