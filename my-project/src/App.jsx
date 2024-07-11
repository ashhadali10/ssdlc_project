import React from 'react';
import './styles.css'; // Import your CSS file
import InputForm from './home/InputForm';

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/shop">Shop</a>
        <a href="/sell">Sell Your Book</a>
        <a href="/blog">Blog</a>
      </header>

      <main>
        <h1 className="main-heading">Buy and Sell Your Books</h1>
        <input type="text" className="search-bar" placeholder="Search books..." />
        {/* Other components and content */}
      </main>
    </div>
  );
}

export default App;
