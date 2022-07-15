import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart"*/ './pages/Cart'),
  loading: () => <div>Подождите немного, корзина загружается...</div>,
});

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense
                fallback={<div>Подождите немного, идет загрузка...</div>}
              >
                <Cart />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
