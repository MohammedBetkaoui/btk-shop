import React, { createContext, useState, useEffect, useCallback } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [all_product, setAllProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCart([]);
      return;
    }

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erreur de récupération du panier');
      
      const data = await response.json();
      if (data.success) {
        setCart(data.cart.map(item => ({
          ...item,
          price: item.price || 0,
          image: item.image || '',
          name: item.name || 'Produit inconnu'
        })));
      }
    } catch (error) {
      console.error("Error getting cart:", error);
      setError(error.message);
      setCart([]);
    }
  }, []);

  const addToCart = useCallback(async (productId, size, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity, size }),
      });

      if (!response.ok) throw new Error('Erreur d\'ajout au panier');
      await getCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(error.message);
    }
  }, [getCart]);

  const updateCart = useCallback(async (productId, size, quantity) => {
    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, size, quantity })
      });

      if (!response.ok) throw new Error('Erreur de mise à jour');
      await getCart();
    } catch (error) {
      console.error("Update error:", error);
    }
  }, [getCart]);

  const removeFromCart = useCallback(async (productId, size) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size }),
      });

      if (!response.ok) throw new Error('Erreur de suppression');
      await getCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
      setError(error.message);
    }
  }, [getCart]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const productsResponse = await fetch('https://backend-btk-shop.onrender.com/products');
        if (!productsResponse.ok) throw new Error('Erreur de chargement des produits');
        
        const productsData = await productsResponse.json();
        setAllProduct(productsData.products || []);

        if (localStorage.getItem('token')) await getCart();
      } catch (error) {
        console.error('Initialization error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [getCart]);

  const value = {
    all_product,
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    getCart,
    updateCart
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};