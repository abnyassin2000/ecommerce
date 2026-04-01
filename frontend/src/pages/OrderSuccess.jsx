// frontend/src/pages/OrderSuccess.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="container-fluid page-section text-center py-5">
      <div className="py-4 mx-auto" style={{ maxWidth: '520px' }}>
        <i className="fas fa-check-circle text-success fa-4x mb-4 d-block" aria-hidden="true"></i>
        <h1 className="h2 mb-3" style={{ color: 'var(--text-h)' }}>Order confirmed</h1>
        <p className="lead text-muted mb-4">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        {orderId && (
          <div className="alert alert-info border-0 shadow-sm text-start small mb-4">
            <strong>Order number:</strong> #{orderId}
          </div>
        )}
        <p className="text-muted small mb-4">
          You will receive an email confirmation with your order details shortly.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg px-4">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;