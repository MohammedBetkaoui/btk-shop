import React, { useContext, useState, useEffect } from 'react';
import './productDisplay.css';
import { ShopContext } from '../../Context/shopContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ProductDisplay = () => {
  const { all_product, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState(null);
  
  const product = all_product.find((e) => e.id === Number(productId));

  useEffect(() => {
    if (!product && all_product.length > 0) {
      navigate('/404');
    }
  }, [product, all_product, navigate]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille avant d\'ajouter au panier.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      await addToCart(product.id, selectedSize);
      navigate('/cart');
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  if (!product) return null;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <img className="productdisplay-main-img" src={product.image} alt={product.name} />
      </div>
      
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            {product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          {product.description || 'Un produit premium soigneusement sélectionné.'}
        </div>

        <div className="productdisplay-right-size">
          <h1>Choisissez votre taille</h1>
          <div className="productdisplay-right-sizes">
            {product.sizes.map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;