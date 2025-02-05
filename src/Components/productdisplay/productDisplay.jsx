import React, { useContext, useState, useEffect } from 'react';
import './productDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../Context/shopContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ProductDisplay = () => {
  const { all_product, addToCart, getCart } = useContext(ShopContext); // Import getCart
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState(null);

  const product = all_product.find((e) => e.id === Number(productId));

  useEffect(() => {
    const fetchCart = async () => {
      await getCart(); // Fetch cart on component mount
    };
    fetchCart();
  }, [getCart]); // Add getCart to the dependency array

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }
  
    try {
      await addToCart(product.id, selectedSize);
      navigate('/cart');
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message);
    }
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-image">
          <img className="productdisplay-main-img" src={product.image} alt="Main Product" />
        </div>
        <div className="productdisplay-img-list">
          <img src={product.image} alt="Thumbnail 1" />
          <img src={product.image} alt="Thumbnail 2" />
          <img src={product.image} alt="Thumbnail 3" />
          <img src={product.image} alt="Thumbnail 4" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="Star Icon" />
          <img src={star_icon} alt="Star Icon" />
          <img src={star_icon} alt="Star Icon" />
          <img src={star_icon} alt="Star Icon" />
          <img src={star_dull_icon} alt="Dull Star Icon" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description || 'Un produit de haute qualité, parfait pour une utilisation quotidienne.'}
        </div>
        <div className="productdisplay-right-size">
          <h1>Sélectionnez la taille</h1>
          <div className="productdisplay-right-sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? 'selected' : ''}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleAddToCart}>Ajouter au panier</button>
      </div>
    </div>
  );
};

export default ProductDisplay;