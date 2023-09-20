import React, { useEffect, useState } from 'react';

const ProductViewer = ({ productId, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const product = products.find(product => product.id === productId);
    setSelectedProduct(product);
  }, [productId, products]);

  return (
    <div className="product-viewer">
      {selectedProduct && (
        <>
          <div className='first-two'>
            <div className="card">
              <h2>ID: {selectedProduct.id}</h2>
              <h3>{selectedProduct.title}</h3>
            </div>
            <div className="card">
              <p>Stock: {selectedProduct.stock}</p>
              <p>Price: ${selectedProduct.price}</p>
            </div>
          </div>
          <div className="card">
            <img src={selectedProduct.picture} alt={selectedProduct.title} />
          </div>
          <div className="card">
            <p>{selectedProduct.description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductViewer;
