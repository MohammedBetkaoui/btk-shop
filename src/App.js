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
import { UserProvider } from './Context/UserContext'; // Importez UserProvider

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider> {/* Ajoutez UserProvider ici */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/women" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kids" />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;