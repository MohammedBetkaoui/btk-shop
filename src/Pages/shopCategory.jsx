import React, { useContext } from 'react';
import './css/shopcategory.css';
import { ShopContext } from '../Context/shopContext';
import Item from '../Components/items/item';
const ShopCategory = (props) => { 
  const { all_product } = useContext(ShopContext); 

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
              if(props.category===item.category){
                   return <Item
                                key={i} 
                                id={item.id} 
                                name={item.name} 
                                image={item.image} 
                                new_price={item.new_price} 
                                old_price={item.old_price}
                          />
              }else{
                 return null;
              }
        })}
          
        
      </div>
    </div>
  );
};

export default ShopCategory; 