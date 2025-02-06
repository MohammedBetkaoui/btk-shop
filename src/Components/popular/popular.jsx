import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/shopContext';
import './popular.css';
import Item from '../items/item';

const Popular = () => {
  const { all_product } = useContext(ShopContext);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterMenProducts = (products) => {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 5));

    return products.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= fiveDaysAgo && product.category === 'Men';
    });
  };

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      const filteredCollections = filterMenProducts(all_product);
      setPopular(filteredCollections);
      setIsLoading(false);
    }
  }, [all_product]);

  return (
    <div className='popular'>
      <h1>POPULAR IN MEN</h1>
      <hr />
      <div className="popular-item">
        {isLoading ? (
          <div className="loading">Chargement en cours...</div>
        ) : popular.length > 0 ? (
          popular.map((item) => (
            <Item 
              key={item.id}
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>Aucun nouveau produit ajouté récemment.</p>
        )}
      </div>
    </div>
  );
};

export default Popular;