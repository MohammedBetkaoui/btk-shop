import React, { createContext, useState, useEffect } from "react";
import all_product from '../Components/assets/all_product';

export const ShopContext = createContext(null); 

const getDefultCart = () => {
  let cart = {};
  for (let i = 1; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = ({ children }) => { 
  const [cart, setCart] = useState(getDefultCart());

  useEffect(() => {
    console.log(cart); 
  }, [cart]);

  const addToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = { all_product, cart, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;