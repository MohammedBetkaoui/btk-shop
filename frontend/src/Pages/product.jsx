import React, { useContext } from 'react'
import {ShopContext} from '../Context/shopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/breadcrums/breadcrum';
import ProductDisplay from '../Components/productdisplay/productDisplay';
import DesciptionBox from '../Components/descriptionBox/desciptionBox';
import Relatedproduct from '../Components/relatedProduct/relatedproduct';
 const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId}=useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <Relatedproduct />
      <DesciptionBox />
    </div>
  )
}

export default Product;
