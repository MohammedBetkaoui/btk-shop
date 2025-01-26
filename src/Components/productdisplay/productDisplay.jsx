import React, { useState } from 'react';
import './productDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';

const ProductDisplay = (props) => {
  const { product } = props;
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-image">
          <img className='productdisplay-main-img' src={product.image} alt="Main Product" />
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
          A lightweight, usually made of cotton and polyester, it is a great choice for summer. It has a slightly rounded shape, a slightly looser fit, and a slightly longer sleeve. It is a great choice for summer.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
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
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDisplay;