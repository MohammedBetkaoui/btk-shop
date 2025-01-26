import React, { useContext } from 'react';
import './cartitems.css';
import { ShopContext } from '../../Context/shopContext';
import remove_icon from '../assets/cart_cross_icon.png';

const Cartitems = () => {
  const { all_product, cart, addToCart, removeFromCart } = useContext(ShopContext);

  // Gestion des produits dans le panier
  const cartItems = all_product.filter((product) => cart[product.id] > 0);

  // Calcul du total du panier
  const calculateTotal = () => {
    return cartItems.reduce((total, product) => {
      return total + product.new_price * cart[product.id];
    }, 0).toFixed(2);
  };

  return (
    <div className="cartitems">
      {/* Tableau pour le panier */}
      <table className="cartitems-table">
        <thead>
          <tr>
            <th>Remove</th>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <tr key={product.id} className="cartitems-product">
                 <td>
                  <img
                    src={remove_icon}
                    alt="remove"
                    className="cartitems-remove-icon"
                    onClick={() => removeFromCart(product.id, cart[product.id])}
                  />
                </td>
                <td data-label="Product">
                  <img src={product.image} alt={product.name} className="cartitems-image" />
                </td>
                <td>{product.name}</td>
                <td data-label="Price">${product.new_price.toFixed(2)}</td>
                <td data-label="Quantity">
                  <div className="cartitems-quantity-wrapper">
                    <button
                      className="cartitems-quantity"
                      onClick={() => removeFromCart(product.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={cart[product.id]}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value, 10);
                        if (quantity >= 1) addToCart(product.id, quantity);
                      }}
                    />
                    <button
                      className="cartitems-quantity"
                      onClick={() => addToCart(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td data-label="Total">${(product.new_price * cart[product.id]).toFixed(2)}</td>
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="cartitems-empty">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Tableau pour le total du panier */}
      {cartItems.length > 0 && (
        <div className="cartitems-summary">
          <h3>Cart Summary</h3>
          <table className="cartitems-summary-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.id}>
                  <td data-label="Product">
                    <img src={product.image} alt={product.name} className="cartitems-summary-image" />
                    <span>{product.name}</span>
                  </td>
                  <td data-label="Price">${product.new_price.toFixed(2)}</td>
                  <td data-label="Quantity">{cart[product.id]}</td>
                  <td data-label="Total">${(product.new_price * cart[product.id]).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="cartitems-summary-total">
                <td colSpan="3">Total</td>
                <td>${calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cartitems;