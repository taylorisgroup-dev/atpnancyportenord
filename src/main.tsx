import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContentProvider } from './cms/ContentContext'
import { AuthProvider } from './lib/AuthContext'
import { registerSW } from 'virtual:pwa-register'
import './index.css'

// Enregistrement explicite du Service Worker pour la PWA
if ('serviceWorker' in navigator) {
  registerSW({ immediate: true })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </AuthProvider>
  </React.StrictMode>,
)
