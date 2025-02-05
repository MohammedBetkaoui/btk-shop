export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [all_product, setAllProduct] = useState([]);

  // Charger le panier au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCart();
    }
  }, []);

  const addToCart = async (numericId, size, quantity = 1) => {
    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId: numericId, quantity, size }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      } else {
        throw new Error(data.message || 'Erreur lors de l\'ajout au panier');
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.message);
    }
  };

  const getCart = async () => {
    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Convertir en format frontend
        const formattedCart = data.cart.reduce((acc, item) => {
          acc[item.productId] = acc[item.productId] || {};
          acc[item.productId][item.size] = { quantity: item.quantity };
          return acc;
        }, {});
        setCart(formattedCart);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const removeFromCart = async (numericId, size) => {
    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId: numericId, size }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const contextValue = { 
    all_product, 
    cart, 
    addToCart, 
    removeFromCart, 
    getCart,
    setAllProduct 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};