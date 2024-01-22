import React from 'react';
import './App.css';
import AllProducts from './components/allProduct.jsx';


function App() {
  const handleProductClick = (product) => {
    // You can add logic here for handling the click on a product
    console.log('Product clicked:', product);
  };

  return (
    <div className="App">
      <AllProducts onProductClick={handleProductClick} />
    </div>
  );
}

export default App;
