import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './css/shopcategory.css';
import { ShopContext } from '../Context/shopContext';
import Item from '../Components/items/item';

const ShopCategory = ({ banners }) => { 
  const { all_product } = useContext(ShopContext);
  const { category } = useParams();
  
  const banner = banners[category.toLowerCase()]; // Sélectionner la bannière en fonction de la catégorie

  return (
    <div className='shop-category'>
      {banner && <img src={banner} alt={`${category} banner`} className="category-banner" />}
      <h2>{category} Collection</h2>
      <div className="shopcategory-products">
        {all_product
          .filter((item) => item.category.toLowerCase() === category.toLowerCase())
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ShopCategory;
