// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products.php`);
      // Get first 4 products as featured
      setFeaturedProducts(response.data.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-hero page-section">
        <div className="container-fluid py-lg-2">
          <div className="row align-items-center g-4 py-3">
            <div className="col-lg-6 text-lg-start text-center">
              <h1 className="display-5 fw-bold mb-3 text-white">
                Welcome to ShopEase
              </h1>
              <p className="lead mb-4 text-white-50">
                Discover amazing products at unbeatable prices.
                Shop the latest trends in fashion, electronics, and more!
              </p>
              <Link to="/products" className="btn btn-light btn-lg px-4 shadow-sm">
                Shop Now
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://via.placeholder.com/600x400?text=Shopping" 
                alt="Shopping" 
                className="img-fluid rounded-3 shadow"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid page-section pb-0">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="feature-tile h-100 p-4">
              <i className="fas fa-truck fa-3x mb-3 d-inline-block" aria-hidden="true"></i>
              <h5 className="card-title text-body">Free Shipping</h5>
              <p className="card-text text-muted mb-0 small">
                Free shipping on orders over $50
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-tile h-100 p-4">
              <i className="fas fa-undo fa-3x mb-3 d-inline-block" aria-hidden="true"></i>
              <h5 className="card-title text-body">30 Days Return</h5>
              <p className="card-text text-muted mb-0 small">
                Easy returns within 30 days
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-tile h-100 p-4">
              <i className="fas fa-headset fa-3x mb-3 d-inline-block" aria-hidden="true"></i>
              <h5 className="card-title text-body">24/7 Support</h5>
              <p className="card-text text-muted mb-0 small">
                Customer support anytime
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid page-section">
        <h2 className="page-title h2 mb-4">Featured Products</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {featuredProducts.map(product => (
              <div className="col-md-3 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-5">
          <Link to="/products" className="btn btn-outline-primary btn-lg px-4">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;