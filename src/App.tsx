import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { CentroDePensamiento } from './pages/CentroDePensamiento'
import { Laboratorio } from './pages/Laboratorio'
import { Landing } from './pages/Landing'
import { Todoxdecir } from './pages/Todoxdecir'

/** Al cambiar de ruta el navegador conserva el scroll: lo devolvemos arriba. */
function ScrollAlTope() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollAlTope />
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
    </BrowserRouter>
  )
}

export default App
