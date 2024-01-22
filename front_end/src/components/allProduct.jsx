import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const AllProducts = ({ onProductClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newCarData, setNewCarData] = useState({
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

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
    alert('Product added to favorites successfully!');
  };

  const handleSearch = (query) => {
    setSearchResults(query);
  };

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:5001/api/products/getAll/${productId}`)
      .then(response => {
        setAllProducts(response.data);
        alert(`Product with ID: ${productId} deleted successfully`);
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleUpdate = (productId) => {
    // Implement your update logic here
    // For now, let's prompt for a new price
    const newPrice = prompt('Enter the new price:');
    if (newPrice !== null && !isNaN(newPrice)) {
      axios.put(`hhttp://localhost:5001/api/products/getAll/${productId}`, { price: newPrice })
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



  

  return (
    <div>
      <nav className="navbar">
        <h1 id='web'>LUXURY PRODUCTS</h1>
        <div className="navbar-links">
          <a href="https://www.mansory.com/">More</a>
          <a href="">Contact Us</a>
          <a href="https://www.mansory.com/news">News</a>
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
            <button onClick={() => addToFavorites(product)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
