import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Remove StrictMode to check if this is causing the double render
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
