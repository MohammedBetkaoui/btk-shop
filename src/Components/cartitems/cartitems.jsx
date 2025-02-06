import React, { useContext, useState, useEffect } from 'react';
import './cartitems.css';
import { ShopContext } from '../../Context/shopContext';
import remove_icon from '../assets/cart_cross_icon.png';

const Cartitems = () => {
  const { cart, updateCart, removeFromCart } = useContext(ShopContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => 
      acc + (item.price * item.quantity), 0
    );
    setTotal(newTotal.toFixed(2));
  }, [cart]);

  const handleQuantityChange = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCart(productId, size, newQuantity);
  };

  const handleRemoveItem = async (productId, size) => {
    await removeFromCart(productId, size);
  };

  return (
    <div className="cartitems">
      <table className="cartitems-table">
        <thead>
          <tr>
            <th>Supprimer</th>
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
            cart.map((item) => (
              <tr key={`${item.productId}-${item.size}`}>
                <td data-label="Supprimer">
                  <img
                    src={remove_icon}
                    alt="supprimer"
                    className="cartitems-remove-icon"
                    onClick={() => handleRemoveItem(item.productId, item.size)}
                  />
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
                <td data-label="Prix">€{item.price?.toFixed(2)}</td>
                <td data-label="Quantité">
                  <div className="cartitems-quantity-wrapper">
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.size, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const qty = Math.max(1, parseInt(e.target.value) || 1);
                        handleQuantityChange(item.productId, item.size, qty);
                      }}
                    />
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td data-label="Total">
                  €{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))
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
            <span>€{total}</span>
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