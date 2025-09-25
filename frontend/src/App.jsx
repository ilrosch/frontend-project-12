import { BrowserRouter, Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import PageChat from './components/PageChat';
import PageLogin from './components/PageLogin';
import PageNotFond from './components/PageNotFond';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageChat />} />
        <Route path='/login' element={<PageLogin />} />
        <Route path='*' element={<PageNotFond />} />
      </Routes>
    </BrowserRouter>
  );
}
