import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCards = ({ handleProductClick }) => { 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/drakulovski/dbplaceholder/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="product-cards">
      {products.map(product => (
        <div key={product.id} className="card" onClick={() => handleProductClick(product)}>
          <div className="card-header">
            <h5>ID: {product.id}</h5>
            <h3>{product.title}</h3>
            <p>Stock: {product.stock}</p>
          </div>
          <div className="card-footer">
            <p className="price">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCards;