import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState(getDefaultCart());
  const [all_product, setAllProduct] = useState([]);

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

  const addToCart = async (itemId, size, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return; // Redirect handled in ProductDisplay
    }

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: itemId, quantity, size }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error("Error getting cart:", error);
    }
  };

  const removeFromCart = async (itemId, size) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: itemId, size }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const contextValue = { all_product, cart, addToCart, removeFromCart, getCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;