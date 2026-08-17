import { columnas } from '../content'
import { Kicker, Section, SectionTitle } from './Section'

/**
 * Columnas publicadas, con la misma mecánica de tiles del landing: bloque
 * visual arriba, texto abajo, todo enlazado al artículo.
 */
export function Columnas() {
  return (
    <Section width="wide" className="paper-grain bg-paper">
      <Kicker className="text-red">Publicaciones</Kicker>
      <SectionTitle>
        Lo que ya <span className="text-red">escribimos</span>
      </SectionTitle>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {columnas.map((columna) => (
          <a
            key={columna.url}
            href={columna.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group focus-visible:outline-red block focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {/* Proporción fija: mantiene la grilla cuadrada sin importar el
                largo del título ni el alto de la imagen del medio. */}
            <div className="aspect-4/3 relative overflow-hidden transition-transform duration-200 group-hover:-translate-y-1.5">
              {columna.imagen ? (
                <img
                  src={columna.imagen}
                  alt={columna.alt ?? ''}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full" style={{ backgroundColor: columna.color }} />
              )}

              <span
                className="text-paper absolute top-0 left-0 px-3 py-1.5 text-sm tracking-[0.25em] uppercase"
                style={{ backgroundColor: columna.color }}
              >
                Columna
              </span>
            </div>

            <h3 className="font-display group-hover:text-red mt-5 text-2xl leading-tight transition-colors">
              {columna.titulo}
            </h3>

            <p className="mt-3 text-lg leading-snug sm:text-xl">{columna.autoria}</p>
            <p className="text-ink/60 mt-1 text-lg">
              {columna.medio} · {columna.fecha} · Leer ↗
            </p>
          </a>
        ))}
      </div>
    </Section>
  )
}
