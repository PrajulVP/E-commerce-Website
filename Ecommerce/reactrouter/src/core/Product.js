import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadProducts = () => {
    getProducts()
      .then(data => {
        if (data.error) {
          console.error('Error fetching products:', data.error);
          setProducts([]);
          setCategories([]);
        } else {
          setProducts(data);
          // Extract unique categories from products
          const uniqueCategories = [...new Set(data.map(product => product.category_name))];
          setCategories(uniqueCategories);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setCategories([]);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Base>
      <div className="container">
        {categories.map(category => (
          <div key={category} style={{marginTop:"80px"}}>
            <h1 className='mt-4'>{category}</h1>
            <div className="row">
              {products.filter(product => product.category_name === category).map((product, index) => (
                <div className="col-3 mt-4" key={index}>
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Product;
