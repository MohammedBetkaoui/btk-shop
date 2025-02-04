import React from 'react';
import './App.css';
import Navbar from './Components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/shop';
import Product from './Pages/product';
import LoginSignup from './Pages/loginSignup';
import ShopCategory from './Pages/shopCategory';
import Cart from './Pages/cart';
import Footer from './Components/footer/footer';
import men_banner from './Components/assets/banner_mens.png';
import women_banner from './Components/assets/banner_women.png';
import kids_banner from './Components/assets/banner_kids.png';
import { UserProvider } from './Context/UserContext';

const banners = {
  men: men_banner,
  women: women_banner,
  kids: kids_banner
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/category/:category" element={<ShopCategory banners={banners} />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
