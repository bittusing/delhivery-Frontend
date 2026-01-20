import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ShippingModeProvider } from './context/ShippingModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ShippingModeProvider>
        <App />
      </ShippingModeProvider>
    </AuthProvider>
  </React.StrictMode>
);

