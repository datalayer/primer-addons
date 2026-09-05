import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// No `setupPrimerPortals()` here: the theme plugin sets the portal root up
// when the reactor starts, and keeps it in the color mode the appearance
// menu chooses.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
