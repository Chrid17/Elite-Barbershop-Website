import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { ThemeProvider } from 'next-themes'   // example
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">   {/* <-- or whatever provider you use */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)