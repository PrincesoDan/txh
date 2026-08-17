import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cta, hrefSuscripcion, pilares } from '../content'

export function Nav() {
  const [compacto, setCompacto] = useState(false)

  useEffect(() => {
    const alScrollear = () => setCompacto(window.scrollY > 40)
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        compacto ? 'bg-ink/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Lockup de texto en vez del PNG: el logo es 16:9 con mucho aire y a
            altura de barra el wordmark queda ilegible. */}
        <Link to="/" className="shrink-0" aria-label="todoxhacer — inicio">
          <span className="text-paper text-2xl leading-none font-black sm:text-3xl">
            todo<span className="text-amber">x</span>hacer
          </span>
        </Link>

        <ul className="hidden items-center gap-2 lg:flex">
          {pilares.map((pilar) => (
            <li key={pilar.id}>
              <Link
                to={pilar.ruta}
                className="border-paper/25 text-paper hover:border-amber hover:text-amber border px-4 py-2 text-lg transition-colors"
              >
                {pilar.nav}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={hrefSuscripcion}
          className="bg-red text-paper hover:bg-amber hover:text-ink shrink-0 px-4 py-2 text-lg tracking-wide transition-colors sm:px-5"
        >
          {cta.boton}
        </a>
      </nav>
    </header>
  )
}
