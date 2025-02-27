import React from 'react';
import Hero from '../Components/hero/hero';
import Popular from '../Components/popular/popular';
import Offres from '../Components/offres/offres';
import NewCollections from '../Components/NewCollections/newCollections';
import Newsletter from '../Components/newsletter/newsletter';

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offres />
      <NewCollections />
      <Newsletter />
      
    </div>
  );
};

export default Shop;