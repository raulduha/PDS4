import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StationUpdate = ({ stationId }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/stations/${stationId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching station details:', error);
      });
  }, [stationId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/stations/${stationId}/update/`, formData)
      .then(response => {
        console.log('Station updated:', response.data);
        navigate(`/stations/${stationId}`);
      })
      .catch(error => {
        console.error('Error updating station:', error);
      });
  };

  return (
    <div>
      <h2>Update Station</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

        <button type="button" onClick={handleUpdate}>Update Station</button>
      </form>
    </div>
  );
};

export default StationUpdate;
