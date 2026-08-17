/**
 * Fuente única de contenido de la landing.
 *
 * TODO el copy de este archivo proviene del material en `info/landing/`:
 *   - TodoxHacerPresentación.pdf  -> manifiesto, identidad, 3 patas, momentum
 *   - PPT CP Invitación.pptx      -> principios, áreas de trabajo, incidencia
 *   - TodoxDecirManual.pdf        -> secciones del medio, paleta, tagline
 *
 * No se inventó contenido: lo que no estaba en el material queda como
 * marcador explícito (ver `PENDIENTE` al final del archivo).
 */

export interface Pilar {
  readonly id: string
  readonly nombre: string
  /** Bajada corta: es el texto que va bajo el tile en el hero. */
  readonly bajada: string
  readonly descripcion: string
  readonly rol: string
  readonly acento: 'red' | 'amber' | 'ink'
  /** Ruta de la página propia del pilar. */
  readonly ruta: string
  /** Etiqueta corta para la barra de navegación. */
  readonly nav: string
  /** Tile del hero: logo, fondo y descriptor bajo el logo. */
  readonly tile: {
    readonly logo: string
    readonly fondo: 'amber' | 'ink'
    readonly descriptor: string | null
  }
}

export interface Area {
  readonly titulo: string
  readonly color: string
}

export interface Hito {
  readonly texto: string
  readonly estado: 'hecho' | 'proximo'
}

export interface SeccionMedio {
  readonly hashtag: string
  readonly color: string
}

export interface Columna {
  readonly titulo: string
  readonly autoria: string
  readonly medio: string
  readonly fecha: string
  readonly url: string
  /** Acento: etiqueta sobre la imagen, o fondo del bloque si no hay imagen. */
  readonly color: string
  /**
   * Imagen de portada del artículo, guardada en `public/columnas/`.
   * `null` cae al bloque de color. No enlazar la imagen del medio en caliente:
   * cambia de URL y consume su ancho de banda.
   */
  readonly imagen: string | null
  readonly alt: string | null
}

export interface Actividad {
  readonly titulo: string
  readonly bajada: string
  readonly detalle: string
  readonly imagen: string
  readonly alt: string
}

export const marca = {
  nombre: 'todoxhacer',
  sigla: 'TXH',
  descriptor:
    'Centro de pensamiento, laboratorio de innovación y acción territorial, medio de comunicación',
  tagline: 'Porque todavía queda todo por decir',
} as const

export const hero = {
  antetitulo:
    'Centro de pensamiento · Laboratorio de innovación y acción territorial · Medio de comunicación',
  titulo: ['Pensar,', 'disputar', 'y organizar.'],
  destacado: 'Sigamos haciendo política.',
  bajada:
    'Pensamiento, medios y acción territorial: una nueva arquitectura para reconstruir incidencia, fortalecer el territorio y disputar el sentido común.',
  ctaPrimario: 'Suscríbete',
  ctaSecundario: 'Conoce el proyecto',
} as const

export const porQueExistimos = {
  titulo: '¿Por qué existimos?',
  parrafos: [
    'La izquierda perdió el pulso del tiempo que habita. Se volvió reactiva, sin horizonte común ni imaginación política, abandonando el territorio y la disputa del sentido de las cosas.',
    'TXH nace para recuperar ese suelo perdido: para producir pensamiento con raíz, narrativas que enfrenten al fascismo y acción colectiva transformadora.',
  ],
  remate: 'No creemos en la resignación.',
} as const

export const identidad = [
  {
    etiqueta: 'Misión',
    texto:
      'Impulsar la acción organizada, articulando ideas, territorios y narrativas que devuelven a las comunidades la capacidad de decidir, disputar y transformar su entorno.',
  },
  {
    etiqueta: 'Visión',
    texto:
      'Soñamos con construir una arquitectura política y cultural que devuelva horizonte a lo común. Una estructura viva que piense, comunique y actúe desde los territorios, articulando pensamiento crítico, acción colectiva y nuevas narrativas para disputar el sentido y transformar el país.',
  },
  {
    etiqueta: 'Objetivo general',
    texto: 'Crear y difundir ideas, medios y acciones transformadoras con anclaje territorial.',
  },
] as const

export const pilares: readonly Pilar[] = [
  {
    id: 'centro',
    nombre: 'Centro de Pensamiento',
    bajada: 'Produce conocimiento aplicado y datos para disputar sentido.',
    descripcion:
      'Espacio de investigación aplicada y producción de conocimiento con anclaje territorial. Provee evidencia rigurosa para disputar sentido en la conversación pública y orientar acción colectiva, articulando una red de investigadoras/es, organizaciones y aliadas/os.',
    rol: 'Generando análisis e investigación.',
    acento: 'ink',
    ruta: '/centro-de-pensamiento',
    nav: 'Centro de Pensamiento',
    tile: {
      // Variante con el "xhacer" en crema: el ámbar del logo se pierde
      // sobre el fondo ámbar del tile.
      logo: '/brand/todoxhacer-sobre-amber.png',
      fondo: 'amber',
      descriptor: 'Centro de Pensamiento',
    },
  },
  {
    id: 'medio',
    nombre: 'todoxdecir',
    bajada: 'Comunica con tono propio y genera narrativa territorial.',
    descripcion:
      'Medio de comunicación regional: un espacio independiente, crítico y creativo que se atreva a contar las historias de nuestra gente y nuestro territorio con la profundidad que merecen.',
    rol: 'Construyendo narrativas que disputen sentido.',
    acento: 'red',
    ruta: '/todoxdecir',
    nav: 'Medio de comunicación',
    tile: {
      logo: '/brand/todoxdecir.png',
      fondo: 'ink',
      // El logo de todoxdecir ya es el wordmark completo: no lleva descriptor.
      descriptor: null,
    },
  },
  {
    id: 'lab',
    nombre: 'Laboratorio de Innovación y Acción Territorial',
    bajada: 'Experimenta, organiza y acompaña comunidades.',
    descripcion:
      'Diseño e implementación de herramientas de diagnóstico territorial, acompañamiento a procesos y a organizaciones que ya están haciendo trabajo en sus territorios.',
    rol: 'Acompañando procesos y organizaciones territoriales.',
    acento: 'amber',
    ruta: '/laboratorio',
    nav: 'Laboratorio territorial',
    tile: {
      logo: '/brand/todoxhacer-claro.png',
      fondo: 'ink',
      descriptor: 'Laboratorio de Innovación y Acción Territorial',
    },
  },
]

/** "Nuestro objetivo" del PPT del Centro de Pensamiento (slide 5). */
export const centroObjetivo = {
  titulo: 'Nuestro objetivo',
  texto:
    'Nuestra misión es contribuir al debate público y político, ofreciendo investigación crítica, herramientas de análisis y propuestas concretas que acompañen las luchas sociales y democráticas. Queremos tender puentes entre la academia, la militancia y la ciudadanía organizada, generando espacios de diálogo y reflexión que se conviertan en insumos para la acción.',
} as const

export const principios: readonly string[] = [
  'Independencia',
  'Rigor y crítica',
  'Pluralismo',
  'Compromiso democrático',
  'Solidaridad',
  'Transparencia',
]

export const areas: readonly Area[] = [
  { titulo: 'Política pública y democracia', color: 'var(--color-pop-blue)' },
  { titulo: 'Activismo y movimientos sociales', color: 'var(--color-pop-green)' },
  { titulo: 'Extrema derecha y autoritarismos', color: 'var(--color-pop-clay)' },
  { titulo: 'Comunicación y cultura', color: 'var(--color-pop-purple)' },
]

export const incidencia = {
  titulo: 'Formas de acción e incidencia',
  bajada:
    'Nuestra misión es contribuir al debate público y político, ofreciendo investigación crítica, herramientas de análisis y propuestas concretas que acompañen las luchas sociales y democráticas. Queremos tender puentes entre la academia, la militancia y la ciudadanía organizada.',
  formas: [
    'Revista periódica y medio de comunicación regional.',
    'Informes de investigación y propuestas de política pública.',
    'Seminarios, talleres y foros para el diálogo ciudadano y académico.',
    'Opiniones y columnas en distintos espacios de comunicación.',
    'Encuestas, estudios y materiales pedagógicos que acerquen el debate a la sociedad.',
    'Vinculación con redes académicas.',
    'Incidencia legislativa: vinculación con comisiones y comités legislativos, diputadas y diputados, y otros actores políticos relevantes.',
  ],
} as const

/**
 * Cierre del PPT del Centro de Pensamiento (slide 8). Va en su página.
 */
export const centroCierre = {
  titulo: 'Todo está aún por construirse',
  parrafos: [
    'El Centro de Pensamiento “Todo por Hacer” surge de una certeza: todo está aún por construirse. Frente a la crisis democrática y el avance de proyectos excluyentes, apostamos a la producción de conocimiento crítico y al fortalecimiento de las luchas colectivas.',
    'No creemos en la resignación. Creemos en la imaginación política, en la investigación rigurosa y en la fuerza de la acción social. Por eso existimos, y por eso afirmamos que todavía hay todo por hacer.',
  ],
  remate: 'Te invitamos a participar y colaborar.',
} as const

/**
 * Columnas publicadas. Los títulos y la autoría salen de los borradores en
 * `info/columnas/`; las fechas, de las URLs de CIPER.
 */
export const columnas: readonly Columna[] = [
  {
    titulo: 'Vaciar sin romper: extrema derecha a la chilena',
    autoria: 'Ángela Miranda',
    medio: 'El Ciudadano',
    fecha: 'Agosto 2026',
    url: 'https://www.elciudadano.com/chile/vaciar-sin-romper-extrema-derecha-a-la-chilena/08/10/',
    color: 'var(--color-pop-purple)',
    imagen: '/columnas/vaciar-sin-romper.jpg',
    alt: 'Dirigentes del Partido Republicano en una conferencia de prensa, imagen de portada de la columna en El Ciudadano',
  },
  {
    titulo:
      'Infancias en riesgo: la deuda ambiental del Estado chileno frente a la contaminación minera en Antofagasta',
    autoria: 'Liliana González y Camila Rojas Castillo',
    medio: 'CIPER Chile',
    fecha: 'Febrero 2026',
    url: 'https://www.ciperchile.cl/2026/02/10/infancias-en-riesgo-la-deuda-ambiental-del-estado-chileno-frente-a-la-contaminacion-minera-en-antofagasta/',
    color: 'var(--color-pop-clay)',
    imagen: '/columnas/infancias-en-riesgo.jpg',
    alt: 'Imagen de portada de la columna en CIPER Chile sobre contaminación minera e infancia en Antofagasta',
  },
  {
    titulo:
      '¿Es posible cerrar las fronteras? Comentarios sobre las propuestas políticas en materia fronteriza',
    autoria: 'Vicente Jiménez Guajardo y Camila Rojas Castillo',
    medio: 'CIPER Chile',
    fecha: 'Octubre 2025',
    url: 'https://www.ciperchile.cl/2025/10/26/es-posible-cerrar-las-fronteras-comentarios-sobre-las-propuestas-politicas-en-materia-fronteriza/',
    color: 'var(--color-pop-blue)',
    imagen: '/columnas/cerrar-las-fronteras.jpg',
    alt: 'Imagen de portada de la columna en CIPER Chile sobre las propuestas políticas en materia fronteriza',
  },
]

/** Guía descargable del Laboratorio. */
export const guia = {
  titulo: 'Descarga tu guía de incidencia',
  nombre: '¿Cómo nos hacemos escuchar?',
  archivo: '/docs/guia-como-nos-hacemos-escuchar.pdf',
  peso: '9 MB · 52 páginas',
} as const

/**
 * Actividades ya realizadas por el Laboratorio, tomadas de los afiches en
 * `info/productos/`. Todo el texto sale de los propios afiches.
 */
export const actividades: readonly Actividad[] = [
  {
    titulo: 'Presentación de la guía de incidencia pública',
    bajada: 'Para dirigentes sociales.',
    detalle:
      'Una guía práctica para relacionarnos con instituciones y autoridades: a qué organismo acudir según el problema, cómo lograr que nos escuchen y qué hacer antes, durante y después de una reunión. En permanente construcción, alimentada de la experiencia de quienes han peleado por causas justas. Edición 2025.',
    imagen: '/actividades/guia-incidencia-portada.jpg',
    alt: 'Portada de la guía ¿Cómo nos hacemos escuchar? Guía práctica para relacionarnos con instituciones y autoridades, edición 2025',
  },
  {
    titulo: '¡Dona un libro, abre un mundo!',
    bajada: 'Por una librería infantil y juvenil para La Chimba.',
    detalle:
      'Una librería comunitaria donde niñas, niños y jóvenes accedan gratis a las lecturas obligatorias del liceo y a los libros que despierten su imaginación. Organiza el LIAT junto al Comité de Vivienda San Andrés.',
    imagen: '/actividades/dona-un-libro.jpg',
    alt: 'Afiche de la campaña ¡Dona un libro, abre un mundo! por una librería infantil y juvenil para La Chimba',
  },
  {
    titulo: 'Taller gratuito de Inteligencia Artificial',
    bajada: 'Para dirigentes sociales, en Antofagasta.',
    detalle:
      'Cómo estructurar y comunicar proyectos con claridad usando herramientas gratuitas y fáciles de usar, sin necesidad de ser experto en tecnología. Realizado en la Junta Vecinal La Cañada 160.',
    imagen: '/actividades/taller-ia-dirigentes.jpg',
    alt: 'Afiche del taller gratuito de inteligencia artificial para dirigentes sociales',
  },
  {
    titulo: 'La inteligencia artificial llegó al barrio',
    bajada: 'Cobertura del taller en #LaVozDelBarrio.',
    detalle:
      'Un taller gratuito de IA reunió a dirigentes sociales para impulsar proyectos comunitarios.',
    imagen: '/actividades/ia-llego-al-barrio.jpg',
    alt: 'Dirigentes sociales asistiendo al taller de inteligencia artificial, con el facilitador frente a una proyección',
  },
  {
    titulo: 'Curso de Empleabilidad para Mujeres',
    bajada: 'Tres módulos de formación, gratuito, en Antofagasta.',
    detalle:
      'Reconocer y evaluar oportunidades laborales en Antofagasta, preparar entrevistas y currículum, y trabajar opciones de vestuario y presentación personal con ropa que cada participante puede llevarse al terminar. Impartido por talleristas expertos en el área laboral.',
    imagen: '/actividades/curso-empleabilidad-mujeres.jpg',
    alt: 'Afiche del Curso de Empleabilidad para Mujeres',
  },
  {
    titulo: 'Sororidad que viste',
    bajada: 'Campaña de recolección de ropa.',
    detalle:
      'Recolección de ropa formal para que las participantes del Curso de Empleabilidad para Mujeres puedan elegirla para su primera entrevista o día de trabajo.',
    imagen: '/actividades/sororidad-que-viste.jpg',
    alt: 'Afiche de la campaña de recolección de ropa Sororidad que viste',
  },
]

export const momentum: readonly Hito[] = [
  { texto: 'Mapeamos organizaciones aliadas.', estado: 'hecho' },
  { texto: 'Diseñamos e implementamos herramientas de diagnóstico territorial.', estado: 'hecho' },
  { texto: 'Elaboramos y lanzamos La Súper Guía.', estado: 'hecho' },
  { texto: 'Diseñamos y consolidamos la estructura organizacional.', estado: 'hecho' },
  { texto: 'Iniciamos la definición de misión, visión y estrategia 2026.', estado: 'hecho' },
  { texto: 'Lanzaremos nuestras redes oficiales y primeros contenidos.', estado: 'proximo' },
  { texto: 'Publicaremos el primer paper del Centro de Pensamiento.', estado: 'proximo' },
  { texto: 'Iniciaremos la primera actividad pública de TXH.', estado: 'proximo' },
]

export const seccionesMedio: readonly SeccionMedio[] = [
  { hashtag: '#DobleClic', color: 'var(--color-pop-blue)' },
  { hashtag: '#PuntoDeVista', color: 'var(--color-pop-purple)' },
  { hashtag: '#EscenaNorte', color: 'var(--color-pop-clay)' },
  { hashtag: '#LaVozDelBarrio', color: 'var(--color-pop-green)' },
  { hashtag: '#Quées', color: 'var(--color-amber)' },
  { hashtag: '#ParaElDebate', color: 'var(--color-pop-blue)' },
  { hashtag: '#EsIdeología', color: 'var(--color-pop-clay)' },
]

/**
 * Feed de Instagram de @todoxdecir.cl vía LightWidget.
 *
 * Instagram no deja leer los posts de un perfil sin sesión iniciada, así que
 * el feed lo sirve LightWidget, que se conecta a la cuenta y se actualiza
 * solo. El widget se administra desde la cuenta de LightWidget, no desde acá.
 *
 * OJO con el dominio del iframe: tiene que ser `cdn.lightwidget.com`. El
 * dominio sin `cdn.` responde "Widget add-on required" cuando se pide por
 * HTTPS, que es como va a correr el sitio en producción.
 */
export const feedInstagram = {
  script: 'https://cdn.lightwidget.com/widgets/lightwidget.js',
  iframe: 'https://cdn.lightwidget.com/widgets/f51e728a3ae156979f2608bcb3aeed4e.html',
  /** Alto inicial, antes de que el script del widget ajuste el iframe. */
  altoInicial: 420,
} as const

export const cta = {
  kicker: 'Tu incorporación ahora es crítica',
  titulo: 'Súmate a construir porque aún queda todo por hacer',
  bajada:
    'Tu mirada, compromiso y convicción son esenciales para lo que viene. Frente a la crisis democrática y el avance de proyectos excluyentes, apostamos a la producción de conocimiento crítico y al fortalecimiento de las luchas colectivas.',
  remate: 'Creemos en la imaginación política, en la investigación rigurosa y en la fuerza de la acción social.',
  boton: 'Suscríbete',
} as const

export interface Red {
  readonly cuenta: string
  readonly url: string
  /** A qué marca pertenece la cuenta. */
  readonly de: 'txh' | 'medio'
}

export const contacto = {
  email: 'contacto.todoxhacer@gmail.com',
} as const

export const redes: readonly Red[] = [
  { cuenta: '@todoxhacer.cl', url: 'https://www.instagram.com/todoxhacer.cl/', de: 'txh' },
  { cuenta: '@todoxdecir.cl', url: 'https://www.instagram.com/todoxdecir.cl/', de: 'medio' },
]

/**
 * Datos que el material de `info/landing/` NO contiene y que hay que
 * completar antes de publicar. Se dejan visibles a propósito en vez de
 * inventarlos.
 */
export const PENDIENTE = {
  /** Formulario de Google al que apunta el CTA "Suscríbete". */
  urlFormularioSuscripcion:
    'https://docs.google.com/forms/d/e/1FAIpQLSe_sGu87KXgdfB0FNMC_oE-ZvsTNoVRdk7PW3iiUwMDe0Tjhg/viewform',
  direccionOSede: null,
} as const

/**
 * Destino único del CTA principal. Mientras no exista el formulario de Google,
 * cae al correo de contacto: un botón muerto es peor que un mailto.
 */
export const hrefSuscripcion: string =
  PENDIENTE.urlFormularioSuscripcion ??
  `mailto:${contacto.email}?subject=${encodeURIComponent('Quiero suscribirme a TXH')}`

export const suscripcionEsProvisoria = PENDIENTE.urlFormularioSuscripcion === null
