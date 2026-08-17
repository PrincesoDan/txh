import type { Red } from '../content'

/** Glifo de Instagram como SVG inline: evita depender de una librería de íconos. */
function IconoInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

interface EnlaceRedProps {
  readonly red: Red
  readonly className?: string
}

export function EnlaceRed({ red, className = '' }: EnlaceRedProps) {
  return (
    <a
      href={red.url}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-2 text-lg transition-colors sm:text-xl ${className}`}
    >
      <IconoInstagram />
      {red.cuenta}
    </a>
  )
}
