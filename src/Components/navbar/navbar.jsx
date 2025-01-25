import React, { useState } from 'react';
import './navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Shirt, User, Baby, LogIn, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo" />
        <p>BTK-SHOP</p>
      </div>

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

        {/* Affichage du bouton Login et Dark Mode uniquement dans le menu mobile */}
        {isMobileMenuOpen && (
          <>
            <li className="mobile-login" onClick={closeMobileMenu}>
              <Link to="/login">
                <button>
                  <LogIn size={16} style={{ marginRight: '8px' }} />
                  Login
                </button>
              </Link>
            </li>
            <li className="mobile-dark-mode" onClick={toggleDarkMode}>
              <button>
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Affichage du bouton Login et Dark Mode dans la vue PC uniquement */}
      <div className="nav-login-cart">
        <Link to="/login" className="login-button">
          <button>
            <LogIn size={16} style={{ marginRight: '8px' }} />
            Login
          </button>
        </Link>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link to="/cart">
          <img
            src={cart_icon}
            alt="Cart Icon"
            className={`nav-cart-icon ${isDarkMode ? 'dark-mode' : ''}`} // Classe conditionnelle
          />
        </Link>
        <div className="nav-cart-count">0</div>

        {/* Icône de menu mobile */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;