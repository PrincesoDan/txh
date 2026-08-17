import type { ReactNode } from 'react'

interface SectionProps {
  readonly id?: string
  readonly children: ReactNode
  /** Clases extra para el <section>, típicamente fondo y color de texto. */
  readonly className?: string
  /** Ancho del contenedor interno. `wide` para grillas de tarjetas. */
  readonly width?: 'prose' | 'default' | 'wide'
}

const WIDTHS: Record<NonNullable<SectionProps['width']>, string> = {
  prose: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
}

export function Section({ id, children, className = '', width = 'default' }: SectionProps) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className={`relative mx-auto ${WIDTHS[width]}`}>{children}</div>
    </section>
  )
}

interface SectionTitleProps {
  readonly children: ReactNode
  readonly className?: string
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`font-display text-4xl leading-[0.95] tracking-tight uppercase sm:text-6xl ${className}`}
    >
      {children}
    </h2>
  )
}

interface KickerProps {
  readonly children: ReactNode
  readonly className?: string
}

/** Etiqueta pequeña sobre el título, con el asterisco del manual de marca. */
export function Kicker({ children, className = '' }: KickerProps) {
  return (
    <p className={`mb-4 flex items-center gap-2 text-sm tracking-[0.28em] uppercase ${className}`}>
      <span aria-hidden="true" className="font-display text-lg leading-none">
        ✳
      </span>
      {children}
    </p>
  )
}
