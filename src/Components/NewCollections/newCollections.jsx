import React, { useContext, useEffect, useState } from 'react';
import './newcollection.css';
import { ShopContext } from '../../Context/shopContext';
import Item from '../items/item';

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);
  const [newCollections, setNewCollections] = useState([]);

  // Fonction pour filtrer les produits ajoutés dans les 5 derniers jours
  const filterNewProducts = (products) => {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate);
    fiveDaysAgo.setDate(currentDate.getDate() - 5); // Soustraire 5 jours de la date actuelle

    return products.filter((product) => {
      const productDate = new Date(product.date); // Convertir la date du produit en objet Date
      return productDate >= fiveDaysAgo; // Retourner les produits ajoutés dans les 5 derniers jours
    });
  };

  // Mettre à jour les nouvelles collections lorsque les produits sont chargés
  useEffect(() => {
    if (all_product.length > 0) {
      const filteredCollections = filterNewProducts(all_product);
      setNewCollections(filteredCollections);
    }
  }, [all_product]);

  return (
    <div className="newCollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections.length > 0 ? (
          newCollections.map((item, i) => (
            <Item
              key={i}
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