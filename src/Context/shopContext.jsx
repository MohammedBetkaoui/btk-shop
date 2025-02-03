import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 100; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState(getDefaultCart());
  const [all_product, setAllProduct] = useState([]);

  // Récupérer les produits depuis le backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://backend-btk-shop.onrender.com/products');
        const data = await response.json();
        if (data.products) {
          setAllProduct(data.products);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []);

 

  const addToCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Rediriger vers la page de connexion
      return;
    }

    const newCart = { ...cart, [itemId]: cart[itemId] + 1 };
    setCart(newCart);

   
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Rediriger vers la page de connexion
      return;
    }

    const newCart = { ...cart, [itemId]: cart[itemId] - 1 };
    setCart(newCart);

   
  };

  const contextValue = { all_product, cart, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;