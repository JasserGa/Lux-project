import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const AllProducts = ({ onProductClick }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newProductData, setNewProductData] = useState({
    name: '',
    image: '',
    price: 0,
    popular: false,
    available: false,
    rating: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:5001/api/products/getAll')
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchResults(query);
  };

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:5001/api/products/delete/${productId}`)
      .then(response => {
        setAllProducts(response.data);
        alert(`Product with ID: ${productId} deleted successfully`);
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleUpdate = (productId) => {
    const newPrice = prompt('Enter the new price:');
    if (newPrice !== null && !isNaN(newPrice)) {
      axios.put(`http://localhost:5001/api/products/update/${productId}`, { price: newPrice })
        .then(response => {
          setAllProducts(response.data);
          alert(`Product with ID: ${productId} updated successfully to new price: ${newPrice}`);
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    } else {
      alert('Invalid price. Please enter a valid number.');
    }
  };

  const handleAddProduct = () => {
    axios.post('http://localhost:5001/api/products/add', newProductData)
      .then(response => {
        setAllProducts(response.data);
        alert('Product added successfully!');
        // Clear the input fields after adding the product
        setNewProductData({
          name: '',
          image: '',
          price: 0,
          popular: false,
          available: false,
          rating: 0,
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
        alert('Error adding product. Check console for details.');
      });
  };
  

  return (
    <div>
      <nav className="navbar">
        <h1 id='web'>BRUCE WAYNE SHOP</h1>
        <div className="navbar-links">
          <a href="https://www.rolls-roycemotorcars.com/en_GB/home.html">MORE</a>
          <a href="https://www.instagram.com/jesser__ga/">CONTACT US</a>
          <a href="https://www.luxurymainerentals.com/property/281-beach-avenue-4">MAINSON</a>
        </div>
      </nav>

      <SearchBar onSearch={handleSearch} allProducts={allProducts} />
      <div className="all-product">
        {(searchResults.length > 0 ? searchResults : allProducts).map((product) => (
          <div key={product.id} className="product-list-item">
            <div
              className="product-list-item-title"
              onClick={() => onProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              {product.name}
            </div>
            <div className="product-list-item-byline">
              <span className="product-list-item-byline-available">
                {product.available ? 'Available' : 'Not Available'}
              </span>
              {product.rating && (
                <span className="product-list-item-byline-rating">
                  Rating: {product.rating}
                </span>
              )}
            </div>
            <div className="product-list-item-lede">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-list-item-price">Price: {product.price}</div>
            <button
              id="delete"
              onClick={() => handleDelete(product.id)}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </button>
            <button
              id="update"
              onClick={() => handleUpdate(product.id)}
              style={{ backgroundColor: 'green', color: 'white' }}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {/* Add a section to input new product data */}
      <div className="add-product-section">
        <h2>Add New Product</h2>
        <label htmlFor="newProductName">Name:</label>
        <input
          type="text"
          id="newProductName"
          value={newProductData.name}
          onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
        />

        <label htmlFor="newProductImage">Image URL:</label>
        <input
          type="text"
          id="newProductImage"
          value={newProductData.image}
          onChange={(e) => setNewProductData({ ...newProductData, image: e.target.value })}
        />

        <label htmlFor="newProductPrice">Price:</label>
        <input
          type="number"
          id="newProductPrice"
          value={newProductData.price}
          onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
        />

        {/* Add more input fields for other properties of the new product */}

        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default AllProducts;
