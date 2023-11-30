import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LockerCreate = () => {
  const [formData, setFormData] = useState({
    station_id: '',
    size_width: 0,
    size_height: 0,
    size_length: 0,
    is_first_closure: false,
    status: '',
    state: '',
    is_empty: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    axios.post('http://127.0.0.1:8000/lockers/create/', formData)
      .then(response => {
        console.log('Locker created:', response.data);
        navigate('/lockers');
      })
      .catch(error => {
        console.error('Error creating locker:', error);
      });
  };

  return (
    <div>
      <h2>Create Locker</h2>
      <form>
        {/* Include necessary input fields for locker creation */}
        <button type="button" onClick={handleCreate}>Create Locker</button>
      </form>
    </div>
  );
};

export default LockerCreate;
