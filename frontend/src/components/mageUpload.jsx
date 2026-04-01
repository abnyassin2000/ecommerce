// frontend/src/components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/ecommerce-app/backend/api';

const ImageUpload = ({ onImageUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await uploadImage(files[0]);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      await uploadImage(files[0]);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/upload_image.php`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        onImageUploaded(response.data.image_url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: dragActive ? '#f0f0f0' : 'white'
      }}
    >
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-input" style={{ cursor: 'pointer' }}>
        <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
        <p>Drag and drop an image here, or click to select</p>
        <p className="text-muted small">Supports: JPG, PNG, GIF (Max 5MB)</p>
      </label>
      {uploading && (
        <div className="mt-3">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Uploading...</span>
          </div>
          <p className="mt-2">Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;