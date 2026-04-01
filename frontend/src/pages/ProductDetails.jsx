// frontend/src/pages/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products.php?id=${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
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

  if (!product) {
    return (
      <div className="container-fluid page-section text-center py-5">
        <h2 className="h3 mb-3">Product not found</h2>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container-fluid page-section">
      <Link to="/products" className="btn btn-outline-primary btn-sm mb-4">
        <i className="fas fa-arrow-left me-2" aria-hidden="true"></i>
        Back to Products
      </Link>
      
      <div className="row g-4 g-lg-5">
        <div className="col-md-6">
          <div className="rounded-3 overflow-hidden border bg-light shadow-sm">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="img-fluid w-100 d-block"
              style={{ maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <p className="text-muted small text-uppercase letter-spacing mb-2">{product.category}</p>
          <h1 className="h2 mb-3" style={{ color: 'var(--text-h)' }}>{product.name}</h1>
          <p className="display-6 text-primary fw-semibold mb-4">${product.price}</p>
          <p className="mb-4 text-body lh-lg">{product.description}</p>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Quantity</label>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="btn-group" role="group" aria-label="Quantity">
                <button 
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="btn btn-outline-secondary disabled px-4" style={{ pointerEvents: 'none' }}>
                  {quantity}
                </span>
                <button 
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className="text-muted small ms-md-2">
                {product.stock} in stock
              </span>
            </div>
          </div>
          
          <button 
            type="button"
            className="btn btn-primary btn-lg w-100 py-3"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <i className="fas fa-cart-plus me-2" aria-hidden="true"></i>
            Add to Cart
          </button>
          
          <div className="mt-4 p-4 rounded-3 border" style={{ borderColor: 'var(--border)', background: 'var(--code-bg)' }}>
            <h2 className="h6 mb-3">Details</h2>
            <ul className="list-unstyled mb-0 small text-muted">
              <li className="mb-2"><strong className="text-body">Stock:</strong> {product.stock} units</li>
              <li className="mb-2"><strong className="text-body">Category:</strong> {product.category}</li>
              <li><strong className="text-body">SKU:</strong> SKU-{product.id}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;