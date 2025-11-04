import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './ui/App.jsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(()=>{})
  })
}

createRoot(document.getElementById('root')).render(<App />)
