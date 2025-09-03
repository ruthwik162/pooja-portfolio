import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NavContext } from './Context/NavContext.jsx'
import SmoothScroll from './Component/SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavContext>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </NavContext>

  </BrowserRouter>,
)
