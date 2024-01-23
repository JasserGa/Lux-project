import React, { useState } from 'react';
import '../index.css';

const ProductDetail = ({ product, onUpdate, onDelete, onBackToList }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Updated Product:', updatedProduct);
    console.log('Original Product:', product);
    onUpdate(product.id, updatedProduct);
    setEditMode(false);
  };
  
  return (
    <div className={`product-detail ${editMode ? 'edit-mode' : ''}`}>
      <div className="product-header">
        <h2>{product.name}</h2>
        {!editMode && <img src={product.image} alt={product.name} />}
      </div>
      <div className="product-info">
        <p>Price: {product.price}</p>
        <p>Rating: {product.rating || 'N/A'}</p>
        <p>Available: {product.available ? 'Yes' : 'No'}</p>
        {/* Add more details as needed */}
      </div>

      {editMode && (
        <form className="edit-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
          />

          {/* Add more input fields for other properties */}
        </form>
      )}

      <div className="action-buttons">
        {!editMode && (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
        {editMode && (
          <button onClick={handleUpdate}>Update</button>
        )}
        <button onClick={() => onDelete(product.id)}>Delete</button>
        <button onClick={onBackToList}>Back to List</button>
      </div>
    </div>
  );
};

export default ProductDetail;