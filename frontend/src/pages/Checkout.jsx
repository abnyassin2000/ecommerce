// frontend/src/pages/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
    city: '',
    postal_code: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...formData,
      total_amount: getCartTotal(),
      items: cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await axios.post(`${API_URL}/orders.php`, orderData);
      
      if (response.data.success) {
        clearCart();
        navigate('/order-success', { state: { orderId: response.data.order_id } });
      } else {
        alert('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container-fluid page-section">
      <h1 className="page-title page-title-start display-6 mb-4">Checkout</h1>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card card-summary">
            <div className="card-body p-4 p-md-5">
              <h2 className="h5 card-title mb-4">Shipping information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Postal Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card card-summary sticky-lg-top" style={{ top: '5.5rem' }}>
            <div className="card-body">
              <h2 className="h5 card-title mb-4">Order summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-3">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">${getCartTotal().toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;