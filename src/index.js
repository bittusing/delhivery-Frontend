import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ShippingModeProvider } from './context/ShippingModeContext';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <AuthProvider>
    <ShippingModeProvider>
      <App />
    </ShippingModeProvider>
  </AuthProvider>
);

root.render(
  <React.StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider>
    ) : (
      app
    )}
  </React.StrictMode>
);

