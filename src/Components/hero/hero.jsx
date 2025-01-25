import React from 'react';
import './hero.css';
import arrow_icon from '../assets/arrow.png';
import hero_image from '../assets/hero_image.png';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Discover Our Exclusive Range</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Fresh</p>
            
          </div>
          <p>Premium Collections</p>
          <p>Curated for You</p>
        </div>
        <div className="hero-latest-btn">
          <div>Explore Now</div>
          <img src={arrow_icon} alt="Arrow Icon" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="Hero Visual" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero;