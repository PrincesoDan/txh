import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { CentroDePensamiento } from './pages/CentroDePensamiento'
import { Laboratorio } from './pages/Laboratorio'
import { Landing } from './pages/Landing'
import { Todoxdecir } from './pages/Todoxdecir'
import { absoluta, metaDeRuta } from './seo'

/** Al cambiar de ruta el navegador conserva el scroll: lo devolvemos arriba. */
function ScrollAlTope() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

/**
 * Mantiene título, descripción y canonical al navegar dentro de la SPA. La
 * primera carga ya trae todo en el HTML prerenderizado: esto solo cubre los
 * cambios de ruta del lado del cliente.
 */
function MetaDeRuta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaDeRuta(pathname)
    document.title = meta.titulo
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.descripcion)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', absoluta(meta.ruta))
  }, [pathname])

  return null
}

/** El árbol de la app sin router: lo envuelven `main.tsx` y `entry-server.tsx`. */
function App() {
  return (
    <>
      <ScrollAlTope />
      <MetaDeRuta />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/centro-de-pensamiento" element={<CentroDePensamiento />} />
          <Route path="/todoxdecir" element={<Todoxdecir />} />
          <Route path="/laboratorio" element={<Laboratorio />} />
          {/* Cualquier ruta desconocida cae al landing. */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
