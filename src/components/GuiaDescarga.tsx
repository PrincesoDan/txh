import { guia } from '../content'

export function GuiaDescarga() {
  return (
    <section className="paper-grain bg-amber text-ink torn-top torn-bottom relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-ink/70 text-sm tracking-[0.25em] uppercase">{guia.titulo}</p>
          <h2 className="font-display mt-3 text-3xl leading-[0.95] uppercase sm:text-5xl">
            {guia.nombre}
          </h2>
          <p className="text-ink/70 mt-3 text-lg">{guia.peso}</p>
        </div>

        <a
          href={guia.archivo}
          download
          className="bg-ink text-paper hover:bg-red shrink-0 px-8 py-4 text-xl tracking-wide transition-colors sm:text-2xl"
        >
          Descargar la guía ↓
        </a>
      </div>
    </section>
  )
}
