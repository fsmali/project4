import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
document.cookie =
  'session_id=1234; expires=' +
  new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString() +
  '; path=/';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>,
)
