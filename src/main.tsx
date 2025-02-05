import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './index.css'
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './providers/ToastContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ToastProvider>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
