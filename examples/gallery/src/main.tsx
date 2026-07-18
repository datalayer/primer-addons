import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupPrimerPortals } from '@datalayer/primer-addons';
import App from './App';
import './index.css';

setupPrimerPortals();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);