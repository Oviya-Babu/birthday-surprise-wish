import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Note: StrictMode removed — StrictMode double-invokes effects in dev which
// breaks timing-sensitive animations in this experience.
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
