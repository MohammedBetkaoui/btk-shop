import React from 'react';
import './newcollection.css';
import collecction from '../assets/new_collections';
import Item from '../items/item';

const NewCollections = () => {
  return (
    <div className='newCollections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {collecction.map((item, i) => (
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

export default NewCollections;