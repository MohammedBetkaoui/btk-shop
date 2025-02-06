import React, { useState, useContext } from 'react';
import './navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Shirt, User, Baby, LogIn, LogOut } from 'lucide-react';
import { ShopContext } from '../../Context/shopContext';
import { UserContext } from '../../Context/UserContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useContext(ShopContext);
  const { user, logout } = useContext(UserContext);

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to='/'><img src={logo} alt="Logo" className="logo" /></Link>
        <p>BTK-SHOP</p>
      </div>

      <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/"><ShoppingCart size={16} /> Shop</Link></li>
        <li><Link to="/category/Men"><Shirt size={16} /> Men</Link></li>
        <li><Link to="/category/Women"><User size={16} /> Women</Link></li>
        <li><Link to="/category/Kids"><Baby size={16} /> Kids</Link></li>
        {user ? (
          <li className="mobile-login-button" onClick={logout}>
            <Link to="/"><LogOut size={16} /> Logout</Link>
          </li>
        ) : (
          <li className="mobile-login-button">
            <Link to="/login"><LogIn size={16} /> Login</Link>
          </li>
        )}
      </ul>

      <div className="nav-actions">
        {user ? (
          <button className="login-button" onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <Link to="/login" className="login-button">
            <button><LogIn size={16} /> Login</button>
          </Link>
        )}
        <Link to="/cart" className="cart-icon">
          <img src={cart_icon} alt="Cart" />
          <span className="cart-count">{getTotalCartItems()}</span>
        </Link>
      </div>

      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default Navbar;