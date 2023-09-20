import React, { useState, useEffect } from 'react';
import ProductViewer from './ProductViewer';
import HomePage from './HomePage';
import axios from 'axios';

const ParentComponent = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/drakulovski/dbplaceholder/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    axios.post('https://my-json-server.typicode.com/drakulovski/dbplaceholder/products', newProduct)
      .then(response => {
        const createdProduct = response.data;
        setProducts([...products, createdProduct]);
        handleClose();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  }
  

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  }

  const handleSort = (sortedProducts) => {
    setProducts(sortedProducts);
  }

  return (
    <div>
      <div className="button-group-top-left">
      <HomePage onAddProduct={handleAddProduct} products={products} onSort={handleSort} />
      </div>
      <div className="product-container">
        <div className="left-column">
          {products.map(product => (
            <div key={product.id} className="card" onClick={() => handleProductClick(product.id)}>
              <div className="card-header">
                <h5>ID: {product.id}</h5>
                <h3>{product.title}</h3>
              </div>
              <div className="card-body">
                <p>Stock: {product.stock}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="right-column">
          <ProductViewer productId={selectedProductId} products={products} />
        </div>
      </div>
    </div>
  );
}

export default ParentComponent;


