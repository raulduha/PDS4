import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StationUpdate = () => {
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [stationData, setStationData] = useState({});
  const { station_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/stations/${station_id}/`)
      .then(response => {
        setStationData(response.data.station);
        setFormData(response.data.station);
      })
      .catch(error => {
        console.error('Error fetching station details for update:', error);
      });
  }, [station_id]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/stations/${station_id}/update/`, formData);

      if (response.status === 200) {
        console.log('Station updated successfully');
        navigate(`/stations/${station_id}/`);
      } else {
        console.error('Error updating station');
      }
    } catch (error) {
      console.error('Error in the request:', error);
    }
  };

  return (
    <div>
      <h2>Update Station</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Update Station</button>
      </form>
    </div>
  );
};

export default StationUpdate;
