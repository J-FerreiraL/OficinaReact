import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Importa o componente principal da sua aplicação
import './index.css'; // Importa o CSS global

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  
  </StrictMode>
);
