// LockerView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const LockerView = () => {
  const [lockerDetails, setLockerDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { locker_id } = useParams();

  useEffect(() => {
    axios.get(`https://backend-p3.vercel.app/lockers/${locker_id}/`)
      .then(response => {
        console.log(response.data); // Agregamos un log para verificar la respuesta del servidor
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
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{lockerDetails.id}</td>
          </tr>
          <tr>
            <td>Width:</td>
            <td>{lockerDetails.size_width}</td>
          </tr>
          <tr>
            <td>Height:</td>
            <td>{lockerDetails.size_height}</td>
          </tr>
          <tr>
            <td>Length:</td>
            <td>{lockerDetails.size_length}</td>
          </tr>
          {/* Agrega más filas según las características del locker */}
        </tbody>
      </table>
      <Link to={`/lockers/${locker_id}/update`}>
        <button>Edit Locker</button>
      </Link>
      <Link to={`/stations`}>
        <button className="cancel-button">Back to Stations</button>
      </Link>
  
    </div>
  );
};

export default LockerView;
