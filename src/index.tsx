import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/k2d';
import '@fontsource/readex-pro';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';


// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// index.tsx


const keycloak = new (Keycloak as any)({
  url: 'http://localhost:8001',
  realm: 'aicodelab-realm',
  clientId: 'aicodelab-client',
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={{
    onLoad: 'login-required',
    checkLoginIframe: false,
  }}>
    <App />
  </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
