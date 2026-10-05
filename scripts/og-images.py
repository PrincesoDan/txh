"""
Genera las imágenes para compartir (og:image) en `public/og/`, 1200×630.

Es el tamaño que recomiendan Meta, LinkedIn y X para la tarjeta grande. Usa
las fuentes y logos del kit de marca que ya están en `public/`.

    npm run og          # o: python3 scripts/og-images.py

Requiere Pillow. Se corre a mano cuando cambia el copy: las imágenes quedan
versionadas en el repo, así el build de Vercel no depende de Python.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
PUBLIC = RAIZ / "public"
SALIDA = PUBLIC / "og"

W, H = 1200, 630
PAPER = "#FAF5F3"
INK = "#1F2018"
RED = "#EF5341"
AMBER = "#FFBC36"

ANTON = str(PUBLIC / "fonts/Anton-Regular.ttf")
LONDRINA = str(PUBLIC / "fonts/LondrinaSolid-Regular.ttf")
LONDRINA_BLACK = str(PUBLIC / "fonts/LondrinaSolid-Black.ttf")


def fuente(ruta: str, tam: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(ruta, tam)


def mancha(img: Image.Image, centro: tuple[int, int], radio: int, color: str, alfa: int) -> None:
    """Círculo difuso de color, como los blur del hero de la web."""
    from PIL import ImageFilter

    capa = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    r, g, b = Image.new("RGB", (1, 1), color).getpixel((0, 0))
    x, y = centro
    d.ellipse((x - radio, y - radio, x + radio, y + radio), fill=(r, g, b, alfa))
    capa = capa.filter(ImageFilter.GaussianBlur(radio // 2))
    img.alpha_composite(capa)


def pegar_logo(img: Image.Image, archivo: str, caja: tuple[int, int, int, int]) -> None:
    """Pega el logo escalado para caber en `caja` (x, y, ancho, alto), centrado."""
    logo = Image.open(PUBLIC / archivo).convert("RGBA")
    x, y, w, h = caja
    logo.thumbnail((w, h), Image.LANCZOS)
    img.alpha_composite(logo, (x + (w - logo.width) // 2, y + (h - logo.height) // 2))


def texto_partido(d: ImageDraw.ImageDraw, texto: str, f: ImageFont.FreeTypeFont, ancho: int) -> list[str]:
    lineas, actual = [], ""
    for palabra in texto.split():
        prueba = f"{actual} {palabra}".strip()
        if d.textlength(prueba, font=f) <= ancho:
            actual = prueba
        else:
            lineas.append(actual)
            actual = palabra
    return lineas + [actual]


def destacador(d: ImageDraw.ImageDraw, xy: tuple[int, int], texto: str, f, fondo: str, tinta: str) -> int:
    """El "rectángulo atrás de la tipografía" del manual. Devuelve el alto usado."""
    x, y = xy
    l, t, r, b = d.textbbox((x, y), texto, font=f)
    d.rectangle((l - 12, t - 8, r + 12, b + 10), fill=fondo)
    d.text((x, y), texto, font=f, fill=tinta)
    return b - y + 10


def lienzo(fondo: str) -> Image.Image:
    return Image.new("RGBA", (W, H), fondo)


def guardar(img: Image.Image, nombre: str) -> None:
    SALIDA.mkdir(exist_ok=True)
    ruta = SALIDA / nombre
    img.convert("RGB").save(ruta, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"og  {ruta.relative_to(RAIZ)}  {ruta.stat().st_size // 1024} KB")


def pie(d: ImageDraw.ImageDraw, color: str, texto: str = "todoxhacer.cl") -> None:
    d.text((W - 60, H - 48), texto, font=fuente(LONDRINA, 30), fill=color, anchor="rs")


# ------------------------------------------------------------------ inicio


def inicio() -> None:
    img = lienzo(INK)
    mancha(img, (1080, 40), 300, RED, 90)
    mancha(img, (80, 640), 260, AMBER, 50)
    d = ImageDraw.Draw(img)

    pegar_logo(img, "brand/todoxhacer-claro.png", (40, 130, 380, 300))

    x, y = 500, 70
    f = fuente(ANTON, 112)
    for i, linea in enumerate(["PENSAR,", "DISPUTAR", "Y ORGANIZAR."]):
        d.text((x, y), linea, font=f, fill=RED if i == 1 else PAPER)
        y += 122
    destacador(d, (x + 4, y + 26), "Sigamos haciendo política.", fuente(LONDRINA, 50), AMBER, INK)
    pie(d, PAPER)
    guardar(img, "inicio.jpg")


# -------------------------------------------------------------- pilares


def pilar(nombre: str, logo: str, fondo: str, tinta: str, titulo: list[str], bajada: str, acento: str) -> None:
    img = lienzo(fondo)
    if fondo == INK:
        mancha(img, (1100, 20), 300, acento, 80)
    d = ImageDraw.Draw(img)

    pegar_logo(img, logo, (40, 135, 380, 300))

    x, ancho = 460, W - 460 - 60
    f_titulo = fuente(ANTON, 84 if len(titulo) <= 2 else 70)
    alto_linea = int(f_titulo.size * 1.08)
    f_bajada = fuente(LONDRINA, 42)
    lineas_bajada = texto_partido(d, bajada, f_bajada, ancho)

    # Centrado vertical del bloque título + bajada.
    alto = alto_linea * len(titulo) + 44 + 54 * len(lineas_bajada)
    y = (H - alto) // 2 - 10
    for linea in titulo:
        d.text((x, y), linea, font=f_titulo, fill=tinta)
        fondo_titulo = d.textbbox((x, y), linea, font=f_titulo)[3]
        y += alto_linea
    # La barra va bajo el borde real del texto: Anton baja más que su `size`.
    d.rectangle((x, fondo_titulo + 16, x + 90, fondo_titulo + 24), fill=acento if fondo == INK else INK)
    y = fondo_titulo + 44
    for linea in lineas_bajada:
        d.text((x, y), linea, font=f_bajada, fill=tinta)
        y += 54

    pie(d, tinta)
    guardar(img, nombre)


if __name__ == "__main__":
    inicio()
    pilar(
        "centro-de-pensamiento.jpg",
        "brand/todoxhacer-sobre-amber.png",
        AMBER,
        INK,
        ["CENTRO DE", "PENSAMIENTO"],
        "Produce conocimiento aplicado y datos para disputar sentido.",
        RED,
    )
    pilar(
        "todoxdecir.jpg",
        "brand/todoxdecir.png",
        INK,
        PAPER,
        ["PORQUE TODAVÍA", "QUEDA TODO", "POR DECIR"],
        "Medio de comunicación regional independiente, crítico y creativo.",
        RED,
    )
    pilar(
        "laboratorio.jpg",
        "brand/todoxhacer-claro.png",
        INK,
        PAPER,
        ["LABORATORIO DE", "INNOVACIÓN Y ACCIÓN", "TERRITORIAL"],
        "Experimenta, organiza y acompaña comunidades.",
        AMBER,
    )
