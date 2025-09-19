import { BrowserRouter, Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import PageHome from './components/PageHome';
import PageLogin from './components/PageLogin';
import PageNotFond from './components/PageNotFond';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageHome />} />
        <Route path='/login' element={<PageLogin />} />
        <Route path='*' element={<PageNotFond />} />
      </Routes>
    </BrowserRouter>
  );
}
