import React from 'react'
import Hero from '../Components/hero/hero'
import Popular from '../Components/popular/popular'
import Offres from '../Components/offres/offres'
import NewCollections from '../Components/NewCollections/newCollections'
 const shop = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offres/>
        <NewCollections/>
        
    </div>
  )
}

export default shop;
