import React, { useContext, useState, useEffect } from 'react';
import './cartitems.css';
import { ShopContext } from '../../Context/shopContext';
import { FaTrash } from 'react-icons/fa';

const Cartitems = () => {
  const { cart, updateCart, removeFromCart } = useContext(ShopContext);
  const [total, setTotal] = useState(0);
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => 
      acc + (item.price * item.quantity), 0
    );
    setTotal(newTotal.toFixed(2));
  }, [cart]);

  const handleQuantityChange = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    const key = `${productId}-${size}`;
    try {
      setUpdatingItems(prev => ({ ...prev, [key]: true }));
      await updateCart(productId, size, newQuantity);
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setUpdatingItems(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleRemoveItem = async (productId, size) => {
    const key = `${productId}-${size}`;
    try {
      setUpdatingItems(prev => ({ ...prev, [key]: true }));
      await removeFromCart(productId, size);
    } catch (error) {
      console.error("Erreur de suppression :", error);
    } finally {
      setUpdatingItems(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="cartitems">
      <table className="cartitems-table">
        <thead>
          <tr>
            <th className="remove">Supprimer</th>
            <th>Produit</th>
            <th>Nom</th>
            <th>Taille</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item) => {
              const itemKey = `${item.productId}-${item.size}`;
              const isUpdating = updatingItems[itemKey];

              return (
                <tr key={itemKey} className={isUpdating ? 'loading-row' : ''}>
                  <td data-label="Supprimer">
                    {isUpdating ? (
                      <div className="loading-spinner small"></div>
                    ) : (
                      <FaTrash
                        className="cartitems-remove-icon"
                        onClick={() => handleRemoveItem(item.productId, item.size)}
                        style={{ cursor: 'pointer', color: '#ff4d4f' }}
                      />
                    )}
                  </td>
                  <td data-label="Produit">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cartitems-image" 
                    />
                  </td>
                  <td data-label="Nom">{item.name}</td>
                  <td data-label="Taille">{item.size}</td>
                  <td data-label="Prix">{item.price?.toFixed(2)}</td>
                  <td data-label="Quantité">
                    <div className="cartitems-quantity-wrapper">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.size, item.quantity - 1)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? <div className="loading-spinner"></div> : '-'}
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = Math.max(1, parseInt(e.target.value) || 1);
                          handleQuantityChange(item.productId, item.size, qty);
                        }}
                        disabled={isUpdating}
                      />
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.size, item.quantity + 1)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? <div className="loading-spinner"></div> : '+'}
                      </button>
                    </div>
                  </td>
                  <td data-label="Total">
                    {((item.price || 0) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="cartitems-empty">
                Votre panier est vide
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {cart.length > 0 && (
        <div className="cartitems-summary">
          <h3>Récapitulatif du panier</h3>
          <div className="summary-total">
            <span>Total :</span>
            <span>{total}</span>
          </div>
          <button 
            className="cartitems-checkout-button"
            onClick={() => alert('Redirection vers le paiement...')}
          >
            Passer la commande
          </button>
        </div>
      )}
    </div>
  );
};

export default Cartitems;
