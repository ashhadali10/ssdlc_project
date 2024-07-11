import React, { useState } from 'react';
import InputForm from './InputForm';

const Home = () => {
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="home-container">
      <header className="header">
        {/* Header content here */}
      </header>
      <section className="main-content">
        <h1 className="main-heading">Buy and Sell Your Books</h1>
        <div className="search-bar">
          {/* Search bar content here */}
        </div>
        <InputForm onSubmit={handleSubmit} />
        {formData && (
          <div className="submitted-data">
            <h2>Submitted Data</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </section>
      {/* Additional sections or content */}
    </div>
  );
}

export default Home;
