// LockerView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const LockerView = () => {
  const [lockerDetails, setLockerDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { locker_id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/lockers/${locker_id}/`)
      .then(response => {
        console.log(response.data);
        setLockerDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching locker details:', error);
        setLoading(false);
      });
  }, [locker_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Locker Details</h2>
      <p><strong>ID:</strong> {lockerDetails.id}</p>
      {/* Agrega más detalles según tus necesidades */}
    </div>
  );
};

export default LockerView;
