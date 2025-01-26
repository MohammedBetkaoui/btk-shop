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
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <tr key={product.id} className="cartitems-product">
                <td data-label="Product">
                  <img src={product.image} alt={product.name} className="cartitems-image" />
                </td>
                <td >{product.name}</td>
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
                <td data-label="Remove">
                  <img
                    src={remove_icon}
                    alt="remove"
                    className="cartitems-remove-icon"
                    onClick={() => removeFromCart(product.id, cart[product.id])}
                  />
                </td>
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
        <table className="cartitems-summary">
          <tbody>
            <tr>
              <td colSpan="4" className="cartitems-summary-label">
                Total:
              </td>
              <td className="cartitems-summary-value">
                ${calculateTotal()}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cartitems;