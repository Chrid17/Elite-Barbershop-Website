import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <App />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  </React.StrictMode>,
)