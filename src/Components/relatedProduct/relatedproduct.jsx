import React from 'react';
import './relatedproduct.css';
import data_product from '../assets/data';
import Item from '../items/item'; // Assurez-vous d'importer le composant Item

const RelatedProduct = () => {
  return (
    <div className="relatedproduct">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item">
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;