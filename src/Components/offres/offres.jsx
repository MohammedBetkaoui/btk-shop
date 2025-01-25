import React from 'react';
import './offres.css';
import exclusiveImage from '../assets/exclusive_image.png';

const Offres = () => {
  return (
    <div className="offres">
      <div className="offres-left">
        <h1 className="offres-title">Exclusive</h1>
        <h1 className="offres-title">Offers For You</h1>
        <p className="offres-subtitle">Only on Best Sellers Products</p>
        <button className="offres-button">Check Now</button>
      </div>
      <div className="offres-right">
        <img src={exclusiveImage} alt="Exclusive Offer" className="offres-image" />
      </div>
    </div>
  );
};

export default Offres;