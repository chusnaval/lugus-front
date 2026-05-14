import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import "@fontsource-variable/inter/index.css"



import './index.css'
import App from './App.tsx'
import { ToastProvider } from "./components/ui/ToastContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>,
)
