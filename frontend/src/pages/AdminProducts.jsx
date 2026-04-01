// frontend/src/pages/AdminProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products.php`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageUploaded = (imageUrl) => {
    setFormData({ ...formData, image_url: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`${API_URL}/products.php?id=${editingProduct.id}`, formData);
        alert('Product updated successfully!');
      } else {
        // Add new product
        await axios.post(`${API_URL}/products.php`, formData);
        alert('Product added successfully!');
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image_url: product.image_url
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/products.php?id=${id}`);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image_url: ''
    });
  };

  return (
    <div className="container-fluid py-5">
      <h1 className="mb-4">Product Management</h1>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                  <label className="form-label">Product Image</label>
                  <ImageUpload onImageUploaded={handleImageUploaded} />
                  {formData.image_url && (
                    <div className="mt-2">
                      <img src={formData.image_url} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
                
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary flex-grow-1">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  {editingProduct && (
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>Product List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.category}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(product)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(product.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;