import React from 'react';
import './desciptionbox.css';

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      {/* Navigation pour Description et Reviews */}
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        
      </div>

      {/* Contenu de la description */}
      <div className="descriptionbox-description">
        <h2>Welcome to BTK-SHOP – Your Ultimate Fashion Destination</h2>
        <br />
        <p>
          At BTK-SHOP, we bring style and comfort to your wardrobe with our exclusive collection of t-shirts and jackets for men, women, and kids.
        </p>
        <br />
        <p>
          <strong>For Men:</strong> Explore a variety of trendy t-shirts and jackets designed for every occasion, from casual outings to outdoor adventures.
        </p>
        <p>
          <strong>For Women:</strong> Discover elegant and chic designs that blend fashion with comfort, perfect for expressing your unique style.
        </p>
        <p>
          <strong>For Kids:</strong> Shop fun, durable, and stylish options that your little ones will love to wear.
        </p>
        <br />
        <p>
          With a seamless shopping experience, affordable prices, and fast delivery, BTK-SHOP is here to meet all your fashion needs.
        </p>
        <br />
        <h2>Why Choose BTK-SHOP</h2>
        <br />
        <ul>
          <li>Premium quality fabrics that last.</li>
          <li>A wide range of styles, colors, and sizes.</li>
          <li>New arrivals updated regularly to keep your wardrobe fresh.</li>
        </ul>
        <br />
        <p>Start shopping today and redefine your fashion game with BTK-SHOP.</p>
      </div>
    </div>
  );
};

export default DescriptionBox;