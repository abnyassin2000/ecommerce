// frontend/src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First upload image
      let image_url = '';
      if (product.image) {
        const formData = new FormData();
        formData.append('image', product.image);
        
        const uploadResponse = await axios.post(`${API_URL}/upload_image.php`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (uploadResponse.data.success) {
          image_url = uploadResponse.data.image_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      // Then create product
      const productData = {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        stock: parseInt(product.stock),
        image_url: image_url
      };

      const response = await axios.post(`${API_URL}/products.php`, productData);
      
      if (response.data.success) {
        alert('Product added successfully!');
        // Reset form
        setProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image: null
        });
        setPreview(null);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Add New Product</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={product.name}
                    onChange={(e) => setProduct({...product, name: e.target.value})}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={product.description}
                    onChange={(e) => setProduct({...product, description: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={product.price}
                      onChange={(e) => setProduct({...product, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Stock *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={product.stock}
                      onChange={(e) => setProduct({...product, stock: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={product.category}
                    onChange={(e) => setProduct({...product, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Image *</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {preview && (
                    <div className="mt-2">
                      <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;