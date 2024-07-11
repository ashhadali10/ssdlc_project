// src/components/InputForm.jsx

import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    bookName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
      <input type="text" name="bookName" placeholder="Book Name" value={formData.bookName} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;
