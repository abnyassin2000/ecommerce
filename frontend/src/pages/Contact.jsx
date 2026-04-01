// frontend/src/pages/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container-fluid page-section">
      <h1 className="page-title display-6 mb-4">Contact us</h1>
      <div className="row g-5">
        <div className="col-lg-6">
          <p className="lead text-body mb-4">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll 
            respond as soon as possible.
          </p>
          
          <div className="mb-4">
            <h2 className="h6 text-body mb-2"><i className="fas fa-map-marker-alt text-primary me-2" aria-hidden="true"></i> Location</h2>
            <p className="text-muted small mb-0">123 Business Street, Suite 100<br />New York, NY 10001</p>
          </div>
          
          <div className="mb-4">
            <h2 className="h6 text-body mb-2"><i className="fas fa-phone text-primary me-2" aria-hidden="true"></i> Phone</h2>
            <p className="text-muted small mb-0">+1 (555) 123-4567</p>
          </div>
          
          <div className="mb-4">
            <h2 className="h6 text-body mb-2"><i className="fas fa-envelope text-primary me-2" aria-hidden="true"></i> Email</h2>
            <p className="text-muted small mb-0">support@shopease.com</p>
          </div>
          
          <div>
            <h2 className="h6 text-body mb-2"><i className="fas fa-clock text-primary me-2" aria-hidden="true"></i> Hours</h2>
            <p className="text-muted small mb-0">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card card-summary">
            <div className="card-body p-4 p-md-5">
              <h2 className="h4 card-title mb-4">Send a message</h2>
              
              {submitted && (
                <div className="alert alert-success">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;