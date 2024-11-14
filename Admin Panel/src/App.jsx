import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Orders from './pages/Orders';
import Product from './pages/Product';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />}/>
        <Route path="/products" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
