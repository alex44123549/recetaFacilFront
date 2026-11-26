import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvide } from './Components/Context/MetricsContext.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

const fontHref = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap";
const link = document.createElement("link");
link.href = fontHref;
link.rel = "stylesheet";
document.head.appendChild(link);

const style = document.createElement("style");
// Inter para todo, menos lo que lleve la clase "font-marca" (títulos y saludo), que usa Lobster
style.innerHTML = `
  *:not(.font-marca) {
    font-family: "Inter", sans-serif !important;
  }
  .font-marca {
    font-family: "Lobster", cursive !important;
    font-weight: 400 !important;
    letter-spacing: 0.3px;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvide>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvide>
  </StrictMode>
)
