# Landing TXH — todoxhacer

Propuesta de landing page para **TXH (todoxhacer)** como organización paraguas,
mostrando sus tres patas: Centro de Pensamiento, todoxdecir (el medio) y
Laboratorio de Innovación y Acción Territorial.

Stack: **Vite 8 + React 19 + TypeScript + Tailwind v4**.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # -> dist/
```

## Estructura

Cuatro rutas, con `react-router-dom`:

| Ruta                     | Página                              |
| ------------------------ | ----------------------------------- |
| `/`                      | Landing de TXH                      |
| `/centro-de-pensamiento` | Centro de Pensamiento               |
| `/todoxdecir`            | El medio                            |
| `/laboratorio`           | Laboratorio de Innovación y Acción  |

```
src/
  content.ts              Fuente única de contenido. Todo el copy sale del material.
  App.tsx                 Router + Nav + Footer comunes
  pages/
    Landing.tsx           Hero → Tiles → Manifiesto → Identidad → Estructura
                          → Principios → Incidencia → CTA
    CentroDePensamiento.tsx
    Todoxdecir.tsx
    Laboratorio.tsx
  components/
    Section.tsx           Wrapper de sección + <SectionTitle> + <Kicker>
    Nav.tsx               Barra fija con los 3 pilares + Suscríbete
    Hero.tsx              "Pensar, disputar y organizar"
    PilarTiles.tsx        Los 3 tiles que derivan a las páginas de cada pilar
    PageHero.tsx          Cabecera común de las 3 páginas de pilar
    Manifiesto.tsx        ¿Por qué existimos?
    Identidad.tsx         Misión / Visión / Objetivo general
    Estructura.tsx        Las tres patas (tarjetas enlazadas)
    Medio.tsx             Secciones de todoxdecir (#DobleClic, etc.)
    Principios.tsx        Principios + áreas de trabajo
    Incidencia.tsx        Formas de acción e incidencia
    Momentum.tsx          PARQUEADO: se sacó del landing, no se renderiza
    CentroObjetivo.tsx    "Nuestro objetivo" (PPT CP, slide 5)
    CentroCierre.tsx      Cierre del PPT CP (slide 8)
    Columnas.tsx          Columnas publicadas en CIPER
    GuiaDescarga.tsx      Descarga de la guía de incidencia
    Actividades.tsx       Afiches de actividades del Laboratorio
    CtaFinal.tsx          Suscríbete + redes
    Footer.tsx
    Instagram.tsx         <EnlaceRed> con ícono SVG inline
public/
  brand/                  Logos (PNG con transparencia)
  fonts/                  Anton + Londrina Solid (OFL, del kit de marca)
  docs/                   Guía de incidencia (PDF descargable)
  actividades/            Afiches de las actividades del Laboratorio
  columnas/               Portadas de los artículos publicados
```

## Assets pesados

- **La guía** `info/productos/Guía ¿Cómo nos hacemos escuchar_.pdf` pesa **197 MB**,
  inservible para descarga web. Se recomprimió con Ghostscript (`-dPDFSETTINGS=/ebook`)
  a **9 MB** conservando las 52 páginas y la legibilidad, y quedó en
  `public/docs/guia-como-nos-hacemos-escuchar.pdf`. El original no se tocó.
- **Los afiches** se redimensionaron a 900 px de ancho y se guardaron como JPEG
  progresivo (~150 KB cada uno) en `public/actividades/`.
- **Las portadas de las columnas** se bajaron del `og:image` de cada artículo y
  se guardaron en `public/columnas/` a 800 px. Se guardan en local a propósito:
  enlazarlas en caliente rompe cuando el medio cambia la URL y consume su ancho
  de banda. La de El Ciudadano vino del archivo en `info/`, porque su sitio está
  tras Cloudflare y responde 403 a la descarga directa.

En `Columna`, el campo `imagen` es opcional: mientras sea `null` la tarjeta cae
al bloque de color en vez de quedar rota.

**Deploy:** es una SPA con rutas reales. El host tiene que reescribir todas las
rutas a `index.html`, si no `/todoxdecir` da 404 al recargar.

## Sistema de diseño

Definido en `src/index.css` con `@theme` de Tailwind v4.

| Token             | Valor     | Origen                                        |
| ----------------- | --------- | --------------------------------------------- |
| `paper`           | `#FAF5F3` | Fondo del manual TodoxDecir                   |
| `ink`             | `#1F2018` | Verde oliva oscuro del manual                 |
| `red`             | `#EF5341` | Rojo principal, hex explícito en el manual    |
| `amber`           | `#FFBC36` | Amarillo del logo todoxhacer                  |
| `pop-purple/clay/blue/green` | `#7C279B` `#AB5B41` `#0856BD` `#438B70` | "Pops" de color del manual, p.3 |

Tipografía: **Anton** para titulares (`font-display`), **Londrina Solid** en sus
cuatro pesos para cuerpo y etiquetas (`font-brand`). Ambas vienen del zip del kit.

Clases de marca traducidas del manual:

- `.destacador` / `.destacador-amber` — "rectángulo atrás de la tipografía para
  hacer un efecto de destacador" (manual, p.3).
- `.torn-top` / `.torn-bottom` — bordes de papel rasgado entre secciones.
- `.paper-grain` — textura de papel, generada con gradientes (sin imagen externa).

## Logos: qué se les hizo

Los originales en `info/landing/` están intactos. Las copias en `public/brand/`
llevan tres cambios:

1. **Se borró el "A F T A" incrustado** en la imagen, por pedido explícito.
2. **Se recortó el margen transparente** para que rindan a tamaño chico.
3. Se generó `todoxhacer-sobre-amber.png`, una variante del logo oscuro con el
   "xhacer" en crema: el ámbar original se pierde sobre el tile ámbar del
   Centro de Pensamiento.

Además, `info/landing/TodoxDecirOscuro.png` **está mal nombrado**: contiene el
logo de _todoxhacer_ en versión oscura, no el de _todoxdecir_. Acá se copió como
`public/brand/todoxhacer-oscuro.png`.

## Pendientes (no estaban en el material)

Están tipados en `PENDIENTE` al final de `src/content.ts` y se marcan de forma
visible en la página, en vez de inventar datos:

- `urlFormularioSuscripcion` — el formulario de Google al que apunta "Suscríbete".
- `direccionOSede`.

**Feed de Instagram:** lo sirve LightWidget desde `cdn.lightwidget.com`. Ese
subdominio importa: la misma URL sin `cdn.` responde *"Widget add-on required"*
cuando se pide por HTTPS. Si alguna vez el feed aparece con ese aviso, es eso.

Ojo con esto: **Principios e Incidencia salen en dos lugares** — en el landing
y en la página del Centro de Pensamiento. Se pidió sacar del landing solo el
medio y el momentum, así que quedaron duplicados. Es contenido del PPT del
Centro, así que lo natural sería dejarlo solo en su página.

Ya definidos: `contacto.email` (`contacto.todoxhacer@gmail.com`) y `redes`
(Instagram `@todoxhacer.cl` y `@todoxdecir.cl`).

## El CTA "Suscríbete"

El destino es **uno solo** para toda la página: `hrefSuscripcion` en
`src/content.ts`, usado por el botón del nav, el del hero y el del cierre.

Mientras `PENDIENTE.urlFormularioSuscripcion` sea `null`, cae a un `mailto:` al
correo de contacto y la sección de cierre muestra un aviso de que es provisorio.
Para conectar el formulario de Google basta pegar la URL ahí: los tres botones y
el aviso se actualizan solos.

## Fuentes del contenido

- `info/landing/TodoxHacerPresentación.pdf` — manifiesto, identidad, tres patas, momentum.
- `info/landing/PPT CP Invitación.pptx` — principios, áreas de trabajo, formas de incidencia.
- `info/landing/TodoxDecirManual.pdf` — paleta, tipografías, secciones del medio, tagline.
- `info/columnas/*.docx` — títulos y autoría reales de las dos columnas de CIPER.
- `info/productos/` — la guía de incidencia y los afiches de las actividades.
