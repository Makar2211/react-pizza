import './scss/app.scss';
import { Home } from './pages/Home';
import { FullPizza } from './pages/FullPizza';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layounts/MainLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='pizza/:id' element={<FullPizza />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
