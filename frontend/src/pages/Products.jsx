// frontend/src/pages/Products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, category, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products.php`);
      setProducts(response.data);
      setFilteredProducts(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(p => p.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="container-fluid page-section text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid page-section">
      <h1 className="page-title display-6">Our Products</h1>
      
      <div className="page-toolbar">
        <div className="row g-3 align-items-stretch">
          <div className="col-md-6">
            <label className="form-label small text-muted mb-1">Search</label>
            <input
              type="search"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted mb-1">Category</label>
            <select 
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5 rounded-3 border" style={{ borderColor: 'var(--border)' }}>
          <h3 className="h4 text-body">No products found</h3>
          <p className="text-muted mb-0">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map(product => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;