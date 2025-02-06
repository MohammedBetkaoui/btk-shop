import React, { useContext } from 'react';
import { ShopContext } from '../Context/shopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/breadcrums/breadcrum';
import ProductDisplay from '../Components/productdisplay/productDisplay';
import DesciptionBox from '../Components/descriptionBox/desciptionBox';
import Relatedproduct from '../Components/relatedProduct/relatedproduct';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  if (!all_product.length) {
    return <div className="loading">Chargement en cours...</div>;
  }

  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return (
      <div className="error">
        <h2>404 - Produit non trouvé</h2>
        <p>Le produit que vous recherchez n'existe pas ou a été retiré.</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      <Breadcrum 
        category={product.category} 
        name={product.name} 
      />
      
      <ProductDisplay />

      <div className="product-details-section">
        <DesciptionBox 
          features={product.features}
          details={product.details}
        />
        
        <Relatedproduct 
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
};

export default Product;