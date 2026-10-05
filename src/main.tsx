import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const raiz = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// En producción cada ruta llega prerenderizada (ver `scripts/prerender.mjs`):
// se hidrata ese HTML. En `npm run dev` el root viene vacío y se monta normal.
if (raiz.firstElementChild) hydrateRoot(raiz, app)
else createRoot(raiz).render(app)
