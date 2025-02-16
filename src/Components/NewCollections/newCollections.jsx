import React, { useContext, useEffect, useState } from 'react';
import './newcollection.css';
import { ShopContext } from '../../Context/shopContext';
import Item from '../items/item';

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);
  const [newCollections, setNewCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterNewProducts = (products) => {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 15));

    return products.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= fiveDaysAgo;
    });
  };

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      const filteredCollections = filterNewProducts(all_product);
      setNewCollections(filteredCollections);
      setIsLoading(false);
    }
  }, [all_product]);

  return (
    <div className="newCollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {isLoading ? (
          <div className="loading">Chargement en cours...</div>
        ) : newCollections.length > 0 ? (
          newCollections.map((item) => (
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

export default NewCollections;