// frontend/src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="container-fluid page-section">
      <h1 className="page-title display-6 mb-4">About ShopEase</h1>
      <div className="row g-5 align-items-start">
        <div className="col-lg-6">
          <p className="lead text-body mb-4">
            Your trusted online shopping destination since 2024.
          </p>
          <p className="mb-3 lh-lg">
            ShopEase was founded with a simple mission: to provide customers with 
            high-quality products at affordable prices, combined with exceptional 
            customer service.
          </p>
          <p className="mb-4 lh-lg">
            We believe that shopping should be easy, enjoyable, and accessible to everyone. 
            That&apos;s why we&apos;ve created a seamless online shopping experience with a wide 
            selection of products across multiple categories.
          </p>
          <h2 className="h5 mt-4 mb-3" style={{ color: 'var(--text-h)' }}>Our values</h2>
          <ul className="list-unstyled mb-0">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="fas fa-check-circle text-primary mt-1" aria-hidden="true"></i>
              <span>Quality products</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="fas fa-check-circle text-primary mt-1" aria-hidden="true"></i>
              <span>Customer first</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="fas fa-check-circle text-primary mt-1" aria-hidden="true"></i>
              <span>Secure shopping</span>
            </li>
            <li className="d-flex align-items-start gap-2">
              <i className="fas fa-check-circle text-primary mt-1" aria-hidden="true"></i>
              <span>Fast delivery</span>
            </li>
          </ul>
        </div>
        <div className="col-lg-6">
          <img 
            src="https://via.placeholder.com/600x400?text=About+Us" 
            alt="About Us" 
            className="img-fluid rounded-3 shadow-sm w-100 border"
            style={{ borderColor: 'var(--border)' }}
          />
          <div className="mt-4 p-4 rounded-3 border" style={{ borderColor: 'var(--border)', background: 'var(--code-bg)' }}>
            <h2 className="h5 mb-3" style={{ color: 'var(--text-h)' }}>Why choose us?</h2>
            <p className="mb-0 text-muted small lh-lg">
              With thousands of satisfied customers and a commitment to excellence, 
              we&apos;re proud to be your preferred shopping destination. Our team works 
              tirelessly to bring you the best products and the best prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;