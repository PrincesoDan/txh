import { hero, hrefSuscripcion } from '../content'

export function Hero() {
  return (
    <section
      id="inicio"
      className="paper-grain bg-ink text-paper torn-bottom relative overflow-hidden pt-28 pb-28 sm:pt-36 sm:pb-36"
    >
      {/* Mancha de color: el círculo del logo todoxdecir usado como elemento gráfico */}
      <div
        aria-hidden="true"
        className="bg-red/25 pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-amber/15 pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-amber mb-6 text-sm tracking-[0.3em] uppercase sm:text-base">
          {hero.antetitulo}
        </p>

        <h1 className="font-display text-[3.25rem] leading-[0.88] tracking-tight uppercase sm:text-[6rem] lg:text-[7.5rem]">
          {hero.titulo.map((linea, i) => (
            <span key={linea} className="block">
              {i === 1 ? <span className="text-red">{linea}</span> : linea}
            </span>
          ))}
        </h1>

        <p className="mt-6 text-3xl leading-tight sm:text-5xl">
          <span className="destacador-amber">{hero.destacado}</span>
        </p>

        <p className="text-paper/85 mt-9 max-w-2xl text-xl leading-snug sm:text-2xl">
          {hero.bajada}
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-4">
          <a
            href={hrefSuscripcion}
            className="bg-red text-paper hover:bg-paper hover:text-ink px-7 py-3 text-xl tracking-wide transition-colors sm:text-2xl"
          >
            {hero.ctaPrimario}
          </a>
          <a
            href="#manifiesto"
            className="border-paper/40 text-paper hover:border-amber hover:text-amber border-2 px-7 py-3 text-xl tracking-wide transition-colors sm:text-2xl"
          >
            {hero.ctaSecundario}
          </a>
        </div>
      </div>
    </section>
  )
}
