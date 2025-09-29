import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import ChatPage from './components/pages/Chat';
import LoginPage from './components/pages/Login';
import SignUpPage from './components/pages/SignUp';
import NotFoundPage from './components/pages/NotFound';

import './i18n';

export default function App() {
  return (
    <Provider
      config={{
        accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        environment: import.meta.env.VITE_ENVIRONMENT,
      }}
    >
      <ErrorBoundary>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<ChatPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}
