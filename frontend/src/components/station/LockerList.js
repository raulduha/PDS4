import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LockerList = () => {
  const [lockers, setLockers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/lockers/')
      .then(response => {
        setLockers(response.data);
      })
      .catch(error => {
        console.error('Error fetching lockers:', error);
      });
  }, []);

  const handleDelete = (lockerId) => {
    axios.delete(`http://127.0.0.1:8000/lockers/${lockerId}/delete/`)
      .then(response => {
        console.log('Locker deleted:', response.data);
        setLockers(lockers.filter(locker => locker.id !== lockerId));
      })
      .catch(error => {
        console.error('Error deleting locker:', error);
      });
  };

  return (
    <div>
      <h2>Locker List</h2>
      <ul>
        {lockers.map(locker => (
          <li key={locker.id}>
            <strong>Status:</strong> {locker.status}, <strong>Is Empty:</strong> {locker.is_empty ? 'Yes' : 'No'}
            <Link to={`/lockers/${locker.id}/view`}>View</Link>
            <button onClick={() => handleDelete(locker.id)}>Delete</button>
            <button onClick={() => navigate(`/lockers/${locker.id}/update`)}>Edit</button>
          </li>
        ))}
      </ul>
      <Link to="/lockers/create">Create Locker</Link>
    </div>
  );
};

export default LockerList;
