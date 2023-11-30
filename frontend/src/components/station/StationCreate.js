import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StationCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    axios.post('http://127.0.0.1:8000/stations/create/', formData)
      .then(response => {
        console.log('Station created:', response.data);
        navigate('/stations');
      })
      .catch(error => {
        console.error('Error creating station:', error);
      });
  };

  return (
    <div>
      <h2>Create Station</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

        <button type="button" onClick={handleCreate}>Create Station</button>
      </form>
    </div>
  );
};

export default StationCreate;
