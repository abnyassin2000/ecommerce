// frontend/src/pages/Cart.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-fluid page-section text-center py-5">
        <div className="py-4">
          <i className="fas fa-shopping-cart fa-4x empty-state-icon mb-4" aria-hidden="true"></i>
          <h2 className="h3 mb-2">Your cart is empty</h2>
          <p className="text-muted mb-4">Add items from the catalog to see them here.</p>
          <Link to="/products" className="btn btn-primary btn-lg px-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid page-section">
      <h1 className="page-title page-title-start display-6">Shopping Cart</h1>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card card-summary">
            <div className="card-body p-0">
              {cartItems.map((item) => (
                <div key={item.id} className="row g-3 align-items-center p-4 border-bottom" style={{ borderColor: 'var(--border)' }}>
                  <div className="col-4 col-sm-3 col-md-2">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="img-fluid rounded-2 border"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div className="col-8 col-sm-9 col-md-4">
                    <Link to={`/product/${item.id}`} className="text-decoration-none">
                      <h2 className="h6 mb-1 text-body">{item.name}</h2>
                    </Link>
                    <p className="text-muted small mb-0">${item.price} each</p>
                  </div>
                  <div className="col-md-3">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Quantity">
                      <button 
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="btn btn-outline-secondary disabled px-3" style={{ pointerEvents: 'none' }}>
                        {item.quantity}
                      </span>
                      <button 
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-md-end">
                    <p className="fw-bold mb-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="col-md-1 text-md-end">
                    <button 
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <i className="fas fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card card-summary sticky-lg-top" style={{ top: '5.5rem' }}>
            <div className="card-body">
              <h2 className="h5 card-title mb-4">Order summary</h2>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong className="text-primary">${getCartTotal().toFixed(2)}</strong>
              </div>
              <button 
                type="button"
                className="btn btn-primary w-100 py-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-outline-secondary w-100 mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;