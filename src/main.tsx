import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthentificationProvider } from './contexte/AuthentificationContexte';
import App from './App';
import './i18n/config';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthentificationProvider>
        <App />
      </AuthentificationProvider>
    </BrowserRouter>
  </StrictMode>
);