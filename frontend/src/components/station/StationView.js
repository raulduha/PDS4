// StationView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './StationView.css';  // Importa tu archivo de estilos CSS

const StationView = () => {
  const [stationDetails, setStationDetails] = useState({});
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { station_id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/stations/${station_id}/`)
      .then(response => {
        console.log(response.data);
        setStationDetails(response.data.station);
        setLockers(response.data.lockers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching station details:', error);
        setLoading(false);
      });
  }, [station_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDeleteLocker = (lockerId) => {
    // Lógica para eliminar un locker
    axios.delete(`http://127.0.0.1:8000/lockers/${lockerId}/delete/`)
      .then(response => {
        // Actualizar la lista de lockers después de la eliminación
        setLockers(lockers.filter(locker => locker.id !== lockerId));
      })
      .catch(error => {
        console.error('Error deleting locker:', error);
      });
  };

  return (
    <div className="station-view-container">
      <h2>Station Details</h2>
      <div className="station-details">
        <p><strong>ID:</strong> {stationDetails.id}</p>
        <p><strong>Name:</strong> {stationDetails.name}</p>
        <p><strong>Address:</strong> {stationDetails.address}</p>
      </div>

      <h3>Lockers in this Station</h3>
      <table className="locker-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {lockers.map(locker => (
            <tr key={locker.id}>
              <td>{locker.id}</td>
              <td>
                <Link to={`/lockers/${locker.id}`}>
                  <button className="view-locker-button">View Locker</button>
                </Link>
              </td>
              <td>
              <button className="cancel-button" onClick={() => handleDeleteLocker(locker.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationView;
