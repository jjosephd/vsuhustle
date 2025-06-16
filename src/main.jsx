import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/auth/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <App />
      </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
