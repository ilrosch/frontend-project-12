import { BrowserRouter, Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import ChatPage from './components/pages/Chat';
import LoginPage from './components/pages/Login';
import SingUpPage from './components/pages/SingUp';
import NotFoundPage from './components/pages/NotFound';

import './i18n';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ChatPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/singup' element={<SingUpPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
