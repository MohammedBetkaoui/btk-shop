import React, { useState, useContext } from 'react';
import './navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Shirt, User, Baby, LogIn } from 'lucide-react';
import { ShopContext } from '../../Context/shopContext'; // Importez ShopContext

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Accédez au panier depuis le contexte
  const { cart } = useContext(ShopContext);

  // Calculez le nombre total d'articles dans le panier
  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to='/'><img src={logo} alt="Logo" className="logo" /></Link>
        <p>BTK-SHOP</p>
      </div>

      {/* Menu principal */}
      <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <li onClick={() => { setMenu('shop'); closeMobileMenu(); }}>
          <Link to="/">
            <ShoppingCart size={16} /> Shop
          </Link>
          {menu === 'shop' && <hr />}
        </li>
        <li onClick={() => { setMenu('mens'); closeMobileMenu(); }}>
          <Link to="/mens">
            <Shirt size={16} /> Men
          </Link>
          {menu === 'mens' && <hr />}
        </li>
        <li onClick={() => { setMenu('womens'); closeMobileMenu(); }}>
          <Link to="/womens">
            <User size={16} /> Women
          </Link>
          {menu === 'womens' && <hr />}
        </li>
        <li onClick={() => { setMenu('kids'); closeMobileMenu(); }}>
          <Link to="/kids">
            <Baby size={16} /> Kids
          </Link>
          {menu === 'kids' && <hr />}
        </li>

        {/* Bouton de connexion dans le menu mobile */}
        <li className="mobile-login-button" onClick={closeMobileMenu}>
          <Link to="/login">
            <LogIn size={16} style={{ marginRight: '8px' }} />
            Login
          </Link>
        </li>
      </ul>

      {/* Boutons de connexion et panier (version desktop) */}
      <div className="nav-actions">
        <Link to="/login" className="login-button">
          <button>
            <LogIn size={16} style={{ marginRight: '8px' }} />
            Login
          </button>
        </Link>
        <Link to="/cart" className="cart-icon">
          <img src={cart_icon} alt="Cart Icon" />
          {/* Affichez le nombre total d'articles dans le panier */}
          <span className="cart-count">{getTotalCartItems()}</span>
        </Link>
      </div>

      {/* Bouton de menu mobile */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default Navbar;