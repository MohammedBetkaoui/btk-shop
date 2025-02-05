import React, { useContext } from 'react';
import './cartitems.css';
import { ShopContext } from '../../Context/shopContext';
import remove_icon from '../assets/cart_cross_icon.png';

const Cartitems = () => {
  const { all_product, cart, addToCart, removeFromCart } = useContext(ShopContext);

  const cartItems = [];
  for (const productId in cart) {
    for (const size in cart[productId]) {
      if (cart[productId][size].quantity > 0) {
        const product = all_product.find((p) => p.id === Number(productId));
        if (product) {
          cartItems.push({
            ...product,
            quantity: cart[productId][size].quantity,
            size: size,
          });
        }
      }
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => {
      return total + product.new_price * product.quantity;
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cartitems">
      <table className="cartitems-table">
        <thead>
          <tr>
            <th>Remove</th>
            <th>Product</th>
            <th>Title</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <tr key={`${product.id}-${product.size}`} className="cartitems-product">
                <td data-label="Remove">
                  <img
                    src={remove_icon}
                    alt="remove"
                    className="cartitems-remove-icon"
                    onClick={() => removeFromCart(product.id, product.size)}
                  />
                </td>
                <td data-label="Product">
                  <img src={product.image} alt={product.name} className="cartitems-image" />
                </td>
                <td>{product.name}</td>
                <td>{product.size}</td>
                <td data-label="Price">${product.new_price.toFixed(2)}</td>
                <td data-label="Quantity">
                  <div className="cartitems-quantity-wrapper">
                    <button
                      className="cartitems-quantity"
                      onClick={() => removeFromCart(product.id, product.size)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value, 10);
                        if (quantity >= 1) addToCart(product.id, product.size, quantity);
                      }}
                    />
                    <button
                      className="cartitems-quantity"
                      onClick={() => addToCart(product.id, product.size, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td data-label="Total">${(product.new_price * product.quantity).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="cartitems-empty">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {cartItems.length > 0 && (
        <div className="cartitems-summary">
          <h3>Cart Summary</h3>
          <table className="cartitems-summary-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={`${product.id}-${product.size}`}>
                  <td data-label="Product">
                    <img src={product.image} alt={product.name} className="cartitems-summary-image" />
                  </td>
                  <td>{product.size}</td>
                  <td data-label="Price">${product.new_price.toFixed(2)}</td>
                  <td data-label="Quantity">{product.quantity}</td>
                  <td data-label="Total">${(product.new_price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="cartitems-summary-total">
                <td colSpan="4">Total</td>
                <td>${calculateTotal()}</td>
              </tr>
            </tbody>
          </table>

          <button className="cartitems-checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cartitems;