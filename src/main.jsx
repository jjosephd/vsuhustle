import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/auth/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
