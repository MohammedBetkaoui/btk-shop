// src/Pages/Order.jsx
import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/shopContext';
import { useNavigate } from 'react-router-dom';
import './css/order.css';

const Order = () => {
  const { cart, getCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOrder = async () => {
    setShowConfirmation(false); // Fermer la modal
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter pour passer une commande.');
      return;
    }

    try {
      const response = await fetch('https://backend-btk-shop.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ products: cart }),
      });

      const data = await response.json();
      if (data.success) {
        await getCart(); 
        alert(data.message);
        navigate('/');
      } else {
        alert(data.message || 'Erreur lors de la commande');
      }
    } catch (error) {
      console.error('Erreur lors de la commande :', error);
      alert('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="order">
      <div className="order-container">
        <h1>Passer une commande</h1>
        
        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3>Confirmer la commande</h3>
              <p>Êtes-vous sûr de vouloir finaliser cette commande ?</p>
              <div className="modal-buttons">
                <button onClick={handleOrder}>Confirmer</button>
                <button className="cancel" onClick={() => setShowConfirmation(false)}>Annuler</button>
              </div>
            </div>
          </div>
        )}

        {cart.length > 0 ? (
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-item" key={`${item.productId}-${item.size}`}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Taille: {item.size}</p>
                  <p>Prix unitaire: {item.price?.toFixed(2)}</p>
                  <p>Quantité: {item.quantity}</p>
                  <p className="total">Total: {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            <button 
              className="confirm-order" 
              onClick={() => setShowConfirmation(true)}
            >
              Confirmer la commande
            </button>
          </div>
        ) : (
          <p className="empty-cart">Votre panier est vide. Ajoutez des produits pour passer une commande.</p>
        )}
      </div>
    </div>
  );
};

export default Order;