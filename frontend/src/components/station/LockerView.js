import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LockerView = ({ lockerId }) => {
  const [locker, setLocker] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/lockers/${lockerId}/`)
      .then(response => {
        setLocker(response.data);
      })
      .catch(error => {
        console.error('Error fetching locker details:', error);
      });
  }, [lockerId]);

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/lockers/${lockerId}/delete/`)
      .then(response => {
        console.log('Locker deleted:', response.data);
        navigate('/lockers');
      })
      .catch(error => {
        console.error('Error deleting locker:', error);
      });
  };

  return (
    <div>
      <h2>Locker Details</h2>
      <p><strong>Size:</strong> {locker.size_width} x {locker.size_height} x {locker.size_length}</p>
      <p><strong>Is First Closure:</strong> {locker.is_first_closure ? 'Yes' : 'No'}</p>
      <p><strong>Status:</strong> {locker.status}</p>
      <p><strong>State:</strong> {locker.state}</p>
      <p><strong>Is Empty:</strong> {locker.is_empty ? 'Yes' : 'No'}</p>
      <button onClick={handleDelete}>Delete Locker</button>
      <Link to={`/lockers/${lockerId}/update`}>Edit Locker</Link>
    </div>
  );
};

export default LockerView;
