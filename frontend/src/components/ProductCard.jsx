// frontend/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="card card-product h-100 shadow-sm hover-shadow">
      <Link to={`/product/${product.id}`} className="d-block bg-light">
        <img 
          src={product.image_url} 
          className="card-img-top w-100" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h5 className="card-title text-body mb-2">{product.name}</h5>
        </Link>
        <p className="card-text text-muted small flex-grow-1 mb-3">
          {product.description.substring(0, 60)}...
        </p>
        <div className="d-flex justify-content-between align-items-center gap-2 mt-auto">
          <span className="h5 text-primary mb-0">${product.price}</span>
          <button 
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
          >
            <i className="fas fa-cart-plus me-1" aria-hidden="true"></i>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;