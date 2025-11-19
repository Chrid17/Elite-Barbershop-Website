import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// --- add the providers you actually use ---
import { ThemeProvider } from 'next-themes'   // example
import { Toaster } from 'sonner'              // example

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <App />
      <Toaster />          {/* put Toaster (or any other global) here */}
    </ThemeProvider>
  </React.StrictMode>,
)